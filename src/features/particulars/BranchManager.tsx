import React, { useState } from 'react';
import {
  Building2,
  Plus,
  Edit2,
  Trash2,
  AlertCircle,
  CheckCircle2,
  ShieldAlert,
  Phone,
  MapPin,
  Check,
  X,
  Info,
} from 'lucide-react';
import { BranchItem } from '../../core/state/types';

export const MALAYSIAN_STATES = [
  'Johor',
  'Kedah',
  'Kelantan',
  'Melaka',
  'Negeri Sembilan',
  'Pahang',
  'Penang',
  'Perak',
  'Perlis',
  'Sabah',
  'Sarawak',
  'Selangor',
  'Terengganu',
  'Wilayah Persekutuan Kuala Lumpur',
  'Wilayah Persekutuan Labuan',
  'Wilayah Persekutuan Putrajaya',
];

export interface BranchManagerProps {
  branches: BranchItem[];
  onBranchesChange: (newBranches: BranchItem[]) => void;
  primaryClinicName?: string;
  isRevenueConfirmed: boolean;
  onRevenueConfirmChange: (confirmed: boolean) => void;
  onExceedsRevenueReferral?: () => void;
}

export const BranchManager: React.FC<BranchManagerProps> = ({
  branches,
  onBranchesChange,
  primaryClinicName,
  isRevenueConfirmed,
  onRevenueConfirmChange,
  onExceedsRevenueReferral,
}) => {
  // Form state for Add / Edit
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBranchId, setEditingBranchId] = useState<string | null>(null);

  // Field values
  const [branchName, setBranchName] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [postcode, setPostcode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState(MALAYSIAN_STATES[0]);
  const [phone, setPhone] = useState('');
  const [picName, setPicName] = useState('');

  // Form error
  const [formError, setFormError] = useState<string | null>(null);

  // Reset form
  const resetForm = () => {
    setBranchName('');
    setAddressLine1('');
    setAddressLine2('');
    setPostcode('');
    setCity('');
    setState(MALAYSIAN_STATES[0]);
    setPhone('');
    setPicName('');
    setFormError(null);
    setEditingBranchId(null);
    setIsFormOpen(false);
  };

  // Open form for adding new branch
  const handleOpenAddForm = () => {
    if (branches.length >= 4) return;
    setEditingBranchId(null);
    setBranchName('');
    setAddressLine1('');
    setAddressLine2('');
    setPostcode('');
    setCity('');
    setState(MALAYSIAN_STATES[0]);
    setPhone('');
    setPicName('');
    setFormError(null);
    setIsFormOpen(true);
  };

  // Open form for editing existing branch
  const handleOpenEditForm = (branch: BranchItem) => {
    setEditingBranchId(branch.id);
    setBranchName(branch.branchName);
    setAddressLine1(branch.addressLine1);
    setAddressLine2(branch.addressLine2 || '');
    setPostcode(branch.postcode);
    setCity(branch.city);
    setState(branch.state || MALAYSIAN_STATES[0]);
    setPhone(branch.phone);
    setPicName(branch.picName || '');
    setFormError(null);
    setIsFormOpen(true);
  };

  // Delete branch
  const handleDeleteBranch = (id: string) => {
    const updated = branches.filter((b) => b.id !== id);
    onBranchesChange(updated);
    if (editingBranchId === id) resetForm();
  };

  // Save branch
  const handleSaveBranch = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validation (All core fields required)
    if (!branchName.trim() || !addressLine1.trim() || !postcode.trim() || !city.trim() || !phone.trim()) {
      setFormError('*All fields are required.');
      return;
    }

    if (!/^\d{5}$/.test(postcode.trim())) {
      setFormError('Please enter a valid 5-digit Malaysian postcode.');
      return;
    }

    if (editingBranchId) {
      // Update existing branch
      const updated = branches.map((b) => {
        if (b.id === editingBranchId) {
          return {
            ...b,
            branchName: branchName.trim(),
            addressLine1: addressLine1.trim(),
            addressLine2: addressLine2.trim() || undefined,
            postcode: postcode.trim(),
            city: city.trim(),
            state,
            phone: phone.trim(),
            picName: picName.trim() || undefined,
          };
        }
        return b;
      });
      onBranchesChange(updated);
    } else {
      // Add new branch (enforce 4 max)
      if (branches.length >= 4) {
        setFormError('You can add up to 4 branches');
        return;
      }
      const newBranch: BranchItem = {
        id: `branch-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        branchName: branchName.trim(),
        addressLine1: addressLine1.trim(),
        addressLine2: addressLine2.trim() || undefined,
        postcode: postcode.trim(),
        city: city.trim(),
        state,
        phone: phone.trim(),
        picName: picName.trim() || undefined,
      };
      onBranchesChange([...branches, newBranch]);
    }

    resetForm();
  };

  return (
    <div
      className="ds-branch-manager"
      style={{
        border: '1px solid var(--ds-color-border-subtle)',
        borderRadius: 'var(--ds-primitive-radius-xl)',
        backgroundColor: '#FFFFFF',
        padding: '24px',
        marginBottom: '28px',
        boxShadow: 'var(--ds-primitive-shadow-xs)',
      }}
    >
      {/* Branch Section Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              backgroundColor: 'var(--ds-primitive-color-teal-50)',
              color: 'var(--ds-primitive-color-teal-700)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Building2 size={20} />
          </div>
          <div>
            <h3
              style={{
                fontFamily: 'var(--ds-primitive-font-heading)',
                fontSize: '1.2rem',
                fontWeight: 500,
                color: 'var(--ds-color-text-heading)',
                margin: 0,
              }}
            >
              Additional Clinic Branches & Practice Facilities
            </h3>
            <span style={{ fontSize: '12px', color: 'var(--ds-color-text-secondary)' }}>
              Operating under parent practice: <strong>{primaryClinicName || 'Primary Registered Clinic'}</strong>
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 600,
              padding: '3px 10px',
              borderRadius: '999px',
              backgroundColor: branches.length >= 4 ? 'var(--ds-primitive-color-amber-100)' : 'var(--ds-primitive-color-teal-50)',
              color: branches.length >= 4 ? 'var(--ds-primitive-color-amber-900)' : 'var(--ds-primitive-color-teal-800)',
              border: `1px solid ${branches.length >= 4 ? 'var(--ds-primitive-color-amber-300)' : 'var(--ds-primitive-color-teal-300)'}`,
            }}
          >
            {branches.length} of 4 Branches Registered
          </span>
        </div>
      </div>

      {/* Statutory Combined Revenue Eligibility Notice (LEG-BRANCH-001) */}
      <div
        style={{
          padding: '14px 18px',
          borderRadius: 'var(--ds-primitive-radius-md)',
          backgroundColor: 'var(--ds-primitive-color-slate-50)',
          border: '1px solid var(--ds-color-border-subtle)',
          marginBottom: '20px',
          fontSize: '13px',
          color: 'var(--ds-color-text-secondary)',
          lineHeight: 1.5,
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start',
        }}
      >
        <Info size={18} color="var(--ds-primitive-color-navy-700)" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong style={{ color: 'var(--ds-primitive-color-navy-900)', display: 'block', marginBottom: '2px' }}>
            Statutory Branch Revenue Limitation:
          </strong>
          Note: This offer is only available for branches with less than a total revenue of RM 5,000,000 per annum. Kindly contact our client services if in doubt.
        </div>
      </div>

      {/* Combined Revenue Confirmation Toggle */}
      <div
        style={{
          padding: '14px 18px',
          borderRadius: 'var(--ds-primitive-radius-md)',
          backgroundColor: isRevenueConfirmed ? 'var(--ds-primitive-color-emerald-50)' : 'var(--ds-primitive-color-amber-50)',
          border: `1px solid ${isRevenueConfirmed ? 'var(--ds-primitive-color-emerald-500)' : 'var(--ds-primitive-color-amber-500)'}`,
          marginBottom: '22px',
        }}
      >
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={isRevenueConfirmed}
            onChange={(e) => onRevenueConfirmChange(e.target.checked)}
            style={{ width: '18px', height: '18px', accentColor: 'var(--ds-color-action-primary)', marginTop: '2px', cursor: 'pointer' }}
          />
          <div style={{ fontSize: '13px', color: 'var(--ds-primitive-color-navy-900)', lineHeight: 1.5 }}>
            <strong>Revenue Eligibility Declaration:</strong> I confirm that the aggregate annual revenue across all branches and primary clinic practice does not exceed <strong>RM 5,000,000 per annum</strong>.
          </div>
        </label>

        {!isRevenueConfirmed && (
          <div style={{ marginTop: '10px', paddingLeft: '28px', fontSize: '12px', color: 'var(--ds-primitive-color-amber-900)' }}>
            ⚠️ If your combined revenue exceeds RM 5,000,000, please{' '}
            <button
              type="button"
              onClick={onExceedsRevenueReferral}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                color: 'var(--ds-primitive-color-teal-700)',
                fontWeight: 600,
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              contact our corporate underwriting team
            </button>{' '}
            for tailored healthcare network indemnity terms.
          </div>
        )}
      </div>

      {/* List of Existing Branches (Numbered Cards) */}
      {branches.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
          {branches.map((b, idx) => (
            <div
              key={b.id}
              style={{
                padding: '16px 20px',
                borderRadius: 'var(--ds-primitive-radius-lg)',
                border: '1px solid var(--ds-color-border-default)',
                backgroundColor: '#FFFFFF',
                boxShadow: 'var(--ds-primitive-shadow-xs)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      backgroundColor: 'var(--ds-primitive-color-navy-900)',
                      color: '#FFFFFF',
                      letterSpacing: '0.02em',
                    }}
                  >
                    Branch {idx + 1} of {branches.length}
                  </span>
                  <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--ds-color-text-heading)' }}>
                    {b.branchName}
                  </span>
                </div>

                <div style={{ fontSize: '13px', color: 'var(--ds-color-text-secondary)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                  <MapPin size={14} color="var(--ds-color-text-muted)" />
                  <span>
                    {b.addressLine1}
                    {b.addressLine2 ? `, ${b.addressLine2}` : ''}, {b.postcode} {b.city}, {b.state}
                  </span>
                </div>

                <div style={{ fontSize: '13px', color: 'var(--ds-color-text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Phone size={14} color="var(--ds-color-text-muted)" />
                  <span>{b.phone}</span>
                  {b.picName && (
                    <span style={{ marginLeft: '12px', color: 'var(--ds-primitive-color-teal-700)', fontWeight: 500 }}>
                      PIC: {b.picName}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions for this branch */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  aria-label={`Edit ${b.branchName}`}
                  onClick={() => handleOpenEditForm(b)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 'var(--ds-primitive-radius-md)',
                    border: '1px solid var(--ds-color-border-default)',
                    backgroundColor: '#FFFFFF',
                    color: 'var(--ds-primitive-color-navy-900)',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Edit2 size={13} />
                  <span>Edit</span>
                </button>

                <button
                  type="button"
                  aria-label={`Remove ${b.branchName}`}
                  onClick={() => handleDeleteBranch(b.id)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 'var(--ds-primitive-radius-md)',
                    border: '1px solid var(--ds-primitive-color-rose-300)',
                    backgroundColor: 'var(--ds-primitive-color-rose-50)',
                    color: 'var(--ds-primitive-color-rose-700)',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Trash2 size={13} />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            padding: '24px',
            borderRadius: 'var(--ds-primitive-radius-md)',
            backgroundColor: 'var(--ds-primitive-color-slate-50)',
            border: '1px dashed var(--ds-color-border-default)',
            textAlign: 'center',
            marginBottom: '20px',
          }}
        >
          <Building2 size={28} color="var(--ds-color-text-muted)" style={{ margin: '0 auto 8px auto' }} />
          <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ds-color-text-heading)' }}>
            No Additional Clinic Branches Added
          </div>
          <div style={{ fontSize: '12px', color: 'var(--ds-color-text-secondary)', marginTop: '2px' }}>
            If your practice operates branch clinics under the same entity, you can register up to 4 branches below.
          </div>
        </div>
      )}

      {/* Add / Edit Branch Expandable Form */}
      {isFormOpen ? (
        <div
          role="group"
          aria-label="Branch Details Form"
          style={{
            padding: '20px',
            borderRadius: 'var(--ds-primitive-radius-lg)',
            border: '2px solid var(--ds-color-action-primary)',
            backgroundColor: 'var(--ds-primitive-color-slate-50)',
            marginBottom: '16px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontWeight: 600, fontSize: '14px', color: 'var(--ds-color-text-heading)' }}>
              {editingBranchId ? 'Edit Branch Particulars' : `Add Clinic / Branch (${branches.length + 1} of 4)`}
            </span>
            <button
              type="button"
              onClick={resetForm}
              aria-label="Cancel branch edit"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ds-color-text-muted)' }}
            >
              <X size={18} />
            </button>
          </div>

          {formError && (
            <div
              role="alert"
              style={{
                padding: '10px 14px',
                borderRadius: 'var(--ds-primitive-radius-md)',
                backgroundColor: 'var(--ds-primitive-color-rose-50)',
                border: '1px solid var(--ds-primitive-color-rose-500)',
                color: 'var(--ds-primitive-color-rose-700)',
                fontSize: '13px',
                marginBottom: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <AlertCircle size={16} />
              <span>{formError}</span>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '14px' }}>
            {/* Branch Name (FLD-BRAN-001) */}
            <div>
              <label htmlFor="branch-name" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--ds-color-text-heading)', marginBottom: '4px' }}>
                Clinic Name / Branch Name <span style={{ color: 'var(--ds-primitive-color-rose-700)' }}>*</span>
              </label>
              <input
                id="branch-name"
                type="text"
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
                placeholder="e.g Klinik Damansara"
                style={{
                  width: '100%',
                  height: '42px',
                  padding: '0 12px',
                  borderRadius: 'var(--ds-primitive-radius-md)',
                  border: '1px solid var(--ds-color-border-default)',
                  fontSize: '14px',
                  backgroundColor: '#FFFFFF',
                }}
              />
            </div>

            {/* Branch Phone Number (FLD-BRAN-003) */}
            <div>
              <label htmlFor="branch-phone" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--ds-color-text-heading)', marginBottom: '4px' }}>
                Phone Number <span style={{ color: 'var(--ds-primitive-color-rose-700)' }}>*</span>
              </label>
              <input
                id="branch-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="12 34 356789"
                style={{
                  width: '100%',
                  height: '42px',
                  padding: '0 12px',
                  borderRadius: 'var(--ds-primitive-radius-md)',
                  border: '1px solid var(--ds-color-border-default)',
                  fontSize: '14px',
                  backgroundColor: '#FFFFFF',
                }}
              />
            </div>
          </div>

          {/* Branch Address Line 1 (FLD-BRAN-002) */}
          <div style={{ marginBottom: '14px' }}>
            <label htmlFor="branch-address" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--ds-color-text-heading)', marginBottom: '4px' }}>
              Clinic Address <span style={{ color: 'var(--ds-primitive-color-rose-700)' }}>*</span>
            </label>
            <input
              id="branch-address"
              type="text"
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
              placeholder="ex. 2, angaksaraya jin amang, Kuala Lumpur"
              style={{
                width: '100%',
                height: '42px',
                padding: '0 12px',
                borderRadius: 'var(--ds-primitive-radius-md)',
                border: '1px solid var(--ds-color-border-default)',
                fontSize: '14px',
                backgroundColor: '#FFFFFF',
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '14px', marginBottom: '14px' }}>
            {/* Postcode */}
            <div>
              <label htmlFor="branch-postcode" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--ds-color-text-heading)', marginBottom: '4px' }}>
                Postcode <span style={{ color: 'var(--ds-primitive-color-rose-700)' }}>*</span>
              </label>
              <input
                id="branch-postcode"
                type="text"
                maxLength={5}
                value={postcode}
                onChange={(e) => setPostcode(e.target.value.replace(/\D/g, ''))}
                placeholder="50450"
                style={{
                  width: '100%',
                  height: '42px',
                  padding: '0 12px',
                  borderRadius: 'var(--ds-primitive-radius-md)',
                  border: '1px solid var(--ds-color-border-default)',
                  fontSize: '14px',
                  backgroundColor: '#FFFFFF',
                }}
              />
            </div>

            {/* City */}
            <div>
              <label htmlFor="branch-city" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--ds-color-text-heading)', marginBottom: '4px' }}>
                City <span style={{ color: 'var(--ds-primitive-color-rose-700)' }}>*</span>
              </label>
              <input
                id="branch-city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Kuala Lumpur"
                style={{
                  width: '100%',
                  height: '42px',
                  padding: '0 12px',
                  borderRadius: 'var(--ds-primitive-radius-md)',
                  border: '1px solid var(--ds-color-border-default)',
                  fontSize: '14px',
                  backgroundColor: '#FFFFFF',
                }}
              />
            </div>

            {/* State */}
            <div>
              <label htmlFor="branch-state" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--ds-color-text-heading)', marginBottom: '4px' }}>
                State <span style={{ color: 'var(--ds-primitive-color-rose-700)' }}>*</span>
              </label>
              <select
                id="branch-state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                style={{
                  width: '100%',
                  height: '42px',
                  padding: '0 12px',
                  borderRadius: 'var(--ds-primitive-radius-md)',
                  border: '1px solid var(--ds-color-border-default)',
                  fontSize: '13px',
                  backgroundColor: '#FFFFFF',
                }}
              >
                {MALAYSIAN_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Form Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
            <button
              type="button"
              onClick={resetForm}
              style={{
                height: '40px',
                padding: '0 18px',
                borderRadius: 'var(--ds-primitive-radius-md)',
                border: '1px solid var(--ds-color-border-default)',
                backgroundColor: '#FFFFFF',
                color: 'var(--ds-color-text-primary)',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSaveBranch}
              style={{
                height: '40px',
                padding: '0 24px',
                borderRadius: 'var(--ds-primitive-radius-md)',
                border: 'none',
                backgroundColor: 'var(--ds-color-action-primary)',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Check size={16} />
              <span>{editingBranchId ? 'Update Branch' : 'Add Clinic / Branch'}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Add Branch Button / Maximum Enforced Notice (RULE-BRN-01) */
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          {branches.length < 4 ? (
            <button
              type="button"
              onClick={handleOpenAddForm}
              style={{
                minHeight: '42px',
                padding: '0 20px',
                borderRadius: 'var(--ds-primitive-radius-md)',
                backgroundColor: '#FFFFFF',
                border: '1.5px dashed var(--ds-color-action-primary)',
                color: 'var(--ds-color-action-primary)',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 150ms ease',
              }}
            >
              <Plus size={16} />
              <span>Add Clinic / Branch</span>
            </button>
          ) : (
            <button
              type="button"
              disabled
              aria-disabled="true"
              style={{
                minHeight: '42px',
                padding: '0 20px',
                borderRadius: 'var(--ds-primitive-radius-md)',
                backgroundColor: 'var(--ds-primitive-color-amber-50)',
                border: '1px solid var(--ds-primitive-color-amber-400)',
                color: 'var(--ds-primitive-color-amber-900)',
                fontSize: '13px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'not-allowed',
                opacity: 0.8,
              }}
            >
              <AlertCircle size={15} />
              <span>You can add up to 4 branches</span>
            </button>
          )}

          <span style={{ fontSize: '12px', color: 'var(--ds-color-text-muted)' }}>
            Each registered branch is co-insured under your active Clinic Entity facility policy.
          </span>
        </div>
      )}
    </div>
  );
};

