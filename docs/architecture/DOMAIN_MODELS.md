# TYPED DOMAIN MODELS & ENTITY CONTRACTS
## DoctorShield Individual Medical Professional Indemnity Portal

> **Document ID:** `DOC-ARCH-DOMAIN-001`  
> **Status:** Authoritative Baseline (Phase 2 Deliverable)  
> **Target:** TypeScript Domain Layer & Integration Boundary  
> **Traceability:** Governed by [`FIELD_DICTIONARY.md`](file:///c:/Users/salee/Downloads/Portal_ds/docs/FIELD_DICTIONARY.md) and [`BUSINESS_RULE_CATALOG.md`](file:///c:/Users/salee/Downloads/Portal_ds/docs/BUSINESS_RULE_CATALOG.md)

---

## 1. Nominal / Branded Type Definitions

To prevent primitive obsession (e.g. accidentally passing an MMC number where an NRIC is expected), the domain layer employs **TypeScript Branded Types**:

```typescript
export type Brand<K, T> = K & { readonly __brand: T };

export type DoctorNric = Brand<string, 'DoctorNric'>;            // Format: YYMMDD-PB-###G
export type MmcNumber = Brand<string, 'MmcNumber'>;              // Numeric string
export type QuotationNumber = Brand<string, 'QuotationNumber'>;  // Format: DS-YYYY-XXXXX
export type PolicyNumber = Brand<string, 'PolicyNumber'>;        // Format: CHUBB-DS-YYYY-XXXXX
export type QuoteToken = Brand<string, 'QuoteToken'>;            // HMAC-signed server token
export type PromoCode = Brand<string, 'PromoCode'>;              // Normalized uppercase
export type RinggitAmount = Brand<number, 'RinggitAmount'>;      // 2-decimal currency
```

---

## 2. Coverage & Rating Domain Models

```typescript
/**
 * Medical Practitioner Classification
 */
export interface MedicalClassification {
  id: string; // e.g. "7"
  name: string; // "General Medical Practitioner"
  category: 'primary_care' | 'surgical' | 'non_surgical' | 'public_sector' | 'dental';
  requiresSpecialtySplit: boolean;
  minLiabilityLimit: RinggitAmount;
  maxLiabilityLimit: RinggitAmount;
}

/**
 * Multi-Specialty Percentage Allocation
 */
export interface SpecializationAllocation {
  specialtyId: string;
  specialtyName: string;
  percentage: number; // e.g. 70.0 (Sum of all must equal 100.0)
}

/**
 * Indemnity Liability Tier
 */
export interface LiabilityTier {
  id: string; // "1m"
  limitAmount: RinggitAmount; // 1000000.00
  limitFormatted: string; // "RM 1,000,000"
  indicativeAnnualRate?: RinggitAmount;
  isRecommended?: boolean;
  recommendationTag?: string;
}

/**
 * Policy Period & Term
 */
export interface PolicyPeriod {
  startDate: string; // ISO Date "YYYY-MM-DD"
  endDate: string; // ISO Date "YYYY-MM-DD"
  durationDays: number;
  isProrata: boolean;
  isBackdated: boolean;
  clause612Accepted: boolean;
  alignWithApc: boolean;
}

/**
 * Clinic Facility & Branch Add-On Entity
 */
export type PracticeEntityType = 'sole_proprietorship' | 'partnership' | 'sdn_bhd';

export interface ClinicFacilityEntity {
  ownsClinic: boolean;
  entityType?: PracticeEntityType;
  hasClinicEntityCover: boolean;
  hasPicCover: boolean;
  isPicComplimentary: boolean;
  branchCount: number; // 0 to 4
  combinedAnnualRevenue: RinggitAmount; // <= 5,000,000.00
}
```

---

## 3. Financial Breakdown & Tax Schedule

```typescript
/**
 * Itemized Premium Breakdown
 */
export interface PremiumBreakdownModel {
  grossBaseIndemnity: RinggitAmount;
  discountAmount: RinggitAmount;
  appliedPromoCode?: PromoCode;
  clinicEntityCoverAmount: RinggitAmount;
  branchSurchargesAmount: RinggitAmount;
  picCoverAmount: RinggitAmount;
  reinstatementAmount: RinggitAmount; // Fixed 0.00 (Complimentary)
  
  netGrossPremium: RinggitAmount; // (Base - Discount + Clinic + Branches + PIC)
  sstRate: number; // Invariant: 0.08 (8%)
  sstAmount: RinggitAmount; // Round(netGrossPremium * 0.08, 2)
  stampDutyAmount: RinggitAmount; // Fixed 10.00
  totalPayableAmount: RinggitAmount; // netGrossPremium + sstAmount + stampDutyAmount
}

/**
 * Authoritative Server Quotation Record
 */
export interface QuotationRecord {
  quotationNumber: QuotationNumber;
  quoteToken: QuoteToken;
  createdAt: string; // ISO Timestamp
  expiresAt: string; // ISO Timestamp (30 days validity)
  classificationId: string;
  liabilityTierId: string;
  policyPeriod: PolicyPeriod;
  clinicFacility: ClinicFacilityEntity;
  breakdown: PremiumBreakdownModel;
  isStale: boolean;
}
```

---

## 4. Personal Particulars & Practice Information

```typescript
export type DoctorTitle = 'Dr.' | "Dato' Dr." | 'Datuk Dr.' | 'Prof. Dr.' | 'Tan Sri Dr.';
export type Gender = 'male' | 'female';

export interface DoctorIdentityProfile {
  title: DoctorTitle;
  fullNameAsPerIc: string;
  nricNumber: DoctorNric;
  dateOfBirth: string; // YYYY-MM-DD
  gender: Gender;
  mobileNumber: string; // +60 1X-XXXX XXXX
  emailAddress: string;
  mmcRegistrationNumber: MmcNumber;
}

export interface PracticeAddress {
  clinicName: string;
  clinicRegistrationNumber: string;
  addressLine1: string;
  addressLine2?: string;
  postcode: string;
  city: string;
  state: string;
}

export interface BranchClinicRecord {
  branchIndex: number; // 1 to 4
  branchName: string;
  branchRegistrationNumber: string;
  addressLine1: string;
  postcode: string;
  city: string;
  state: string;
}
```

---

## 5. Underwriting Risk & Statutory Declarations

```typescript
export interface UnderwritingDeclarationsModel {
  cleanClaimsHistory5Years: boolean; // true = Agree, false = Disagree (Referral)
  
  hasErrorsOmissionsClaims: boolean;
  errorsOmissionsDetails?: string; // Mandatory if true (min 20 chars)
  
  hasDisciplinaryAction: boolean;
  disciplinaryDetails?: string; // Mandatory if true (min 20 chars)
  
  hasCriminalRecord: boolean;
  criminalDetails?: string; // Mandatory if true (min 20 chars)
  
  covidSupplementaryAnswers?: Record<string, boolean>; // Step 6 if active
  
  underwritingOutcome: 'STRAIGHT_THROUGH_ELIGIBLE' | 'REFERRAL_REQUIRED';
}

export interface StatutoryConsentRecord {
  termsAndConditionsAccepted: boolean;
  dutyOfDisclosureFsa2013Confirmed: boolean;
  pidmNoticeAcknowledged: boolean;
  pdpaConsentGranted: boolean;
  consentTimestamp: string; // ISO Timestamp
  consentIpAddress: string;
}
```

---

## 6. Payment, Policy & Renewal Domain Models

```typescript
export type PaymentChannelType = 'B2C_FPX_AND_CARD' | 'B2B_CORPORATE_INTERNET_BANKING';

export interface PaymentTransactionRecord {
  transactionId: string;
  quotationNumber: QuotationNumber;
  totalAmountPaid: RinggitAmount;
  channel: PaymentChannelType;
  status: 'PENDING' | 'AUTHORIZED' | 'FAILED' | 'CANCELLED';
  gatewayReference?: string;
  authorizedAt?: string;
}

export interface BoundPolicyCertificate {
  policyNumber: PolicyNumber;
  quotationNumber: QuotationNumber;
  insuredDoctor: DoctorIdentityProfile;
  specializationName: string;
  limitFormatted: string;
  policyPeriod: PolicyPeriod;
  retroactiveDate: string; // Crucial claims-made date
  premiumBreakdown: PremiumBreakdownModel;
  coiPdfUrl: string;
  taxInvoicePdfUrl: string;
  policySchedulePdfUrl: string;
  issuedAt: string;
}

export interface RenewalSessionModel {
  authenticatedMobile: string;
  otpVerified: boolean;
  expiringPolicyNumber: PolicyNumber;
  originalRetroactiveDate: string; // Locked for continuity
  continuityInceptionDate: string; // Prior expiry + 1 day
  prePopulatedProfile: DoctorIdentityProfile;
  prePopulatedPractice: PracticeAddress;
}
```

