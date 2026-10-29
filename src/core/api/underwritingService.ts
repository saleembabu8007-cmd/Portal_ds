/**
 * Authoritative Underwriting Decision Service
 * Governed by UNDERWRITING_DECISION_TREE.md (DOC-TREE-UW-001) and BUSINESS_RULE_CATALOG.md
 * 
 * Rules Enforced:
 * - DT-IND-01..06: Individual Medical Declarations
 * - DT-CLN-01..06: Clinic Entity Declarations
 * - DT-BRN-01..04: Additional Branches & Combined Revenue Ceiling (RM 5,000,000)
 * - RULE-QST-01: Mandatory Narrative Disclosures on Adverse Answers
 * - RULE-COV-01: Supplementary COVID-19 Risk Assessment
 * - RULE-REF-01: Specialist Underwriting Relationship Manager Callback
 */

import { DoctorProfile, CoverageParameters, UnderwritingDeclarations } from '../state/types';
import { HttpClient } from './httpClient';
import { InputSanitizer } from '../utils/sanitizer';
import { Logger } from '../telemetry/logger';

export type UnderwritingOutcome =
  | 'ACCEPT'              // Straight-through policy issuance eligible (Stage 4)
  | 'REFERRAL'            // Requires manual Chubb underwriter assessment (/referral)
  | 'REJECT'              // Outright rejection (sanctions / blocklist / turnover > RM 5M)
  | 'MORE_INFO_REQUIRED'; // Incomplete disclosures or missing mandatory narratives

export interface UnderwritingEvaluationResult {
  outcome: UnderwritingOutcome;
  isStraightThrough: boolean;
  canProceedToReview: boolean;
  triggeredRules: string[];
  referralReasons: string[];
  missingDisclosures: string[];
  sanctionClear: boolean;
}

export interface ReferralCallbackRequest {
  contactName: string;
  clinicalName?: string;
  contactPhone: string;
  contactEmail: string;
  preferredTime: 'morning' | 'afternoon';
  referralReference: string;
  referralReason: string;
  additionalNotes?: string;
}

export interface ReferralCallbackResponse {
  success: boolean;
  ticketId: string;
  message: string;
  estimatedContactHours: number;
}

// Known test blocklist / sanctions vectors for regulatory simulation
const REGULATORY_BLOCKLIST_NRIC = ['999999999999', '000000000000', '850412145299'];
const SANCTIONED_NAMES = ['SANCTIONED INDIVIDUAL', 'BLOCKED PRACTITIONER'];

export class UnderwritingService {
  /**
   * Sanction and Blocklist Screening Gate
   * Implements customer_nric_blocklist_validation and customer_name_validation
   */
  static checkSanctionsAndBlocklist(
    nric: string,
    fullName: string
  ): { isClear: boolean; reason?: string } {
    const cleanNric = nric.replace(/\D/g, '');
    const cleanName = fullName.trim().toUpperCase();

    if (REGULATORY_BLOCKLIST_NRIC.includes(cleanNric)) {
      return {
        isClear: false,
        reason: 'Applicant NRIC matches regulatory AML/CFT sanctions register (BNM/UNSC).',
      };
    }

    if (SANCTIONED_NAMES.some((name) => cleanName.includes(name))) {
      return {
        isClear: false,
        reason: 'Applicant identity matches regulatory compliance blocklist.',
      };
    }

    return { isClear: true };
  }

  /**
   * Authoritative Master Underwriting Triage Evaluation
   * Evaluates all individual, organizational, branch, and COVID disclosures.
   */
  static evaluateUnderwritingRisk(
    profile: DoctorProfile,
    coverage: CoverageParameters
  ): UnderwritingEvaluationResult {
    const triggeredRules: string[] = [];
    const referralReasons: string[] = [];
    const missingDisclosures: string[] = [];

    const decl = profile.declarations || ({} as UnderwritingDeclarations);
    const ownsClinic =
      coverage.clinic?.ownsClinic === true || coverage.addons?.clinicPackage === true;

    // 1. Sanctions & Blocklist Screening (DT-IND-06)
    const sanctionCheck = this.checkSanctionsAndBlocklist(profile.nric || '', profile.fullName || '');
    if (!sanctionCheck.isClear) {
      triggeredRules.push('DT-IND-06');
      return {
        outcome: 'REJECT',
        isStraightThrough: false,
        canProceedToReview: false,
        triggeredRules,
        referralReasons: [sanctionCheck.reason || 'Sanctions screening match.'],
        missingDisclosures: [],
        sanctionClear: false,
      };
    }

    // 2. Branch Turnover Ceiling Enforcement (RULE-BRN-02 / DT-BRN-03 / LEG-BRANCH-001)
    if (ownsClinic && profile.branches && profile.branches.length > 0) {
      if (!profile.branchRevenueConfirmed) {
        missingDisclosures.push(
          'Confirmation that combined annual turnover of all branches is under RM 5,000,000 is required.'
        );
      }
    }

    // 3. Individual Medical Malpractice Declarations
    // Q1: Claims Ever Made (FLD-UW-DECL-CLAIMS-028)
    if (!decl.haveClaimEverBeenMade) {
      missingDisclosures.push('5-year medical malpractice claims declaration must be answered.');
    } else if (decl.haveClaimEverBeenMade === 'disagree') {
      triggeredRules.push('DT-IND-02');
      referralReasons.push(
        'Prior medical malpractice claim(s) or notice of intention declared within the past 5 years.'
      );
      if (!decl.noClaimDesc || !decl.noClaimDesc.trim()) {
        missingDisclosures.push('Particulars and settlement status of prior claims are mandatory.');
      }
    }

    // Q2: Errors / Circumstances (FLD-UW-DECL-ERRORS-030)
    if (!decl.awareOfErrors) {
      missingDisclosures.push('Awareness of potential claims or errors must be answered.');
    } else if (decl.awareOfErrors === 'yes') {
      triggeredRules.push('DT-IND-03');
      referralReasons.push(
        'Awareness of incident, circumstance or allegation that may result in a claim.'
      );
      if (!decl.awareOfErrorsDesc || !decl.awareOfErrorsDesc.trim()) {
        missingDisclosures.push('Description of potential claim circumstances is mandatory.');
      }
    }

    // Q3: Disciplinary Action / MMC Inquiries (FLD-UW-DECL-DISCIPLINE-032)
    if (!decl.haveBeenDisciplinaryAction) {
      missingDisclosures.push('Disciplinary action / MMC inquiry question must be answered.');
    } else if (decl.haveBeenDisciplinaryAction === 'yes') {
      triggeredRules.push('DT-IND-04');
      referralReasons.push(
        'Prior disciplinary proceedings, inquiry, or sanctions by MMC or licensing authority.'
      );
      if (!decl.disciplinaryActionDesc || !decl.disciplinaryActionDesc.trim()) {
        missingDisclosures.push('Full particulars of regulatory inquiry and outcome are mandatory.');
      }
    }

    // Q4: Criminal Charges / Convictions (FLD-UW-DECL-CRIMINAL-034)
    if (!decl.hadCriminalCharges) {
      missingDisclosures.push('Criminal investigation / charges question must be answered.');
    } else if (decl.hadCriminalCharges === 'yes') {
      triggeredRules.push('DT-IND-05');
      referralReasons.push('Criminal convictions or pending criminal proceedings declared.');
      if (!decl.criminalChargesDesc || !decl.criminalChargesDesc.trim()) {
        missingDisclosures.push('Details of criminal charges and jurisdiction are mandatory.');
      }
    }

    // 4. Clinic Entity Underwriting Declarations (DT-CLN-01..06)
    if (ownsClinic) {
      if (!decl.clinicHaveClaimEverBeenMade) {
        missingDisclosures.push('Clinic entity claims history must be answered.');
      } else if (decl.clinicHaveClaimEverBeenMade === 'yes') {
        triggeredRules.push('DT-CLN-03');
        referralReasons.push('Prior claims or notices against clinic facility or employees.');
      }

      if (!decl.clinicAwareOfErrors) {
        missingDisclosures.push('Clinic entity incident awareness must be answered.');
      } else if (decl.clinicAwareOfErrors === 'yes') {
        triggeredRules.push('DT-CLN-04');
        referralReasons.push('Clinic awareness of circumstances that may give rise to a facility claim.');
      }

      if (!decl.clinicHaveBeenDisciplinaryAction) {
        missingDisclosures.push('Clinic CKAPS / MOH regulatory inquiry must be answered.');
      } else if (decl.clinicHaveBeenDisciplinaryAction === 'yes') {
        triggeredRules.push('DT-CLN-05');
        referralReasons.push('Clinic regulatory or CKAPS disciplinary inquiry declared.');
      }

      const hasClinicAffirmative =
        decl.clinicHaveClaimEverBeenMade === 'yes' ||
        decl.clinicAwareOfErrors === 'yes' ||
        decl.clinicHaveBeenDisciplinaryAction === 'yes';

      if (hasClinicAffirmative && (!decl.clinicAnswers || !decl.clinicAnswers.trim())) {
        missingDisclosures.push(
          'Particulars of clinic entity claims, incidents, or CKAPS inquiries are mandatory.'
        );
      }

      if (!decl.clinicHadCriminalCharges) {
        missingDisclosures.push('Clinic criminal charges question must be answered.');
      } else if (decl.clinicHadCriminalCharges === 'yes') {
        triggeredRules.push('DT-CLN-06');
        referralReasons.push('Clinic entity or directorship criminal proceedings declared.');
        if (!decl.clinicCriminalChargesDesc || !decl.clinicCriminalChargesDesc.trim()) {
          missingDisclosures.push('Details of clinic criminal charges are mandatory.');
        }
      }
    }

    // 5. Supplementary COVID-19 Questionnaire (if activated)
    if (decl.isCovidQuestionnaireActive) {
      if (decl.policySurroundingCovid19 === 'yes') {
        triggeredRules.push('RULE-COV-SANCTION');
        referralReasons.push('Applicant or facility fined or sanctioned for COVID-19 non-compliance.');
        if (!decl.policySurroundingCovid19Desc?.trim()) {
          missingDisclosures.push('Explanation of COVID-19 sanctions/fines is mandatory.');
        }
      }

      if (decl.haveBeenInfectedCovid19 === 'yes' || decl.haveDiedFromCovid19 === 'yes') {
        triggeredRules.push('RULE-COV-MORTALITY');
        referralReasons.push(
          'Significant COVID-19 infection or fatality cluster declared in practice facility.'
        );
      }

      if (!decl.applicantDeclareForCovid19) {
        missingDisclosures.push(
          'Final COVID-19 risk assessment truth declaration (LEG-COVID-001) must be accepted.'
        );
      }
    }

    // 6. Final Statutory Underwriting Declaration (LEG-DECL-001)
    if (!decl.finalDeclarationAccepted) {
      missingDisclosures.push(
        'Statutory Underwriting Truth Declaration (Schedule 9 FSA 2013) must be accepted.'
      );
    }

    // Evaluation synthesis
    if (missingDisclosures.length > 0) {
      return {
        outcome: 'MORE_INFO_REQUIRED',
        isStraightThrough: false,
        canProceedToReview: false,
        triggeredRules,
        referralReasons,
        missingDisclosures,
        sanctionClear: true,
      };
    }

    if (referralReasons.length > 0) {
      return {
        outcome: 'REFERRAL',
        isStraightThrough: false,
        canProceedToReview: false,
        triggeredRules,
        referralReasons,
        missingDisclosures: [],
        sanctionClear: true,
      };
    }

    // All clear -> Accept straight through
    triggeredRules.push('DT-IND-01');
    if (ownsClinic) triggeredRules.push('DT-CLN-02');

    return {
      outcome: 'ACCEPT',
      isStraightThrough: true,
      canProceedToReview: true,
      triggeredRules,
      referralReasons: [],
      missingDisclosures: [],
      sanctionClear: true,
    };
  }

  /**
   * Submit Specialist Underwriting Relationship Manager Callback
   * Implements RULE-REF-01 (POST /api/contactSupport)
   */
  static async submitReferralCallback(
    request: ReferralCallbackRequest
  ): Promise<ReferralCallbackResponse> {
    const contactName = InputSanitizer.sanitizeText(request.contactName, 100);
    const contactPhone = InputSanitizer.sanitizePhone(request.contactPhone);
    const contactEmail = InputSanitizer.sanitizeEmail(request.contactEmail);
    const clinicalName = InputSanitizer.sanitizeText(request.clinicalName, 150);
    const notes = InputSanitizer.sanitizeText(request.additionalNotes, 1000);

    if (!contactName.trim() || !contactPhone.trim() || !contactEmail.trim()) {
      throw new Error('Name, mobile phone, and email address are required for underwriter callback.');
    }

    // In production mode (where mock is disallowed), execute real API dispatch
    if (!HttpClient.isMockAllowed()) {
      try {
        const payload = {
          contact_name: contactName,
          clinical_name: clinicalName || '',
          contact_phone: contactPhone,
          contact_email_id: contactEmail,
          preferred_time: request.preferredTime,
          referral_reference: request.referralReference,
          referral_reason: request.referralReason,
          notes,
        };
        const raw = await HttpClient.request<any>('/contactSupport', {
          method: 'POST',
          body: payload,
        });

        Logger.audit('UNDERWRITING', 'REFERRAL_CALLBACK_SUBMIT', 'SUCCESS', {
          ticket_id: raw.ticket_id,
          referral_reference: request.referralReference,
          preferred_time: request.preferredTime,
        }, contactEmail);

        return {
          success: true,
          ticketId: raw.ticket_id || `TKT-${Date.now().toString(36).toUpperCase()}`,
          message:
            raw.message ||
            `Thank you Dr. ${contactName}. A senior Chubb underwriting specialist will contact you by ${request.preferredTime === 'morning' ? 'tomorrow morning (9:00 AM - 1:00 PM)' : 'tomorrow afternoon (2:00 PM - 5:30 PM)'}.`,
          estimatedContactHours: raw.estimated_contact_hours || 24,
        };
      } catch (err: any) {
        Logger.error('UNDERWRITING', 'REFERRAL_CALLBACK_SUBMIT', err, { referral_reference: request.referralReference });
        throw err;
      }
    }

    // Simulated authoritative dispatch for Test / Dev
    await new Promise((resolve) => setTimeout(resolve, 600));

    return {
      success: true,
      ticketId: `TKT-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`,
      message: `Thank you Dr. ${contactName}. Your callback ticket has been logged with our Chubb medical underwriting desk. A specialist will call you at ${contactPhone} during your preferred ${request.preferredTime} window.`,
      estimatedContactHours: 24,
    };
  }
}

