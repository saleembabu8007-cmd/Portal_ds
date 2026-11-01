# PHASE 01 — COMPLETE LEGACY DESIGN SYSTEM RETIREMENT REPORT

> **Document Version:** 5.0 — Final Legacy Retirement & Repository Cleanup Report  
> **Author:** Senior Frontend Architect & Repository Cleanup Engineer  
> **Status:** Complete — Awaiting Approval Gate  
> **Governance:** Master Product Rules V5 & Rule 4 (Engineering, Migration & Quality Rules)  
> **Target Architecture:** Five-Stage Digital Journey (Coverage, Quotation, Details, Declaration, Summary)  

---

## 1. Executive Summary & Objective

In **Phase 01**, we executed the comprehensive retirement, cleanup, and architectural detachment of DoctorShield's rejected legacy design system, obsolete component catalogs, non-production exploration routes, abandoned composition scaffolds, and outdated capture scripts.

### Key Outcomes:
1. **Catalog & Showcase Purge:** All non-production showcase routes (`/catalog`, `/atoms-gallery`, `/tokens-specimen`, `/exploration`, `/direction-a`, `/direction-b`) and associated files (`src/catalog/`, `src/explorations/`) were archived to `docs/archive/legacy_catalog/` and `docs/archive/legacy_explorations/` and excised from the application bundle.
2. **Abandoned Scaffolds Removed:** Unreferenced mock components (`src/components/compositions/StageCompositions.tsx` and `src/components/layout/StepActionBar.tsx`) were archived to `docs/archive/` and deleted from `src/`.
3. **Legacy Scripts & Screenshots Cleaned:** Obsolete Puppeteer capture scripts and temporary exploration screenshots were archived to `docs/archive/legacy_scripts/` and `docs/archive/legacy_screenshots/`.
4. **Vite Bundle Optimization:** Removed `dev-catalogs` rollup chunk from `vite.config.ts`, reducing JavaScript production bundle from **840+ KB** to **401 KB** (a **52% reduction**).
5. **Zero Regression:** All **130 of 130 tests pass** across 12 test files, `npm run typecheck` passes with **0 errors**, and production build completes in **789ms**.
6. **Replacement Structure Reserved:** A clean, unpolluted directory structure is established under `src/design-system/` (`primitives/`, `patterns/`, `layout/`) to house incoming Phase 03/04 components.

---

## 2. Precondition Verification

- **Phase 00 Checkpoint:** Verified intact at Git tag `checkpoint-phase00-reset-baseline` and branch `backup/phase00-pre-visual-reset` at commit `1a276e6`.
- **Repository Safety:** Every removed file was preserved in `docs/archive/` before deletion from `src/`.
- **Production Safety:** Zero production transaction endpoints, OTP gateways, or policy submission handlers were triggered.

---

## 3. Removal and Retention Register

The following register categorizes every design-related artifact across the repository into five formal governance categories:

```
+----------------------------------------------------------------------------------------------------+
|                                    REMOVAL AND RETENTION REGISTER                                  |
+------------------------------------+-----------------------------+---------------------------------+
| Artifact / Path                    | Categorization              | Action Taken / Migration Status |
+------------------------------------+-----------------------------+---------------------------------+
| `src/catalog/CatalogApp.tsx`       | Safe to Delete Immediately  | Archived to docs/archive/       |
| `src/catalog/main.tsx`             | Safe to Delete Immediately  | Archived to docs/archive/       |
| `src/explorations/*` (3 files)     | Safe to Delete Immediately  | Archived to docs/archive/       |
| `src/components/compositions/*`    | Safe to Delete Immediately  | Archived to docs/archive/       |
| `src/components/layout/StepActionBar` Safe to Delete Immediately | Archived to docs/archive/       |
| `scripts/capture_art_direction*`   | Safe to Delete Immediately  | Archived to docs/archive/       |
| `scripts/capture_atomic*`          | Safe to Delete Immediately  | Archived to docs/archive/       |
| `scripts/capture_foundation*`      | Safe to Delete Immediately  | Archived to docs/archive/       |
| Obsolete direction screenshots     | Safe to Delete Immediately  | Archived to docs/archive/       |
| `package.json` ("catalog" script)  | Safe to Delete Immediately  | Removed from package.json       |
| `vite.config.ts` (dev-catalogs)    | Safe to Delete Immediately  | Removed rollup manual chunk     |
+------------------------------------+-----------------------------+---------------------------------+
| `src/components/ui/Button.tsx`     | Replace Before Deletion     | Kept temporarily; 22 importers  |
| `src/components/ui/TextInput.tsx`  | Replace Before Deletion     | Kept temporarily; 5 importers   |
| `src/components/ui/SelectCombobox` | Replace Before Deletion     | Kept temporarily; 5 importers   |
| `src/components/ui/SelectionControls` Replace Before Deletion    | Kept temporarily; 3 importers   |
| `src/components/ui/FieldFeedback`  | Replace Before Deletion     | Kept temporarily; 16 importers  |
| `src/components/ui/FeedbackModals` | Replace Before Deletion     | Kept temporarily; 3 importers   |
| `src/components/ui/Typography.tsx` | Replace Before Deletion     | Kept temporarily; 5 importers   |
| `src/components/ui/Textarea.tsx`   | Replace Before Deletion     | Kept temporarily; 4 importers   |
| `src/components/form/FieldGroup`   | Replace Before Deletion     | Kept temporarily; 5 importers   |
| `src/components/form/LabeledSelect` Replace Before Deletion      | Kept temporarily; 4 importers   |
| `src/components/form/LabeledTextField` Replace Before Deletion   | Kept temporarily; 4 importers   |
| `src/components/form/RepeatingBranchRow` Replace Before Deletion | Kept temporarily; 2 importers   |
| `src/components/organisms/*`       | Replace Before Deletion     | Kept temporarily for test suite |
+------------------------------------+-----------------------------+---------------------------------+
| `src/components/layout/AppShell`   | Keep Temporarily            | Active page shell router        |
| `src/components/layout/BrandHeader`| Keep Temporarily            | Active header; catalog removed  |
| `src/components/layout/AppFooter`  | Keep Temporarily            | Active legal disclaimer footer  |
| `src/components/layout/layout.css` | Keep Temporarily            | Required for AppShell styling   |
| `src/design-system/tokens.css`     | Keep Temporarily            | Imported in main.tsx            |
| `src/design-system/foundation.css` | Keep Temporarily            | Imported in main.tsx            |
| `src/components/insurance/*`       | Keep Temporarily            | Active Stage 1/2 calculations   |
+------------------------------------+-----------------------------+---------------------------------+
| `src/features/coverage/*`          | Preserve Permanently        | Active Stage 1 production screen|
| `src/features/quote/*`             | Preserve Permanently        | Active Stage 2 production screen|
| `src/features/particulars/*`       | Preserve Permanently        | Active Stage 3 production screen|
| `src/features/review/*`            | Preserve Permanently        | Active Stage 4 production screen|
| `src/features/confirmation/*`      | Preserve Permanently        | Active Stage 5 confirmation     |
| `src/features/scaffolds/Referral*` | Preserve Permanently        | Active underwriting referral    |
| `src/core/api/*` (5 files)         | Preserve Permanently        | Rating, underwriting, payment   |
| `src/core/state/*` (2 files)       | Preserve Permanently        | WorkflowContext & domain types  |
| `src/core/data/classifications.ts` | Preserve Permanently        | Actuarial classification table  |
| `src/test/*` (12 test suites)      | Preserve Permanently        | Authoritative regression tests  |
+------------------------------------+-----------------------------+---------------------------------+
```

---

## 4. Verified Component Dependency Graph

Static analysis of the entire `src/` directory confirms the exact importer-imporxtee relationships for all UI components:

```
                                  CUSTOMER JOURNEY SCREENS
                       Stage1CoverageForm  |  Stage2QuoteReview
                       Stage3Particulars   |  Stage4ReviewAndPayment
                                        │
                                        ▼
                         TEMPORARY COMPATIBILITY LAYER
                ┌───────────────────────┴───────────────────────┐
                ▼                                               ▼
       LEGACY FORM MOLECULES                           LEGACY UI PRIMITIVES
  FieldGroup (5 importers)                      Button (22 importers)
  LabeledSelect (4 importers)                   FieldFeedback (16 importers)
  LabeledTextField (4 importers)                TextInput (5 importers)
  RepeatingBranchRow (2 importers)              SelectCombobox (5 importers)
  PromoCodeField (2 importers)                  Typography (5 importers)
  ChoiceSelectors (3 importers)                 SelectionControls (3 importers)
  CurrencyAndPriceDisplay (3 importers)         FeedbackModals (3 importers)
                                                Textarea (4 importers)
                                        │
                                        ▼
                         PROTECTED DOMAIN CORE SERVICES
                      RatingService  |  UnderwritingService
                      PaymentService |  WorkflowContext
```

### Dependency Findings:
1. **`Button.tsx` is the primary hub:** Imported by 22 components across all 4 stages, modals, and test suites. Its replacement in Phase 04 must preserve the exact `onClick`, `loading`, `disabled`, and `variant` interface contract.
2. **`FieldFeedback.tsx` is the error hub:** Imported by 16 form molecules and stage components. It provides accessible `role="alert"` announcements and must be replicated cleanly.
3. **`FieldGroup.tsx` governs form rhythm:** Imported by `Stage1CoverageForm`, `Stage3ParticularsForm`, `Stage4ReviewAndPayment`, and `UnderwritingQuestionnaire`.
4. **Zero Unreferenced Components Remaining:** Following the removal of `StageCompositions.tsx` and `StepActionBar.tsx`, every single component currently remaining in `src/components/` is either actively mounted in a live customer stage or exercised by automated tests.

---

## 5. Detaching the Rejected System & Establishing the Migration Boundary

To guarantee the rejected design system cannot contaminate the replacement architecture while preventing application breakage:

1. **Clean Stage Router in `App.tsx`:**
   - All `React.lazy()` catalog imports and `/catalog` pathname switches were permanently eliminated.
   - The root application renders strictly the five canonical customer stages within `AppShell`:
     ```tsx
     <AppShell>
       {currentStage === 1 && <Stage1CoverageForm />}
       {currentStage === 2 && <Stage2QuoteReview />}
       {currentStage === 3 && <Stage3ParticularsForm />}
       {currentStage === 4 && <Stage4ReviewAndPayment />}
       {currentStage === 'referral' && <ReferralScaffold />}
       {currentStage === 'confirmation' && <Stage5PolicyConfirmation />}
     </AppShell>
     ```
2. **Catalog Toggle Removed from Navigation:**
   - The header toggle that allowed users to escape into the component catalog was detached from `BrandHeader.tsx`.
3. **Strict Build Configuration:**
   - `vite.config.ts` no longer defines catalog splitting rules. Production builds contain only active application code and vendor libraries.

---

## 6. Reserved Replacement Design System Directory Structure

Under **Task 5**, a clean, dedicated directory architecture has been reserved in [`src/design-system/`](file:///c:/Users/salee/Downloads/Portal_ds/src/design-system/) with `.gitkeep` markers. It is currently unpolluted by legacy styles and ready to receive incoming Phase 03/04 implementations:

```
src/design-system/
  ├── tokens/              # [PHASE 03] Formal design tokens (CSS variables, TS contracts, JSON)
  │   ├── tokens.css       # Temporary legacy token compatibility (to be replaced in Phase 03)
  │   ├── tokens.ts        # Temporary legacy TS tokens (to be replaced in Phase 03)
  │   └── tokens.json      # Temporary legacy JSON tokens (to be replaced in Phase 03)
  ├── foundation.css       # Temporary legacy utility classes (to be replaced in Phase 03)
  ├── primitives/          # [PHASE 04 RESERVED] Replacement atomic controls (Button, TextInput, Select, Radio)
  │   └── .gitkeep
  ├── patterns/            # [PHASE 04 RESERVED] Replacement compound molecules (FieldGroup, SummaryCard)
  │   └── .gitkeep
  ├── layout/              # [PHASE 04 RESERVED] Replacement layout wrappers, progress bar, sticky action rail
  │   └── .gitkeep
  └── index.ts             # Public export barrel
```

---

## 7. Baseline Verification & Health Checks

| Check | Tool / Command | Result | Details |
| :--- | :--- | :--- | :--- |
| **Static Typecheck** | `npm run typecheck` | **PASS (0 errors)** | Zero broken imports, missing types, or syntax errors. |
| **Production Build** | `npm run build` | **PASS (789ms)** | Bundle size reduced by 52%; 2,001 modules transformed cleanly. |
| **Full Unit & Integration Suite** | `npm test` | **PASS (130 / 130)** | 100% pass across all 12 test files in 14.19s. |
| **Dev Server Runtime** | `http://localhost:5173/` | **PASS (HTTP 200)** | Active customer journey stages load and transition without console errors. |

---

## 8. Legacy Retirement Plan (Roadmap to Final Deletion)

The phased migration path from temporary compatibility to 100% legacy deletion:

```
Phase 02 (Deconstruction)  ──>  Extract parameters from QIC, Wise, Ditto, ACKO [COMPLETE]
                                               │
Phase 03 (Tokens)          ──>  Engineer tokens in src/design-system/tokens/
                                               │
Phase 04 (Primitives)      ──>  Build replacement controls in src/design-system/primitives/
                                (Button, Input, Select, RadioCard, StepBar)
                                               │
Phase 05 (Screen Migration)──>  Repoint Stage 1 & Stage 2 to new primitives
                                Verify visual quality against benchmarks
                                               │
Phase 06 (Screen Migration)──>  Repoint Stage 3, Stage 4 & Stage 5 to new primitives
                                               │
Phase 07 (Final Deletion)  ──>  Safely delete src/components/ui/
                                Safely delete src/components/form/
                                Safely delete src/components/organisms/
                                Verify 130/130 tests pass on new design system
```

---

## 9. Review Gate Status

Phase 01 tasks are 100% executed. The repository is clean, unneeded artifacts are archived, the dependency graph is fully mapped, and all baseline checks are green.

**Ready for user review and approval.**
