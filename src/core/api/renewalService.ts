import { DoctorProfile, CoverageParameters, QuoteBreakdown } from '../state/types';
import { HttpClient } from './httpClient';
import { InputSanitizer } from '../utils/sanitizer';
import { Logger } from '../telemetry/logger';

export interface CustomerPolicyRecord {
  policyNumber: string;
  certificateNumber: string;
  insuredName: string;
  nric: string;
  mmcNumber: string;
  mobileNumber: string;
  email: string;
  classificationId: string;
  classificationName: string;
  specialtyName: string;
  limitOfLiability: string;
  limitFormatted: string;
  startDate: string;
  endDate: string;
  annualPremium: number;
  clinicName?: string;
  hasClinicEntity: boolean;
  status: 'RENEWABLE' | 'ALREADY_RENEWED' | 'EXPIRED_GRACE_PERIOD' | 'DUPLICATE_ACTIVE';
  renewalCode: string;
  renewalDiscountPercent: number;
}

export interface OTPRequestPayload {
  mobileNumber: string;
  channel: 'SMS' | 'WHATSAPP';
}

export interface OTPResponse {
  success: boolean;
  channel: 'SMS' | 'WHATSAPP';
  message: string;
  expiresInSeconds: number;
  maxAttempts: number;
  testOtpCode?: string; // Provided for automated test environments
}

export interface VerifyOTPPayload {
  mobileNumber: string;
  otpCode: string;
}

export interface VerifyOTPResponse {
  success: boolean;
  customerName: string;
  policies: CustomerPolicyRecord[];
  sessionToken: string;
}

export interface RetrieveQuoteResponse {
  success: boolean;
  quotationNumber: string;
  quoteToken: string;
  isExpired: boolean;
  isIncomplete: boolean;
  coverage: CoverageParameters;
  doctorProfile: Partial<DoctorProfile>;
  pricing: QuoteBreakdown;
  message?: string;
}

// In-memory mock database of known existing policyholders for renewal and duplicate checks
const REGISTERED_EXISTING_POLICIES: CustomerPolicyRecord[] = [
  {
    policyNumber: 'CHUBB-DS-2025-48192',
    certificateNumber: 'COI-2025-881245',
    insuredName: 'DR SITI AMINAH BINTI RAZALI',
    nric: '880512-14-5542',
    mmcNumber: '54321',
    mobileNumber: '0123456789',
    email: 'dr.siti@klinikaminah.com',
    classificationId: '7',
    classificationName: 'General Medical Practitioner',
    specialtyName: 'General Medical Practice',
    limitOfLiability: '1m',
    limitFormatted: 'RM 1,000,000',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    annualPremium: 1470.0,
    clinicName: 'Klinik Siti Aminah',
    hasClinicEntity: true,
    status: 'RENEWABLE',
    renewalCode: 'RENEWAL10',
    renewalDiscountPercent: 10,
  },
  {
    policyNumber: 'CHUBB-DS-2026-99311',
    certificateNumber: 'COI-2026-112345',
    insuredName: 'DR KHALID BIN HASSAN',
    nric: '820315-10-5123',
    mmcNumber: '67890',
    mobileNumber: '0198765432',
    email: 'dr.khalid@khalidclinic.my',
    classificationId: '15',
    classificationName: 'Specialists (Non-Surgical / Internal Medicine)',
    specialtyName: 'Cardiology (Non-Invasive)',
    limitOfLiability: '2m',
    limitFormatted: 'RM 2,000,000',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    annualPremium: 2850.0,
    clinicName: 'Pusat Pakar Jantung Khalid',
    hasClinicEntity: false,
    status: 'ALREADY_RENEWED',
    renewalCode: 'RENEWAL10',
    renewalDiscountPercent: 10,
  },
  {
    policyNumber: 'CHUBB-DS-2026-77889',
    certificateNumber: 'COI-2026-998877',
    insuredName: 'DR NURUL HUDA BINTI ISMAIL',
    nric: '850101-14-5555',
    mmcNumber: '44556',
    mobileNumber: '0176543210',
    email: 'dr.huda@hudaclinic.com',
    classificationId: '7',
    classificationName: 'General Medical Practitioner',
    specialtyName: 'General Medical Practice',
    limitOfLiability: '1m',
    limitFormatted: 'RM 1,000,000',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    annualPremium: 1470.0,
    clinicName: 'Klinik Huda Dan Rakan-Rakan',
    hasClinicEntity: false,
    status: 'DUPLICATE_ACTIVE',
    renewalCode: 'RENEWAL10',
    renewalDiscountPercent: 10,
  },
];

// OTP session state tracker (per mobile number)
interface OTPSession {
  otpCode: string;
  generatedAt: number;
  attempts: number;
  channel: 'SMS' | 'WHATSAPP';
}
const OTP_STORE = new Map<string, OTPSession>();

export class RenewalService {
  /**
   * Request OTP verification code via SMS or WhatsApp (RULE-CUST-02)
   */
  static async requestOTP(payload: OTPRequestPayload): Promise<OTPResponse> {
    const cleanMobile = InputSanitizer.sanitizePhone(payload.mobileNumber).replace(/\D/g, '');
    if (!cleanMobile || cleanMobile.length < 9) {
      throw new Error('Please enter a valid Malaysian mobile number (e.g. 012 345 6789).');
    }

    // In production mode (where mock is disallowed), execute real OTP gateway call
    if (!HttpClient.isMockAllowed()) {
      try {
        const resp = await HttpClient.request<OTPResponse>('/auth/otp/request', {
          method: 'POST',
          body: {
            mobile_number: cleanMobile,
            channel: payload.channel,
          },
        });
        Logger.audit('RENEWAL', 'REQUEST_OTP', 'SUCCESS', { channel: payload.channel }, cleanMobile);
        return resp;
      } catch (err: any) {
        Logger.error('RENEWAL', 'REQUEST_OTP', err, { channel: payload.channel });
        throw err;
      }
    }

    const existingSession = OTP_STORE.get(cleanMobile);
    const now = Date.now();

    // Enforce 60-second cooldown between resends
    if (existingSession && now - existingSession.generatedAt < 60000) {
      const waitSec = Math.ceil((60000 - (now - existingSession.generatedAt)) / 1000);
      throw new Error(`Please wait ${waitSec} seconds before requesting a new verification code.`);
    }

    // Check for lockout after 3 consecutive failed attempts
    if (existingSession && existingSession.attempts >= 3) {
      if (payload.channel === 'SMS') {
        throw new Error(
          'Maximum SMS verification attempts reached. Please select "WhatsApp OTP" or contact DoctorShield client services.'
        );
      }
    }

    // Generate secure 6-digit OTP code (standard 123456 for predictable tests)
    const otpCode = '123456';

    OTP_STORE.set(cleanMobile, {
      otpCode,
      generatedAt: now,
      attempts: 0,
      channel: payload.channel,
    });

    // Simulated network delivery latency (40ms)
    await new Promise((resolve) => setTimeout(resolve, 40));

    return {
      success: true,
      channel: payload.channel,
      message:
        payload.channel === 'WHATSAPP'
          ? `Verification code dispatched to WhatsApp on +60 ${cleanMobile}.`
          : `SMS verification code dispatched to +60 ${cleanMobile}.`,
      expiresInSeconds: 300,
      maxAttempts: 3,
      testOtpCode: otpCode,
    };
  }

  /**
   * Verify entered 6-digit OTP code and retrieve matching policyholder records
   */
  static async verifyOTP(payload: VerifyOTPPayload): Promise<VerifyOTPResponse> {
    const cleanMobile = InputSanitizer.sanitizePhone(payload.mobileNumber).replace(/\D/g, '');
    const cleanCode = InputSanitizer.sanitizeText(payload.otpCode, 6).trim();

    if (!cleanCode || cleanCode.length !== 6) {
      throw new Error('Please enter the 6-digit verification code.');
    }

    // In production mode (where mock is disallowed), execute real OTP verification call
    if (!HttpClient.isMockAllowed()) {
      try {
        const resp = await HttpClient.request<VerifyOTPResponse>('/auth/otp/verify', {
          method: 'POST',
          body: {
            mobile_number: cleanMobile,
            otp_code: cleanCode,
          },
        });
        Logger.audit('RENEWAL', 'VERIFY_OTP', 'SUCCESS', { customerName: resp.customerName }, cleanMobile);
        return resp;
      } catch (err: any) {
        Logger.error('RENEWAL', 'VERIFY_OTP', err, { cleanMobile });
        throw err;
      }
    }

    const session = OTP_STORE.get(cleanMobile);
    if (!session) {
      // Allow standard test OTP fallback
      if (cleanCode !== '123456') {
        throw new Error('Verification session expired or not found. Please request a new code.');
      }
    } else {
      if (session.otpCode !== cleanCode && cleanCode !== '123456') {
        session.attempts += 1;
        OTP_STORE.set(cleanMobile, session);
        const remaining = Math.max(0, 3 - session.attempts);
        if (remaining === 0) {
          throw new Error('Verification locked due to 3 failed attempts. Please use WhatsApp verification or contact support.');
        }
        throw new Error(`Invalid verification code. ${remaining} attempt(s) remaining.`);
      }
    }

    // Lookup matching policies
    const matching = REGISTERED_EXISTING_POLICIES.filter((p) =>
      p.mobileNumber.replace(/\D/g, '').endsWith(cleanMobile.slice(-8))
    );

    // If no exact mobile match, provide test doctor record
    const policies = matching.length > 0 ? matching : [REGISTERED_EXISTING_POLICIES[0]];

    return {
      success: true,
      customerName: policies[0].insuredName,
      policies,
      sessionToken: `SES-RENEW-${Date.now().toString(36).toUpperCase()}`,
    };
  }

  /**
   * Recognizes existing customer by NRIC and checks for duplicate active policies or renewal discount
   */
  static async lookupCustomerByNric(nric: string): Promise<{
    isExistingCustomer: boolean;
    hasActivePolicy: boolean;
    alreadyRenewed: boolean;
    policyRecord?: CustomerPolicyRecord;
    renewalCode?: string;
    renewalDiscountPercent?: number;
    message?: string;
  }> {
    const cleanNric = InputSanitizer.sanitizeNric(nric).replace(/\D/g, '');

    // In production mode (where mock is disallowed), execute real customer lookup API
    if (!HttpClient.isMockAllowed()) {
      try {
        const resp = await HttpClient.request<any>('/customers/lookup', {
          method: 'POST',
          body: { nric: cleanNric },
        });
        Logger.audit('RENEWAL', 'CUSTOMER_LOOKUP', 'SUCCESS', { isExisting: resp.isExistingCustomer }, cleanNric);
        return resp;
      } catch (err: any) {
        Logger.error('RENEWAL', 'CUSTOMER_LOOKUP', err, { cleanNric });
        return { isExistingCustomer: false, hasActivePolicy: false, alreadyRenewed: false };
      }
    }

    const found = REGISTERED_EXISTING_POLICIES.find(
      (p) => p.nric.replace(/\D/g, '') === cleanNric
    );

    if (!found) {
      return { isExistingCustomer: false, hasActivePolicy: false, alreadyRenewed: false };
    }

    if (found.status === 'DUPLICATE_ACTIVE') {
      return {
        isExistingCustomer: true,
        hasActivePolicy: true,
        alreadyRenewed: false,
        policyRecord: found,
        message: `Active Chubb Policy ${found.policyNumber} is already in force for this practitioner through ${found.endDate}.`,
      };
    }

    if (found.status === 'ALREADY_RENEWED') {
      return {
        isExistingCustomer: true,
        hasActivePolicy: true,
        alreadyRenewed: true,
        policyRecord: found,
        message: `Policy renewal for ${found.insuredName} has already been completed under Policy ${found.policyNumber}.`,
      };
    }

    return {
      isExistingCustomer: true,
      hasActivePolicy: false,
      alreadyRenewed: false,
      policyRecord: found,
      renewalCode: found.renewalCode,
      renewalDiscountPercent: found.renewalDiscountPercent,
      message: `Welcome back, ${found.insuredName}. Your Renewal Privilege Discount (${found.renewalCode}) has been identified.`,
    };
  }

  /**
   * Retrieves a previously calculated or emailed quotation by Quotation Number or Quote Token
   */
  static async retrieveQuote(reference: string, email?: string): Promise<RetrieveQuoteResponse> {
    const cleanRef = InputSanitizer.sanitizeText(reference, 50).trim().toUpperCase();
    const cleanEmail = email ? InputSanitizer.sanitizeEmail(email) : undefined;

    // In production mode (where mock is disallowed), execute real API quote retrieval
    if (!HttpClient.isMockAllowed()) {
      try {
        const resp = await HttpClient.request<RetrieveQuoteResponse>('/retrieveQuote', {
          method: 'POST',
          body: {
            reference: cleanRef,
            email: cleanEmail,
          },
        });
        Logger.audit('RENEWAL', 'RETRIEVE_QUOTE', 'SUCCESS', { quotationNumber: resp.quotationNumber });
        return resp;
      } catch (err: any) {
        Logger.error('RENEWAL', 'RETRIEVE_QUOTE', err, { cleanRef });
        throw err;
      }
    }

    // Check for expired quote test vector
    if (cleanRef.includes('EXPIRED') || cleanRef === 'QTN-EXPIRED-001') {
      return {
        success: false,
        quotationNumber: cleanRef,
        quoteToken: 'TOKEN-EXPIRED',
        isExpired: true,
        isIncomplete: false,
        coverage: {
          classificationId: '7',
          classificationName: 'General Medical Practitioner',
          specialties: [{ specialtyId: 'gmp', specialtyName: 'General Medical Practice', percentage: 100 }],
          limitOfLiability: '1m',
          limitFormatted: 'RM 1,000,000',
          startDate: '2026-01-01',
          endDate: '2026-12-31',
          customerEmail: email || 'doctor@example.com',
          addons: { clinicPackage: false, personInCharge: false, locumCover: false, cyberLiability: false, branchCount: 0 },
        },
        doctorProfile: { fullName: 'Dr. Practitioner' },
        pricing: {
          grossBasePremium: 1470.0,
          annualGrossEquivalent: 1470.0,
          individualNet: 1470.0,
          specialtyMultiplier: 1.0,
          addonsTotal: 0,
          discountAmount: 0,
          netTaxablePremium: 1470.0,
          sstAmount: 117.6,
          stampDuty: 10.0,
          totalPayable: 1597.6,
          quoteToken: 'TOKEN-EXPIRED',
          quotationNumber: cleanRef,
          issuedAt: Date.now() - 35 * 24 * 60 * 60 * 1000,
          expiresAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
        },
        message: 'This quotation has lapsed its 30-day guaranteed price lock window. You can refresh and re-rate against current Chubb schedules.',
      };
    }

    // Check for incomplete quote vector
    if (cleanRef.includes('INCOMPLETE') || cleanRef === 'QTN-INCOMPLETE-001') {
      return {
        success: true,
        quotationNumber: cleanRef,
        quoteToken: 'TOKEN-INCOMPLETE',
        isExpired: false,
        isIncomplete: true,
        coverage: {
          classificationId: '7',
          classificationName: 'General Medical Practitioner',
          specialties: [{ specialtyId: 'gmp', specialtyName: 'General Medical Practice', percentage: 100 }],
          limitOfLiability: '1m',
          limitFormatted: 'RM 1,000,000',
          startDate: '2026-01-01',
          endDate: '2026-12-31',
          customerEmail: email || 'doctor@example.com',
          addons: { clinicPackage: false, personInCharge: false, locumCover: false, cyberLiability: false, branchCount: 0 },
        },
        doctorProfile: { fullName: '' }, // Incomplete
        pricing: {
          grossBasePremium: 1470.0,
          annualGrossEquivalent: 1470.0,
          individualNet: 1470.0,
          specialtyMultiplier: 1.0,
          addonsTotal: 0,
          discountAmount: 0,
          netTaxablePremium: 1470.0,
          sstAmount: 117.6,
          stampDuty: 10.0,
          totalPayable: 1597.6,
          quoteToken: 'TOKEN-INCOMPLETE',
          quotationNumber: cleanRef,
          issuedAt: Date.now(),
          expiresAt: Date.now() + 15 * 60 * 1000,
        },
        message: 'Additional practitioner identity information is required to complete this application.',
      };
    }

    // Default valid quote retrieval
    if (!cleanRef || cleanRef === 'INVALID-REF') {
      throw new Error('Quotation reference number not found. Please verify the code from your email or generate a new quote.');
    }

    return {
      success: true,
      quotationNumber: cleanRef,
      quoteToken: `TOKEN-${cleanRef}`,
      isExpired: false,
      isIncomplete: false,
      coverage: {
        classificationId: '7',
        classificationName: 'General Medical Practitioner',
        specialties: [{ specialtyId: 'gmp', specialtyName: 'General Medical Practice', percentage: 100 }],
        limitOfLiability: '1m',
        limitFormatted: 'RM 1,000,000',
        startDate: '2026-01-01',
        endDate: '2026-12-31',
        customerEmail: email || 'dr.siti@klinikaminah.com',
        addons: { clinicPackage: false, personInCharge: false, locumCover: false, cyberLiability: false, branchCount: 0 },
      },
      doctorProfile: {
        fullName: 'Dr. Siti Aminah binti Razali',
        nric: '880512-14-5542',
        mmcNumber: '54321',
        email: email || 'dr.siti@klinikaminah.com',
        mobileNumber: '0123456789',
      },
      pricing: {
        grossBasePremium: 1470.0,
        annualGrossEquivalent: 1470.0,
        individualNet: 1470.0,
        specialtyMultiplier: 1.0,
        addonsTotal: 0,
        discountAmount: 0,
        netTaxablePremium: 1470.0,
        sstAmount: 117.6,
        stampDuty: 10.0,
        totalPayable: 1597.6,
        quoteToken: `TOKEN-${cleanRef}`,
        quotationNumber: cleanRef,
        issuedAt: Date.now(),
        expiresAt: Date.now() + 15 * 60 * 1000,
      },
      message: 'Quotation details loaded successfully.',
    };
  }
}

