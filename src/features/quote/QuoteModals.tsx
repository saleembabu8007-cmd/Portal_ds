import React, { useState } from 'react';
import {
  Building2,
  ShieldCheck,
  Mail,
  CheckCircle2,
  AlertCircle,
  X,
  FileText,
  Clock,
  Sparkles,
} from 'lucide-react';
import { RatingService } from '../../core/api/ratingService';

/* ========================================================================
   1. CLINIC FACILITY "WHY IS THIS RECOMMENDED?" MODAL
   ======================================================================== */
export interface ClinicWhyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClinicWhyModal: React.FC<ClinicWhyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="clinic-why-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'rgba(19, 39, 102, 0.65)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        style={{
          maxWidth: '560px',
          width: '100%',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--ds-primitive-radius-xl)',
          padding: '28px',
          boxShadow: 'var(--ds-primitive-shadow-xl)',
          border: '1px solid var(--ds-color-border-subtle)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                backgroundColor: 'var(--ds-primitive-color-teal-50)',
                color: 'var(--ds-primitive-color-teal-700)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Building2 size={20} />
            </div>
            <h3
              id="clinic-why-title"
              style={{
                fontFamily: 'var(--ds-primitive-font-heading)',
                fontSize: '1.25rem',
                fontWeight: 500,
                color: 'var(--ds-color-text-heading)',
                margin: 0,
              }}
            >
              Why is Clinic Facility Cover Recommended?
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ds-color-text-muted)' }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ fontSize: '14px', color: 'var(--ds-color-text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
          <p style={{ margin: '0 0 12px 0' }}>
            As a private clinic owner or operating partner, your <strong>individual indemnity policy</strong> protects only your personal acts of clinical treatment.
          </p>
          <div
            style={{
              padding: '14px 16px',
              backgroundColor: 'var(--ds-primitive-color-slate-50)',
              borderRadius: 'var(--ds-primitive-radius-md)',
              border: '1px solid var(--ds-color-border-subtle)',
              marginBottom: '14px',
            }}
          >
            <strong style={{ color: 'var(--ds-primitive-color-navy-900)', display: 'block', marginBottom: '6px' }}>
              The Vicarious Liability Risk:
            </strong>
            Under Malaysian civil law, patients and legal representatives increasingly name the <strong>clinic legal entity (Sole Proprietorship, Partnership, or Sdn Bhd)</strong> as a co-defendant in medical lawsuits for:
            <ul style={{ margin: '6px 0 0 0', paddingLeft: '20px' }}>
              <li>Medication dispensing errors by clinic assistants or dispensers</li>
              <li>Injection errors, vaccine mix-ups, or dressing negligence by nursing staff</li>
              <li>Clerical and administrative record-keeping errors leading to delayed diagnosis</li>
              <li>Facility and premises sanitary or procedural liability</li>
            </ul>
          </div>
          <p style={{ margin: 0 }}>
            The <strong>Chubb Clinic Entity Facility Endorsement</strong> ensures that your business entity has dedicated legal representation and independent indemnity limits, preventing personal asset exposure.
          </p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              minHeight: '40px',
              padding: '0 20px',
              borderRadius: 'var(--ds-primitive-radius-md)',
              backgroundColor: 'var(--ds-primitive-color-navy-900)',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================
   2. PERSON-IN-CHARGE (PIC) "WHY IS THIS RECOMMENDED?" MODAL
   ======================================================================== */
export interface PicWhyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PicWhyModal: React.FC<PicWhyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pic-why-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'rgba(19, 39, 102, 0.65)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        style={{
          maxWidth: '560px',
          width: '100%',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--ds-primitive-radius-xl)',
          padding: '28px',
          boxShadow: 'var(--ds-primitive-shadow-xl)',
          border: '1px solid var(--ds-color-border-subtle)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                backgroundColor: 'var(--ds-primitive-color-teal-50)',
                color: 'var(--ds-primitive-color-teal-700)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShieldCheck size={20} />
            </div>
            <h3
              id="pic-why-title"
              style={{
                fontFamily: 'var(--ds-primitive-font-heading)',
                fontSize: '1.25rem',
                fontWeight: 500,
                color: 'var(--ds-color-text-heading)',
                margin: 0,
              }}
            >
              Why is Person-In-Charge (PIC) Protection Recommended?
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ds-color-text-muted)' }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ fontSize: '14px', color: 'var(--ds-color-text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
          <p style={{ margin: '0 0 12px 0' }}>
            Under the <strong>Private Healthcare Facilities and Services Act 1998 (PHFSA 1998 / Act 586)</strong>, the designated Person-in-Charge is held personally and statutorily accountable for clinic licensing and operations.
          </p>
          <div
            style={{
              padding: '14px 16px',
              backgroundColor: 'var(--ds-primitive-color-slate-50)',
              borderRadius: 'var(--ds-primitive-radius-md)',
              border: '1px solid var(--ds-color-border-subtle)',
              marginBottom: '14px',
            }}
          >
            <strong style={{ color: 'var(--ds-primitive-color-navy-900)', display: 'block', marginBottom: '6px' }}>
              Statutory Exposure Under PHFSA 1998:
            </strong>
            Even if an incident involves another doctor or clinic locum, the Ministry of Health (MOH) or regulatory boards can initiate formal inquiries, compound notices, or court summons directly against the PIC for:
            <ul style={{ margin: '6px 0 0 0', paddingLeft: '20px' }}>
              <li>Non-compliance with staffing and emergency facility standards</li>
              <li>Improper drug storage, record maintenance, or dangerous drug registers</li>
              <li>Locum practitioner credentialing or supervision oversights</li>
            </ul>
          </div>
          <p style={{ margin: 0 }}>
            This extension reimburses your <strong>legal defense representation, statutory inquiry costs, and hearing expenses</strong> when targeted as the PIC, which are not covered by standard personal medical indemnity.
          </p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              minHeight: '40px',
              padding: '0 20px',
              borderRadius: 'var(--ds-primitive-radius-md)',
              backgroundColor: 'var(--ds-primitive-color-navy-900)',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================
   3. EMAIL QUOTATION MODAL (ACT-QUOTE-EMAIL-001)
   ======================================================================== */
export interface EmailQuoteModalProps {
  isOpen: boolean;
  quotationNumber: string;
  quoteToken: string;
  defaultEmail: string;
  onClose: () => void;
  onSuccess: (email: string) => void;
}

export const EmailQuoteModal: React.FC<EmailQuoteModalProps> = ({
  isOpen,
  quotationNumber,
  quoteToken,
  defaultEmail,
  onClose,
  onSuccess,
}) => {
  const [email, setEmail] = useState(defaultEmail);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<string | null>(null);

  React.useEffect(() => {
    if (defaultEmail) {
      setEmail(defaultEmail);
    }
  }, [defaultEmail]);

  if (!isOpen) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setErrorMessage('Please enter an email address.');
      return;
    }
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSending(true);
    try {
      const res = await RatingService.sendIndicativeQuoteMail(
        email.trim(),
        quoteToken,
        quotationNumber
      );
      setSuccessInfo(res.message);
      onSuccess(email.trim());
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : 'Unable to dispatch email. Please try again.'
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="email-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'rgba(19, 39, 102, 0.65)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        style={{
          maxWidth: '520px',
          width: '100%',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--ds-primitive-radius-xl)',
          padding: '28px',
          boxShadow: 'var(--ds-primitive-shadow-xl)',
          border: '1px solid var(--ds-color-border-subtle)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                backgroundColor: 'var(--ds-primitive-color-teal-50)',
                color: 'var(--ds-primitive-color-teal-700)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Mail size={20} />
            </div>
            <h3
              id="email-modal-title"
              style={{
                fontFamily: 'var(--ds-primitive-font-heading)',
                fontSize: '1.25rem',
                fontWeight: 500,
                color: 'var(--ds-color-text-heading)',
                margin: 0,
              }}
            >
              Email Indicative Quotation
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ds-color-text-muted)' }}
          >
            <X size={20} />
          </button>
        </div>

        {successInfo ? (
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '16px',
                borderRadius: 'var(--ds-primitive-radius-md)',
                backgroundColor: 'var(--ds-primitive-color-emerald-50)',
                border: '1px solid var(--ds-primitive-color-emerald-500)',
                marginBottom: '20px',
              }}
            >
              <CheckCircle2 size={22} color="var(--ds-primitive-color-emerald-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '13px', color: 'var(--ds-primitive-color-emerald-800)', lineHeight: 1.5 }}>
                {successInfo}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  minHeight: '40px',
                  padding: '0 24px',
                  borderRadius: 'var(--ds-primitive-radius-md)',
                  backgroundColor: 'var(--ds-primitive-color-navy-900)',
                  color: '#FFFFFF',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSend} noValidate>
            <p style={{ fontSize: '14px', color: 'var(--ds-color-text-secondary)', margin: '0 0 16px 0', lineHeight: 1.5 }}>
              Receive an official Chubb quotation summary schedule (Ref: <strong>{quotationNumber}</strong>) and complete policy wording PDF. This quotation rate is guaranteed for <strong>30 days</strong>.
            </p>

            {errorMessage && (
              <div
                role="alert"
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--ds-primitive-radius-md)',
                  backgroundColor: 'var(--ds-primitive-color-rose-50)',
                  border: '1px solid var(--ds-primitive-color-rose-500)',
                  color: 'var(--ds-primitive-color-rose-700)',
                  fontSize: '13px',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            <div style={{ marginBottom: '20px' }}>
              <label
                htmlFor="email-recipient-input"
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--ds-color-text-heading)',
                  marginBottom: '6px',
                }}
              >
                Recipient Email Address <span style={{ color: 'var(--ds-primitive-color-rose-700)' }}>*</span>
              </label>

              <input
                id="email-recipient-input"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMessage(null);
                }}
                style={{
                  width: '100%',
                  minHeight: '44px',
                  padding: '0 14px',
                  fontSize: '14px',
                  borderRadius: 'var(--ds-primitive-radius-md)',
                  border: '1px solid var(--ds-color-border-default)',
                  outline: 'none',
                  fontFamily: 'var(--ds-primitive-font-body)',
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  minHeight: '42px',
                  padding: '0 18px',
                  borderRadius: 'var(--ds-primitive-radius-md)',
                  border: '1px solid var(--ds-color-border-default)',
                  backgroundColor: '#FFFFFF',
                  color: 'var(--ds-color-text-primary)',
                  fontWeight: 500,
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSending}
                style={{
                  minHeight: '42px',
                  padding: '0 24px',
                  borderRadius: 'var(--ds-primitive-radius-md)',
                  border: 'none',
                  backgroundColor: 'var(--ds-color-action-primary)',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: isSending ? 'not-allowed' : 'pointer',
                  opacity: isSending ? 0.7 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Mail size={16} />
                <span>{isSending ? 'Sending...' : 'Send Quotation PDF'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
