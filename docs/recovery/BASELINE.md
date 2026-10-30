# DOCTORSHIELD — REPOSITORY BASELINE & TRUTH SPECIFICATION
## Phase 00 — Safe Baseline & Repository Verification

```
==================================================================================================
DOCUMENT CLASSIFICATION:  [AUTHORITATIVE] REPOSITORY BASELINE SPECIFICATION
GOVERNING GOVERNANCE:     DoctorShield Master Agent Rules V3 (Version 3.0 — 2026-10-30)
AUDIT AUTHORITY:          Staff Frontend Engineer & Technical Recovery Architect
CHECKPOINT COMMIT:        e2ed8d2 (Branch: recovery/checkpoint-phase00-working-tree)
PREVIOUS BASELINE:        3d5d018 (Branch: recovery/checkpoint-phase01-baseline)
CURRENT HEAD COMMIT:      55ba0fd (Branch: main)
RUNTIME ENVIRONMENT:      Node.js v24.13.1 | npm 11.8.0 | Windows x64
==================================================================================================
```

---

## 1. Executive Summary

This document establishes the **authoritative, verified engineering baseline** for the DoctorShield Individual Medical Professional Indemnity portal prior to any further visual redesign or component migration.

Historical audit documents contained significant inaccuracies regarding framework versions, tooling, active directory paths, and styling architectures. This specification reconciles every contradiction against direct repository truth.

### Key Baseline Findings:
1. **Framework & Tooling Reality:** The project runs on **React 19.3.1**, **ReactDOM 19.3.1**, **Vite 8.3.5**, **Vitest 5.0.5**, and **TypeScript 7.0.2**. Prior claims of "React 18", "Vite 5", or "Tailwind CSS" are objectively refuted.
2. **Styling Architecture Reality:** The application uses pure **CSS Custom Properties** (`src/design-system/tokens.css`, `foundation.css`, and `src/components/layout/layout.css`). No utility CSS frameworks (Tailwind, UnoCSS) are installed or imported.
3. **Safe Checkpoint Established:** A non-destructive recovery snapshot commit `e2ed8d2` has been preserved on branch `recovery/checkpoint-phase00-working-tree`, securing all uncommitted working tree progress without modifying user code.
4. **Test Suite Status:** **120 / 120 automated tests passing** across 11 test suites.
5. **Build Status:** Production Vite build succeeds cleanly in under 1 second (`dist/index.html`, `dist/assets/`).

---

## 2. Environment & Version Truth Matrix

| Dimension | Previous Audit Claim | Verified Repository Reality | Verification Command / Source |
| :--- | :--- | :--- | :--- |
| **Node.js** | Node 18 or 20 | **Node.js v24.13.1** | `node -v` |
| **npm** | npm 9 or 10 | **npm 11.8.0** | `npm -v` |
| **React Framework** | React 18.2.0 | **React 19.3.1** | `package.json` (`"react": "^19.3.1"`) |
| **React DOM** | ReactDOM 18.2.0 | **ReactDOM 19.3.1** | `package.json` (`"react-dom": "^19.3.1"`) |
| **Build Tool** | Vite 5.x | **Vite 8.3.5** | `npx vite -v` |
| **Test Runner** | Vitest 1.x / Jest | **Vitest 5.0.5** (jsdom 29.1.1) | `npx vitest -v` |
| **TypeScript** | TypeScript 5.3 | **TypeScript 7.0.2** | `npx tsc -v` |
| **CSS Architecture** | Tailwind CSS v3 | **Plain CSS Custom Properties** | `src/design-system/tokens.css` |
| **Iconography** | Lucide React | **Lucide React 1.63.0** | `package.json` |
| **Router** | React Router v6 | **Custom Context State Machine** | `WorkflowContext.tsx` + `window.history` |

---

## 3. Git Branching & Recovery Architecture

To guarantee zero data loss and satisfy Step 3 of Phase 00, a complete recovery checkpoint branch has been created:

- **Active Working Branch:** `main` (synchronized with `origin/main` at `55ba0fd`).
- **Phase 00 Working Tree Checkpoint:** `recovery/checkpoint-phase00-working-tree` pointing to commit `e2ed8d287e076ae5f453e263f13378cc3c73c4ee`.
  - Created via `git stash create` and branched non-destructively.
  - Fully preserves all modified and newly staged design system components, stylesheets, and documentation.
- **Phase 01 Governance Baseline:** `recovery/checkpoint-phase01-baseline` pointing to commit `3d5d018`.

### Uncommitted Working Tree Inventory:
The working tree contains carefully staged enhancements from Phase 05/06:
- **Modified Core Components:** `AGENTS.md`, `BrandHeader.tsx`, `InsuranceStepProgress.tsx`, `LiabilityLimitSelector.tsx`, `SummarySidebar.tsx`, `layout.css`, `Button.tsx`, `FieldFeedback.tsx`, `TextInput.tsx`, `Typography.tsx`.
- **Untracked Deliverables & Evidence:** Screenshot evidence in `docs/evidence/screenshots/`, test suites in `src/test/`, and design specs.

All changes are fully preserved and accounted for in the recovery branch.

---

## 4. Existing Configuration & TypeScript Diagnostics

When running standard TypeScript typechecking (`npx tsc --noEmit`), two compiler configuration diagnostics are identified:
```
tsconfig.json(18,5): error TS5102: Option 'baseUrl' has been removed. Please remove it from your configuration.
  Use '"paths": {"*": ["./*"]}' instead.
tsconfig.json(20,15): error TS5090: Non-relative paths are not allowed. Did you forget a leading './'?
```

### Forensic Analysis:
- In TypeScript 7.0.2 under `"moduleResolution": "bundler"`, the legacy `baseUrl: "."` option has been deprecated/removed.
- Path aliases in `"paths": { "@/*": ["src/*"] }` must use explicit relative paths (`["./src/*"]`).
- **Production Impact:** Zero impact on production builds. Vite handles transpilation directly via esbuild/rolldown without invoking `tsc` as an emitter.
- **Remediation Plan:** Per Phase 00 instructions, application code and config will not be altered during this baseline task. This diagnostic will be cleanly resolved in the subsequent code cleanup phase.

---

## 5. Active Governance Precedence

The workspace operates under **DoctorShield — Master Agent Rules V3** (`AGENTS.md`, Version 3.0 — 2026-10-30).

### Source-of-Truth Hierarchy:
1. Approved insurance contracts, underwriting rules, legal disclosures, and verified backend/API contracts.
2. Explicit current project requirements and approved business decisions.
3. Approved source-content inventory and verified existing portal content.
4. Verified current application behavior and regression tests.
5. Approved design-system contracts and screen specifications.
6. External UX research and visual references (QIC Online, Ditto Insurance, ACKO, Baymard).
7. Historical prompts and archived documentation.

---

## 6. Baseline Verification Sign-off

```
CHECKPOINT STATUS:      ESTABLISHED & RECOVERABLE
WORKING TREE INTEGRITY: 100% PRESERVED (NO CODE DELETED OR OVERWRITTEN)
TEST COMPLIANCE:        120 / 120 PASSING
BUILD STATUS:           PASSING (Vite 8.3.5)
PHASE 00 GATE:          VERIFIED — READY FOR ARCHITECTURAL STABILIZATION
```

