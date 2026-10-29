import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export interface PremiumQuoteData {
  grossBase: number;
  discountAmount?: number;
  promoCode?: string;
  clinicEntityCover?: number;
  branchSurcharges?: number;
  branchCount?: number;
  picCoverAmount?: number;
  isPicComplimentary?: boolean;
  netGross: number;
  sstAmount: number; // 8%
  stampDuty: number; // Fixed RM 10.00
  totalPayable: number;
  currency?: string;
}

export interface PremiumBreakdownProps {
  quote: PremiumQuoteData;
  className?: string;
  condensed?: boolean;
}

export const PremiumBreakdown: React.FC<PremiumBreakdownProps> = ({
  quote,
  className = '',
  condensed = false,
}) => {
  const currency = quote.currency || 'RM';

  return (
    <div
      className={`ds-premium-breakdown ${className}`}
      style={{
        backgroundColor: 'var(--ds-color-surface-card)',
        border: '1px solid var(--ds-color-border-subtle)',
        borderRadius: 'var(--ds-primitive-radius-lg)',
        padding: condensed ? 'var(--ds-primitive-space-4)' : 'var(--ds-primitive-space-6)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--ds-primitive-space-4)' }}>
        <h3
          style={{
            fontFamily: 'var(--ds-primitive-font-heading)',
            fontSize: 'var(--ds-primitive-font-size-lg)',
            fontWeight: 500,
            color: 'var(--ds-color-text-heading)',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <ShieldCheck size={20} color="var(--ds-primitive-color-teal-700)" aria-hidden="true" />
          <span>Premium Summary</span>
        </h3>
        <span style={{ fontSize: '11px', color: 'var(--ds-color-text-muted)' }}>Underwritten by Chubb</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: 'var(--ds-primitive-font-size-sm)' }}>
        {/* Base Gross */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--ds-color-text-secondary)' }}>Medical Indemnity Premium</span>
          <span style={{ fontFamily: 'var(--ds-primitive-font-mono)', fontWeight: 500 }}>
            {currency} {quote.grossBase.toFixed(2)}
          </span>
        </div>

        {/* Promotional / Affinity Discount */}
        {quote.discountAmount && quote.discountAmount > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ds-primitive-color-emerald-700)' }}>
            <span>Affinity Discount ({quote.promoCode || 'PROMO'})</span>
            <span style={{ fontFamily: 'var(--ds-primitive-font-mono)', fontWeight: 600 }}>
              - {currency} {quote.discountAmount.toFixed(2)}
            </span>
          </div>
        )}

        {/* Clinic Entity Cover */}
        {quote.clinicEntityCover && quote.clinicEntityCover > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--ds-color-text-secondary)' }}>Clinic Facility Cover Endorsement</span>
            <span style={{ fontFamily: 'var(--ds-primitive-font-mono)', fontWeight: 500 }}>
              {currency} {quote.clinicEntityCover.toFixed(2)}
            </span>
          </div>
        )}

        {/* Branch Surcharges */}
        {quote.branchSurcharges && quote.branchSurcharges > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--ds-color-text-secondary)' }}>
              Branch Clinics ({quote.branchCount || 1} branches)
            </span>
            <span style={{ fontFamily: 'var(--ds-primitive-font-mono)', fontWeight: 500 }}>
              {currency} {quote.branchSurcharges.toFixed(2)}
            </span>
          </div>
        )}

        {/* Person In Charge (PIC) */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--ds-color-text-secondary)' }}>Person-In-Charge (PIC) Statutory Cover</span>
          <span style={{ fontFamily: 'var(--ds-primitive-font-mono)', fontWeight: 500 }}>
            {quote.isPicComplimentary ? (
              <span style={{ color: 'var(--ds-primitive-color-teal-800)', fontWeight: 600 }}>Included (RM 0.00)</span>
            ) : quote.picCoverAmount ? (
              `${currency} ${quote.picCoverAmount.toFixed(2)}`
            ) : (
              'Not Selected'
            )}
          </span>
        </div>

        {/* 1x Reinstatement Confirmation */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--ds-color-text-secondary)' }}>1x Automatic Aggregate Reinstatement</span>
          <span style={{ color: 'var(--ds-primitive-color-teal-800)', fontWeight: 600, fontFamily: 'var(--ds-primitive-font-mono)' }}>
            Complimentary (RM 0.00)
          </span>
        </div>

        {/* Subtotal Divider */}
        <div style={{ borderTop: '1px solid var(--ds-color-border-subtle)', margin: '6px 0' }} />

        {/* Net Gross */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
          <span style={{ color: 'var(--ds-color-text-primary)' }}>Net Gross Premium</span>
          <span style={{ fontFamily: 'var(--ds-primitive-font-mono)' }}>
            {currency} {quote.netGross.toFixed(2)}
          </span>
        </div>

        {/* Tax: SST 8% */}
        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ds-color-text-secondary)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>Sales & Service Tax (SST @ 8%)</span>
          </span>
          <span style={{ fontFamily: 'var(--ds-primitive-font-mono)' }}>
            {currency} {quote.sstAmount.toFixed(2)}
          </span>
        </div>

        {/* Stamp Duty: Fixed RM 10 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ds-color-text-secondary)' }}>
          <span>Statutory Stamp Duty</span>
          <span style={{ fontFamily: 'var(--ds-primitive-font-mono)' }}>
            {currency} {quote.stampDuty.toFixed(2)}
          </span>
        </div>

        {/* Total Divider */}
        <div style={{ borderTop: '2px solid var(--ds-primitive-color-navy-900)', margin: '8px 0 4px 0' }} />

        {/* Final Payable */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span
            style={{
              fontFamily: 'var(--ds-primitive-font-heading)',
              fontSize: 'var(--ds-primitive-font-size-base)',
              fontWeight: 500,
              color: 'var(--ds-color-text-heading)',
            }}
          >
            Total Payable
          </span>
          <span
            style={{
              fontFamily: 'var(--ds-primitive-font-mono)',
              fontSize: condensed ? '1.5rem' : '2.0rem',
              fontWeight: 600,
              color: 'var(--ds-primitive-color-navy-900)',
            }}
          >
            {currency} {quote.totalPayable.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

