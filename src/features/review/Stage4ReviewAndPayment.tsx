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
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  RefreshCw,
  ArrowLeft,
  ArrowRight,
  FileText,
  AlertCircle,
  HelpCircle,
  Check,
  Info,
} from 'lucide-react';

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
  const [simulatedOutcome, setSimulatedOutcome] = useState<PaymentOutcomeStatus>('SUCCESS');

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
  const totalPayable = quote ? quote.totalPayable : 820.0;
  const netGross = quote ? quote.netTaxablePremium : 750.0;
  const sstAmount = quote ? quote.sstAmount : 60.0;
  const stampDuty = quote ? quote.stampDuty : 10.0;
  const discountAmount = quote ? quote.discountAmount : 0.0;
  const baseGross = quote ? quote.grossBasePremium : 750.0;
  const clinicAmount = quote?.clinicPremium || 0.0;
  const picAmount = quote?.picPremium || 0.0;
  const commissionAmount = Number((netGross * 0.10).toFixed(2));

  // Retroactive backdating detection
  const isBackdated = coverage.startDate && new Date(coverage.startDate) < new Date(new Date().setHours(0,0,0,0));

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto', paddingBottom: '48px' }}>
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
          Stage 4 of 4: Final Review & Authorize Payment
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
          Review Policy Details & Authorize Payment
        </h1>

        <p
          style={{
            fontSize: 'var(--ds-primitive-font-size-base)',
            color: 'var(--ds-color-text-secondary)',
            margin: 0,
            lineHeight: 1.6,
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
          padding: '12px 18px',
          borderRadius: 'var(--ds-primitive-radius-md)',
          backgroundColor: isQuoteExpired ? '#FEF2F2' : '#F0FDFA',
          border: isQuoteExpired ? '1px solid #FCA5A5' : '1px solid var(--ds-primitive-color-teal-200)',
          marginBottom: '24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Clock size={18} color={isQuoteExpired ? '#DC2626' : 'var(--ds-primitive-color-teal-700)'} />
          <div>
            <span
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: isQuoteExpired ? '#991B1B' : 'var(--ds-primitive-color-teal-900)',
              }}
            >
              {isQuoteExpired ? 'Quotation Stale / Rate Lock Expired' : 'Chubb 15-Minute Guaranteed Rate Lock'}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--ds-color-text-secondary)', display: 'block' }}>
              {isQuoteExpired
                ? 'Coverage or dates were changed. Please refresh quotation to re-bind authoritative rate.'
                : `Authoritative quotation ${quote?.quotationNumber || 'DS-2026-99412'} locked for: `}
              {!isQuoteExpired && (
                <strong style={{ color: 'var(--ds-primitive-color-teal-700)', fontFamily: 'var(--ds-primitive-font-mono)' }}>
                  {formatTimer(timeLeftMs)}
                </strong>
              )}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleRefreshQuote}
          disabled={isRefreshingQuote}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            fontSize: '12px',
            fontWeight: 600,
            borderRadius: 'var(--ds-primitive-radius-md)',
            backgroundColor: '#FFFFFF',
            color: 'var(--ds-primitive-color-navy-900)',
            border: '1px solid var(--ds-color-border-default)',
            cursor: isRefreshingQuote ? 'wait' : 'pointer',
            boxShadow: 'var(--ds-primitive-shadow-sm)',
          }}
        >
          <RefreshCw size={14} className={isRefreshingQuote ? 'animate-spin' : ''} />
          <span>{isRefreshingQuote ? 'Revalidating...' : 'Recalculate & Revalidate Quote'}</span>
        </button>
      </div>

      {formErrors.quote && (
        <div
          role="alert"
          style={{
            padding: '12px 16px',
            backgroundColor: '#FEF2F2',
            border: '1px solid #F87171',
            borderRadius: 'var(--ds-primitive-radius-md)',
            color: '#991B1B',
            fontSize: '13px',
            fontWeight: 500,
            marginBottom: '20px',
          }}
        >
          {formErrors.quote}
        </div>
      )}

      {/* SECTION 1: Executive Policy Summary Table */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--ds-color-border-subtle)',
          borderRadius: 'var(--ds-primitive-radius-lg)',
          overflow: 'hidden',
          marginBottom: '24px',
          boxShadow: 'var(--ds-primitive-shadow-sm)',
        }}
      >
        <div
          style={{
            padding: '16px 20px',
            backgroundColor: 'var(--ds-primitive-color-navy-900)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={20} color="var(--ds-primitive-color-teal-400)" />
            <h2
              style={{
                fontFamily: 'var(--ds-primitive-font-heading)',
                fontSize: '1.1rem',
                fontWeight: 500,
                margin: 0,
              }}
            >
              1. Policyholder & Practice Profile
            </h2>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={() => goToStage(3)}
              style={{
                fontSize: '12px',
                color: 'var(--ds-primitive-color-teal-300)',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Edit Particulars
            </button>
          </div>
        </div>

        <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', fontSize: '13px' }}>
          <div>
            <span style={{ display: 'block', color: 'var(--ds-color-text-muted)', fontSize: '11px', textTransform: 'uppercase' }}>
              Insured Medical Practitioner
            </span>
            <strong style={{ fontSize: '14px', color: 'var(--ds-primitive-color-navy-900)' }}>
              {doctorProfile.salutation} {doctorProfile.fullName || 'DR MUHAMMAD SALEEM BIN ABDULLAH'}
            </strong>
            <div style={{ color: 'var(--ds-color-text-secondary)', marginTop: '2px' }}>
              NRIC: {doctorProfile.nric || '850412-14-5231'} | Gender: {doctorProfile.gender || 'Male'}
            </div>
            <div style={{ color: 'var(--ds-color-text-secondary)' }}>
              MMC Full Registration No: <strong>{doctorProfile.mmcNumber || '54321'}</strong>
            </div>
          </div>

          <div>
            <span style={{ display: 'block', color: 'var(--ds-color-text-muted)', fontSize: '11px', textTransform: 'uppercase' }}>
              Specialization & Classification
            </span>
            <strong style={{ fontSize: '14px', color: 'var(--ds-primitive-color-navy-900)' }}>
              {coverage.classificationName || 'General Medical Practitioner'}
            </strong>
            <div style={{ color: 'var(--ds-color-text-secondary)', marginTop: '2px' }}>
              Limit of Indemnity: <strong style={{ color: 'var(--ds-primitive-color-teal-700)' }}>{coverage.limitFormatted || 'RM 1,000,000'}</strong>
            </div>
            <div style={{ color: 'var(--ds-color-text-secondary)' }}>
              Retroactive Date: {coverage.startDate || '01/11/2026'} (Continuous)
            </div>
          </div>

          <div>
            <span style={{ display: 'block', color: 'var(--ds-color-text-muted)', fontSize: '11px', textTransform: 'uppercase' }}>
              Period of Insurance
            </span>
            <strong style={{ fontSize: '14px', color: 'var(--ds-primitive-color-navy-900)' }}>
              {coverage.startDate} to {coverage.endDate}
            </strong>
            <div style={{ color: 'var(--ds-color-text-secondary)', marginTop: '2px' }}>
              Coverage Duration: {quote?.isProrata ? `${quote.daysCount || 365} Days (Pro-rata APC Alignment)` : 'Full 12-Month Annual Policy'}
            </div>
          </div>

          <div>
            <span style={{ display: 'block', color: 'var(--ds-color-text-muted)', fontSize: '11px', textTransform: 'uppercase' }}>
              Practice Facility & Clinic Bundling
            </span>
            <strong style={{ fontSize: '14px', color: 'var(--ds-primitive-color-navy-900)' }}>
              {doctorProfile.clinicalName || doctorProfile.practiceLocation || 'Pantai Hospital Kuala Lumpur'}
            </strong>
            <div style={{ color: 'var(--ds-color-text-secondary)', marginTop: '2px' }}>
              {coverage.clinic?.ownsClinic ? `Clinic Entity Protection Active (${doctorProfile.branches?.length || 0} Branch facility)` : 'Individual Indemnity Only'}
            </div>
            {doctorProfile.practiceAddress?.city && (
              <div style={{ color: 'var(--ds-color-text-secondary)' }}>
                {doctorProfile.practiceAddress.city}, {doctorProfile.practiceAddress.state}
              </div>
            )}
          </div>

          <div>
            <span style={{ display: 'block', color: 'var(--ds-color-text-muted)', fontSize: '11px', textTransform: 'uppercase' }}>
              Contact Details
            </span>
            <strong style={{ fontSize: '14px', color: 'var(--ds-primitive-color-navy-900)' }}>
              {doctorProfile.email || coverage.customerEmail || 'doctor@example.com'}
            </strong>
            <div style={{ color: 'var(--ds-color-text-secondary)', marginTop: '2px' }}>
              Mobile: {doctorProfile.mobileNumber || '0123456789'}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Complimentary Automatic Reinstatement Banner (RULE-RST-01) */}
      <div
        style={{
          padding: '16px 20px',
          borderRadius: 'var(--ds-primitive-radius-lg)',
          backgroundColor: '#F0FDFA',
          border: '1px solid var(--ds-primitive-color-teal-300)',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
        }}
      >
        <CheckCircle2 size={22} color="var(--ds-primitive-color-teal-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--ds-primitive-color-teal-900)' }}>
            Complimentary Automatic Reinstatement Included (Clause 2.4)
          </div>
          <div style={{ fontSize: '13px', color: 'var(--ds-primitive-color-teal-800)', lineHeight: 1.5, marginTop: '2px' }}>
            In the event of a valid claim exhausting your limit of liability, your full {coverage.limitFormatted || 'RM 1,000,000'} limit is automatically restored once for any subsequent unrelated malpractice claims occurring within the policy year at <strong>RM 0.00 additional cost</strong>.
          </div>
        </div>
      </div>

      {/* SECTION 3: Itemized Financial Breakdown & Commission Disclosure */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--ds-color-border-subtle)',
          borderRadius: 'var(--ds-primitive-radius-lg)',
          overflow: 'hidden',
          marginBottom: '24px',
          boxShadow: 'var(--ds-primitive-shadow-sm)',
        }}
      >
        <div
          style={{
            padding: '16px 20px',
            backgroundColor: 'var(--ds-primitive-color-navy-900)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} color="var(--ds-primitive-color-teal-400)" />
            <h2
              style={{
                fontFamily: 'var(--ds-primitive-font-heading)',
                fontSize: '1.1rem',
                fontWeight: 500,
                margin: 0,
              }}
            >
              2. Authoritative Premium & Statutory Tax Summary
            </h2>
          </div>
          <button
            type="button"
            onClick={() => goToStage(2)}
            style={{
              fontSize: '12px',
              color: 'var(--ds-primitive-color-teal-300)',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Edit Add-ons
          </button>
        </div>

        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
            {/* Base Practitioner Premium */}
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ds-primitive-color-navy-900)' }}>
              <span>
                Individual Indemnity Base ({coverage.classificationName || 'Physician'} — {coverage.limitFormatted || 'RM 1,000,000'})
                {quote?.isProrata && (
                  <span style={{ fontSize: '11px', color: 'var(--ds-color-text-muted)', display: 'block' }}>
                    Pro-rated for {quote.daysCount || 365} days coverage (Annual rate: RM {(quote.annualGrossEquivalent || baseGross).toFixed(2)})
                  </span>
                )}
              </span>
              <strong style={{ fontFamily: 'var(--ds-primitive-font-mono)' }}>RM {baseGross.toFixed(2)}</strong>
            </div>

            {/* Clinic Package Add-on */}
            {coverage.addons.clinicPackage && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ds-primitive-color-navy-900)' }}>
                <span>
                  Clinic Entity Protection ({coverage.clinic?.clinicLiabilityFormatted || 'RM 500,000'})
                  <span style={{ fontSize: '11px', color: 'var(--ds-color-text-muted)', display: 'block' }}>
                    {coverage.clinic?.clinicType === 'sole_proprietor' ? 'Sole Proprietorship' : 'Partnership / Sdn Bhd'}
                  </span>
                </span>
                <strong style={{ fontFamily: 'var(--ds-primitive-font-mono)' }}>RM {clinicAmount.toFixed(2)}</strong>
              </div>
            )}

            {/* PIC Coverage Add-on */}
            {coverage.addons.personInCharge && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ds-primitive-color-navy-900)' }}>
                <span>
                  Person-In-Charge (PIC) Clinical Governance Endorsement
                </span>
                <strong style={{ fontFamily: 'var(--ds-primitive-font-mono)' }}>
                  {picAmount > 0 ? `RM ${picAmount.toFixed(2)}` : 'RM 0.00 (Complimentary)'}
                </strong>
              </div>
            )}

            {/* Additional Branches Surcharges */}
            {doctorProfile.branches && doctorProfile.branches.length > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ds-primitive-color-navy-900)' }}>
                <span>
                  Additional Practice Branches ({doctorProfile.branches.length} facility)
                </span>
                <strong style={{ fontFamily: 'var(--ds-primitive-font-mono)' }}>
                  RM {(doctorProfile.branches.length * 100.0).toFixed(2)}
                </strong>
              </div>
            )}

            {/* Promotional Discount */}
            {discountAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ds-primitive-color-emerald-700)' }}>
                <span>
                  Partner Promotional Discount ({coverage.promoCode || 'MMA2026'})
                </span>
                <strong style={{ fontFamily: 'var(--ds-primitive-font-mono)' }}>- RM {discountAmount.toFixed(2)}</strong>
              </div>
            )}

            {/* Divider */}
            <div style={{ borderBottom: '1px solid var(--ds-color-border-subtle)', margin: '6px 0' }} />

            {/* Nett Taxable Premium */}
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ds-primitive-color-navy-800)' }}>
              <span>Nett Gross Premium (Taxable Subtotal)</span>
              <strong style={{ fontFamily: 'var(--ds-primitive-font-mono)' }}>RM {netGross.toFixed(2)}</strong>
            </div>

            {/* SST 8% */}
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ds-color-text-secondary)' }}>
              <span>Sales & Service Tax (SST 8.0%)</span>
              <span style={{ fontFamily: 'var(--ds-primitive-font-mono)' }}>RM {sstAmount.toFixed(2)}</span>
            </div>

            {/* Stamp Duty RM 10.00 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ds-color-text-secondary)' }}>
              <span>Statutory Stamp Duty (Inland Revenue Board / LHDN)</span>
              <span style={{ fontFamily: 'var(--ds-primitive-font-mono)' }}>RM {stampDuty.toFixed(2)}</span>
            </div>

            {/* Divider */}
            <div style={{ borderBottom: '2px solid var(--ds-primitive-color-navy-900)', margin: '6px 0' }} />

            {/* Final Total Payable */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '1.15rem', color: 'var(--ds-primitive-color-navy-900)' }}>
                  Total Premium Payable (MYR)
                </strong>
                <span style={{ fontSize: '11px', color: 'var(--ds-color-text-muted)', display: 'block' }}>
                  Includes SST (8%) & Statutory Stamp Duty
                </span>
              </div>
              <strong
                style={{
                  fontSize: '1.45rem',
                  fontFamily: 'var(--ds-primitive-font-mono)',
                  color: 'var(--ds-primitive-color-navy-900)',
                }}
              >
                RM {totalPayable.toFixed(2)}
              </strong>
            </div>

            {/* Bank Negara Malaysia Commission Disclosure */}
            <div
              style={{
                marginTop: '12px',
                padding: '10px 14px',
                backgroundColor: 'var(--ds-primitive-color-slate-50)',
                borderRadius: 'var(--ds-primitive-radius-md)',
                fontSize: '12px',
                color: 'var(--ds-color-text-secondary)',
                lineHeight: 1.5,
                border: '1px solid var(--ds-color-border-subtle)',
              }}
            >
              <strong>Bank Negara Malaysia (BNM) Intermediary Commission Disclosure:</strong> A commission of 10% (equivalent to <strong>RM {commissionAmount.toFixed(2)}</strong>) is paid by Chubb Insurance Malaysia Berhad to the approved distributor JA Assure Sdn Bhd and is included in the premium above.
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: Payment Channel Selection (Personal vs Corporate B2B) */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--ds-color-border-subtle)',
          borderRadius: 'var(--ds-primitive-radius-lg)',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: 'var(--ds-primitive-shadow-sm)',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--ds-primitive-font-heading)',
            fontSize: '1.15rem',
            fontWeight: 500,
            color: 'var(--ds-color-text-heading)',
            margin: '0 0 6px 0',
          }}
        >
          3. Select Authorized Payment Method
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--ds-color-text-secondary)', margin: '0 0 16px 0' }}>
          Payments are securely processed via PCI-DSS certified checkout gateways with 3D-Secure biometric and OTP protection.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
          {/* Option 1: Personal Card & Individual FPX */}
          <label
            style={{
              padding: '16px',
              borderRadius: 'var(--ds-primitive-radius-md)',
              border:
                selectedChannel === 'personal'
                  ? '2px solid var(--ds-primitive-color-teal-600)'
                  : '1px solid var(--ds-color-border-default)',
              backgroundColor: selectedChannel === 'personal' ? '#F0FDFA' : '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              transition: 'all 0.15s ease',
            }}
          >
            <input
              type="radio"
              name="paymentChannel"
              value="personal"
              checked={selectedChannel === 'personal'}
              onChange={() => setSelectedChannel('personal')}
              style={{ marginTop: '3px' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--ds-primitive-color-navy-900)' }}>
                <CreditCard size={18} color="var(--ds-primitive-color-teal-700)" />
                Personal Card / FPX Online Banking
              </div>
              <div style={{ fontSize: '12px', color: 'var(--ds-color-text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
                Instant authorization via Visa, Mastercard, FPX Individual Banking (Maybank2u, CIMB Clicks, Public Bank, etc.) or Touch 'n Go eWallet.
              </div>
              <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '10px', padding: '2px 6px', backgroundColor: '#FFFFFF', border: '1px solid var(--ds-color-border-default)', borderRadius: '4px', fontWeight: 600 }}>Visa</span>
                <span style={{ fontSize: '10px', padding: '2px 6px', backgroundColor: '#FFFFFF', border: '1px solid var(--ds-color-border-default)', borderRadius: '4px', fontWeight: 600 }}>Mastercard</span>
                <span style={{ fontSize: '10px', padding: '2px 6px', backgroundColor: '#FFFFFF', border: '1px solid var(--ds-color-border-default)', borderRadius: '4px', fontWeight: 600 }}>FPX B2C</span>
                <span style={{ fontSize: '10px', padding: '2px 6px', backgroundColor: '#FFFFFF', border: '1px solid var(--ds-color-border-default)', borderRadius: '4px', fontWeight: 600 }}>Touch 'n Go</span>
              </div>
            </div>
          </label>

          {/* Option 2: Business Banking / Corporate FPX */}
          <label
            style={{
              padding: '16px',
              borderRadius: 'var(--ds-primitive-radius-md)',
              border:
                selectedChannel === 'business'
                  ? '2px solid var(--ds-primitive-color-teal-600)'
                  : '1px solid var(--ds-color-border-default)',
              backgroundColor: selectedChannel === 'business' ? '#F0FDFA' : '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              transition: 'all 0.15s ease',
            }}
          >
            <input
              type="radio"
              name="paymentChannel"
              value="business"
              checked={selectedChannel === 'business'}
              onChange={() => setSelectedChannel('business')}
              style={{ marginTop: '3px' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--ds-primitive-color-navy-900)' }}>
                <Building size={18} color="var(--ds-primitive-color-teal-700)" />
                Corporate FPX / Business Banking
              </div>
              <div style={{ fontSize: '12px', color: 'var(--ds-color-text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
                For clinic entities, partnerships, and Sdn Bhd corporate bank accounts (Maybank2E, CIMB BizChannel, Public Bank Enterprise, RHB Reflex).
              </div>
              <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '10px', padding: '2px 6px', backgroundColor: '#FFFFFF', border: '1px solid var(--ds-color-border-default)', borderRadius: '4px', fontWeight: 600 }}>Maybank2E</span>
                <span style={{ fontSize: '10px', padding: '2px 6px', backgroundColor: '#FFFFFF', border: '1px solid var(--ds-color-border-default)', borderRadius: '4px', fontWeight: 600 }}>BizChannel</span>
                <span style={{ fontSize: '10px', padding: '2px 6px', backgroundColor: '#FFFFFF', border: '1px solid var(--ds-color-border-default)', borderRadius: '4px', fontWeight: 600 }}>FPX B2B</span>
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* SECTION 5: Statutory Legal Notices & Mandatory Affirmative Consents */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--ds-color-border-subtle)',
          borderRadius: 'var(--ds-primitive-radius-lg)',
          padding: '24px',
          marginBottom: '28px',
          boxShadow: 'var(--ds-primitive-shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <Lock size={18} color="var(--ds-primitive-color-navy-800)" />
          <h2
            style={{
              fontFamily: 'var(--ds-primitive-font-heading)',
              fontSize: '1.15rem',
              fontWeight: 500,
              color: 'var(--ds-color-text-heading)',
              margin: 0,
            }}
          >
            4. Statutory Disclosures & Legal Acknowledgments
          </h2>
        </div>

        {/* Verbatim PIDM Protection Notice (LEG-PIDM-001) */}
        <div
          style={{
            padding: '12px 14px',
            backgroundColor: 'var(--ds-primitive-color-slate-50)',
            borderRadius: 'var(--ds-primitive-radius-md)',
            fontSize: '12px',
            color: 'var(--ds-primitive-color-navy-800)',
            lineHeight: 1.5,
            border: '1px solid var(--ds-color-border-default)',
            marginBottom: '14px',
          }}
        >
          <strong>PIDM Protection Statement:</strong> The benefit(s) payable under eligible certificate/ policy/ product is(are) protected by PIDM up to limits. Please refer to PIDM’s TIPS Brochure or contact Chubb Insurance Malaysia Berhad or PIDM (visit <a href="https://www.pidm.gov.my" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ds-primitive-color-teal-700)', textDecoration: 'underline' }}>www.pidm.gov.my</a>).
        </div>

        {/* Verbatim Retroactive Backdate Clause 6.12 Notice if backdated (LEG-RETRO-002) */}
        {isBackdated && (
          <div
            style={{
              padding: '12px 14px',
              backgroundColor: '#FFFBEB',
              borderRadius: 'var(--ds-primitive-radius-md)',
              fontSize: '12px',
              color: '#92400E',
              lineHeight: 1.5,
              border: '1px solid #F59E0B',
              marginBottom: '14px',
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
              gap: '10px',
              fontSize: '13px',
              cursor: 'pointer',
              lineHeight: 1.5,
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
              style={{ marginTop: '3px' }}
            />
            <span style={{ color: 'var(--ds-primitive-color-navy-900)' }}>
              I have read, understood, and accept the Chubb Master Policy Wording, <a href="/assets/Product_Disclosure_Sheet_English.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ds-primitive-color-teal-700)', textDecoration: 'underline' }}>Product Disclosure Sheet (English)</a> / <a href="/assets/Product_Disclosure_Sheet_Malay.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ds-primitive-color-teal-700)', textDecoration: 'underline' }}>PDS (BM)</a>, and Terms & Conditions. <span style={{ color: '#DC2626' }}>*</span>
            </span>
          </label>
          {formErrors.consentPolicyWording && (
            <p style={{ color: '#DC2626', fontSize: '12px', margin: '4px 0 0 24px' }}>
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
              gap: '10px',
              fontSize: '13px',
              cursor: 'pointer',
              lineHeight: 1.5,
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
              style={{ marginTop: '3px' }}
            />
            <span style={{ color: 'var(--ds-primitive-color-navy-900)' }}>
              I confirm that all statements, answers, and clinical particulars given in this proposal are true, correct, and complete pursuant to the <strong>Duty of Disclosure under Schedule 9 of the Financial Services Act 2013 (FSA 2013)</strong>. <span style={{ color: '#DC2626' }}>*</span>
            </span>
          </label>
          {formErrors.consentDutyOfDisclosure && (
            <p style={{ color: '#DC2626', fontSize: '12px', margin: '4px 0 0 24px' }}>
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
              gap: '10px',
              fontSize: '13px',
              cursor: 'pointer',
              lineHeight: 1.5,
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
              style={{ marginTop: '3px' }}
            />
            <span style={{ color: 'var(--ds-primitive-color-navy-900)' }}>
              I consent to the collection, use, and disclosure of my personal data under the <strong>Personal Data Protection Act 2010 (PDPA)</strong> by Chubb Insurance Malaysia Berhad and JA Assure Sdn Bhd in accordance with Chubb’s Privacy Notice. <span style={{ color: '#DC2626' }}>*</span>
            </span>
          </label>
          {formErrors.consentPdpa && (
            <p style={{ color: '#DC2626', fontSize: '12px', margin: '4px 0 0 24px' }}>
              {formErrors.consentPdpa}
            </p>
          )}
        </div>
      </div>

      {paymentErrorMessage && (
        <div
          role="alert"
          style={{
            padding: '14px 18px',
            backgroundColor: '#FEF2F2',
            border: '1px solid #F87171',
            borderRadius: 'var(--ds-primitive-radius-md)',
            color: '#991B1B',
            fontSize: '13px',
            lineHeight: 1.5,
            marginBottom: '24px',
          }}
        >
          <strong>Payment Error:</strong> {paymentErrorMessage}
        </div>
      )}

      {/* Action Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          paddingTop: '20px',
          borderTop: '1px solid var(--ds-color-border-subtle)',
        }}
      >
        <button
          type="button"
          onClick={() => goToStage(3)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            borderRadius: 'var(--ds-primitive-radius-md)',
            backgroundColor: '#FFFFFF',
            color: 'var(--ds-primitive-color-navy-800)',
            border: '1px solid var(--ds-color-border-default)',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <ArrowLeft size={18} />
          Back to Underwriting
        </button>

        <button
          type="button"
          onClick={handleProceedPayment}
          disabled={paymentStatus === 'INITIATING'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '14px 36px',
            borderRadius: 'var(--ds-primitive-radius-md)',
            backgroundColor: 'var(--ds-primitive-color-teal-500)',
            color: '#FFFFFF',
            border: 'none',
            fontSize: '15px',
            fontWeight: 600,
            cursor: paymentStatus === 'INITIATING' ? 'wait' : 'pointer',
            boxShadow: 'var(--ds-primitive-shadow-sm)',
            transition: 'background-color 0.15s ease',
          }}
        >
          <Lock size={18} />
          <span>Authorize & Pay RM {totalPayable.toFixed(2)}</span>
          <ArrowRight size={18} />
        </button>
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
            backgroundColor: 'rgba(19, 39, 102, 0.75)',
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
              borderRadius: 'var(--ds-primitive-radius-lg)',
              maxWidth: '540px',
              width: '100%',
              padding: '28px',
              boxShadow: 'var(--ds-primitive-shadow-xl)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'var(--ds-primitive-color-teal-50)',
                color: 'var(--ds-primitive-color-teal-700)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}
            >
              <CreditCard size={28} />
            </div>

            <h2
              id="gateway-title"
              style={{
                fontFamily: 'var(--ds-primitive-font-heading)',
                fontSize: '1.35rem',
                fontWeight: 500,
                color: 'var(--ds-color-text-heading)',
                margin: '0 0 6px 0',
              }}
            >
              Secure Checkout Gateway (PCI-DSS)
            </h2>

            <p style={{ fontSize: '13px', color: 'var(--ds-color-text-secondary)', margin: '0 0 18px 0' }}>
              Hand-off to {selectedChannel === 'business' ? 'Corporate Internet Banking (B2B)' : 'Personal Card & FPX Gateway'}.
            </p>

            <div
              style={{
                padding: '14px 18px',
                backgroundColor: 'var(--ds-primitive-color-slate-50)',
                borderRadius: 'var(--ds-primitive-radius-md)',
                marginBottom: '20px',
                fontSize: '13px',
                textAlign: 'left',
                border: '1px solid var(--ds-color-border-subtle)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: 'var(--ds-color-text-muted)' }}>Payment Reference:</span>
                <strong style={{ fontFamily: 'var(--ds-primitive-font-mono)' }}>{activeTx?.transactionReference || 'TX-PENDING'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: 'var(--ds-color-text-muted)' }}>Quotation Token:</span>
                <span style={{ fontFamily: 'var(--ds-primitive-font-mono)', fontSize: '12px' }}>{quote?.quoteToken || 'QT-ACTIVE'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: 'var(--ds-color-text-muted)' }}>Idempotency Guard:</span>
                <span style={{ fontFamily: 'var(--ds-primitive-font-mono)', fontSize: '11px', color: 'var(--ds-primitive-color-emerald-700)' }}>ACTIVE (No duplicate charge)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--ds-color-border-subtle)', paddingTop: '6px' }}>
                <span style={{ fontWeight: 600, color: 'var(--ds-primitive-color-navy-900)' }}>Total Authorizing:</span>
                <strong style={{ color: 'var(--ds-primitive-color-navy-900)', fontSize: '15px', fontFamily: 'var(--ds-primitive-font-mono)' }}>RM {totalPayable.toFixed(2)}</strong>
              </div>
            </div>

            {/* Gateway Verification Simulation Actions */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ds-color-text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Simulate Gateway Verification Callback:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => handleCompleteGateway('SUCCESS')}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '6px',
                    backgroundColor: 'var(--ds-primitive-color-emerald-600)',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  ✓ Simulate Success (Authorize & Issue)
                </button>

                <button
                  type="button"
                  onClick={() => handleCompleteGateway('FAILED')}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '6px',
                    backgroundColor: '#DC2626',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  ✗ Simulate Card Decline / Failure
                </button>

                <button
                  type="button"
                  onClick={() => handleCompleteGateway('CANCELLED')}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    backgroundColor: '#FFFFFF',
                    color: 'var(--ds-color-text-secondary)',
                    border: '1px solid var(--ds-color-border-default)',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  Cancel by User
                </button>

                <button
                  type="button"
                  onClick={() => handleCompleteGateway('TIMED_OUT')}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    backgroundColor: '#FFFFFF',
                    color: '#D97706',
                    border: '1px solid #F59E0B',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  Simulate Gateway Timeout
                </button>
              </div>

              <div style={{ marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => handleCompleteGateway('UNCERTAIN')}
                  style={{
                    width: '100%',
                    padding: '6px 10px',
                    borderRadius: '4px',
                    backgroundColor: '#FFFBEB',
                    color: '#92400E',
                    border: '1px dashed #D97706',
                    fontSize: '11px',
                    cursor: 'pointer',
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
                color: 'var(--ds-color-text-muted)',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'underline',
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
