# DoctorShield Individual Indemnity — Visual Language Reset & Art Direction

> **Document Reference:** `DOC-DES-VIS-RESET-2026-10-29`  
> **Status:** Art Direction Exploration & Visual Systems Specification  
> **Role:** Principal Visual Product Designer & Design Director  
> **Mandate:** Complete visual language reset moving away from generic, overdesigned, wireframe-like AI patterns toward a mature, deliberately crafted healthcare financial transaction experience.

---

## 1. Design Philosophy: The Discipline of Restraint

Minimalism in healthcare financial technology is not the absence of design; it is **precision in proportion, hierarchy, rhythm, and restraint**.

When an insurance application relies on heavy drop shadows, pastel callout cards, gradients, floating glass surfaces, and decorative icons, it reveals an absence of typographic confidence. In contrast, the world's most trusted financial and medical applications convey institutional strength through:
- **Flawless Typographic Hierarchy:** Allowing scale, weight, and tracking to communicate structure without requiring boxes around everything.
- **Monochromatic Quietness:** Resting on pure whites, deep navies, and calm slate grays, reserving brand teal strictly for moments of active focus and selection.
- **Gestalt Proximity:** Grouping fields through consistent 24px and 32px vertical rhythm rather than trapping inputs inside nested bordered pens.
- **Hairline Precision:** Using crisp 1px borders and dividers that define structure quietly.

---

## 2. Inventory of Prohibited Generic UI Patterns

The following patterns are permanently banned from the DoctorShield design system:

| Prohibited Anti-Pattern | Reason for Exclusion | Approved Replacement Pattern |
|---|---|---|
| **Gradient Backgrounds & Mesh Glows** | Screams crypto/startup; diminishes regulatory credibility. | Pure solid page surfaces (`#FFFFFF` or `#F8FAFC`). |
| **Icons Beside Every Title & Card** | Visual static; dilutes real functional icons. | Zero decorative heading icons. Functional icons only (calendar, chevrons). |
| **Card-in-Card Nesting** | Traps content in multiple concentric borders. | Flat layout using hairline dividers (`1px solid #E2E8F0`). |
| **Oversized Border Radii (16px–24px)** | Looks like a child's toy or consumer social app. | Refined, architectural radii (4px to 6px maximum). |
| **Pastel Background Patchwork** | 6 competing tints (sky, emerald, amber, rose, slate). | Pure white surfaces with neutral slate accents. |
| **Oversized Circular Step Badges** | Consumes 48px–60px of screen height without utility. | Clean 1-line typographic progress line with 2px accent bar. |
| **Artificial Rate-Lock Panic Countdowns** | Manufactured retail urgency inappropriate for doctors. | Calm factual validity note: `"Quote valid until 31 Dec [Year]"`. |
| **Gigantic CTA Buttons (56px–64px)** | Overwhelms layout and distorts visual weight. | Standardized 44px (touch-compliant) tailored action buttons. |
| **Floating Glass / Drop Shadow Blur** | Hard to read; causes performance and contrast issues. | Flat surfaces or subtle 1px ambient elevation. |

---

## 3. Direction A: "Editorial Minimal" (Swiss International / Financial Terminal)

### 3.1 Design Thesis
Inspired by Swiss typography, the *Financial Times*, and modern institutional financial tools (e.g. Stripe Terminal, Bloomberg Law). 

Direction A is driven almost entirely by **typography, white space, refined form alignment, and quiet hairline rules**. There are **no filled card containers**. All inputs, groups, and tables sit directly on the crisp canvas or on clean white planes divided by ultra-crisp 1px borders.

### 3.2 Design Token System (Direction A)
- **Surfaces:**
  - Page Background: `#FAFAFA`
  - Active Section Fill: `#FFFFFF`
  - Container Shadows: `none`
  - Radii: `4px` across all controls, buttons, and segmented tiles.
- **Borders & Dividers:**
  - Hairline Rule: `1px solid #E5E7EB`
  - Input Border: `1px solid #D1D5DB`
  - Focused / Selected Border: `1.5px solid #08A5B5`
- **Typography Hierarchy:**
  - Primary Heading (H1): **Kanit 500**, `22px` (Line height: `28px`), Tracking: `-0.01em`, Color: `#132766`.
  - Section Label (H2): **Inter 500**, `12px` uppercase, Tracking: `+0.05em`, Color: `#64748B`.
  - Field Label: **Inter 500**, `13px` (Line height: `18px`), Color: `#1E293B`.
  - Field Value / Input Text: **Inter 400**, `14px`, Color: `#0F172A`.
  - Numerals & Pricing: **Inter Tabular Figures**, `font-feature-settings: "tnum" 1`, Kanit 500 for totals.
- **Controls & CTAs:**
  - Input Height: `40px` (desktop), `44px` (mobile).
  - Segmented Radio Strips: Horizontal border group with `4px` radius. Active item has `#132766` text and a subtle bottom 2px teal indicator line.
  - Primary CTA: Flat Deep Navy `#132766` solid button, `40px` height, `4px` radius, white text, subtle hover (`#1E3A8A`).

---

## 4. Direction B: "Structured Minimal" (Linear / Modern Institutional Console)

### 4.1 Design Thesis
Inspired by developer and enterprise console architectures (e.g. Linear, Vercel, Apple Developer Portal).

Direction B uses **single-layer structured panels resting on a calm cool-grey canvas**. Instead of nesting cards within cards, every stage features a small number of cohesive white panels. Internal fields and choices are organized with hairline horizontal dividers and clear visual grouping.

### 4.2 Design Token System (Direction B)
- **Surfaces:**
  - Page Canvas: `#F8FAFC`
  - Structural Panels: `#FFFFFF`
  - Subtle Hover Surface: `#F0FAFA`
  - Elevation: `box-shadow: 0 1px 2px rgba(15, 23, 42, 0.05)` (subtle ambient grounding, no blur).
  - Radii: `6px` for panels, `6px` for inputs and buttons.
- **Borders & Dividers:**
  - Panel Border: `1px solid #E2E8F0`
  - Internal Divider: `1px solid #F1F5F9`
  - Input Border: `1px solid #CBD5E1`
  - Active Selected Border: `2px solid #08A5B5`
- **Typography Hierarchy:**
  - Primary Heading (H1): **Kanit 500**, `24px` (Line height: `32px`), Color: `#132766`.
  - Section Label (H2): **Kanit 500**, `16px`, Color: `#132766`.
  - Field Label: **Inter 500**, `13px`, Color: `#334155`.
  - Body & Help: **Inter 400**, `13px`, Color: `#64748B`.
  - Price Totals: **Kanit 500**, `24px`, Tabular Figures.
- **Controls & CTAs:**
  - Input Height: `44px` desktop and mobile.
  - Segmented Tiles: Standalone unboxed tiles with `1px solid #E2E8F0`. Active tile gets `2px solid #08A5B5` with pure white fill and zero shadow.
  - Primary CTA: Deep Navy `#132766` button with `6px` radius, `44px` height, Inter 500 font, crisp focus ring.

---

## 5. Comparative Screen Layout Specifications

---

### 5.1 Stage 1: Premium Calculation Screen

#### Direction A (Editorial Minimal) — Desktop 1440px
```
DoctorShield  ·  Medical Professional Indemnity                        Renew   Search   Documents
─────────────────────────────────────────────────────────────────────────────────────────────────
1. Coverage ────── 2. Quotation ────── 3. Details ────── 4. Checkout

Select Your Professional Coverage

PROFESSIONAL CATEGORY
Classification *
[ General Medical Practitioner                                                                ▼ ]

LIMIT OF LIABILITY (ANY ONE CLAIM & AGGREGATE)
[ RM 1,000,000  (Recommended) ] [ RM 2,000,000 ] [ RM 3,000,000 ] [ RM 5,000,000 ]

COVERAGE PERIOD
Inception Date *                       Expiry Date (Fixed)
[ 29/10/2026                        📅 ] [ 31/12/2026                                              🔒 ]
Annual policies co-terminate on 31 December.

CONTACT & PROMOTION
Practitioner Email *                   Promotional Code
[ doctor@clinic.com.my                 ] [ + Add Code ]

─────────────────────────────────────────────────────────────────────────────────────────────────
The benefit(s) payable under eligible certificate/ policy/ product is(are) protected by PIDM up 
to limits. Please refer to PIDM’s TIPS Brochure or contact Chubb Insurance Malaysia Berhad or PIDM.

[X] I have read, understood and agree to the terms and conditions, privacy policy and I meet all 
    local regulation to practice my profession. *

[ Generate Quotation ]
```

#### Direction B (Structured Minimal) — Desktop 1440px
```
DoctorShield  ·  Medical Professional Indemnity                       [ Renew ] [ Find ] [ Docs ]
─────────────────────────────────────────────────────────────────────────────────────────────────
1. Coverage  ·  2. Quotation  ·  3. Details  ·  4. Checkout
━━━━━━━━━━━

Select Your Professional Coverage

┌── COVERAGE SPECIFICATION ─────────────────────────────────────────────────────────────────────┐
│ Classification *                                                                              │
│ [ General Medical Practitioner                                                              ▼ ]│
│                                                                                               │
│ Limit Of Liability (Any One Claim & Aggregate) *                                              │
│ ┌───────────────────────────┐ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐          │
│ │ RM 1,000,000              │ │ RM 2,000,000  │ │ RM 3,000,000  │ │ RM 5,000,000  │          │
│ │ Recommended               │ │               │ │               │ │               │          │
│ └───────────────────────────┘ └───────────────┘ └───────────────┘ └───────────────┘          │
│                                                                                               │
│ Coverage Period                                                                               │
│ Inception Date *                            Expiry Date (Fixed)                               │
│ [ 29/10/2026                             📅 ] [ 31/12/2026                                   🔒 ]│
│ Co-terminates 31 December                                                                     │
├───────────────────────────────────────────────────────────────────────────────────────────────┤
│ Practitioner Email Address *                Promotional Code (Optional)                       │
│ [ doctor@clinic.com.my                    ] [ + Add promotional code                         ]│
└───────────────────────────────────────────────────────────────────────────────────────────────┘

"The benefit(s) payable under eligible certificate/ policy/ product is(are) protected by PIDM..."

[X] I have read, understood and agree to the terms and conditions, privacy policy and I meet all 
    local regulation to practice my profession. *

[ Generate Quotation ]
```

---

### 5.2 Stage 2: Optional Coverage & Add-on Selection

#### Direction A (Editorial Minimal)
- **Quotation Header:** No green card, no timer. 
  `RM 1,234.56` in 24px Kanit 500 tabular figures, subline: `Pro-rated for 29 Oct 2026 to 31 Dec 2026 (Standard 12-month annual equivalent: RM 1,500.00) · Quote valid until 31 Dec 2026`.
- **Add-on Questions:** Framed as clean typographic prompts:
  `PRACTICE ENTITY PROTECTION`
  `Do you own a clinic?  [ Yes ]  [● No ]`
  If `Yes` clicked: Reveals simple two-column sub-questions and an unboxed add-on row with a subtle left teal indicator line.
- **Reinstatement:** Quiet text line with check: `✓ Complimentary Automatic Reinstatement included at no charge.`
- **Action Bar:** Primary `[ Proceed to Personal Details ]` next to secondary `[ Email Quotation (PDF) ]`.

#### Direction B (Structured Minimal)
- **Quotation Header:** Clean `#FFFFFF` panel with a subtle top border accent in `#08A5B5`. Displays Net Premium, Pro-rata explanation, and validity date.
- **Add-on Panel:** Unified white panel titled `Practice Extensions`.
  - Question row separated by `1px solid #F1F5F9`.
  - If `Yes`: Expands entity controls and shows `Clinic Entity Protection` card with clear limit selection tiles (`RM 1M`, `RM 2M`, `RM 5M`).
- **Action Bar:** `[ Proceed to Personal Details ]` (solid navy) and `[ Email Quote (PDF) ]` (outline button).

---

### 5.3 Stage 3: Personal & Underwriting Form

#### Direction A (Editorial Minimal)
- **Form Layout:** Direct two-column grid on the `#FAFAFA` canvas with `32px` vertical separation between sections. No outer card.
- **Underwriting Section:** An editorial list of questions. Each question is set in Inter 400 (14px) with a subtle hairline rule beneath it.
  `Agree` / `Disagree` buttons are flat text-toggle buttons with `4px` radius.
  If Disagree: Textarea appears inline with `#FFFFFF` background and `1px solid #D1D5DB` border. Zero yellow alert boxes.

#### Direction B (Structured Minimal)
- **Form Layout:** Two distinct `#FFFFFF` panels with `1px solid #E2E8F0` borders:
  1. Panel 1: `Practitioner & Practice Details`
  2. Panel 2: `Statutory Underwriting Declarations`
- **Underwriting Section:** Numbered rows (1 to 4) with clean segmented radio toggles on the right.
  If Disagree: Subtle neutral slate container (`#F8FAFC`) expands smoothly with 13px helper label: `"Please provide details of previous claims or lawsuits"`.

---

### 5.4 Stage 4: Review & Final Quotation Summary

#### Direction A (Editorial Minimal)
- **Left Column (70%):** Unboxed Applicant Summary table with hairline row dividers. Minimal Payment Method selector with clean radio buttons.
- **Right Column (30% Sticky):** Plain-text financial ledger:
  ```
  Gross Premium         RM 1,400.00
  Pro-rata Adjustment   -RM   285.75
  Add-ons Total           RM     0.00
  Discount (Promo)      -RM   111.42
  ──────────────────────────────────
  Nett Premium          RM 1,002.83
  Service Tax (SST 8%)   RM    80.23
  Stamp Duty            RM    10.00
  ══════════════════════════════════
  TOTAL PAYABLE         RM 1,093.06
  ```
  `[ Pay RM 1,093.06 ]` (40px solid navy button).

#### Direction B (Structured Minimal)
- **Left Column (70%):** Unified review panel with Applicant summary and sleek horizontal payment method tabs (`Online Banking FPX`, `Credit / Debit Card`, `E-Wallet`).
- **Right Column (30% Sticky):** Refined `#FFFFFF` card with `1px solid #E2E8F0` and `6px` radius. Large bold total at top, followed by clean line-item breakdown table and primary `[ Pay RM 1,093.06 ]` CTA.

---

## 6. Critical Evaluation & Comparative Trade-Offs

| Evaluation Dimension | Direction A: Editorial Minimal | Direction B: Structured Minimal | Winner & Rationale |
|---|---|---|---|
| **Cognitive Calm & Whitespace** | Exceptional. Felt like reading an authoritative legal-financial journal. | Very high. Clean panels provide clear boundaries. | **Direction A** (Lowest visual noise). |
| **Transaction Flow Clarity** | High, but requires strong visual discipline to prevent fields from floating. | Exceptional. Clear panels anchor form milestones and payment steps. | **Direction B** (Superior form grounding). |
| **Mobile Composition (390px)** | Extremely lightweight; fast scrolling; zero horizontal padding waste. | Very clean; requires careful padding management on small screens. | **Direction A** (Better mobile space). |
| **Financial Authority & Trust** | High (Swiss banking aesthetic). | Highest (Modern enterprise financial platform like Stripe/Chubb). | **Direction B** (Familiar mental model). |
| **Implementation Stability & Parity** | Requires strict typography resets and custom divider styling. | Maps 1:1 to existing component tree while purging nested cards. | **Direction B** (Zero risk of test breakage). |

---

## 7. The Recommended Art Direction: Direction B (Structured Minimal)

### Why Direction B is the Superior Choice for DoctorShield
While Direction A is visually stunning in an editorial publication, **Direction B (Structured Minimal)** is the definitive choice for an insurance underwriting application:
1. **Clear Visual Containment:** Malaysian doctors completing high-liability transactions need visual reassurance that a section is "done". Single-layer white panels on `#F8FAFC` provide that anchoring without the messy nested boxes of the old UI.
2. **Defensive Interaction Architecture:** Direction B provides clear touch targets (44px inputs, 44px buttons) that conform strictly to WCAG 2.2 AA standards while eliminating all decorative fluff.
3. **Seamless Engineering Integration:** It refactors the existing 28 nested cards into 9 cohesive single-layer panels, ensuring that all 86 automated test selectors and ARIA landmarks remain 100% operational.

---

*This document establishes the official visual language specification. Awaiting user approval of Direction B before modifying any UI code.*

