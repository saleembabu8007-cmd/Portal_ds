import React from 'react';
import { Building2, Edit2, Trash2, MapPin, Phone } from 'lucide-react';
import { Badge } from '../ui/FieldFeedback';

export interface RepeatingBranchData {
  id: string;
  branchName: string;
  addressLine1: string;
  city: string;
  state: string;
  postcode: string;
  phone?: string;
  picName?: string;
  annualRevenue?: number;
}

export interface RepeatingBranchRowProps {
  index: number;
  branch: RepeatingBranchData;
  onEdit?: (branch: RepeatingBranchData) => void;
  onRemove?: (id: string) => void;
  disabled?: boolean;
}

/**
 * DoctorShield Repeating Clinic/Branch Row Molecule
 * Standard: Clean horizontal itemized row replacing nested multi-card layouts.
 * Features branch numbering, compact metadata layout, and accessible Edit/Remove buttons.
 */
export const RepeatingBranchRow: React.FC<RepeatingBranchRowProps> = ({
  index,
  branch,
  onEdit,
  onRemove,
  disabled = false,
}) => {
  return (
    <div
      className="ds-repeating-branch-row"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--ds-primitive-space-3) var(--ds-primitive-space-4)',
        backgroundColor: 'var(--ds-color-surface-base)',
        border: '1px solid var(--ds-color-border-subtle)',
        borderRadius: 'var(--ds-comp-panel-radius)',
        marginBottom: 'var(--ds-primitive-space-3)',
        gap: 'var(--ds-primitive-space-3)',
      }}
    >
      {/* Branch Identity & Location */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: '1 1 280px' }}>
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            backgroundColor: 'var(--ds-color-surface-subtle)',
            color: 'var(--ds-color-brand-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            fontSize: '12px',
            fontWeight: 600,
          }}
          aria-hidden="true"
        >
          #{index + 1}
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
            <span
              style={{
                fontFamily: 'var(--ds-primitive-font-body)',
                fontSize: 'var(--ds-primitive-font-size-sm)',
                fontWeight: 600,
                color: 'var(--ds-color-text-primary)',
              }}
            >
              {branch.branchName}
            </span>
            <Badge variant="neutral">{branch.state}</Badge>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: 'var(--ds-primitive-font-size-xs)',
              color: 'var(--ds-color-text-secondary)',
            }}
          >
            <MapPin size={12} color="var(--ds-color-text-tertiary)" aria-hidden="true" />
            <span>
              {branch.addressLine1}, {branch.postcode} {branch.city}
            </span>
          </div>

          {branch.picName && (
            <div
              style={{
                fontSize: 'var(--ds-primitive-font-size-xs)',
                color: 'var(--ds-color-text-tertiary)',
                marginTop: '2px',
              }}
            >
              PIC: {branch.picName} {branch.phone ? `· ${branch.phone}` : ''}
            </div>
          )}
        </div>
      </div>

      {/* Row Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {onEdit && (
          <button
            type="button"
            disabled={disabled}
            onClick={() => onEdit(branch)}
            style={{
              height: '32px',
              padding: '0 10px',
              borderRadius: '4px',
              border: '1px solid var(--ds-color-border-subtle)',
              backgroundColor: 'var(--ds-color-surface-base)',
              color: 'var(--ds-color-text-secondary)',
              fontSize: 'var(--ds-primitive-font-size-xs)',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: disabled ? 'not-allowed' : 'pointer',
            }}
            aria-label={`Edit ${branch.branchName}`}
          >
            <Edit2 size={13} />
            <span>Edit</span>
          </button>
        )}

        {onRemove && (
          <button
            type="button"
            disabled={disabled}
            onClick={() => onRemove(branch.id)}
            style={{
              height: '32px',
              padding: '0 10px',
              borderRadius: '4px',
              border: '1px solid var(--ds-primitive-color-rose-200)',
              backgroundColor: 'var(--ds-primitive-color-rose-50)',
              color: 'var(--ds-primitive-color-rose-700)',
              fontSize: 'var(--ds-primitive-font-size-xs)',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: disabled ? 'not-allowed' : 'pointer',
            }}
            aria-label={`Remove ${branch.branchName}`}
          >
            <Trash2 size={13} />
            <span>Remove</span>
          </button>
        )}
      </div>
    </div>
  );
};

