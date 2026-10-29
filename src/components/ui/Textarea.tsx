import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
  optional?: boolean;
  maxLength?: number;
  showCharCount?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({
  id,
  label,
  helperText,
  errorMessage,
  required = false,
  optional = false,
  maxLength,
  showCharCount = false,
  value,
  disabled = false,
  className = '',
  style,
  ...props
}, ref) => {
  const hasError = Boolean(errorMessage);
  const helperId = helperText ? `${id}-helper` : undefined;
  const errorId = hasError ? `${id}-error` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

  const currentLength = typeof value === 'string' ? value.length : 0;

  return (
    <div className={`ds-field-wrapper ${className}`} style={{ marginBottom: 'var(--ds-primitive-space-4)' }}>
      {label && (
        <label
          htmlFor={id}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'var(--ds-primitive-font-body)',
            fontSize: 'var(--ds-primitive-font-size-sm)',
            fontWeight: 'var(--ds-primitive-font-weight-medium)',
            color: 'var(--ds-color-text-secondary)',
            marginBottom: 'var(--ds-primitive-space-2)',
          }}
        >
          <span>
            {label}
            {required && <span style={{ color: 'var(--ds-primitive-color-rose-700)', marginLeft: '4px' }} aria-hidden="true">*</span>}
          </span>
          {optional && (
            <span style={{ fontSize: 'var(--ds-primitive-font-size-xs)', color: 'var(--ds-color-text-muted)' }}>
              (Optional)
            </span>
          )}
        </label>
      )}

      <textarea
        ref={ref}
        id={id}
        value={value}
        disabled={disabled}
        maxLength={maxLength}
        aria-invalid={hasError}
        aria-describedby={describedBy}
        required={required}
        style={{
          width: '100%',
          minHeight: '110px',
          padding: 'var(--ds-primitive-space-3) var(--ds-comp-input-padding-x)',
          fontFamily: 'var(--ds-primitive-font-body)',
          fontSize: 'var(--ds-primitive-font-size-base)',
          color: disabled ? 'var(--ds-primitive-color-slate-400)' : 'var(--ds-color-text-primary)',
          backgroundColor: disabled ? 'var(--ds-primitive-color-slate-100)' : 'var(--ds-comp-input-bg)',
          border: hasError
            ? '2px solid var(--ds-color-border-error)'
            : '1px solid var(--ds-color-border-default)',
          borderRadius: 'var(--ds-comp-input-radius)',
          outline: 'none',
          boxSizing: 'border-box',
          resize: 'vertical',
          transition: 'border-color var(--ds-primitive-duration-fast) var(--ds-primitive-ease-default)',
          cursor: disabled ? 'not-allowed' : 'text',
          lineHeight: 1.5,
          ...style,
        }}
        className="ds-textarea"
        {...props}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--ds-primitive-space-1)' }}>
        <div>
          {hasError ? (
            <p id={errorId} role="alert" aria-live="polite" style={{ fontSize: 'var(--ds-primitive-font-size-xs)', color: 'var(--ds-primitive-color-rose-700)', margin: 0 }}>
              {errorMessage}
            </p>
          ) : helperText ? (
            <p id={helperId} style={{ fontSize: 'var(--ds-primitive-font-size-xs)', color: 'var(--ds-color-text-muted)', margin: 0 }}>
              {helperText}
            </p>
          ) : null}
        </div>

        {showCharCount && (
          <span style={{ fontSize: 'var(--ds-primitive-font-size-xs)', color: 'var(--ds-color-text-muted)', fontFamily: 'var(--ds-primitive-font-mono)' }}>
            {currentLength}{maxLength ? ` / ${maxLength}` : ' characters'}
          </span>
        )}
      </div>
    </div>
  );
});

Textarea.displayName = 'Textarea';

