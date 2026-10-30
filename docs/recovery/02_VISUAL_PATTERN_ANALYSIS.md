# DOCTORSHIELD — VISUAL PATTERN ANALYSIS & COMPONENT ANATOMY
## Deconstructing Interface Molecules, Organisms, and Compositional Patterns

```
==================================================================================================
DOCUMENT CLASSIFICATION:  [VERIFIED] VISUAL PATTERN ANALYSIS
PHASE:                    Phase 02 — Insurance UX & Visual Benchmark Research
AUTHORITY:                Principal Product Designer & Design Systems Lead
DATE OF ENACTMENT:        2026-10-30
DESIGN REFERENCES:        QIC Connect (Architecture) | Ditto (Simplicity) | ACKO (Add-on Cards)
SCOPE:                    Component Anatomy, Token Mapping, and Responsive Geometry
CODEBASE SCOPE:           Strictly Read-Only (Zero Code Modifications)
==================================================================================================
```

---

## 1. Executive Summary

A core failure of past iterations was the proliferation of competing, custom-styled visual patterns: nested card wrappers inside shaded panels, inconsistent button heights (36px vs 38px vs 44px), arbitrary font weights exceeding the brand ceiling (`font-semibold` and `font-bold` breaching Kanit 500), and ad-hoc inline hex color overrides.

This document analyzes and specifies the **seven core visual patterns** required for DoctorShield, synthesizing QIC's structural discipline, Ditto's typographic restraint, and ACKO's rapid selection mechanics into concrete component anatomies.

---

## 2. Pattern 1: Application Header & Minimal Step Navigation

```
+---------------------------------------------------------------------------------------+
|  PATTERN 1: APPLICATION HEADER ANATOMY (Height: 52px, Sticky, z-index: 50)           |
|                                                                                       |
|  [DoctorShield Logo] | [Chubb Co-Brand]          (Step 1 ── [2] ── 3 ── 4)            |
|  (Official Primary)    (Authoritative Underwriter) (Minimal 24px Indicator)          |
|                                                                                       |
|                                           [Document Center]  [Retrieve Quote]  [Renew]|
+---------------------------------------------------------------------------------------+
```

### 2.1 Anatomy & Token Mapping
- **Container:** Height `52px` fixed. Background `--ds-primitive-color-navy-900` (`#132766`), border-bottom `1px solid rgba(8, 165, 181, 0.25)`.
- **Identity Region:** DoctorShield primary mark paired with subtle vertical divider (`#4667A5`) and Chubb Insurance co-brand badge.
- **Progress Indicator:** Compact horizontal pill track with circular step indicators (`24x24px`). Active step filled with `--ds-primitive-color-teal-500` (`#08A5B5`); completed steps show checkmark; upcoming steps muted.
- **Utility Actions:** Ghost buttons (`fontSize: 12px`, `padding: 4px 10px`) providing instant access to Secondary Workflows (*Document Center*, *Retrieve Quote*, *Renew Policy*).

### 2.2 Benchmark Rationale
- **Adopted from QIC:** Slim institutional header geometry without oversized marketing navigation or hero banners.
- **Adopted from Ditto:** Clean text-based utilities that build reassurance without distracting from the main form task.

---

## 3. Pattern 2: Liability Limit Selection Tiles

```
+---------------------------------------------------------------------------------------+
|  PATTERN 2: LIABILITY LIMIT SELECTION GRID (4-Column Desktop / 2-Column Mobile)        |
|                                                                                       |
|  +--------------------+  +--------------------+  +--------------------+  +----------+ |
|  |     RM 500,000     |  |    RM 1,000,000    |  |    RM 2,000,000    |  |  RM 5M   | |
|  | Base: RM 400/yr    |  | Base: RM 650/yr    |  | Base: RM 1,100/yr  |  | Base: ...| |
|  |                    |  | [ RECOMMENDED ]    |  |                    |  |          | |
|  +--------------------+  +--------------------+  +--------------------+  +----------+ |
|        (Default)                (Selected)             (Default)           (Default)  |
+---------------------------------------------------------------------------------------+
```

### 3.1 Anatomy & Token Mapping
- **Container Geometry:** Responsive CSS Grid (`repeat(4, 1fr)` desktop; `repeat(2, 1fr)` mobile). Gap: `12px`.
- **Tile Surface (Default):** Background `--ds-color-bg-surface` (`#FFFFFF`), border `1px solid --ds-color-border-subtle` (`#DFE6EC`), radius `8px`, padding `16px 12px`.
- **Tile Surface (Selected):** Border `2px solid --ds-primitive-color-teal-500` (`#08A5B5`), background `--ds-primitive-color-teal-50` (`#F0FAFA`), box-shadow `0 0 0 1px var(--ds-primitive-color-teal-500)`.
- **Typography:** Limit amount in **Kanit**, weight 500, size `1.125rem` (`18px`). Base annual rate in **Inter**, weight 400, size `12px`, color `--ds-color-text-secondary` (`#475569`).
- **Recommendation Tag:** Subtle badge (`fontSize: 10px`, `fontWeight: 500`, background `--ds-primitive-color-teal-100`, color `--ds-primitive-color-teal-800`).

### 3.2 Benchmark Rationale
- **Adopted from ACKO:** Interactive clickable tiles replace clunky native `<select>` dropdowns, enabling instant visual comparison of liability protection.
- **Adapted for DoctorShield:** Uses restrained, professional typography and subtle teal highlight states instead of high-saturation neon badges.

---

## 4. Pattern 3: Modular Add-on Coverage Cards

```
+---------------------------------------------------------------------------------------+
|  PATTERN 3: MODULAR ADD-ON COVERAGE CARD ANATOMY                                      |
|                                                                                       |
|  [Icon]  Clinic Entity Establishment Protection          [ +RM 350.00 / year ] [ON ]  |
|          Covers liability arising from premises, clinic employees, and locums.        |
|                                                                                       |
|          [ Why is this recommended? > ]    (Accessible Inline Expander Trigger)      |
+---------------------------------------------------------------------------------------+
```

### 4.1 Anatomy & Token Mapping
- **Container:** Background `#FFFFFF`, border `1px solid --ds-color-border-subtle`, radius `8px`, padding `16px 20px`.
- **Header Row:** Flexbox row aligning add-on title (Inter, weight 500, `#132766`), pro-rated price impact badge (`+RM 350.00`), and accessible toggle switch (`48x28px`).
- **Value Proposition:** Concise one-sentence explanation in Inter 400, size `13px`, color `#475569`.
- **Contextual Disclosure:** Text link trigger (`color: #066F7B`, `fontSize: 12px`) opening an accessible slide-over sheet or expandable drawer explaining Chubb policy wording conditions.

### 4.2 Benchmark Rationale
- **Adopted from ACKO:** Explicit price deltas (`+RM ...`) immediately communicate financial impact before toggling.
- **Adopted from Ditto:** Clear plain-language explanation of coverage terms, avoiding insurance jargon.

---

## 5. Pattern 4: Disciplined Financial Summary Sidebar (Sticky Rail)

```
+---------------------------------------------------------------------------------------+
|  PATTERN 4: FINANCIAL SUMMARY LEDGER ANATOMY (Width: 340px, Sticky Top: 72px)         |
|                                                                                       |
|  [Shield Icon] Quotation Overview                        [ 15:00 Price Lock ]         |
|  -----------------------------------------------------------------------------------  |
|  Practitioner Classification: General Medical Practitioner (100%)                      |
|  Indemnity Limit:             RM 1,000,000                                            |
|  Policy Period:               12 Months (01/01/2026 - 31/12/2026)                     |
|  -----------------------------------------------------------------------------------  |
|  Gross Base Premium                                                      RM 1,470.00  |
|  Affinity Partner Discount (10%)                                         -RM  147.00  |
|  Clinic Entity Protection (Pro-rata)                                     +RM  350.00  |
|  Sales & Services Tax (SST 8%)                                           +RM  133.84  |
|  Statutory Stamp Duty                                                    +RM   10.00  |
|  ===================================================================================  |
|  TOTAL PAYABLE:                                                          RM 1,816.84  |
|                                                                                       |
|  [v] Complimentary Automatic Reinstatement included.                                  |
+---------------------------------------------------------------------------------------+
```

### 5.1 Anatomy & Token Mapping
- **Container:** Width `340px`, sticky top `72px`, background `#FFFFFF`, border `1px solid #DFE6EC`, radius `8px`, padding `20px`.
- **Tabular Figures:** All financial amounts rendered with `font-variant-numeric: tabular-nums` in `JetBrains Mono` or tabular `Inter` to ensure decimal point alignment.
- **Divider Discipline:** Single subtle horizontal divider separating coverage parameters from the ledger; single dashed divider above the total payable row.
- **Total Amount:** Kanit weight 500, size `1.5rem` (`24px`), color `--ds-primitive-color-navy-900` (`#132766`).

### 5.2 Benchmark Rationale
- **Adopted from QIC:** Institutional ledger clarity with clear separation between base rate, taxes, and government stamp duties.
- **Baymard Compliance:** Persistent visibility ensures zero sticker shock at checkout.

---

## 6. Pattern 5: Segmented Two-Option Underwriting Toggles

```
+---------------------------------------------------------------------------------------+
|  PATTERN 5: ACCESSIBLE SEGMENTED CHOICE SELECTOR (Touch Target: 44px Height)          |
|                                                                                       |
|  Have any medical malpractice claims ever been made against you in the past 5 years?  |
|  * Required                                                                           |
|                                                                                       |
|  +-----------------------------------+  +-----------------------------------+         |
|  |             [ ] AGREE             |  |           [X] DISAGREE            |         |
|  |     (No claims or notices)        |  |   (Prior claims declared)         |         |
|  +-----------------------------------+  +-----------------------------------+         |
|                                                                                       |
|  [!] Narrative Disclosure Required:                                                   |
|  [ Textarea: Provide particulars, year, and settlement amount...                    ] |
+---------------------------------------------------------------------------------------+
```

### 6.1 Anatomy & Token Mapping
- **Container:** Grid with two equal columns (`1fr 1fr`). Minimum height `44px` for touch targets.
- **Unselected Option:** Background `#FFFFFF`, border `1px solid #CBD5E1`, text color `#17253B`, font weight 400.
- **Selected Option:** Background `#F0FAFA`, border `2px solid #08A5B5`, text color `#04464D`, font weight 500.
- **Conditional Follow-up:** If adverse answer selected (`Disagree` or `Yes`), smoothly expands an accessible narrative disclosure textarea with `role="region"` and `aria-live="polite"`.

### 6.2 Benchmark Rationale
- **Adopted from Ditto:** Binary choice selectors eliminate the friction of dropdown menus and make required decisions effortless to scan.
- **Baymard Compliance:** Immediate conditional disclosure only when an adverse condition is flagged.

---

## 7. Pattern 6: Mobile Adaptive Bottom Action Drawer

```
+---------------------------------------------------------------------------------------+
|  PATTERN 6: MOBILE STICKY FOOTER ANATOMY (Viewports < 1024px, Fixed Bottom)           |
|                                                                                       |
|  TOTAL PAYABLE:                                                                       |
|  RM 1,816.84  [ View Breakdown ^ ]       [ Proceed to Review  > ]                     |
|  (Tabular)    (Triggers Drawer)          (Primary Button - 44px Height)               |
+---------------------------------------------------------------------------------------+
```

### 7.1 Anatomy & Token Mapping
- **Container:** Fixed bottom `0`, left `0`, right `0`, height `64px`, background `#FFFFFF`, border-top `1px solid #DFE6EC`, box-shadow `0 -4px 12px rgba(0,0,0,0.05)`, z-index `40`, padding `10px 16px`.
- **Primary CTA:** Minimum height `44px`, radius `6px`, background `--ds-primitive-color-teal-500` (`#08A5B5`), text `#FFFFFF`, font weight 500.
- **Price Preview:** Displays current total payable with a "View Breakdown" tap target that slides up a lightweight summary drawer.

### 7.2 Benchmark Rationale
- **Adopted from ACKO:** Ensures the primary conversion action is never obscured or scrolled out of reach on long mobile viewports.

---

## 8. Pattern 7: Container Discipline & Anti-Nesting Rules

```
+---------------------------------------------------------------------------------------+
|  ANTI-PATTERN: NESTED CARD SYNDROME (STRICTLY PROHIBITED)                             |
|  [ Grey Canvas Background #F1F5F9 ]                                                   |
|    [ Outer Form Card #FFFFFF with Shadow ]                                            |
|      [ Inner Section Card #F8FAFB with Border ]                                       |
|        [ Field Group Container with Border ]                                          |
|          [ Input Box ]  <-- Result: Narrow width, visual clutter, box-in-box fatigue   |
|                                                                                       |
|  APPROVED RECOVERY PATTERN: FLAT SECTIONAL DISCIPLINE                                 |
|  [ Pure Surface Canvas #F8FAFB ]                                                      |
|    [ Clean Form Card #FFFFFF - 1px Subtle Border - No Nested Boxes ]                  |
|      - Form Section Header                                                            |
|      - Aligned Fields (12px Spacing)                                                  |
|      - Purposeful Divider                                                             |
|      - Next Form Section                                                              |
+---------------------------------------------------------------------------------------+
```

### 8.1 The Rule of Maximum Two Containers
- **Container Hierarchy Rule:** No interface element may be wrapped in more than **two container levels** from the viewport (Page Canvas $\rightarrow$ Single White Card $\rightarrow$ Content).
- **Border-First Elevation:** Containers rely on purposeful borders (`1px solid var(--ds-color-border-subtle)`) rather than heavy box shadows or multiple shades of grey background.

---
*Report certified by Principal Product Designer & Design Systems Lead.*

