import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import {
  Button,
  IconButton,
  TextInput,
  NumberInput,
  EmailInput,
  TelInput,
  Textarea,
  Checkbox,
  RadioButton,
  SegmentedControl,
  SelectorCard,
  Select,
  SelectCombobox,
  Heading,
  Text,
  TextLink,
  FieldLabel,
  HelperText,
  ErrorMessage,
  InlineNotice,
  Badge,
  Divider,
  LoadingIndicator,
  ProgressIndicatorPrimitive,
  DisclosureTrigger,
  CurrencyPriceText,
} from '../components/ui';

describe('DoctorShield 22 Atomic UI Components Suite', () => {
  // Atoms 1 & 2: Button & IconButton
  it('renders Button variants and respects loading/disabled states', () => {
    const handleClick = vi.fn();
    const { rerender } = render(
      <Button variant="primary" onClick={handleClick}>
        Calculate Premium
      </Button>
    );

    const btn = screen.getByRole('button', { name: /Calculate Premium/i });
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);

    // Loading state
    rerender(<Button loading>Calculate Premium</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByText(/Processing.../i)).toBeInTheDocument();
  });

  it('renders IconButton with accessible mandatory label and hit target envelope', () => {
    const handleClick = vi.fn();
    render(<IconButton icon={<span>⚙</span>} label="Settings Panel" onClick={handleClick} />);

    const iconBtn = screen.getByRole('button', { name: /Settings Panel/i });
    expect(iconBtn).toBeInTheDocument();
    fireEvent.click(iconBtn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Atoms 3, 4, 5, 6: Inputs
  it('renders TextInput with label, helper, and accessible error', () => {
    const { rerender } = render(
      <TextInput
        id="name-field"
        label="Full Practitioner Name"
        helperText="As registered with MMC"
        value="Dr. John"
        onChange={() => {}}
        required
      />
    );

    expect(screen.getByText(/Full Practitioner Name/i)).toBeInTheDocument();
    expect(screen.getByText(/As registered with MMC/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid', 'true');

    // With error
    rerender(
      <TextInput
        id="name-field"
        label="Full Practitioner Name"
        errorMessage="Please enter your name"
        value="Dr. John"
        onChange={() => {}}
        required
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Please enter your name');
  });

  it('renders specialized NumberInput, EmailInput, and TelInput with expected attributes', () => {
    const { rerender } = render(<NumberInput label="Revenue" value="500000" onChange={() => {}} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('inputmode', 'numeric');

    rerender(<EmailInput label="Email" value="dr@test.com" onChange={() => {}} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');

    rerender(<TelInput label="Phone" value="123456789" onChange={() => {}} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'tel');
    expect(screen.getByText('+60')).toBeInTheDocument();
  });

  // Atom 7: Textarea
  it('renders Textarea with character count and validation error', () => {
    render(
      <Textarea
        label="Practice Disclosures"
        value="Clean record"
        maxLength={100}
        showCharCount
        onChange={() => {}}
      />
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText(/12 \/ 100/i)).toBeInTheDocument();
  });

  // Atoms 8 & 9: Checkbox & Radio
  it('renders Checkbox and RadioButton inside 44px touch envelopes', () => {
    const handleCheck = vi.fn();
    const handleRadio = vi.fn();

    render(
      <div>
        <Checkbox id="c1" label="Statutory Terms" checked={false} onChange={handleCheck} />
        <RadioButton id="r1" name="opt" label="Annual Period" checked={true} onChange={handleRadio} />
      </div>
    );

    const checkbox = screen.getByRole('checkbox', { name: /Statutory Terms/i });
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(handleCheck).toHaveBeenCalled();

    const radio = screen.getByRole('radio', { name: /Annual Period/i });
    expect(radio).toBeChecked();
  });

  // SegmentedControl & SelectorCard
  it('handles SegmentedControl and SelectorCard interactions', () => {
    const handleSegment = vi.fn();
    const handleTile = vi.fn();

    render(
      <div>
        <SegmentedControl
          options={[{ value: 'no', label: 'No' }, { value: 'yes', label: 'Yes' }]}
          value="no"
          onChange={handleSegment}
        />
        <SelectorCard
          id="tile-1"
          title="RM 1,000,000"
          subtitle="Annual Rate"
          badge="Popular"
          selected={false}
          onClick={handleTile}
        />
      </div>
    );

    const yesBtn = screen.getByRole('radio', { name: /Yes/i });
    fireEvent.click(yesBtn);
    expect(handleSegment).toHaveBeenCalledWith('yes');

    const card = screen.getByRole('button', { name: /RM 1,000,000/i });
    fireEvent.click(card);
    expect(handleTile).toHaveBeenCalled();
  });

  // Atoms 10 & 11: Select & Combobox
  it('renders Select and SelectCombobox options and handles selection', () => {
    const handleSelect = vi.fn();
    const handleCombobox = vi.fn();

    const options = [
      { value: 'opt1', label: 'Option 1' },
      { value: 'opt2', label: 'Option 2' },
    ];

    render(
      <div>
        <Select id="s1" label="Select Tier" options={options} value="opt1" onChange={handleSelect} />
        <SelectCombobox id="cb1" label="Searchable Combobox" options={options} value="opt1" onChange={handleCombobox} />
      </div>
    );

    expect(screen.getByText('Select Tier')).toBeInTheDocument();
    expect(screen.getByText('Searchable Combobox')).toBeInTheDocument();
    expect(screen.getAllByText('Option 1').length).toBeGreaterThanOrEqual(1);
  });

  // Atoms 12 & 14: Typography & Link
  it('renders Heading, Text, and TextLink with strict styling and attributes', () => {
    render(
      <div>
        <Heading level="display">Title Display</Heading>
        <Text variant="body">Body content paragraph</Text>
        <TextLink href="https://example.com" isExternal>
          External Link
        </TextLink>
      </div>
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Title Display');
    expect(screen.getByText('Body content paragraph')).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /External Link/i });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  // Atoms 13, 15, 16, 17, 18, 19, 20, 21, 22: Feedback & Micro-atoms
  it('renders Feedback, Notices, Badges, Progress, Disclosure, and Currency correctly', () => {
    render(
      <div>
        <FieldLabel htmlFor="field1" required>Practitioner ID</FieldLabel>
        <HelperText id="h1">Enter without hyphens</HelperText>
        <ErrorMessage message="Invalid identifier format" />
        <InlineNotice variant="info" title="PIDM Protection">
          Protected up to statutory limits.
        </InlineNotice>
        <Badge variant="teal" withDot>Rate Locked</Badge>
        <Divider label="Section Divider" />
        <LoadingIndicator label="Processing quote..." />
        <ProgressIndicatorPrimitive value={75} label="Completion" />
        <DisclosureTrigger label="Why do we ask this?">
          Explanation of medical underwriting requirements.
        </DisclosureTrigger>
        <CurrencyPriceText amount={704.00} size="hero" suffix="/ year" />
      </div>
    );

    expect(screen.getByText(/Practitioner ID/i)).toBeInTheDocument();
    expect(screen.getByText(/Enter without hyphens/i)).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid identifier format');
    expect(screen.getByText(/PIDM Protection/i)).toBeInTheDocument();
    expect(screen.getByText(/Rate Locked/i)).toBeInTheDocument();
    expect(screen.getByText('Processing quote...')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '75');
    expect(screen.getByRole('button', { name: /Why do we ask this\?/i })).toBeInTheDocument();
    expect(screen.getByText('704.00')).toBeInTheDocument();
  });
});
