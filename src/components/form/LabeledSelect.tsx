import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { FieldLabel, HelperText, ErrorMessage } from '../ui/FieldFeedback';

export interface SelectOptionItem {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface LabeledSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  options?: SelectOptionItem[];
  children?: React.ReactNode;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
  optional?: boolean;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
}

/**
 * DoctorShield Labeled Select Molecule
 * Standard: 48px height, 8px radius, custom chevron indicator, integrated label and error handling.
 */
export const LabeledSelect = forwardRef<HTMLSelectElement, LabeledSelectProps>(
  (
    {
      id,
      label,
      options,
      children,
      placeholder,
      helperText,
      errorMessage,
      required = false,
      optional = false,
      containerClassName = '',
      containerStyle,
      disabled,
      style,
      value,
      ...selectProps
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
          <select
            ref={ref}
            id={id}
            disabled={disabled}
            value={value}
            aria-invalid={!!errorMessage}
            aria-required={required}
            aria-describedby={describedBy}
            style={{
              width: '100%',
              height: 'var(--ds-comp-input-height)',
              paddingLeft: 'var(--ds-comp-input-padding-x)',
              paddingRight: '40px',
              backgroundColor: disabled
                ? 'var(--ds-color-surface-sunken)'
                : 'var(--ds-color-surface-base)',
              color: !value && placeholder ? 'var(--ds-color-text-tertiary)' : disabled ? 'var(--ds-color-text-disabled)' : 'var(--ds-color-text-primary)',
              border: `1px solid ${
                errorMessage
                  ? 'var(--ds-color-border-error)'
                  : 'var(--ds-color-border-default)'
              }`,
              borderRadius: 'var(--ds-comp-input-radius)',
              fontFamily: 'var(--ds-primitive-font-body)',
              fontSize: 'var(--ds-comp-input-font-size)',
              outline: 'none',
              appearance: 'none',
              cursor: disabled ? 'not-allowed' : 'pointer',
              transition: 'border-color var(--ds-primitive-duration-fast) var(--ds-primitive-ease-default), box-shadow var(--ds-primitive-duration-fast) var(--ds-primitive-ease-default)',
              boxSizing: 'border-box',
              ...style,
            }}
            onFocus={(e) => {
              if (!errorMessage) {
                e.currentTarget.style.borderColor = 'var(--ds-color-border-focus)';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(8, 165, 181, 0.15)';
              }
              selectProps.onFocus?.(e);
            }}
            onBlur={(e) => {
              if (!errorMessage) {
                e.currentTarget.style.borderColor = 'var(--ds-color-border-default)';
                e.currentTarget.style.boxShadow = 'none';
              }
              selectProps.onBlur?.(e);
            }}
            {...selectProps}
          >
            {children ? (
              children
            ) : (
              <>
                {placeholder && (
                  <option value="" disabled>
                    {placeholder}
                  </option>
                )}
                {options?.map((opt) => (
                  <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                    {opt.label}
                  </option>
                ))}
              </>
            )}
          </select>

          <div
            style={{
              position: 'absolute',
              right: '14px',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              color: 'var(--ds-color-text-tertiary)',
            }}
          >
            <ChevronDown size={18} />
          </div>
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

LabeledSelect.displayName = 'LabeledSelect';

