import React, { useId } from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * DoctorShield Textarea Atom
 * Anatomy: Label + Textarea (min-height 96px, 8px radius) + Optional Helper / ErrorMessage
 * Compliance: WCAG 2.2 AA Contrast & Focus Indicators
 */

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id?: string;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
  optional?: boolean;
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
  className = '',
  style,
  ...props
}, ref) => {
  const generatedId = useId();
  const id = providedId || generatedId;

  const hasError = Boolean(errorMessage);
  const helperId = helperText ? `${id}-helper` : undefined;
  const errorId = hasError ? `${id}-error` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={`ds-field-wrapper ${className}`} style={{ marginBottom: 'var(--ds-space-field-to-field)' }}>
      {label && (
        <label
          htmlFor={id}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'var(--ds-primitive-font-body)',
            fontSize: 'var(--ds-primitive-font-size-base)', // 14px
            fontWeight: 'var(--ds-primitive-font-weight-medium)',
            color: 'var(--ds-primitive-color-slate-700)',
            marginBottom: 'var(--ds-space-label-to-control)', // 8px
          }}
        >
          <span>
            {label}
            {required && (
              <span
                style={{ color: 'var(--ds-primitive-color-rose-700)', marginLeft: '4px', fontWeight: 500 }}
                aria-hidden="true"
              >
                *
              </span>
            )}
          </span>
          {optional && (
            <span style={{ fontSize: 'var(--ds-primitive-font-size-xs)', color: 'var(--ds-color-text-muted)', fontWeight: 400 }}>
              (Optional)
            </span>
          )}
        </label>
      )}

      <textarea
        ref={ref}
        id={id}
        rows={rows}
        disabled={disabled}
        readOnly={readOnly}
        aria-invalid={hasError}
        aria-describedby={describedBy}
        required={required}
        style={{
          width: '100%',
          minHeight: '96px',
          padding: 'var(--ds-primitive-space-3) var(--ds-comp-input-padding-x)',
          fontFamily: 'var(--ds-primitive-font-body)',
          fontSize: 'var(--ds-comp-input-font-size)', // 16px
          color: disabled ? 'var(--ds-primitive-color-slate-400)' : 'var(--ds-color-text-primary)',
          backgroundColor: disabled ? 'var(--ds-primitive-color-slate-100)' : 'var(--ds-comp-input-bg)',
          border: hasError
            ? '2px solid var(--ds-color-border-error)'
            : '1px solid var(--ds-color-border-default)',
          borderRadius: 'var(--ds-comp-input-radius)', // 8px
          outline: 'none',
          boxSizing: 'border-box',
          resize: 'vertical',
          lineHeight: 1.5,
          transition: 'border-color var(--ds-primitive-duration-fast) var(--ds-primitive-ease-default)',
          ...style,
        }}
        onFocus={(e) => {
          if (!hasError && !disabled && !readOnly) {
            e.currentTarget.style.borderColor = 'var(--ds-color-focus-ring)';
            e.currentTarget.style.boxShadow = '0 0 0 2px rgba(8, 165, 181, 0.15)';
          }
        }}
        onBlur={(e) => {
          if (!hasError && !disabled && !readOnly) {
            e.currentTarget.style.borderColor = 'var(--ds-color-border-default)';
            e.currentTarget.style.boxShadow = 'none';
          }
        }}
        {...props}
      />

      {helperText && !hasError && (
        <p
          id={helperId}
          className="ds-helper"
          style={{
            fontFamily: 'var(--ds-primitive-font-body)',
            fontSize: 'var(--ds-primitive-font-size-sm)',
            color: 'var(--ds-color-text-muted)',
            marginTop: 'var(--ds-space-control-to-helper)',
            marginBottom: 0,
            lineHeight: 1.38,
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
          className="ds-helper-error"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'var(--ds-primitive-font-body)',
            fontSize: 'var(--ds-primitive-font-size-sm)',
            fontWeight: 'var(--ds-primitive-font-weight-medium)',
            color: 'var(--ds-primitive-color-rose-700)',
            marginTop: 'var(--ds-space-control-to-helper)',
            marginBottom: 0,
            lineHeight: 1.38,
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
