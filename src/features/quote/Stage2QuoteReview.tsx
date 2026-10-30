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
      triggerRecalculation({
        ownsClinicVal: false,
        clinicPkg: false,
        clinicTypeVal: '',
        hiresLocumsVal: null,
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
    if (isPicOwnClinic === null || isPicAnotherClinic === null) {
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
  const currentGross = quote?.grossBasePremium || 750.0;

  return (
    <div className="ds-stage2-quote-container" style={{ width: '100%' }}>
      {/* 1. Stage Header (Restrained & Minimal) */}
      <div style={{ marginBottom: '24px' }}>
        <div
          style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--ds-color-brand-dark)',
            fontWeight: 600,
            marginBottom: '6px',
          }}
        >
          Stage 2 of 4: Quotation & Optional Protection
        </div>

        <h1
          id="main-heading"
          style={{
            fontFamily: 'var(--ds-primitive-font-heading)',
            fontSize: '26px',
            fontWeight: 500,
            color: 'var(--ds-color-navy-900)',
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
            color: 'var(--ds-color-text-secondary)',
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
            borderRadius: 'var(--ds-radius-md)',
            backgroundColor: 'var(--ds-color-status-warning-bg, #FFFBEB)',
            border: '1px solid var(--ds-color-status-warning-border, #FDE68A)',
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
            borderRadius: 'var(--ds-radius-md)',
            backgroundColor: 'var(--ds-color-status-error-bg)',
            border: '1px solid var(--ds-color-status-error-border)',
            color: 'var(--ds-color-status-error)',
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
            borderRadius: 'var(--ds-radius-md)',
            backgroundColor: 'var(--ds-color-status-error-bg)',
            border: '1px solid var(--ds-color-status-error-border)',
            color: 'var(--ds-color-status-error)',
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
            padding: '8px 14px',
            borderRadius: 'var(--ds-radius-md)',
            backgroundColor: 'var(--ds-color-brand-light)',
            border: '1px solid var(--ds-color-brand-primary)',
            color: 'var(--ds-color-brand-dark)',
            fontSize: '12px',
            fontWeight: 600,
            marginBottom: '16px',
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
          border: '1px solid var(--ds-color-border-subtle)',
          borderRadius: 'var(--ds-radius-lg)',
          backgroundColor: 'var(--ds-color-bg-surface)',
          padding: '16px 20px',
          marginBottom: '28px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
          alignItems: 'center',
        }}
      >
        {/* Left: 15-Minute Guaranteed Rate Lock */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Clock
            size={20}
            color={timeLeft > 0 ? 'var(--ds-color-status-success)' : 'var(--ds-color-status-warning, #D97706)'}
          />
          <div>
            <div
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: timeLeft > 0 ? 'var(--ds-color-status-success)' : 'var(--ds-color-status-warning, #D97706)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>{timeLeft > 0 ? '15-Minute Guaranteed Rate Lock Active' : 'Rate Lock Expired'}</span>
              {timeLeft > 0 ? (
                <span
                  style={{
                    fontVariantNumeric: 'tabular-nums',
                    fontSize: '12px',
                    fontWeight: 700,
                    padding: '1px 6px',
                    borderRadius: '4px',
                    backgroundColor: 'var(--ds-color-status-success-bg)',
                    color: 'var(--ds-color-status-success)',
                  }}
                >
                  {formatTimer(timeLeft)}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleRefreshQuote}
                  style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    backgroundColor: 'var(--ds-color-navy-900)',
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
            <div style={{ fontSize: '12px', color: 'var(--ds-color-text-muted)', marginTop: '2px' }}>
              Quote Token: <code style={{ fontSize: '11px' }}>{quote?.quoteToken}</code>
            </div>
          </div>
        </div>

        {/* Right: Policy Term & Pro-rata Period */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', borderLeft: '1px solid var(--ds-color-border-subtle)', paddingLeft: '16px' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--ds-color-navy-900)' }}>
              {isProrata ? `Pro-Rated Coverage (${daysCount} Days)` : 'Standard 12-Month Annual Policy'}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--ds-color-text-secondary)', marginTop: '2px' }}>
              {new Date(coverage.startDate).toLocaleDateString('en-GB')} to{' '}
              {new Date(coverage.endDate).toLocaleDateString('en-GB')} (MMC APC Co-Termination)
            </div>
          </div>

          {isProrata && (
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ds-color-text-muted)' }}>
                Annual Equivalent
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ds-color-navy-900)', fontVariantNumeric: 'tabular-nums' }}>
                RM {annualGross.toFixed(2)}/yr
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================
          SECTION 1: CLINIC PRACTICE & ESTABLISHMENT PROFILING
          ======================================================== */}
      <section
        aria-labelledby="clinic-profiling-heading"
        style={{
          borderTop: '1px solid var(--ds-color-border-subtle)',
          paddingTop: '24px',
          marginBottom: '28px',
        }}
      >
        <div style={{ marginBottom: '16px' }}>
          <h2
            id="clinic-profiling-heading"
            style={{
              fontFamily: 'var(--ds-primitive-font-heading)',
              fontSize: '17px',
              fontWeight: 500,
              color: 'var(--ds-color-navy-900)',
              margin: '0 0 4px 0',
            }}
          >
            Clinic Practice & Establishment Profiling
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--ds-color-text-secondary)', margin: 0 }}>
            Indicate your practice ownership to determine establishment liability eligibility.
          </p>
        </div>

        {/* Question: Do you own a clinic? (FLD-QUOTE-CLINIC-OWN-008) */}
        <div style={{ marginBottom: '18px' }}>
          <label
            style={{
              display: 'block',
              fontFamily: 'var(--ds-primitive-font-body)',
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--ds-color-text-primary)',
              marginBottom: '8px',
            }}
          >
            Do you own, operate, or partner in a private clinic practice? <span style={{ color: 'var(--ds-color-status-error)' }}>*</span>
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
                minHeight: '40px',
                padding: '0 16px',
                borderRadius: 'var(--ds-radius-md)',
                border: ownsClinic === true
                  ? '2px solid var(--ds-color-brand-primary)'
                  : '1px solid var(--ds-color-border-default)',
                backgroundColor: ownsClinic === true ? 'var(--ds-color-brand-light)' : '#FFFFFF',
                color: 'var(--ds-color-text-primary)',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                outline: 'none',
              }}
            >
              {ownsClinic === true && <Check size={14} color="var(--ds-color-brand-dark)" />}
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
                minHeight: '40px',
                padding: '0 16px',
                borderRadius: 'var(--ds-radius-md)',
                border: ownsClinic === false
                  ? '2px solid var(--ds-color-brand-primary)'
                  : '1px solid var(--ds-color-border-default)',
                backgroundColor: ownsClinic === false ? 'var(--ds-color-brand-light)' : '#FFFFFF',
                color: 'var(--ds-color-text-primary)',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                outline: 'none',
              }}
            >
              {ownsClinic === false && <Check size={14} color="var(--ds-color-brand-dark)" />}
              <span>No</span>
            </button>
          </div>
        </div>

        {/* Conditional Clinic Practice Details (Adjacent Reveal with 2px Accent Bar) */}
        {ownsClinic === true && (
          <div
            style={{
              paddingLeft: '16px',
              borderLeft: '2px solid var(--ds-color-brand-primary)',
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
                  fontWeight: 600,
                  color: 'var(--ds-color-text-primary)',
                  marginBottom: '8px',
                }}
              >
                Is it a Sole Proprietorship or Partnership / Sdn Bhd? <span style={{ color: 'var(--ds-color-status-error)' }}>*</span>
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
                    minHeight: '38px',
                    padding: '0 14px',
                    borderRadius: 'var(--ds-radius-md)',
                    border: clinicType === 'sole_proprietor'
                      ? '2px solid var(--ds-color-brand-primary)'
                      : '1px solid var(--ds-color-border-default)',
                    backgroundColor: clinicType === 'sole_proprietor' ? 'var(--ds-color-brand-light)' : '#FFFFFF',
                    color: 'var(--ds-color-text-primary)',
                    fontWeight: clinicType === 'sole_proprietor' ? 600 : 400,
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>Sole Proprietor</span>
                  {clinicType === 'sole_proprietor' && <Check size={14} color="var(--ds-color-brand-dark)" />}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setClinicType('partnership_sdn_bhd');
                    triggerRecalculation({ clinicTypeVal: 'partnership_sdn_bhd' });
                  }}
                  style={{
                    flex: 1,
                    minHeight: '38px',
                    padding: '0 14px',
                    borderRadius: 'var(--ds-radius-md)',
                    border: clinicType === 'partnership_sdn_bhd'
                      ? '2px solid var(--ds-color-brand-primary)'
                      : '1px solid var(--ds-color-border-default)',
                    backgroundColor: clinicType === 'partnership_sdn_bhd' ? 'var(--ds-color-brand-light)' : '#FFFFFF',
                    color: 'var(--ds-color-text-primary)',
                    fontWeight: clinicType === 'partnership_sdn_bhd' ? 600 : 400,
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>Partnership / Sdn Bhd</span>
                  {clinicType === 'partnership_sdn_bhd' && <Check size={14} color="var(--ds-color-brand-dark)" />}
                </button>
              </div>
            </div>

            {/* Question: Locums (FLD-QUOTE-LOCUM-HIRE-010) */}
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--ds-color-text-primary)',
                  marginBottom: '8px',
                }}
              >
                Do you hire locums who see new patients on their own? <span style={{ color: 'var(--ds-color-status-error)' }}>*</span>
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
                    minHeight: '36px',
                    padding: '0 16px',
                    borderRadius: 'var(--ds-radius-md)',
                    border: hiresLocums === true
                      ? '2px solid var(--ds-color-brand-primary)'
                      : '1px solid var(--ds-color-border-default)',
                    backgroundColor: hiresLocums === true ? 'var(--ds-color-brand-light)' : '#FFFFFF',
                    color: 'var(--ds-color-text-primary)',
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
                    minHeight: '36px',
                    padding: '0 16px',
                    borderRadius: 'var(--ds-radius-md)',
                    border: hiresLocums === false
                      ? '2px solid var(--ds-color-brand-primary)'
                      : '1px solid var(--ds-color-border-default)',
                    backgroundColor: hiresLocums === false ? 'var(--ds-color-brand-light)' : '#FFFFFF',
                    color: 'var(--ds-color-text-primary)',
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
                backgroundColor: isClinicPackageSelected ? 'var(--ds-color-brand-light)' : '#FFFFFF',
                borderRadius: 'var(--ds-radius-lg)',
                border: isClinicPackageSelected
                  ? '2px solid var(--ds-color-brand-primary)'
                  : '1px solid var(--ds-color-border-subtle)',
                padding: '18px 20px',
                transition: 'border-color 150ms ease, background-color 150ms ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px' }}>
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        fontFamily: 'var(--ds-primitive-font-heading)',
                        fontSize: '16px',
                        fontWeight: 500,
                        color: 'var(--ds-color-navy-900)',
                      }}
                    >
                      Clinic Entity Facility Indemnity
                    </span>
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 600,
                        padding: '1px 6px',
                        borderRadius: '4px',
                        backgroundColor: '#E6F7F8',
                        color: 'var(--ds-color-brand-dark)',
                        letterSpacing: '0.02em',
                      }}
                    >
                      RECOMMENDED FOR CLINIC OWNERS
                    </span>
                  </div>

                  <p style={{ fontSize: '13px', color: 'var(--ds-color-text-secondary)', margin: '4px 0 6px 0', lineHeight: 1.5 }}>
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
                      color: 'var(--ds-color-brand-dark)',
                      fontSize: '12px',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <HelpCircle size={13} />
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
                      padding: '8px 14px',
                      borderRadius: 'var(--ds-radius-md)',
                      backgroundColor: isClinicPackageSelected ? 'var(--ds-color-navy-900)' : '#FFFFFF',
                      color: isClinicPackageSelected ? '#FFFFFF' : 'var(--ds-color-text-primary)',
                      border: isClinicPackageSelected ? 'none' : '1px solid var(--ds-color-border-default)',
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
                      style={{ width: '16px', height: '16px', accentColor: 'var(--ds-color-brand-primary)', cursor: 'pointer' }}
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
                    paddingTop: '14px',
                    borderTop: '1px solid var(--ds-color-border-subtle)',
                  }}
                >
                  <label
                    style={{
                      display: 'block',
                      fontSize: '11px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      color: 'var(--ds-color-text-muted)',
                      marginBottom: '8px',
                    }}
                  >
                    Select Clinic Establishment Limit of Liability
                  </label>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '8px' }}>
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
                            padding: '10px 12px',
                            borderRadius: 'var(--ds-radius-md)',
                            border: isSelected
                              ? '2px solid var(--ds-color-brand-primary)'
                              : '1px solid var(--ds-color-border-default)',
                            backgroundColor: isSelected ? 'var(--ds-color-bg-surface)' : '#FFFFFF',
                            cursor: 'pointer',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: 600, fontSize: '13px', color: 'var(--ds-color-navy-900)' }}>
                              {tier.label}
                            </span>
                            {isSelected && <Check size={14} color="var(--ds-color-brand-dark)" />}
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--ds-color-brand-dark)', marginTop: '2px', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                            +RM {proRatedRate.toFixed(2)}
                            {isProrata && <span style={{ fontSize: '10px', color: 'var(--ds-color-text-muted)', fontWeight: 400 }}> ({daysCount}d)</span>}
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
      </section>

      {/* ========================================================
          SECTION 2: PERSON-IN-CHARGE (PIC) REGULATORY EVALUATION
          ======================================================== */}
      <section
        aria-labelledby="pic-evaluation-heading"
        style={{
          borderTop: '1px solid var(--ds-color-border-subtle)',
          paddingTop: '24px',
          marginBottom: '28px',
        }}
      >
        <div style={{ marginBottom: '16px' }}>
          <h2
            id="pic-evaluation-heading"
            style={{
              fontFamily: 'var(--ds-primitive-font-heading)',
              fontSize: '17px',
              fontWeight: 500,
              color: 'var(--ds-color-navy-900)',
              margin: '0 0 4px 0',
            }}
          >
            Person-In-Charge (PIC) Regulatory Evaluation
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--ds-color-text-secondary)', margin: 0 }}>
            Under the Private Healthcare Facilities & Services Act (PHFSA 1998), designated PICs carry statutory liability.
          </p>
        </div>

        {/* Question: PIC for own clinic? (FLD-QUOTE-PIC-OWN-011) */}
        <div style={{ marginBottom: '16px' }}>
          <label
            style={{
              display: 'block',
              fontFamily: 'var(--ds-primitive-font-body)',
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--ds-color-text-primary)',
              marginBottom: '8px',
            }}
          >
            Are you a designated Person-In-Charge (PIC) for your clinic? <span style={{ color: 'var(--ds-color-status-error)' }}>*</span>
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
                minHeight: '40px',
                padding: '0 16px',
                borderRadius: 'var(--ds-radius-md)',
                border: isPicOwnClinic === true
                  ? '2px solid var(--ds-color-brand-primary)'
                  : '1px solid var(--ds-color-border-default)',
                backgroundColor: isPicOwnClinic === true ? 'var(--ds-color-brand-light)' : '#FFFFFF',
                color: 'var(--ds-color-text-primary)',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                outline: 'none',
              }}
            >
              {isPicOwnClinic === true && <Check size={14} color="var(--ds-color-brand-dark)" />}
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
                minHeight: '40px',
                padding: '0 16px',
                borderRadius: 'var(--ds-radius-md)',
                border: isPicOwnClinic === false
                  ? '2px solid var(--ds-color-brand-primary)'
                  : '1px solid var(--ds-color-border-default)',
                backgroundColor: isPicOwnClinic === false ? 'var(--ds-color-brand-light)' : '#FFFFFF',
                color: 'var(--ds-color-text-primary)',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                outline: 'none',
              }}
            >
              {isPicOwnClinic === false && <Check size={14} color="var(--ds-color-brand-dark)" />}
              <span>No</span>
            </button>
          </div>
        </div>

        {/* Question: PIC with another establishment? (FLD-QUOTE-PIC-EXT-012) */}
        <div style={{ marginBottom: '20px' }}>
          <label
            style={{
              display: 'block',
              fontFamily: 'var(--ds-primitive-font-body)',
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--ds-color-text-primary)',
              marginBottom: '8px',
            }}
          >
            Are you a Person-In-Charge (PIC) with another establishment or healthcare facility? <span style={{ color: 'var(--ds-color-status-error)' }}>*</span>
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
                minHeight: '40px',
                padding: '0 16px',
                borderRadius: 'var(--ds-radius-md)',
                border: isPicAnotherClinic === true
                  ? '2px solid var(--ds-color-brand-primary)'
                  : '1px solid var(--ds-color-border-default)',
                backgroundColor: isPicAnotherClinic === true ? 'var(--ds-color-brand-light)' : '#FFFFFF',
                color: 'var(--ds-color-text-primary)',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                outline: 'none',
              }}
            >
              {isPicAnotherClinic === true && <Check size={14} color="var(--ds-color-brand-dark)" />}
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
                minHeight: '40px',
                padding: '0 16px',
                borderRadius: 'var(--ds-radius-md)',
                border: isPicAnotherClinic === false
                  ? '2px solid var(--ds-color-brand-primary)'
                  : '1px solid var(--ds-color-border-default)',
                backgroundColor: isPicAnotherClinic === false ? 'var(--ds-color-brand-light)' : '#FFFFFF',
                color: 'var(--ds-color-text-primary)',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                outline: 'none',
              }}
            >
              {isPicAnotherClinic === false && <Check size={14} color="var(--ds-color-brand-dark)" />}
              <span>No</span>
            </button>
          </div>
        </div>

        {/* Revealed PIC Add-on Card (Conditional if eligible) */}
        {isPicEligible && (
          <div
            style={{
              paddingLeft: '16px',
              borderLeft: '2px solid var(--ds-color-brand-primary)',
              marginTop: '16px',
            }}
          >
            <div
              style={{
                backgroundColor: isPicSelected ? 'var(--ds-color-brand-light)' : '#FFFFFF',
                borderRadius: 'var(--ds-radius-lg)',
                border: isPicSelected
                  ? '2px solid var(--ds-color-brand-primary)'
                  : '1px solid var(--ds-color-border-subtle)',
                padding: '18px 20px',
                transition: 'border-color 150ms ease, background-color 150ms ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px' }}>
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        fontFamily: 'var(--ds-primitive-font-heading)',
                        fontSize: '16px',
                        fontWeight: 500,
                        color: 'var(--ds-color-navy-900)',
                      }}
                    >
                      Person-In-Charge (PIC) Statutory Defense Extension
                    </span>
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 600,
                        padding: '1px 6px',
                        borderRadius: '4px',
                        backgroundColor: '#E6F7F8',
                        color: 'var(--ds-color-brand-dark)',
                        letterSpacing: '0.02em',
                      }}
                    >
                      RECOMMENDED FOR DESIGNATED PICS
                    </span>
                  </div>

                  <p style={{ fontSize: '13px', color: 'var(--ds-color-text-secondary)', margin: '4px 0 6px 0', lineHeight: 1.5 }}>
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
                      color: 'var(--ds-color-brand-dark)',
                      fontSize: '12px',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <HelpCircle size={13} />
                    <span>Why is this recommended?</span>
                  </button>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ds-color-navy-900)', marginBottom: '8px', fontVariantNumeric: 'tabular-nums' }}>
                    +RM {(quote?.picPremium ?? (150.0 * (isProrata ? daysCount / 365 : 1.0))).toFixed(2)}
                    <span style={{ fontSize: '11px', fontWeight: 400, color: 'var(--ds-color-text-muted)' }}>
                      {' '}({isProrata ? `${daysCount}d pro-rata` : 'Annual'})
                    </span>
                  </div>

                  <label
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      padding: '8px 14px',
                      borderRadius: 'var(--ds-radius-md)',
                      backgroundColor: isPicSelected ? 'var(--ds-color-navy-900)' : '#FFFFFF',
                      color: isPicSelected ? '#FFFFFF' : 'var(--ds-color-text-primary)',
                      border: isPicSelected ? 'none' : '1px solid var(--ds-color-border-default)',
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
                      style={{ width: '16px', height: '16px', accentColor: 'var(--ds-color-brand-primary)', cursor: 'pointer' }}
                    />
                    <span>{isPicSelected ? 'Cover Added' : 'Buy PIC Coverage'}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ========================================================
          SECTION 3: COMPLIMENTARY AUTOMATIC REINSTATEMENT (RULE-RST-01)
          ======================================================== */}
      <section
        style={{
          borderTop: '1px solid var(--ds-color-border-subtle)',
          paddingTop: '20px',
          marginBottom: '28px',
        }}
      >
        <div
          style={{
            padding: '14px 18px',
            borderRadius: 'var(--ds-radius-md)',
            backgroundColor: 'var(--ds-color-status-success-bg)',
            border: '1px solid var(--ds-color-status-success-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={18} color="var(--ds-color-status-success)" style={{ flexShrink: 0 }} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    fontFamily: 'var(--ds-primitive-font-heading)',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--ds-color-navy-900)',
                  }}
                >
                  Automatic Reinstatement Endorsement
                </span>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: '1px 6px',
                    borderRadius: '4px',
                    backgroundColor: 'var(--ds-color-status-success)',
                    color: '#FFFFFF',
                    letterSpacing: '0.02em',
                  }}
                >
                  COMPLIMENTARY INCLUDED
                </span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--ds-color-text-secondary)', margin: '2px 0 0 0', lineHeight: 1.4 }}>
                Your Insurance comes with complimentary Automatic Reinstatement now. If your aggregate indemnity limit is exhausted by a claim, Chubb automatically restores 1x aggregate limit with zero additional premium.
              </p>
            </div>
          </div>

          <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ds-color-status-success)', fontVariantNumeric: 'tabular-nums' }}>
            RM 0.00
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 4: FULFILLMENT CHOICE & DISPATCH PATH
          ======================================================== */}
      <section
        style={{
          borderTop: '1px solid var(--ds-color-border-subtle)',
          paddingTop: '24px',
          marginBottom: '32px',
        }}
      >
        <label
          style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--ds-color-text-primary)',
            marginBottom: '10px',
          }}
        >
          Select Your Application Next Step
        </label>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
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
              padding: '14px 16px',
              borderRadius: 'var(--ds-radius-md)',
              border: fulfillmentMode === 'buy_online'
                ? '2px solid var(--ds-color-brand-primary)'
                : '1px solid var(--ds-color-border-default)',
              backgroundColor: fulfillmentMode === 'buy_online' ? 'var(--ds-color-brand-light)' : '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                border: fulfillmentMode === 'buy_online'
                  ? '5px solid var(--ds-color-brand-primary)'
                  : '1.5px solid var(--ds-color-border-default)',
                marginTop: '2px',
                flexShrink: 0,
                backgroundColor: '#FFFFFF',
                boxSizing: 'border-box',
              }}
            />
            <div>
              <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--ds-color-navy-900)' }}>
                Buy Now (Complete Application Online)
              </div>
              <div style={{ fontSize: '12px', color: 'var(--ds-color-text-secondary)', marginTop: '2px', lineHeight: 1.4 }}>
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
              padding: '14px 16px',
              borderRadius: 'var(--ds-radius-md)',
              border: fulfillmentMode === 'email_quote'
                ? '2px solid var(--ds-color-brand-primary)'
                : '1px solid var(--ds-color-border-default)',
              backgroundColor: fulfillmentMode === 'email_quote' ? 'var(--ds-color-brand-light)' : '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                border: fulfillmentMode === 'email_quote'
                  ? '5px solid var(--ds-color-brand-primary)'
                  : '1.5px solid var(--ds-color-border-default)',
                marginTop: '2px',
                flexShrink: 0,
                backgroundColor: '#FFFFFF',
                boxSizing: 'border-box',
              }}
            />
            <div>
              <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--ds-color-navy-900)' }}>
                Email Me Quotation & Policy Wording
              </div>
              <div style={{ fontSize: '12px', color: 'var(--ds-color-text-secondary)', marginTop: '2px', lineHeight: 1.4 }}>
                Receive an official Chubb quotation schedule and policy wording PDF with a 30-day guaranteed rate lock.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          NAVIGATION & ACTION CONTROLS
          ======================================================== */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '20px',
          borderTop: '1px solid var(--ds-color-border-subtle)',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <button
          type="button"
          onClick={() => goToStage(1)}
          style={{
            minHeight: '44px',
            padding: '0 16px',
            borderRadius: 'var(--ds-radius-md)',
            border: '1px solid var(--ds-color-border-default)',
            backgroundColor: '#FFFFFF',
            color: 'var(--ds-color-text-primary)',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <ArrowLeft size={15} />
          <span>Edit Coverage Details</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            aria-label="Direct email quotation modal"
            onClick={() => setIsEmailModalOpen(true)}
            style={{
              minHeight: '44px',
              padding: '0 16px',
              borderRadius: 'var(--ds-radius-md)',
              border: '1px solid var(--ds-color-border-default)',
              backgroundColor: '#FFFFFF',
              color: 'var(--ds-color-navy-900)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Mail size={15} />
            <span>Email Quotation PDF</span>
          </button>

          <button
            type="button"
            onClick={handleProceed}
            disabled={isRecalculating}
            style={{
              minHeight: '48px',
              padding: '0 28px',
              borderRadius: 'var(--ds-radius-md)',
              backgroundColor: 'var(--ds-color-brand-primary)',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '15px',
              fontWeight: 600,
              cursor: isRecalculating ? 'not-allowed' : 'pointer',
              opacity: isRecalculating ? 0.7 : 1,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: 'var(--ds-shadow-sm)',
              transition: 'background-color 150ms ease',
            }}
          >
            <span>
              {fulfillmentMode === 'email_quote'
                ? 'Email Quotation PDF'
                : 'Proceed to Personal Details'}
            </span>
            <ArrowRight size={16} />
          </button>
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
