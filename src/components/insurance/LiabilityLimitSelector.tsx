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
        margin: '0 0 var(--ds-primitive-space-6) 0',
      }}
    >
      <legend
        style={{
          fontFamily: 'var(--ds-primitive-font-body)',
          fontSize: '14px',
          fontWeight: 500,
          color: 'var(--ds-color-text-primary)',
          marginBottom: 'var(--ds-primitive-space-3)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <ShieldCheck size={16} color="var(--ds-primitive-color-teal-700)" aria-hidden="true" />
        <span>Limit of Liability (Any One Claim & Aggregate)</span>
        <span style={{ color: 'var(--ds-color-status-error)' }}>*</span>
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
              style={{
                position: 'relative',
                padding: '12px 14px',
                backgroundColor: isSelected
                  ? 'var(--ds-color-surface-brand-tint)' // #F0FAFA
                  : 'var(--ds-color-surface-card)',      // #FFFFFF
                border: isSelected
                  ? '2px solid var(--ds-color-border-selected)' // #08A5B5
                  : '1px solid var(--ds-color-border-default)',
                borderRadius: 'var(--ds-primitive-radius-md)',
                cursor: 'pointer',
                transition: 'all 150ms ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '74px',
                boxSizing: 'border-box',
                outline: 'none',
              }}
              className="ds-liability-card"
            >
              {tier.isRecommended && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '12px',
                    backgroundColor: 'var(--ds-primitive-color-teal-700)',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: 'var(--ds-primitive-radius-full)',
                    letterSpacing: '0.02em',
                  }}
                >
                  {tier.recommendationTag || 'Recommended'}
                </div>
              )}

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontFamily: 'var(--ds-primitive-font-body)',
                      fontSize: 'var(--ds-primitive-font-size-base)',
                      fontWeight: 600,
                      color: 'var(--ds-color-text-heading)',
                    }}
                  >
                    {tier.limitFormatted}
                  </span>
                  {isSelected && (
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: 'var(--ds-primitive-radius-full)',
                        backgroundColor: 'var(--ds-primitive-color-teal-700)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Check size={12} color="#FFFFFF" strokeWidth={3} aria-hidden="true" />
                    </div>
                  )}
                </div>

                <div
                  style={{
                    fontSize: 'var(--ds-primitive-font-size-xs)',
                    color: 'var(--ds-color-text-muted)',
                    marginTop: '2px',
                  }}
                >
                  Per Claim & In Aggregate
                </div>
              </div>

              {tier.indicativeAnnualRate && (
                <div
                  style={{
                    marginTop: 'var(--ds-primitive-space-2)',
                    paddingTop: 'var(--ds-primitive-space-2)',
                    borderTop: '1px solid var(--ds-color-border-subtle)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                  }}
                >
                  <span style={{ fontSize: '11px', color: 'var(--ds-color-text-muted)' }}>From</span>
                  <span
                    style={{
                      fontFamily: 'var(--ds-primitive-font-mono)',
                      fontSize: 'var(--ds-primitive-font-size-sm)',
                      fontWeight: 600,
                      color: 'var(--ds-primitive-color-teal-800)',
                    }}
                  >
                    RM {tier.indicativeAnnualRate.toFixed(2)}/yr
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {errorMessage && (
        <div
          role="alert"
          style={{
            marginTop: '8px',
            fontSize: '13px',
            color: 'var(--ds-color-status-error)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <AlertCircle size={14} />
          <span>{errorMessage}</span>
        </div>
      )}
    </fieldset>
  );
};

