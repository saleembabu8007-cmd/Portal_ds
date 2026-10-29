# DOCTORSHIELD DESIGN TOKENS CATALOGUE
## Production Token Specifications & Variable Map

> **Document ID:** `DOC-DS-TOKENS-001`  
> **Version:** 1.0.0  
> **Status:** Authoritative Baseline (Phase 2 Deliverable)  
> **Runtime Target:** CSS Custom Properties (`tokens.css`), TypeScript Exports (`tokens.ts`), DTCG JSON (`tokens.json`)  
> **Traceability:** Governed by [`DESIGN_SYSTEM_FOUNDATIONS.md`](file:///c:/Users/salee/Downloads/Portal_ds/docs/design-system/DESIGN_SYSTEM_FOUNDATIONS.md)

---

## 1. Primitive Color Tokens

### 1.1 Teal Primitive Ramp (Brand Primary Derived)
The primary brand teal `#08A5B5` anchors at `teal-500`.

| Token Name | Hex Value | Luminance | Contrast on White | Primary Usage |
|---|---|---|---|---|
| `--ds-primitive-color-teal-50` | `#F0FAFA` | 0.95 | 1.05:1 | Subtle card backgrounds, selected row tints |
| `--ds-primitive-color-teal-100` | `#D6F3F5` | 0.88 | 1.13:1 | Badge backgrounds, active tab pills |
| `--ds-primitive-color-teal-200` | `#AEE7EB` | 0.76 | 1.31:1 | Dividers on tinted surfaces |
| `--ds-primitive-color-teal-300` | `#78D5DD` | 0.59 | 1.69:1 | Decorative accents, illustration lines |
| `--ds-primitive-color-teal-400` | `#3CC0CC` | 0.44 | 2.27:1 | Non-text decorative icons |
| `--ds-primitive-color-teal-500` | `#08A5B5` | 0.30 | 2.97:1 | **Official Brand Primary**: Borders, focus rings, progress bars |
| `--ds-primitive-color-teal-600` | `#068694` | 0.20 | 4.21:1 | Large heading text, secondary buttons |
| `--ds-primitive-color-teal-700` | `#066F7B` | 0.14 | **5.89:1** | **Accessible Interactive Teal**: Buttons with white text |
| `--ds-primitive-color-teal-800` | `#055C66` | 0.10 | **7.69:1** | **High-Contrast Teal**: Body text links, high-emphasis icons |
| `--ds-primitive-color-teal-900` | `#04464D` | 0.06 | **11.45:1**| Dark mode accents, deepest teal surfaces |

### 1.2 Navy Primitive Ramp (Brand Secondary Derived)
The secondary brand navy `#132766` anchors at `navy-900`.

| Token Name | Hex Value | Luminance | Contrast on White | Primary Usage |
|---|---|---|---|---|
| `--ds-primitive-color-navy-50` | `#F1F4FA` | 0.94 | 1.06:1 | Primary page canvas background |
| `--ds-primitive-color-navy-100` | `#DEE5F2` | 0.80 | 1.25:1 | Subtle panel backgrounds, table headers |
| `--ds-primitive-color-navy-200` | `#C0CEE5` | 0.63 | 1.58:1 | Border for selected navy containers |
| `--ds-primitive-color-navy-300` | `#97ADD3` | 0.43 | 2.32:1 | Disabled button backgrounds |
| `--ds-primitive-color-navy-400` | `#6B89BE` | 0.27 | 3.70:1 | Decorative secondary icons |
| `--ds-primitive-color-navy-500` | `#4667A5` | 0.16 | **5.25:1** | Medium-emphasis secondary text |
| `--ds-primitive-color-navy-600` | `#324F88` | 0.10 | **7.69:1** | High-emphasis secondary labels |
| `--ds-primitive-color-navy-700` | `#233B6E` | 0.06 | **11.45:1**| Secondary CTA buttons |
| `--ds-primitive-color-navy-800` | `#192C5B` | 0.04 | **13.12:1**| Card header titles, table headings |
| `--ds-primitive-color-navy-900` | `#132766` | 0.03 | **13.91:1**| **Official Brand Secondary**: Primary headings, total amounts |

### 1.3 Neutral Slate Primitive Ramp
Cool-toned neutral ramp designed to pair seamlessly with teal and navy without yellow tinting.

| Token Name | Hex Value | Luminance | Contrast on White | Primary Usage |
|---|---|---|---|---|
| `--ds-primitive-color-slate-0` | `#FFFFFF` | 1.00 | 1.00:1 | Card surfaces, modal surfaces |
| `--ds-primitive-color-slate-50` | `#F8FAFC` | 0.96 | 1.04:1 | Table alternate rows, code blocks |
| `--ds-primitive-color-slate-100` | `#F1F5F9` | 0.92 | 1.08:1 | Input background (resting), dividers |
| `--ds-primitive-color-slate-200` | `#E2E8F0` | 0.82 | 1.21:1 | Input borders, card hairline borders |
| `--ds-primitive-color-slate-300` | `#CBD5E1` | 0.67 | 1.49:1 | Hovered input borders |
| `--ds-primitive-color-slate-400` | `#94A3B8` | 0.38 | 2.63:1 | Placeholder text, disabled text |
| `--ds-primitive-color-slate-500` | `#64748B` | 0.19 | **4.76:1** | Helper text, caption text, microcopy |
| `--ds-primitive-color-slate-600` | `#475569` | 0.11 | **7.58:1** | Secondary body text, form field labels |
| `--ds-primitive-color-slate-700` | `#334155` | 0.07 | **10.25:1**| Standard body text, table cell data |
| `--ds-primitive-color-slate-800` | `#1E293B` | 0.03 | **14.63:1**| High-emphasis body copy, list headers |
| `--ds-primitive-color-slate-900` | `#0F172A` | 0.01 | **17.80:1**| Maximum-contrast text |

### 1.4 Semantic Feedback Color Primitives

| Semantic Channel | Token Name | Hex Value | Contrast on White | Primary Usage |
|---|---|---|---|---|
| **Success** | `--ds-primitive-color-emerald-50` | `#ECFDF5` | 1.03:1 | Success banner background |
| | `--ds-primitive-color-emerald-500`| `#10B981` | 2.65:1 | Success icons, progress meter complete |
| | `--ds-primitive-color-emerald-700`| `#047857` | **5.32:1** | Success text, completed step labels |
| **Warning** | `--ds-primitive-color-amber-50` | `#FFFBEB` | 1.02:1 | Warning banner background |
| | `--ds-primitive-color-amber-500` | `#F59E0B` | 2.15:1 | Warning icons, allocation deficit bar |
| | `--ds-primitive-color-amber-800` | `#92400E` | **5.78:1** | Warning text, incomplete notice |
| **Danger** | `--ds-primitive-color-rose-50` | `#FFF1F2` | 1.03:1 | Error container background |
| | `--ds-primitive-color-rose-500` | `#F43F5E` | 3.52:1 | Error border, exclamation icons |
| | `--ds-primitive-color-rose-700` | `#BE123C` | **6.15:1** | Error microcopy, validation messages |
| **Info** | `--ds-primitive-color-sky-50` | `#F0F9FF` | 1.03:1 | Informational disclosure background |
| | `--ds-primitive-color-sky-500` | `#0EA5E9` | 2.85:1 | Info icon, helper badge outline |
| | `--ds-primitive-color-sky-700` | `#0369A1` | **5.64:1** | Info text, statutory disclosure link |

---

## 2. Semantic Token Layer

### 2.1 Text Color Tokens

| Semantic Token | Underlying Value | WCAG Contrast | Usage Rule |
|---|---|---|---|
| `--ds-color-text-primary` | `var(--ds-primitive-color-slate-900)` | **17.80:1** (AAA) | Standard body text, table content |
| `--ds-color-text-secondary` | `var(--ds-primitive-color-slate-600)` | **7.58:1** (AAA) | Subheadings, card secondary labels |
| `--ds-color-text-muted` | `var(--ds-primitive-color-slate-500)` | **4.76:1** (AA) | Helper text, caption microcopy |
| `--ds-color-text-heading` | `var(--ds-primitive-color-navy-900)` | **13.91:1** (AAA) | All Kanit headings (H1–H4) |
| `--ds-color-text-link` | `var(--ds-primitive-color-teal-800)` | **7.69:1** (AAA) | Hyperlinks, inline policy wording links |
| `--ds-color-text-inverse` | `var(--ds-primitive-color-slate-0)` | **13.91:1** on Navy | Text on dark buttons, toast text |
| `--ds-color-text-error` | `var(--ds-primitive-color-rose-700)` | **6.15:1** (AA) | Form validation errors |
| `--ds-color-text-success` | `var(--ds-primitive-color-emerald-700)`| **5.32:1** (AA) | Successful confirmation messages |

### 2.2 Surface & Background Tokens

| Semantic Token | Underlying Value | Description |
|---|---|---|
| `--ds-color-surface-canvas` | `var(--ds-primitive-color-navy-50)` | Primary page viewport background (`#F1F4FA`) |
| `--ds-color-surface-card` | `var(--ds-primitive-color-slate-0)` | White card surface, modal dialogs (`#FFFFFF`) |
| `--ds-color-surface-subtle` | `var(--ds-primitive-color-slate-50)` | Alternating table rows, disabled input background |
| `--ds-color-surface-brand-tint` | `var(--ds-primitive-color-teal-50)` | Selected card background, active accordion tint |
| `--ds-color-surface-overlay` | `rgba(19, 39, 102, 0.60)` | Modal backdrop dimming scrim |

### 2.3 Border & Focus Tokens

| Semantic Token | Underlying Value | Description |
|---|---|---|
| `--ds-color-border-subtle` | `var(--ds-primitive-color-slate-200)` | Hairline dividers, card outlines (`#E2E8F0`) |
| `--ds-color-border-default` | `var(--ds-primitive-color-slate-300)` | Unfocused input borders, table borders |
| `--ds-color-border-selected`| `var(--ds-primitive-color-teal-500)` | Active radio card border (`#08A5B5`, 2px) |
| `--ds-color-border-error` | `var(--ds-primitive-color-rose-500)` | Invalid input border (`#F43F5E`, 2px) |
| `--ds-color-focus-ring` | `var(--ds-primitive-color-teal-500)` | Focus ring color (`#08A5B5`) |
| `--ds-color-focus-offset` | `var(--ds-primitive-color-slate-0)` | Focus ring separation buffer (`#FFFFFF`) |

### 2.4 Interactive Action Tokens

| Semantic Token | Underlying Value | Description |
|---|---|---|
| `--ds-color-action-primary` | `var(--ds-primitive-color-teal-700)` | Primary action background (`#066F7B`) |
| `--ds-color-action-primary-hover`| `var(--ds-primitive-color-teal-800)`| Primary action hover (`#055C66`) |
| `--ds-color-action-primary-active`| `var(--ds-primitive-color-teal-900)`| Primary action pressed state (`#04464D`) |
| `--ds-color-action-secondary` | `var(--ds-primitive-color-navy-900)` | Secondary button background (`#132766`) |
| `--ds-color-action-secondary-hover`| `var(--ds-primitive-color-navy-800)`| Secondary button hover (`#192C5B`) |
| `--ds-color-action-disabled` | `var(--ds-primitive-color-slate-200)`| Disabled button fill (`#E2E8F0`) |

---

## 3. Typography Tokens

### 3.1 Font Family Tokens
- `--ds-font-family-heading`: `'Kanit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;`
- `--ds-font-family-body`: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;`
- `--ds-font-family-mono`: `'JetBrains Mono', 'Fira Code', monospace;` (Tabular numerals, policy numbers)

### 3.2 Font Weight Invariants
- `--ds-font-weight-regular`: `400`
- `--ds-font-weight-medium`: `500`
- `--ds-font-weight-semibold`: `600` (Inter only; **Kanit is strictly capped at 500**)

### 3.3 Desktop Type Scale ($\ge 1024\text{ px}$)

| Token | Size | Line Height | Letter Spacing | Font Family / Weight | Usage |
|---|---|---|---|---|---|
| `--ds-font-size-display` | `2.5rem` (40px) | `1.2` (48px) | `-0.02em` | Kanit / 500 | Portal Landing Hero |
| `--ds-font-size-h1` | `2.0rem` (32px) | `1.25` (40px) | `-0.015em`| Kanit / 500 | Stage Main Page Titles |
| `--ds-font-size-h2` | `1.5rem` (24px) | `1.3` (32px) | `-0.01em` | Kanit / 500 | Card & Section Headings |
| `--ds-font-size-h3` | `1.25rem` (20px)| `1.4` (28px) | `0em` | Kanit / 400 | Subsection Titles |
| `--ds-font-size-lg` | `1.125rem` (18px)| `1.5` (27px) | `0em` | Inter / 500 | Key Financial Totals, Subheadings |
| `--ds-font-size-base` | `1.0rem` (16px) | `1.5` (24px) | `0em` | Inter / 400 | Standard Body, Form Inputs |
| `--ds-font-size-sm` | `0.875rem` (14px)| `1.45` (20px) | `0.01em` | Inter / 500 | Labels, Table Headers, Buttons |
| `--ds-font-size-xs` | `0.75rem` (12px) | `1.4` (17px) | `0.02em` | Inter / 400 | Legal Disclaimers, Helper Text |

### 3.4 Mobile Type Scale ($< 768\text{ px}$)

| Token | Size | Line Height | Letter Spacing | Adjustment Rationale |
|---|---|---|---|---|
| `--ds-font-size-display-m`| `2.0rem` (32px) | `1.25` (40px) | `-0.02em` | Prevent wrapping on narrow screens |
| `--ds-font-size-h1-m` | `1.625rem` (26px)| `1.3` (34px) | `-0.015em`| Balanced header prominence |
| `--ds-font-size-h2-m` | `1.25rem` (20px)| `1.35` (27px) | `-0.01em` | Card titles compact fit |
| `--ds-font-size-base-m` | `1.0rem` (16px) | `1.5` (24px) | `0em` | **16px minimum to avoid iOS Safari zoom** |

---

## 4. Component Token Specifications

### 4.1 Form Input Tokens (`--ds-comp-input-*`)
- `--ds-comp-input-height`: `3.0rem` (48px fixed)
- `--ds-comp-input-padding-x`: `var(--ds-space-4)` (16px)
- `--ds-comp-input-padding-y`: `var(--ds-space-3)` (12px)
- `--ds-comp-input-radius`: `var(--ds-radius-md)` (6px)
- `--ds-comp-input-bg`: `var(--ds-primitive-color-slate-0)` (`#FFFFFF`)
- `--ds-comp-input-border`: `1px solid var(--ds-color-border-default)`
- `--ds-comp-input-focus-border`: `2px solid var(--ds-color-focus-ring)`
- `--ds-comp-input-error-border`: `2px solid var(--ds-color-border-error)`
- `--ds-comp-input-placeholder`: `var(--ds-primitive-color-slate-400)`

### 4.2 Button Tokens (`--ds-comp-btn-*`)
- `--ds-comp-btn-height-md`: `3.0rem` (48px touch target)
- `--ds-comp-btn-height-sm`: `2.5rem` (40px compact)
- `--ds-comp-btn-padding-x`: `var(--ds-space-6)` (24px)
- `--ds-comp-btn-radius`: `var(--ds-radius-md)` (6px)
- `--ds-comp-btn-primary-bg`: `var(--ds-color-action-primary)` (`#066F7B`)
- `--ds-comp-btn-primary-text`: `var(--ds-primitive-color-slate-0)` (`#FFFFFF`)
- `--ds-comp-btn-secondary-bg`: `var(--ds-color-action-secondary)` (`#132766`)
- `--ds-comp-btn-ghost-hover`: `var(--ds-primitive-color-navy-100)`

### 4.3 Card Tokens (`--ds-comp-card-*`)
- `--ds-comp-card-bg`: `var(--ds-color-surface-card)` (`#FFFFFF`)
- `--ds-comp-card-padding`: `var(--ds-space-6)` (24px desktop, 16px mobile)
- `--ds-comp-card-radius`: `var(--ds-radius-lg)` (8px)
- `--ds-comp-card-border`: `1px solid var(--ds-color-border-subtle)`
- `--ds-comp-card-shadow`: `var(--ds-shadow-sm)`

### 4.4 Stepper Tokens (`--ds-comp-stepper-*`)
- `--ds-comp-stepper-circle-size`: `2.25rem` (36px)
- `--ds-comp-stepper-track-height`: `2px`
- `--ds-comp-stepper-track-color`: `var(--ds-primitive-color-slate-200)`
- `--ds-comp-stepper-active-bg`: `var(--ds-primitive-color-teal-500)` (`#08A5B5`)
- `--ds-comp-stepper-completed-bg`: `var(--ds-primitive-color-navy-900)` (`#132766`)

