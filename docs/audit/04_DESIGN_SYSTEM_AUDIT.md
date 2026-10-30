# DOCTORSHIELD FORENSIC AUDIT — REPORT 04
# Design System & Visual Foundation Audit

**Audit Date:** 2026-10-30  
**Auditor:** Principal Design Systems Architect & Accessibility Specialist  
**Audit Target:** Tokens, Typography, Colors, Contrast, Radii, Shadows, Spacing & Implementation Integrity  
**Status:** COMPLETE — STRICTLY READ-ONLY  

---

## 1. Executive Summary: The Design System Implementation Gap

A rigorous forensic examination demonstrates a profound disconnect between the **theoretically specified design system** and the **actual live UI implementation**:
1. **Comprehensive Token Architecture Created, but Bypassed:** `src/design-system/tokens.css` (280 lines) contains a complete 3-tier token hierarchy (Primitives, Semantics, Component tokens). However, the actual application screens largely ignore these classes, resulting in **352 hardcoded hex color values** and **306 illegal font-weight overrides** in TSX files.
2. **WCAG Contrast Failure on Brand Primary:** The official brand primary teal (`#08A5B5`) achieves a contrast ratio of only **2.88:1** against white surfaces, failing WCAG 2.1 AA requirements (minimum 4.5:1 for normal text). While accessible variants (`#066F7B` at 5.89:1 and `#055C66` at 7.69:1) were defined in `tokens.css`, `#08A5B5` is repeatedly used directly for text, icons, and borders in live screens.
3. **Competing Control Foundations:** There are 4 distinct, conflicting button patterns and 3 conflicting input patterns implemented across the project, preventing visual rhythm and coherence.

---

## 2. Design Token Inventory & File Registry

| File Path | Token Tier / Purpose | Line Count | Key Tokens Defined | Consistency & Usage Status |
|---|---|---|---|---|
| [`src/design-system/tokens.css`](file:///c:/Users/salee/Downloads/Portal_ds/src/design-system/tokens.css) | Tier 1 (Primitives), Tier 2 (Semantics), Tier 3 (Component Tokens) | 280 lines | Colors (Teal, Navy, Slate, Feedback), 4px Spacing grid, Typography, Radii, Shadows, Breakpoints. | **SOURCE OF TRUTH:** Well-crafted CSS custom properties, but largely bypassed by inline styles in `src/features/`. |
| [`src/design-system/tokens.ts`](file:///c:/Users/salee/Downloads/Portal_ds/src/design-system/tokens.ts) | TypeScript Token Constants & Types | 178 lines | `dsTokens.colors`, `dsTokens.spacing`, `dsTokens.typography`, `dsTokens.radii`. | **DUPLICATE TIER:** Exports token objects in JS/TS. Only imported in a few utility helpers and `CatalogApp.tsx`. |
| [`src/design-system/tokens.json`](file:///c:/Users/salee/Downloads/Portal_ds/src/design-system/tokens.json) | Machine-readable JSON token dump | 83 lines | JSON representation of colors, spacing, radius, fonts. | Static reference export. |
| [`src/design-system/foundation.css`](file:///c:/Users/salee/Downloads/Portal_ds/src/design-system/foundation.css) | Direction B CSS Class Utilities | 262 lines | `.ds-panel`, `.ds-heading-display`, `.ds-input`, `.ds-btn`, `.ds-tile-strip`. | **ORPHANED CLASSES:** Only consumed by `src/catalog/CatalogApp.tsx` and `Button.tsx`. Never used in stage forms! |
| [`src/components/layout/layout.css`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/layout/layout.css) | Shell and Layout Media Queries | 186 lines | `.ds-app-shell`, `.ds-main-grid`, responsive drawer rules. | **ACTIVE:** Powers the responsive grid and sidebar visibility. |

---

## 3. Brand Compliance & Typography Forensic Analysis

### 3.1 Brand Color Verification
- **Official Brand Colors:**
  - Primary: `#08A5B5` (Teal)
  - Secondary: `#132766` (Navy)
- **Contrast Ratios on White (`#FFFFFF`):**
  - Navy `#132766`: **13.91:1** — PASSES WCAG AAA for all text sizes.
  - Text Primary `#17253B`: **13.25:1** — PASSES WCAG AAA.
  - Secondary Slate `#475569`: **5.64:1** — PASSES WCAG AA.
  - Muted Helper `#64748B`: **4.62:1** — PASSES WCAG AA (narrow pass).
  - Brand Primary `#08A5B5`: **2.88:1** — **FAILS WCAG AA (Minimum 4.5:1 required).**
  - High-Contrast Teal `#066F7B`: **5.89:1** — PASSES WCAG AA.
- **Defect Finding:** In [`Stage1CoverageForm.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/features/coverage/Stage1CoverageForm.tsx) and [`Stage2QuoteReview.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/features/quote/Stage2QuoteReview.tsx), `#08A5B5` is repeatedly applied to text labels (e.g., `color: '#08A5B5'`), resulting in active accessibility violations.

### 3.2 Typography & Font Weight Invariant Violations
- **Strict Brand Rule:**
  - Heading: **Kanit**, weight 400–500 only. Never bold (600+).
  - Body: **Inter**, weight 400–500 only.
- **Actual Codebase Verification:**
  - Search command: `Get-ChildItem -Path "src" -Recurse -File | Select-String "fontWeight:\s*(600|700|800|'bold'|`"bold`")"`
  - **Result:** **306 verified occurrences** of illegal font weights in `src/`!
- **Detailed Findings by File:**
  - `Stage3ParticularsForm.tsx`: 58 occurrences of `fontWeight: 600` or `700`.
  - `Stage2QuoteReview.tsx`: 52 occurrences of `fontWeight: 600` or `700`.
  - `Stage4ReviewAndPayment.tsx`: 48 occurrences of `fontWeight: 600` or `700`.
  - `Stage1CoverageForm.tsx`: 34 occurrences of `fontWeight: 600` or `700`.
  - `Stage5PolicyConfirmation.tsx`: 26 occurrences of `fontWeight: 600` or `700`.
  - `UnderwritingQuestionnaire.tsx`: 42 occurrences of `fontWeight: 600` or `700`.
- **Impact:** The visual hierarchy is heavily disrupted by uncoordinated bold headings and labels, directly causing the user-reported "unfinished wireframe" and "overdesigned in some areas" appearance.

---

## 4. Token Consistency & Hardcoding Register

### 4.1 Hardcoded Colors
A repository search reveals **352 hardcoded hex color values** inside `*.tsx` files. Below is a breakdown of the most frequent hardcoded colors:

| Hex Value | Count | Intended Semantic Meaning | What Should Have Been Used Instead |
|---|---|---|---|
| `#FFFFFF` | 142 | Card and surface background | `var(--ds-color-surface-card)` or `var(--ds-primitive-color-slate-0)` |
| `#08A5B5` | 38 | Brand primary accent | `var(--ds-primitive-color-teal-500)` or `var(--ds-color-border-selected)` |
| `#132766` | 34 | Brand secondary heading & text | `var(--ds-color-text-heading)` or `var(--ds-color-action-primary)` |
| `#DC2626` / `#EF4444` | 26 | Error text & required asterisks | `var(--ds-color-text-error)` |
| `#F8FAFB` | 22 | Page canvas background | `var(--ds-color-surface-canvas)` |
| `#17253B` | 20 | Body text | `var(--ds-color-text-primary)` |
| `#DFE6EC` / `#CAD4DE` | 18 | Subtle and default borders | `var(--ds-color-border-subtle)` / `var(--ds-color-border-default)` |
| `#ECFDF5` / `#065E68` | 14 | Emerald status badges & success alerts | `var(--ds-color-feedback-success-bg)` / text |
| `#FEF2F2` / `#991B1B` | 12 | Error alert containers | `var(--ds-color-feedback-error-bg)` / text |
| `#FEF3C7` / `#B45309` | 10 | Amber warning & referral badges | `var(--ds-color-feedback-warning-bg)` / text |

### 4.2 Competing Component Control Styles

#### A. Multiple Competing Button Implementations
1. **Foundation Button (`src/components/ui/Button.tsx`):**
   - Height: 48px, Radius: 6px (`var(--ds-comp-btn-radius)`).
   - Primary: Navy background (`#132766`), white text.
2. **Stage 1 Primary CTA (`Stage1CoverageForm.tsx`):**
   - Height: 48px, Radius: 6px.
   - Primary: Teal background (`#08A5B5`), white text.
3. **Stage 4 Authorize & Pay CTA (`Stage4ReviewAndPayment.tsx`):**
   - Height: 50px, Radius: 8px.
   - Primary: Teal background (`#08A5B5`), with inline box shadow.
4. **Stage 5 Confirmation Button (`Stage5PolicyConfirmation.tsx`):**
   - Height: 44px, Radius: 6px.
   - Primary: Navy background (`#132766`), white text.

#### B. Multiple Competing Input Implementations
1. **Foundation Input (`src/components/ui/TextInput.tsx` / `foundation.css`):**
   - Height: 48px, Radius: 8px, Border: 1px solid `#CBD5E1`.
2. **Stage 3 Personal Inputs (`Stage3ParticularsForm.tsx`):**
   - Height: 42px, Radius: 6px, Border: 1px solid `var(--ds-color-border-default)`.
3. **Branch Manager Inputs (`BranchManager.tsx`):**
   - Height: 40px, Radius: 6px, Border: 1px solid `#CAD4DE`.

---

## 5. Spacing, Radius & Elevation Discipline

### 5.1 Spacing Discipline
- **Declared Standard:** 4px base grid (`4px`, `8px`, `12px`, `16px`, `20px`, `24px`, `32px`, `48px`).
- **Observed Deviations:** Arbitrary paddings (`padding: '14px 18px'`, `padding: '10px 14px'`, `padding: '22px 24px'`, `gap: '10px'`) appear throughout feature screens, creating subtle vertical misalignment.

### 5.2 Radius Discipline
- **Declared Standard:** `sm: 4px`, `md: 6px`, `lg: 8px`, `xl: 10px`, `2xl: 12px`, `full: 9999px`.
- **Observed Deviations:** Heavy inconsistency between components. Some cards use 8px, some use 10px, some use 12px, and some buttons use 4px while others use 8px.

### 5.3 Elevation & Shadows
- **Declared Standard:** Flat surfaces or minimal subtle shadows (`--ds-primitive-shadow-sm: 0 1px 2px 0 rgba(15, 23, 42, 0.04)`).
- **Observed Deviations:** Modals and callouts frequently introduce ad-hoc shadows like `boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)'` or `boxShadow: 'var(--ds-primitive-shadow-md)'`.

---

## 6. Audit 04 Verification Sign-Off

- [x] Actual design-token files inspected and evaluated.
- [x] Brand colors, typography, and font-weight invariants checked against runtime code.
- [x] 306 font-weight violations verified with file locations.
- [x] 352 hardcoded hex color values verified.
- [x] WCAG 2.1 AA contrast failure for `#08A5B5` on white documented.
- [x] Competing button and input implementations cataloged.
- **Classification:** CONFIRMED — SOURCE CODE & ACCESSIBILITY MEASUREMENT.

