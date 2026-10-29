import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { WorkflowProvider, useWorkflow } from '../core/state/WorkflowContext';
import { Stage2QuoteReview } from '../features/quote/Stage2QuoteReview';
import { RatingService } from '../core/api/ratingService';

// Wrapper component to populate initial state for Stage 2
const Stage2TestHarness: React.FC<{
  initialClassification?: string;
  initialLiability?: string;
  initialStartDate?: string;
  initialEndDate?: string;
}> = ({
  initialClassification = '7', // Specialist - Non Surgeon (e.g. RM 3,450/yr)
  initialLiability = '2m',     // RM 2,000,000
  initialStartDate = '2026-11-01',
  initialEndDate = '2026-12-31',
}) => {
  const { updateCoverage, quote, setQuote } = useWorkflow();

  React.useEffect(() => {
    updateCoverage({
      classificationId: initialClassification,
      limitOfLiability: initialLiability,
      startDate: initialStartDate,
      endDate: initialEndDate,
      customerEmail: 'dr.azman@chubb.com.my',
      clause612Accepted: false,
    });

    // Provide initial quotation calculation matching RatingService
    RatingService.calculatePremium({
      classification_id: initialClassification,
      liability_id: initialLiability,
      insurance_start_date: initialStartDate,
      insurance_end_date: initialEndDate,
      customer_email: 'dr.azman@chubb.com.my',
      clause_6_12_accepted: false,
    }).then((res) => {
      setQuote({
        grossBasePremium: res.pricing.gross_base,
        promoDiscount: res.pricing.discount_amount,
        netGrossPremium: res.pricing.net_gross,
        sstAmount: res.pricing.sst_amount,
        stampDuty: res.pricing.stamp_duty,
        totalPayable: res.pricing.total_payable,
        quotationNumber: res.quotation_number,
        quoteToken: res.quote_token,
        expiresAt: res.expires_at,
        daysCount: res.pricing.days_count,
        isProrata: res.pricing.is_prorata,
        annualGrossEquivalent: res.pricing.annual_gross_equivalent,
        clinicPremium: res.pricing.clinic_addon_premium,
        picPremium: res.pricing.pic_addon_premium,
      });
    });
  }, []);

  return <Stage2QuoteReview />;
};

describe('Stage 2 Quotation & Optional Coverage (SCR-TOBE-02)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders initial indicative quote, 15-minute rate lock, and pro-rata period details', async () => {
    render(
      <WorkflowProvider>
        <Stage2TestHarness />
      </WorkflowProvider>
    );

    // Verify stage header and badge
    expect(await screen.findByText(/stage 2 of 4: quotation & optional protection/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /your indicative chubb indemnity quote/i })).toBeInTheDocument();

    // Verify 15-minute rate lock badge and token
    expect(screen.getByText(/15-minute guaranteed rate lock active/i)).toBeInTheDocument();
    expect(screen.getByText(/quote token:/i)).toBeInTheDocument();

    // Verify pro-rata period banner (60 days for Nov 1 to Dec 31)
    expect(screen.getByText(/pro-rated coverage \(60 days\)/i)).toBeInTheDocument();
    expect(screen.getByText(/annual equivalent/i)).toBeInTheDocument();
  });

  it('enforces validation if mandatory questions are unanswered on proceed', async () => {
    render(
      <WorkflowProvider>
        <Stage2TestHarness />
      </WorkflowProvider>
    );

    await screen.findByRole('heading', { name: /your indicative chubb indemnity quote/i });

    // Attempt to proceed without answering clinic ownership
    const proceedBtn = screen.getByRole('button', { name: /proceed to personal details/i });
    fireEvent.click(proceedBtn);

    // Expect alert for clinic ownership
    expect(
      await screen.findByText(/please select whether you own, operate, or partner in a private clinic/i)
    ).toBeInTheDocument();

    // Select "Yes" for clinic ownership but do not choose structure
    const clinicYesRadio = screen.getByRole('radio', { name: /yes, i own or partner in a private clinic/i });
    fireEvent.click(clinicYesRadio);

    await waitFor(() => {
      expect(proceedBtn).not.toBeDisabled();
    });

    fireEvent.click(proceedBtn);

    // Expect alert for business structure
    expect(
      await screen.findByText(/please select your practice business structure/i)
    ).toBeInTheDocument();
  });

  it('progressively discloses clinic sections and updates pricing when selecting Clinic Entity Protection', async () => {
    const { container } = render(
      <WorkflowProvider>
        <Stage2TestHarness />
      </WorkflowProvider>
    );

    await screen.findByRole('heading', { name: /your indicative chubb indemnity quote/i });

    // Initially, clinic structure and clinic add-on card are not visible
    expect(screen.queryByText(/clinic entity facility indemnity/i)).not.toBeInTheDocument();

    // Answer "Yes" to clinic ownership
    const clinicYesRadio = screen.getByRole('radio', { name: /yes, i own or partner in a private clinic/i });
    fireEvent.click(clinicYesRadio);

    // Structure question and add-on card appear
    expect(await screen.findByText(/sole proprietorship or partnership \/ sdn bhd\?/i)).toBeInTheDocument();
    expect(screen.getByText(/clinic entity facility indemnity/i)).toBeInTheDocument();

    // Select "Sole Proprietor"
    const solePropBtn = screen.getByRole('button', { name: /sole proprietor/i });
    fireEvent.click(solePropBtn);

    // Select Clinic Add-On Card
    const clinicCard = screen.getByRole('checkbox', { name: /clinic entity facility indemnity/i });
    fireEvent.click(clinicCard);

    // Expect Clinic Liability limit options to appear (RM 500k, RM 1M, RM 2M)
    expect(await screen.findByText(/clinic establishment limit of liability/i)).toBeInTheDocument();
    expect(screen.getByText(/rm 500,000/i)).toBeInTheDocument();
    expect(screen.getByText(/rm 1,000,000/i)).toBeInTheDocument();
    expect(screen.getByText(/rm 2,000,000/i)).toBeInTheDocument();
  });

  it('reconciles and auto-deselects clinic add-on when upstream clinic ownership is toggled to No', async () => {
    render(
      <WorkflowProvider>
        <Stage2TestHarness />
      </WorkflowProvider>
    );

    await screen.findByRole('heading', { name: /your indicative chubb indemnity quote/i });

    // 1. Answer Yes to clinic ownership
    const clinicYesRadio = screen.getByRole('radio', { name: /yes, i own or partner in a private clinic/i });
    fireEvent.click(clinicYesRadio);

    // 2. Select Clinic Entity Protection add-on
    const clinicCard = await screen.findByRole('checkbox', { name: /clinic entity facility indemnity/i });
    fireEvent.click(clinicCard);

    // Wait for calculation to settle
    await waitFor(() => {
      expect(clinicCard).toBeChecked();
    });

    // 3. User changes upstream clinic ownership to "No"
    const clinicNoRadio = screen.getByRole('radio', { name: /no, i do not own or partner in a private clinic/i });
    fireEvent.click(clinicNoRadio);

    // 4. Verify reconciliation banner appears
    expect(
      await screen.findByText(/notice: clinic facility protection was removed because clinic ownership is no longer declared/i)
    ).toBeInTheDocument();

    // 5. Verify clinic card is no longer rendered
    expect(screen.queryByRole('checkbox', { name: /clinic entity facility indemnity/i })).not.toBeInTheDocument();
  });

  it('progressively discloses Person-In-Charge (PIC) card and handles auto-removal reconciliation', async () => {
    render(
      <WorkflowProvider>
        <Stage2TestHarness />
      </WorkflowProvider>
    );

    await screen.findByRole('heading', { name: /your indicative chubb indemnity quote/i });

    // Initially, PIC add-on card is hidden
    expect(screen.queryByText(/person-in-charge \(pic\) statutory defense extension/i)).not.toBeInTheDocument();

    // Answer "Yes" to PIC of own clinic
    const picOwnYes = screen.getByRole('radio', { name: /yes, i am person-in-charge of my own clinic/i });
    fireEvent.click(picOwnYes);

    // PIC Add-On card is now revealed
    const picCard = await screen.findByRole('checkbox', { name: /person-in-charge \(pic\) statutory defense extension/i });
    expect(picCard).toBeInTheDocument();

    // Select PIC Add-on
    fireEvent.click(picCard);
    await waitFor(() => {
      expect(picCard).toBeChecked();
    });

    // Now toggle both PIC questions to "No"
    const picOwnNo = screen.getByRole('radio', { name: /no, not person-in-charge of own clinic/i });
    fireEvent.click(picOwnNo);

    const picExtNo = screen.getByRole('radio', { name: /no, not person-in-charge of another facility/i });
    fireEvent.click(picExtNo);

    // Verify PIC reconciliation notice appears
    expect(
      await screen.findByText(/notice: person-in-charge coverage was removed because no pic role is declared/i)
    ).toBeInTheDocument();

    // Verify PIC card is hidden
    expect(screen.queryByRole('checkbox', { name: /person-in-charge \(pic\) statutory defense extension/i })).not.toBeInTheDocument();
  });

  it('displays complimentary automatic reinstatement per RULE-RST-01', async () => {
    render(
      <WorkflowProvider>
        <Stage2TestHarness />
      </WorkflowProvider>
    );

    await screen.findByRole('heading', { name: /your indicative chubb indemnity quote/i });

    expect(screen.getByText(/automatic reinstatement endorsement/i)).toBeInTheDocument();
    expect(screen.getByText(/complimentary included/i)).toBeInTheDocument();
    expect(
      screen.getByText(/your insurance comes with complimentary automatic reinstatement now/i)
    ).toBeInTheDocument();
  });

  it('opens and closes educational "Why is this recommended?" modals', async () => {
    render(
      <WorkflowProvider>
        <Stage2TestHarness />
      </WorkflowProvider>
    );

    await screen.findByRole('heading', { name: /your indicative chubb indemnity quote/i });

    // Clinic ownership -> Yes to reveal clinic card
    const clinicYesRadio = screen.getByRole('radio', { name: /yes, i own or partner in a private clinic/i });
    fireEvent.click(clinicYesRadio);

    // Open Clinic Why Modal
    const clinicWhyBtn = await screen.findByRole('button', { name: /why clinic coverage is recommended/i });
    fireEvent.click(clinicWhyBtn);

    expect(
      await screen.findByRole('heading', { name: /why is clinic facility cover recommended/i })
    ).toBeInTheDocument();
    expect(screen.getAllByText(/vicarious liability/i).length).toBeGreaterThanOrEqual(1);

    // Close Clinic Modal
    const closeClinicModalBtn = screen.getByRole('button', { name: /understood/i });
    fireEvent.click(closeClinicModalBtn);

    // PIC question -> Yes to reveal PIC card
    const picOwnYes = screen.getByRole('radio', { name: /yes, i am person-in-charge of my own clinic/i });
    fireEvent.click(picOwnYes);

    // Open PIC Why Modal
    const picWhyBtn = await screen.findByRole('button', { name: /why pic coverage is recommended/i });
    fireEvent.click(picWhyBtn);

    expect(
      await screen.findByRole('heading', { name: /why is person-in-charge \(pic\) protection recommended/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/private healthcare facilities and services act 1998/i)).toBeInTheDocument();

    // Close PIC Modal
    const closePicModalBtn = screen.getByRole('button', { name: /understood/i });
    fireEvent.click(closePicModalBtn);
  });

  it('supports sending indicative quote and policy wording via email modal', async () => {
    const sendMailSpy = vi.spyOn(RatingService, 'sendIndicativeQuoteMail').mockResolvedValueOnce({
      success: true,
      quotation_number: 'DS-2026-99355',
      quote_token: 'QT-TEST',
      recipient_email: 'dr.azman@chubb.com.my',
      valid_days: 30,
      message: 'Your indicative quotation and Chubb policy wording have been successfully emailed to dr.azman@chubb.com.my. Rate lock active for 30 days.',
    });

    render(
      <WorkflowProvider>
        <Stage2TestHarness />
      </WorkflowProvider>
    );

    await screen.findByRole('heading', { name: /your indicative chubb indemnity quote/i });

    // Clinic ownership: No, PIC: No
    fireEvent.click(screen.getByRole('radio', { name: /no, i do not own or partner in a private clinic/i }));
    fireEvent.click(screen.getByRole('radio', { name: /no, not person-in-charge of own clinic/i }));
    fireEvent.click(screen.getByRole('radio', { name: /no, not person-in-charge of another facility/i }));

    // Switch fulfillment mode to "Email me Indicative Quotation"
    const emailModeRadio = screen.getByRole('radio', { name: /email me indicative quotation & policy wording/i });
    fireEvent.click(emailModeRadio);

    // Click "Email Quotation PDF" action button
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /^email quotation pdf$/i })).not.toBeDisabled();
    });
    const emailQuoteBtn = screen.getByRole('button', { name: /^email quotation pdf$/i });
    fireEvent.click(emailQuoteBtn);

    // Verify modal is open
    expect(
      await screen.findByRole('heading', { name: /email indicative quotation/i })
    ).toBeInTheDocument();

    // Verify prefilled email
    const emailField = screen.getByLabelText(/recipient email address/i);
    expect(emailField).toHaveValue('dr.azman@chubb.com.my');

    // Click Send Quotation PDF
    const sendBtn = screen.getByRole('button', { name: /send quotation pdf/i });
    fireEvent.click(sendBtn);

    // Verify call to RatingService
    await waitFor(() => {
      expect(sendMailSpy).toHaveBeenCalledWith(
        'dr.azman@chubb.com.my',
        expect.any(String),
        expect.any(String)
      );
    });

    // Confirmation message appears
    expect(
      await screen.findByText(/your indicative quotation and chubb policy wording/i)
    ).toBeInTheDocument();
  });
});
