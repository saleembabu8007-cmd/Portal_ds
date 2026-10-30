import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Info, Loader2 } from 'lucide-react';

/**
 * DoctorShield Feedback, Notice & Micro-Atoms
 * Includes: FieldLabel, HelperText, ErrorMessage, InlineNotice, Badge, Divider, LoadingIndicator
 * Compliance: WCAG 2.2 AA Contrast & Semantic Live Regions
 */

/* ==========================================================================
   1. FIELD LABEL ATOM
   ========================================================================== */
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
        fontSize: 'var(--ds-primitive-font-size-base)', // 14px
        fontWeight: 'var(--ds-primitive-font-weight-medium)',
        color: 'var(--ds-primitive-color-slate-700)',
        marginBottom: 'var(--ds-space-label-to-control)', // 8px
        ...style,
      }}
      {...props}
    >
      <span>
        {children}
        {required && (
          <span
            style={{ color: 'var(--ds-primitive-color-rose-700)', marginLeft: '4px', fontWeight: 500 }}
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

/* ==========================================================================
   2. HELPER TEXT ATOM
   ========================================================================== */
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
        fontSize: 'var(--ds-primitive-font-size-sm)', // 13px
        color: 'var(--ds-color-text-muted)',
        marginTop: 'var(--ds-space-control-to-helper)', // 6px
        marginBottom: 0,
        lineHeight: 1.38,
        ...style,
      }}
      {...props}
    >
      {children}
    </p>
  );
};

/* ==========================================================================
   3. ERROR MESSAGE ATOM
   ========================================================================== */
export interface ErrorMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  id?: string;
  message?: React.ReactNode;
  children?: React.ReactNode;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  id,
  message,
  className = '',
  style,
  children,
  ...props
}) => {
  const content = children || message;
  if (!content) return null;

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
        fontSize: 'var(--ds-primitive-font-size-sm)', // 13px
        fontWeight: 'var(--ds-primitive-font-weight-medium)',
        color: 'var(--ds-primitive-color-rose-700)',
        marginTop: 'var(--ds-space-control-to-helper)', // 6px
        marginBottom: 0,
        lineHeight: 1.38,
        ...style,
      }}
      {...props}
    >
      <AlertCircle size={14} aria-hidden="true" style={{ flexShrink: 0 }} />
      <span>{content}</span>
    </p>
  );
};

/* ==========================================================================
   4. INLINE NOTICE ATOM (Understated, non-alarmist callout)
   ========================================================================== */
export type NoticeVariant = 'info' | 'success' | 'warning' | 'error';

export interface InlineNoticeProps {
  variant?: NoticeVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const InlineNotice: React.FC<InlineNoticeProps> = ({
  variant = 'info',
  title,
  children,
  className = '',
  style,
}) => {
  const variantConfig: Record<NoticeVariant, { bg: string; border: string; text: string; icon: React.ReactNode }> = {
    info: {
      bg: 'var(--ds-color-surface-brand-tint)',
      border: 'var(--ds-color-border-subtle)',
      text: 'var(--ds-color-text-link)',
      icon: <Info size={16} color="var(--ds-color-text-link)" aria-hidden="true" />,
    },
    success: {
      bg: 'var(--ds-color-feedback-success-bg)',
      border: 'var(--ds-color-feedback-success-border)',
      text: 'var(--ds-color-text-success)',
      icon: <CheckCircle size={16} color="var(--ds-color-text-success)" aria-hidden="true" />,
    },
    warning: {
      bg: 'var(--ds-color-feedback-warning-bg)',
      border: 'var(--ds-color-feedback-warning-border)',
      text: 'var(--ds-color-text-warning)',
      icon: <AlertTriangle size={16} color="var(--ds-color-text-warning)" aria-hidden="true" />,
    },
    error: {
      bg: 'var(--ds-color-feedback-error-bg)',
      border: 'var(--ds-color-feedback-error-border)',
      text: 'var(--ds-color-text-error)',
      icon: <AlertCircle size={16} color="var(--ds-color-text-error)" aria-hidden="true" />,
    },
  };

  const config = variantConfig[variant];

  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className={`ds-inline-notice ds-notice-${variant} ${className}`}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'var(--ds-primitive-space-3)',
        padding: 'var(--ds-primitive-space-3) var(--ds-primitive-space-4)',
        backgroundColor: config.bg,
        border: `1px solid ${config.border}`,
        borderRadius: 'var(--ds-comp-btn-radius)',
        color: config.text,
        fontSize: 'var(--ds-primitive-font-size-sm)',
        lineHeight: 1.45,
        ...style,
      }}
    >
      <div style={{ flexShrink: 0, marginTop: '2px' }}>{config.icon}</div>
      <div style={{ flex: 1 }}>
        {title && <div style={{ fontWeight: 500, marginBottom: '2px' }}>{title}</div>}
        <div style={{ color: 'var(--ds-color-text-primary)' }}>{children}</div>
      </div>
    </div>
  );
};

/* ==========================================================================
   5. BADGE ATOM (For genuinely necessary statuses)
   ========================================================================== */
export interface BadgeProps {
  variant?: 'teal' | 'navy' | 'neutral' | 'success' | 'warning' | 'error';
  pill?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'teal',
  pill = false,
  children,
  className = '',
  style,
}) => {
  const styles: Record<string, React.CSSProperties> = {
    teal: { backgroundColor: 'var(--ds-color-surface-brand-tint)', color: 'var(--ds-color-text-link)', border: '1px solid var(--ds-primitive-color-teal-200)' },
    navy: { backgroundColor: 'var(--ds-primitive-color-navy-100)', color: 'var(--ds-color-text-heading)', border: '1px solid var(--ds-primitive-color-navy-200)' },
    neutral: { backgroundColor: 'var(--ds-primitive-color-slate-100)', color: 'var(--ds-color-text-secondary)', border: '1px solid var(--ds-color-border-subtle)' },
    success: { backgroundColor: 'var(--ds-color-feedback-success-bg)', color: 'var(--ds-color-text-success)', border: '1px solid var(--ds-color-feedback-success-border)' },
    warning: { backgroundColor: 'var(--ds-color-feedback-warning-bg)', color: 'var(--ds-color-text-warning)', border: '1px solid var(--ds-color-feedback-warning-border)' },
    error: { backgroundColor: 'var(--ds-primitive-color-rose-50)', color: 'var(--ds-primitive-color-rose-700)', border: '1px solid var(--ds-primitive-color-rose-200)' },
  };

  return (
    <span
      className={`ds-badge ds-badge-${variant} ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 8px',
        borderRadius: pill ? 'var(--ds-primitive-radius-full)' : 'var(--ds-primitive-radius-sm)',
        fontFamily: 'var(--ds-primitive-font-body)',
        fontSize: 'var(--ds-primitive-font-size-xs)',
        fontWeight: 'var(--ds-primitive-font-weight-medium)',
        lineHeight: 1.33,
        ...styles[variant],
        ...style,
      }}
    >
      {children}
    </span>
  );
};

/* ==========================================================================
   6. DIVIDER ATOM
   ========================================================================== */
export interface DividerProps {
  className?: string;
  style?: React.CSSProperties;
}

export const Divider: React.FC<DividerProps> = ({ className = '', style }) => {
  return (
    <hr
      className={`ds-divider ${className}`}
      style={{
        border: 'none',
        borderTop: '1px solid var(--ds-color-border-subtle)', // #DFE6EC
        margin: 'var(--ds-primitive-space-6) 0', // 24px
        ...style,
      }}
    />
  );
};

/* ==========================================================================
   7. LOADING INDICATOR ATOM
   ========================================================================== */
export interface LoadingIndicatorProps {
  size?: number;
  label?: string;
  className?: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  size = 20,
  label = 'Loading...',
  className = '',
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`ds-loading-indicator ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--ds-primitive-space-2)',
        color: 'var(--ds-color-action-teal)',
      }}
    >
      <Loader2 size={size} className="animate-spin" aria-hidden="true" />
      <span style={{ fontSize: 'var(--ds-primitive-font-size-sm)', color: 'var(--ds-color-text-secondary)' }}>
        {label}
      </span>
    </div>
  );
};
