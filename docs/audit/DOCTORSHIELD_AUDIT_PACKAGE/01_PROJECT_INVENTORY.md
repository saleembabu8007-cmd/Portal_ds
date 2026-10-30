# DOCTORSHIELD FORENSIC AUDIT — REPORT 01
# Repository and Project Inventory

**Audit Date:** 2026-10-30  
**Auditor:** Principal Software Architect & Technical Audit Lead  
**Audit Target:** DoctorShield Individual Medical Professional Indemnity Portal (`c:\Users\salee\Downloads\Portal_ds`)  
**Status:** COMPLETE — STRICTLY READ-ONLY  

---

## 1. Executive Technology Stack Summary

| Dimension | Specification / Value | Evidence Classification | Source File / Evidence |
|---|---|---|---|
| **Project Name** | `portal_ds` | CONFIRMED — CONFIGURATION | [`package.json`](file:///c:/Users/salee/Downloads/Portal_ds/package.json#L2) |
| **Project Version** | `1.0.0` | CONFIRMED — CONFIGURATION | [`package.json`](file:///c:/Users/salee/Downloads/Portal_ds/package.json#L3) |
| **Frontend Framework** | React `19.3.1` | CONFIRMED — CONFIGURATION | [`package.json`](file:///c:/Users/salee/Downloads/Portal_ds/package.json#L23-L24) |
| **Language & Version** | TypeScript `7.0.2` | CONFIRMED — CONFIGURATION | [`package.json`](file:///c:/Users/salee/Downloads/Portal_ds/package.json#L33) / `npx tsc --version` |
| **Package Manager** | `npm` (Lockfile v3 format, 2,390 lines) | CONFIRMED — CONFIGURATION | [`package-lock.json`](file:///c:/Users/salee/Downloads/Portal_ds/package-lock.json) |
| **Build System / Bundler** | Vite `8.3.5` (`@vitejs/plugin-react` `6.1.2`) | CONFIRMED — CONFIGURATION | [`package.json`](file:///c:/Users/salee/Downloads/Portal_ds/package.json#L31-L34) |
| **Target Runtime Environment** | Modern Evergreen Browsers (ES2022 output) | CONFIRMED — CONFIGURATION | [`tsconfig.json`](file:///c:/Users/salee/Downloads/Portal_ds/tsconfig.json#L3) |
| **Application Entry Points** | `index.html` -> [`src/main.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/main.tsx) -> [`src/app/App.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/app/App.tsx)<br>Catalog Entry: [`src/catalog/main.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/catalog/main.tsx) -> [`src/catalog/CatalogApp.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/catalog/CatalogApp.tsx) | CONFIRMED — SOURCE CODE | [`index.html`](file:///c:/Users/salee/Downloads/Portal_ds/index.html#L18), [`src/main.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/main.tsx#L4) |
| **Routing Architecture** | Custom Stage-State Router via React Context & `window.history.pushState` (No external router library) | CONFIRMED — SOURCE CODE | [`src/app/App.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/app/App.tsx#L13-L92), [`src/core/state/WorkflowContext.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/core/state/WorkflowContext.tsx#L110-L150) |
| **State Management** | Hand-rolled React Context + `useReducer` / `useState` (`WorkflowContext.tsx`, 435 lines) | CONFIRMED — SOURCE CODE | [`src/core/state/WorkflowContext.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/core/state/WorkflowContext.tsx#L1-L435) |
| **Form Libraries** | **None installed**. Hand-rolled local form state in each stage component. | CONFIRMED — CONFIGURATION | [`package.json`](file:///c:/Users/salee/Downloads/Portal_ds/package.json#L21-L25) |
| **Validation Libraries** | **None installed**. Hand-rolled ad-hoc regex and procedural validation in components & API services. | CONFIRMED — CONFIGURATION | [`package.json`](file:///c:/Users/salee/Downloads/Portal_ds/package.json#L21-L25) |
| **Styling Approach** | Dual disjointed styling: Inline React style objects (`style={{...}}`) in customer screens + CSS custom properties (`tokens.css`, `foundation.css`, `layout.css`). | CONFIRMED — SOURCE CODE | [`src/design-system/tokens.css`](file:///c:/Users/salee/Downloads/Portal_ds/src/design-system/tokens.css), [`src/features/coverage/Stage1CoverageForm.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/features/coverage/Stage1CoverageForm.tsx) |
| **UI Component Libraries** | **None installed**. Custom in-house UI components (`src/components/ui/`, `src/components/form/`, `src/components/organisms/`). | CONFIRMED — CONFIGURATION | [`package.json`](file:///c:/Users/salee/Downloads/Portal_ds/package.json#L21-L25) |
| **Icon Library** | `lucide-react` `^1.63.0` | CONFIRMED — CONFIGURATION | [`package.json`](file:///c:/Users/salee/Downloads/Portal_ds/package.json#L22) |
| **Animation Libraries** | **None installed**. Basic CSS transitions and `prefers-reduced-motion` overrides. | CONFIRMED — CONFIGURATION | [`package.json`](file:///c:/Users/salee/Downloads/Portal_ds/package.json#L21-L25) |
| **API Clients** | Native `fetch` wrapped in `HttpClient` ([`src/core/api/httpClient.ts`](file:///c:/Users/salee/Downloads/Portal_ds/src/core/api/httpClient.ts)) with mock simulation fallbacks. | CONFIRMED — SOURCE CODE | [`src/core/api/httpClient.ts`](file:///c:/Users/salee/Downloads/Portal_ds/src/core/api/httpClient.ts#L1-L207) |
| **Testing Framework** | Vitest `5.0.5`, `@testing-library/react` `16.3.3`, `@testing-library/jest-dom` `7.0.1`, `jsdom` `29.1.1` | CONFIRMED — CONFIGURATION | [`package.json`](file:///c:/Users/salee/Downloads/Portal_ds/package.json#L26-L36) |
| **Development Scripts** | `npm run dev` (`vite`), `npm run catalog` (`vite`), `npm test` (`vitest run`), `npm run test:watch` (`vitest`) | CONFIRMED — CONFIGURATION | [`package.json`](file:///c:/Users/salee/Downloads/Portal_ds/package.json#L9-L16) |
| **Production Build Script** | `npm run build` (`vite build`), `npm run preview` (`vite preview`) | CONFIRMED — CONFIGURATION | [`package.json`](file:///c:/Users/salee/Downloads/Portal_ds/package.json#L12-L13) |

---

## 2. Repository Structure & Directory Map

The repository is structured into distinct tiers, but exhibits significant file accumulation and parallel architectural tracks from repeated agent iterations:

```
Portal_ds/
├── .antigravity/                   # Agent metadata directory (empty)
├── .audit-runner/                  # Auxiliary browser automation directory
├── .git/                           # Git repository metadata
├── audit-runner/                   # Scraping & reconnaissance suite for live portal
│   ├── node_modules/               # Independent node_modules for audit-runner
│   ├── package.json                # Dependencies for puppeteer scraping
│   └── *.js                        # 16 reconnaissance scripts used to scrape live portal
├── dist/                           # Compiled production build artifacts
│   ├── assets/
│   │   ├── index-Dx2TxcHh.js       # Monolithic production bundle (824.09 kB)
│   │   └── index-P9qVjQh4.css      # Extracted production CSS (16.59 kB)
│   └── index.html
├── docs/                           # Project specifications, registers & architecture
│   ├── architecture/               # 7 architecture specifications (API, State Machine, Security, etc.)
│   ├── audit/                      # [THIS AUDIT] Dedicated read-only audit deliverables
│   ├── design-system/              # Design tokens and component specifications
│   ├── evidence/                   # Live portal screenshots (SCR-001..SCR-032) and captured scripts
│   └── *.md                        # 34 primary documentation files (DECISION_LOG, FIELD_DICTIONARY, etc.)
├── node_modules/                   # Workspace dependencies (Vite, Vitest, React, Lucide)
├── scripts/                        # 10 Puppeteer regression screenshot capture scripts
├── src/                            # Application Source Code (106 files, 1.31 MB)
│   ├── app/                        # Main Application Root Component (App.tsx)
│   ├── catalog/                    # Isolated Component Catalog & Showcase App (CatalogApp.tsx)
│   ├── components/                 # Reusable UI component layer (56 files)
│   │   ├── compositions/           # Stage composition mocks (StageCompositions.tsx)
│   │   ├── form/                   # 20 Form Molecules (LabeledTextField, SearchableSelector, etc.)
│   │   ├── insurance/              # 7 Insurance-specific UI components (StepProgress, PremiumDisplay)
│   │   ├── layout/                 # 12 Layout components (AppShell, BrandHeader, SummarySidebar, layout.css)
│   │   ├── organisms/              # 8 Organisms (PageLayoutStructures, UnderwritingAndBranches, etc.)
│   │   └── ui/                     # 8 Foundation Atoms (Button, Typography, TextInput, Textarea, etc.)
│   ├── core/                       # Core Business Logic & State (10 files)
│   │   ├── api/                    # RatingService, UnderwritingService, PaymentService, RenewalService, HttpClient
│   │   ├── data/                   # classifications.ts (MMC Medical Classification Master, 305 lines)
│   │   ├── state/                  # WorkflowContext.tsx, types.ts
│   │   ├── telemetry/              # logger.ts (PII-masking logger)
│   │   └── utils/                  # sanitizer.ts (Anti-XSS sanitizer)
│   ├── design-system/              # Design Tokens & Styles (5 files)
│   │   ├── foundation.css          # Direction B minimal CSS class utilities
│   │   ├── index.ts                # Design system exports
│   │   ├── tokens.css              # CSS Custom Properties (Primitive, Semantic & Component Tokens)
│   │   ├── tokens.json             # JSON Token export
│   │   └── tokens.ts               # TypeScript token constants & types
│   ├── features/                   # Screen & Journey Implementations (19 files)
│   │   ├── confirmation/           # Stage5PolicyConfirmation.tsx
│   │   ├── coverage/               # Stage1CoverageForm.tsx, CoverageModals.tsx
│   │   ├── particulars/            # Stage3ParticularsForm.tsx, BranchManager.tsx, DuplicatePolicyModal.tsx, NricPromoSubstitutionModal.tsx
│   │   ├── quote/                  # Stage2QuoteReview.tsx, QuoteModals.tsx, RetrieveQuoteModal.tsx
│   │   ├── renewal/                # RenewalFlowModal.tsx
│   │   ├── review/                 # Stage4ReviewAndPayment.tsx
│   │   ├── scaffolds/              # 6 Prototyping Scaffolds (Stage1..4, Confirmation, Referral)
│   │   └── underwriting/           # UnderwritingQuestionnaire.tsx (1,455 lines)
│   ├── test/                       # 11 Vitest Test Suites (120 tests)
│   └── main.tsx                    # Application bootstrap & CSS imports
├── tmp-capture/                    # Temporary Chrome user data directory (empty cache)
├── tmp-chrome/                     # Temporary Chrome user data directory (empty cache)
├── tmp-debug/                      # Temporary Chrome user data directory (empty cache)
├── .env.example                    # Environment variable template
├── .gitignore                      # Git ignore configuration
├── index.html                      # HTML entry with strict CSP & Google Fonts link
├── package.json                    # Package metadata & scripts
├── package-lock.json               # Deterministic dependency tree
├── tsconfig.json                   # TypeScript compiler configuration (Contains defect TS5102/TS5090)
├── vite.config.ts                  # Vite bundler configuration
└── [37 root Markdown files]        # Spec files created during successive AI prompts
```

---

## 3. Directory Purpose & Size Metrics

| Directory Path | File Count | Total Size (Bytes) | Primary Responsibility | Architectural Health Status |
|---|---|---|---|---|
| `src/app/` | 1 | 3,430 B | Root routing & catalog switch | Functional, but bundles CatalogApp into production |
| `src/catalog/` | 2 | 64,771 B | Component demo catalog | **Leakage**: Imported directly into `App.tsx` |
| `src/components/compositions/` | 1 | 6,520 B | Wireframe stage compositions | **Dead Code**: Only imported in `CatalogApp.tsx` |
| `src/components/form/` | 20 | 85,420 B | 20 Form Molecules | **Orphaned**: Only imported in `CatalogApp.tsx` & tests |
| `src/components/insurance/` | 7 | 45,890 B | Legacy insurance widgets | **Orphaned**: Only imported in `CatalogApp.tsx` & tests |
| `src/components/layout/` | 12 | 148,220 B | Shell, Header, Sidebar, Footer | Active in `AppShell.tsx` |
| `src/components/organisms/` | 8 | 134,810 B | 8 Complex layout organisms | **Orphaned**: Only imported in `CatalogApp.tsx` & tests |
| `src/components/ui/` | 8 | 21,647 B | Foundational UI Atoms | Partially used (`Button.tsx` in `AppHeader`; remainder orphaned) |
| `src/core/api/` | 5 | 68,920 B | Pricing, Underwriting, Payment APIs | Critical authoritative business logic; high health |
| `src/core/data/` | 1 | 18,450 B | MMC Classifications & Tiers | Authoritative medical dictionary; high health |
| `src/core/state/` | 2 | 38,210 B | WorkflowContext & domain types | Core transactional state; high health |
| `src/core/telemetry/` | 1 | 6,420 B | PII Masking Logger | High health |
| `src/core/utils/` | 1 | 4,210 B | Anti-XSS Sanitizer | High health |
| `src/design-system/` | 5 | 30,469 B | Tokens & Foundation CSS | Well structured, but bypassed by inline styles in features |
| `src/features/` | 19 | 509,712 B | Real portal stage implementations | Monolithic screens (800–1,500 lines each) with inline styles |
| `src/test/` | 12 | 150,882 B | 120 Vitest unit & integration tests | 100% passing; comprehensive coverage of logic & stages |
| `docs/` | 68 | 485,320 B | Phase 1 & 2 analysis & specs | Comprehensive, but contains obsolete legacy documents |
| `scripts/` | 10 | 52,430 B | Puppeteer screenshot capture | Functional diagnostic tools |
| `audit-runner/` | 19 | 45,210 B | Phase 1 live scraping tools | Auxiliary historical tools |

---

## 4. Configuration Analysis

### 4.1 `package.json`
- **Dependencies (Runtime):** Extremely minimal — only 3 packages:
  - `react`: `^19.3.1`
  - `react-dom`: `^19.3.1`
  - `lucide-react`: `^1.63.0`
- **Missing Dependencies:** No CSS preprocessors, no PostCSS plugins (Tailwind, Autoprefixer), no router package, no form library (React Hook Form / Formik), no schema validation library (Zod / Yup).
- **Scripts:** Only basic Vite and Vitest scripts. Lacks linting (`eslint`), type checking (`tsc --noEmit`), format checking (`prettier`), and accessibility scanning (`axe-core` CI).

### 4.2 `tsconfig.json` Defect
- **File:** [`tsconfig.json`](file:///c:/Users/salee/Downloads/Portal_ds/tsconfig.json)
- **Defect:** Lines 18–21 configure `"baseUrl": "."` and `"paths": { "@/*": ["src/*"] }`.
- **Diagnostic Result:** Running `npx tsc --noEmit` produces errors:
  - `error TS5102: Option 'baseUrl' has been removed. Please remove it from your configuration.`
  - `error TS5090: Non-relative paths are not allowed. Did you forget a leading './'?`
- **Root Cause:** TypeScript 7.0.2 with `"moduleResolution": "bundler"` deprecated and removed bare `baseUrl`. The path mapping requires `"paths": { "@/*": ["./src/*"] }`.
- **Severity:** P2 (Build configuration defect; masked during development because `vite build` uses esbuild/rolldown and does not run `tsc`).

### 4.3 `vite.config.ts`
- **File:** [`vite.config.ts`](file:///c:/Users/salee/Downloads/Portal_ds/vite.config.ts)
- Simple configuration with `@vitejs/plugin-react`.
- Does not configure manual chunk splitting or dynamic import splitting, resulting in Vite warning:
  `(!) Some chunks are larger than 500 kB after minification (index-Dx2TxcHh.js: 824.09 kB).`

### 4.4 `index.html` Security & Typography
- **File:** [`index.html`](file:///c:/Users/salee/Downloads/Portal_ds/index.html)
- Strict Content-Security-Policy (CSP) configured on line 6:
  `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; ...`
- Google Fonts stylesheet requested:
  `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Kanit:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">`
- Notice: `Inter:wght@400;500;600` is requested, but project rules state Inter must never exceed weight 500.

---

## 5. Unused, Duplicated, Obsolete & Abandoned Files Register

| Category | File Path | Evidence / Verification | Recommendation for Future Cleanup |
|---|---|---|---|
| **Abandoned Scaffolds** | `src/features/scaffolds/Stage1CoverageScaffold.tsx`<br>`src/features/scaffolds/Stage2QuoteScaffold.tsx`<br>`src/features/scaffolds/Stage3UnderwritingScaffold.tsx`<br>`src/features/scaffolds/Stage4ReviewScaffold.tsx`<br>`src/features/scaffolds/ConfirmationScaffold.tsx` | CONFIRMED — SOURCE CODE: Zero imports in `App.tsx` or any feature. Only `Stage4ReviewScaffold` was imported in a single test (`stage3.test.tsx`). | Safe to archive and deprecate once test target is updated to real Stage 4. |
| **Orphaned Form Molecules** | `src/components/form/*.tsx` (20 files, including `LabeledTextField.tsx`, `ChoiceSelectors.tsx`, etc.) | CONFIRMED — SOURCE CODE: Imported exclusively in `CatalogApp.tsx` and `form_molecules.test.tsx`. Never integrated into `Stage1CoverageForm`, `Stage2QuoteReview`, `Stage3ParticularsForm`, etc. | DO NOT DELETE. These are the modern components that SHOULD be integrated into the screens to eliminate monolithic inline styles. |
| **Orphaned Layout Organisms** | `src/components/organisms/*.tsx` (8 files, including `InsuranceCoverageCards.tsx`, `PageLayoutStructures.tsx`, etc.) | CONFIRMED — SOURCE CODE: Imported exclusively in `CatalogApp.tsx` and `organisms_and_compositions.test.tsx`. Never integrated into live screens. | DO NOT DELETE. Retain for systematic migration to replace screen monoliths. |
| **Dead Composition Mock** | `src/components/compositions/StageCompositions.tsx` | CONFIRMED — SOURCE CODE: Only imported in `CatalogApp.tsx`. Contains duplicated mock stage layouts. | Candidate for removal after catalog consolidation. |
| **Orphaned Insurance Widgets** | `src/components/insurance/CoverageDateField.tsx`<br>`src/components/insurance/CoverageSummaryPanel.tsx`<br>`src/components/insurance/LiabilityLimitSelector.tsx`<br>`src/components/insurance/PremiumDisplay.tsx`<br>`src/components/insurance/SpecializationAllocationEditor.tsx`<br>`src/components/insurance/UnderwritingAndCheckout.tsx` | CONFIRMED — SOURCE CODE: Imported only in `CatalogApp.tsx` and `components.test.tsx`. Bypassed by live stage forms. | Deprecate in favor of the newer `src/components/form/` and `src/components/organisms/` architecture. |
| **Catalog Bundling Leakage** | `src/catalog/CatalogApp.tsx` | CONFIRMED — SOURCE CODE: Directly imported by `src/app/App.tsx` (lines 11, 73), causing 63 kB of catalog code and all dependent components to bundle into production. | Refactor to dynamic `React.lazy()` import or separate Vite build target. |
| **Root Specification Clutter** | 37 Markdown specification files in repository root (e.g. `INTERFACE_ATOMS_SPECIFICATION.md`, `FORM_MOLECULES_SPECIFICATION.md`, `SIMPLIFIED_USER_FLOW.md`) | CONFIRMED — FILE SYSTEM: Root directory cluttered with past prompt outputs rather than organized in `docs/`. | Consolidate into `docs/specifications/` in a future housekeeping phase. |

---

## 6. Git Status & Recent History Analysis

### 6.1 Base Commit
- **Commit Hash:** `55ba0fd3b4141f65906accfc87fbb685448fed02`
- **Author:** `saleembabu8007-cmd <saleembabu8007@gmail.com>`
- **Date:** `Thu Oct 29 15:54:48 2026 +0530`
- **Commit Message:** `feat: complete production rebuild of DoctorShield Individual Medical Professional Indemnity portal`
- **Scale:** 219 files changed, 67,853 insertions. This single initial commit added the entire baseline codebase.

### 6.2 Uncommitted Working Tree State
The working tree currently has significant uncommitted additions and modifications resulting from recent redesign directives:
1. **Modified Core Files:**
   - `src/components/layout/BrandHeader.tsx`
   - `src/components/layout/SummarySidebar.tsx`
   - `src/components/layout/layout.css`
   - `src/components/insurance/InsuranceStepProgress.tsx`
   - `src/components/ui/*.tsx` (`Button`, `TextInput`, `Typography`, `SelectionControls`, etc.)
   - `src/design-system/tokens.css`, `tokens.ts`, `index.ts`
   - `src/features/coverage/Stage1CoverageForm.tsx`
   - `src/features/quote/Stage2QuoteReview.tsx`
   - `src/features/particulars/Stage3ParticularsForm.tsx`
   - `src/features/particulars/BranchManager.tsx`
   - `src/features/review/Stage4ReviewAndPayment.tsx`
   - `src/features/confirmation/Stage5PolicyConfirmation.tsx`
   - `src/features/scaffolds/ReferralScaffold.tsx`
   - `src/features/underwriting/UnderwritingQuestionnaire.tsx`
2. **Untracked Directories & Files:**
   - `src/components/form/` (20 new form molecules)
   - `src/components/organisms/` (8 new layout organisms)
   - `src/design-system/foundation.css`
   - `src/test/form_molecules.test.tsx`
   - `src/test/organisms_and_compositions.test.tsx`
   - 25+ root markdown files created by previous prompts
   - Screenshot suites in `docs/evidence/screenshots/` and `scripts/`
3. **Safety Status:** All changes are preserved in the working tree. No reset, stash, or commit will be performed during this read-only audit.

---

## 7. Audit 01 Verification Sign-Off

- [x] Full project technology stack identified and verified.
- [x] Application entry points and routing mechanics documented.
- [x] Directory map and file size distribution recorded.
- [x] Configuration files checked (`package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`).
- [x] Unused and orphaned component layers identified and documented.
- [x] Git history and uncommitted changes fully inventoried.
- **Classification:** CONFIRMED — SOURCE CODE & CONFIGURATION.
