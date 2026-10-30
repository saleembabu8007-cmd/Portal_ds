import React, { useId } from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * DoctorShield Textarea Atom
 * Anatomy: Label + Textarea (min-height 100px, 6px radius, #CBD5E1 border) + Optional Character Counter + ErrorMessage
 * Compliance: WCAG 2.2 AA Contrast & Focus Indicators
 */

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id?: string;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
  optional?: boolean;
  maxLength?: number;
  showCharCount?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({
  id: providedId,
  label,
  helperText,
  errorMessage,
  required = false,
  optional = false,
  disabled = false,
  readOnly = false,
  rows = 4,
  maxLength,
  showCharCount = false,
  value,
  defaultValue,
  className = '',
  style,
  onChange,
  ...props
}, ref) => {
  const generatedId = useId();
  const id = providedId || generatedId;

  const hasError = Boolean(errorMessage);
  const helperId = helperText ? `${id}-helper` : undefined;
  const errorId = hasError ? `${id}-error` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

  const currentLength = typeof value === 'string' ? value.length : (typeof defaultValue === 'string' ? defaultValue.length : 0);

  return (
    <div className={`ds-field-wrapper ${className}`} style={{ marginBottom: 'var(--ds-space-field-to-field, 20px)' }}>
      {label && (
        <label
          htmlFor={id}
          className="ds-label"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
            fontSize: 'var(--ds-font-field-label-size, 0.8125rem)', // 13px
            fontWeight: 'var(--ds-primitive-font-weight-medium, 500)',
            color: 'var(--ds-color-text-label, #334155)',
            marginBottom: 'var(--ds-space-label-to-control, 6px)',
          }}
        >
          <span>
            {label}
            {required && (
              <span
                style={{ color: 'var(--ds-primitive-color-rose-700, #B91C1C)', marginLeft: '4px', fontWeight: 500 }}
                aria-label="required"
              >
                *
              </span>
            )}
          </span>
          {optional && (
            <span style={{ fontSize: 'var(--ds-primitive-font-size-xs, 0.75rem)', color: 'var(--ds-color-text-muted, #64748B)', fontWeight: 400 }}>
              (Optional)
            </span>
          )}
        </label>
      )}

      <div style={{ position: 'relative' }}>
        <textarea
          ref={ref}
          id={id}
          rows={rows}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={hasError}
          aria-describedby={describedBy}
          required={required}
          onChange={onChange}
          className={`ds-input ${hasError ? 'ds-input-error' : ''}`}
          style={{
            width: '100%',
            minHeight: '100px',
            padding: '10px var(--ds-comp-input-padding-x, 14px)',
            fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
            fontSize: 'var(--ds-comp-input-font-size, 1rem)',
            color: disabled ? 'var(--ds-primitive-color-slate-400, #94A3B8)' : 'var(--ds-color-text-primary, #17253B)',
            backgroundColor: disabled ? 'var(--ds-primitive-color-slate-100, #F1F5F9)' : 'var(--ds-comp-input-bg, #FFFFFF)',
            border: hasError
              ? '2px solid var(--ds-color-border-error, #EF4444)'
              : '1px solid var(--ds-color-border-default, #CBD5E1)',
            borderRadius: 'var(--ds-comp-input-radius, 6px)',
            outline: 'none',
            boxSizing: 'border-box',
            resize: 'vertical',
            transition: 'border-color var(--ds-primitive-duration-fast, 150ms) var(--ds-primitive-ease-default), box-shadow 150ms',
            ...style,
          }}
          onFocus={(e) => {
            if (!hasError && !disabled && !readOnly) {
              e.currentTarget.style.borderColor = 'var(--ds-color-focus-border, #08A5B5)';
              e.currentTarget.style.boxShadow = '0 0 0 3px var(--ds-color-focus-ring, rgba(8, 165, 181, 0.18))';
            }
          }}
          onBlur={(e) => {
            if (!hasError && !disabled && !readOnly) {
              e.currentTarget.style.borderColor = 'var(--ds-color-border-default, #CBD5E1)';
              e.currentTarget.style.boxShadow = 'none';
            }
          }}
          {...props}
        />

        {showCharCount && maxLength && (
          <div
            style={{
              position: 'absolute',
              bottom: '8px',
              right: '12px',
              fontSize: '0.6875rem',
              color: 'var(--ds-color-text-muted, #64748B)',
              pointerEvents: 'none',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {currentLength} / {maxLength}
          </div>
        )}
      </div>

      {helperText && !hasError && (
        <p
          id={helperId}
          className="ds-helper"
          style={{
            fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
            fontSize: 'var(--ds-primitive-font-size-xs, 0.75rem)',
            color: 'var(--ds-color-text-muted, #64748B)',
            marginTop: 'var(--ds-space-control-to-helper, 4px)',
            marginBottom: 0,
            lineHeight: 1.4,
          }}
        >
          {helperText}
        </p>
      )}

      {hasError && (
        <p
          id={errorId}
          role="alert"
          aria-live="polite"
          className="ds-helper ds-helper-error"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
            fontSize: 'var(--ds-primitive-font-size-xs, 0.75rem)',
            fontWeight: 'var(--ds-primitive-font-weight-medium, 500)',
            color: 'var(--ds-primitive-color-rose-700, #B91C1C)',
            marginTop: 'var(--ds-space-control-to-helper, 4px)',
            marginBottom: 0,
            lineHeight: 1.4,
          }}
        >
          <AlertCircle size={14} aria-hidden="true" style={{ flexShrink: 0 }} />
          <span>{errorMessage}</span>
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';
