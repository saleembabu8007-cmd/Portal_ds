import React, { useState, useEffect } from 'react';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Mail,
  Calendar,
  Sparkles,
  Check,
  RefreshCw,
  Shield,
  Building2,
  UserCheck,
} from 'lucide-react';
import { useWorkflow } from '../../core/state/WorkflowContext';
import {
  RatingService,
  CLINIC_LIABILITY_TIERS,
  CalculatePremiumRequest,
} from '../../core/api/ratingService';
import {
  ClinicWhyModal,
  PicWhyModal,
  EmailQuoteModal,
} from './QuoteModals';
import { QuoteBreakdown } from '../../core/state/types';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/FieldFeedback';
import { FieldGroup } from '../../components/form/FieldGroup';

export const Stage2QuoteReview: React.FC = () => {
  const {
    coverage,
    updateCoverage,
    quote,
    setQuote,
    doctorProfile,
    goToStage,
    announce,
  } = useWorkflow();

  // Local state for questions and add-ons
  const [ownsClinic, setOwnsClinic] = useState<boolean | null>(
    coverage.clinic?.ownsClinic ?? null
  );
  const [clinicType, setClinicType] = useState<'sole_proprietor' | 'partnership_sdn_bhd' | ''>(
    coverage.clinic?.clinicType ?? ''
  );
  const [hiresLocums, setHiresLocums] = useState<boolean | null>(
    coverage.clinic?.hiresLocums ?? null
  );
  const [clinicLiabilityId, setClinicLiabilityId] = useState<string>(
    coverage.clinic?.clinicLiabilityId ?? '500k'
  );
  const [isClinicPackageSelected, setIsClinicPackageSelected] = useState<boolean>(
    coverage.addons.clinicPackage ?? false
  );

  const [isPicOwnClinic, setIsPicOwnClinic] = useState<boolean | null>(
    coverage.pic?.isPicOwnClinic ?? null
  );
  const [isPicAnotherClinic, setIsPicAnotherClinic] = useState<boolean | null>(
    coverage.pic?.isPicAnotherClinic ?? null
  );
  const [isPicSelected, setIsPicSelected] = useState<boolean>(
    coverage.addons.personInCharge ?? false
  );

  const [fulfillmentMode, setFulfillmentMode] = useState<'buy_online' | 'email_quote'>(
    coverage.fulfillmentMode ?? 'buy_online'
  );

  // Reconciliation notices when upstream answers change
  const [reconciliationNotice, setReconciliationNotice] = useState<string | null>(null);

  // Modal dialog states
  const [isClinicWhyOpen, setIsClinicWhyOpen] = useState(false);
  const [isPicWhyOpen, setIsPicWhyOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  // Rate Lock Countdown Timer (15 minutes from issue)
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    if (quote?.expiresAt) {
      return Math.max(0, Math.floor((quote.expiresAt - Date.now()) / 1000));
    }
    return 15 * 60;
  });

  const [isRecalculating, setIsRecalculating] = useState(false);
  const [recalculateError, setRecalculateError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Synchronize from upstream coverage updates if provided externally
  useEffect(() => {
    if (coverage.clinic?.ownsClinic !== undefined && coverage.clinic.ownsClinic !== null) {
      setOwnsClinic(coverage.clinic.ownsClinic);
    }
    if (coverage.clinic?.clinicType !== undefined && coverage.clinic.clinicType !== '') {
      setClinicType(coverage.clinic.clinicType as any);
    }
    if (coverage.clinic?.clinicLiabilityId) {
      setClinicLiabilityId(coverage.clinic.clinicLiabilityId);
    }
    if (coverage.addons?.clinicPackage !== undefined) {
      setIsClinicPackageSelected(coverage.addons.clinicPackage);
    }
    if (coverage.addons?.personInCharge !== undefined) {
      setIsPicSelected(coverage.addons.personInCharge);
    }
  }, [
    coverage.clinic?.ownsClinic,
    coverage.clinic?.clinicType,
    coverage.clinic?.clinicLiabilityId,
    coverage.addons?.clinicPackage,
    coverage.addons?.personInCharge,
  ]);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Authoritative recalculation function
  const triggerRecalculation = async (overrides?: {
    clinicPkg?: boolean;
    picPkg?: boolean;
    clinicLiabId?: string;
    ownsClinicVal?: boolean | null;
    clinicTypeVal?: string;
    hiresLocumsVal?: boolean | null;
    picOwnVal?: boolean | null;
    picExtVal?: boolean | null;
  }) => {
    setIsRecalculating(true);
    setRecalculateError(null);

    const activeOwnsClinic = overrides?.ownsClinicVal !== undefined ? overrides.ownsClinicVal : ownsClinic;
    const activeClinicPkg = overrides?.clinicPkg !== undefined ? overrides.clinicPkg : isClinicPackageSelected;
    const activeClinicLiabId = overrides?.clinicLiabId !== undefined ? overrides.clinicLiabId : clinicLiabilityId;
    const activePicOwn = overrides?.picOwnVal !== undefined ? overrides.picOwnVal : isPicOwnClinic;
    const activePicExt = overrides?.picExtVal !== undefined ? overrides.picExtVal : isPicAnotherClinic;
    const activePicPkg = overrides?.picPkg !== undefined ? overrides.picPkg : isPicSelected;

    try {
      const payload: CalculatePremiumRequest = {
        classification_id: coverage.classificationId,
        liability_id: coverage.limitOfLiability,
        insurance_start_date: coverage.startDate,
        insurance_end_date: coverage.endDate,
        customer_email: coverage.customerEmail || doctorProfile.email || 'doctor@example.com',
        promo_code: coverage.promoDiscount && coverage.promoDiscount > 0 ? coverage.promoCode : undefined,
        specialties: coverage.specialties,
        clause_6_12_accepted: coverage.clause612Accepted,
        do_you_own_clinic_status_value: activeOwnsClinic === true ? 1 : 0,
        clinic_type_value: overrides?.clinicTypeVal !== undefined ? overrides.clinicTypeVal : clinicType,
        employee_locum_status_value: overrides?.hiresLocumsVal !== undefined ? (overrides.hiresLocumsVal ? 1 : 0) : (hiresLocums ? 1 : 0),
        pic_of_own_clinic_or_another_clinic_status_value: activePicOwn === true ? 1 : 0,
        are_you_pic_of_any_clinic_status_value: activePicExt === true ? 1 : 0,
        clinic_liability_id: activeClinicLiabId,
        medical_establishment_package_value: activeClinicPkg && activeOwnsClinic === true ? 1 : 0,
        pic_coverage_enable_status_value: activePicPkg && (activePicOwn === true || activePicExt === true) ? 1 : 0,
        reinstatement_package_value: 1,
      };

      const res = await RatingService.calculatePremium(payload);

      if (res.success && res.pricing) {
        const updatedQuote: QuoteBreakdown = {
          grossBasePremium: res.pricing.gross_base,
          annualGrossEquivalent: res.pricing.annual_gross_equivalent,
          individualNet: res.pricing.individual_net,
          specialtyMultiplier: 1.0,
          clinicPremium: res.pricing.clinic_premium,
          clinicAnnualRate: res.pricing.clinic_annual_rate,
          picPremium: res.pricing.pic_premium,
          picAnnualRate: res.pricing.pic_annual_rate,
          reinstatementPremium: 0.0,
          addonsTotal: res.pricing.addons_total,
          discountAmount: res.pricing.discount_amount,
          netTaxablePremium: res.pricing.net_gross,
          sstAmount: res.pricing.sst_amount,
          stampDuty: res.pricing.stamp_duty,
          totalPayable: res.pricing.total_payable,
          quoteToken: res.quote_token,
          quotationNumber: res.quotation_number,
          issuedAt: Date.now(),
          expiresAt: res.expires_at,
          isProrata: res.pricing.is_prorata,
          daysCount: res.pricing.days_count,
        };

        // Update Coverage State in WorkflowContext
        updateCoverage({
          clinic: {
            ownsClinic: activeOwnsClinic,
            clinicType: overrides?.clinicTypeVal !== undefined ? overrides.clinicTypeVal as 'sole_proprietor' | 'partnership_sdn_bhd' : clinicType,
            hiresLocums: overrides?.hiresLocumsVal !== undefined ? overrides.hiresLocumsVal : hiresLocums,
            clinicLiabilityId: activeClinicLiabId,
            clinicLiabilityFormatted: CLINIC_LIABILITY_TIERS[activeClinicLiabId]?.label || 'RM 500,000',
          },
          pic: {
            isPicOwnClinic: activePicOwn,
            isPicAnotherClinic: activePicExt,
          },
          addons: {
            ...coverage.addons,
            clinicPackage: activeClinicPkg && activeOwnsClinic === true,
            personInCharge: activePicPkg && (activePicOwn === true || activePicExt === true),
          },
        });

        setQuote(updatedQuote);
        setTimeLeft(15 * 60);

        announce(
          `Quotation updated. Total payable is RM ${updatedQuote.totalPayable.toFixed(2)}.`
        );
      }
    } catch {
      setRecalculateError('Unable to recalculate quotation. Please try again.');
    } finally {
      setIsRecalculating(false);
    }
  };

  // Handle Clinic Ownership Toggle
  const handleClinicOwnershipChange = (val: boolean) => {
    setOwnsClinic(val);
    setValidationError(null);

    if (!val) {
      if (isClinicPackageSelected) {
        setIsClinicPackageSelected(false);
        setReconciliationNotice(
          'Notice: Clinic facility protection was removed because clinic ownership is no longer declared.'
        );
      }
      setClinicType('');
      setHiresLocums(null);
      setIsPicOwnClinic(false);
      triggerRecalculation({
        ownsClinicVal: false,
        clinicPkg: false,
        clinicTypeVal: '',
        hiresLocumsVal: null,
        picOwnVal: false,
      });
    } else {
      setReconciliationNotice(null);
      triggerRecalculation({ ownsClinicVal: true });
    }
  };

  // Handle PIC Question Toggles
  const handlePicOwnClinicChange = (val: boolean) => {
    setIsPicOwnClinic(val);
    setValidationError(null);
    const willBeEligible = val === true || isPicAnotherClinic === true;

    if (!willBeEligible && isPicSelected) {
      setIsPicSelected(false);
      setReconciliationNotice(
        'Notice: Person-In-Charge coverage was removed because no PIC role is declared.'
      );
      triggerRecalculation({ picOwnVal: val, picPkg: false });
    } else {
      triggerRecalculation({ picOwnVal: val });
    }
  };

  const handlePicAnotherClinicChange = (val: boolean) => {
    setIsPicAnotherClinic(val);
    setValidationError(null);
    const willBeEligible = isPicOwnClinic === true || val === true;

    if (!willBeEligible && isPicSelected) {
      setIsPicSelected(false);
      setReconciliationNotice(
        'Notice: Person-In-Charge coverage was removed because no PIC role is declared.'
      );
      triggerRecalculation({ picExtVal: val, picPkg: false });
    } else {
      triggerRecalculation({ picExtVal: val });
    }
  };

  // Toggle Clinic Add-on
  const handleToggleClinicPackage = (checked: boolean) => {
    setIsClinicPackageSelected(checked);
    triggerRecalculation({ clinicPkg: checked });
  };

  // Change Clinic Limit
  const handleChangeClinicLimit = (tierId: string) => {
    setClinicLiabilityId(tierId);
    triggerRecalculation({ clinicLiabId: tierId });
  };

  // Toggle PIC Add-on
  const handleTogglePic = (checked: boolean) => {
    setIsPicSelected(checked);
    triggerRecalculation({ picPkg: checked });
  };

  // Refresh expired rate lock
  const handleRefreshQuote = () => {
    triggerRecalculation();
    announce('Quotation rate lock refreshed for 15 minutes.');
  };

  // Advance to Stage 3 or handle email quote
  const handleProceed = () => {
    setValidationError(null);

    // Validation: Clinic Ownership question must be answered
    if (ownsClinic === null) {
      setValidationError('Please select whether you own, operate, or partner in a private clinic.');
      window.scrollTo({ top: 180, behavior: 'smooth' });
      return;
    }

    // Validation: If clinic owned, structure must be chosen
    if (ownsClinic === true && !clinicType) {
      setValidationError('Please select your practice business structure (Sole Proprietor or Partnership/Sdn Bhd).');
      window.scrollTo({ top: 260, behavior: 'smooth' });
      return;
    }

    // Validation: PIC questions must be answered
    if ((ownsClinic === true && isPicOwnClinic === null) || isPicAnotherClinic === null) {
      setValidationError('Please complete the Person-In-Charge (PIC) status questions.');
      window.scrollTo({ top: 400, behavior: 'smooth' });
      return;
    }

    if (fulfillmentMode === 'email_quote') {
      setIsEmailModalOpen(true);
      return;
    }

    // Proceed to Stage 3: Details & Underwriting
    updateCoverage({
      fulfillmentMode: 'buy_online',
    });
    announce('Quotation confirmed. Proceeding to practitioner details and underwriting declarations.');
    goToStage(3);
  };

  const isPicEligible = isPicOwnClinic === true || isPicAnotherClinic === true;
  const daysCount = quote?.daysCount || 365;
  const isProrata = quote?.isProrata ?? daysCount < 365;
  const annualGross = quote?.annualGrossEquivalent || quote?.grossBasePremium || 750.0;

  return (
    <div className="ds-stage2-quote-container" style={{ width: '100%' }}>
      {/* 1. Stage Header (Restrained & Minimal) */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Badge variant="teal">Stage 2 of 4: Quotation & Optional Protection</Badge>
        </div>

        <h1
          id="main-heading"
          style={{
            fontFamily: 'var(--ds-primitive-font-heading, "Kanit", sans-serif)',
            fontSize: '26px',
            fontWeight: 500,
            color: 'var(--ds-color-navy-900, #132766)',
            margin: '0 0 6px 0',
            lineHeight: 1.25,
            letterSpacing: '-0.01em',
          }}
        >
          Your Indicative Chubb Indemnity Quote
        </h1>

        <p
          style={{
            fontSize: '14px',
            color: 'var(--ds-color-text-secondary, #475569)',
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          Review your gross premium breakdown, evaluate optional modular practice protections, or proceed directly to application.
        </p>
      </div>

      {/* Upstream Change Reconciliation Alert Banner */}
      {reconciliationNotice && (
        <div
          role="alert"
          style={{
            padding: '12px 16px',
            borderRadius: 'var(--ds-comp-input-radius, 6px)',
            backgroundColor: 'var(--ds-primitive-color-feedback-amber-50, #FFFBEB)',
            border: '1px solid var(--ds-primitive-color-feedback-amber-200, #FDE68A)',
            color: 'var(--ds-color-status-warning, #92400E)',
            fontSize: '13px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{reconciliationNotice}</span>
          </div>
          <button
            type="button"
            onClick={() => setReconciliationNotice(null)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--ds-color-status-warning, #92400E)',
              fontSize: '12px',
              fontWeight: 600,
              padding: 0,
            }}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Validation Error Banner */}
      {validationError && (
        <div
          role="alert"
          style={{
            padding: '12px 16px',
            borderRadius: 'var(--ds-comp-input-radius, 6px)',
            backgroundColor: 'var(--ds-color-status-error-bg, #FEF2F2)',
            border: '1px solid var(--ds-color-status-error-border, #FCA5A5)',
            color: 'var(--ds-color-status-error, #B91C1C)',
            fontSize: '14px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <AlertCircle size={18} style={{ flexShrink: 0 }} />
          <span>{validationError}</span>
        </div>
      )}

      {/* Authoritative Recalculation Error Banner */}
      {recalculateError && (
        <div
          role="alert"
          style={{
            padding: '12px 16px',
            borderRadius: 'var(--ds-comp-input-radius, 6px)',
            backgroundColor: 'var(--ds-color-status-error-bg, #FEF2F2)',
            border: '1px solid var(--ds-color-status-error-border, #FCA5A5)',
            color: 'var(--ds-color-status-error, #B91C1C)',
            fontSize: '14px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <AlertCircle size={18} style={{ flexShrink: 0 }} />
          <span>{recalculateError}</span>
        </div>
      )}

      {/* Recalculation In-Progress Bar */}
      {isRecalculating && (
        <div
          aria-live="polite"
          style={{
            padding: '10px 14px',
            borderRadius: 'var(--ds-comp-input-radius, 6px)',
            backgroundColor: 'var(--ds-color-surface-brand-tint, #F0FAFA)',
            border: '1px solid var(--ds-color-brand-primary, #08A5B5)',
            color: 'var(--ds-color-text-link, #066F7B)',
            fontSize: '13px',
            fontWeight: 500,
            marginBottom: '18px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <RefreshCw size={14} className="ds-animate-spin" />
          <span>Recalculating authoritative quotation with Chubb underwriting gateway...</span>
        </div>
      )}

      {/* 2. Unified Base Quotation, Rate Guarantee & Coverage Term Bar */}
      <div
        style={{
          border: '1px solid var(--ds-color-border-subtle, #E2E8F0)',
          borderRadius: 'var(--ds-comp-panel-radius, 10px)',
          backgroundColor: '#FFFFFF',
          padding: '18px 20px',
          marginBottom: '28px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          alignItems: 'center',
        }}
      >
        {/* Left: 15-Minute Guaranteed Rate Lock */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              backgroundColor: timeLeft > 0 ? 'var(--ds-color-surface-brand-tint, #F0FAFA)' : 'var(--ds-primitive-color-feedback-amber-50, #FFFBEB)',
              color: timeLeft > 0 ? 'var(--ds-color-brand-primary, #08A5B5)' : 'var(--ds-color-status-warning, #92400E)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Clock size={20} />
          </div>
          <div>
            <div
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: timeLeft > 0 ? 'var(--ds-color-navy-900, #132766)' : 'var(--ds-color-status-warning, #92400E)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flexWrap: 'wrap',
              }}
            >
              <span>{timeLeft > 0 ? '15-Minute Guaranteed Rate Lock Active' : 'Rate Lock Expired'}</span>
              {timeLeft > 0 ? (
                <span
                  style={{
                    fontVariantNumeric: 'tabular-nums',
                    fontFamily: 'var(--ds-primitive-font-mono, monospace)',
                    fontSize: '12px',
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    backgroundColor: 'var(--ds-primitive-color-feedback-emerald-50, #ECFDF5)',
                    color: 'var(--ds-color-text-success, #065F46)',
                    border: '1px solid var(--ds-primitive-color-feedback-emerald-200, #6EE7B7)',
                  }}
                >
                  {formatTimer(timeLeft)}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleRefreshQuote}
                  style={{
                    padding: '3px 10px',
                    borderRadius: '4px',
                    backgroundColor: 'var(--ds-color-navy-900, #132766)',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <RefreshCw size={10} />
                  <span>Refresh Rate</span>
                </button>
              )}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--ds-color-text-muted, #64748B)', marginTop: '2px' }}>
              Quote Token: <code style={{ fontSize: '11px', color: 'var(--ds-color-text-primary, #17253B)', backgroundColor: 'var(--ds-color-surface-canvas, #F8FAFC)', padding: '1px 4px', borderRadius: '3px' }}>{quote?.quoteToken}</code>
            </div>
          </div>
        </div>

        {/* Right: Policy Term & Pro-rata Period */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '14px',
            borderLeft: '1px solid var(--ds-color-border-subtle, #E2E8F0)',
            paddingLeft: '20px',
          }}
        >
          <div>
            <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--ds-color-navy-900, #132766)' }}>
              {isProrata ? `Pro-Rated Coverage (${daysCount} Days)` : 'Standard 12-Month Annual Policy'}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--ds-color-text-secondary, #475569)', marginTop: '2px' }}>
              {new Date(coverage.startDate).toLocaleDateString('en-GB')} to{' '}
              {new Date(coverage.endDate).toLocaleDateString('en-GB')} (MMC APC Co-Termination)
            </div>
          </div>

          {isProrata && (
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ds-color-text-muted, #64748B)' }}>
                Annual Equivalent
              </div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ds-color-navy-900, #132766)', fontVariantNumeric: 'tabular-nums' }}>
                RM {annualGross.toFixed(2)}/yr
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================
          SECTION 1: CLINIC PRACTICE & ESTABLISHMENT PROFILING
          ======================================================== */}
      <FieldGroup
        title="Clinic Practice & Establishment Profiling"
        description="Indicate your practice ownership to determine establishment liability eligibility."
      >
        {/* Question: Do you own a clinic? (FLD-QUOTE-CLINIC-OWN-008) */}
        <div style={{ marginBottom: '20px' }}>
          <label
            style={{
              display: 'block',
              fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--ds-color-text-primary, #17253B)',
              marginBottom: '8px',
            }}
          >
            Do you own, operate, or partner in a private clinic practice? <span style={{ color: 'var(--ds-color-status-error, #B91C1C)' }}>*</span>
          </label>

          <div style={{ display: 'flex', gap: '10px', maxWidth: '320px' }}>
            <button
              type="button"
              role="radio"
              aria-label="Yes, I own or partner in a private clinic"
              aria-checked={ownsClinic === true}
              onClick={() => handleClinicOwnershipChange(true)}
              style={{
                flex: 1,
                minHeight: '44px',
                padding: '0 16px',
                borderRadius: 'var(--ds-comp-input-radius, 6px)',
                border: ownsClinic === true
                  ? '2px solid var(--ds-color-brand-primary, #08A5B5)'
                  : '1px solid var(--ds-color-border-default, #CBD5E1)',
                backgroundColor: ownsClinic === true ? 'var(--ds-color-surface-brand-tint, #F0FAFA)' : '#FFFFFF',
                color: 'var(--ds-color-text-primary, #17253B)',
                fontWeight: ownsClinic === true ? 600 : 500,
                fontSize: '14px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                outline: 'none',
                transition: 'all 150ms ease',
              }}
            >
              {ownsClinic === true && <Check size={16} color="var(--ds-color-brand-primary, #08A5B5)" />}
              <span>Yes</span>
            </button>

            <button
              type="button"
              role="radio"
              aria-label="No, I do not own or partner in a private clinic"
              aria-checked={ownsClinic === false}
              onClick={() => handleClinicOwnershipChange(false)}
              style={{
                flex: 1,
                minHeight: '44px',
                padding: '0 16px',
                borderRadius: 'var(--ds-comp-input-radius, 6px)',
                border: ownsClinic === false
                  ? '2px solid var(--ds-color-brand-primary, #08A5B5)'
                  : '1px solid var(--ds-color-border-default, #CBD5E1)',
                backgroundColor: ownsClinic === false ? 'var(--ds-color-surface-brand-tint, #F0FAFA)' : '#FFFFFF',
                color: 'var(--ds-color-text-primary, #17253B)',
                fontWeight: ownsClinic === false ? 600 : 500,
                fontSize: '14px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                outline: 'none',
                transition: 'all 150ms ease',
              }}
            >
              {ownsClinic === false && <Check size={16} color="var(--ds-color-brand-primary, #08A5B5)" />}
              <span>No</span>
            </button>
          </div>
        </div>

        {/* Conditional Clinic Practice Details (Adjacent Reveal with 3px Accent Bar) */}
        {ownsClinic === true && (
          <div
            style={{
              paddingLeft: '16px',
              borderLeft: '3px solid var(--ds-color-brand-primary, #08A5B5)',
              marginTop: '16px',
              marginBottom: '20px',
            }}
          >
            {/* Question: Structure (FLD-QUOTE-CLINIC-TYPE-009) */}
            <div style={{ marginBottom: '18px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--ds-color-text-primary, #17253B)',
                  marginBottom: '8px',
                }}
              >
                Is it a Sole Proprietorship or Partnership / Sdn Bhd? <span style={{ color: 'var(--ds-color-status-error, #B91C1C)' }}>*</span>
              </label>

              <div style={{ display: 'flex', gap: '10px', maxWidth: '420px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => {
                    setClinicType('sole_proprietor');
                    triggerRecalculation({ clinicTypeVal: 'sole_proprietor' });
                  }}
                  style={{
                    flex: 1,
                    minHeight: '40px',
                    padding: '0 14px',
                    borderRadius: 'var(--ds-comp-input-radius, 6px)',
                    border: clinicType === 'sole_proprietor'
                      ? '2px solid var(--ds-color-brand-primary, #08A5B5)'
                      : '1px solid var(--ds-color-border-default, #CBD5E1)',
                    backgroundColor: clinicType === 'sole_proprietor' ? 'var(--ds-color-surface-brand-tint, #F0FAFA)' : '#FFFFFF',
                    color: 'var(--ds-color-text-primary, #17253B)',
                    fontWeight: clinicType === 'sole_proprietor' ? 600 : 400,
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>Sole Proprietor</span>
                  {clinicType === 'sole_proprietor' && <Check size={14} color="var(--ds-color-brand-primary, #08A5B5)" />}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setClinicType('partnership_sdn_bhd');
                    triggerRecalculation({ clinicTypeVal: 'partnership_sdn_bhd' });
                  }}
                  style={{
                    flex: 1,
                    minHeight: '40px',
                    padding: '0 14px',
                    borderRadius: 'var(--ds-comp-input-radius, 6px)',
                    border: clinicType === 'partnership_sdn_bhd'
                      ? '2px solid var(--ds-color-brand-primary, #08A5B5)'
                      : '1px solid var(--ds-color-border-default, #CBD5E1)',
                    backgroundColor: clinicType === 'partnership_sdn_bhd' ? 'var(--ds-color-surface-brand-tint, #F0FAFA)' : '#FFFFFF',
                    color: 'var(--ds-color-text-primary, #17253B)',
                    fontWeight: clinicType === 'partnership_sdn_bhd' ? 600 : 400,
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>Partnership / Sdn Bhd</span>
                  {clinicType === 'partnership_sdn_bhd' && <Check size={14} color="var(--ds-color-brand-primary, #08A5B5)" />}
                </button>
              </div>
            </div>

            {/* Question: Locums (FLD-QUOTE-LOCUM-HIRE-010) */}
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--ds-color-text-primary, #17253B)',
                  marginBottom: '8px',
                }}
              >
                Do you hire locums who see new patients on their own? <span style={{ color: 'var(--ds-color-status-error, #B91C1C)' }}>*</span>
              </label>

              <div style={{ display: 'flex', gap: '10px', maxWidth: '280px' }}>
                <button
                  type="button"
                  onClick={() => {
                    setHiresLocums(true);
                    triggerRecalculation({ hiresLocumsVal: true });
                  }}
                  style={{
                    flex: 1,
                    minHeight: '38px',
                    padding: '0 16px',
                    borderRadius: 'var(--ds-comp-input-radius, 6px)',
                    border: hiresLocums === true
                      ? '2px solid var(--ds-color-brand-primary, #08A5B5)'
                      : '1px solid var(--ds-color-border-default, #CBD5E1)',
                    backgroundColor: hiresLocums === true ? 'var(--ds-color-surface-brand-tint, #F0FAFA)' : '#FFFFFF',
                    color: 'var(--ds-color-text-primary, #17253B)',
                    fontWeight: 600,
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  Yes
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setHiresLocums(false);
                    triggerRecalculation({ hiresLocumsVal: false });
                  }}
                  style={{
                    flex: 1,
                    minHeight: '38px',
                    padding: '0 16px',
                    borderRadius: 'var(--ds-comp-input-radius, 6px)',
                    border: hiresLocums === false
                      ? '2px solid var(--ds-color-brand-primary, #08A5B5)'
                      : '1px solid var(--ds-color-border-default, #CBD5E1)',
                    backgroundColor: hiresLocums === false ? 'var(--ds-color-surface-brand-tint, #F0FAFA)' : '#FFFFFF',
                    color: 'var(--ds-color-text-primary, #17253B)',
                    fontWeight: 600,
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  No
                </button>
              </div>
            </div>

            {/* Selectable Clinic Entity Facility Indemnity Card (FLD-QUOTE-ADDON-CLINIC-014) */}
            <div
              style={{
                backgroundColor: isClinicPackageSelected ? 'var(--ds-color-surface-brand-tint, #F0FAFA)' : '#FFFFFF',
                borderRadius: 'var(--ds-comp-panel-radius, 10px)',
                border: isClinicPackageSelected
                  ? '2px solid var(--ds-color-brand-primary, #08A5B5)'
                  : '1px solid var(--ds-color-border-subtle, #E2E8F0)',
                padding: '18px 20px',
                transition: 'border-color 150ms ease, background-color 150ms ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px' }}>
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        fontFamily: 'var(--ds-primitive-font-heading, "Kanit", sans-serif)',
                        fontSize: '16px',
                        fontWeight: 500,
                        color: 'var(--ds-color-navy-900, #132766)',
                      }}
                    >
                      Clinic Entity Facility Indemnity
                    </span>
                    <Badge variant="teal">RECOMMENDED FOR CLINIC OWNERS</Badge>
                  </div>

                  <p style={{ fontSize: '13px', color: 'var(--ds-color-text-secondary, #475569)', margin: '6px 0 8px 0', lineHeight: 1.5 }}>
                    Protects your clinic entity against vicarious liability, nurse injection injuries, dispensing errors by clinic staff, and establishment lawsuits.
                  </p>

                  <button
                    type="button"
                    aria-label="Why clinic coverage is recommended"
                    onClick={() => setIsClinicWhyOpen(true)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      color: 'var(--ds-color-text-link, #08A5B5)',
                      fontSize: '12px',
                      fontWeight: 500,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <HelpCircle size={14} />
                    <span>Why is this recommended?</span>
                  </button>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <label
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      minHeight: '44px',
                      padding: '8px 16px',
                      borderRadius: 'var(--ds-comp-input-radius, 6px)',
                      backgroundColor: isClinicPackageSelected ? 'var(--ds-color-navy-900, #132766)' : '#FFFFFF',
                      color: isClinicPackageSelected ? '#FFFFFF' : 'var(--ds-color-text-primary, #17253B)',
                      border: isClinicPackageSelected ? 'none' : '1px solid var(--ds-color-border-default, #CBD5E1)',
                      fontWeight: 600,
                      fontSize: '13px',
                      transition: 'all 150ms ease',
                    }}
                  >
                    <input
                      type="checkbox"
                      aria-label="Clinic Entity Facility Indemnity"
                      checked={isClinicPackageSelected}
                      onChange={(e) => handleToggleClinicPackage(e.target.checked)}
                      style={{ width: '16px', height: '16px', accentColor: 'var(--ds-color-brand-primary, #08A5B5)', cursor: 'pointer' }}
                    />
                    <span>{isClinicPackageSelected ? 'Cover Added' : 'Add This Coverage'}</span>
                  </label>
                </div>
              </div>

              {/* Clinic Limit Selector (FLD-QUOTE-CLINIC-LIAB-013) */}
              {isClinicPackageSelected && (
                <div
                  style={{
                    marginTop: '16px',
                    paddingTop: '16px',
                    borderTop: '1px solid var(--ds-color-border-subtle, #E2E8F0)',
                  }}
                >
                  <label
                    style={{
                      display: 'block',
                      fontSize: '11px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      color: 'var(--ds-color-text-muted, #64748B)',
                      marginBottom: '10px',
                    }}
                  >
                    Select Clinic Establishment Limit of Liability
                  </label>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
                    {Object.values(CLINIC_LIABILITY_TIERS).map((tier) => {
                      const isSelected = clinicLiabilityId === tier.id;
                      const proRataFactor = isProrata ? daysCount / 365 : 1.0;
                      const proRatedRate = Number((tier.annualRate * proRataFactor).toFixed(2));

                      return (
                        <div
                          key={tier.id}
                          role="radio"
                          aria-checked={isSelected}
                          tabIndex={0}
                          onClick={() => handleChangeClinicLimit(tier.id)}
                          onKeyDown={(e) => {
                            if (e.key === ' ' || e.key === 'Enter') {
                              e.preventDefault();
                              handleChangeClinicLimit(tier.id);
                            }
                          }}
                          style={{
                            padding: '12px 14px',
                            borderRadius: 'var(--ds-comp-input-radius, 6px)',
                            border: isSelected
                              ? '2px solid var(--ds-color-brand-primary, #08A5B5)'
                              : '1px solid var(--ds-color-border-default, #CBD5E1)',
                            backgroundColor: isSelected ? '#FFFFFF' : 'var(--ds-color-surface-canvas, #F8FAFC)',
                            cursor: 'pointer',
                            boxShadow: isSelected ? '0 1px 3px rgba(8, 165, 181, 0.12)' : 'none',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: 600, fontSize: '13px', color: 'var(--ds-color-navy-900, #132766)' }}>
                              {tier.label}
                            </span>
                            {isSelected && <Check size={14} color="var(--ds-color-brand-primary, #08A5B5)" />}
                          </div>
                          <div style={{ fontSize: '13px', color: 'var(--ds-color-brand-primary, #08A5B5)', marginTop: '4px', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                            +RM {proRatedRate.toFixed(2)}
                            {isProrata && <span style={{ fontSize: '11px', color: 'var(--ds-color-text-muted, #64748B)', fontWeight: 400 }}> ({daysCount}d)</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </FieldGroup>

      {/* ========================================================
          SECTION 2: PERSON-IN-CHARGE (PIC) REGULATORY EVALUATION
          ======================================================== */}
      <FieldGroup
        title="Person-In-Charge (PIC) Regulatory Evaluation"
        description="Under the Private Healthcare Facilities & Services Act (PHFSA 1998), designated PICs carry statutory liability."
      >
        {/* Question: PIC for own clinic? (FLD-QUOTE-PIC-OWN-011) */}
        <div style={{ marginBottom: '18px' }}>
          <label
            style={{
              display: 'block',
              fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--ds-color-text-primary, #17253B)',
              marginBottom: '8px',
            }}
          >
            Are you a designated Person-In-Charge (PIC) for your clinic? <span style={{ color: 'var(--ds-color-status-error, #B91C1C)' }}>*</span>
          </label>

          <div style={{ display: 'flex', gap: '10px', maxWidth: '320px' }}>
            <button
              type="button"
              role="radio"
              aria-label="Yes, I am Person-In-Charge of my own clinic"
              aria-checked={isPicOwnClinic === true}
              onClick={() => handlePicOwnClinicChange(true)}
              style={{
                flex: 1,
                minHeight: '44px',
                padding: '0 16px',
                borderRadius: 'var(--ds-comp-input-radius, 6px)',
                border: isPicOwnClinic === true
                  ? '2px solid var(--ds-color-brand-primary, #08A5B5)'
                  : '1px solid var(--ds-color-border-default, #CBD5E1)',
                backgroundColor: isPicOwnClinic === true ? 'var(--ds-color-surface-brand-tint, #F0FAFA)' : '#FFFFFF',
                color: 'var(--ds-color-text-primary, #17253B)',
                fontWeight: isPicOwnClinic === true ? 600 : 500,
                fontSize: '14px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                outline: 'none',
                transition: 'all 150ms ease',
              }}
            >
              {isPicOwnClinic === true && <Check size={16} color="var(--ds-color-brand-primary, #08A5B5)" />}
              <span>Yes</span>
            </button>

            <button
              type="button"
              role="radio"
              aria-label="No, not Person-In-Charge of own clinic"
              aria-checked={isPicOwnClinic === false}
              onClick={() => handlePicOwnClinicChange(false)}
              style={{
                flex: 1,
                minHeight: '44px',
                padding: '0 16px',
                borderRadius: 'var(--ds-comp-input-radius, 6px)',
                border: isPicOwnClinic === false
                  ? '2px solid var(--ds-color-brand-primary, #08A5B5)'
                  : '1px solid var(--ds-color-border-default, #CBD5E1)',
                backgroundColor: isPicOwnClinic === false ? 'var(--ds-color-surface-brand-tint, #F0FAFA)' : '#FFFFFF',
                color: 'var(--ds-color-text-primary, #17253B)',
                fontWeight: isPicOwnClinic === false ? 600 : 500,
                fontSize: '14px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                outline: 'none',
                transition: 'all 150ms ease',
              }}
            >
              {isPicOwnClinic === false && <Check size={16} color="var(--ds-color-brand-primary, #08A5B5)" />}
              <span>No</span>
            </button>
          </div>
        </div>

        {/* Question: PIC with another establishment? (FLD-QUOTE-PIC-EXT-012) */}
        <div style={{ marginBottom: '20px' }}>
          <label
            style={{
              display: 'block',
              fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--ds-color-text-primary, #17253B)',
              marginBottom: '8px',
            }}
          >
            Are you a Person-In-Charge (PIC) with another establishment or healthcare facility? <span style={{ color: 'var(--ds-color-status-error, #B91C1C)' }}>*</span>
          </label>

          <div style={{ display: 'flex', gap: '10px', maxWidth: '320px' }}>
            <button
              type="button"
              role="radio"
              aria-label="Yes, I am Person-In-Charge of another facility"
              aria-checked={isPicAnotherClinic === true}
              onClick={() => handlePicAnotherClinicChange(true)}
              style={{
                flex: 1,
                minHeight: '44px',
                padding: '0 16px',
                borderRadius: 'var(--ds-comp-input-radius, 6px)',
                border: isPicAnotherClinic === true
                  ? '2px solid var(--ds-color-brand-primary, #08A5B5)'
                  : '1px solid var(--ds-color-border-default, #CBD5E1)',
                backgroundColor: isPicAnotherClinic === true ? 'var(--ds-color-surface-brand-tint, #F0FAFA)' : '#FFFFFF',
                color: 'var(--ds-color-text-primary, #17253B)',
                fontWeight: isPicAnotherClinic === true ? 600 : 500,
                fontSize: '14px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                outline: 'none',
                transition: 'all 150ms ease',
              }}
            >
              {isPicAnotherClinic === true && <Check size={16} color="var(--ds-color-brand-primary, #08A5B5)" />}
              <span>Yes</span>
            </button>

            <button
              type="button"
              role="radio"
              aria-label="No, not Person-In-Charge of another facility"
              aria-checked={isPicAnotherClinic === false}
              onClick={() => handlePicAnotherClinicChange(false)}
              style={{
                flex: 1,
                minHeight: '44px',
                padding: '0 16px',
                borderRadius: 'var(--ds-comp-input-radius, 6px)',
                border: isPicAnotherClinic === false
                  ? '2px solid var(--ds-color-brand-primary, #08A5B5)'
                  : '1px solid var(--ds-color-border-default, #CBD5E1)',
                backgroundColor: isPicAnotherClinic === false ? 'var(--ds-color-surface-brand-tint, #F0FAFA)' : '#FFFFFF',
                color: 'var(--ds-color-text-primary, #17253B)',
                fontWeight: isPicAnotherClinic === false ? 600 : 500,
                fontSize: '14px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                outline: 'none',
                transition: 'all 150ms ease',
              }}
            >
              {isPicAnotherClinic === false && <Check size={16} color="var(--ds-color-brand-primary, #08A5B5)" />}
              <span>No</span>
            </button>
          </div>
        </div>

        {/* Revealed PIC Add-on Card (Conditional if eligible) */}
        {isPicEligible && (
          <div
            style={{
              paddingLeft: '16px',
              borderLeft: '3px solid var(--ds-color-brand-primary, #08A5B5)',
              marginTop: '16px',
            }}
          >
            <div
              style={{
                backgroundColor: isPicSelected ? 'var(--ds-color-surface-brand-tint, #F0FAFA)' : '#FFFFFF',
                borderRadius: 'var(--ds-comp-panel-radius, 10px)',
                border: isPicSelected
                  ? '2px solid var(--ds-color-brand-primary, #08A5B5)'
                  : '1px solid var(--ds-color-border-subtle, #E2E8F0)',
                padding: '18px 20px',
                transition: 'border-color 150ms ease, background-color 150ms ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px' }}>
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        fontFamily: 'var(--ds-primitive-font-heading, "Kanit", sans-serif)',
                        fontSize: '16px',
                        fontWeight: 500,
                        color: 'var(--ds-color-navy-900, #132766)',
                      }}
                    >
                      Person-In-Charge (PIC) Statutory Defense Extension
                    </span>
                    <Badge variant="teal">RECOMMENDED FOR DESIGNATED PICS</Badge>
                  </div>

                  <p style={{ fontSize: '13px', color: 'var(--ds-color-text-secondary, #475569)', margin: '6px 0 8px 0', lineHeight: 1.5 }}>
                    Provides legal representation and dedicated defense costs for statutory inquiries and Private Healthcare Facilities & Services Act (PHFSA 1998) regulatory proceedings directed at the PIC.
                  </p>

                  <button
                    type="button"
                    aria-label="Why PIC coverage is recommended"
                    onClick={() => setIsPicWhyOpen(true)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      color: 'var(--ds-color-text-link, #08A5B5)',
                      fontSize: '12px',
                      fontWeight: 500,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <HelpCircle size={14} />
                    <span>Why is this recommended?</span>
                  </button>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ds-color-navy-900, #132766)', marginBottom: '8px', fontVariantNumeric: 'tabular-nums' }}>
                    +RM {(quote?.picPremium ?? (150.0 * (isProrata ? daysCount / 365 : 1.0))).toFixed(2)}
                    <span style={{ fontSize: '11px', fontWeight: 400, color: 'var(--ds-color-text-muted, #64748B)' }}>
                      {' '}({isProrata ? `${daysCount}d pro-rata` : 'Annual'})
                    </span>
                  </div>

                  <label
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      minHeight: '44px',
                      padding: '8px 16px',
                      borderRadius: 'var(--ds-comp-input-radius, 6px)',
                      backgroundColor: isPicSelected ? 'var(--ds-color-navy-900, #132766)' : '#FFFFFF',
                      color: isPicSelected ? '#FFFFFF' : 'var(--ds-color-text-primary, #17253B)',
                      border: isPicSelected ? 'none' : '1px solid var(--ds-color-border-default, #CBD5E1)',
                      fontWeight: 600,
                      fontSize: '13px',
                      transition: 'all 150ms ease',
                    }}
                  >
                    <input
                      type="checkbox"
                      aria-label="Person-In-Charge (PIC) Statutory Defense Extension"
                      checked={isPicSelected}
                      onChange={(e) => handleTogglePic(e.target.checked)}
                      style={{ width: '16px', height: '16px', accentColor: 'var(--ds-color-brand-primary, #08A5B5)', cursor: 'pointer' }}
                    />
                    <span>{isPicSelected ? 'Cover Added' : 'Buy PIC Coverage'}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </FieldGroup>

      {/* ========================================================
          SECTION 3: COMPLIMENTARY AUTOMATIC REINSTATEMENT (RULE-RST-01)
          ======================================================== */}
      <div style={{ marginBottom: '28px' }}>
        <div
          style={{
            padding: '16px 20px',
            borderRadius: 'var(--ds-comp-panel-radius, 10px)',
            backgroundColor: 'var(--ds-primitive-color-feedback-emerald-50, #ECFDF5)',
            border: '1px solid var(--ds-primitive-color-feedback-emerald-200, #6EE7B7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: 'var(--ds-primitive-color-feedback-emerald-500, #10B981)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Sparkles size={18} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontFamily: 'var(--ds-primitive-font-heading, "Kanit", sans-serif)',
                    fontSize: '15px',
                    fontWeight: 500,
                    color: 'var(--ds-color-navy-900, #132766)',
                  }}
                >
                  Automatic Reinstatement Endorsement
                </span>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    backgroundColor: 'var(--ds-primitive-color-feedback-emerald-600, #059669)',
                    color: '#FFFFFF',
                    letterSpacing: '0.04em',
                  }}
                >
                  COMPLIMENTARY INCLUDED
                </span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--ds-color-text-secondary, #475569)', margin: '4px 0 0 0', lineHeight: 1.45 }}>
                Your insurance comes with complimentary automatic reinstatement now. If your aggregate indemnity limit is exhausted by a claim, Chubb automatically restores 1x aggregate limit with zero additional premium.
              </p>
            </div>
          </div>

          <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--ds-color-text-success, #065F46)', fontVariantNumeric: 'tabular-nums' }}>
            RM 0.00
          </div>
        </div>
      </div>

      {/* ========================================================
          SECTION 4: FULFILLMENT CHOICE & DISPATCH PATH
          ======================================================== */}
      <FieldGroup
        title="Application Next Step"
        description="Choose whether to bind immediately online or receive an official quotation schedule via email."
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          {/* Option A: Buy Now (Online Application) */}
          <div
            role="radio"
            aria-label="Buy now online"
            aria-checked={fulfillmentMode === 'buy_online'}
            tabIndex={0}
            onClick={() => setFulfillmentMode('buy_online')}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                setFulfillmentMode('buy_online');
              }
            }}
            style={{
              padding: '16px 18px',
              borderRadius: 'var(--ds-comp-input-radius, 6px)',
              border: fulfillmentMode === 'buy_online'
                ? '2px solid var(--ds-color-brand-primary, #08A5B5)'
                : '1px solid var(--ds-color-border-default, #CBD5E1)',
              backgroundColor: fulfillmentMode === 'buy_online' ? 'var(--ds-color-surface-brand-tint, #F0FAFA)' : '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              boxSizing: 'border-box',
              transition: 'all 150ms ease',
            }}
          >
            <div
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                border: fulfillmentMode === 'buy_online'
                  ? '6px solid var(--ds-color-brand-primary, #08A5B5)'
                  : '1.5px solid var(--ds-color-border-default, #CBD5E1)',
                marginTop: '2px',
                flexShrink: 0,
                backgroundColor: '#FFFFFF',
                boxSizing: 'border-box',
              }}
            />
            <div>
              <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--ds-color-navy-900, #132766)' }}>
                Buy Now (Complete Application Online)
              </div>
              <div style={{ fontSize: '12px', color: 'var(--ds-color-text-secondary, #475569)', marginTop: '2px', lineHeight: 1.45 }}>
                Proceed directly to practitioner particulars, MMC registration verification, and statutory medical declarations.
              </div>
            </div>
          </div>

          {/* Option B: Email Indicative Quotation */}
          <div
            role="radio"
            aria-label="Email me indicative quotation & policy wording"
            aria-checked={fulfillmentMode === 'email_quote'}
            tabIndex={0}
            onClick={() => setFulfillmentMode('email_quote')}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                setFulfillmentMode('email_quote');
              }
            }}
            style={{
              padding: '16px 18px',
              borderRadius: 'var(--ds-comp-input-radius, 6px)',
              border: fulfillmentMode === 'email_quote'
                ? '2px solid var(--ds-color-brand-primary, #08A5B5)'
                : '1px solid var(--ds-color-border-default, #CBD5E1)',
              backgroundColor: fulfillmentMode === 'email_quote' ? 'var(--ds-color-surface-brand-tint, #F0FAFA)' : '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              boxSizing: 'border-box',
              transition: 'all 150ms ease',
            }}
          >
            <div
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                border: fulfillmentMode === 'email_quote'
                  ? '6px solid var(--ds-color-brand-primary, #08A5B5)'
                  : '1.5px solid var(--ds-color-border-default, #CBD5E1)',
                marginTop: '2px',
                flexShrink: 0,
                backgroundColor: '#FFFFFF',
                boxSizing: 'border-box',
              }}
            />
            <div>
              <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--ds-color-navy-900, #132766)' }}>
                Email Me Quotation & Policy Wording
              </div>
              <div style={{ fontSize: '12px', color: 'var(--ds-color-text-secondary, #475569)', marginTop: '2px', lineHeight: 1.45 }}>
                Receive an official Chubb quotation schedule and policy wording PDF with a 30-day guaranteed rate lock.
              </div>
            </div>
          </div>
        </div>
      </FieldGroup>

      {/* ========================================================
          NAVIGATION & ACTION CONTROLS
          ======================================================== */}
      <div
        className="ds-action-bar-responsive"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '24px',
          marginTop: '12px',
          borderTop: '1px solid var(--ds-color-border-subtle, #E2E8F0)',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <Button
          type="button"
          variant="secondary"
          size="md"
          className="ds-btn-mobile-full"
          onClick={() => goToStage(1)}
          leftIcon={<ArrowLeft size={16} />}
        >
          Edit Coverage Details
        </Button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <Button
            type="button"
            variant="secondary"
            size="md"
            className="ds-btn-mobile-full"
            aria-label="Direct email quotation modal"
            onClick={() => setIsEmailModalOpen(true)}
            leftIcon={<Mail size={16} />}
          >
            Email Quotation PDF
          </Button>

          <Button
            type="button"
            variant={fulfillmentMode === 'email_quote' ? 'primary' : 'teal'}
            size="md"
            className="ds-btn-mobile-full"
            onClick={handleProceed}
            disabled={isRecalculating}
            loading={isRecalculating}
            rightIcon={<ArrowRight size={16} />}
          >
            {fulfillmentMode === 'email_quote'
              ? 'Email Quotation PDF'
              : 'Proceed to Personal Details'}
          </Button>
        </div>
      </div>

      {/* Modals */}
      <ClinicWhyModal
        isOpen={isClinicWhyOpen}
        onClose={() => setIsClinicWhyOpen(false)}
      />

      <PicWhyModal
        isOpen={isPicWhyOpen}
        onClose={() => setIsPicWhyOpen(false)}
      />

      <EmailQuoteModal
        isOpen={isEmailModalOpen}
        quotationNumber={quote?.quotationNumber || `DS-${new Date().getFullYear()}-SAMPLE`}
        quoteToken={quote?.quoteToken || 'QT-SAMPLE'}
        defaultEmail={coverage.customerEmail || doctorProfile.email || ''}
        onClose={() => setIsEmailModalOpen(false)}
        onSuccess={(sentEmail) => {
          announce(`Quotation schedule sent to ${sentEmail}.`);
        }}
      />
    </div>
  );
};
