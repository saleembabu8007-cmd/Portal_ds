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
  Check,
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
  'Wilayah Persekutuan Putrajaya',
  'Wilayah Persekutuan Labuan',
];

export interface BranchManagerProps {
  branches: BranchItem[];
  onBranchesChange: (newBranches: BranchItem[]) => void;
  primaryClinicName?: string;
  isRevenueConfirmed: boolean;
  onRevenueConfirmChange: (confirmed: boolean) => void;
  onExceedsRevenueReferral?: () => void;
}

/**
 * DoctorShield Additional Clinic Branches & Facilities Manager
 * Standard: Direction B (46px inputs, 6px radius, max 4 branches limit, RM 5M revenue ceiling)
 */
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

    if (
      !branchName.trim() ||
      !addressLine1.trim() ||
      !postcode.trim() ||
      !city.trim() ||
      !phone.trim()
    ) {
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

  const inputStyle: React.CSSProperties = {
    width: '100%',
    height: 'var(--ds-comp-input-height, 46px)',
    padding: '0 14px',
    borderRadius: 'var(--ds-comp-input-radius, 6px)',
    border: '1px solid var(--ds-comp-input-border, #CBD5E1)',
    backgroundColor: '#FFFFFF',
    fontSize: 'var(--ds-comp-input-font-size, 16px)',
    fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
    color: 'var(--ds-color-navy-900, #0F172A)',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 500,
    fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
    color: 'var(--ds-color-navy-900, #0F172A)',
    marginBottom: '6px',
  };

  return (
    <div
      className="ds-branch-manager"
      style={{
        borderTop: '1px solid var(--ds-color-border-subtle, #E2E8F0)',
        paddingTop: '24px',
        marginBottom: '28px',
      }}
    >
      {/* Header & Status */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '16px',
        }}
      >
        <div>
          <h3
            style={{
              fontFamily: 'var(--ds-primitive-font-heading, "Kanit", sans-serif)',
              fontSize: '1.0625rem',
              fontWeight: 500,
              color: 'var(--ds-color-navy-900, #132766)',
              margin: '0 0 4px 0',
              lineHeight: 1.35,
            }}
          >
            Additional Clinic Branches & Practice Facilities
          </h3>
          <p
            style={{
              fontSize: '13px',
              fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
              color: 'var(--ds-color-text-secondary, #475569)',
              margin: 0,
            }}
          >
            Operating under parent practice:{' '}
            <strong style={{ color: 'var(--ds-color-navy-900, #0F172A)' }}>
              {primaryClinicName || 'Primary Registered Clinic'}
            </strong>
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 500,
              padding: '4px 10px',
              borderRadius: '999px',
              backgroundColor:
                branches.length >= 4
                  ? 'var(--ds-color-status-warning-bg, #FFFBEB)'
                  : 'var(--ds-primitive-color-teal-50, #F0FDFA)',
              color:
                branches.length >= 4
                  ? 'var(--ds-color-status-warning, #B45309)'
                  : 'var(--ds-color-brand-primary, #08A5B5)',
              border: `1px solid ${
                branches.length >= 4
                  ? 'var(--ds-color-status-warning-border, #FDE68A)'
                  : 'var(--ds-color-brand-light, #CCFBF1)'
              }`,
            }}
          >
            {branches.length} of 4 Branches Registered
          </span>
        </div>
      </div>

      {/* Statutory Branch Revenue Limitation Notice (LEG-BRANCH-001) */}
      <div
        style={{
          padding: '12px 16px',
          borderRadius: 'var(--ds-radius-md, 6px)',
          backgroundColor: '#F8FAFC',
          border: '1px solid var(--ds-color-border-subtle, #E2E8F0)',
          marginBottom: '16px',
          fontSize: '12.5px',
          lineHeight: 1.5,
          color: 'var(--ds-color-text-secondary, #475569)',
          display: 'flex',
          gap: '10px',
          alignItems: 'flex-start',
        }}
      >
        <Info
          size={16}
          color="var(--ds-color-brand-primary, #08A5B5)"
          style={{ flexShrink: 0, marginTop: '2px' }}
        />
        <div>
          <strong style={{ color: 'var(--ds-color-navy-900, #0F172A)' }}>
            Statutory Branch Revenue Limitation:
          </strong>{' '}
          Note: This offer is only available for branches with less than a total revenue of RM
          5,000,000 per annum. Kindly contact our client services if in doubt.
        </div>
      </div>

      {/* Combined Revenue Confirmation Checkbox */}
      <div
        style={{
          padding: '14px 16px',
          borderRadius: 'var(--ds-radius-md, 6px)',
          backgroundColor: isRevenueConfirmed ? '#F0FDF4' : '#FFFFFF',
          border: `1px solid ${isRevenueConfirmed ? '#86EFAC' : 'var(--ds-color-border-default, #CBD5E1)'}`,
          marginBottom: '20px',
          transition: 'all 0.15s ease',
        }}
      >
        <label
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            cursor: 'pointer',
            minHeight: '24px',
          }}
        >
          <input
            type="checkbox"
            aria-label="Revenue eligibility declaration"
            checked={isRevenueConfirmed}
            onChange={(e) => onRevenueConfirmChange(e.target.checked)}
            style={{
              width: '18px',
              height: '18px',
              accentColor: 'var(--ds-color-brand-primary, #08A5B5)',
              marginTop: '2px',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          />
          <div
            style={{
              fontSize: '13px',
              color: 'var(--ds-color-navy-900, #0F172A)',
              lineHeight: 1.5,
              fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
            }}
          >
            <strong>Revenue Eligibility Declaration:</strong> I confirm that the aggregate annual
            revenue across all branches and primary clinic practice does not exceed{' '}
            <strong>RM 5,000,000 per annum</strong>.
          </div>
        </label>

        {!isRevenueConfirmed && (
          <div
            style={{
              marginTop: '8px',
              paddingLeft: '28px',
              fontSize: '12px',
              color: 'var(--ds-color-text-secondary, #64748B)',
            }}
          >
            If your combined revenue exceeds RM 5,000,000, please{' '}
            <button
              type="button"
              onClick={onExceedsRevenueReferral}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                color: 'var(--ds-color-brand-primary, #08A5B5)',
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
          {branches.map((b, idx) => (
            <div
              key={b.id}
              style={{
                padding: '14px 18px',
                borderRadius: 'var(--ds-radius-md, 6px)',
                border: '1px solid var(--ds-color-border-subtle, #E2E8F0)',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
                boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      backgroundColor: 'var(--ds-color-navy-900, #132766)',
                      color: '#FFFFFF',
                      fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
                    }}
                  >
                    Branch {idx + 1} of {branches.length}
                  </span>
                  <span
                    style={{
                      fontSize: '14.5px',
                      fontWeight: 600,
                      color: 'var(--ds-color-navy-900, #0F172A)',
                      fontFamily: 'var(--ds-primitive-font-heading, "Kanit", sans-serif)',
                    }}
                  >
                    {b.branchName}
                  </span>
                </div>

                <div
                  style={{
                    fontSize: '12.5px',
                    color: 'var(--ds-color-text-secondary, #475569)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                >
                  <MapPin size={13} color="var(--ds-color-text-muted, #94A3B8)" style={{ flexShrink: 0 }} />
                  <span>
                    {b.addressLine1}
                    {b.addressLine2 ? `, ${b.addressLine2}` : ''}, {b.postcode} {b.city}, {b.state}
                  </span>
                </div>

                <div
                  style={{
                    fontSize: '12px',
                    color: 'var(--ds-color-text-secondary, #64748B)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    marginTop: '3px',
                  }}
                >
                  <Phone size={13} color="var(--ds-color-text-muted, #94A3B8)" style={{ flexShrink: 0 }} />
                  <span>{b.phone}</span>
                  {b.picName && (
                    <span style={{ marginLeft: '12px', color: 'var(--ds-color-navy-900, #0F172A)', fontWeight: 500 }}>
                      PIC: {b.picName}
                    </span>
                  )}
                </div>
              </div>

              {/* Edit / Remove Actions */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  aria-label={`Edit ${b.branchName}`}
                  onClick={() => handleOpenEditForm(b)}
                  style={{
                    minHeight: '36px',
                    padding: '0 12px',
                    borderRadius: 'var(--ds-comp-btn-radius, 6px)',
                    border: '1px solid var(--ds-color-border-default, #CBD5E1)',
                    backgroundColor: '#FFFFFF',
                    color: 'var(--ds-color-navy-900, #0F172A)',
                    fontSize: '12.5px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    transition: 'all 0.15s ease',
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
                    minHeight: '36px',
                    padding: '0 12px',
                    borderRadius: 'var(--ds-comp-btn-radius, 6px)',
                    border: '1px solid #FECACA',
                    backgroundColor: '#FFFFFF',
                    color: '#B91C1C',
                    fontSize: '12.5px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <Trash2 size={13} />
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
            padding: '20px',
            borderRadius: 'var(--ds-radius-md, 6px)',
            border: '1px solid var(--ds-color-brand-primary, #08A5B5)',
            backgroundColor: 'var(--ds-primitive-color-teal-50, #F0FDFA)',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
            }}
          >
            <span
              style={{
                fontWeight: 600,
                fontSize: '14px',
                color: 'var(--ds-color-navy-900, #132766)',
                fontFamily: 'var(--ds-primitive-font-heading, "Kanit", sans-serif)',
              }}
            >
              {editingBranchId
                ? 'Edit Branch Particulars'
                : `Add Clinic / Branch (${branches.length + 1} of 4)`}
            </span>
            <button
              type="button"
              onClick={resetForm}
              aria-label="Cancel branch edit"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--ds-color-text-muted, #64748B)',
                padding: '4px',
              }}
            >
              <X size={18} />
            </button>
          </div>

          {formError && (
            <div
              role="alert"
              style={{
                padding: '10px 14px',
                borderRadius: 'var(--ds-radius-md, 6px)',
                backgroundColor: 'var(--ds-color-status-error-bg, #FEF2F2)',
                border: '1px solid var(--ds-color-status-error-border, #FECACA)',
                color: 'var(--ds-color-status-error, #B91C1C)',
                fontSize: '12.5px',
                marginBottom: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <AlertCircle size={15} />
              <span>{formError}</span>
            </div>
          )}

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '14px',
              marginBottom: '16px',
            }}
          >
            {/* Branch Name (FLD-BRAN-001) */}
            <div>
              <label htmlFor="branch-name" style={labelStyle}>
                Clinic Name / Branch Name <span style={{ color: '#B91C1C' }}>*</span>
              </label>
              <input
                id="branch-name"
                type="text"
                value={branchName}
                placeholder="e.g. Bangsar Branch"
                onChange={(e) => setBranchName(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Address Line 1 (FLD-BRAN-002) */}
            <div>
              <label htmlFor="branch-address" style={labelStyle}>
                Branch Address Line 1 <span style={{ color: '#B91C1C' }}>*</span>
              </label>
              <input
                id="branch-address"
                type="text"
                value={addressLine1}
                placeholder="Building, street address"
                onChange={(e) => setAddressLine1(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Postcode (FLD-BRAN-003) */}
            <div>
              <label htmlFor="branch-postcode" style={labelStyle}>
                Postcode <span style={{ color: '#B91C1C' }}>*</span>
              </label>
              <input
                id="branch-postcode"
                type="text"
                inputMode="numeric"
                maxLength={5}
                value={postcode}
                placeholder="59100"
                onChange={(e) => setPostcode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                style={inputStyle}
              />
            </div>

            {/* City (FLD-BRAN-004) */}
            <div>
              <label htmlFor="branch-city" style={labelStyle}>
                City <span style={{ color: '#B91C1C' }}>*</span>
              </label>
              <input
                id="branch-city"
                type="text"
                value={city}
                placeholder="Kuala Lumpur"
                onChange={(e) => setCity(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* State (FLD-BRAN-005) */}
            <div>
              <label htmlFor="branch-state" style={labelStyle}>
                State / Federal Territory <span style={{ color: '#B91C1C' }}>*</span>
              </label>
              <select
                id="branch-state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                style={{
                  ...inputStyle,
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
              <label htmlFor="branch-phone" style={labelStyle}>
                Branch Contact Number <span style={{ color: '#B91C1C' }}>*</span>
              </label>
              <input
                id="branch-phone"
                type="tel"
                inputMode="tel"
                value={phone}
                placeholder="03-22841234"
                onChange={(e) => setPhone(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button
              type="button"
              onClick={resetForm}
              style={{
                minHeight: '40px',
                padding: '0 16px',
                borderRadius: 'var(--ds-comp-btn-radius, 6px)',
                border: '1px solid var(--ds-color-border-default, #CBD5E1)',
                backgroundColor: '#FFFFFF',
                color: 'var(--ds-color-text-secondary, #475569)',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSaveBranch}
              style={{
                minHeight: '40px',
                padding: '0 20px',
                borderRadius: 'var(--ds-comp-btn-radius, 6px)',
                backgroundColor: 'var(--ds-color-brand-primary, #08A5B5)',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(8, 165, 181, 0.2)',
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
                minHeight: '42px',
                padding: '0 18px',
                borderRadius: 'var(--ds-comp-btn-radius, 6px)',
                backgroundColor: 'var(--ds-primitive-color-slate-100, #F1F5F9)',
                color: 'var(--ds-color-text-muted, #94A3B8)',
                border: '1px solid var(--ds-color-border-subtle, #E2E8F0)',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'not-allowed',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>You can add up to 4 branches</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleOpenAddForm}
              style={{
                minHeight: '42px',
                padding: '0 18px',
                borderRadius: 'var(--ds-comp-btn-radius, 6px)',
                border: '1px solid var(--ds-color-brand-primary, #08A5B5)',
                backgroundColor: '#FFFFFF',
                color: 'var(--ds-color-brand-primary, #08A5B5)',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.15s ease',
              }}
            >
              <Plus size={15} />
              <span>Add Clinic / Branch</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
