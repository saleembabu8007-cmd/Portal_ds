import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { WorkflowProvider, useWorkflow } from '../core/state/WorkflowContext';
import { App } from '../app/App';
import { RatingService } from '../core/api/ratingService';
import { RenewalService } from '../core/api/renewalService';

describe('DoctorShield Comprehensive End-to-End User Journeys', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
    window.sessionStorage.clear();
    window.history.pushState(null, '', '/buy/coverage');
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('Scenario 1: Standard Individual Coverage (GP, Non-Clinic Owner, Clean UW, Direct Bind)', async () => {
    render(
      <WorkflowProvider>
        <App />
      </WorkflowProvider>
    );

    // Stage 1: Configure Cover
    expect(screen.getByRole('heading', { name: /select your professional coverage/i })).toBeInTheDocument();

    // Default classification is GP ('7'). Select Limit: RM 1,000,000 ('1m')
    const limitCard = screen.getAllByText('RM 1,000,000')[0];
    fireEvent.click(limitCard);

    // Email
    const emailInput = screen.getByLabelText(/practitioner email address/i);
    fireEvent.change(emailInput, { target: { value: 'dr.tan@hospital.com.my' } });

    // Terms acknowledgment
    const termsCheck = screen.getByLabelText(/i have read, understood and agree to the terms and conditions/i);
    fireEvent.click(termsCheck);

    // Calculate Premium
    const calcBtn = screen.getByRole('button', { name: /generate quotation/i });
    fireEvent.click(calcBtn);

    // Wait for Stage 2 Quote Review
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /your indicative chubb indemnity quote/i })).toBeInTheDocument();
    });

    // Answer Clinic Ownership (No)
    const noClinicRadio = screen.getByRole('radio', { name: /no, i do not own or partner/i });
    fireEvent.click(noClinicRadio);

    // Answer PIC questions (No, No)
    const noPicOwn = screen.getByRole('radio', { name: /no, not person-in-charge of own clinic/i });
    fireEvent.click(noPicOwn);

    const noPicExt = screen.getByRole('radio', { name: /no, not person-in-charge of another facility/i });
    fireEvent.click(noPicExt);

    // Wait until recalculation is complete and proceed button is enabled
    await waitFor(() => {
      const proceedBtn = screen.getByRole('button', { name: /proceed to personal details/i });
      expect(proceedBtn).not.toBeDisabled();
    });

    // Proceed to Stage 3 Particulars
    const proceedToParticularsBtn = screen.getByRole('button', { name: /proceed to personal details/i });
    fireEvent.click(proceedToParticularsBtn);

    // Wait for Stage 3 Particulars Form
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /practitioner identity & underwriting declarations/i })).toBeInTheDocument();
    });

    // Fill Practitioner Particulars
    fireEvent.change(screen.getByLabelText(/full name \(as per nric \/ passport\)/i), { target: { value: 'Dr. Tan Chee Keong' } });
    fireEvent.change(screen.getByLabelText(/nric number/i), { target: { value: '850612145561' } });
    fireEvent.change(screen.getByLabelText(/mmc full registration number/i), { target: { value: 'MMC-44556' } });
    fireEvent.change(screen.getByLabelText(/mobile phone number/i), { target: { value: '012-3456789' } });
    fireEvent.change(screen.getByLabelText(/primary practice facility/i), { target: { value: 'Kuala Lumpur General Hospital' } });
    fireEvent.change(screen.getByLabelText(/practice address line 1/i), { target: { value: 'Jalan Pahang' } });
    fireEvent.change(screen.getByLabelText(/^postcode/i), { target: { value: '50586' } });
    fireEvent.change(screen.getByLabelText(/^city/i), { target: { value: 'Kuala Lumpur' } });
    fireEvent.change(screen.getByLabelText(/state \/ federal territory/i), { target: { value: 'Wilayah Persekutuan Kuala Lumpur' } });
    fireEvent.change(screen.getByLabelText(/annual gross professional income/i), { target: { value: 'RM 250,000 - RM 500,000' } });

    // Underwriting Declarations (Clean)
    const agreeRadio = screen.getByLabelText(/agree: no claims or notices of intention/i);
    fireEvent.click(agreeRadio);

    const noRadios = screen.getAllByLabelText(/^no$/i);
    fireEvent.click(noRadios[0]);
    fireEvent.click(noRadios[1]);
    fireEvent.click(noRadios[2]);

    // Accept final statutory truth declaration
    const finalDeclCheckbox = screen.getByLabelText(/i confirm and declare that the statements/i);
    fireEvent.click(finalDeclCheckbox);

    // Proceed to Stage 4 Review
    const toReviewBtn = screen.getByRole('button', { name: /proceed to review & payment/i });
    fireEvent.click(toReviewBtn);

    // Wait for Stage 4 Review Screen
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /review policy details & authorize payment/i })).toBeInTheDocument();
    });

    // Verify Review Information
    expect(screen.getByText(/DR\. TAN CHEE KEONG/i)).toBeInTheDocument();
    expect(screen.getByText('MMC-44556')).toBeInTheDocument();

    // Check mandatory consents
    fireEvent.click(document.getElementById('consent_policy_wording')!);
    fireEvent.click(document.getElementById('consent_duty_of_disclosure')!);
    fireEvent.click(document.getElementById('consent_pdpa')!);

    // Submit Payment
    const payBtn = screen.getByRole('button', { name: /authorize & pay/i });
    expect(payBtn).not.toBeDisabled();
    fireEvent.click(payBtn);

    // Payment Gateway Modal
    await waitFor(() => {
      expect(screen.getByText(/Secure Checkout Gateway \(PCI-DSS\)/i)).toBeInTheDocument();
    });

    // Simulate Success Outcome
    const completePaymentBtn = screen.getByRole('button', { name: /✓ Simulate Success \(Authorize & Issue\)/i });
    fireEvent.click(completePaymentBtn);

    // Stage 5 Policy Confirmation
    await waitFor(() => {
      expect(screen.getByTestId('stage5-policy-confirmation')).toBeInTheDocument();
      expect(screen.getByText(/Your Indemnity Coverage is Active/i)).toBeInTheDocument();
    });
  });

  it('Scenario 2: Clinic-Owner Sole Proprietor with Add-on Selection and Revenue Ceiling', async () => {
    const TestHarness: React.FC = () => {
      const { goToStage, updateCoverage, setQuote } = useWorkflow();

      React.useEffect(() => {
        updateCoverage({
          classificationId: '7',
          customerEmail: 'dr.clinic@example.com',
          limitOfLiability: '1m',
          startDate: '2026-11-01',
          endDate: '2026-12-31',
          clinic: {
            ownsClinic: true,
            clinicType: 'sole_proprietor',
            clinicLiabilityId: '1m',
            clinicLiabilityFormatted: 'RM 1,000,000',
            hiresLocums: false,
          },
          pic: {
            isPicOwnClinic: false,
            isPicAnotherClinic: false,
          },
          addons: {
            clinicPackage: true,
            personInCharge: false,
          },
        });
        setQuote({
          grossBasePremium: 1000,
          promoDiscount: 0,
          netGrossPremium: 1000,
          sstAmount: 80,
          stampDuty: 10,
          totalPayable: 1090,
          quotationNumber: 'QT-TEST-CLINIC',
          quoteToken: 'tok_clinic_1',
          expiresAt: Date.now() + 900000,
          clinicPremium: 800,
          addonsTotal: 800,
        });
        goToStage(2);
      }, []);

      return <App />;
    };

    render(
      <WorkflowProvider>
        <TestHarness />
      </WorkflowProvider>
    );

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /your indicative chubb indemnity quote/i })).toBeInTheDocument();
    });

    // Verify Clinic Package is selected
    expect(screen.getByRole('radio', { name: /yes, i own or partner/i })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('button', { name: /sole proprietor/i })).toBeInTheDocument();

    // Verify Reinstatement Callout
    expect(screen.getAllByText(/complimentary automatic reinstatement/i)[0]).toBeInTheDocument();

    // Proceed to Stage 3
    const proceedBtn = screen.getByRole('button', { name: /proceed to personal details/i });
    fireEvent.click(proceedBtn);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /practitioner identity & underwriting declarations/i })).toBeInTheDocument();
    });

    // Clinic legal entity name should be present and required
    expect(screen.getByLabelText(/clinic registered legal entity name/i)).toBeInTheDocument();

    // Turnover declaration under RM 5,000,000 should be present
    expect(screen.getByLabelText(/revenue eligibility declaration/i)).toBeInTheDocument();
  });

  it('Scenario 3: Add-on Selection, Removal and Authoritative Recalculation', async () => {
    // Initial calculation with GP RM 1M
    const initialQuote = await RatingService.calculatePremium({
      classification_id: '7',
      liability_id: '1m',
      insurance_start_date: '2026-11-01',
      insurance_end_date: '2026-12-31',
      customer_email: 'test@chubb.com.my',
      do_you_own_clinic_status_value: 0,
      medical_establishment_package_value: 0,
    });

    expect(initialQuote.pricing.gross_base).toBeGreaterThan(0);
    expect(initialQuote.pricing.clinic_premium).toBe(0);

    // Calculate with Clinic Add-on (Sole Prop RM 1M)
    const clinicAddon = await RatingService.calculatePremium({
      classification_id: '7',
      liability_id: '1m',
      insurance_start_date: '2026-11-01',
      insurance_end_date: '2026-12-31',
      customer_email: 'test@chubb.com.my',
      do_you_own_clinic_status_value: 1,
      clinic_type_value: 'sole_proprietor',
      clinic_liability_id: '1m',
      medical_establishment_package_value: 1,
      pic_coverage_enable_status_value: 0,
    });

    expect(clinicAddon.pricing.clinic_premium).toBeGreaterThan(0);
    expect(clinicAddon.pricing.pic_premium).toBe(0);

    // Calculate with both Clinic and PIC Add-ons
    const bothAddons = await RatingService.calculatePremium({
      classification_id: '7',
      liability_id: '1m',
      insurance_start_date: '2026-11-01',
      insurance_end_date: '2026-12-31',
      customer_email: 'test@chubb.com.my',
      do_you_own_clinic_status_value: 1,
      clinic_type_value: 'partnership_sdn_bhd',
      clinic_liability_id: '2m',
      medical_establishment_package_value: 1,
      pic_of_own_clinic_or_another_clinic_status_value: 1,
      pic_coverage_enable_status_value: 1,
    });

    expect(bothAddons.pricing.clinic_premium).toBeGreaterThan(clinicAddon.pricing.clinic_premium);
    expect(bothAddons.pricing.pic_premium).toBeGreaterThan(0);

    // Removing PIC coverage returns PIC premium to 0
    const clinicOnlyAgain = await RatingService.calculatePremium({
      classification_id: '7',
      liability_id: '1m',
      insurance_start_date: '2026-11-01',
      insurance_end_date: '2026-12-31',
      customer_email: 'test@chubb.com.my',
      do_you_own_clinic_status_value: 1,
      clinic_type_value: 'partnership_sdn_bhd',
      clinic_liability_id: '2m',
      medical_establishment_package_value: 1,
      pic_of_own_clinic_or_another_clinic_status_value: 0,
      pic_coverage_enable_status_value: 0,
    });

    expect(clinicOnlyAgain.pricing.pic_premium).toBe(0);
  });

  it('Scenario 4: Promotional Code Validation and Discount Application', async () => {
    // Valid partner code MMA2026 -> 10% discount
    const promoMma = await RatingService.checkPromoCode('MMA2026');
    expect(promoMma.is_valid).toBe(true);
    expect(promoMma.discount_percentage).toBe(10);

    // Valid partner code MAAM2026 -> 10% discount
    const promoMaam = await RatingService.checkPromoCode('MAAM2026');
    expect(promoMaam.is_valid).toBe(true);
    expect(promoMaam.discount_percentage).toBe(10);

    // Valid partner code APHM2026 -> 8% discount
    const promoAphm = await RatingService.checkPromoCode('APHM2026');
    expect(promoAphm.is_valid).toBe(true);
    expect(promoAphm.discount_percentage).toBe(8);

    // Invalid code -> error
    const promoInvalid = await RatingService.checkPromoCode('INVALID_CODE_999');
    expect(promoInvalid.is_valid).toBe(false);
    expect(promoInvalid.error_message).toContain('Please enter a valid promo code');
  });

  it('Scenario 5: Adverse Underwriting Declaration triggers Referral with Callback Form', async () => {
    const TestHarness: React.FC = () => {
      const { goToStage, updateCoverage, setQuote } = useWorkflow();
      React.useEffect(() => {
        updateCoverage({
          classificationId: '7',
          customerEmail: 'adverse.applicant@example.com',
          limitOfLiability: '1m',
          startDate: '2026-11-01',
          endDate: '2026-12-31',
        });
        setQuote({
          grossBasePremium: 1000,
          promoDiscount: 0,
          netGrossPremium: 1000,
          sstAmount: 80,
          stampDuty: 10,
          totalPayable: 1090,
          quotationNumber: 'QT-TEST-ADV',
          quoteToken: 'tok_adv_1',
          expiresAt: Date.now() + 900000,
          clinicPremium: 0,
          addonsTotal: 0,
        });
        goToStage(3);
      }, []);
      return <App />;
    };

    render(
      <WorkflowProvider>
        <TestHarness />
      </WorkflowProvider>
    );

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /practitioner identity & underwriting declarations/i })).toBeInTheDocument();
    });

    // Populate valid details
    fireEvent.change(screen.getByLabelText(/full name \(as per nric \/ passport\)/i), { target: { value: 'Dr. Adverse Subject' } });
    fireEvent.change(screen.getByLabelText(/nric number/i), { target: { value: '880101105432' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'adverse.applicant@example.com' } });
    fireEvent.change(screen.getByLabelText(/mmc full registration number/i), { target: { value: 'MMC-99887' } });
    fireEvent.change(screen.getByLabelText(/mobile phone number/i), { target: { value: '019-8765432' } });
    fireEvent.change(screen.getByLabelText(/primary practice facility/i), { target: { value: 'Pantai Hospital' } });
    fireEvent.change(screen.getByLabelText(/practice address line 1/i), { target: { value: 'Jalan Bukit Pantai' } });
    fireEvent.change(screen.getByLabelText(/^postcode/i), { target: { value: '59100' } });
    fireEvent.change(screen.getByLabelText(/^city/i), { target: { value: 'Kuala Lumpur' } });
    fireEvent.change(screen.getByLabelText(/state \/ federal territory/i), { target: { value: 'Wilayah Persekutuan Kuala Lumpur' } });
    fireEvent.change(screen.getByLabelText(/annual gross professional income/i), { target: { value: 'RM 500,000 - RM 1,000,000' } });

    // Adverse 5-year claim: "Disagree"
    const claimDisagree = screen.getByLabelText(/disagree: i have had previous malpractice/i);
    fireEvent.click(claimDisagree);

    // Supply claim description
    const claimDesc = screen.getByPlaceholderText(/enter claim history details/i);
    fireEvent.change(claimDesc, { target: { value: 'Settled misdiagnosis claim in 2024 for RM 45,000.' } });

    // Fill others as clean
    const noRadios = screen.getAllByLabelText(/^no$/i);
    fireEvent.click(noRadios[0]);
    fireEvent.click(noRadios[1]);
    fireEvent.click(noRadios[2]);

    const finalDeclCheckbox = screen.getByLabelText(/i confirm and declare that the statements/i);
    fireEvent.click(finalDeclCheckbox);

    // Submit Stage 3
    const submitBtn = screen.getByRole('button', { name: /proceed to review & payment/i });
    fireEvent.click(submitBtn);

    // Verify Referral Terminal Screen
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /your application has been referred/i })).toBeInTheDocument();
    });

    // Request Callback Form
    expect(screen.getByRole('heading', { name: /request underwriting specialist callback/i })).toBeInTheDocument();
    const phoneInput = screen.getByLabelText(/mobile number/i);
    fireEvent.change(phoneInput, { target: { value: '019-8765432' } });

    const sendCallbackBtn = screen.getByRole('button', { name: /request underwriting specialist callback/i });
    fireEvent.click(sendCallbackBtn);

    await waitFor(() => {
      expect(screen.getByText(/callback request confirmed/i)).toBeInTheDocument();
    });
  });

  it('Scenario 6: Renewal Hub OTP Verification, Cooldown and Channel Switching', async () => {
    // 1. Request OTP via SMS with fresh test phone
    const req1 = await RenewalService.requestOTP({ mobileNumber: '0161112222', channel: 'SMS' });
    expect(req1.success).toBe(true);
    expect(req1.expiresInSeconds).toBe(300);

    // 2. Request OTP again during cooldown must throw
    await expect(RenewalService.requestOTP({ mobileNumber: '0161112222', channel: 'SMS' })).rejects.toThrow(/Please wait/);

    // 3. Switch to WhatsApp channel with different test number
    const reqWhatsApp = await RenewalService.requestOTP({ mobileNumber: '0163334444', channel: 'WHATSAPP' });
    expect(reqWhatsApp.success).toBe(true);

    // 4. Verify with incorrect OTP must reject with remaining attempts notice
    await expect(
      RenewalService.verifyOTP({ mobileNumber: '0163334444', otpCode: '000000' })
    ).rejects.toThrow(/Invalid verification code/);

    // 5. Verify with correct OTP
    const verifyOk = await RenewalService.verifyOTP({ mobileNumber: '0163334444', otpCode: '123456' });
    expect(verifyOk.success).toBe(true);
    expect(verifyOk.policies).toBeDefined();
    expect(verifyOk.policies.length).toBeGreaterThan(0);
  });
});
