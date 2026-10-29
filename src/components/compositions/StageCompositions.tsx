import React, { useState } from 'react';
import { InsuranceStepProgress } from '../insurance/InsuranceStepProgress';
import { LiabilityLimitSelector, LiabilityTier } from '../insurance/LiabilityLimitSelector';
import { SelectCombobox, SelectOption } from '../ui/SelectCombobox';
import { CoverageDateField } from '../insurance/CoverageDateField';
import { CoverageSummaryPanel } from '../insurance/CoverageSummaryPanel';
import { PremiumBreakdown, PremiumQuoteData } from '../insurance/PremiumDisplay';
import { UnderwritingQuestionGroup, DeclarationState, DeclarationAndLegalAcknowledgment, PaymentMethodSelector, PaymentChannel } from '../insurance/UnderwritingAndCheckout';
import { TextInput } from '../ui/TextInput';
import { Button } from '../ui/Button';

/* ========================================================================
   1. STAGE 1 COMPOSITION: COVERAGE CONFIGURATION
   ======================================================================== */
export const CoverageStageComposition: React.FC = () => {
  const [specialty, setSpecialty] = useState('7');
  const [liabilityTier, setLiabilityTier] = useState('1m');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [ownClinic, setOwnClinic] = useState(false);

  const classifications: SelectOption[] = [
    { value: '7', label: 'General Medical Practitioner', group: 'Primary Care' },
    { value: '20', label: 'GP with Aesthetic Procedures', group: 'Primary Care' },
    { value: '12', label: 'General Surgery', group: 'Surgical Specialties' },
    { value: '15', label: 'Obstetrics & Gynaecology', group: 'Surgical Specialties' },
    { value: '18', label: 'Orthopaedic Surgery', group: 'Surgical Specialties' },
    { value: '5', label: 'Government Medical Officer / Dentist', group: 'Public Sector' },
    { value: '2', label: 'General Dental Practitioner', group: 'Dental' },
  ];

  const tiers: LiabilityTier[] = [
    { id: '500k', limitAmount: 500000, limitFormatted: 'RM 500,000', indicativeAnnualRate: 400.0 },
    { id: '1m', limitAmount: 1000000, limitFormatted: 'RM 1,000,000', indicativeAnnualRate: 650.0, isRecommended: true, recommendationTag: 'Most Popular' },
    { id: '2m', limitAmount: 2000000, limitFormatted: 'RM 2,000,000', indicativeAnnualRate: 1100.0 },
    { id: '5m', limitAmount: 5000000, limitFormatted: 'RM 5,000,000', indicativeAnnualRate: 2400.0 },
  ];

  const dummyQuote: PremiumQuoteData = {
    grossBase: 650.0,
    discountAmount: 65.0,
    promoCode: 'MMA2026',
    netGross: 585.0,
    sstAmount: 46.8, // 8%
    stampDuty: 10.0,
    totalPayable: 641.8,
  };

  return (
    <div className="ds-stage-composition" style={{ maxWidth: '1140px', margin: '0 auto', padding: '24px 16px' }}>
      <InsuranceStepProgress currentStep={1} />

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '32px', alignItems: 'flex-start' }}>
        {/* Main Form Canvas */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '12px', border: '1px solid var(--ds-color-border-subtle)' }}>
          <h1 style={{ fontFamily: 'var(--ds-primitive-font-heading)', fontSize: '1.75rem', fontWeight: 500, color: 'var(--ds-color-text-heading)', margin: '0 0 8px 0' }}>
            Select Your Professional Coverage
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--ds-color-text-secondary)', margin: '0 0 24px 0' }}>
            Choose your specialization and indemnity limit to obtain an instant indicative quote.
          </p>

          <SelectCombobox
            id="class-selector"
            label="Medical Specialization / Practice Classification"
            required
            options={classifications}
            value={specialty}
            onChange={setSpecialty}
          />

          <LiabilityLimitSelector
            tiers={tiers}
            selectedTierId={liabilityTier}
            onChange={setLiabilityTier}
          />

          <CoverageDateField
            id="start-date-input"
            startDate={startDate}
            endDate="2027-10-31"
            onStartDateChange={(newDate) => setStartDate(newDate)}
          />

          {/* Clinic Ownership Toggle */}
          <div style={{ padding: '20px', backgroundColor: 'var(--ds-primitive-color-navy-50)', borderRadius: '8px', border: '1px solid var(--ds-color-border-subtle)' }}>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <div>
                <span style={{ fontWeight: 600, color: 'var(--ds-color-text-heading)', display: 'block' }}>Do you own or partner in a private clinic practice?</span>
                <span style={{ fontSize: '13px', color: 'var(--ds-color-text-muted)' }}>Optional facility and Person-In-Charge coverage</span>
              </div>
              <input
                type="checkbox"
                checked={ownClinic}
                onChange={(e) => setOwnClinic(e.target.checked)}
                style={{ width: '20px', height: '20px', accentColor: 'var(--ds-primitive-color-teal-700)' }}
              />
            </label>
          </div>
        </div>

        {/* Sticky Summary Rail */}
        <CoverageSummaryPanel
          classificationName="General Medical Practitioner"
          limitFormatted="RM 1,000,000"
          startDate={startDate}
          endDate="2027-10-31"
          quote={dummyQuote}
          onProceed={() => alert('Proceeding to Stage 2: Quotation')}
        />
      </div>
    </div>
  );
};

/* ========================================================================
   2. STAGE 4 COMPOSITION: REVIEW, STATUTORY CONSENTS & PAYMENT
   ======================================================================== */
export const ReviewStageComposition: React.FC = () => {
  const [consents, setConsents] = useState({ terms: true, disclosure: true, pdpa: true });
  const [paymentChannel, setPaymentChannel] = useState<PaymentChannel>('personal');

  const dummyQuote: PremiumQuoteData = {
    grossBase: 1000.0,
    clinicEntityCover: 200.0,
    branchSurcharges: 100.0,
    branchCount: 1,
    isPicComplimentary: true,
    netGross: 1300.0,
    sstAmount: 104.0, // 8%
    stampDuty: 10.0,
    totalPayable: 1414.0,
  };

  const handleConsentChange = (key: 'terms' | 'disclosure' | 'pdpa', val: boolean) => {
    setConsents((prev) => ({ ...prev, [key]: val }));
  };

  const allConsented = consents.terms && consents.disclosure && consents.pdpa;

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '24px 16px' }}>
      <InsuranceStepProgress currentStep={4} />

      <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '12px', border: '1px solid var(--ds-color-border-subtle)', boxShadow: 'var(--ds-primitive-shadow-sm)' }}>
        <h1 style={{ fontFamily: 'var(--ds-primitive-font-heading)', fontSize: '1.75rem', fontWeight: 500, color: 'var(--ds-color-text-heading)', margin: '0 0 8px 0' }}>
          Review & Authorize Coverage
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--ds-color-text-secondary)', margin: '0 0 24px 0' }}>
          Verify your policy summary, review statutory disclosures, and proceed to secure payment.
        </p>

        {/* Premium Breakdown */}
        <PremiumBreakdown quote={dummyQuote} className="mb-6" />

        <div style={{ margin: '24px 0' }}>
          <DeclarationAndLegalAcknowledgment
            agreedToTerms={consents.terms}
            agreedToDutyOfDisclosure={consents.disclosure}
            agreedToPdpa={consents.pdpa}
            onChange={handleConsentChange}
          />
        </div>

        <PaymentMethodSelector
          selectedChannel={paymentChannel}
          onChange={setPaymentChannel}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px' }}>
          <Button variant="ghost" onClick={() => alert('Back to Stage 3')}>
            Back to Declarations
          </Button>
          <Button
            variant="primary"
            disabled={!allConsented}
            onClick={() => alert(`Proceeding to Gateway hand-off via channel: ${paymentChannel}`)}
          >
            Authorize & Proceed to Payment
          </Button>
        </div>
      </div>
    </div>
  );
};

