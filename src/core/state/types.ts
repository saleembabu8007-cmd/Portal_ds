/**
 * DoctorShield Individual Indemnity - Application State & Workflow Types
 * Governed by STATE_MACHINE.md and DOMAIN_MODELS.md
 */

export type StageId = 1 | 2 | 3 | 4 | 'referral' | 'confirmation';

export interface BranchItem {
  id: string;
  branchName: string;
  addressLine1: string;
  addressLine2?: string;
  postcode: string;
  city: string;
  state: string;
  phone: string;
  picName?: string;
}

export interface UnderwritingDeclarations {
  haveClaimEverBeenMade: 'agree' | 'disagree' | null;
  noClaimDesc: string;
  awareOfErrors: 'yes' | 'no' | null;
  awareOfErrorsDesc: string;
  haveBeenDisciplinaryAction: 'yes' | 'no' | null;
  disciplinaryActionDesc: string;
  hadCriminalCharges: 'yes' | 'no' | null;
  criminalChargesDesc: string;
  
  // Clinic entity underwriting (conditional if clinicPackage is active)
  clinicHaveClaimEverBeenMade?: 'yes' | 'no' | null;
  clinicAwareOfErrors?: 'yes' | 'no' | null;
  clinicHaveBeenDisciplinaryAction?: 'yes' | 'no' | null;
  clinicAnswers?: string;
  clinicHadCriminalCharges?: 'yes' | 'no' | null;
  clinicCriminalChargesDesc?: string;

  // Supplementary COVID-19 Questionnaires (Screens 04A-C, FLD-CVD-042..069)
  isCovidQuestionnaireActive?: boolean;
  policySurroundingCovid19?: 'yes' | 'no' | null;
  policySurroundingCovid19Desc?: string;
  disclaimersLimitLiabilityCovid19?: 'yes' | 'no' | null;
  haveBeenInfectedCovid19?: 'yes' | 'no' | null;
  haveDiedFromCovid19?: 'yes' | 'no' | null;
  havePlanDealWithCovid19?: 'yes' | 'no' | null;
  dealWithSummarizePlan?: string;
  governmentGuidelinesAndDirectives?: string;
  haveExhibitSignsAndSymptoms?: 'yes' | 'no' | null;
  haveCommunitySpreadCovid19?: 'yes' | 'no' | null;
  haveLocalHealthAuthoritiesQuarantine?: 'yes' | 'no' | null;
  servingCustomers?: string;
  businessContinuityCapabilities?: string;
  havePotentialSpreadTeam?: 'yes' | 'no' | null;
  haveDesignatedInfectionPreventionist?: 'yes' | 'no' | null;
  emergencyPreparednessPlanLastUpdate?: string;
  changesMadeSinceJan2020?: string;
  ppeDisinfectantProvisions?: string;
  whoGuidanceInfectionControl?: 'yes' | 'no' | null;
  staffReceiveInfectionTraining?: 'yes' | 'no' | null;
  symptomaticStaffStayHome?: 'yes' | 'no' | null;
  ppeControlMeasures?: 'yes' | 'no' | null;
  onJobSymptomEducation?: 'yes' | 'no' | null;
  transferProcessSevereSymptoms?: 'yes' | 'no' | null;
  transferHospitalDetails?: string;
  familyCommunicationPlan?: 'yes' | 'no' | null;
  crisisCommunicationMechanism?: string;
  applicantDeclareForCovid19?: boolean;

  // Final Underwriting Declaration & Legal Acknowledgment (LEG-DECL-001)
  finalDeclarationAccepted?: boolean;
}

export interface DoctorProfile {
  salutation: string;
  fullName: string;
  idType: 'nric' | 'passport';
  nric: string;
  dob: string;
  gender: 'Male' | 'Female' | '';
  nationality: string;
  countryName?: string;
  mmcNumber: string;
  email: string;
  mobilePhone: string;
  tin?: string;
  clinicalName?: string;
  income: string;
  practiceLocation: string;
  practiceAddress: {
    line1: string;
    line2?: string;
    postcode: string;
    city: string;
    state: string;
  };
  branches: BranchItem[];
  branchRevenueConfirmed: boolean;
  declarations: UnderwritingDeclarations;
}

export interface SpecialtyItem {
  specialtyId: string;
  specialtyName: string;
  percentage: number;
}

export interface ClinicCoverageParameters {
  ownsClinic: boolean | null;
  clinicType: 'sole_proprietor' | 'partnership_sdn_bhd' | '';
  hiresLocums: boolean | null;
  clinicLiabilityId: string;
  clinicLiabilityFormatted: string;
}

export interface PicCoverageParameters {
  isPicOwnClinic: boolean | null;
  isPicAnotherClinic: boolean | null;
}

export interface CoverageParameters {
  classificationId: string;
  classificationName: string;
  specialties: SpecialtyItem[];
  limitOfLiability: string; // '250k' | '500k' | '1m' | '1.5m' | '2m' | '3m' | '5m' | '10m'
  limitFormatted: string;   // 'RM 1,000,000'
  startDate: string;        // 'YYYY-MM-DD'
  endDate: string;          // 'YYYY-MM-DD'
  promoCode?: string;
  promoDiscount?: number;
  promoAssociation?: string;
  clause612Accepted?: boolean;
  termsAccepted?: boolean;
  customerEmail?: string;
  clinic?: ClinicCoverageParameters;
  pic?: PicCoverageParameters;
  fulfillmentMode?: 'buy_online' | 'email_quote';
  addons: {
    clinicPackage: boolean;
    personInCharge: boolean;
    locumCover: boolean;
    cyberLiability: boolean;
    branchCount: number;
  };
}

export interface QuoteBreakdown {
  grossBasePremium: number;
  annualGrossEquivalent?: number;
  individualNet?: number;
  specialtyMultiplier: number;
  clinicPremium?: number;
  clinicAnnualRate?: number;
  picPremium?: number;
  picAnnualRate?: number;
  reinstatementPremium?: number;
  addonsTotal: number;
  discountAmount: number;
  netTaxablePremium: number;
  sstAmount: number;          // 8%
  stampDuty: number;          // RM 10.00
  totalPayable: number;
  quoteToken: string;
  quotationNumber?: string;
  issuedAt: number;
  expiresAt: number;          // 15 minutes validity
  isProrata?: boolean;
  daysCount?: number;
}

export type PaymentChannel = 'personal' | 'business';

export type PaymentOutcomeStatus =
  | 'IDLE'
  | 'INITIATING'
  | 'PENDING'
  | 'SUCCESS'
  | 'FAILED'
  | 'CANCELLED'
  | 'TIMED_OUT'
  | 'UNCERTAIN';

export interface PolicyIssuanceDetails {
  policyNumber: string;
  certificateNumber: string;
  invoiceNumber: string;
  insuredDoctorName: string;
  nric: string;
  mmcNumber: string;
  classificationName: string;
  liabilityLimitFormatted: string;
  startDate: string;
  endDate: string;
  retroactiveDate: string;
  clinicName?: string;
  branchCount: number;
  totalPaid: number;
  paymentChannel: PaymentChannel;
  transactionReference: string;
  issuedAt: string;
  emailDispatchedTo: string;
}

export interface PaymentTransaction {
  idempotencyKey: string;
  transactionReference: string;
  quotationNumber: string;
  quoteToken: string;
  paymentChannel: PaymentChannel;
  amount: number;
  status: PaymentOutcomeStatus;
  errorMessage?: string;
  initiatedAt: number;
  completedAt?: number;
}

export interface WorkflowState {
  currentStage: StageId;
  previousStage: StageId | null;
  path: string;
  
  // Tier 1: Persistent Identity (Never cleared on upstream edits)
  doctorProfile: DoctorProfile;
  
  // Tier 2: Volatile Rating (Invalidated on upstream edits)
  coverage: CoverageParameters;
  quote: QuoteBreakdown | null;
  isQuoteStale: boolean;
  
  // Underwriting & Referral Status
  hasAffirmativeDeclaration: boolean;
  referralReason?: string;
  referralReference?: string;

  // Payment & Policy Binding State
  paymentTransaction?: PaymentTransaction | null;
  policyDetails?: PolicyIssuanceDetails | null;
  
  // UI Meta
  isLoading: boolean;
  announcement: string;
  isMobileSummaryOpen: boolean;
}

export const INITIAL_COVERAGE_STATE: CoverageParameters = {
  classificationId: '7',
  classificationName: 'General Medical Practitioner',
  specialties: [
    { specialtyId: 'gmp', specialtyName: 'General Medical Practice', percentage: 100 },
  ],
  limitOfLiability: '1m',
  limitFormatted: 'RM 1,000,000',
  startDate: new Date().toISOString().split('T')[0],
  endDate: `${new Date().getFullYear()}-12-31`,
  promoCode: '',
  promoDiscount: 0,
  promoAssociation: '',
  clause612Accepted: false,
  termsAccepted: false,
  customerEmail: '',
  clinic: {
    ownsClinic: null,
    clinicType: '',
    hiresLocums: null,
    clinicLiabilityId: '500k',
    clinicLiabilityFormatted: 'RM 500,000',
  },
  pic: {
    isPicOwnClinic: null,
    isPicAnotherClinic: null,
  },
  fulfillmentMode: 'buy_online',
  addons: {
    clinicPackage: false,
    personInCharge: false,
    locumCover: false,
    cyberLiability: false,
    branchCount: 0,
  },
};

export const INITIAL_UNDERWRITING_DECLARATIONS: UnderwritingDeclarations = {
  haveClaimEverBeenMade: null,
  noClaimDesc: '',
  awareOfErrors: null,
  awareOfErrorsDesc: '',
  haveBeenDisciplinaryAction: null,
  disciplinaryActionDesc: '',
  hadCriminalCharges: null,
  criminalChargesDesc: '',
  clinicHaveClaimEverBeenMade: null,
  clinicAwareOfErrors: null,
  clinicHaveBeenDisciplinaryAction: null,
  clinicAnswers: '',
  clinicHadCriminalCharges: null,
  clinicCriminalChargesDesc: '',
  isCovidQuestionnaireActive: false,
  policySurroundingCovid19: null,
  policySurroundingCovid19Desc: '',
  disclaimersLimitLiabilityCovid19: null,
  haveBeenInfectedCovid19: null,
  haveDiedFromCovid19: null,
  havePlanDealWithCovid19: null,
  dealWithSummarizePlan: '',
  governmentGuidelinesAndDirectives: '',
  haveExhibitSignsAndSymptoms: null,
  haveCommunitySpreadCovid19: null,
  haveLocalHealthAuthoritiesQuarantine: null,
  servingCustomers: '',
  businessContinuityCapabilities: '',
  havePotentialSpreadTeam: null,
  haveDesignatedInfectionPreventionist: null,
  emergencyPreparednessPlanLastUpdate: '',
  changesMadeSinceJan2020: '',
  ppeDisinfectantProvisions: '',
  whoGuidanceInfectionControl: null,
  staffReceiveInfectionTraining: null,
  symptomaticStaffStayHome: null,
  ppeControlMeasures: null,
  onJobSymptomEducation: null,
  transferProcessSevereSymptoms: null,
  transferHospitalDetails: '',
  familyCommunicationPlan: null,
  crisisCommunicationMechanism: '',
  applicantDeclareForCovid19: false,
  finalDeclarationAccepted: false,
};

export const INITIAL_DOCTOR_PROFILE: DoctorProfile = {
  salutation: 'Dr.',
  fullName: '',
  idType: 'nric',
  nric: '',
  dob: '',
  gender: '',
  nationality: 'Malaysia',
  countryName: '',
  mmcNumber: '',
  email: '',
  mobilePhone: '',
  tin: '',
  clinicalName: '',
  income: '',
  practiceLocation: '',
  practiceAddress: {
    line1: '',
    line2: '',
    postcode: '',
    city: '',
    state: '',
  },
  branches: [],
  branchRevenueConfirmed: false,
  declarations: INITIAL_UNDERWRITING_DECLARATIONS,
};

export const INITIAL_QUOTE: QuoteBreakdown = {
  grossBasePremium: 750.0,
  specialtyMultiplier: 1.0,
  addonsTotal: 0.0,
  discountAmount: 0.0,
  netTaxablePremium: 750.0,
  sstAmount: 60.0,
  stampDuty: 10.0,
  totalPayable: 820.0,
  quoteToken: 'QT-DEMO-SAMPLE-2026',
  issuedAt: Date.now(),
  expiresAt: Date.now() + 15 * 60 * 1000,
};

