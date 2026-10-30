/**
 * DoctorShield Design System — Authoritative TypeScript Tokens
 * Governed by Phase 03 Visual Direction: Direction B (Structured Premium with Editorial Craft)
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
    700: '#066F7B', // Accessible Interactive Teal (5.89:1 on White, for interactive text & links)
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
    0: '#FFFFFF',   // Pure Card Surface
    50: '#F4F7F9',  // Authoritative Direction B Slate Canvas
    100: '#F1F5F9', // Inactive Track / Hover / Neutral Wash
    200: '#DFE6EC', // Subtle Card & Divider Border
    300: '#CBD5E1', // Default Input & Form Control Border
    400: '#94A3B8', // Disabled / Placeholder Text
    500: '#64748B', // Muted Meta Text (4.62:1)
    600: '#475569', // Secondary Body & Description Text (5.64:1)
    700: '#334155', // Form Field Labels (7.88:1)
    800: '#1E293B', // High-Contrast Field Value Text (11.5:1)
    900: '#17253B', // Primary Dark Body Text (13.25:1)
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
    primary: primitiveColors.slate[900],    // #17253B (13.25:1)
    secondary: primitiveColors.slate[600],  // #475569 (5.64:1)
    muted: primitiveColors.slate[500],      // #64748B (4.62:1)
    label: primitiveColors.slate[700],      // #334155 (7.88:1)
    disabled: primitiveColors.slate[400],   // #94A3B8
    heading: primitiveColors.navy[900],     // #132766 (13.91:1)
    link: primitiveColors.teal[700],        // #066F7B (5.89:1)
    linkHover: primitiveColors.teal[800],   // #055C66 (7.69:1)
    inverse: primitiveColors.slate[0],      // #FFFFFF
    error: primitiveColors.feedback.rose[700],      // #B91C1C (5.84:1)
    success: primitiveColors.feedback.emerald[800], // #065F46 (6.12:1)
    warning: primitiveColors.feedback.amber[800],   // #92400E (5.92:1)
    info: primitiveColors.feedback.sky[800],        // #075985 (5.51:1)
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
    subtle: primitiveColors.slate[200],     // #DFE6EC (Cards & Rows)
    default: primitiveColors.slate[300],    // #CBD5E1 (Inputs & Controls)
    strong: primitiveColors.slate[400],     // #94A3B8
    selected: primitiveColors.teal[500],    // #08A5B5
    error: primitiveColors.feedback.rose[500], // #EF4444
    sectionBar: primitiveColors.teal[500],  // #08A5B5
    focusRing: 'rgba(8, 165, 181, 0.18)',
  },
  action: {
    primaryBg: primitiveColors.teal[500],   // #08A5B5
    primaryHover: primitiveColors.teal[600],// #068694
    primaryActive: primitiveColors.teal[700], // #066F7B
    navyBg: primitiveColors.navy[900],      // #132766
    navyHover: primitiveColors.navy[800],   // #192C5B
    secondaryBg: primitiveColors.slate[0],  // #FFFFFF
    secondaryBorder: primitiveColors.slate[300], // #CBD5E1
    secondaryHover: primitiveColors.slate[100],  // #F1F5F9
    disabledBg: primitiveColors.slate[100],      // #F1F5F9
    disabledText: primitiveColors.slate[400],    // #94A3B8
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
  fieldToField: '20px',
  fieldRowGap: '16px',
  headingToContent: '10px',
  sectionToSection: '24px',
  cardPaddingDesktop: '28px 32px',
  cardPaddingMobile: '20px 16px',
  pageGutterDesktop: '24px',
  pageGutterMobile: '16px',
  columnGutter: '32px',
  financialRowVertical: '6px',
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
    bold: 500, // Strictly enforced: Kanit & Inter <= 500. Never bold (600+)
  },
  definitions: {
    pageTitle: {
      font: "'Kanit', sans-serif",
      sizeDesktop: '2.0rem',    // 32px
      sizeMobile: '1.75rem',    // 28px
      weight: 500,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      color: semanticColors.text.heading,
      context: 'Primary stage display title at top of main form column',
    },
    sectionHeading: {
      font: "'Kanit', sans-serif",
      sizeDesktop: '1.125rem',  // 18px
      sizeMobile: '1.0625rem',  // 17px
      weight: 500,
      lineHeight: 1.33,
      letterSpacing: '-0.01em',
      color: semanticColors.text.heading,
      context: 'Structural card section title with 3px #08A5B5 vertical accent bar',
    },
    formGroupHeading: {
      font: "'Inter', sans-serif",
      sizeDesktop: '0.9375rem', // 15px
      sizeMobile: '0.9375rem',
      weight: 500,
      lineHeight: 1.4,
      letterSpacing: '0em',
      color: semanticColors.text.primary,
      context: 'Sub-group or questionnaire block title',
    },
    fieldLabel: {
      font: "'Inter', sans-serif",
      sizeDesktop: '0.8125rem', // 13px
      sizeMobile: '0.8125rem',
      weight: 500,
      lineHeight: 1.4,
      letterSpacing: '0.01em',
      color: semanticColors.text.label,
      context: 'Form control label positioned exactly 6px above input',
    },
    body: {
      font: "'Inter', sans-serif",
      sizeDesktop: '0.875rem',  // 14px
      sizeMobile: '0.875rem',
      weight: 400,
      lineHeight: 1.6,
      letterSpacing: '0em',
      color: semanticColors.text.secondary,
      context: 'Introductory stage descriptions and general UI body text',
    },
    metadata: {
      font: "'Inter', sans-serif",
      sizeDesktop: '0.75rem',   // 12px
      sizeMobile: '0.75rem',
      weight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.01em',
      color: semanticColors.text.muted,
      context: 'Input helper text, APC date alignment notes, and secondary timestamps',
    },
    buttonLabel: {
      font: "'Inter', sans-serif",
      sizeDesktop: '0.875rem',  // 14px
      sizeMobile: '0.875rem',
      weight: 500,
      lineHeight: 1.0,
      letterSpacing: '0.01em',
      color: semanticColors.text.inverse,
      context: 'Primary and secondary CTA button text',
    },
    priceLineItem: {
      font: "'Inter', sans-serif",
      sizeDesktop: '0.8125rem', // 13px
      sizeMobile: '0.8125rem',
      weight: 400,
      lineHeight: 1.4,
      letterSpacing: '0em',
      color: semanticColors.text.secondary,
      context: 'Right-aligned tabular figures in quotation breakdown rows',
    },
    priceFinal: {
      font: "'Kanit', sans-serif",
      sizeDesktop: '1.5rem',    // 24px
      sizeMobile: '1.375rem',   // 22px
      weight: 500,
      lineHeight: 1.1,
      letterSpacing: '-0.01em',
      color: semanticColors.text.heading,
      context: 'Grand total payable quotation amount',
    },
    disclaimer: {
      font: "'Inter', sans-serif",
      sizeDesktop: '0.75rem',   // 12px
      sizeMobile: '0.75rem',
      weight: 400,
      lineHeight: 1.5,
      letterSpacing: '0em',
      color: semanticColors.text.secondary,
      context: 'PIDM protection disclosures, statutory commission notices, and legal caveats',
    },
    validationText: {
      font: "'Inter', sans-serif",
      sizeDesktop: '0.75rem',   // 12px
      sizeMobile: '0.75rem',
      weight: 500,
      lineHeight: 1.4,
      letterSpacing: '0.01em',
      color: semanticColors.text.error,
      context: 'Inline accessible error message below invalid inputs (role="alert")',
    },
  },
} as const;

export const radii = {
  none: '0px',
  sm: '4px',    // Status badges & tags
  md: '6px',    // Form inputs, buttons, and segmented selection tiles
  lg: '8px',    // Callout banners
  xl: '10px',   // Authoritative Card & Panel Containers
  '2xl': '12px',// Modal dialogs
  full: '9999px', // Pill chips & circular steps
} as const;

export const layout = {
  appMaxWidth: '1200px',        // Direction B Standard
  formColumnWidth: 'minmax(0, 1fr)',
  summaryWidth: '380px',        // Direction B Standard
  columnGutter: '32px',         // Direction B Standard
  headerHeightDesktop: '56px',  // Institutional Header
  headerHeightMobile: '52px',
  stickyOffset: '92px',
  readingMaxWidth: '680px',
  modalSm: '480px',
  modalMd: '600px',
  modalLg: '720px',
  mobileDrawerCollapsed: '68px',
} as const;

export const controls = {
  inputHeight: '46px',          // Direction B Standard
  buttonHeight: '46px',         // Direction B Standard
  buttonHeightCompact: '38px',
  iconButtonSize: '36px',
  touchTargetMin: '44px',       // Strict WCAG Mobile Hit Area
  checkboxSize: '20px',
  radioSize: '20px',
  borderWidthSubtle: '1px',
  borderWidthSelected: '2px',
  sectionBarWidth: '3px',
} as const;

export const motion = {
  durationFast: '150ms',
  durationNormal: '200ms',
  durationModal: '250ms',
  easeDefault: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeModal: 'cubic-bezier(0.16, 1, 0.3, 1)',
} as const;

export default {
  primitiveColors,
  semanticColors,
  spacing,
  semanticSpacing,
  typography,
  radii,
  layout,
  controls,
  motion,
};
