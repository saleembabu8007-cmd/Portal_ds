import React, { useState } from 'react';
import { Calendar, Shield, ChevronUp, ChevronDown, Check, ArrowRight, Lock, Info } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/FieldFeedback';
import { CompactCurrencyDisplay, PriceBreakdownRow } from '../form/CurrencyAndPriceDisplay';

export interface QuotationFinancialData {
  grossBase: number;
  discountAmount?: number;
  promoCode?: string;
  clinicEntityCover?: number;
  picCover?: number;
  isPicComplimentary?: boolean;
  branchSurcharges?: number;
  branchCount?: number;
  automaticReinstatement?: number;
  cyberLiability?: number;
  netGross: number;
  sstAmount: number; // 8%
  stampDuty: number; // 10.00
  totalPayable: number;
}

/* ========================================================================
   7. CORE INSURANCE QUOTATION SECTION ORGANISM
   ======================================================================== */
export interface CoreQuotationSectionProps {
  specialtyName: string;
  limitFormatted: string;
  startDate: string;
  endDate?: string;
  isProrata?: boolean;
  prorataDays?: number;
  quote: QuotationFinancialData;
  className?: string;
}

/**
 * DoctorShield Core Insurance Quotation Section Organism
 * Authoritative indicative quote hero displaying headline rate, pro-rata duration banner,
 * APC alignment, and rate lock badge without artificial countdown anxiety.
 */
export const CoreQuotationSection: React.FC<CoreQuotationSectionProps> = ({
  specialtyName,
  limitFormatted,
  startDate,
  endDate = `${new Date().getFullYear()}-12-31`,
  isProrata = false,
  prorataDays,
  quote,
  className = '',
}) => {
  return (
    <div
      className={`ds-core-quotation-hero ${className}`}
      style={{
        padding: '28px',
        backgroundColor: 'var(--ds-color-surface-base)',
        border: '1px solid var(--ds-color-border-subtle)',
        borderRadius: 'var(--ds-comp-panel-radius)',
        marginBottom: '32px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <span
            style={{
              fontFamily: 'var(--ds-primitive-font-body)',
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--ds-color-text-tertiary)',
              display: 'block',
              marginBottom: '4px',
            }}
          >
            Indicative Annual Indemnity Premium
          </span>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <CompactCurrencyDisplay
              amount={quote.totalPayable}
              size="display"
              color="navy"
            />
            <span
              style={{
                fontSize: '13px',
                color: 'var(--ds-color-text-tertiary)',
              }}
            >
              incl. 8% SST & RM 10 Stamp Duty
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
            <Badge variant="teal">{specialtyName}</Badge>
            <Badge variant="neutral">Limit: {limitFormatted}</Badge>
            <Badge variant="neutral">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Lock size={11} aria-hidden="true" />
                <span>Rate Locked</span>
              </span>
            </Badge>
          </div>
        </div>

        {/* Coverage Duration Badge */}
        <div
          style={{
            padding: '12px 16px',
            backgroundColor: 'var(--ds-color-surface-subtle)',
            borderRadius: 'var(--ds-comp-input-radius)',
            border: '1px solid var(--ds-color-border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
            <Calendar size={15} color="var(--ds-color-text-tertiary)" aria-hidden="true" />
            <span
              style={{
                fontFamily: 'var(--ds-primitive-font-body)',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--ds-color-text-primary)',
              }}
            >
              {startDate} &rarr; {endDate}
            </span>
          </div>

          <span
            style={{
              fontSize: '11px',
              color: 'var(--ds-color-text-secondary)',
              display: 'block',
            }}
          >
            {isProrata && prorataDays
              ? `Pro-rata Period: ${prorataDays} Days · MMC APC Cycle`
              : 'Annual 12-Month Coverage Term'}
          </span>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================
   10. PREMIUM COMPARISON AND BREAKDOWN TABLE ORGANISM
   ======================================================================== */
export interface PremiumBreakdownTableProps {
  quote: QuotationFinancialData;
  showAllLineItems?: boolean;
  className?: string;
}

/**
 * DoctorShield Premium Breakdown Table Organism
 * Compact, sophisticated financial summary with tabular numbers, consistent alignment,
 * and zero stale totals.
 */
export const PremiumBreakdownTable: React.FC<PremiumBreakdownTableProps> = ({
  quote,
  showAllLineItems = true,
  className = '',
}) => {
  return (
    <div
      className={`ds-premium-table ${className}`}
      style={{
        padding: '20px 24px',
        backgroundColor: 'var(--ds-color-surface-subtle)',
        border: '1px solid var(--ds-color-border-subtle)',
        borderRadius: 'var(--ds-comp-panel-radius)',
      }}
    >
      <h3
        style={{
          fontFamily: 'var(--ds-primitive-font-heading)',
          fontSize: '15px',
          fontWeight: 500,
          color: 'var(--ds-primitive-color-navy-900)',
          margin: '0 0 14px 0',
        }}
      >
        Itemized Premium Calculation
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <PriceBreakdownRow label="Base Professional Indemnity" amount={quote.grossBase} />

        {quote.discountAmount && quote.discountAmount > 0 ? (
          <PriceBreakdownRow
            label={`Association Discount (${quote.promoCode || 'Promotion'})`}
            amount={quote.discountAmount}
            isDiscount={true}
          />
        ) : null}

        {quote.clinicEntityCover && quote.clinicEntityCover > 0 ? (
          <PriceBreakdownRow
            label="Healthcare Facility Entity Extension"
            amount={quote.clinicEntityCover}
          />
        ) : null}

        {quote.picCover && quote.picCover > 0 ? (
          <PriceBreakdownRow
            label="Person-In-Charge (PIC) Statutory Cover"
            amount={quote.picCover}
          />
        ) : quote.isPicComplimentary ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              padding: '6px 0',
              fontSize: '13px',
              color: 'var(--ds-color-text-secondary)',
            }}
          >
            <span>Person-In-Charge (PIC) Statutory Cover</span>
            <span
              style={{
                fontFamily: 'var(--ds-primitive-font-mono)',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--ds-primitive-color-emerald-700)',
              }}
            >
              Complimentary (RM 0.00)
            </span>
          </div>
        ) : null}

        {quote.branchSurcharges && quote.branchSurcharges > 0 ? (
          <PriceBreakdownRow
            label={`Additional Branches Surcharge (${quote.branchCount || 1})`}
            amount={quote.branchSurcharges}
          />
        ) : null}

        {quote.automaticReinstatement && quote.automaticReinstatement > 0 ? (
          <PriceBreakdownRow
            label="Automatic Reinstatement of Limit"
            amount={quote.automaticReinstatement}
          />
        ) : null}

        {quote.cyberLiability && quote.cyberLiability > 0 ? (
          <PriceBreakdownRow
            label="Cyber Liability & EMR Endorsement"
            amount={quote.cyberLiability}
          />
        ) : null}

        {/* Subtotal / Net Line */}
        <PriceBreakdownRow label="Net Premium Subject to Tax" amount={quote.netGross} />

        {/* Statutory Tax & Duties */}
        <PriceBreakdownRow
          label="Service Tax (SST 8%)"
          amount={quote.sstAmount}
          infoNote="Royal Malaysian Customs Department (RMCD) statutory 8% tax."
        />

        <PriceBreakdownRow
          label="Stamp Duty"
          amount={quote.stampDuty}
          infoNote="Inland Revenue Board of Malaysia (LHDN) stamp duty."
        />

        {/* Total Row */}
        <PriceBreakdownRow
          label="Total Premium Payable"
          amount={quote.totalPayable}
          isTotal={true}
        />
      </div>
    </div>
  );
};

/* ========================================================================
   11. CONTEXTUAL SUMMARY PANEL ORGANISM (Desktop Sticky Sidebar)
   ======================================================================== */
export interface ContextualSummaryPanelProps {
  specialtyName: string;
  limitFormatted: string;
  startDate: string;
  endDate?: string;
  quote: QuotationFinancialData;
  onProceed?: () => void;
  proceedLabel?: string;
  isProceedDisabled?: boolean;
  isProceedLoading?: boolean;
  className?: string;
}

/**
 * DoctorShield Contextual Summary Panel Organism
 * Sticky desktop rail providing policy parameter readouts, live calculation, and primary CTA.
 */
export const ContextualSummaryPanel: React.FC<ContextualSummaryPanelProps> = ({
  specialtyName,
  limitFormatted,
  startDate,
  endDate = `${new Date().getFullYear()}-12-31`,
  quote,
  onProceed,
  proceedLabel = 'Proceed to Quotation',
  isProceedDisabled = false,
  isProceedLoading = false,
  className = '',
}) => {
  return (
    <div
      className={`ds-summary-panel ${className}`}
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--ds-color-border-subtle)',
        borderRadius: 'var(--ds-comp-panel-radius)',
        padding: '24px',
        boxShadow: 'var(--ds-primitive-shadow-xs)',
      }}
    >
      <h3
        style={{
          fontFamily: 'var(--ds-primitive-font-heading)',
          fontSize: '16px',
          fontWeight: 500,
          color: 'var(--ds-primitive-color-navy-900)',
          margin: '0 0 16px 0',
          paddingBottom: '12px',
          borderBottom: '1px solid var(--ds-color-border-subtle)',
        }}
      >
        Coverage Summary
      </h3>

      {/* Policy Meta Readouts */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
          <span style={{ color: 'var(--ds-color-text-secondary)' }}>Specialty:</span>
          <span style={{ fontWeight: 500, color: 'var(--ds-color-text-primary)', textAlign: 'right' }}>{specialtyName}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
          <span style={{ color: 'var(--ds-color-text-secondary)' }}>Indemnity Limit:</span>
          <span style={{ fontWeight: 500, color: 'var(--ds-color-text-primary)' }}>{limitFormatted}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
          <span style={{ color: 'var(--ds-color-text-secondary)' }}>Policy Period:</span>
          <span style={{ fontWeight: 500, color: 'var(--ds-color-text-primary)' }}>{startDate} &rarr; {endDate}</span>
        </div>
      </div>

      {/* Itemized Calculation */}
      <div style={{ marginBottom: '24px' }}>
        <PremiumBreakdownTable quote={quote} />
      </div>

      {/* Primary Proceed CTA */}
      {onProceed && (
        <Button
          type="button"
          variant="primary"
          onClick={onProceed}
          disabled={isProceedDisabled}
          loading={isProceedLoading}
          style={{ width: '100%', height: '48px', fontSize: '15px' }}
        >
          <span>{proceedLabel}</span>
          <ArrowRight size={16} />
        </Button>
      )}

      {/* Regulatory PIDM Trust Notice */}
      <div
        style={{
          marginTop: '16px',
          paddingTop: '12px',
          borderTop: '1px solid var(--ds-color-border-subtle)',
          fontSize: '11px',
          color: 'var(--ds-color-text-tertiary)',
          lineHeight: 1.45,
          textAlign: 'center',
        }}
      >
        Underwritten by Chubb Insurance Malaysia Berhad · PIDM Protected
      </div>
    </div>
  );
};

/* ========================================================================
   19. MOBILE COLLAPSED QUOTATION SUMMARY ORGANISM
   ======================================================================== */
export interface MobileQuoteDrawerProps {
  quote: QuotationFinancialData;
  onProceed?: () => void;
  proceedLabel?: string;
  isProceedDisabled?: boolean;
}

/**
 * DoctorShield Mobile Collapsed Quotation Drawer Organism
 * Fixed 48px bottom bar for viewport <1024px, expanding into a full financial breakdown sheet.
 */
export const MobileQuoteDrawer: React.FC<MobileQuoteDrawerProps> = ({
  quote,
  onProceed,
  proceedLabel = 'Proceed',
  isProceedDisabled = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="ds-mobile-quote-drawer"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid var(--ds-color-border-subtle)',
        boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.08)',
      }}
    >
      {/* Expanded Sheet Content */}
      {isExpanded && (
        <div
          style={{
            maxHeight: '60vh',
            overflowY: 'auto',
            padding: '20px 20px 10px',
            borderBottom: '1px solid var(--ds-color-border-subtle)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontWeight: 600, fontSize: '14px', color: 'var(--ds-primitive-color-navy-900)' }}>
              Detailed Premium Breakdown
            </span>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              style={{ background: 'none', border: 'none', fontSize: '12px', color: 'var(--ds-color-text-secondary)', cursor: 'pointer' }}
            >
              Close
            </button>
          </div>
          <PremiumBreakdownTable quote={quote} />
        </div>
      )}

      {/* Docked Collapsed Bar (48px) */}
      <div
        style={{
          height: '56px',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            textAlign: 'left',
          }}
          aria-expanded={isExpanded}
        >
          <div>
            <div style={{ fontSize: '11px', color: 'var(--ds-color-text-tertiary)' }}>Total Premium</div>
            <CompactCurrencyDisplay amount={quote.totalPayable} size="md" color="navy" />
          </div>
          <div style={{ color: 'var(--ds-color-text-tertiary)' }}>
            {isExpanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          </div>
        </button>

        {onProceed && (
          <Button
            size="sm"
            variant="primary"
            onClick={onProceed}
            disabled={isProceedDisabled}
            style={{ minWidth: '110px' }}
          >
            {proceedLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

