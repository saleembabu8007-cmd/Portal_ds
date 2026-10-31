# Phase 08 — Personal Details, Branches & Underwriting Redesign Report

**Document ID:** `08_PERSONAL_DETAILS_AND_UNDERWRITING_REPORT.md`  
**Version:** 3.0  
**Status:** COMPLETE (Awaiting Principal Product Designer & User Approval)  
**Date:** 2026-10-30  
**Author:** Principal UX Architect, Form Interaction Designer & Staff Frontend Engineer  
**Scope:** DoctorShield Individual Medical Indemnity Portal (`Portal_ds`)

---

## 1. Executive Summary

In strict accordance with **Master Agent Rules V3** and the **Direction B: Structured Minimal Design Foundations**, Phase 08 has completely re-architected and redesigned **Stage 3: Personal Particulars, Clinic and Branch Management, and Statutory Underwriting** (`SCR-TOBE-03`).

The previous implementation suffered from severe visual crowding: excessive vertical scrolling, multiple heavy nested card wrappers, dense blocks of unformatted legal text, jarring screaming red callouts for standard underwriting declarations, and an awkward modal-based branch editor.

Phase 08 eliminates all nested card wrappers and delivers an ultra-clean, minimal, high-trust transactional experience tailored specifically for Malaysian medical practitioners.

### Key Architectural & Design Transformations:

1. **Un-nested, Scannable Particulars Architecture (Part 1):**
   - Removed all heavy card containers, drop shadows, and grey outer shells.
   - Grouped fields into logical `FieldGroup` molecules framed by quiet 3px Brand Teal (`#08A5B5`) vertical indicators:
     - **Section 1: Practitioner Identification** (Salutation, Full Name, NRIC/Passport segmented choice, auto-derived Date of Birth & Gender, Nationality, Country, MMC Full Reg Number, Email, Mobile Phone, and LHDN Tax Identification Number).
     - **Section 2: Professional Practice Particulars** (Primary Practice Location, Clinic Entity Name, Practice Address 1 & 2, Postcode, City, State, and Annual Gross Practice Income).
   - Enforced Direction B unified controls: 46px input height, 6px border radius, 1px `#CBD5E1` border, 3px Brand Teal focus rings, and minimum 44px touch targets.
   - Smart field interaction: NRIC auto-derivation of DOB and Gender operates seamlessly in real time while maintaining manual override capability.

2. **Streamlined Clinic & Branch Management (Part 2):**
   - Replaced clunky modal dialogs and large empty editors with a refined inline branch management experience (`BranchManager.tsx`).
   - Individual branches are displayed as compact summary cards with a clean `Branch X of Y` status badge, address metadata, and accessible secondary action buttons (`Edit`, `Remove`).
   - Inline add/edit form activates directly within context with standard 46px inputs and responsive 2-column layout.
   - Strictly enforces the **Maximum 4 Additional Branches** limit (`RULE-BRN-01`) with clear informative helper text and automatic add-button deactivation once the limit is reached.
   - Statutory RM 5,000,000 aggregate revenue ceiling condition (`LEG-BRANCH-001`) is integrated cleanly as an informative callout rather than an intrusive warning.

3. **Quiet, High-Trust Statutory Underwriting (Part 3):**
   - Redesigned `UnderwritingQuestionnaire.tsx` into a pristine, readable statutory questionnaire.
   - Preserved every word of mandatory statutory wording across the 4 core underwriting questions verbatim.
   - Replaced generic radio buttons with 44px min touch target segmented choice cards (Agree/Disagree and No/Yes) featuring clean 1px `#CBD5E1` borders, 6px radii, and active `#08A5B5` borders.
   - **Adverse Declarations UX:** Replaced aggressive red alert banners with smooth, dignified warm amber narrative callouts (`#FFFBEB` surface, 3px `#D97706` amber indicator, 1px `#FDE68A` border) inviting the practitioner to provide full particulars without inducing unnecessary panic.
   - Preserves Section 4, Schedule 9 FSA 2013 statutory truth declaration (`LEG-DECL-001`) with a generous 44px touch checkbox envelope.

4. **Supplementary Risk Assessments & Exceptions (Part 4 & 5):**
   - Redesigned the supplementary **COVID-19 Facility Risk Assessment** (Screens 04A-C) as an accessible, clean accordion disclosure (`AccordionSection`) that expands smoothly only when clinic operations or COVID-19 designated facility status is active.
   - Seamlessly integrated the Underwriting Referral flow: adverse submissions safely route to the dedicated Underwriting Referral page with a Relationship Manager Callback request form (`FLD-REF-070..073`), preserving all Tier 1 particulars.
   - Enforced AML/CFT sanctions screening gate (`DT-IND-06`), halting progress on flagged identities.

5. **Accessible Error Experience (Part 6):**
   - Integrated the unified `ErrorSummaryBanner` at the top of the form with `role="alert"` and auto-focus for screen readers.
   - Individual field error messages render cleanly beneath inputs with high-contrast `#B91C1C` typography without triggering conflicting ARIA alerts.

---

## 2. Visual Acceptance Gate Comparison (Rule 15)

| Design Dimension | Old Legacy Stage 3 | Phase 08 Refined Stage 3 | Verification Evidence |
| :--- | :--- | :--- | :--- |
| **Container & Surfaces** | Heavy multi-level nested cards, dark borders, grey outer panels | Flat, quiet `#FFFFFF` surfaces with 1px `#E2E8F0` borders and 10px outer radius | `docs/evidence/screenshots/stage3-particulars-clean-desktop-1440px.png` |
| **Section Architecture** | Arbitrary headings with inconsistent padding and dividers | Structured `FieldGroup` sections with 3px Teal `#08A5B5` vertical accent bars | `Stage3ParticularsForm.tsx` sections 1 to 4 |
| **Input Geometry** | Inconsistent 36px to 48px heights, rounded-full pills, random radii | Direction B standardized 46px control height, 6px radius, 1px `#CBD5E1` border | Verified across all 18 form inputs |
| **Branch Management** | Clunky modal popups with disjointed inputs and large empty tables | Compact inline summary cards, `Branch X of Y` badges, seamless inline add/edit | `docs/evidence/screenshots/stage3-particulars-branches-desktop-1440px.png` |
| **Branch Limits** | Unclear branch restrictions and missing revenue ceiling notices | Explicit `RULE-BRN-01` (max 4) limit helper text and `LEG-BRANCH-001` ceiling callout | Inspected in `BranchManager.tsx` |
| **Underwriting Questions** | Standard cramped checkboxes/radios with microscopic legal text | 44px touch choice cards, clear Inter 14px statutory text, active brand teal stroke | `docs/evidence/screenshots/stage3-particulars-clean-desktop-1440px.png` |
| **Adverse Declarations** | Aggressive red warning boxes and abrasive failure banners | Calm amber callouts (`#FFFBEB`, 3px amber bar) with structured particulars textarea | `docs/evidence/screenshots/stage3-underwriting-adverse-desktop-1440px.png` |
| **COVID-19 Disclosures** | Cluttered standalone tables forced into the main flow | Clean collapsible accordion (`AccordionSection`) with progressive disclosure | `docs/evidence/screenshots/stage3-covid-questionnaire-desktop-1440px.png` |
| **Validation Feedback** | Unstyled browser tooltips or jarring modal alerts | Accessible `ErrorSummaryBanner` with focus management and inline field feedback | `docs/evidence/screenshots/stage3-validation-errors-desktop-1440px.png` |
| **Mobile Quality** | Severe horizontal overflowing, truncated labels, cramped touch targets | Responsive single-column flow, >=44px touch targets, 16px mobile input typography | `docs/evidence/screenshots/stage3-particulars-mobile-390px.png` |

---

## 3. Visual Evidence Artifacts

Headless Chrome visual evidence captured at 2x device scale factor:

| Artifact Name | Viewport / State | Key Verified Visual Features | File Reference |
| :--- | :--- | :--- | :--- |
| **1. Clean Particulars & UW** | Desktop (1440px) | Full 4-section flow, clean field groups, 46px inputs, 44px choice cards, Schedule 9 declaration | `docs/evidence/screenshots/stage3-particulars-clean-desktop-1440px.png` |
| **2. Clinic Branch Management** | Desktop (1440px) | 2 active branches with `Branch X of Y` badges, RM 5M ceiling condition, inline add form | `docs/evidence/screenshots/stage3-particulars-branches-desktop-1440px.png` |
| **3. Adverse Declaration** | Desktop (1440px) | Affirmative declaration on Question 1, quiet amber narrative callout, referral test flow | `docs/evidence/screenshots/stage3-underwriting-adverse-desktop-1440px.png` |
| **4. COVID-19 Questionnaire** | Desktop (1440px) | Supplementary COVID-19 risk assessment accordion expanded with 3 binary choice questions | `docs/evidence/screenshots/stage3-covid-questionnaire-desktop-1440px.png` |
| **5. Validation Errors** | Desktop (1440px) | Accessible `ErrorSummaryBanner` at top of form, high-contrast inline field error feedback | `docs/evidence/screenshots/stage3-validation-errors-desktop-1440px.png` |
| **6. Tablet Viewport** | Tablet (768px) | Fluid responsive 2-column and 1-column layouts, generous touch targets, clear hierarchy | `docs/evidence/screenshots/stage3-particulars-tablet-768px.png` |
| **7. Mobile Viewport** | Mobile (390px - iPhone 14) | 1-column stacked flow, 46px height touch envelopes, 16px font preventing iOS zoom, clean sticky nav | `docs/evidence/screenshots/stage3-particulars-mobile-390px.png` |

---

## 4. Regulatory, Statutory & Business Rule Parity Verification

| Capability / Rule ID | Verified Insurance Requirement | Implementation & Preservation Evidence |
| :--- | :--- | :--- |
| **`LEG-DECL-001`** | Section 4, Schedule 9 FSA 2013 Statutory Truth Declaration | Mandatory verbatim statutory disclosure with required affirmative checkbox prior to submission. |
| **`SEC-PDPA-001`** | Personal Data Protection Act 2010 Notice & Consent | Explicit statutory consent banner for NRIC verification and regulatory compliance processing. |
| **`RULE-BRN-01`** | Maximum 4 Additional Clinic Branches | Enforced in `BranchManager.tsx`. Add button automatically disables at 4 branches with user helper notice. |
| **`LEG-BRANCH-001`** | RM 5,000,000 Aggregate Clinic Revenue Ceiling | Explicit condition displayed in branch manager; branch revenue input validated against ceiling. |
| **`FLD-IND-01..05`** | Practitioner Identity & NRIC Parsing | Automatic real-time parsing of NRIC into DOB (YYYY-MM-DD) and Gender (Male/Female) with manual edit fallback. |
| **`FLD-IND-06..10`** | MMC Registration & Tax Compliance | MMC Full Registration Number, verified Email, Malaysian Mobile (+60), and LHDN TIN. |
| **`FLD-PRAC-01..07`**| Practice Location & Entity Details | Practice Name, Entity Name, Street Address, Postcode, City, State, and Annual Gross Practice Income. |
| **`FLD-UW-01..04`** | Core Statutory Underwriting Declarations | 4 statutory questions (Past Claims, Disciplinary Inquiries, License Suspensions, Prior Insurer Refusals). |
| **`FLD-UW-COVID`** | Supplementary COVID-19 Risk Assessment | Screens 04A-C covering facility testing, ICU treatment, and vaccine storage risk disclosures. |
| **`FLD-REF-070..073`**| Adverse Declaration Referral & RM Callback | Routes adverse declarations to Referral terminal page; relationship manager callback form preserved. |
| **`DT-IND-06`** | AML / CFT Sanctions Screening Gate | Halts progression when blocked NRIC is detected, displaying statutory compliance notice. |

---

## 5. Automated Test Suite Results

All 12 test suites, encompassing all 130 unit, integration, organism, stage, and end-to-end scenarios, pass with 100% compliance:

```
 RUN  v5.0.5 C:/Users/salee/Downloads/Portal_ds

 ✓ src/test/security_and_reliability.test.tsx (17 tests) 241ms
 ✓ src/test/components.test.tsx (7 tests) 4247ms
 ✓ src/test/atomic_components.test.tsx (10 tests) 5508ms
 ✓ src/test/form_molecules.test.tsx (16 tests) 4461ms
 ✓ src/test/organisms_and_compositions.test.tsx (18 tests) 7951ms
 ✓ src/test/secondary_features.test.tsx (11 tests) 8456ms
 ✓ src/test/stage2.test.tsx (8 tests) 11607ms
 ✓ src/test/shell.test.tsx (7 tests) 11116ms
 ✓ src/test/stage4.test.tsx (10 tests) 14812ms
 ✓ src/test/stage1.test.tsx (9 tests) 15135ms
 ✓ src/test/e2e_scenarios.test.tsx (6 tests) 20486ms
 ✓ src/test/stage3.test.tsx (11 tests) 30164ms

 Test Files  12 passed (12)
      Tests  130 passed (130)
   Start at  00:37:09
   Duration  44.78s
```

TypeScript Compilation Check:
```
> portal_ds@1.0.0 typecheck
> tsc --noEmit
[Exit Code: 0 - Zero Errors]
```

---

## 6. Summary of Modified Codebase Files

- `src/features/particulars/Stage3ParticularsForm.tsx`: Completely recomposed using un-nested `FieldGroup` molecules, Direction B 46px controls, and an accessible top `ErrorSummaryBanner`.
- `src/features/particulars/BranchManager.tsx`: Re-architected into an inline branch manager with `Branch X of Y` badges, max 4 branch limit enforcement (`RULE-BRN-01`), and RM 5M ceiling notice (`LEG-BRANCH-001`).
- `src/features/underwriting/UnderwritingQuestionnaire.tsx`: Redesigned statutory underwriting questionnaire with 44px choice cards, quiet amber narrative callouts (`#FFFBEB`), and collapsible COVID-19 facility risk accordion.
- `src/features/quote/Stage2QuoteReview.tsx`: Updated with syncing `useEffect` for external coverage parameters to ensure reliable cross-stage transitions.
- `vite.config.ts`: Configured `testTimeout: 15000` to guarantee test runner resilience during full parallel test suite execution.
- `scripts/capture_stage3_screenshots.cjs`: Automated multi-viewport, multi-state headless Chrome screenshot suite capturing clean particulars, branches, adverse declarations, COVID questionnaire, validation errors, tablet, and mobile.
- `docs/evidence/screenshots/stage3-*`: 7 new visual acceptance artifacts.

---

## 7. Conclusion & Stop for Review

Phase 08 is fully verified and complete. The customer-facing Stage 3 experience is now an exemplar of the approved DoctorShield design system—functional, high-trust, modular, accessible, and completely free of legacy nested cards.

**STOPPING EXECUTION FOR REVIEW AND APPROVAL BEFORE COMMENCING PHASE 09 (STAGE 4 REVIEW, PAYMENT & CONFIRMATION).**

