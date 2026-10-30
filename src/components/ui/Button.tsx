import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * DoctorShield Button & IconButton Atoms
 * Standard: Direction B (46px standard touch, 38px compact, 6px radius)
 * Palette:
 * - Primary: Brand Teal #08A5B5, White text, 2px elevation
 * - Navy: Institutional Navy #132766, White text
 * - Secondary: White Surface #FFFFFF, Slate 300 border, Slate 900 text
 * - Ghost: Transparent, Accessible Teal #066F7B text
 * - Destructive: Rose 700 #B91C1C, White text
 * Compliance: WCAG 2.2 SC 2.5.8 (44px touch targets) & Focus Indicators
 */

export type ButtonVariant = 'primary' | 'navy' | 'secondary' | 'ghost' | 'destructive' | 'teal';
export type ButtonSize = 'md' | 'sm' | 'xs';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className = '',
  style,
  children,
  ...props
}, ref) => {
  const isInteractive = !disabled && !loading;

  // Resolved normalized variant ('teal' is alias for 'primary')
  const resolvedVariant = variant === 'teal' ? 'primary' : variant;

  const sizeMetrics = {
    md: {
      height: 'var(--ds-comp-btn-height, 46px)',
      padding: '0 var(--ds-comp-btn-padding-x, 20px)',
      fontSize: 'var(--ds-comp-btn-font-size, 0.875rem)',
      radius: 'var(--ds-comp-btn-radius, 6px)',
      spinnerSize: 18,
    },
    sm: {
      height: 'var(--ds-comp-btn-height-compact, 38px)',
      padding: '0 var(--ds-primitive-space-4, 16px)',
      fontSize: 'var(--ds-primitive-font-size-sm, 0.8125rem)',
      radius: 'var(--ds-comp-btn-radius, 6px)',
      spinnerSize: 15,
    },
    xs: {
      height: '32px',
      padding: '0 var(--ds-primitive-space-3, 12px)',
      fontSize: 'var(--ds-primitive-font-size-xs, 0.75rem)',
      radius: 'var(--ds-primitive-radius-sm, 4px)',
      spinnerSize: 13,
    },
  }[size];

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: 'var(--ds-color-action-primary-bg, #08A5B5)',
      color: 'var(--ds-color-text-inverse, #FFFFFF)',
      borderColor: 'transparent',
      boxShadow: disabled ? 'none' : '0 2px 6px rgba(8, 165, 181, 0.28)',
    },
    navy: {
      backgroundColor: 'var(--ds-color-action-navy-bg, #132766)',
      color: 'var(--ds-color-text-inverse, #FFFFFF)',
      borderColor: 'transparent',
      boxShadow: disabled ? 'none' : '0 2px 6px rgba(19, 39, 102, 0.20)',
    },
    secondary: {
      backgroundColor: 'var(--ds-color-action-secondary-bg, #FFFFFF)',
      color: 'var(--ds-color-text-primary, #17253B)',
      borderColor: 'var(--ds-color-action-secondary-border, #CBD5E1)',
      boxShadow: 'none',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--ds-color-text-link, #066F7B)',
      borderColor: 'transparent',
      boxShadow: 'none',
    },
    destructive: {
      backgroundColor: 'var(--ds-primitive-color-rose-700, #B91C1C)',
      color: 'var(--ds-color-text-inverse, #FFFFFF)',
      borderColor: 'transparent',
      boxShadow: disabled ? 'none' : '0 2px 6px rgba(185, 28, 28, 0.24)',
    },
  };

  const baseStyle: React.CSSProperties = {
    display: fullWidth ? 'flex' : 'inline-flex',
    width: fullWidth ? '100%' : 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--ds-primitive-space-2, 8px)',
    minHeight: sizeMetrics.height,
    height: sizeMetrics.height,
    padding: sizeMetrics.padding,
    borderRadius: sizeMetrics.radius,
    fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
    fontSize: sizeMetrics.fontSize,
    fontWeight: 'var(--ds-comp-btn-font-weight, 500)',
    lineHeight: 1.0,
    letterSpacing: '0.01em',
    cursor: isInteractive ? 'pointer' : 'not-allowed',
    border: '1px solid transparent',
    transition: 'background-color var(--ds-primitive-duration-fast, 150ms) var(--ds-primitive-ease-default), border-color 150ms, box-shadow 150ms',
    textDecoration: 'none',
    boxSizing: 'border-box',
    opacity: disabled ? 0.55 : 1,
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
    ...variantStyles[resolvedVariant],
    ...style,
  };

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      aria-busy={loading}
      className={`ds-btn ds-btn-${resolvedVariant} ds-btn-${size} ${className}`}
      style={baseStyle}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin" size={sizeMetrics.spinnerSize} aria-hidden="true" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="ds-btn-icon-left" aria-hidden="true" style={{ display: 'flex', alignItems: 'center' }}>{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="ds-btn-icon-right" aria-hidden="true" style={{ display: 'flex', alignItems: 'center' }}>{rightIcon}</span>}
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button';

/* ==========================================================================
   2. ICON BUTTON ATOM
   ========================================================================== */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string; // Mandatory for accessibility (aria-label)
  variant?: 'ghost' | 'secondary' | 'primary' | 'navy';
  size?: 'md' | 'sm' | 'xs';
  rounded?: boolean;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(({
  icon,
  label,
  variant = 'ghost',
  size = 'md',
  rounded = false,
  disabled = false,
  className = '',
  style,
  ...props
}, ref) => {
  const sizeBox = {
    md: 46,
    sm: 38,
    xs: 32,
  }[size];

  const variantStylesRecord: Record<'ghost' | 'secondary' | 'primary' | 'navy', React.CSSProperties> = {
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--ds-color-text-secondary, #475569)',
      border: '1px solid transparent',
    },
    secondary: {
      backgroundColor: 'var(--ds-color-surface-card, #FFFFFF)',
      color: 'var(--ds-color-text-primary, #17253B)',
      border: '1px solid var(--ds-color-border-default, #CBD5E1)',
    },
    primary: {
      backgroundColor: 'var(--ds-color-action-primary-bg, #08A5B5)',
      color: '#FFFFFF',
      border: '1px solid transparent',
    },
    navy: {
      backgroundColor: 'var(--ds-color-action-navy-bg, #132766)',
      color: '#FFFFFF',
      border: '1px solid transparent',
    },
  };
  const variantStyle = variantStylesRecord[variant];

  return (
    <div
      className="ds-touch-target"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 'var(--ds-comp-touch-target-min, 44px)',
        minHeight: 'var(--ds-comp-touch-target-min, 44px)',
      }}
    >
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        aria-label={label}
        title={label}
        className={`ds-icon-btn ds-icon-btn-${variant} ${className}`}
        style={{
          width: `${sizeBox}px`,
          height: `${sizeBox}px`,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: rounded ? 'var(--ds-primitive-radius-full, 9999px)' : 'var(--ds-comp-btn-radius, 6px)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          transition: 'all var(--ds-primitive-duration-fast, 150ms) var(--ds-primitive-ease-default)',
          outline: 'none',
          boxSizing: 'border-box',
          padding: 0,
          ...variantStyle,
          ...style,
        }}
        {...props}
      >
        <span aria-hidden="true" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {icon}
        </span>
      </button>
    </div>
  );
});

IconButton.displayName = 'IconButton';
