import React from 'react';
import { ChevronUp, ChevronDown, Shield, X, CheckCircle2 } from 'lucide-react';
import { useWorkflow } from '../../core/state/WorkflowContext';

export const MobileSummaryDrawer: React.FC = () => {
  const { coverage, quote, isMobileSummaryOpen, toggleMobileSummary, setMobileSummaryOpen } = useWorkflow();

  const total = quote ? (quote.totalPayable ?? 0).toFixed(2) : '0.00';
  const gross = quote ? (quote.grossBasePremium ?? 0).toFixed(2) : '0.00';
  const addonsTotal = quote ? (quote.addonsTotal ?? 0).toFixed(2) : '0.00';
  const sst = quote ? (quote.sstAmount ?? 0).toFixed(2) : '0.00';

  const activeAddonsCount = Object.values(coverage.addons).filter((v) => v === true).length;

  return (
    <>
      {/* Backdrop overlay when drawer is open */}
      {isMobileSummaryOpen && (
        <div
          role="presentation"
          onClick={() => setMobileSummaryOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(19, 39, 102, 0.45)',
            backdropFilter: 'blur(2px)',
            zIndex: 45,
            transition: 'opacity 200ms ease',
          }}
        />
      )}

      {/* Floating Sticky Drawer Container */}
      <div
        className="ds-mobile-summary-wrapper"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid var(--ds-color-border-subtle)',
          boxShadow: '0 -4px 16px rgba(19, 39, 102, 0.12)',
        }}
      >
        {/* Expanded Sheet Content */}
        {isMobileSummaryOpen && (
          <div
            id="mobile-summary-expanded"
            style={{
              padding: '20px 20px 12px',
              maxHeight: '65vh',
              overflowY: 'auto',
              borderBottom: '1px solid var(--ds-color-border-subtle)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={20} color="var(--ds-primitive-color-teal-700)" aria-hidden="true" />
                <h3
                  style={{
                    fontFamily: 'var(--ds-primitive-font-heading)',
                    fontSize: 'var(--ds-primitive-font-size-base)',
                    fontWeight: 500,
                    margin: 0,
                    color: 'var(--ds-color-text-heading)',
                  }}
                >
                  Quotation Details
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setMobileSummaryOpen(false)}
                aria-label="Close summary details"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--ds-color-text-muted)',
                  cursor: 'pointer',
                  padding: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '44px',
                  minWidth: '44px',
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Parameter summary */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--ds-color-text-muted)' }}>Specialty:</span>
                <span style={{ fontWeight: 600 }}>{coverage.classificationName}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--ds-color-text-muted)' }}>Limit of Liability:</span>
                <span style={{ fontWeight: 600, color: 'var(--ds-primitive-color-teal-800)' }}>
                  {coverage.limitFormatted}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--ds-color-text-muted)' }}>Policy Term:</span>
                <span>12 Months (Annual)</span>
              </div>
              {activeAddonsCount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--ds-color-text-muted)' }}>Optional Add-ons:</span>
                  <span>{activeAddonsCount} Included</span>
                </div>
              )}
            </div>

            {/* Pricing breakdown */}
            <div
              style={{
                backgroundColor: 'var(--ds-primitive-color-navy-50)',
                padding: '12px 14px',
                borderRadius: 'var(--ds-primitive-radius-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                fontSize: '13px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ds-color-text-secondary)' }}>
                <span>Gross Base Premium:</span>
                <span style={{ fontFamily: 'var(--ds-primitive-font-mono)' }}>RM {gross}</span>
              </div>
              {quote && quote.discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ds-primitive-color-emerald-700)' }}>
                  <span>Affinity Discount:</span>
                  <span style={{ fontFamily: 'var(--ds-primitive-font-mono)' }}>-RM {quote.discountAmount.toFixed(2)}</span>
                </div>
              )}
              {quote && (quote.clinicPremium ?? 0) > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ds-color-text-secondary)' }}>
                  <span>Clinic Entity Facility:</span>
                  <span style={{ fontFamily: 'var(--ds-primitive-font-mono)' }}>+RM {(quote.clinicPremium ?? 0).toFixed(2)}</span>
                </div>
              )}
              {quote && (quote.picPremium ?? 0) > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ds-color-text-secondary)' }}>
                  <span>Person-In-Charge:</span>
                  <span style={{ fontFamily: 'var(--ds-primitive-font-mono)' }}>+RM {(quote.picPremium ?? 0).toFixed(2)}</span>
                </div>
              )}
              {Number(addonsTotal) > 0 && !quote?.clinicPremium && !quote?.picPremium && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ds-color-text-secondary)' }}>
                  <span>Add-on Protections:</span>
                  <span style={{ fontFamily: 'var(--ds-primitive-font-mono)' }}>+RM {addonsTotal}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ds-color-text-secondary)' }}>
                <span>SST (8%):</span>
                <span style={{ fontFamily: 'var(--ds-primitive-font-mono)' }}>RM {sst}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ds-color-text-secondary)' }}>
                <span>Stamp Duty:</span>
                <span style={{ fontFamily: 'var(--ds-primitive-font-mono)' }}>RM 10.00</span>
              </div>
            </div>
          </div>
        )}

        {/* Compact Persistent Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 14px',
            minHeight: '60px',
            gap: '8px',
          }}
        >
          <div>
            <div style={{ fontSize: '10px', color: 'var(--ds-color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
              Total (Incl. Tax & Stamp)
            </div>
            <div
              style={{
                fontFamily: 'var(--ds-primitive-font-mono)',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--ds-primitive-color-navy-900)',
                lineHeight: 1.2,
              }}
            >
              RM {total}
            </div>
          </div>

          <button
            type="button"
            onClick={toggleMobileSummary}
            aria-expanded={isMobileSummaryOpen}
            aria-controls="mobile-summary-expanded"
            aria-label={isMobileSummaryOpen ? 'Collapse Quotation Summary' : 'Expand Quotation Summary'}
            style={{
              minHeight: '44px',
              padding: '0 14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              borderRadius: 'var(--ds-primitive-radius-md)',
              border: '1px solid var(--ds-color-border-default)',
              backgroundColor: '#FFFFFF',
              color: 'var(--ds-color-text-primary)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: 'var(--ds-primitive-shadow-sm)',
              flexShrink: 0,
            }}
          >
            <span>{isMobileSummaryOpen ? 'Hide' : 'Breakdown'}</span>
            {isMobileSummaryOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .ds-mobile-summary-wrapper {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
