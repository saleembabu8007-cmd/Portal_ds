# LAYOUT, COMPOSITION & STRUCTURAL DIRECTION
## DoctorShield Individual Medical Professional Indemnity Portal

> **Document ID:** `DOC-DES-LAY-001`  
> **Status:** Design Foundations Baseline (Phase 04)  
> **Classification:** [PROPOSED / SPECIFICATION]  
> **Author:** Principal Product Design Director & Senior Interaction Architect  
> **Created:** 2026-10-30  
> **Governance:** DoctorShield Product Engineering & Design Rules v2.0 (AGENTS.md)  
> **Scope:** Exact compositional rules for all 14 core UI structural regions, surface taxonomy guidelines, and spatial alignment principles.

---

## 1. The Surface Taxonomy: Escaping "Card-Only" Design

A pervasive anti-pattern in amateur insurance portals is wrapping every single question, input, and paragraph in a distinct bordered card. This creates visual clutter, nested boxes, and severe cognitive fatigue.

DoctorShield enforces a strict **Surface Taxonomy**:

```
+--------------------------------------------------------------------------------------------------+
|                                    SURFACE TAXONOMY DECISION TREE                                |
+--------------------------------------------------------------------------------------------------+
| 1. Is this a standard text input, datepicker, or linear question?                                 |
|    --> USE OPEN LAYOUT (No container, no border, generous whitespace on canvas).                 |
|                                                                                                  |
| 2. Is this an interactive option where the user chooses between distinct packages or limits?     |
|    --> USE SELECTABLE CARDS (Bordered tile, explicit active border, dynamic price delta).         |
|                                                                                                  |
| 3. Is this a multi-field logical subsystem with internal repeatability (e.g. Clinic Branches)?    |
|    --> USE BORDERED PANEL (Single white container grouping the related branch inputs).           |
|                                                                                                  |
| 4. Is this lengthy policy extract or supporting definition?                                      |
|    --> USE CONTEXTUAL DISCLOSURE (Collapsible drawer with subtle hairline divider).              |
|                                                                                                  |
| 5. Is this the financial calculation summary on mobile (< 480px)?                                |
|    --> USE SLIDE-UP BOTTOM DRAWER (Triggered via persistent bottom action bar).                  |
|                                                                                                  |
| 6. Is this a critical legal confirmation or system interrupt (Retroactivity, Expiration)?        |
|    --> USE MODAL DIALOG (Centered, accessible modal with navy backdrop overlay).                 |
+--------------------------------------------------------------------------------------------------+
```

---

## 2. Detailed Compositional Rules for 14 Core Structural Elements

### 2.1 Application Header (`AppHeader`)
- **Visual Anatomy:** Compact 52px height (48px mobile), flat `#FFFFFF` surface, hairline bottom border (`1px solid #DFE6EC`). Zero elevation.
- **Left Zone:** DoctorShield official logo (`#08A5B5` mark with `#132766` wordmark). Height: 26px. Click target returns to home with data preservation confirmation dialog.
- **Center Zone (Desktop):** Step progress tracker integrated seamlessly into header baseline.
- **Right Zone:** Discrete support micro-trigger (`1800-88-DOCS` / Help icon) opening a non-disruptive contextual help slide-over.

---

### 2.2 Page Structure & Canvas (`StageContainer`)
- **Canvas Color:** Warm, clinical `#F8FAFB` (`primitiveColors.slate[50]`). Replaces harsh pure white glare and creates natural contrast against white form controls.
- **Max Width:** Centered container with max width `1120px` and responsive gutters (`16px` mobile, `24px` tablet, `32px` desktop).
- **Layout Modes:**
  - *Mode A (Focused 1-Column):* Used for Stage 1, Stage 3, and Stage 5. Max width: `680px` centered. Minimizes eye travel and maximizes form focus.
  - *Mode B (Split 2-Column):* Used for Stage 2 (Quotation) and Stage 4 (Review & Checkout). Form region: `65%` (`600px`), Sticky Summary: `35%` (`320px`), Gutter: `48px`.

---

### 2.3 Main Form Region (`FormRegion`)
- **Composition:** Open layout on canvas. No wrapping box.
- **Header Block:**
  - Stage Title: Kanit 500, 28px `#132766`.
  - Subtitle: Inter 400, 15px `#475569`.
  - Bottom Margin: `32px` (`spacing[8]`).
- **Reading Span:** Inputs constrained to `100%` of the `600px` form column or `680px` centered canvas. Inputs never stretch beyond `680px` to maintain optimal visual reading spans.

---

### 2.4 Quotation Summary (`SummarySidebar` / `SummaryCard`)
- **Desktop Treatment:** Sticky sidebar (`position: sticky; top: 76px;`) occupying the 35% right column.
  - Surface: `#FFFFFF` white panel with `1px solid #DFE6EC` border and `10px` radius (`radii.xl`).
  - Subtle elevation: `elevation.subtle` (`0 1px 3px 0 rgba(19, 39, 102, 0.05)`).
- **Mobile Treatment (< 768px):** Transformed into a persistent 64px sticky bottom action bar with slide-up bottom drawer. Summaries are *never* duplicated at the top of form pages.

---

### 2.5 Step Navigation (`StepProgressTracker`)
- **Desktop Alignment:** Centered in header or directly above main stage title.
- **Step Anatomy:** 4 discrete sequential steps:
  1. `Quotation` $\rightarrow$ 2. `Coverage` $\rightarrow$ 3. `Particulars` $\rightarrow$ 4. `Payment`
- **Visual State Treatment:**
  - *Completed:* 24px circular badge with `#08A5B5` fill and white checkmark. Step title in `#132766` Inter 500. Clickable to navigate backward.
  - *Active:* 24px circular badge with `#132766` fill and white number. Step title in `#132766` Inter 500 with subtle bottom indicator pill.
  - *Upcoming:* 24px circular badge with `#F1F5F9` fill and `#94A3B8` border. Step title in `#94A3B8` Inter 400. Non-interactive (`cursor: default`).
- **Connecting Lines:** 2px horizontal lines connecting step nodes (`#08A5B5` for completed intervals, `#DFE6EC` for upcoming intervals).

---

### 2.6 Content Alignment & Grid Disciplines
- **Strict Left Alignment:** All form labels, inputs, descriptions, and section titles are strictly left-aligned (`text-align: left`). Centered form labels are strictly prohibited.
- **Tabular Right Alignment:** All currency values, pro-rated deltas, and financial totals are right-aligned to maintain vertical decimal alignment (`font-variant-numeric: tabular-nums`).
- **Two-Column Field Grids:** On desktop, complementary fields (e.g., Postcode + City, DOB + Gender) sit on a clean 2-column grid with a `16px` horizontal gap. On mobile, they stack vertically.

---

### 2.7 Section Separation & Visual Breaks
- **Major Sections:** Separated by `40px` (`spacing[10]`) vertical whitespace.
- **Internal Subsections:** Separated by `24px` (`spacing[6]`) vertical whitespace and a subtle hairline divider (`1px solid #E2E8F0`).
- **Prohibition:** No thick colored bars, decorative patterned dividers, or full-width background alternating stripes.

---

### 2.8 Field Grouping (`FormGroup`)
- **Vertical Flow:**
  1. Label (`Inter 500, 14px, #334155`) + Optional tag if not mandatory.
  2. Spacing: `6px` (`spacing.semantic.labelToControl`).
  3. Input Control (`48px height, 16px text, 1px solid #CBD5E1`).
  4. Spacing: `6px` (`spacing.semantic.controlToError`).
  5. Helper Text (`Inter 400, 13px, #64748B`) OR Validation Error (`Inter 500, 13px, #B91C1C`).
- **Spacing to Next Field:** `20px` standard (`spacing.semantic.fieldToField`).

---

### 2.9 Coverage Selection (`AddonCard` & `LimitTiles`)
- **Indemnity Limit Selection:** 4 selectable horizontal tiles on desktop (RM 500k, 1M, 2M, 5M).
  - Idle: `#FFFFFF` surface, `1px solid #DFE6EC` border.
  - Active: `#F0FAFA` teal tint surface, `2px solid #08A5B5` border.
- **Optional Add-on Cards:** Modular stacked vertical cards.
  - Checkbox / Switch toggle on left (44x44px target).
  - Add-on Title + Layman benefit description in center.
  - Pro-rated net price delta on right (`+RM 200.55 pro-rated`).
  - Expandable `[ Details v ]` trigger revealing policy extract in an inline drawer.

---

### 2.10 Financial Information & Tables
- **Table Composition:** Disciplined two-column financial breakdown:
  - Left Column: Description line item (Inter 400, 14px `#475569`).
  - Right Column: Exact RM amount (Inter 500, 15px `#1E293B`, tabular figures).
- **Subtotal & Deductions:**
  - 10% Direct Rebate displayed in green/teal: `-RM 50.97` (`#066F7B`).
  - Service Tax (8% SST) and Stamp Duty (RM 10.00) displayed as separate line items.
- **Total Payable Row:**
  - Separated by `2px` double-line or subtle divider (`#CBD5E1`).
  - Label: Inter 500, 16px `#132766`.
  - Amount: Kanit/Inter 500, 24px `#132766` (`font-variant-numeric: tabular-nums`).

---

### 2.11 Legal Information & Statutory Disclosures
- **FSA 2013 Duty of Disclosure & PDPA 2010:**
  - Framed in an open, high-readability container on `#FFFFFF` surface with `1px solid #DFE6EC` border and `8px` radius.
  - Text: Inter 400, 12px/18px `#475569`.
  - Checkbox: Native accessible checkbox (`20px` mark inside `44x44px` touch zone) with full legal declaration text clickable as a label.
- **PIDM Protection Notice:**
  - Anchored permanently in `AppFooter` on all screens; link triggers an accessible info modal (`POP-TERMS-001`).

---

### 2.12 Primary and Secondary Actions (`Button`)
- **Primary CTA:**
  - Height: `48px` (`controls.buttonHeight`).
  - Background: Brand Navy `#132766` (Desktop checkout) or Brand Teal `#08A5B5` (Stage advancement).
  - Text: `#FFFFFF` Inter 500, 15px.
  - Radius: `6px` (`radii.md`).
  - Hover: Darker tone (`#192C5B` or `#066F7B`), 150ms ease-in-out transition.
  - Focus: `2px solid #132766` with `2px offset`.
- **Secondary Action (Back / Cancel):**
  - Height: `48px` or `36px` compact.
  - Style: Subtle ghost / outline button (`1px solid #CBD5E1`, `#FFFFFF` bg, `#334155` text).
  - Hover: `#F1F5F9` background, `#17253B` text.

---

### 2.13 Mobile Composition (390px Baseline)
- **Viewport Constraints:** Single column layout (`100%` width), `16px` side gutters.
- **Eliminating Horizontal Overflow:** Strict `overflow-x: hidden` on viewport. Tables are completely banned; multi-column inputs stack vertically.
- **Sticky Bottom Action Bar:** Persistent 64px bar anchored at `bottom: 0` containing Total Amount, `[ View Breakdown ^ ]` toggle, and `[ Continue -> ]` primary button.
- **Scroll Clearance:** All form pages include `padding-bottom: 80px` to prevent form controls or submit buttons from being obscured by the sticky bar.

---

### 2.14 Feedback, Validation & Error States
- **Inline Field Errors:**
  - Position: Exactly `6px` below the input control.
  - Style: Rose-700 (`#B91C1C`) Inter 500, 13px, with discrete circular error icon (`14px`).
  - Input Border: Transitions to `2px solid #EF4444`.
  - Accessibility: Linked via `aria-describedby` and `aria-invalid="true"`.
- **Non-Aggressive Timing:** Errors are *never* displayed while the user is actively typing. Validation evaluates only on `onBlur` or explicit step submission (`onSubmit`).
- **Success Confirmations:** Subtle emerald-800 (`#065F46`) tag on `#ECFDF5` background.

---

## 3. Visual Balance & Whitespace Distribution

```
[ Stage Layout Rhythm Blueprint ]

+--------------------------------------------------------------------------------------------------+
| App Header (52px height)                                                                         |
+--------------------------------------------------------------------------------------------------+
| <--- Margin Top: 32px --->                                                                       |
| Stage Title: Calculate Your Medical Indemnity Premium (Kanit 500, 28px)                          |
| Subtitle: Instant authoritative quotation. No personal ID required. (Inter 400, 15px)            |
| <--- Margin Bottom: 32px --->                                                                    |
|                                                                                                  |
| [ Field 1: Classification Picker ]                                                               |
| <--- Margin: 20px --->                                                                           |
| [ Field 2: Indemnity Limit Tiles ]                                                               |
| <--- Margin: 20px --->                                                                           |
| [ Field 3: Inception Date Controls ]                                                             |
| <--- Margin: 32px --->                                                                           |
|                                                                                                  |
| [ Primary CTA Button: Calculate Instant Quote -> ] (48px height)                                 |
| <--- Margin Bottom: 64px --->                                                                    |
+--------------------------------------------------------------------------------------------------+
| Statutory Footer (PIDM Notice + Disclosures)                                                     |
+--------------------------------------------------------------------------------------------------+
```

---

## 4. Summary of Layout & Composition Governance

1. **Card Discipline:** Banned the "cards everywhere" anti-pattern; open layouts handle forms, cards are reserved for selectable choices.
2. **Split-Screen Desktop Efficiency:** Form (65%) and Sticky Summary (35%) maintain constant financial transparency without dominating page real estate.
3. **Mobile Drawer Pattern:** Persistent 64px bottom action bar + slide-up drawer replaces unwieldy mobile tables and headers.
4. **Deliberate Whitespace:** Predictable 20px / 32px / 40px vertical rhythm creates calm, executive clarity.

