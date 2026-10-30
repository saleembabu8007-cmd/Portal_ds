# DoctorShield Individual Indemnity — Phased Redesign Execution Plan

> **Document Reference:** `DOC-EXEC-PLAN-2026-10-29`  
> **Status:** Execution Roadmap & Quality Protocol Baseline  
> **Author:** Principal Product Designer & Design Systems Architect  
> **Target Scope:** Phased, Non-Destructive Refactoring of the **EXISTING CODEBASE**  
> **Protocol:** Zero modifications to core business logic, zero regressions on the 86 automated test cases, zero git commits/pushes without explicit user authorization.

---

## 1. Executive Summary & Phasing Strategy

To transform the DoctorShield portal from an overcrowded, AI-generated wireframe into an ultra-minimal, calm, medical-grade financial experience, the redesign will be executed in **6 tightly scoped, sequential phases**.

Each phase follows a strict safety protocol:
1. **No Logic Changes:** All hooks (`useWorkflow`), rating APIs (`RatingService`), validation schemas, and state transitions remain strictly intact.
2. **Zero Test Regressions:** After every phase, the full test suite (`npm test`, 86 tests) must pass with zero failures.
3. **Review Checkpoint:** The agent will pause at designated checkpoints to allow user visual inspection before proceeding.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       6-PHASE REDESIGN ROADMAP                              │
├───────────────┬─────────────────────────────────────────────────────────────┤
│ Phase 1       │ Design Tokens Consolidation & Global CSS Utility Layer      │
├───────────────┼─────────────────────────────────────────────────────────────┤
│ Phase 2       │ Shell, Header, Navigation & Stepper Modernization           │
├───────────────┼─────────────────────────────────────────────────────────────┤
│ Phase 3       │ Stage 1 (Coverage) & Stage 2 (Quotation) Visual Refactor    │
├───────────────┼─────────────────────────────────────────────────────────────┤
│ Phase 4       │ Stage 3 (Particulars & Underwriting) De-cluttering          │
├───────────────┼─────────────────────────────────────────────────────────────┤
│ Phase 5       │ Stage 4 (Review & Payment) & Stage 5 (Confirmation) Polish  │
├───────────────┼─────────────────────────────────────────────────────────────┤
│ Phase 6       │ Full Test Suite Verification, WCAG AA Audit & Screenshots   │
└───────────────┴─────────────────────────────────────────────────────────────┘
```

---

## 2. Detailed Phase Specifications

### Phase 1: Design Tokens Consolidation & Global CSS Utility Layer
- **Objective:** Eliminate the 493 inline style blocks by establishing clean, reusable CSS classes mapped to the existing `tokens.css` design system.
- **Key Deliverables:**
  1. Author `src/styles/portal-redesign.css` with semantic classes:
     - `.ds-card`: Flat white surface, hairline border (`#E2E8F0`), zero heavy shadow.
     - `.ds-card-selected`: Active teal border (`#08A5B5`), subtle tint.
     - `.ds-input`, `.ds-select`: Standardized 44 px height, accessible focus ring.
     - `.ds-heading-display`, `.ds-heading-section`: Strict Kanit 500 typography.
     - `.ds-radio-pill`: Accessible, segmented control styling.
  2. Audit `tokens.css` to ensure all heading font-weights are capped at 500 (fixing Rule 4.2 violations).
- **Verification Gate:** Build passes (`npm run build`). No visual regressions on existing pages.

---

### Phase 2: Shell, Header, Navigation & Stepper Modernization
- **Objective:** Strip visual clutter from the application frame, reduce header distraction, and solve the 42% mobile viewport occlusion issue.
- **Key Deliverables:**
  1. Refactor `src/components/layout/BrandHeader.tsx`:
     - Slim down height from 60 px to 52 px.
     - Simplify co-branding text lockup.
     - Convert 3 heavy utility buttons into a discreet secondary menu or minimalist text links.
  2. Refactor `src/components/insurance/InsuranceStepProgress.tsx`:
     - Desktop: Clean line stepper without massive circular badges.
     - Mobile: Single-line status indicator (`Stage 2 of 4 · Quotation`) with a 2 px progress fill bar, saving 34 px of screen height.
  3. Refactor `src/components/layout/SummarySidebar.tsx` & `MobileSummaryDrawer.tsx`:
     - Flatten borders, remove AI marketing badges.
     - Slim down mobile summary bar to 44 px.
- **Verification Gate:** Mobile viewport clearance verified at 390 px width; `npm test` passes.

---

### Phase 3: Stage 1 (Coverage) & Stage 2 (Quotation & Add-ons) Refactor
- **Objective:** Eliminate "Card-in-Card" nesting in the two initial rating screens, purge AI-generated filler copy, and implement clean progressive disclosure.
- **Key Deliverables:**
  1. Refactor `src/features/coverage/Stage1CoverageForm.tsx`:
     - Remove redundant MMC helper paragraph under classification.
     - Replace 4 bulky limit cards with sleek horizontal segmented radio tiles or flat unboxed cards.
     - Preserve the exact `"Recommended"` badge on RM 1M for test compatibility.
     - Flatten date input container and remove disruptive "Why 31st December?" modal button in favor of subtle helper text.
     - Streamline promo code into a collapsible inline link.
  2. Refactor `src/features/quote/Stage2QuoteReview.tsx`:
     - Replace rate-lock countdown panic box with calm validity notice.
     - Flatten 4 layers of nested cards into a single clean section with subtle dividers.
     - Implement progressive disclosure for Clinic Entity Protection (hidden until Clinic = `Yes`).
     - Remove AI lecture copy explaining why private clinic owners face liability.
     - Clean fulfillment selection (inline secondary button: `Email Quote (PDF)`).
- **Verification Gate:** Quotation recalculation and add-on toggling work flawlessly; Vitest coverage tests pass.

---

### Phase 4: Stage 3 (Particulars, Branches & Underwriting) De-cluttering
- **Objective:** Transform the 35-field scrolling monolith into a calm, structured, professional medical application form without dropping a single required field or legal question.
- **Key Deliverables:**
  1. Refactor `src/features/particulars/Stage3ParticularsForm.tsx`:
     - Group fields into two clean, logical sections: Identity and Practice.
     - Standardize all text inputs and select dropdowns to 44 px height with unified typography.
  2. Refactor `src/features/particulars/BranchManager.tsx`:
     - Replace bordered branch box with a clean unboxed table.
     - Upgrade edit/delete action button hitboxes to ≥40 px for WCAG compliance.
  3. Refactor `src/features/underwriting/UnderwritingQuestionnaire.tsx`:
     - Remove card boxes around each question; replace with a clean typographic list separated by hairline rules.
     - Replace bright yellow disclosure warning with a neutral, calm slate input area.
     - Preserve all 4 individual declaration questions and 4 clinic questions verbatim.
     - Preserve Schedule 9 FSA 2013 legal declaration verbatim.
- **Verification Gate:** E2E underwriting submission and branch management tests pass with zero regressions.

---

### Phase 5: Stage 4 (Review & Payment) & Stage 5 (Confirmation) Polish
- **Objective:** Eliminate the double summary table on desktop, streamline checkout, and deliver a calm, authoritative policy confirmation experience.
- **Key Deliverables:**
  1. Refactor `src/features/review/Stage4ReviewAndPayment.tsx`:
     - Remove the 10-line calculation table from the main column (sidebar provides the single authoritative breakdown).
     - Present a clean, concise policy summary card.
     - Modernize payment method selection into clean radio tabs (Card, FPX, E-Wallet).
     - Standardize PIDM and Section 130 FSA 2013 commission disclosures.
  2. Refactor `src/features/confirmation/Stage5PolicyConfirmation.tsx`:
     - Replace confetti celebration aesthetic with an authoritative medical insurance issuance receipt.
     - Provide 1-click download actions for Certificate of Insurance, Tax Invoice, and Policy Wording with locked `data-testid` attributes.
- **Verification Gate:** Payment simulation and policy issuance workflow passes.

---

### Phase 6: Automated Verification, Accessibility & Visual Evidence
- **Objective:** Validate that the redesigned portal meets all production quality targets before final handoff.
- **Key Deliverables:**
  1. **Automated Test Run:** Run `npm test` across all 6 test suites (86 tests). Target: 100% pass rate.
  2. **Accessibility Audit:** Run axe-core / automated accessibility checks to confirm WCAG 2.2 AA compliance.
  3. **Visual Evidence Capture:** Generate fresh screenshots at desktop (1440 px) and mobile (390 px) for all 5 stages.
  4. **Document Update:** Record changes in `REDESIGN_AUDIT.md` and `RELEASE_READINESS.md`.
- **Verification Gate:** All criteria met. Present final results to user.

---

## 3. Strict Safety Protocol & Prohibitions

1. **NO GIT OPERATIONS WITHOUT PERMISSION:** Under no circumstances shall `git add`, `git commit`, or `git push` be executed automatically. The user will be given the git command to run when they are ready.
2. **NO BUSINESS LOGIC MODIFICATIONS:** Do not alter `ratingService.ts`, `WorkflowContext.tsx`, `classifications.ts`, or any underwriting eligibility rules.
3. **NO REMOVAL OF REGULATORY CONTENT:** Every PIDM notice, Schedule 9 disclosure, Clause 6.12 backdate term, and Chubb disclaimer must be preserved verbatim.
4. **NO DESTRUCTION OF TEST SELECTORS:** Every label text, test ID, and ARIA role documented in `COMPONENT_REDESIGN_INVENTORY.md` must be retained.

---

## 4. Current Status: Ready for User Review

The complete Design Discovery & Audit package has been compiled and saved to the project root:
- `REDESIGN_AUDIT.md` (Screen-by-screen UX & visual audit)
- `COGNITIVE_LOAD_ISSUES.md` (Hick's Law, visual noise & mobile occlusion analysis)
- `VISUAL_DESIGN_DEBT.md` (493 inline styles, elevation debt & type scale inventory)
- `COMPONENT_REDESIGN_INVENTORY.md` (Component-by-component redesign mapping & test IDs)
- `REDESIGN_EXECUTION_PLAN.md` (6-phase implementation roadmap)

**Awaiting user review and authorization before modifying any UI component code.**

