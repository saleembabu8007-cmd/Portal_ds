import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { WorkflowProvider, useWorkflow } from '../core/state/WorkflowContext';
import { Stage3ParticularsForm } from '../features/particulars/Stage3ParticularsForm';
import { AppShell } from '../components/layout/AppShell';
import { Stage1CoverageForm } from '../features/coverage/Stage1CoverageForm';
import { Stage2QuoteReview } from '../features/quote/Stage2QuoteReview';
import { Stage4ReviewScaffold } from '../features/scaffolds/Stage4ReviewScaffold';
import { ReferralScaffold } from '../features/scaffolds/ReferralScaffold';

// Test wrapper providing full Workflow context and navigation router
const TestWorkflowHarness: React.FC<{
  initialStage?: number;
  ownsClinic?: boolean;
  promoCode?: string;
}> = ({ initialStage = 3, ownsClinic = false, promoCode = '' }) => {
  const { currentStage, goToStage, updateCoverage } = useWorkflow();

  React.useEffect(() => {
    updateCoverage({
      promoCode,
      clinic: {
        ownsClinic: ownsClinic,
        clinicType: ownsClinic ? 'sole_proprietor' : '',
        hiresLocums: false,
        clinicLiabilityId: '1m',
        clinicLiabilityFormatted: 'RM 1,000,000',
      },
      pic: {
        isPicOwnClinic: false,
        isPicAnotherClinic: false,
      },
      addons: {
        clinicPackage: ownsClinic,
        personInCharge: false,
        locumCover: false,
        cyberLiability: false,
        branchCount: 0,
      },
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
      {currentStage === 4 && <Stage4ReviewScaffold />}
      {currentStage === 'referral' && <ReferralScaffold />}
    </AppShell>
  );
};

describe('Stage 3 Personal Particulars & Statutory Underwriting (SCR-TOBE-03)', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    window.history.pushState({}, '', '/buy/underwrite');
  });

  it('renders all required practitioner identity, practice details, and underwriting sections', async () => {
    render(
      <WorkflowProvider>
        <TestWorkflowHarness initialStage={3} />
      </WorkflowProvider>
    );

    // Header & Section titles
    expect(
      screen.getByRole('heading', { name: /practitioner identity & underwriting declarations/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /1\. practitioner identification/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /2\. professional practice particulars/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /3\. statutory underwriting declarations/i })
    ).toBeInTheDocument();

    // Required Identity Fields
    expect(screen.getByLabelText(/title \/ salutation/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/full name \(as per nric \/ passport\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/malaysian nric/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nric number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date of birth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nationality/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mmc full registration number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mobile phone number/i)).toBeInTheDocument();

    // Practice Fields
    expect(
      screen.getByLabelText(/primary practice facility \/ hospital \/ clinic name/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/practice address line 1/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^postcode/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^city/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/state \/ federal territory/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/annual gross professional income/i)).toBeInTheDocument();

    // Statutory Underwriting Questions
    expect(
      screen.getByText(/have any claims ever been made against you.*during the last 5 years\?/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/are you aware of any errors.*which might result in a claim/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/have you ever been the subject of disciplinary action or investigation/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/criminal investigation or had criminal charges brought against you/i)
    ).toBeInTheDocument();

    // Navigation buttons
    expect(screen.getByRole('button', { name: /back to quotation/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /proceed to review & payment/i })).toBeInTheDocument();
  }, 15000);

  it('correctly auto-formats NRIC and extracts DOB and Gender for male and female applicants', async () => {
    render(
      <WorkflowProvider>
        <TestWorkflowHarness initialStage={3} />
      </WorkflowProvider>
    );

    const nricInput = screen.getByLabelText(/nric number/i);
    const dobInput = screen.getByLabelText(/date of birth/i);
    const genderInput = screen.getByLabelText(/gender/i);

    // Male test vector: 850412-14-5231 (DOB: 12/04/1985, Gender: Male because last digit 1 is odd)
    fireEvent.change(nricInput, { target: { value: '850412145231' } });

    expect(nricInput).toHaveValue('850412-14-5231');
    expect(dobInput).toHaveValue('12/04/1985');
    expect(genderInput).toHaveValue('Male');

    // Female test vector: 921124-10-5432 (DOB: 24/11/1992, Gender: Female because last digit 2 is even)
    fireEvent.change(nricInput, { target: { value: '921124105432' } });

    expect(nricInput).toHaveValue('921124-10-5432');
    expect(dobInput).toHaveValue('24/11/1992');
    expect(genderInput).toHaveValue('Female');
  });

  it('triggers NRIC promo code substitution modal for existing customer with renewal code', async () => {
    render(
      <WorkflowProvider>
        <TestWorkflowHarness initialStage={3} promoCode="CHUBBPROMO" />
      </WorkflowProvider>
    );

    const nricInput = screen.getByLabelText(/nric number/i);

    // Existing customer test vector: NRIC ending in 9999
    fireEvent.change(nricInput, { target: { value: '850412149999' } });

    // Expect Substitution Modal to appear with verbatim copy
    expect(
      await screen.findByRole('dialog', { name: /promotional code adjusted for existing client/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/kindly note that the promo code you have used is ineligible for you as you are an existing client/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/MMA2026/i)).toBeInTheDocument();

    // Accept new code
    const applyBtn = screen.getByRole('button', { name: /apply renewal code/i });
    fireEvent.click(applyBtn);

    // Modal should close
    await waitFor(() => {
      expect(
        screen.queryByRole('dialog', { name: /promotional code adjusted for existing client/i })
      ).not.toBeInTheDocument();
    });
  });

  it('renders and manages additional branches with max 4 limit and RM 5M revenue ceiling rule', async () => {
    render(
      <WorkflowProvider>
        <TestWorkflowHarness initialStage={3} ownsClinic={true} />
      </WorkflowProvider>
    );

    // Verify Branch Manager is visible
    expect(
      screen.getByRole('heading', { name: /additional clinic branches & practice facilities/i })
    ).toBeInTheDocument();

    // Verify RM 5,000,000 combined turnover notice (LEG-BRANCH-001)
    expect(
      screen.getByText(/this offer is only available for branches with less than a total revenue of RM 5,000,000 per annum/i)
    ).toBeInTheDocument();

    // Click "Add Clinic / Branch"
    const addBranchBtn = screen.getByRole('button', { name: /add clinic \/ branch/i });
    fireEvent.click(addBranchBtn);

    // Form inputs appear (select by specific input id to avoid collision with main form)
    const branchNameInput = document.getElementById('branch-name') as HTMLInputElement;
    const branchAddressInput = document.getElementById('branch-address') as HTMLInputElement;
    const branchPostcodeInput = document.getElementById('branch-postcode') as HTMLInputElement;
    const branchCityInput = document.getElementById('branch-city') as HTMLInputElement;
    const branchStateSelect = document.getElementById('branch-state') as HTMLSelectElement;
    const branchPhoneInput = document.getElementById('branch-phone') as HTMLInputElement;

    fireEvent.change(branchNameInput, { target: { value: 'Klinik Dr Saleem - Bangsar Branch' } });
    fireEvent.change(branchAddressInput, { target: { value: '12 Jalan Telawi 3' } });
    fireEvent.change(branchPostcodeInput, { target: { value: '59100' } });
    fireEvent.change(branchCityInput, { target: { value: 'Kuala Lumpur' } });
    fireEvent.change(branchStateSelect, {
      target: { value: 'Wilayah Persekutuan Kuala Lumpur' },
    });
    fireEvent.change(branchPhoneInput, { target: { value: '03-22841234' } });

    // Submit branch form (button inside the form)
    const submitBranchBtn = screen.getByRole('button', { name: /add clinic \/ branch/i });
    fireEvent.click(submitBranchBtn);

    // Branch should appear in list
    expect(await screen.findByText(/Klinik Dr Saleem - Bangsar Branch/i)).toBeInTheDocument();
    expect(screen.getByText(/Branch 1 of 1/i)).toBeInTheDocument();

    // Add 3 more branches to hit the max 4 limit (RULE-BRN-01)
    for (let i = 2; i <= 4; i++) {
      fireEvent.click(screen.getByRole('button', { name: /add clinic \/ branch/i }));
      fireEvent.change(document.getElementById('branch-name') as HTMLInputElement, {
        target: { value: `Klinik Branch ${i}` },
      });
      fireEvent.change(document.getElementById('branch-address') as HTMLInputElement, {
        target: { value: `Address line ${i}` },
      });
      fireEvent.change(document.getElementById('branch-postcode') as HTMLInputElement, {
        target: { value: '50480' },
      });
      fireEvent.change(document.getElementById('branch-city') as HTMLInputElement, {
        target: { value: 'Kuala Lumpur' },
      });
      fireEvent.change(document.getElementById('branch-state') as HTMLSelectElement, {
        target: { value: 'Wilayah Persekutuan Kuala Lumpur' },
      });
      fireEvent.change(document.getElementById('branch-phone') as HTMLInputElement, {
        target: { value: '03-12345678' },
      });
      fireEvent.click(screen.getByRole('button', { name: /add clinic \/ branch/i }));
    }

    // Now 4 branches exist
    expect(screen.getByText(/Branch 4 of 4/i)).toBeInTheDocument();

    // Verify Add button is disabled with exact notice "You can add up to 4 branches"
    const disabledAddBtn = screen.getByRole('button', { name: /you can add up to 4 branches/i });
    expect(disabledAddBtn).toBeDisabled();
  });

  it('validates required fields and displays accessible error banner on invalid submit', async () => {
    render(
      <WorkflowProvider>
        <TestWorkflowHarness initialStage={3} />
      </WorkflowProvider>
    );

    // Click submit without entering data
    const submitBtn = screen.getByRole('button', { name: /proceed to review & payment/i });
    fireEvent.click(submitBtn);

    // Expect Error Banner
    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(
      screen.getByText(/please correct the following errors before proceeding/i)
    ).toBeInTheDocument();

    // Specific field errors exist in summary and field
    expect(screen.getAllByText(/please enter your full legal name/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/please enter a valid 12-digit malaysian nric number/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/please enter your mmc full registration number/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/please enter your primary hospital, clinic or practice facility/i).length).toBeGreaterThanOrEqual(1);
  });

  it('transitions to Stage 4 Review & Payment when all fields are valid and declarations are clean', async () => {
    render(
      <WorkflowProvider>
        <TestWorkflowHarness initialStage={3} />
      </WorkflowProvider>
    );

    // 1. Personal Identity
    fireEvent.change(screen.getByLabelText(/full name \(as per nric \/ passport\)/i), {
      target: { value: 'DR MUHAMMAD SALEEM BIN ABDULLAH' },
    });
    fireEvent.change(screen.getByLabelText(/nric number/i), {
      target: { value: '850412145231' },
    });
    fireEvent.change(screen.getByLabelText(/mmc full registration number/i), {
      target: { value: '54321' },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'saleem@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/mobile phone number/i), {
      target: { value: '012-3456789' },
    });

    // 2. Practice Details
    fireEvent.change(
      screen.getByLabelText(/primary practice facility \/ hospital \/ clinic name/i),
      { target: { value: 'Pantai Hospital Kuala Lumpur' } }
    );
    fireEvent.change(screen.getByLabelText(/practice address line 1/i), {
      target: { value: '8 Jalan Bukit Pantai' },
    });
    fireEvent.change(screen.getByLabelText(/^postcode/i), {
      target: { value: '59100' },
    });
    fireEvent.change(screen.getByLabelText(/^city/i), {
      target: { value: 'Kuala Lumpur' },
    });
    fireEvent.change(screen.getByLabelText(/state \/ federal territory/i), {
      target: { value: 'Wilayah Persekutuan Kuala Lumpur' },
    });
    fireEvent.change(screen.getByLabelText(/annual gross professional income/i), {
      target: { value: 'RM 250,000 - RM 500,000' },
    });

    // 3. Statutory Underwriting: Clean Answers
    // Q1: Agree
    const agreeRadio = screen.getByLabelText(/agree: no claims or notices of intention/i);
    fireEvent.click(agreeRadio);

    // Q2, Q3, Q4: No
    const noRadios = screen.getAllByLabelText(/^no$/i);
    fireEvent.click(noRadios[0]); // Q2
    fireEvent.click(noRadios[1]); // Q3
    fireEvent.click(noRadios[2]); // Q4

    // Accept final statutory truth declaration (LEG-DECL-001)
    const finalDeclCheckbox = screen.getByLabelText(/i confirm and declare that the statements/i);
    fireEvent.click(finalDeclCheckbox);

    // Submit
    const submitBtn = screen.getByRole('button', { name: /proceed to review & payment/i });
    fireEvent.click(submitBtn);

    // Verify successful progression to Stage 4
    expect(
      await screen.findByRole('heading', { name: /review policy details & authorize payment/i })
    ).toBeInTheDocument();
  });

  it('triggers referral to underwriting when user submits an adverse declaration', async () => {
    render(
      <WorkflowProvider>
        <TestWorkflowHarness initialStage={3} />
      </WorkflowProvider>
    );

    // Fill minimum required identity
    fireEvent.change(screen.getByLabelText(/full name \(as per nric \/ passport\)/i), {
      target: { value: 'DR MUHAMMAD SALEEM BIN ABDULLAH' },
    });
    fireEvent.change(screen.getByLabelText(/nric number/i), {
      target: { value: '850412145231' },
    });
    fireEvent.change(screen.getByLabelText(/mmc full registration number/i), {
      target: { value: '54321' },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'saleem@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/mobile phone number/i), {
      target: { value: '012-3456789' },
    });
    fireEvent.change(
      screen.getByLabelText(/primary practice facility \/ hospital \/ clinic name/i),
      { target: { value: 'Pantai Hospital Kuala Lumpur' } }
    );
    fireEvent.change(screen.getByLabelText(/practice address line 1/i), {
      target: { value: '8 Jalan Bukit Pantai' },
    });
    fireEvent.change(screen.getByLabelText(/^postcode/i), {
      target: { value: '59100' },
    });
    fireEvent.change(screen.getByLabelText(/^city/i), {
      target: { value: 'Kuala Lumpur' },
    });
    fireEvent.change(screen.getByLabelText(/state \/ federal territory/i), {
      target: { value: 'Wilayah Persekutuan Kuala Lumpur' },
    });
    fireEvent.change(screen.getByLabelText(/annual gross professional income/i), {
      target: { value: 'RM 250,000 - RM 500,000' },
    });

    // Q1: Disagree (Adverse)
    const disagreeRadio = screen.getByLabelText(/disagree: i have had previous malpractice claim/i);
    fireEvent.click(disagreeRadio);

    // Conditional details textarea appears
    const detailsInput = screen.getByPlaceholderText(/enter claim history details/i);
    fireEvent.change(detailsInput, {
      target: { value: 'Alleged misdiagnosis claim in 2023, settled amicably out of court.' },
    });

    // Clean for other 3 questions
    const noRadios = screen.getAllByLabelText(/^no$/i);
    fireEvent.click(noRadios[0]); // Q2
    fireEvent.click(noRadios[1]); // Q3
    fireEvent.click(noRadios[2]); // Q4

    // Accept final statutory truth declaration (LEG-DECL-001)
    const finalDeclCheckbox = screen.getByLabelText(/i confirm and declare that the statements/i);
    fireEvent.click(finalDeclCheckbox);

    // Submit
    const submitBtn = screen.getByRole('button', { name: /proceed to review & payment/i });
    fireEvent.click(submitBtn);

    // Expect transition to Referral Terminal Page
    expect(
      await screen.findByRole('heading', { name: /your application has been referred/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/under review/i)).toBeInTheDocument();
  }, 15000);

  it('preserves Tier 1 particulars when navigating back to quotation and returning', async () => {
    render(
      <WorkflowProvider>
        <TestWorkflowHarness initialStage={3} />
      </WorkflowProvider>
    );

    // Fill practitioner name and NRIC
    fireEvent.change(screen.getByLabelText(/full name \(as per nric \/ passport\)/i), {
      target: { value: 'DR MUHAMMAD SALEEM' },
    });
    fireEvent.change(screen.getByLabelText(/nric number/i), {
      target: { value: '850412145231' },
    });
    fireEvent.change(screen.getByLabelText(/mmc full registration number/i), {
      target: { value: '54321' },
    });

    // Click "Back to Quotation"
    const backBtn = screen.getByRole('button', { name: /back to quotation/i });
    fireEvent.click(backBtn);

    // Verify back in Stage 2
    expect(
      await screen.findByRole('heading', { name: /your indicative chubb indemnity quote/i })
    ).toBeInTheDocument();

    // Click "Proceed to Personal Details" to return to Stage 3
    const returnToStage3Btn = screen.getByRole('button', {
      name: /proceed to personal details/i,
    });
    fireEvent.click(returnToStage3Btn);

    // Verify returned to Stage 3 and all data preserved in inputs
    expect(
      await screen.findByRole('heading', {
        name: /practitioner identity & underwriting declarations/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/full name \(as per nric \/ passport\)/i)).toHaveValue(
      'DR MUHAMMAD SALEEM'
    );
    expect(screen.getByLabelText(/nric number/i)).toHaveValue('850412-14-5231');
    expect(screen.getByLabelText(/date of birth/i)).toHaveValue('12/04/1985');
    expect(screen.getByLabelText(/gender/i)).toHaveValue('Male');
    expect(screen.getByLabelText(/mmc full registration number/i)).toHaveValue('54321');
  });

  it('expands and validates supplementary COVID-19 facility risk questionnaires (Screens 04A-C)', async () => {
    render(
      <WorkflowProvider>
        <TestWorkflowHarness initialStage={3} />
      </WorkflowProvider>
    );

    // Verify COVID-19 questionnaire banner is initially collapsed
    expect(
      screen.getByText(/supplementary covid-19 facility risk assessment questionnaire/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/click to complete \(optional \/ conditional\)/i)
    ).toBeInTheDocument();

    // Click banner to expand
    fireEvent.click(
      screen.getByText(/supplementary covid-19 facility risk assessment questionnaire/i)
    );

    // Verify sections 04A, 04B, 04C appear
    expect(
      await screen.findByText(/screen 04a: regulatory & virus management/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/screen 04b: business continuity & infection control/i)).toBeInTheDocument();
    expect(screen.getByText(/screen 04c: staff training & covid declaration/i)).toBeInTheDocument();

    // Verify statutory COVID declaration checkbox exists (LEG-COVID-001)
    expect(
      screen.getByText(/the applicant declares that, after enquiry, to the best knowledge of all persons/i)
    ).toBeInTheDocument();
  }, 15000);

  it('submits relationship manager callback request from referral terminal page (FLD-REF-070..073)', async () => {
    render(
      <WorkflowProvider>
        <TestWorkflowHarness initialStage={'referral' as any} />
      </WorkflowProvider>
    );

    // Verify Referral Scaffold loaded
    expect(
      screen.getByRole('heading', { name: /your application has been referred/i })
    ).toBeInTheDocument();

    // Fill Callback Form (Doctor / Practitioner Name, Mobile Number, Email Address)
    fireEvent.change(screen.getByLabelText(/doctor \/ practitioner name/i), {
      target: { value: 'Dr Saleem Abdullah' },
    });
    fireEvent.change(screen.getByLabelText(/mobile number/i), {
      target: { value: '012-3456789' },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'saleem@example.com' },
    });

    // Select Morning Preferred Time
    fireEvent.click(screen.getByLabelText(/morning/i));

    // Submit Callback
    const submitCallbackBtn = screen.getByRole('button', {
      name: /request underwriting specialist callback/i,
    });
    fireEvent.click(submitCallbackBtn);

    // Verify callback confirmation ticket appears
    expect(
      await screen.findByText(/callback request confirmed/i)
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/your callback ticket has been logged/i).length
    ).toBeGreaterThanOrEqual(1);
  }, 15000);

  it('enforces AML/CFT sanctions screening gate and halts progress on blocked NRIC (DT-IND-06)', async () => {
    render(
      <WorkflowProvider>
        <TestWorkflowHarness initialStage={3} />
      </WorkflowProvider>
    );

    // Enter Blocklisted Practitioner Vector (DT-IND-06)
    fireEvent.change(screen.getByLabelText(/full name \(as per nric \/ passport\)/i), {
      target: { value: 'BLOCKED PRACTITIONER' },
    });
    fireEvent.change(screen.getByLabelText(/nric number/i), {
      target: { value: '850412145299' },
    });
    fireEvent.change(screen.getByLabelText(/mmc full registration number/i), {
      target: { value: '11111' },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'sanctioned@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/mobile phone number/i), {
      target: { value: '012-3456789' },
    });
    fireEvent.change(
      screen.getByLabelText(/primary practice facility \/ hospital \/ clinic name/i),
      { target: { value: 'General Hospital' } }
    );
    fireEvent.change(screen.getByLabelText(/practice address line 1/i), {
      target: { value: '1 Hospital Road' },
    });
    fireEvent.change(screen.getByLabelText(/^postcode/i), {
      target: { value: '50480' },
    });
    fireEvent.change(screen.getByLabelText(/^city/i), {
      target: { value: 'Kuala Lumpur' },
    });
    fireEvent.change(screen.getByLabelText(/state \/ federal territory/i), {
      target: { value: 'Wilayah Persekutuan Kuala Lumpur' },
    });
    fireEvent.change(screen.getByLabelText(/annual gross professional income/i), {
      target: { value: 'RM 250,000 - RM 500,000' },
    });

    // Clean Underwriting Answers
    fireEvent.click(screen.getByLabelText(/agree: no claims or notices of intention/i));
    const noRadios = screen.getAllByLabelText(/^no$/i);
    fireEvent.click(noRadios[0]);
    fireEvent.click(noRadios[1]);
    fireEvent.click(noRadios[2]);
    fireEvent.click(screen.getByLabelText(/i confirm and declare that the statements/i));

    // Submit
    fireEvent.click(screen.getByRole('button', { name: /proceed to review & payment/i }));

    // Should immediately route to referral terminal due to DT-IND-06
    expect(
      await screen.findByRole('heading', { name: /your application has been referred/i })
    ).toBeInTheDocument();
  }, 15000);
});
