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
 * Standard: Direction B (46px height, 6px radius, custom chevron indicator, integrated label and error handling).
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

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%' }}>
          <select
            ref={ref}
            id={id}
            disabled={disabled}
            value={value}
            aria-invalid={!!errorMessage}
            aria-required={required}
            aria-describedby={describedBy}
            className={`ds-select ${errorMessage ? 'ds-input-error' : ''}`}
            style={{
              width: '100%',
              height: 'var(--ds-comp-input-height, 46px)',
              paddingLeft: 'var(--ds-comp-input-padding-x, 14px)',
              paddingRight: '38px',
              backgroundColor: disabled
                ? 'var(--ds-primitive-color-slate-100, #F1F5F9)'
                : 'var(--ds-comp-input-bg, #FFFFFF)',
              color: !value && placeholder ? 'var(--ds-primitive-color-slate-400, #94A3B8)' : disabled ? 'var(--ds-primitive-color-slate-400, #94A3B8)' : 'var(--ds-color-text-primary, #17253B)',
              border: `1px solid ${
                errorMessage
                  ? 'var(--ds-color-border-error, #EF4444)'
                  : 'var(--ds-color-border-default, #CBD5E1)'
              }`,
              borderRadius: 'var(--ds-comp-input-radius, 6px)',
              fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
              fontSize: 'var(--ds-comp-input-font-size, 1rem)',
              appearance: 'none',
              outline: 'none',
              cursor: disabled ? 'not-allowed' : 'pointer',
              transition: 'border-color var(--ds-primitive-duration-fast, 150ms) var(--ds-primitive-ease-default), box-shadow 150ms',
              boxSizing: 'border-box',
              ...style,
            }}
            onFocus={(e) => {
              if (!errorMessage && !disabled) {
                e.currentTarget.style.borderColor = 'var(--ds-color-focus-border, #08A5B5)';
                e.currentTarget.style.boxShadow = '0 0 0 3px var(--ds-color-focus-ring, rgba(8, 165, 181, 0.18))';
              }
              selectProps.onFocus?.(e);
            }}
            onBlur={(e) => {
              if (!errorMessage && !disabled) {
                e.currentTarget.style.borderColor = 'var(--ds-color-border-default, #CBD5E1)';
                e.currentTarget.style.boxShadow = 'none';
              }
              selectProps.onBlur?.(e);
            }}
            {...selectProps}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options
              ? options.map((opt) => (
                  <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                    {opt.label}
                  </option>
                ))
              : children}
          </select>

          <ChevronDown
            size={16}
            color="var(--ds-color-text-secondary, #475569)"
            style={{
              position: 'absolute',
              right: '14px',
              pointerEvents: 'none',
              flexShrink: 0,
            }}
            aria-hidden="true"
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

LabeledSelect.displayName = 'LabeledSelect';
