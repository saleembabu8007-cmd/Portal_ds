# DoctorShield Design System — Interface Atoms Specification

> **Document Reference:** `DOC-DS-ATOMS-SPEC-2026-10-29`  
> **Status:** Production Component Specification  
> **Author:** Principal Design Systems Architect  
> **Standard:** Direction B (Structured Minimal), WCAG 2.2 AA Contrast & Invariant Rule 4.2 (Kanit <= 500)

---

## 1. Catalog of All 20 Redesigned Interface Atoms

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. Text               6. Text links         11. Selects          16. Error msgs     │
│ 2. Headings           7. Inputs             12. Dropdown trig    17. Required ind   │
│ 3. Labels             8. Textareas          13. Icons            18. Loading ind    │
│ 4. Small metadata     9. Checkboxes         14. Dividers         19. Inline notices │
│ 5. Buttons           10. Radio controls     15. Focus indicators 20. Badges         │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Atom-by-Atom Specifications

---

### 1. Text Atom (`Text.tsx`)
- **Anatomy:** Semantic paragraph/span element with constrained line length.
- **Tokens:** Font family `var(--ds-primitive-font-body)` (`Inter`), weights `400` (Regular) and `500` (Medium).
- **Variants:**
  - `lead`: `16px` / `24px` leading (Inter 500)
  - `body`: `14px` / `20px` leading (Inter 400)
  - `small`: `13px` / `18px` leading (Inter 400)
  - `caption`: `12px` / `16px` leading (Inter 400)
  - `legal`: `13px` / `20px` leading (Inter 400, relaxed 1.54 line height for comfortable disclosure reading)
  - `mono`: `13px` tabular numbers (`font-variant-numeric: tabular-nums`)
- **Colors:** `--ds-color-text-primary` (`#17253B`, 13.25:1), `--ds-color-text-secondary` (`#475569`, 5.64:1), `--ds-color-text-muted` (`#64748B`, 4.62:1).

---

### 2. Headings Atom (`Heading.tsx`)
- **Anatomy:** Semantic heading (`h1`–`h6`) with strictly controlled typographic scales.
- **Tokens:** Font family `var(--ds-primitive-font-heading)` (`Kanit`).
- **Strict Invariant:** Weights restricted to **400 and 500 only** (Rule 4.2 compliance; zero weight 600+).
- **Levels:**
  - `display`: `28px` / `36px` (Kanit 500, Tracking `-0.015em`) — Page Master Title
  - `1`: `24px` / `32px` (Kanit 500, Tracking `-0.01em`) — Milestone Stage Header
  - `2`: `20px` / `28px` (Kanit 500, Tracking `0em`) — Structural Panel Title
  - `3`: `16px` / `24px` (Kanit 500, Tracking `0em`) — Fieldset / Sub-Section Title
  - `4`: `14px` / `20px` (Kanit 500, Tracking `0em`) — Table Column Title
- **Color:** `--ds-color-text-heading` (`#132766`, 13.91:1 contrast).

---

### 3. Labels Atom (`FieldLabel` in `FieldFeedback.tsx`)
- **Anatomy:** `<label>` element with flex alignment between label text and optional indicator.
- **Typography:** Inter 500, `14px` (`var(--ds-primitive-font-size-base)`), leading `20px`.
- **Color:** `--ds-primitive-color-slate-700` (`#334155`, 7.88:1 contrast).
- **Spacing:** `8px` bottom margin (`--ds-space-label-to-control`).

---

### 4. Small Metadata Atom (`Badge` / `Text variant="caption"`)
- **Anatomy:** Inline text or restrained micro-tag.
- **Typography:** Inter 500, `12px` / `16px`.
- **Spacing:** `2px 8px` padding with `4px` radius.
- **Usage:** Timestamps, policy status indicators, and underwriting categorization.

---

### 5. Buttons Atom (`Button.tsx`)
- **Anatomy:** `<button>` with optional left/right icon and loading spinner.
- **Sizing:**
  - Standard `md`: Height `48px`, padding `0 24px`, font `15px` Inter 500.
  - Compact `sm`: Height `36px`, padding `0 16px`, font `14px` Inter 500.
- **Radius:** `6px` (`--ds-comp-btn-radius`).
- **Hierarchy:**
  - **Primary:** Deep Navy `#132766`, text white `#FFFFFF`, border transparent. One dominant action per screen.
  - **Secondary:** Surface white `#FFFFFF`, border `1px solid #CBD5E1`, text `#132766`, hover `#F1F5F9`.
  - **Ghost / Tertiary:** Transparent background, text `#055C66`, hover background `#F0FAFA` or underline.
  - **Destructive:** Rose `#B91C1C`, text white `#FFFFFF`.
  - **Teal (Accessible):** Teal-700 `#066F7B` (5.89:1 contrast), text white `#FFFFFF`.
- **Interaction States:**
  - Hover: Background darkens by 1 shade.
  - Active: Scale `0.99`, background darkens further.
  - Disabled: `opacity: 0.6`, `cursor: not-allowed`.
  - Loading: Replaces left icon with `<Loader2 className="animate-spin" />`, text reads `"Processing..."`, `aria-busy="true"`.
- **Focus Indicator:** `outline: 2px solid var(--ds-color-focus-ring); outline-offset: 2px;`.

---

### 6. Text Links Atom (`TextLink` in `Typography.tsx`)
- **Anatomy:** `<a>` element with deliberate underline styling.
- **Tokens:** Color `--ds-color-text-link` (`#055C66`, **7.69:1 contrast** on white), weight 500.
- **Underline Rule:** `text-decoration: underline; text-underline-offset: 3px;`.
- **External Links:** Automatically appends `<ExternalLink size={12} />` icon.
- **Focus:** Standard dual focus ring on `:focus-visible`.

---

### 7. Inputs Atom (`TextInput.tsx`)
- **Anatomy:** Full-width container with integrated label, input field, and helper/error slot.
- **Dimensions:** Height `48px` (`--ds-comp-input-height`), padding `0 16px`, border `1px solid #CBD5E1`, radius `8px` (`--ds-comp-input-radius`).
- **Typography:** Inter 400, `16px` (prevents iOS Safari auto-zoom).
- **Addons:** 18px left/right icons optically centered at `16px` inset; input padding offsets automatically by `40px`.
- **States:**
  - Default: Border `#CBD5E1`, background `#FFFFFF`.
  - Focus: Border `#08A5B5`, `box-shadow: 0 0 0 2px rgba(8, 165, 181, 0.15)`.
  - Error: Border `2px solid #EF4444`, `aria-invalid="true"`.
  - Disabled: Background `#F1F5F9`, text `#94A3B8`, `cursor: not-allowed`.
  - Readonly: Background `#F8FAFB`, text `#17253B`.

---

### 8. Textareas Atom (`Textarea.tsx`)
- **Anatomy:** Multi-line text entry for underwriting explanations.
- **Dimensions:** Min-height `96px`, padding `12px 16px`, radius `8px`, border `1px solid #CBD5E1`.
- **Resize:** Vertical only (`resize: vertical`).
- **States:** Identical focus, error, and disabled architecture as `TextInput`.

---

### 9. Checkboxes Atom (`Checkbox` in `SelectionControls.tsx`)
- **Anatomy:** Label wrapper + custom visual box + hidden accessible `<input type="checkbox">`.
- **Touch Target:** Minimum `44px` height (`--ds-comp-touch-target-min`).
- **Visual Box:** `20×20px`, `4px` radius.
- **Checked State:** Background `#066F7B`, border `2px solid #066F7B`, white check icon (`size={14}`, `strokeWidth={3}`).
- **Unchecked State:** Background `#FFFFFF`, border `2px solid #CBD5E1`.
- **Focus:** Outline `2px solid #08A5B5` with `2px` offset.

---

### 10. Radio Controls Atom (`RadioButton` in `SelectionControls.tsx`)
- **Anatomy:** Label wrapper + custom visual circle + hidden accessible `<input type="radio">`.
- **Touch Target:** Minimum `44px` height.
- **Visual Circle:** `20×20px`, full radius (`9999px`).
- **Checked State:** Outer ring `2px solid #08A5B5`, inner solid dot `10×10px` `#08A5B5` on pure white background.
- **Unchecked State:** Outer ring `2px solid #CBD5E1`.

---

### 11. Selects & Comboboxes (`SelectCombobox.tsx`)
- **Anatomy:** 48px trigger button + expandable WAI-ARIA 1.2 listbox.
- **Trigger:** Height `48px`, radius `8px`, border `1px solid #CBD5E1`, background `#FFFFFF`.
- **Optical Indicator:** Chevron down icon (`18px`) rotating smoothly 180° on open.
- **Popover:** Position absolute, background `#FFFFFF`, border `1px solid #CBD5E1`, shadow `0 12px 24px -4px rgba(19, 39, 102, 0.10)`.
- **Search Filter:** Integrated search input for dropdowns with >6 options.

---

### 12. Dropdown Triggers
- Standardized trigger contract using `role="combobox"` with `aria-expanded` and `aria-haspopup="listbox"`.
- Keyboard support: `Enter` and `Space` toggle; `ArrowUp` / `ArrowDown` navigate; `Escape` closes.

---

### 13. Icons (Iconography Specification)
- **Library:** `lucide-react`.
- **Stroke Width:** Strict `2.0px` across all icons.
- **Optical Sizes:**
  - Standard Action / Input Icon: `18px`
  - Compact / Status Icon: `16px`
  - Micro / Inline Icon: `14px`
- **Rule:** Used strictly to indicate an action (e.g. calendar picker, external link, chevron) or semantic feedback. Zero decorative icons beside headings.

---

### 14. Dividers Atom (`Divider` in `FieldFeedback.tsx`)
- **Anatomy:** `<hr />` element.
- **Dimensions:** Height `0px`, border-top `1px solid var(--ds-color-border-subtle)` (`#DFE6EC`).
- **Margin:** `24px 0` (`--ds-primitive-space-6`).

---

### 15. Focus Indicators
- **Standard:** Dual-layer focus ring:
  ```css
  :focus-visible {
    outline: 2px solid var(--ds-color-focus-ring) !important; /* #08A5B5 */
    outline-offset: 2px !important;
    box-shadow: 0 0 0 2px var(--ds-color-focus-offset) !important; /* #FFFFFF */
  }
  ```
- Complies with WCAG 2.2 SC 2.4.11 (Focus Appearance) and SC 2.4.13 (Focus Not Obscured).

---

### 16. Error Messages (`ErrorMessage` in `FieldFeedback.tsx`)
- **Anatomy:** `<p role="alert" aria-live="polite">` with flex-aligned warning icon.
- **Typography:** Inter 500, `13px` / `18px`.
- **Color:** `--ds-primitive-color-rose-700` (`#B91C1C`, **5.84:1 contrast**).
- **Icon:** `<AlertCircle size={14} aria-hidden="true" />`.

---

### 17. Required Indicators
- Rendered as `<span aria-label="required" style={{ color: '#B91C1C' }}>*</span>`.
- High contrast without visual disruption.

---

### 18. Loading Indicators (`LoadingIndicator` in `FieldFeedback.tsx`)
- **Anatomy:** Accessible SVG spinner `<Loader2 className="animate-spin" />` with `role="status"` and `aria-live="polite"`.
- **Color:** `--ds-color-action-teal` (`#066F7B`).
- **Motion:** Handled cleanly with zero CPU stutter; disabled under `@media (prefers-reduced-motion: reduce)`.

---

### 19. Inline Notices (`InlineNotice` in `FieldFeedback.tsx`)
- **Anatomy:** Structural callout card with 1px border, 6px radius, and semantic icon.
- **Variants:**
  - `info`: Surface `#F0FAFA`, border `#DFE6EC`, text `#055C66`.
  - `success`: Surface `#ECFDF5`, border `#6EE7B7`, text `#065F46`.
  - `warning`: Surface `#FFFBEB`, border `#FCD34D`, text `#92400E`.
  - `error`: Surface `#FEF2F2`, border `#FCA5A5`, text `#B91C1C`.
- **Semantics:** `role="status"` (info, success, warning) or `role="alert"` (error).

---

### 20. Badges Atom (`Badge` in `FieldFeedback.tsx`)
- **Anatomy:** Restrained tag with `2px 8px` padding and `4px` radius (or pill `9999px`).
- **Typography:** Inter 500, `12px` / `16px`.
- **Variants:** `teal` (Recommended), `navy` (Institutional), `success` (Active), `neutral` (Informational).
- **Invariant:** Used strictly when essential (e.g. indicating the `"Recommended"` limit on RM 1M for test compliance).

---

## 3. Component Gallery Verification

The isolated component gallery has been completely updated in [`src/catalog/CatalogApp.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/catalog/CatalogApp.tsx), presenting:
1. All 20 atoms across all interactive states.
2. Insurance molecular assemblies (Step progress, limit selector, specialization editor, date field).
3. Full Stage compositions.

