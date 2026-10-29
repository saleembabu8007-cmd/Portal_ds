import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { WorkflowProvider } from '../core/state/WorkflowContext';
import { App } from '../app/App';
import { SkipLink } from '../components/layout/SkipLink';
import { BrandHeader } from '../components/layout/BrandHeader';
import { AppFooter } from '../components/layout/AppFooter';
import { LiveAnnouncer } from '../components/layout/LiveAnnouncer';

describe('Application Shell & Foundation Infrastructure', () => {
  it('renders the SkipLink with accessible anchor targeting #main-content', () => {
    render(<SkipLink targetId="main-content" />);
    const link = screen.getByRole('link', { name: /skip to main content/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#main-content');
  });

  it('renders the BrandHeader with DoctorShield identity and underwriter notice', () => {
    render(<BrandHeader />);
    expect(screen.getByLabelText(/doctorshield home/i)).toBeInTheDocument();
    expect(screen.getByText(/individual medical professional indemnity/i)).toBeInTheDocument();
    expect(screen.getByText(/underwritten by/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/call doctorshield support/i)).toBeInTheDocument();
  });

  it('renders the AppFooter with regulatory BNM notice and PDPA disclosures', () => {
    render(<AppFooter />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByText(/chubb insurance malaysia berhad/i)).toBeInTheDocument();
    expect(screen.getAllByText(/ja assure sdn bhd/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/pdpa 2010 privacy notice/i)).toBeInTheDocument();
  });

  it('renders the LiveAnnouncer with proper ARIA live role', () => {
    render(<LiveAnnouncer message="Stage 1 Loaded" />);
    const announcer = screen.getByRole('status');
    expect(announcer).toBeInTheDocument();
    expect(announcer).toHaveAttribute('aria-live', 'polite');
    expect(announcer).toHaveTextContent('Stage 1 Loaded');
  });

  it('renders the full application shell with Step 1 Cover Configuration by default', () => {
    render(
      <WorkflowProvider>
        <App />
      </WorkflowProvider>
    );

    // Verify Brand Header
    expect(screen.getByRole('banner')).toBeInTheDocument();

    // Verify Main Landmark
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveAttribute('id', 'main-content');

    // Verify Stepper Navigation
    expect(screen.getByLabelText(/insurance application progress/i)).toBeInTheDocument();

    // Verify Stage 1 Heading
    expect(screen.getByRole('heading', { name: /select your professional coverage/i })).toBeInTheDocument();

    // Verify Desktop Summary Sidebar
    expect(screen.getByLabelText(/quotation and coverage summary/i)).toBeInTheDocument();

    // Verify Primary Action Button
    expect(screen.getByRole('button', { name: /generate quotation/i })).toBeInTheDocument();
  });

  it('navigates seamlessly between Stage 1 and Stage 2 while updating step progress', async () => {
    render(
      <WorkflowProvider>
        <App />
      </WorkflowProvider>
    );

    // Provide required email and terms consent to satisfy Stage 1 validation
    const emailInput = screen.getByLabelText(/practitioner email address/i);
    fireEvent.change(emailInput, { target: { value: 'dr.tan@example.com' } });

    const consentCheckbox = screen.getByRole('checkbox', { name: /i have read, understood and agree/i });
    fireEvent.click(consentCheckbox);

    const generateBtn = screen.getByRole('button', { name: /generate quotation/i });
    fireEvent.click(generateBtn);

    // Stage 2 Heading should be visible
    expect(await screen.findByRole('heading', { name: /your indicative chubb indemnity quote/i })).toBeInTheDocument();
    expect(screen.getByText(/15-minute guaranteed rate lock active/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /edit coverage details/i })).toBeInTheDocument();
  });

  it('supports simulating adverse declaration triggering support referral without misleading progress', async () => {
    render(
      <WorkflowProvider>
        <App />
      </WorkflowProvider>
    );

    // Provide required email and terms consent to satisfy Stage 1 validation
    const emailInput = screen.getByLabelText(/practitioner email address/i);
    fireEvent.change(emailInput, { target: { value: 'dr.tan@example.com' } });

    const consentCheckbox = screen.getByRole('checkbox', { name: /i have read, understood and agree/i });
    fireEvent.click(consentCheckbox);

    // Go to Stage 2
    const generateBtn = screen.getByRole('button', { name: /generate quotation/i });
    fireEvent.click(generateBtn);

    // Complete mandatory Stage 2 questions (owns clinic: No, PIC questions: No)
    expect(await screen.findByRole('heading', { name: /your indicative chubb indemnity quote/i })).toBeInTheDocument();
    
    // Clinic ownership: No
    const clinicNoRadio = screen.getByRole('radio', { name: /no, i do not own or partner in a private clinic/i });
    fireEvent.click(clinicNoRadio);

    // PIC of own clinic: No
    const picOwnNoRadio = screen.getByRole('radio', { name: /no, not person-in-charge of own clinic/i });
    fireEvent.click(picOwnNoRadio);

    // PIC of another clinic: No
    const picExtNoRadio = screen.getByRole('radio', { name: /no, not person-in-charge of another facility/i });
    fireEvent.click(picExtNoRadio);

    // Wait for calculation to settle and button to be active
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /proceed to personal details/i })).not.toBeDisabled();
    });

    // Now proceed to Stage 3
    const toStage3Btn = screen.getByRole('button', { name: /proceed to personal details/i });
    fireEvent.click(toStage3Btn);

    // Verify Stage 3
    expect(await screen.findByRole('heading', { name: /practitioner identity & underwriting declarations/i })).toBeInTheDocument();

    // Click Adverse Declaration Referral Button
    const referralBtn = screen.getByRole('button', { name: /simulate adverse declaration/i });
    fireEvent.click(referralBtn);

    // Verify Referral screen is rendered and progress bar is hidden for terminal state
    expect(await screen.findByRole('heading', { name: /your application has been referred/i })).toBeInTheDocument();
    expect(screen.queryByLabelText(/insurance application progress/i)).not.toBeInTheDocument();
    expect(screen.getByText(/under review/i)).toBeInTheDocument();
  });
});
