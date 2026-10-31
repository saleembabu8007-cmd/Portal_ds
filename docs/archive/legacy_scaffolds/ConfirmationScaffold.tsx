import React from 'react';
import { useWorkflow } from '../../core/state/WorkflowContext';
import { CheckCircle2, Download, FileText, ArrowRight, RefreshCcw } from 'lucide-react';

export const ConfirmationScaffold: React.FC = () => {
  const { coverage, quote, resetWorkflow } = useWorkflow();

  const policyNumber = `CHUBB-DS-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center', padding: '16px 8px' }}>
      {/* Success Badge */}
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: 'var(--ds-primitive-color-emerald-50)',
          color: 'var(--ds-primitive-color-emerald-700)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
          border: '2px solid var(--ds-primitive-color-emerald-500)',
        }}
        aria-hidden="true"
      >
        <CheckCircle2 size={40} />
      </div>

      <div
        style={{
          fontSize: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          color: 'var(--ds-primitive-color-emerald-700)',
          fontWeight: 600,
          marginBottom: '6px',
        }}
      >
        Coverage Confirmed & Active
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
        Your Indemnity Policy is Bound
      </h1>

      <p
        style={{
          fontSize: 'var(--ds-primitive-font-size-base)',
          color: 'var(--ds-color-text-secondary)',
          lineHeight: 1.6,
          margin: '0 auto 28px',
          maxWidth: '560px',
        }}
      >
        Thank you, Doctor. Your payment has been processed and your Certificate of Insurance underwritten by Chubb Insurance Malaysia Berhad is now active.
      </p>

      {/* Policy Details Card */}
      <div
        style={{
          padding: '24px',
          backgroundColor: 'var(--ds-primitive-color-navy-50)',
          border: '1px solid var(--ds-color-border-subtle)',
          borderRadius: 'var(--ds-primitive-radius-lg)',
          marginBottom: '28px',
          textAlign: 'left',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--ds-color-text-muted)' }}>
              Chubb Policy Number
            </div>
            <div
              style={{
                fontFamily: 'var(--ds-primitive-font-mono)',
                fontSize: '1.15rem',
                fontWeight: 600,
                color: 'var(--ds-primitive-color-navy-900)',
              }}
            >
              {policyNumber}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--ds-color-text-muted)' }}>
              Limit of Indemnity
            </div>
            <div style={{ fontWeight: 600, color: 'var(--ds-primitive-color-teal-800)' }}>
              {coverage.limitFormatted}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--ds-color-text-muted)' }}>
              Specialty Covered
            </div>
            <div style={{ fontWeight: 600 }}>
              {coverage.classificationName}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--ds-color-text-muted)' }}>
              Total Paid
            </div>
            <div style={{ fontFamily: 'var(--ds-primitive-font-mono)', fontWeight: 600, color: 'var(--ds-primitive-color-navy-900)' }}>
              RM {quote?.totalPayable.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'center',
          marginBottom: '32px',
        }}
      >
        <button
          type="button"
          onClick={() => alert('Simulated: Downloading Official Policy Schedule PDF')}
          style={{
            minHeight: '48px',
            padding: '0 24px',
            borderRadius: 'var(--ds-primitive-radius-md)',
            backgroundColor: 'var(--ds-color-action-primary)',
            color: '#FFFFFF',
            border: 'none',
            fontSize: 'var(--ds-primitive-font-size-base)',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Download size={18} />
          <span>Download Policy Schedule</span>
        </button>

        <button
          type="button"
          onClick={resetWorkflow}
          style={{
            minHeight: '48px',
            padding: '0 20px',
            borderRadius: 'var(--ds-primitive-radius-md)',
            backgroundColor: '#FFFFFF',
            color: 'var(--ds-color-text-primary)',
            border: '1px solid var(--ds-color-border-default)',
            fontSize: 'var(--ds-primitive-font-size-base)',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <RefreshCcw size={16} />
          <span>New Application</span>
        </button>
      </div>
    </div>
  );
};

