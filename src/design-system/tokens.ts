/**
 * DoctorShield Design System — Authoritative TypeScript Tokens
 * Governed by Approved Direction B (Structured Premium Insurance with Typographic Craft)
 * Mirrors: src/design-system/tokens.css with 100% fidelity
 * Brand Foundations: Primary #08A5B5 | Secondary #132766 | Kanit (<=500) | Inter (400, 500)
 * Canvas: #F4F7F9 | Surface: #FFFFFF | Card Border: #DFE6EC | Input Border: #CBD5E1
 * Compliance: WCAG 2.2 AA Strict
 */

export const primitiveColors = {
  teal: {
    50: '#F0FAFA', // Selection surface wash / subtle interactive tint
    100: '#D6F3F5',
    200: '#AEE7EB',
    300: '#78D5DD',
    400: '#3CC0CC',
    500: '#08A5B5', // Official Brand Primary (Accent, Buttons, Focus Ring, Section Bar)
    600: '#068694', // Primary Hover
    700: '#066F7B', // Accessible Interactive Teal (5.89:1 on White)
    800: '#055C66', // High-Contrast Link Teal (7.69:1 on White)
    900: '#04464D',
  },
  navy: {
    50: '#F8FAFB',
    100: '#DEE5F2',
    200: '#C0CEE5',
    300: '#97ADD3',
    400: '#6B89BE',
    500: '#4667A5',
    600: '#324F88',
    700: '#233B6E',
    800: '#192C5B', // Deep Navy Hover
    900: '#132766', // Official Brand Secondary (13.91:1 on White, Header & Display Headings)
  },
  slate: {
    0: '#FFFFFF',   // Pure Card & Panel Surface
    50: '#F4F7F9',  // Authoritative Direction B Slate Canvas
    100: '#F1F5F9', // Section Dividers / Segmented Control Track
    200: '#DFE6EC', // Card & Subtle Separator Border
    300: '#CBD5E1', // Default Input & Form Control Border
    400: '#94A3B8', // Disabled / Placeholder Text
    500: '#64748B', // Micro-Labels / Meta Text (4.62:1)
    600: '#475569', // Secondary Body Text (5.64:1)
    700: '#334155', // Form Field Labels (7.88:1)
    800: '#1E293B', // High-Contrast Field Value Text (11.5:1)
    900: '#0F172A', // Primary Dark Body Text (15.8:1)
  },
  feedback: {
    emerald: {
      50: '#ECFDF5',  // Background
      200: '#6EE7B7', // Border
      500: '#10B981', // Icon
      700: '#047857',
      800: '#065F46', // Text (6.12:1)
    },
    amber: {
      50: '#FFFBEB',  // Background
      200: '#FCD34D', // Border
      500: '#F59E0B', // Icon
      700: '#B45309',
      800: '#92400E', // Text (5.92:1)
    },
    rose: {
      50: '#FEF2F2',  // Background
      200: '#FCA5A5', // Border
      500: '#EF4444', // Control Error Border
      700: '#B91C1C', // Text (5.84:1)
      800: '#991B1B',
    },
    sky: {
      50: '#F0F9FF',  // Background
      200: '#7DD3FC', // Border
      500: '#0EA5E9', // Icon
      700: '#0369A1',
      800: '#075985', // Text (5.51:1)
    },
  },
} as const;

export const semanticColors = {
  text: {
    primary: primitiveColors.slate[900],    // #0F172A
    secondary: primitiveColors.slate[600],  // #475569
    muted: primitiveColors.slate[500],      // #64748B
    label: primitiveColors.slate[700],      // #334155
    value: primitiveColors.slate[800],      // #1E293B
    disabled: primitiveColors.slate[400],   // #94A3B8
    heading: primitiveColors.navy[900],     // #132766
    link: primitiveColors.teal[700],        // #066F7B
    linkHover: primitiveColors.teal[800],   // #055C66
    inverse: primitiveColors.slate[0],      // #FFFFFF
    error: primitiveColors.feedback.rose[700],      // #B91C1C
    success: primitiveColors.feedback.emerald[800], // #065F46
    warning: primitiveColors.feedback.amber[800],   // #92400E
    info: primitiveColors.feedback.sky[800],        // #075985
  },
  surface: {
    canvas: primitiveColors.slate[50],      // #F4F7F9
    card: primitiveColors.slate[0],         // #FFFFFF
    panel: primitiveColors.slate[0],        // #FFFFFF
    subtle: primitiveColors.slate[100],     // #F1F5F9
    brandTint: primitiveColors.teal[50],    // #F0FAFA
    header: primitiveColors.navy[900],      // #132766
    overlay: 'rgba(19, 39, 102, 0.40)',
  },
  border: {
    subtle: primitiveColors.slate[200],     // #DFE6EC
    default: primitiveColors.slate[300],    // #CBD5E1
    strong: primitiveColors.slate[400],     // #94A3B8
    selected: primitiveColors.teal[500],    // #08A5B5
    error: primitiveColors.feedback.rose[500], // #EF4444
    section: primitiveColors.teal[500],     // #08A5B5
  },
  action: {
    primary: {
      bg: primitiveColors.teal[500],        // #08A5B5
      hover: primitiveColors.teal[600],     // #068694
      active: primitiveColors.teal[700],    // #066F7B
      text: primitiveColors.slate[0],       // #FFFFFF
    },
    navy: {
      bg: primitiveColors.navy[900],        // #132766
      hover: primitiveColors.navy[800],     // #192C5B
      text: primitiveColors.slate[0],       // #FFFFFF
    },
    secondary: {
      bg: primitiveColors.slate[0],         // #FFFFFF
      border: primitiveColors.slate[300],   // #CBD5E1
      hover: primitiveColors.slate[100],    // #F1F5F9
      text: primitiveColors.slate[900],     // #0F172A
    },
    disabled: {
      bg: primitiveColors.slate[100],       // #F1F5F9
      text: primitiveColors.slate[400],     // #94A3B8
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
} as const;

export const semanticSpacing = {
  labelToControl: '6px',
  controlToHelper: '4px',
  fieldToField: spacing[5],       // 20px
  fieldRowGap: spacing[4],        // 16px
  headingToContent: '10px',
  sectionToSection: spacing[6],   // 24px
  cardPadding: '24px',
  cardPaddingMobile: '16px',
  pageGutter: spacing[6],         // 24px
  pageGutterMobile: spacing[4],   // 16px
  columnGutter: spacing[8],       // 32px
  financialRow: '6px',
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
  },
  sizes: {
    xs: '0.75rem',    // 12px
    sm: '0.8125rem',  // 13px
    base: '0.9375rem',// 15px - Standard Body & Inputs
    md: '1.0rem',     // 16px
    lg: '1.125rem',   // 18px - Section Headers
    xl: '1.375rem',   // 22px
    '2xl': '1.625rem',// 26px - Hero Total
    '3xl': '1.875rem',// 30px - Page Title
  },
  lineHeights: {
    tight: 1.15,
    snug: 1.25,
    heading: 1.35,
    normal: 1.5,
    relaxed: 1.6,
  },
} as const;

export const radii = {
  none: '0px',
  sm: '4px',    // Badges & chips
  md: '6px',    // Compact controls
  lg: '8px',    // Form inputs, buttons, segmented toggles
  xl: '12px',   // Structural cards
  '2xl': '16px',// Modals, drawers
  full: '9999px',
} as const;

export const layout = {
  appMaxWidth: '1160px',
  formFocusWidth: '720px',
  summaryWidth: '380px',
  headerHeight: '70px',
  stickyOffset: '90px',
} as const;

export const components = {
  input: {
    height: '48px',
    paddingX: '14px',
    radius: radii.lg,
    bg: semanticColors.surface.card,
    border: `1px solid ${semanticColors.border.default}`,
    fontSize: typography.sizes.base,
    textColor: semanticColors.text.primary,
  },
  button: {
    height: '48px',
    heightMobile: '50px',
    heightCompact: '38px',
    paddingX: '20px',
    radius: radii.lg,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
  },
  card: {
    bg: semanticColors.surface.card,
    radius: radii.xl,
    border: `1px solid ${semanticColors.border.subtle}`,
    padding: '24px',
  },
  tile: {
    radius: radii.lg,
    border: `1px solid ${semanticColors.border.default}`,
    bg: semanticColors.surface.card,
    selectedBorder: `2px solid ${semanticColors.border.selected}`,
    selectedBg: primitiveColors.teal[50],
  },
  sectionBar: {
    border: `3px solid ${semanticColors.border.section}`,
    pad: '10px',
  },
  touchTargetMin: '44px',
} as const;

export const dsTokens = {
  colors: primitiveColors,
  semantic: semanticColors,
  spacing,
  semanticSpacing,
  typography,
  radii,
  layout,
  components,
} as const;

export default dsTokens;
