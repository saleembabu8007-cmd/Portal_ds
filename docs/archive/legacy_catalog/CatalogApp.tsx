import React, { useState } from 'react';
import { Heading, Text, TextLink } from '../components/ui/Typography';
import { Button } from '../components/ui/Button';
import { TextInput } from '../components/ui/TextInput';
import { Textarea } from '../components/ui/Textarea';
import { Checkbox, RadioButton, SegmentedControl, SelectorCard } from '../components/ui/SelectionControls';
import { SelectCombobox, SelectOption } from '../components/ui/SelectCombobox';
import { FieldLabel, HelperText, ErrorMessage, InlineNotice, Badge, Divider, LoadingIndicator } from '../components/ui/FieldFeedback';
import { InsuranceStepProgress } from '../components/insurance/InsuranceStepProgress';
import { LiabilityLimitSelector, LiabilityTier } from '../components/insurance/LiabilityLimitSelector';
import { SpecializationAllocationEditor, SpecialtyItem } from '../components/insurance/SpecializationAllocationEditor';
import { CoverageDateField } from '../components/insurance/CoverageDateField';
import { PremiumBreakdown, PremiumQuoteData } from '../components/insurance/PremiumDisplay';
import { UnderwritingQuestionGroup, DeclarationState, PaymentMethodSelector, PaymentChannel, ReferralSupportOutcome } from '../components/insurance/UnderwritingAndCheckout';
import { CoverageStageComposition, ReviewStageComposition } from '../components/compositions/StageCompositions';

// New Form Molecules Layer
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
  RepeatingBranchData,
  CompactCurrencyDisplay,
  PriceBreakdownRow,
  InlineEditAction,
  OtpDigitEntry,
  LegalConsentCheckbox,
  DocumentLinkGroup,
  AccessibleDisclosureTrigger,
} from '../components/form';

// Organisms & Page Compositions Layer
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

import { Calendar, Shield, CreditCard, ExternalLink, Mail, Phone, Info, CheckCircle2 } from 'lucide-react';

/**
 * DoctorShield Isolated Interface Atom & Form Molecule Gallery
 * Direction B: Structured Minimal · Full interactive testing of all 20 atoms and 26 form molecules.
 */

export const CatalogApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'organisms' | 'molecules' | 'atoms' | 'insurance' | 'compositions'>('organisms');

  // Interactive Organisms State
  const [orgStep, setOrgStep] = useState(2);
  const [orgLimit, setOrgLimit] = useState('1m');
  const [orgOwnsClinic, setOrgOwnsClinic] = useState(true);
  const [orgEntityType, setOrgEntityType] = useState('sole');
  const [orgEntityCover, setOrgEntityCover] = useState(true);
  const [orgPicCover, setOrgPicCover] = useState(true);
  const [orgReinstatement, setOrgReinstatement] = useState(false);
  const [orgCyber, setOrgCyber] = useState(false);
  const [orgCondVisible, setOrgCondVisible] = useState(true);
  const [orgRevenueConfirmed, setOrgRevenueConfirmed] = useState(true);
  const [orgDeclarations, setOrgDeclarations] = useState({
    cleanClaims: true,
    noCircumstances: true,
    noDisciplinary: false,
    disciplinaryDetail: 'MMC inquiry in 2023 resolved with no adverse finding.',
    noCriminalSanctions: true,
  });
  const [orgOtpMobile, setOrgOtpMobile] = useState('123456789');
  const [orgPaymentMethod, setOrgPaymentMethod] = useState<'personal' | 'corporate'>('personal');
  const [orgConsents, setOrgConsents] = useState({ pidm: true, statutory: true, pdpa: true });
  const [orgBranches, setOrgBranches] = useState<RepeatingBranchData[]>([
    {
      id: 'b1',
      branchName: 'Klinik Medika Utama (Subang)',
      addressLine1: 'No. 12, Jalan SS 15/4D',
      city: 'Subang Jaya',
      state: 'Selangor',
      postcode: '47500',
      phone: '03-56321122',
      picName: 'Dr. Adam bin Malik',
    },
    {
      id: 'b2',
      branchName: 'Klinik Medika Utama (Shah Alam)',
      addressLine1: 'Lot 45, Seksyen 7',
      city: 'Shah Alam',
      state: 'Selangor',
      postcode: '40000',
      phone: '03-55113344',
      picName: 'Dr. Siti binti Nur',
    },
  ]);

  // Interactive Atom States
  const [demoText, setDemoText] = useState('Dr. Adam bin Malik');
  const [demoCheckbox, setDemoCheckbox] = useState(true);
  const [demoRadio, setDemoRadio] = useState('sole');
  const [demoSegment, setDemoSegment] = useState('no');
  const [demoTile, setDemoTile] = useState('1m');
  const [demoSelect, setDemoSelect] = useState('7');

  // Form Molecule Interactive States
  const [formText, setFormText] = useState('Dr. Siti binti Nur');
  const [formState, setFormState] = useState('Selangor');
  const [formClassification, setFormClassification] = useState('7');
  const [formSpecialty, setFormSpecialty] = useState('general_surgery');
  const [formDate, setFormDate] = useState('2026-11-01');
  const [rangeStartDate, setRangeStartDate] = useState('2026-11-01');
  const [formEmail, setFormEmail] = useState('adam.malik@kpj.com.my');
  const [formMobile, setFormMobile] = useState('123456789');
  const [promoCode, setPromoCode] = useState('MMA2026');
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [ownsClinic, setOwnsClinic] = useState<boolean | null>(false);
  const [entityType, setEntityType] = useState('sole');
  const [practiceLocation, setPracticeLocation] = useState('private');
  const [claimsDeclaration, setClaimsDeclaration] = useState<boolean | null>(true);
  const [disciplinaryDeclaration, setDisciplinaryDeclaration] = useState<boolean | null>(null);
  const [aestheticProcedures, setAestheticProcedures] = useState('');
  const [aestheticRevenue, setAestheticRevenue] = useState('15');
  const [allocations, setAllocations] = useState([
    { id: '1', name: 'General Medical Practice', percentage: 70 },
    { id: '2', name: 'Aesthetic / Minor Surgery', percentage: 30 },
  ]);
  const [branches, setBranches] = useState<RepeatingBranchData[]>([
    {
      id: 'b1',
      branchName: 'Klinik Medika Utama (Subang)',
      addressLine1: 'No. 12, Jalan SS 15/4D',
      city: 'Subang Jaya',
      state: 'Selangor',
      postcode: '47500',
      phone: '03-56321122',
      picName: 'Dr. Adam bin Malik',
      annualRevenue: 850000,
    },
    {
      id: 'b2',
      branchName: 'Klinik Medika Utama (Shah Alam)',
      addressLine1: 'Ground Floor, Lot 45, Seksyen 7',
      city: 'Shah Alam',
      state: 'Selangor',
      postcode: '40000',
      phone: '03-55113344',
      picName: 'Dr. Siti binti Nur',
      annualRevenue: 620000,
    },
  ]);
  const [inlineEditableName, setInlineEditableName] = useState('Dr. Adam bin Malik');
  const [otpCode, setOtpCode] = useState('');
  const [legalPidmConsent, setLegalPidmConsent] = useState(true);
  const [legalStatutoryConsent, setLegalStatutoryConsent] = useState(false);

  // Insurance State
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLimit, setSelectedLimit] = useState('1m');
  const [specialtyAllocations, setSpecialtyAllocations] = useState<SpecialtyItem[]>([
    { id: '1', name: 'General Practice', percentage: 70 },
    { id: '2', name: 'Aesthetic Procedures', percentage: 30 },
  ]);
  const [declarations, setDeclarations] = useState<DeclarationState>({
    cleanClaimsAgreed: true,
    hasErrorsOmissions: false,
    hasDisciplinaryAction: false,
    hasCriminalRecord: false,
  });
  const [paymentChannel, setPaymentChannel] = useState<PaymentChannel>('personal');

  const tiers: LiabilityTier[] = [
    { id: '500k', limitAmount: 500000, limitFormatted: 'RM 500,000', indicativeAnnualRate: 400 },
    { id: '1m', limitAmount: 1000000, limitFormatted: 'RM 1,000,000', indicativeAnnualRate: 650, isRecommended: true, recommendationTag: 'Recommended' },
    { id: '2m', limitAmount: 2000000, limitFormatted: 'RM 2,000,000', indicativeAnnualRate: 1100 },
    { id: '5m', limitAmount: 5000000, limitFormatted: 'RM 5,000,000', indicativeAnnualRate: 2400 },
  ];

  const classifications: SelectOption[] = [
    { value: '7', label: 'General Medical Practitioner', group: 'Primary Care' },
    { value: '20', label: 'General Medical Practitioner with Cosmetic and Aesthetic', group: 'Primary Care' },
    { value: '15', label: 'Specialist (Private sector)', group: 'Specialist Services' },
    { value: '13', label: 'General Dentist', group: 'Dental Services' },
    { value: '5', label: 'Government Doctor/Dentist', group: 'Public Sector' },
  ];

  const dummyQuote: PremiumQuoteData = {
    grossBase: 650.0,
    discountAmount: 65.0,
    promoCode: 'MMA2026',
    clinicEntityCover: 200.0,
    branchSurcharges: 100.0,
    branchCount: 1,
    isPicComplimentary: true,
    netGross: 885.0,
    sstAmount: 70.8,
    stampDuty: 10.0,
    totalPayable: 965.8,
  };

  const malaysianStateOptions = [
    { value: 'Johor', label: 'Johor' },
    { value: 'Kedah', label: 'Kedah' },
    { value: 'Kelantan', label: 'Kelantan' },
    { value: 'Melaka', label: 'Melaka' },
    { value: 'Negeri Sembilan', label: 'Negeri Sembilan' },
    { value: 'Pahang', label: 'Pahang' },
    { value: 'Penang', label: 'Penang' },
    { value: 'Perak', label: 'Perak' },
    { value: 'Perlis', label: 'Perlis' },
    { value: 'Sabah', label: 'Sabah' },
    { value: 'Sarawak', label: 'Sarawak' },
    { value: 'Selangor', label: 'Selangor' },
    { value: 'Terengganu', label: 'Terengganu' },
    { value: 'WP Kuala Lumpur', label: 'Wilayah Persekutuan Kuala Lumpur' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--ds-color-surface-canvas)', padding: '32px 20px' }}>
      <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
        
        {/* Header Lockup */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', paddingBottom: '16px', borderBottom: '1px solid var(--ds-color-border-subtle)', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <Heading level={1}>DoctorShield Design System Showcase</Heading>
            <Text variant="small" color="secondary" style={{ marginTop: '4px' }}>
              Direction B (Structured Minimal) · Approved Atoms & Form Molecules Layer
            </Text>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button
              size="sm"
              variant={activeTab === 'organisms' ? 'primary' : 'secondary'}
              onClick={() => setActiveTab('organisms')}
            >
              Organisms & Layouts (20)
            </Button>
            <Button
              size="sm"
              variant={activeTab === 'molecules' ? 'primary' : 'secondary'}
              onClick={() => setActiveTab('molecules')}
            >
              Form Molecules (26)
            </Button>
            <Button
              size="sm"
              variant={activeTab === 'atoms' ? 'primary' : 'secondary'}
              onClick={() => setActiveTab('atoms')}
            >
              Interface Atoms (20)
            </Button>
            <Button
              size="sm"
              variant={activeTab === 'insurance' ? 'primary' : 'secondary'}
              onClick={() => setActiveTab('insurance')}
            >
              Insurance Molecules
            </Button>
            <Button
              size="sm"
              variant={activeTab === 'compositions' ? 'primary' : 'secondary'}
              onClick={() => setActiveTab('compositions')}
            >
              Stage Layouts
            </Button>
          </div>
        </div>

        {/* ========================================================================
            TAB 0: ORGANISMS & PAGE COMPOSITIONS (20 ORGANISMS)
            ======================================================================== */}
        {activeTab === 'organisms' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>

            {/* 1 & 2. Header & Step Navigation */}
            <div className="ds-panel">
              <Heading level={2} style={{ marginBottom: '8px' }}>1 & 2. Header & Step Navigation Organisms</Heading>
              <Text variant="small" color="secondary" style={{ marginBottom: '20px' }}>
                Slim 52px header with official Chubb co-branding, quick utilities, and minimal linear step navigation.
              </Text>

              <div style={{ border: '1px solid var(--ds-color-border-subtle)', borderRadius: '8px', overflow: 'hidden', marginBottom: '20px' }}>
                <ApplicationHeader
                  onRenewClick={() => alert('Renewal modal trigger')}
                  onRetrieveQuoteClick={() => alert('Retrieve quote modal trigger')}
                  onDocumentCenterClick={() => alert('Document center modal trigger')}
                />
              </div>

              <MinimalStepNavigation
                currentStep={orgStep}
                onStepClick={(stepId) => setOrgStep(stepId)}
              />
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                {[1, 2, 3, 4].map((s) => (
                  <Button
                    key={s}
                    size="sm"
                    variant={orgStep === s ? 'primary' : 'secondary'}
                    onClick={() => setOrgStep(s)}
                  >
                    Simulate Step {s}
                  </Button>
                ))}
              </div>
            </div>

            {/* 3, 4 & 5. Page Layout, Form Section & Conditional Question Group */}
            <div className="ds-panel">
              <Heading level={2} style={{ marginBottom: '8px' }}>3, 4 & 5. Page Layout, Form Section & Conditional Groups</Heading>
              <Text variant="small" color="secondary" style={{ marginBottom: '20px' }}>
                Open composition replacing nested cards. Clear section rhythm with adjacent conditional indicators.
              </Text>

              <div style={{ border: '1px solid var(--ds-color-border-subtle)', borderRadius: '8px', backgroundColor: 'var(--ds-color-surface-canvas)', padding: '24px' }}>
                <FormSection
                  title="Practice & Clinic Ownership Details"
                  subtitle="Verify your primary practice location and clinic ownership structure."
                  actionAffordance={<Badge variant="neutral">Verified Practitioner</Badge>}
                >
                  <ConditionalQuestionGroup
                    id="cond_org_demo"
                    triggerQuestion={
                      <YesNoSelector
                        id="org_cond_toggle"
                        question="Do you dispense medication or operate an in-house clinic pharmacy?"
                        value={orgCondVisible}
                        onChange={setOrgCondVisible}
                      />
                    }
                    isVisible={orgCondVisible}
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <LabeledTextField
                        id="org_poison_lic"
                        label="Type A Poison License Holder Name"
                        value="Dr. Adam bin Malik"
                        readOnly
                        helperText="Verified against Malaysian Pharmacy Board register."
                      />
                      <LabeledTextField
                        id="org_poison_num"
                        label="License Number"
                        value="POL-SEL-2026-0814"
                        readOnly
                      />
                    </div>
                  </ConditionalQuestionGroup>
                </FormSection>
              </div>
            </div>

            {/* 6, 8 & 9. Insurance Coverage & Add-on Cards */}
            <div className="ds-panel">
              <Heading level={2} style={{ marginBottom: '8px' }}>6, 8 & 9. Insurance Coverage & Add-on Organisms</Heading>
              <Text variant="small" color="secondary" style={{ marginBottom: '20px' }}>
                Selectable products with precise 2px #08A5B5 borders, checkbox triggers, and no oversized marketing graphics.
              </Text>

              <div style={{ marginBottom: '24px' }}>
                <Heading level={3} style={{ marginBottom: '12px' }}>Limit of Indemnity Selection (Organism 6)</Heading>
                <LiabilityLimitSelection
                  selectedTierId={orgLimit}
                  onChange={setOrgLimit}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <Heading level={3} style={{ marginBottom: '12px' }}>Clinic & PIC Coverage Grouping (Organism 9)</Heading>
                <ClinicAndPicCoverageGroup
                  ownsClinic={orgOwnsClinic}
                  onOwnsClinicToggle={setOrgOwnsClinic}
                  entityType={orgEntityType}
                  onEntityTypeChange={setOrgEntityType}
                  entityCoverSelected={orgEntityCover}
                  onEntityCoverToggle={setOrgEntityCover}
                  picCoverSelected={orgPicCover}
                  onPicCoverToggle={setOrgPicCover}
                />
              </div>

              <div>
                <Heading level={3} style={{ marginBottom: '12px' }}>Additional Optional Endorsements (Organism 8)</Heading>
                <AddOnCoverageCard
                  id="addon_reinstatement"
                  name="Automatic Reinstatement of Limit"
                  annualPremium={150.0}
                  selected={orgReinstatement}
                  onToggle={setOrgReinstatement}
                  description="Reinstates your full aggregate limit of liability in the event of an indemnifiable claim payment during the policy period."
                  statutoryDetail="In the event of a paid loss, the aggregate limit is replenished up to 100% of the initial indemnity limit without additional pro-rata premium."
                />

                <AddOnCoverageCard
                  id="addon_cyber"
                  name="Cyber Liability & EMR Data Breach Endorsement"
                  annualPremium={350.0}
                  selected={orgCyber}
                  onToggle={setOrgCyber}
                  description="Protection against PDPA regulatory inquiries, forensic investigation costs, and patient notification expenses following clinic electronic medical record breaches."
                  statutoryDetail="Covers regulatory defense costs under the Personal Data Protection Act 2010 and mandatory patient notification logistics."
                />
              </div>
            </div>

            {/* 7, 10, 11 & 19. Pricing & Summary Compositions */}
            <div className="ds-panel">
              <Heading level={2} style={{ marginBottom: '8px' }}>7, 10, 11 & 19. Quotation & Financial Summary Organisms</Heading>
              <Text variant="small" color="secondary" style={{ marginBottom: '20px' }}>
                Tabular numeric calculations, itemized breakdown, and responsive desktop/mobile summary drawers.
              </Text>

              <CoreQuotationSection
                specialtyName="General Medical Practitioner"
                limitFormatted="RM 1,000,000"
                startDate="2026-11-01"
                endDate="2026-12-31"
                isProrata={true}
                prorataDays={61}
                quote={{
                  ...dummyQuote,
                  totalPayable: 965.80,
                }}
              />

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                <div>
                  <Heading level={3} style={{ marginBottom: '12px' }}>Premium Breakdown Table (Organism 10)</Heading>
                  <PremiumBreakdownTable quote={dummyQuote} />
                </div>

                <div>
                  <Heading level={3} style={{ marginBottom: '12px' }}>Contextual Summary Panel (Organism 11)</Heading>
                  <ContextualSummaryPanel
                    specialtyName="General Medical Practitioner"
                    limitFormatted="RM 1,000,000"
                    startDate="2026-11-01"
                    endDate="2026-12-31"
                    quote={dummyQuote}
                    onProceed={() => alert('Proceeding to Next Stage')}
                    proceedLabel="Proceed to Details"
                  />
                </div>
              </div>
            </div>

            {/* 12 & 13. Branch Management & Underwriting Declarations */}
            <div className="ds-panel">
              <Heading level={2} style={{ marginBottom: '8px' }}>12 & 13. Practice Branches & Statutory Underwriting</Heading>
              <Text variant="small" color="secondary" style={{ marginBottom: '20px' }}>
                Max 4 branch ceiling rule with RM 5M revenue check and 4 statutory underwriting declarations.
              </Text>

              <div style={{ marginBottom: '32px' }}>
                <Heading level={3} style={{ marginBottom: '12px' }}>Additional Branch List / Editor (Organism 12)</Heading>
                <BranchListEditor
                  branches={orgBranches}
                  onBranchesChange={setOrgBranches}
                  isRevenueConfirmed={orgRevenueConfirmed}
                  onRevenueConfirmChange={setOrgRevenueConfirmed}
                />
              </div>

              <div>
                <Heading level={3} style={{ marginBottom: '12px' }}>Statutory Underwriting Declarations (Organism 13)</Heading>
                <UnderwritingDeclarationsOrganism
                  declarations={orgDeclarations}
                  onChange={(newValues) => setOrgDeclarations(newValues as any)}
                />
              </div>
            </div>

            {/* 14 & 15. Verification & Review Compositions */}
            <div className="ds-panel">
              <Heading level={2} style={{ marginBottom: '8px' }}>14 & 15. Verification, Review & Checkout Compositions</Heading>
              <Text variant="small" color="secondary" style={{ marginBottom: '20px' }}>
                Two-phase mobile OTP verification and pre-checkout review with affirmative legal consents.
              </Text>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px', marginBottom: '28px' }}>
                <div>
                  <Heading level={3} style={{ marginBottom: '12px' }}>OTP Verification Flow (Organism 14)</Heading>
                  <OtpVerificationOrganism
                    mobileNumber={orgOtpMobile}
                    onMobileNumberChange={setOrgOtpMobile}
                    onOtpSubmit={(c) => alert(`Verified OTP: ${c}`)}
                    channel="SMS"
                    resendCountdown={50}
                  />
                </div>

                <div>
                  <Heading level={3} style={{ marginBottom: '12px' }}>Review & Authorize Payment (Organism 15)</Heading>
                  <ReviewAndPaymentComposition
                    doctorName="Dr. Adam bin Malik"
                    nric="850612-14-5543"
                    specialtyName="General Medical Practitioner"
                    limitFormatted="RM 1,000,000"
                    startDate="2026-11-01"
                    endDate="2026-12-31"
                    quote={dummyQuote}
                    paymentMethod={orgPaymentMethod}
                    onPaymentMethodChange={setOrgPaymentMethod}
                    consents={orgConsents}
                    onConsentChange={(k, v) => setOrgConsents({ ...orgConsents, [k]: v })}
                    onAuthorizePayment={() => alert('Payment Authorized via Gateway')}
                  />
                </div>
              </div>
            </div>

            {/* 16, 17, 18 & 20. Compliance, Referral, Error & Actions */}
            <div className="ds-panel">
              <Heading level={2} style={{ marginBottom: '8px' }}>16, 17, 18 & 20. Compliance, Referral, Recovery & Footer</Heading>
              <Text variant="small" color="secondary" style={{ marginBottom: '20px' }}>
                Regulatory notices, underwriter referral callbacks, non-destructive error states, and statutory footer.
              </Text>

              <div style={{ marginBottom: '28px' }}>
                <DocumentDisclosureSection />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', marginBottom: '28px' }}>
                <div>
                  <Heading level={3} style={{ marginBottom: '12px' }}>Referral / Callback Outcome (Organism 17)</Heading>
                  <ReferralSupportOutcomeOrganism
                    referenceId="REF-2026-98124"
                    doctorName="Dr. Adam bin Malik"
                    onSubmitCallback={(data) => alert(`Callback requested: ${JSON.stringify(data)}`)}
                  />
                </div>

                <div>
                  <Heading level={3} style={{ marginBottom: '12px' }}>Error & Recovery Handler (Organism 18)</Heading>
                  <ErrorRecoveryComposition
                    errorCode="GW_TIMEOUT_504"
                    onRetry={() => alert('Retrying gateway transaction')}
                    onRetrieveSaved={() => alert('Retrieving saved session')}
                  />
                </div>
              </div>

              <div>
                <Heading level={3} style={{ marginBottom: '12px' }}>Step Action Bar & Footer (Organism 20)</Heading>
                <StepActionBarOrganism
                  onBack={() => alert('Back clicked')}
                  onContinue={() => alert('Continue clicked')}
                  continueLabel="Continue to Underwriting"
                />
                <div style={{ marginTop: '24px' }}>
                  <ApplicationFooterOrganism />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================
            TAB 1: FORM MOLECULES (26 MOLECULES)
            ======================================================================== */}
        {activeTab === 'molecules' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* 1. Labeled Inputs & Contact Layer */}
            <div className="ds-panel">
              <Heading level={2} style={{ marginBottom: '8px' }}>1. Data Entry & Contact Molecules</Heading>
              <Text variant="small" color="secondary" style={{ marginBottom: '24px' }}>
                Standard 48px controls, accessible label/error binding, optical addons, and Malaysian contact validation.
              </Text>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                {/* Molecule 1: Labeled text field */}
                <div>
                  <LabeledTextField
                    id="mol_name"
                    label="Full Name (as per NRIC / Passport)"
                    required
                    value={formText}
                    onChange={(e) => setFormText(e.target.value)}
                    helperText="Official medical practitioner full legal name."
                  />
                </div>

                {/* Molecule 16: Optional field */}
                <div>
                  <LabeledTextField
                    id="mol_practice_num"
                    label="Annual Practicing Certificate (APC) Number"
                    optional
                    placeholder="e.g. APC-2026-98124"
                    helperText="Optional for pre-qualification, verified prior to policy bind."
                  />
                </div>

                {/* Molecule 7: Email field */}
                <div>
                  <EmailField
                    id="mol_email"
                    label="Practitioner Email Address"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    helperText="Policy schedule and e-Certificate sent here."
                  />
                </div>

                {/* Molecule 8: Malaysian mobile number field */}
                <div>
                  <MalaysianMobileField
                    id="mol_mobile"
                    value={formMobile}
                    onChange={setFormMobile}
                    helperText="Used for OTP SMS verification and renewal alerts."
                  />
                </div>

                {/* Molecule 22: Field-level loading state */}
                <div>
                  <LabeledTextField
                    id="mol_nric_verify"
                    label="Malaysian NRIC Number"
                    value="850612-14-5543"
                    isLoading={true}
                    readOnly
                    helperText="Simulating real-time MMC register & AML/CFT sanctions screening..."
                  />
                </div>

                {/* Invalid State Preview */}
                <div>
                  <LabeledTextField
                    id="mol_error_demo"
                    label="Clinic Registration Number"
                    value="INVALID-123"
                    required
                    errorMessage="Clinic registration number must match MOH Form B / Form F format."
                  />
                </div>
              </div>
            </div>

            {/* 2. Selectors & Autocompletes */}
            <div className="ds-panel">
              <Heading level={2} style={{ marginBottom: '8px' }}>2. Selection & Classification Autocompletes</Heading>
              <Text variant="small" color="secondary" style={{ marginBottom: '24px' }}>
                WAI-ARIA 1.2 compliant comboboxes and selects with real DoctorShield underwriting categories and MMC registers.
              </Text>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                {/* Molecule 2: Labeled select */}
                <div>
                  <LabeledSelect
                    id="mol_state"
                    label="Clinic Practice State / Territory"
                    options={malaysianStateOptions}
                    value={formState}
                    onChange={(e) => setFormState(e.target.value)}
                    helperText="State where primary clinical practice is registered."
                  />
                </div>

                {/* Molecule 3: Searchable classification selector */}
                <div>
                  <SearchableClassificationSelector
                    value={formClassification}
                    onChange={setFormClassification}
                  />
                </div>

                {/* Molecule 4: Searchable specialization selector */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <SearchableSpecializationSelector
                    value={formSpecialty}
                    onChange={setFormSpecialty}
                  />
                </div>
              </div>
            </div>

            {/* 3. Dates & Policy Coverage Timeline */}
            <div className="ds-panel">
              <Heading level={2} style={{ marginBottom: '8px' }}>3. Coverage Period & Date Compositions</Heading>
              <Text variant="small" color="secondary" style={{ marginBottom: '24px' }}>
                Coverage inception with 9-month ceiling and automatic MMC APC-aligned expiry calculation.
              </Text>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                {/* Molecule 5: Date field */}
                <div>
                  <DateField
                    id="mol_dob"
                    label="Date of Birth"
                    required
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    helperText="Used to verify eligibility criteria (minimum 21 years)."
                  />
                </div>

                {/* Molecule 6: Insurance date-range composition */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <InsuranceDateRange
                    startDate={rangeStartDate}
                    endDate="2026-12-31"
                    onStartDateChange={setRangeStartDate}
                    isProrata={true}
                    prorataDays={61}
                    alignWithApc={true}
                  />
                </div>
              </div>
            </div>

            {/* 4. Choice Selectors & Declarations */}
            <div className="ds-panel">
              <Heading level={2} style={{ marginBottom: '8px' }}>4. Decision & Declaration Selectors</Heading>
              <Text variant="small" color="secondary" style={{ marginBottom: '24px' }}>
                Restrained, accessible binary and multi-choice controls. No oversized product cards for simple questions.
              </Text>

              {/* Molecule 10: Yes/No question selector */}
              <div style={{ marginBottom: '20px' }}>
                <YesNoSelector
                  id="mol_clinic_toggle"
                  question="Do you own, operate, or partner in a private healthcare clinic practice?"
                  helperText="Enables optional Healthcare Facility Entity and Person-In-Charge coverage."
                  value={ownsClinic}
                  onChange={setOwnsClinic}
                  required
                />
              </div>

              {/* Molecule 12: Two-option segmented choice */}
              <div style={{ marginBottom: '24px', maxWidth: '480px' }}>
                <TwoOptionSegmentedChoice
                  id="mol_practice_type"
                  label="Clinic Legal Structure"
                  options={[
                    { value: 'sole', label: 'Sole Proprietorship', description: 'Single practitioner ownership' },
                    { value: 'partner', label: 'Partnership / Sdn Bhd', description: 'Multi-partner or incorporated' },
                  ]}
                  value={entityType}
                  onChange={setEntityType}
                />
              </div>

              {/* Molecule 13: Multi-option radio group */}
              <div style={{ marginBottom: '28px' }}>
                <MultiOptionRadioGroup
                  id="mol_practice_env"
                  label="Primary Practice Setting"
                  direction="horizontal"
                  options={[
                    { value: 'private', label: 'Private Practice Only', hint: 'Solo or group clinic' },
                    { value: 'dual', label: 'Government Doctor with Locum', hint: 'Hospital + Private locum' },
                    { value: 'institutional', label: 'Hospital Employed', hint: 'Full-time institutional' },
                  ]}
                  value={practiceLocation}
                  onChange={setPracticeLocation}
                />
              </div>

              {/* Molecule 11: Agree/Disagree question selector */}
              <div>
                <Heading level={3} style={{ marginBottom: '12px' }}>Statutory Underwriting Declarations</Heading>
                
                <AgreeDisagreeSelector
                  id="mol_decl_claims"
                  declarationNumber={1}
                  statement="I confirm that in the last 5 years, no medical malpractice claim, demand, or notification of circumstance has been made against me or my practice."
                  value={claimsDeclaration}
                  onChange={setClaimsDeclaration}
                  disagreeWarning="An adverse claims history requires manual underwriting review by Chubb Insurance Malaysia Berhad."
                />

                <AgreeDisagreeSelector
                  id="mol_decl_mmc"
                  declarationNumber={2}
                  statement="I confirm that I have never been subject to an inquiry, disciplinary proceeding, suspension, or reprimand by the Malaysian Medical Council (MMC) or Malaysian Dental Council (MDC)."
                  value={disciplinaryDeclaration}
                  onChange={setDisciplinaryDeclaration}
                  disagreeWarning="Regulatory proceedings must be assessed by our underwriting specialist. A callback will be scheduled."
                />
              </div>
            </div>

            {/* 5. Conditional Disclosures & Dynamic Flows */}
            <div className="ds-panel">
              <Heading level={2} style={{ marginBottom: '8px' }}>5. Conditional Follow-Up & Dynamic Flows</Heading>
              <Text variant="small" color="secondary" style={{ marginBottom: '24px' }}>
                Immediate adjacent disclosure without jarring layout shifts or arbitrary animations.
              </Text>

              {/* Molecule 14: Conditional follow-up field */}
              <div style={{ maxWidth: '640px' }}>
                <YesNoSelector
                  id="mol_aesthetic_trigger"
                  question="Do you perform aesthetic, cosmetic, or minimally-invasive cosmetic procedures?"
                  helperText="Trigger for aesthetic risk classification under Chubb underwriting guidelines."
                  value={aestheticProcedures !== ''}
                  onChange={(val) => setAestheticProcedures(val ? 'Botox, Fillers, Laser' : '')}
                />

                <ConditionalFollowUpField
                  isVisible={aestheticProcedures !== ''}
                  onHidden={() => {
                    setAestheticProcedures('');
                    setAestheticRevenue('0');
                  }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', alignItems: 'flex-start' }}>
                    <LabeledTextField
                      id="mol_aesthetic_list"
                      label="Procedures Performed"
                      value={aestheticProcedures}
                      onChange={(e) => setAestheticProcedures(e.target.value)}
                      placeholder="e.g. Botulinum toxin, Dermal fillers, Laser rejuvenation"
                      required
                    />

                    <LabeledTextField
                      id="mol_aesthetic_rev"
                      label="Revenue Share (%)"
                      type="number"
                      value={aestheticRevenue}
                      onChange={(e) => setAestheticRevenue(e.target.value)}
                      rightAddon="%"
                      required
                    />
                  </div>
                </ConditionalFollowUpField>
              </div>

              {/* Molecule 26: Accessible disclosure trigger */}
              <div style={{ marginTop: '16px' }}>
                <AccessibleDisclosureTrigger
                  id="mol_why_apc"
                  triggerLabel="Why is my indemnity policy expiry date aligned to 31 December?"
                  icon="info"
                >
                  Under Malaysian Medical Council (MMC) regulatory guidelines, all medical practitioners must submit proof
                  of professional indemnity insurance valid through 31 December when applying for their Annual Practicing
                  Certificate (APC) renewal. DoctorShield aligns your policy term directly to the statutory APC calendar to
                  prevent any regulatory coverage lapse.
                </AccessibleDisclosureTrigger>
              </div>
            </div>

            {/* 6. Multi-Item Management & Steppers */}
            <div className="ds-panel">
              <Heading level={2} style={{ marginBottom: '8px' }}>6. Itemized Management & Allocations</Heading>
              <Text variant="small" color="secondary" style={{ marginBottom: '24px' }}>
                Multi-specialty percentage splits and repeating branch management without nested card bloat.
              </Text>

              {/* Molecule 17: Percentage allocation row */}
              <div style={{ marginBottom: '32px', maxWidth: '640px' }}>
                <Heading level={3} style={{ marginBottom: '8px' }}>Practice Specialization Allocation (Total: 100%)</Heading>
                <Text variant="small" color="secondary" style={{ marginBottom: '16px' }}>
                  Allocate estimated practice volume across registered specialties.
                </Text>

                {allocations.map((item, idx) => (
                  <PercentageAllocationRow
                    key={item.id}
                    id={`alloc_${item.id}`}
                    name={item.name}
                    percentage={item.percentage}
                    onChange={(newVal) => {
                      const next = [...allocations];
                      next[idx].percentage = newVal;
                      setAllocations(next);
                    }}
                  />
                ))}
              </div>

              {/* Molecule 18: Repeating clinic/branch row */}
              <div>
                <Heading level={3} style={{ marginBottom: '8px' }}>Covered Practice Branches (Max 4 Branches)</Heading>
                <Text variant="small" color="secondary" style={{ marginBottom: '16px' }}>
                  Registered clinic premises covered under Healthcare Facility Entity endorsement.
                </Text>

                {branches.map((b, idx) => (
                  <RepeatingBranchRow
                    key={b.id}
                    index={idx}
                    branch={b}
                    onEdit={(branch) => alert(`Edit branch: ${branch.branchName}`)}
                    onRemove={(id) => setBranches(branches.filter((x) => x.id !== id))}
                  />
                ))}
              </div>
            </div>

            {/* 7. Verification, Promos & Security */}
            <div className="ds-panel">
              <Heading level={2} style={{ marginBottom: '8px' }}>7. Verification, Promos & Security</Heading>
              <Text variant="small" color="secondary" style={{ marginBottom: '24px' }}>
                Promotional code discount validation and 6-digit OTP verification with countdown timer.
              </Text>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
                {/* Molecule 9: Promotional-code field */}
                <div>
                  <PromoCodeField
                    value={promoCode}
                    onChange={setPromoCode}
                    isApplied={isPromoApplied}
                    appliedDescription="10% MMA Member Discount Applied"
                    onApply={async (code) => {
                      await new Promise((r) => setTimeout(r, 600));
                      setIsPromoApplied(true);
                      return true;
                    }}
                    onRemove={() => {
                      setIsPromoApplied(false);
                      setPromoCode('');
                    }}
                  />
                </div>

                {/* Molecule 23: OTP digit-entry composition */}
                <div>
                  <Heading level={3} style={{ marginBottom: '8px', fontSize: '15px' }}>OTP Identity Verification</Heading>
                  <OtpDigitEntry
                    value={otpCode}
                    onChange={setOtpCode}
                    onComplete={(code) => alert(`OTP Completed: ${code}`)}
                    channel="SMS"
                    mobileNumber="12 345 6789"
                    onResend={() => alert('New OTP dispatched')}
                    resendCountdown={45}
                  />
                </div>
              </div>
            </div>

            {/* 8. Pricing, Legal Consents & Summary Actions */}
            <div className="ds-panel">
              <Heading level={2} style={{ marginBottom: '8px' }}>8. Financial, Legal Consents & Disclosures</Heading>
              <Text variant="small" color="secondary" style={{ marginBottom: '24px' }}>
                Itemized statutory price breakdown, legal disclosures, and document groups.
              </Text>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
                {/* Molecule 19 & 20: Price breakdown & Currency display */}
                <div style={{ backgroundColor: 'var(--ds-color-surface-subtle)', padding: '20px', borderRadius: '8px', border: '1px solid var(--ds-color-border-subtle)' }}>
                  <Heading level={3} style={{ marginBottom: '12px', fontSize: '16px' }}>Indicative Premium Summary</Heading>
                  
                  <PriceBreakdownRow label="Base Indemnity Premium" amount={650.0} />
                  <PriceBreakdownRow label="Association Member Discount" amount={65.0} isDiscount={true} />
                  <PriceBreakdownRow label="Clinic Entity Extension" amount={200.0} />
                  <PriceBreakdownRow label="Service Tax (SST 8%)" amount={62.8} infoNote="Statutory 8% Service Tax on general insurance." />
                  <PriceBreakdownRow label="Stamp Duty" amount={10.0} infoNote="Inland Revenue Board of Malaysia (LHDN) stamp duty." />
                  <PriceBreakdownRow label="Total Payable" amount={857.8} isTotal={true} />
                </div>

                {/* Molecule 21: Inline edit action */}
                <div>
                  <Heading level={3} style={{ marginBottom: '12px', fontSize: '16px' }}>Confirmed Applicant Data</Heading>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderBottom: '1px solid var(--ds-color-border-subtle)', paddingBottom: '12px' }}>
                    <InlineEditAction
                      id="edit_doc_name"
                      label="Practitioner Name"
                      value={inlineEditableName}
                      editableInline={true}
                      onSave={setInlineEditableName}
                    />
                    <InlineEditAction
                      id="edit_doc_nric"
                      label="NRIC Number"
                      value="850612-14-5543"
                      onNavigateToStep={() => alert('Navigating back to Stage 1 to re-validate NRIC')}
                    />
                    <InlineEditAction
                      id="edit_doc_spec"
                      label="Classification"
                      value="General Medical Practitioner"
                      onNavigateToStep={() => alert('Navigating back to Stage 1')}
                    />
                  </div>
                </div>

                {/* Molecule 24: Legal consent checkbox with long legal text */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <LegalConsentCheckbox
                    id="consent_pidm"
                    checked={legalPidmConsent}
                    onChange={setLegalPidmConsent}
                    required
                  >
                    I understand that the insurance benefit(s) payable under eligible certificate/policy is(are) protected
                    by Perbadanan Insurans Deposit Malaysia (PIDM) up to limits. Please refer to PIDM's TIPS Brochure or
                    contact Chubb Insurance Malaysia Berhad or PIDM (visit{' '}
                    <a
                      href="https://www.pidm.gov.my"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--ds-primitive-color-teal-800)', textDecoration: 'underline' }}
                    >
                      www.pidm.gov.my
                    </a>
                    ).
                  </LegalConsentCheckbox>

                  <LegalConsentCheckbox
                    id="consent_statutory"
                    checked={legalStatutoryConsent}
                    onChange={setLegalStatutoryConsent}
                    required
                  >
                    I hereby declare that the statements and particulars given in this application are true and complete to
                    the best of my knowledge and belief, and that I have not suppressed or misrepresented any material fact.
                    I agree that this declaration shall form the basis of the contract between me and Chubb Insurance Malaysia
                    Berhad.
                  </LegalConsentCheckbox>
                </div>

                {/* Molecule 25: Document-link group */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <DocumentLinkGroup
                    title="Statutory & Product Disclosure Documents"
                    direction="grid"
                  />
                </div>

                {/* Molecule 15: Validation message group */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <ValidationMessageGroup
                    errors={[
                      { fieldId: 'mol_dob', fieldLabel: 'Date of Birth', message: 'Practitioner must be at least 21 years of age.' },
                      { fieldId: 'mol_mobile', fieldLabel: 'Mobile Phone', message: 'Please enter a valid 9 or 10-digit Malaysian mobile number.' },
                      { fieldId: 'consent_statutory', fieldLabel: 'Statutory Declaration', message: 'You must confirm the statutory underwriting declaration before checkout.' },
                    ]}
                  />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: 20 INTERFACE ATOMS */}
        {activeTab === 'atoms' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* 1. Typography & Hierarchy */}
            <div className="ds-panel">
              <Heading level={2} style={{ marginBottom: '16px' }}>1. Typography & Hierarchy (Kanit & Inter)</Heading>
              <Text variant="small" color="secondary" style={{ marginBottom: '20px' }}>
                Strict invariant: Kanit is restricted to weights 400 and 500 only (never bold 600+). Tabular numerals for financial figures.
              </Text>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <Heading level="display">Display Heading (Kanit 500, 28px/36px)</Heading>
                  <Text variant="caption" color="muted">Level Display · Page Level Title</Text>
                </div>
                <div>
                  <Heading level={1}>Heading Level 1 (Kanit 500, 24px/32px)</Heading>
                  <Text variant="caption" color="muted">Level 1 · Milestone Stage Header</Text>
                </div>
                <div>
                  <Heading level={2}>Heading Level 2 (Kanit 500, 20px/28px)</Heading>
                  <Text variant="caption" color="muted">Level 2 · Structural Panel Title</Text>
                </div>
                <div>
                  <Heading level={3}>Heading Level 3 (Kanit 500, 18px/24px)</Heading>
                  <Text variant="caption" color="muted">Level 3 · Field Group Header</Text>
                </div>
                <div>
                  <Heading level={4}>Heading Level 4 (Kanit 500, 16px/20px)</Heading>
                  <Text variant="caption" color="muted">Level 4 · Card Subhead</Text>
                </div>
              </div>
            </div>

            {/* 2. Button Hierarchy & States */}
            <div className="ds-panel">
              <Heading level={2} style={{ marginBottom: '16px' }}>2. Button Hierarchy & Interactive States</Heading>
              <Text variant="small" color="secondary" style={{ marginBottom: '20px' }}>
                48px medium default, 36px small option. Primary action uses Deep Navy (#132766, 13.9:1 contrast).
              </Text>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
                <Button variant="primary">Primary Navy (48px)</Button>
                <Button variant="secondary">Secondary White</Button>
                <Button variant="teal">Accessible Teal</Button>
                <Button variant="ghost">Ghost Action</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="primary" loading>Loading...</Button>
                <Button variant="primary" disabled>Disabled</Button>
                <Button variant="primary" size="sm">Small (36px)</Button>
              </div>
            </div>

            {/* 3. Inputs & Textareas */}
            <div className="ds-panel">
              <Heading level={2} style={{ marginBottom: '16px' }}>3. Form Inputs & Textareas</Heading>
              <Text variant="small" color="secondary" style={{ marginBottom: '20px' }}>
                48px control height, 8px radius, accessible focus rings (2px #08A5B5).
              </Text>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <TextInput
                  id="demo-name"
                  label="Practitioner Full Name"
                  required
                  value={demoText}
                  onChange={(e) => setDemoText(e.target.value)}
                  helperText="As registered with Malaysian Medical Council (MMC)"
                />

                <TextInput
                  id="demo-nric"
                  label="NRIC / Identity Number"
                  required
                  placeholder="YYMMDD-PB-###G"
                  errorMessage="Please enter a valid 12-digit Malaysian NRIC number"
                />

                <TextInput
                  id="demo-readonly"
                  label="Policy Number (Read-only)"
                  readOnly
                  value="DS-IND-2026-09841"
                  helperText="Issued by Chubb Insurance Malaysia Berhad"
                />

                <TextInput
                  id="demo-disabled"
                  label="Locked Field (Disabled)"
                  disabled
                  value="System Locked Value"
                />

                <div style={{ gridColumn: '1 / -1' }}>
                  <Textarea
                    id="demo-textarea"
                    label="Underwriting Declaration Explanation"
                    placeholder="Provide full clinical details regarding the adverse circumstances..."
                    helperText="Required if answering 'Yes' to any historical claim or disciplinary inquiries."
                  />
                </div>
              </div>
            </div>

            {/* 4. Selection Controls */}
            <div className="ds-panel">
              <Heading level={2} style={{ marginBottom: '16px' }}>4. Selection Controls (44px Minimum Touch Targets)</Heading>
              <Text variant="small" color="secondary" style={{ marginBottom: '20px' }}>
                WCAG 2.2 target criteria. Checkbox 20px box in 44px hit-box. Radio 20px circle.
              </Text>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <Checkbox
                    id="demo-check"
                    label="I confirm that all particulars supplied are complete and accurate"
                    checked={demoCheckbox}
                    onChange={(e) => setDemoCheckbox(e.target.checked)}
                    required
                  />
                </div>

                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                  <RadioButton
                    id="demo-radio-1"
                    name="ownership"
                    label="Sole Proprietor"
                    value="sole"
                    checked={demoRadio === 'sole'}
                    onChange={() => setDemoRadio('sole')}
                  />
                  <RadioButton
                    id="demo-radio-2"
                    name="ownership"
                    label="Partnership / Sdn Bhd"
                    value="partner"
                    checked={demoRadio === 'partner'}
                    onChange={() => setDemoRadio('partner')}
                  />
                </div>

                <div style={{ maxWidth: '320px' }}>
                  <FieldLabel htmlFor="demo-segment">Do you own or partner in a private clinic practice?</FieldLabel>
                  <SegmentedControl
                    id="demo-segment"
                    options={[
                      { value: 'yes', label: 'Yes' },
                      { value: 'no', label: 'No' },
                    ]}
                    value={demoSegment}
                    onChange={setDemoSegment}
                  />
                </div>

                <div>
                  <FieldLabel htmlFor="tile-1">Indemnity Limit Selection (48px Tile Strip)</FieldLabel>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginTop: '8px' }}>
                    {tiers.map((t) => (
                      <SelectorCard
                        key={t.id}
                        id={`tile-${t.id}`}
                        title={t.limitFormatted}
                        subtitle={`RM ${t.indicativeAnnualRate}/yr`}
                        badge={t.isRecommended ? 'Recommended' : undefined}
                        selected={demoTile === t.id}
                        onClick={() => setDemoTile(t.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Combobox & Select */}
            <div className="ds-panel">
              <Heading level={2} style={{ marginBottom: '16px' }}>5. Combobox & Select (WAI-ARIA 1.2)</Heading>
              <SelectCombobox
                id="demo-combobox"
                label="Medical Practice Classification"
                required
                options={classifications}
                value={demoSelect}
                onChange={setDemoSelect}
                helperText="Searchable combobox with real-time text filter and keyboard listbox"
              />
            </div>

            {/* 6. Feedback & Indicators */}
            <div className="ds-panel">
              <Heading level={2} style={{ marginBottom: '16px' }}>6. Notices, Badges & Feedback</Heading>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <InlineNotice variant="info" title="PIDM Protection Disclosure">
                  The insurance benefit(s) payable under eligible certificate/policy is protected by PIDM up to limits.
                </InlineNotice>

                <InlineNotice variant="warning" title="Adverse Declaration Requires Underwriting Referral">
                  Your application will be routed to a Chubb underwriting specialist for manual review.
                </InlineNotice>

                <InlineNotice variant="error" title="Sanctions Screening Gate Interception">
                  We are unable to process this quote online. Please contact DoctorShield Client Support.
                </InlineNotice>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <Badge variant="neutral">Default Status</Badge>
                  <Badge variant="teal">Recommended</Badge>
                  <Badge variant="success">Active Policy</Badge>
                  <Badge variant="warning">Referral Required</Badge>
                  <Badge variant="error">Sanctions Alert</Badge>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: INSURANCE MOLECULES */}
        {activeTab === 'insurance' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div className="ds-panel">
              <Heading level={2} style={{ marginBottom: '16px' }}>1. InsuranceStepProgress (5-Stage Indicator)</Heading>
              <InsuranceStepProgress currentStep={currentStep} />
              <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Button
                    key={s}
                    size="sm"
                    variant={currentStep === s ? 'primary' : 'secondary'}
                    onClick={() => setCurrentStep(s)}
                  >
                    Step {s}
                  </Button>
                ))}
              </div>
            </div>

            <div className="ds-panel">
              <Heading level={2} style={{ marginBottom: '16px' }}>2. LiabilityLimitSelector (48px Restrained Tiles)</Heading>
              <LiabilityLimitSelector
                tiers={tiers}
                selectedTierId={selectedLimit}
                onChange={setSelectedLimit}
              />
            </div>

            <div className="ds-panel">
              <Heading level={2} style={{ marginBottom: '16px' }}>3. SpecializationAllocationEditor (100% Math Balance)</Heading>
              <SpecializationAllocationEditor
                specialties={specialtyAllocations}
                onSave={(alloc) => {
                  setSpecialtyAllocations(alloc);
                  alert('Allocations Saved: 100% balanced');
                }}
              />
            </div>

            <div className="ds-panel">
              <Heading level={2} style={{ marginBottom: '16px' }}>4. CoverageDateField (Clause 6.12 Backdating Interception)</Heading>
              <CoverageDateField
                id="coverage-date-demo"
                startDate="2026-11-01"
                endDate="2026-12-31"
                onStartDateChange={(d, backdate) => alert(`Date selected: ${d} | Backdate agreed: ${backdate}`)}
              />
            </div>

            <div className="ds-panel">
              <Heading level={2} style={{ marginBottom: '16px' }}>5. PremiumBreakdown (SST 8% & Stamp Duty)</Heading>
              <PremiumBreakdown quote={dummyQuote} />
            </div>

            <div className="ds-panel">
              <Heading level={2} style={{ marginBottom: '16px' }}>6. UnderwritingQuestionGroup</Heading>
              <UnderwritingQuestionGroup declarations={declarations} onChange={setDeclarations} />
            </div>

            <div className="ds-panel">
              <Heading level={2} style={{ marginBottom: '16px' }}>7. PaymentMethodSelector</Heading>
              <PaymentMethodSelector selectedChannel={paymentChannel} onChange={setPaymentChannel} />
            </div>

            <div className="ds-panel">
              <Heading level={2} style={{ marginBottom: '16px' }}>8. ReferralSupportOutcome (Support Desk)</Heading>
              <ReferralSupportOutcome doctorName="Dr. Adam" onSubmitCallback={(data) => alert(JSON.stringify(data))} />
            </div>
          </div>
        )}

        {/* TAB 4: STAGE COMPOSITIONS */}
        {activeTab === 'compositions' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div className="ds-panel">
              <Badge variant="teal" style={{ marginBottom: '12px' }}>Stage 1 Flow Composition</Badge>
              <CoverageStageComposition />
            </div>

            <div className="ds-panel">
              <Badge variant="success" style={{ marginBottom: '12px' }}>Stage 4 Flow Composition</Badge>
              <ReviewStageComposition />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
