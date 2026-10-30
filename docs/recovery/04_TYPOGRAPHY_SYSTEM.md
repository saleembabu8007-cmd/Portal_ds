# TYPOGRAPHY SYSTEM & EDITORIAL HIERARCHY
## DoctorShield Individual Medical Professional Indemnity Portal

> **Document ID:** `DOC-DES-TYPO-001`  
> **Status:** Design Foundations Baseline (Phase 04)  
> **Classification:** [PROPOSED / SPECIFICATION]  
> **Author:** Principal Design Systems Architect & Senior Typography Specialist  
> **Created:** 2026-10-30  
> **Governance:** DoctorShield Product Engineering & Design Rules v2.0 (AGENTS.md)  
> **Scope:** Definitive typography scales, font families, strict weight governance (Kanit <= 500), tracking, line heights, tabular figures, and responsive type mechanics.

---

## 1. Typography Philosophy: "Restrained Editorial Authority"

The typography system for DoctorShield combines the structural elegance of **Kanit** with the legendary functional readability and screen ergonomics of **Inter**:

- **Kanit (Display & Headings):** A modern, geometric humanist typeface with refined proportions. In DoctorShield, Kanit is **strictly capped at weight 500 (Medium)**. Weights 600, 700, and 800 are **strictly prohibited** across all codebases. This prevents the aggressive, heavy-handed "shouting" typical of consumer sales sites and imparts a sophisticated, editorial quality.
- **Inter (Body, Controls & Tables):** Designed specifically for computer screens, Inter provides exceptional legibility at small sizes (12px to 16px), tall x-height, clear differentiation of similar glyphs (`I`, `l`, `1`), and robust OpenType features including tabular numbers (`tabular-nums`).

---

## 2. Font Families & Web Font Loading Strategy

```css
/* Typography Primitives in tokens.css */
:root {
  --font-family-heading: 'Kanit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-family-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-family-mono: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
}
```

### Font Loading & Performance Rules:
1. **Self-Hosted / Optimized Google Fonts:** Fonts loaded via optimized `<link rel="preload">` with `font-display: swap` to prevent layout shifts.
2. **Strict Weight Subsets:** Only weights **400 (Regular)** and **500 (Medium)** are downloaded for both Kanit and Inter, eliminating unneeded font file weight (> 120 kB saved).
3. **OpenType Features Enabled:**
   - `font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11'` for Inter (enhanced clarity of numbers and lowercase letters).
   - `font-variant-numeric: tabular-nums` for all currency amounts, dates, policy reference numbers, and percentages.

---

## 3. Master Typography Scale Specification

```
+----------------------------------------------------------------------------------------------------------------------------------+
|                                                  MASTER TYPOGRAPHY SCALE MATRIX                                                  |
+--------------------+--------+--------+--------+---------+------------+----------+-----------------------+------------------------+
| Semantic Role      | Font   | Weight | Size   | Size px | Line Ht px | Tracking | Color (Default)       | Typical Component      |
+--------------------+--------+--------+--------+---------+------------+----------+-----------------------+------------------------+
| **Display / Title**| Kanit  | 500    | 1.75rem| 28px    | 34px (1.2) | -0.02em  | `#132766` (Navy 900)  | Stage 1..5 Page Header |
| **Section Title**  | Kanit  | 500    | 1.25rem| 20px    | 26px (1.3) | -0.01em  | `#132766` (Navy 900)  | Major Form Section H2  |
| **Subsection / H3**| Inter  | 500    | 1.0rem | 16px    | 24px (1.5) | -0.005em | `#1E293B` (Slate 800) | Card Title, Group Head |
| **Form Label**     | Inter  | 500    | 0.875r | 14px    | 20px (1.4) | 0        | `#334155` (Slate 700) | Input & Select Labels  |
| **Input Value**    | Inter  | 400    | 1.0rem | 16px    | 24px (1.5) | 0        | `#17253B` (Slate 900) | Textfield User Value   |
| **Body / Paragraph**| Inter | 400    | 0.9375r| 15px    | 22px (1.5) | 0        | `#334155` (Slate 700) | Explanatory Text       |
| **Helper Text**    | Inter  | 400    | 0.8125r| 13px    | 18px (1.4) | 0        | `#64748B` (Slate 500) | Field Subtitle/Guidance|
| **Validation Error**| Inter | 500    | 0.8125r| 13px    | 18px (1.4) | 0        | `#B91C1C` (Rose 700)  | Inline Error Message   |
| **Financial Total**| Inter  | 500    | 1.5rem | 24px    | 30px (1.25)| -0.02em  | `#132766` (Navy 900)  | Total Payable RM Value |
| **Financial Delta**| Inter  | 500    | 0.9375r| 15px    | 22px (1.47)| 0        | `#0F172A` (Slate 900) | `+RM 200.55 pro-rated` |
| **Legal / Consent**| Inter  | 400    | 0.75rem| 12px    | 18px (1.5) | 0        | `#475569` (Slate 600) | FSA 2013, PDPA, PIDM   |
| **Primary Action** | Inter  | 500    | 0.9375r| 15px    | 20px (1.33)| +0.01em  | `#FFFFFF` (White)     | Button CTA Text        |
| **Pill / Badge**   | Inter  | 500    | 0.75rem| 12px    | 16px (1.33)| +0.02em  | `#066F7B` / `#065F46` | Status / Reinstatement  |
+--------------------+--------+--------+--------+---------+------------+----------+-----------------------+------------------------+
```

---

## 4. Role-by-Role Typography Specifications

### 4.1 Display / Page Title
- **Font:** `Kanit`, weight `500` (Medium).
- **Scale:** `28px` (Desktop) / `24px` (Mobile).
- **Line Height:** `34px` (Desktop) / `30px` (Mobile).
- **Letter Spacing:** `-0.02em` (optical tightening for large headlines).
- **Color:** Brand Navy `#132766`.
- **Usage:** Rendered exactly once per screen as the primary `<h1>` title (e.g. *"Calculate Your Medical Indemnity Premium"*, *"Your DoctorShield Quotation"*).

### 4.2 Section Title
- **Font:** `Kanit`, weight `500` (Medium).
- **Scale:** `20px` (Desktop) / `18px` (Mobile).
- **Line Height:** `26px` (Desktop) / `24px` (Mobile).
- **Letter Spacing:** `-0.01em`.
- **Color:** Brand Navy `#132766`.
- **Usage:** Major structural section dividers (`<h2>`), such as *"1. Doctor Profile & Identity"*, *"2. Clinic Facilities & Branches"*, *"3. Statutory Underwriting Declarations"*.

### 4.3 Form Label
- **Font:** `Inter`, weight `500` (Medium).
- **Scale:** `14px` (`0.875rem`).
- **Line Height:** `20px`.
- **Letter Spacing:** `0`.
- **Color:** Slate-700 `#334155` (Contrast: **7.88:1** on white).
- **Usage:** Associated directly with form inputs via `<label htmlFor="...">`. If optional, appended with subtle Inter 400 tag: `(Optional)` in `#64748B`.

### 4.4 Form Input Value (iOS Zoom Defense)
- **Font:** `Inter`, weight `400` (Regular).
- **Scale:** **`16px` (`1.0rem`) strictly.**
- **Line Height:** `24px`.
- **Letter Spacing:** `0`.
- **Color:** Slate-900 `#17253B`.
- **Rule:** Mobile WebKit (iOS Safari) automatically forces page zoom when focusing any `<input>` or `<select>` with font size under 16px. DoctorShield mandates 16px across all inputs, eliminating disruptive screen jumps.

### 4.5 Financial Figures & Tabular Formatting
- **Font:** `Inter`, weight `500` (Medium).
- **CSS Directive:** `font-variant-numeric: tabular-nums; text-align: right;`
- **Breakdown Amounts:** `15px` / `22px`, color `#1E293B`.
- **Total Payable Amount:** `24px` / `30px` (Desktop) or `20px` / `26px` (Mobile), color `#132766`.
- **Currency Prefix:** `RM` prefix styled in Inter 500, with a single non-breaking space before the digits (`RM 1,812.00`). Tabular numbers guarantee exact vertical decimal alignment across multi-row summaries.

### 4.6 Statutory Disclosures & Legal Notes
- **Font:** `Inter`, weight `400` (Regular).
- **Scale:** `12px` (`0.75rem`).
- **Line Height:** `18px` (`1.5` ratio for optimal legal readability).
- **Color:** Slate-600 `#475569` (Contrast: **5.64:1** on white, satisfying WCAG AA).
- **Usage:** Mandatory disclosures under FSA 2013, PDPA 2010, and PIDM protection notes. Never rendered in microscopic or unreadable low-contrast gray.

### 4.7 Validation Feedback Text
- **Font:** `Inter`, weight `500` (Medium).
- **Scale:** `13px` (`0.8125rem`).
- **Line Height:** `18px`.
- **Color:** Rose-700 `#B91C1C` (Contrast: **5.92:1** on white).
- **Usage:** Inline field errors, rendered `6px` below input with `role="alert"`.

---

## 5. Responsive Typography Adjustments

Typography smoothly scales between desktop (1440px) and mobile (390px) without jagged breakpoint jumps:

```css
/* Responsive Fluid Typography Rules */
@media (max-width: 768px) {
  :root {
    --text-display-size: 1.5rem;    /* 24px on mobile (down from 28px) */
    --text-display-lh: 1.875rem;   /* 30px on mobile (down from 34px) */
    
    --text-section-size: 1.125rem;  /* 18px on mobile (down from 20px) */
    --text-section-lh: 1.5rem;      /* 24px on mobile (down from 26px) */

    --text-total-size: 1.25rem;     /* 20px on mobile (down from 24px) */
    --text-total-lh: 1.625rem;      /* 26px on mobile (down from 30px) */
  }
}
```

---

## 6. Prohibited Typographic Practices

1. **No Kanit Bolding:** Never declare `font-weight: 600`, `font-weight: 700`, `font-weight: 800`, or `font-weight: bold` on Kanit elements.
2. **No All-Caps Headings:** Never transform stage headings or section titles to `text-transform: uppercase`. Standard Title Case or Sentence Case ensures calm readability.
3. **No Center-Aligned Body Text:** Body copy, descriptions, and form inputs must always be left-aligned. Center alignment is reserved solely for modal confirmation icons.
4. **No Low-Contrast Gray Text:** Slate-400 (`#94A3B8`) is reserved for placeholder text and disabled states; it must never be used for visible labels or instructions.

---

## 7. Summary of Typography Governance

1. **Two Complementary Families:** Kanit $\le$ 500 for editorial headings; Inter 400/500 for precision body and data.
2. **Strict iOS Zoom Immunity:** 16px standard input size eliminates jarring viewport scaling.
3. **Tabular Financial Alignment:** `tabular-nums` ensures numbers align vertically in summary breakdowns.
4. **100% WCAG AA Contrast Compliance:** Every text tier satisfies or exceeds 4.5:1 on its respective background.

