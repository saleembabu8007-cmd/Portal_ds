import React, { useState } from 'react';
import { useWorkflow } from '../../core/state/WorkflowContext';
import {
  ShieldAlert,
  PhoneCall,
  Mail,
  Clock,
  RefreshCcw,
  CheckCircle2,
  Calendar,
  Send,
  User,
  Building2,
  Phone,
} from 'lucide-react';
import { UnderwritingService, ReferralCallbackRequest } from '../../core/api/underwritingService';

export const ReferralScaffold: React.FC = () => {
  const { referralReason, referralReference, resetWorkflow, doctorProfile, announce } = useWorkflow();

  const refCode = referralReference || 'REF-2026-84920';

  // Relationship Manager Callback Form State (FLD-REF-070..073)
  const [contactName, setContactName] = useState(doctorProfile.fullName || '');
  const [clinicalName, setClinicalName] = useState(doctorProfile.clinicalName || '');
  const [contactPhone, setContactPhone] = useState(doctorProfile.mobilePhone || '');
  const [contactEmail, setContactEmail] = useState(doctorProfile.email || '');
  const [preferredTime, setPreferredTime] = useState<'morning' | 'afternoon'>('morning');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [callbackSuccessMessage, setCallbackSuccessMessage] = useState<string | null>(null);
  const [callbackError, setCallbackError] = useState<string | null>(null);

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCallbackError(null);

    if (!contactName.trim() || !contactPhone.trim() || !contactEmail.trim()) {
      setCallbackError('Please provide your name, mobile number, and email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await UnderwritingService.submitReferralCallback({
        contactName,
        clinicalName,
        contactPhone,
        contactEmail,
        preferredTime,
        referralReference: refCode,
        referralReason: referralReason || 'Medical underwriting review required',
        additionalNotes,
      });

      setCallbackSuccessMessage(response.message);
      announce(response.message);
    } catch (err: any) {
      setCallbackError(err.message || 'Failed to submit callback request. Please call our direct helpline.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center', padding: '16px 8px 48px' }}>
      {/* Calm, Dignified Icon Badge */}
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: '#FEF3C7',
          color: '#B45309',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
          border: '1px solid #FDE68A',
        }}
        aria-hidden="true"
      >
        <ShieldAlert size={26} strokeWidth={2.2} />
      </div>

      <div
        style={{
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: '#92400E',
          fontWeight: 600,
          marginBottom: '6px',
        }}
      >
        Special Underwriter Assistance Required
      </div>

      <h1
        style={{
          fontFamily: 'var(--ds-primitive-font-heading)',
          fontSize: '1.65rem',
          fontWeight: 500,
          color: 'var(--ds-color-navy-900)',
          margin: '0 0 12px 0',
          lineHeight: 1.25,
        }}
      >
        Your Application Has Been Referred
      </h1>

      <p
        style={{
          fontSize: '14px',
          color: 'var(--ds-color-text-secondary)',
          lineHeight: 1.6,
          margin: '0 auto 24px',
          maxWidth: '580px',
        }}
      >
        Based on your clinical history or specific practice scope, automated online binding is
        unavailable. Our senior relationship managers work directly with Chubb underwriters to secure
        tailored terms for your practice.
      </p>

      {/* Referral Reference Box */}
      <div
        style={{
          padding: '18px 22px',
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--ds-color-border-subtle)',
          borderRadius: 'var(--ds-radius-lg)',
          boxShadow: 'var(--ds-shadow-card)',
          marginBottom: '24px',
          textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--ds-color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Referral Reference Code
            </div>
            <div
              style={{
                fontFamily: 'var(--ds-primitive-font-mono)',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--ds-color-navy-900)',
                letterSpacing: '0.02em',
              }}
            >
              {refCode}
            </div>
          </div>

          <div
            style={{
              padding: '4px 10px',
              borderRadius: '999px',
              backgroundColor: '#FEF3C7',
              color: '#92400E',
              fontSize: '11.5px',
              fontWeight: 600,
              border: '1px solid #FDE68A',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <Clock size={13} />
            <span>Under Review</span>
          </div>
        </div>

        {referralReason && (
          <div
            style={{
              fontSize: '12.5px',
              color: 'var(--ds-color-text-secondary)',
              borderTop: '1px solid var(--ds-color-border-subtle)',
              paddingTop: '10px',
            }}
          >
            <strong style={{ color: 'var(--ds-color-navy-900)' }}>Assessment Trigger:</strong> {referralReason}
          </div>
        )}
      </div>

      {/* Relationship Manager Callback Request Form (FLD-REF-070..073) */}
      <div
        style={{
          padding: '24px',
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--ds-color-border-subtle)',
          borderRadius: 'var(--ds-radius-lg)',
          boxShadow: 'var(--ds-shadow-card)',
          textAlign: 'left',
          marginBottom: '24px',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--ds-primitive-font-heading)',
            fontSize: '1.15rem',
            fontWeight: 500,
            color: 'var(--ds-color-navy-900)',
            margin: '0 0 6px 0',
          }}
        >
          Request Underwriting Specialist Callback
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--ds-color-text-secondary)', margin: '0 0 18px 0' }}>
          Leave your contact details and our designated Chubb underwriting relationship manager will
          contact you to finalize terms.
        </p>

        {callbackSuccessMessage ? (
          <div
            style={{
              padding: '16px',
              borderRadius: 'var(--ds-radius-md)',
              backgroundColor: '#ECFDF5',
              border: '1px solid #A7F3D0',
              color: '#065E68',
              fontSize: '13.5px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
            }}
          >
            <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong>Callback Request Confirmed</strong>
              <p style={{ margin: '4px 0 0 0', lineHeight: 1.5 }}>{callbackSuccessMessage}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleCallbackSubmit} noValidate>
            {callbackError && (
              <div
                style={{
                  padding: '10px 14px',
                  backgroundColor: 'var(--ds-color-status-error-bg)',
                  border: '1px solid var(--ds-color-status-error-border)',
                  color: 'var(--ds-color-status-error)',
                  borderRadius: 'var(--ds-radius-md)',
                  fontSize: '13px',
                  marginBottom: '14px',
                }}
              >
                {callbackError}
              </div>
            )}

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '14px',
                marginBottom: '14px',
              }}
            >
              {/* Doctor Name (FLD-REF-NAME-070) */}
              <div>
                <label
                  htmlFor="ref-contact-name"
                  style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--ds-color-navy-900)', marginBottom: '4px' }}
                >
                  Doctor / Practitioner Name <span style={{ color: 'var(--ds-color-status-error)' }}>*</span>
                </label>
                <input
                  id="ref-contact-name"
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Dr. Muhammad Saleem"
                  style={{
                    width: '100%',
                    height: '42px',
                    padding: '0 12px',
                    borderRadius: 'var(--ds-radius-md)',
                    border: '1px solid var(--ds-color-border-default)',
                    fontSize: '13px',
                    boxSizing: 'border-box',
                    backgroundColor: '#FFFFFF',
                    color: 'var(--ds-color-text-primary)',
                  }}
                />
              </div>

              {/* Clinic Name (FLD-REF-CLINIC-071) */}
              <div>
                <label
                  htmlFor="ref-clinical-name"
                  style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--ds-color-navy-900)', marginBottom: '4px' }}
                >
                  Clinic / Practice Legal Name (Optional)
                </label>
                <input
                  id="ref-clinical-name"
                  type="text"
                  value={clinicalName}
                  onChange={(e) => setClinicalName(e.target.value)}
                  placeholder="e.g. Klinik Dr Saleem Sdn Bhd"
                  style={{
                    width: '100%',
                    height: '42px',
                    padding: '0 12px',
                    borderRadius: 'var(--ds-radius-md)',
                    border: '1px solid var(--ds-color-border-default)',
                    fontSize: '13px',
                    boxSizing: 'border-box',
                    backgroundColor: '#FFFFFF',
                    color: 'var(--ds-color-text-primary)',
                  }}
                />
              </div>

              {/* Contact Phone (FLD-REF-PHONE-072) */}
              <div>
                <label
                  htmlFor="ref-contact-phone"
                  style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--ds-color-navy-900)', marginBottom: '4px' }}
                >
                  Mobile Number <span style={{ color: 'var(--ds-color-status-error)' }}>*</span>
                </label>
                <input
                  id="ref-contact-phone"
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="e.g. 012-3456789"
                  style={{
                    width: '100%',
                    height: '42px',
                    padding: '0 12px',
                    borderRadius: 'var(--ds-radius-md)',
                    border: '1px solid var(--ds-color-border-default)',
                    fontSize: '13px',
                    boxSizing: 'border-box',
                    backgroundColor: '#FFFFFF',
                    color: 'var(--ds-color-text-primary)',
                  }}
                />
              </div>

              {/* Contact Email (FLD-REF-EMAIL-073) */}
              <div>
                <label
                  htmlFor="ref-contact-email"
                  style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--ds-color-navy-900)', marginBottom: '4px' }}
                >
                  Email Address <span style={{ color: 'var(--ds-color-status-error)' }}>*</span>
                </label>
                <input
                  id="ref-contact-email"
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="doctor@example.com"
                  style={{
                    width: '100%',
                    height: '42px',
                    padding: '0 12px',
                    borderRadius: 'var(--ds-radius-md)',
                    border: '1px solid var(--ds-color-border-default)',
                    fontSize: '13px',
                    boxSizing: 'border-box',
                    backgroundColor: '#FFFFFF',
                    color: 'var(--ds-color-text-primary)',
                  }}
                />
              </div>
            </div>

            {/* Preferred Callback Time */}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--ds-color-navy-900)', marginBottom: '6px' }}>
                Preferred Callback Window
              </label>
              <div style={{ display: 'flex', gap: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer', color: 'var(--ds-color-text-primary)' }}>
                  <input
                    type="radio"
                    name="preferredTime"
                    value="morning"
                    checked={preferredTime === 'morning'}
                    onChange={() => setPreferredTime('morning')}
                  />
                  <span>Morning (9:00 AM – 1:00 PM)</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer', color: 'var(--ds-color-text-primary)' }}>
                  <input
                    type="radio"
                    name="preferredTime"
                    value="afternoon"
                    checked={preferredTime === 'afternoon'}
                    onChange={() => setPreferredTime('afternoon')}
                  />
                  <span>Afternoon (2:00 PM – 5:30 PM)</span>
                </label>
              </div>
            </div>

            {/* Additional Notes */}
            <div style={{ marginBottom: '18px' }}>
              <label
                htmlFor="ref-additional-notes"
                style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--ds-color-navy-900)', marginBottom: '4px' }}
              >
                Additional Clinical Notes / Underwriting Inquiries (Optional)
              </label>
              <textarea
                id="ref-additional-notes"
                rows={2}
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="Specify any relevant dates, policy numbers, or urgent requirements..."
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: 'var(--ds-radius-md)',
                  border: '1px solid var(--ds-color-border-default)',
                  fontSize: '13px',
                  boxSizing: 'border-box',
                  backgroundColor: '#FFFFFF',
                  color: 'var(--ds-color-text-primary)',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                height: '44px',
                padding: '0 24px',
                borderRadius: 'var(--ds-radius-md)',
                backgroundColor: 'var(--ds-color-brand-primary)',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 600,
                fontSize: '13.5px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: 'var(--ds-shadow-card)',
              }}
            >
              <Send size={15} />
              <span>{isSubmitting ? 'Submitting Callback Request...' : 'Request Underwriting Specialist Callback'}</span>
            </button>
          </form>
        )}
      </div>

      {/* Support Direct Contacts */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '14px',
          marginBottom: '28px',
          textAlign: 'left',
        }}
      >
        <div
          style={{
            padding: '16px',
            borderRadius: 'var(--ds-radius-md)',
            border: '1px solid var(--ds-color-border-subtle)',
            backgroundColor: '#FFFFFF',
            boxShadow: 'var(--ds-shadow-card)',
          }}
        >
          <PhoneCall size={18} color="var(--ds-color-brand-primary)" style={{ marginBottom: '6px' }} />
          <div style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--ds-color-navy-900)' }}>
            Direct Underwriter Desk
          </div>
          <div style={{ fontSize: '12.5px', color: 'var(--ds-color-text-secondary)', marginTop: '2px' }}>
            +60 3 2712 3456 / 1-800-88-CHUBB
          </div>
        </div>

        <div
          style={{
            padding: '16px',
            borderRadius: 'var(--ds-radius-md)',
            border: '1px solid var(--ds-color-border-subtle)',
            backgroundColor: '#FFFFFF',
            boxShadow: 'var(--ds-shadow-card)',
          }}
        >
          <Mail size={18} color="var(--ds-color-brand-primary)" style={{ marginBottom: '6px' }} />
          <div style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--ds-color-navy-900)' }}>
            Email Correspondence
          </div>
          <div style={{ fontSize: '12.5px', color: 'var(--ds-color-text-secondary)', marginTop: '2px' }}>
            underwriting@doctorshield.com
          </div>
        </div>
      </div>

      {/* Reset Action */}
      <div>
        <button
          type="button"
          onClick={resetWorkflow}
          style={{
            minHeight: '44px',
            padding: '0 24px',
            borderRadius: 'var(--ds-radius-md)',
            backgroundColor: 'transparent',
            color: 'var(--ds-color-navy-900)',
            border: '1px solid var(--ds-color-border-default)',
            fontSize: '13.5px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <RefreshCcw size={15} />
          <span>Start New Application</span>
        </button>
      </div>
    </div>
  );
};
