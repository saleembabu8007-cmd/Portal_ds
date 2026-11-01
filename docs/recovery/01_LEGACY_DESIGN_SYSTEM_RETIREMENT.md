# PHASE 01 — COMPLETE LEGACY DESIGN SYSTEM RETIREMENT REPORT

**Phase:** 01 — Complete Legacy Design System Retirement  
**Status:** COMPLETE (Ready for Review & Approval Gate)  
**Governance:** Master Product Rules V5 & Visual Design Authority (Rules 1–4)  
**Target Architecture:** Five-Stage Digital Journey (Coverage, Quotation, Details, Declaration, Summary)  

---

## 1. Executive Summary & Objective

In **Phase 01**, we executed the systematic retirement and detachment of DoctorShield's rejected legacy design-system infrastructure, component catalogs, experimental exploration routes, and obsolete preview code. 

All non-production preview routes (`/catalog`, `/atoms-gallery`, `/tokens-specimen`, `/exploration`, `/direction-a`, `/direction-b`) have been purged from the active application bundle. The legacy showcase files were safely archived into `docs/archive/legacy_catalog/` and `docs/archive/legacy_explorations/`, removing 373 KB of dead code from the production distribution.

A clean, dedicated directory architecture has been established under `src/design-system/` to receive the incoming replacement components, while maintaining an isolated compatibility layer that ensures all 130 automated tests continue passing without regression.

---

## 2. Precondition Verification

- **Phase 00 Checkpoint:** Verified intact at Git tag `checkpoint-phase00-reset-baseline` and branch `backup/phase00-pre-visual-reset`.
- **Repository Safety:** All files archived prior to deletion, preserving full recovery history.
- **Production Safety:** Zero production transactions or live endpoints were touched.

---

## 3. Inventory & Dependency Graph

### Component & Artifact Categorization Register

| Artifact / Component | Location | Categorization | Action Taken in Phase 01 / Plan |
| :--- | :--- | :--- | :--- |
| **Catalog Application** | `src/catalog/CatalogApp.tsx`, `main.tsx` | **Safe to Delete Immediately** | Archived to `docs/archive/legacy_catalog/` and deleted from `src/`. |
| **Art Direction Showcase** | `src/explorations/ArtDirectionShowcase.tsx` | **Safe to Delete Immediately** | Archived to `docs/archive/legacy_explorations/` and deleted from `src/`. |
| **Foundation Specimen** | `src/explorations/FoundationSpecimen.tsx` | **Safe to Delete Immediately** | Archived to `docs/archive/legacy_explorations/` and deleted from `src/`. |
| **Atomic Gallery** | `src/explorations/AtomicComponentGallery.tsx` | **Safe to Delete Immediately** | Archived to `docs/archive/legacy_explorations/` and deleted from `src/`. |
| **Preview Chunk in Vite** | `vite.config.ts` (`dev-catalogs` rollup chunk) | **Safe to Delete Immediately** | Removed from `vite.config.ts`. Reduced bundle size by 373 KB. |
| **Legacy npm Script** | `package.json` (`"catalog": "vite"`) | **Safe to Delete Immediately** | Removed from `package.json`. |
| **Active Customer Stages** | `src/features/{coverage,quote,particulars,review}` | **Preserve Permanently** | Active production screens; preserved intact. |
| **Outcome Scaffolds** | `src/features/scaffolds/ReferralScaffold.tsx` | **Preserve Permanently** | Underwriting referral terminal screen; preserved intact. |
| **Confirmation Screen** | `src/features/confirmation/Stage5PolicyConfirmation.tsx` | **Preserve Permanently** | Policy bound outcome screen; preserved intact. |
| **Domain Services** | `src/core/api/{rating,underwriting,renewal,payment}` | **Preserve Permanently** | Protected insurance logic and decision trees; 100% preserved. |
| **Shared Layout Shell** | `src/components/layout/{AppShell,BrandHeader,AppFooter}` | **Keep Temporarily** | Governs page shell; catalog toggle button detached. |
| **Legacy UI Primitives** | `src/components/ui/{Button,TextInput,Typography,...}` | **Keep Temporarily** | Serves as compatibility layer for active screens and unit tests. |
| **Legacy Form Molecules**| `src/components/form/{FieldGroup,LabeledSelect,...}` | **Keep Temporarily** | `FieldGroup` actively used; remaining molecules tested by unit suites. |
| **Legacy Organisms** | `src/components/organisms/{HeaderAndNav,Financial...}` | **Replace Before Deletion** | Tested by `organisms_and_compositions.test.tsx`; will migrate in Phase 05. |

---

## 4. Detaching the Rejected System

### A. Application Entry Cleaned
[`src/app/App.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/app/App.tsx) was refactored into a pure customer-facing stage router:
- Eliminated all `React.lazy()` imports of catalog and exploration showcases.
- Eliminated pathname switches (`/catalog`, `/atoms-gallery`, `/tokens-specimen`, `/exploration`).
- Removed the top-bar catalog navigation overlay.
- The root view now renders only the active insurance journey within [`AppShell`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/layout/AppShell.tsx):
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

### B. Build Configuration Streamlined
In [`vite.config.ts`](file:///c:/Users/salee/Downloads/Portal_ds/vite.config.ts), removed the manual chunking rule:
```ts
// REMOVED:
if (id.includes('/src/catalog/') || id.includes('/src/explorations/')) {
  return 'dev-catalogs';
}
```
Production build now outputs strictly core vendor chunks (`vendor-react`, `vendor-icons`) and the unified application chunk.

---

## 5. Reserved Replacement Design System Directory Structure

Under **Task 5**, a clean, dedicated hierarchy has been reserved in [`src/design-system/`](file:///c:/Users/salee/Downloads/Portal_ds/src/design-system/) with `.gitkeep` markers, ready to receive incoming replacement components without mixing legacy styles:

```
src/design-system/
  ├── tokens/              # Design tokens (JSON, TS, CSS variables)
  │   ├── tokens.css
  │   ├── tokens.ts
  │   └── tokens.json
  ├── foundation/          # Core CSS utility classes (open canvas, section bars)
  │   └── foundation.css
  ├── primitives/          # [RESERVED] Atomic replacement controls (Button, TextInput, Select, Radio, Checkbox)
  ├── patterns/            # [RESERVED] Compound form fields, summary cards, rate-lock indicators
  ├── layout/              # [RESERVED] Responsive grid containers, page wrappers, action bars
  └── index.ts             # Authoritative public export barrel
```

---

## 6. Verification & Health Checks

| Check | Tool / Command | Result | Notes |
| :--- | :--- | :--- | :--- |
| **Static Typing** | `npm run typecheck` | **PASS (0 errors)** | Zero broken imports or type mismatches |
| **Production Build** | `npm run build` | **PASS (903ms)** | `dev-catalogs` (373 KB) completely removed; bundle size reduced |
| **Full Test Suite** | `npm test` | **PASS (130 / 130)** | 100% pass across all 12 test files in 14.28s |
| **Live Dev Server** | `http://localhost:5173/` | **HTTP 200 OK** | Hot-reloaded cleanly without errors |

---

## 7. Legacy Retirement Plan (Next Steps)

Following Rule 4 and Master Product Rules V5:
1. **Phase 02 (Architecture Reset & 5-Stage Alignment):** Refactor `Stage3ParticularsForm.tsx` to separate personal/practice details (Stage 3: Details) from statutory underwriting declarations (Stage 4: Declaration), aligning the customer workflow with the 5-stage mandate.
2. **Phase 03 (Design Foundations):** Engineer primitive and semantic tokens in `src/design-system/tokens/`.
3. **Phase 04 (Replacement Primitives):** Build clean replacement controls in `src/design-system/primitives/`.
4. **Phase 05 (Screen Integration & Legacy Removal):** Point screens to replacement controls and delete the remaining legacy files in `src/components/ui/` and `src/components/form/`.

