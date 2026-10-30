import React, { useState } from 'react';
import { Building2, Plus, AlertCircle, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/FieldFeedback';
import { Textarea } from '../ui/Textarea';
import { RepeatingBranchRow, RepeatingBranchData } from '../form/RepeatingBranchRow';
import { LabeledTextField } from '../form/LabeledTextField';
import { LabeledSelect } from '../form/LabeledSelect';
import { AgreeDisagreeSelector } from '../form/ChoiceSelectors';

/* ========================================================================
   12. ADDITIONAL BRANCH LIST / EDITOR ORGANISM
   ======================================================================== */
export interface BranchListEditorProps {
  branches: RepeatingBranchData[];
  onBranchesChange: (newBranches: RepeatingBranchData[]) => void;
  primaryClinicName?: string;
  isRevenueConfirmed: boolean;
  onRevenueConfirmChange: (confirmed: boolean) => void;
  onExceedsRevenueReferral?: () => void;
  className?: string;
}

export const MALAYSIAN_STATES = [
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
  { value: 'WP Labuan', label: 'Wilayah Persekutuan Labuan' },
  { value: 'WP Putrajaya', label: 'Wilayah Persekutuan Putrajaya' },
];

/**
 * DoctorShield Additional Branch List / Editor Organism
 * Enforces maximum 4 branches and RM 5,000,000 aggregate revenue ceiling.
 * Renders compact repeating branch rows with inline add/edit modal drawer.
 */
export const BranchListEditor: React.FC<BranchListEditorProps> = ({
  branches,
  onBranchesChange,
  primaryClinicName,
  isRevenueConfirmed,
  onRevenueConfirmChange,
  onExceedsRevenueReferral,
  className = '',
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [branchName, setBranchName] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Selangor');
  const [postcode, setPostcode] = useState('');
  const [phone, setPhone] = useState('');
  const [picName, setPicName] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const isMaxReached = branches.length >= 4;

  const resetForm = () => {
    setBranchName('');
    setAddressLine1('');
    setCity('');
    setState('Selangor');
    setPostcode('');
    setPhone('');
    setPicName('');
    setFormError(null);
    setEditingId(null);
    setIsAdding(false);
  };

  const handleStartEdit = (b: RepeatingBranchData) => {
    setEditingId(b.id);
    setBranchName(b.branchName);
    setAddressLine1(b.addressLine1);
    setCity(b.city);
    setState(b.state);
    setPostcode(b.postcode);
    setPhone(b.phone || '');
    setPicName(b.picName || '');
    setIsAdding(true);
  };

  const handleSave = () => {
    if (!branchName.trim() || !addressLine1.trim() || !city.trim() || !postcode.trim()) {
      setFormError('Please complete all required branch address details.');
      return;
    }

    if (editingId) {
      // Update existing
      const updated = branches.map((b) =>
        b.id === editingId
          ? { ...b, branchName, addressLine1, city, state, postcode, phone, picName }
          : b
      );
      onBranchesChange(updated);
    } else {
      // Create new
      const newBranch: RepeatingBranchData = {
        id: `branch_${Date.now()}`,
        branchName,
        addressLine1,
        city,
        state,
        postcode,
        phone,
        picName,
      };
      onBranchesChange([...branches, newBranch]);
    }
    resetForm();
  };

  const handleRemove = (id: string) => {
    onBranchesChange(branches.filter((b) => b.id !== id));
  };

  return (
    <div className={`ds-branch-manager ${className}`} style={{ marginBottom: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' }}>
        <div>
          <span
            style={{
              fontFamily: 'var(--ds-primitive-font-body)',
              fontSize: '15px',
              fontWeight: 600,
              color: 'var(--ds-color-text-primary)',
            }}
          >
            Registered Practice Branches
          </span>
          <span
            style={{
              fontSize: '12px',
              color: 'var(--ds-color-text-tertiary)',
              marginLeft: '8px',
            }}
          >
            ({branches.length} of 4 registered)
          </span>
        </div>

        {!isAdding && !isMaxReached && (
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={() => {
              resetForm();
              setIsAdding(true);
            }}
            style={{ height: '32px' }}
          >
            <Plus size={14} />
            <span>Add Branch</span>
          </Button>
        )}
      </div>

      {/* Repeating Branch List */}
      {branches.length > 0 ? (
        <div style={{ marginBottom: '16px' }}>
          {branches.map((b, idx) => (
            <RepeatingBranchRow
              key={b.id}
              index={idx}
              branch={b}
              onEdit={handleStartEdit}
              onRemove={handleRemove}
            />
          ))}
        </div>
      ) : (
        <div
          style={{
            padding: '16px',
            backgroundColor: 'var(--ds-color-surface-subtle)',
            borderRadius: 'var(--ds-comp-input-radius)',
            border: '1px dashed var(--ds-color-border-subtle)',
            textAlign: 'center',
            fontSize: '13px',
            color: 'var(--ds-color-text-secondary)',
            marginBottom: '16px',
          }}
        >
          No additional branches added. Primary clinic address will be covered.
        </div>
      )}

      {/* Add / Edit Form Drawer */}
      {isAdding && (
        <div
          style={{
            padding: '20px',
            backgroundColor: 'var(--ds-color-surface-subtle)',
            border: '1px solid var(--ds-color-border-subtle)',
            borderRadius: 'var(--ds-comp-panel-radius)',
            marginBottom: '20px',
          }}
        >
          <h4
            style={{
              fontFamily: 'var(--ds-primitive-font-heading)',
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--ds-primitive-color-navy-900)',
              margin: '0 0 16px 0',
            }}
          >
            {editingId ? 'Edit Branch Premises' : 'Add Practice Branch'}
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <LabeledTextField
                id="branch_name"
                label="Branch Name"
                required
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
                placeholder="e.g. Klinik Medika Utama (Subang Branch)"
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <LabeledTextField
                id="branch_address"
                label="Street Address"
                required
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                placeholder="Lot / Suite / Floor, Street Name"
              />
            </div>

            <LabeledTextField
              id="branch_postcode"
              label="Postcode"
              required
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              placeholder="47500"
            />

            <LabeledTextField
              id="branch_city"
              label="City"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Subang Jaya"
            />

            <LabeledSelect
              id="branch_state"
              label="State / Territory"
              options={MALAYSIAN_STATES}
              value={state}
              onChange={(e) => setState(e.target.value)}
            />

            <LabeledTextField
              id="branch_pic"
              label="Branch PIC Doctor Name"
              optional
              value={picName}
              onChange={(e) => setPicName(e.target.value)}
              placeholder="Dr. Resident Name"
            />
          </div>

          {formError && (
            <div style={{ color: 'var(--ds-primitive-color-rose-700)', fontSize: '12px', marginTop: '10px' }}>
              {formError}
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px', marginTop: '16px', justifyContent: 'flex-end' }}>
            <Button size="sm" variant="secondary" onClick={resetForm}>
              Cancel
            </Button>
            <Button size="sm" variant="primary" onClick={handleSave}>
              {editingId ? 'Save Changes' : 'Confirm Branch'}
            </Button>
          </div>
        </div>
      )}

      {/* Aggregate Revenue Ceiling Check (RM 5,000,000) */}
      <div
        style={{
          padding: '14px 18px',
          backgroundColor: isRevenueConfirmed ? 'var(--ds-primitive-color-emerald-50)' : 'var(--ds-color-surface-subtle)',
          border: `1px solid ${isRevenueConfirmed ? 'var(--ds-primitive-color-emerald-200)' : 'var(--ds-color-border-subtle)'}`,
          borderRadius: 'var(--ds-comp-input-radius)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        <div style={{ fontSize: '13px', color: 'var(--ds-color-text-secondary)', lineHeight: 1.45 }}>
          <strong>Statutory Revenue Ceiling:</strong> Total annual gross clinic revenue across all premises must not
          exceed <strong>RM 5,000,000</strong> for automated online binding.
        </div>

        <button
          type="button"
          onClick={() => onRevenueConfirmChange(!isRevenueConfirmed)}
          style={{
            minWidth: '120px',
            height: '36px',
            padding: '0 12px',
            borderRadius: '6px',
            border: isRevenueConfirmed ? '1px solid var(--ds-primitive-color-emerald-600)' : '1px solid var(--ds-color-border-default)',
            backgroundColor: isRevenueConfirmed ? 'var(--ds-primitive-color-emerald-600)' : '#FFFFFF',
            color: isRevenueConfirmed ? '#FFFFFF' : 'var(--ds-color-text-primary)',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          {isRevenueConfirmed ? 'Confirmed < RM 5M' : 'Confirm Revenue'}
        </button>
      </div>
    </div>
  );
};

/* ========================================================================
   13. UNDERWRITING DECLARATIONS ORGANISM
   ======================================================================== */
export interface DeclarationValues {
  cleanClaims: boolean | null;
  cleanClaimsDetail?: string;
  noCircumstances: boolean | null;
  circumstancesDetail?: string;
  noDisciplinary: boolean | null;
  disciplinaryDetail?: string;
  noCriminalSanctions: boolean | null;
  criminalDetail?: string;
}

export interface UnderwritingDeclarationsOrganismProps {
  declarations: DeclarationValues;
  onChange: (newValues: DeclarationValues) => void;
  className?: string;
}

/**
 * DoctorShield Underwriting Declarations Organism
 * 4 statutory questions with Agree/Disagree choice selectors and conditional
 * neutral slate explanation textareas upon adverse answer.
 */
export const UnderwritingDeclarationsOrganism: React.FC<UnderwritingDeclarationsOrganismProps> = ({
  declarations,
  onChange,
  className = '',
}) => {
  const hasAdverseAnswer =
    declarations.cleanClaims === false ||
    declarations.noCircumstances === false ||
    declarations.noDisciplinary === false ||
    declarations.noCriminalSanctions === false;

  return (
    <div className={`ds-underwriting-declarations ${className}`} style={{ marginBottom: '32px' }}>
      {/* Question 1: Prior Claims */}
      <div style={{ marginBottom: '20px' }}>
        <AgreeDisagreeSelector
          id="decl_q1"
          declarationNumber={1}
          statement="I confirm that in the last 5 years, no medical malpractice claim, demand, or writ has been made against me or my practice establishment."
          value={declarations.cleanClaims}
          onChange={(agreed) => onChange({ ...declarations, cleanClaims: agreed })}
          disagreeWarning="An adverse claims history requires underwriting review by Chubb Insurance Malaysia Berhad."
        />
        {declarations.cleanClaims === false && (
          <div style={{ marginTop: '10px', paddingLeft: '36px' }}>
            <Textarea
              id="decl_q1_detail"
              label="Particulars of Historical Claims"
              required
              value={declarations.cleanClaimsDetail || ''}
              onChange={(e) => onChange({ ...declarations, cleanClaimsDetail: e.target.value })}
              placeholder="Provide date of incident, plaintiff allegations, quantum claimed, and settlement/defense status..."
              helperText="Required by Chubb underwriting specialists to assess terms."
            />
          </div>
        )}
      </div>

      {/* Question 2: Awareness of Circumstances */}
      <div style={{ marginBottom: '20px' }}>
        <AgreeDisagreeSelector
          id="decl_q2"
          declarationNumber={2}
          statement="I confirm that after full inquiry, I am not aware of any circumstance, patient grievance, or critical incident that could reasonably give rise to a future medical negligence claim."
          value={declarations.noCircumstances}
          onChange={(agreed) => onChange({ ...declarations, noCircumstances: agreed })}
          disagreeWarning="Potential claims or adverse incident notifications must be recorded and reviewed prior to policy inception."
        />
        {declarations.noCircumstances === false && (
          <div style={{ marginTop: '10px', paddingLeft: '36px' }}>
            <Textarea
              id="decl_q2_detail"
              label="Incident & Circumstance Explanation"
              required
              value={declarations.circumstancesDetail || ''}
              onChange={(e) => onChange({ ...declarations, circumstancesDetail: e.target.value })}
              placeholder="Describe the incident, date of occurrence, patient identity reference, and clinical actions taken..."
            />
          </div>
        )}
      </div>

      {/* Question 3: Disciplinary Inquiries */}
      <div style={{ marginBottom: '20px' }}>
        <AgreeDisagreeSelector
          id="decl_q3"
          declarationNumber={3}
          statement="I confirm that I have never been subject to an inquiry, disciplinary proceeding, suspension, or reprimand by the Malaysian Medical Council (MMC) or Malaysian Dental Council (MDC)."
          value={declarations.noDisciplinary}
          onChange={(agreed) => onChange({ ...declarations, noDisciplinary: agreed })}
          disagreeWarning="Regulatory proceedings must be assessed by our underwriting team. A relationship manager callback will be scheduled."
        />
        {declarations.noDisciplinary === false && (
          <div style={{ marginTop: '10px', paddingLeft: '36px' }}>
            <Textarea
              id="decl_q3_detail"
              label="Regulatory Inquiry Details"
              required
              value={declarations.disciplinaryDetail || ''}
              onChange={(e) => onChange({ ...declarations, disciplinaryDetail: e.target.value })}
              placeholder="Specify the year of inquiry, nature of complaint, Council findings, and current practicing status..."
            />
          </div>
        )}
      </div>

      {/* Question 4: Criminal Charges or Sanctions */}
      <div style={{ marginBottom: '20px' }}>
        <AgreeDisagreeSelector
          id="decl_q4"
          declarationNumber={4}
          statement="I confirm that I have never been convicted of any criminal offense (other than minor traffic offenses) or subject to regulatory enforcement under the Financial Services Act 2013."
          value={declarations.noCriminalSanctions}
          onChange={(agreed) => onChange({ ...declarations, noCriminalSanctions: agreed })}
          disagreeWarning="Statutory and AML/CFT compliance mandates manual underwriter assessment."
        />
        {declarations.noCriminalSanctions === false && (
          <div style={{ marginTop: '10px', paddingLeft: '36px' }}>
            <Textarea
              id="decl_q4_detail"
              label="Offense & Regulatory Disclosure"
              required
              value={declarations.criminalDetail || ''}
              onChange={(e) => onChange({ ...declarations, criminalDetail: e.target.value })}
              placeholder="Provide offense details, court jurisdiction, outcome, and penalties..."
            />
          </div>
        )}
      </div>

      {/* Summary Referral Notice Banner */}
      {hasAdverseAnswer && (
        <div
          role="status"
          style={{
            padding: '16px 20px',
            backgroundColor: 'rgba(245, 158, 11, 0.08)',
            borderLeft: '4px solid var(--ds-primitive-color-amber-500)',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
          }}
        >
          <ShieldAlert size={20} color="var(--ds-primitive-color-amber-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '13px', color: 'var(--ds-primitive-color-amber-900)', lineHeight: 1.5 }}>
            <strong>Underwriting Referral Route Active:</strong> Based on the disclosures provided, your application
            will be routed to Chubb Insurance Malaysia Berhad for individual underwriter assessment. An instant quote
            cannot be bound online. A relationship manager will contact you within 1 business day.
          </div>
        </div>
      )}
    </div>
  );
};

