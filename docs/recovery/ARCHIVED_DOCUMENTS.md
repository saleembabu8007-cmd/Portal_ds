# DOCTORSHIELD — ARCHIVED DOCUMENTS REGISTER
## Phase 01 — Governance & Documentation Cleanup

```
==================================================================================================
DOCUMENT CLASSIFICATION:  [AUTHORITATIVE] ARCHIVED DOCUMENTS & PROMPT ARTIFACTS REGISTER
GOVERNING SPECIFICATION:  DoctorShield Master Agent Rules V3 (Section 13 — Cleanup Rules)
ARCHIVE LOCATION:         docs/archive/
DATE OF ARCHIVING:        2026-10-30
TOTAL DOCUMENTS ARCHIVED: 37 FILES
STATUS:                   VERIFIED UNUSED BY CODE AND TESTS — SAFELY ARCHIVED
==================================================================================================
```

---

## 1. Archival Policy & Verification Criteria

In accordance with Phase 01 instructions:
1. **Zero Data Loss:** Documents are relocated into `docs/archive/`, preserving their full Git history and text content.
2. **Dependency Verification:** Prior to archiving, static analysis was performed to verify that **zero source files (`src/**`), zero automated test files (`src/test/**`), and zero build scripts (`scripts/**`)** reference or import any of these files.
3. **Consolidation of Truth:** Exploratory notes and diagnostic reports from previous prompt waves are consolidated under authoritative specifications in `docs/product/`, `docs/insurance/`, `docs/architecture/`, and `docs/design-system/`.

---

## 2. Complete Manifest of Archived Documents

| # | File Name in `docs/archive/` | Origin / Context | Reason for Archival | Authoritative Active Replacement |
| :-: | :--- | :--- | :--- | :--- |
| 1 | `AGENTS_V1_ORIGINAL.md` | Commit `55ba0fd` (2026-10-29) | Original v1 agent rules; superseded. | Root `AGENTS.md` (Master Rules V3) |
| 2 | `AGENTS_V2_CONTROLLED_RECOVERY.md`| Commit `3d5d018` (2026-10-30) | Phase 01 v2 agent rules; superseded. | Root `AGENTS.md` (Master Rules V3) |
| 3 | `ACCESSIBILITY_REPORT.md` | Wave 1 Forensic Audit | Historical audit checklist; superseded. | `docs/design-system/ACCESSIBILITY_CONTRAST_AUDIT.md` |
| 4 | `ADD_ON_SELECTION_BEHAVIOR.md` | Wave 2 Prompt Artifact | Exploratory UX notes on add-ons. | `docs/insurance/COVERAGE_DEPENDENCY_MATRIX.md` |
| 5 | `COGNITIVE_LOAD_ISSUES.md` | Wave 2 Prompt Artifact | Diagnostic UX notes on form fatigue. | `docs/research/EXISTING_UX_ISSUES.md` |
| 6 | `COLOR_CONTRAST_MATRIX.md` | Wave 2 Prompt Artifact | Preliminary WCAG color audit. | `docs/design-system/ACCESSIBILITY_CONTRAST_AUDIT.md` |
| 7 | `COMPONENT_REDESIGN_INVENTORY.md`| Wave 2 Prompt Artifact | Exploratory component list. | `docs/recovery/ACTIVE_CODE_MAP.md` |
| 8 | `CONDITIONAL_FLOW_MODEL.md` | Wave 2 Prompt Artifact | Preliminary flow branch diagram. | `docs/architecture/TO_BE_USER_FLOW.md` |
| 9 | `CONTENT_VISIBILITY_MATRIX.md` | Wave 2 Prompt Artifact | Draft content rules. | `docs/product/CONTENT_COVERAGE_MATRIX.md` |
| 10 | `COPY_PARITY_REPORT.md` | Wave 2 Prompt Artifact | Audit of text strings. | `docs/insurance/COPY_AND_LEGAL_REGISTER.md` |
| 11 | `FAILURE_AND_RECOVERY_TESTS.md` | Wave 1 Forensic Audit | Preliminary error scenario notes. | `src/test/security_and_reliability.test.tsx` |
| 12 | `FINAL_QA_REPORT.md` | Wave 1 Legacy Report | Outdated QA assessment. | `docs/recovery/BASELINE_TESTS.md` |
| 13 | `FORM_MOLECULES_SPECIFICATION.md`| Wave 2 Prompt Artifact | Draft spec for catalog molecules. | `docs/design-system/COMPONENT_SPECIFICATIONS.md` |
| 14 | `FOUNDATION_SYSTEM.md` | Wave 2 Prompt Artifact | Draft design token outline. | `src/design-system/tokens.css` & `foundation.css` |
| 15 | `INTEGRATION_VERIFICATION.md` | Wave 1 Legacy Report | Outdated API assessment. | `docs/recovery/INTEGRATION_STATUS.md` |
| 16 | `INTERFACE_ATOMS_SPECIFICATION.md`| Wave 2 Prompt Artifact | Draft spec for UI buttons/inputs. | `src/components/ui/` & `COMPONENT_SPECIFICATIONS.md` |
| 17 | `JOURNEY_COMPLEXITY_COMPARISON.md`| Wave 2 Prompt Artifact | Complexity metrics draft. | `docs/architecture/TO_BE_USER_FLOW.md` |
| 18 | `LAYOUT_AND_ORGANISMS_SPECIFICATION.md`| Wave 2 Prompt Artifact | Draft layout spec. | `src/components/layout/layout.css` |
| 19 | `LEGAL_CONTENT_EXCEPTIONS.md` | Wave 2 Prompt Artifact | Legal copy notes. | `docs/insurance/COPY_AND_LEGAL_REGISTER.md` |
| 20 | `MINIMAL_CONTENT_ARCHITECTURE.md`| Wave 2 Prompt Artifact | Concept paper on minimalism. | Root `AGENTS.md` (Sections 5 & 10) |
| 21 | `OBSERVABILITY_PLAN.md` | Wave 1 Legacy Report | Telemetry proposal. | `src/core/telemetry/logger.ts` |
| 22 | `PRODUCTION_BLOCKERS.md` | Wave 1 Legacy Report | Superseded blocker list. | `docs/recovery/BASELINE.md` |
| 23 | `PRODUCT_PARITY_REPORT.md` | Wave 1 Legacy Report | Historical parity check. | `docs/insurance/BUSINESS_RULE_CATALOG.md` |
| 24 | `REDESIGN_AUDIT.md` | Wave 2 Prompt Artifact | Initial visual audit of old screens. | `docs/recovery/BASELINE_SCREENSHOTS.md` |
| 25 | `REDESIGN_EXECUTION_PLAN.md` | Wave 2 Prompt Artifact | Superseded draft plan. | Master Agent Rules V3 (Section 16) |
| 26 | `RELEASE_READINESS.md` | Wave 1 Legacy Report | Historical release readiness draft. | Root `AGENTS.md` (Section 18) |
| 27 | `RESPONSIVE_TOKENS.md` | Wave 2 Prompt Artifact | Draft breakpoint token ideas. | `src/design-system/tokens.css` |
| 28 | `SCREEN_BY_SCREEN_INFORMATION_HIERARCHY.md`| Wave 2 Prompt Artifact | Exploratory hierarchy draft. | `docs/architecture/SCREEN_SPECIFICATIONS.md` |
| 29 | `SECURITY_REVIEW.md` | Wave 1 Legacy Report | Preliminary security audit. | `docs/architecture/SECURITY_DESIGN.md` |
| 30 | `SIMPLIFIED_USER_FLOW.md` | Wave 2 Prompt Artifact | Draft user flow diagram. | `docs/architecture/TO_BE_USER_FLOW.md` |
| 31 | `SPACING_AND_LAYOUT_GUIDE.md` | Wave 2 Prompt Artifact | Draft spacing guidelines. | `src/design-system/tokens.css` |
| 32 | `STYLE_MIGRATION_REPORT.md` | Wave 2 Prompt Artifact | Preliminary CSS migration notes. | `docs/recovery/ACTIVE_CODE_MAP.md` |
| 33 | `TOKEN_CONVENTIONS.md` | Wave 2 Prompt Artifact | Draft token naming guide. | `docs/design-system/COMPONENT_TOKEN_CONVENTIONS.md`|
| 34 | `TYPOGRAPHY_SPECIMEN.md` | Wave 2 Prompt Artifact | Exploratory typography specimen. | `src/components/ui/Typography.tsx` |
| 35 | `VISUAL_DESIGN_DEBT.md` | Wave 2 Prompt Artifact | Visual critique of legacy UI. | `docs/recovery/BASELINE_SCREENSHOTS.md` |
| 36 | `VISUAL_LANGUAGE_RESET.md` | Wave 2 Prompt Artifact | Concept memo on design reset. | Root `AGENTS.md` (Section 6) |
| 37 | `VISUAL_POLISH_REPORT.md` | Wave 1 Legacy Report | Superseded visual inspection. | `docs/recovery/BASELINE_SCREENSHOTS.md` |

---

## 3. Preservation Confirmation

None of the 37 archived documents were deleted. All files remain fully recoverable in `docs/archive/` and via Git history (`git log -- docs/archive/`).

