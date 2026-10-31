import React from 'react';
import { Shield, FileText, RotateCcw, Search, PhoneCall, Check } from 'lucide-react';
import { Button } from '../ui/Button';

/* ========================================================================
   1. APPLICATION HEADER ORGANISM
   ======================================================================== */
export interface ApplicationHeaderProps {
  onCatalogToggle?: () => void;
  isCatalogActive?: boolean;
  onRenewClick?: () => void;
  onRetrieveQuoteClick?: () => void;
  onDocumentCenterClick?: () => void;
  className?: string;
}

/**
 * DoctorShield Application Header Organism
 * Standard: Slim 52px height, restrained brand identity, official Chubb co-branding,
 * and essential contextual utilities without visual congestion.
 */
export const ApplicationHeader: React.FC<ApplicationHeaderProps> = ({
  onCatalogToggle,
  isCatalogActive = false,
  onRenewClick,
  onRetrieveQuoteClick,
  onDocumentCenterClick,
  className = '',
}) => {
  return (
    <header
      role="banner"
      className={`ds-app-header ${className}`}
      style={{
        height: '52px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--ds-color-border-subtle)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        className="ds-header-inner"
        style={{
          maxWidth: '1280px',
          height: '100%',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand Lockup: DoctorShield + Chubb Underwriter Tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a
            href="/"
            aria-label="DoctorShield Home"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              outline: 'none',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'var(--ds-primitive-color-navy-900)',
                color: 'var(--ds-primitive-color-teal-400)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
              aria-hidden="true"
            >
              <Shield size={18} strokeWidth={2.2} />
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--ds-primitive-font-heading)',
                  fontSize: '1.15rem',
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  color: 'var(--ds-primitive-color-navy-900)',
                  lineHeight: 1.1,
                  whiteSpace: 'nowrap',
                }}
              >
                Doctor<span style={{ color: 'var(--ds-primitive-color-teal-700)' }}>Shield</span>
              </div>
              <div
                className="ds-header-tagline"
                style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  color: 'var(--ds-color-text-secondary)',
                  letterSpacing: '0.01em',
                }}
              >
                Individual Medical Professional Indemnity
              </div>
            </div>
          </a>

          {/* Hairline Divider & Underwriter Co-brand */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              borderLeft: '1px solid var(--ds-color-border-subtle)',
              paddingLeft: '16px',
            }}
            className="ds-desktop-underwriter-tag"
          >
            <span
              style={{
                fontFamily: 'var(--ds-primitive-font-body)',
                fontSize: '11px',
                color: 'var(--ds-color-text-secondary)',
                letterSpacing: '0.02em',
              }}
            >
              Underwritten by <strong>Chubb Insurance Malaysia Berhad</strong>
            </span>
          </div>
        </div>

        {/* Essential Contextual Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {onDocumentCenterClick && (
            <button
              type="button"
              className="ds-header-secondary-action"
              onClick={onDocumentCenterClick}
              style={{
                background: 'none',
                border: 'none',
                padding: '6px 10px',
                borderRadius: '6px',
                color: 'var(--ds-color-text-secondary)',
                fontSize: '12px',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
              aria-label="Important Notices & PDS"
            >
              <FileText size={15} color="var(--ds-color-text-tertiary)" aria-hidden="true" />
              <span className="ds-hide-mobile">Disclosures</span>
            </button>
          )}

          {onRetrieveQuoteClick && (
            <button
              type="button"
              className="ds-header-secondary-action"
              onClick={onRetrieveQuoteClick}
              style={{
                background: 'none',
                border: 'none',
                padding: '6px 10px',
                borderRadius: '6px',
                color: 'var(--ds-color-text-secondary)',
                fontSize: '12px',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
              aria-label="Retrieve Saved Quotation"
            >
              <Search size={15} color="var(--ds-color-text-tertiary)" aria-hidden="true" />
              <span className="ds-hide-mobile">Retrieve Quote</span>
            </button>
          )}

          {onRenewClick && (
            <button
              type="button"
              className="ds-header-secondary-action"
              onClick={onRenewClick}
              style={{
                background: 'none',
                border: 'none',
                padding: '6px 10px',
                borderRadius: '6px',
                color: 'var(--ds-color-text-secondary)',
                fontSize: '12px',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
              aria-label="Renew Existing Policy"
            >
              <RotateCcw size={15} color="var(--ds-color-text-tertiary)" aria-hidden="true" />
              <span className="ds-hide-mobile">Renew Policy</span>
            </button>
          )}

          <a
            href="tel:+60327123456"
            className="ds-header-helpline"
            aria-label="Call DoctorShield Support at +603 2712 3456"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 10px',
              borderRadius: '6px',
              color: 'var(--ds-primitive-color-navy-900)',
              fontSize: '12px',
              fontWeight: 500,
              textDecoration: 'none',
              backgroundColor: 'var(--ds-color-surface-subtle)',
            }}
          >
            <PhoneCall size={14} color="var(--ds-primitive-color-teal-700)" aria-hidden="true" />
            <span className="ds-hide-mobile">Support Hotline</span>
          </a>

          {onCatalogToggle && (
            <div className="ds-header-secondary-action">
              <Button
                size="sm"
                variant={isCatalogActive ? 'primary' : 'secondary'}
                onClick={onCatalogToggle}
                style={{ height: '32px', fontSize: '11px', padding: '0 10px', marginLeft: '6px' }}
              >
                {isCatalogActive ? 'Exit Catalog' : 'Catalog'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

/* ========================================================================
   2. MINIMAL STEP NAVIGATION ORGANISM
   ======================================================================== */
export interface StepDefinition {
  id: number;
  label: string;
  shortLabel?: string;
}

export interface MinimalStepNavigationProps {
  currentStep: number;
  steps?: StepDefinition[];
  onStepClick?: (stepId: number) => void;
  className?: string;
}

export const DEFAULT_DOCTORSHIELD_STEPS: StepDefinition[] = [
  { id: 1, label: 'Coverage', shortLabel: 'Cover' },
  { id: 2, label: 'Quotation', shortLabel: 'Quote' },
  { id: 3, label: 'Details & Underwriting', shortLabel: 'Details' },
  { id: 4, label: 'Review & Payment', shortLabel: 'Payment' },
];

/**
 * DoctorShield Minimal Step Navigation Organism
 * Restrained, linear progress indicator replacing oversized milestone circles.
 * Includes mobile stage tag and accessible ARIA state.
 */
export const MinimalStepNavigation: React.FC<MinimalStepNavigationProps> = ({
  currentStep,
  steps = DEFAULT_DOCTORSHIELD_STEPS,
  onStepClick,
  className = '',
}) => {
  const currentStepItem = steps.find((s) => s.id === currentStep) || steps[0];

  return (
    <nav
      aria-label="Insurance Application Progress"
      className={`ds-minimal-stepper ${className}`}
      style={{
        padding: '16px 0',
        marginBottom: '24px',
        borderBottom: '1px solid var(--ds-color-border-subtle)',
      }}
    >
      {/* Mobile Single-Line Summary */}
      <div
        className="ds-stepper-mobile"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '13px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              padding: '2px 8px',
              borderRadius: '4px',
              backgroundColor: 'var(--ds-primitive-color-navy-900)',
              color: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 500,
            }}
          >
            Step {currentStep} of {steps.length}
          </span>
          <span
            style={{
              fontFamily: 'var(--ds-primitive-font-body)',
              fontWeight: 500,
              color: 'var(--ds-color-text-primary)',
            }}
          >
            {currentStepItem.label}
          </span>
        </div>

        <span
          style={{
            fontFamily: 'var(--ds-primitive-font-mono)',
            fontSize: '12px',
            color: 'var(--ds-color-text-tertiary)',
          }}
        >
          {Math.round(((currentStep - 1) / (steps.length - 1)) * 100)}%
        </span>
      </div>

      {/* Desktop Understated Linear Stepper */}
      <ol
        className="ds-stepper-desktop"
        role="list"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
          gap: '16px',
          listStyle: 'none',
          padding: 0,
          margin: 0,
        }}
      >
        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;
          const isClickable = onStepClick && step.id <= currentStep;

          return (
            <li
              key={step.id}
              aria-current={isActive ? 'step' : undefined}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              {/* Progress Segment Bar */}
              <div
                style={{
                  height: '3px',
                  borderRadius: '2px',
                  backgroundColor: isCompleted || isActive
                    ? 'var(--ds-primitive-color-navy-900)'
                    : 'var(--ds-color-border-subtle)',
                  transition: 'background-color 200ms ease',
                }}
              />

              {/* Step Button / Label */}
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick?.(step.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  textAlign: 'left',
                  cursor: isClickable ? 'pointer' : 'default',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--ds-primitive-font-mono)',
                    fontSize: '11px',
                    fontWeight: 500,
                    color: isActive
                      ? 'var(--ds-primitive-color-navy-900)'
                      : isCompleted
                      ? 'var(--ds-color-text-secondary)'
                      : 'var(--ds-color-text-tertiary)',
                  }}
                >
                  {isCompleted ? <Check size={12} strokeWidth={3} /> : `0${step.id}`}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--ds-primitive-font-body)',
                    fontSize: '12px',
                    fontWeight: isActive ? 500 : 400,
                    color: isActive
                      ? 'var(--ds-primitive-color-navy-900)'
                      : isCompleted
                      ? 'var(--ds-color-text-secondary)'
                      : 'var(--ds-color-text-tertiary)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {step.label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
