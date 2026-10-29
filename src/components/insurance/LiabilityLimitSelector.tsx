import React from 'react';
import { ShieldCheck, Check } from 'lucide-react';

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
}

export const LiabilityLimitSelector: React.FC<LiabilityLimitSelectorProps> = ({
  tiers,
  selectedTierId,
  onChange,
  className = '',
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
          fontSize: 'var(--ds-primitive-font-size-sm)',
          fontWeight: 'var(--ds-primitive-font-weight-medium)',
          color: 'var(--ds-color-text-secondary)',
          marginBottom: 'var(--ds-primitive-space-3)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <ShieldCheck size={16} color="var(--ds-primitive-color-teal-700)" aria-hidden="true" />
        <span>Select Limit of Liability (Any One Claim & Aggregate)</span>
      </legend>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 'var(--ds-primitive-space-3)',
        }}
      >
        {tiers.map((tier) => {
          const isSelected = tier.id === selectedTierId;

          return (
            <div
              key={tier.id}
              role="radio"
              aria-checked={isSelected}
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
                padding: 'var(--ds-primitive-space-4)',
                backgroundColor: isSelected
                  ? 'var(--ds-color-surface-brand-tint)' // #F0FAFA
                  : 'var(--ds-color-surface-card)',      // #FFFFFF
                border: isSelected
                  ? '2px solid var(--ds-color-border-selected)' // #08A5B5
                  : '1px solid var(--ds-color-border-default)',
                borderRadius: 'var(--ds-primitive-radius-lg)',
                cursor: 'pointer',
                transition: 'all 150ms ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '96px',
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
    </fieldset>
  );
};

