import React, { useState } from 'react';
import { Heading, Text } from '../components/ui/Typography';
import { Button } from '../components/ui/Button';
import { TextInput } from '../components/ui/TextInput';
import { Textarea } from '../components/ui/Textarea';
import { Checkbox, RadioButton, SelectorCard } from '../components/ui/SelectionControls';
import { SelectCombobox, SelectOption } from '../components/ui/SelectCombobox';
import { Alert, Modal, Badge, Accordion, Divider } from '../components/ui/FeedbackModals';
import { InsuranceStepProgress } from '../components/insurance/InsuranceStepProgress';
import { LiabilityLimitSelector, LiabilityTier } from '../components/insurance/LiabilityLimitSelector';
import { SpecializationAllocationEditor, SpecialtyItem } from '../components/insurance/SpecializationAllocationEditor';
import { CoverageDateField } from '../components/insurance/CoverageDateField';
import { PremiumBreakdown, PremiumQuoteData } from '../components/insurance/PremiumDisplay';
import { CoverageSummaryPanel } from '../components/insurance/CoverageSummaryPanel';
import { UnderwritingQuestionGroup, DeclarationState, DeclarationAndLegalAcknowledgment, PaymentMethodSelector, PaymentChannel, ReferralSupportOutcome } from '../components/insurance/UnderwritingAndCheckout';
import { CoverageStageComposition, ReviewStageComposition } from '../components/compositions/StageCompositions';

export const CatalogApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ui' | 'insurance' | 'compositions'>('insurance');
  const [modalOpen, setModalOpen] = useState(false);

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
    { id: '1m', limitAmount: 1000000, limitFormatted: 'RM 1,000,000', indicativeAnnualRate: 650, isRecommended: true, recommendationTag: 'Most Popular' },
    { id: '2m', limitAmount: 2000000, limitFormatted: 'RM 2,000,000', indicativeAnnualRate: 1100 },
    { id: '5m', limitAmount: 5000000, limitFormatted: 'RM 5,000,000', indicativeAnnualRate: 2400 },
  ];

  const classifications: SelectOption[] = [
    { value: '7', label: 'General Medical Practitioner', group: 'Primary Care' },
    { value: '20', label: 'GP with Aesthetic Procedures', group: 'Primary Care' },
    { value: '12', label: 'General Surgery', group: 'Surgical Specialties' },
    { value: '15', label: 'Obstetrics & Gynaecology', group: 'Surgical Specialties' },
    { value: '5', label: 'Government Medical Officer', group: 'Public Sector' },
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

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--ds-color-surface-canvas)', padding: '24px 16px' }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
        {/* Navigation Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--ds-color-border-subtle)' }}>
          <div>
            <Heading level={2}>DoctorShield Component Library Catalog</Heading>
            <Text variant="small" color="secondary">Interactive Documentation, Testing & Component Variants</Text>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setActiveTab('insurance')}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeTab === 'insurance' ? 'var(--ds-color-action-primary)' : 'var(--ds-color-surface-card)',
                color: activeTab === 'insurance' ? '#FFFFFF' : 'var(--ds-color-text-primary)',
                fontWeight: 600,
              }}
            >
              Insurance Components
            </button>
            <button
              onClick={() => setActiveTab('compositions')}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeTab === 'compositions' ? 'var(--ds-color-action-primary)' : 'var(--ds-color-surface-card)',
                color: activeTab === 'compositions' ? '#FFFFFF' : 'var(--ds-color-text-primary)',
                fontWeight: 600,
              }}
            >
              Stage Compositions
            </button>
            <button
              onClick={() => setActiveTab('ui')}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeTab === 'ui' ? 'var(--ds-color-action-primary)' : 'var(--ds-color-surface-card)',
                color: activeTab === 'ui' ? '#FFFFFF' : 'var(--ds-color-text-primary)',
                fontWeight: 600,
              }}
            >
              Core UI Primitives
            </button>
          </div>
        </div>

        {/* TAB 1: INSURANCE COMPONENTS */}
        {activeTab === 'insurance' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Stepper */}
            <section style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '8px', border: '1px solid var(--ds-color-border-subtle)' }}>
              <Heading level={3} style={{ marginBottom: '16px' }}>1. InsuranceStepProgress</Heading>
              <InsuranceStepProgress currentStep={currentStep} onStepClick={setCurrentStep} />
              <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                {[1, 2, 3, 4].map((step) => (
                  <Button key={step} size="sm" variant={step === currentStep ? 'primary' : 'ghost'} onClick={() => setCurrentStep(step)}>
                    Set Stage {step}
                  </Button>
                ))}
              </div>
            </section>

            {/* Liability Selector */}
            <section style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '8px', border: '1px solid var(--ds-color-border-subtle)' }}>
              <Heading level={3} style={{ marginBottom: '16px' }}>2. LiabilityLimitSelector</Heading>
              <LiabilityLimitSelector tiers={tiers} selectedTierId={selectedLimit} onChange={setSelectedLimit} />
            </section>

            {/* Specialization Allocation Editor */}
            <section style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '8px', border: '1px solid var(--ds-color-border-subtle)' }}>
              <Heading level={3} style={{ marginBottom: '16px' }}>3. SpecializationAllocationEditor (Live 100% Math)</Heading>
              <SpecializationAllocationEditor
                specialties={specialtyAllocations}
                onSave={(alloc) => {
                  setSpecialtyAllocations(alloc);
                  alert('Allocations saved successfully!');
                }}
              />
            </section>

            {/* Coverage Date Field */}
            <section style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '8px', border: '1px solid var(--ds-color-border-subtle)' }}>
              <Heading level={3} style={{ marginBottom: '16px' }}>4. CoverageDateField (Clause 6.12 Interceptor)</Heading>
              <CoverageDateField
                id="demo-date-field"
                startDate="2026-11-01"
                endDate="2027-10-31"
                onStartDateChange={(d, backdate) => alert(`Date selected: ${d} | Backdate agreed: ${backdate}`)}
              />
            </section>

            {/* Premium Breakdown & Summary Panel */}
            <section style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '8px', border: '1px solid var(--ds-color-border-subtle)' }}>
              <Heading level={3} style={{ marginBottom: '16px' }}>5. PremiumBreakdown (SST 8% & Stamp Duty)</Heading>
              <PremiumBreakdown quote={dummyQuote} />
            </section>

            {/* Underwriting Questions */}
            <section style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '8px', border: '1px solid var(--ds-color-border-subtle)' }}>
              <Heading level={3} style={{ marginBottom: '16px' }}>6. UnderwritingQuestionGroup</Heading>
              <UnderwritingQuestionGroup declarations={declarations} onChange={setDeclarations} />
            </section>

            {/* Payment Method Selector */}
            <section style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '8px', border: '1px solid var(--ds-color-border-subtle)' }}>
              <Heading level={3} style={{ marginBottom: '16px' }}>7. PaymentMethodSelector</Heading>
              <PaymentMethodSelector selectedChannel={paymentChannel} onChange={setPaymentChannel} />
            </section>

            {/* Support Referral Outcome */}
            <section style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '8px', border: '1px solid var(--ds-color-border-subtle)' }}>
              <Heading level={3} style={{ marginBottom: '16px' }}>8. ReferralSupportOutcome (Support Desk)</Heading>
              <ReferralSupportOutcome doctorName="Dr. Tan" onSubmitCallback={(data) => alert(JSON.stringify(data))} />
            </section>
          </div>
        )}

        {/* TAB 2: STAGE COMPOSITIONS */}
        {activeTab === 'compositions' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <section style={{ border: '1px solid var(--ds-color-border-subtle)', borderRadius: '8px', padding: '16px', backgroundColor: '#F8FAFC' }}>
              <Badge variant="brand">Stage 1 Flow Composition</Badge>
              <CoverageStageComposition />
            </section>

            <section style={{ border: '1px solid var(--ds-color-border-subtle)', borderRadius: '8px', padding: '16px', backgroundColor: '#F8FAFC' }}>
              <Badge variant="success">Stage 4 Flow Composition</Badge>
              <ReviewStageComposition />
            </section>
          </div>
        )}

        {/* TAB 3: CORE UI PRIMITIVES */}
        {activeTab === 'ui' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <section style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '8px', border: '1px solid var(--ds-color-border-subtle)' }}>
              <Heading level={3} style={{ marginBottom: '16px' }}>Action Buttons</Heading>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Button variant="primary">Primary Accessible Teal</Button>
                <Button variant="secondary">Secondary Navy</Button>
                <Button variant="ghost">Ghost Tertiary</Button>
                <Button variant="destructive">Destructive Rose</Button>
                <Button variant="primary" loading>Loading Button</Button>
                <Button variant="primary" disabled>Disabled</Button>
              </div>
            </section>

            <section style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '8px', border: '1px solid var(--ds-color-border-subtle)' }}>
              <Heading level={3} style={{ marginBottom: '16px' }}>Form Controls & Inputs</Heading>
              <TextInput id="demo-name" label="Full Name as per IC" required placeholder="DR. AHMAD BIN ABDULLAH" />
              <TextInput id="demo-err" label="Email Address" required errorMessage="Please enter a valid email address." value="invalid-email" />
              <Textarea id="demo-area" label="Clinical Explanation" required showCharCount maxLength={500} placeholder="Type clinical notes..." />
              <SelectCombobox id="demo-combo" label="Medical Classification" options={classifications} value="7" onChange={(v) => console.log(v)} />
            </section>

            <section style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '8px', border: '1px solid var(--ds-color-border-subtle)' }}>
              <Heading level={3} style={{ marginBottom: '16px' }}>Alert Banners</Heading>
              <Alert type="success" title="Policy Bound">Your Certificate of Insurance has been issued by Chubb.</Alert>
              <Alert type="warning" title="Session Timeout">Your rate validity window expires in 5 minutes.</Alert>
              <Alert type="danger" title="Validation Failure">Please correct the highlighted errors before proceeding.</Alert>
              <Alert type="info" title="PIDM Protection">Eligible policy benefits protected up to RM 500,000.</Alert>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};
