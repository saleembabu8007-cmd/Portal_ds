import React from 'react';
import { ExternalLink } from 'lucide-react';

/**
 * DoctorShield Typography Atoms
 * Hierarchy:
 * - Headings: Kanit (Weight strictly 400 or 500, never bold 600+)
 * - Body / UI: Inter (Weight strictly 400 or 500)
 * Includes: Heading, Text, TextLink (Link)
 * Compliance: Invariant Rule 4.2 (Kanit & Inter <= 500) & WCAG 2.2 AA Contrast
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
    display: { fontSize: 'var(--ds-primitive-font-size-2xl, 2rem)', lineHeight: 1.2, letterSpacing: '-0.02em' },   // 32px
    1: { fontSize: 'var(--ds-primitive-font-size-xl, 1.5rem)', lineHeight: 1.25, letterSpacing: '-0.015em' },      // 24px
    2: { fontSize: 'var(--ds-primitive-font-size-lg, 1.125rem)', lineHeight: 1.33, letterSpacing: '-0.01em' },     // 18px
    3: { fontSize: 'var(--ds-primitive-font-size-md, 1rem)', lineHeight: 1.4, letterSpacing: '0em' },              // 16px
    4: { fontSize: 'var(--ds-primitive-font-size-base, 0.875rem)', lineHeight: 1.43, letterSpacing: '0em' },        // 14px
  };

  const combinedStyle: React.CSSProperties = {
    fontFamily: 'var(--ds-primitive-font-heading, "Kanit", sans-serif)',
    fontWeight: Math.min(weight, 500), // Strict ceiling: never > 500
    color: 'var(--ds-color-text-heading, #132766)',
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
  color?: 'primary' | 'secondary' | 'muted' | 'inverse' | 'error' | 'success' | 'warning' | 'link' | 'heading';
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
    lead: { fontSize: '1rem', lineHeight: 1.5, fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)' },       // 16px
    body: { fontSize: '0.875rem', lineHeight: 1.5, fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)' },   // 14px
    small: { fontSize: '0.8125rem', lineHeight: 1.4, fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)' }, // 13px
    caption: { fontSize: '0.75rem', lineHeight: 1.35, fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)' },// 12px
    legal: { fontSize: '0.75rem', lineHeight: 1.5, fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)' },  // 12px readable legal
    mono: { fontSize: '0.8125rem', lineHeight: 1.4, fontFamily: 'var(--ds-primitive-font-mono, monospace)', fontVariantNumeric: 'tabular-nums' },
  };

  const colorStyles: Record<string, string> = {
    primary: 'var(--ds-color-text-primary, #17253B)',
    secondary: 'var(--ds-color-text-secondary, #475569)',
    muted: 'var(--ds-color-text-muted, #64748B)',
    heading: 'var(--ds-color-text-heading, #132766)',
    inverse: 'var(--ds-color-text-inverse, #FFFFFF)',
    error: 'var(--ds-primitive-color-rose-700, #B91C1C)',
    success: 'var(--ds-color-text-success, #065F46)',
    warning: 'var(--ds-color-text-warning, #92400E)',
    link: 'var(--ds-color-text-link, #066F7B)',
  };

  const combinedStyle: React.CSSProperties = {
    color: colorStyles[color] || 'inherit',
    fontWeight: Math.min(weight || (variant === 'lead' ? 500 : 400), 500),
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

/* ==========================================================================
   3. TEXT LINK ATOM
   ========================================================================== */
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
        color: 'var(--ds-color-text-link, #066F7B)',
        textDecoration: 'underline',
        textUnderlineOffset: '3px',
        fontWeight: 500,
        fontFamily: 'var(--ds-primitive-font-body, "Inter", sans-serif)',
        fontSize: 'inherit',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        transition: 'color var(--ds-primitive-duration-fast, 150ms) var(--ds-primitive-ease-default)',
        ...style,
      }}
      {...props}
    >
      <span>{children}</span>
      {isExternal && <ExternalLink size={12} aria-hidden="true" style={{ flexShrink: 0 }} />}
    </a>
  );
};

export const Link = TextLink;
