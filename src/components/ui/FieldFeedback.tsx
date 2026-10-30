import React, { useState } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Info, Loader2, ChevronDown } from 'lucide-react';

/**
 * DoctorShield Feedback, Notice & Micro-Atoms
 * Includes:
 * 1. FieldLabel: Strict 13px Inter 500 with accessible required indicator
 * 2. HelperText: 12px Inter 400 muted guidance
 * 3. ErrorMessage: 12px Inter 500 with role="alert" and AlertCircle icon
 * 4. InlineNotice: Understated contextual alerts (info, success, warning, error)
 * 5. Badge & StatusIndicator: Compact pills with optional status dot
 * 6. Divider: 1px subtle divider with optional centered text
 * 7. LoadingIndicator: Accessible SVG spinner with role="status"
 * 8. ProgressIndicatorPrimitive: 4px track progress bar (determinate & indeterminate)
 * 9. DisclosureTrigger: "Why do we ask this?" accessible expandable helper
 * 10. CurrencyPriceText: Tabular figures with RM prefix and strict Kanit/Inter scales
 * Compliance: WCAG 2.2 AA Contrast & WAI-ARIA live regions
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
      className={`ds-label ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
        fontSize: 'var(--ds-font-field-label-size, 0.8125rem)', // 13px
        fontWeight: 'var(--ds-primitive-font-weight-medium, 500)',
        color: 'var(--ds-color-text-label, #334155)',
        marginBottom: 'var(--ds-space-label-to-control, 6px)',
        lineHeight: 1.4,
        ...style,
      }}
      {...props}
    >
      <span>
        {children}
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
        <span
          style={{
            fontSize: 'var(--ds-primitive-font-size-xs, 0.75rem)',
            fontWeight: 400,
            color: 'var(--ds-color-text-muted, #64748B)',
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
      className={`ds-helper ${className}`}
      style={{
        fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
        fontSize: 'var(--ds-primitive-font-size-xs, 0.75rem)', // 12px
        color: 'var(--ds-color-text-muted, #64748B)',
        marginTop: 'var(--ds-space-control-to-helper, 4px)',
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
      className={`ds-helper ds-helper-error ${className}`}
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
   4. INLINE NOTICE ATOM
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
      bg: 'var(--ds-color-surface-brand-tint, #F0FAFA)',
      border: 'var(--ds-primitive-color-teal-200, #AEE7EB)',
      text: 'var(--ds-color-text-link, #066F7B)',
      icon: <Info size={16} color="var(--ds-color-text-link, #066F7B)" aria-hidden="true" />,
    },
    success: {
      bg: 'var(--ds-primitive-color-feedback-emerald-50, #ECFDF5)',
      border: 'var(--ds-primitive-color-feedback-emerald-200, #6EE7B7)',
      text: 'var(--ds-color-text-success, #065F46)',
      icon: <CheckCircle size={16} color="var(--ds-color-text-success, #065F46)" aria-hidden="true" />,
    },
    warning: {
      bg: 'var(--ds-primitive-color-feedback-amber-50, #FFFBEB)',
      border: 'var(--ds-primitive-color-feedback-amber-200, #FCD34D)',
      text: 'var(--ds-color-text-warning, #92400E)',
      icon: <AlertTriangle size={16} color="var(--ds-color-text-warning, #92400E)" aria-hidden="true" />,
    },
    error: {
      bg: 'var(--ds-primitive-color-rose-50, #FEF2F2)',
      border: 'var(--ds-primitive-color-rose-200, #FCA5A5)',
      text: 'var(--ds-primitive-color-rose-700, #B91C1C)',
      icon: <AlertCircle size={16} color="var(--ds-primitive-color-rose-700, #B91C1C)" aria-hidden="true" />,
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
        gap: 'var(--ds-primitive-space-3, 12px)',
        padding: '10px 14px',
        backgroundColor: config.bg,
        border: `1px solid ${config.border}`,
        borderRadius: 'var(--ds-comp-btn-radius, 6px)',
        fontSize: 'var(--ds-primitive-font-size-sm, 0.8125rem)',
        lineHeight: 1.45,
        ...style,
      }}
    >
      <div style={{ flexShrink: 0, marginTop: '2px' }}>{config.icon}</div>
      <div style={{ flex: 1 }}>
        {title && <div style={{ fontWeight: 500, color: config.text, marginBottom: '2px' }}>{title}</div>}
        <div style={{ color: 'var(--ds-color-text-primary, #17253B)' }}>{children}</div>
      </div>
    </div>
  );
};

/* ==========================================================================
   5. BADGE & STATUS INDICATOR ATOM
   ========================================================================== */
export interface BadgeProps {
  variant?: 'teal' | 'navy' | 'neutral' | 'success' | 'warning' | 'error';
  pill?: boolean;
  withDot?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'teal',
  pill = false,
  withDot = false,
  children,
  className = '',
  style,
}) => {
  const styles: Record<string, { bg: string; text: string; border: string; dot: string }> = {
    teal: { bg: 'var(--ds-color-surface-brand-tint, #F0FAFA)', text: 'var(--ds-color-text-link, #066F7B)', border: 'var(--ds-primitive-color-teal-200, #AEE7EB)', dot: 'var(--ds-color-brand-primary, #08A5B5)' },
    navy: { bg: 'var(--ds-primitive-color-navy-100, #DEE5F2)', text: 'var(--ds-color-text-heading, #132766)', border: 'var(--ds-primitive-color-navy-200, #C0CEE5)', dot: 'var(--ds-color-brand-secondary, #132766)' },
    neutral: { bg: 'var(--ds-primitive-color-slate-100, #F1F5F9)', text: 'var(--ds-color-text-secondary, #475569)', border: 'var(--ds-color-border-subtle, #DFE6EC)', dot: 'var(--ds-primitive-color-slate-400, #94A3B8)' },
    success: { bg: 'var(--ds-primitive-color-feedback-emerald-50, #ECFDF5)', text: 'var(--ds-color-text-success, #065F46)', border: 'var(--ds-primitive-color-feedback-emerald-200, #6EE7B7)', dot: 'var(--ds-primitive-color-feedback-emerald-500, #10B981)' },
    warning: { bg: 'var(--ds-primitive-color-feedback-amber-50, #FFFBEB)', text: 'var(--ds-color-text-warning, #92400E)', border: 'var(--ds-primitive-color-feedback-amber-200, #FCD34D)', dot: 'var(--ds-primitive-color-feedback-amber-500, #F59E0B)' },
    error: { bg: 'var(--ds-primitive-color-rose-50, #FEF2F2)', text: 'var(--ds-primitive-color-rose-700, #B91C1C)', border: 'var(--ds-primitive-color-rose-200, #FCA5A5)', dot: 'var(--ds-primitive-color-rose-700, #B91C1C)' },
  };

  const current = styles[variant];

  return (
    <span
      className={`ds-badge ds-badge-${variant} ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: '2px 8px',
        borderRadius: pill ? 'var(--ds-primitive-radius-full, 9999px)' : 'var(--ds-primitive-radius-sm, 4px)',
        backgroundColor: current.bg,
        color: current.text,
        border: `1px solid ${current.border}`,
        fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
        fontSize: 'var(--ds-primitive-font-size-xs, 0.75rem)',
        fontWeight: 'var(--ds-primitive-font-weight-medium, 500)',
        lineHeight: 1.33,
        ...style,
      }}
    >
      {withDot && (
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: current.dot,
            flexShrink: 0,
          }}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
};

export const StatusIndicator = Badge;

/* ==========================================================================
   6. DIVIDER ATOM
   ========================================================================== */
export interface DividerProps {
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const Divider: React.FC<DividerProps> = ({ label, className = '', style }) => {
  if (label) {
    return (
      <div
        className={`ds-divider-with-text ${className}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          margin: 'var(--ds-primitive-space-6, 24px) 0',
          ...style,
        }}
      >
        <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--ds-color-border-subtle, #DFE6EC)' }} />
        <span style={{ fontSize: '0.75rem', color: 'var(--ds-color-text-muted, #64748B)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {label}
        </span>
        <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--ds-color-border-subtle, #DFE6EC)' }} />
      </div>
    );
  }

  return (
    <hr
      className={`ds-divider ${className}`}
      style={{
        border: 'none',
        borderTop: '1px solid var(--ds-color-border-subtle, #DFE6EC)',
        margin: 'var(--ds-primitive-space-6, 24px) 0',
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
        gap: 'var(--ds-primitive-space-2, 8px)',
        color: 'var(--ds-color-brand-primary, #08A5B5)',
      }}
    >
      <Loader2 size={size} className="animate-spin" aria-hidden="true" />
      <span style={{ fontSize: 'var(--ds-primitive-font-size-sm, 0.8125rem)', color: 'var(--ds-color-text-secondary, #475569)' }}>
        {label}
      </span>
    </div>
  );
};

/* ==========================================================================
   8. PROGRESS INDICATOR PRIMITIVE ATOM
   ========================================================================== */
export interface ProgressIndicatorPrimitiveProps {
  value?: number; // 0 to 100
  indeterminate?: boolean;
  height?: number;
  label?: string;
  className?: string;
}

export const ProgressIndicatorPrimitive: React.FC<ProgressIndicatorPrimitiveProps> = ({
  value = 0,
  indeterminate = false,
  height = 4,
  label,
  className = '',
}) => {
  const boundedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={`ds-progress-wrapper ${className}`} style={{ width: '100%' }}>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--ds-color-text-muted, #64748B)', marginBottom: '4px' }}>
          <span>{label}</span>
          {!indeterminate && <span>{Math.round(boundedValue)}%</span>}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : boundedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{
          width: '100%',
          height: `${height}px`,
          backgroundColor: 'var(--ds-primitive-color-slate-100, #F1F5F9)',
          borderRadius: 'var(--ds-primitive-radius-full, 9999px)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            height: '100%',
            backgroundColor: 'var(--ds-color-brand-primary, #08A5B5)',
            width: indeterminate ? '40%' : `${boundedValue}%`,
            borderRadius: 'var(--ds-primitive-radius-full, 9999px)',
            transition: indeterminate ? 'none' : 'width var(--ds-primitive-duration-normal, 200ms) var(--ds-primitive-ease-default)',
            animation: indeterminate ? 'ds-pulse 1.5s infinite ease-in-out' : 'none',
          }}
        />
      </div>
    </div>
  );
};

/* ==========================================================================
   9. DISCLOSURE TRIGGER ATOM ("Why do we ask this?")
   ========================================================================== */
export interface DisclosureTriggerProps {
  label: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  className?: string;
}

export const DisclosureTrigger: React.FC<DisclosureTriggerProps> = ({
  label,
  children,
  defaultExpanded = false,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className={`ds-disclosure-wrapper ${className}`} style={{ marginTop: '4px', marginBottom: '8px' }}>
      <button
        type="button"
        aria-expanded={isExpanded}
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          background: 'none',
          border: 'none',
          padding: '2px 0',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          color: 'var(--ds-color-text-link, #066F7B)',
          fontSize: '0.75rem',
          fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
          fontWeight: 500,
          outline: 'none',
        }}
      >
        <span>{label}</span>
        <ChevronDown
          size={14}
          style={{
            transform: isExpanded ? 'rotate(180deg)' : 'none',
            transition: 'transform var(--ds-primitive-duration-fast, 150ms) var(--ds-primitive-ease-default)',
          }}
          aria-hidden="true"
        />
      </button>

      {isExpanded && (
        <div
          style={{
            padding: '8px 12px',
            backgroundColor: 'var(--ds-primitive-color-slate-100, #F1F5F9)',
            borderRadius: 'var(--ds-comp-btn-radius, 6px)',
            marginTop: '4px',
            fontSize: '0.75rem',
            lineHeight: 1.5,
            color: 'var(--ds-color-text-secondary, #475569)',
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

/* ==========================================================================
   10. CURRENCY / PRICE TEXT ATOM
   ========================================================================== */
export interface CurrencyPriceTextProps {
  amount: number | string;
  prefix?: string;
  suffix?: string;
  size?: 'hero' | 'card' | 'item' | 'compact';
  color?: 'heading' | 'primary' | 'teal' | 'muted';
  className?: string;
  style?: React.CSSProperties;
}

export const CurrencyPriceText: React.FC<CurrencyPriceTextProps> = ({
  amount,
  prefix = 'RM',
  suffix,
  size = 'hero',
  color = 'heading',
  className = '',
  style,
}) => {
  const formattedAmount = typeof amount === 'number'
    ? amount.toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : amount;

  const sizeStyles: Record<string, { font: string; size: string; weight: number }> = {
    hero: { font: 'var(--ds-primitive-font-heading, "Kanit", sans-serif)', size: 'var(--ds-primitive-font-size-xl, 1.5rem)', weight: 500 },
    card: { font: 'var(--ds-primitive-font-heading, "Kanit", sans-serif)', size: 'var(--ds-primitive-font-size-lg, 1.125rem)', weight: 500 },
    item: { font: 'var(--ds-primitive-font-body, "Inter", sans-serif)', size: 'var(--ds-primitive-font-size-base, 0.875rem)', weight: 500 },
    compact: { font: 'var(--ds-primitive-font-body, "Inter", sans-serif)', size: 'var(--ds-primitive-font-size-sm, 0.8125rem)', weight: 400 },
  };

  const colorStyles: Record<string, string> = {
    heading: 'var(--ds-color-text-heading, #132766)',
    primary: 'var(--ds-color-text-primary, #17253B)',
    teal: 'var(--ds-color-brand-primary, #08A5B5)',
    muted: 'var(--ds-color-text-muted, #64748B)',
  };

  const selectedSize = sizeStyles[size];

  return (
    <span
      className={`ds-price ds-price-${size} ds-tabular-num ${className}`}
      style={{
        fontFamily: selectedSize.font,
        fontSize: selectedSize.size,
        fontWeight: selectedSize.weight,
        color: colorStyles[color],
        fontVariantNumeric: 'tabular-nums',
        letterSpacing: size === 'hero' ? '-0.01em' : '0em',
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: '4px',
        ...style,
      }}
    >
      {prefix && (
        <span style={{ fontSize: '0.8em', fontWeight: 500, color: 'var(--ds-color-text-muted, #64748B)' }}>
          {prefix}
        </span>
      )}
      <span>{formattedAmount}</span>
      {suffix && (
        <span style={{ fontSize: '0.75em', fontWeight: 400, color: 'var(--ds-color-text-muted, #64748B)' }}>
          {suffix}
        </span>
      )}
    </span>
  );
};
