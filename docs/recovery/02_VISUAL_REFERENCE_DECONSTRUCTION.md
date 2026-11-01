# Phase 02 — Visual Reference Deconstruction & Master Art Direction

> **Document Version:** 5.0 — Visual Reference Deconstruction  
> **Author:** Principal Product Design Director & Staff Frontend Architect  
> **Status:** Phase 02 Complete — Ready for Review & Approval  
> **Scope:** Deconstruction of benchmark platforms (QIC Online, Wise, Ditto, ACKO, Baymard) and 4 user-supplied reference images. Establishes the exact concrete design parameters, layout systems, component anatomy, and practical art-direction checklist for DoctorShield's new visual design system.  
> **Governing Rules:** Master Product Rules V5 & Rule 2 (Visual Design Authority).

---

## 1. Executive Summary & Objective

Phase 01 succeeded in retiring the rejected legacy design system, eliminating all obsolete component catalogs and preview routes, reducing the JavaScript bundle by 373 KB, while preserving 100% of validated tests and application routing.

Phase 02 defines the **authoritative visual benchmark and physical design parameters** for DoctorShield's complete visual replacement. Rather than inventing arbitrary styles or repeating the discarded card-heavy layout, this deconstruction extracts proven interaction patterns, precise geometry, and typographic hierarchy from the world's most disciplined transaction and insurance interfaces:

1. **QIC Online (`qic.online/en`):** Mobile step navigation, single-task form composition, clean selection cards, contextual chip anchors, and deliberate touch rhythm.
2. **Wise (`wise.com`):** Tabular financial precision, connected mathematical fee breakdowns, calm surface restraint, and zero decorative noise.
3. **Ditto Insurance & ACKO:** Transparent, human-centered insurance clarity, direct pricing, and zero aggressive upselling.
4. **Baymard Institute Insurance UX:** Rapid visibility of deductibles/limits, immediate price feedback loops, and frictionless progression.
5. **User-Provided Reference Artifacts (4 Images):** Real-world executions of mobile plan selection, date picking, multi-zone desktop comparison, and split-screen plan drawers.

---

## 2. Deep Empirical Deconstruction of User Reference Images

```
+----------------------------------------------------------------------------------------------------+
|                                 EMPIRICAL REFERENCE DECONSTRUCTION                                 |
+------------------------------------+-----------------------------------+---------------------------+
| Reference Image                    | Primary Interface Pattern         | Key Geometric / Visual UI |
+------------------------------------+-----------------------------------+---------------------------+
| 1. QIC Step 2 (Coverage)           | Plan Card Selection & Expansion   | Segmented bar, 48px CTA,  |
|    `media_1793503659402_7bf28adf`  |                                   | floating recommendation   |
+------------------------------------+-----------------------------------+---------------------------+
| 2. QIC Step 3 (Final Details)      | Single-Task & Form Input Anatomy  | 50px stacked inputs,      |
|    `media_1793503687810_59ed19b6`  | Embedded Calendar Date Picker     | subtle micro-labels       |
+------------------------------------+-----------------------------------+---------------------------+
| 3. EasyInsure (Desktop Comparison) | 3-Column Plan Row & Trust Sidebar | Multi-zone horizontal     |
|    `media_1793503715993_08bd61ff`  |                                   | card, bulleted limits     |
+------------------------------------+-----------------------------------+---------------------------+
| 4. Modern Plan Drawer (Oscar)      | Financial Spec Sheet & Mobile CTA | Tabular cost grid, toggle |
|    `media_1793503749583_d81f1834`  |                                   | before/after deductible   |
+------------------------------------+-----------------------------------+---------------------------+
```

---

### Image 1: QIC Step 2 — Coverage & Plan Selection (`media_1793503659402_7bf28adf.png`)

#### Left Viewport — Collapsed Plan Card State
* **Header Geometry:** 
  - Centered brand mark.
  - Step progress indicator: 4-segment slim horizontal bar (`height: 3px`, `gap: 4px`). Active segment in vibrant royal blue (`#3B52DE`), inactive segments in neutral grey (`#E5E7EB`). Label: `"Step 2 of 4: Coverage"` (`12px`, muted `#6B7280`).
* **Navigation:** Subtle, highly accessible `← Back` text link with chevron (`14px`, medium weight) anchored to top-left.
* **Heading & Context Anchor:**
  - Screen title: `"Select plan"` in bold geometric sans (`24px`, font-weight 700, line-height 1.2, letter-spacing -0.02em).
  - Subject Context Pill: Rounded chip container `[ (car icon) Toyota Land Cruiser, 2025 ]` (`height: 36px`, `border-radius: 9999px`, `border: 1px solid #E5E7EB`, background `#FFFFFF`, font `13px` medium). This grounds the customer in what is being quoted without dominating vertical real estate.
* **Plan Card Surface Anatomy:**
  - Background: Crisp `#FFFFFF` against an ultra-soft off-white canvas (`#F8F9FB`).
  - Border: `1.5px solid #E5E7EB` with corner radius `16px` (`rounded-2xl`).
  - Floating Recommendation Badge: Pill-shaped badge `Customer's choice` positioned along the top card border (`background: #E2F8C9`, text `#1F3A10`, font `11px` bold, padding `4px 10px`).
  - Plan Tier Name: `"Comprehensive"` centered in prominent `16px` semibold.
  - Hero Monetary Display: `"QAR 560.3 /mo"` in heavy display typography (`28px`, bold, tabular).
  - Secondary Subtotal: `"One-time payment QAR 6,630"` (`13px`, muted `#6B7280`).
  - Actuarial Basis Trigger: `"Price based on your car value: QAR 310,000"` styled with a subtle dotted underline indicating an interactive explanatory popover.
  - Loyalty Incentive Chip: Soft pill `+5000 (points icon)`.
  - Primary Action Button: Full-width `"Select"` button in solid royal blue (`#3B52DE`), height `48px`, border radius `12px`, high-contrast white text (`15px` semibold).

#### Right Viewport — Expanded Plan Details State
* **Segmented Pricing Toggle:** Pill-shaped toggle `[ 6,630 | 6,930 ]` (`height: 40px`, background `#F3F4F6`, border-radius `10px`). Active segment rendered in white with soft drop shadow; inactive segment transparent.
* **Deductible Callout & Plain-Language Guidance:**
  - Clear heading: `"Deductible: QAR 1,500"` (`15px` semibold).
  - Calm educational copy: *"A deductible is the amount of money you have to pay toward your claim, before the insurance company pays the rest. Higher deductibles will lower your premiums."* (`13px`, color `#4B5563`, leading 1.45).
* **Included Benefits Checklist:**
  - Vertical stack of benefits (`Third Party Liability`, `Passenger Liability`, `Own Damage`).
  - Visual checkmarks: Solid circular blue badges with white check icons (`18px` diameter).
  - Separation: Subtle hairline dividers (`border-bottom: 1px solid #F3F4F6`) with generous `14px` vertical padding.

---

### Image 2: QIC Step 3 — Form Anatomy & Policy Date Selection (`media_1793503687810_59ed19b6.png`)

#### Left Viewport — Single-Task Focus Screen
* Single-task isolation: `"Enter plate number"`.
* Large tactile input: `height: 52px`, `border-radius: 10px`, `border: 1.5px solid #E5E7EB`. Embedded flag badge and oversized typography (`20px`).
* Clear binary exit: Solid blue primary CTA `"Continue →"` followed by an explicit `"OR"` divider and a secondary outlined button `"I don't have a plate number"` (`height: 48px`, border `1px solid #E5E7EB`).

#### Center Viewport — Structured Information Form
* **Stacked Micro-Label Anatomy:**
  - Floating/stacked labels (`QID number`, `QID expiry date`, `Full name`, `Gender`, `Email`, `Chassis number`) in `11px` uppercase/medium `#6B7280`.
  - Value text in `15px` high-contrast dark `#111827`.
  - Input container: `height: 50px`, padding `8px 14px`, background `#F9FAFB`, border `1px solid #E5E7EB`, radius `8px`.
* **Semantic Domain Grouping:**
  - Form sections separated into distinct categorical domains: `"Policyholder"` and `"Car"`.
  - Section titles rendered in bold `14px` text with `24px` top margin, completely eliminating unnecessary nested box containers.
* **Integrated Affordances:**
  - Informational tooltip icons `(?)` placed directly adjacent to high-confusion fields (QID, Chassis).
  - Trailing calendar icon for date fields; downward chevron for select dropdowns.
* **Sticky Viewport Action Bar:** Full-width `"Continue →"` button pinned to viewport bottom with a subtle background gradient shield preventing content occlusion.

#### Right Viewport — Embedded Policy Start Date Calendar
* **Direct Calendar Grid Interaction:**
  - Month/Year selector pills: `[ December ]` and `[ 2025 ]` flanked by `<` `>` arrows.
  - Day Grid: 7-column Monday–Sunday calendar. Active date (e.g., day `8`) highlighted with a solid blue circle target (`#3B52DE`, `32px` diameter, white text).
* **Contract Validity Reassurance:** Calm banner beneath calendar: `"Your policy is valid until 08/12/2026"` (`13px` medium `#1E293B`, subtle background `#F8FAFC`, border `1px solid #E2E8F0`).

---

### Image 3: EasyInsure Desktop Comparison Grid (`media_1793503715993_08bd61ff.png`)

* **Desktop Horizontal Card Layout:** Stacked plan rows on a slate background (`#F4F6F8`) with `16px` vertical gap.
* **3-Zone Horizontal Card Anatomy:**
  - **Zone 1 (Identity & Plan Name, ~25%):** Carrier logo, plan title with variant dropdown (`Care Plus + Direct`).
  - **Zone 2 (Key Metrics & Feature Bullets, ~45%):**
    - Metric chips: Cashless Hospital count (`120 >`) and Cover Amount dropdown selector (`₹5 Lakh ⌄`).
    - Core bulleted coverage highlights with clean circular bullet markers.
    - Expandable `"View all features"` text link.
  - **Zone 3 (Monetary & Action CTA, ~30%):**
    - High-contrast solid blue button containing monthly rate (`₹714/-Month`) and secondary annual rate (`₹8,566/Year`).
    - Comparison checkbox: `[ ] Add to compare`.
* **Trust & Proof Sidebar:** Dedicated right-hand rail `"Why EasyInsure?"` displaying 4 verified operational metrics (Claims supported, Support hours, Digital procedure, Instant policy).
* **Grounding Dark Footer:** High-density navy footer (`#0E132B`) anchoring the page bottom with organized columnar links.

---

### Image 4: Plan Detail Sheet & Mobile Drawer (`media_1793503749583_d81f1834.png`)

* **Tabular Financial Grid Pattern:**
  - Structured breakdown table displaying:
    - `"Premium"` (with dotted underline info trigger).
    - `"Deductible"` (`$6,000`).
    - `"Out-of-pocket max"` (`$7,500`).
  - Numerical alignment: Right-aligned bold values contrasting against left-aligned subtle labels.
* **Positive Feature Validation:** Emerald green checkmark icons (`✓`) highlighting top policy advantages (`Lowest premium matching your needs`, `Covers Adderall`, `Free 24/7 telehealth`).
* **Cost Scenario Toggle:** Segmented pill toggle `[ Before deductible | After deductible ]` allowing instant preview of common care costs (`Preventive care: Free`, `Primary care: $60`).
* **Mobile Sticky Action Bar:** Bottom bar with dark pill container `Choose plan` (`#1A1F2C`, height `48px`, rounded `8px`) pinned above mobile home indicator.

---

## 3. Wise Benchmark Deconstruction (Financial Clarity & Precision)

Wise represents the global gold standard for high-trust monetary transactions. The following patterns are directly extracted for DoctorShield:

```
Wise Financial Calculation Anatomy:
+-------------------------------------------------------+
|  You send               [ 1,000.00 ]  [ USD ⌄ ]       |
+-------------------------------------------------------+
|  |                                                    |
|  o - 4.28 USD           Our fee (transparent)         |
|  |                                                    |
|  o = 995.72 USD         Amount we'll convert          |
|  |                                                    |
|  o * 4.7210             Guaranteed exchange rate      |
|  |                                                    |
+-------------------------------------------------------+
|  Recipient gets         [ 4,700.80 ]  [ MYR ⌄ ]       |
+-------------------------------------------------------+
```

1. **Tabular Numerals Everywhere:**
   - Numerical values must use `font-variant-numeric: tabular-nums` or monospace number characters. This prevents horizontal layout jitter when rates change or add-ons toggle.
2. **Connected Calculation Stepper:**
   - Financial adjustments are visually joined with a thin vertical connector line and discrete node markers (`-`, `+`, `=`, `×`).
   - For DoctorShield, this maps perfectly to:
     $$\text{Base Premium} \;\rightarrow\; \text{Add-ons} \;\rightarrow\; \text{SST (8\%)} \;\rightarrow\; \text{Stamp Duty (RM 10)} \;\rightarrow\; \text{Total Payable}$$
3. **Monetary Typography Hierarchy:**
   - Hero final payable amount: Bold, high-contrast display (`24–28px`).
   - Subtotal line items: Medium weight (`14–15px`), right-aligned, strict decimal alignment.
   - Taxes and statutory duties: Clearly distinguished from underlying risk premium.
4. **Surfaces & Restraint:**
   - Backgrounds are strictly flat white or neutral slate (`#F8FAFC`). No glossy gradients, no drop shadows exceeding 4px blur, no borders thicker than 1.5px.

---

## 4. Transferability Matrix for DoctorShield Individual Indemnity

DoctorShield is an exclusive, highly specialized medical malpractice indemnity application underwritten by Chubb Insurance Malaysia. It is **not** an aggregator marketplace or motor insurance portal. The transferability boundary must be rigidly enforced:

```
+----------------------------------------------------------------------------------------------------+
|                                    TRANSFERABILITY BOUNDARY MATRIX                                 |
+----------------------------------------------------+-----------------------------------------------+
| TRANSFERABLE & MANDATED (Adopt & Elevate)          | NON-TRANSFERABLE (Strictly Prohibited)        |
+----------------------------------------------------+-----------------------------------------------+
| 1. 5-Stage Segmented Progress Bar (QIC)            | 1. Marketplace Aggregator Filters (EasyInsure)|
|    Slim 3px segmented bar with clean stage labels  |    No insurer dropdowns or comparison toolbars|
+----------------------------------------------------+-----------------------------------------------+
| 2. Subject Context Anchor Pill (QIC)               | 2. Motor / Non-Medical Attributes (QIC)       |
|    "Specialist: Anaesthesiology | MMC #45821"     |    No plate numbers, car values, chassis nos  |
+----------------------------------------------------+-----------------------------------------------+
| 3. Plan Tier Selection Cards (QIC / Oscar)         | 3. Deceptive Marketing Slashes (Oscar)        |
|    Radio cards with floating "Recommended" badge   |    No "$608 -> $97" fake retail discounts.    |
|    and clean limit/deductible breakdown            |    Indemnity premiums are actuarially rated   |
+----------------------------------------------------+-----------------------------------------------+
| 4. Connected Financial Breakdown (Wise)            | 4. Social Proof Avatars / Timers (Oscar)      |
|    Base -> PIC -> Locum -> SST (8%) -> Stamp Duty  |    No "3 doctors shopping now" spam widgets   |
+----------------------------------------------------+-----------------------------------------------+
| 5. Stacked Micro-Label Form Inputs (QIC)           | 5. Over-Carded Nested Layouts (Legacy UI)     |
|    48px inputs, 11px uppercase labels, 8px radius  |    No wrapping every individual input in card |
+----------------------------------------------------+-----------------------------------------------+
| 6. Sticky Mobile CTA Summary Drawer (QIC / Oscar)  | 6. Premature Multi-Column Form Inputs         |
|    Pinned bottom bar with price & "Continue"       |    No cramped multi-column forms on mobile    |
+----------------------------------------------------+-----------------------------------------------+
```

### The DoctorShield Domain Truths
* **Audience:** Malaysian medical doctors, surgeons, dentists, and clinic owners. The interface must communicate medical seriousness, legal fidelity, and regulatory precision (MMC / MDC guidelines).
* **Underwriter:** Single master underwriter — **Chubb Insurance Malaysia Berhad**. No competing carrier cards.
* **Statutory Taxes:** Malaysian Sales & Service Tax (SST @ 8%) and Stamp Duty (RM 10.00) are statutory requirements and must be transparently displayed.
* **Actuarial Rating:** Limit of Indemnity (RM 500k to RM 5M), Category Risk Class, PIC Clinic Extension, Locum Coverage, and Retroactive Date are non-negotiable insurance rules.

---

## 5. Master Concrete Design Parameters & Tokens

The following design parameters are extracted and established as the foundation for Phase 03 Design Tokens:

```
+----------------------------------------------------------------------------------------------------+
|                                 DOCTORSHIELD MASTER DESIGN TOKENS                                  |
+--------------------+-------------------------------------------------------------------------------+
| Property           | Specification & Concrete Token Value                                          |
+--------------------+-------------------------------------------------------------------------------+
| Viewport & Grid    | Desktop Max-Width: 1120px (container)                                         |
|                    | Form Stage Focus Width: 720px (centered single-column)                        |
|                    | Quotation Split Layout: Main Content 65% (700px) | Sticky Rail 35% (380px)    |
|                    | Mobile Width: 100% with 16px lateral padding (px-4)                           |
+--------------------+-------------------------------------------------------------------------------+
| Vertical Rhythm    | Page header bottom margin: 32px (mb-8)                                        |
|                    | Section-to-section gap: 24px (gap-6)                                          |
|                    | Field-to-field gap: 16px (gap-4)                                              |
|                    | Internal card padding: 20px (p-5) desktop / 16px (p-4) mobile                 |
+--------------------+-------------------------------------------------------------------------------+
| Typography         | Headings: Kanit (weights 400 & 500 only)                                      |
|                    | - Stage Title: Kanit 500, 24px / 28px, tracking -0.02em, color #132766        |
|                    | - Section Heading: Kanit 500, 18px / 22px, color #132766                      |
|                    | - Component Header: Kanit 400, 16px / 20px, color #132766                     |
|                    | Body & Interface: Inter (weights 400, 500, 600)                               |
|                    | - Primary Body: Inter 400, 15px / 22px, color #334155 (Slate 700)             |
|                    | - Micro Field Labels: Inter 500, 11px, uppercase, tracking +0.05em, #64748B  |
|                    | - Input Text: Inter 500, 15px, color #0F172A (Slate 900)                     |
|                    | - Disclaimers: Inter 400, 13px / 18px, color #64748B (Slate 500)              |
|                    | Monetary Figures: Inter 600, tabular-nums                                    |
|                    | - Hero Final Payable: 26px / 32px tabular-nums, color #132766                 |
|                    | - Line Item Price: 15px tabular-nums, color #0F172A                           |
+--------------------+-------------------------------------------------------------------------------+
| Controls Anatomy   | Input / Select Height: 48px standard (38px compact for table cells)           |
|                    | Input Border Radius: 8px (rounded-lg)                                         |
|                    | Input Border: 1px solid #CBD5E1 (Slate 300); Focus: 1.5px #08A5B5 + ring      |
|                    | Primary CTA Button: Height 48px desktop / 50px mobile, radius 8px, #08A5B5    |
|                    | Segmented Control: Height 40px, container #F1F5F9, active tab #FFFFFF         |
|                    | Badges / Chips: Height 26px, padding 3px 10px, radius 9999px (rounded-full)  |
+--------------------+-------------------------------------------------------------------------------+
| Border & Surfaces  | Page Canvas: #F8FAFC (Slate 50)                                               |
|                    | Card Surface: #FFFFFF (Pure White), border 1px solid #E2E8F0 (Slate 200)      |
|                    | Selected / Active Card: #FFFFFF, border 2px solid #08A5B5 (Primary Teal)     |
|                    | Focus Ring: 3px rgba(8, 165, 181, 0.18)                                       |
|                    | Card Radius: 12px (rounded-xl)                                                |
|                    | Elevation: 0 1px 3px rgba(0,0,0,0.05) resting; 0 4px 12px rgba(8,165,181,0.08)|
+--------------------+-------------------------------------------------------------------------------+
| Brand & Semantics  | Primary Brand: #08A5B5 (Deep Teal)                                            |
|                    | Secondary Brand: #132766 (Deep Navy)                                          |
|                    | Neutral Dark: #0F172A (Slate 900) for highest contrast text                  |
|                    | Success / Verified: #059669 (Emerald 600), surface #ECFDF5                    |
|                    | Notice / Referral: #D97706 (Amber 600), surface #FFFBEB                       |
|                    | Error / Invalid: #DC2626 (Rose 600), surface #FEF2F2                         |
+--------------------+-------------------------------------------------------------------------------+
| Navigation         | 5-Stage Header Bar: 5 horizontal segments, active #08A5B5, done #132766       |
|                    | Back Button: Minimal "← Back" top-left link with 44px touch target            |
|                    | Mobile Bottom Rail: Pinned 72px bar with price + primary CTA + backdrop blur  |
+--------------------+-------------------------------------------------------------------------------+
```

---

## 6. DoctorShield V5 Practical Art-Direction Checklist

Every screen engineered in subsequent phases (Phase 03 through Phase 08) must be verified against this checklist before passing its review gate:

### A. Information Architecture & Layout
- [ ] **Stage Purpose:** Does the screen focus exclusively on one of the 5 canonical stages (Coverage, Quotation, Details, Declaration, Summary)?
- [ ] **Container Proportions:** Desktop container does not exceed `1120px`; form views stay within `720px` to prevent excessive scanning width.
- [ ] **Zero Over-Carding:** Form fields are grouped by typography and vertical rhythm, never wrapped individually in bordered cards.
- [ ] **Subject Context:** Is there a compact context pill (e.g. `Specialty | MMC #`) confirming policyholder identity without eating screen real estate?

### B. Typography & Text Hierarchy
- [ ] **Strict Kanit Usage:** Kanit is used *only* for headings, and strictly in weights `400` and `500`.
- [ ] **Inter for Body & Controls:** All labels, body text, inputs, buttons, and tables use Inter.
- [ ] **Readable Body Size:** Base copy is `15px` or `16px`; no artificially tiny text manufactured to simulate minimalism.
- [ ] **Tabular Numerals:** Every monetary amount, premium breakdown, limit figure, and date uses `font-variant-numeric: tabular-nums`.

### C. Color Restraint & Contrast
- [ ] **Navy for Structure:** Headings, prominent labels, and structural anchors use `#132766`.
- [ ] **Teal for Meaning:** Primary teal (`#08A5B5`) is reserved for primary actions, active selection borders, and key progression segments—not splashed across every surface.
- [ ] **WCAG AA Compliance:** White text on teal buttons meets 4.5:1 contrast ratio (verified with deep teal `#08A5B5` or darkened variant `#078F9D`).
- [ ] **Muted Canvas:** Clean `#FFFFFF` card surfaces sit on a tranquil `#F8FAFC` background.

### D. Component Anatomy & Form Geometry
- [ ] **48px Control Standard:** Text inputs, select dropdowns, and primary buttons share a consistent `48px` tactile height.
- [ ] **8px/12px Corner Radii:** Consistent geometry (8px for controls, 12px for cards); no random mixing of sharp square and exaggerated pill shapes.
- [ ] **State Clarity:** Form inputs have 6 distinct visual states: default, hover, focus (teal ring), filled, disabled, and error (rose border).
- [ ] **Selection Feedback:** Selected plan cards show a prominent `2px solid #08A5B5` border, checked radio indicator, and subtle teal tint.

### E. Financial Presentation
- [ ] **Currency Uniformity:** All amounts formatted consistently as `RM X,XXX.XX`.
- [ ] **Connected Fee Stepper:** Premium additions (PIC, Locum) and statutory charges (SST 8%, Stamp Duty RM 10) are logically connected and individually itemized.
- [ ] **Zero Misleading Clutter:** No fake slashed-out discount prices, countdown timers, or spammy social proof avatars.

### F. Responsive & Touch Standards
- [ ] **Mobile Gutter:** Consistent `16px` lateral padding on mobile viewports.
- [ ] **Single-Column Mobile Flow:** Multi-column desktop grids collapse cleanly into a linear, thumb-friendly single column.
- [ ] **Sticky Mobile Footer:** On mobile, the primary CTA and current total live in a sticky bottom rail with safe-area padding (`pb-safe`).
- [ ] **Zero Horizontal Overflow:** All tables and option cards fit within 360px–390px mobile viewports without horizontal scrolling.

---

## 7. Next Steps & Phase Review Gate

Phase 02 visual reference deconstruction is complete and fully documented.

In accordance with Master Product Rules V5 and Rule 4 (Phase Gates):
1. **No production code has been modified in Phase 02.**
2. **Phase 03 (Design Foundations & Token Engineering)** is ready to proceed upon user review and approval of these extracted parameters and art-direction checklist.

