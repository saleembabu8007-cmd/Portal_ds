import React, { useState, useEffect, useId } from 'react';
import {
  Calendar,
  Mail,
  AlertCircle,
  Info,
  ArrowRight,
  Sliders,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useWorkflow } from '../../core/state/WorkflowContext';
import {
  APPROVED_CLASSIFICATIONS,
  ALL_LIABILITY_TIERS,
  ClassificationOption,
  LiabilityLimitOption,
} from '../../core/data/classifications';
import { RatingService, CalculatePremiumRequest } from '../../core/api/ratingService';
import {
  BackdateAgreementModal,
  PeriodEndDateModal,
  SpecializationModal,
} from './CoverageModals';
import { QuoteBreakdown } from '../../core/state/types';
import { Button } from '../../components/ui/Button';
import { TextInput } from '../../components/ui/TextInput';
import { Checkbox } from '../../components/ui/SelectionControls';
import { LabeledSelect } from '../../components/form/LabeledSelect';
import { LiabilityLimitSelector } from '../../components/insurance/LiabilityLimitSelector';
import { FieldGroup } from '../../components/form/FieldGroup';
import { PromoCodeField } from '../../components/form/PromoCodeField';

export const Stage1CoverageForm: React.FC = () => {
  const {
    coverage,
    updateCoverage,
    doctorProfile,
    updateDoctorProfile,
    setQuote,
    goToStage,
    announce,
  } = useWorkflow();

  // Accessibility element IDs
  const classSelectId = useId();
  const startDateId = useId();
  const endDateId = useId();
  const emailInputId = useId();
  const promoInputId = useId();
  const termsCheckboxId = useId();

  // Local state initialized from persistent workflow state
  const [selectedClassId, setSelectedClassId] = useState<string>(
    coverage.classificationId || '7'
  );
  const [selectedTierId, setSelectedTierId] = useState<string>(
    coverage.limitOfLiability || '1m'
  );
  const [startDate, setStartDate] = useState<string>(
    coverage.startDate || new Date().toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState<string>(
    coverage.endDate || `${new Date().getFullYear()}-12-31`
  );
  const [customerEmail, setCustomerEmail] = useState<string>(
    coverage.customerEmail || doctorProfile.email || ''
  );
  const [promoCodeInput, setPromoCodeInput] = useState<string>(
    coverage.promoCode || ''
  );
  const [promoDiscount, setPromoDiscount] = useState<number>(
    coverage.promoDiscount || 0
  );
  const [promoAssociation, setPromoAssociation] = useState<string>(
    coverage.promoAssociation || ''
  );
  const [termsAccepted, setTermsAccepted] = useState<boolean>(
    coverage.termsAccepted || false
  );
  const [clause612Accepted, setClause612Accepted] = useState<boolean>(
    coverage.clause612Accepted || false
  );

  // Specialization allocation state
  const [specialties, setSpecialties] = useState(
    coverage.specialties && coverage.specialties.length > 0
      ? coverage.specialties
      : [
          {
            specialtyId: 'gmp',
            specialtyName: 'General Medical Practice',
            percentage: 100,
          },
        ]
  );

  // Modal toggles
  const [isBackdateModalOpen, setIsBackdateModalOpen] = useState(false);
  const [pendingBackdate, setPendingBackdate] = useState('');
  const [isPeriodInfoModalOpen, setIsPeriodInfoModalOpen] = useState(false);
  const [isSpecialtyModalOpen, setIsSpecialtyModalOpen] = useState(false);

  // Validation and submission states
  const [isCheckingPromo, setIsCheckingPromo] = useState(false);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Active classification details
  const activeClassification: ClassificationOption | undefined =
    APPROVED_CLASSIFICATIONS.find((c) => c.id === selectedClassId) ||
    APPROVED_CLASSIFICATIONS[0];

  // Allowed liability tiers for selected classification
  const allowedTiers: LiabilityLimitOption[] = (
    activeClassification?.availableLiabilityTiers || ['1m', '2m']
  )
    .map((tierId) => ALL_LIABILITY_TIERS[tierId])
    .filter(Boolean);

  // Sync tier selection when classification changes
  useEffect(() => {
    if (activeClassification) {
      const isCurrentTierValid =
        activeClassification.availableLiabilityTiers.includes(selectedTierId);
      if (!isCurrentTierValid) {
        const fallbackTier =
          activeClassification.recommendedTier ||
          activeClassification.availableLiabilityTiers[0] ||
          '1m';
        setSelectedTierId(fallbackTier);
      }

      // Initialize default specialties if classification requires split
      if (
        activeClassification.requiresSpecialtySplit &&
        activeClassification.defaultSpecialties
      ) {
        setSpecialties(
          activeClassification.defaultSpecialties.map((ds) => ({
            specialtyId: ds.id,
            specialtyName: ds.name,
            percentage: ds.defaultPercentage,
          }))
        );
      }
    }
  }, [selectedClassId]);

  // Handle start date and APC co-termination
  const handleStartDateChange = (val: string) => {
    if (!val) return;

    const todayStr = new Date().toISOString().split('T')[0];
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 9);
    const maxDateStr = maxDate.toISOString().split('T')[0];

    // Clear start date error
    setErrors((prev) => {
      const next = { ...prev };
      delete next.startDate;
      return next;
    });

    if (val > maxDateStr) {
      setErrors((prev) => ({
        ...prev,
        startDate: 'Start date cannot exceed 9 months from today.',
      }));
      setStartDate(val);
      return;
    }

    if (val < todayStr) {
      // Intercept backdating with Clause 6.12 modal
      setPendingBackdate(val);
      setIsBackdateModalOpen(true);
      return;
    }

    // Normal forward date
    setStartDate(val);
    const startYear = new Date(val).getFullYear();
    setEndDate(`${startYear}-12-31`);
    setClause612Accepted(false);
  };

  const handleAgreeBackdate = () => {
    const currentYear = new Date().getFullYear();
    const mutatedDate = `${currentYear}-01-01`;
    setStartDate(mutatedDate);
    setEndDate(`${currentYear}-12-31`);
    setClause612Accepted(true);
    setIsBackdateModalOpen(false);
    setPendingBackdate('');
    announce(
      'Clause 6.12 Backdating Agreement acknowledged. Coverage start date set to 1st January.'
    );
  };

  const handleDisagreeBackdate = () => {
    setIsBackdateModalOpen(false);
    setPendingBackdate('');
    setClause612Accepted(false);
    const todayStr = new Date().toISOString().split('T')[0];
    setStartDate(todayStr);
    setEndDate(`${new Date().getFullYear()}-12-31`);
  };

  // Promo Code Clear Handler
  const handleClearPromoCode = () => {
    setPromoCodeInput('');
    setPromoDiscount(0);
    setPromoAssociation('');
    setPromoError(null);
    announce('Promo code removed.');
  };

  // Field validation and quotation calculation submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // 1. Classification check
    if (!selectedClassId) {
      newErrors.classification = 'Please select your practitioner classification.';
    }

    // 2. Specialty allocation check
    if (activeClassification?.requiresSpecialtySplit) {
      const totalAllocated = specialties.reduce(
        (sum, s) => sum + (Number(s.percentage) || 0),
        0
      );
      if (Math.abs(totalAllocated - 100.0) >= 0.01) {
        newErrors.specialties =
          'Specialization allocations must sum to exactly 100%. Please click "Allocate Specialization Percentages".';
      }
      const hasZeroOrLess = specialties.some((s) => s.percentage <= 0);
      if (hasZeroOrLess) {
        newErrors.specialties =
          'Every specialization percentage must be greater than 0%.';
      }
    }

    // 3. Liability tier check
    if (!selectedTierId) {
      newErrors.liability = 'Please select the limit of liability.';
    }

    // 4. Start date check
    if (!startDate) {
      newErrors.startDate = 'Please enter an insurance start date.';
    } else {
      const maxDate = new Date();
      maxDate.setMonth(maxDate.getMonth() + 9);
      const maxDateStr = maxDate.toISOString().split('T')[0];
      if (startDate > maxDateStr) {
        newErrors.startDate = 'Start date cannot exceed 9 months from today.';
      }
    }

    // 5. Email check (RFC 5322 regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customerEmail.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(customerEmail.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // 6. Regulatory Terms & Consent check
    if (!termsAccepted) {
      newErrors.terms =
        'You must agree to the terms and conditions and regulatory compliance to proceed.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstError = Object.values(newErrors)[0];
      announce(`Form validation error: ${firstError}`);
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    announce('Calculating authoritative quotation with Chubb underwriting gateway...');

    try {
      const selectedTierObj = ALL_LIABILITY_TIERS[selectedTierId];
      const requestPayload: CalculatePremiumRequest = {
        classification_id: selectedClassId,
        liability_id: selectedTierId,
        insurance_start_date: startDate,
        insurance_end_date: endDate,
        customer_email: customerEmail.trim(),
        promo_code: promoDiscount > 0 ? promoCodeInput.trim().toUpperCase() : undefined,
        specialties: activeClassification?.requiresSpecialtySplit ? specialties : undefined,
        clause_6_12_accepted: clause612Accepted,
      };

      const response = await RatingService.calculatePremium(requestPayload);

      if (response.success && response.pricing) {
        const quoteBreakdown: QuoteBreakdown = {
          grossBasePremium: response.pricing.gross_base,
          specialtyMultiplier: 1.0,
          addonsTotal: 0.0,
          discountAmount: response.pricing.discount_amount,
          netTaxablePremium: response.pricing.net_gross,
          sstAmount: response.pricing.sst_amount,
          stampDuty: response.pricing.stamp_duty,
          totalPayable: response.pricing.total_payable,
          quoteToken: response.quote_token,
          issuedAt: Date.now(),
          expiresAt: response.expires_at,
        };

        // Persist coverage in state
        updateCoverage({
          classificationId: selectedClassId,
          classificationName: activeClassification?.name || 'General Medical Practitioner',
          specialties: activeClassification?.requiresSpecialtySplit ? specialties : [],
          limitOfLiability: selectedTierId,
          limitFormatted: selectedTierObj?.label || 'RM 1,000,000',
          startDate: startDate,
          endDate: endDate,
          promoCode: promoDiscount > 0 ? promoCodeInput.trim().toUpperCase() : '',
          promoDiscount: promoDiscount,
          promoAssociation: promoAssociation,
          clause612Accepted: clause612Accepted,
          termsAccepted: true,
          customerEmail: customerEmail.trim(),
        });

        updateDoctorProfile({
          email: customerEmail.trim(),
        });

        setQuote(quoteBreakdown);
        announce(`Quotation generated. Total payable: RM ${quoteBreakdown.totalPayable.toFixed(2)}. Transitioning to quote review.`);
        goToStage(2);
      } else {
        setErrors({
          form: 'An error occurred while generating your quotation. Please try again.',
        });
        announce('Quotation calculation failed.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Calculation error occurred.';
      setErrors({ form: msg });
      announce(`Calculation error: ${msg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="ds-stage1-coverage-container" style={{ width: '100%' }}>
      {/* 1. Clear Page Heading (Approved Original Copy, Direction B Structured Header) */}
      <div
        className="ds-card"
        style={{
          marginBottom: '24px',
          borderTop: '3px solid var(--ds-color-brand-primary, #08A5B5)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '10px',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--ds-primitive-color-teal-100, #E0F7F9)',
              color: 'var(--ds-primitive-color-teal-700, #066F7B)',
              fontSize: '11px',
              fontWeight: 600,
              padding: '3px 10px',
              borderRadius: '12px',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            STEP 1 OF 4: ELIGIBILITY &amp; LIMIT
          </span>
          <span
            style={{
              fontFamily: 'var(--ds-primitive-font-mono, monospace)',
              fontSize: '11px',
              color: 'var(--ds-color-text-muted, #64748B)',
              backgroundColor: 'var(--ds-primitive-color-slate-100, #F1F5F9)',
              padding: '2px 8px',
              borderRadius: '4px',
            }}
          >
            Chubb Policy Form CI-MPI-2026
          </span>
        </div>

        <h1
          id="main-heading"
          style={{
            fontFamily: 'var(--ds-primitive-font-heading, "Kanit", sans-serif)',
            fontSize: 'clamp(20px, 4vw, 26px)',
            fontWeight: 500,
            color: 'var(--ds-color-navy-900, #132766)',
            margin: '0 0 6px 0',
            lineHeight: 1.25,
            letterSpacing: '-0.01em',
            wordBreak: 'break-word',
          }}
        >
          Select Your Professional Coverage
        </h1>
        <p
          style={{
            fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
            fontSize: '14px',
            color: 'var(--ds-color-text-secondary, #475569)',
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          Underwritten by Chubb Insurance Malaysia Berhad. Select your professional classification and liability limit below.
        </p>
      </div>

      {/* Global Form Error Alert */}
      {errors.form && (
        <div
          role="alert"
          style={{
            padding: '12px 16px',
            borderRadius: 'var(--ds-comp-input-radius, 6px)',
            backgroundColor: 'var(--ds-color-status-error-bg, #FEF2F2)',
            border: '1px solid var(--ds-color-status-error-border, #FCA5A5)',
            color: 'var(--ds-color-status-error, #B91C1C)',
            marginBottom: '24px',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <AlertCircle size={18} style={{ flexShrink: 0 }} />
          <span>{errors.form}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* ========================================================
            SECTION 1: Practitioner Classification (FLD-CALC-CLASS-001)
            ======================================================== */}
        <FieldGroup
          asCard
          title="1. Practitioner Classification (MMC / MDC)"
          description="Select your professional classification registered with the Malaysian Medical Council (MMC) or Malaysian Dental Council (MDC)."
        >
          <LabeledSelect
            id={classSelectId}
            label="Practitioner Classification"
            required
            value={selectedClassId}
            errorMessage={errors.classification}
            onChange={(e) => {
              setSelectedClassId(e.target.value);
              setErrors((prev) => {
                const next = { ...prev };
                delete next.classification;
                delete next.specialties;
                return next;
              });
            }}
          >
            <optgroup label="Primary Care & General Practice">
              {APPROVED_CLASSIFICATIONS.filter((c) => c.category === 'primary_care').map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </optgroup>

            <optgroup label="Surgical Specialties">
              {APPROVED_CLASSIFICATIONS.filter((c) => c.category === 'surgical').map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </optgroup>

            <optgroup label="Non-Surgical Specialties">
              {APPROVED_CLASSIFICATIONS.filter((c) => c.category === 'non_surgical').map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </optgroup>

            <optgroup label="Government Medical Officers & Dentists">
              {APPROVED_CLASSIFICATIONS.filter((c) => c.category === 'government').map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </optgroup>

            <optgroup label="Dental Practitioners">
              {APPROVED_CLASSIFICATIONS.filter((c) => c.category === 'dental').map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </optgroup>

            <optgroup label="Allied Health & Academic">
              {APPROVED_CLASSIFICATIONS.filter((c) => c.category === 'allied_other').map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </optgroup>
          </LabeledSelect>

          {/* Conditional Multi-Specialty Allocation Group (RULE-SPC-01) */}
          {activeClassification?.requiresSpecialtySplit ? (
            <div
              style={{
                marginTop: '16px',
                padding: '16px 18px',
                borderRadius: 'var(--ds-comp-input-radius, 6px)',
                backgroundColor: 'var(--ds-color-surface-brand-tint, #F0FAFA)',
                border: '1px solid var(--ds-primitive-color-teal-200, #AEE7EB)',
                borderLeft: '4px solid var(--ds-color-brand-primary, #08A5B5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div>
                <div
                  style={{
                    fontWeight: 500,
                    fontSize: '13px',
                    color: 'var(--ds-color-navy-900, #132766)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Sliders size={15} color="var(--ds-color-brand-primary, #08A5B5)" />
                  <span>Specialization Allocation Required (RULE-SPC-01)</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--ds-color-text-secondary, #475569)', marginTop: '4px' }}>
                  Current allocation:{' '}
                  <strong>{specialties.map((s) => `${s.percentage}% ${s.specialtyName}`).join(', ')}</strong>
                </div>
              </div>

              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => setIsSpecialtyModalOpen(true)}
              >
                Allocate Specialization Percentages
              </Button>
            </div>
          ) : (
            <div
              style={{
                marginTop: '14px',
                padding: '10px 14px',
                borderRadius: 'var(--ds-comp-input-radius, 6px)',
                backgroundColor: 'var(--ds-color-surface-subtle, #F8FAFC)',
                border: '1px solid var(--ds-color-border-subtle, #E2E8F0)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12px',
                color: 'var(--ds-color-text-secondary, #475569)',
              }}
            >
              <Info size={14} color="var(--ds-color-brand-primary, #08A5B5)" />
              <span>Approved Rating Category {activeClassification?.id}: {activeClassification?.name}</span>
            </div>
          )}

          {errors.specialties && (
            <div
              role="alert"
              style={{
                marginTop: '8px',
                fontSize: '13px',
                color: 'var(--ds-color-text-error, #EF4444)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <AlertCircle size={14} />
              <span>{errors.specialties}</span>
            </div>
          )}
        </FieldGroup>

        {/* ========================================================
            SECTION 2: Limit of Liability Selector (FLD-CALC-LIAB-002)
            ======================================================== */}
        <FieldGroup
          asCard
          title="2. Limit of Liability Options"
          description="Select indemnity protection ceiling. Tiers with the Recommended tag align with Chubb professional liability standards."
        >
          <LiabilityLimitSelector
            tiers={allowedTiers.map((tier) => ({
              id: tier.id,
              limitAmount: tier.amount,
              limitFormatted: tier.label,
              indicativeAnnualRate: tier.indicativeBaseAnnualRate,
              isRecommended: tier.id === activeClassification?.recommendedTier,
              recommendationTag: 'RECOMMENDED',
            }))}
            selectedTierId={selectedTierId}
            onChange={(tierId) => {
              setSelectedTierId(tierId);
              setErrors((prev) => {
                const next = { ...prev };
                delete next.liability;
                return next;
              });
            }}
            errorMessage={errors.liability}
          />

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              color: 'var(--ds-color-text-muted, #64748B)',
              marginTop: '12px',
            }}
          >
            <CheckCircle2 size={14} color="var(--ds-color-brand-primary, #08A5B5)" />
            <span>Includes automatic 100% reinstatement of indemnity limit for unrelated claims during the policy year.</span>
          </div>
        </FieldGroup>

        {/* ========================================================
            SECTION 3: Policy Period & Contact Details
            (FLD-CALC-DATE-START-003, FLD-CALC-DATE-END-004, FLD-CALC-EMAIL-005, FLD-CALC-PROMO-006)
            ======================================================== */}
        <FieldGroup
          asCard
          title="3. Policy Period & Contact Information"
          description="Indemnity coverage commences at 00:01 and co-terminates on 31 December to synchronize with MMC Annual Practicing Certificate renewals."
        >
          {/* Inception & Expiry Dual Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px',
              marginBottom: 'var(--ds-space-field-to-field, 20px)',
            }}
          >
            {/* Start Date */}
            <TextInput
              id={startDateId}
              label="Coverage Inception Date"
              required
              type="date"
              value={startDate}
              onChange={(e) => handleStartDateChange(e.target.value)}
              errorMessage={errors.startDate}
              leftAddon={<Calendar size={16} />}
              helperText="Coverage starts at 00:01 hours on the selected date."
            />

            {/* End Date (Auto-coterminated to 31/12) */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 'var(--ds-space-label-to-control, 6px)',
                }}
              >
                <label
                  htmlFor={endDateId}
                  style={{
                    fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
                    fontSize: 'var(--ds-font-field-label-size, 0.8125rem)',
                    fontWeight: 500,
                    color: 'var(--ds-color-text-label, #334155)',
                    margin: 0,
                  }}
                >
                  Coverage Expiry Date
                </label>

                <button
                  type="button"
                  onClick={() => setIsPeriodInfoModalOpen(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--ds-color-text-link, #066F7B)',
                    fontSize: '12px',
                    fontWeight: 500,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: 0,
                  }}
                >
                  <Info size={13} />
                  <span>Why 31st December?</span>
                </button>
              </div>

              <TextInput
                id={endDateId}
                type="text"
                readOnly
                value={endDate ? new Date(endDate).toLocaleDateString('en-GB') : '31/12/2026'}
                leftAddon={<Calendar size={16} />}
                style={{ backgroundColor: 'var(--ds-color-surface-subtle, #F8FAFC)', cursor: 'default' }}
                helperText="Co-terminates on 31 December for MMC APC synchronization."
              />
            </div>
          </div>

          {/* Customer Email */}
          <div style={{ marginBottom: 'var(--ds-space-field-to-field, 20px)' }}>
            <TextInput
              id={emailInputId}
              label="Practitioner Email Address"
              required
              type="email"
              inputMode="email"
              placeholder="doctor@example.com"
              value={customerEmail}
              onChange={(e) => {
                setCustomerEmail(e.target.value);
                setErrors((prev) => {
                  const next = { ...prev };
                  delete next.email;
                  return next;
                });
              }}
              errorMessage={errors.email}
              leftAddon={<Mail size={16} />}
              helperText="Quotation schedule, policy confirmation, and official tax invoices will be delivered to this address."
            />
          </div>

          {/* Promotional / Association Code */}
          <div style={{ maxWidth: '480px' }}>
            <PromoCodeField
              id={promoInputId}
              label="Promotional / Association Code"
              buttonText="Apply Code"
              value={promoCodeInput}
              onChange={(val) => {
                setPromoCodeInput(val);
                setPromoError(null);
              }}
              onApply={async (code) => {
                setPromoError(null);
                if (!code.trim()) {
                  setPromoError('Please enter a promo code.');
                  return;
                }
                setIsCheckingPromo(true);
                try {
                  const res = await RatingService.checkPromoCode(code);
                  if (res.is_valid) {
                    setPromoDiscount(res.discount_percentage);
                    setPromoAssociation(res.association_name || 'Affinity Partner');
                    announce(
                      `Promo code ${code.toUpperCase()} applied: ${res.discount_percentage}% discount.`
                    );
                  } else {
                    setPromoDiscount(0);
                    setPromoAssociation('');
                    setPromoError(res.error_message || 'Please enter a valid promo code');
                    announce('Invalid promo code entered.');
                  }
                } catch {
                  setPromoDiscount(0);
                  setPromoAssociation('');
                  setPromoError('Unable to verify promo code. Please check your connection.');
                } finally {
                  setIsCheckingPromo(false);
                }
              }}
              onRemove={handleClearPromoCode}
              isApplied={promoDiscount > 0}
              appliedDescription={`${promoDiscount}% ${promoAssociation} discount applied to base premium.`}
              isLoading={isCheckingPromo}
              errorMessage={promoError || undefined}
            />
          </div>
        </FieldGroup>

        {/* ========================================================
            SECTION 4: Statutory Disclosures & Mandatory Consent
            (FLD-CALC-CONSENT-007 & LEG-PIDM-001)
            ======================================================== */}
        <FieldGroup
          asCard
          title="4. Statutory Disclosures & Mandatory Consent"
          description="Review deposit insurance protection terms and affirm regulatory practice compliance before calculating quotation."
        >
          {/* Statutory PIDM Statement (LEG-PIDM-001) */}
          <div
            className="ds-card-subtle"
            style={{
              padding: '16px 18px',
              backgroundColor: 'var(--ds-color-surface-canvas, #F4F7F9)',
              borderRadius: 'var(--ds-comp-input-radius, 6px)',
              border: '1px solid var(--ds-color-border-subtle, #DFE6EC)',
              marginBottom: '20px',
              fontSize: '12px',
              lineHeight: 1.6,
              color: 'var(--ds-color-text-secondary, #475569)',
            }}
          >
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <ShieldCheck size={18} color="var(--ds-color-brand-primary, #08A5B5)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ color: 'var(--ds-color-navy-900, #132766)' }}>PIDM Statutory Protection Notice:</strong> The benefit(s) payable under eligible certificate/policy/product is(are) protected by PIDM up to limits. Please refer to PIDM&apos;s TIPS Brochure or contact Chubb Insurance Malaysia Berhad or PIDM (visit{' '}
                <a
                  href="https://www.pidm.gov.my"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--ds-color-text-link, #066F7B)', textDecoration: 'underline', fontWeight: 500 }}
                >
                  www.pidm.gov.my
                </a>
                ).
              </div>
            </div>
          </div>

          {/* Required Consent Checkbox (FLD-CALC-CONSENT-007) */}
          <Checkbox
            id={termsCheckboxId}
            checked={termsAccepted}
            onChange={(e) => {
              setTermsAccepted(e.target.checked);
              setErrors((prev) => {
                const next = { ...prev };
                delete next.terms;
                return next;
              });
            }}
            errorMessage={errors.terms}
            label={
              <span style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--ds-color-text-primary, #17253B)' }}>
                I have read, understood and agree to the terms and conditions, privacy policy and I meet all local regulation to practice my profession. <span style={{ color: 'var(--ds-color-text-error, #B91C1C)' }}>*</span>
              </span>
            }
          />
        </FieldGroup>

        {/* ========================================================
            ACTION: Generate Quotation Primary Button (ACT-NAV-NEXT-001)
            ======================================================== */}
        <div
          className="ds-action-bar-responsive"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingTop: '8px',
          }}
        >
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="ds-btn-mobile-full"
            loading={isSubmitting}
            rightIcon={<ArrowRight size={18} />}
          >
            Generate Quotation
          </Button>
        </div>
      </form>

      {/* Modals: Backdating, Period End Date, and Specialization */}
      <BackdateAgreementModal
        isOpen={isBackdateModalOpen}
        startDate={pendingBackdate}
        onAgree={handleAgreeBackdate}
        onDisagree={handleDisagreeBackdate}
      />

      <PeriodEndDateModal
        isOpen={isPeriodInfoModalOpen}
        onClose={() => setIsPeriodInfoModalOpen(false)}
      />

      {activeClassification && (
        <SpecializationModal
          isOpen={isSpecialtyModalOpen}
          classificationName={activeClassification.name}
          initialSpecialties={specialties}
          onSave={(updatedSpecialties) => {
            setSpecialties(updatedSpecialties);
            setErrors((prev) => {
              const next = { ...prev };
              delete next.specialties;
              return next;
            });
            announce('Specialization percentages allocated successfully.');
          }}
          onClose={() => setIsSpecialtyModalOpen(false)}
        />
      )}
    </div>
  );
};
