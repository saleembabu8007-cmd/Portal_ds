import React, { useState, useEffect } from 'react';
import { useWorkflow } from '../../core/state/WorkflowContext';
import { RatingService } from '../../core/api/ratingService';
import { PaymentService } from '../../core/api/paymentService';
import {
  PaymentChannel,
  PaymentOutcomeStatus,
  PolicyIssuanceDetails,
  PaymentTransaction,
} from '../../core/state/types';
import {
  ShieldCheck,
  CreditCard,
  Building,
  Lock,
  Clock,
  CheckCircle2,
  RefreshCw,
  ArrowLeft,
  ArrowRight,
  FileText,
  AlertCircle,
  Check,
  ExternalLink,
  Shield,
  HelpCircle,
} from 'lucide-react';
import { FieldGroup } from '../../components/form/FieldGroup';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/FeedbackModals';

export const Stage4ReviewAndPayment: React.FC = () => {
  const {
    coverage,
    doctorProfile,
    quote,
    isQuoteStale,
    setQuote,
    goToStage,
    confirmPolicy,
    setPaymentTransaction,
    setPolicyDetails,
    announce,
  } = useWorkflow();

  // Selected Payment Method Channel
  const [selectedChannel, setSelectedChannel] = useState<PaymentChannel>('personal');

  // Mandatory Affirmative Legal Consents
  const [consentPolicyWording, setConsentPolicyWording] = useState(false);
  const [consentDutyOfDisclosure, setConsentDutyOfDisclosure] = useState(false);
  const [consentPdpa, setConsentPdpa] = useState(false);

  // Validation & Error state
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  // Quote freshness & Countdown Timer
  const [timeLeftMs, setTimeLeftMs] = useState<number>(() => {
    if (!quote?.expiresAt) return 15 * 60 * 1000;
    return Math.max(0, quote.expiresAt - Date.now());
  });
  const [isRefreshingQuote, setIsRefreshingQuote] = useState(false);

  // Payment Gateway Modal & In-Flight State
  const [isGatewayOpen, setIsGatewayOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<PaymentOutcomeStatus>('IDLE');
  const [activeTx, setActiveTx] = useState<PaymentTransaction | null>(null);
  const [paymentErrorMessage, setPaymentErrorMessage] = useState<string | null>(null);

  // 15-Minute Rate Lock Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      if (quote?.expiresAt) {
        const remaining = Math.max(0, quote.expiresAt - Date.now());
        setTimeLeftMs(remaining);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [quote?.expiresAt]);

  const isQuoteExpired = timeLeftMs <= 0 || isQuoteStale;

  // Format countdown string MM:SS
  const formatTimer = (ms: number): string => {
    const totalSec = Math.floor(ms / 1000);
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Recalculate & Revalidate Quote
  const handleRefreshQuote = async () => {
    setIsRefreshingQuote(true);
    try {
      const resp = await RatingService.calculatePremium({
        classification_id: coverage.classificationId,
        liability_id: coverage.limitOfLiability,
        insurance_start_date: coverage.startDate,
        insurance_end_date: coverage.endDate,
        customer_email: doctorProfile.email || coverage.customerEmail || 'doctor@example.com',
        promo_code: coverage.promoCode,
        specialties: coverage.specialties,
        clause_6_12_accepted: coverage.clause612Accepted,
        do_you_own_clinic_status_value: coverage.clinic?.ownsClinic ? 1 : 0,
        clinic_type_value: coverage.clinic?.clinicType || undefined,
        employee_locum_status_value: coverage.clinic?.hiresLocums ? 1 : 0,
        pic_of_own_clinic_or_another_clinic_status_value: coverage.pic?.isPicOwnClinic ? 1 : 0,
        are_you_pic_of_any_clinic_status_value: coverage.pic?.isPicAnotherClinic ? 1 : 0,
        clinic_liability_id: coverage.clinic?.clinicLiabilityId,
        medical_establishment_package_value: coverage.addons.clinicPackage ? 1 : 0,
        pic_coverage_enable_status_value: coverage.addons.personInCharge ? 1 : 0,
        reinstatement_package_value: 1,
        branch_count: doctorProfile.branches ? doctorProfile.branches.length : 0,
      });

      if (resp && resp.pricing) {
        setQuote({
          grossBasePremium: resp.pricing.gross_base,
          annualGrossEquivalent: resp.pricing.annual_gross_equivalent,
          individualNet: resp.pricing.individual_net,
          specialtyMultiplier: 1.0,
          clinicPremium: resp.pricing.clinic_premium,
          clinicAnnualRate: resp.pricing.clinic_annual_rate,
          picPremium: resp.pricing.pic_premium,
          picAnnualRate: resp.pricing.pic_annual_rate,
          reinstatementPremium: resp.pricing.reinstatement_premium,
          addonsTotal: resp.pricing.addons_total,
          discountAmount: resp.pricing.discount_amount,
          netTaxablePremium: resp.pricing.net_gross,
          sstAmount: resp.pricing.sst_amount,
          stampDuty: resp.pricing.stamp_duty,
          totalPayable: resp.pricing.total_payable,
          quoteToken: resp.quote_token,
          quotationNumber: resp.quotation_number,
          issuedAt: Date.now(),
          expiresAt: resp.expires_at,
          isProrata: resp.pricing.is_prorata,
          daysCount: resp.pricing.days_count,
        });
        setTimeLeftMs(15 * 60 * 1000);
        announce('Quotation refreshed successfully. Active rate lock reset to 15 minutes.');
      }
    } catch {
      announce('Failed to refresh quotation. Please check your network connection.');
    } finally {
      setIsRefreshingQuote(false);
    }
  };

  // Validation function
  const validateReview = (): boolean => {
    const errs: Record<string, string> = {};

    if (isQuoteExpired) {
      errs.quote = 'Your quote has expired or become stale. Please refresh your quote to lock in your rate.';
    }

    if (!consentPolicyWording) {
      errs.consentPolicyWording = 'You must read and accept the Chubb Master Policy Wording, PDS, and Terms & Conditions.';
    }

    if (!consentDutyOfDisclosure) {
      errs.consentDutyOfDisclosure = 'You must confirm the pre-contractual Duty of Disclosure under Schedule 9 of the Financial Services Act 2013.';
    }

    if (!consentPdpa) {
      errs.consentPdpa = 'You must consent to the collection, use, and disclosure of personal data under the PDPA 2010.';
    }

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Initiate Payment Submission Handler
  const handleProceedPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);
    setPaymentErrorMessage(null);

    if (!validateReview()) {
      announce('Please review the highlighted required agreements before proceeding.');
      return;
    }

    if (!quote) return;

    try {
      setPaymentStatus('INITIATING');

      const initResp = await PaymentService.initiatePayment({
        quotationNumber: quote.quotationNumber || `DS-2026-${Math.floor(10000 + Math.random() * 90000)}`,
        quoteToken: quote.quoteToken,
        paymentChannel: selectedChannel,
        doctorProfile,
        coverage,
        pricing: quote,
      });

      const tx: PaymentTransaction = {
        idempotencyKey: initResp.idempotencyKey,
        transactionReference: initResp.transactionReference,
        quotationNumber: quote.quotationNumber || 'DS-2026-99412',
        quoteToken: quote.quoteToken,
        paymentChannel: selectedChannel,
        amount: quote.totalPayable,
        status: 'PENDING',
        initiatedAt: Date.now(),
      };

      setActiveTx(tx);
      setPaymentTransaction(tx);
      setPaymentStatus('PENDING');
      setIsGatewayOpen(true);
      announce(`Secure payment hand-off initialized. Reference: ${tx.transactionReference}`);
    } catch (err: any) {
      setPaymentStatus('FAILED');
      setPaymentErrorMessage(err.message || 'Payment initiation failed. Please try again.');
    }
  };

  // Simulate Gateway Handoff Callback Verification
  const handleCompleteGateway = async (targetOutcome: PaymentOutcomeStatus) => {
    if (!quote) return;

    const currentTx: PaymentTransaction = activeTx || {
      idempotencyKey: PaymentService.generateIdempotencyKey(),
      transactionReference: `TX-DS-${Date.now().toString(36).toUpperCase()}-001`,
      quotationNumber: quote.quotationNumber || 'DS-2026-99412',
      quoteToken: quote.quoteToken,
      paymentChannel: selectedChannel,
      amount: quote.totalPayable,
      status: 'PENDING',
      initiatedAt: Date.now(),
    };

    setPaymentStatus(targetOutcome);

    try {
      const verifyResp = await PaymentService.verifyPaymentStatus(
        {
          transactionReference: currentTx.transactionReference,
          quotationNumber: currentTx.quotationNumber,
          quoteToken: currentTx.quoteToken,
          simulateOutcome: targetOutcome,
        },
        {
          doctorProfile,
          coverage,
          quote,
          paymentChannel: selectedChannel,
        }
      );

      if (verifyResp.status === 'SUCCESS' && verifyResp.policyDetails) {
        setPaymentStatus('SUCCESS');
        setPolicyDetails(verifyResp.policyDetails);
        setPaymentTransaction({
          ...activeTx,
          status: 'SUCCESS',
          completedAt: Date.now(),
        });
        announce(`Payment authorized! Policy issued: ${verifyResp.policyDetails.policyNumber}`);
        setIsGatewayOpen(false);
        confirmPolicy(verifyResp.policyDetails);
      } else if (verifyResp.status === 'FAILED') {
        setIsGatewayOpen(false);
        setPaymentStatus('FAILED');
        setPaymentErrorMessage(verifyResp.errorMessage || 'Payment transaction was declined or failed. Please retry with another payment method.');
        setPaymentTransaction({
          ...activeTx,
          status: 'FAILED',
          errorMessage: verifyResp.errorMessage,
        });
      } else if (verifyResp.status === 'CANCELLED') {
        setIsGatewayOpen(false);
        setPaymentStatus('CANCELLED');
        setPaymentErrorMessage(verifyResp.errorMessage || 'Transaction cancelled by user.');
        setPaymentTransaction({
          ...activeTx,
          status: 'CANCELLED',
        });
      } else if (verifyResp.status === 'TIMED_OUT') {
        setIsGatewayOpen(false);
        setPaymentStatus('TIMED_OUT');
        setPaymentErrorMessage(verifyResp.errorMessage || 'Payment gateway session timed out. Please retry.');
        setPaymentTransaction({
          ...activeTx,
          status: 'TIMED_OUT',
        });
      } else if (verifyResp.status === 'UNCERTAIN') {
        setIsGatewayOpen(false);
        setPaymentStatus('UNCERTAIN');
        setPaymentErrorMessage(verifyResp.errorMessage || 'Settlement pending banking reconciliation. If your account was charged, please contact DoctorShield support.');
        setPaymentTransaction({
          ...activeTx,
          status: 'UNCERTAIN',
        });
      }
    } catch (err: any) {
      setPaymentStatus('FAILED');
      setPaymentErrorMessage(err.message || 'Verification failure.');
    }
  };

  // Calculate 10% Intermediary Commission for Statutory Disclosure
  const totalPayable = quote?.totalPayable ?? 820.0;
  const netGross = quote?.netTaxablePremium ?? 750.0;
  const sstAmount = quote?.sstAmount ?? 60.0;
  const stampDuty = quote?.stampDuty ?? 10.0;
  const discountAmount = quote?.discountAmount ?? 0.0;
  const baseGross = quote ? quote.grossBasePremium : 750.0;
  const clinicAmount = quote?.clinicPremium || 0.0;
  const picAmount = quote?.picPremium || 0.0;
  const commissionAmount = Number((netGross * 0.10).toFixed(2));

  // Retroactive backdating detection
  const isBackdated = coverage.startDate && new Date(coverage.startDate) < new Date(new Date().setHours(0, 0, 0, 0));

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto', paddingBottom: '48px' }}>
      {/* Stage Header */}
      <div style={{ marginBottom: '24px' }}>
        <div
          style={{
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--ds-color-brand-primary, #08A5B5)',
            fontWeight: 600,
            marginBottom: '6px',
          }}
        >
          Stage 4 of 4: Final Review & Authorize Payment
        </div>

        <h1
          style={{
            fontFamily: 'var(--ds-primitive-font-heading, "Kanit", sans-serif)',
            fontSize: '1.875rem',
            fontWeight: 500,
            color: 'var(--ds-color-text-heading, #132766)',
            margin: '0 0 8px 0',
            lineHeight: 1.25,
          }}
        >
          Review Policy Details & Authorize Payment
        </h1>

        <p
          style={{
            fontSize: 'var(--ds-primitive-font-size-base, 1rem)',
            color: 'var(--ds-color-text-secondary, #475569)',
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          Please verify your indemnity parameters, review statutory disclosures, and select your payment method.
        </p>
      </div>

      {/* 15-Minute Rate Lock Banner & Quoting Freshness Guard */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '14px 18px',
          borderRadius: 'var(--ds-primitive-radius-md, 6px)',
          backgroundColor: isQuoteExpired ? '#FEF2F2' : 'var(--ds-color-surface-card, #FFFFFF)',
          border: `1px solid ${isQuoteExpired ? '#FECACA' : 'var(--ds-color-border-subtle, #DFE6EC)'}`,
          marginBottom: '24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '6px',
              backgroundColor: isQuoteExpired ? '#FEE2E2' : 'var(--ds-color-surface-brand-tint, #F0FAFA)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Clock size={18} color={isQuoteExpired ? '#DC2626' : 'var(--ds-color-brand-primary, #08A5B5)'} />
          </div>
          <div>
            <span
              style={{
                fontSize: '13.5px',
                fontWeight: 600,
                color: isQuoteExpired ? '#991B1B' : 'var(--ds-color-text-heading, #132766)',
              }}
            >
              {isQuoteExpired ? 'Quotation Stale / Rate Lock Expired' : 'Chubb 15-Minute Guaranteed Rate Lock'}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--ds-color-text-secondary, #475569)', display: 'block', marginTop: '1px' }}>
              {isQuoteExpired
                ? 'Coverage or dates were changed. Please refresh quotation to re-bind authoritative rate.'
                : `Authoritative quotation ${quote?.quotationNumber || 'DS-2026-99412'} locked for: `}
              {!isQuoteExpired && (
                <strong style={{ color: 'var(--ds-color-brand-primary, #08A5B5)', fontFamily: 'var(--ds-primitive-font-mono, monospace)' }}>
                  {formatTimer(timeLeftMs)}
                </strong>
              )}
            </span>
          </div>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={handleRefreshQuote}
          disabled={isRefreshingQuote}
          leftIcon={<RefreshCw size={13} className={isRefreshingQuote ? 'animate-spin' : ''} />}
        >
          {isRefreshingQuote ? 'Revalidating...' : 'Recalculate & Revalidate Quote'}
        </Button>
      </div>

      {formErrors.quote && (
        <div
          role="alert"
          style={{
            padding: '12px 16px',
            backgroundColor: '#FEF2F2',
            border: '1px solid #FCA5A5',
            borderRadius: 'var(--ds-primitive-radius-md, 6px)',
            color: '#B91C1C',
            fontSize: '13px',
            fontWeight: 500,
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <AlertCircle size={16} />
          <span>{formErrors.quote}</span>
        </div>
      )}

      {/* SECTION 1: Policyholder & Practice Profile Summary */}
      <FieldGroup
        title="1. Policyholder & Practice Profile"
        description="Verify practitioner registration, practice locations, and continuous retroactive cover."
        action={
          <button
            type="button"
            onClick={() => goToStage(3)}
            style={{
              fontSize: '12.5px',
              color: 'var(--ds-color-text-link, #066F7B)',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              textDecoration: 'underline',
              padding: '4px 6px',
            }}
          >
            Edit Particulars
          </button>
        }
        style={{ marginBottom: '24px' }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', fontSize: '13px' }}>
          {/* Card: Doctor Profile */}
          <div
            style={{
              padding: '14px 16px',
              backgroundColor: 'var(--ds-primitive-color-slate-50, #F4F7F9)',
              borderRadius: 'var(--ds-primitive-radius-md, 6px)',
              border: '1px solid var(--ds-color-border-subtle, #DFE6EC)',
            }}
          >
            <span style={{ display: 'block', color: 'var(--ds-color-text-muted, #64748B)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
              Insured Medical Practitioner
            </span>
            <strong style={{ fontSize: '14px', color: 'var(--ds-color-text-heading, #132766)', display: 'block', marginTop: '2px' }}>
              {doctorProfile.salutation} {doctorProfile.fullName || 'Dr. Siti Aminah binti Razali'}
            </strong>
            <div style={{ color: 'var(--ds-color-text-secondary, #475569)', marginTop: '4px', fontSize: '12.5px' }}>
              NRIC: <strong>{doctorProfile.nric || '880512-14-5542'}</strong> | Gender: {doctorProfile.gender || 'Female'}
            </div>
            <div style={{ color: 'var(--ds-color-text-secondary, #475569)', marginTop: '2px', fontSize: '12.5px' }}>
              MMC Full Registration No: <strong>{doctorProfile.mmcNumber || '54321'}</strong>
            </div>
            {doctorProfile.taxIdentificationNumber && (
              <div style={{ color: 'var(--ds-color-text-secondary, #475569)', marginTop: '2px', fontSize: '12px' }}>
                LHDN TIN: {doctorProfile.taxIdentificationNumber}
              </div>
            )}
          </div>

          {/* Card: Specialization & Limits */}
          <div
            style={{
              padding: '14px 16px',
              backgroundColor: 'var(--ds-primitive-color-slate-50, #F4F7F9)',
              borderRadius: 'var(--ds-primitive-radius-md, 6px)',
              border: '1px solid var(--ds-color-border-subtle, #DFE6EC)',
            }}
          >
            <span style={{ display: 'block', color: 'var(--ds-color-text-muted, #64748B)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
              Specialization & Classification
            </span>
            <strong style={{ fontSize: '14px', color: 'var(--ds-color-text-heading, #132766)', display: 'block', marginTop: '2px' }}>
              {coverage.classificationName || 'General Medical Practitioner'}
            </strong>
            <div style={{ color: 'var(--ds-color-text-secondary, #475569)', marginTop: '4px', fontSize: '12.5px' }}>
              Limit of Indemnity: <strong style={{ color: 'var(--ds-color-brand-primary, #08A5B5)' }}>{coverage.limitFormatted || 'RM 1,000,000'}</strong>
            </div>
            <div style={{ color: 'var(--ds-color-text-secondary, #475569)', marginTop: '2px', fontSize: '12px' }}>
              Retroactive Date: {coverage.startDate || '01/01/2026'} (Continuous)
            </div>
          </div>

          {/* Card: Policy Period */}
          <div
            style={{
              padding: '14px 16px',
              backgroundColor: 'var(--ds-primitive-color-slate-50, #F4F7F9)',
              borderRadius: 'var(--ds-primitive-radius-md, 6px)',
              border: '1px solid var(--ds-color-border-subtle, #DFE6EC)',
            }}
          >
            <span style={{ display: 'block', color: 'var(--ds-color-text-muted, #64748B)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
              Period of Insurance
            </span>
            <strong style={{ fontSize: '14px', color: 'var(--ds-color-text-heading, #132766)', display: 'block', marginTop: '2px' }}>
              {coverage.startDate} to {coverage.endDate}
            </strong>
            <div style={{ color: 'var(--ds-color-text-secondary, #475569)', marginTop: '4px', fontSize: '12px' }}>
              Coverage Duration: {quote?.isProrata ? `${quote.daysCount || 365} Days (Pro-rata APC Alignment)` : 'Full 12-Month Annual Policy'}
            </div>
          </div>

          {/* Card: Practice Facility & Clinic */}
          <div
            style={{
              padding: '14px 16px',
              backgroundColor: 'var(--ds-primitive-color-slate-50, #F4F7F9)',
              borderRadius: 'var(--ds-primitive-radius-md, 6px)',
              border: '1px solid var(--ds-color-border-subtle, #DFE6EC)',
            }}
          >
            <span style={{ display: 'block', color: 'var(--ds-color-text-muted, #64748B)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
              Practice Facility & Clinic Bundling
            </span>
            <strong style={{ fontSize: '14px', color: 'var(--ds-color-text-heading, #132766)', display: 'block', marginTop: '2px' }}>
              {doctorProfile.clinicalName || doctorProfile.practiceLocation || 'Klinik Siti Aminah'}
            </strong>
            <div style={{ color: 'var(--ds-color-text-secondary, #475569)', marginTop: '4px', fontSize: '12px' }}>
              {coverage.clinic?.ownsClinic ? `Clinic Entity Protection Active (${doctorProfile.branches?.length || 0} Branch facility)` : 'Individual Indemnity Only'}
            </div>
            {doctorProfile.practiceAddress?.city && (
              <div style={{ color: 'var(--ds-color-text-secondary, #475569)', fontSize: '12px', marginTop: '2px' }}>
                {doctorProfile.practiceAddress.city}, {doctorProfile.practiceAddress.state}
              </div>
            )}
          </div>

          {/* Card: Contact Details */}
          <div
            style={{
              padding: '14px 16px',
              backgroundColor: 'var(--ds-primitive-color-slate-50, #F4F7F9)',
              borderRadius: 'var(--ds-primitive-radius-md, 6px)',
              border: '1px solid var(--ds-color-border-subtle, #DFE6EC)',
            }}
          >
            <span style={{ display: 'block', color: 'var(--ds-color-text-muted, #64748B)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
              Contact Details
            </span>
            <strong style={{ fontSize: '14px', color: 'var(--ds-color-text-heading, #132766)', display: 'block', marginTop: '2px' }}>
              {doctorProfile.email || coverage.customerEmail || 'dr.siti@klinikaminah.com'}
            </strong>
            <div style={{ color: 'var(--ds-color-text-secondary, #475569)', marginTop: '4px', fontSize: '12px' }}>
              Mobile: {doctorProfile.mobileNumber || doctorProfile.mobilePhone || '0123456789'}
            </div>
          </div>
        </div>
      </FieldGroup>

      {/* Complimentary Automatic Reinstatement Banner (RULE-RST-01) */}
      <div
        style={{
          padding: '16px 20px',
          borderRadius: 'var(--ds-primitive-radius-md, 6px)',
          backgroundColor: '#ECFDF5',
          border: '1px solid #A7F3D0',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
        }}
      >
        <CheckCircle2 size={20} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <div style={{ fontWeight: 600, fontSize: '13.5px', color: '#065E68' }}>
            Complimentary Automatic Reinstatement Included (Clause 2.4)
          </div>
          <div style={{ fontSize: '12.5px', color: '#047857', lineHeight: 1.5, marginTop: '2px' }}>
            In the event of a valid claim exhausting your limit of liability, your full {coverage.limitFormatted || 'RM 1,000,000'} limit is automatically restored once for any subsequent unrelated malpractice claims occurring within the policy year at <strong>RM 0.00 additional cost</strong>.
          </div>
        </div>
      </div>

      {/* SECTION 2: Itemized Financial Breakdown & Commission Disclosure */}
      <FieldGroup
        title="2. Authoritative Premium & Statutory Tax Summary"
        description="Comprehensive itemized breakdown underwritten by Chubb Insurance Malaysia Berhad."
        action={
          <button
            type="button"
            onClick={() => goToStage(2)}
            style={{
              fontSize: '12.5px',
              color: 'var(--ds-color-text-link, #066F7B)',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              textDecoration: 'underline',
              padding: '4px 6px',
            }}
          >
            Edit Add-ons
          </button>
        }
        style={{ marginBottom: '24px' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
          {/* Base Practitioner Premium */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', color: 'var(--ds-color-text-heading, #132766)' }}>
            <div>
              <span style={{ fontWeight: 500 }}>Individual Indemnity Base</span>
              <span style={{ fontSize: '12px', color: 'var(--ds-color-text-secondary, #475569)', display: 'block' }}>
                {coverage.classificationName || 'General Medical Practitioner'} ({coverage.limitFormatted || 'RM 1,000,000'})
                {quote?.isProrata && ` — Pro-rated for ${quote.daysCount || 365} days`}
              </span>
            </div>
            <strong style={{ fontFamily: 'var(--ds-primitive-font-mono, monospace)', fontVariantNumeric: 'tabular-nums' }}>
              RM {baseGross.toFixed(2)}
            </strong>
          </div>

          {/* Clinic Package Add-on */}
          {coverage.addons.clinicPackage && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', color: 'var(--ds-color-text-heading, #132766)' }}>
              <div>
                <span style={{ fontWeight: 500 }}>Clinic Entity Protection</span>
                <span style={{ fontSize: '12px', color: 'var(--ds-color-text-secondary, #475569)', display: 'block' }}>
                  {coverage.clinic?.clinicLiabilityFormatted || 'RM 500,000'} ({coverage.clinic?.clinicType === 'sole_proprietor' ? 'Sole Proprietorship' : 'Partnership / Sdn Bhd'})
                </span>
              </div>
              <strong style={{ fontFamily: 'var(--ds-primitive-font-mono, monospace)', fontVariantNumeric: 'tabular-nums' }}>
                RM {clinicAmount.toFixed(2)}
              </strong>
            </div>
          )}

          {/* PIC Coverage Add-on */}
          {coverage.addons.personInCharge && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', color: 'var(--ds-color-text-heading, #132766)' }}>
              <span style={{ fontWeight: 500 }}>Person-In-Charge (PIC) Clinical Governance Endorsement</span>
              <strong style={{ fontFamily: 'var(--ds-primitive-font-mono, monospace)', fontVariantNumeric: 'tabular-nums' }}>
                {picAmount > 0 ? `RM ${picAmount.toFixed(2)}` : 'RM 0.00 (Complimentary)'}
              </strong>
            </div>
          )}

          {/* Additional Branches Surcharges */}
          {doctorProfile.branches && doctorProfile.branches.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', color: 'var(--ds-color-text-heading, #132766)' }}>
              <span style={{ fontWeight: 500 }}>Additional Practice Branches ({doctorProfile.branches.length} facility)</span>
              <strong style={{ fontFamily: 'var(--ds-primitive-font-mono, monospace)', fontVariantNumeric: 'tabular-nums' }}>
                RM {(doctorProfile.branches.length * 100.0).toFixed(2)}
              </strong>
            </div>
          )}

          {/* Promotional Discount */}
          {discountAmount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', color: 'var(--ds-color-text-success, #065F46)' }}>
              <span style={{ fontWeight: 500 }}>Partner Promotional Discount ({coverage.promoCode || 'MMA2026'})</span>
              <strong style={{ fontFamily: 'var(--ds-primitive-font-mono, monospace)', fontVariantNumeric: 'tabular-nums' }}>
                - RM {discountAmount.toFixed(2)}
              </strong>
            </div>
          )}

          {/* Subtle Divider */}
          <div style={{ borderBottom: '1px solid var(--ds-color-border-subtle, #DFE6EC)', margin: '6px 0' }} />

          {/* Nett Taxable Premium */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', color: 'var(--ds-color-text-heading, #132766)' }}>
            <span style={{ fontWeight: 500 }}>Nett Gross Premium (Taxable Subtotal)</span>
            <strong style={{ fontFamily: 'var(--ds-primitive-font-mono, monospace)', fontVariantNumeric: 'tabular-nums' }}>
              RM {netGross.toFixed(2)}
            </strong>
          </div>

          {/* SST 8% */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', color: 'var(--ds-color-text-secondary, #475569)' }}>
            <span>Sales & Service Tax (SST 8.0%)</span>
            <span style={{ fontFamily: 'var(--ds-primitive-font-mono, monospace)', fontVariantNumeric: 'tabular-nums' }}>
              RM {sstAmount.toFixed(2)}
            </span>
          </div>

          {/* Stamp Duty RM 10.00 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', color: 'var(--ds-color-text-secondary, #475569)' }}>
            <span>Stamp Duty (Inland Revenue Board / LHDN)</span>
            <span style={{ fontFamily: 'var(--ds-primitive-font-mono, monospace)', fontVariantNumeric: 'tabular-nums' }}>
              RM {stampDuty.toFixed(2)}
            </span>
          </div>

          {/* Strong Final Divider */}
          <div style={{ borderBottom: '2px solid var(--ds-color-text-heading, #132766)', margin: '6px 0' }} />

          {/* Final Total Payable */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: '4px' }}>
            <div>
              <strong style={{ fontSize: '1.05rem', color: 'var(--ds-color-text-heading, #132766)' }}>
                Total Premium Payable
              </strong>
              <span style={{ fontSize: '12px', color: 'var(--ds-color-text-muted, #64748B)', display: 'block', marginTop: '2px' }}>
                Includes SST (8%) & Statutory Stamp Duty
              </span>
            </div>
            <strong
              style={{
                fontSize: '1.5rem',
                fontFamily: 'var(--ds-primitive-font-mono, monospace)',
                fontVariantNumeric: 'tabular-nums',
                color: 'var(--ds-color-text-heading, #132766)',
              }}
            >
              RM {totalPayable.toFixed(2)}
            </strong>
          </div>

          {/* Bank Negara Malaysia Commission Disclosure */}
          <div
            style={{
              marginTop: '12px',
              padding: '12px 14px',
              backgroundColor: 'var(--ds-primitive-color-slate-50, #F4F7F9)',
              borderRadius: 'var(--ds-primitive-radius-md, 6px)',
              fontSize: '12px',
              color: 'var(--ds-color-text-secondary, #475569)',
              lineHeight: 1.5,
              border: '1px solid var(--ds-color-border-subtle, #DFE6EC)',
            }}
          >
            <strong style={{ color: 'var(--ds-color-text-heading, #132766)' }}>Bank Negara Malaysia (BNM) Intermediary Commission Disclosure:</strong> A commission of 10% (equivalent to <strong>RM {commissionAmount.toFixed(2)}</strong>) is paid by Chubb Insurance Malaysia Berhad to the approved distributor JA Assure Sdn Bhd and is included in the premium above.
          </div>
        </div>
      </FieldGroup>

      {/* SECTION 3: Payment Channel Selection (Personal vs Corporate B2B) */}
      <FieldGroup
        title="3. Select Authorized Payment Method"
        description="Payments are securely processed via PCI-DSS certified checkout gateways with 3D-Secure biometric and OTP protection."
        style={{ marginBottom: '24px' }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {/* Option 1: Personal Card & Individual FPX */}
          <label
            style={{
              padding: '18px 20px',
              borderRadius: 'var(--ds-primitive-radius-md, 6px)',
              border:
                selectedChannel === 'personal'
                  ? '2px solid var(--ds-color-brand-primary, #08A5B5)'
                  : '1px solid var(--ds-color-border-default, #CBD5E1)',
              backgroundColor: selectedChannel === 'personal' ? 'var(--ds-color-surface-brand-tint, #F0FAFA)' : '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '14px',
              transition: 'all 0.15s ease',
              minHeight: '48px',
            }}
          >
            <input
              type="radio"
              name="paymentChannel"
              value="personal"
              checked={selectedChannel === 'personal'}
              onChange={() => setSelectedChannel('personal')}
              style={{ marginTop: '3px', accentColor: 'var(--ds-color-brand-primary, #08A5B5)', width: '18px', height: '18px' }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: 'var(--ds-color-text-heading, #132766)', fontSize: '14px' }}>
                <CreditCard size={18} color="var(--ds-color-brand-primary, #08A5B5)" />
                Personal Card / FPX Online Banking
              </div>
              <div style={{ fontSize: '12.5px', color: 'var(--ds-color-text-secondary, #475569)', marginTop: '4px', lineHeight: 1.4 }}>
                Instant authorization via Visa, Mastercard, FPX Individual Banking (Maybank2u, CIMB Clicks, Public Bank, etc.) or Touch 'n Go eWallet.
              </div>
              <div style={{ display: 'flex', gap: '6px', marginTop: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '11px', padding: '2px 8px', backgroundColor: '#FFFFFF', border: '1px solid var(--ds-color-border-subtle, #DFE6EC)', borderRadius: '4px', fontWeight: 600, color: '#334155' }}>Visa</span>
                <span style={{ fontSize: '11px', padding: '2px 8px', backgroundColor: '#FFFFFF', border: '1px solid var(--ds-color-border-subtle, #DFE6EC)', borderRadius: '4px', fontWeight: 600, color: '#334155' }}>Mastercard</span>
                <span style={{ fontSize: '11px', padding: '2px 8px', backgroundColor: '#FFFFFF', border: '1px solid var(--ds-color-border-subtle, #DFE6EC)', borderRadius: '4px', fontWeight: 600, color: '#334155' }}>FPX B2C</span>
                <span style={{ fontSize: '11px', padding: '2px 8px', backgroundColor: '#FFFFFF', border: '1px solid var(--ds-color-border-subtle, #DFE6EC)', borderRadius: '4px', fontWeight: 600, color: '#334155' }}>Touch 'n Go</span>
              </div>
            </div>
          </label>

          {/* Option 2: Business Banking / Corporate FPX */}
          <label
            style={{
              padding: '18px 20px',
              borderRadius: 'var(--ds-primitive-radius-md, 6px)',
              border:
                selectedChannel === 'business'
                  ? '2px solid var(--ds-color-brand-primary, #08A5B5)'
                  : '1px solid var(--ds-color-border-default, #CBD5E1)',
              backgroundColor: selectedChannel === 'business' ? 'var(--ds-color-surface-brand-tint, #F0FAFA)' : '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '14px',
              transition: 'all 0.15s ease',
              minHeight: '48px',
            }}
          >
            <input
              type="radio"
              name="paymentChannel"
              value="business"
              checked={selectedChannel === 'business'}
              onChange={() => setSelectedChannel('business')}
              style={{ marginTop: '3px', accentColor: 'var(--ds-color-brand-primary, #08A5B5)', width: '18px', height: '18px' }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: 'var(--ds-color-text-heading, #132766)', fontSize: '14px' }}>
                <Building size={18} color="var(--ds-color-brand-primary, #08A5B5)" />
                Corporate FPX / Business Banking
              </div>
              <div style={{ fontSize: '12.5px', color: 'var(--ds-color-text-secondary, #475569)', marginTop: '4px', lineHeight: 1.4 }}>
                For clinic entities, partnerships, and Sdn Bhd corporate bank accounts (Maybank2E, CIMB BizChannel, Public Bank Enterprise, RHB Reflex).
              </div>
              <div style={{ display: 'flex', gap: '6px', marginTop: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '11px', padding: '2px 8px', backgroundColor: '#FFFFFF', border: '1px solid var(--ds-color-border-subtle, #DFE6EC)', borderRadius: '4px', fontWeight: 600, color: '#334155' }}>Maybank2E</span>
                <span style={{ fontSize: '11px', padding: '2px 8px', backgroundColor: '#FFFFFF', border: '1px solid var(--ds-color-border-subtle, #DFE6EC)', borderRadius: '4px', fontWeight: 600, color: '#334155' }}>BizChannel</span>
                <span style={{ fontSize: '11px', padding: '2px 8px', backgroundColor: '#FFFFFF', border: '1px solid var(--ds-color-border-subtle, #DFE6EC)', borderRadius: '4px', fontWeight: 600, color: '#334155' }}>FPX B2B</span>
              </div>
            </div>
          </label>
        </div>
      </FieldGroup>

      {/* SECTION 4: Statutory Legal Notices & Mandatory Affirmative Consents */}
      <FieldGroup
        title="4. Statutory Disclosures & Legal Acknowledgments"
        description="Statutory disclosures mandated by Bank Negara Malaysia and the Financial Services Act 2013."
        style={{ marginBottom: '28px' }}
      >
        {/* Verbatim PIDM Protection Notice (LEG-PIDM-001) */}
        <div
          style={{
            padding: '12px 14px',
            backgroundColor: 'var(--ds-primitive-color-slate-50, #F4F7F9)',
            borderRadius: 'var(--ds-primitive-radius-md, 6px)',
            fontSize: '12px',
            color: 'var(--ds-color-text-secondary, #475569)',
            lineHeight: 1.5,
            border: '1px solid var(--ds-color-border-subtle, #DFE6EC)',
            marginBottom: '16px',
          }}
        >
          <strong style={{ color: 'var(--ds-color-text-heading, #132766)' }}>PIDM Protection Statement:</strong> The benefit(s) payable under eligible certificate/ policy/ product is(are) protected by PIDM up to limits. Please refer to PIDM’s TIPS Brochure or contact Chubb Insurance Malaysia Berhad or PIDM (visit <a href="https://www.pidm.gov.my" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ds-color-brand-primary, #08A5B5)', textDecoration: 'underline' }}>www.pidm.gov.my</a>).
        </div>

        {/* Verbatim Retroactive Backdate Clause 6.12 Notice if backdated (LEG-RETRO-002) */}
        {isBackdated && (
          <div
            style={{
              padding: '12px 14px',
              backgroundColor: '#FFFBEB',
              borderRadius: 'var(--ds-primitive-radius-md, 6px)',
              fontSize: '12px',
              color: '#92400E',
              lineHeight: 1.5,
              border: '1px solid #F59E0B',
              marginBottom: '16px',
            }}
          >
            <strong>Clause 6.12 Non-Continuous Retroactive Coverage Notice:</strong> Pursuant to Clause 6.12 Licensing of Medical Professionals & Maintenance of Records under this Policy, I hereby acknowledge that Chubb shall not be liable for any Loss or any other payment under this Policy directly or indirectly caused by, arising out of or in any way connected with any Medical Incident occurring from {coverage.startDate} until {new Date().toLocaleDateString('en-GB')}.
          </div>
        )}

        {/* Mandatory Affirmative Consent Checkbox 1: Master Policy Wording & PDS (FLD-REV-CONS-070) */}
        <div style={{ marginBottom: '14px' }}>
          <label
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              fontSize: '13px',
              cursor: 'pointer',
              lineHeight: 1.5,
              padding: '6px 0',
              minHeight: '44px',
            }}
          >
            <input
              type="checkbox"
              id="consent_policy_wording"
              checked={consentPolicyWording}
              onChange={(e) => {
                setConsentPolicyWording(e.target.checked);
                if (e.target.checked) {
                  setFormErrors((prev) => {
                    const next = { ...prev };
                    delete next.consentPolicyWording;
                    return next;
                  });
                }
              }}
              style={{ marginTop: '3px', accentColor: 'var(--ds-color-brand-primary, #08A5B5)', width: '18px', height: '18px', flexShrink: 0 }}
            />
            <span style={{ color: 'var(--ds-color-text-heading, #132766)' }}>
              I have read, understood, and accept the Chubb Master Policy Wording, <a href="/assets/Product_Disclosure_Sheet_English.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ds-color-brand-primary, #08A5B5)', textDecoration: 'underline' }}>Product Disclosure Sheet (English)</a> / <a href="/assets/Product_Disclosure_Sheet_Malay.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ds-color-brand-primary, #08A5B5)', textDecoration: 'underline' }}>PDS (BM)</a>, and Terms & Conditions. <span style={{ color: '#B91C1C' }}>*</span>
            </span>
          </label>
          {formErrors.consentPolicyWording && (
            <p style={{ color: '#B91C1C', fontSize: '12px', margin: '4px 0 0 30px' }}>
              {formErrors.consentPolicyWording}
            </p>
          )}
        </div>

        {/* Mandatory Affirmative Consent Checkbox 2: Duty of Disclosure (FLD-REV-CONS-071) */}
        <div style={{ marginBottom: '14px' }}>
          <label
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              fontSize: '13px',
              cursor: 'pointer',
              lineHeight: 1.5,
              padding: '6px 0',
              minHeight: '44px',
            }}
          >
            <input
              type="checkbox"
              id="consent_duty_of_disclosure"
              checked={consentDutyOfDisclosure}
              onChange={(e) => {
                setConsentDutyOfDisclosure(e.target.checked);
                if (e.target.checked) {
                  setFormErrors((prev) => {
                    const next = { ...prev };
                    delete next.consentDutyOfDisclosure;
                    return next;
                  });
                }
              }}
              style={{ marginTop: '3px', accentColor: 'var(--ds-color-brand-primary, #08A5B5)', width: '18px', height: '18px', flexShrink: 0 }}
            />
            <span style={{ color: 'var(--ds-color-text-heading, #132766)' }}>
              I confirm that all statements, answers, and clinical particulars given in this proposal are true, correct, and complete pursuant to the <strong>Duty of Disclosure under Schedule 9 of the Financial Services Act 2013 (FSA 2013)</strong>. <span style={{ color: '#B91C1C' }}>*</span>
            </span>
          </label>
          {formErrors.consentDutyOfDisclosure && (
            <p style={{ color: '#B91C1C', fontSize: '12px', margin: '4px 0 0 30px' }}>
              {formErrors.consentDutyOfDisclosure}
            </p>
          )}
        </div>

        {/* Mandatory Affirmative Consent Checkbox 3: PDPA 2010 Consent (FLD-REV-CONS-072) */}
        <div>
          <label
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              fontSize: '13px',
              cursor: 'pointer',
              lineHeight: 1.5,
              padding: '6px 0',
              minHeight: '44px',
            }}
          >
            <input
              type="checkbox"
              id="consent_pdpa"
              checked={consentPdpa}
              onChange={(e) => {
                setConsentPdpa(e.target.checked);
                if (e.target.checked) {
                  setFormErrors((prev) => {
                    const next = { ...prev };
                    delete next.consentPdpa;
                    return next;
                  });
                }
              }}
              style={{ marginTop: '3px', accentColor: 'var(--ds-color-brand-primary, #08A5B5)', width: '18px', height: '18px', flexShrink: 0 }}
            />
            <span style={{ color: 'var(--ds-color-text-heading, #132766)' }}>
              I consent to the collection, use, and disclosure of my personal data under the <strong>Personal Data Protection Act 2010 (PDPA)</strong> by Chubb Insurance Malaysia Berhad and JA Assure Sdn Bhd in accordance with Chubb’s Privacy Notice. <span style={{ color: '#B91C1C' }}>*</span>
            </span>
          </label>
          {formErrors.consentPdpa && (
            <p style={{ color: '#B91C1C', fontSize: '12px', margin: '4px 0 0 30px' }}>
              {formErrors.consentPdpa}
            </p>
          )}
        </div>
      </FieldGroup>

      {paymentErrorMessage && (
        <div
          role="alert"
          style={{
            padding: '14px 18px',
            backgroundColor: '#FEF2F2',
            border: '1px solid #FECACA',
            borderRadius: 'var(--ds-primitive-radius-md, 6px)',
            color: '#B91C1C',
            fontSize: '13px',
            lineHeight: 1.5,
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <AlertCircle size={18} style={{ flexShrink: 0 }} />
          <div>
            <strong>Payment Error:</strong> {paymentErrorMessage}
          </div>
        </div>
      )}

      {/* Action Bar */}
      <div
        className="ds-action-bar-responsive"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          paddingTop: '20px',
          borderTop: '1px solid var(--ds-color-border-subtle, #DFE6EC)',
        }}
      >
        <Button
          variant="secondary"
          size="md"
          className="ds-btn-mobile-full"
          onClick={() => goToStage(3)}
          leftIcon={<ArrowLeft size={16} />}
        >
          Back to Underwriting
        </Button>

        <Button
          variant="teal"
          size="md"
          className="ds-btn-mobile-full"
          onClick={handleProceedPayment}
          disabled={paymentStatus === 'INITIATING'}
          loading={paymentStatus === 'INITIATING'}
          leftIcon={<Lock size={16} />}
          rightIcon={<ArrowRight size={16} />}
        >
          Authorize & Pay RM {totalPayable.toFixed(2)}
        </Button>
      </div>

      {/* SECURE PCI-DSS GATEWAY HANDOFF & SIMULATION MODAL */}
      {isGatewayOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="gateway-title"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(19, 39, 102, 0.6)',
            backdropFilter: 'blur(3px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--ds-primitive-radius-lg, 10px)',
              maxWidth: '520px',
              width: '100%',
              padding: '28px',
              boxShadow: 'var(--ds-primitive-shadow-2xl, 0 25px 50px -12px rgba(0, 0, 0, 0.25))',
              textAlign: 'center',
              border: '1px solid var(--ds-color-border-subtle, #DFE6EC)',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'var(--ds-color-surface-brand-tint, #F0FAFA)',
                color: 'var(--ds-color-brand-primary, #08A5B5)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '14px',
                border: '1px solid var(--ds-primitive-color-teal-200, #AEE7EB)',
              }}
            >
              <CreditCard size={24} />
            </div>

            <h2
              id="gateway-title"
              style={{
                fontFamily: 'var(--ds-primitive-font-heading, "Kanit", sans-serif)',
                fontSize: '1.25rem',
                fontWeight: 500,
                color: 'var(--ds-color-text-heading, #132766)',
                margin: '0 0 6px 0',
              }}
            >
              Secure Checkout Gateway (PCI-DSS)
            </h2>

            <p style={{ fontSize: '13px', color: 'var(--ds-color-text-secondary, #475569)', margin: '0 0 16px 0' }}>
              Hand-off to {selectedChannel === 'business' ? 'Corporate Internet Banking (B2B)' : 'Personal Card & FPX Gateway'}.
            </p>

            <div
              style={{
                padding: '14px 16px',
                backgroundColor: 'var(--ds-primitive-color-slate-50, #F4F7F9)',
                borderRadius: 'var(--ds-primitive-radius-md, 6px)',
                marginBottom: '20px',
                fontSize: '12.5px',
                textAlign: 'left',
                border: '1px solid var(--ds-color-border-subtle, #DFE6EC)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: 'var(--ds-color-text-muted, #64748B)' }}>Payment Reference:</span>
                <strong style={{ fontFamily: 'var(--ds-primitive-font-mono, monospace)' }}>{activeTx?.transactionReference || 'TX-PENDING'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: 'var(--ds-color-text-muted, #64748B)' }}>Quotation Token:</span>
                <span style={{ fontFamily: 'var(--ds-primitive-font-mono, monospace)', fontSize: '12px' }}>{quote?.quoteToken || 'QT-ACTIVE'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: 'var(--ds-color-text-muted, #64748B)' }}>Idempotency Guard:</span>
                <span style={{ fontFamily: 'var(--ds-primitive-font-mono, monospace)', fontSize: '11px', color: 'var(--ds-color-text-success, #065F46)', fontWeight: 600 }}>ACTIVE (No duplicate charge)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--ds-color-border-subtle, #DFE6EC)', paddingTop: '8px', marginTop: '4px' }}>
                <span style={{ fontWeight: 600, color: 'var(--ds-color-text-heading, #132766)' }}>Total Authorizing:</span>
                <strong style={{ color: 'var(--ds-color-text-heading, #132766)', fontSize: '14.5px', fontFamily: 'var(--ds-primitive-font-mono, monospace)' }}>RM {totalPayable.toFixed(2)}</strong>
              </div>
            </div>

            {/* Gateway Verification Simulation Actions */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--ds-color-text-muted, #64748B)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Simulate Gateway Verification Callback:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                <Button
                  variant="teal"
                  size="sm"
                  onClick={() => handleCompleteGateway('SUCCESS')}
                  style={{ fontSize: '12.5px', padding: '8px 12px' }}
                >
                  ✓ Simulate Success (Authorize & Issue)
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleCompleteGateway('FAILED')}
                  style={{ fontSize: '12.5px', padding: '8px 12px' }}
                >
                  ✗ Simulate Card Decline / Failure
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleCompleteGateway('CANCELLED')}
                  style={{ fontSize: '12px', padding: '8px 12px' }}
                >
                  Cancel by User
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleCompleteGateway('TIMED_OUT')}
                  style={{ fontSize: '12px', padding: '8px 12px', color: '#D97706', borderColor: '#F59E0B' }}
                >
                  Simulate Gateway Timeout
                </Button>
              </div>

              <div style={{ marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => handleCompleteGateway('UNCERTAIN')}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: 'var(--ds-primitive-radius-md, 6px)',
                    backgroundColor: '#FFFBEB',
                    color: '#92400E',
                    border: '1px dashed #D97706',
                    fontSize: '11.5px',
                    cursor: 'pointer',
                    fontWeight: 500,
                  }}
                >
                  Simulate Pending Settlement / Uncertain Webhook
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsGatewayOpen(false);
                setPaymentStatus('IDLE');
              }}
              style={{
                fontSize: '12px',
                color: 'var(--ds-color-text-muted, #64748B)',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'underline',
                padding: '4px',
              }}
            >
              Close and Return to Review Screen
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
