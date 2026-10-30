# ATOMIC COMPONENT SPECIFICATIONS
## DoctorShield Individual Medical Professional Indemnity Portal

> **Document ID:** `DOC-DS-COMP-002`  
> **Status:** Component System Architecture Baseline (Phase 05)  
> **Classification:** [PROPOSED / SPECIFICATION]  
> **Author:** Principal Design Systems Engineer & Accessibility Architect  
> **Created:** 2026-10-30  
> **Governance:** DoctorShield Product Engineering & Design Rules v2.0 (AGENTS.md)  
> **Scope:** Exhaustive component anatomy, geometric dimensions, state models, keyboard accessibility, and ARIA bindings for all 18 atomic primitives.

---

## 1. Typography Primitives (`Heading`, `Text`)

### Anatomy
- **Root Element:** Semantic HTML heading (`<h1>` to `<h6>`) or inline/block text (`<p>`, `<span>`, `<small>`).
- **Content:** Unwrapped text nodes or inline emphasis spans.
- **Color Binding:** Semantic text colors (`var(--ds-color-text-heading)`, `var(--ds-color-text-primary)`).

### Geometry & Scale
- **Display Heading (`level="display"`):** 28px (`1.75rem`), line-height 34px (`1.21`), tracking `-0.02em`, font `Kanit 500`.
- **Section Heading (`level={1}` or `{2}`):** 20px (`1.25rem`), line-height 26px (`1.3`), tracking `-0.01em`, font `Kanit 500`.
- **Body Text (`variant="body"`):** 16px (`1.0rem`), line-height 24px (`1.5`), font `Inter 400`.
- **Form Label (`variant="small"` / `FieldLabel`):** 14px (`0.875rem`), line-height 20px, font `Inter 500`.
- **Legal Notice (`variant="legal"`):** 12px (`0.75rem`), line-height 18px, font `Inter 400`.
- **Financial Numeral (`variant="mono"`):** Tabular figures enabled (`font-variant-numeric: tabular-nums`).

### Invariant Rules
- Weight is strictly capped at `500` (Medium). Weights `600`, `700`, and `bold` throw runtime warnings and are remapped to 500.

---

## 2. Button Primitive (`Button`)

### Anatomy
- **Root Element:** `<button type="button|submit|reset">`.
- **Leading/Trailing Controls:** Optional `leftIcon` or `rightIcon` (rendered via Lucide React, size 16px).
- **Loading State:** Replaces leading icon with an animated SVG spinner (`<Loader2 className="ds-spin" size={16} />`) and preserves button width.

### Geometry
- **Standard (`size="md"`):** Height `48px`, horizontal padding `24px`, border-radius `6px` (`radii.md`).
- **Compact (`size="sm"`):** Height `36px`, horizontal padding `14px`, border-radius `6px`. Transparent touch margin expands hit area to 44x44px on mobile.
- **Font Size:** 15px (`0.9375rem`), font-weight `500`, tracking `+0.01em`.

### Variants & Colors
- **Primary:** Background `var(--ds-color-action-primary)` (`#132766`), text `#FFFFFF`. Hover: `#192C5B`.
- **Teal:** Background `var(--ds-primitive-color-teal-500)` (`#08A5B5`), text `#FFFFFF`. Hover: `#066F7B`.
- **Secondary (Outline):** Background `#FFFFFF`, border `1px solid #CBD5E1`, text `#132766`. Hover: `#F1F5F9`.
- **Ghost:** Background `transparent`, border `none`, text `#055C66`. Hover: `#F0FAFA`.
- **Destructive:** Background `#FEF2F2`, border `1px solid #FCA5A5`, text `#B91C1C`.

### Accessibility & Keyboard
- Standard `tabIndex={0}`. Focus visible: `2px solid #132766` outline with `2px offset`. Spacebar and Enter trigger click.
- Disabled buttons declare `aria-disabled="true"` and `disabled={true}`.

---

## 3. Text Input Primitive (`TextInput`)

### Anatomy
- **Container:** `<div className="ds-field-wrapper">` containing Label, Input container, and Feedback row.
- **Label:** `<label htmlFor={id}>` with optional `*` required indicator in `#B91C1C`.
- **Leading Addon:** Left-aligned icon (Calendar, Mail, Tag) positioned at `left: 16px`.
- **Input:** `<input type="text|email|tel|date">`.
- **Feedback:** Associated `<p id={`${id}-error`} role="alert">` or `<p id={`${id}-helper`}>`.

### Geometry
- **Height:** Exactly `48px` (`--ds-comp-input-height`).
- **Padding:** `0 16px` (or `0 16px 0 42px` if `leftAddon` present).
- **Border Radius:** `8px` (`radii.lg`).
- **Font Size:** `16px` strictly (`--ds-comp-input-font-size`) to defeat iOS Safari auto-zoom.

### States & Validation
- **Default:** Border `1px solid var(--ds-color-border-default)` (`#CBD5E1`), background `#FFFFFF`.
- **Focus:** Border `2px solid var(--ds-color-border-focus)` (`#132766`), box-shadow `0 0 0 2px rgba(8, 165, 181, 0.15)`.
- **Invalid:** Border `2px solid var(--ds-color-border-error)` (`#EF4444`), background `#FEF2F2` (1% tint).
- **Disabled:** Background `#F1F5F9`, text `#94A3B8`, cursor `not-allowed`.
- **Readonly:** Background `#F8FAFB`, text `#475569`, border `1px solid #DFE6EC`, cursor `default`.

---

## 4. Textarea Primitive (`Textarea`)

### Anatomy
- Same container structure as `TextInput`, rendering a multi-line `<textarea>`.
- Integrated character counter display: `"Characters: 142 / 1000"`.

### Geometry
- **Minimum Height:** `110px` (approximately 4 rows of text).
- **Padding:** `12px 16px`, border-radius `8px`.
- **Resize:** `resize: vertical` with minimum height bound.

---

## 5. Select & Dropdown Primitives (`SelectCombobox`, `LabeledSelect`)

### Anatomy
- **Native Select Molecule (`LabeledSelect`):** Native `<select>` element wrapped with custom accessible chevron down indicator (`<ChevronDown size={18} />`). Supports `<optgroup>` hierarchies and pure options.
- **Searchable Combobox (`SelectCombobox`):** Typeahead text input triggering an absolute-positioned floating listbox (`role="listbox"`, `aria-expanded="true/false"`).

### Geometry
- **Height:** Exactly `48px`.
- **Padding:** `0 40px 0 16px` (right padding reserves space for chevron).
- **Font Size:** `16px` (mobile zoom defense).

---

## 6. Checkbox Primitive (`Checkbox`)

### Anatomy
- **Root Element:** `<label htmlFor={id} className="ds-touch-target">`.
- **Hidden Input:** Native `<input type="checkbox" id={id}>` visually hidden (`opacity: 0`).
- **Visual Box:** `20px x 20px` square container with `4px` radius.
- **Checkmark:** `<Check size={14} color="#FFFFFF" strokeWidth={3} />` rendered conditionally when checked.
- **Label Body:** Full-width label text and optional sub-description.

### Geometry & Touch Bounds
- **Minimum Touch Bounding Box:** `44px x 44px` minimum vertical hit target satisfying WCAG 2.2 SC 2.5.8.
- **Box Dimensions:** `20px x 20px`, border `2px solid #CBD5E1` (idle) or `2px solid #066F7B` (checked).
- **Checked Surface:** Solid fill `var(--ds-color-action-teal)` (`#066F7B`).

---

## 7. Radio Button & Radio Group (`RadioButton`, `RadioGroup`)

### Anatomy
- **RadioGroup Container:** `<div role="radiogroup" aria-label={groupLabel}>`.
- **RadioButton Item:** `<label>` wrapping native hidden `<input type="radio">`, custom 20px circular indicator with 8px solid center dot, and accessible label text.

### States
- **Idle:** Border `2px solid #CBD5E1`, background `#FFFFFF`.
- **Checked:** Outer border `5px solid #08A5B5`, center `#FFFFFF`.
- **Focus-Visible:** Outline `2px solid #132766` with `2px offset`.

---

## 8. Segmented Choice & Tile Selectors (`SegmentedControl`, `LiabilityLimitSelector`)

### Anatomy
- **Container:** `<div role="radiogroup" className="ds-segmented-control">`.
- **Tiles:** Individual clickable buttons/cards declaring `role="radio"`, `aria-checked="true/false"`.
- **Badge:** Optional `[ RECOMMENDED ]` pill tag anchored at top-right.

### Geometry
- **Tile Height:** Minimum `74px` for multi-tier cards; `48px` for single-row segments.
- **Border:** `1px solid #CBD5E1` (idle) $\rightarrow$ `2px solid #08A5B5` (active selected).
- **Active Surface:** Soft teal tint `#F0FAFA` (`var(--ds-color-surface-brand-tint)`).

---

## 9. Feedback & Status Primitives (`FieldLabel`, `ErrorMessage`, `HelperText`)

### Specifications
- **`FieldLabel`:** `<label htmlFor={id}>` rendered in Inter 500, 14px `#334155`. Appends red asterisk `<span aria-hidden="true">*</span>` if `required=true`.
- **`ErrorMessage`:** `<p id={errorId} role="alert" aria-live="polite">` rendered in Inter 500, 13px `#B91C1C`. Displays adjacent `<AlertCircle size={14} />`.
- **`HelperText`:** `<p id={helperId}>` rendered in Inter 400, 13px `#64748B`.

---

## 10. Modal & Drawer Primitives (`Modal`, `MobileSummaryDrawer`)

### Anatomy
- **Backdrop Overlay:** Fixed full-screen container with background `rgba(19, 39, 102, 0.40)`.
- **Modal Dialog Box:** Centered container, max width `540px` (or `720px` for policy terms), border-radius `12px` (`radii.2xl`), box-shadow `elevation.modal`.
- **Mobile Drawer:** Positioned at `bottom: 0`, full width, top radii `12px`, with native drag handle indicator (`36px x 4px`).
- **Focus Trap:** Focus is locked within dialog while open; pressing `Escape` closes modal; focus restores to triggering element upon unmount.

