import React from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
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
    minHeight: size === 'md' ? 'var(--ds-comp-btn-height-md)' : 'var(--ds-comp-btn-height-sm)',
    padding: size === 'md' ? '0 var(--ds-comp-btn-padding-x)' : '0 var(--ds-primitive-space-4)',
    borderRadius: 'var(--ds-comp-btn-radius)',
    fontFamily: 'var(--ds-primitive-font-body)',
    fontSize: size === 'md' ? 'var(--ds-primitive-font-size-base)' : 'var(--ds-primitive-font-size-sm)',
    fontWeight: 'var(--ds-primitive-font-weight-medium)',
    lineHeight: 1,
    cursor: isInteractive ? 'pointer' : 'not-allowed',
    border: '1px solid transparent',
    transition: 'all var(--ds-primitive-duration-fast) var(--ds-primitive-ease-default)',
    textDecoration: 'none',
    boxSizing: 'border-box',
    opacity: disabled ? 0.6 : 1,
  };

  const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
    primary: {
      backgroundColor: 'var(--ds-color-action-primary)', // #066F7B (5.89:1)
      color: 'var(--ds-primitive-color-slate-0)',
      borderColor: 'transparent',
    },
    secondary: {
      backgroundColor: 'var(--ds-color-action-secondary)', // #132766 (13.91:1)
      color: 'var(--ds-primitive-color-slate-0)',
      borderColor: 'transparent',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--ds-color-text-secondary)',
      borderColor: 'var(--ds-color-border-subtle)',
    },
    destructive: {
      backgroundColor: 'var(--ds-primitive-color-rose-700)',
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
          <Loader2 className="animate-spin" size={size === 'md' ? 20 : 16} aria-hidden="true" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="ds-btn-icon-left" aria-hidden="true">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="ds-btn-icon-right" aria-hidden="true">{rightIcon}</span>}
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button';

