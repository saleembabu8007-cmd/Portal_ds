import React, { useState } from 'react';
import {
  Building2,
  Plus,
  Edit2,
  Trash2,
  AlertCircle,
  Phone,
  MapPin,
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

  const [formError, setFormError] = useState<string | null>(null);

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

  const handleOpenEditForm = (branch: BranchItem) => {
    setEditingBranchId(branch.id);
    setBranchName(branch.branchName || branch.name || '');
    setAddressLine1(branch.addressLine1 || branch.address || '');
    setAddressLine2(branch.addressLine2 || '');
    setPostcode(branch.postcode || '');
    setCity(branch.city || '');
    setState(branch.state || MALAYSIAN_STATES[0]);
    setPhone(branch.phone);
    setPicName(branch.picName || '');
    setFormError(null);
    setIsFormOpen(true);
  };

  const handleDeleteBranch = (id: string) => {
    const updated = branches.filter((b) => b.id !== id);
    onBranchesChange(updated);
    if (editingBranchId === id) resetForm();
  };

  const handleSaveBranch = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!branchName.trim() || !addressLine1.trim() || !postcode.trim() || !city.trim() || !phone.trim()) {
      setFormError('*All fields are required.');
      return;
    }

    if (!/^\d{5}$/.test(postcode.trim())) {
      setFormError('Please enter a valid 5-digit Malaysian postcode.');
      return;
    }

    if (editingBranchId) {
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
        borderTop: '1px solid var(--ds-color-border-subtle)',
        paddingTop: '24px',
        marginBottom: '28px',
      }}
    >
      {/* Header & Status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
        <div>
          <h3
            style={{
              fontFamily: 'var(--ds-primitive-font-heading)',
              fontSize: '17px',
              fontWeight: 500,
              color: 'var(--ds-color-navy-900)',
              margin: '0 0 4px 0',
            }}
          >
            Additional Clinic Branches & Practice Facilities
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--ds-color-text-secondary)', margin: 0 }}>
            Operating under parent practice: <strong>{primaryClinicName || 'Primary Registered Clinic'}</strong>
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              padding: '2px 8px',
              borderRadius: '999px',
              backgroundColor: branches.length >= 4 ? 'var(--ds-color-status-warning-bg, #FFFBEB)' : 'var(--ds-color-bg-canvas)',
              color: branches.length >= 4 ? 'var(--ds-color-status-warning, #92400E)' : 'var(--ds-color-text-muted)',
              border: '1px solid var(--ds-color-border-subtle)',
            }}
          >
            {branches.length} of 4 Branches Registered
          </span>
        </div>
      </div>

      {/* Statutory Branch Revenue Limitation Notice (LEG-BRANCH-001) */}
      <div
        style={{
          padding: '12px 14px',
          borderRadius: 'var(--ds-radius-md)',
          backgroundColor: 'var(--ds-color-bg-canvas)',
          border: '1px solid var(--ds-color-border-subtle)',
          marginBottom: '16px',
          fontSize: '12px',
          lineHeight: 1.5,
          color: 'var(--ds-color-text-secondary)',
          display: 'flex',
          gap: '10px',
          alignItems: 'flex-start',
        }}
      >
        <Info size={16} color="var(--ds-color-text-muted)" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong style={{ color: 'var(--ds-color-text-primary)' }}>Statutory Branch Revenue Limitation:</strong>{' '}
          Note: This offer is only available for branches with less than a total revenue of RM 5,000,000 per annum. Kindly contact our client services if in doubt.
        </div>
      </div>

      {/* Combined Revenue Confirmation Checkbox */}
      <div
        style={{
          padding: '12px 14px',
          borderRadius: 'var(--ds-radius-md)',
          backgroundColor: isRevenueConfirmed ? 'var(--ds-color-status-success-bg)' : 'var(--ds-color-bg-canvas)',
          border: `1px solid ${isRevenueConfirmed ? 'var(--ds-color-status-success-border)' : 'var(--ds-color-border-subtle)'}`,
          marginBottom: '18px',
        }}
      >
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            aria-label="Revenue eligibility declaration"
            checked={isRevenueConfirmed}
            onChange={(e) => onRevenueConfirmChange(e.target.checked)}
            style={{ width: '16px', height: '16px', accentColor: 'var(--ds-color-brand-primary)', marginTop: '2px', cursor: 'pointer' }}
          />
          <div style={{ fontSize: '13px', color: 'var(--ds-color-text-primary)', lineHeight: 1.4 }}>
            <strong>Revenue Eligibility Declaration:</strong> I confirm that the aggregate annual revenue across all branches and primary clinic practice does not exceed <strong>RM 5,000,000 per annum</strong>.
          </div>
        </label>

        {!isRevenueConfirmed && (
          <div style={{ marginTop: '6px', paddingLeft: '24px', fontSize: '12px', color: 'var(--ds-color-text-muted)' }}>
            If your combined revenue exceeds RM 5,000,000, please{' '}
            <button
              type="button"
              onClick={onExceedsRevenueReferral}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                color: 'var(--ds-color-brand-dark)',
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

      {/* List of Registered Branches */}
      {branches.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
          {branches.map((b, idx) => (
            <div
              key={b.id}
              style={{
                padding: '12px 14px',
                borderRadius: 'var(--ds-radius-md)',
                border: '1px solid var(--ds-color-border-subtle)',
                backgroundColor: 'var(--ds-color-bg-surface)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '10px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '1px 6px',
                      borderRadius: '4px',
                      backgroundColor: 'var(--ds-color-navy-900)',
                      color: '#FFFFFF',
                    }}
                  >
                    Branch {idx + 1} of {branches.length}
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ds-color-navy-900)' }}>
                    {b.branchName}
                  </span>
                </div>

                <div style={{ fontSize: '12px', color: 'var(--ds-color-text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={12} color="var(--ds-color-text-muted)" />
                  <span>
                    {b.addressLine1}
                    {b.addressLine2 ? `, ${b.addressLine2}` : ''}, {b.postcode} {b.city}, {b.state}
                  </span>
                </div>

                <div style={{ fontSize: '12px', color: 'var(--ds-color-text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                  <Phone size={12} color="var(--ds-color-text-muted)" />
                  <span>{b.phone}</span>
                  {b.picName && (
                    <span style={{ marginLeft: '10px', color: 'var(--ds-color-brand-dark)', fontWeight: 500 }}>
                      PIC: {b.picName}
                    </span>
                  )}
                </div>
              </div>

              {/* Edit / Remove Actions */}
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  type="button"
                  aria-label={`Edit ${b.branchName}`}
                  onClick={() => handleOpenEditForm(b)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 'var(--ds-radius-md)',
                    border: '1px solid var(--ds-color-border-default)',
                    backgroundColor: '#FFFFFF',
                    color: 'var(--ds-color-text-primary)',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Edit2 size={12} />
                  <span>Edit</span>
                </button>

                <button
                  type="button"
                  aria-label={`Remove ${b.branchName}`}
                  onClick={() => handleDeleteBranch(b.id)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 'var(--ds-radius-md)',
                    border: '1px solid var(--ds-color-border-default)',
                    backgroundColor: '#FFFFFF',
                    color: 'var(--ds-color-status-error)',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Trash2 size={12} />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Inline Form (Revealed when Add / Edit clicked) */}
      {isFormOpen ? (
        <div
          role="group"
          aria-label="Branch Details Form"
          style={{
            padding: '16px',
            borderRadius: 'var(--ds-radius-md)',
            border: '2px solid var(--ds-color-brand-primary)',
            backgroundColor: 'var(--ds-color-brand-light)',
            marginBottom: '16px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span style={{ fontWeight: 600, fontSize: '13px', color: 'var(--ds-color-navy-900)' }}>
              {editingBranchId ? 'Edit Branch Particulars' : `Add Clinic / Branch (${branches.length + 1} of 4)`}
            </span>
            <button
              type="button"
              onClick={resetForm}
              aria-label="Cancel branch edit"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ds-color-text-muted)' }}
            >
              <X size={16} />
            </button>
          </div>

          {formError && (
            <div
              role="alert"
              style={{
                padding: '8px 12px',
                borderRadius: 'var(--ds-radius-md)',
                backgroundColor: 'var(--ds-color-status-error-bg)',
                border: '1px solid var(--ds-color-status-error-border)',
                color: 'var(--ds-color-status-error)',
                fontSize: '12px',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <AlertCircle size={14} />
              <span>{formError}</span>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '12px' }}>
            {/* Branch Name (FLD-BRAN-001) */}
            <div>
              <label htmlFor="branch-name" style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--ds-color-text-primary)', marginBottom: '4px' }}>
                Clinic Name / Branch Name <span style={{ color: 'var(--ds-color-status-error)' }}>*</span>
              </label>
              <input
                id="branch-name"
                type="text"
                value={branchName}
                placeholder="e.g. Bangsar Branch"
                onChange={(e) => setBranchName(e.target.value)}
                style={{
                  width: '100%',
                  minHeight: '40px',
                  padding: '0 12px',
                  fontSize: '13px',
                  borderRadius: 'var(--ds-radius-md)',
                  border: '1px solid var(--ds-color-border-default)',
                  backgroundColor: '#FFFFFF',
                  color: 'var(--ds-color-text-primary)',
                  boxSizing: 'border-box',
                  outline: 'none',
                }}
              />
            </div>

            {/* Address Line 1 (FLD-BRAN-002) */}
            <div>
              <label htmlFor="branch-address" style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--ds-color-text-primary)', marginBottom: '4px' }}>
                Branch Address Line 1 <span style={{ color: 'var(--ds-color-status-error)' }}>*</span>
              </label>
              <input
                id="branch-address"
                type="text"
                value={addressLine1}
                placeholder="Building, street address"
                onChange={(e) => setAddressLine1(e.target.value)}
                style={{
                  width: '100%',
                  minHeight: '40px',
                  padding: '0 12px',
                  fontSize: '13px',
                  borderRadius: 'var(--ds-radius-md)',
                  border: '1px solid var(--ds-color-border-default)',
                  backgroundColor: '#FFFFFF',
                  color: 'var(--ds-color-text-primary)',
                  boxSizing: 'border-box',
                  outline: 'none',
                }}
              />
            </div>

            {/* Postcode (FLD-BRAN-003) */}
            <div>
              <label htmlFor="branch-postcode" style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--ds-color-text-primary)', marginBottom: '4px' }}>
                Postcode <span style={{ color: 'var(--ds-color-status-error)' }}>*</span>
              </label>
              <input
                id="branch-postcode"
                type="text"
                maxLength={5}
                value={postcode}
                placeholder="59100"
                onChange={(e) => setPostcode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                style={{
                  width: '100%',
                  minHeight: '40px',
                  padding: '0 12px',
                  fontSize: '13px',
                  borderRadius: 'var(--ds-radius-md)',
                  border: '1px solid var(--ds-color-border-default)',
                  backgroundColor: '#FFFFFF',
                  color: 'var(--ds-color-text-primary)',
                  boxSizing: 'border-box',
                  outline: 'none',
                }}
              />
            </div>

            {/* City (FLD-BRAN-004) */}
            <div>
              <label htmlFor="branch-city" style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--ds-color-text-primary)', marginBottom: '4px' }}>
                City <span style={{ color: 'var(--ds-color-status-error)' }}>*</span>
              </label>
              <input
                id="branch-city"
                type="text"
                value={city}
                placeholder="Kuala Lumpur"
                onChange={(e) => setCity(e.target.value)}
                style={{
                  width: '100%',
                  minHeight: '40px',
                  padding: '0 12px',
                  fontSize: '13px',
                  borderRadius: 'var(--ds-radius-md)',
                  border: '1px solid var(--ds-color-border-default)',
                  backgroundColor: '#FFFFFF',
                  color: 'var(--ds-color-text-primary)',
                  boxSizing: 'border-box',
                  outline: 'none',
                }}
              />
            </div>

            {/* State (FLD-BRAN-005) */}
            <div>
              <label htmlFor="branch-state" style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--ds-color-text-primary)', marginBottom: '4px' }}>
                State / Federal Territory <span style={{ color: 'var(--ds-color-status-error)' }}>*</span>
              </label>
              <select
                id="branch-state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                style={{
                  width: '100%',
                  minHeight: '40px',
                  padding: '0 12px',
                  fontSize: '13px',
                  borderRadius: 'var(--ds-radius-md)',
                  border: '1px solid var(--ds-color-border-default)',
                  backgroundColor: '#FFFFFF',
                  color: 'var(--ds-color-text-primary)',
                  boxSizing: 'border-box',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                {MALAYSIAN_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Phone (FLD-BRAN-006) */}
            <div>
              <label htmlFor="branch-phone" style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--ds-color-text-primary)', marginBottom: '4px' }}>
                Branch Contact Number <span style={{ color: 'var(--ds-color-status-error)' }}>*</span>
              </label>
              <input
                id="branch-phone"
                type="text"
                value={phone}
                placeholder="03-22841234"
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  width: '100%',
                  minHeight: '40px',
                  padding: '0 12px',
                  fontSize: '13px',
                  borderRadius: 'var(--ds-radius-md)',
                  border: '1px solid var(--ds-color-border-default)',
                  backgroundColor: '#FFFFFF',
                  color: 'var(--ds-color-text-primary)',
                  boxSizing: 'border-box',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <button
              type="button"
              onClick={resetForm}
              style={{
                minHeight: '36px',
                padding: '0 14px',
                borderRadius: 'var(--ds-radius-md)',
                border: '1px solid var(--ds-color-border-default)',
                backgroundColor: '#FFFFFF',
                color: 'var(--ds-color-text-secondary)',
                fontSize: '12px',
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
                minHeight: '36px',
                padding: '0 18px',
                borderRadius: 'var(--ds-radius-md)',
                backgroundColor: 'var(--ds-color-brand-primary)',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {editingBranchId ? 'Update Branch' : 'Add Clinic / Branch'}
            </button>
          </div>
        </div>
      ) : (
        /* Action Button when form is closed */
        <div>
          {branches.length >= 4 ? (
            <button
              type="button"
              disabled
              style={{
                minHeight: '38px',
                padding: '0 16px',
                borderRadius: 'var(--ds-radius-md)',
                backgroundColor: 'var(--ds-color-bg-subtle)',
                color: 'var(--ds-color-text-muted)',
                border: '1px solid var(--ds-color-border-subtle)',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'not-allowed',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>You can add up to 4 branches</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleOpenAddForm}
              style={{
                minHeight: '38px',
                padding: '0 16px',
                borderRadius: 'var(--ds-radius-md)',
                border: '1px solid var(--ds-color-brand-primary)',
                backgroundColor: 'transparent',
                color: 'var(--ds-color-brand-dark)',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Plus size={14} />
              <span>Add Clinic / Branch</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
