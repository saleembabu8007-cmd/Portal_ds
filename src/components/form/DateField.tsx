import React, { forwardRef } from 'react';
import { Calendar } from 'lucide-react';
import { FieldLabel, HelperText, ErrorMessage } from '../ui/FieldFeedback';

export interface DateFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id: string;
  label: string;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
  optional?: boolean;
  minDate?: string;
  maxDate?: string;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
}

/**
 * DoctorShield Date Field Molecule
 * Standard: 48px height, 8px radius, calendar icon addon, min/max limits, accessible error/helper binding.
 */
export const DateField = forwardRef<HTMLInputElement, DateFieldProps>(
  (
    {
      id,
      label,
      helperText,
      errorMessage,
      required = false,
      optional = false,
      minDate,
      maxDate,
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
            <Calendar size={18} aria-hidden="true" />
          </div>

          <input
            ref={ref}
            id={id}
            type="date"
            disabled={disabled}
            readOnly={readOnly}
            value={value}
            min={minDate}
            max={maxDate}
            aria-invalid={!!errorMessage}
            aria-required={required}
            aria-describedby={describedBy}
            style={{
              width: '100%',
              height: 'var(--ds-comp-input-height)',
              paddingLeft: '44px',
              paddingRight: 'var(--ds-comp-input-padding-x)',
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

DateField.displayName = 'DateField';

