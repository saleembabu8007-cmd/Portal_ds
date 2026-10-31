import React from 'react';
import { useWorkflow } from '../../core/state/WorkflowContext';
import { StepActionBar } from '../../components/layout/StepActionBar';
import { AlertCircle, UserCheck, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const Stage3UnderwritingScaffold: React.FC = () => {
  const { doctorProfile, updateDoctorProfile, triggerReferral, nextStage, prevStage, isLoading } = useWorkflow();

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
          Stage 3 of 4: Details & Statutory Underwriting
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
          Practitioner Identity & Underwriting Declarations
        </h1>

        <p
          style={{
            fontSize: 'var(--ds-primitive-font-size-base)',
            color: 'var(--ds-color-text-secondary)',
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          Provide your legal name, Malaysian Medical Council (MMC) registration, and complete statutory underwriting declarations for Chubb compliance.
        </p>
      </div>

      {/* Tier 1 State Persistence Guarantee Notice */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          padding: '16px',
          borderRadius: 'var(--ds-primitive-radius-md)',
          backgroundColor: 'var(--ds-primitive-color-slate-50)',
          border: '1px solid var(--ds-color-border-default)',
          marginBottom: '28px',
          fontSize: 'var(--ds-primitive-font-size-sm)',
        }}
      >
        <UserCheck size={20} color="var(--ds-primitive-color-teal-700)" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong style={{ color: 'var(--ds-primitive-color-navy-900)' }}>Dual-Tier State Guarantee:</strong> All personal particulars entered in this stage are preserved in Tier 1 persistent memory. Navigating back to Stage 1 or 2 to adjust coverage will never wipe your identity details.
        </div>
      </div>

      {/* Underwriting Declarations Simulation */}
      <div
        style={{
          border: '1px solid var(--ds-color-border-subtle)',
          borderRadius: 'var(--ds-primitive-radius-lg)',
          padding: '24px',
          marginBottom: '28px',
          backgroundColor: '#FFFFFF',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--ds-primitive-font-heading)',
            fontSize: 'var(--ds-primitive-font-size-lg)',
            fontWeight: 500,
            color: 'var(--ds-color-text-heading)',
            margin: '0 0 8px 0',
          }}
        >
          Statutory Risk Questions
        </h3>

        <p style={{ fontSize: '14px', color: 'var(--ds-color-text-secondary)', margin: '0 0 20px 0' }}>
          Have you had any malpractice claims, disciplinary proceedings by the Malaysian Medical Council, or criminal inquiries in the past 5 years?
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* All Clear Option */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 18px',
              borderRadius: 'var(--ds-primitive-radius-md)',
              border: '1px solid var(--ds-primitive-color-emerald-500)',
              backgroundColor: 'var(--ds-primitive-color-emerald-50)',
            }}
          >
            <CheckCircle2 size={20} color="var(--ds-primitive-color-emerald-700)" />
            <div style={{ fontSize: '14px', color: 'var(--ds-primitive-color-emerald-700)', fontWeight: 500 }}>
              No claims, reprimands, or pending inquiries (Automated Instant Underwriting)
            </div>
          </div>

          {/* Test Referral Trigger Button */}
          <div
            style={{
              padding: '16px',
              borderRadius: 'var(--ds-primitive-radius-md)',
              border: '1px dashed var(--ds-primitive-color-amber-500)',
              backgroundColor: 'var(--ds-primitive-color-amber-50)',
              marginTop: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
              <ShieldAlert size={18} color="var(--ds-primitive-color-amber-800)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '13px', color: 'var(--ds-primitive-color-amber-800)' }}>
                <strong>Architectural Test:</strong> Answering "Yes" to prior disciplinary action mandates support referral. Test this path to verify seamless routing without misleading progress:
              </div>
            </div>

            <button
              type="button"
              onClick={() => triggerReferral('Applicant declared prior MMC inquiry requiring underwriter assessment')}
              style={{
                minHeight: '40px',
                padding: '0 16px',
                borderRadius: 'var(--ds-primitive-radius-md)',
                backgroundColor: 'var(--ds-primitive-color-navy-900)',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Simulate Adverse Declaration (Trigger Support Referral)
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <StepActionBar
        primaryLabel="Proceed to Review & Payment"
        onPrimaryClick={nextStage}
        secondaryLabel="Back to Quotation"
        onSecondaryClick={prevStage}
        isLoading={isLoading}
      />
    </div>
  );
};

