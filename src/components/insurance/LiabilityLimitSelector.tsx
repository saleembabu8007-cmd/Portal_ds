import React from 'react';
import { ShieldCheck, Check, AlertCircle } from 'lucide-react';

export interface LiabilityTier {
  id: string;
  limitAmount: number;
  limitFormatted: string; // e.g. "RM 1,000,000"
  indicativeAnnualRate?: number;
  isRecommended?: boolean;
  recommendationTag?: string; // e.g. "Recommended for Primary Care"
}

export interface LiabilityLimitSelectorProps {
  tiers: LiabilityTier[];
  selectedTierId?: string;
  onChange: (tierId: string) => void;
  className?: string;
  label?: string;
  errorMessage?: string;
}

export const LiabilityLimitSelector: React.FC<LiabilityLimitSelectorProps> = ({
  tiers,
  selectedTierId,
  onChange,
  className = '',
  label = 'Limit of Liability Options',
  errorMessage,
}) => {
  return (
    <fieldset
      className={`ds-liability-selector ${className}`}
      style={{
        border: 'none',
        padding: 0,
        margin: '0 0 var(--ds-space-field-to-field, 20px) 0',
      }}
    >
      <legend
        style={{
          fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
          fontSize: 'var(--ds-font-field-label-size, 0.8125rem)',
          fontWeight: 500,
          color: 'var(--ds-color-text-label, #334155)',
          marginBottom: 'var(--ds-space-label-to-control, 6px)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <ShieldCheck size={15} color="var(--ds-color-brand-primary, #08A5B5)" aria-hidden="true" />
        <span>Limit of Liability (Any One Claim & Aggregate)</span>
        <span style={{ color: 'var(--ds-primitive-color-rose-700, #B91C1C)', fontWeight: 500 }} aria-label="required">*</span>
      </legend>

      <div
        role="radiogroup"
        aria-label={label}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '10px',
        }}
      >
        {tiers.map((tier) => {
          const isSelected = tier.id === selectedTierId;

          return (
            <div
              key={tier.id}
              role="radio"
              aria-checked={isSelected}
              aria-label={tier.limitFormatted}
              tabIndex={0}
              onClick={() => onChange(tier.id)}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  onChange(tier.id);
                }
              }}
              className={`ds-tile ${isSelected ? 'ds-tile-selected' : ''}`}
              style={{
                position: 'relative',
                padding: '12px 14px',
                backgroundColor: isSelected
                  ? 'var(--ds-comp-tile-selected-bg, #F0FAFA)'
                  : 'var(--ds-comp-tile-bg, #FFFFFF)',
                border: isSelected
                  ? '2px solid var(--ds-color-brand-primary, #08A5B5)'
                  : '1px solid var(--ds-color-border-subtle, #DFE6EC)',
                borderRadius: 'var(--ds-comp-tile-radius, 6px)',
                cursor: 'pointer',
                transition: 'all var(--ds-primitive-duration-fast, 150ms) var(--ds-primitive-ease-default)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '76px',
                boxSizing: 'border-box',
                outline: 'none',
              }}
            >
              {/* Header row: Check icon or Recommendation badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                {tier.isRecommended ? (
                  <span
                    style={{
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      color: 'var(--ds-color-text-link, #066F7B)',
                      backgroundColor: 'var(--ds-color-surface-brand-tint, #F0FAFA)',
                      border: '1px solid var(--ds-primitive-color-teal-200, #AEE7EB)',
                      padding: '1px 6px',
                      borderRadius: 'var(--ds-primitive-radius-sm, 4px)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    Recommended
                  </span>
                ) : (
                  <span />
                )}

                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    border: isSelected
                      ? '2px solid var(--ds-color-brand-primary, #08A5B5)'
                      : '1.5px solid var(--ds-color-border-default, #CBD5E1)',
                    backgroundColor: isSelected ? 'var(--ds-color-brand-primary, #08A5B5)' : '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isSelected && <Check size={11} color="#FFFFFF" strokeWidth={3} aria-hidden="true" />}
                </div>
              </div>

              {/* Main Limit Typography */}
              <div>
                <span
                  style={{
                    fontFamily: 'var(--ds-primitive-font-heading, "Kanit", sans-serif)',
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: isSelected ? 'var(--ds-color-text-heading, #132766)' : 'var(--ds-color-text-primary, #17253B)',
                    letterSpacing: '-0.01em',
                    display: 'block',
                  }}
                >
                  {tier.limitFormatted}
                </span>

                {tier.indicativeAnnualRate && (
                  <span
                    style={{
                      fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
                      fontSize: '0.75rem',
                      color: 'var(--ds-color-text-muted, #64748B)',
                      fontVariantNumeric: 'tabular-nums',
                      display: 'block',
                      marginTop: '2px',
                    }}
                  >
                    From RM {tier.indicativeAnnualRate} / yr
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {errorMessage && (
        <p
          role="alert"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
            fontSize: '0.75rem',
            color: 'var(--ds-primitive-color-rose-700, #B91C1C)',
            marginTop: '6px',
            marginBottom: 0,
          }}
        >
          <AlertCircle size={14} aria-hidden="true" style={{ flexShrink: 0 }} />
          <span>{errorMessage}</span>
        </p>
      )}
    </fieldset>
  );
};
