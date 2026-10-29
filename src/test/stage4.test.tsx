import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { WorkflowProvider, useWorkflow } from '../core/state/WorkflowContext';
import { AppShell } from '../components/layout/AppShell';
import { Stage1CoverageForm } from '../features/coverage/Stage1CoverageForm';
import { Stage2QuoteReview } from '../features/quote/Stage2QuoteReview';
import { Stage3ParticularsForm } from '../features/particulars/Stage3ParticularsForm';
import { Stage4ReviewAndPayment } from '../features/review/Stage4ReviewAndPayment';
import { Stage5PolicyConfirmation } from '../features/confirmation/Stage5PolicyConfirmation';
import { ReferralScaffold } from '../features/scaffolds/ReferralScaffold';
import { PaymentService } from '../core/api/paymentService';
import { RatingService } from '../core/api/ratingService';

// Test harness mounting the complete workflow router
const Stage4TestHarness: React.FC<{
  initialStage?: number | 'confirmation';
  customProfile?: Record<string, any>;
  hasClinicAddon?: boolean;
}> = ({ initialStage = 4, customProfile, hasClinicAddon = false }) => {
  const { currentStage, goToStage, updateCoverage, updateDoctorProfile, setQuote } = useWorkflow();

  React.useEffect(() => {
    // Seed doctor profile
    updateDoctorProfile({
      fullName: 'Dr. Siti Aminah binti Razali',
      nric: '880512-14-5542',
      mmcNumber: '54321',
      email: 'dr.siti@klinikaminah.com',
      mobileNumber: '0123456789',
      residentialAddress: 'No 15, Jalan Bukit Bintang',
      postcode: '55100',
      state: 'Kuala Lumpur',
      practiceType: 'private_clinic',
      clinicName: 'Klinik Siti Aminah',
      taxIdentificationNumber: 'IG1234567890',
      branches: hasClinicAddon
        ? [
            {
              id: 'branch-1',
              name: 'Klinik Siti Aminah (Bangsar)',
              address: '12 Jalan Telawi 3',
              postcode: '59100',
              state: 'Kuala Lumpur',
              phone: '0322841122',
            },
          ]
        : [],
      ...(customProfile || {}),
    });

    // Seed coverage parameters
    updateCoverage({
      classificationId: '7',
      classificationName: 'General Medical Practitioner',
      limitOfLiability: '1m',
      limitFormatted: 'RM 1,000,000',
      startDate: '01/01/2026',
      endDate: '31/12/2026',
      clause612Accepted: true,
      clinic: {
        ownsClinic: hasClinicAddon,
        clinicType: hasClinicAddon ? 'sole_proprietor' : '',
        hiresLocums: false,
        clinicLiabilityId: '1m',
        clinicLiabilityFormatted: 'RM 1,000,000',
      },
      pic: {
        isPicOwnClinic: false,
        isPicAnotherClinic: false,
      },
      addons: {
        clinicPackage: hasClinicAddon,
        personInCharge: false,
        locumCover: false,
        cyberLiability: false,
        branchCount: hasClinicAddon ? 1 : 0,
      },
    });

    // Seed authoritative quote breakdown
    setQuote({
      grossBasePremium: 1470.0,
      annualGrossEquivalent: 1470.0,
      individualNet: 1470.0,
      specialtyMultiplier: 1.0,
      clinicPremium: hasClinicAddon ? 350.0 : 0.0,
      clinicAnnualRate: hasClinicAddon ? 350.0 : 0.0,
      picPremium: 0.0,
      picAnnualRate: 0.0,
      reinstatementPremium: 0.0,
      addonsTotal: hasClinicAddon ? 350.0 : 0.0,
      discountAmount: 0.0,
      netTaxablePremium: hasClinicAddon ? 1820.0 : 1470.0,
      sstAmount: hasClinicAddon ? 145.6 : 117.6,
      stampDuty: 10.0,
      totalPayable: hasClinicAddon ? 1975.6 : 1597.6,
      quoteToken: 'QT-TEST-TOKEN-2026',
      quotationNumber: 'QTN-2026-8812',
      issuedAt: Date.now(),
      expiresAt: Date.now() + 15 * 60 * 1000,
      isProrata: false,
      daysCount: 365,
    });

    if (initialStage !== 1) {
      goToStage(initialStage as any);
    }
  }, []);

  return (
    <AppShell>
      {currentStage === 1 && <Stage1CoverageForm />}
      {currentStage === 2 && <Stage2QuoteReview />}
      {currentStage === 3 && <Stage3ParticularsForm />}
      {currentStage === 4 && <Stage4ReviewAndPayment />}
      {currentStage === 'referral' && <ReferralScaffold />}
      {currentStage === 'confirmation' && <Stage5PolicyConfirmation />}
    </AppShell>
  );
};

describe('Stage 4 Review, Checkout & Policy Confirmation (SCR-TOBE-04 & SCR-TOBE-05)', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    window.history.pushState({}, '', '/buy/review');
    vi.clearAllMocks();
  });

  it('renders all required Stage 4 summary tables, itemized breakdown, and statutory BNM commission disclosure', async () => {
    render(
      <WorkflowProvider>
        <Stage4TestHarness initialStage={4} />
      </WorkflowProvider>
    );

    // Verify main heading
    await waitFor(() => {
      expect(screen.getByText(/Review Policy Details & Authorize Payment/i)).toBeInTheDocument();
    });

    // Verify Practitioner Particulars Summary
    expect(screen.getByText(/Dr\. Siti Aminah binti Razali/i)).toBeInTheDocument();
    expect(screen.getByText(/880512-14-5542/i)).toBeInTheDocument();
    expect(screen.getByText(/54321/i)).toBeInTheDocument();
    expect(screen.getByText(/dr\.siti@klinikaminah\.com/i)).toBeInTheDocument();

    // Verify Coverage Summary
    expect(screen.getAllByText(/General Medical Practitioner/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/RM 1,000,000/i)[0]).toBeInTheDocument();

    // Verify Automatic Reinstatement Banner (RULE-RST-01)
    expect(screen.getAllByText(/Complimentary Automatic Reinstatement/i)[0]).toBeInTheDocument();

    // Verify Financial Breakdown items
    expect(screen.getByText(/Gross Base Premium/i)).toBeInTheDocument();
    expect(screen.getAllByText(/RM 1470\.00/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Sales & Service Tax \(SST 8\.0%\)/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Stamp Duty/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/RM 10\.00/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Total Premium Payable/i)).toBeInTheDocument();
    expect(screen.getAllByText(/RM 1597\.60/i).length).toBeGreaterThanOrEqual(1);

    // Verify Statutory BNM 10% Intermediary Commission Disclosure
    expect(
      screen.getByText(/Bank Negara Malaysia \(BNM\) Intermediary Commission Disclosure/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/A commission of 10%.*is paid by Chubb Insurance Malaysia Berhad to the approved distributor JA Assure Sdn Bhd/i)
    ).toBeInTheDocument();

    // Verify Statutory PIDM statement
    expect(screen.getByText(/PIDM Protection Statement:/i)).toBeInTheDocument();
  });

  it('displays active 15-minute rate lock countdown and allows quotation refresh', async () => {
    const calculateSpy = vi.spyOn(RatingService, 'calculatePremium');

    render(
      <WorkflowProvider>
        <Stage4TestHarness initialStage={4} />
      </WorkflowProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Chubb 15-Minute Guaranteed Rate Lock/i)).toBeInTheDocument();
    });

    // Find and click Refresh Quote button
    const refreshBtn = screen.getByRole('button', { name: /Recalculate & Revalidate/i });
    expect(refreshBtn).toBeInTheDocument();

    fireEvent.click(refreshBtn);

    await waitFor(() => {
      expect(calculateSpy).toHaveBeenCalled();
    });
  });

  it('enforces mandatory affirmative legal consent checkboxes before allowing payment submission', async () => {
    render(
      <WorkflowProvider>
        <Stage4TestHarness initialStage={4} />
      </WorkflowProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Review Policy Details & Authorize Payment/i)).toBeInTheDocument();
    });

    // Click pay button without ticking consents
    const payBtn = screen.getByRole('button', { name: /Authorize & Pay RM 1597\.60/i });
    fireEvent.click(payBtn);

    // Assert validation errors appear
    await waitFor(() => {
      expect(
        screen.getByText(/You must read and accept the Chubb Master Policy Wording, PDS, and Terms & Conditions/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/You must confirm the pre-contractual Duty of Disclosure under Schedule 9 of the Financial Services Act 2013/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/You must consent to the collection, use, and disclosure of personal data under the PDPA 2010/i)
      ).toBeInTheDocument();
    });

    // Tick the 3 mandatory checkboxes by their id
    const chkPolicy = document.getElementById('consent_policy_wording')! as HTMLInputElement;
    const chkDisclosure = document.getElementById('consent_duty_of_disclosure')! as HTMLInputElement;
    const chkPdpa = document.getElementById('consent_pdpa')! as HTMLInputElement;

    fireEvent.click(chkPolicy);
    fireEvent.click(chkDisclosure);
    fireEvent.click(chkPdpa);

    // Errors should now be cleared
    await waitFor(() => {
      expect(
        screen.queryByText(/You must read and accept the Chubb Master Policy Wording, PDS, and Terms & Conditions/i)
      ).not.toBeInTheDocument();
    });
  });

  it('toggles payment channel between Personal Banking/Card and Corporate FPX Business Banking', async () => {
    render(
      <WorkflowProvider>
        <Stage4TestHarness initialStage={4} />
      </WorkflowProvider>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('personal')).toBeInTheDocument();
    });

    const personalRadio = screen.getByDisplayValue('personal') as HTMLInputElement;
    const businessRadio = screen.getByDisplayValue('business') as HTMLInputElement;

    expect(personalRadio.checked).toBe(true);
    expect(businessRadio.checked).toBe(false);

    fireEvent.click(businessRadio);

    expect(businessRadio.checked).toBe(true);
    expect(personalRadio.checked).toBe(false);
  });

  it('opens secure PCI-DSS checkout gateway modal upon valid submission and handles SUCCESS outcome into Policy Confirmation', async () => {
    render(
      <WorkflowProvider>
        <Stage4TestHarness initialStage={4} />
      </WorkflowProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Review Policy Details & Authorize Payment/i)).toBeInTheDocument();
    });

    // Check mandatory consent checkboxes
    fireEvent.click(document.getElementById('consent_policy_wording')!);
    fireEvent.click(document.getElementById('consent_duty_of_disclosure')!);
    fireEvent.click(document.getElementById('consent_pdpa')!);

    // Click Authorize & Pay
    const payBtn = screen.getByRole('button', { name: /Authorize & Pay RM 1597\.60/i });
    fireEvent.click(payBtn);

    // Verify Checkout Gateway Modal is displayed
    await waitFor(() => {
      expect(screen.getByText(/Secure Checkout Gateway \(PCI-DSS\)/i)).toBeInTheDocument();
      expect(screen.getByText(/Idempotency Guard:/i)).toBeInTheDocument();
    });

    // Simulate Gateway Success verification callback
    const successBtn = screen.getByRole('button', {
      name: /✓ Simulate Success \(Authorize & Issue\)/i,
    });
    fireEvent.click(successBtn);

    // Verify transition to Stage 5 Policy Confirmation Screen (SCR-TOBE-05)
    await waitFor(
      () => {
        expect(screen.getByTestId('stage5-policy-confirmation')).toBeInTheDocument();
        expect(screen.getByText(/Your Indemnity Coverage is Active/i)).toBeInTheDocument();
        expect(screen.getByTestId('confirmed-policy-number')).toBeInTheDocument();
      },
      { timeout: 8000 }
    );

    // Verify Official Documents Download Buttons
    expect(screen.getByTestId('download-coi-btn')).toBeInTheDocument();
    expect(screen.getByTestId('download-invoice-btn')).toBeInTheDocument();
    expect(screen.getByTestId('download-schedule-btn')).toBeInTheDocument();

    // Verify Email Dispatch Notice to applicant
    expect(screen.getByText(/Digital Policy Pack Dispatched:/i)).toBeInTheDocument();
    expect(screen.getByText(/dr\.siti@klinikaminah\.com/i)).toBeInTheDocument();

    // Verify MMC Submission Guidance
    expect(screen.getByText(/How to Submit to MMC for Your APC/i)).toBeInTheDocument();
  }, 15000);

  it('handles payment FAILED outcome with non-destructive retry preserving applicant review state', async () => {
    render(
      <WorkflowProvider>
        <Stage4TestHarness initialStage={4} />
      </WorkflowProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Review Policy Details & Authorize Payment/i)).toBeInTheDocument();
    });

    // Agree to consents
    fireEvent.click(document.getElementById('consent_policy_wording')!);
    fireEvent.click(document.getElementById('consent_duty_of_disclosure')!);
    fireEvent.click(document.getElementById('consent_pdpa')!);

    // Open checkout gateway
    fireEvent.click(screen.getByRole('button', { name: /Authorize & Pay RM 1597\.60/i }));

    await waitFor(() => {
      expect(screen.getByText(/Secure Checkout Gateway \(PCI-DSS\)/i)).toBeInTheDocument();
    });

    // Trigger Failed Decline outcome
    const failBtn = screen.getByRole('button', {
      name: /✗ Simulate Card Decline \/ Failure/i,
    });
    fireEvent.click(failBtn);

    // Verify failure notification is surfaced and review screen remains accessible for retry
    await waitFor(() => {
      expect(
        screen.getByText(/Payment declined by issuing bank/i)
      ).toBeInTheDocument();
    });

    // Verify applicant details and review breakdown are still preserved (non-destructive retry)
    expect(screen.getByText(/Dr\. Siti Aminah binti Razali/i)).toBeInTheDocument();
    expect(screen.getAllByText(/RM 1597\.60/i).length).toBeGreaterThanOrEqual(1);
  }, 10000);

  it('handles payment CANCELLED outcome returning smoothly to review screen', async () => {
    render(
      <WorkflowProvider>
        <Stage4TestHarness initialStage={4} />
      </WorkflowProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Review Policy Details & Authorize Payment/i)).toBeInTheDocument();
    });

    // Agree to consents
    fireEvent.click(document.getElementById('consent_policy_wording')!);
    fireEvent.click(document.getElementById('consent_duty_of_disclosure')!);
    fireEvent.click(document.getElementById('consent_pdpa')!);

    // Open checkout modal
    fireEvent.click(screen.getByRole('button', { name: /Authorize & Pay RM 1597\.60/i }));

    await waitFor(() => {
      expect(screen.getByText(/Secure Checkout Gateway \(PCI-DSS\)/i)).toBeInTheDocument();
    });

    // Simulate user cancelling payment
    const cancelBtn = screen.getByRole('button', { name: /Cancel by User/i });
    fireEvent.click(cancelBtn);

    // Modal closes and review screen remains visible
    await waitFor(() => {
      expect(screen.queryByText(/Secure Checkout Gateway \(PCI-DSS\)/i)).not.toBeInTheDocument();
      expect(screen.getByText(/Review Policy Details & Authorize Payment/i)).toBeInTheDocument();
    });
  }, 10000);

  it('enforces backend idempotency ledger preventing duplicate charges on identical idempotency key', async () => {
    const key = `test-idempotency-uuid-${Date.now()}`;
    const payload = {
      idempotencyKey: key,
      quotationNumber: 'QTN-2026-999',
      quoteToken: 'TOKEN-999',
      paymentChannel: 'personal' as const,
      amount: 1597.6,
      pricing: {
        totalPayable: 1597.6,
      } as any,
      customerEmail: 'test@doctor.com',
      policyholderName: 'Dr. Test',
    };

    // First call succeeds
    const resp1 = await PaymentService.initiatePayment(payload);
    expect(resp1.status).toBe('PENDING');

    // Second call with same idempotency key fails with duplicate error
    await expect(PaymentService.initiatePayment(payload)).rejects.toThrow(
      /Duplicate payment initiation request detected/i
    );
  });

  it('preserves Tier 1 particulars when navigating backward to Underwriting or Quote', async () => {
    render(
      <WorkflowProvider>
        <Stage4TestHarness initialStage={4} />
      </WorkflowProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Review Policy Details & Authorize Payment/i)).toBeInTheDocument();
    });

    // Click "Back to Underwriting"
    const backBtn = screen.getByRole('button', { name: /Back to Underwriting/i });
    fireEvent.click(backBtn);

    // Verify we are back on Stage 3
    await waitFor(() => {
      expect(screen.getByText(/Practitioner Identity & Underwriting Declarations/i)).toBeInTheDocument();
      // Tier 1 identity data was preserved
      expect(screen.getByDisplayValue(/Dr\. Siti Aminah binti Razali/i)).toBeInTheDocument();
      expect(screen.getByDisplayValue(/880512-14-5542/i)).toBeInTheDocument();
      expect(screen.getByDisplayValue(/54321/i)).toBeInTheDocument();
    });
  }, 10000);

  it('supports document downloads and clipboard copying on Policy Confirmation screen', async () => {
    window.history.pushState({}, '', '/confirmation');
    render(
      <WorkflowProvider>
        <Stage4TestHarness initialStage="confirmation" />
      </WorkflowProvider>
    );

    // Verify confirmation screen is mounted
    await waitFor(() => {
      expect(screen.getByTestId('stage5-policy-confirmation')).toBeInTheDocument();
    });

    // Verify copy button
    const copyBtn = screen.getByRole('button', { name: /Copy policy number to clipboard/i });
    expect(copyBtn).toBeInTheDocument();
    fireEvent.click(copyBtn);

    await waitFor(() => {
      expect(screen.getByText(/Copied/i)).toBeInTheDocument();
    });

    // Test COI download trigger
    const coiBtn = screen.getByTestId('download-coi-btn');
    fireEvent.click(coiBtn);

    // Test Tax Invoice download trigger
    const invBtn = screen.getByTestId('download-invoice-btn');
    fireEvent.click(invBtn);

    // Reset / Return home button
    const returnHomeBtn = screen.getByTestId('return-home-btn');
    expect(returnHomeBtn).toBeInTheDocument();
  });
});
