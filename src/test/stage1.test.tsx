import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { WorkflowProvider } from '../core/state/WorkflowContext';
import { App } from '../app/App';
import { RatingService } from '../core/api/ratingService';

describe('Stage 1 Coverage & Premium Calculation Form (SCR-TOBE-01)', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    window.history.pushState(null, '', '/buy/coverage');
  });

  it('renders all required Stage 1 fields, verbatim legal notices, and PIDM statement', () => {
    render(
      <WorkflowProvider>
        <App />
      </WorkflowProvider>
    );

    // 1. Heading & Instructions
    expect(
      screen.getByRole('heading', { name: /select your professional coverage/i })
    ).toBeInTheDocument();

    // 2. Practitioner Classification (FLD-CALC-CLASS-001)
    expect(screen.getByLabelText(/practitioner classification/i)).toBeInTheDocument();
    expect(screen.getAllByText(/General Medical Practitioner/i).length).toBeGreaterThanOrEqual(1);

    // 3. Limit of Liability Radio Group (FLD-CALC-LIAB-002)
    expect(
      screen.getByRole('radiogroup', { name: /limit of liability options/i })
    ).toBeInTheDocument();
    expect(screen.getAllByText('RM 1,000,000').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('RM 2,000,000').length).toBeGreaterThanOrEqual(1);

    // 4. Coverage Start and End Dates (FLD-CALC-DATE-START-003, FLD-CALC-DATE-END-004)
    expect(screen.getByLabelText(/coverage inception date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/coverage expiry date/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /why 31st december\?/i })).toBeInTheDocument();

    // 5. Customer Email (FLD-CALC-EMAIL-005)
    expect(screen.getByLabelText(/practitioner email address/i)).toBeInTheDocument();

    // 6. Promo Code Input & Button (FLD-CALC-PROMO-006)
    expect(
      screen.getByLabelText(/promotional \/ association code/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /apply code/i })).toBeInTheDocument();

    // 7. Statutory PIDM Protection Notice (LEG-PIDM-001)
    expect(screen.getByText(/PIDM Statutory Protection Notice:/i)).toBeInTheDocument();
    expect(screen.getByText(/protected by PIDM up to limits/i)).toBeInTheDocument();

    // 8. Verbatim Terms & Conditions Consent Checkbox (FLD-CALC-CONSENT-007)
    expect(
      screen.getByLabelText(
        /i have read, understood and agree to the terms and conditions, privacy policy and i meet all local regulation to practice my profession/i
      )
    ).toBeInTheDocument();

    // 9. Generate Quotation Primary Action (ACT-NAV-NEXT-001)
    expect(screen.getByRole('button', { name: /generate quotation/i })).toBeInTheDocument();
  });

  it('enforces validation on required fields and displays accessible error alerts', async () => {
    render(
      <WorkflowProvider>
        <App />
      </WorkflowProvider>
    );

    const submitBtn = screen.getByRole('button', { name: /generate quotation/i });
    fireEvent.click(submitBtn);

    // Should display validation errors
    expect(screen.getAllByText(/please enter your email address/i).length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getByText(/you must agree to the terms and conditions and regulatory compliance to proceed/i)
    ).toBeInTheDocument();

    // Should not advance to Stage 2
    expect(screen.queryByRole('heading', { name: /your indicative chubb indemnity quote/i })).not.toBeInTheDocument();
  });

  it('validates email format strictly according to RFC 5322 rules', async () => {
    render(
      <WorkflowProvider>
        <App />
      </WorkflowProvider>
    );

    const emailInput = screen.getByLabelText(/practitioner email address/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email-string' } });

    const submitBtn = screen.getByRole('button', { name: /generate quotation/i });
    fireEvent.click(submitBtn);

    expect(screen.getAllByText(/please enter a valid email address/i).length).toBeGreaterThanOrEqual(1);
  });

  it('enforces 9-month forward ceiling rule (RULE-DATE-01)', () => {
    render(
      <WorkflowProvider>
        <App />
      </WorkflowProvider>
    );

    const startDateInput = screen.getByLabelText(/coverage inception date/i);

    // Pick a date 10 months ahead
    const tenMonthsAhead = new Date();
    tenMonthsAhead.setMonth(tenMonthsAhead.getMonth() + 10);
    const dateStr = tenMonthsAhead.toISOString().split('T')[0];

    fireEvent.change(startDateInput, { target: { value: dateStr } });

    expect(
      screen.getByText(/start date cannot exceed 9 months from today/i)
    ).toBeInTheDocument();
  });

  it('triggers Clause 6.12 Backdating Agreement Modal when selecting past date (RULE-DATE-02)', async () => {
    render(
      <WorkflowProvider>
        <App />
      </WorkflowProvider>
    );

    const startDateInput = screen.getByLabelText(/coverage inception date/i);

    // Pick past date (e.g. 2026-01-01)
    fireEvent.change(startDateInput, { target: { value: '2026-01-01' } });

    // Modal should appear with verbatim Clause 6.12 text
    expect(
      await screen.findByRole('heading', { name: /policy backdate agreement \(clause 6\.12\)/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/CHUBB ELITE MEDICAL MALPRACTICE INSURANCE FOR PERIOD OF INSURANCE/i)
    ).toBeInTheDocument();

    // Click Agree & Acknowledge
    const agreeBtn = screen.getByRole('button', { name: /i agree & acknowledge/i });
    fireEvent.click(agreeBtn);

    // Modal closes and start date is set to 01/01 of current year
    await waitFor(() => {
      expect(
        screen.queryByRole('heading', { name: /policy backdate agreement \(clause 6\.12\)/i })
      ).not.toBeInTheDocument();
    });

    const currentYear = new Date().getFullYear();
    expect(startDateInput).toHaveValue(`${currentYear}-01-01`);
  });

  it('opens and closes MMC APC 31st December period info modal (RULE-DATE-03)', async () => {
    render(
      <WorkflowProvider>
        <App />
      </WorkflowProvider>
    );

    const whyBtn = screen.getByRole('button', { name: /why 31st december\?/i });
    fireEvent.click(whyBtn);

    expect(
      await screen.findByRole('heading', { name: /why does my policy end on 31st december\?/i })
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/Malaysian Medical Council/i).length
    ).toBeGreaterThanOrEqual(1);

    const understoodBtn = screen.getByRole('button', { name: /understood/i });
    fireEvent.click(understoodBtn);

    await waitFor(() => {
      expect(
        screen.queryByRole('heading', { name: /why does my policy end on 31st december\?/i })
      ).not.toBeInTheDocument();
    });
  });

  it('verifies partner promo code validation via RatingService', async () => {
    render(
      <WorkflowProvider>
        <App />
      </WorkflowProvider>
    );

    const promoInput = screen.getByLabelText(/promotional \/ association code/i);
    const applyBtn = screen.getByRole('button', { name: /apply code/i });

    // Test invalid code
    fireEvent.change(promoInput, { target: { value: 'FAKECODE' } });
    fireEvent.click(applyBtn);

    expect(await screen.findByText(/please enter a valid promo code/i)).toBeInTheDocument();

    // Test valid MMA2026 code
    fireEvent.change(promoInput, { target: { value: 'MMA2026' } });
    fireEvent.click(applyBtn);

    expect(
      await screen.findByText(/10% Malaysian Medical Association \(MMA\) discount applied/i)
    ).toBeInTheDocument();

    // Test removing code
    const removeBtn = screen.getByRole('button', { name: /remove/i });
    fireEvent.click(removeBtn);

    expect(screen.queryByText(/discount applied/i)).not.toBeInTheDocument();
  });

  it('activates Specialization Allocation Modal for GP Aesthetics (RULE-SPC-01)', async () => {
    render(
      <WorkflowProvider>
        <App />
      </WorkflowProvider>
    );

    const classSelect = screen.getByLabelText(/practitioner classification/i);
    // Switch to General Medical Practitioner with Cosmetic and Aesthetic (ID 20)
    fireEvent.change(classSelect, { target: { value: '20' } });

    expect(
      screen.getByText(/Specialization Allocation Required \(RULE-SPC-01\)/i)
    ).toBeInTheDocument();

    const allocateBtn = screen.getByRole('button', {
      name: /allocate specialization percentages/i,
    });
    fireEvent.click(allocateBtn);

    // Modal dialog is displayed
    expect(
      await screen.findByRole('heading', { name: /allocate practice specialization percentages/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/100% balanced/i)).toBeInTheDocument();

    const saveBtn = screen.getByRole('button', { name: /save allocation/i });
    fireEvent.click(saveBtn);

    await waitFor(() => {
      expect(
        screen.queryByRole('heading', { name: /allocate practice specialization percentages/i })
      ).not.toBeInTheDocument();
    });
  });

  it('calculates quotation with authoritative backend service and transitions to Stage 2', async () => {
    const spyCalculate = vi.spyOn(RatingService, 'calculatePremium');

    render(
      <WorkflowProvider>
        <App />
      </WorkflowProvider>
    );

    // Fill valid form
    const emailInput = screen.getByLabelText(/practitioner email address/i);
    fireEvent.change(emailInput, { target: { value: 'dr.azman@chubb.com.my' } });

    const consentCheckbox = screen.getByRole('checkbox', {
      name: /i have read, understood and agree/i,
    });
    fireEvent.click(consentCheckbox);

    // Select RM 2,000,000 tier
    const tier2m = screen.getByRole('radio', { name: /RM 2,000,000/i });
    fireEvent.click(tier2m);

    const submitBtn = screen.getByRole('button', { name: /generate quotation/i });
    fireEvent.click(submitBtn);

    // Verify rating service was invoked with correct payload
    await waitFor(() => {
      expect(spyCalculate).toHaveBeenCalledWith(
        expect.objectContaining({
          classification_id: '7',
          liability_id: '2m',
          customer_email: 'dr.azman@chubb.com.my',
          clause_6_12_accepted: false,
        })
      );
    });

    // Verify transition to Stage 2
    expect(
      await screen.findByRole('heading', { name: /your indicative chubb indemnity quote/i })
    ).toBeInTheDocument();

    // Verify back navigation preserves data
    const backBtn = screen.getByRole('button', { name: /edit coverage details/i });
    fireEvent.click(backBtn);

    expect(
      await screen.findByRole('heading', { name: /select your professional coverage/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/practitioner email address/i)).toHaveValue(
      'dr.azman@chubb.com.my'
    );
  });
});
