import React from 'react';
import { Shield, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useWorkflow } from '../../core/state/WorkflowContext';

export interface SummarySidebarProps {
  className?: string;
}

export const SummarySidebar: React.FC<SummarySidebarProps> = ({ className = '' }) => {
  const { coverage, quote, isQuoteStale, currentStage } = useWorkflow();

  const total = quote ? (quote.totalPayable ?? 0).toFixed(2) : '0.00';
  const gross = quote ? (quote.grossBasePremium ?? 0).toFixed(2) : '0.00';
  const addonsTotal = quote ? (quote.addonsTotal ?? 0).toFixed(2) : '0.00';
  const sst = quote ? (quote.sstAmount ?? 0).toFixed(2) : '0.00';

  const activeAddonsCount = Object.values(coverage.addons).filter((v) => v === true).length;

  return (
    <aside
      className={`ds-summary-sidebar ${className}`}
      aria-label="Quotation and Coverage Summary"
      style={{
        position: 'sticky',
        top: '90px',
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--ds-color-border-subtle)',
        borderRadius: 'var(--ds-primitive-radius-xl)',
        padding: 'var(--ds-primitive-space-6)',
        boxShadow: 'var(--ds-primitive-shadow-md)',
      }}
    >
      {/* Sidebar Header & Status Badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'var(--ds-primitive-space-4)',
          paddingBottom: 'var(--ds-primitive-space-3)',
          borderBottom: '1px solid var(--ds-color-border-subtle)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Shield size={22} color="var(--ds-primitive-color-teal-700)" aria-hidden="true" />
          <h2
            style={{
              fontFamily: 'var(--ds-primitive-font-heading)',
              fontSize: 'var(--ds-primitive-font-size-lg)',
              fontWeight: 500,
              color: 'var(--ds-color-text-heading)',
              margin: 0,
            }}
          >
            Quotation Overview
          </h2>
        </div>

        {/* Dynamic Status Pill */}
        {isQuoteStale ? (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              fontWeight: 600,
              padding: '3px 8px',
              borderRadius: '999px',
              backgroundColor: 'var(--ds-primitive-color-amber-50)',
              color: 'var(--ds-primitive-color-amber-800)',
              border: '1px solid var(--ds-primitive-color-amber-500)',
            }}
          >
            <AlertCircle size={12} />
            <span>Update Needed</span>
          </span>
        ) : (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              fontWeight: 600,
              padding: '3px 8px',
              borderRadius: '999px',
              backgroundColor: currentStage === 1
                ? 'var(--ds-primitive-color-sky-50)'
                : 'var(--ds-primitive-color-emerald-50)',
              color: currentStage === 1
                ? 'var(--ds-primitive-color-sky-700)'
                : 'var(--ds-primitive-color-emerald-700)',
              border: `1px solid ${
                currentStage === 1
                  ? 'var(--ds-primitive-color-sky-500)'
                  : 'var(--ds-primitive-color-emerald-500)'
              }`,
            }}
          >
            {currentStage === 1 ? (
              <span>Indicative</span>
            ) : (
              <>
                <Clock size={12} />
                <span>15:00 Price Lock</span>
              </>
            )}
          </span>
        )}
      </div>

      {/* Coverage Parameters Section */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          fontSize: 'var(--ds-primitive-font-size-sm)',
          marginBottom: 'var(--ds-primitive-space-5)',
        }}
      >
        <div>
          <div
            style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              color: 'var(--ds-color-text-muted)',
              marginBottom: '2px',
            }}
          >
            Practitioner Classification
          </div>
          <div style={{ fontWeight: 600, color: 'var(--ds-color-text-primary)' }}>
            {coverage.classificationName}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--ds-color-text-secondary)', marginTop: '1px' }}>
            {coverage.specialties.map((s) => `${s.specialtyName} (${s.percentage}%)`).join(', ')}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div>
            <div
              style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: 'var(--ds-color-text-muted)',
                marginBottom: '2px',
              }}
            >
              Indemnity Limit
            </div>
            <div style={{ fontWeight: 600, color: 'var(--ds-primitive-color-teal-800)' }}>
              {coverage.limitFormatted}
            </div>
          </div>

          <div>
            <div
              style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: 'var(--ds-color-text-muted)',
                marginBottom: '2px',
              }}
            >
              Policy Term
            </div>
            <div style={{ color: 'var(--ds-color-text-secondary)' }}>
              12 Months (Annual)
            </div>
          </div>
        </div>

        {/* Selected Add-ons Badge Row */}
        {activeAddonsCount > 0 && (
          <div>
            <div
              style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: 'var(--ds-color-text-muted)',
                marginBottom: '4px',
              }}
            >
              Optional Add-on Protections ({activeAddonsCount})
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {coverage.addons.clinicPackage && (
                <span
                  style={{
                    fontSize: '11px',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    backgroundColor: 'var(--ds-primitive-color-teal-50)',
                    color: 'var(--ds-primitive-color-teal-800)',
                    border: '1px solid var(--ds-primitive-color-teal-200)',
                  }}
                >
                  Clinic Facility
                </span>
              )}
              {coverage.addons.locumCover && (
                <span
                  style={{
                    fontSize: '11px',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    backgroundColor: 'var(--ds-primitive-color-teal-50)',
                    color: 'var(--ds-primitive-color-teal-800)',
                    border: '1px solid var(--ds-primitive-color-teal-200)',
                  }}
                >
                  Locum Doctor
                </span>
              )}
              {coverage.addons.personInCharge && (
                <span
                  style={{
                    fontSize: '11px',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    backgroundColor: 'var(--ds-primitive-color-teal-50)',
                    color: 'var(--ds-primitive-color-teal-800)',
                    border: '1px solid var(--ds-primitive-color-teal-200)',
                  }}
                >
                  Person-In-Charge
                </span>
              )}
              {coverage.addons.cyberLiability && (
                <span
                  style={{
                    fontSize: '11px',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    backgroundColor: 'var(--ds-primitive-color-teal-50)',
                    color: 'var(--ds-primitive-color-teal-800)',
                    border: '1px solid var(--ds-primitive-color-teal-200)',
                  }}
                >
                  Cyber Liability
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Premium Breakdown Box */}
      <div
        style={{
          padding: 'var(--ds-primitive-space-4)',
          backgroundColor: 'var(--ds-primitive-color-navy-50)',
          borderRadius: 'var(--ds-primitive-radius-md)',
          border: '1px solid var(--ds-color-border-subtle)',
          marginBottom: 'var(--ds-primitive-space-4)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px' }}>
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

          <div
            style={{
              borderTop: '1px dashed var(--ds-color-border-default)',
              paddingTop: '8px',
              marginTop: '4px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}
          >
            <span style={{ fontWeight: 600, color: 'var(--ds-primitive-color-navy-900)' }}>
              Total Payable:
            </span>
            <span
              style={{
                fontFamily: 'var(--ds-primitive-font-mono)',
                fontSize: '1.45rem',
                fontWeight: 600,
                color: 'var(--ds-primitive-color-navy-900)',
              }}
            >
              RM {total}
            </span>
          </div>
        </div>
      </div>

      {/* Trust Micro-Footnote */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '11px',
          color: 'var(--ds-color-text-muted)',
          lineHeight: 1.4,
        }}
      >
        <CheckCircle2 size={14} color="var(--ds-primitive-color-emerald-700)" aria-hidden="true" />
        <span>Complimentary Automatic Reinstatement included.</span>
      </div>
    </aside>
  );
};

