import React from 'react';

export type HeadingLevel = 'display' | 1 | 2 | 3 | 4;

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
  weight?: 400 | 500; // Strict Invariant: Kanit <= 500 weight
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
    display: { fontSize: 'var(--ds-primitive-font-size-4xl)', lineHeight: 1.2, letterSpacing: '-0.02em' },
    1: { fontSize: 'var(--ds-primitive-font-size-3xl)', lineHeight: 1.25, letterSpacing: '-0.015em' },
    2: { fontSize: 'var(--ds-primitive-font-size-2xl)', lineHeight: 1.3, letterSpacing: '-0.01em' },
    3: { fontSize: 'var(--ds-primitive-font-size-xl)', lineHeight: 1.35, letterSpacing: '0em' },
    4: { fontSize: 'var(--ds-primitive-font-size-lg)', lineHeight: 1.4, letterSpacing: '0em' },
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
    <Component style={combinedStyle} className={`ds-heading ${className}`} {...props}>
      {children}
    </Component>
  );
};

export type TextVariant = 'lead' | 'body' | 'small' | 'caption' | 'mono';

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: TextVariant;
  color?: 'primary' | 'secondary' | 'muted' | 'inverse' | 'error' | 'success' | 'link';
  as?: 'p' | 'span' | 'div' | 'label' | 'strong' | 'small';
  weight?: 400 | 500 | 600;
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
  const Component = as;

  const variantStyles: Record<TextVariant, React.CSSProperties> = {
    lead: { fontSize: 'var(--ds-primitive-font-size-lg)', lineHeight: 1.5, fontFamily: 'var(--ds-primitive-font-body)' },
    body: { fontSize: 'var(--ds-primitive-font-size-base)', lineHeight: 1.5, fontFamily: 'var(--ds-primitive-font-body)' },
    small: { fontSize: 'var(--ds-primitive-font-size-sm)', lineHeight: 1.45, fontFamily: 'var(--ds-primitive-font-body)' },
    caption: { fontSize: 'var(--ds-primitive-font-size-xs)', lineHeight: 1.4, fontFamily: 'var(--ds-primitive-font-body)' },
    mono: { fontSize: 'var(--ds-primitive-font-size-sm)', lineHeight: 1.4, fontFamily: 'var(--ds-primitive-font-mono)', fontVariantNumeric: 'tabular-nums' },
  };

  const colorStyles: Record<string, string> = {
    primary: 'var(--ds-color-text-primary)',
    secondary: 'var(--ds-color-text-secondary)',
    muted: 'var(--ds-color-text-muted)',
    inverse: 'var(--ds-color-text-inverse)',
    error: 'var(--ds-color-text-error)',
    success: 'var(--ds-color-text-success)',
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

