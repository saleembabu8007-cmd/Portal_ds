import React from 'react';
import { AlertCircle, ArrowRight } from 'lucide-react';

export interface ValidationErrorItem {
  fieldId: string;
  fieldLabel: string;
  message: string;
}

export interface ValidationMessageGroupProps {
  errors: ValidationErrorItem[];
  title?: string;
  onFocusField?: (fieldId: string) => void;
  className?: string;
}

/**
 * DoctorShield Validation Message Group Molecule
 * Consolidated accessible error summary for multi-field validation failures.
 * Provides direct jump/focus affordances to invalid fields.
 */
export const ValidationMessageGroup: React.FC<ValidationMessageGroupProps> = ({
  errors,
  title = 'Please review the following requirements before proceeding:',
  onFocusField,
  className = '',
}) => {
  if (errors.length === 0) {
    return null;
  }

  const handleJump = (fieldId: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (onFocusField) {
      onFocusField(fieldId);
    } else {
      const el = document.getElementById(fieldId);
      if (el) {
        el.focus();
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`ds-validation-message-group ${className}`}
      style={{
        padding: 'var(--ds-primitive-space-4)',
        backgroundColor: 'var(--ds-primitive-color-rose-50)',
        border: '1px solid var(--ds-primitive-color-rose-300)',
        borderLeft: '4px solid var(--ds-primitive-color-rose-600)',
        borderRadius: 'var(--ds-comp-panel-radius)',
        marginBottom: 'var(--ds-primitive-space-6)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--ds-primitive-space-2)' }}>
        <AlertCircle size={18} color="var(--ds-primitive-color-rose-700)" aria-hidden="true" />
        <h4
          style={{
            fontFamily: 'var(--ds-primitive-font-body)',
            fontSize: 'var(--ds-primitive-font-size-sm)',
            fontWeight: 600,
            color: 'var(--ds-primitive-color-rose-900)',
            margin: 0,
          }}
        >
          {title}
        </h4>
      </div>

      <ul
        style={{
          margin: 0,
          paddingLeft: '26px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        {errors.map((err) => (
          <li key={err.fieldId}>
            <button
              type="button"
              onClick={(e) => handleJump(err.fieldId, e)}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                color: 'var(--ds-primitive-color-rose-800)',
                fontFamily: 'var(--ds-primitive-font-body)',
                fontSize: 'var(--ds-primitive-font-size-xs)',
                fontWeight: 500,
                textAlign: 'left',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                textDecoration: 'underline',
              }}
            >
              <span>
                <strong>{err.fieldLabel}:</strong> {err.message}
              </span>
              <ArrowRight size={12} aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

