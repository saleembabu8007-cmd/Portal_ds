/**
 * DoctorShield Design System - Strongly Typed TypeScript Tokens
 * Brand Foundations: Primary #08A5B5 | Secondary #132766 | Kanit (<=500) | Inter
 * Compliance: WCAG 2.2 AA Strict
 */

export const primitiveColors = {
  teal: {
    50: '#F0FAFA',
    100: '#D6F3F5',
    200: '#AEE7EB',
    300: '#78D5DD',
    400: '#3CC0CC',
    500: '#08A5B5', // Official Brand Primary
    600: '#068694',
    700: '#066F7B', // Accessible Interactive Teal (5.89:1)
    800: '#055C66', // High-Contrast Link Teal (7.69:1)
    900: '#04464D',
  },
  navy: {
    50: '#F1F4FA',
    100: '#DEE5F2',
    200: '#C0CEE5',
    300: '#97ADD3',
    400: '#6B89BE',
    500: '#4667A5',
    600: '#324F88',
    700: '#233B6E',
    800: '#192C5B',
    900: '#132766', // Official Brand Secondary (13.91:1)
  },
  slate: {
    0: '#FFFFFF',
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
  feedback: {
    emerald: {
      50: '#ECFDF5',
      500: '#10B981',
      700: '#047857',
    },
    amber: {
      50: '#FFFBEB',
      500: '#F59E0B',
      800: '#92400E',
    },
    rose: {
      50: '#FFF1F2',
      500: '#F43F5E',
      700: '#BE123C',
    },
    sky: {
      50: '#F0F9FF',
      500: '#0EA5E9',
      700: '#0369A1',
    },
  },
} as const;

export const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
} as const;

export const typography = {
  fonts: {
    heading: "'Kanit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },
  weights: {
    regular: 400,
    medium: 500, // Maximum allowable weight for Kanit
    semibold: 600, // Inter body / labels only
  },
  sizes: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1.0rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '2.0rem', // 32px
    '4xl': '2.5rem', // 40px
  },
  lineHeights: {
    tight: 1.2,
    snug: 1.3,
    normal: 1.5,
    relaxed: 1.65,
  },
} as const;

export const semanticTokens = {
  text: {
    primary: 'var(--ds-primitive-color-slate-900)',
    secondary: 'var(--ds-primitive-color-slate-600)',
    muted: 'var(--ds-primitive-color-slate-500)',
    heading: 'var(--ds-primitive-color-navy-900)',
    link: 'var(--ds-primitive-color-teal-800)',
    inverse: 'var(--ds-primitive-color-slate-0)',
    error: 'var(--ds-primitive-color-rose-700)',
    success: 'var(--ds-primitive-color-emerald-700)',
  },
  surface: {
    canvas: 'var(--ds-primitive-color-navy-50)',
    card: 'var(--ds-primitive-color-slate-0)',
    subtle: 'var(--ds-primitive-color-slate-50)',
    brandTint: 'var(--ds-primitive-color-teal-50)',
    overlay: 'rgba(19, 39, 102, 0.60)',
  },
  border: {
    subtle: 'var(--ds-primitive-color-slate-200)',
    default: 'var(--ds-primitive-color-slate-300)',
    selected: 'var(--ds-primitive-color-teal-500)',
    error: 'var(--ds-primitive-color-rose-500)',
  },
  action: {
    primary: 'var(--ds-primitive-color-teal-700)',
    primaryHover: 'var(--ds-primitive-color-teal-800)',
    secondary: 'var(--ds-primitive-color-navy-900)',
    secondaryHover: 'var(--ds-primitive-color-navy-800)',
  },
  focus: {
    ring: 'var(--ds-primitive-color-teal-500)',
    offset: 'var(--ds-primitive-color-slate-0)',
  },
} as const;

export const componentTokens = {
  input: {
    height: '3.0rem', // 48px fixed touch target
    paddingX: 'var(--ds-primitive-space-4)',
    paddingY: 'var(--ds-primitive-space-3)',
    radius: 'var(--ds-primitive-radius-md)',
  },
  button: {
    heightMd: '3.0rem', // 48px
    heightSm: '2.5rem', // 40px
    paddingX: 'var(--ds-primitive-space-6)',
    radius: 'var(--ds-primitive-radius-md)',
  },
  card: {
    padding: 'var(--ds-primitive-space-6)',
    radius: 'var(--ds-primitive-radius-lg)',
  },
  stepper: {
    circleSize: '2.25rem', // 36px
    trackHeight: '2px',
  },
} as const;

export type PrimitiveColor = typeof primitiveColors;
export type Spacing = typeof spacing;
export type Typography = typeof typography;
export type SemanticTokens = typeof semanticTokens;
export type ComponentTokens = typeof componentTokens;

