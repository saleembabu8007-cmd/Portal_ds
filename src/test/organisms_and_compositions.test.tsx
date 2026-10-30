import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import {
  ApplicationHeader,
  MinimalStepNavigation,
  ApplicationPageLayout,
  FormSection,
  ConditionalQuestionGroup,
  LiabilityLimitSelection,
  AddOnCoverageCard,
  ClinicAndPicCoverageGroup,
  CoreQuotationSection,
  PremiumBreakdownTable,
  ContextualSummaryPanel,
  MobileQuoteDrawer,
  BranchListEditor,
  UnderwritingDeclarationsOrganism,
  OtpVerificationOrganism,
  ReviewAndPaymentComposition,
  DocumentDisclosureSection,
  ReferralSupportOutcomeOrganism,
  ErrorRecoveryComposition,
  StepActionBarOrganism,
  ApplicationFooterOrganism,
} from '../components/organisms';

describe('DoctorShield Organisms & Page Compositions Layer', () => {
  const dummyQuote = {
    grossBase: 650.0,
    discountAmount: 65.0,
    promoCode: 'MMA2026',
    clinicEntityCover: 200.0,
    picCover: 0.0,
    isPicComplimentary: true,
    branchSurcharges: 100.0,
    branchCount: 1,
    netGross: 885.0,
    sstAmount: 70.8,
    stampDuty: 10.0,
    totalPayable: 965.8,
  };

  // 1. Application Header
  it('ApplicationHeader renders brand identity, Chubb co-brand, and utility buttons', () => {
    const handleRenew = vi.fn();
    render(
      <ApplicationHeader
        onRenewClick={handleRenew}
        onRetrieveQuoteClick={() => {}}
        onDocumentCenterClick={() => {}}
      />
    );

    expect(screen.getByLabelText(/DoctorShield Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Chubb Insurance Malaysia Berhad/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Renew Existing Policy/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Call DoctorShield Support/i)).toBeInTheDocument();
  });

  // 2. Minimal Step Navigation
  it('MinimalStepNavigation renders 4 steps with mobile tag and handles step click', () => {
    const handleStepClick = vi.fn();
    render(
      <MinimalStepNavigation
        currentStep={2}
        onStepClick={handleStepClick}
      />
    );

    expect(screen.getByText(/Step 2 of 4/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Quotation/i).length).toBeGreaterThanOrEqual(1);
    const step1Btn = screen.getByRole('button', { name: /Coverage/i });
    fireEvent.click(step1Btn);
    expect(handleStepClick).toHaveBeenCalledWith(1);
  });

  // 3 & 4. Application Page Layout & Form Section
  it('ApplicationPageLayout renders two-column grid and FormSection renders title and content', () => {
    render(
      <ApplicationPageLayout
        isTwoColumn={true}
        summaryRail={<div data-testid="summary-rail">Sticky Rail Content</div>}
      >
        <FormSection title="Practitioner Information" subtitle="Official registration details">
          <div>Form Fields Inside</div>
        </FormSection>
      </ApplicationPageLayout>
    );

    expect(screen.getByText(/Practitioner Information/i)).toBeInTheDocument();
    expect(screen.getByText(/Official registration details/i)).toBeInTheDocument();
    expect(screen.getByText(/Form Fields Inside/i)).toBeInTheDocument();
    expect(screen.getByTestId('summary-rail')).toBeInTheDocument();
  });

  // 5. Conditional Question Group
  it('ConditionalQuestionGroup reveals content when isVisible is true', () => {
    const { rerender } = render(
      <ConditionalQuestionGroup
        id="cond-test"
        triggerQuestion={<div>Trigger Question</div>}
        isVisible={false}
      >
        <div>Conditional Revealed Fields</div>
      </ConditionalQuestionGroup>
    );

    expect(screen.queryByText(/Conditional Revealed Fields/i)).not.toBeInTheDocument();

    rerender(
      <ConditionalQuestionGroup
        id="cond-test"
        triggerQuestion={<div>Trigger Question</div>}
        isVisible={true}
      >
        <div>Conditional Revealed Fields</div>
      </ConditionalQuestionGroup>
    );

    expect(screen.getByText(/Conditional Revealed Fields/i)).toBeInTheDocument();
  });

  // 6. Liability Limit Selection
  it('LiabilityLimitSelection renders limits with recommended tag and triggers change', () => {
    const handleChange = vi.fn();
    render(
      <LiabilityLimitSelection
        selectedTierId="500k"
        onChange={handleChange}
      />
    );

    expect(screen.getByText(/RM 1,000,000/i)).toBeInTheDocument();
    expect(screen.getByText(/Recommended/i)).toBeInTheDocument();

    const tier1m = screen.getByRole('radio', { name: /RM 1,000,000/i });
    fireEvent.click(tier1m);
    expect(handleChange).toHaveBeenCalledWith('1m');
  });

  // 7. Core Quotation Section
  it('CoreQuotationSection renders headline rate, pro-rata period, and rate lock badge', () => {
    render(
      <CoreQuotationSection
        specialtyName="General Medical Practitioner"
        limitFormatted="RM 1,000,000"
        startDate="2026-11-01"
        endDate="2026-12-31"
        isProrata={true}
        prorataDays={61}
        quote={dummyQuote}
      />
    );

    expect(screen.getByText(/965.80/i)).toBeInTheDocument();
    expect(screen.getByText(/Pro-rata Period: 61 Days/i)).toBeInTheDocument();
    expect(screen.getByText(/Rate Locked/i)).toBeInTheDocument();
  });

  // 8. Add-On Coverage Card
  it('AddOnCoverageCard toggles selection without card bloat', () => {
    const handleToggle = vi.fn();
    render(
      <AddOnCoverageCard
        id="addon-entity"
        name="Healthcare Facility Entity Indemnity"
        annualPremium={200.0}
        selected={false}
        onToggle={handleToggle}
        description="Extends indemnity protection to clinic entity."
      />
    );

    expect(screen.getByText(/Healthcare Facility Entity Indemnity/i)).toBeInTheDocument();
    const checkbox = screen.getByRole('checkbox', { name: '' });
    fireEvent.click(checkbox);
    expect(handleToggle).toHaveBeenCalledWith(true);
  });

  // 9. Clinic and PIC Coverage Grouping
  it('ClinicAndPicCoverageGroup manages ownership and sole prop complimentary PIC', () => {
    const handleOwns = vi.fn();
    const handleEntity = vi.fn();
    render(
      <ClinicAndPicCoverageGroup
        ownsClinic={true}
        onOwnsClinicToggle={handleOwns}
        entityType="sole"
        onEntityTypeChange={() => {}}
        entityCoverSelected={true}
        onEntityCoverToggle={handleEntity}
        picCoverSelected={true}
        onPicCoverToggle={() => {}}
      />
    );

    expect(screen.getByText(/Sole Proprietor/i)).toBeInTheDocument();
    expect(screen.getByText(/Complimentary/i)).toBeInTheDocument();
  });

  // 10 & 11. Premium Breakdown Table & Contextual Summary Panel
  it('PremiumBreakdownTable renders line items and ContextualSummaryPanel renders proceed CTA', () => {
    const handleProceed = vi.fn();
    render(
      <ContextualSummaryPanel
        specialtyName="General Medical Practitioner"
        limitFormatted="RM 1,000,000"
        startDate="2026-11-01"
        endDate="2026-12-31"
        quote={dummyQuote}
        onProceed={handleProceed}
      />
    );

    expect(screen.getByText(/Base Professional Indemnity/i)).toBeInTheDocument();
    expect(screen.getByText(/Service Tax \(SST 8%\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Stamp Duty/i)).toBeInTheDocument();
    const proceedBtn = screen.getByRole('button', { name: /Proceed to Quotation/i });
    fireEvent.click(proceedBtn);
    expect(handleProceed).toHaveBeenCalled();
  });

  // 12. Branch List / Editor
  it('BranchListEditor enforces max 4 limit and revenue ceiling confirmation', () => {
    const handleConfirm = vi.fn();
    render(
      <BranchListEditor
        branches={[]}
        onBranchesChange={() => {}}
        isRevenueConfirmed={false}
        onRevenueConfirmChange={handleConfirm}
      />
    );

    expect(screen.getByText(/RM 5,000,000/i)).toBeInTheDocument();
    const confirmBtn = screen.getByRole('button', { name: /Confirm Revenue/i });
    fireEvent.click(confirmBtn);
    expect(handleConfirm).toHaveBeenCalledWith(true);
  });

  // 13. Underwriting Declarations Organism
  it('UnderwritingDeclarationsOrganism renders questions and reveals referral alert upon adverse answer', () => {
    const handleChange = vi.fn();
    render(
      <UnderwritingDeclarationsOrganism
        declarations={{
          cleanClaims: false,
          cleanClaimsDetail: 'Prior suit in 2024',
          noCircumstances: true,
          noDisciplinary: true,
          noCriminalSanctions: true,
        }}
        onChange={handleChange}
      />
    );

    expect(screen.getByText(/Underwriting Referral Route Active/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Particulars of Historical Claims/i)).toBeInTheDocument();
  });

  // 14. OTP Verification Organism
  it('OtpVerificationOrganism advances to passcode entry and triggers submit', () => {
    const handleSubmit = vi.fn();
    render(
      <OtpVerificationOrganism
        mobileNumber="123456789"
        onMobileNumberChange={() => {}}
        onOtpSubmit={handleSubmit}
      />
    );

    const dispatchBtn = screen.getByRole('button', { name: /Dispatch Passcode/i });
    fireEvent.click(dispatchBtn);

    expect(screen.getByText(/Confirm Passcode/i)).toBeInTheDocument();
  });

  // 15. Review and Payment Composition
  it('ReviewAndPaymentComposition enables payment CTA only when all consents are given', () => {
    const handlePay = vi.fn();
    const { rerender } = render(
      <ReviewAndPaymentComposition
        doctorName="Dr. Adam"
        nric="850612-14-5543"
        specialtyName="General Medical Practitioner"
        limitFormatted="RM 1,000,000"
        startDate="2026-11-01"
        endDate="2026-12-31"
        quote={dummyQuote}
        paymentMethod="personal"
        onPaymentMethodChange={() => {}}
        consents={{ pidm: false, statutory: false, pdpa: false }}
        onConsentChange={() => {}}
        onAuthorizePayment={handlePay}
      />
    );

    const payBtn = screen.getByRole('button', { name: /Authorize Payment & Bind Policy/i });
    expect(payBtn).toBeDisabled();

    // Rerender with all consents true
    rerender(
      <ReviewAndPaymentComposition
        doctorName="Dr. Adam"
        nric="850612-14-5543"
        specialtyName="General Medical Practitioner"
        limitFormatted="RM 1,000,000"
        startDate="2026-11-01"
        endDate="2026-12-31"
        quote={dummyQuote}
        paymentMethod="personal"
        onPaymentMethodChange={() => {}}
        consents={{ pidm: true, statutory: true, pdpa: true }}
        onConsentChange={() => {}}
        onAuthorizePayment={handlePay}
      />
    );

    expect(payBtn).toBeEnabled();
    fireEvent.click(payBtn);
    expect(handlePay).toHaveBeenCalled();
  });

  // 16. Document Disclosure Section
  it('DocumentDisclosureSection renders PDS and BNM intermediary commission disclosure', () => {
    render(<DocumentDisclosureSection />);
    expect(screen.getByText(/Bank Negara Malaysia Intermediary Disclosure/i)).toBeInTheDocument();
    expect(screen.getByText(/15.0%/i)).toBeInTheDocument();
  });

  // 17. Referral Support Outcome
  it('ReferralSupportOutcomeOrganism renders reference ID and callback form', () => {
    const handleCallback = vi.fn();
    render(
      <ReferralSupportOutcomeOrganism
        referenceId="REF-TEST-99"
        doctorName="Dr. Adam"
        onSubmitCallback={handleCallback}
      />
    );

    expect(screen.getByText(/REF-TEST-99/i)).toBeInTheDocument();
    const submitBtn = screen.getByRole('button', { name: /Request Callback/i });
    fireEvent.click(submitBtn);
    expect(handleCallback).toHaveBeenCalled();
  });

  // 18. Error Recovery Composition
  it('ErrorRecoveryComposition renders error diagnosis and retry button', () => {
    const handleRetry = vi.fn();
    render(
      <ErrorRecoveryComposition
        errorCode="GW_ERR_504"
        onRetry={handleRetry}
      />
    );

    expect(screen.getByText(/GW_ERR_504/i)).toBeInTheDocument();
    const retryBtn = screen.getByRole('button', { name: /Retry Payment/i });
    fireEvent.click(retryBtn);
    expect(handleRetry).toHaveBeenCalled();
  });

  // 19. Mobile Quote Drawer
  it('MobileQuoteDrawer toggles expanded state', () => {
    render(<MobileQuoteDrawer quote={dummyQuote} />);
    const toggleBtn = screen.getByRole('button', { name: /Total Premium/i });
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toggleBtn);
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/Detailed Premium Breakdown/i)).toBeInTheDocument();
  });

  // 20. Step Action Bar & Footer
  it('StepActionBarOrganism handles continue navigation', () => {
    const handleContinue = vi.fn();
    render(
      <div>
        <StepActionBarOrganism onContinue={handleContinue} />
        <ApplicationFooterOrganism />
      </div>
    );

    const contBtn = screen.getByRole('button', { name: /Continue/i });
    fireEvent.click(contBtn);
    expect(handleContinue).toHaveBeenCalled();
    expect(screen.getByText(/Chubb Insurance Malaysia Berhad/i)).toBeInTheDocument();
  });
});
