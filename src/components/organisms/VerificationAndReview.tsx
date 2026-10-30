import React, { useState } from 'react';
import { ShieldCheck, MessageSquare, Phone, CreditCard, Building, ArrowRight, Lock } from 'lucide-react';
import { Button } from '../ui/Button';
import { MalaysianMobileField } from '../form/ContactFields';
import { OtpDigitEntry } from '../form/OtpDigitEntry';
import { InlineEditAction } from '../form/InlineEditAction';
import { LegalConsentCheckbox } from '../form/LegalConsentCheckbox';
import { PremiumBreakdownTable, QuotationFinancialData } from './FinancialSummaries';

/* ========================================================================
   14. OTP VERIFICATION ORGANISM
   ======================================================================== */
export interface OtpVerificationOrganismProps {
  mobileNumber: string;
  onMobileNumberChange: (num: string) => void;
  onOtpSubmit: (code: string) => Promise<boolean> | void;
  onResendOtp?: () => void;
  channel?: 'SMS' | 'WHATSAPP';
  onChannelChange?: (channel: 'SMS' | 'WHATSAPP') => void;
  resendCountdown?: number;
  isLoading?: boolean;
  errorMessage?: string;
  className?: string;
}

/**
 * DoctorShield OTP Verification Organism
 * 2-Phase verification: Mobile & Channel selector -> 6-digit OTP entry with countdown.
 */
export const OtpVerificationOrganism: React.FC<OtpVerificationOrganismProps> = ({
  mobileNumber,
  onMobileNumberChange,
  onOtpSubmit,
  onResendOtp,
  channel = 'SMS',
  onChannelChange,
  resendCountdown = 0,
  isLoading = false,
  errorMessage,
  className = '',
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [otpCode, setOtpCode] = useState('');

  const handleRequestOtp = () => {
    if (mobileNumber.length >= 9) {
      setStep(2);
      onResendOtp?.();
    }
  };

  const handleVerify = () => {
    if (otpCode.length === 6) {
      onOtpSubmit(otpCode);
    }
  };

  return (
    <div
      className={`ds-otp-organism ${className}`}
      style={{
        maxWidth: '460px',
        margin: '0 auto',
        padding: '28px',
        backgroundColor: 'var(--ds-color-surface-base)',
        border: '1px solid var(--ds-color-border-subtle)',
        borderRadius: 'var(--ds-comp-panel-radius)',
        boxShadow: 'var(--ds-primitive-shadow-xs)',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: 'var(--ds-primitive-color-teal-50)',
            color: 'var(--ds-primitive-color-teal-700)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '10px',
          }}
        >
          <ShieldCheck size={22} />
        </div>
        <h3
          style={{
            fontFamily: 'var(--ds-primitive-font-heading)',
            fontSize: '18px',
            fontWeight: 500,
            color: 'var(--ds-primitive-color-navy-900)',
            margin: '0 0 6px 0',
          }}
        >
          Practitioner Verification
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--ds-color-text-secondary)', margin: 0 }}>
          Verify your registered mobile number to authorize application access.
        </p>
      </div>

      {step === 1 ? (
        <div>
          <MalaysianMobileField
            value={mobileNumber}
            onChange={onMobileNumberChange}
            helperText="A 6-digit one-time passcode will be dispatched."
          />

          {/* Verification Channel Selector */}
          {onChannelChange && (
            <div style={{ marginBottom: '20px' }}>
              <span style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--ds-color-text-secondary)', marginBottom: '8px' }}>
                Delivery Channel:
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => onChannelChange('SMS')}
                  style={{
                    height: '40px',
                    borderRadius: '6px',
                    border: `1px solid ${channel === 'SMS' ? 'var(--ds-color-brand-primary)' : 'var(--ds-color-border-subtle)'}`,
                    backgroundColor: channel === 'SMS' ? 'var(--ds-primitive-color-teal-50)' : 'transparent',
                    color: channel === 'SMS' ? 'var(--ds-color-brand-secondary)' : 'var(--ds-color-text-secondary)',
                    fontWeight: channel === 'SMS' ? 600 : 400,
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                  }}
                >
                  <Phone size={15} />
                  <span>SMS</span>
                </button>

                <button
                  type="button"
                  onClick={() => onChannelChange('WHATSAPP')}
                  style={{
                    height: '40px',
                    borderRadius: '6px',
                    border: `1px solid ${channel === 'WHATSAPP' ? 'var(--ds-color-brand-primary)' : 'var(--ds-color-border-subtle)'}`,
                    backgroundColor: channel === 'WHATSAPP' ? 'var(--ds-primitive-color-teal-50)' : 'transparent',
                    color: channel === 'WHATSAPP' ? 'var(--ds-color-brand-secondary)' : 'var(--ds-color-text-secondary)',
                    fontWeight: channel === 'WHATSAPP' ? 600 : 400,
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                  }}
                >
                  <MessageSquare size={15} />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          )}

          <Button
            type="button"
            variant="primary"
            onClick={handleRequestOtp}
            disabled={mobileNumber.length < 9 || isLoading}
            loading={isLoading}
            style={{ width: '100%', height: '48px', fontSize: '15px' }}
          >
            Dispatch Passcode
          </Button>
        </div>
      ) : (
        <div>
          <OtpDigitEntry
            value={otpCode}
            onChange={setOtpCode}
            onComplete={() => handleVerify()}
            onResend={onResendOtp}
            resendCountdown={resendCountdown}
            channel={channel}
            mobileNumber={mobileNumber}
            errorMessage={errorMessage}
          />

          <Button
            type="button"
            variant="primary"
            onClick={handleVerify}
            disabled={otpCode.length !== 6 || isLoading}
            loading={isLoading}
            style={{ width: '100%', height: '48px', fontSize: '15px', marginTop: '16px' }}
          >
            Confirm Passcode
          </Button>

          <button
            type="button"
            onClick={() => setStep(1)}
            style={{
              width: '100%',
              background: 'none',
              border: 'none',
              padding: '10px 0',
              marginTop: '8px',
              fontSize: '12px',
              color: 'var(--ds-color-text-secondary)',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Change mobile number
          </button>
        </div>
      )}
    </div>
  );
};

/* ========================================================================
   15. REVIEW AND PAYMENT COMPOSITION ORGANISM
   ======================================================================== */
export interface ReviewAndPaymentCompositionProps {
  doctorName: string;
  nric: string;
  specialtyName: string;
  limitFormatted: string;
  startDate: string;
  endDate?: string;
  quote: QuotationFinancialData;
  paymentMethod: 'personal' | 'corporate';
  onPaymentMethodChange: (m: 'personal' | 'corporate') => void;
  consents: { pidm: boolean; statutory: boolean; pdpa: boolean };
  onConsentChange: (key: 'pidm' | 'statutory' | 'pdpa', val: boolean) => void;
  onEditSection?: (section: 'coverage' | 'particulars') => void;
  onAuthorizePayment: () => void;
  isSubmitting?: boolean;
  className?: string;
}

/**
 * DoctorShield Review and Payment Composition Organism
 * Unifies confirmed policy parameters, inline edits, itemized breakdown,
 * payment channel selection, statutory consents, and checkout CTA.
 */
export const ReviewAndPaymentComposition: React.FC<ReviewAndPaymentCompositionProps> = ({
  doctorName,
  nric,
  specialtyName,
  limitFormatted,
  startDate,
  endDate = `${new Date().getFullYear()}-12-31`,
  quote,
  paymentMethod,
  onPaymentMethodChange,
  consents,
  onConsentChange,
  onEditSection,
  onAuthorizePayment,
  isSubmitting = false,
  className = '',
}) => {
  const allConsented = consents.pidm && consents.statutory && consents.pdpa;

  return (
    <div className={`ds-review-payment-comp ${className}`} style={{ marginBottom: '40px' }}>
      {/* 1. Confirmed Applicant Parameters */}
      <div
        style={{
          padding: '24px',
          backgroundColor: 'var(--ds-color-surface-base)',
          border: '1px solid var(--ds-color-border-subtle)',
          borderRadius: 'var(--ds-comp-panel-radius)',
          marginBottom: '24px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3
            style={{
              fontFamily: 'var(--ds-primitive-font-heading)',
              fontSize: '16px',
              fontWeight: 500,
              color: 'var(--ds-primitive-color-navy-900)',
              margin: 0,
            }}
          >
            Policyholder Particulars
          </h3>
          {onEditSection && (
            <button
              type="button"
              onClick={() => onEditSection('particulars')}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '12px',
                color: 'var(--ds-primitive-color-teal-800)',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              Edit Particulars
            </button>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <InlineEditAction id="rev_name" label="Practitioner Full Name" value={doctorName} />
          <InlineEditAction id="rev_nric" label="NRIC Number" value={nric} />
          <InlineEditAction id="rev_spec" label="Risk Classification" value={specialtyName} />
          <InlineEditAction id="rev_limit" label="Indemnity Limit" value={limitFormatted} />
        </div>
      </div>

      {/* 2. Itemized Financial Table */}
      <div style={{ marginBottom: '24px' }}>
        <PremiumBreakdownTable quote={quote} />
      </div>

      {/* 3. Payment Channel Selector */}
      <div
        style={{
          padding: '24px',
          backgroundColor: 'var(--ds-color-surface-base)',
          border: '1px solid var(--ds-color-border-subtle)',
          borderRadius: 'var(--ds-comp-panel-radius)',
          marginBottom: '24px',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--ds-primitive-font-heading)',
            fontSize: '16px',
            fontWeight: 500,
            color: 'var(--ds-primitive-color-navy-900)',
            margin: '0 0 16px 0',
          }}
        >
          Select Payment Arrangement
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
          <button
            type="button"
            role="radio"
            aria-checked={paymentMethod === 'personal'}
            onClick={() => onPaymentMethodChange('personal')}
            style={{
              padding: '16px',
              borderRadius: 'var(--ds-comp-input-radius)',
              border: `2px solid ${paymentMethod === 'personal' ? 'var(--ds-color-brand-primary)' : 'var(--ds-color-border-subtle)'}`,
              backgroundColor: paymentMethod === 'personal' ? 'var(--ds-primitive-color-teal-50)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <CreditCard size={20} color="var(--ds-color-brand-secondary)" />
            <div>
              <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--ds-color-text-primary)' }}>Personal Card</div>
              <div style={{ fontSize: '12px', color: 'var(--ds-color-text-secondary)' }}>Visa / Mastercard Credit or Debit</div>
            </div>
          </button>

          <button
            type="button"
            role="radio"
            aria-checked={paymentMethod === 'corporate'}
            onClick={() => onPaymentMethodChange('corporate')}
            style={{
              padding: '16px',
              borderRadius: 'var(--ds-comp-input-radius)',
              border: `2px solid ${paymentMethod === 'corporate' ? 'var(--ds-color-brand-primary)' : 'var(--ds-color-border-subtle)'}`,
              backgroundColor: paymentMethod === 'corporate' ? 'var(--ds-primitive-color-teal-50)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <Building size={20} color="var(--ds-color-brand-secondary)" />
            <div>
              <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--ds-color-text-primary)' }}>Corporate / Clinic</div>
              <div style={{ fontSize: '12px', color: 'var(--ds-color-text-secondary)' }}>Corporate Card / Business FPX</div>
            </div>
          </button>
        </div>
      </div>

      {/* 4. Statutory Legal Consents */}
      <div style={{ marginBottom: '28px' }}>
        <LegalConsentCheckbox
          id="rev_pidm"
          checked={consents.pidm}
          onChange={(val) => onConsentChange('pidm', val)}
          required
        >
          I acknowledge that the insurance benefits payable under this certificate are protected by PIDM up to statutory
          limits. I have reviewed the PIDM TIPS brochure.
        </LegalConsentCheckbox>

        <LegalConsentCheckbox
          id="rev_statutory"
          checked={consents.statutory}
          onChange={(val) => onConsentChange('statutory', val)}
          required
        >
          I hereby declare that all answers and declarations submitted in this proposal are true and complete. I agree
          that this proposal shall form the basis of the insurance contract with Chubb Insurance Malaysia Berhad.
        </LegalConsentCheckbox>

        <LegalConsentCheckbox
          id="rev_pdpa"
          checked={consents.pdpa}
          onChange={(val) => onConsentChange('pdpa', val)}
          required
        >
          I consent to the collection, processing, and disclosure of my personal and practice data by JA Assure and Chubb
          Insurance Malaysia Berhad in accordance with the Personal Data Protection Act 2010 (PDPA).
        </LegalConsentCheckbox>
      </div>

      {/* 5. Authorize Payment CTA */}
      <Button
        type="button"
        variant="primary"
        onClick={onAuthorizePayment}
        disabled={!allConsented || isSubmitting}
        loading={isSubmitting}
        style={{ width: '100%', height: '52px', fontSize: '16px' }}
      >
        <Lock size={16} />
        <span>Authorize Payment & Bind Policy (RM {quote.totalPayable.toFixed(2)})</span>
        <ArrowRight size={16} />
      </Button>
    </div>
  );
};

