/**
 * DoctorShield Design System — Strongly Typed TypeScript Tokens
 * Brand Foundations: Primary #08A5B5 | Secondary #132766 | Kanit (<=500) | Inter (400, 500)
 * Foundation: Canvas #F8FAFB | Surface #FFFFFF | Text #17253B | Subtle Border #DFE6EC
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
    700: '#066F7B', // Accessible Interactive Teal (5.89:1 on White)
    800: '#055C66', // High-Contrast Link Teal (7.69:1 on White)
    900: '#04464D',
  },
  navy: {
    50: '#F8FAFB', // Neutral Page Canvas
    100: '#DEE5F2',
    200: '#C0CEE5',
    300: '#97ADD3',
    400: '#6B89BE',
    500: '#4667A5',
    600: '#324F88',
    700: '#233B6E',
    800: '#192C5B',
    900: '#132766', // Official Brand Secondary (13.91:1 on White)
  },
  slate: {
    0: '#FFFFFF',
    50: '#F8FAFB', // Official Canvas
    100: '#F1F5F9', // Inactive Track / Hover
    200: '#DFE6EC', // Official Subtle Border
    300: '#CBD5E1', // Default Control Border
    400: '#94A3B8', // Disabled / Placeholder
    500: '#64748B', // Muted Helper (4.62:1)
    600: '#475569', // Secondary Body (5.64:1)
    700: '#334155', // Form Labels (7.88:1)
    800: '#1E293B',
    900: '#17253B', // Primary Body (13.25:1)
  },
  feedback: {
    emerald: {
      50: '#ECFDF5',
      500: '#10B981',
      700: '#047857',
      800: '#065F46',
    },
    amber: {
      50: '#FFFBEB',
      500: '#F59E0B',
      700: '#B45309',
      800: '#92400E',
    },
    rose: {
      50: '#FEF2F2',
      500: '#EF4444',
      700: '#B91C1C',
      800: '#991B1B',
    },
    sky: {
      50: '#F0F9FF',
      500: '#0EA5E9',
      700: '#0369A1',
      800: '#075985',
    },
  },
} as const;

export const semanticColors = {
  text: {
    primary: primitiveColors.slate[900],    // #17253B
    secondary: primitiveColors.slate[600],  // #475569
    muted: primitiveColors.slate[500],      // #64748B
    disabled: primitiveColors.slate[400],   // #94A3B8
    heading: primitiveColors.navy[900],     // #132766
    link: primitiveColors.teal[800],        // #055C66
    inverse: primitiveColors.slate[0],      // #FFFFFF
    error: primitiveColors.feedback.rose[700],
    success: primitiveColors.feedback.emerald[800],
    warning: primitiveColors.feedback.amber[800],
  },
  surface: {
    canvas: primitiveColors.slate[50],      // #F8FAFB
    card: primitiveColors.slate[0],         // #FFFFFF
    panel: primitiveColors.slate[0],        // #FFFFFF
    subtle: primitiveColors.slate[100],     // #F1F5F9
    brandTint: primitiveColors.teal[50],    // #F0FAFA
    overlay: 'rgba(19, 39, 102, 0.40)',
  },
  border: {
    subtle: primitiveColors.slate[200],     // #DFE6EC
    default: primitiveColors.slate[300],    // #CBD5E1
    strong: primitiveColors.slate[400],     // #94A3B8
    selected: primitiveColors.teal[500],   // #08A5B5
    error: primitiveColors.feedback.rose[500],
  },
  action: {
    primary: primitiveColors.navy[900],     // #132766
    primaryHover: primitiveColors.navy[800],// #192C5B
    teal: primitiveColors.teal[700],        // #066F7B
    tealHover: primitiveColors.teal[800],   // #055C66
    secondaryBg: primitiveColors.slate[0],  // #FFFFFF
    secondaryBorder: primitiveColors.slate[300],
    disabledBg: primitiveColors.slate[100],
    disabledText: primitiveColors.slate[400],
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
} as const;

export const typography = {
  fonts: {
    heading: "'Kanit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },
  weights: {
    regular: 400,
    medium: 500,
    bold: 500, // Strictly enforced: Kanit & Inter <= 500
  },
  sizes: {
    xs: '0.75rem',    // 12px
    sm: '0.8125rem',  // 13px
    base: '0.875rem', // 14px
    md: '1.0rem',     // 16px
    lg: '1.25rem',    // 20px
    xl: '1.5rem',     // 24px
    '2xl': '1.75rem', // 28px
  },
  lineHeights: {
    tight: 1.2,
    snug: 1.33,
    normal: 1.5,
    relaxed: 1.6,
  },
} as const;

export const radii = {
  none: '0px',
  sm: '4px',
  md: '6px',   // Controls & Buttons
  lg: '8px',   // Inputs & Tiles
  xl: '10px',  // Panels / Cards
  '2xl': '12px', // Modals
  full: '9999px',
} as const;

export const layout = {
  appMaxWidth: '1120px',
  formColumnWidth: '600px',
  summaryWidth: '320px',
  columnGutter: '48px',
  headerHeight: '52px',
  headerHeightMobile: '48px',
  readingMaxWidth: '680px',
} as const;

export const controls = {
  inputHeight: '48px',
  buttonHeight: '48px',
  buttonHeightCompact: '36px',
  touchTargetMin: '44px',
} as const;

export default {
  primitiveColors,
  semanticColors,
  spacing,
  typography,
  radii,
  layout,
  controls,
};
