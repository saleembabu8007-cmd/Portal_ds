import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Button } from '../components/ui/Button';
import { TextInput } from '../components/ui/TextInput';
import { LiabilityLimitSelector } from '../components/insurance/LiabilityLimitSelector';
import { SpecializationAllocationEditor } from '../components/insurance/SpecializationAllocationEditor';
import { CoverageDateField } from '../components/insurance/CoverageDateField';
import { PremiumBreakdown, PremiumQuoteData } from '../components/insurance/PremiumDisplay';

describe('DoctorShield Component Suite', () => {
  // Test 1: Button
  it('Button renders correctly and handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Proceed to Application</Button>);

    const button = screen.getByRole('button', { name: /Proceed to Application/i });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('Button shows loading state and is disabled while loading', () => {
    render(<Button loading>Processing</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toBeDisabled();
    expect(screen.getByText(/Processing.../i)).toBeInTheDocument();
  });

  // Test 2: TextInput
  it('TextInput renders label, handles input, and displays accessible error', () => {
    render(
      <TextInput
        id="email-test"
        label="Email Address"
        required
        errorMessage="Please enter a valid email address."
        value="test"
        onChange={() => {}}
      />
    );

    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Please enter a valid email address.');
  });

  // Test 3: LiabilityLimitSelector
  it('LiabilityLimitSelector renders tiers and triggers onChange on selection', () => {
    const handleChange = vi.fn();
    const tiers = [
      { id: '500k', limitAmount: 500000, limitFormatted: 'RM 500,000', indicativeAnnualRate: 400 },
      { id: '1m', limitAmount: 1000000, limitFormatted: 'RM 1,000,000', indicativeAnnualRate: 650, isRecommended: true },
    ];

    render(
      <LiabilityLimitSelector
        tiers={tiers}
        selectedTierId="500k"
        onChange={handleChange}
      />
    );

    const tier1m = screen.getByText('RM 1,000,000');
    expect(tier1m).toBeInTheDocument();
    expect(screen.getByText('Recommended')).toBeInTheDocument();

    fireEvent.click(tier1m);
    expect(handleChange).toHaveBeenCalledWith('1m');
  });

  // Test 4: SpecializationAllocationEditor Live Math
  it('SpecializationAllocationEditor validates 100% sum and auto-balances', () => {
    const handleSave = vi.fn();
    const specialties = [
      { id: '1', name: 'General Practice', percentage: 60 },
      { id: '2', name: 'Aesthetics', percentage: 30 }, // Sum = 90% (Deficit 10%)
    ];

    render(
      <SpecializationAllocationEditor
        specialties={specialties}
        onSave={handleSave}
      />
    );

    // Initial state: 10% deficit
    expect(screen.getByText(/Remaining to allocate: 10.0%/i)).toBeInTheDocument();
    const submitBtn = screen.getByRole('button', { name: /Confirm Allocation/i });
    expect(submitBtn).toBeDisabled();

    // Click Distribute Evenly
    const autoBalanceBtn = screen.getByRole('button', { name: /Distribute Evenly/i });
    fireEvent.click(autoBalanceBtn);

    // Balanced state
    expect(screen.getByText(/Allocation Balanced \(100.0%\)/i)).toBeInTheDocument();
    expect(submitBtn).toBeEnabled();

    fireEvent.click(submitBtn);
    expect(handleSave).toHaveBeenCalled();
  });

  // Test 5: CoverageDateField & Backdating Clause 6.12 Interception
  it('CoverageDateField intercepts backdated dates and displays Clause 6.12 modal', () => {
    const handleDateChange = vi.fn();

    render(
      <CoverageDateField
        id="date-test"
        startDate="2026-11-01"
        onStartDateChange={handleDateChange}
      />
    );

    const input = screen.getByLabelText(/Coverage Inception Date/i);
    
    // Pick past date (e.g. 2025-01-01)
    fireEvent.change(input, { target: { value: '2025-01-01' } });

    // Modal dialog opens
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/Notice on Backdated Coverage \(Clause 6.12\)/i)).toBeInTheDocument();

    // Click Agree -> mutates to current year 01/01
    const agreeBtn = screen.getByRole('button', { name: /I Agree to Clause 6.12 Terms/i });
    fireEvent.click(agreeBtn);

    const currentYear = new Date().getFullYear();
    expect(handleDateChange).toHaveBeenCalledWith(`${currentYear}-01-01`, true);
  });

  // Test 6: PremiumBreakdown Calculation
  it('PremiumBreakdown correctly renders SST 8%, stamp duty, and total payable', () => {
    const quote: PremiumQuoteData = {
      grossBase: 1000.0,
      discountAmount: 100.0,
      promoCode: 'MMA2026',
      clinicEntityCover: 200.0,
      branchSurcharges: 100.0,
      isPicComplimentary: true,
      netGross: 1200.0,
      sstAmount: 96.0, // 8% of 1200
      stampDuty: 10.0,
      totalPayable: 1306.0,
    };

    render(<PremiumBreakdown quote={quote} />);

    expect(screen.getByText(/RM 1000.00/i)).toBeInTheDocument();
    expect(screen.getByText(/- RM 100.00/i)).toBeInTheDocument();
    expect(screen.getByText(/RM 96.00/i)).toBeInTheDocument(); // SST 8%
    expect(screen.getByText(/RM 10.00/i)).toBeInTheDocument(); // Stamp Duty
    expect(screen.getByText(/RM 1306.00/i)).toBeInTheDocument(); // Total
  });
});
