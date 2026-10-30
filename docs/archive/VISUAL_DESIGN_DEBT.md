# DoctorShield Individual Indemnity — Visual Design Debt Inventory

> **Document Reference:** `DOC-VIS-DEBT-2026-10-29`  
> **Status:** Codebase Audit & Technical Design Debt Inventory  
> **Auditor:** Principal Product Designer & Design Systems Architect  
> **Target Scope:** All Front-End UI Components, Scaffolds, and Stylesheets  
> **Mandate:** Concrete catalog of CSS token violations, inline styling proliferation, elevation/border debt, typography inconsistencies, and hit target failures on the **EXISTING CODEBASE**.

---

## 1. Executive Summary

A comprehensive scan of `src/` reveals a stark architectural dichotomy:
- **Design Tokens Repository (`src/design-system/tokens.css`):** Extremely well-structured, possessing an exhaustive 3-tier token architecture (Primitives, Semantics, Components) aligned with Chubb and JA Assure brand guidelines and WCAG 2.2 AA contrast standards.
- **Implementation Reality (`src/features/` & `src/components/`):** Severe visual debt. Rather than leveraging the semantic CSS utility tokens, UI components have accumulated **493 inline `style={{ ... }}` blocks**. 

Developers and AI scaffolding scripts hardcoded arbitrary pixel values (`13px`, `15px`, `7px`), ad-hoc padding values (`8px 16px`, `18px 22px`), and arbitrary hex codes (`#10B981`, `#0EA5E9`, `#64748B`) directly into JSX props. The result is a fragmented visual presentation that looks like a patchwork of independently developed wireframes.

```
+-----------------------------------------------------------------------------------+
|                           VISUAL DEBT SEVERITY MATRIX                             |
|                                                                                   |
|  [CRITICAL]  493 Inline Style Declarations bypassing Design Tokens                |
|  [HIGH]      Card-in-Card Nesting with Multi-Border Stacking                      |
|  [HIGH]      6 Uncoordinated Background Tints on Single Viewport                  |
|  [MEDIUM]    Kanit Heading Weight Violations (Font Weight 600+ detected)          |
|  [MEDIUM]    Sub-44px Touch Hitboxes on Radio Cards & Accordion Triggers          |
+-----------------------------------------------------------------------------------+
```

---

## 2. Inline Style Proliferation Audit

A regex sweep across `src/features` and `src/components` identified 493 inline style blocks. Below is the density distribution by feature module:

| Module / Component | File Path | Inline Style Blocks | Primary Violations |
|---|---|---|---|
| **Stage 1: Coverage** | `src/features/coverage/Stage1CoverageForm.tsx` | 114 | Hardcoded card borders, limit grid dimensions, flex alignments, arbitrary font sizes (11px, 13px, 15px) |
| **Stage 2: Quote Review** | `src/features/quote/Stage2QuoteReview.tsx` | 138 | 4-layer nested card borders, countdown timer styles, pro-rata box styling, add-on card paddings |
| **Stage 3: Particulars** | `src/features/particulars/Stage3ParticularsForm.tsx` | 76 | Address grid gaps, salutation inline widths, NRIC helper callouts |
| **Stage 3: Branch Manager** | `src/features/particulars/BranchManager.tsx` | 38 | Table borders, action button padding, revenue ceiling alert banner |
| **Stage 3: Underwriting** | `src/features/underwriting/UnderwritingQuestionnaire.tsx` | 52 | Yellow disclosure textareas, Agree/Disagree radio cards, COVID accordion headers |
| **Stage 4: Checkout** | `src/features/review/Stage4ReviewAndPayment.tsx` | 49 | Policy review table cells, payment option radio boxes, card security badges |
| **Layout & Shell** | `src/components/layout/BrandHeader.tsx`, `AppShell.tsx` | 26 | Co-branding border dividers, header utility button spacing, mobile summary drawer |
| **TOTAL** | | **493** | |

### Representative Inline Anti-Patterns
```tsx
// Anti-Pattern 1: Hardcoded styling bypassing token variables
<div style={{ padding: '18px 22px', borderRadius: '14px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>

// Anti-Pattern 2: Arbitrary typographic scales
<span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ds-primitive-color-navy-900)' }}>

// Anti-Pattern 3: Inconsistent button paddings
<button style={{ padding: '7px 13px', fontSize: '12px', background: '#08A5B5' }}>
```

---

## 3. Card Elevation & Border Overuse (Visual "Fences")

### 3.1 The Multi-Border Problem
Currently, the UI places borders around almost everything. For example, in `Stage2QuoteReview.tsx`:
1. `AppShell` container provides an outer boundary.
2. `Stage2QuoteReview` renders an outer section card with `border: 1px solid #E2E8F0; border-radius: 16px`.
3. Inside Section 1, the "Clinic Ownership" fieldset has `border: 1px solid #CBD5E1; border-radius: 12px`.
4. Inside Clinic Ownership, the "Sole Proprietorship vs Sdn Bhd" selector is in a grey box with `border: 1px solid #E2E8F0; background: #F8FAFC`.
5. Below that, the "Clinic Entity Protection Add-on" is another card with `border: 2px solid #08A5B5; border-radius: 12px; background: #FFFFFF; box-shadow: 0 4px 12px rgba(8,165,181,0.08)`.
6. Inside that add-on card, the liability limit options are 3 separate cards with `border: 1px solid #E2E8F0`.

**Visual Consequence:** The doctor looks through **6 concentric rectangular borders** to read a single liability limit figure. This creates visual claustrophobia and screams "prototype / wireframe".

### 3.2 Shadow & Elevation Misuse
- The codebase mixes flat zero-shadow containers with heavy floating shadows (`box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1)`).
- Decorative cards in Stage 2 use colored glow shadows (`rgba(8,165,181,0.15)`), violating Section 4.2 of `AGENTS.md`: *"No oversized shadows or unnecessary gradients"*.

---

## 4. Color Inconsistency & Semantic Dilution

### 4.1 Competing Background Palette
The application currently renders 6 distinct pastel background tints simultaneously:

| Color Hex | CSS Variable Equivalent | Current Usages | Problem |
|---|---|---|---|
| `#F0FDF4` | `--ds-primitive-color-emerald-50` | Rate lock timer, Promo code success | Draws high visual salience to an artificial 15-minute timer |
| `#F0F9FF` | `--ds-primitive-color-sky-50` | Pro-rata period card, Clinic add-on header | Creates an unnecessary "light blue" visual zone |
| `#FFFBEB` | `--ds-primitive-color-amber-50` | Claims explanation box, referral notice | High-anxiety warning tone used for neutral text inputs |
| `#FFF1F2` | `--ds-primitive-color-rose-50` | Validation errors, disciplinary disclosures | Confuses form errors with historical underwriting disclosures |
| `#F8FAFC` | `--ds-primitive-color-slate-50` | Default container background | Used indiscriminately behind inputs, cards, and tables |
| `#F1F5F9` | `--ds-primitive-color-slate-100` | Secondary container background | Creates dirty, low-contrast grey-on-grey stacking |

### 4.2 The Solution: Monochromatic Discipline
Refactor all content containers to pure `#FFFFFF` resting on a subtle `#F8FAFC` page background. Reserve `#EF4444` (Rose) exclusively for field validation errors and `#08A5B5` (Teal) exclusively for active user selection.

---

## 5. Typographic Hierarchy Failures

### 5.1 Violation of AGENTS.md Font Weight Rule
Rule 4.2 in `AGENTS.md` explicitly mandates:
> **"Heading font: Kanit, weight 400–500 only. Never bold (600+)."**

In `src/features/coverage/Stage1CoverageForm.tsx` (lines 104, 182, 340) and `src/features/quote/Stage2QuoteReview.tsx` (lines 88, 192), headings are styled with:
```tsx
fontFamily: 'var(--ds-primitive-font-heading)',
fontWeight: 600, // VIOLATION OF RULE 4.2
fontWeight: 700, // VIOLATION OF RULE 4.2
```
Kanit rendered at weight 600 and 700 produces an aggressive, heavy aesthetic that clashes with the refined, calm medical tone required by Chubb.

### 5.2 Size Jumps & Rhythmic Disconnect
The application uses 8 distinct font sizes without a clear typographic scale:
- `11px` (Promo code disclaimer)
- `12px` (Card helper subtitles)
- `13px` (Button labels in Stage 1)
- `14px` (Form labels and radio text)
- `15px` (Limit card amounts)
- `16px` (Standard body and section subtitles)
- `18px` (Subsection headers)
- `22px` (H2 stage headers)
- `28px` (H1 page titles)

**Target Standard:** Strictly adhere to the 4-step type scale defined in `tokens.css`:
- Display / H1: `24px` (Kanit 500)
- Section / H2: `18px` (Kanit 500)
- Card Title / Label: `14px` (Inter 600)
- Body / Help: `14px` (Inter 400)
- Caption / Legal: `12px` (Inter 400)

---

## 6. Inconsistent Touch Targets & Click Hitboxes

WCAG 2.2 Success Criterion 2.5.8 (Target Size - Minimum) requires interactive targets to be at least 24×24 CSS pixels, and for primary mobile interactions, at least 44×44 CSS pixels.

### 6.1 Audit of Sub-Standard Hitboxes
1. **Underwriting Agree / Disagree Radio Cards:** The clickable radio circle is 18×18 px. Although the surrounding text is clickable, the padding on mobile is only `6px 12px`, resulting in frequent mis-clicks when scrolling.
2. **Branch Manager Action Buttons:** The `Edit` and `Delete` icon buttons in the branch table have a hitbox of only 28×28 px with no visible hover ring.
3. **Stage 1 "Why 31st December?" Button:** Hitbox is 22 px tall, embedded inside a label, causing accidental modal triggers when trying to tap the date input on iOS Safari.
4. **Mobile Summary Drawer Handle:** The drag handle has a 20 px height without an expanded hit region.

---

## 7. Design Debt Remediation Strategy

1. **Extract Repeated Styles to CSS Classes:** Move all 493 inline style blocks into semantic CSS utility classes in `src/styles/portal-redesign.css`.
2. **Enforce `Kanit 400–500`:** Audit every heading tag and replace `font-weight: 600` / `700` with `font-weight: 500`.
3. **Flat Card Architecture:** Replace multi-layered card-in-card enclosures with a flat visual structure using clean dividers (`border-bottom: 1px solid var(--ds-primitive-color-slate-200)`).
4. **Normalize Input Hitboxes:** Enforce standard input height of `44px` on desktop and `48px` on mobile across all inputs, dropdowns, and button controls.

---

*This inventory forms the baseline for the visual debt refactoring phase.*

