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
    <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center', padding: '16px 8px' }}>
      {/* Icon Badge */}
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: 'var(--ds-primitive-color-amber-50)',
          color: 'var(--ds-primitive-color-amber-800)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
          border: '2px solid var(--ds-primitive-color-amber-500)',
        }}
        aria-hidden="true"
      >
        <ShieldAlert size={36} />
      </div>

      <div
        style={{
          fontSize: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          color: 'var(--ds-primitive-color-amber-800)',
          fontWeight: 600,
          marginBottom: '6px',
        }}
      >
        Special Underwriter Assistance Required
      </div>

      <h1
        style={{
          fontFamily: 'var(--ds-primitive-font-heading)',
          fontSize: '2rem',
          fontWeight: 500,
          color: 'var(--ds-color-text-heading)',
          margin: '0 0 16px 0',
          lineHeight: 1.2,
        }}
      >
        Your Application Has Been Referred
      </h1>

      <p
        style={{
          fontSize: 'var(--ds-primitive-font-size-base)',
          color: 'var(--ds-color-text-secondary)',
          lineHeight: 1.6,
          margin: '0 auto 28px',
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
          padding: '20px 24px',
          backgroundColor: 'var(--ds-primitive-color-slate-50)',
          border: '1px solid var(--ds-color-border-default)',
          borderRadius: 'var(--ds-primitive-radius-lg)',
          marginBottom: '28px',
          textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--ds-color-text-muted)', textTransform: 'uppercase' }}>
              Referral Reference Code
            </div>
            <div
              style={{
                fontFamily: 'var(--ds-primitive-font-mono)',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--ds-primitive-color-navy-900)',
              }}
            >
              {refCode}
            </div>
          </div>

          <div
            style={{
              padding: '6px 12px',
              borderRadius: '999px',
              backgroundColor: 'var(--ds-primitive-color-amber-50)',
              color: 'var(--ds-primitive-color-amber-800)',
              fontSize: '12px',
              fontWeight: 600,
              border: '1px solid var(--ds-primitive-color-amber-500)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Clock size={14} />
            <span>Under Review</span>
          </div>
        </div>

        {referralReason && (
          <div
            style={{
              fontSize: '13px',
              color: 'var(--ds-color-text-secondary)',
              borderTop: '1px solid var(--ds-color-border-subtle)',
              paddingTop: '10px',
            }}
          >
            <strong>Assessment Trigger:</strong> {referralReason}
          </div>
        )}
      </div>

      {/* Relationship Manager Callback Request Form (FLD-REF-070..073) */}
      <div
        style={{
          padding: '24px',
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--ds-color-border-subtle)',
          borderRadius: 'var(--ds-primitive-radius-lg)',
          textAlign: 'left',
          marginBottom: '28px',
          boxShadow: 'var(--ds-primitive-shadow-sm)',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--ds-primitive-font-heading)',
            fontSize: '1.2rem',
            fontWeight: 500,
            color: 'var(--ds-color-text-heading)',
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
              borderRadius: 'var(--ds-primitive-radius-md)',
              backgroundColor: 'var(--ds-primitive-color-emerald-50)',
              border: '1px solid var(--ds-primitive-color-emerald-500)',
              color: 'var(--ds-primitive-color-emerald-800)',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
            }}
          >
            <CheckCircle2 size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
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
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #F87171',
                  color: '#991B1B',
                  borderRadius: '6px',
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
                  style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}
                >
                  Doctor / Practitioner Name <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <input
                  id="ref-contact-name"
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Dr. Muhammad Saleem"
                  style={{
                    width: '100%',
                    height: '40px',
                    padding: '0 10px',
                    borderRadius: '6px',
                    border: '1px solid var(--ds-color-border-default)',
                    fontSize: '13px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Clinic Name (FLD-REF-CLINIC-071) */}
              <div>
                <label
                  htmlFor="ref-clinical-name"
                  style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}
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
                    height: '40px',
                    padding: '0 10px',
                    borderRadius: '6px',
                    border: '1px solid var(--ds-color-border-default)',
                    fontSize: '13px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Contact Phone (FLD-REF-PHONE-072) */}
              <div>
                <label
                  htmlFor="ref-contact-phone"
                  style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}
                >
                  Mobile Number <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <input
                  id="ref-contact-phone"
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="e.g. 012-3456789"
                  style={{
                    width: '100%',
                    height: '40px',
                    padding: '0 10px',
                    borderRadius: '6px',
                    border: '1px solid var(--ds-color-border-default)',
                    fontSize: '13px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Contact Email (FLD-REF-EMAIL-073) */}
              <div>
                <label
                  htmlFor="ref-contact-email"
                  style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}
                >
                  Email Address <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <input
                  id="ref-contact-email"
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="doctor@example.com"
                  style={{
                    width: '100%',
                    height: '40px',
                    padding: '0 10px',
                    borderRadius: '6px',
                    border: '1px solid var(--ds-color-border-default)',
                    fontSize: '13px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            {/* Preferred Callback Time */}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                Preferred Callback Window
              </label>
              <div style={{ display: 'flex', gap: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="preferredTime"
                    value="morning"
                    checked={preferredTime === 'morning'}
                    onChange={() => setPreferredTime('morning')}
                  />
                  <span>Morning (9:00 AM – 1:00 PM)</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
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
                style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}
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
                  padding: '8px 10px',
                  borderRadius: '6px',
                  border: '1px solid var(--ds-color-border-default)',
                  fontSize: '13px',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                height: '42px',
                padding: '0 24px',
                borderRadius: 'var(--ds-primitive-radius-md)',
                backgroundColor: 'var(--ds-primitive-color-teal-600)',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 600,
                fontSize: '14px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: 'var(--ds-primitive-shadow-sm)',
              }}
            >
              <Send size={16} />
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
          gap: '16px',
          marginBottom: '32px',
          textAlign: 'left',
        }}
      >
        <div
          style={{
            padding: '16px',
            borderRadius: 'var(--ds-primitive-radius-md)',
            border: '1px solid var(--ds-color-border-subtle)',
            backgroundColor: '#FFFFFF',
          }}
        >
          <PhoneCall size={20} color="var(--ds-primitive-color-teal-700)" style={{ marginBottom: '8px' }} />
          <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--ds-color-text-heading)' }}>
            Direct Underwriter Desk
          </div>
          <div style={{ fontSize: '13px', color: 'var(--ds-color-text-secondary)', marginTop: '2px' }}>
            +60 3 2712 3456 / 1-800-88-CHUBB
          </div>
        </div>

        <div
          style={{
            padding: '16px',
            borderRadius: 'var(--ds-primitive-radius-md)',
            border: '1px solid var(--ds-color-border-subtle)',
            backgroundColor: '#FFFFFF',
          }}
        >
          <Mail size={20} color="var(--ds-primitive-color-teal-700)" style={{ marginBottom: '8px' }} />
          <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--ds-color-text-heading)' }}>
            Email Correspondence
          </div>
          <div style={{ fontSize: '13px', color: 'var(--ds-color-text-secondary)', marginTop: '2px' }}>
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
            borderRadius: 'var(--ds-primitive-radius-md)',
            backgroundColor: 'transparent',
            color: 'var(--ds-primitive-color-navy-800)',
            border: '1px solid var(--ds-color-border-default)',
            fontSize: 'var(--ds-primitive-font-size-sm)',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <RefreshCcw size={16} />
          <span>Start New Application</span>
        </button>
      </div>
    </div>
  );
};
