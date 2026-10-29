import React from 'react';
import { AlertCircle } from 'lucide-react';

export interface FieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}

export const FieldLabel: React.FC<FieldLabelProps> = ({
  htmlFor,
  required = false,
  optional = false,
  className = '',
  style,
  children,
  ...props
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`ds-field-label ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: 'var(--ds-primitive-font-body)',
        fontSize: 'var(--ds-primitive-font-size-sm)',
        fontWeight: 'var(--ds-primitive-font-weight-medium)',
        color: 'var(--ds-color-text-secondary)',
        marginBottom: 'var(--ds-primitive-space-2)',
        ...style,
      }}
      {...props}
    >
      <span>
        {children}
        {required && (
          <span
            style={{ color: 'var(--ds-primitive-color-rose-700)', marginLeft: '4px', fontWeight: 600 }}
            aria-label="required"
          >
            *
          </span>
        )}
      </span>
      {optional && (
        <span
          style={{
            fontSize: 'var(--ds-primitive-font-size-xs)',
            fontWeight: 400,
            color: 'var(--ds-color-text-muted)',
          }}
        >
          (Optional)
        </span>
      )}
    </label>
  );
};

export interface HelperTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  id?: string;
  children: React.ReactNode;
}

export const HelperText: React.FC<HelperTextProps> = ({
  id,
  className = '',
  style,
  children,
  ...props
}) => {
  return (
    <p
      id={id}
      className={`ds-helper-text ${className}`}
      style={{
        fontFamily: 'var(--ds-primitive-font-body)',
        fontSize: 'var(--ds-primitive-font-size-xs)',
        color: 'var(--ds-color-text-muted)',
        marginTop: 'var(--ds-primitive-space-1)',
        marginBottom: 0,
        lineHeight: 1.4,
        ...style,
      }}
      {...props}
    >
      {children}
    </p>
  );
};

export interface ErrorMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  id?: string;
  children: React.ReactNode;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  id,
  className = '',
  style,
  children,
  ...props
}) => {
  if (!children) return null;

  return (
    <p
      id={id}
      role="alert"
      aria-live="polite"
      className={`ds-error-message ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontFamily: 'var(--ds-primitive-font-body)',
        fontSize: 'var(--ds-primitive-font-size-xs)',
        fontWeight: 'var(--ds-primitive-font-weight-medium)',
        color: 'var(--ds-primitive-color-rose-700)',
        marginTop: 'var(--ds-primitive-space-1)',
        marginBottom: 0,
        lineHeight: 1.4,
        ...style,
      }}
      {...props}
    >
      <AlertCircle size={14} aria-hidden="true" style={{ flexShrink: 0 }} />
      <span>{children}</span>
    </p>
  );
};

