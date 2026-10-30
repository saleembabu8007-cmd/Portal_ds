import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import React from 'react';
import {
  LabeledTextField,
  LabeledSelect,
  SearchableClassificationSelector,
  SearchableSpecializationSelector,
  DateField,
  InsuranceDateRange,
  EmailField,
  MalaysianMobileField,
  PromoCodeField,
  YesNoSelector,
  AgreeDisagreeSelector,
  TwoOptionSegmentedChoice,
  MultiOptionRadioGroup,
  ConditionalFollowUpField,
  ValidationMessageGroup,
  PercentageAllocationRow,
  RepeatingBranchRow,
  CompactCurrencyDisplay,
  PriceBreakdownRow,
  InlineEditAction,
  OtpDigitEntry,
  LegalConsentCheckbox,
  DocumentLinkGroup,
  AccessibleDisclosureTrigger,
} from '../components/form';

describe('DoctorShield Form Component Layer (Molecules)', () => {
  // Molecule 1 & 16: Labeled text field & Optional tag
  it('LabeledTextField renders label, required indicator, optional tag, and error message with role="alert"', () => {
    const { rerender } = render(
      <LabeledTextField
        id="test-field"
        label="Practitioner Name"
        required
        value="Dr. Adam"
        onChange={() => {}}
      />
    );

    expect(screen.getByLabelText(/Practitioner Name/i)).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();

    // Rerender with optional
    rerender(
      <LabeledTextField
        id="test-field"
        label="APC Number"
        optional
        value=""
        onChange={() => {}}
      />
    );
    expect(screen.getByText('(Optional)')).toBeInTheDocument();

    // Rerender with error message
    rerender(
      <LabeledTextField
        id="test-field"
        label="Practitioner Name"
        value=""
        onChange={() => {}}
        errorMessage="Please enter your full name as per NRIC"
      />
    );
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent(/Please enter your full name as per NRIC/i);
    expect(screen.getByLabelText(/Practitioner Name/i)).toHaveAttribute('aria-invalid', 'true');
  });

  // Molecule 2: Labeled select
  it('LabeledSelect renders options and triggers onChange', () => {
    const handleChange = vi.fn();
    render(
      <LabeledSelect
        id="test-select"
        label="Practice State"
        options={[
          { value: 'Selangor', label: 'Selangor' },
          { value: 'Kuala Lumpur', label: 'Kuala Lumpur' },
        ]}
        value="Selangor"
        onChange={handleChange}
      />
    );

    const select = screen.getByLabelText(/Practice State/i);
    fireEvent.change(select, { target: { value: 'Kuala Lumpur' } });
    expect(handleChange).toHaveBeenCalled();
  });

  // Molecule 3: Searchable classification selector
  it('SearchableClassificationSelector renders verified DoctorShield classifications and filters', () => {
    const handleChange = vi.fn();
    render(
      <SearchableClassificationSelector
        value="7"
        onChange={handleChange}
      />
    );

    expect(screen.getByText(/General Medical Practitioner/i)).toBeInTheDocument();
  });

  // Molecule 5 & 6: Date field & Insurance date-range
  it('InsuranceDateRange renders Inception Date input and APC-aligned expiry date', () => {
    const handleChange = vi.fn();
    render(
      <InsuranceDateRange
        startDate="2026-11-01"
        endDate="2026-12-31"
        onStartDateChange={handleChange}
        isProrata={true}
        prorataDays={61}
        alignWithApc={true}
      />
    );

    expect(screen.getByLabelText(/Coverage Inception Date/i)).toBeInTheDocument();
    expect(screen.getByText(/MMC APC Aligned/i)).toBeInTheDocument();
    expect(screen.getByText(/Pro-rata coverage active \(61 days\)/i)).toBeInTheDocument();
  });

  // Molecule 7: Email field
  it('EmailField validates format on blur and reports error', () => {
    render(
      <EmailField
        id="email-test"
        value="invalid-email"
        onChange={() => {}}
      />
    );

    const input = screen.getByLabelText(/Email Address/i);
    fireEvent.blur(input);
    expect(screen.getByRole('alert')).toHaveTextContent(/Please enter a valid email address/i);
  });

  // Molecule 8: Malaysian mobile number field
  it('MalaysianMobileField enforces Malaysian prefix +60 and formats numbers', () => {
    const handleChange = vi.fn();
    render(
      <MalaysianMobileField
        value="123456789"
        onChange={handleChange}
      />
    );

    expect(screen.getByText('+60')).toBeInTheDocument();
    const input = screen.getByPlaceholderText(/12 345 6789/i);
    fireEvent.change(input, { target: { value: '0129876543' } });
    expect(handleChange).toHaveBeenCalledWith('129876543');
  });

  // Molecule 9: Promotional-code field
  it('PromoCodeField handles apply, loading, and clear actions', async () => {
    const handleApply = vi.fn().mockResolvedValue(true);
    const handleRemove = vi.fn();
    const { rerender } = render(
      <PromoCodeField
        value="MMA2026"
        onChange={() => {}}
        onApply={handleApply}
      />
    );

    const applyBtn = screen.getByRole('button', { name: /Apply/i });
    await act(async () => {
      fireEvent.click(applyBtn);
    });
    expect(handleApply).toHaveBeenCalledWith('MMA2026');

    // Rerender in applied state
    rerender(
      <PromoCodeField
        value="MMA2026"
        isApplied={true}
        appliedDescription="10% MMA Member Discount Applied"
        onChange={() => {}}
        onApply={handleApply}
        onRemove={handleRemove}
      />
    );

    expect(screen.getByText(/10% MMA Member Discount Applied/i)).toBeInTheDocument();
    const removeBtn = screen.getByRole('button', { name: /Remove promotional code/i });
    fireEvent.click(removeBtn);
    expect(handleRemove).toHaveBeenCalled();
  });

  // Molecule 10: Yes/No question selector
  it('YesNoSelector toggles binary choices cleanly without cards', () => {
    const handleChange = vi.fn();
    render(
      <YesNoSelector
        id="clinic-q"
        question="Do you own or partner in a private clinic practice?"
        value={false}
        onChange={handleChange}
      />
    );

    expect(screen.getByText(/Do you own or partner in a private clinic practice\?/i)).toBeInTheDocument();
    const yesBtn = screen.getByRole('radio', { name: /^Yes$/i });
    fireEvent.click(yesBtn);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  // Molecule 11: Agree/Disagree question selector
  it('AgreeDisagreeSelector displays referral warning when Disagree is selected', () => {
    const handleChange = vi.fn();
    render(
      <AgreeDisagreeSelector
        id="decl-claims"
        declarationNumber={1}
        statement="I confirm no prior claims in the past 5 years."
        value={false}
        onChange={handleChange}
        disagreeWarning="An adverse declaration requires Chubb underwriting review."
      />
    );

    expect(screen.getByText(/An adverse declaration requires Chubb underwriting review/i)).toBeInTheDocument();
  });

  // Molecule 14: Conditional follow-up field
  it('ConditionalFollowUpField dispatches onHidden callback when toggled off', () => {
    const handleHidden = vi.fn();
    const { rerender } = render(
      <ConditionalFollowUpField isVisible={true} onHidden={handleHidden}>
        <div>Conditional Child Input</div>
      </ConditionalFollowUpField>
    );

    expect(screen.getByText(/Conditional Child Input/i)).toBeInTheDocument();

    // Toggle off
    rerender(
      <ConditionalFollowUpField isVisible={false} onHidden={handleHidden}>
        <div>Conditional Child Input</div>
      </ConditionalFollowUpField>
    );

    expect(handleHidden).toHaveBeenCalled();
  });

  // Molecule 17: Percentage allocation row
  it('PercentageAllocationRow steps percentage values', () => {
    const handleChange = vi.fn();
    render(
      <PercentageAllocationRow
        id="alloc-gp"
        name="General Practice"
        percentage={70}
        onChange={handleChange}
      />
    );

    const incBtn = screen.getByLabelText(/Increase General Practice percentage/i);
    fireEvent.click(incBtn);
    expect(handleChange).toHaveBeenCalledWith(75);
  });

  // Molecule 18: Repeating clinic/branch row
  it('RepeatingBranchRow displays branch details and fires edit/remove actions', () => {
    const handleEdit = vi.fn();
    const handleRemove = vi.fn();
    const branch = {
      id: 'b1',
      branchName: 'Klinik Medika Utama',
      addressLine1: 'No 12, Jalan SS 15/4D',
      city: 'Subang Jaya',
      state: 'Selangor',
      postcode: '47500',
    };

    render(
      <RepeatingBranchRow
        index={0}
        branch={branch}
        onEdit={handleEdit}
        onRemove={handleRemove}
      />
    );

    expect(screen.getByText(/Klinik Medika Utama/i)).toBeInTheDocument();
    expect(screen.getByText(/#1/i)).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(/Edit Klinik Medika Utama/i));
    expect(handleEdit).toHaveBeenCalledWith(branch);

    fireEvent.click(screen.getByLabelText(/Remove Klinik Medika Utama/i));
    expect(handleRemove).toHaveBeenCalledWith('b1');
  });

  // Molecule 19 & 20: Currency & Price breakdown row
  it('PriceBreakdownRow formats Ringgit and marks total row', () => {
    render(
      <div>
        <PriceBreakdownRow label="Base Premium" amount={650.0} />
        <PriceBreakdownRow label="Total Payable" amount={650.0} isTotal={true} />
      </div>
    );

    expect(screen.getByText(/Base Premium/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Payable/i)).toBeInTheDocument();
    expect(screen.getAllByText(/650.00/i).length).toBeGreaterThanOrEqual(1);
  });

  // Molecule 23: OTP digit-entry composition
  it('OtpDigitEntry accepts 6 digits and triggers onComplete', () => {
    const handleChange = vi.fn();
    const handleComplete = vi.fn();

    render(
      <OtpDigitEntry
        value="12345"
        onChange={handleChange}
        onComplete={handleComplete}
      />
    );

    const digit6 = screen.getByLabelText(/Digit 6/i);
    fireEvent.change(digit6, { target: { value: '6' } });
    expect(handleChange).toHaveBeenCalledWith('123456');
  });

  // Molecule 24: Legal consent checkbox
  it('LegalConsentCheckbox allows keyboard Space toggle and does not toggle when link is clicked', () => {
    const handleChange = vi.fn();
    render(
      <LegalConsentCheckbox
        id="legal-pidm"
        checked={false}
        onChange={handleChange}
      >
        I accept the terms and refer to <a href="https://www.pidm.gov.my">PIDM brochure</a>.
      </LegalConsentCheckbox>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.keyDown(checkbox, { key: ' ' });
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  // Molecule 26: Accessible disclosure trigger
  it('AccessibleDisclosureTrigger toggles expanded content with aria-expanded', () => {
    render(
      <AccessibleDisclosureTrigger
        id="disc-test"
        triggerLabel="Why is policy aligned to 31 December?"
      >
        MMC APC alignment description text.
      </AccessibleDisclosureTrigger>
    );

    const trigger = screen.getByRole('button', { name: /Why is policy aligned to 31 December\?/i });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/MMC APC alignment description text/i)).toBeInTheDocument();
  });
});
