import React from 'react';
import { Check } from 'lucide-react';

export interface StepItem {
  id: number;
  label: string;
  path: string;
}

export interface InsuranceStepProgressProps {
  currentStep: number; // 1, 2, 3, 4
  onStepClick?: (stepId: number) => void;
  className?: string;
}

export const defaultSteps: StepItem[] = [
  { id: 1, label: 'Coverage', path: '/buy/coverage' },
  { id: 2, label: 'Quotation', path: '/buy/quote' },
  { id: 3, label: 'Details & Underwriting', path: '/buy/underwrite' },
  { id: 4, label: 'Review & Payment', path: '/buy/review' },
];

export const InsuranceStepProgress: React.FC<InsuranceStepProgressProps> = ({
  currentStep,
  onStepClick,
  className = '',
}) => {
  const progressPercent = ((currentStep - 1) / (defaultSteps.length - 1)) * 100;
  const currentStepItem = defaultSteps.find((s) => s.id === currentStep) || defaultSteps[0];

  return (
    <nav aria-label="Insurance Application Progress" className={`ds-step-progress ${className}`} style={{ marginBottom: 'var(--ds-primitive-space-8)' }}>
      {/* Mobile Compact Progress Bar */}
      <div className="ds-mobile-stepper" style={{ display: 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: 'var(--ds-primitive-font-size-sm)' }}>
          <span style={{ fontWeight: 600, color: 'var(--ds-color-text-heading)' }}>
            Stage {currentStep} of {defaultSteps.length}: {currentStepItem.label}
          </span>
          <span style={{ fontFamily: 'var(--ds-primitive-font-mono)', color: 'var(--ds-color-text-muted)' }}>
            {Math.round(progressPercent)}%
          </span>
        </div>
        <div style={{ height: '6px', backgroundColor: 'var(--ds-primitive-color-slate-200)', borderRadius: '999px', overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              width: `${progressPercent}%`,
              backgroundColor: 'var(--ds-primitive-color-teal-500)',
              transition: 'width 300ms ease',
            }}
          />
        </div>
      </div>

      {/* Desktop Horizontal Stepper Track */}
      <ol
        className="ds-desktop-stepper"
        role="list"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          listStyle: 'none',
          padding: 0,
          margin: 0,
          position: 'relative',
        }}
      >
        {/* Continuous Background Track Line */}
        <div
          style={{
            position: 'absolute',
            top: '18px',
            left: '36px',
            right: '36px',
            height: '2px',
            backgroundColor: 'var(--ds-primitive-color-slate-200)',
            zIndex: 1,
          }}
          aria-hidden="true"
        />

        {/* Active Progress Track Line */}
        <div
          style={{
            position: 'absolute',
            top: '18px',
            left: '36px',
            width: `calc(${progressPercent}% * (100% - 72px) / 100)`,
            height: '2px',
            backgroundColor: 'var(--ds-primitive-color-navy-900)',
            transition: 'width 300ms ease',
            zIndex: 2,
          }}
          aria-hidden="true"
        />

        {defaultSteps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;
          const isClickable = isCompleted && onStepClick;

          return (
            <li
              key={step.id}
              aria-current={isActive ? 'step' : undefined}
              style={{
                position: 'relative',
                zIndex: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: isClickable ? 'pointer' : 'default',
              }}
              onClick={() => isClickable && onStepClick(step.id)}
            >
              {/* Step Circle Indicator */}
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--ds-primitive-radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--ds-primitive-font-body)',
                  fontSize: 'var(--ds-primitive-font-size-sm)',
                  fontWeight: 600,
                  transition: 'all 200ms ease',
                  backgroundColor: isCompleted
                    ? 'var(--ds-primitive-color-navy-900)' // Navy for completed
                    : isActive
                    ? 'var(--ds-primitive-color-teal-500)' // Teal for active
                    : 'var(--ds-color-surface-card)',
                  color: isCompleted
                    ? '#FFFFFF'
                    : isActive
                    ? 'var(--ds-primitive-color-navy-900)' // 4.68:1 contrast on teal
                    : 'var(--ds-color-text-muted)',
                  border: isCompleted
                    ? '2px solid var(--ds-primitive-color-navy-900)'
                    : isActive
                    ? '2px solid var(--ds-primitive-color-teal-500)'
                    : '2px solid var(--ds-color-border-default)',
                  boxShadow: isActive ? '0 0 0 4px var(--ds-primitive-color-teal-100)' : 'none',
                }}
              >
                {isCompleted ? (
                  <Check size={18} strokeWidth={3} aria-hidden="true" />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>

              {/* Step Label */}
              <span
                style={{
                  marginTop: 'var(--ds-primitive-space-2)',
                  fontFamily: 'var(--ds-primitive-font-body)',
                  fontSize: 'var(--ds-primitive-font-size-xs)',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive
                    ? 'var(--ds-color-text-heading)'
                    : isCompleted
                    ? 'var(--ds-color-text-primary)'
                    : 'var(--ds-color-text-muted)',
                  whiteSpace: 'nowrap',
                }}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>

      <style>{`
        @media (max-width: 640px) {
          .ds-mobile-stepper { display: block !important; }
          .ds-desktop-stepper { display: none !important; }
        }
      `}</style>
    </nav>
  );
};

