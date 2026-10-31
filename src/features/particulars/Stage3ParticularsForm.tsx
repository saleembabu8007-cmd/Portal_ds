import React, { useState, useEffect, useId, useRef } from 'react';
import {
  User,
  Building2,
  FileText,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Shield,
} from 'lucide-react';
import { useWorkflow } from '../../core/state/WorkflowContext';
import { MALAYSIAN_STATES, BranchManager } from './BranchManager';
import { NricPromoSubstitutionModal } from './NricPromoSubstitutionModal';
import { DuplicatePolicyModal } from './DuplicatePolicyModal';
import { RenewalService, CustomerPolicyRecord } from '../../core/api/renewalService';
import { RatingService } from '../../core/api/ratingService';
import { UnderwritingService } from '../../core/api/underwritingService';
import { UnderwritingQuestionnaire } from '../underwriting/UnderwritingQuestionnaire';
import {
  BranchItem,
  UnderwritingDeclarations,
  DoctorProfile,
  INITIAL_UNDERWRITING_DECLARATIONS,
} from '../../core/state/types';
import { InputSanitizer } from '../../core/utils/sanitizer';
import { FieldGroup } from '../../components/form/FieldGroup';
import { Button } from '../../components/ui/Button';

export const SALUTATIONS = [
  'Dr.',
  "Dato' Dr.",
  "Datin Dr.",
  'Prof. Dr.',
  'Assoc. Prof. Dr.',
  'Mr.',
  'Mrs.',
  'Ms.',
];

export const NATIONALITIES = [
  'Malaysia',
  'Singapore',
  'Indonesia',
  'United Kingdom',
  'Australia',
  'India',
  'Other Foreign National',
];

export const INCOME_TIERS = [
  'Less than RM 100,000',
  'RM 100,000 - RM 250,000',
  'RM 250,000 - RM 500,000',
  'RM 500,000 - RM 1,000,000',
  'Exceeding RM 1,000,000',
];

/**
 * Format NRIC as YYMMDD-PB-###G (12 digits with hyphens)
 */
export function formatNricNumber(input: string): string {
  const digits = input.replace(/\D/g, '').slice(0, 12);
  if (digits.length <= 6) return digits;
  if (digits.length <= 8) return `${digits.slice(0, 6)}-${digits.slice(6)}`;
  return `${digits.slice(0, 6)}-${digits.slice(6, 8)}-${digits.slice(8)}`;
}

/**
 * Parse NRIC to extract Date of Birth and Gender
 */
export function parseNric(nric: string): {
  isValid: boolean;
  dob: string;
  gender: 'Male' | 'Female' | '';
  cleanDigits: string;
  errorMessage?: string;
} {
  const digits = nric.replace(/\D/g, '');
  if (digits.length < 12) {
    return { isValid: false, dob: '', gender: '', cleanDigits: digits };
  }

  const yy = parseInt(digits.substring(0, 2), 10);
  const mm = parseInt(digits.substring(2, 4), 10);
  const dd = parseInt(digits.substring(4, 6), 10);

  // Month check
  if (mm < 1 || mm > 12) {
    return {
      isValid: false,
      dob: '',
      gender: '',
      cleanDigits: digits,
      errorMessage: 'Invalid month in NRIC birth date prefix.',
    };
  }

  // Day check
  if (dd < 1 || dd > 31) {
    return {
      isValid: false,
      dob: '',
      gender: '',
      cleanDigits: digits,
      errorMessage: 'Invalid day in NRIC birth date prefix.',
    };
  }

  // Century inference: YY < 30 -> 20YY, YY >= 30 -> 19YY
  const currentYearShort = new Date().getFullYear() % 100;
  const fullYear = yy <= currentYearShort ? 2000 + yy : 1900 + yy;

  // Validate actual calendar date
  const testDate = new Date(fullYear, mm - 1, dd);
  if (
    testDate.getFullYear() !== fullYear ||
    testDate.getMonth() !== mm - 1 ||
    testDate.getDate() !== dd
  ) {
    return {
      isValid: false,
      dob: '',
      gender: '',
      cleanDigits: digits,
      errorMessage: 'Invalid calendar date in NRIC birth date prefix.',
    };
  }

  const formattedDob = `${String(dd).padStart(2, '0')}/${String(mm).padStart(2, '0')}/${fullYear}`;

  // 12th digit represents gender (Odd = Male, Even = Female)
  const lastDigit = parseInt(digits[11], 10);
  const derivedGender: 'Male' | 'Female' = lastDigit % 2 === 1 ? 'Male' : 'Female';

  return {
    isValid: true,
    dob: formattedDob,
    gender: derivedGender,
    cleanDigits: digits,
  };
}

/**
 * DoctorShield Stage 3: Personal Particulars & Statutory Underwriting Form
 * Standard: Direction B (Kanit 500 headings, Inter 400/500 body, 46px controls, 6px radius)
 */
export const Stage3ParticularsForm: React.FC = () => {
  const {
    doctorProfile,
    updateDoctorProfile,
    coverage,
    updateCoverage,
    goToStage,
    triggerReferral,
    announce,
  } = useWorkflow();

  // Accessibility IDs
  const salutationId = useId();
  const fullNameId = useId();
  const idTypeId = useId();
  const nricInputId = useId();
  const passportInputId = useId();
  const dobId = useId();
  const genderId = useId();
  const nationalityId = useId();
  const countryNameId = useId();
  const mmcNumberId = useId();
  const emailId = useId();
  const mobilePhoneId = useId();
  const tinId = useId();
  const practiceLocationId = useId();
  const clinicalNameId = useId();
  const line1Id = useId();
  const line2Id = useId();
  const postcodeId = useId();
  const cityId = useId();
  const stateId = useId();
  const incomeId = useId();
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  // Form State initialized from persistent storage
  const [salutation, setSalutation] = useState(doctorProfile.salutation || 'Dr.');
  const [fullName, setFullName] = useState(doctorProfile.fullName || '');
  const [idType, setIdType] = useState<'nric' | 'passport'>(doctorProfile.idType || 'nric');
  const [nric, setNric] = useState(doctorProfile.nric || '');
  const [passportNumber, setPassportNumber] = useState(
    doctorProfile.idType === 'passport' ? doctorProfile.nric : ''
  );
  const [dob, setDob] = useState(doctorProfile.dob || '');
  const [gender, setGender] = useState<'Male' | 'Female' | ''>(doctorProfile.gender || '');
  const [nationality, setNationality] = useState(doctorProfile.nationality || 'Malaysia');
  const [countryName, setCountryName] = useState(doctorProfile.countryName || '');
  const [mmcNumber, setMmcNumber] = useState(doctorProfile.mmcNumber || '');
  const [email, setEmail] = useState(doctorProfile.email || coverage.customerEmail || '');
  const [mobilePhone, setMobilePhone] = useState(doctorProfile.mobilePhone || '');
  const [tin, setTin] = useState(doctorProfile.tin || '');

  // Practice Details
  const [practiceLocation, setPracticeLocation] = useState(doctorProfile.practiceLocation || '');
  const [clinicalName, setClinicalName] = useState(doctorProfile.clinicalName || '');
  const [line1, setLine1] = useState(doctorProfile.practiceAddress?.line1 || '');
  const [line2, setLine2] = useState(doctorProfile.practiceAddress?.line2 || '');
  const [postcode, setPostcode] = useState(doctorProfile.practiceAddress?.postcode || '');
  const [city, setCity] = useState(doctorProfile.practiceAddress?.city || '');
  const [state, setState] = useState(doctorProfile.practiceAddress?.state || '');
  const [income, setIncome] = useState(doctorProfile.income || '');

  // Branches & Revenue Confirmation
  const [branches, setBranches] = useState<BranchItem[]>(doctorProfile.branches || []);
  const [branchRevenueConfirmed, setBranchRevenueConfirmed] = useState(
    doctorProfile.branchRevenueConfirmed || false
  );

  // Underwriting Declarations
  const [declarations, setDeclarations] = useState<UnderwritingDeclarations>(
    doctorProfile.declarations || INITIAL_UNDERWRITING_DECLARATIONS
  );

  // Validation & Error state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  // NRIC Promo Substitution Modal state
  const [promoModalOpen, setPromoModalOpen] = useState(false);
  const [substitutedPromoCode, setSubstitutedPromoCode] = useState('');
  const [substitutedDiscount, setSubstitutedDiscount] = useState(10);
  const [promoSubstitutionMsg, setPromoSubstitutionMsg] = useState('');
  const [lastCheckedNric, setLastCheckedNric] = useState('');

  // Duplicate Active Policy Detection Modal (MODAL-18 #jsAlreadyBoughtModal)
  const [duplicateRecord, setDuplicateRecord] = useState<CustomerPolicyRecord | null>(null);
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState(false);

  // Sync updates back to context so back-nav never loses data
  useEffect(() => {
    updateDoctorProfile({
      salutation,
      fullName,
      idType,
      nric: idType === 'nric' ? nric : passportNumber,
      dob,
      gender,
      nationality,
      countryName,
      mmcNumber,
      email,
      mobilePhone,
      tin,
      practiceLocation,
      clinicalName,
      income,
      practiceAddress: {
        line1,
        line2,
        postcode,
        city,
        state,
      },
      branches,
      branchRevenueConfirmed,
      declarations,
    });
  }, [
    salutation,
    fullName,
    idType,
    nric,
    passportNumber,
    dob,
    gender,
    nationality,
    countryName,
    mmcNumber,
    email,
    mobilePhone,
    tin,
    practiceLocation,
    clinicalName,
    income,
    line1,
    line2,
    postcode,
    city,
    state,
    branches,
    branchRevenueConfirmed,
    declarations,
    updateDoctorProfile,
  ]);

  // Handle NRIC Input with Auto-formatting and Extraction
  const handleNricChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const formatted = formatNricNumber(rawVal);
    setNric(formatted);

    // Clear previous NRIC error
    if (errors.nric) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.nric;
        return copy;
      });
    }

    const clean = formatted.replace(/\D/g, '');
    if (clean.length === 12) {
      const parsed = parseNric(formatted);
      if (parsed.isValid) {
        setDob(parsed.dob);
        setGender(parsed.gender);
        announce(`Auto-extracted Date of Birth: ${parsed.dob}, Gender: ${parsed.gender}`);

        // Check NRIC promo code substitution for existing customer (RULE-PROM-02)
        if (clean !== lastCheckedNric) {
          setLastCheckedNric(clean);
          try {
            // 1. Check for Active In-Force Policy (MODAL-18 #jsAlreadyBoughtModal)
            const customerCheck = await RenewalService.lookupCustomerByNric(clean);
            if (customerCheck.hasActivePolicy && customerCheck.policyRecord) {
              setDuplicateRecord(customerCheck.policyRecord);
              setIsDuplicateModalOpen(true);
              announce(
                `Notice: Active Chubb policy ${customerCheck.policyRecord.policyNumber} already exists for this NRIC.`
              );
            }

            // 2. Check for Promotional Code Substitution
            const check = await RatingService.checkNricPromoCode(clean, coverage.promoCode);
            if (check.is_existing_customer && check.substituted_code) {
              setSubstitutedPromoCode(check.substituted_code);
              setSubstitutedDiscount(check.discount_percentage || 10.0);
              setPromoSubstitutionMsg(check.message || '');
              setPromoModalOpen(true);
            }
          } catch {
            // Non-blocking
          }
        }
      } else if (parsed.errorMessage) {
        setErrors((prev) => ({
          ...prev,
          nric: parsed.errorMessage || 'Invalid NRIC date prefix.',
        }));
      }
    } else {
      // Clear auto-derived fields if NRIC incomplete
      if (dob && idType === 'nric') setDob('');
      if (gender && idType === 'nric') setGender('');
    }
  };

  const handleAcceptSubstitutedPromo = (newCode: string) => {
    setPromoModalOpen(false);
    updateCoverage({
      promoCode: newCode,
      promoDiscount: substitutedDiscount,
    });
    announce(`Promo code updated to renewal discount ${newCode}`);
  };

  // Branch updates handler
  const handleBranchesChange = (newBranches: BranchItem[]) => {
    setBranches(newBranches);
    updateCoverage({
      addons: {
        ...coverage.addons,
        branchCount: newBranches.length,
      },
    });
  };

  // Revenue Exceeds Referral Handler
  const handleExceedsRevenueReferral = () => {
    triggerReferral(
      'Combined clinic turnover exceeds RM 5,000,000 threshold. Corporate underwriting review is required.'
    );
  };

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // 1. Identity
    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full legal name as per NRIC/Passport.';
    }

    if (idType === 'nric') {
      const cleanNric = nric.replace(/\D/g, '');
      if (cleanNric.length !== 12) {
        newErrors.nric = 'Please enter a valid 12-digit Malaysian NRIC number.';
      } else {
        const parsed = parseNric(nric);
        if (!parsed.isValid) {
          newErrors.nric = parsed.errorMessage || 'Invalid NRIC format.';
        }
      }
    } else {
      if (!passportNumber.trim()) {
        newErrors.passportNumber = 'Please enter your passport number.';
      }
    }

    if (!dob.trim()) {
      newErrors.dob = 'Date of birth is required.';
    }

    if (!gender) {
      newErrors.gender = 'Gender is required.';
    }

    if (nationality !== 'Malaysia' && !countryName.trim()) {
      newErrors.countryName = 'Please enter your country of citizenship.';
    }

    if (!mmcNumber.trim()) {
      newErrors.mmcNumber = 'Please enter your MMC Full Registration Number.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    const cleanPhone = mobilePhone.replace(/[\s-]/g, '');
    if (!cleanPhone || cleanPhone.length < 9) {
      newErrors.mobilePhone = 'Please enter a valid Malaysian mobile number (e.g. 012-3456789).';
    }

    // 2. Practice Details
    if (!practiceLocation.trim()) {
      newErrors.practiceLocation =
        'Please enter your primary hospital, clinic or practice facility.';
    }

    const ownsClinic =
      coverage.clinic?.ownsClinic === true || coverage.addons.clinicPackage === true;
    if (ownsClinic && !clinicalName.trim()) {
      newErrors.clinicalName = 'Please enter the registered legal entity name of your clinic.';
    }

    if (!line1.trim()) {
      newErrors.line1 = 'Please enter your practice address.';
    }

    const cleanPostcode = postcode.trim();
    if (!cleanPostcode || !/^\d{5}$/.test(cleanPostcode)) {
      newErrors.postcode = 'Please enter a valid 5-digit Malaysian postcode.';
    }

    if (!city.trim()) {
      newErrors.city = 'Please enter your city.';
    }

    if (!state) {
      newErrors.state = 'Please select your state.';
    }

    if (!income) {
      newErrors.income = 'Please select your annual gross professional income range.';
    }

    // 3. Branch Combined Revenue Declaration Check (if clinic package or branches)
    if (ownsClinic && !branchRevenueConfirmed) {
      newErrors.branchRevenueConfirmed =
        'You must confirm that total annual clinic turnover is under RM 5,000,000.';
    }

    // 4. Statutory Underwriting Declarations
    if (!declarations.haveClaimEverBeenMade) {
      newErrors.haveClaimEverBeenMade = 'Please answer the 5-year claims history declaration.';
    } else if (
      declarations.haveClaimEverBeenMade === 'disagree' &&
      !declarations.noClaimDesc.trim()
    ) {
      newErrors.noClaimDesc = 'Please provide particulars and settlement status of previous claims.';
    }

    if (!declarations.awareOfErrors) {
      newErrors.awareOfErrors = 'Please answer the awareness of circumstances question.';
    } else if (declarations.awareOfErrors === 'yes' && !declarations.awareOfErrorsDesc.trim()) {
      newErrors.awareOfErrorsDesc = 'Please describe the incident and potential claim details.';
    }

    if (!declarations.haveBeenDisciplinaryAction) {
      newErrors.haveBeenDisciplinaryAction = 'Please answer the disciplinary proceedings question.';
    } else if (
      declarations.haveBeenDisciplinaryAction === 'yes' &&
      !declarations.disciplinaryActionDesc.trim()
    ) {
      newErrors.disciplinaryActionDesc =
        'Please provide particulars of the disciplinary inquiry and outcome.';
    }

    if (!declarations.hadCriminalCharges) {
      newErrors.hadCriminalCharges = 'Please answer the criminal offences/convictions question.';
    } else if (
      declarations.hadCriminalCharges === 'yes' &&
      !declarations.criminalChargesDesc.trim()
    ) {
      newErrors.criminalChargesDesc = 'Please provide details of criminal charges or proceedings.';
    }

    // Clinic Underwriting Declarations (if clinicPackage active)
    if (coverage.addons.clinicPackage) {
      if (!declarations.clinicHaveClaimEverBeenMade) {
        newErrors.clinicHaveClaimEverBeenMade =
          'Please answer the clinic claims history question.';
      }
      if (!declarations.clinicAwareOfErrors) {
        newErrors.clinicAwareOfErrors = 'Please answer the clinic circumstances question.';
      }
      if (!declarations.clinicHaveBeenDisciplinaryAction) {
        newErrors.clinicHaveBeenDisciplinaryAction =
          'Please answer the clinic regulatory/CKAPS inquiry question.';
      }

      const hasClinicAffirmative =
        declarations.clinicHaveClaimEverBeenMade === 'yes' ||
        declarations.clinicAwareOfErrors === 'yes' ||
        declarations.clinicHaveBeenDisciplinaryAction === 'yes';

      if (hasClinicAffirmative && !(declarations.clinicAnswers || '').trim()) {
        newErrors.clinicAnswers = 'Please provide details of clinic claims, incidents, or inquiries.';
      }

      if (!declarations.clinicHadCriminalCharges) {
        newErrors.clinicHadCriminalCharges = 'Please answer the clinic criminal offences question.';
      } else if (
        declarations.clinicHadCriminalCharges === 'yes' &&
        !(declarations.clinicCriminalChargesDesc || '').trim()
      ) {
        newErrors.clinicCriminalChargesDesc =
          'Please provide details of clinic criminal proceedings.';
      }
    }

    // COVID-19 Conditional Questionnaire validation
    if (declarations.isCovidQuestionnaireActive) {
      if (
        declarations.policySurroundingCovid19 === 'yes' &&
        !(declarations.policySurroundingCovid19Desc || '').trim()
      ) {
        newErrors.policySurroundingCovid19Desc = 'Please explain COVID-19 sanctions/fines.';
      }
      if (!declarations.applicantDeclareForCovid19) {
        newErrors.applicantDeclareForCovid19 =
          'Please accept the final COVID-19 risk declaration (LEG-COVID-001).';
      }
    }

    // Final Statutory Underwriting Truth Declaration (LEG-DECL-001)
    if (!declarations.finalDeclarationAccepted) {
      newErrors.finalDeclarationAccepted =
        'You must confirm and accept the Statutory Underwriting Truth Declaration (Schedule 9 FSA 2013) before proceeding.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    if (!validateForm()) {
      announce('Form has errors. Please check the highlighted fields.');
      if (errorSummaryRef.current) {
        errorSummaryRef.current.focus();
        if (typeof errorSummaryRef.current.scrollIntoView === 'function') {
          errorSummaryRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      return;
    }

    // Save final state with input sanitization
    const sanitizedFullName = InputSanitizer.sanitizeText(fullName, 120);
    const sanitizedPracticeLocation = InputSanitizer.sanitizeText(practiceLocation, 200);
    const sanitizedClinicalName = InputSanitizer.sanitizeText(clinicalName, 200);
    const sanitizedTin = InputSanitizer.sanitizeText(tin, 50);
    const sanitizedPassport = InputSanitizer.sanitizeText(passportNumber, 50);
    const sanitizedCountry = InputSanitizer.sanitizeText(countryName, 100);
    const sanitizedMmc = InputSanitizer.sanitizeText(mmcNumber, 50);
    const sanitizedEmail = InputSanitizer.sanitizeText(email.trim(), 120);
    const sanitizedPhone = InputSanitizer.sanitizeText(mobilePhone.trim(), 30);
    const sanitizedLine1 = InputSanitizer.sanitizeText(line1, 200);
    const sanitizedLine2 = InputSanitizer.sanitizeText(line2, 200);
    const sanitizedCity = InputSanitizer.sanitizeText(city, 100);
    const sanitizedPostcode = InputSanitizer.sanitizeText(postcode.trim(), 10);

    const finalProfile: DoctorProfile = {
      salutation,
      fullName: sanitizedFullName,
      idType,
      nric: idType === 'nric' ? nric : sanitizedPassport,
      dob,
      gender,
      nationality,
      countryName: sanitizedCountry,
      mmcNumber: sanitizedMmc,
      email: sanitizedEmail,
      mobilePhone: sanitizedPhone,
      tin: sanitizedTin,
      practiceLocation: sanitizedPracticeLocation,
      clinicalName: sanitizedClinicalName,
      income,
      practiceAddress: {
        line1: sanitizedLine1,
        line2: sanitizedLine2,
        postcode: sanitizedPostcode,
        city: sanitizedCity,
        state,
      },
      branches,
      branchRevenueConfirmed,
      declarations,
    };

    updateDoctorProfile(finalProfile);

    // Authoritative Underwriting Evaluation (UNDERWRITING_DECISION_TREE.md)
    const uwEval = UnderwritingService.evaluateUnderwritingRisk(finalProfile, coverage);

    if (uwEval.outcome === 'REJECT' || uwEval.outcome === 'REFERRAL') {
      const reasonMsg =
        uwEval.referralReasons.length > 0
          ? uwEval.referralReasons.join('; ')
          : 'Statutory Underwriting Declaration: Affirmative adverse history requires individual Chubb underwriter review.';
      triggerReferral(reasonMsg);
    } else {
      goToStage(4);
    }
  };

  const handleBackToQuote = () => {
    // Preserve all entered state in context
    updateDoctorProfile({
      salutation,
      fullName,
      idType,
      nric: idType === 'nric' ? nric : passportNumber,
      dob,
      gender,
      nationality,
      countryName,
      mmcNumber,
      email,
      mobilePhone,
      tin,
      practiceLocation,
      clinicalName,
      income,
      practiceAddress: {
        line1,
        line2,
        postcode,
        city,
        state,
      },
      branches,
      branchRevenueConfirmed,
      declarations,
    });
    goToStage(2);
  };

  const isClinicPackageActive =
    coverage.clinic?.ownsClinic === true || coverage.addons.clinicPackage === true;

  const fieldInputStyle = (hasError: boolean, isReadonly = false): React.CSSProperties => ({
    width: '100%',
    height: 'var(--ds-comp-input-height, 46px)',
    padding: '0 14px',
    borderRadius: 'var(--ds-comp-input-radius, 6px)',
    border: `1px solid ${hasError ? 'var(--ds-color-status-error, #B91C1C)' : 'var(--ds-comp-input-border, #CBD5E1)'}`,
    backgroundColor: isReadonly ? 'var(--ds-primitive-color-slate-100, #F1F5F9)' : '#FFFFFF',
    fontSize: 'var(--ds-comp-input-font-size, 16px)',
    fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
    color: 'var(--ds-color-navy-900, #0F172A)',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
  });

  const fieldLabelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 500,
    fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
    color: 'var(--ds-color-navy-900, #0F172A)',
    marginBottom: '6px',
  };

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', paddingBottom: '48px' }}>
      {/* Stage Header */}
      <div style={{ marginBottom: '28px' }}>
        <div
          style={{
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--ds-color-brand-primary, #08A5B5)',
            fontWeight: 600,
            marginBottom: '6px',
            fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
          }}
        >
          Stage 3 of 4: Personal Particulars & Statutory Underwriting
        </div>

        <h1
          style={{
            fontFamily: 'var(--ds-primitive-font-heading, "Kanit", sans-serif)',
            fontSize: '1.875rem',
            fontWeight: 500,
            color: 'var(--ds-color-navy-900, #132766)',
            margin: '0 0 8px 0',
            lineHeight: 1.25,
          }}
        >
          Practitioner Identity & Underwriting Declarations
        </h1>

        <p
          style={{
            fontSize: 'var(--ds-primitive-font-size-base, 14.5px)',
            color: 'var(--ds-color-text-secondary, #475569)',
            margin: 0,
            lineHeight: 1.5,
            fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
          }}
        >
          Please provide your legal identification, medical registration, and practice details.
          All personal particulars are securely protected under the Personal Data Protection Act
          2010 (PDPA).
        </p>
      </div>

      {/* Error Summary Banner (if submission failed) */}
      {hasAttemptedSubmit && Object.keys(errors).length > 0 && (
        <div
          ref={errorSummaryRef}
          tabIndex={-1}
          role="alert"
          aria-live="assertive"
          style={{
            backgroundColor: 'var(--ds-color-status-error-bg, #FEF2F2)',
            border: '1px solid var(--ds-color-status-error-border, #FECACA)',
            borderRadius: 'var(--ds-radius-md, 6px)',
            padding: '16px 20px',
            marginBottom: '28px',
            outline: 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <AlertCircle size={18} color="var(--ds-color-status-error, #B91C1C)" />
            <h2
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--ds-color-status-error, #B91C1C)',
                margin: 0,
                fontFamily: 'var(--ds-primitive-font-heading, "Kanit", sans-serif)',
              }}
            >
              Please correct the following errors before proceeding:
            </h2>
          </div>
          <ul
            style={{
              margin: '0 0 0 24px',
              padding: 0,
              color: 'var(--ds-color-status-error, #B91C1C)',
              fontSize: '13px',
              lineHeight: 1.5,
            }}
          >
            {Object.entries(errors).map(([field, msg]) => (
              <li key={field} style={{ marginBottom: '4px' }}>
                {msg}
              </li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Main Clean Form Surface */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--ds-color-border-subtle, #E2E8F0)',
            borderRadius: 'var(--ds-radius-lg, 8px)',
            padding: '32px',
            marginBottom: '24px',
            boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
          }}
        >
          {/* SECTION 1: Personal Identity Particulars */}
          <FieldGroup
            title="1. Practitioner Identification"
            description="Malaysian Medical Council registration and applicant identification details"
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '16px 20px',
              }}
            >
              {/* Salutation */}
              <div>
                <label htmlFor={salutationId} style={fieldLabelStyle}>
                  Title / Salutation <span style={{ color: '#B91C1C' }}>*</span>
                </label>
                <select
                  id={salutationId}
                  value={salutation}
                  onChange={(e) => setSalutation(e.target.value)}
                  style={{ ...fieldInputStyle(false), cursor: 'pointer' }}
                >
                  {SALUTATIONS.map((sal) => (
                    <option key={sal} value={sal}>
                      {sal}
                    </option>
                  ))}
                </select>
              </div>

              {/* Full Name */}
              <div style={{ gridColumn: 'span 2' }}>
                <label htmlFor={fullNameId} style={fieldLabelStyle}>
                  Full Name (as per NRIC / Passport) <span style={{ color: '#B91C1C' }}>*</span>
                </label>
                <input
                  id={fullNameId}
                  type="text"
                  value={fullName}
                  placeholder="e.g. DR MUHAMMAD SALEEM BIN ABDULLAH"
                  onChange={(e) => {
                    setFullName(e.target.value.toUpperCase());
                    if (errors.fullName) {
                      setErrors((prev) => {
                        const copy = { ...prev };
                        delete copy.fullName;
                        return copy;
                      });
                    }
                  }}
                  aria-required="true"
                  aria-invalid={!!errors.fullName}
                  style={fieldInputStyle(!!errors.fullName)}
                />
                {errors.fullName && (
                  <p style={{ color: 'var(--ds-color-status-error, #B91C1C)', fontSize: '12px', margin: '4px 0 0 0' }}>
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* ID Type Switch */}
              <div>
                <label htmlFor={idTypeId} style={fieldLabelStyle}>
                  Identification Type <span style={{ color: '#B91C1C' }}>*</span>
                </label>
                <div
                  id={idTypeId}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    minHeight: '46px',
                    alignItems: 'center',
                  }}
                >
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13.5px',
                      cursor: 'pointer',
                      padding: '10px 16px',
                      borderRadius: 'var(--ds-radius-md, 6px)',
                      backgroundColor:
                        idType === 'nric'
                          ? 'var(--ds-primitive-color-teal-50, #F0FDFA)'
                          : '#FFFFFF',
                      border: `1px solid ${
                        idType === 'nric'
                          ? 'var(--ds-color-brand-primary, #08A5B5)'
                          : 'var(--ds-color-border-default, #CBD5E1)'
                      }`,
                      transition: 'all 0.15s ease',
                      flex: 1,
                    }}
                  >
                    <input
                      type="radio"
                      name="idType"
                      checked={idType === 'nric'}
                      onChange={() => setIdType('nric')}
                      style={{
                        width: '16px',
                        height: '16px',
                        accentColor: 'var(--ds-color-brand-primary, #08A5B5)',
                      }}
                    />
                    <span style={{ color: 'var(--ds-color-navy-900, #0F172A)', fontWeight: 500 }}>
                      Malaysian NRIC
                    </span>
                  </label>

                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13.5px',
                      cursor: 'pointer',
                      padding: '10px 16px',
                      borderRadius: 'var(--ds-radius-md, 6px)',
                      backgroundColor:
                        idType === 'passport'
                          ? 'var(--ds-primitive-color-teal-50, #F0FDFA)'
                          : '#FFFFFF',
                      border: `1px solid ${
                        idType === 'passport'
                          ? 'var(--ds-color-brand-primary, #08A5B5)'
                          : 'var(--ds-color-border-default, #CBD5E1)'
                      }`,
                      transition: 'all 0.15s ease',
                      flex: 1,
                    }}
                  >
                    <input
                      type="radio"
                      name="idType"
                      checked={idType === 'passport'}
                      onChange={() => setIdType('passport')}
                      style={{
                        width: '16px',
                        height: '16px',
                        accentColor: 'var(--ds-color-brand-primary, #08A5B5)',
                      }}
                    />
                    <span style={{ color: 'var(--ds-color-navy-900, #0F172A)', fontWeight: 500 }}>
                      Passport
                    </span>
                  </label>
                </div>
              </div>

              {/* NRIC or Passport Number */}
              {idType === 'nric' ? (
                <div>
                  <label htmlFor={nricInputId} style={fieldLabelStyle}>
                    NRIC Number <span style={{ color: '#B91C1C' }}>*</span>
                  </label>
                  <input
                    id={nricInputId}
                    type="text"
                    inputMode="numeric"
                    value={nric}
                    placeholder="e.g. 850412-14-5231"
                    maxLength={14}
                    onChange={handleNricChange}
                    aria-required="true"
                    aria-invalid={!!errors.nric}
                    style={{
                      ...fieldInputStyle(!!errors.nric),
                      fontFamily: 'monospace',
                      letterSpacing: '0.05em',
                    }}
                  />
                  <span
                    style={{
                      fontSize: '11.5px',
                      color: 'var(--ds-color-text-secondary, #64748B)',
                      display: 'block',
                      marginTop: '4px',
                    }}
                  >
                    Format: YYMMDD-PB-###G (DOB & Gender auto-extracted)
                  </span>
                  {errors.nric && (
                    <p style={{ color: 'var(--ds-color-status-error, #B91C1C)', fontSize: '12px', margin: '4px 0 0 0' }}>
                      {errors.nric}
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  <label htmlFor={passportInputId} style={fieldLabelStyle}>
                    Passport Number <span style={{ color: '#B91C1C' }}>*</span>
                  </label>
                  <input
                    id={passportInputId}
                    type="text"
                    value={passportNumber}
                    placeholder="e.g. A12345678"
                    onChange={(e) => setPassportNumber(e.target.value.toUpperCase())}
                    aria-required="true"
                    aria-invalid={!!errors.passportNumber}
                    style={fieldInputStyle(!!errors.passportNumber)}
                  />
                  {errors.passportNumber && (
                    <p style={{ color: 'var(--ds-color-status-error, #B91C1C)', fontSize: '12px', margin: '4px 0 0 0' }}>
                      {errors.passportNumber}
                    </p>
                  )}
                </div>
              )}

              {/* Date of Birth */}
              <div>
                <label htmlFor={dobId} style={fieldLabelStyle}>
                  Date of Birth {idType === 'nric' ? '(Auto)' : ''} <span style={{ color: '#B91C1C' }}>*</span>
                </label>
                <input
                  id={dobId}
                  type="text"
                  value={dob}
                  readOnly={idType === 'nric'}
                  onChange={(e) => setDob(e.target.value)}
                  placeholder="DD/MM/YYYY"
                  style={fieldInputStyle(!!errors.dob, idType === 'nric')}
                />
                {errors.dob && (
                  <p style={{ color: 'var(--ds-color-status-error, #B91C1C)', fontSize: '12px', margin: '4px 0 0 0' }}>
                    {errors.dob}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label htmlFor={genderId} style={fieldLabelStyle}>
                  Gender {idType === 'nric' ? '(Auto)' : ''} <span style={{ color: '#B91C1C' }}>*</span>
                </label>
                {idType === 'nric' ? (
                  <input
                    id={genderId}
                    type="text"
                    value={gender}
                    readOnly
                    placeholder="Extracted from NRIC"
                    style={fieldInputStyle(!!errors.gender, true)}
                  />
                ) : (
                  <select
                    id={genderId}
                    value={gender}
                    onChange={(e) => setGender(e.target.value as 'Male' | 'Female')}
                    style={{ ...fieldInputStyle(!!errors.gender), cursor: 'pointer' }}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                )}
                {errors.gender && (
                  <p style={{ color: 'var(--ds-color-status-error, #B91C1C)', fontSize: '12px', margin: '4px 0 0 0' }}>
                    {errors.gender}
                  </p>
                )}
              </div>

              {/* Nationality */}
              <div>
                <label htmlFor={nationalityId} style={fieldLabelStyle}>
                  Nationality <span style={{ color: '#B91C1C' }}>*</span>
                </label>
                <select
                  id={nationalityId}
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  style={{ ...fieldInputStyle(false), cursor: 'pointer' }}
                >
                  {NATIONALITIES.map((nat) => (
                    <option key={nat} value={nat}>
                      {nat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Conditional Foreign Country Name */}
              {nationality !== 'Malaysia' && (
                <div>
                  <label htmlFor={countryNameId} style={fieldLabelStyle}>
                    Country of Citizenship <span style={{ color: '#B91C1C' }}>*</span>
                  </label>
                  <input
                    id={countryNameId}
                    type="text"
                    value={countryName}
                    placeholder="e.g. United Kingdom"
                    onChange={(e) => setCountryName(e.target.value)}
                    style={fieldInputStyle(!!errors.countryName)}
                  />
                  {errors.countryName && (
                    <p style={{ color: 'var(--ds-color-status-error, #B91C1C)', fontSize: '12px', margin: '4px 0 0 0' }}>
                      {errors.countryName}
                    </p>
                  )}
                </div>
              )}

              {/* MMC Full Registration Number */}
              <div>
                <label htmlFor={mmcNumberId} style={fieldLabelStyle}>
                  MMC Full Registration Number <span style={{ color: '#B91C1C' }}>*</span>
                </label>
                <input
                  id={mmcNumberId}
                  type="text"
                  inputMode="numeric"
                  value={mmcNumber}
                  placeholder="e.g. 54321"
                  onChange={(e) => setMmcNumber(e.target.value)}
                  aria-required="true"
                  aria-invalid={!!errors.mmcNumber}
                  style={fieldInputStyle(!!errors.mmcNumber)}
                />
                <span
                  style={{
                    fontSize: '11.5px',
                    color: 'var(--ds-color-text-secondary, #64748B)',
                    display: 'block',
                    marginTop: '4px',
                  }}
                >
                  Full registration with Malaysian Medical Council (APC prerequisite)
                </span>
                {errors.mmcNumber && (
                  <p style={{ color: 'var(--ds-color-status-error, #B91C1C)', fontSize: '12px', margin: '4px 0 0 0' }}>
                    {errors.mmcNumber}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label htmlFor={emailId} style={fieldLabelStyle}>
                  Email Address <span style={{ color: '#B91C1C' }}>*</span>
                </label>
                <input
                  id={emailId}
                  type="email"
                  value={email}
                  placeholder="doctor@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  style={fieldInputStyle(!!errors.email)}
                />
                {errors.email && (
                  <p style={{ color: 'var(--ds-color-status-error, #B91C1C)', fontSize: '12px', margin: '4px 0 0 0' }}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Mobile Phone */}
              <div>
                <label htmlFor={mobilePhoneId} style={fieldLabelStyle}>
                  Mobile Phone Number <span style={{ color: '#B91C1C' }}>*</span>
                </label>
                <input
                  id={mobilePhoneId}
                  type="tel"
                  inputMode="tel"
                  value={mobilePhone}
                  placeholder="e.g. 012-3456789"
                  onChange={(e) => setMobilePhone(e.target.value)}
                  aria-required="true"
                  aria-invalid={!!errors.mobilePhone}
                  style={fieldInputStyle(!!errors.mobilePhone)}
                />
                <span
                  style={{
                    fontSize: '11.5px',
                    color: 'var(--ds-color-text-secondary, #64748B)',
                    display: 'block',
                    marginTop: '4px',
                  }}
                >
                  Used for SMS policy updates and Chubb payment OTP verification
                </span>
                {errors.mobilePhone && (
                  <p style={{ color: 'var(--ds-color-status-error, #B91C1C)', fontSize: '12px', margin: '4px 0 0 0' }}>
                    {errors.mobilePhone}
                  </p>
                )}
              </div>

              {/* Tax Identification Number (TIN / LHDN) */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                  <label htmlFor={tinId} style={{ ...fieldLabelStyle, marginBottom: 0 }}>
                    Tax Identification Number (LHDN TIN)
                  </label>
                  <span style={{ fontSize: '12px', color: 'var(--ds-color-text-muted, #94A3B8)' }}>
                    (Optional)
                  </span>
                </div>
                <input
                  id={tinId}
                  type="text"
                  value={tin}
                  placeholder="e.g. IG12345678900"
                  onChange={(e) => setTin(e.target.value.toUpperCase())}
                  style={fieldInputStyle(false)}
                />
                <span
                  style={{
                    fontSize: '11.5px',
                    color: 'var(--ds-color-text-secondary, #64748B)',
                    display: 'block',
                    marginTop: '4px',
                  }}
                >
                  Facilitates Malaysian Inland Revenue Board (LHDN) e-Invoicing
                </span>
              </div>
            </div>
          </FieldGroup>

          {/* SECTION 2: Professional Practice Particulars */}
          <FieldGroup
            title="2. Professional Practice Particulars"
            description="Primary medical practice establishment and registered clinical address"
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '16px 20px',
              }}
            >
              {/* Primary Practice Location */}
              <div style={{ gridColumn: 'span 2' }}>
                <label htmlFor={practiceLocationId} style={fieldLabelStyle}>
                  Primary Practice Facility / Hospital / Clinic Name <span style={{ color: '#B91C1C' }}>*</span>
                </label>
                <input
                  id={practiceLocationId}
                  type="text"
                  value={practiceLocation}
                  placeholder="e.g. Pantai Hospital Kuala Lumpur or Klinik Kesihatan Bangsar"
                  onChange={(e) => setPracticeLocation(e.target.value)}
                  aria-required="true"
                  aria-invalid={!!errors.practiceLocation}
                  style={fieldInputStyle(!!errors.practiceLocation)}
                />
                {errors.practiceLocation && (
                  <p style={{ color: 'var(--ds-color-status-error, #B91C1C)', fontSize: '12px', margin: '4px 0 0 0' }}>
                    {errors.practiceLocation}
                  </p>
                )}
              </div>

              {/* Clinic Legal Entity Name (Conditional if ownsClinic) */}
              {isClinicPackageActive && (
                <div style={{ gridColumn: 'span 2' }}>
                  <label htmlFor={clinicalNameId} style={fieldLabelStyle}>
                    Clinic Registered Legal Entity Name <span style={{ color: '#B91C1C' }}>*</span>
                  </label>
                  <input
                    id={clinicalNameId}
                    type="text"
                    value={clinicalName}
                    placeholder="e.g. Dr Saleem Medical Clinic Sdn Bhd or Klinik Saleem"
                    onChange={(e) => setClinicalName(e.target.value)}
                    aria-required="true"
                    aria-invalid={!!errors.clinicalName}
                    style={fieldInputStyle(!!errors.clinicalName)}
                  />
                  <span
                    style={{
                      fontSize: '11.5px',
                      color: 'var(--ds-color-text-secondary, #64748B)',
                      display: 'block',
                      marginTop: '4px',
                    }}
                  >
                    As registered under SSM / MOH CKAPS licensing
                  </span>
                  {errors.clinicalName && (
                    <p style={{ color: 'var(--ds-color-status-error, #B91C1C)', fontSize: '12px', margin: '4px 0 0 0' }}>
                      {errors.clinicalName}
                    </p>
                  )}
                </div>
              )}

              {/* Address Line 1 */}
              <div style={{ gridColumn: 'span 2' }}>
                <label htmlFor={line1Id} style={fieldLabelStyle}>
                  Practice Address Line 1 <span style={{ color: '#B91C1C' }}>*</span>
                </label>
                <input
                  id={line1Id}
                  type="text"
                  value={line1}
                  placeholder="Suite / Unit / Street name"
                  onChange={(e) => setLine1(e.target.value)}
                  aria-required="true"
                  aria-invalid={!!errors.line1}
                  style={fieldInputStyle(!!errors.line1)}
                />
                {errors.line1 && (
                  <p style={{ color: 'var(--ds-color-status-error, #B91C1C)', fontSize: '12px', margin: '4px 0 0 0' }}>
                    {errors.line1}
                  </p>
                )}
              </div>

              {/* Address Line 2 */}
              <div style={{ gridColumn: 'span 2' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                  <label htmlFor={line2Id} style={{ ...fieldLabelStyle, marginBottom: 0 }}>
                    Practice Address Line 2
                  </label>
                  <span style={{ fontSize: '12px', color: 'var(--ds-color-text-muted, #94A3B8)' }}>
                    (Optional)
                  </span>
                </div>
                <input
                  id={line2Id}
                  type="text"
                  value={line2}
                  placeholder="Building / District / Landmark"
                  onChange={(e) => setLine2(e.target.value)}
                  style={fieldInputStyle(false)}
                />
              </div>

              {/* Postcode */}
              <div>
                <label htmlFor={postcodeId} style={fieldLabelStyle}>
                  Postcode <span style={{ color: '#B91C1C' }}>*</span>
                </label>
                <input
                  id={postcodeId}
                  type="text"
                  inputMode="numeric"
                  value={postcode}
                  maxLength={5}
                  placeholder="50480"
                  onChange={(e) => setPostcode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                  aria-required="true"
                  aria-invalid={!!errors.postcode}
                  style={fieldInputStyle(!!errors.postcode)}
                />
                {errors.postcode && (
                  <p style={{ color: 'var(--ds-color-status-error, #B91C1C)', fontSize: '12px', margin: '4px 0 0 0' }}>
                    {errors.postcode}
                  </p>
                )}
              </div>

              {/* City */}
              <div>
                <label htmlFor={cityId} style={fieldLabelStyle}>
                  City <span style={{ color: '#B91C1C' }}>*</span>
                </label>
                <input
                  id={cityId}
                  type="text"
                  value={city}
                  placeholder="Kuala Lumpur"
                  onChange={(e) => setCity(e.target.value)}
                  aria-required="true"
                  aria-invalid={!!errors.city}
                  style={fieldInputStyle(!!errors.city)}
                />
                {errors.city && (
                  <p style={{ color: 'var(--ds-color-status-error, #B91C1C)', fontSize: '12px', margin: '4px 0 0 0' }}>
                    {errors.city}
                  </p>
                )}
              </div>

              {/* State */}
              <div>
                <label htmlFor={stateId} style={fieldLabelStyle}>
                  State / Federal Territory <span style={{ color: '#B91C1C' }}>*</span>
                </label>
                <select
                  id={stateId}
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  aria-required="true"
                  aria-invalid={!!errors.state}
                  style={{ ...fieldInputStyle(!!errors.state), cursor: 'pointer' }}
                >
                  <option value="">Select State</option>
                  {MALAYSIAN_STATES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p style={{ color: 'var(--ds-color-status-error, #B91C1C)', fontSize: '12px', margin: '4px 0 0 0' }}>
                    {errors.state}
                  </p>
                )}
              </div>

              {/* Annual Gross Income */}
              <div>
                <label htmlFor={incomeId} style={fieldLabelStyle}>
                  Annual Gross Professional Income <span style={{ color: '#B91C1C' }}>*</span>
                </label>
                <select
                  id={incomeId}
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  aria-required="true"
                  aria-invalid={!!errors.income}
                  style={{ ...fieldInputStyle(!!errors.income), cursor: 'pointer' }}
                >
                  <option value="">Select Income Range</option>
                  {INCOME_TIERS.map((tier) => (
                    <option key={tier} value={tier}>
                      {tier}
                    </option>
                  ))}
                </select>
                {errors.income && (
                  <p style={{ color: 'var(--ds-color-status-error, #B91C1C)', fontSize: '12px', margin: '4px 0 0 0' }}>
                    {errors.income}
                  </p>
                )}
              </div>
            </div>
          </FieldGroup>

          {/* SECTION 3: Additional Branches & Clinic Facility Bundling (if clinicPackage is active) */}
          {isClinicPackageActive && (
            <div style={{ marginBottom: '28px' }}>
              <BranchManager
                branches={branches}
                onBranchesChange={handleBranchesChange}
                primaryClinicName={clinicalName || practiceLocation}
                isRevenueConfirmed={branchRevenueConfirmed}
                onRevenueConfirmChange={setBranchRevenueConfirmed}
                onExceedsRevenueReferral={handleExceedsRevenueReferral}
              />
              {errors.branchRevenueConfirmed && (
                <p
                  style={{
                    color: 'var(--ds-color-status-error, #B91C1C)',
                    fontSize: '12.5px',
                    fontWeight: 500,
                    margin: '8px 0 0 0',
                    padding: '8px 12px',
                    backgroundColor: 'var(--ds-color-status-error-bg, #FEF2F2)',
                    borderRadius: 'var(--ds-radius-md, 6px)',
                    border: '1px solid var(--ds-color-status-error-border, #FECACA)',
                  }}
                >
                  {errors.branchRevenueConfirmed}
                </p>
              )}
            </div>
          )}

          {/* SECTION 4: Comprehensive Underwriting Questionnaires, Disclosures & Declarations */}
          <div style={{ marginBottom: '28px' }}>
            <UnderwritingQuestionnaire
              declarations={declarations}
              onChange={setDeclarations}
              coverage={coverage}
              errors={errors}
              onClearError={(field) => {
                setErrors((prev) => {
                  const copy = { ...prev };
                  delete copy[field];
                  return copy;
                });
              }}
            />

            {/* Simulation Trigger for Automated Testing of Underwriting Referral Route */}
            <div
              style={{
                marginTop: '16px',
                paddingTop: '12px',
                borderTop: '1px dashed var(--ds-color-border-subtle, #E2E8F0)',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <button
                type="button"
                onClick={() =>
                  triggerReferral(
                    'Applicant declared prior MMC inquiry requiring underwriter assessment'
                  )
                }
                style={{
                  fontSize: '11px',
                  color: 'var(--ds-color-text-muted, #94A3B8)',
                  backgroundColor: 'transparent',
                  border: 'none',
                  padding: '4px 8px',
                  cursor: 'pointer',
                  opacity: 0.7,
                }}
              >
                Simulate Adverse Declaration (Referral)
              </button>
            </div>
          </div>

          {/* Important Notices to Applicants Button (LEG-04 / MODAL-08 #jsImportantAndNoticesModel / ACT-PART-002) */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent('open-document-center', { detail: { tab: 'notices' } })
                );
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                minHeight: '44px',
                padding: '0 20px',
                backgroundColor: 'var(--ds-primitive-color-teal-50, #F0FDFA)',
                color: 'var(--ds-color-brand-primary, #08A5B5)',
                border: '1px solid var(--ds-color-brand-light, #CCFBF1)',
                borderRadius: 'var(--ds-radius-md, 6px)',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <Shield size={16} color="var(--ds-color-brand-primary, #08A5B5)" />
              Important Notices to the Applicants (Schedule 9 FSA 2013)
            </button>
          </div>

          {/* Step Action Bar: Back & Submit */}
          <div
            className="ds-action-bar-responsive"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              paddingTop: '24px',
              borderTop: '1px solid var(--ds-color-border-subtle, #E2E8F0)',
            }}
          >
            <Button
              type="button"
              variant="secondary"
              className="ds-btn-mobile-full"
              onClick={handleBackToQuote}
              leftIcon={<ArrowLeft size={16} />}
            >
              Back to Quotation
            </Button>

            <Button
              type="submit"
              variant="teal"
              className="ds-btn-mobile-full"
              rightIcon={<ArrowRight size={16} />}
            >
              Proceed to Review & Payment
            </Button>
          </div>
        </div>
      </form>

      {/* Existing Customer NRIC Promo Code Substitution Modal */}
      <NricPromoSubstitutionModal
        isOpen={promoModalOpen}
        onClose={() => setPromoModalOpen(false)}
        originalCode={coverage.promoCode || 'CHUBBPROMO'}
        substitutedCode={substitutedPromoCode}
        discountPercentage={substitutedDiscount}
        message={promoSubstitutionMsg}
        onAccept={handleAcceptSubstitutedPromo}
      />

      {/* Duplicate Active Policy Detection Modal (MODAL-18 #jsAlreadyBoughtModal) */}
      {duplicateRecord && (
        <DuplicatePolicyModal
          isOpen={isDuplicateModalOpen}
          onClose={() => setIsDuplicateModalOpen(false)}
          policyRecord={duplicateRecord}
          onProceedAnyway={() => setIsDuplicateModalOpen(false)}
        />
      )}
    </div>
  );
};
