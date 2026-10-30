# DOCTORSHIELD — MASTER AGENT RULES V3 ADOPTION
## Formal Adoption of Master Agent Rules V3 Across All Engineering & Design Workflows

```
==================================================================================================
DOCUMENT CLASSIFICATION:  [VERIFIED] GOVERNANCE ENACTMENT RECORD
GOVERNING AUTHORITY:      DoctorShield Master Agent Rules (Version 3.0)
AUDIT AUTHORITY:          Principal Software Architect & Lead Product Designer
DATE OF ENACTMENT:        2026-10-30
SUPERSEDED GOVERNANCE:    DoctorShield Product Engineering & Design Rules v2.0 (2026-10-30)
ACTIVE REPOSITORY ROOT:   AGENTS.md
==================================================================================================
```

---

## 1. Executive Statement

Following the completion of **Phase 06 (Real Application Shell & Stage 1 Refinement)**, the project governance has been elevated from Version 2.0 to **DoctorShield Master Agent Rules Version 3.0**.

Master Agent Rules V3 formalize the decisive principle:
> **Stop preserving a visually unsuccessful frontend simply because it already exists.**  
> **Preserve valuable functionality.**  
> **Replace weak visual architecture deliberately.**  
> **Build one consistent, distinctive DoctorShield product.**

This governance document replaces historical constraints with 18 clear, enforceable operational sections, establishing the definitive ground rules for all subsequent stages (Phase 07 through Phase 10).

---

## 2. Core Enhancements in Master Agent Rules V3

| Section | Title | Primary Evolution / Invariant |
| :--- | :--- | :--- |
| **Section 1** | Project Mission | Mandates a complete visual redesign rather than cosmetic improvement. Preserves verified domain logic while authorizing complete visual overhaul of presentation components and layouts. |
| **Section 2** | Design Benchmarks | Establishes QIC Online (composition, transactional UI) & Ditto (human clarity, restraint) as primary benchmarks, ACKO as secondary, and Baymard Institute as UX research. Explicitly forbids copying competitor assets or colors. |
| **Section 3** | Official Branding | Solidifies `#08A5B5` (Primary), `#132766` (Secondary), Kanit 400/500 only for headings (never bold 600+), and Inter for body. Accessible derivatives (`#066F7B`, `#055C66`) required for AA contrast. |
| **Section 4** | Mandatory Insurance Protection | Strict protection of classifications, limits, dates, rating math, clinic/PIC eligibility, add-on rules, underwriting questions, tax/discount treatment, and statutory disclosures. Local pricing simulations must be labeled as simulations until live integration is independently verified. |
| **Section 5** | Content Rules | Strict zero tolerance for invented marketing copy or arbitrary paragraphs. Minimalism must be achieved through sequencing, conditional visibility, clear hierarchy, and reduced duplication. |
| **Section 6** | Visual Reset — Mandatory | Clarifies that existing visual components are candidates for redesign, not sacred templates. A new design system must look materially different for clear, intentional reasons. |
| **Section 7** | Visual Design Quality | Prioritizes typography, whitespace, and optical alignment. Forbids generic SaaS dashboards, wireframe-like forms, nested cards, gratuitous gradients, and decorative illustrations in form screens. |
| **Section 8** | Atomic Design System | Mandates full spectrum: Foundations $\rightarrow$ Atoms $\rightarrow$ Molecules $\rightarrow$ Organisms $\rightarrow$ Templates $\rightarrow$ Screens. Every component must have explicit anatomy, states, accessibility, and responsive rules. |
| **Section 9** | Design System Adoption | Strict rule: components are not complete until integrated into active customer journeys. Forbids parallel detached libraries or hardcoded visual values in screens. |
| **Section 10**| UX and Cognitive Load | Single clear task per screen, natural question ordering, conditional disclosure, error recovery without data loss, and transparent pricing feedback. |
| **Section 11**| Mobile-First Quality | Mobile is an independently composed layout tested at 320, 360, 390, 430, 768, 1024, and 1440px. 44px min touch targets, 16px min input text to avoid iOS Safari zoom, and no obstructive sticky elements. |
| **Section 12**| Codebase Architecture | Separation of domain models, rating/underwriting services, API integrations, application state, form schemas, shared UI, and feature screens. |
| **Section 13**| Cleanup Rules | Verification of active files before deletion. Never delete code based solely on old audit reports; clean obsolete code incrementally after replacement. |
| **Section 14**| Test and Acceptance Policy | Typecheck, build, unit/integration tests, regression checks, desktop and mobile screenshots, accessibility, and content parity for every completed task. |
| **Section 15**| Visual Acceptance Gate | **MANDATORY BEFORE/AFTER GATE:** Before implementing a redesigned screen, capture the current screen. After implementing, capture the new screen at the exact same conditions. Must demonstrate actual structural improvement; minor CSS tweaks fail the gate. |
| **Section 16**| Phase Execution | Enforces strict 11-step procedure for every phase, ending with **Step 11: Stop for review**. Automatic continuation into subsequent phases is forbidden. |
| **Section 17**| Required Completion Report | Standardized 11-point report required for every delivered phase. |
| **Section 18**| Definition of Done | Explicit checklist covering live integration, new visual design, shared component usage, verified insurance behavior, tests, accessibility, mobile/desktop responsiveness, and no architectural duplication. |

---

## 3. Operational Mandate for Upcoming Phases

All future work on DoctorShield will be governed strictly under Master Agent Rules V3:
- **Phase 07:** Stage 2 Quotation & Add-on Selection Refinement (`Stage2QuoteReview.tsx`, `CoverageAddonCard`, Clinic Entity & PIC add-on logic).
- **Phase 08:** Stage 3 Personal Particulars & Statutory Underwriting Refinement (`Stage3ParticularsForm.tsx`, `BranchManager.tsx`, `UnderwritingQuestionnaire.tsx`).
- **Phase 09:** Stage 4 Review & Payment Checkout Refinement (`Stage4ReviewAndPayment.tsx`, Payment Gateways, Rate Lock).
- **Phase 10:** Stage 5 Confirmation, Secondary Flows & Final Release Hardening (`Stage5PolicyConfirmation.tsx`, Renewal, Retrieve Quote, Bundle Optimization).

Every phase will execute the **Mandatory Visual Acceptance Gate (Section 15)**:
1. Capture current "before" screenshots at 1440px and 390px.
2. Recompose screen using approved shared design system components.
3. Capture new "after" screenshots at 1440px and 390px.
4. Verify tests (120/120 passing minimum), build, and accessibility.
5. Provide delivery report and stop for explicit user approval.

