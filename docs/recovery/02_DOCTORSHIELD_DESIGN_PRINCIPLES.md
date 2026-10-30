# DOCTORSHIELD — DESIGN PRINCIPLES & INTERACTION PHILOSOPHY
## The DoctorShield Aesthetic: Combining QIC Structure, Ditto Restraint, ACKO Clarity, and Baymard Rigor

```
==================================================================================================
DOCUMENT CLASSIFICATION:  [VERIFIED] DESIGN SYSTEM FOUNDATIONS
PHASE:                    Phase 02 — Insurance UX & Visual Benchmark Research
AUTHORITY:                Principal Product Architect & Design Systems Lead
DATE OF ENACTMENT:        2026-10-30
GOVERNING PHILOSOPHY:     Calm, Editorial, Healthcare-Appropriate, Institutional Trust
BRAND FOUNDATIONS:        Primary #08A5B5 | Secondary #132766 | Kanit (<=500) | Inter (400, 500)
CODEBASE SCOPE:           Strictly Read-Only (Zero Code Modifications)
==================================================================================================
```

---

## 1. Design Philosophy Statement

DoctorShield is not a generic consumer fintech app, nor a chaotic multi-tier enterprise SaaS dashboard. It is a **specialized, institutional professional insurance portal designed specifically for Malaysian medical practitioners**.

Doctors operating under high-stress clinical schedules demand an experience that is:
- **Exceptionally Fast:** Instant mathematical rating with zero unnecessary questions.
- **Visually Restrained:** Free of commercial gimmickry, aggressive urgency timers, or decorative illustrations.
- **Legally Transparent:** Unambiguous statutory disclosures and transparent tax calculations.
- **Ergonomically Respectful:** Fluid, responsive form controls designed for both hospital desktop workstations and mobile clinical rounds.

```
+---------------------------------------------------------------------------------------+
|  THE FOUR INSPIRATIONAL PILLARS OF DOCTORSHIELD                                       |
+---------------------------------------------------------------------------------------+
|  QIC ONLINE   ──>  Institutional structure, 65/35 grid, premium transactional clarity. |
|  DITTO        ──>  Human-centered simplicity, low-anxiety microcopy, visual restraint.|
|  ACKO         ──>  Modular add-on cards, interactive tiles, instant price recalculation|
|  BAYMARD      ──>  Research-informed form chunking, inline validation, zero drop-off.  |
+---------------------------------------------------------------------------------------+
```

---

## 2. The Seven Core Design Principles

### Principle 1: Editorial Restraint Over Visual Clutter
- **Rule:** Minimalism must be achieved through disciplined information architecture, not by deleting mandatory legal text.
- **Application:** Avoid decorative icons beside every heading, random gradient backdrops, floating drop shadows, or glassmorphic cards. Let strong typography, purposeful spacing, and clean alignment guide the eye.

### Principle 2: Architectural Clarity Over Nested Cards
- **Rule:** Eliminate "Nested Card Syndrome". Never place a card inside a card inside a shaded panel.
- **Application:** A flat, single-level container model. Pure white cards (`#FFFFFF`) with subtle 1px slate borders (`#DFE6EC`) resting on a soft off-white canvas (`#F8FAFB`). Separate logical form sections with subtle horizontal dividers rather than new boxes.

### Principle 3: Healthcare-Appropriate Precision & Trust
- **Rule:** The visual tone must reflect medical precision, legal probity, and institutional safety.
- **Application:** Restrict heading typography strictly to **Kanit**, weights **400 or 500 only** (never bold 600+). Body text in **Inter** (400 or 500). Brand primary `#08A5B5` is reserved for key active states; body and interactive links use accessible high-contrast derivatives (**`#066F7B`** and **`#055C66`**) to guarantee WCAG 2.1 AA compliance.

### Principle 4: Instant Financial Transparency (Zero Sticker Shock)
- **Rule:** Every price change must be instantly and visibly accounted for with mathematical rigor.
- **Application:** Maintain a persistent quotation summary ledger. Clearly separate annual gross base premium, pro-rata adjustments, affinity partner discounts, optional add-on protections, SST 8%, and Stamp Duty (RM 10.00). Use tabular numerals for all financial figures.

### Principle 5: Frictionless Progressive Disclosure
- **Rule:** Reveal complex decisions only when the applicant's prior selections make them relevant.
- **Application:** Do not display clinic entity questions or branch allocation tables if the doctor has selected "Non-Clinic Owner". Do not expand detailed narrative claim textareas unless an adverse declaration is flagged.

### Principle 6: Non-Destructive Data Preservation
- **Rule:** Modifying an earlier answer must never unexpectedly erase unrelated valid data.
- **Application:** If a doctor navigates back from Stage 3 to Stage 2 to adjust their indemnity limit, their personal particulars, MMC registration number, and clean underwriting answers are preserved. Only stale price calculations are invalidated.

### Principle 7: Mobile Ergonomics as a First-Class Citizen
- **Rule:** Mobile layouts must be independently composed for small touchscreens, not merely shrunk down.
- **Application:** Enforce minimum 44x44px touch targets. Enforce minimum 16px font-size on all mobile inputs to permanently eliminate iOS Safari viewport auto-zoom. Chunk complex monolithic forms into sub-steps to eliminate 4,200px scroll traps.

---

## 3. Concrete Design System Token Mapping

These tokens are codified in [`src/design-system/tokens.ts`](file:///c:/Users/salee/Downloads/Portal_ds/src/design-system/tokens.ts) and [`tokens.css`](file:///c:/Users/salee/Downloads/Portal_ds/src/design-system/tokens.css):

### 3.1 Color Token Architecture
```css
/* Official Brand Colors */
--ds-primitive-color-teal-500: #08A5B5;  /* Official Brand Primary (Accent / Brand Marks) */
--ds-primitive-color-navy-900: #132766;  /* Official Brand Secondary (Headings / Badges) */

/* Accessible Interactive Brand Variants (WCAG 2.1 AA Compliant on White) */
--ds-primitive-color-teal-700: #066F7B;  /* Interactive Teal (5.89:1 Contrast) */
--ds-primitive-color-teal-800: #055C66;  /* High-Contrast Link Teal (7.69:1 Contrast) */

/* Neutral Foundation */
--ds-primitive-color-slate-0:   #FFFFFF;  /* Card Surface */
--ds-primitive-color-slate-50:  #F8FAFB;  /* Page Canvas Background */
--ds-primitive-color-slate-200: #DFE6EC;  /* Subtle Card Border */
--ds-primitive-color-slate-300: #CBD5E1;  /* Default Control Border */
--ds-primitive-color-slate-500: #64748B;  /* Muted Helper Text */
--ds-primitive-color-slate-600: #475569;  /* Secondary Body Text */
--ds-primitive-color-slate-900: #17253B;  /* Primary Body Text (13.25:1 Contrast) */
```

### 3.2 Typography Scale & Weight Limits
```css
/* Font Families */
--ds-primitive-font-heading: 'Kanit', -apple-system, BlinkMacSystemFont, sans-serif;
--ds-primitive-font-body:    'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--ds-primitive-font-mono:    'JetBrains Mono', 'Fira Code', monospace;

/* Strict Font Weight Ceilings */
--ds-primitive-font-weight-regular: 400;
--ds-primitive-font-weight-medium:  500;
/* Strict Invariant: Weight 600+ (font-semibold, font-bold) is strictly prohibited on Kanit */
```

### 3.3 Geometry & Elevation Tokens
```css
/* Spacing (4px Base Grid) */
--ds-space-1:  4px;
--ds-space-2:  8px;
--ds-space-3:  12px;
--ds-space-4:  16px;
--ds-space-6:  24px;
--ds-space-8:  32px;

/* Border Radii */
--ds-radius-sm: 4px;   /* Form inputs, badges */
--ds-radius-md: 6px;   /* Buttons, cards */
--ds-radius-lg: 8px;   /* Section containers, modals */
--ds-radius-full: 9999px; /* Pill tags, circular steppers */

/* Elevation & Shadows */
--ds-shadow-none: none; /* Default for cards; use 1px borders instead */
--ds-shadow-sm:   0 1px 3px rgba(19, 39, 102, 0.05); /* Subtle component lift */
--ds-shadow-lg:   0 8px 24px rgba(19, 39, 102, 0.12); /* Modals and drawers only */
```

---
*Report certified by Principal Product Architect & Design Systems Lead.*

