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
 * Standard: 48px height, 8px radius, accessible label/error binding, optional tag, loading state.
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
          marginBottom: 'var(--ds-primitive-space-4)',
          position: 'relative',
          ...containerStyle,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--ds-primitive-space-2)' }}>
          <FieldLabel htmlFor={id} required={required}>
            {label}
          </FieldLabel>
          {optional && !required && (
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
          )}
        </div>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          {leftAddon && (
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
            style={{
              width: '100%',
              height: 'var(--ds-comp-input-height)',
              paddingLeft: leftAddon ? '42px' : 'var(--ds-comp-input-padding-x)',
              paddingRight: rightAddon || isLoading ? '42px' : 'var(--ds-comp-input-padding-x)',
              backgroundColor: disabled
                ? 'var(--ds-color-surface-sunken)'
                : readOnly
                ? 'var(--ds-color-surface-subtle)'
                : 'var(--ds-color-surface-base)',
              color: disabled ? 'var(--ds-color-text-disabled)' : 'var(--ds-color-text-primary)',
              border: `1px solid ${
                errorMessage
                  ? 'var(--ds-color-border-error)'
                  : 'var(--ds-color-border-default)'
              }`,
              borderRadius: 'var(--ds-comp-input-radius)',
              fontFamily: 'var(--ds-primitive-font-body)',
              fontSize: 'var(--ds-primitive-font-size-sm)',
              outline: 'none',
              transition: 'border-color var(--ds-primitive-duration-fast) var(--ds-primitive-ease-default), box-shadow var(--ds-primitive-duration-fast) var(--ds-primitive-ease-default)',
              boxSizing: 'border-box',
              ...style,
            }}
            onFocus={(e) => {
              if (!errorMessage && !readOnly) {
                e.currentTarget.style.borderColor = 'var(--ds-color-border-focus)';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(8, 165, 181, 0.15)';
              }
              inputProps.onFocus?.(e);
            }}
            onBlur={(e) => {
              if (!errorMessage && !readOnly) {
                e.currentTarget.style.borderColor = 'var(--ds-color-border-default)';
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
                right: '14px',
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
                color: 'var(--ds-color-text-tertiary)',
              }}
            >
              {isLoading ? <LoadingIndicator size={18} /> : rightAddon}
            </div>
          )}
        </div>

        {/* Prevent layout jump with minHeight reserve when errors are anticipated */}
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

