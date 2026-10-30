import React, { useId } from 'react';
import { AlertCircle, Mail, Phone, Hash } from 'lucide-react';

/**
 * DoctorShield Form Input Atoms
 * Includes:
 * 1. TextInput: Standard single-line text input (46px height, 6px radius, #CBD5E1 border)
 * 2. NumberInput: Numeric input with tabular-nums and numeric keypad
 * 3. EmailInput: Pre-configured email input with icon and validation attributes
 * 4. TelInput: Malaysian phone input with +60 calling code prefix
 * Compliance: WCAG 2.2 AA Contrast & Focus Indicators, iOS non-zoom font sizing
 */

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
  optional?: boolean;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(({
  id: providedId,
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
  const generatedId = useId();
  const id = providedId || generatedId;

  const hasError = Boolean(errorMessage);
  const helperId = helperText ? `${id}-helper` : undefined;
  const errorId = hasError ? `${id}-error` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

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

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%' }}>
        {leftAddon && (
          <div
            style={{
              position: 'absolute',
              left: 'var(--ds-comp-input-padding-x, 14px)',
              color: 'var(--ds-color-text-muted, #64748B)',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              zIndex: 1,
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
          className={`ds-input ${hasError ? 'ds-input-error' : ''}`}
          style={{
            width: '100%',
            height: 'var(--ds-comp-input-height, 46px)',
            paddingLeft: leftAddon ? 'calc(var(--ds-comp-input-padding-x, 14px) + 26px)' : 'var(--ds-comp-input-padding-x, 14px)',
            paddingRight: rightAddon ? 'calc(var(--ds-comp-input-padding-x, 14px) + 26px)' : 'var(--ds-comp-input-padding-x, 14px)',
            fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
            fontSize: 'var(--ds-comp-input-font-size, 1rem)', // 16px to prevent iOS Safari auto-zoom
            color: disabled ? 'var(--ds-primitive-color-slate-400, #94A3B8)' : 'var(--ds-color-text-primary, #17253B)',
            backgroundColor: disabled ? 'var(--ds-primitive-color-slate-100, #F1F5F9)' : 'var(--ds-comp-input-bg, #FFFFFF)',
            border: hasError
              ? '2px solid var(--ds-color-border-error, #EF4444)'
              : '1px solid var(--ds-color-border-default, #CBD5E1)',
            borderRadius: 'var(--ds-comp-input-radius, 6px)',
            outline: 'none',
            boxSizing: 'border-box',
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

        {rightAddon && (
          <div
            style={{
              position: 'absolute',
              right: 'var(--ds-comp-input-padding-x, 14px)',
              color: 'var(--ds-color-text-muted, #64748B)',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              zIndex: 1,
            }}
            aria-hidden="true"
          >
            {rightAddon}
          </div>
        )}
      </div>

      {helperText && !hasError && (
        <p
          id={helperId}
          className="ds-helper"
          style={{
            fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
            fontSize: 'var(--ds-primitive-font-size-xs, 0.75rem)', // 12px
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
            fontSize: 'var(--ds-primitive-font-size-xs, 0.75rem)', // 12px
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

TextInput.displayName = 'TextInput';

/* ==========================================================================
   2. NUMBER INPUT ATOM
   ========================================================================== */
export interface NumberInputProps extends TextInputProps {
  allowDecimals?: boolean;
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(({
  allowDecimals = false,
  style,
  leftAddon,
  ...props
}, ref) => {
  return (
    <TextInput
      ref={ref}
      type="text"
      inputMode={allowDecimals ? 'decimal' : 'numeric'}
      pattern={allowDecimals ? '[0-9]*\\.?[0-9]*' : '[0-9]*'}
      leftAddon={leftAddon || <Hash size={16} />}
      style={{
        fontVariantNumeric: 'tabular-nums',
        letterSpacing: '0.02em',
        ...style,
      }}
      {...props}
    />
  );
});

NumberInput.displayName = 'NumberInput';

/* ==========================================================================
   3. EMAIL INPUT ATOM
   ========================================================================== */
export interface EmailInputProps extends TextInputProps {}

export const EmailInput = React.forwardRef<HTMLInputElement, EmailInputProps>(({
  leftAddon,
  autoComplete = 'email',
  ...props
}, ref) => {
  return (
    <TextInput
      ref={ref}
      type="email"
      inputMode="email"
      autoCapitalize="none"
      autoComplete={autoComplete}
      spellCheck={false}
      leftAddon={leftAddon || <Mail size={16} />}
      {...props}
    />
  );
});

EmailInput.displayName = 'EmailInput';

/* ==========================================================================
   4. TELEPHONE INPUT ATOM (Malaysian +60 standard)
   ========================================================================== */
export interface TelInputProps extends TextInputProps {
  countryCode?: string;
}

export const TelInput = React.forwardRef<HTMLInputElement, TelInputProps>(({
  countryCode = '+60',
  leftAddon,
  placeholder = '12-345 6789',
  ...props
}, ref) => {
  const prefixElement = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <Phone size={14} />
      <span style={{ fontWeight: 500, fontSize: '0.8125rem', color: 'var(--ds-color-text-secondary, #475569)' }}>
        {countryCode}
      </span>
      <span style={{ color: 'var(--ds-color-border-default, #CBD5E1)' }}>|</span>
    </div>
  );

  return (
    <TextInput
      ref={ref}
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      placeholder={placeholder}
      leftAddon={leftAddon || prefixElement}
      style={{
        paddingLeft: 'calc(var(--ds-comp-input-padding-x, 14px) + 52px)',
      }}
      {...props}
    />
  );
});

TelInput.displayName = 'TelInput';
