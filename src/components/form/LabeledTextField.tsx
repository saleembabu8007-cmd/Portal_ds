import React, { forwardRef } from 'react';
import { FieldLabel, HelperText, ErrorMessage, LoadingIndicator } from '../ui/FieldFeedback';

export interface LabeledTextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
  optional?: boolean;
  isLoading?: boolean;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
}

/**
 * DoctorShield Labeled Text Field Molecule
 * Standard: Direction B (46px height, 6px radius, accessible label/error binding, optional tag, loading state).
 */
export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  (
    {
      id,
      label,
      helperText,
      errorMessage,
      required = false,
      optional = false,
      isLoading = false,
      leftAddon,
      rightAddon,
      containerClassName = '',
      containerStyle,
      disabled,
      readOnly,
      style,
      value,
      ...inputProps
    },
    ref
  ) => {
    const errorId = errorMessage ? `${id}-error` : undefined;
    const helperId = helperText ? `${id}-helper` : undefined;
    const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

    return (
      <div
        className={`ds-form-field ${containerClassName}`}
        style={{
          marginBottom: 'var(--ds-space-field-to-field, 20px)',
          position: 'relative',
          ...containerStyle,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--ds-space-label-to-control, 6px)' }}>
          <FieldLabel htmlFor={id} required={required}>
            {label}
          </FieldLabel>
          {optional && !required && (
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
          )}
        </div>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          {leftAddon && (
            <div
              style={{
                position: 'absolute',
                left: 'var(--ds-comp-input-padding-x, 14px)',
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
                color: 'var(--ds-color-text-muted, #64748B)',
                pointerEvents: 'none',
              }}
            >
              {leftAddon}
            </div>
          )}

          <input
            ref={ref}
            id={id}
            disabled={disabled || isLoading}
            readOnly={readOnly}
            value={value}
            aria-invalid={!!errorMessage}
            aria-required={required}
            aria-describedby={describedBy}
            aria-busy={isLoading}
            className={`ds-input ${errorMessage ? 'ds-input-error' : ''}`}
            style={{
              width: '100%',
              height: 'var(--ds-comp-input-height, 46px)',
              paddingLeft: leftAddon ? 'calc(var(--ds-comp-input-padding-x, 14px) + 26px)' : 'var(--ds-comp-input-padding-x, 14px)',
              paddingRight: rightAddon || isLoading ? 'calc(var(--ds-comp-input-padding-x, 14px) + 26px)' : 'var(--ds-comp-input-padding-x, 14px)',
              backgroundColor: disabled
                ? 'var(--ds-primitive-color-slate-100, #F1F5F9)'
                : readOnly
                ? 'var(--ds-primitive-color-slate-50, #F4F7F9)'
                : 'var(--ds-comp-input-bg, #FFFFFF)',
              color: disabled ? 'var(--ds-primitive-color-slate-400, #94A3B8)' : 'var(--ds-color-text-primary, #17253B)',
              border: `1px solid ${
                errorMessage
                  ? 'var(--ds-color-border-error, #EF4444)'
                  : 'var(--ds-color-border-default, #CBD5E1)'
              }`,
              borderRadius: 'var(--ds-comp-input-radius, 6px)',
              fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
              fontSize: 'var(--ds-comp-input-font-size, 1rem)', // 16px to prevent iOS Safari auto-zoom
              outline: 'none',
              transition: 'border-color var(--ds-primitive-duration-fast, 150ms) var(--ds-primitive-ease-default), box-shadow 150ms',
              boxSizing: 'border-box',
              ...style,
            }}
            onFocus={(e) => {
              if (!errorMessage && !readOnly && !disabled) {
                e.currentTarget.style.borderColor = 'var(--ds-color-focus-border, #08A5B5)';
                e.currentTarget.style.boxShadow = '0 0 0 3px var(--ds-color-focus-ring, rgba(8, 165, 181, 0.18))';
              }
              inputProps.onFocus?.(e);
            }}
            onBlur={(e) => {
              if (!errorMessage && !readOnly && !disabled) {
                e.currentTarget.style.borderColor = 'var(--ds-color-border-default, #CBD5E1)';
                e.currentTarget.style.boxShadow = 'none';
              }
              inputProps.onBlur?.(e);
            }}
            {...inputProps}
          />

          {(rightAddon || isLoading) && (
            <div
              style={{
                position: 'absolute',
                right: 'var(--ds-comp-input-padding-x, 14px)',
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
                color: 'var(--ds-color-text-muted, #64748B)',
              }}
            >
              {isLoading ? <LoadingIndicator size={18} /> : rightAddon}
            </div>
          )}
        </div>

        {errorMessage ? (
          <ErrorMessage id={errorId} message={errorMessage} />
        ) : helperText ? (
          <HelperText id={helperId}>{helperText}</HelperText>
        ) : null}
      </div>
    );
  }
);

LabeledTextField.displayName = 'LabeledTextField';
