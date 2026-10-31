import React from 'react';
import { useWorkflow } from '../../core/state/WorkflowContext';
import { StepActionBar } from '../../components/layout/StepActionBar';
import { Shield, Sparkles, Check, Info } from 'lucide-react';

export const Stage1CoverageScaffold: React.FC = () => {
  const { coverage, updateCoverage, nextStage, recalculateQuote, isLoading } = useWorkflow();

  const limits = [
    { id: '1m', label: 'RM 1,000,000', note: 'Standard Practice' },
    { id: '2m', label: 'RM 2,000,000', note: 'Recommended' },
    { id: '5m', label: 'RM 5,000,000', note: 'High Exposure' },
  ];

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
          Stage 1 of 4: Cover Configuration
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
          Configure Your Professional Indemnity Cover
        </h1>

        <p
          style={{
            fontSize: 'var(--ds-primitive-font-size-base)',
            color: 'var(--ds-color-text-secondary)',
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          DoctorShield indemnity is underwritten by Chubb Insurance Malaysia Berhad. Select your professional classification, indemnity liability limit, and policy inception period below.
        </p>
      </div>

      {/* Information Banner */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          padding: '16px',
          borderRadius: 'var(--ds-primitive-radius-md)',
          backgroundColor: 'var(--ds-primitive-color-sky-50)',
          border: '1px solid var(--ds-primitive-color-sky-500)',
          marginBottom: '28px',
          fontSize: 'var(--ds-primitive-font-size-sm)',
          color: 'var(--ds-primitive-color-navy-900)',
        }}
      >
        <Info size={20} color="var(--ds-primitive-color-sky-700)" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong>Production Application Foundation Active:</strong> This application shell orchestrates live routing, dual-tier state persistence, responsive summary drawer behavior, and accessible error handling. Full 80-field quotation forms will be wired in Phase 3.
        </div>
      </div>

      {/* Interactive Demonstration: Medical Classification */}
      <div style={{ marginBottom: '28px' }}>
        <label
          style={{
            display: 'block',
            fontWeight: 600,
            fontSize: 'var(--ds-primitive-font-size-base)',
            color: 'var(--ds-color-text-heading)',
            marginBottom: '8px',
          }}
        >
          Selected Medical Classification
        </label>
        <div
          style={{
            padding: '14px 18px',
            backgroundColor: 'var(--ds-primitive-color-slate-50)',
            border: '1px solid var(--ds-color-border-default)',
            borderRadius: 'var(--ds-primitive-radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontWeight: 600, color: 'var(--ds-primitive-color-navy-900)' }}>
              {coverage.classificationName}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--ds-color-text-secondary)', marginTop: '2px' }}>
              Multi-specialty split: 100% General Medical Practice (Eligible for instant automated binding)
            </div>
          </div>
          <Shield size={22} color="var(--ds-primitive-color-teal-700)" />
        </div>
      </div>

      {/* Interactive Demonstration: Liability Limit Selector */}
      <div style={{ marginBottom: '32px' }}>
        <label
          style={{
            display: 'block',
            fontWeight: 600,
            fontSize: 'var(--ds-primitive-font-size-base)',
            color: 'var(--ds-color-text-heading)',
            marginBottom: '8px',
          }}
        >
          Choose Your Indemnity Liability Limit (Any One Claim & Aggregate)
        </label>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px',
          }}
        >
          {limits.map((lim) => {
            const isSelected = coverage.limitOfLiability === lim.id;
            return (
              <button
                key={lim.id}
                type="button"
                onClick={() => {
                  updateCoverage({
                    limitOfLiability: lim.id,
                    limitFormatted: lim.label,
                  });
                }}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--ds-primitive-radius-lg)',
                  border: isSelected
                    ? '2px solid var(--ds-primitive-color-teal-700)'
                    : '1px solid var(--ds-color-border-default)',
                  backgroundColor: isSelected
                    ? 'var(--ds-primitive-color-teal-50)'
                    : '#FFFFFF',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  transition: 'all 150ms ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span
                    style={{
                      fontFamily: 'var(--ds-primitive-font-mono)',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      color: isSelected
                        ? 'var(--ds-primitive-color-navy-900)'
                        : 'var(--ds-color-text-primary)',
                    }}
                  >
                    {lim.label}
                  </span>
                  {isSelected && (
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--ds-primitive-color-teal-700)',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Check size={12} strokeWidth={3} />
                    </div>
                  )}
                </div>
                <span style={{ fontSize: '12px', color: 'var(--ds-color-text-muted)' }}>
                  {lim.note}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Navigation Bar */}
      <StepActionBar
        primaryLabel="Continue to Quotation"
        onPrimaryClick={() => {
          recalculateQuote();
          nextStage();
        }}
        isLoading={isLoading}
        showSecondary={false}
      />
    </div>
  );
};

