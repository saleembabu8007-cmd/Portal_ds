import React, { useState } from 'react';
import { Tag, Check, X, Loader2 } from 'lucide-react';
import { FieldLabel, HelperText, ErrorMessage } from '../ui/FieldFeedback';
import { Button } from '../ui/Button';

export interface PromoCodeFieldProps {
  id?: string;
  label?: string;
  buttonText?: string;
  value: string;
  onChange: (value: string) => void;
  onApply: (code: string) => Promise<unknown> | void;
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
 * Standard: Direction B (46px height, integrated Apply action, loading state, applied badge with clear action).
 */
export const PromoCodeField: React.FC<PromoCodeFieldProps> = ({
  id = 'promo_code_input',
  label = 'Promotional or Referral Code',
  buttonText = 'Apply Code',
  value,
  onChange,
  onApply,
  onRemove,
  isApplied = false,
  appliedDescription = '10% Professional Association Discount Applied',
  isLoading = false,
  errorMessage,
  helperText,
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
    <div className="ds-form-field" style={{ marginBottom: 'var(--ds-space-field-to-field, 20px)', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--ds-space-label-to-control, 6px)' }}>
        <FieldLabel htmlFor={id}>
          {label}
        </FieldLabel>
        <span
          style={{
            fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
            fontSize: 'var(--ds-primitive-font-size-xs, 0.75rem)',
            fontWeight: 400,
            color: 'var(--ds-color-text-muted, #64748B)',
          }}
        >
          (Optional)
        </span>
      </div>

      {isApplied ? (
        // Applied State Lockup
        <div
          style={{
            minHeight: 'var(--ds-comp-input-height, 46px)',
            padding: '8px var(--ds-comp-input-padding-x, 14px)',
            backgroundColor: 'var(--ds-primitive-color-feedback-emerald-50, #ECFDF5)',
            border: '1px solid var(--ds-primitive-color-feedback-emerald-200, #6EE7B7)',
            borderRadius: 'var(--ds-comp-input-radius, 6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: 'var(--ds-primitive-color-feedback-emerald-500, #10B981)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Check size={12} color="#FFFFFF" strokeWidth={3} />
            </div>
            <div>
              <span
                style={{
                  fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  color: 'var(--ds-color-text-success, #065F46)',
                }}
              >
                {appliedDescription}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--ds-color-text-muted, #64748B)', marginLeft: '8px' }}>
                ({value.toUpperCase()})
              </span>
            </div>
          </div>

          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              aria-label="Remove promotional code"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--ds-primitive-color-rose-700, #B91C1C)',
                fontSize: '0.75rem',
                fontWeight: 500,
                cursor: 'pointer',
                padding: '4px 8px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <X size={13} />
              <span>Remove</span>
            </button>
          )}
        </div>
      ) : (
        // Input + Apply Button Lockup
        <div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <div
                style={{
                  position: 'absolute',
                  left: 'var(--ds-comp-input-padding-x, 14px)',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  color: 'var(--ds-color-text-muted, #64748B)',
                  pointerEvents: 'none',
                }}
              >
                <Tag size={16} aria-hidden="true" />
              </div>

              <input
                id={id}
                type="text"
                disabled={disabled || loading}
                value={value}
                onChange={(e) => onChange(e.target.value.toUpperCase())}
                onKeyDown={handleKeyDown}
                placeholder="e.g. MMA2026"
                aria-invalid={!!errorMessage}
                aria-describedby={describedBy}
                className={`ds-input ${errorMessage ? 'ds-input-error' : ''}`}
                style={{
                  width: '100%',
                  height: 'var(--ds-comp-input-height, 46px)',
                  paddingLeft: 'calc(var(--ds-comp-input-padding-x, 14px) + 26px)',
                  paddingRight: 'var(--ds-comp-input-padding-x, 14px)',
                  backgroundColor: disabled ? 'var(--ds-primitive-color-slate-100, #F1F5F9)' : 'var(--ds-comp-input-bg, #FFFFFF)',
                  color: 'var(--ds-color-text-primary, #17253B)',
                  border: `1px solid ${
                    errorMessage
                      ? 'var(--ds-color-border-error, #EF4444)'
                      : 'var(--ds-color-border-default, #CBD5E1)'
                  }`,
                  borderRadius: 'var(--ds-comp-input-radius, 6px)',
                  fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
                  fontSize: 'var(--ds-comp-input-font-size, 1rem)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  outline: 'none',
                  transition: 'border-color var(--ds-primitive-duration-fast, 150ms) var(--ds-primitive-ease-default), box-shadow 150ms',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => {
                  if (!errorMessage && !disabled) {
                    e.currentTarget.style.borderColor = 'var(--ds-color-focus-border, #08A5B5)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px var(--ds-color-focus-ring, rgba(8, 165, 181, 0.18))';
                  }
                }}
                onBlur={(e) => {
                  if (!errorMessage && !disabled) {
                    e.currentTarget.style.borderColor = 'var(--ds-color-border-default, #CBD5E1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              />
            </div>

            <Button
              type="button"
              variant="primary"
              size="md"
              disabled={disabled || loading || !value.trim()}
              loading={loading}
              onClick={handleApplyClick}
              style={{ flexShrink: 0 }}
            >
              {buttonText}
            </Button>
          </div>

          {errorMessage ? (
            <ErrorMessage id={errorId} message={errorMessage} />
          ) : helperText ? (
            <HelperText id={helperId}>{helperText}</HelperText>
          ) : null}
        </div>
      )}
    </div>
  );
};
