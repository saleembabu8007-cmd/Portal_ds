import React from 'react';

/**
 * DoctorShield Typography Atoms
 * Hierarchy: Kanit (Headings, 400-500 strictly) | Inter (Body, Forms, Actions, 400-500)
 * Compliance: WCAG 2.2 AA Contrast & Invariant Rule 4.2
 */

export type HeadingLevel = 'display' | 1 | 2 | 3 | 4;

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
  weight?: 400 | 500; // Strictly enforced: Kanit <= 500
  children: React.ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({
  level = 1,
  as,
  weight = 500,
  className = '',
  style,
  children,
  ...props
}) => {
  const Component = as || (level === 'display' ? 'h1' : (`h${level}` as const));

  const sizeStyles: Record<HeadingLevel, React.CSSProperties> = {
    display: { fontSize: 'var(--ds-primitive-font-size-2xl)', lineHeight: 1.28, letterSpacing: '-0.015em' }, // 28px
    1: { fontSize: 'var(--ds-primitive-font-size-xl)', lineHeight: 1.33, letterSpacing: '-0.01em' },        // 24px
    2: { fontSize: 'var(--ds-primitive-font-size-lg)', lineHeight: 1.4, letterSpacing: '0em' },            // 20px
    3: { fontSize: 'var(--ds-primitive-font-size-md)', lineHeight: 1.5, letterSpacing: '0em' },            // 16px
    4: { fontSize: 'var(--ds-primitive-font-size-base)', lineHeight: 1.43, letterSpacing: '0em' },         // 14px
  };

  const combinedStyle: React.CSSProperties = {
    fontFamily: 'var(--ds-primitive-font-heading)',
    fontWeight: weight,
    color: 'var(--ds-color-text-heading)',
    margin: 0,
    ...sizeStyles[level],
    ...style,
  };

  return (
    <Component style={combinedStyle} className={`ds-heading ds-heading-${level} ${className}`} {...props}>
      {children}
    </Component>
  );
};

export type TextVariant = 'lead' | 'body' | 'small' | 'caption' | 'legal' | 'mono';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  color?: 'primary' | 'secondary' | 'muted' | 'inverse' | 'error' | 'success' | 'warning' | 'link';
  as?: 'p' | 'span' | 'div' | 'label' | 'strong' | 'small';
  weight?: 400 | 500;
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  color = 'primary',
  as = 'p',
  weight,
  className = '',
  style,
  children,
  ...props
}) => {
  const Component = as as any;

  const variantStyles: Record<TextVariant, React.CSSProperties> = {
    lead: { fontSize: 'var(--ds-primitive-font-size-md)', lineHeight: 1.5, fontFamily: 'var(--ds-primitive-font-body)' },    // 16px
    body: { fontSize: 'var(--ds-primitive-font-size-base)', lineHeight: 1.43, fontFamily: 'var(--ds-primitive-font-body)' },// 14px
    small: { fontSize: 'var(--ds-primitive-font-size-sm)', lineHeight: 1.38, fontFamily: 'var(--ds-primitive-font-body)' }, // 13px
    caption: { fontSize: 'var(--ds-primitive-font-size-xs)', lineHeight: 1.33, fontFamily: 'var(--ds-primitive-font-body)' }, // 12px
    legal: { fontSize: 'var(--ds-primitive-font-size-sm)', lineHeight: 1.54, fontFamily: 'var(--ds-primitive-font-body)' },   // 13px readable legal
    mono: { fontSize: 'var(--ds-primitive-font-size-sm)', lineHeight: 1.38, fontFamily: 'var(--ds-primitive-font-mono)', fontVariantNumeric: 'tabular-nums' },
  };

  const colorStyles: Record<string, string> = {
    primary: 'var(--ds-color-text-primary)',
    secondary: 'var(--ds-color-text-secondary)',
    muted: 'var(--ds-color-text-muted)',
    inverse: 'var(--ds-color-text-inverse)',
    error: 'var(--ds-color-text-error)',
    success: 'var(--ds-color-text-success)',
    warning: 'var(--ds-color-text-warning)',
    link: 'var(--ds-color-text-link)',
  };

  const combinedStyle: React.CSSProperties = {
    color: colorStyles[color] || 'inherit',
    fontWeight: weight || (variant === 'lead' ? 500 : 400),
    margin: 0,
    ...variantStyles[variant],
    ...style,
  };

  return (
    <Component style={combinedStyle} className={`ds-text ds-text-${variant} ${className}`} {...props}>
      {children}
    </Component>
  );
};

export interface TextLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  isExternal?: boolean;
  children: React.ReactNode;
}

export const TextLink: React.FC<TextLinkProps> = ({
  href,
  isExternal = false,
  className = '',
  style,
  children,
  ...props
}) => {
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={`ds-text-link ${className}`}
      style={{
        color: 'var(--ds-color-text-link)',
        textDecoration: 'underline',
        textUnderlineOffset: '3px',
        fontWeight: 500,
        fontFamily: 'var(--ds-primitive-font-body)',
        cursor: 'pointer',
        transition: 'color var(--ds-primitive-duration-fast) var(--ds-primitive-ease-default)',
        ...style,
      }}
      {...props}
    >
      {children}
    </a>
  );
};
