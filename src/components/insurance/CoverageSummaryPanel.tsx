import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Shield, FileText } from 'lucide-react';
import { PremiumQuoteData } from './PremiumDisplay';

export interface CoverageSummaryPanelProps {
  classificationName?: string;
  limitFormatted?: string;
  startDate?: string;
  endDate?: string;
  hasClinicCover?: boolean;
  branchCount?: number;
  quote?: PremiumQuoteData;
  onProceed?: () => void;
  proceedLabel?: string;
  proceedDisabled?: boolean;
  className?: string;
}

export const CoverageSummaryPanel: React.FC<CoverageSummaryPanelProps> = ({
  classificationName = 'General Medical Practitioner',
  limitFormatted = 'RM 1,000,000',
  startDate,
  endDate,
  hasClinicCover = false,
  branchCount = 0,
  quote,
  onProceed,
  proceedLabel = 'Proceed to Application',
  proceedDisabled = false,
  className = '',
}) => {
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const total = quote ? quote.totalPayable.toFixed(2) : '---';

  return (
    <>
      {/* Desktop Sticky Rail */}
      <aside
        className={`ds-summary-rail-desktop ${className}`}
        aria-label="Coverage & Quotation Summary"
        style={{
          position: 'sticky',
          top: 'var(--ds-primitive-space-6)',
          backgroundColor: 'var(--ds-color-surface-card)',
          border: '1px solid var(--ds-color-border-subtle)',
          borderRadius: 'var(--ds-primitive-radius-xl)',
          padding: 'var(--ds-primitive-space-6)',
          boxShadow: 'var(--ds-primitive-shadow-md)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--ds-primitive-space-4)' }}>
          <Shield size={20} color="var(--ds-primitive-color-teal-700)" aria-hidden="true" />
          <h3
            style={{
              fontFamily: 'var(--ds-primitive-font-heading)',
              fontSize: 'var(--ds-primitive-font-size-lg)',
              fontWeight: 500,
              color: 'var(--ds-color-text-heading)',
              margin: 0,
            }}
          >
            Quotation Overview
          </h3>
        </div>

        {/* Selected Parameters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: 'var(--ds-primitive-font-size-sm)', marginBottom: 'var(--ds-primitive-space-5)' }}>
          <div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ds-color-text-muted)' }}>
              Medical Specialization
            </div>
            <div style={{ fontWeight: 600, color: 'var(--ds-color-text-primary)' }}>{classificationName}</div>
          </div>

          <div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ds-color-text-muted)' }}>
              Indemnity Limit
            </div>
            <div style={{ fontWeight: 600, color: 'var(--ds-primitive-color-teal-800)' }}>{limitFormatted}</div>
          </div>

          {startDate && (
            <div>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ds-color-text-muted)' }}>
                Policy Period
              </div>
              <div style={{ color: 'var(--ds-color-text-secondary)' }}>
                {startDate} to {endDate || '1 Year'}
              </div>
            </div>
          )}

          {hasClinicCover && (
            <div>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ds-color-text-muted)' }}>
                Facility Protection
              </div>
              <div style={{ color: 'var(--ds-color-text-secondary)' }}>
                Clinic Facility Cover Included {branchCount > 0 ? `(${branchCount} Branches)` : ''}
              </div>
            </div>
          )}
        </div>

        {/* Pricing Box */}
        <div
          style={{
            padding: 'var(--ds-primitive-space-4)',
            backgroundColor: 'var(--ds-primitive-color-navy-50)',
            borderRadius: 'var(--ds-primitive-radius-md)',
            border: '1px solid var(--ds-color-border-subtle)',
            marginBottom: 'var(--ds-primitive-space-5)',
          }}
        >
          <div style={{ fontSize: '12px', color: 'var(--ds-color-text-muted)' }}>Total Payable (Incl. SST & Stamp Duty)</div>
          <div
            style={{
              fontFamily: 'var(--ds-primitive-font-mono)',
              fontSize: '1.75rem',
              fontWeight: 600,
              color: 'var(--ds-primitive-color-navy-900)',
              marginTop: '2px',
            }}
          >
            RM {total}
          </div>
        </div>

        {onProceed && (
          <button
            type="button"
            disabled={proceedDisabled}
            onClick={onProceed}
            style={{
              width: '100%',
              minHeight: '48px',
              backgroundColor: 'var(--ds-color-action-primary)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 'var(--ds-primitive-radius-md)',
              fontSize: 'var(--ds-primitive-font-size-base)',
              fontWeight: 600,
              cursor: proceedDisabled ? 'not-allowed' : 'pointer',
              opacity: proceedDisabled ? 0.6 : 1,
              transition: 'background-color 150ms ease',
            }}
          >
            {proceedLabel}
          </button>
        )}
      </aside>

      {/* Mobile Sticky Bottom Drawer */}
      <div
        className="ds-summary-mobile-drawer"
        style={{
          display: 'none',
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'var(--ds-color-surface-card)',
          borderTop: '1px solid var(--ds-color-border-subtle)',
          boxShadow: 'var(--ds-primitive-shadow-lg)',
          zIndex: 30,
          padding: '12px 16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--ds-color-text-muted)' }}>Total Payable</div>
            <div style={{ fontFamily: 'var(--ds-primitive-font-mono)', fontSize: '1.35rem', fontWeight: 600, color: 'var(--ds-primitive-color-navy-900)' }}>
              RM {total}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={() => setMobileExpanded(!mobileExpanded)}
              style={{
                background: 'none',
                border: '1px solid var(--ds-color-border-default)',
                borderRadius: '6px',
                padding: '8px 12px',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                color: 'var(--ds-color-text-secondary)',
              }}
            >
              <span>Details</span>
              {mobileExpanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            </button>

            {onProceed && (
              <button
                type="button"
                disabled={proceedDisabled}
                onClick={onProceed}
                style={{
                  minHeight: '40px',
                  padding: '0 16px',
                  backgroundColor: 'var(--ds-color-action-primary)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '14px',
                }}
              >
                Continue
              </button>
            )}
          </div>
        </div>

        {mobileExpanded && (
          <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--ds-color-border-subtle)', fontSize: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span>Specialty:</span>
              <strong>{classificationName}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span>Limit:</span>
              <strong>{limitFormatted}</strong>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .ds-summary-rail-desktop { display: none !important; }
          .ds-summary-mobile-drawer { display: block !important; }
        }
      `}</style>
    </>
  );
};

