import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * DoctorShield Button Atoms
 * Hierarchy:
 * - Primary: Dominant single action per task (Deep Navy #132766, 48px height, 6px radius)
 * - Secondary: Subordinate action (White with #CBD5E1 border, #132766 text)
 * - Tertiary / Ghost: Contextual / back actions (Transparent, #055C66 text)
 * - Destructive: Removal or cancellation (#B91C1C)
 * Sizing: md (48px standard touch), sm (36px compact)
 */

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'teal';
export type ButtonSize = 'md' | 'sm';

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

  const baseStyle: React.CSSProperties = {
    display: fullWidth ? 'flex' : 'inline-flex',
    width: fullWidth ? '100%' : 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--ds-primitive-space-2)',
    minHeight: size === 'md' ? 'var(--ds-comp-btn-height)' : 'var(--ds-comp-btn-height-compact)',
    padding: size === 'md' ? '0 var(--ds-comp-btn-padding-x)' : '0 var(--ds-primitive-space-4)',
    borderRadius: 'var(--ds-comp-btn-radius)',
    fontFamily: 'var(--ds-primitive-font-body)',
    fontSize: size === 'md' ? 'var(--ds-comp-btn-font-size)' : 'var(--ds-primitive-font-size-base)',
    fontWeight: 'var(--ds-primitive-font-weight-medium)',
    lineHeight: 1.2,
    cursor: isInteractive ? 'pointer' : 'not-allowed',
    border: '1px solid transparent',
    transition: 'all var(--ds-primitive-duration-fast) var(--ds-primitive-ease-default)',
    textDecoration: 'none',
    boxSizing: 'border-box',
    opacity: disabled ? 0.6 : 1,
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
  };

  const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
    primary: {
      backgroundColor: 'var(--ds-color-action-primary)', // #132766 Deep Navy
      color: 'var(--ds-primitive-color-slate-0)',
      borderColor: 'transparent',
    },
    secondary: {
      backgroundColor: 'var(--ds-color-action-secondary-bg)', // #FFFFFF
      color: 'var(--ds-color-action-primary)',
      borderColor: 'var(--ds-color-action-secondary-border)', // #CBD5E1
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--ds-color-text-link)', // #055C66
      borderColor: 'transparent',
    },
    destructive: {
      backgroundColor: 'var(--ds-primitive-color-rose-700)', // #B91C1C
      color: 'var(--ds-primitive-color-slate-0)',
      borderColor: 'transparent',
    },
    teal: {
      backgroundColor: 'var(--ds-color-action-teal)', // #066F7B (Accessible Teal)
      color: 'var(--ds-primitive-color-slate-0)',
      borderColor: 'transparent',
    },
  };

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      aria-busy={loading}
      className={`ds-btn ds-btn-${variant} ds-btn-${size} ${className}`}
      style={{
        ...baseStyle,
        ...variantStyles[variant],
        ...style,
      }}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin" size={size === 'md' ? 18 : 14} aria-hidden="true" />
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
