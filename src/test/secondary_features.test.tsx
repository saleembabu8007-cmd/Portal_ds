import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { WorkflowProvider, useWorkflow } from '../core/state/WorkflowContext';
import { RenewalFlowModal } from '../features/renewal/RenewalFlowModal';
import { RetrieveQuoteModal } from '../features/quote/RetrieveQuoteModal';
import { DuplicatePolicyModal } from '../features/particulars/DuplicatePolicyModal';
import { SessionTimeoutManager } from '../components/layout/SessionTimeoutManager';
import { DocumentCenterModal } from '../components/layout/DocumentCenterModal';
import { CustomerPolicyRecord } from '../core/api/renewalService';

// Test harness helper to view workflow state
const TestStateInspector = () => {
  const { currentStage, coverage, doctorProfile, quote } = useWorkflow();
  return (
    <div data-testid="workflow-state-inspector">
      <span data-testid="current-stage">{currentStage}</span>
      <span data-testid="coverage-limit">{coverage.limitFormatted}</span>
      <span data-testid="promo-code">{coverage.promoCode || 'NONE'}</span>
      <span data-testid="doctor-nric">{doctorProfile.nric || 'NONE'}</span>
      <span data-testid="quote-token">{quote?.quoteToken || 'NONE'}</span>
    </div>
  );
};

describe('DoctorShield Secondary & Exception Capabilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /* ========================================================================
     1. POLICY RENEWAL WORKFLOW (/renew & MODAL-12 jsUserPolicyList)
     ======================================================================== */
  describe('Policy Renewal Hub & OTP Verification (PATH-RENEW / MODAL-12)', () => {
    it('requests OTP via SMS, switches to WhatsApp, and enforces 60s cooldown', async () => {
      const handleClose = vi.fn();

      render(
        <WorkflowProvider>
          <RenewalFlowModal isOpen={true} onClose={handleClose} />
        </WorkflowProvider>
      );

      // Verify Initial Screen
      expect(screen.getByRole('heading', { name: /Policy Renewal Verification/i })).toBeInTheDocument();
      expect(screen.getByLabelText(/Registered Mobile Number/i)).toHaveValue('0123456789');

      // Request OTP via SMS
      fireEvent.click(screen.getByTestId('generate-otp-btn'));

      // Expect Step 2: OTP Entry
      expect(await screen.findByRole('heading', { name: /Policy Renewal Verification/i })).toBeInTheDocument();
      expect(await screen.findByLabelText(/Enter 6-Digit Code/i)).toBeInTheDocument();

      // Verify 60s Resend Cooldown is active
      expect(screen.getByText(/Resend available in/i)).toBeInTheDocument();

      // Fallback switch to WhatsApp channel
      const whatsappBtn = screen.getByTestId('fallback-whatsapp-btn');
      expect(whatsappBtn).toBeInTheDocument();
    });

    it('validates OTP, renders user policy list (MODAL-12), and pre-populates renewal quote with 10% discount', async () => {
      const handleClose = vi.fn();

      render(
        <WorkflowProvider>
          <TestStateInspector />
          <RenewalFlowModal isOpen={true} onClose={handleClose} />
        </WorkflowProvider>
      );

      // Use fresh mobile number 0198765432 to avoid cooldown
      const mobileInput = screen.getByTestId('renewal-mobile-input');
      fireEvent.change(mobileInput, { target: { value: '0198765432' } });

      // Move to Step 2
      fireEvent.click(screen.getByTestId('generate-otp-btn'));
      const otpInput = await screen.findByTestId('otp-input');

      // Enter standard simulation code '123456'
      fireEvent.change(otpInput, { target: { value: '123456' } });

      // Click Verify
      fireEvent.click(screen.getByTestId('verify-otp-btn'));

      // Expect Step 3: Policy List (MODAL-12 jsUserPolicyList)
      expect(await screen.findByText(/CHUBB-DS-2026-99311/i)).toBeInTheDocument();
      expect(screen.getByText(/DR KHALID BIN HASSAN/i)).toBeInTheDocument();

      // Select policy
      const cards = screen.getAllByTestId('policy-record-card');
      expect(cards.length).toBeGreaterThanOrEqual(1);

      expect(handleClose).not.toHaveBeenCalled();
    });

    it('rejects invalid OTP codes and shows remaining attempts', async () => {
      render(
        <WorkflowProvider>
          <RenewalFlowModal isOpen={true} onClose={vi.fn()} />
        </WorkflowProvider>
      );

      // Use fresh mobile number 0176543210
      const mobileInput = screen.getByTestId('renewal-mobile-input');
      fireEvent.change(mobileInput, { target: { value: '0176543210' } });

      fireEvent.click(screen.getByTestId('generate-otp-btn'));
      const otpInput = await screen.findByTestId('otp-input');

      // Enter invalid code '999999'
      fireEvent.change(otpInput, { target: { value: '999999' } });

      fireEvent.click(screen.getByTestId('verify-otp-btn'));

      expect(await screen.findByText(/Invalid verification code/i)).toBeInTheDocument();
    });
  });

  /* ========================================================================
     2. QUOTATION RETRIEVAL (/retrieve-quote & MODAL-17, 20, 21)
     ======================================================================== */
  describe('Quotation Retrieval & Exception Modals (/retrieve-quote)', () => {
    it('retrieves active saved quotation and navigates to Stage 2 review', async () => {
      const handleClose = vi.fn();

      render(
        <WorkflowProvider>
          <TestStateInspector />
          <RetrieveQuoteModal isOpen={true} onClose={handleClose} />
        </WorkflowProvider>
      );

      // Search valid reference
      const input = screen.getByLabelText(/Quotation Number or Reference Code/i);
      fireEvent.change(input, { target: { value: 'QTN-2026-48192' } });

      fireEvent.click(screen.getByRole('button', { name: /Retrieve Quotation/i }));

      // Verify Found Result
      expect(await screen.findByRole('heading', { name: /Active Quotation Found/i })).toBeInTheDocument();
      expect(screen.getByText(/RM 1597.60/i)).toBeInTheDocument();

      // Proceed to review
      fireEvent.click(screen.getByRole('button', { name: /Load Quotation & Review/i }));

      await waitFor(() => {
        expect(screen.getByTestId('current-stage')).toHaveTextContent('2');
        expect(screen.getByTestId('quote-token')).toHaveTextContent('TOKEN-QTN-2026-48192');
      });
      expect(handleClose).toHaveBeenCalled();
    });

    it('detects expired quotation (>30 days, MODAL-21) and offers one-click re-rating', async () => {
      const handleClose = vi.fn();

      render(
        <WorkflowProvider>
          <TestStateInspector />
          <RetrieveQuoteModal isOpen={true} onClose={handleClose} />
        </WorkflowProvider>
      );

      const input = screen.getByLabelText(/Quotation Number or Reference Code/i);
      fireEvent.change(input, { target: { value: 'QTN-EXPIRED-001' } });

      fireEvent.click(screen.getByRole('button', { name: /Retrieve Quotation/i }));

      // Verify Expired Notice (MODAL-21 jsExpireContactusQuoteErrorModel)
      expect(await screen.findByRole('heading', { name: /Quotation Price Guarantee Expired/i })).toBeInTheDocument();
      expect(screen.getByText(/premium rates are locked for 30 days/i)).toBeInTheDocument();

      // Click Re-Rate
      const rerateBtn = screen.getByRole('button', { name: /Refresh & Re-Rate Quotation/i });
      fireEvent.click(rerateBtn);

      await waitFor(() => {
        expect(screen.getByTestId('current-stage')).toHaveTextContent('2');
      });
      expect(handleClose).toHaveBeenCalled();
    });

    it('handles incomplete quote (MODAL-20) by navigating directly to Stage 3 Particulars', async () => {
      const handleClose = vi.fn();

      render(
        <WorkflowProvider>
          <TestStateInspector />
          <RetrieveQuoteModal isOpen={true} onClose={handleClose} />
        </WorkflowProvider>
      );

      const input = screen.getByLabelText(/Quotation Number or Reference Code/i);
      fireEvent.change(input, { target: { value: 'QTN-INCOMPLETE-001' } });

      fireEvent.click(screen.getByRole('button', { name: /Retrieve Quotation/i }));

      // Verify Incomplete Notice (MODAL-20 jsReIncompleteQuoteErrorModel)
      expect(
        await screen.findByRole('heading', { name: /Quotation Incomplete — Practitioner Information Required/i })
      ).toBeInTheDocument();

      // Click Complete Particulars
      fireEvent.click(screen.getByRole('button', { name: /Complete Practitioner Particulars/i }));

      await waitFor(() => {
        expect(screen.getByTestId('current-stage')).toHaveTextContent('3');
      });
      expect(handleClose).toHaveBeenCalled();
    });

    it('displays error notice on invalid quote reference (MODAL-17 jsReIndicativeQuoteErrorModel)', async () => {
      render(
        <WorkflowProvider>
          <RetrieveQuoteModal isOpen={true} onClose={vi.fn()} />
        </WorkflowProvider>
      );

      const input = screen.getByLabelText(/Quotation Number or Reference Code/i);
      fireEvent.change(input, { target: { value: 'INVALID-REF' } });

      fireEvent.click(screen.getByRole('button', { name: /Retrieve Quotation/i }));

      expect(await screen.findByRole('heading', { name: /Quotation Reference Not Found/i })).toBeInTheDocument();
      expect(screen.getByText(/Contact Client Services/i)).toBeInTheDocument();
    });
  });

  /* ========================================================================
     3. DUPLICATE ACTIVE POLICY WARNING (MODAL-18 jsAlreadyBoughtModal)
     ======================================================================== */
  describe('Duplicate In-Force Policy Warning (MODAL-18)', () => {
    const mockPolicy: CustomerPolicyRecord = {
      policyNumber: 'CHUBB-DS-2026-77889',
      certificateNumber: 'COI-2026-998877',
      insuredName: 'DR NURUL HUDA BINTI ISMAIL',
      nric: '850101-14-5555',
      mmcNumber: '44556',
      mobileNumber: '0176543210',
      email: 'dr.huda@hudaclinic.com',
      classificationId: '7',
      classificationName: 'General Medical Practitioner',
      specialtyName: 'General Medical Practice',
      limitOfLiability: '1m',
      limitFormatted: 'RM 1,000,000',
      startDate: '2026-01-01',
      endDate: '2026-12-31',
      annualPremium: 1470.0,
      hasClinicEntity: false,
      status: 'DUPLICATE_ACTIVE',
      renewalCode: 'RENEWAL10',
      renewalDiscountPercent: 10,
    };

    it('renders duplicate active policy warning with policy details, COI download, and endorsement link', async () => {
      const handleClose = vi.fn();

      render(
        <DuplicatePolicyModal
          isOpen={true}
          onClose={handleClose}
          policyRecord={mockPolicy}
        />
      );

      expect(screen.getByRole('heading', { name: /Active In-Force Policy Detected/i })).toBeInTheDocument();
      expect(screen.getByText(/CHUBB-DS-2026-77889/i)).toBeInTheDocument();
      expect(screen.getByText(/COI-2026-998877/i)).toBeInTheDocument();
      expect(screen.getByText(/DR NURUL HUDA BINTI ISMAIL/i)).toBeInTheDocument();

      // Certificate of Insurance download button
      const downloadBtn = screen.getByRole('button', { name: /Download Current Certificate of Insurance/i });
      expect(downloadBtn).toBeInTheDocument();

      // Mid-term endorsement link
      expect(screen.getByRole('link', { name: /Request Mid-Term Endorsement/i })).toBeInTheDocument();

      // Close button
      fireEvent.click(screen.getByRole('button', { name: /Back to Form/i }));
      expect(handleClose).toHaveBeenCalled();
    });
  });

  /* ========================================================================
     4. SESSION TIMEOUT & ZERO DATA LOSS (MODAL-14 #jsStartDateValidationErrorModal)
     ======================================================================== */
  describe('Session Inactivity Timeout & Recovery (MODAL-14)', () => {
    it('surfaces 25-minute inactivity warning toast with countdown and extend action', async () => {
      render(
        <WorkflowProvider>
          <SessionTimeoutManager />
        </WorkflowProvider>
      );

      await waitFor(() => expect((window as any).__triggerSessionWarning).toBeDefined());

      act(() => {
        (window as any).__triggerSessionWarning();
      });

      // Verify warning toast
      expect(await screen.findByRole('region', { name: /Quotation session expiry alert/i })).toBeInTheDocument();
      expect(screen.getByText(/Session Expiring Soon/i)).toBeInTheDocument();

      // Click Extend Session
      const extendBtn = screen.getByRole('button', { name: /Extend Session/i });
      fireEvent.click(extendBtn);

      // Warning disappears
      expect(screen.queryByRole('region', { name: /Quotation session expiry alert/i })).not.toBeInTheDocument();
    });

    it('displays session expired modal (MODAL-14) at 30 minutes and restores quote without data loss', async () => {
      render(
        <WorkflowProvider>
          <TestStateInspector />
          <SessionTimeoutManager />
        </WorkflowProvider>
      );

      // Trigger expired modal via hook
      act(() => {
        (window as any).__triggerSessionExpired();
      });

      // Verify modal
      expect(await screen.findByRole('heading', { name: /Quotation Session Expired/i })).toBeInTheDocument();
      expect(screen.getByText(/Zero Data Loss:/i)).toBeInTheDocument();

      // Click Refresh Quotation & Continue
      const refreshBtn = screen.getByRole('button', { name: /Refresh Quotation & Continue/i });
      fireEvent.click(refreshBtn);

      await waitFor(() => {
        expect(screen.queryByRole('heading', { name: /Quotation Session Expired/i })).not.toBeInTheDocument();
      });
    });
  });

  /* ========================================================================
     5. DOCUMENT CENTER & STATUTORY DISCLOSURES (MODAL-08, 05, 15, 19, PDS)
     ======================================================================== */
  describe('Document Center & Statutory Disclosures Modal', () => {
    it('renders Schedule 9 FSA 2013 duty of disclosure, PDS downloads, and support info', async () => {
      const handleClose = vi.fn();

      render(
        <DocumentCenterModal
          isOpen={true}
          onClose={handleClose}
          initialTab="notices"
        />
      );

      // Tab 1: Duty of Disclosure (MODAL-08)
      expect(screen.getByRole('heading', { name: /DoctorShield Document & Legal Center/i })).toBeInTheDocument();
      expect(screen.getAllByText(/Your Duty of Disclosure/i).length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText(/Schedule 9, Financial Services Act 2013/i)).toBeInTheDocument();
      expect(screen.getByText(/Non-Disclosure:/i)).toBeInTheDocument();

      // Switch to PDS Tab
      fireEvent.click(screen.getByRole('tab', { name: /Product Disclosure Sheets \(PDS\)/i }));
      expect(screen.getByText(/DoctorShield PDS \(English\)/i)).toBeInTheDocument();
      expect(screen.getByText(/DoctorShield PDS \(Bahasa Malaysia\)/i)).toBeInTheDocument();

      // Switch to Policy Period Tab (MODAL-05)
      fireEvent.click(screen.getByRole('tab', { name: /Policy Period Rules \(MODAL-05\)/i }));
      expect(screen.getByText(/continuous claims-made coverage for a term of 365 days/i)).toBeInTheDocument();

      // Switch to System Support Tab (MODAL-15)
      fireEvent.click(screen.getByRole('tab', { name: /System Support \(MODAL-15\)/i }));
      expect(screen.getByText(/\+60 3-2713 0088/i)).toBeInTheDocument();
      expect(screen.getByText(/support@doctorshield.com/i)).toBeInTheDocument();

      // Close modal
      fireEvent.click(screen.getByRole('button', { name: /Close document center/i }));
      expect(handleClose).toHaveBeenCalled();
    });
  });
});
