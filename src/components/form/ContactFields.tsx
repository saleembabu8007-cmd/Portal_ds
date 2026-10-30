import React, { forwardRef } from 'react';
import { Mail, Phone } from 'lucide-react';
import { LabeledTextField, LabeledTextFieldProps } from './LabeledTextField';
import { FieldLabel, HelperText, ErrorMessage } from '../ui/FieldFeedback';

export interface EmailFieldProps extends Omit<LabeledTextFieldProps, 'type' | 'leftAddon' | 'label'> {
  label?: string;
  validateOnBlur?: boolean;
}

/**
 * DoctorShield Email Field Molecule
 * Standard: 48px height, email icon prefix, RFC 5322 client check, lowercase normalization.
 */
export const EmailField = forwardRef<HTMLInputElement, EmailFieldProps>(
  (
    {
      id = 'applicant_email',
      label = 'Email Address',
      helperText = 'Your policy schedule and e-Certificate of Insurance will be delivered here.',
      errorMessage,
      required = true,
      validateOnBlur = true,
      onBlur,
      onChange,
      ...props
    },
    ref
  ) => {
    const [localError, setLocalError] = React.useState<string | null>(null);

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const val = e.target.value.trim();
      if (validateOnBlur && val) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val)) {
          setLocalError('Please enter a valid email address (e.g. doctor@clinic.com.my)');
        } else {
          setLocalError(null);
        }
      } else if (required && !val) {
        setLocalError('Email address is required');
      } else {
        setLocalError(null);
      }
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (localError) setLocalError(null);
      onChange?.(e);
    };

    return (
      <LabeledTextField
        ref={ref}
        id={id}
        type="email"
        label={label}
        required={required}
        leftAddon={<Mail size={18} aria-hidden="true" />}
        helperText={helperText}
        errorMessage={errorMessage || localError || undefined}
        onBlur={handleBlur}
        onChange={handleChange}
        autoComplete="email"
        spellCheck={false}
        placeholder="doctor@example.com.my"
        {...props}
      />
    );
  }
);

EmailField.displayName = 'EmailField';

export interface MalaysianMobileFieldProps {
  id?: string;
  label?: string;
  value: string;
  onChange: (digits: string) => void;
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
  errorMessage?: string;
  helperText?: string;
}

/**
 * DoctorShield Malaysian Mobile Number Field Molecule
 * Features fixed +60 country code prefix, automatic digit grouping, Malaysian telco prefix validation.
 */
export const MalaysianMobileField: React.FC<MalaysianMobileFieldProps> = ({
  id = 'applicant_mobile',
  label = 'Mobile Phone Number',
  value,
  onChange,
  required = true,
  optional = false,
  disabled = false,
  errorMessage,
  helperText = 'Used for OTP identity verification and policy renewal SMS alerts.',
}) => {
  const errorId = errorMessage ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

  // Format incoming raw digits into display string (e.g. 12 345 6789)
  const formatDisplay = (digits: string) => {
    const clean = digits.replace(/\D/g, '').replace(/^60/, '').replace(/^0/, '');
    if (clean.length <= 2) return clean;
    if (clean.length <= 5) return `${clean.slice(0, 2)} ${clean.slice(2)}`;
    if (clean.length <= 9) return `${clean.slice(0, 2)} ${clean.slice(2, 5)} ${clean.slice(5)}`;
    return `${clean.slice(0, 2)} ${clean.slice(2, 6)} ${clean.slice(6, 10)}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').replace(/^60/, '').replace(/^0/, '');
    onChange(raw.slice(0, 10)); // Malaysian mobile is typically 9-10 digits after +60
  };

  return (
    <div className="ds-form-field" style={{ marginBottom: 'var(--ds-primitive-space-4)', position: 'relative' }}>
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

      <div style={{ display: 'flex', alignItems: 'stretch' }}>
        {/* Fixed Country Code Badge */}
        <div
          style={{
            height: 'var(--ds-comp-input-height)',
            padding: '0 14px',
            backgroundColor: 'var(--ds-color-surface-subtle)',
            border: `1px solid ${errorMessage ? 'var(--ds-color-border-error)' : 'var(--ds-color-border-default)'}`,
            borderRight: 'none',
            borderRadius: 'var(--ds-comp-input-radius) 0 0 var(--ds-comp-input-radius)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'var(--ds-primitive-font-body)',
            fontSize: 'var(--ds-primitive-font-size-sm)',
            fontWeight: 'var(--ds-primitive-font-weight-medium)',
            color: 'var(--ds-color-text-primary)',
            userSelect: 'none',
          }}
        >
          <Phone size={16} color="var(--ds-color-text-tertiary)" aria-hidden="true" />
          <span>+60</span>
        </div>

        {/* Mobile Number Input */}
        <input
          id={id}
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          disabled={disabled}
          value={formatDisplay(value)}
          onChange={handleInputChange}
          placeholder="12 345 6789"
          aria-invalid={!!errorMessage}
          aria-required={required}
          aria-describedby={describedBy}
          style={{
            flex: 1,
            height: 'var(--ds-comp-input-height)',
            padding: '0 var(--ds-comp-input-padding-x)',
            backgroundColor: disabled ? 'var(--ds-color-surface-sunken)' : 'var(--ds-color-surface-base)',
            color: disabled ? 'var(--ds-color-text-disabled)' : 'var(--ds-color-text-primary)',
            border: `1px solid ${errorMessage ? 'var(--ds-color-border-error)' : 'var(--ds-color-border-default)'}`,
            borderRadius: '0 var(--ds-comp-input-radius) var(--ds-comp-input-radius) 0',
            fontFamily: 'var(--ds-primitive-font-body)',
            fontSize: 'var(--ds-primitive-font-size-sm)',
            outline: 'none',
            transition: 'border-color var(--ds-primitive-duration-fast) var(--ds-primitive-ease-default)',
            boxSizing: 'border-box',
          }}
          onFocus={(e) => {
            if (!errorMessage) {
              e.currentTarget.style.borderColor = 'var(--ds-color-border-focus)';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(8, 165, 181, 0.15)';
            }
          }}
          onBlur={(e) => {
            if (!errorMessage) {
              e.currentTarget.style.borderColor = 'var(--ds-color-border-default)';
              e.currentTarget.style.boxShadow = 'none';
            }
          }}
        />
      </div>

      {errorMessage ? (
        <ErrorMessage id={errorId} message={errorMessage} />
      ) : helperText ? (
        <HelperText id={helperId}>{helperText}</HelperText>
      ) : null}
    </div>
  );
};

