import React from 'react';
import { useWorkflow } from '../../core/state/WorkflowContext';
import { StepActionBar } from '../../components/layout/StepActionBar';
import { Clock, ShieldCheck, Building2, UserPlus, Laptop, Check } from 'lucide-react';

export const Stage2QuoteScaffold: React.FC = () => {
  const { coverage, quote, toggleAddon, nextStage, prevStage, isLoading } = useWorkflow();

  const addonsList = [
    {
      key: 'clinicPackage' as const,
      title: 'Clinic Entity Facility Cover',
      description: 'Extends vicarious liability protection to clinic staff, nurses, and administrative personnel.',
      rate: '+RM 350.00',
      icon: Building2,
    },
    {
      key: 'locumCover' as const,
      title: 'Locum Practitioner Extension',
      description: 'Comprehensive indemnity coverage for substitute locum doctors covering your practice.',
      rate: '+RM 120.00',
      icon: UserPlus,
    },
    {
      key: 'cyberLiability' as const,
      title: 'Medical Cyber & Data Protection',
      description: 'Coverage against medical records ransomware, patient data breaches, and PDPA defense costs.',
      rate: '+RM 200.00',
      icon: Laptop,
    },
  ];

  return (
    <div>
      {/* Stage Header */}
      <div style={{ marginBottom: '24px' }}>
        <div
          style={{
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: 'var(--ds-primitive-color-teal-700)',
            fontWeight: 600,
            marginBottom: '4px',
          }}
        >
          Stage 2 of 4: Quotation & Optional Protection
        </div>

        <h1
          style={{
            fontFamily: 'var(--ds-primitive-font-heading)',
            fontSize: '1.75rem',
            fontWeight: 500,
            color: 'var(--ds-color-text-heading)',
            margin: '0 0 8px 0',
            lineHeight: 1.25,
          }}
        >
          Your Indicative Chubb Indemnity Quote
        </h1>

        <p
          style={{
            fontSize: 'var(--ds-primitive-font-size-base)',
            color: 'var(--ds-color-text-secondary)',
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          Review your gross premium breakdown and enhance your policy with modular clinic facility and cyber extensions below.
        </p>
      </div>

      {/* Quote Price Lock Guarantee Banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px 20px',
          borderRadius: 'var(--ds-primitive-radius-lg)',
          backgroundColor: 'var(--ds-primitive-color-emerald-50)',
          border: '1px solid var(--ds-primitive-color-emerald-500)',
          marginBottom: '28px',
        }}
      >
        <Clock size={24} color="var(--ds-primitive-color-emerald-700)" />
        <div>
          <div style={{ fontWeight: 600, color: 'var(--ds-primitive-color-emerald-700)' }}>
            15-Minute Guaranteed Rate Lock Active
          </div>
          <div style={{ fontSize: '13px', color: 'var(--ds-color-text-secondary)' }}>
            Quote Token <code>{quote?.quoteToken}</code> guarantees this premium during checkout.
          </div>
        </div>
      </div>

      {/* Modular Optional Add-on Cards */}
      <div style={{ marginBottom: '32px' }}>
        <label
          style={{
            display: 'block',
            fontWeight: 600,
            fontSize: 'var(--ds-primitive-font-size-base)',
            color: 'var(--ds-color-text-heading)',
            marginBottom: '12px',
          }}
        >
          Optional Add-On Protections (Toggling dynamically recalculates the summary)
        </label>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {addonsList.map((addon) => {
            const isEnabled = coverage.addons[addon.key];
            const Icon = addon.icon;
            return (
              <div
                key={addon.key}
                onClick={() => toggleAddon(addon.key)}
                style={{
                  padding: '16px 20px',
                  borderRadius: 'var(--ds-primitive-radius-lg)',
                  border: isEnabled
                    ? '2px solid var(--ds-primitive-color-teal-700)'
                    : '1px solid var(--ds-color-border-default)',
                  backgroundColor: isEnabled
                    ? 'var(--ds-primitive-color-teal-50)'
                    : '#FFFFFF',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  transition: 'all 150ms ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      backgroundColor: isEnabled
                        ? 'var(--ds-primitive-color-teal-700)'
                        : 'var(--ds-primitive-color-slate-100)',
                      color: isEnabled ? '#FFFFFF' : 'var(--ds-color-text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={20} />
                  </div>

                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--ds-color-text-heading)' }}>
                      {addon.title}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--ds-color-text-secondary)', marginTop: '2px' }}>
                      {addon.description}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontFamily: 'var(--ds-primitive-font-mono)', fontWeight: 600, color: 'var(--ds-primitive-color-navy-900)' }}>
                    {addon.rate}
                  </div>
                  <div style={{ fontSize: '12px', color: isEnabled ? 'var(--ds-primitive-color-teal-700)' : 'var(--ds-color-text-muted)' }}>
                    {isEnabled ? 'Included' : 'Tap to Add'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Actions */}
      <StepActionBar
        primaryLabel="Proceed to Personal Details"
        onPrimaryClick={nextStage}
        secondaryLabel="Back to Coverage"
        onSecondaryClick={prevStage}
        isLoading={isLoading}
      />
    </div>
  );
};

