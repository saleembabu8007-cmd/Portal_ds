import React from 'react';
import { Shield, Clock, AlertCircle, CheckCircle2, FileCheck } from 'lucide-react';
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
  const isPreQuoteStage = currentStage === 1 && !quote;

  return (
    <aside
      className={`ds-summary-sidebar ${className}`}
      aria-label="Quotation and Coverage Summary"
      style={{
        position: 'sticky',
        top: '72px',
        backgroundColor: 'var(--ds-color-surface-card, #FFFFFF)',
        border: '1px solid var(--ds-color-border-subtle, #DFE6EC)',
        borderRadius: 'var(--ds-primitive-radius-xl, 10px)',
        padding: '24px',
        boxShadow: 'none',
      }}
    >
      {/* Sidebar Header & Status Badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px',
          paddingBottom: '12px',
          borderBottom: '1px solid var(--ds-color-border-subtle, #DFE6EC)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Shield size={18} color="var(--ds-color-brand-primary, #08A5B5)" aria-hidden="true" />
          <h2
            style={{
              fontFamily: 'var(--ds-primitive-font-heading, "Kanit", sans-serif)',
              fontSize: '1rem',
              fontWeight: 500,
              color: 'var(--ds-color-text-heading, #132766)',
              margin: 0,
            }}
          >
            {isPreQuoteStage ? 'Coverage Selection' : 'Quotation Overview'}
          </h2>
        </div>

        {/* Dynamic Status Pill */}
        {isPreQuoteStage ? (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              fontWeight: 600,
              padding: '2px 8px',
              borderRadius: '999px',
              backgroundColor: 'var(--ds-primitive-color-slate-100, #F1F5F9)',
              color: 'var(--ds-color-text-secondary, #475569)',
              border: '1px solid var(--ds-color-border-subtle, #DFE6EC)',
            }}
          >
            Step 1 of 4
          </span>
        ) : isQuoteStale ? (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              fontWeight: 600,
              padding: '2px 8px',
              borderRadius: '999px',
              backgroundColor: 'var(--ds-primitive-color-feedback-amber-50, #FFFBEB)',
              color: 'var(--ds-color-text-warning, #92400E)',
              border: '1px solid var(--ds-primitive-color-feedback-amber-200, #FCD34D)',
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
              padding: '2px 8px',
              borderRadius: '999px',
              backgroundColor: 'var(--ds-color-surface-brand-tint, #F0FAFA)',
              color: 'var(--ds-color-text-link, #066F7B)',
              border: '1px solid var(--ds-primitive-color-teal-200, #AEE7EB)',
            }}
          >
            <Clock size={12} />
            <span>15:00 Price Lock</span>
          </span>
        )}
      </div>

      {/* Coverage Parameters Section */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          fontSize: '0.8125rem',
          marginBottom: '20px',
        }}
      >
        <div>
          <div
            style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              color: 'var(--ds-color-text-muted, #64748B)',
              marginBottom: '2px',
              fontWeight: 500,
            }}
          >
            Practitioner Classification
          </div>
          <div style={{ fontWeight: 600, color: 'var(--ds-color-text-primary, #17253B)' }}>
            {coverage.classificationName || 'General Medical Practitioner'}
          </div>
          {coverage.specialties && coverage.specialties.length > 0 && (
            <div style={{ fontSize: '12px', color: 'var(--ds-color-text-secondary, #475569)', marginTop: '1px' }}>
              {coverage.specialties.map((s) => `${s.specialtyName} (${s.percentage}%)`).join(', ')}
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div>
            <div
              style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: 'var(--ds-color-text-muted, #64748B)',
                marginBottom: '2px',
                fontWeight: 500,
              }}
            >
              Indemnity Limit
            </div>
            <div style={{ fontWeight: 600, color: 'var(--ds-color-brand-primary, #08A5B5)' }}>
              {coverage.limitFormatted || 'RM 1,000,000'}
            </div>
          </div>

          <div>
            <div
              style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: 'var(--ds-color-text-muted, #64748B)',
                marginBottom: '2px',
                fontWeight: 500,
              }}
            >
              Policy Term
            </div>
            <div style={{ color: 'var(--ds-color-text-secondary, #475569)' }}>
              Aligned to 31 Dec
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
                color: 'var(--ds-color-text-muted, #64748B)',
                marginBottom: '4px',
                fontWeight: 500,
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
                    backgroundColor: 'var(--ds-color-surface-brand-tint, #F0FAFA)',
                    color: 'var(--ds-color-text-link, #066F7B)',
                    border: '1px solid var(--ds-primitive-color-teal-200, #AEE7EB)',
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
                    backgroundColor: 'var(--ds-color-surface-brand-tint, #F0FAFA)',
                    color: 'var(--ds-color-text-link, #066F7B)',
                    border: '1px solid var(--ds-primitive-color-teal-200, #AEE7EB)',
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
                    backgroundColor: 'var(--ds-color-surface-brand-tint, #F0FAFA)',
                    color: 'var(--ds-color-text-link, #066F7B)',
                    border: '1px solid var(--ds-primitive-color-teal-200, #AEE7EB)',
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
                    backgroundColor: 'var(--ds-color-surface-brand-tint, #F0FAFA)',
                    color: 'var(--ds-color-text-link, #066F7B)',
                    border: '1px solid var(--ds-primitive-color-teal-200, #AEE7EB)',
                  }}
                >
                  Cyber Liability
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Pre-Quote vs Post-Quote Box */}
      {isPreQuoteStage ? (
        <div
          style={{
            padding: '16px',
            backgroundColor: 'var(--ds-primitive-color-slate-50, #F4F7F9)',
            borderRadius: '6px',
            border: '1px solid var(--ds-color-border-subtle, #DFE6EC)',
            marginBottom: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <FileCheck size={16} color="var(--ds-color-brand-primary, #08A5B5)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '0.75rem', lineHeight: 1.5, color: 'var(--ds-color-text-secondary, #475569)' }}>
              Complete the required fields on the left and click <strong>Generate Quotation</strong> to compute your binding Chubb premium with applicable partner discounts.
            </div>
          </div>
        </div>
      ) : (
        /* Premium Breakdown Box */
        <div
          style={{
            padding: '16px',
            backgroundColor: 'var(--ds-primitive-color-slate-50, #F4F7F9)',
            borderRadius: '6px',
            border: '1px solid var(--ds-color-border-subtle, #DFE6EC)',
            marginBottom: '16px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ds-color-text-secondary, #475569)' }}>
              <span>Gross Base Premium:</span>
              <span style={{ fontFamily: 'var(--ds-primitive-font-mono, monospace)', fontVariantNumeric: 'tabular-nums' }}>RM {gross}</span>
            </div>

            {quote && (quote.discountAmount ?? 0) > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ds-color-text-success, #065F46)' }}>
                <span>Affinity Discount:</span>
                <span style={{ fontFamily: 'var(--ds-primitive-font-mono, monospace)', fontVariantNumeric: 'tabular-nums' }}>-RM {(quote.discountAmount ?? 0).toFixed(2)}</span>
              </div>
            )}

            {quote && (quote.clinicPremium ?? 0) > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ds-color-text-secondary, #475569)' }}>
                <span>Clinic Entity Facility:</span>
                <span style={{ fontFamily: 'var(--ds-primitive-font-mono, monospace)', fontVariantNumeric: 'tabular-nums' }}>+RM {(quote.clinicPremium ?? 0).toFixed(2)}</span>
              </div>
            )}

            {quote && (quote.picPremium ?? 0) > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ds-color-text-secondary, #475569)' }}>
                <span>Person-In-Charge:</span>
                <span style={{ fontFamily: 'var(--ds-primitive-font-mono, monospace)', fontVariantNumeric: 'tabular-nums' }}>+RM {(quote.picPremium ?? 0).toFixed(2)}</span>
              </div>
            )}

            {Number(addonsTotal) > 0 && !quote?.clinicPremium && !quote?.picPremium && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ds-color-text-secondary, #475569)' }}>
                <span>Add-on Protections:</span>
                <span style={{ fontFamily: 'var(--ds-primitive-font-mono, monospace)', fontVariantNumeric: 'tabular-nums' }}>+RM {addonsTotal}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ds-color-text-secondary, #475569)' }}>
              <span>SST (8%):</span>
              <span style={{ fontFamily: 'var(--ds-primitive-font-mono, monospace)', fontVariantNumeric: 'tabular-nums' }}>RM {sst}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ds-color-text-secondary, #475569)' }}>
              <span>Stamp Duty:</span>
              <span style={{ fontFamily: 'var(--ds-primitive-font-mono, monospace)', fontVariantNumeric: 'tabular-nums' }}>RM 10.00</span>
            </div>

            <div
              style={{
                borderTop: '1px dashed var(--ds-color-border-default, #CBD5E1)',
                paddingTop: '8px',
                marginTop: '4px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}
            >
              <span style={{ fontWeight: 600, color: 'var(--ds-color-text-heading, #132766)' }}>
                Total Payable:
              </span>
              <span
                style={{
                  fontFamily: 'var(--ds-primitive-font-heading, "Kanit", sans-serif)',
                  fontSize: '1.35rem',
                  fontWeight: 500,
                  color: 'var(--ds-color-text-heading, #132766)',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                RM {total}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Trust Micro-Footnote */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '11px',
          color: 'var(--ds-color-text-muted, #64748B)',
          lineHeight: 1.4,
        }}
      >
        <CheckCircle2 size={14} color="var(--ds-primitive-color-feedback-emerald-700, #047857)" aria-hidden="true" />
        <span>Complimentary Automatic Reinstatement included.</span>
      </div>
    </aside>
  );
};
