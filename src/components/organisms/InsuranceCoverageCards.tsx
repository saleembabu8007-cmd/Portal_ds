import React from 'react';
import { Check, Info, HelpCircle } from 'lucide-react';
import { Badge } from '../ui/FieldFeedback';
import { AccessibleDisclosureTrigger } from '../form/AccessibleDisclosureTrigger';
import { TwoOptionSegmentedChoice } from '../form/ChoiceSelectors';
import { CompactCurrencyDisplay } from '../form/CurrencyAndPriceDisplay';

/* ========================================================================
   6. LIABILITY LIMIT SELECTION ORGANISM
   ======================================================================== */
export interface LiabilityTierItem {
  id: string;
  limitAmount: number;
  limitFormatted: string;
  indicativeAnnualRate: number;
  isRecommended?: boolean;
  recommendationTag?: string;
}

export interface LiabilityLimitSelectionProps {
  id?: string;
  tiers?: LiabilityTierItem[];
  selectedTierId: string;
  onChange: (tierId: string) => void;
  disabled?: boolean;
}

export const DEFAULT_DOCTORSHIELD_TIERS: LiabilityTierItem[] = [
  { id: '500k', limitAmount: 500000, limitFormatted: 'RM 500,000', indicativeAnnualRate: 400.0 },
  { id: '1m', limitAmount: 1000000, limitFormatted: 'RM 1,000,000', indicativeAnnualRate: 650.0, isRecommended: true, recommendationTag: 'Recommended' },
  { id: '2m', limitAmount: 2000000, limitFormatted: 'RM 2,000,000', indicativeAnnualRate: 1100.0 },
  { id: '5m', limitAmount: 5000000, limitFormatted: 'RM 5,000,000', indicativeAnnualRate: 2400.0 },
];

/**
 * DoctorShield Liability-Limit Selection Organism
 * Standard 48px tile row/grid. Selected state uses a precise 2px #08A5B5 border outline
 * and subtle tint without neon or gradient bloat.
 */
export const LiabilityLimitSelection: React.FC<LiabilityLimitSelectionProps> = ({
  id = 'liability_limit_selection',
  tiers = DEFAULT_DOCTORSHIELD_TIERS,
  selectedTierId,
  onChange,
  disabled = false,
}) => {
  return (
    <div
      role="radiogroup"
      aria-label="Select Limit of Liability"
      id={id}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '12px',
        marginBottom: '24px',
      }}
    >
      {tiers.map((tier) => {
        const isSelected = selectedTierId === tier.id;
        return (
          <button
            key={tier.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            disabled={disabled}
            onClick={() => onChange(tier.id)}
            style={{
              minHeight: '76px',
              padding: '12px 16px',
              borderRadius: 'var(--ds-comp-input-radius)',
              border: isSelected
                ? '2px solid var(--ds-color-brand-primary)'
                : '1px solid var(--ds-color-border-subtle)',
              backgroundColor: isSelected
                ? 'var(--ds-primitive-color-teal-50)'
                : 'var(--ds-color-surface-base)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              cursor: disabled ? 'not-allowed' : 'pointer',
              textAlign: 'left',
              transition: 'all var(--ds-primitive-duration-fast) var(--ds-primitive-ease-default)',
              boxSizing: 'border-box',
              outline: 'none',
              boxShadow: isSelected ? 'var(--ds-primitive-shadow-xs)' : 'none',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <span
                style={{
                  fontFamily: 'var(--ds-primitive-font-heading)',
                  fontSize: '15px',
                  fontWeight: 500,
                  color: 'var(--ds-color-text-primary)',
                }}
              >
                {tier.limitFormatted}
              </span>
              {tier.isRecommended && (
                <Badge variant="teal">{tier.recommendationTag || 'Recommended'}</Badge>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px', marginTop: '6px' }}>
              <span
                style={{
                  fontFamily: 'var(--ds-primitive-font-mono)',
                  fontSize: '12px',
                  color: 'var(--ds-color-text-secondary)',
                }}
              >
                RM {tier.indicativeAnnualRate.toFixed(2)}
              </span>
              <span
                style={{
                  fontSize: '11px',
                  color: 'var(--ds-color-text-tertiary)',
                }}
              >
                / year
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

/* ========================================================================
   8. ADD-ON COVERAGE CARD ORGANISM
   ======================================================================== */
export interface AddOnCoverageCardProps {
  id: string;
  name: string;
  annualPremium: number;
  isComplimentary?: boolean;
  description: string;
  statutoryDetail?: string;
  selected: boolean;
  onToggle: (selected: boolean) => void;
  disabled?: boolean;
  ineligibleReason?: string;
  className?: string;
}

/**
 * DoctorShield Selectable Add-On Coverage Card Organism
 * Minimal, restrained, and clearly distinct from ordinary form fields.
 * No oversized colored backgrounds, clip-art illustrations, or promotional badge clutter.
 */
export const AddOnCoverageCard: React.FC<AddOnCoverageCardProps> = ({
  id,
  name,
  annualPremium,
  isComplimentary = false,
  description,
  statutoryDetail,
  selected,
  onToggle,
  disabled = false,
  ineligibleReason,
  className = '',
}) => {
  const isBlocked = disabled || !!ineligibleReason;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === ' ' || e.key === 'Enter') && !isBlocked) {
      e.preventDefault();
      onToggle(!selected);
    }
  };

  return (
    <div
      className={`ds-addon-card ${className}`}
      style={{
        padding: '16px 20px',
        backgroundColor: selected ? '#FFFFFF' : 'var(--ds-color-surface-base)',
        border: selected
          ? '2px solid var(--ds-color-brand-primary)'
          : '1px solid var(--ds-color-border-subtle)',
        borderRadius: 'var(--ds-comp-panel-radius)',
        marginBottom: '14px',
        transition: 'all var(--ds-primitive-duration-fast) var(--ds-primitive-ease-default)',
        opacity: isBlocked ? 0.6 : 1,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
        {/* Checkbox Trigger & Title Lockup */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1 }}>
          <div
            role="checkbox"
            id={id}
            aria-checked={selected}
            aria-disabled={isBlocked}
            tabIndex={isBlocked ? -1 : 0}
            onClick={() => !isBlocked && onToggle(!selected)}
            onKeyDown={handleKeyDown}
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '4px',
              border: `2px solid ${
                selected ? 'var(--ds-primitive-color-teal-800)' : 'var(--ds-color-border-default)'
              }`,
              backgroundColor: selected ? 'var(--ds-primitive-color-teal-800)' : 'var(--ds-color-surface-base)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isBlocked ? 'not-allowed' : 'pointer',
              flexShrink: 0,
              marginTop: '2px',
              outline: 'none',
              transition: 'all var(--ds-primitive-duration-fast) var(--ds-primitive-ease-default)',
            }}
          >
            {selected && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontFamily: 'var(--ds-primitive-font-body)',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--ds-color-text-primary)',
                }}
              >
                {name}
              </span>
              {isComplimentary && (
                <Badge variant="teal">Complimentary</Badge>
              )}
            </div>

            <p
              style={{
                fontFamily: 'var(--ds-primitive-font-body)',
                fontSize: '13px',
                color: 'var(--ds-color-text-secondary)',
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {description}
            </p>

            {statutoryDetail && (
              <AccessibleDisclosureTrigger
                id={`${id}_terms`}
                triggerLabel="Coverage Scope & Policy Wording"
                icon="info"
              >
                {statutoryDetail}
              </AccessibleDisclosureTrigger>
            )}

            {ineligibleReason && (
              <div
                style={{
                  marginTop: '8px',
                  fontSize: '12px',
                  color: 'var(--ds-color-text-tertiary)',
                  fontStyle: 'italic',
                }}
              >
                Note: {ineligibleReason}
              </div>
            )}
          </div>
        </div>

        {/* Pricing Readout */}
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          {isComplimentary ? (
            <span
              style={{
                fontFamily: 'var(--ds-primitive-font-mono)',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--ds-primitive-color-emerald-700)',
              }}
            >
              RM 0.00
            </span>
          ) : (
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
              <span
                style={{
                  fontFamily: 'var(--ds-primitive-font-mono)',
                  fontSize: '11px',
                  color: 'var(--ds-color-text-secondary)',
                }}
              >
                +
              </span>
              <CompactCurrencyDisplay amount={annualPremium} size="md" color="navy" />
              <span style={{ fontSize: '11px', color: 'var(--ds-color-text-tertiary)' }}>/yr</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ========================================================================
   9. CLINIC AND PIC COVERAGE GROUPING ORGANISM
   ======================================================================== */
export interface ClinicAndPicCoverageGroupProps {
  ownsClinic: boolean;
  onOwnsClinicToggle: (owns: boolean) => void;
  entityType: string; // 'sole' | 'partner'
  onEntityTypeChange: (type: string) => void;
  entityCoverSelected: boolean;
  onEntityCoverToggle: (selected: boolean) => void;
  picCoverSelected: boolean;
  onPicCoverToggle: (selected: boolean) => void;
  className?: string;
}

/**
 * DoctorShield Clinic and PIC Coverage Grouping Organism
 * Unifies healthcare facility ownership questionnaire, legal entity structure,
 * entity indemnity card, and Person-In-Charge coverage with automatic sole prop fee waiver.
 */
export const ClinicAndPicCoverageGroup: React.FC<ClinicAndPicCoverageGroupProps> = ({
  ownsClinic,
  onOwnsClinicToggle,
  entityType,
  onEntityTypeChange,
  entityCoverSelected,
  onEntityCoverToggle,
  picCoverSelected,
  onPicCoverToggle,
  className = '',
}) => {
  const isSoleProp = entityType === 'sole';

  return (
    <div className={`ds-clinic-pic-group ${className}`} style={{ marginBottom: '28px' }}>
      {/* 1. Ownership Toggle */}
      <div
        style={{
          padding: '16px 20px',
          backgroundColor: 'var(--ds-color-surface-subtle)',
          borderRadius: 'var(--ds-comp-panel-radius)',
          border: '1px solid var(--ds-color-border-subtle)',
          marginBottom: '16px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <div>
          <span
            style={{
              fontFamily: 'var(--ds-primitive-font-body)',
              fontSize: '15px',
              fontWeight: 600,
              color: 'var(--ds-color-text-primary)',
              display: 'block',
            }}
          >
            Do you own, operate, or partner in a private healthcare clinic practice?
          </span>
          <span
            style={{
              fontSize: '13px',
              color: 'var(--ds-color-text-secondary)',
              marginTop: '2px',
              display: 'block',
            }}
          >
            Enables optional Healthcare Facility Entity and Person-In-Charge vicarious liability extensions.
          </span>
        </div>

        <div
          role="radiogroup"
          aria-label="Clinic practice ownership"
          style={{
            display: 'inline-flex',
            backgroundColor: 'var(--ds-color-surface-base)',
            padding: '3px',
            borderRadius: '6px',
            border: '1px solid var(--ds-color-border-subtle)',
            gap: '2px',
          }}
        >
          <button
            type="button"
            role="radio"
            aria-checked={ownsClinic}
            onClick={() => onOwnsClinicToggle(true)}
            style={{
              minWidth: '56px',
              height: '34px',
              borderRadius: '4px',
              border: ownsClinic ? '1px solid var(--ds-color-brand-primary)' : '1px solid transparent',
              backgroundColor: ownsClinic ? 'var(--ds-primitive-color-teal-50)' : 'transparent',
              color: ownsClinic ? 'var(--ds-color-brand-secondary)' : 'var(--ds-color-text-secondary)',
              fontWeight: ownsClinic ? 600 : 400,
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            Yes
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={!ownsClinic}
            onClick={() => onOwnsClinicToggle(false)}
            style={{
              minWidth: '56px',
              height: '34px',
              borderRadius: '4px',
              border: !ownsClinic ? '1px solid var(--ds-color-brand-primary)' : '1px solid transparent',
              backgroundColor: !ownsClinic ? 'var(--ds-primitive-color-teal-50)' : 'transparent',
              color: !ownsClinic ? 'var(--ds-color-brand-secondary)' : 'var(--ds-color-text-secondary)',
              fontWeight: !ownsClinic ? 600 : 400,
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            No
          </button>
        </div>
      </div>

      {/* 2. Disclosed Clinic Coverage Configuration */}
      {ownsClinic && (
        <div style={{ paddingLeft: '16px', borderLeft: '2px solid var(--ds-color-brand-primary)' }}>
          {/* Legal Structure Selector */}
          <div style={{ maxWidth: '480px', marginBottom: '20px' }}>
            <TwoOptionSegmentedChoice
              id="clinic_entity_choice"
              label="Clinic Legal Structure"
              options={[
                { value: 'sole', label: 'Sole Proprietor', description: 'Single owner · Free PIC cover' },
                { value: 'partner', label: 'Partnership / Sdn Bhd', description: 'Multi-partner / Incorporated' },
              ]}
              value={entityType}
              onChange={onEntityTypeChange}
            />
          </div>

          {/* Add-on 1: Entity Cover Card */}
          <AddOnCoverageCard
            id="addon_entity_cover"
            name="Healthcare Facility Entity Indemnity"
            annualPremium={200.0}
            selected={entityCoverSelected}
            onToggle={onEntityCoverToggle}
            description="Extends indemnity protection to your clinic entity against vicarious liability arising from healthcare services provided at the registered premises."
            statutoryDetail="Covers legal liability of the facility establishment for damages awarded in civil medical malpractice suits brought against clinical employees, nurses, and locums."
          />

          {/* Add-on 2: PIC Cover Card */}
          <AddOnCoverageCard
            id="addon_pic_cover"
            name="Person-In-Charge (PIC) Professional Indemnity"
            annualPremium={isSoleProp ? 0 : 100.0}
            isComplimentary={isSoleProp}
            selected={picCoverSelected}
            onToggle={onPicCoverToggle}
            description="Statutory defense and indemnity cover for the registered Person-In-Charge under the Private Healthcare Facilities and Services Act 1998 (PHFSA)."
            statutoryDetail="Indemnifies designated PICs against legal costs incurred defending statutory inquiries, compliance orders, or regulatory sanctions initiated by the Ministry of Health Malaysia (MOH)."
          />
        </div>
      )}
    </div>
  );
};

