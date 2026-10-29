import React from 'react';
import { InputSanitizer } from '../../core/utils/sanitizer';
import {
  ShieldAlert,
  Building2,
  AlertTriangle,
  FileText,
  CheckCircle2,
  Info,
  Calendar,
  HelpCircle,
  Activity,
  Layers,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { UnderwritingDeclarations, CoverageParameters } from '../../core/state/types';

export interface UnderwritingQuestionnaireProps {
  declarations: UnderwritingDeclarations;
  onChange: React.Dispatch<React.SetStateAction<UnderwritingDeclarations>>;
  coverage: CoverageParameters;
  errors: Record<string, string>;
  onClearError?: (field: string) => void;
}

export const UnderwritingQuestionnaire: React.FC<UnderwritingQuestionnaireProps> = ({
  declarations,
  onChange,
  coverage,
  errors,
  onClearError,
}) => {
  const isClinicPackage =
    coverage.clinic?.ownsClinic === true || coverage.addons?.clinicPackage === true;

  const updateField = <K extends keyof UnderwritingDeclarations>(
    field: K,
    value: UnderwritingDeclarations[K]
  ) => {
    const sanitizedVal = typeof value === 'string' ? (InputSanitizer.sanitizeText(value, 2000) as any) : value;
    onChange((prev) => ({
      ...prev,
      [field]: sanitizedVal,
    }));
    if (onClearError && errors[field as string]) {
      onClearError(field as string);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* SECTION 1: Practitioner Medical Malpractice & Disciplinary History */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--ds-color-border-subtle)',
          borderRadius: 'var(--ds-primitive-radius-lg)',
          padding: '24px',
          boxShadow: 'var(--ds-primitive-shadow-sm)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            paddingBottom: '14px',
            borderBottom: '1px solid var(--ds-color-border-subtle)',
            marginBottom: '18px',
          }}
        >
          <ShieldAlert size={22} color="var(--ds-primitive-color-navy-700)" />
          <div>
            <h2
              style={{
                fontFamily: 'var(--ds-primitive-font-heading)',
                fontSize: '1.25rem',
                fontWeight: 500,
                color: 'var(--ds-color-text-heading)',
                margin: 0,
              }}
            >
              3. Statutory Underwriting Declarations & Medical Malpractice History
            </h2>
            <span style={{ fontSize: '12px', color: 'var(--ds-color-text-secondary)' }}>
              Pursuant to Schedule 9 of the Financial Services Act 2013 (FSA 2013). You have a duty
              to take reasonable care not to make a misrepresentation.
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Question 1: 5-Year Claims (FLD-UW-DECL-CLAIMS-028) */}
          <div
            id="field-claims-history"
            style={{
              padding: '16px',
              borderRadius: 'var(--ds-primitive-radius-md)',
              backgroundColor:
                declarations.haveClaimEverBeenMade === 'disagree'
                  ? '#FFFBEB'
                  : 'var(--ds-primitive-color-slate-50)',
              border: errors.haveClaimEverBeenMade
                ? '1px solid #DC2626'
                : '1px solid var(--ds-color-border-subtle)',
            }}
          >
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--ds-primitive-color-navy-900)',
                marginBottom: '10px',
                lineHeight: 1.5,
              }}
            >
              1. Have any claims ever been made against you in respect of any bodily injury, sickness,
              disease, illness or death of any patient arising out of any alleged negligent act,
              error or omission in the conduct of your profession, or have you ever received notice
              of any intention to make such a claim, during the last 5 years?{' '}
              <span style={{ color: '#DC2626' }}>*</span>
            </label>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="radio"
                  name="haveClaimEverBeenMade"
                  value="agree"
                  checked={declarations.haveClaimEverBeenMade === 'agree'}
                  onChange={() => {
                    updateField('haveClaimEverBeenMade', 'agree');
                    updateField('noClaimDesc', '');
                  }}
                />
                <span>
                  <strong>Agree:</strong> No claims or notices of intention have been made against me
                  in the last 5 years.
                </span>
              </label>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="radio"
                  name="haveClaimEverBeenMade"
                  value="disagree"
                  checked={declarations.haveClaimEverBeenMade === 'disagree'}
                  onChange={() => updateField('haveClaimEverBeenMade', 'disagree')}
                />
                <span>
                  <strong>Disagree:</strong> I have had previous malpractice claim(s) or notice(s) of
                  intention.
                </span>
              </label>
            </div>

            {/* Conditional Narrative Details (FLD-UW-DESC-CLAIMS-029) */}
            {declarations.haveClaimEverBeenMade === 'disagree' && (
              <div
                style={{
                  marginTop: '14px',
                  padding: '12px',
                  backgroundColor: '#FEF3C7',
                  borderRadius: 'var(--ds-primitive-radius-md)',
                  border: '1px solid #F59E0B',
                }}
              >
                <label
                  htmlFor="no_claim_desc"
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#92400E',
                    marginBottom: '6px',
                  }}
                >
                  Please provide full details of claim(s), dates, amounts, allegations, and current
                  settlement status: <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <textarea
                  id="no_claim_desc"
                  rows={3}
                  value={declarations.noClaimDesc}
                  onChange={(e) => updateField('noClaimDesc', e.target.value)}
                  placeholder="Enter claim history details (dates, claimant, settlement / litigation status)..."
                  aria-required="true"
                  aria-invalid={!!errors.noClaimDesc}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--ds-primitive-radius-md)',
                    border: errors.noClaimDesc ? '1px solid #DC2626' : '1px solid #D97706',
                    fontSize: '13px',
                    boxSizing: 'border-box',
                    backgroundColor: '#FFFFFF',
                  }}
                />
                {errors.noClaimDesc && (
                  <p style={{ color: '#DC2626', fontSize: '12px', margin: '4px 0 0 0' }}>
                    {errors.noClaimDesc}
                  </p>
                )}
                <span style={{ fontSize: '11px', color: '#B45309', display: 'block', marginTop: '4px' }}>
                  Note: A Chubb medical underwriting specialist will review your claim particulars before final terms are issued.
                </span>
              </div>
            )}
            {errors.haveClaimEverBeenMade && (
              <p style={{ color: '#DC2626', fontSize: '12px', margin: '6px 0 0 0' }}>
                {errors.haveClaimEverBeenMade}
              </p>
            )}
          </div>

          {/* Question 2: Known Circumstances / Errors (FLD-UW-DECL-ERRORS-030) */}
          <div
            id="field-errors-circumstances"
            style={{
              padding: '16px',
              borderRadius: 'var(--ds-primitive-radius-md)',
              backgroundColor:
                declarations.awareOfErrors === 'yes'
                  ? '#FFFBEB'
                  : 'var(--ds-primitive-color-slate-50)',
              border: errors.awareOfErrors
                ? '1px solid #DC2626'
                : '1px solid var(--ds-color-border-subtle)',
            }}
          >
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--ds-primitive-color-navy-900)',
                marginBottom: '10px',
                lineHeight: 1.5,
              }}
            >
              2. Are you aware of any errors, omissions, offences, circumstances or allegations which
              might result in a claim being made against you? <span style={{ color: '#DC2626' }}>*</span>
            </label>

            <div style={{ display: 'flex', gap: '24px' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="radio"
                  name="awareOfErrors"
                  value="no"
                  checked={declarations.awareOfErrors === 'no'}
                  onChange={() => {
                    updateField('awareOfErrors', 'no');
                    updateField('awareOfErrorsDesc', '');
                  }}
                />
                <span>No</span>
              </label>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="radio"
                  name="awareOfErrors"
                  value="yes"
                  checked={declarations.awareOfErrors === 'yes'}
                  onChange={() => updateField('awareOfErrors', 'yes')}
                />
                <span>Yes</span>
              </label>
            </div>

            {/* Conditional Narrative Details (FLD-UW-DESC-ERRORS-031) */}
            {declarations.awareOfErrors === 'yes' && (
              <div
                style={{
                  marginTop: '14px',
                  padding: '12px',
                  backgroundColor: '#FEF3C7',
                  borderRadius: 'var(--ds-primitive-radius-md)',
                  border: '1px solid #F59E0B',
                }}
              >
                <label
                  htmlFor="aware_of_errors_desc"
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#92400E',
                    marginBottom: '6px',
                  }}
                >
                  Please describe the incident, dates, patient condition, and reasons for potential
                  claim: <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <textarea
                  id="aware_of_errors_desc"
                  rows={3}
                  value={declarations.awareOfErrorsDesc}
                  onChange={(e) => updateField('awareOfErrorsDesc', e.target.value)}
                  placeholder="Enter details of circumstances or potential allegations..."
                  aria-required="true"
                  aria-invalid={!!errors.awareOfErrorsDesc}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--ds-primitive-radius-md)',
                    border: errors.awareOfErrorsDesc ? '1px solid #DC2626' : '1px solid #D97706',
                    fontSize: '13px',
                    boxSizing: 'border-box',
                    backgroundColor: '#FFFFFF',
                  }}
                />
                {errors.awareOfErrorsDesc && (
                  <p style={{ color: '#DC2626', fontSize: '12px', margin: '4px 0 0 0' }}>
                    {errors.awareOfErrorsDesc}
                  </p>
                )}
              </div>
            )}
            {errors.awareOfErrors && (
              <p style={{ color: '#DC2626', fontSize: '12px', margin: '6px 0 0 0' }}>
                {errors.awareOfErrors}
              </p>
            )}
          </div>

          {/* Question 3: Disciplinary Action / Inquiries (FLD-UW-DECL-DISCIPLINE-032) */}
          <div
            id="field-disciplinary-action"
            style={{
              padding: '16px',
              borderRadius: 'var(--ds-primitive-radius-md)',
              backgroundColor:
                declarations.haveBeenDisciplinaryAction === 'yes'
                  ? '#FFFBEB'
                  : 'var(--ds-primitive-color-slate-50)',
              border: errors.haveBeenDisciplinaryAction
                ? '1px solid #DC2626'
                : '1px solid var(--ds-color-border-subtle)',
            }}
          >
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--ds-primitive-color-navy-900)',
                marginBottom: '10px',
                lineHeight: 1.5,
              }}
            >
              3. Have you ever been the subject of disciplinary action or investigation by any
              authority or regulator or professional body (e.g. Malaysian Medical Council / MMC or
              Ministry of Health)? <span style={{ color: '#DC2626' }}>*</span>
            </label>

            <div style={{ display: 'flex', gap: '24px' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="radio"
                  name="haveBeenDisciplinaryAction"
                  value="no"
                  checked={declarations.haveBeenDisciplinaryAction === 'no'}
                  onChange={() => {
                    updateField('haveBeenDisciplinaryAction', 'no');
                    updateField('disciplinaryActionDesc', '');
                  }}
                />
                <span>No</span>
              </label>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="radio"
                  name="haveBeenDisciplinaryAction"
                  value="yes"
                  checked={declarations.haveBeenDisciplinaryAction === 'yes'}
                  onChange={() => updateField('haveBeenDisciplinaryAction', 'yes')}
                />
                <span>Yes</span>
              </label>
            </div>

            {/* Conditional Narrative Details (FLD-UW-DESC-DISCIPLINE-033) */}
            {declarations.haveBeenDisciplinaryAction === 'yes' && (
              <div
                style={{
                  marginTop: '14px',
                  padding: '12px',
                  backgroundColor: '#FEF3C7',
                  borderRadius: 'var(--ds-primitive-radius-md)',
                  border: '1px solid #F59E0B',
                }}
              >
                <label
                  htmlFor="disciplinary_action_desc"
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#92400E',
                    marginBottom: '6px',
                  }}
                >
                  Please specify the date, nature of inquiry, governing council/body, and final
                  outcome/sanctions: <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <textarea
                  id="disciplinary_action_desc"
                  rows={3}
                  value={declarations.disciplinaryActionDesc}
                  onChange={(e) => updateField('disciplinaryActionDesc', e.target.value)}
                  placeholder="Enter disciplinary inquiry particulars..."
                  aria-required="true"
                  aria-invalid={!!errors.disciplinaryActionDesc}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--ds-primitive-radius-md)',
                    border: errors.disciplinaryActionDesc ? '1px solid #DC2626' : '1px solid #D97706',
                    fontSize: '13px',
                    boxSizing: 'border-box',
                    backgroundColor: '#FFFFFF',
                  }}
                />
                {errors.disciplinaryActionDesc && (
                  <p style={{ color: '#DC2626', fontSize: '12px', margin: '4px 0 0 0' }}>
                    {errors.disciplinaryActionDesc}
                  </p>
                )}
              </div>
            )}
            {errors.haveBeenDisciplinaryAction && (
              <p style={{ color: '#DC2626', fontSize: '12px', margin: '6px 0 0 0' }}>
                {errors.haveBeenDisciplinaryAction}
              </p>
            )}
          </div>

          {/* Question 4: Criminal Charges / Exclusions (FLD-UW-DECL-CRIMINAL-034) */}
          <div
            id="field-criminal-charges"
            style={{
              padding: '16px',
              borderRadius: 'var(--ds-primitive-radius-md)',
              backgroundColor:
                declarations.hadCriminalCharges === 'yes'
                  ? '#FFFBEB'
                  : 'var(--ds-primitive-color-slate-50)',
              border: errors.hadCriminalCharges
                ? '1px solid #DC2626'
                : '1px solid var(--ds-color-border-subtle)',
            }}
          >
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--ds-primitive-color-navy-900)',
                marginBottom: '10px',
                lineHeight: 1.5,
              }}
            >
              4. Have you ever been the subject of a criminal investigation or had criminal charges
              brought against you?{' '}
              <span style={{ fontSize: '13px', fontWeight: 400, color: 'var(--ds-color-text-secondary)' }}>
                (For the purposes of this question, please disregard traffic or minor motor vehicle
                licensing offences.)
              </span>{' '}
              <span style={{ color: '#DC2626' }}>*</span>
            </label>

            <div style={{ display: 'flex', gap: '24px' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="radio"
                  name="hadCriminalCharges"
                  value="no"
                  checked={declarations.hadCriminalCharges === 'no'}
                  onChange={() => {
                    updateField('hadCriminalCharges', 'no');
                    updateField('criminalChargesDesc', '');
                  }}
                />
                <span>No</span>
              </label>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="radio"
                  name="hadCriminalCharges"
                  value="yes"
                  checked={declarations.hadCriminalCharges === 'yes'}
                  onChange={() => updateField('hadCriminalCharges', 'yes')}
                />
                <span>Yes</span>
              </label>
            </div>

            {/* Conditional Narrative Details (FLD-UW-DESC-CRIMINAL-035) */}
            {declarations.hadCriminalCharges === 'yes' && (
              <div
                style={{
                  marginTop: '14px',
                  padding: '12px',
                  backgroundColor: '#FEF3C7',
                  borderRadius: 'var(--ds-primitive-radius-md)',
                  border: '1px solid #F59E0B',
                }}
              >
                <label
                  htmlFor="criminal_charges_desc"
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#92400E',
                    marginBottom: '6px',
                  }}
                >
                  Please provide details of charges, jurisdiction, dates, and current legal status:{' '}
                  <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <textarea
                  id="criminal_charges_desc"
                  rows={3}
                  value={declarations.criminalChargesDesc}
                  onChange={(e) => updateField('criminalChargesDesc', e.target.value)}
                  placeholder="Enter details of criminal charges or proceedings..."
                  aria-required="true"
                  aria-invalid={!!errors.criminalChargesDesc}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--ds-primitive-radius-md)',
                    border: errors.criminalChargesDesc ? '1px solid #DC2626' : '1px solid #D97706',
                    fontSize: '13px',
                    boxSizing: 'border-box',
                    backgroundColor: '#FFFFFF',
                  }}
                />
                {errors.criminalChargesDesc && (
                  <p style={{ color: '#DC2626', fontSize: '12px', margin: '4px 0 0 0' }}>
                    {errors.criminalChargesDesc}
                  </p>
                )}
              </div>
            )}
            {errors.hadCriminalCharges && (
              <p style={{ color: '#DC2626', fontSize: '12px', margin: '6px 0 0 0' }}>
                {errors.hadCriminalCharges}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 2: Organization-Level & Clinic Entity Underwriting Declarations */}
      {isClinicPackage && (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--ds-primitive-color-teal-200)',
            borderRadius: 'var(--ds-primitive-radius-lg)',
            padding: '24px',
            boxShadow: 'var(--ds-primitive-shadow-sm)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              paddingBottom: '14px',
              borderBottom: '1px solid var(--ds-primitive-color-teal-100)',
              marginBottom: '18px',
            }}
          >
            <Building2 size={22} color="var(--ds-primitive-color-teal-700)" />
            <div>
              <h2
                style={{
                  fontFamily: 'var(--ds-primitive-font-heading)',
                  fontSize: '1.25rem',
                  fontWeight: 500,
                  color: 'var(--ds-color-text-heading)',
                  margin: 0,
                }}
              >
                2. Clinic Entity & Medical Establishment Declarations
              </h2>
              <span style={{ fontSize: '12px', color: 'var(--ds-color-text-secondary)' }}>
                Required for registered healthcare facility entity coverage (CKAPS / Private
                Healthcare Facilities and Services Act 1998).
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Clinic Claims (FLD-UW-CLINIC-CLAIMS-036) */}
            <div
              style={{
                padding: '16px',
                borderRadius: 'var(--ds-primitive-radius-md)',
                backgroundColor: '#F8FAFC',
                border: errors.clinicHaveClaimEverBeenMade
                  ? '1px solid #DC2626'
                  : '1px solid var(--ds-color-border-subtle)',
              }}
            >
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--ds-primitive-color-navy-900)',
                  marginBottom: '10px',
                }}
              >
                Have any claims ever been made against your clinic entity, healthcare facility, or
                any employee or locum during the last 5 years?{' '}
                <span style={{ color: '#DC2626' }}>*</span>
              </label>

              <div style={{ display: 'flex', gap: '24px' }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="radio"
                    name="clinicHaveClaimEverBeenMade"
                    value="no"
                    checked={declarations.clinicHaveClaimEverBeenMade === 'no'}
                    onChange={() => updateField('clinicHaveClaimEverBeenMade', 'no')}
                  />
                  <span>No</span>
                </label>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="radio"
                    name="clinicHaveClaimEverBeenMade"
                    value="yes"
                    checked={declarations.clinicHaveClaimEverBeenMade === 'yes'}
                    onChange={() => updateField('clinicHaveClaimEverBeenMade', 'yes')}
                  />
                  <span>Yes</span>
                </label>
              </div>
              {errors.clinicHaveClaimEverBeenMade && (
                <p style={{ color: '#DC2626', fontSize: '12px', margin: '6px 0 0 0' }}>
                  {errors.clinicHaveClaimEverBeenMade}
                </p>
              )}
            </div>

            {/* Clinic Errors (FLD-UW-CLINIC-ERRORS-037) */}
            <div
              style={{
                padding: '16px',
                borderRadius: 'var(--ds-primitive-radius-md)',
                backgroundColor: '#F8FAFC',
                border: errors.clinicAwareOfErrors
                  ? '1px solid #DC2626'
                  : '1px solid var(--ds-color-border-subtle)',
              }}
            >
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--ds-primitive-color-navy-900)',
                  marginBottom: '10px',
                }}
              >
                Is the clinic entity aware of any circumstance or incident which may give rise to a
                claim against the facility or practice? <span style={{ color: '#DC2626' }}>*</span>
              </label>

              <div style={{ display: 'flex', gap: '24px' }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="radio"
                    name="clinicAwareOfErrors"
                    value="no"
                    checked={declarations.clinicAwareOfErrors === 'no'}
                    onChange={() => updateField('clinicAwareOfErrors', 'no')}
                  />
                  <span>No</span>
                </label>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="radio"
                    name="clinicAwareOfErrors"
                    value="yes"
                    checked={declarations.clinicAwareOfErrors === 'yes'}
                    onChange={() => updateField('clinicAwareOfErrors', 'yes')}
                  />
                  <span>Yes</span>
                </label>
              </div>
              {errors.clinicAwareOfErrors && (
                <p style={{ color: '#DC2626', fontSize: '12px', margin: '6px 0 0 0' }}>
                  {errors.clinicAwareOfErrors}
                </p>
              )}
            </div>

            {/* Clinic Disciplinary / CKAPS (FLD-UW-CLINIC-DISCIPLINE-038) */}
            <div
              style={{
                padding: '16px',
                borderRadius: 'var(--ds-primitive-radius-md)',
                backgroundColor: '#F8FAFC',
                border: errors.clinicHaveBeenDisciplinaryAction
                  ? '1px solid #DC2626'
                  : '1px solid var(--ds-color-border-subtle)',
              }}
            >
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--ds-primitive-color-navy-900)',
                  marginBottom: '10px',
                }}
              >
                Has the clinic entity or its directors/partners been subject to any MOH CKAPS,
                regulatory or licensing inquiry? <span style={{ color: '#DC2626' }}>*</span>
              </label>

              <div style={{ display: 'flex', gap: '24px' }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="radio"
                    name="clinicHaveBeenDisciplinaryAction"
                    value="no"
                    checked={declarations.clinicHaveBeenDisciplinaryAction === 'no'}
                    onChange={() => updateField('clinicHaveBeenDisciplinaryAction', 'no')}
                  />
                  <span>No</span>
                </label>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="radio"
                    name="clinicHaveBeenDisciplinaryAction"
                    value="yes"
                    checked={declarations.clinicHaveBeenDisciplinaryAction === 'yes'}
                    onChange={() => updateField('clinicHaveBeenDisciplinaryAction', 'yes')}
                  />
                  <span>Yes</span>
                </label>
              </div>
              {errors.clinicHaveBeenDisciplinaryAction && (
                <p style={{ color: '#DC2626', fontSize: '12px', margin: '6px 0 0 0' }}>
                  {errors.clinicHaveBeenDisciplinaryAction}
                </p>
              )}
            </div>

            {/* Conditional Clinic Answers (FLD-UW-CLINIC-ANSWERS-039) */}
            {(declarations.clinicHaveClaimEverBeenMade === 'yes' ||
              declarations.clinicAwareOfErrors === 'yes' ||
              declarations.clinicHaveBeenDisciplinaryAction === 'yes') && (
              <div
                style={{
                  padding: '14px',
                  backgroundColor: '#FEF3C7',
                  borderRadius: 'var(--ds-primitive-radius-md)',
                  border: '1px solid #F59E0B',
                }}
              >
                <label
                  htmlFor="clinic_answers"
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#92400E',
                    marginBottom: '6px',
                  }}
                >
                  Please provide full details of clinic claims, incidents, or CKAPS regulatory
                  inquiries: <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <textarea
                  id="clinic_answers"
                  rows={3}
                  value={declarations.clinicAnswers || ''}
                  onChange={(e) => updateField('clinicAnswers', e.target.value)}
                  placeholder="Enter clinic entity claims or regulatory inquiry particulars..."
                  aria-required="true"
                  aria-invalid={!!errors.clinicAnswers}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--ds-primitive-radius-md)',
                    border: errors.clinicAnswers ? '1px solid #DC2626' : '1px solid #D97706',
                    fontSize: '13px',
                    boxSizing: 'border-box',
                    backgroundColor: '#FFFFFF',
                  }}
                />
                {errors.clinicAnswers && (
                  <p style={{ color: '#DC2626', fontSize: '12px', margin: '4px 0 0 0' }}>
                    {errors.clinicAnswers}
                  </p>
                )}
              </div>
            )}

            {/* Clinic Criminal Charges (FLD-UW-CLINIC-CRIMINAL-040) */}
            <div
              style={{
                padding: '16px',
                borderRadius: 'var(--ds-primitive-radius-md)',
                backgroundColor: '#F8FAFC',
                border: errors.clinicHadCriminalCharges
                  ? '1px solid #DC2626'
                  : '1px solid var(--ds-color-border-subtle)',
              }}
            >
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--ds-primitive-color-navy-900)',
                  marginBottom: '10px',
                }}
              >
                Has the clinic entity or its directors/partners ever been convicted of or charged
                with any criminal offence? <span style={{ color: '#DC2626' }}>*</span>
              </label>

              <div style={{ display: 'flex', gap: '24px' }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="radio"
                    name="clinicHadCriminalCharges"
                    value="no"
                    checked={declarations.clinicHadCriminalCharges === 'no'}
                    onChange={() => {
                      updateField('clinicHadCriminalCharges', 'no');
                      updateField('clinicCriminalChargesDesc', '');
                    }}
                  />
                  <span>No</span>
                </label>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="radio"
                    name="clinicHadCriminalCharges"
                    value="yes"
                    checked={declarations.clinicHadCriminalCharges === 'yes'}
                    onChange={() => updateField('clinicHadCriminalCharges', 'yes')}
                  />
                  <span>Yes</span>
                </label>
              </div>

              {/* Conditional Clinic Criminal Details (FLD-UW-CLINIC-CRIMINAL-DESC-041) */}
              {declarations.clinicHadCriminalCharges === 'yes' && (
                <div style={{ marginTop: '12px' }}>
                  <textarea
                    rows={2}
                    value={declarations.clinicCriminalChargesDesc || ''}
                    onChange={(e) => updateField('clinicCriminalChargesDesc', e.target.value)}
                    placeholder="Enter details of clinic entity criminal proceedings..."
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: 'var(--ds-primitive-radius-md)',
                      border: errors.clinicCriminalChargesDesc
                        ? '1px solid #DC2626'
                        : '1px solid #D97706',
                      fontSize: '13px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              )}
              {errors.clinicHadCriminalCharges && (
                <p style={{ color: '#DC2626', fontSize: '12px', margin: '6px 0 0 0' }}>
                  {errors.clinicHadCriminalCharges}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: Supplementary COVID-19 Risk Questionnaire (Screens 04A-C, FLD-CVD-042..069) */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--ds-color-border-subtle)',
          borderRadius: 'var(--ds-primitive-radius-lg)',
          overflow: 'hidden',
          boxShadow: 'var(--ds-primitive-shadow-sm)',
        }}
      >
        <div
          onClick={() =>
            updateField('isCovidQuestionnaireActive', !declarations.isCovidQuestionnaireActive)
          }
          style={{
            padding: '18px 24px',
            backgroundColor: 'var(--ds-primitive-color-slate-50)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: declarations.isCovidQuestionnaireActive
              ? '1px solid var(--ds-color-border-subtle)'
              : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Activity size={20} color="var(--ds-primitive-color-teal-600)" />
            <div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: '15px',
                  color: 'var(--ds-primitive-color-navy-900)',
                }}
              >
                Supplementary COVID-19 Facility Risk Assessment Questionnaire
              </div>
              <div style={{ fontSize: '12px', color: 'var(--ds-color-text-secondary)' }}>
                Applicable for healthcare establishments and specialized clinical facilities (Screens 04A, 04B, 04C)
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: declarations.isCovidQuestionnaireActive
                  ? 'var(--ds-primitive-color-teal-700)'
                  : 'var(--ds-color-text-muted)',
              }}
            >
              {declarations.isCovidQuestionnaireActive ? 'Section Expanded' : 'Click to Complete (Optional / Conditional)'}
            </span>
            {declarations.isCovidQuestionnaireActive ? (
              <ChevronUp size={18} color="var(--ds-primitive-color-navy-700)" />
            ) : (
              <ChevronDown size={18} color="var(--ds-primitive-color-navy-700)" />
            )}
          </div>
        </div>

        {declarations.isCovidQuestionnaireActive && (
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Screen 04A: Regulatory & Virus Management */}
            <div>
              <h3
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  color: 'var(--ds-primitive-color-navy-900)',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Layers size={16} /> Screen 04A: Regulatory & Virus Management
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* 1. Policy Sanctions / Fines */}
                <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '6px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>
                    1. Have you or the facility been fined, sanctioned or warned by authorities for non-compliance with public policy surrounding COVID-19?
                  </label>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="policySurroundingCovid19"
                        checked={declarations.policySurroundingCovid19 === 'no'}
                        onChange={() => {
                          updateField('policySurroundingCovid19', 'no');
                          updateField('policySurroundingCovid19Desc', '');
                        }}
                      />
                      <span>No</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="policySurroundingCovid19"
                        checked={declarations.policySurroundingCovid19 === 'yes'}
                        onChange={() => updateField('policySurroundingCovid19', 'yes')}
                      />
                      <span>Yes</span>
                    </label>
                  </div>
                  {declarations.policySurroundingCovid19 === 'yes' && (
                    <div style={{ marginTop: '8px' }}>
                      <textarea
                        rows={2}
                        value={declarations.policySurroundingCovid19Desc || ''}
                        onChange={(e) => updateField('policySurroundingCovid19Desc', e.target.value)}
                        placeholder="Please explain authorities involved and sanction outcome..."
                        style={{ width: '100%', padding: '6px 10px', fontSize: '12px', borderRadius: '4px', border: '1px solid #D97706' }}
                      />
                    </div>
                  )}
                </div>

                {/* 2. Contract Disclaimers */}
                <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '6px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>
                    2. Does your professional contract contain disclaimers and/or limitations of liability for COVID-19 or any pandemic?
                  </label>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="disclaimersLimitLiabilityCovid19"
                        checked={declarations.disclaimersLimitLiabilityCovid19 === 'yes'}
                        onChange={() => updateField('disclaimersLimitLiabilityCovid19', 'yes')}
                      />
                      <span>Yes</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="disclaimersLimitLiabilityCovid19"
                        checked={declarations.disclaimersLimitLiabilityCovid19 === 'no'}
                        onChange={() => updateField('disclaimersLimitLiabilityCovid19', 'no')}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                {/* 3. Infection and Outbreak Plan */}
                <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '6px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>
                    3. Does the insured facility maintain an emergency action plan to deal with potential respiratory viral outbreaks?
                  </label>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="havePlanDealWithCovid19"
                        checked={declarations.havePlanDealWithCovid19 === 'yes'}
                        onChange={() => updateField('havePlanDealWithCovid19', 'yes')}
                      />
                      <span>Yes</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="havePlanDealWithCovid19"
                        checked={declarations.havePlanDealWithCovid19 === 'no'}
                        onChange={() => updateField('havePlanDealWithCovid19', 'no')}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Screen 04B: Business Continuity Planning */}
            <div>
              <h3
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  color: 'var(--ds-primitive-color-navy-900)',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Layers size={16} /> Screen 04B: Business Continuity & Infection Control
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '6px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>
                    Does the facility have an active Emergency Preparedness Team and designated Infection Preventionist in place?
                  </label>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="haveDesignatedInfectionPreventionist"
                        checked={declarations.haveDesignatedInfectionPreventionist === 'yes'}
                        onChange={() => updateField('haveDesignatedInfectionPreventionist', 'yes')}
                      />
                      <span>Yes</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="haveDesignatedInfectionPreventionist"
                        checked={declarations.haveDesignatedInfectionPreventionist === 'no'}
                        onChange={() => updateField('haveDesignatedInfectionPreventionist', 'no')}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '6px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>
                    Has the facility implemented World Health Organization (WHO) and MOH Guidance on Infection Control and Prevention?
                  </label>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="whoGuidanceInfectionControl"
                        checked={declarations.whoGuidanceInfectionControl === 'yes'}
                        onChange={() => updateField('whoGuidanceInfectionControl', 'yes')}
                      />
                      <span>Yes</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="whoGuidanceInfectionControl"
                        checked={declarations.whoGuidanceInfectionControl === 'no'}
                        onChange={() => updateField('whoGuidanceInfectionControl', 'no')}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Screen 04C: Employee Training & Final Declaration */}
            <div>
              <h3
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  color: 'var(--ds-primitive-color-navy-900)',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Layers size={16} /> Screen 04C: Staff Training & COVID Declaration
              </h3>

              <div style={{ padding: '14px', backgroundColor: '#F8FAFC', borderRadius: '6px', marginBottom: '14px' }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    id="applicant_declare_for_covid19"
                    checked={declarations.applicantDeclareForCovid19 || false}
                    onChange={(e) => updateField('applicantDeclareForCovid19', e.target.checked)}
                    style={{ marginTop: '2px' }}
                  />
                  <span style={{ lineHeight: 1.5, color: 'var(--ds-primitive-color-navy-900)' }}>
                    <strong>Final COVID-19 Risk Declaration (LEG-COVID-001):</strong> The Applicant
                    declares that, after enquiry, to the best knowledge of all persons to be insured the
                    statements set forth herein and if any attachments made hereto are true, and no
                    material facts have been suppressed, omitted, or misstated.
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 4: Final Statutory Underwriting Declaration & Legal Acknowledgment (LEG-DECL-001) */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: errors.finalDeclarationAccepted
            ? '2px solid #DC2626'
            : '1px solid var(--ds-color-border-subtle)',
          borderRadius: 'var(--ds-primitive-radius-lg)',
          padding: '24px',
          boxShadow: 'var(--ds-primitive-shadow-sm)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            paddingBottom: '12px',
            borderBottom: '1px solid var(--ds-color-border-subtle)',
            marginBottom: '16px',
          }}
        >
          <FileText size={22} color="var(--ds-primitive-color-navy-800)" />
          <div>
            <h2
              style={{
                fontFamily: 'var(--ds-primitive-font-heading)',
                fontSize: '1.25rem',
                fontWeight: 500,
                color: 'var(--ds-color-text-heading)',
                margin: 0,
              }}
            >
              4. Statutory Declaration & Duty of Disclosure Acknowledgment
            </h2>
            <span style={{ fontSize: '12px', color: 'var(--ds-color-text-secondary)' }}>
              Bank Negara Malaysia (BNM) & Financial Services Act 2013 (FSA 2013) Statutory Notice
            </span>
          </div>
        </div>

        {/* Verbatim Statutory Legal Text (LEG-DECL-001) */}
        <div
          style={{
            padding: '16px 18px',
            backgroundColor: 'var(--ds-primitive-color-slate-50)',
            borderRadius: 'var(--ds-primitive-radius-md)',
            border: '1px solid var(--ds-color-border-default)',
            fontSize: '13px',
            lineHeight: 1.6,
            color: 'var(--ds-primitive-color-navy-800)',
            marginBottom: '18px',
          }}
        >
          <p style={{ margin: '0 0 10px 0' }}>
            <strong>Declaration & Signature Acknowledgment:</strong> I have read and understood the
            Important Notices contained in this application. I agree that this proposal, together
            with any other information or documents supplied, will form the basis of any contract of
            insurance. I acknowledge that if this application is accepted, the contract of insurance
            will be subject to the terms and conditions as set out in the policy wording as issued or
            as otherwise specifically varied in writing by Chubb.
          </p>
          <p style={{ margin: 0 }}>
            I declare, after inquiry, that the statements, particulars and information contained in
            this application and in any documents accompanying this application are true and correct
            in every detail and that no other material facts have been misstated, suppressed or
            omitted. I undertake to inform Chubb of any material alteration to those facts before
            completion of the contract of insurance.
          </p>
        </div>

        {/* Mandatory Checkbox */}
        <label
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            fontSize: '14px',
            cursor: 'pointer',
            lineHeight: 1.5,
          }}
        >
          <input
            type="checkbox"
            id="final_declaration_accepted"
            checked={declarations.finalDeclarationAccepted || false}
            onChange={(e) => updateField('finalDeclarationAccepted', e.target.checked)}
            aria-required="true"
            aria-invalid={!!errors.finalDeclarationAccepted}
            style={{ marginTop: '3px' }}
          />
          <span style={{ fontWeight: 600, color: 'var(--ds-primitive-color-navy-900)' }}>
            I confirm and declare that the statements, particulars and underwriting information
            provided above are true, accurate and complete. <span style={{ color: '#DC2626' }}>*</span>
          </span>
        </label>
        {errors.finalDeclarationAccepted && (
          <p style={{ color: '#DC2626', fontSize: '13px', fontWeight: 500, margin: '8px 0 0 24px' }}>
            {errors.finalDeclarationAccepted}
          </p>
        )}
      </div>
    </div>
  );
};
