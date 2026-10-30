import React, { useState } from 'react';
import { Tag, Check, X, Loader2 } from 'lucide-react';
import { FieldLabel, HelperText, ErrorMessage } from '../ui/FieldFeedback';
import { Button } from '../ui/Button';

export interface PromoCodeFieldProps {
  id?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  onApply: (code: string) => Promise<boolean> | void;
  onRemove?: () => void;
  isApplied?: boolean;
  appliedDescription?: string;
  isLoading?: boolean;
  errorMessage?: string;
  helperText?: string;
  disabled?: boolean;
}

/**
 * DoctorShield Promotional Code Field Molecule
 * Standard: 48px height, integrated Apply action, loading state, applied badge with clear action.
 */
export const PromoCodeField: React.FC<PromoCodeFieldProps> = ({
  id = 'promo_code_input',
  label = 'Promotional or Referral Code',
  value,
  onChange,
  onApply,
  onRemove,
  isApplied = false,
  appliedDescription = '10% Professional Association Discount Applied',
  isLoading = false,
  errorMessage,
  helperText = 'Enter an approved MMA, medical society, or institutional renewal code.',
  disabled = false,
}) => {
  const [internalLoading, setInternalLoading] = useState(false);
  const loading = isLoading || internalLoading;

  const handleApplyClick = async () => {
    if (!value.trim() || loading || isApplied) return;
    try {
      setInternalLoading(true);
      await onApply(value.trim());
    } finally {
      setInternalLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleApplyClick();
    }
  };

  const errorId = errorMessage ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="ds-form-field" style={{ marginBottom: 'var(--ds-primitive-space-4)', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--ds-primitive-space-2)' }}>
        <FieldLabel htmlFor={id}>
          {label}
        </FieldLabel>
        <span
          style={{
            fontFamily: 'var(--ds-primitive-font-body)',
            fontSize: 'var(--ds-primitive-font-size-xs)',
            fontWeight: 'var(--ds-primitive-font-weight-regular)',
            color: 'var(--ds-color-text-tertiary)',
          }}
        >
          (Optional)
        </span>
      </div>

      {isApplied ? (
        // Applied State Lockup
        <div
          style={{
            height: 'var(--ds-comp-input-height)',
            padding: '0 var(--ds-comp-input-padding-x)',
            backgroundColor: 'var(--ds-primitive-color-emerald-50)',
            border: '1px solid var(--ds-primitive-color-emerald-200)',
            borderRadius: 'var(--ds-comp-input-radius)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: 'var(--ds-primitive-color-emerald-500)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Check size={14} />
            </div>
            <div>
              <span
                style={{
                  fontFamily: 'var(--ds-primitive-font-mono)',
                  fontSize: 'var(--ds-primitive-font-size-sm)',
                  fontWeight: 600,
                  color: 'var(--ds-primitive-color-emerald-800)',
                  marginRight: '8px',
                }}
              >
                {value.toUpperCase()}
              </span>
              <span
                style={{
                  fontFamily: 'var(--ds-primitive-font-body)',
                  fontSize: 'var(--ds-primitive-font-size-xs)',
                  color: 'var(--ds-primitive-color-emerald-700)',
                }}
              >
                {appliedDescription}
              </span>
            </div>
          </div>

          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              disabled={disabled}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--ds-primitive-color-slate-500)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: 'var(--ds-primitive-font-size-xs)',
                fontWeight: 500,
                padding: '4px 8px',
                borderRadius: '4px',
              }}
              aria-label="Remove promotional code"
            >
              <X size={14} />
              <span>Remove</span>
            </button>
          )}
        </div>
      ) : (
        // Input with integrated Apply Button
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                position: 'absolute',
                left: '14px',
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
                color: 'var(--ds-color-text-tertiary)',
                pointerEvents: 'none',
              }}
            >
              <Tag size={18} aria-hidden="true" />
            </div>

            <input
              id={id}
              type="text"
              value={value}
              disabled={disabled || loading}
              onChange={(e) => onChange(e.target.value.toUpperCase())}
              onKeyDown={handleKeyDown}
              placeholder="e.g. MMA2026"
              aria-invalid={!!errorMessage}
              aria-describedby={describedBy}
              style={{
                width: '100%',
                height: 'var(--ds-comp-input-height)',
                paddingLeft: '42px',
                paddingRight: 'var(--ds-comp-input-padding-x)',
                backgroundColor: disabled ? 'var(--ds-color-surface-sunken)' : 'var(--ds-color-surface-base)',
                color: 'var(--ds-color-text-primary)',
                border: `1px solid ${
                  errorMessage ? 'var(--ds-color-border-error)' : 'var(--ds-color-border-default)'
                }`,
                borderRadius: 'var(--ds-comp-input-radius)',
                fontFamily: 'var(--ds-primitive-font-mono)',
                fontSize: 'var(--ds-primitive-font-size-sm)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                outline: 'none',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => {
                if (!errorMessage) {
                  e.currentTarget.style.borderColor = 'var(--ds-color-border-focus)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(8, 165, 181, 0.15)';
                }
              }}
              onBlur={(e) => {
                if (!errorMessage) {
                  e.currentTarget.style.borderColor = 'var(--ds-color-border-default)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            />
          </div>

          <Button
            type="button"
            variant="secondary"
            disabled={!value.trim() || disabled || loading}
            loading={loading}
            onClick={handleApplyClick}
            style={{ minWidth: '92px' }}
          >
            Apply
          </Button>
        </div>
      )}

      {errorMessage ? (
        <ErrorMessage id={errorId} message={errorMessage} />
      ) : helperText ? (
        <HelperText id={helperId}>{helperText}</HelperText>
      ) : null}
    </div>
  );
};

