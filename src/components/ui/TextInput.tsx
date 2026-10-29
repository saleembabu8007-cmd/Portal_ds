import React from 'react';

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
  optional?: boolean;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(({
  id,
  label,
  helperText,
  errorMessage,
  required = false,
  optional = false,
  leftAddon,
  rightAddon,
  disabled = false,
  readOnly = false,
  className = '',
  style,
  ...props
}, ref) => {
  const hasError = Boolean(errorMessage);
  const helperId = helperText ? `${id}-helper` : undefined;
  const errorId = hasError ? `${id}-error` : undefined;

  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

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

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {leftAddon && (
          <div
            style={{
              position: 'absolute',
              left: 'var(--ds-primitive-space-4)',
              color: 'var(--ds-color-text-muted)',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
            aria-hidden="true"
          >
            {leftAddon}
          </div>
        )}

        <input
          ref={ref}
          id={id}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={hasError}
          aria-describedby={describedBy}
          required={required}
          style={{
            width: '100%',
            height: 'var(--ds-comp-input-height)', // 48px
            paddingLeft: leftAddon ? 'calc(var(--ds-primitive-space-4) + 24px)' : 'var(--ds-comp-input-padding-x)',
            paddingRight: rightAddon ? 'calc(var(--ds-primitive-space-4) + 24px)' : 'var(--ds-comp-input-padding-x)',
            paddingTop: 'var(--ds-comp-input-padding-y)',
            paddingBottom: 'var(--ds-comp-input-padding-y)',
            fontFamily: 'var(--ds-primitive-font-body)',
            fontSize: 'var(--ds-primitive-font-size-base)', // 16px avoids iOS zoom
            color: disabled ? 'var(--ds-primitive-color-slate-400)' : 'var(--ds-color-text-primary)',
            backgroundColor: disabled ? 'var(--ds-primitive-color-slate-100)' : 'var(--ds-comp-input-bg)',
            border: hasError
              ? '2px solid var(--ds-color-border-error)'
              : '1px solid var(--ds-color-border-default)',
            borderRadius: 'var(--ds-comp-input-radius)',
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'border-color var(--ds-primitive-duration-fast) var(--ds-primitive-ease-default)',
            cursor: disabled ? 'not-allowed' : 'text',
            ...style,
          }}
          className="ds-text-input"
          {...props}
        />

        {rightAddon && (
          <div
            style={{
              position: 'absolute',
              right: 'var(--ds-primitive-space-4)',
              color: 'var(--ds-color-text-muted)',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
            aria-hidden="true"
          >
            {rightAddon}
          </div>
        )}
      </div>

      {hasError && (
        <p
          id={errorId}
          role="alert"
          aria-live="polite"
          style={{
            fontFamily: 'var(--ds-primitive-font-body)',
            fontSize: 'var(--ds-primitive-font-size-xs)',
            color: 'var(--ds-primitive-color-rose-700)',
            marginTop: 'var(--ds-primitive-space-1)',
            marginBottom: 0,
          }}
        >
          {errorMessage}
        </p>
      )}

      {helperText && !hasError && (
        <p
          id={helperId}
          style={{
            fontFamily: 'var(--ds-primitive-font-body)',
            fontSize: 'var(--ds-primitive-font-size-xs)',
            color: 'var(--ds-color-text-muted)',
            marginTop: 'var(--ds-primitive-space-1)',
            marginBottom: 0,
          }}
        >
          {helperText}
        </p>
      )}
    </div>
  );
});

TextInput.displayName = 'TextInput';

