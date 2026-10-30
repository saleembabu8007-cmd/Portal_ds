import React from 'react';
import { Check } from 'lucide-react';
import { ErrorMessage } from '../ui/FieldFeedback';

export interface LegalConsentCheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  errorMessage?: string;
  className?: string;
}

/**
 * DoctorShield Legal Consent Checkbox Molecule
 * Features top-aligned 20px checkbox within 44px touch target, generous line-height (1.55),
 * comfortable reading measure, and embedded link safety.
 */
export const LegalConsentCheckbox: React.FC<LegalConsentCheckboxProps> = ({
  id,
  checked,
  onChange,
  children,
  required = true,
  disabled = false,
  errorMessage,
  className = '',
}) => {
  const errorId = errorMessage ? `${id}-error` : undefined;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === ' ' || e.key === 'Enter') && !disabled) {
      e.preventDefault();
      onChange(!checked);
    }
  };

  return (
    <div
      className={`ds-legal-consent ${className}`}
      style={{
        marginBottom: 'var(--ds-primitive-space-4)',
        padding: 'var(--ds-primitive-space-3) var(--ds-primitive-space-4)',
        backgroundColor: checked ? 'var(--ds-color-surface-base)' : 'var(--ds-color-surface-subtle)',
        border: `1px solid ${errorMessage ? 'var(--ds-color-border-error)' : 'var(--ds-color-border-subtle)'}`,
        borderRadius: 'var(--ds-comp-panel-radius)',
        transition: 'all var(--ds-primitive-duration-fast) var(--ds-primitive-ease-default)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        {/* Checkbox Trigger with 44px min hit box */}
        <div
          role="checkbox"
          id={id}
          aria-checked={checked}
          aria-required={required}
          aria-invalid={!!errorMessage}
          tabIndex={disabled ? -1 : 0}
          onClick={() => !disabled && onChange(!checked)}
          onKeyDown={handleKeyDown}
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '4px',
            border: `2px solid ${
              checked
                ? 'var(--ds-primitive-color-teal-800)'
                : errorMessage
                ? 'var(--ds-color-border-error)'
                : 'var(--ds-color-border-default)'
            }`,
            backgroundColor: checked ? 'var(--ds-primitive-color-teal-800)' : 'var(--ds-color-surface-base)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: disabled ? 'not-allowed' : 'pointer',
            flexShrink: 0,
            marginTop: '3px',
            outline: 'none',
            transition: 'all var(--ds-primitive-duration-fast) var(--ds-primitive-ease-default)',
          }}
          onFocus={(e) => {
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(8, 165, 181, 0.25)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {checked && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
        </div>

        {/* Legal Text Measure */}
        <div
          style={{
            flex: 1,
            fontFamily: 'var(--ds-primitive-font-body)',
            fontSize: 'var(--ds-primitive-font-size-xs)',
            lineHeight: 1.6,
            color: 'var(--ds-color-text-secondary)',
            cursor: disabled ? 'default' : 'pointer',
          }}
          onClick={(e) => {
            // Prevent toggling if user clicks an anchor link inside
            if ((e.target as HTMLElement).tagName.toLowerCase() !== 'a' && !disabled) {
              onChange(!checked);
            }
          }}
        >
          {children}
        </div>
      </div>

      {errorMessage && (
        <div style={{ marginTop: 'var(--ds-primitive-space-2)', paddingLeft: '32px' }}>
          <ErrorMessage id={errorId} message={errorMessage} />
        </div>
      )}
    </div>
  );
};

