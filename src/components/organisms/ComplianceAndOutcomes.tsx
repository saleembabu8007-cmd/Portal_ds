import React, { useState } from 'react';
import {
  FileText,
  PhoneCall,
  Mail,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  Shield,
  Save,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { DocumentLinkGroup, DEFAULT_DOCTORSHIELD_DOCUMENTS } from '../form/DocumentLinkGroup';
import { LabeledTextField } from '../form/LabeledTextField';
import { LabeledSelect } from '../form/LabeledSelect';

/* ========================================================================
   16. REQUIRED DOCUMENT / DISCLOSURE SECTION ORGANISM
   ======================================================================== */
export interface DocumentDisclosureSectionProps {
  onViewDoc?: (docId: string) => void;
  className?: string;
}

/**
 * DoctorShield Required Document & Regulatory Disclosure Organism
 * Bundles official policy documents with verbatim BNM commission disclosure notices.
 */
export const DocumentDisclosureSection: React.FC<DocumentDisclosureSectionProps> = ({
  onViewDoc,
  className = '',
}) => {
  return (
    <div
      className={`ds-document-disclosure ${className}`}
      style={{
        padding: '24px',
        backgroundColor: 'var(--ds-color-surface-subtle)',
        border: '1px solid var(--ds-color-border-subtle)',
        borderRadius: 'var(--ds-comp-panel-radius)',
        marginBottom: '28px',
      }}
    >
      <h3
        style={{
          fontFamily: 'var(--ds-primitive-font-heading)',
          fontSize: '15px',
          fontWeight: 500,
          color: 'var(--ds-primitive-color-navy-900)',
          margin: '0 0 16px 0',
        }}
      >
        Statutory Product Disclosures & Policy Documents
      </h3>

      {/* Document Link List */}
      <DocumentLinkGroup
        documents={DEFAULT_DOCTORSHIELD_DOCUMENTS.map((doc) => ({
          ...doc,
          onView: () => onViewDoc?.(doc.id),
        }))}
        direction="grid"
      />

      {/* Statutory Bank Negara Malaysia Intermediary Commission Notice */}
      <div
        style={{
          marginTop: '16px',
          padding: '12px 16px',
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--ds-color-border-subtle)',
          borderRadius: 'var(--ds-comp-input-radius)',
          fontSize: '12px',
          color: 'var(--ds-color-text-secondary)',
          lineHeight: 1.5,
        }}
      >
        <strong>Bank Negara Malaysia Intermediary Disclosure:</strong> JA Assure Sdn Bhd receives a statutory commission
        of up to <strong>15.0%</strong> of the gross premium from Chubb Insurance Malaysia Berhad for intermediary services
        and online policy administration.
      </div>
    </div>
  );
};

/* ========================================================================
   17. REFERRAL / SUPPORT OUTCOME ORGANISM
   ======================================================================== */
export interface ReferralSupportOutcomeOrganismProps {
  referenceId?: string;
  doctorName?: string;
  doctorPhone?: string;
  reason?: string;
  onSubmitCallback?: (data: { preferredTime: string; notes: string }) => void;
  className?: string;
}

/**
 * DoctorShield Referral / Support Outcome Organism
 * Reassuring, non-alarming outcome page for underwriting referrals and AML/sanctions review.
 * Features reference number, relationship manager callback scheduler, and direct help desk hotline.
 */
export const ReferralSupportOutcomeOrganism: React.FC<ReferralSupportOutcomeOrganismProps> = ({
  referenceId = 'REF-2026-98124',
  doctorName = 'Dr. Practitioner',
  doctorPhone = '+60 12-345 6789',
  reason = 'Underwriting assessment of declared historical malpractice circumstances.',
  onSubmitCallback,
  className = '',
}) => {
  const [preferredTime, setPreferredTime] = useState('Morning (09:00 - 12:00)');
  const [callbackNotes, setCallbackNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitCallback?.({ preferredTime, notes: callbackNotes });
    setIsSubmitted(true);
  };

  return (
    <div
      className={`ds-referral-outcome ${className}`}
      style={{
        maxWidth: '680px',
        margin: '0 auto',
        padding: '36px 32px',
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--ds-color-border-subtle)',
        borderRadius: 'var(--ds-comp-panel-radius)',
        boxShadow: 'var(--ds-primitive-shadow-xs)',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'var(--ds-primitive-color-teal-50)',
            color: 'var(--ds-primitive-color-teal-700)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '14px',
          }}
        >
          <PhoneCall size={24} />
        </div>

        <h2
          style={{
            fontFamily: 'var(--ds-primitive-font-heading)',
            fontSize: '1.5rem',
            fontWeight: 500,
            color: 'var(--ds-primitive-color-navy-900)',
            margin: '0 0 8px 0',
          }}
        >
          Your Application Has Been Referred to Underwriting
        </h2>

        <p style={{ fontSize: '14px', color: 'var(--ds-color-text-secondary)', lineHeight: 1.5, margin: 0 }}>
          Thank you, {doctorName}. Under Chubb Insurance underwriting guidelines, your application requires manual
          review by our specialist underwriting team.
        </p>

        <div style={{ marginTop: '14px' }}>
          <span
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              backgroundColor: 'var(--ds-color-surface-subtle)',
              fontFamily: 'var(--ds-primitive-font-mono)',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--ds-primitive-color-navy-900)',
              border: '1px solid var(--ds-color-border-subtle)',
            }}
          >
            Reference: {referenceId}
          </span>
        </div>
      </div>

      {/* Callback Request Form */}
      <div
        style={{
          padding: '24px',
          backgroundColor: 'var(--ds-color-surface-subtle)',
          borderRadius: 'var(--ds-comp-input-radius)',
          border: '1px solid var(--ds-color-border-subtle)',
          marginBottom: '28px',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--ds-primitive-font-heading)',
            fontSize: '15px',
            fontWeight: 500,
            color: 'var(--ds-primitive-color-navy-900)',
            margin: '0 0 14px 0',
          }}
        >
          Schedule Relationship Manager Callback
        </h3>

        {isSubmitted ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px',
              backgroundColor: 'var(--ds-primitive-color-emerald-50)',
              border: '1px solid var(--ds-primitive-color-emerald-200)',
              borderRadius: '6px',
              color: 'var(--ds-primitive-color-emerald-800)',
              fontSize: '13px',
            }}
          >
            <CheckCircle2 size={18} color="var(--ds-primitive-color-emerald-600)" />
            <span>
              Callback request registered. A Chubb underwriting specialist will contact you during{' '}
              <strong>{preferredTime}</strong> at <strong>{doctorPhone}</strong>.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <LabeledSelect
              id="ref_call_time"
              label="Preferred Contact Window"
              options={[
                { value: 'Morning (09:00 - 12:00)', label: 'Morning (09:00 - 12:00 MYT)' },
                { value: 'Afternoon (14:00 - 17:00)', label: 'Afternoon (14:00 - 17:00 MYT)' },
                { value: 'Evening (17:00 - 19:00)', label: 'Evening (17:00 - 19:00 MYT)' },
              ]}
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              helperText="Our underwriting desks operate Monday to Friday, 09:00 to 18:00."
            />

            <LabeledTextField
              id="ref_notes"
              label="Additional Notes or Clinic Schedule Constraints"
              optional
              value={callbackNotes}
              onChange={(e) => setCallbackNotes(e.target.value)}
              placeholder="e.g. In surgical theatre on Tuesday mornings..."
            />

            <Button type="submit" variant="primary" size="md" style={{ width: '100%', marginTop: '8px' }}>
              Request Callback
            </Button>
          </form>
        )}
      </div>

      {/* Direct Contact Channels */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          textAlign: 'center',
        }}
      >
        <div style={{ padding: '16px', border: '1px solid var(--ds-color-border-subtle)', borderRadius: '6px' }}>
          <PhoneCall size={18} color="var(--ds-color-text-tertiary)" style={{ marginBottom: '6px' }} />
          <div style={{ fontSize: '12px', color: 'var(--ds-color-text-secondary)' }}>Telephone Support</div>
          <a
            href="tel:+60327720922"
            style={{ fontWeight: 600, fontSize: '13px', color: 'var(--ds-primitive-color-teal-800)', textDecoration: 'none' }}
          >
            +60 3-2772 0922
          </a>
        </div>

        <div style={{ padding: '16px', border: '1px solid var(--ds-color-border-subtle)', borderRadius: '6px' }}>
          <Mail size={18} color="var(--ds-color-text-tertiary)" style={{ marginBottom: '6px' }} />
          <div style={{ fontSize: '12px', color: 'var(--ds-color-text-secondary)' }}>Email Underwriting</div>
          <a
            href="mailto:support@doctorshield.com.my"
            style={{ fontWeight: 600, fontSize: '13px', color: 'var(--ds-primitive-color-teal-800)', textDecoration: 'none' }}
          >
            support@doctorshield.com.my
          </a>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================
   18. ERROR AND RECOVERY COMPOSITION ORGANISM
   ======================================================================== */
export interface ErrorRecoveryCompositionProps {
  title?: string;
  description?: string;
  errorCode?: string;
  onRetry?: () => void;
  onRetrieveSaved?: () => void;
  className?: string;
}

/**
 * DoctorShield Error and Recovery Composition Organism
 * Handles payment failures, network dropouts, or session recovery non-destructively,
 * ensuring applicant data remains preserved.
 */
export const ErrorRecoveryComposition: React.FC<ErrorRecoveryCompositionProps> = ({
  title = 'Payment Gateway Authorization Interrupted',
  description = 'Your payment session was declined or timed out. No funds have been deducted from your account. Your application particulars remain safely preserved.',
  errorCode = 'GW_ERR_TIMEOUT_504',
  onRetry,
  onRetrieveSaved,
  className = '',
}) => {
  return (
    <div
      className={`ds-error-recovery ${className}`}
      style={{
        maxWidth: '560px',
        margin: '0 auto',
        padding: '36px 32px',
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--ds-primitive-color-rose-200)',
        borderTop: '4px solid var(--ds-primitive-color-rose-600)',
        borderRadius: 'var(--ds-comp-panel-radius)',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: 'var(--ds-primitive-color-rose-50)',
          color: 'var(--ds-primitive-color-rose-700)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
        }}
      >
        <AlertTriangle size={24} />
      </div>

      <h2
        style={{
          fontFamily: 'var(--ds-primitive-font-heading)',
          fontSize: '1.4rem',
          fontWeight: 500,
          color: 'var(--ds-primitive-color-navy-900)',
          margin: '0 0 8px 0',
        }}
      >
        {title}
      </h2>

      <p style={{ fontSize: '14px', color: 'var(--ds-color-text-secondary)', lineHeight: 1.5, margin: '0 0 20px 0' }}>
        {description}
      </p>

      {errorCode && (
        <div style={{ marginBottom: '24px' }}>
          <span
            style={{
              padding: '4px 10px',
              borderRadius: '4px',
              backgroundColor: 'var(--ds-color-surface-subtle)',
              fontFamily: 'var(--ds-primitive-font-mono)',
              fontSize: '11px',
              color: 'var(--ds-color-text-tertiary)',
            }}
          >
            Diagnostic Code: {errorCode}
          </span>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {onRetry && (
          <Button variant="primary" size="md" onClick={onRetry}>
            <RotateCcw size={15} />
            <span>Retry Payment</span>
          </Button>
        )}

        {onRetrieveSaved && (
          <Button variant="secondary" size="md" onClick={onRetrieveSaved}>
            Retrieve Saved Application
          </Button>
        )}

        <div style={{ marginTop: '16px', fontSize: '12px', color: 'var(--ds-color-text-tertiary)' }}>
          Need assistance? Contact our Client Desk at <strong>+60 3-2772 0922</strong>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================
   20. PRIMARY ACTION BAR & FOOTER ORGANISMS
   ======================================================================== */
export interface StepActionBarOrganismProps {
  onBack?: () => void;
  backLabel?: string;
  onContinue: () => void;
  continueLabel?: string;
  isContinueDisabled?: boolean;
  isContinueLoading?: boolean;
  autoSaveMessage?: string;
  className?: string;
}

/**
 * DoctorShield Step Action Bar Organism
 * Consistent navigation controls anchored at the base of every stage form.
 */
export const StepActionBarOrganism: React.FC<StepActionBarOrganismProps> = ({
  onBack,
  backLabel = 'Back',
  onContinue,
  continueLabel = 'Continue',
  isContinueDisabled = false,
  isContinueLoading = false,
  autoSaveMessage = 'All answers saved securely in session',
  className = '',
}) => {
  return (
    <div
      className={`ds-step-action-bar ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '24px',
        marginTop: '36px',
        borderTop: '1px solid var(--ds-color-border-subtle)',
        flexWrap: 'wrap',
        gap: '16px',
      }}
    >
      <div>
        {onBack ? (
          <Button type="button" variant="ghost" size="md" onClick={onBack}>
            <ArrowLeft size={16} />
            <span>{backLabel}</span>
          </Button>
        ) : (
          <span style={{ fontSize: '12px', color: 'var(--ds-color-text-tertiary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Save size={13} />
            <span>{autoSaveMessage}</span>
          </span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={onContinue}
          disabled={isContinueDisabled}
          loading={isContinueLoading}
          style={{ minWidth: '140px' }}
        >
          <span>{continueLabel}</span>
          <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
};

/**
 * DoctorShield Application Footer Organism
 * Restrained footer featuring BNM, PIDM, Chubb, and JA Assure regulatory notices.
 */
export const ApplicationFooterOrganism: React.FC = () => {
  return (
    <footer
      role="contentinfo"
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid var(--ds-color-border-subtle)',
        padding: '32px 24px',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          fontSize: '12px',
          color: 'var(--ds-color-text-secondary)',
          lineHeight: 1.6,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontWeight: 600, color: 'var(--ds-primitive-color-navy-900)' }}>
            DoctorShield Individual Medical Professional Indemnity
          </div>
          <div>
            Distributed by <strong>JA Assure Sdn Bhd</strong> · Intermediary License
          </div>
        </div>

        <div>
          DoctorShield is underwritten by <strong>Chubb Insurance Malaysia Berhad</strong> (Registration No. 197001000564 / 9827-A),
          a licensed insurer under the Financial Services Act 2013 and regulated by Bank Negara Malaysia. Eligible insurance
          benefits are protected by PIDM up to statutory limits.
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderTop: '1px solid var(--ds-color-border-subtle)', paddingTop: '12px', fontSize: '11px', color: 'var(--ds-color-text-tertiary)' }}>
          <div>&copy; {new Date().getFullYear()} DoctorShield / JA Assure. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="https://www.pidm.gov.my" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
              PIDM Protection
            </a>
            <a href="https://www.bnm.gov.my" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
              Bank Negara Malaysia
            </a>
            <a href="https://mmc.gov.my" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
              Malaysian Medical Council
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

