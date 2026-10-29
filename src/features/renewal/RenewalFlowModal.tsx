import React, { useState, useEffect } from 'react';
import { useWorkflow } from '../../core/state/WorkflowContext';
import { RenewalService, CustomerPolicyRecord } from '../../core/api/renewalService';
import {
  RotateCcw,
  Phone,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  Download,
  FileText,
  X,
  ExternalLink,
} from 'lucide-react';

export interface RenewalFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  isStandalonePage?: boolean;
}

export const RenewalFlowModal: React.FC<RenewalFlowModalProps> = ({
  isOpen,
  onClose,
  isStandalonePage = false,
}) => {
  const {
    updateDoctorProfile,
    updateCoverage,
    setQuote,
    goToStage,
    announce,
  } = useWorkflow();

  // Wizard Sub-steps: 1: Mobile & Channel, 2: OTP Verification, 3: Policy Selection
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [mobileNumber, setMobileNumber] = useState('0123456789');
  const [otpChannel, setOtpChannel] = useState<'SMS' | 'WHATSAPP'>('SMS');
  const [otpCode, setOtpCode] = useState('');
  const [policies, setPolicies] = useState<CustomerPolicyRecord[]>([]);

  // Timers & Attempt States
  const [resendCountdown, setResendCountdown] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [attemptsRemaining, setAttemptsRemaining] = useState<number>(3);

  // 60-Second Cooldown Timer
  useEffect(() => {
    let timer: any;
    if (resendCountdown > 0) {
      timer = setInterval(() => {
        setResendCountdown((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCountdown]);

  if (!isOpen && !isStandalonePage) return null;

  // Step 1: Request OTP
  const handleRequestOTP = async (targetChannel?: 'SMS' | 'WHATSAPP') => {
    const channelToUse = targetChannel || otpChannel;
    setErrorMessage(null);
    setInfoMessage(null);
    setIsSubmitting(true);

    try {
      const resp = await RenewalService.requestOTP({
        mobileNumber,
        channel: channelToUse,
      });

      setOtpChannel(channelToUse);
      setResendCountdown(60);
      setStep(2);
      setInfoMessage(resp.message);
      announce(resp.message);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to request OTP. Please check your mobile number.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const resp = await RenewalService.verifyOTP({
        mobileNumber,
        otpCode,
      });

      setPolicies(resp.policies);
      setStep(3);
      announce(`Verification successful. Found ${resp.policies.length} policy record(s).`);
    } catch (err: any) {
      setErrorMessage(err.message || 'Invalid verification code.');
      setAttemptsRemaining((prev) => Math.max(0, prev - 1));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 3: Select Policy to Renew
  const handleSelectPolicyForRenewal = (record: CustomerPolicyRecord) => {
    if (record.status === 'ALREADY_RENEWED' || record.status === 'DUPLICATE_ACTIVE') {
      alert(`Policy ${record.policyNumber} is already renewed and in force through ${record.endDate}.`);
      return;
    }

    // Pre-populate Doctor Profile (Tier 1)
    updateDoctorProfile({
      fullName: record.insuredName,
      nric: record.nric,
      mmcNumber: record.mmcNumber,
      email: record.email,
      mobileNumber: record.mobileNumber,
      clinicName: record.clinicName,
    });

    // Pre-populate Coverage Parameters (Tier 2) & Apply Renewal Discount
    const nextYear = new Date().getFullYear();
    updateCoverage({
      classificationId: record.classificationId,
      classificationName: record.classificationName,
      limitOfLiability: record.limitOfLiability,
      limitFormatted: record.limitFormatted,
      startDate: `01/01/${nextYear + 1}`,
      endDate: `31/12/${nextYear + 1}`,
      promoCode: record.renewalCode || 'RENEWAL10',
      promoDiscount: record.renewalDiscountPercent || 10,
      clinic: {
        ownsClinic: record.hasClinicEntity,
        clinicType: record.hasClinicEntity ? 'sole_proprietor' : '',
        hiresLocums: false,
        clinicLiabilityId: record.limitOfLiability,
        clinicLiabilityFormatted: record.limitFormatted,
      },
    });

    // Seed indicative renewed quote with 10% privilege discount
    const gross = record.annualPremium;
    const discount = Number(((gross * 10) / 100).toFixed(2));
    const net = Number((gross - discount).toFixed(2));
    const sst = Number((net * 0.08).toFixed(2));
    const total = Number((net + sst + 10.0).toFixed(2));

    setQuote({
      grossBasePremium: gross,
      annualGrossEquivalent: gross,
      individualNet: net,
      specialtyMultiplier: 1.0,
      addonsTotal: 0,
      discountAmount: discount,
      netTaxablePremium: net,
      sstAmount: sst,
      stampDuty: 10.0,
      totalPayable: total,
      quoteToken: `QT-RENEW-${Date.now().toString(36).toUpperCase()}`,
      quotationNumber: `QTN-${record.policyNumber.replace('CHUBB-DS-', '')}-R`,
      issuedAt: Date.now(),
      expiresAt: Date.now() + 15 * 60 * 1000,
      isProrata: false,
      daysCount: 365,
    });

    announce(`Policy ${record.policyNumber} selected for renewal. Navigating to quotation.`);
    if (onClose) onClose();
    goToStage(2);
  };

  const containerContent = (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: isStandalonePage ? 'var(--ds-primitive-radius-lg)' : 'var(--ds-primitive-radius-xl)',
        maxWidth: '580px',
        width: '100%',
        padding: '32px 28px',
        boxShadow: isStandalonePage ? 'var(--ds-primitive-shadow-md)' : 'var(--ds-primitive-shadow-2xl)',
        position: 'relative',
        textAlign: 'left',
      }}
      data-testid="renewal-modal-content"
    >
      {/* Modal Close Button */}
      {!isStandalonePage && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close renewal modal"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: 'var(--ds-color-text-muted)',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={20} />
        </button>
      )}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '10px',
            backgroundColor: 'var(--ds-primitive-color-teal-50)',
            color: 'var(--ds-primitive-color-teal-700)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          <RotateCcw size={22} />
        </div>
        <div>
          <h2
            style={{
              fontFamily: 'var(--ds-primitive-font-heading)',
              fontSize: '1.35rem',
              fontWeight: 500,
              color: 'var(--ds-primitive-color-navy-900)',
              margin: '0 0 2px 0',
            }}
          >
            Policy Renewal Verification
          </h2>
          <div style={{ fontSize: '12px', color: 'var(--ds-color-text-secondary)' }}>
            DoctorShield Existing Customer Recognition & Policy Continuation
          </div>
        </div>
      </div>

      {/* Step Indicator */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '24px',
          fontSize: '12px',
          fontWeight: 600,
        }}
      >
        <span
          style={{
            padding: '4px 10px',
            borderRadius: '12px',
            backgroundColor: step === 1 ? 'var(--ds-primitive-color-teal-500)' : 'var(--ds-primitive-color-slate-100)',
            color: step === 1 ? '#FFFFFF' : 'var(--ds-color-text-muted)',
          }}
        >
          1. Mobile Entry
        </span>
        <span style={{ color: 'var(--ds-color-border-default)' }}>&rarr;</span>
        <span
          style={{
            padding: '4px 10px',
            borderRadius: '12px',
            backgroundColor: step === 2 ? 'var(--ds-primitive-color-teal-500)' : 'var(--ds-primitive-color-slate-100)',
            color: step === 2 ? '#FFFFFF' : 'var(--ds-color-text-muted)',
          }}
        >
          2. OTP Verification
        </span>
        <span style={{ color: 'var(--ds-color-border-default)' }}>&rarr;</span>
        <span
          style={{
            padding: '4px 10px',
            borderRadius: '12px',
            backgroundColor: step === 3 ? 'var(--ds-primitive-color-teal-500)' : 'var(--ds-primitive-color-slate-100)',
            color: step === 3 ? '#FFFFFF' : 'var(--ds-color-text-muted)',
          }}
        >
          3. Select Policy
        </span>
      </div>

      {/* Error & Info Banners */}
      {errorMessage && (
        <div
          role="alert"
          style={{
            padding: '12px 14px',
            borderRadius: 'var(--ds-primitive-radius-md)',
            backgroundColor: '#FEF2F2',
            border: '1px solid #F87171',
            color: '#991B1B',
            fontSize: '13px',
            lineHeight: 1.5,
            marginBottom: '16px',
          }}
        >
          <strong>Notice:</strong> {errorMessage}
        </div>
      )}

      {infoMessage && (
        <div
          style={{
            padding: '12px 14px',
            borderRadius: 'var(--ds-primitive-radius-md)',
            backgroundColor: '#F0FDFA',
            border: '1px solid var(--ds-primitive-color-teal-200)',
            color: 'var(--ds-primitive-color-teal-900)',
            fontSize: '13px',
            lineHeight: 1.5,
            marginBottom: '16px',
          }}
        >
          {infoMessage}
        </div>
      )}

      {/* STEP 1: MOBILE & CHANNEL */}
      {step === 1 && (
        <div>
          <p style={{ fontSize: '13px', color: 'var(--ds-color-text-secondary)', lineHeight: 1.5, marginBottom: '20px' }}>
            Enter your registered Malaysian mobile number to look up your existing DoctorShield indemnity policies and apply your guaranteed <strong>10% Renewal Privilege Discount</strong>.
          </p>

          <div style={{ marginBottom: '18px' }}>
            <label
              htmlFor="renewal_mobile_input"
              style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--ds-primitive-color-navy-900)', marginBottom: '6px' }}
            >
              Registered Mobile Number <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span
                style={{
                  padding: '10px 14px',
                  backgroundColor: 'var(--ds-primitive-color-slate-100)',
                  border: '1px solid var(--ds-color-border-default)',
                  borderRight: 'none',
                  borderRadius: 'var(--ds-primitive-radius-md) 0 0 var(--ds-primitive-radius-md)',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--ds-primitive-color-navy-800)',
                }}
              >
                +60
              </span>
              <input
                id="renewal_mobile_input"
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="12 345 6789"
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  border: '1px solid var(--ds-color-border-default)',
                  borderRadius: '0 var(--ds-primitive-radius-md) var(--ds-primitive-radius-md) 0',
                  fontSize: '14px',
                  outline: 'none',
                }}
                data-testid="renewal-mobile-input"
              />
            </div>
          </div>

          {/* OTP Channel Selector */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--ds-primitive-color-navy-900)', marginBottom: '8px' }}>
              Preferred Verification Channel:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setOtpChannel('SMS')}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--ds-primitive-radius-md)',
                  border: otpChannel === 'SMS' ? '2px solid var(--ds-primitive-color-teal-600)' : '1px solid var(--ds-color-border-default)',
                  backgroundColor: otpChannel === 'SMS' ? '#F0FDFA' : '#FFFFFF',
                  color: 'var(--ds-primitive-color-navy-900)',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  justifyContent: 'center',
                }}
                data-testid="channel-sms-btn"
              >
                <MessageSquare size={16} color="var(--ds-primitive-color-teal-700)" />
                <span>Message OTP (SMS)</span>
              </button>

              <button
                type="button"
                onClick={() => setOtpChannel('WHATSAPP')}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--ds-primitive-radius-md)',
                  border: otpChannel === 'WHATSAPP' ? '2px solid #10B981' : '1px solid var(--ds-color-border-default)',
                  backgroundColor: otpChannel === 'WHATSAPP' ? '#ECFDF5' : '#FFFFFF',
                  color: 'var(--ds-primitive-color-navy-900)',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  justifyContent: 'center',
                }}
                data-testid="channel-whatsapp-btn"
              >
                <Phone size={16} color="#059669" />
                <span>WhatsApp OTP</span>
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleRequestOTP()}
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '12px 20px',
              borderRadius: 'var(--ds-primitive-radius-md)',
              backgroundColor: 'var(--ds-primitive-color-teal-500)',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '14px',
              fontWeight: 600,
              cursor: isSubmitting ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: 'var(--ds-primitive-shadow-sm)',
            }}
            data-testid="generate-otp-btn"
          >
            <span>{isSubmitting ? 'Dispatching Code...' : 'Generate Verification OTP'}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* STEP 2: OTP VERIFICATION */}
      {step === 2 && (
        <form onSubmit={handleVerifyOTP}>
          <p style={{ fontSize: '13px', color: 'var(--ds-color-text-secondary)', lineHeight: 1.5, marginBottom: '20px' }}>
            A 6-digit code has been sent via <strong>{otpChannel === 'WHATSAPP' ? 'WhatsApp' : 'SMS'}</strong> to{' '}
            <strong>+60 {mobileNumber}</strong>. (For test demonstration, use code <code>123456</code>).
          </p>

          <div style={{ marginBottom: '20px' }}>
            <label
              htmlFor="otp_code_input"
              style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--ds-primitive-color-navy-900)', marginBottom: '8px' }}
            >
              Enter 6-Digit Code <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <input
              id="otp_code_input"
              type="text"
              maxLength={6}
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
              placeholder="123456"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid var(--ds-primitive-color-teal-500)',
                borderRadius: 'var(--ds-primitive-radius-md)',
                fontSize: '1.25rem',
                fontFamily: 'var(--ds-primitive-font-mono)',
                textAlign: 'center',
                letterSpacing: '0.25em',
                outline: 'none',
              }}
              data-testid="otp-input"
              autoFocus
            />
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '12px',
              color: 'var(--ds-color-text-muted)',
              marginBottom: '24px',
            }}
          >
            <div>
              {resendCountdown > 0 ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={13} />
                  Resend available in {resendCountdown}s
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => handleRequestOTP(otpChannel)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--ds-primitive-color-teal-700)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    padding: 0,
                    textDecoration: 'underline',
                  }}
                  data-testid="resend-otp-btn"
                >
                  Resend Code via {otpChannel}
                </button>
              )}
            </div>

            {/* WhatsApp Fallback */}
            {otpChannel === 'SMS' && (
              <button
                type="button"
                onClick={() => handleRequestOTP('WHATSAPP')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#059669',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: 0,
                  textDecoration: 'underline',
                }}
                data-testid="fallback-whatsapp-btn"
              >
                Send via WhatsApp
              </button>
            )}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={() => setStep(1)}
              style={{
                padding: '12px 18px',
                borderRadius: 'var(--ds-primitive-radius-md)',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--ds-color-border-default)',
                color: 'var(--ds-color-text-secondary)',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Back
            </button>

            <button
              type="submit"
              disabled={isSubmitting || otpCode.length !== 6}
              style={{
                flex: 1,
                padding: '12px 20px',
                borderRadius: 'var(--ds-primitive-radius-md)',
                backgroundColor: 'var(--ds-primitive-color-teal-500)',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '14px',
                fontWeight: 600,
                cursor: isSubmitting || otpCode.length !== 6 ? 'not-allowed' : 'pointer',
                opacity: otpCode.length === 6 ? 1 : 0.6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
              data-testid="verify-otp-btn"
            >
              <span>{isSubmitting ? 'Verifying...' : 'Verify Code & View Policies'}</span>
              <CheckCircle2 size={16} />
            </button>
          </div>
        </form>
      )}

      {/* STEP 3: POLICY SELECTION LIST (MODAL-12 jsUserPolicyList) */}
      {step === 3 && (
        <div>
          <p style={{ fontSize: '13px', color: 'var(--ds-color-text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
            We found the following active indemnity policies underwritten by Chubb registered to this mobile number:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {policies.map((p) => {
              const isRenewable = p.status === 'RENEWABLE';
              const isAlreadyRenewed = p.status === 'ALREADY_RENEWED';
              const isDuplicateActive = p.status === 'DUPLICATE_ACTIVE';

              return (
                <div
                  key={p.policyNumber}
                  style={{
                    padding: '16px',
                    borderRadius: 'var(--ds-primitive-radius-md)',
                    border: isRenewable ? '1.5px solid var(--ds-primitive-color-teal-500)' : '1px solid var(--ds-color-border-subtle)',
                    backgroundColor: isRenewable ? 'var(--ds-primitive-color-teal-50)' : '#FFFFFF',
                  }}
                  data-testid="policy-record-card"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          color: 'var(--ds-color-text-muted)',
                          textTransform: 'uppercase',
                        }}
                      >
                        Chubb Policy Number
                      </span>
                      <div
                        style={{
                          fontFamily: 'var(--ds-primitive-font-mono)',
                          fontSize: '14px',
                          fontWeight: 700,
                          color: 'var(--ds-primitive-color-navy-900)',
                        }}
                      >
                        {p.policyNumber}
                      </div>
                    </div>

                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: 600,
                        backgroundColor: isRenewable ? 'var(--ds-primitive-color-emerald-100)' : '#FEF3C7',
                        color: isRenewable ? 'var(--ds-primitive-color-emerald-800)' : '#92400E',
                      }}
                    >
                      {isRenewable ? 'Eligible for Renewal' : isAlreadyRenewed ? 'Already Renewed' : 'Active In-Force'}
                    </span>
                  </div>

                  <div style={{ fontSize: '12px', color: 'var(--ds-color-text-secondary)', marginBottom: '12px', lineHeight: 1.5 }}>
                    <div>Practitioner: <strong>{p.insuredName}</strong> (MMC: {p.mmcNumber})</div>
                    <div>Specialty: <strong>{p.classificationName}</strong></div>
                    <div>Limit: <strong>{p.limitFormatted}</strong> | Policy Expiry: <strong>{p.endDate}</strong></div>
                  </div>

                  {isRenewable ? (
                    <button
                      type="button"
                      onClick={() => handleSelectPolicyForRenewal(p)}
                      style={{
                        width: '100%',
                        padding: '10px 16px',
                        borderRadius: 'var(--ds-primitive-radius-md)',
                        backgroundColor: 'var(--ds-primitive-color-teal-500)',
                        color: '#FFFFFF',
                        border: 'none',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                      }}
                      data-testid="renew-policy-cta"
                    >
                      <RotateCcw size={15} />
                      <span>Renew Policy & Apply 10% Discount ({p.renewalCode})</span>
                    </button>
                  ) : (
                    <div style={{ fontSize: '12px', color: '#92400E', backgroundColor: '#FFFBEB', padding: '8px 12px', borderRadius: '4px' }}>
                      This policy is already in force. If you need an endorsement or certificate re-issuance, please contact DoctorShield support.
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                fontSize: '13px',
                color: 'var(--ds-color-text-muted)',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Exit Renewal & Return Home
            </button>
          </div>
        </div>
      )}
    </div>
  );

  if (isStandalonePage) {
    return (
      <div style={{ maxWidth: '640px', margin: '32px auto', padding: '0 16px' }}>
        {containerContent}
      </div>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="renewal-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(19, 39, 102, 0.75)',
        backdropFilter: 'blur(3px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      data-testid="renewal-modal-backdrop"
    >
      {containerContent}
    </div>
  );
};

