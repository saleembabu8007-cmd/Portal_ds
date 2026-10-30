import React, { useState } from 'react';
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
  Link,
  TextLink,
  FieldLabel,
  HelperText,
  ErrorMessage,
  InlineNotice,
  Badge,
  StatusIndicator,
  Divider,
  LoadingIndicator,
  ProgressIndicatorPrimitive,
  DisclosureTrigger,
  CurrencyPriceText,
} from '../components/ui';
import {
  ArrowRight,
  Download,
  Filter,
  Check,
  Search,
  Settings,
  HelpCircle,
  ExternalLink,
  Shield,
  FileText,
  Copy,
} from 'lucide-react';

export const AtomicComponentGallery: React.FC = () => {
  // Interactive state for atoms
  const [btnLoading, setBtnLoading] = useState(false);
  const [textVal, setTextVal] = useState('Dr. Sarah Tan Li Wei');
  const [numVal, setNumVal] = useState('1500000');
  const [emailVal, setEmailVal] = useState('sarah.tan@doctor.org.my');
  const [telVal, setTelVal] = useState('12-345 6789');
  const [textareaVal, setTextareaVal] = useState('No prior claims, disciplinary proceedings, or MMC inquiries in the preceding 5 years.');
  const [chk1, setChk1] = useState(true);
  const [chk2, setChk2] = useState(false);
  const [radioVal, setRadioVal] = useState('annual');
  const [segmentedVal, setSegmentedVal] = useState('no');
  const [selectedLimit, setSelectedLimit] = useState('1m');
  const [selectVal, setSelectVal] = useState('gmp');
  const [comboboxVal, setComboboxVal] = useState('7');
  const [progressVal, setProgressVal] = useState(65);

  const sampleOptions = [
    { value: 'gmp', label: 'General Medical Practitioner (Primary Care)' },
    { value: 'aesthetics', label: 'GP with Non-Invasive Aesthetics' },
    { value: 'paediatrics', label: 'Consultant Paediatrician' },
    { value: 'anaesthesia', label: 'Consultant Anaesthesiologist' },
  ];

  const comboboxOptions = [
    { value: '1', label: 'Class 1 — Physicians (Non-Invasive)', group: 'Physicians' },
    { value: '2', label: 'Class 2 — Paediatrics & Dermatology', group: 'Physicians' },
    { value: '7', label: 'Class 7 — General Medical Practitioners', group: 'General Practice' },
    { value: '8', label: 'Class 8 — General Practice with Minor Procedures', group: 'General Practice' },
    { value: '15', label: 'Class 15 — General Surgery', group: 'Surgical Specialties' },
    { value: '22', label: 'Class 22 — Obstetrics & Gynaecology', group: 'Surgical Specialties' },
  ];

  return (
    <div style={{ backgroundColor: 'var(--ds-color-surface-canvas, #F4F7F9)', minHeight: '100vh', padding: '32px 20px', fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header Banner */}
        <div style={{ marginBottom: '32px', backgroundColor: 'var(--ds-color-surface-card, #FFFFFF)', border: '1px solid var(--ds-color-border-subtle, #DFE6EC)', borderRadius: '10px', padding: '24px 28px', boxShadow: '0 1px 3px rgba(19, 39, 102, 0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ backgroundColor: 'var(--ds-color-surface-brand-tint, #F0FAFA)', color: 'var(--ds-color-brand-primary, #08A5B5)', border: '1px solid var(--ds-primitive-color-teal-200, #AEE7EB)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                  PHASE 05 VERIFIED
                </span>
                <span style={{ color: 'var(--ds-color-text-muted, #64748B)', fontSize: '0.8125rem' }}>
                  Direction B: Structured Premium with Editorial Craft
                </span>
              </div>
              <Heading level="display" style={{ fontSize: '1.75rem', marginBottom: '6px' }}>
                Complete Atomic UI Component Gallery
              </Heading>
              <Text color="secondary" style={{ maxWidth: '780px', fontSize: '0.875rem' }}>
                Authoritative presentation of all 22 DoctorShield foundational design-system atoms. Evaluated across resting, hover, focus, active, selected, disabled, and invalid states under WCAG 2.2 AA strict compliance.
              </Text>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => window.open('/buy/coverage', '_blank')}
                rightIcon={<ArrowRight size={14} />}
              >
                Inspect Live Stage 1 Form
              </Button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION 1: BUTTONS & ICON BUTTONS (Atoms 1 & 2)
            ========================================================================= */}
        <div className="ds-card" style={{ marginBottom: '28px' }}>
          <div className="ds-section-bar">
            <div>
              <h2 className="ds-heading-section">01 & 02. Action Buttons & Icon Buttons</h2>
              <div className="ds-meta">Height: 46px Standard, 38px Compact | Radius: 6px | Touch Envelope: 44px</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {/* Primary & Navy Buttons */}
            <div style={{ padding: '16px', backgroundColor: 'var(--ds-primitive-color-slate-50, #F4F7F9)', borderRadius: '6px', border: '1px solid var(--ds-color-border-subtle, #DFE6EC)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-color-text-muted, #64748B)', marginBottom: '12px', textTransform: 'uppercase' }}>
                Primary Action (Teal #08A5B5) & Institutional Navy (#132766)
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                <Button variant="primary" rightIcon={<ArrowRight size={16} />}>
                  Calculate Quotation
                </Button>
                <Button variant="navy" leftIcon={<Shield size={16} />}>
                  Chubb Gateway
                </Button>
                <Button variant="primary" size="sm">
                  Compact 38px
                </Button>
              </div>
            </div>

            {/* Secondary & Ghost Buttons */}
            <div style={{ padding: '16px', backgroundColor: 'var(--ds-primitive-color-slate-50, #F4F7F9)', borderRadius: '6px', border: '1px solid var(--ds-color-border-subtle, #DFE6EC)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-color-text-muted, #64748B)', marginBottom: '12px', textTransform: 'uppercase' }}>
                Secondary Surface & Tertiary Ghost
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                <Button variant="secondary">
                  Back to Coverage
                </Button>
                <Button variant="ghost">
                  Cancel / Dismiss
                </Button>
                <Button variant="destructive" size="sm">
                  Remove Branch
                </Button>
              </div>
            </div>

            {/* Loading & Disabled States */}
            <div style={{ padding: '16px', backgroundColor: 'var(--ds-primitive-color-slate-50, #F4F7F9)', borderRadius: '6px', border: '1px solid var(--ds-color-border-subtle, #DFE6EC)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-color-text-muted, #64748B)', marginBottom: '12px', textTransform: 'uppercase' }}>
                Interactive States (Loading, Disabled)
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                <Button
                  variant="primary"
                  loading={btnLoading}
                  onClick={() => {
                    setBtnLoading(true);
                    setTimeout(() => setBtnLoading(false), 2000);
                  }}
                >
                  {btnLoading ? 'Calculating...' : 'Test Loading State'}
                </Button>
                <Button variant="primary" disabled>
                  Disabled Primary
                </Button>
                <Button variant="secondary" disabled>
                  Disabled Secondary
                </Button>
              </div>
            </div>

            {/* Icon Buttons (Atom 2) */}
            <div style={{ padding: '16px', backgroundColor: 'var(--ds-primitive-color-slate-50, #F4F7F9)', borderRadius: '6px', border: '1px solid var(--ds-color-border-subtle, #DFE6EC)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-color-text-muted, #64748B)', marginBottom: '12px', textTransform: 'uppercase' }}>
                Atom 02: Icon Buttons (44px Hit Target Envelope)
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                <IconButton icon={<Download size={18} />} label="Download Schedule" variant="secondary" />
                <IconButton icon={<Filter size={18} />} label="Filter Options" variant="ghost" />
                <IconButton icon={<Settings size={18} />} label="Configuration" variant="primary" />
                <IconButton icon={<HelpCircle size={18} />} label="Help Center" variant="ghost" rounded />
                <IconButton icon={<Download size={18} />} label="Download Schedule" variant="secondary" disabled />
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION 2: TEXT & SPECIALIZED INPUTS (Atoms 3, 4, 5, 6, 7)
            ========================================================================= */}
        <div className="ds-card" style={{ marginBottom: '28px' }}>
          <div className="ds-section-bar">
            <div>
              <h2 className="ds-heading-section">03, 04, 05, 06, 07. Form Inputs & Textarea</h2>
              <div className="ds-meta">Height: 46px | Radius: 6px | Focus Ring: 3px Teal | Text: 16px (Non-Zoom iOS Safe)</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {/* Atom 3: Text Input */}
            <div>
              <TextInput
                label="03. Text Input (Standard)"
                value={textVal}
                onChange={(e) => setTextVal(e.target.value)}
                helperText="Full legal name as registered in the Malaysian Medical Council register."
                required
              />

              <TextInput
                label="03b. Text Input (Error State)"
                value="invalid.email@"
                errorMessage="Please enter a valid practitioner email address."
                required
              />

              <TextInput
                label="03c. Text Input (Disabled)"
                value="MMC Registration: 84920 (Verified)"
                disabled
              />
            </div>

            {/* Atom 4 & 5: Number & Email Inputs */}
            <div>
              <NumberInput
                label="04. Number Input (Tabular Figures)"
                value={numVal}
                onChange={(e) => setNumVal(e.target.value)}
                helperText="Estimated annual gross revenue from Malaysian practice (RM)."
                required
              />

              <EmailInput
                label="05. Email Input (Pre-configured)"
                value={emailVal}
                onChange={(e) => setEmailVal(e.target.value)}
                helperText="Official communication and digital policy schedule delivery."
                required
              />

              <TelInput
                label="06. Telephone Input (+60 Malaysian Prefix)"
                value={telVal}
                onChange={(e) => setTelVal(e.target.value)}
                helperText="Mobile number for statutory SMS OTP binding verification."
                required
              />
            </div>

            {/* Atom 7: Textarea */}
            <div>
              <Textarea
                label="07. Textarea (Auto-wrapped with Character Count)"
                value={textareaVal}
                onChange={(e) => setTextareaVal(e.target.value)}
                maxLength={300}
                showCharCount
                rows={4}
                helperText="Provide relevant underwriting disclosures or practice details."
                required
              />

              <Textarea
                label="07b. Textarea (Error State)"
                value=""
                errorMessage="Practitioner disclosure explanation cannot be left empty."
                required
              />
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION 3: SELECTION PRIMITIVES & TILES (Atoms 8, 9, Segmented, Tile)
            ========================================================================= */}
        <div className="ds-card" style={{ marginBottom: '28px' }}>
          <div className="ds-section-bar">
            <div>
              <h2 className="ds-heading-section">08 & 09. Selection Controls & Limit Tiles</h2>
              <div className="ds-meta">Control: 20px | Touch Envelope: Strict 44px Hit Box | Radius: 4px (Checkbox) / Full (Radio)</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {/* Atom 8: Checkbox */}
            <div style={{ padding: '16px', backgroundColor: 'var(--ds-primitive-color-slate-50, #F4F7F9)', borderRadius: '6px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-color-text-muted, #64748B)', marginBottom: '12px', textTransform: 'uppercase' }}>
                Atom 08: Checkboxes (44px Minimum Touch Targets)
              </div>
              <Checkbox
                id="chk-demo-1"
                label="Affirmative Statutory Compliance"
                description="I declare the information provided is accurate and true."
                checked={chk1}
                onChange={(e) => setChk1(e.target.checked)}
              />
              <Checkbox
                id="chk-demo-2"
                label="Include Clinic PIC Extension"
                description="Coverage for Person-In-Charge statutory clinic liabilities."
                checked={chk2}
                onChange={(e) => setChk2(e.target.checked)}
              />
              <Checkbox
                id="chk-demo-3"
                label="Disabled Unchecked Option"
                disabled
              />
              <Checkbox
                id="chk-demo-4"
                label="Disabled Checked Mandatory Policy"
                checked
                disabled
              />
              <Checkbox
                id="chk-demo-5"
                label="Required Terms Agreement (Error State)"
                checked={false}
                errorMessage="You must accept the terms before binding."
              />
            </div>

            {/* Atom 9: Radio Button */}
            <div style={{ padding: '16px', backgroundColor: 'var(--ds-primitive-color-slate-50, #F4F7F9)', borderRadius: '6px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-color-text-muted, #64748B)', marginBottom: '12px', textTransform: 'uppercase' }}>
                Atom 09: Radio Controls (20px Ring, 8px Teal Dot)
              </div>
              <RadioButton
                id="radio-demo-1"
                name="billing-cycle"
                label="Annual Inception (Full MMC APC Period)"
                description="Policy aligns to statutory 31st December expiration."
                checked={radioVal === 'annual'}
                onChange={() => setRadioVal('annual')}
              />
              <RadioButton
                id="radio-demo-2"
                name="billing-cycle"
                label="Pro-rata Calculation Period"
                description="Computed on exact daily pro-rata basis."
                checked={radioVal === 'prorata'}
                onChange={() => setRadioVal('prorata')}
              />
              <RadioButton
                id="radio-demo-3"
                name="billing-cycle-disabled"
                label="Multi-year Facility (Currently Unavailable)"
                disabled
              />
            </div>

            {/* Segmented Control & Limit Selector Tile */}
            <div style={{ padding: '16px', backgroundColor: 'var(--ds-primitive-color-slate-50, #F4F7F9)', borderRadius: '6px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-color-text-muted, #64748B)', marginBottom: '12px', textTransform: 'uppercase' }}>
                Segmented Switcher & Limit Selector Tiles
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <FieldLabel htmlFor="seg-ctrl">Statutory Adverse Inquiries (Yes / No Pair):</FieldLabel>
                <SegmentedControl
                  options={[
                    { value: 'no', label: 'No (Clean Record)' },
                    { value: 'yes', label: 'Yes (Referral Required)' },
                  ]}
                  value={segmentedVal}
                  onChange={setSegmentedVal}
                />
              </div>

              <div>
                <FieldLabel htmlFor="tiles-demo">Coverage Limit Selector Tiles (Atom 4 Variant):</FieldLabel>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <SelectorCard
                    id="tile-500k"
                    title="RM 500,000"
                    subtitle="Ind. Rate: RM 400"
                    selected={selectedLimit === '500k'}
                    onClick={() => setSelectedLimit('500k')}
                  />
                  <SelectorCard
                    id="tile-1m"
                    title="RM 1,000,000"
                    subtitle="Ind. Rate: RM 650"
                    badge="Recommended"
                    selected={selectedLimit === '1m'}
                    onClick={() => setSelectedLimit('1m')}
                  />
                  <SelectorCard
                    id="tile-2m"
                    title="RM 2,000,000"
                    subtitle="Ind. Rate: RM 950"
                    selected={selectedLimit === '2m'}
                    onClick={() => setSelectedLimit('2m')}
                  />
                  <SelectorCard
                    id="tile-5m"
                    title="RM 5,000,000"
                    subtitle="Ind. Rate: RM 1,450"
                    badge="Consultants"
                    selected={selectedLimit === '5m'}
                    onClick={() => setSelectedLimit('5m')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION 4: SELECT & COMBOBOX (Atoms 10 & 11)
            ========================================================================= */}
        <div className="ds-card" style={{ marginBottom: '28px' }}>
          <div className="ds-section-bar">
            <div>
              <h2 className="ds-heading-section">10 & 11. Select & Searchable Combobox</h2>
              <div className="ds-meta">Height: 46px Standard | Keyboard Navigable | WAI-ARIA 1.2 Combobox</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div>
              <Select
                id="select-demo-1"
                label="10. Native / Styled Select Trigger"
                options={sampleOptions}
                value={selectVal}
                onChange={setSelectVal}
                helperText="Customized 16px chevron down indicator with accessible native selection on mobile."
                required
              />

              <Select
                id="select-demo-2"
                label="10b. Select with Validation Error"
                options={sampleOptions}
                value=""
                onChange={() => {}}
                errorMessage="Please select a valid practitioner specialty."
                required
              />
            </div>

            <div>
              <SelectCombobox
                id="combobox-demo-1"
                label="11. Searchable Combobox with Groups"
                options={comboboxOptions}
                value={comboboxVal}
                onChange={setComboboxVal}
                placeholder="Search medical classification..."
                helperText="Type to filter classes; supports keyboard arrow navigation and Esc dismiss."
                required
              />

              <SelectCombobox
                id="combobox-demo-2"
                label="11b. Combobox (Disabled State)"
                options={comboboxOptions}
                value="7"
                disabled
                onChange={() => {}}
                helperText="Locked under existing active policy endorsement."
              />
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION 5: TYPOGRAPHY & LINKS (Atoms 12 & 14)
            ========================================================================= */}
        <div className="ds-card" style={{ marginBottom: '28px' }}>
          <div className="ds-section-bar">
            <div>
              <h2 className="ds-heading-section">12 & 14. Typography Scales & Accessible Links</h2>
              <div className="ds-meta">Strict Rules: Kanit &le; 500 | Inter &le; 500 | Link: Accessible Teal #066F7B (5.89:1)</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <span style={{ fontSize: '0.6875rem', color: 'var(--ds-color-text-muted, #64748B)', textTransform: 'uppercase', fontWeight: 600 }}>Display Title (Kanit 500, 32px)</span>
                <Heading level="display">DoctorShield Medical Indemnity</Heading>
              </div>
              <div>
                <span style={{ fontSize: '0.6875rem', color: 'var(--ds-color-text-muted, #64748B)', textTransform: 'uppercase', fontWeight: 600 }}>Section Heading (Kanit 500, 18px with Accent Bar)</span>
                <div className="ds-section-bar" style={{ marginBottom: 0, marginTop: '4px' }}>
                  <Heading level={2}>Underwriting Declarations & Risk Assessment</Heading>
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.6875rem', color: 'var(--ds-color-text-muted, #64748B)', textTransform: 'uppercase', fontWeight: 600 }}>Form Group Title (Inter 500, 15px)</span>
                <div style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 500, color: 'var(--ds-color-text-primary, #17253B)' }}>
                  Statutory Practice Inquiries
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '0.6875rem', color: 'var(--ds-color-text-muted, #64748B)', textTransform: 'uppercase', fontWeight: 600 }}>Body Text (Inter 400, 14px)</span>
                <Text variant="body" color="secondary">
                  Underwritten by Chubb Insurance Malaysia Berhad. DoctorShield provides comprehensive protection against civil claims arising from medical professional negligence.
                </Text>
              </div>
              <div>
                <span style={{ fontSize: '0.6875rem', color: 'var(--ds-color-text-muted, #64748B)', textTransform: 'uppercase', fontWeight: 600 }}>Legal & Metadata (Inter 400, 12px)</span>
                <Text variant="legal" color="muted">
                  PIDM Protection: The benefit(s) payable under eligible certificate/policy/contract is(are) protected by PIDM up to limits. Please refer to PIDM’s TIPS Brochure or contact Chubb Insurance Malaysia Berhad.
                </Text>
              </div>
              <div>
                <span style={{ fontSize: '0.6875rem', color: 'var(--ds-color-text-muted, #64748B)', textTransform: 'uppercase', fontWeight: 600 }}>Atom 14: Text Link (Accessible Teal #066F7B)</span>
                <div style={{ marginTop: '4px', display: 'flex', gap: '16px' }}>
                  <TextLink href="#terms">View Statutory Policy Wording</TextLink>
                  <TextLink href="https://pidm.gov.my" isExternal>PIDM Protection Portal</TextLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION 6: NOTICES, PROGRESS, DISCLOSURE & FINANCIAL ATOMS (Atoms 13, 15, 16, 17, 18, 19, 20, 21, 22)
            ========================================================================= */}
        <div className="ds-card" style={{ marginBottom: '28px' }}>
          <div className="ds-section-bar">
            <div>
              <h2 className="ds-heading-section">13, 15..22. Feedback, Progress, Notices & Currency</h2>
              <div className="ds-meta">Semantic Live Regions | Tabular Figures | Non-alarmist Contextual Guidance</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {/* Inline Notices (Atom 17) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-color-text-muted, #64748B)', textTransform: 'uppercase' }}>
                Atom 17: Inline Notices
              </div>
              <InlineNotice variant="info" title="Statutory MMC APC Alignment">
                Policy inception is aligned to expire on 31st December to match the Malaysian Medical Council Annual Practicing Certificate schedule.
              </InlineNotice>
              <InlineNotice variant="success" title="Partner Discount Applied">
                10% partner discount verified for Malaysian Medical Association member.
              </InlineNotice>
              <InlineNotice variant="warning" title="15-Minute Rate Lock">
                Your quotation premium is held firm for 15 minutes.
              </InlineNotice>
              <InlineNotice variant="error" title="Underwriting Referral Required">
                An affirmative response requires senior underwriter review before binding.
              </InlineNotice>
            </div>

            {/* Badges, Loading, Progress, Disclosure */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-color-text-muted, #64748B)', textTransform: 'uppercase' }}>
                Atom 22: Status Indicators & Badges
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                <Badge variant="teal" withDot>Active Rate Lock</Badge>
                <Badge variant="navy">Chubb Backed</Badge>
                <Badge variant="success" withDot>Verified MMC</Badge>
                <Badge variant="warning" withDot>Pending Review</Badge>
                <Badge variant="error" withDot>AML Blocked</Badge>
                <Badge variant="neutral">Pro-rata</Badge>
              </div>

              <Divider label="Primitives" style={{ margin: '8px 0' }} />

              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-color-text-muted, #64748B)', textTransform: 'uppercase' }}>
                Atom 18 & 19: Loading & Progress Primitives
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <LoadingIndicator label="Calculating Chubb quotation..." />
              </div>
              <ProgressIndicatorPrimitive
                value={progressVal}
                label="Application Progress (Stage 1 of 4)"
              />

              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-color-text-muted, #64748B)', textTransform: 'uppercase', marginTop: '6px' }}>
                Atom 20: Disclosure Trigger ("Why do we ask this?")
              </div>
              <DisclosureTrigger label="Why do we require your MMC Registration Number?">
                DoctorShield queries the official Malaysian Medical Council register to confirm that your annual practicing certificate is valid and to verify specialty classifications under Chubb underwriting guidelines.
              </DisclosureTrigger>
            </div>

            {/* Currency Price Text (Atom 21) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-color-text-muted, #64748B)', textTransform: 'uppercase' }}>
                Atom 21: Currency Price Typography (Tabular Figures)
              </div>
              <div style={{ padding: '16px', backgroundColor: 'var(--ds-primitive-color-slate-50, #F4F7F9)', borderRadius: '6px', border: '1px solid var(--ds-color-border-subtle, #DFE6EC)' }}>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--ds-color-text-muted, #64748B)', display: 'block' }}>Hero Final Payable (Kanit 500, 24px)</span>
                  <CurrencyPriceText amount={704.00} size="hero" suffix="/ year" />
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--ds-color-text-muted, #64748B)', display: 'block' }}>Card Limit (Kanit 500, 18px)</span>
                  <CurrencyPriceText amount={1000000} size="card" />
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--ds-color-text-muted, #64748B)', display: 'block' }}>Line Item Breakdown (Inter 500, 14px)</span>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #DFE6EC', paddingBottom: '4px' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--ds-color-text-secondary, #475569)' }}>Net Gross Base:</span>
                    <CurrencyPriceText amount={650.00} size="item" />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #DFE6EC', padding: '4px 0' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--ds-color-text-secondary, #475569)' }}>8% Service Tax (SST):</span>
                    <CurrencyPriceText amount={52.00} size="item" />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--ds-color-text-secondary, #475569)' }}>Stamp Duty:</span>
                    <CurrencyPriceText amount={10.00} size="item" />
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ds-color-text-muted, #64748B)', textTransform: 'uppercase', marginTop: '6px' }}>
                Atom 16: Accessible Error Message
              </div>
              <ErrorMessage message="Please review and correct the invalid inputs highlighted above." />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
