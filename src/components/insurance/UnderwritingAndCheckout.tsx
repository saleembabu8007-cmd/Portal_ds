import React, { useState } from 'react';
import { ShieldAlert, PhoneCall, Building2, CreditCard, Check, Clock, RefreshCw } from 'lucide-react';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Textarea';
import { Modal } from '../ui/FeedbackModals';

/* ========================================================================
   1. UNDERWRITING QUESTION GROUP (Declarations & Conditional Details)
   ======================================================================== */
export interface DeclarationState {
  cleanClaimsAgreed: boolean | null; // true = Agree, false = Disagree
  hasErrorsOmissions: boolean | null;
  errorsDetails?: string;
  hasDisciplinaryAction: boolean | null;
  disciplinaryDetails?: string;
  hasCriminalRecord: boolean | null;
  criminalDetails?: string;
}

export interface UnderwritingQuestionGroupProps {
  declarations: DeclarationState;
  onChange: (updated: DeclarationState) => void;
}

export const UnderwritingQuestionGroup: React.FC<UnderwritingQuestionGroupProps> = ({
  declarations,
  onChange,
}) => {
  return (
    <div className="ds-underwriting-question-group" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-primitive-space-6)' }}>
      {/* Question 1: 5-Year Clean Claims Statement */}
      <div
        style={{
          padding: 'var(--ds-primitive-space-5)',
          backgroundColor: 'var(--ds-color-surface-card)',
          border: '1px solid var(--ds-color-border-subtle)',
          borderRadius: 'var(--ds-primitive-radius-lg)',
        }}
      >
        <h4 style={{ fontFamily: 'var(--ds-primitive-font-heading)', fontSize: 'var(--ds-primitive-font-size-base)', fontWeight: 500, color: 'var(--ds-color-text-heading)', margin: '0 0 8px 0' }}>
          1. Five-Year Medical Claims History Statement
        </h4>
        <p style={{ fontSize: 'var(--ds-primitive-font-size-sm)', color: 'var(--ds-color-text-secondary)', lineHeight: 1.5, margin: '0 0 16px 0' }}>
          During the past 5 years, no claim for medical malpractice, professional negligence, or clinical error has been made against me, and I am not aware of any circumstance or incident which may give rise to a claim.
        </p>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            type="button"
            onClick={() => onChange({ ...declarations, cleanClaimsAgreed: true })}
            style={{
              flex: 1,
              minHeight: '48px',
              borderRadius: 'var(--ds-primitive-radius-md)',
              border: declarations.cleanClaimsAgreed === true ? '2px solid var(--ds-primitive-color-teal-700)' : '1px solid var(--ds-color-border-default)',
              backgroundColor: declarations.cleanClaimsAgreed === true ? 'var(--ds-primitive-color-teal-50)' : '#FFFFFF',
              color: declarations.cleanClaimsAgreed === true ? 'var(--ds-primitive-color-teal-800)' : 'var(--ds-color-text-primary)',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            I Agree (Clean Claims History)
          </button>
          <button
            type="button"
            onClick={() => onChange({ ...declarations, cleanClaimsAgreed: false })}
            style={{
              flex: 1,
              minHeight: '48px',
              borderRadius: 'var(--ds-primitive-radius-md)',
              border: declarations.cleanClaimsAgreed === false ? '2px solid var(--ds-primitive-color-rose-500)' : '1px solid var(--ds-color-border-default)',
              backgroundColor: declarations.cleanClaimsAgreed === false ? 'var(--ds-primitive-color-rose-50)' : '#FFFFFF',
              color: declarations.cleanClaimsAgreed === false ? 'var(--ds-primitive-color-rose-700)' : 'var(--ds-color-text-primary)',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            I Disagree (Prior Claims / Inquiries)
          </button>
        </div>
      </div>

      {/* Question 2: Disciplinary Inquiries */}
      <div
        style={{
          padding: 'var(--ds-primitive-space-5)',
          backgroundColor: 'var(--ds-color-surface-card)',
          border: '1px solid var(--ds-color-border-subtle)',
          borderRadius: 'var(--ds-primitive-radius-lg)',
        }}
      >
        <h4 style={{ fontFamily: 'var(--ds-primitive-font-heading)', fontSize: 'var(--ds-primitive-font-size-base)', fontWeight: 500, color: 'var(--ds-color-text-heading)', margin: '0 0 8px 0' }}>
          2. Professional Disciplinary Proceedings
        </h4>
        <p style={{ fontSize: 'var(--ds-primitive-font-size-sm)', color: 'var(--ds-color-text-secondary)', lineHeight: 1.5, margin: '0 0 16px 0' }}>
          Have you ever been subject to any disciplinary inquiry, sanction, or investigation by the Malaysian Medical Council (MMC) or any statutory registration authority?
        </p>
        <div style={{ display: 'flex', gap: '12px', marginBottom: declarations.hasDisciplinaryAction ? '16px' : 0 }}>
          <button
            type="button"
            onClick={() => onChange({ ...declarations, hasDisciplinaryAction: false, disciplinaryDetails: '' })}
            style={{
              flex: 1,
              minHeight: '44px',
              borderRadius: 'var(--ds-primitive-radius-md)',
              border: declarations.hasDisciplinaryAction === false ? '2px solid var(--ds-primitive-color-teal-700)' : '1px solid var(--ds-color-border-default)',
              backgroundColor: declarations.hasDisciplinaryAction === false ? 'var(--ds-primitive-color-teal-50)' : '#FFFFFF',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            No
          </button>
          <button
            type="button"
            onClick={() => onChange({ ...declarations, hasDisciplinaryAction: true })}
            style={{
              flex: 1,
              minHeight: '44px',
              borderRadius: 'var(--ds-primitive-radius-md)',
              border: declarations.hasDisciplinaryAction === true ? '2px solid var(--ds-primitive-color-rose-500)' : '1px solid var(--ds-color-border-default)',
              backgroundColor: declarations.hasDisciplinaryAction === true ? 'var(--ds-primitive-color-rose-50)' : '#FFFFFF',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Yes
          </button>
        </div>

        {declarations.hasDisciplinaryAction && (
          <Textarea
            id="disciplinary-details"
            label="Please provide details of inquiry and outcome (Mandatory)"
            required
            showCharCount
            maxLength={1000}
            value={declarations.disciplinaryDetails || ''}
            onChange={(e) => onChange({ ...declarations, disciplinaryDetails: e.target.value })}
            placeholder="Describe the nature of the inquiry, date, and final council findings..."
          />
        )}
      </div>
    </div>
  );
};

/* ========================================================================
   2. STATUTORY DECLARATION & LEGAL ACKNOWLEDGMENT
   ======================================================================== */
export interface DeclarationAcknowledgmentProps {
  agreedToTerms: boolean;
  agreedToDutyOfDisclosure: boolean;
  agreedToPdpa: boolean;
  onChange: (key: 'terms' | 'disclosure' | 'pdpa', value: boolean) => void;
}

export const DeclarationAndLegalAcknowledgment: React.FC<DeclarationAcknowledgmentProps> = ({
  agreedToTerms,
  agreedToDutyOfDisclosure,
  agreedToPdpa,
  onChange,
}) => {
  return (
    <div
      style={{
        padding: 'var(--ds-primitive-space-5)',
        backgroundColor: 'var(--ds-primitive-color-navy-50)',
        border: '1px solid var(--ds-color-border-subtle)',
        borderRadius: 'var(--ds-primitive-radius-lg)',
        marginBottom: 'var(--ds-primitive-space-6)',
      }}
    >
      <h4 style={{ fontFamily: 'var(--ds-primitive-font-heading)', fontSize: 'var(--ds-primitive-font-size-base)', fontWeight: 500, color: 'var(--ds-color-text-heading)', margin: '0 0 12px 0' }}>
        Statutory Declarations & Consents
      </h4>

      {/* PIDM Notice Banner */}
      <div
        style={{
          padding: '10px 14px',
          backgroundColor: '#FFFFFF',
          borderLeft: '4px solid var(--ds-primitive-color-sky-500)',
          borderRadius: '4px',
          fontSize: 'var(--ds-primitive-font-size-xs)',
          color: 'var(--ds-color-text-secondary)',
          lineHeight: 1.45,
          marginBottom: '16px',
        }}
      >
        <strong>PIDM Protection:</strong> The benefit(s) payable under eligible certificate/policy is(are) protected by Perbadanan Insurans Deposit Malaysia (PIDM) up to limits. Please refer to PIDM's TIPS Brochure or contact Chubb Insurance Malaysia Berhad.
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: 'var(--ds-primitive-font-size-sm)', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => onChange('terms', e.target.checked)}
            style={{ width: '18px', height: '18px', marginTop: '2px', accentColor: 'var(--ds-primitive-color-teal-700)' }}
          />
          <span style={{ lineHeight: 1.45 }}>
            I have read, understood, and accept the <strong>Chubb Master Policy Wording</strong>, Product Disclosure Sheet, and Terms & Conditions.
          </span>
        </label>

        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: 'var(--ds-primitive-font-size-sm)', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={agreedToDutyOfDisclosure}
            onChange={(e) => onChange('disclosure', e.target.checked)}
            style={{ width: '18px', height: '18px', marginTop: '2px', accentColor: 'var(--ds-primitive-color-teal-700)' }}
          />
          <span style={{ lineHeight: 1.45 }}>
            <strong>Duty of Disclosure:</strong> I declare that all statements and answers given in this proposal are true, correct, and complete pursuant to Schedule 9 of the Financial Services Act 2013.
          </span>
        </label>

        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: 'var(--ds-primitive-font-size-sm)', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={agreedToPdpa}
            onChange={(e) => onChange('pdpa', e.target.checked)}
            style={{ width: '18px', height: '18px', marginTop: '2px', accentColor: 'var(--ds-primitive-color-teal-700)' }}
          />
          <span style={{ lineHeight: 1.45 }}>
            <strong>PDPA Consent:</strong> I consent to the processing and disclosure of my personal data under the Personal Data Protection Act 2010.
          </span>
        </label>
      </div>
    </div>
  );
};

/* ========================================================================
   3. PAYMENT METHOD SELECTOR
   ======================================================================== */
export type PaymentChannel = 'personal' | 'business';

export interface PaymentMethodSelectorProps {
  selectedChannel: PaymentChannel;
  onChange: (channel: PaymentChannel) => void;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedChannel,
  onChange,
}) => {
  return (
    <div style={{ marginBottom: 'var(--ds-primitive-space-6)' }}>
      <h4 style={{ fontFamily: 'var(--ds-primitive-font-heading)', fontSize: 'var(--ds-primitive-font-size-base)', fontWeight: 500, color: 'var(--ds-color-text-heading)', margin: '0 0 12px 0' }}>
        Select Payment Method
      </h4>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
        {/* Card Option 1: Personal Card & FPX */}
        <div
          role="radio"
          aria-checked={selectedChannel === 'personal'}
          tabIndex={0}
          onClick={() => onChange('personal')}
          style={{
            padding: '16px',
            borderRadius: 'var(--ds-primitive-radius-lg)',
            border: selectedChannel === 'personal' ? '2px solid var(--ds-primitive-color-teal-700)' : '1px solid var(--ds-color-border-default)',
            backgroundColor: selectedChannel === 'personal' ? 'var(--ds-primitive-color-teal-50)' : '#FFFFFF',
            cursor: 'pointer',
            transition: 'all 150ms ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <CreditCard size={20} color="var(--ds-primitive-color-teal-700)" />
            <span style={{ fontWeight: 600, color: 'var(--ds-color-text-heading)' }}>Personal Banking / Card</span>
          </div>
          <p style={{ margin: 0, fontSize: 'var(--ds-primitive-font-size-xs)', color: 'var(--ds-color-text-secondary)' }}>
            Instant FPX individual online banking, Visa, or Mastercard credit/debit card.
          </p>
        </div>

        {/* Card Option 2: Corporate B2B Banking */}
        <div
          role="radio"
          aria-checked={selectedChannel === 'business'}
          tabIndex={0}
          onClick={() => onChange('business')}
          style={{
            padding: '16px',
            borderRadius: 'var(--ds-primitive-radius-lg)',
            border: selectedChannel === 'business' ? '2px solid var(--ds-primitive-color-teal-700)' : '1px solid var(--ds-color-border-default)',
            backgroundColor: selectedChannel === 'business' ? 'var(--ds-primitive-color-teal-50)' : '#FFFFFF',
            cursor: 'pointer',
            transition: 'all 150ms ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <Building2 size={20} color="var(--ds-primitive-color-navy-900)" />
            <span style={{ fontWeight: 600, color: 'var(--ds-color-text-heading)' }}>Corporate / Business Banking</span>
          </div>
          <p style={{ margin: 0, fontSize: 'var(--ds-primitive-font-size-xs)', color: 'var(--ds-color-text-secondary)' }}>
            B2B corporate FPX internet banking via clinic entity bank account.
          </p>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================
   4. SUPPORT REFERRAL OUTCOME COMPONENT
   ======================================================================== */
export interface ReferralSupportOutcomeProps {
  doctorName?: string;
  onSubmitCallback: (contactData: { phone: string; email: string; preferredTime: string }) => void;
}

export const ReferralSupportOutcome: React.FC<ReferralSupportOutcomeProps> = ({
  doctorName = 'Doctor',
  onSubmitCallback,
}) => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredTime, setPreferredTime] = useState('morning');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitCallback({ phone, email, preferredTime });
    setSubmitted(true);
  };

  return (
    <div
      style={{
        maxWidth: '680px',
        margin: '0 auto',
        padding: 'var(--ds-primitive-space-8)',
        backgroundColor: 'var(--ds-color-surface-card)',
        borderRadius: 'var(--ds-primitive-radius-xl)',
        boxShadow: 'var(--ds-primitive-shadow-md)',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 'var(--ds-primitive-space-6)' }}>
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: 'var(--ds-primitive-radius-full)',
            backgroundColor: 'var(--ds-primitive-color-amber-50)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px',
          }}
        >
          <ShieldAlert size={28} color="var(--ds-primitive-color-amber-500)" aria-hidden="true" />
        </div>
        <h2 style={{ fontFamily: 'var(--ds-primitive-font-heading)', fontSize: 'var(--ds-primitive-font-size-2xl)', fontWeight: 500, color: 'var(--ds-color-text-heading)', margin: '0 0 8px 0' }}>
          Specialist Underwriting Review Required
        </h2>
        <p style={{ fontSize: 'var(--ds-primitive-font-size-base)', color: 'var(--ds-color-text-secondary)', lineHeight: 1.5, margin: 0 }}>
          Thank you for your candid disclosure, Dr. {doctorName}. Based on the clinical details provided, automatic online binding is unavailable. Your file has been assigned to our senior medical indemnity underwriting team at Chubb.
        </p>
      </div>

      {submitted ? (
        <div style={{ padding: '16px', backgroundColor: 'var(--ds-primitive-color-emerald-50)', borderRadius: '8px', textAlign: 'center', color: 'var(--ds-primitive-color-emerald-700)' }}>
          <p style={{ fontWeight: 600, margin: '0 0 4px 0' }}>Callback Request Received</p>
          <p style={{ fontSize: '14px', margin: 0 }}>Our relationship manager will contact you within 1 business day.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '4px' }}>Phone Number for Callback</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+60 1X-XXX XXXX"
              style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '6px', border: '1px solid var(--ds-color-border-default)' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '4px' }}>Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="doctor@hospital.my"
              style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '6px', border: '1px solid var(--ds-color-border-default)' }}
            />
          </div>

          <Button variant="primary" type="submit" fullWidth>
            Request Relationship Manager Callback
          </Button>
        </form>
      )}
    </div>
  );
};

