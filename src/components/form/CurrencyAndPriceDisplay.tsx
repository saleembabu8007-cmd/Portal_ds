import React from 'react';
import { Info } from 'lucide-react';

/* ========================================================================
   1. COMPACT CURRENCY DISPLAY
   ======================================================================== */
export interface CompactCurrencyDisplayProps {
  amount: number;
  currency?: string;
  size?: 'sm' | 'md' | 'lg' | 'display';
  color?: 'primary' | 'secondary' | 'discount' | 'navy';
  className?: string;
  style?: React.CSSProperties;
}

export const CompactCurrencyDisplay: React.FC<CompactCurrencyDisplayProps> = ({
  amount,
  currency = 'RM',
  size = 'md',
  color = 'primary',
  className = '',
  style,
}) => {
  const formattedAmount = (amount || 0).toLocaleString('en-MY', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const fontSizes = {
    sm: { symbol: '11px', amount: '13px' },
    md: { symbol: '12px', amount: '15px' },
    lg: { symbol: '14px', amount: '1.25rem' },
    display: { symbol: '16px', amount: '1.75rem' },
  };

  const textColors = {
    primary: 'var(--ds-color-text-primary)',
    secondary: 'var(--ds-color-text-secondary)',
    discount: 'var(--ds-primitive-color-emerald-700)',
    navy: 'var(--ds-color-brand-secondary)',
  };

  return (
    <span
      className={`ds-currency-display ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: '3px',
        fontFamily: 'var(--ds-primitive-font-mono)',
        fontVariantNumeric: 'tabular-nums',
        color: textColors[color],
        ...style,
      }}
    >
      <span
        style={{
          fontSize: fontSizes[size].symbol,
          fontWeight: 500,
          opacity: 0.85,
        }}
      >
        {currency}
      </span>
      <span
        style={{
          fontSize: fontSizes[size].amount,
          fontWeight: size === 'display' ? 600 : 500,
          letterSpacing: '-0.02em',
        }}
      >
        {formattedAmount}
      </span>
    </span>
  );
};

/* ========================================================================
   2. PRICE BREAKDOWN ROW
   ======================================================================== */
export interface PriceBreakdownRowProps {
  label: string;
  amount: number;
  infoNote?: string;
  isDiscount?: boolean;
  isTotal?: boolean;
  currency?: string;
  className?: string;
}

export const PriceBreakdownRow: React.FC<PriceBreakdownRowProps> = ({
  label,
  amount,
  infoNote,
  isDiscount = false,
  isTotal = false,
  currency = 'RM',
  className = '',
}) => {
  return (
    <div
      className={`ds-price-breakdown-row ${className}`}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        paddingTop: isTotal ? 'var(--ds-primitive-space-3)' : 'var(--ds-primitive-space-2)',
        paddingBottom: isTotal ? 'var(--ds-primitive-space-3)' : 'var(--ds-primitive-space-2)',
        borderTop: isTotal ? '1px solid var(--ds-color-border-subtle)' : 'none',
        marginTop: isTotal ? 'var(--ds-primitive-space-2)' : 0,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span
          style={{
            fontFamily: 'var(--ds-primitive-font-body)',
            fontSize: isTotal ? 'var(--ds-primitive-font-size-base)' : 'var(--ds-primitive-font-size-sm)',
            fontWeight: isTotal ? 600 : 400,
            color: isTotal ? 'var(--ds-color-text-primary)' : 'var(--ds-color-text-secondary)',
          }}
        >
          {label}
        </span>
        {infoNote && (
          <span
            title={infoNote}
            style={{
              color: 'var(--ds-color-text-tertiary)',
              cursor: 'help',
              display: 'inline-flex',
            }}
          >
            <Info size={13} aria-hidden="true" />
          </span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
        {isDiscount && (
          <span
            style={{
              fontFamily: 'var(--ds-primitive-font-mono)',
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--ds-primitive-color-emerald-700)',
            }}
          >
            -
          </span>
        )}
        <CompactCurrencyDisplay
          amount={amount}
          currency={currency}
          size={isTotal ? 'lg' : 'sm'}
          color={isDiscount ? 'discount' : isTotal ? 'navy' : 'primary'}
        />
      </div>
    </div>
  );
};

