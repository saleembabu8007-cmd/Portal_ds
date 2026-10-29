import React from 'react';
import { useWorkflow } from '../../core/state/WorkflowContext';
import { StepActionBar } from '../../components/layout/StepActionBar';
import { ShieldCheck, CreditCard, Lock, Check } from 'lucide-react';

export const Stage4ReviewScaffold: React.FC = () => {
  const { coverage, quote, confirmPolicy, prevStage, isLoading } = useWorkflow();

  return (
    <div>
      {/* Stage Header */}
      <div style={{ marginBottom: '24px' }}>
        <div
          style={{
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: 'var(--ds-primitive-color-teal-700)',
            fontWeight: 600,
            marginBottom: '4px',
          }}
        >
          Stage 4 of 4: Review & Payment Hand-off
        </div>

        <h1
          style={{
            fontFamily: 'var(--ds-primitive-font-heading)',
            fontSize: '1.75rem',
            fontWeight: 500,
            color: 'var(--ds-color-text-heading)',
            margin: '0 0 8px 0',
            lineHeight: 1.25,
          }}
        >
          Review Policy Details & Authorize Payment
        </h1>

        <p
          style={{
            fontSize: 'var(--ds-primitive-font-size-base)',
            color: 'var(--ds-color-text-secondary)',
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          Please verify your indemnity parameters, read statutory PDPA disclosures, and select your preferred banking channel to bind coverage.
        </p>
      </div>

      {/* Statutory Consent Acknowledgement Box */}
      <div
        style={{
          border: '1px solid var(--ds-color-border-subtle)',
          borderRadius: 'var(--ds-primitive-radius-lg)',
          padding: '20px',
          backgroundColor: 'var(--ds-primitive-color-navy-50)',
          marginBottom: '28px',
          fontSize: '13px',
          color: 'var(--ds-primitive-color-navy-900)',
          lineHeight: 1.6,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Lock size={16} color="var(--ds-primitive-color-teal-700)" />
          <strong>Statutory Declaration & PDPA Consent:</strong>
        </div>
        I hereby confirm that all statements provided are true and complete. I acknowledge and agree to the Chubb Product Disclosure Sheet, Policy Terms, and the collection of my personal data under the Personal Data Protection Act 2010.
      </div>

      {/* Payment Channel Indicator */}
      <div style={{ marginBottom: '28px' }}>
        <label
          style={{
            display: 'block',
            fontWeight: 600,
            fontSize: 'var(--ds-primitive-font-size-base)',
            color: 'var(--ds-color-text-heading)',
            marginBottom: '12px',
          }}
        >
          Authorized Payment Channels (PCI-DSS SAQ-A Certified)
        </label>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '12px',
          }}
        >
          <div
            style={{
              padding: '16px',
              borderRadius: 'var(--ds-primitive-radius-md)',
              border: '2px solid var(--ds-primitive-color-teal-700)',
              backgroundColor: 'var(--ds-primitive-color-teal-50)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontWeight: 600, color: 'var(--ds-primitive-color-navy-900)' }}>
                FPX Online Banking
              </div>
              <div style={{ fontSize: '12px', color: 'var(--ds-color-text-secondary)' }}>
                Maybank2u, CIMB Clicks, Public Bank, etc.
              </div>
            </div>
            <Check size={18} color="var(--ds-primitive-color-teal-700)" />
          </div>

          <div
            style={{
              padding: '16px',
              borderRadius: 'var(--ds-primitive-radius-md)',
              border: '1px solid var(--ds-color-border-default)',
              backgroundColor: '#FFFFFF',
              color: 'var(--ds-color-text-secondary)',
            }}
          >
            <div style={{ fontWeight: 600, color: 'var(--ds-color-text-primary)' }}>
              Credit / Debit Card
            </div>
            <div style={{ fontSize: '12px', color: 'var(--ds-color-text-muted)' }}>
              Visa & Mastercard 3D-Secure
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Actions */}
      <StepActionBar
        primaryLabel={`Pay RM ${quote?.totalPayable.toFixed(2)} & Bind Policy`}
        onPrimaryClick={confirmPolicy}
        secondaryLabel="Back to Underwriting"
        onSecondaryClick={prevStage}
        isLoading={isLoading}
      />
    </div>
  );
};

