# DoctorShield Design System — Foundation System Architecture

> **Document Reference:** `DOC-DS-FOUNDATION-2026-10-29`  
> **Status:** Production Design System Specification  
> **Author:** Principal Design Systems Architect  
> **Mandate:** Rebuild the complete DoctorShield visual foundation using the approved Direction B (Structured Minimal) design direction, establishing a production-grade token system.

---

## 1. Design System Architecture Overview

The DoctorShield Design System is engineered as a **3-Tier Token Hierarchy**:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ TIER 1: PRIMITIVE TOKENS (Raw Constants)                                    │
│ • Raw color ramps (Teal, Navy, Slate, Feedback)                            │
│ • Base 4px spacing scale (0px to 80px)                                      │
│ • Raw font families (Kanit, Inter), sizes, and weights                      │
│ • Base radii (4px, 6px, 8px, 10px, 12px)                                    │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ TIER 2: SEMANTIC TOKENS (Intent & Role Driven)                              │
│ • Text roles: primary (#17253B), secondary (#475569), heading (#132766)     │
│ • Surface roles: canvas (#F8FAFB), panel (#FFFFFF), subtle (#F1F5F9)        │
│ • Border roles: subtle (#DFE6EC), default (#CBD5E1), selected (#08A5B5)     │
│ • Layout roles: app-max (1120px), form-col (600px), summary (320px)         │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ TIER 3: COMPONENT-LEVEL TOKENS (Element Specific)                           │
│ • Input: 48px height, 8px radius, 16px font-size                            │
│ • Button: 48px height, 6px radius, 15px font-size                           │
│ • Panel: 10px radius, 1px subtle border, 0 1px 2px elevation                │
│ • Segmented Tile: 48px height, 8px radius, 44px min touch target           │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Color Foundation

The color system enforces strict monochromatic quietness, reserving brand colors for deliberate functional roles:

```
+─────────────────────────────────────────────────────────────────────────────+
|                              CORE PALETTE ROLES                             |
+───────────────────────────┬─────────────┬───────────────────────────────────+
| Token Name                | Hex Value   | Semantic Role                     |
+───────────────────────────┼─────────────┼───────────────────────────────────+
| `--ds-color-surface-canvas`| #F8FAFB    | Calming, neutral page canvas      |
| `--ds-color-surface-panel` | #FFFFFF    | Structural form panels & cards    |
| `--ds-color-text-primary`  | #17253B    | High-contrast body text (13.25:1) |
| `--ds-color-text-heading`  | #132766    | Authoritative headings (13.91:1)  |
| `--ds-color-border-subtle` | #DFE6EC    | Subtle 1px structural dividers    |
| `--ds-color-border-default`| #CBD5E1    | Form input and button boundaries  |
| `--ds-primitive-color-teal-500`| #08A5B5| Official Brand Primary (Accent)   |
| `--ds-color-action-teal`   | #066F7B    | Accessible Interactive Teal (5.89:1)|
+───────────────────────────┴─────────────┴───────────────────────────────────+
```

### Contrast Invariant: Brand Teal (#08A5B5)
- Standard `#08A5B5` on `#FFFFFF` yields **2.88:1**, which fails WCAG AA for normal text.
- Therefore, `#08A5B5` is restricted to non-text visual objects (2px selection outlines, focus rings, and active track indicators where WCAG requires 3.0:1).
- For white text on a teal button or teal text on white, the design system automatically uses **Teal-700 (`#066F7B`, 5.89:1)** or **Teal-800 (`#055C66`, 7.69:1)**.

---

## 3. Typographic System

- **Headings (Kanit):** Restricted to weights **400 and 500 only**. Any font-weight 600+ is strictly banned.
- **Body & Forms (Inter):** Handled in weights **400 (Regular)** and **500 (Medium)**.
- **Tabular Numerals:** All currency amounts, percentages, and dates utilize monospaced tabular figures (`font-variant-numeric: tabular-nums`).

---

## 4. Spacing & Rhythm

Built on an immutable **4px base grid**:
`4px`, `8px`, `12px`, `16px`, `20px`, `24px`, `32px`, `40px`, `48px`, `64px`, `80px`.

Gaps are applied with semantic purpose:
- **Label to Control:** `8px`
- **Control to Helper:** `6px`
- **Field to Field:** `20px`
- **Section to Section:** `32px`
- **Panel Internal Padding:** `24px` desktop / `20px` mobile

---

## 5. Geometry & Control Sizing

- **Inputs & Dropdowns:** Unified `48px` height with `8px` border-radius (`--ds-comp-input-radius`).
- **Primary Buttons:** `48px` height with `6px` border-radius (`--ds-comp-btn-radius`).
- **Compact Action Buttons:** `36px` height for secondary or table-level actions.
- **Touch Hitboxes:** Minimum `44×44px` bounding box for all checkboxes, radios, and triggers.

---

## 6. Implementation Files

1. **CSS Custom Properties:** [`src/design-system/tokens.css`](file:///c:/Users/salee/Downloads/Portal_ds/src/design-system/tokens.css)
2. **TypeScript Definitions:** [`src/design-system/tokens.ts`](file:///c:/Users/salee/Downloads/Portal_ds/src/design-system/tokens.ts)
3. **Reusable Foundation Classes:** [`src/design-system/foundation.css`](file:///c:/Users/salee/Downloads/Portal_ds/src/design-system/foundation.css)

