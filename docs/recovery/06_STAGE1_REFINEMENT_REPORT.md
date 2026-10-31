# Phase 06 — Form Molecules, Compositions & Stage 1 Refinement Report

**Document ID:** `06_STAGE1_REFINEMENT_REPORT.md`  
**Version:** 3.0  
**Status:** COMPLETE (Awaiting Principal Product Designer & User Approval)  
**Date:** 2026-10-30  
**Author:** Principal Product Designer & Staff React Systems Architect  
**Scope:** DoctorShield Individual Medical Indemnity Portal (`Portal_ds`)

---

## 1. Executive Summary

In accordance with **Master Agent Rules V3** and the **Direction B: Structured Minimal Design Foundations**, Phase 06 has successfully transitioned the DoctorShield live customer-facing application shell and **Stage 1: Professional Coverage Configuration** (`SCR-TOBE-01`) from the legacy aesthetic into an exceptionally refined, production-grade, insurance-grade user experience.

### Key Architectural Transformations:
1. **Form Molecules Re-Engineering (Part A):**
   - Rebuilt all 15 core form molecules to adhere strictly to Direction B tokens: **46px control height**, **6px control radius**, **1px `#CBD5E1` neutral border**, **3px Teal focus halo** (`rgba(8, 165, 181, 0.18)`), and **44px × 44px minimum touch target envelope**.
   - Created the new `FieldGroup` structural section molecule featuring an authoritative **3px Teal accent bar** (`.ds-section-bar`), Kanit 500 typography, and clean vertical rhythm without nested container cards.
   - Refactored `PromoCodeField` with integrated 46px Apply action, loading indicators, and an emerald-tinted applied lockup with inline Remove action.
   - Polished `LiabilityLimitSelector` into an un-nested 4-tier interactive grid with tabular figures, approved `#08A5B5` active borders, and full ARIA `role="radiogroup"` accessibility.

2. **Application Shell Refinement (Part B):**
   - Refined the application header to a streamlined **52px height** with co-branded Chubb badge, live helpline, and unobtrusive navigation.
   - Refined `SummarySidebar` on desktop: Replaced premature, misleading `"RM 0.00"` placeholder calculations prior to quotation submission with a clean **Coverage Selection Preview** indicating active classification, limit, dates, and explicit guidance that authoritative rating is computed upon submission.
   - Gated `MobileSummaryDrawer` so no intrusive bottom bar or premature pricing drawers clutter the initial configuration experience on mobile viewports.

3. **Stage 1 Complete Visual Recomposition (Part C):**
   - Replaced old ad-hoc container divs and inline card styling in `src/features/coverage/Stage1CoverageForm.tsx` with 4 structured `FieldGroup` sections:
     - **Section 1: Practitioner Classification** (with conditional GP Aesthetics allocation banner and `SpecializationModal`).
     - **Section 2: Limit of Liability Options** (`LiabilityLimitSelector`).
     - **Section 3: Policy Period & Contact Information** (Dual date grid with MMC APC 31 Dec alignment, "Why 31st December?" modal, email input with RFC 5322 regex validation, and `PromoCodeField`).
     - **Section 4: Statutory Disclosures & Affirmative Consent** (Verbatim PIDM notice panel and affirmative regulatory terms checkbox).
     - **Primary Action Placement:** Full-width bottom dock with Teal `#08A5B5` primary button (`variant="teal"`, `size="md"`, right icon `ArrowRight`).

4. **Rigorous Quality & Regression Verification (Part F):**
   - TypeScript Typecheck: **0 errors** (`tsc --noEmit`).
   - Vitest Test Suite: **130 / 130 tests passing (100%)** across all 12 test suites.
   - Multi-viewport visual capture: Verified at **1440px** (Desktop), **768px** (Tablet), **390px** (Mobile), and Modal interaction states.

---

## 2. Form Molecules Specification & Anatomy (Part A)

All form molecules were redesigned to consume tokens exclusively from `src/styles/tokens.css`:

| Molecule Component | Anatomy & Elements | Geometry & Spacing | Interaction & States | Accessibility (WCAG 2.2) |
| :--- | :--- | :--- | :--- | :--- |
| **`FieldGroup`** | 3px Teal vertical bar + Kanit 500 Heading (level 2) + Supporting Description + Content Slot | `margin-bottom: 28px`, `padding-left: 10px`, `border-left: 3px solid #08A5B5` | Static structural sectioning; clean vertical rhythm | Semantic `<section>` with unique id; Heading Level 2 hierarchy |
| **`LabeledSelect`** | Label + Required asterisk + Select element + Custom inline SVG Chevron + Error alert | Height: 46px, Radius: 6px, Padding: 0 14px, Font: 16px (prevents iOS zoom) | Hover: `#08A5B5`, Focus: 3px teal ring, Error: `#EF4444` border | Connected `htmlFor`/`id`, `aria-invalid`, `aria-describedby` |
| **`LiabilityLimitSelector`** | 4-tier responsive grid + Radio tile + Limit title + Indicative rate + "RECOMMENDED" badge | Gap: 12px, Radius: 6px, Card padding: 16px | Selected: `#F0FAFA` bg + 2px `#08A5B5` stroke; Hover: `#F8FAFC` | `role="radiogroup"`, `role="radio"`, keyboard Arrow key navigation |
| **`DateField` / `InsuranceDateRange`** | Inception input + Calendar icon + Expiry read-only display + MMC APC alignment info trigger | Height: 46px, Radius: 6px, Grid: 2-column minmax(240px, 1fr) | Native HTML5 date picker; Modal launch on "Why 31st Dec?" | Full keyboard trigger, labeled inputs, `aria-haspopup="dialog"` |
| **`TextInput` (Email)** | Label + Required asterisk + Left Mail icon + Text input + Helper text + Inline error | Height: 46px, Radius: 6px, Left padding: 40px, Font: 16px | Focus: 3px teal ring; Invalid: `#EF4444` border + `role="alert"` | RFC 5322 regex validation, `aria-required="true"`, `type="email"` |
| **`PromoCodeField`** | Label + (Optional) tag + Left Tag icon + Input + 46px Apply button + Applied success lockup | Height: 46px, Radius: 6px, Button flex-shrink: 0, Applied padding: 8px 14px | Loading spinner during backend check; Emerald lockup with Remove btn | `aria-invalid`, `aria-describedby`, enter key submission |
| **`Checkbox` (Consent)** | Custom accessible SVG checkbox + Affirmative legal declaration text + Required asterisk | Target: 44px × 44px hit area, 18px checkbox box, 4px radius | Focus: 3px teal ring; Checked: Teal fill + White checkmark | Native `<input type="checkbox">` keyboard Space toggle |

---

## 3. Layout Compositions & Shell Polish (Part B)

### 3.1. Main Form Composition (Direction B: Open Structured Surface)
- **Container Architecture:** Direction B removes heavy nested card borders and dark shadow stacks. The main content card (`.ds-main-card`) sits on `#FFFFFF` with a crisp 1px `#E2E8F0` border and `10px` corner radius.
- **Section Accent Bars:** Rather than wrapping every field into a box, sections are designated with a 3px Teal `#08A5B5` vertical accent bar and a 17px Kanit 500 heading.
- **Visual Rhythm:** Spacing between sections is standardized to 28px; spacing between fields is 20px; spacing between label and input is 6px.

### 3.2. Elimination of Premature Financial Clutter
- **Problem in Old UI:** In Stage 1 before the doctor had filled in their details or submitted their quote, the sidebar displayed `"RM 0.00"` for Gross Premium, SST, Stamp Duty, and Total. This created cognitive anxiety and gave the false impression of zero-dollar policies or broken calculations.
- **Refined Treatment:** In `SummarySidebar.tsx`, Stage 1 now displays a clean **Coverage Selection Preview**:
  - Selected Classification (e.g. *General Medical Practitioner*)
  - Selected Limit of Liability (e.g. *RM 1,000,000*)
  - Inception & Expiry Dates (*Co-terminates 31 Dec*)
  - Clear guidance note: *"Full itemized premium calculation including SST and stamp duty is calculated upon submission."*
  - Itemized financial breakdown is cleanly revealed in Stage 2+ once authoritative rating is returned by Chubb.
- **Mobile Drawer Suppressed in Stage 1:** In `MobileSummaryDrawer.tsx`, the bottom drawer is suppressed until Stage 2, preventing sticky headers from eating 30% of the mobile viewport while the doctor is completing initial inputs.

---

## 4. Stage 1 Visual Acceptance Comparison (Phase 15 Gate)

| Design Dimension | Old Legacy Stage 1 | Phase 06 Refined Stage 1 | Verification Evidence |
| :--- | :--- | :--- | :--- |
| **Container & Framing** | Deep nested cards with heavy 12px borders, SaaS dashboard shadow stacks | Clean, open, calm surface (`#FFFFFF`, 1px `#E2E8F0` border, 10px radius) | `docs/evidence/screenshots/stage1-refined-desktop-1440px.png` |
| **Section Architecture** | Disconnected div blocks with arbitrary spacing and varied headings | Authoritative 3px Teal `#08A5B5` vertical accent bars with Kanit 500 headings | `FieldGroup.tsx` integration across all 4 sections |
| **Control Geometry** | Inconsistent 36px - 44px inputs, variable radiuses (4px, 8px, 12px) | Unified **46px control height**, **6px radius**, 1px `#CBD5E1` border | Verified in DOM across selects, inputs, and promo field |
| **Liability Limits** | Generic radio buttons inside grey boxes | Refined 4-tier interactive grid, active teal stroke `#08A5B5`, tabular figures | `LiabilityLimitSelector.tsx` |
| **Sidebar Behavior** | Premature `"RM 0.00"` itemized invoice rows | Contextual Coverage Selection Preview; no premature financial noise | `SummarySidebar.tsx` Stage 1 gating |
| **Mobile Quality** | Cramped touch targets, sticky drawer hiding form submit button | Spacious 44px targets, natural scrolling, drawer hidden in Stage 1 | `docs/evidence/screenshots/stage1-refined-mobile-390px.png` |
| **Typography** | Bold 700 headings, unconstrained body font sizes | Kanit 500 headings, Inter 400/500 body, 16px input font (zero iOS zoom) | `tokens.css` semantic bindings |
| **Brand Balance** | Over-saturated teal backgrounds and decorative gradient fills | Restrained Teal distribution (accents, focus rings, primary CTA only) | Brand Rules V3 compliance |

---

## 5. Visual Evidence Artifacts

The following visual artifacts were captured using automated headless Chrome with `deviceScaleFactor: 2` at full viewport resolutions:

1. **Desktop Viewport (1440px × 900px):**
   - File: `docs/evidence/screenshots/stage1-refined-desktop-1440px.png`
   - Demonstrates: Clean 2-column grid layout (1200px container), 52px slim header, 4-step progress indicator, 4 `FieldGroup` sections with 3px Teal accent bars, and quiet Coverage Selection Preview sidebar.

2. **Tablet Viewport (768px × 1024px):**
   - File: `docs/evidence/screenshots/stage1-refined-tablet-768px.png`
   - Demonstrates: Single-column responsive layout, 2-column liability tier grid, and natural vertical scrolling.

3. **Mobile Viewport (390px × 844px - iPhone 14 Standard):**
   - File: `docs/evidence/screenshots/stage1-refined-mobile-390px.png`
   - Demonstrates: Single-column vertical stacking, comfortable 46px touch targets, mobile-optimized step progress, and clean non-intrusive footer.

4. **Interactive Modal Viewport (1440px Desktop):**
   - File: `docs/evidence/screenshots/stage1-modal-desktop-1440px.png`
   - Demonstrates: MMC APC 31st December educational dialog overlay with accessible backdrop and focus trap.

---

## 6. Functional & Insurance Logic Parity Verification

Every single verified insurance rule from the approved DoctorShield domain model was preserved without alteration:

| Rule / Capability ID | Description | Implementation & Preservation Evidence |
| :--- | :--- | :--- |
| **`FLD-CALC-CLASS-001`** | Practitioner Classification Selector | 6 approved MMC categories preserved; default ID 7 (General Medical Practitioner). |
| **`RULE-SPC-01`** | Multi-Specialty Allocation Split | GP Aesthetics (ID 20) triggers conditional allocation banner and `SpecializationModal`; enforces 100% split. |
| **`FLD-CALC-LIAB-002`** | Limit of Liability Options | 4 tiers (`1m`, `2m`, `3m`, `5m`) preserved with approved base rates and recommended tags. |
| **`RULE-DATE-01`** | 9-Month Forward Inception Ceiling | Inception date > 9 months strictly blocked with accessible error alert. |
| **`RULE-DATE-02`** | Clause 6.12 Past Date Backdating | Past inception date triggers `BackdateAgreementModal`; mutates start date to 01/01 of current year upon acceptance. |
| **`RULE-DATE-03`** | MMC APC Co-Termination | Policy expiry strictly locked to 31 December; "Why 31st December?" modal operational. |
| **`FLD-CALC-EMAIL-005`** | Practitioner Email Address | Enforces strict RFC 5322 regex validation before quotation submission. |
| **`FLD-CALC-PROMO-006`** | Promotional / Affinity Code | Validates partner codes (e.g. `MMA2026`) via `RatingService.checkPromoCode`; calculates and displays discount. |
| **`LEG-PIDM-001`** | Verbatim Statutory PIDM Disclosure | Verbatim statutory notice displayed with external link to `www.pidm.gov.my`. |
| **`FLD-CALC-CONSENT-007`**| Affirmative Regulatory Consent | Mandatory checkbox gating submission; blocks calculation if unchecked. |
| **`ACT-NAV-NEXT-001`** | Authoritative Quote Calculation | Dispatches payload to `RatingService.calculatePremium` and transitions to Stage 2 upon success. |

---

## 7. Automated Test Suite Results

```
 RUN  v5.0.5 C:/Users/salee/Downloads/Portal_ds

 ✓ src/test/security_and_reliability.test.tsx (17 tests) 185ms
 ✓ src/test/components.test.tsx (7 tests) 419ms
 ✓ src/test/atomic_components.test.tsx (10 tests) 549ms
 ✓ src/test/form_molecules.test.tsx (16 tests) 623ms
 ✓ src/test/organisms_and_compositions.test.tsx (18 tests) 1010ms
 ✓ src/test/secondary_features.test.tsx (11 tests) 1353ms
 ✓ src/test/stage2.test.tsx (8 tests) 1937ms
 ✓ src/test/shell.test.tsx (7 tests) 2075ms
 ✓ src/test/stage1.test.tsx (9 tests) 3333ms
 ✓ src/test/stage4.test.tsx (10 tests) 3340ms
 ✓ src/test/e2e_scenarios.test.tsx (6 tests) 5186ms
 ✓ src/test/stage3.test.tsx (11 tests) 7551ms

 Test Files  12 passed (12)
      Tests  130 passed (130)
   Start at  22:34:14
   Duration  9.74s
```

TypeScript Check:
```
> portal_ds@1.0.0 typecheck
> tsc --noEmit
[Exit Code: 0]
```

---

## 8. Summary of Modified Codebase Files

- `src/features/coverage/Stage1CoverageForm.tsx`: Recomposed with `FieldGroup`, `PromoCodeField`, `LiabilityLimitSelector`, and Direction B tokens.
- `src/components/form/FieldGroup.tsx`: Created new structural section molecule with 3px Teal accent bar.
- `src/components/form/PromoCodeField.tsx`: Enhanced to support customizable button text, loading spinner, and flexible return promises.
- `src/components/form/LabeledSelect.tsx`: Refactored to 46px height, 6px radius, and 16px iOS-safe typography.
- `src/components/form/DateField.tsx`: Refactored to 46px height, 6px radius, and standard addon layout.
- `src/components/form/LabeledTextField.tsx`: Refactored to 46px height, 6px radius, and standard error handling.
- `src/components/insurance/LiabilityLimitSelector.tsx`: Rebuilt into clean 4-tier interactive grid without nested cards.
- `src/components/layout/SummarySidebar.tsx`: Gated Stage 1 preview to eliminate premature "RM 0.00" calculations.
- `src/components/layout/MobileSummaryDrawer.tsx`: Gated Stage 1 to suppress intrusive mobile drawer prior to quotation.
- `scripts/capture_stage1_screenshots.cjs`: Enhanced to capture 1440px desktop, 768px tablet, 390px mobile, and modal states.

---

## 9. Conclusion & Stop for Review

Phase 06 is fully verified and complete. The customer-facing Stage 1 experience is now a live exemplar of the approved DoctorShield design system—functional, minimal, accessible, and free of legacy SaaS dashboard clutter.

**STOPPING EXECUTION FOR REVIEW AND APPROVAL BEFORE COMMENCING PHASE 07 (STAGE 2 QUOTATION & OPTIONAL ADD-ONS).**
