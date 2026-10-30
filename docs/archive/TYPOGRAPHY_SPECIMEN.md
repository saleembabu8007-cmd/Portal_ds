# DoctorShield Design System — Typography Specimen & Rhythmic Scale

> **Document Reference:** `DOC-DS-TYPO-SPECIMEN-2026-10-29`  
> **Status:** Production Typography Specimen  
> **Author:** Principal Design Systems Architect & Typographer  
> **Governance Invariant:** Kanit restricted to weights 400 and 500 only. Zero font-weight 600+ permitted in headings.

---

## 1. Dual-Typeface Architecture

The DoctorShield typographic system balances institutional medical authority with flawless form scannability:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. KANIT (DISPLAY & HEADINGS ONLY)                                          │
│ • Sourced from Google Fonts. Modern, clean humanist sans-serif.             │
│ • Weight Invariant: 400 (Regular) and 500 (Medium) strictly.                │
│ • Role: Page titles (H1), section headers (H2), and major price totals.     │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ 2. INTER (BODY, FORMS, LABELS, BUTTONS, SUMMARIES & LEGAL)                  │
│ • Modern, neutral neo-grotesque engineered specifically for UI screens.     │
│ • Weight Invariant: 400 (Regular) and 500 (Medium) strictly.                │
│ • Role: 100% of inputs, labels, table rows, disclosures, and buttons.       │
│ • Feature Settings: 'tnum' 1 (tabular numerals enabled for pricing/dates).  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Master Typographic Scale Specimen

| Role / Token | Family | Weight | Desktop Size / Leading | Mobile Size / Leading | Tracking | Color Token | Sample Usage |
|---|---|:---:|:---:|:---:|:---:|---|---|
| **Page Heading** (`--ds-type-display`) | Kanit | 500 | `28px` / `36px` | `24px` / `32px` | `-0.01em` | `--ds-color-text-heading` (`#132766`) | `Select Your Professional Coverage` |
| **Section Heading** (`--ds-type-section`) | Kanit | 500 | `20px` / `28px` | `18px` / `24px` | `0em` | `--ds-color-text-heading` (`#132766`) | `Practitioner Identity` |
| **Subheading** (`--ds-type-subheading`)| Inter | 500 | `16px` / `24px` | `15px` / `22px` | `0em` | `--ds-color-text-primary` (`#17253B`) | `Clinic Practice Protection` |
| **Primary Body** (`--ds-type-body-lg`) | Inter | 400 | `16px` / `24px` | `15px` / `22px` | `0em` | `--ds-color-text-primary` (`#17253B`) | Explanatory introductory notes |
| **Secondary Body** (`--ds-type-body-sm`)| Inter | 400 | `14px` / `20px` | `14px` / `20px` | `0em` | `--ds-color-text-secondary` (`#475569`)| Descriptive sub-notes |
| **Form Label** (`--ds-type-label`) | Inter | 500 | `14px` / `20px` | `14px` / `20px` | `0em` | `--ds-primitive-color-slate-700` (`#334155`) | `Classification *`, `NRIC Number *` |
| **Input Text** (`--ds-type-input`) | Inter | 400 | `16px` / `24px` | `16px` / `24px` | `0em` | `--ds-color-text-primary` (`#17253B`) | `doctor@clinic.com.my` |
| **Field Helper** (`--ds-type-helper`) | Inter | 400 | `13px` / `18px` | `13px` / `18px` | `0em` | `--ds-color-text-muted` (`#64748B`) | `Co-terminates on 31 December` |
| **Legal Paragraph** (`--ds-type-legal`)| Inter | 400 | `13px` / `20px` | `13px` / `20px` | `0em` | `--ds-color-text-secondary` (`#475569`)| PIDM statement, Schedule 9 consent |
| **Price Display** (`--ds-type-price-lg`)| Kanit | 500 | `24px` / `32px` | `22px` / `28px` | `0em` | `--ds-color-text-heading` (`#132766`) | `RM 1,234.56` (Tabular) |
| **Price Inline** (`--ds-type-price-sm`)| Inter | 500 | `16px` / `24px` | `15px` / `22px` | `0em` | `--ds-color-text-heading` (`#132766`) | `+RM 650.00/yr` (Tabular) |
| **Button Text** (`--ds-type-btn`) | Inter | 500 | `15px` / `20px` | `15px` / `20px` | `0.01em`| Inverse (`#FFFFFF`) | `Proceed to Personal Details` |
| **Table Values** (`--ds-type-table`) | Inter | 400 | `14px` / `20px` | `13px` / `18px` | `0em` | `--ds-color-text-primary` (`#17253B`) | Summary table row figures |
| **Metadata Tag** (`--ds-type-tag`) | Inter | 500 | `12px` / `16px` | `11px` / `15px` | `0.02em`| `--ds-color-text-link` (`#055C66`) | `Recommended` |

---

## 3. Visual Representation: Typographic Hierarchy

```
[Page Heading]         Select Your Professional Coverage (Kanit 500, 28px/36px)
                       ────────────────────────────────────────────────────────

[Section Heading]      1. Professional Category (Kanit 500, 20px/28px)

[Form Label]           Classification * (Inter 500, 14px/20px)
[Input Field]          General Medical Practitioner (Inter 400, 16px/24px)
[Field Helper]         Annual policies co-terminate on 31 December (Inter 400, 13px/18px)

[Legal Paragraph]      The benefit(s) payable under eligible certificate/ policy/ product is(are) 
                       protected by PIDM up to limits. Please refer to PIDM's TIPS Brochure...
                       (Inter 400, 13px/20px, comfort-read line length)

[Price Display]        TOTAL: RM 1,234.56 (Kanit 500, 24px/32px, Tabular Figures)

[Button Text]          Proceed to Personal Details (Inter 500, 15px/20px)
```

---

## 4. Tabular Figures Invariant

In financial forms, proportional numerals cause columns of figures to jitter horizontally. The design system enforces:
```css
.ds-tabular-num,
.ds-price-display,
input[type="tel"],
input[type="date"] {
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum" 1;
}
```
This guarantees vertical decimal alignment across all quotation summaries and breakdown tables.

