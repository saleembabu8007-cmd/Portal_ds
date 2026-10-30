import React, { useState } from 'react';
import { Edit2, Check, X } from 'lucide-react';

export interface InlineEditActionProps {
  id: string;
  label: string;
  value: string;
  onSave?: (newValue: string) => void;
  onNavigateToStep?: () => void;
  editableInline?: boolean;
  disabled?: boolean;
}

/**
 * DoctorShield Inline Edit Action Molecule
 * Renders confirmed data with an accessible inline edit toggle or stage-jump action.
 */
export const InlineEditAction: React.FC<InlineEditActionProps> = ({
  id,
  label,
  value,
  onSave,
  onNavigateToStep,
  editableInline = false,
  disabled = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draftValue, setDraftValue] = useState(value);

  const handleSave = () => {
    onSave?.(draftValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraftValue(value);
    setIsEditing(false);
  };

  if (isEditing && editableInline) {
    return (
      <div
        className="ds-inline-edit"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 0',
        }}
      >
        <input
          id={id}
          type="text"
          value={draftValue}
          onChange={(e) => setDraftValue(e.target.value)}
          autoFocus
          style={{
            flex: 1,
            height: '36px',
            padding: '0 10px',
            fontSize: '14px',
            fontFamily: 'var(--ds-primitive-font-body)',
            border: '1px solid var(--ds-color-border-focus)',
            borderRadius: '4px',
            outline: 'none',
          }}
        />

        <button
          type="button"
          onClick={handleSave}
          style={{
            height: '36px',
            padding: '0 12px',
            backgroundColor: 'var(--ds-color-brand-secondary)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
          aria-label="Save changes"
        >
          <Check size={14} />
          <span>Save</span>
        </button>

        <button
          type="button"
          onClick={handleCancel}
          style={{
            height: '36px',
            padding: '0 10px',
            backgroundColor: 'transparent',
            color: 'var(--ds-color-text-secondary)',
            border: '1px solid var(--ds-color-border-subtle)',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
          aria-label="Cancel editing"
        >
          <X size={14} />
        </button>
      </div>
    );
  }

  return (
    <div
      className="ds-inline-display"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        padding: '6px 0',
      }}
    >
      <div>
        <span
          style={{
            fontFamily: 'var(--ds-primitive-font-body)',
            fontSize: 'var(--ds-primitive-font-size-xs)',
            color: 'var(--ds-color-text-tertiary)',
            display: 'block',
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: 'var(--ds-primitive-font-body)',
            fontSize: 'var(--ds-primitive-font-size-sm)',
            fontWeight: 'var(--ds-primitive-font-weight-medium)',
            color: 'var(--ds-color-text-primary)',
          }}
        >
          {value || '—'}
        </span>
      </div>

      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          if (editableInline) {
            setIsEditing(true);
          } else if (onNavigateToStep) {
            onNavigateToStep();
          }
        }}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--ds-primitive-color-teal-800)',
          fontSize: 'var(--ds-primitive-font-size-xs)',
          fontWeight: 500,
          cursor: disabled ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '4px 6px',
          borderRadius: '4px',
        }}
        aria-label={`Edit ${label}`}
      >
        <Edit2 size={12} />
        <span>Change</span>
      </button>
    </div>
  );
};

