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
import { Button } from '../../components/ui/Button';

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
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          backgroundColor: '#FFFBEB',
          color: '#D97706',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
          border: '1px solid #FDE68A',
        }}
        aria-hidden="true"
      >
        <ShieldAlert size={28} strokeWidth={2.2} />
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
          fontFamily: 'var(--ds-primitive-font-heading, "Kanit", sans-serif)',
          fontSize: '1.75rem',
          fontWeight: 500,
          color: 'var(--ds-color-text-heading, #132766)',
          margin: '0 0 12px 0',
          lineHeight: 1.25,
        }}
      >
        Your Application Has Been Referred
      </h1>

      <p
        style={{
          fontSize: '14px',
          color: 'var(--ds-color-text-secondary, #475569)',
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
          padding: '20px 24px',
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--ds-color-border-subtle, #DFE6EC)',
          borderRadius: 'var(--ds-primitive-radius-lg, 10px)',
          marginBottom: '24px',
          textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--ds-color-text-muted, #64748B)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
              Referral Reference Code
            </div>
            <div
              style={{
                fontFamily: 'var(--ds-primitive-font-mono, monospace)',
                fontSize: '1.35rem',
                fontWeight: 600,
                color: 'var(--ds-color-text-heading, #132766)',
                letterSpacing: '0.02em',
                marginTop: '2px',
              }}
            >
              {refCode}
            </div>
          </div>

          <div
            style={{
              padding: '4px 12px',
              borderRadius: '999px',
              backgroundColor: '#FEF3C7',
              color: '#92400E',
              fontSize: '12px',
              fontWeight: 600,
              border: '1px solid #FDE68A',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
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
              color: 'var(--ds-color-text-secondary, #475569)',
              borderTop: '1px solid var(--ds-color-border-subtle, #DFE6EC)',
              paddingTop: '12px',
              marginTop: '4px',
            }}
          >
            <strong style={{ color: 'var(--ds-color-text-heading, #132766)' }}>Assessment Trigger:</strong> {referralReason}
          </div>
        )}
      </div>

      {/* Relationship Manager Callback Request Form (FLD-REF-070..073) */}
      <div
        style={{
          padding: '24px',
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--ds-color-border-subtle, #DFE6EC)',
          borderRadius: 'var(--ds-primitive-radius-lg, 10px)',
          textAlign: 'left',
          marginBottom: '24px',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--ds-primitive-font-heading, "Kanit", sans-serif)',
            fontSize: '1.15rem',
            fontWeight: 500,
            color: 'var(--ds-color-text-heading, #132766)',
            margin: '0 0 6px 0',
          }}
        >
          Request Underwriting Specialist Callback
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--ds-color-text-secondary, #475569)', margin: '0 0 18px 0' }}>
          Leave your contact details and our designated Chubb underwriting relationship manager will
          contact you to finalize terms.
        </p>

        {callbackSuccessMessage ? (
          <div
            style={{
              padding: '16px 18px',
              borderRadius: 'var(--ds-primitive-radius-md, 6px)',
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
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #FECACA',
                  color: '#B91C1C',
                  borderRadius: 'var(--ds-primitive-radius-md, 6px)',
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
                  style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--ds-color-text-heading, #132766)', marginBottom: '4px' }}
                >
                  Doctor / Practitioner Name <span style={{ color: '#B91C1C' }}>*</span>
                </label>
                <input
                  id="ref-contact-name"
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Dr. Muhammad Saleem"
                  style={{
                    width: '100%',
                    height: '46px',
                    padding: '0 14px',
                    borderRadius: 'var(--ds-primitive-radius-md, 6px)',
                    border: '1px solid var(--ds-color-border-default, #CBD5E1)',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    backgroundColor: '#FFFFFF',
                    color: 'var(--ds-color-text-heading, #132766)',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Clinic Name (FLD-REF-CLINIC-071) */}
              <div>
                <label
                  htmlFor="ref-clinical-name"
                  style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--ds-color-text-heading, #132766)', marginBottom: '4px' }}
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
                    height: '46px',
                    padding: '0 14px',
                    borderRadius: 'var(--ds-primitive-radius-md, 6px)',
                    border: '1px solid var(--ds-color-border-default, #CBD5E1)',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    backgroundColor: '#FFFFFF',
                    color: 'var(--ds-color-text-heading, #132766)',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Contact Phone (FLD-REF-PHONE-072) */}
              <div>
                <label
                  htmlFor="ref-contact-phone"
                  style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--ds-color-text-heading, #132766)', marginBottom: '4px' }}
                >
                  Mobile Number <span style={{ color: '#B91C1C' }}>*</span>
                </label>
                <input
                  id="ref-contact-phone"
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="e.g. 012-3456789"
                  style={{
                    width: '100%',
                    height: '46px',
                    padding: '0 14px',
                    borderRadius: 'var(--ds-primitive-radius-md, 6px)',
                    border: '1px solid var(--ds-color-border-default, #CBD5E1)',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    backgroundColor: '#FFFFFF',
                    color: 'var(--ds-color-text-heading, #132766)',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Contact Email (FLD-REF-EMAIL-073) */}
              <div>
                <label
                  htmlFor="ref-contact-email"
                  style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--ds-color-text-heading, #132766)', marginBottom: '4px' }}
                >
                  Email Address <span style={{ color: '#B91C1C' }}>*</span>
                </label>
                <input
                  id="ref-contact-email"
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="doctor@example.com"
                  style={{
                    width: '100%',
                    height: '46px',
                    padding: '0 14px',
                    borderRadius: 'var(--ds-primitive-radius-md, 6px)',
                    border: '1px solid var(--ds-color-border-default, #CBD5E1)',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    backgroundColor: '#FFFFFF',
                    color: 'var(--ds-color-text-heading, #132766)',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            {/* Preferred Callback Time */}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--ds-color-text-heading, #132766)', marginBottom: '6px' }}>
                Preferred Callback Window
              </label>
              <div style={{ display: 'flex', gap: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer', color: 'var(--ds-color-text-heading, #132766)' }}>
                  <input
                    type="radio"
                    name="preferredTime"
                    value="morning"
                    checked={preferredTime === 'morning'}
                    onChange={() => setPreferredTime('morning')}
                    style={{ accentColor: 'var(--ds-color-brand-primary, #08A5B5)', width: '16px', height: '16px' }}
                  />
                  <span>Morning (9:00 AM – 1:00 PM)</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer', color: 'var(--ds-color-text-heading, #132766)' }}>
                  <input
                    type="radio"
                    name="preferredTime"
                    value="afternoon"
                    checked={preferredTime === 'afternoon'}
                    onChange={() => setPreferredTime('afternoon')}
                    style={{ accentColor: 'var(--ds-color-brand-primary, #08A5B5)', width: '16px', height: '16px' }}
                  />
                  <span>Afternoon (2:00 PM – 5:30 PM)</span>
                </label>
              </div>
            </div>

            {/* Additional Notes */}
            <div style={{ marginBottom: '18px' }}>
              <label
                htmlFor="ref-additional-notes"
                style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--ds-color-text-heading, #132766)', marginBottom: '4px' }}
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
                  padding: '10px 14px',
                  borderRadius: 'var(--ds-primitive-radius-md, 6px)',
                  border: '1px solid var(--ds-color-border-default, #CBD5E1)',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  backgroundColor: '#FFFFFF',
                  color: 'var(--ds-color-text-heading, #132766)',
                  outline: 'none',
                }}
              />
            </div>

            <Button
              variant="teal"
              size="md"
              type="submit"
              className="ds-btn-mobile-full"
              disabled={isSubmitting}
              loading={isSubmitting}
              leftIcon={<Send size={15} />}
            >
              Request Underwriting Specialist Callback
            </Button>
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
            borderRadius: 'var(--ds-primitive-radius-md, 6px)',
            border: '1px solid var(--ds-color-border-subtle, #DFE6EC)',
            backgroundColor: '#FFFFFF',
          }}
        >
          <PhoneCall size={18} color="var(--ds-color-brand-primary, #08A5B5)" style={{ marginBottom: '6px' }} />
          <div style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--ds-color-text-heading, #132766)' }}>
            Direct Underwriter Desk
          </div>
          <div style={{ fontSize: '12.5px', color: 'var(--ds-color-text-secondary, #475569)', marginTop: '2px' }}>
            +60 3 2712 3456 / 1-800-88-CHUBB
          </div>
        </div>

        <div
          style={{
            padding: '16px',
            borderRadius: 'var(--ds-primitive-radius-md, 6px)',
            border: '1px solid var(--ds-color-border-subtle, #DFE6EC)',
            backgroundColor: '#FFFFFF',
          }}
        >
          <Mail size={18} color="var(--ds-color-brand-primary, #08A5B5)" style={{ marginBottom: '6px' }} />
          <div style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--ds-color-text-heading, #132766)' }}>
            Email Correspondence
          </div>
          <div style={{ fontSize: '12.5px', color: 'var(--ds-color-text-secondary, #475569)', marginTop: '2px' }}>
            underwriting@doctorshield.com
          </div>
        </div>
      </div>

      {/* Reset Action */}
      <div>
        <Button
          variant="secondary"
          size="md"
          onClick={resetWorkflow}
          leftIcon={<RefreshCcw size={15} />}
        >
          Start New Application
        </Button>
      </div>
    </div>
  );
};
