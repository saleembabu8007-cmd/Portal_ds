# PHASE 00 — REPOSITORY SAFETY & VISUAL RESET BASELINE REPORT

**Phase:** 00 — Repository Safety & Visual Reset Baseline  
**Status:** COMPLETE (Ready for Visual Reset Review)  
**Active Governance:** Master Product Rules V5 & Visual Design Authority (Rules 1–4)  
**Target Architecture:** Five-Stage Digital Journey (Coverage, Quotation, Details, Declaration, Summary)  

---

## 1. Executive Summary & Objective

In **Phase 00**, we established an immutable recovery checkpoint, verified the live tech stack and dependencies, mapped all customer-facing stages, identified protected insurance modules and simulation boundaries, verified 100% test passing, and captured full-fidelity baseline screenshots across desktop and mobile viewports.

No functional files, styles, tests, or insurance modules were deleted. All active screens remain fully operational and verified.

---

## 2. Recovery Checkpoint

An immutable Git tag and dedicated recovery branch have been created at the verified clean working state:

- **Git Commit SHA:** `1a276e6`
- **Git Checkpoint Tag:** `checkpoint-phase00-reset-baseline`
- **Backup Branch:** `backup/phase00-pre-visual-reset`
- **Upstream Remote:** `origin/main` (synced at commit `1a276e6`)
- **Working Tree State:** Completely clean, zero uncommitted or untracked changes.

---

## 3. Technology Stack & Framework Dependencies

| Layer | Package / Tool | Verified Version | Role |
| :--- | :--- | :--- | :--- |
| **Framework** | `react` / `react-dom` | `19.3.1` | Core client rendering engine |
| **Build & Bundler** | `vite` | `8.3.5` | Production bundling & HMR dev server |
| **Language** | `typescript` | `7.0.2` | Static type safety (`tsconfig.json`) |
| **Icons** | `lucide-react` | `1.63.0` | Accessible SVG icon suite |
| **Test Runner** | `vitest` | `5.0.5` | Unit, integration & regression suite |
| **DOM Environment**| `jsdom` | `29.1.1` | Headless browser DOM simulation |
| **Testing Utilities**| `@testing-library/react` | `16.3.3` | User-centric component test harness |
| **Assertion Library**| `@testing-library/jest-dom` | `7.0.1` | Custom matchers for DOM assertions |
| **Visual Capture** | `puppeteer-core` | Installed | Headless Chrome screenshot automation |

---

## 4. Active Application Entry Points & Stage Workflow

### Application Entry Point
1. **HTML Shell:** [`index.html`](file:///c:/Users/salee/Downloads/Portal_ds/index.html) — Configured with strict CSP (TLS 1.3, Bank Negara Malaysia / PCI-DSS compliance, fonts Google/Inter/Kanit, zero unsafe-eval).
2. **Bootstrap:** [`src/main.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/main.tsx) — Injects `tokens.css`, `foundation.css`, and `layout.css` into `#root`.
3. **Application Core:** [`src/app/App.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/app/App.tsx) — Wraps workflow inside `<ErrorBoundary>` and `<WorkflowProvider>`.

### Customer Journey Mapping (Current vs. V5 Target)

| Stage Index | Current Running Module | V5 Target Stage Name | Scope & Responsibilities |
| :---: | :--- | :--- | :--- |
| **1** | [`Stage1CoverageForm.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/features/coverage/Stage1CoverageForm.tsx) | **Coverage** | Classification, specialization percentages, liability limit selection, pro-rata MMC dates, promo codes. |
| **2** | [`Stage2QuoteReview.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/features/quote/Stage2QuoteReview.tsx) | **Quotation** | 15-minute rate lock, indicative premium, clinic entity eligibility, PIC defense, complimentary reinstatement. |
| **3** | [`Stage3ParticularsForm.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/features/particulars/Stage3ParticularsForm.tsx) *(Part 1 & Branches)* | **Details** | Practitioner identification, NRIC auto-derivation, contact details, clinic legal name, practice address, clinic branches. |
| **4** | [`UnderwritingQuestionnaire.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/features/underwriting/UnderwritingQuestionnaire.tsx) *(Currently inside Stage 3)* | **Declaration** | Statutory Schedule 9 FSA 2013 questions (claims, errors, discipline, crimes), COVID risk screens 04A-C, truth declaration. |
| **5** | [`Stage4ReviewAndPayment.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/features/review/Stage4ReviewAndPayment.tsx) | **Summary** | Comprehensive review of all parameters, itemized breakdown, BNM commission disclosures, PCI-DSS payment methods. |
| **Outcome** | [`ReferralScaffold.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/features/scaffolds/ReferralScaffold.tsx) | **Underwriting Referral** | Affirmative underwriting history referral terminal with relationship manager callback request ticket. |
| **Outcome** | [`Stage5PolicyConfirmation.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/features/confirmation/Stage5PolicyConfirmation.tsx) | **Policy Confirmation** | Policy bound success screen, policy number, instant certificate download. |

---

## 5. Current Design-System Dependencies & CSS Inventory

The active application relies exclusively on three modular stylesheets:
1. [`src/design-system/tokens.css`](file:///c:/Users/salee/Downloads/Portal_ds/src/design-system/tokens.css) (15.9 KB) — Brand invariants (`#08A5B5`, `#132766`), semantic feedback scales (green, amber, red), 46px input geometry tokens, 6px radii, and Inter/Kanit font family variables.
2. [`src/design-system/foundation.css`](file:///c:/Users/salee/Downloads/Portal_ds/src/design-system/foundation.css) (8.9 KB) — Direction B structural classes (`.ds-card`, `.ds-section-bar`, `.ds-badge-primary`, `.ds-heading-page`, `.ds-heading-section`).
3. [`src/components/layout/layout.css`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/layout/layout.css) (6.8 KB) — AppShell layout grid, responsive containers, `.ds-main-card-open` open canvas rule, sticky quotation sidebar, mobile summary drawer.

---

## 6. Protected Insurance Modules & Critical Business Logic

The following core modules are strictly protected under **Rule 4** and must not be altered during visual presentation work:

| Protected Module | File Path | Protected Behavior |
| :--- | :--- | :--- |
| **Authoritative Rating Engine** | [`src/core/api/ratingService.ts`](file:///c:/Users/salee/Downloads/Portal_ds/src/core/api/ratingService.ts) | Base premium tables, pro-rata date calculation, clinic liability tiers (`500k`, `1m`, `2m`), PIC flat fees, 8% SST, RM 10 stamp duty. |
| **Medical Classifications & Specialties** | [`src/core/data/classifications.ts`](file:///c:/Users/salee/Downloads/Portal_ds/src/core/data/classifications.ts) | 7 statutory classifications, GP aesthetics clause 6/12 risk factor, specialization definitions. |
| **Underwriting Decision Tree** | [`src/core/api/underwritingService.ts`](file:///c:/Users/salee/Downloads/Portal_ds/src/core/api/underwritingService.ts) | Schedule 9 FSA 2013 evaluation, affirmative claim referrals, AML/CFT sanctions screening (`DT-IND-06`), MMC disciplinary inquiry referrals. |
| **Renewal & Policy Lookup Engine** | [`src/core/api/renewalService.ts`](file:///c:/Users/salee/Downloads/Portal_ds/src/core/api/renewalService.ts) | Active policy verification by NRIC, renewal promo code replacement (`CHUBBPROMO` -> `MMA2026`). |
| **Payment Gateway Integration** | [`src/core/api/paymentService.ts`](file:///c:/Users/salee/Downloads/Portal_ds/src/core/api/paymentService.ts) | PCI-DSS SAQ-A checkout simulation, 3D-Secure 2.0 biometric verification, non-destructive retry state on failure. |
| **State Machine & Workflow** | [`src/core/state/WorkflowContext.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/core/state/WorkflowContext.tsx) | Session storage synchronization, backward navigation persistence, referral routing triggers. |
| **Input Sanitizer** | [`src/core/utils/sanitizer.ts`](file:///c:/Users/salee/Downloads/Portal_ds/src/core/utils/sanitizer.ts) | XSS protection, text length boundaries, NRIC hyphen standardizer. |

---

## 7. Real Integrations vs. Simulated Adapters

Governed by `HttpClient.isMockAllowed()` in [`src/core/api/httpClient.ts`](file:///c:/Users/salee/Downloads/Portal_ds/src/core/api/httpClient.ts):
- **Live Gateway Integration:** Active when `VITE_API_BASE_URL` points to Chubb/DoctorShield endpoints (`https://my-individualindemnity.doctorshield.com/api/*`). Enforces TLS 1.3, Base64 envelope decoding, UUIDv4 idempotency keys, and RFC 7807 Problem Details.
- **Client-Side Simulation Fallbacks:** Active in local development (`localhost`) and test runner environments (`vitest`). Authoritative calculations are performed locally with 100% mathematical and rule equivalence to live backend contracts.
- **Rule P-7 Compliance:** Simulated environments are never mislabeled as live gateways. Real financial transactions are strictly blocked in development.

---

## 8. Baseline Verification Results

All automated checks executed on 01 November 2026:

| Check | Command | Result | Notes |
| :--- | :--- | :--- | :--- |
| **Static Typecheck** | `npm run typecheck` | **PASS (0 errors)** | Full TypeScript compliance |
| **Production Build** | `npm run build` | **PASS (833ms)** | Generated clean chunks in `dist/` |
| **Unit & Integration Suite** | `npm test` | **PASS (130 / 130)** | 100% pass rate across 12 test files in 9.30s |
| **Stage 1 Tests** | `stage1.test.tsx` | **PASS (9 / 9)** | Classification, specialization, pro-rata dates |
| **Stage 2 Tests** | `stage2.test.tsx` | **PASS (8 / 8)** | Rate lock, clinic/PIC add-on dependencies |
| **Stage 3 Tests** | `stage3.test.tsx` | **PASS (11 / 11)** | Identity, branches, underwriting referrals |
| **Stage 4 Tests** | `stage4.test.tsx` | **PASS (10 / 10)** | Breakdown tables, BNM disclosures, checkout |
| **Secondary & Renewal** | `secondary_features.test.tsx`| **PASS (11 / 11)** | OTP verification, renewal flows |
| **E2E Scenarios** | `e2e_scenarios.test.tsx` | **PASS (6 / 6)** | Direct bind, clinic owner, adverse referral |

---

## 9. Baseline Screenshot Inventory

All baseline screenshots captured using headless Chrome and verified synthetic data at 1440px (Desktop) and 390px (Mobile):

| Viewport | Stage | Screenshot File | Description |
| :--- | :---: | :--- | :--- |
| **Desktop (1440px)** | **1** | `baseline-stage1-coverage-desktop-1440px.png` | Coverage configuration form on open canvas |
| **Mobile (390px)** | **1** | `baseline-stage1-coverage-mobile-390px.png` | Stage 1 mobile layout with 44px touch targets |
| **Desktop (1440px)** | **2** | `baseline-stage2-quotation-desktop-1440px.png` | Indicative quotation, rate lock, and add-on cards |
| **Mobile (390px)** | **2** | `baseline-stage2-quotation-mobile-390px.png` | Stage 2 mobile layout with sticky summary drawer |
| **Desktop (1440px)** | **3** | `baseline-stage3-particulars-desktop-1440px.png` | Personal details, practice data & underwriting |
| **Mobile (390px)** | **3** | `baseline-stage3-particulars-mobile-390px.png` | Stage 3 mobile form flow with calm choices |
| **Desktop (1440px)** | **4** | `baseline-stage4-summary-desktop-1440px.png` | Policy review, itemized tax table, and payment |
| **Mobile (390px)** | **4** | `baseline-stage4-summary-mobile-390px.png` | Stage 4 mobile checkout and statutory consents |

---

## 10. Files Eligible for Future Removal (Controlled Migration)

*Note: Per Rule 10 & Rule 4, no files have been deleted during Phase 00. These files are flagged for controlled removal only after replacement components are tested and integrated:*

1. **Development Explorations:**
   - `src/explorations/ArtDirectionShowcase.tsx` (Direction A vs Direction B comparison studio)
   - `src/explorations/FoundationSpecimen.tsx` (Pre-implementation specimen)
   - `src/explorations/AtomicComponentGallery.tsx` (Catalog-only previews)
2. **Obsolete Component Catalog:**
   - `src/catalog/CatalogApp.tsx` (Legacy rejected design system catalog)
   - `src/catalog/main.tsx`
3. **Unused Legacy Form Atoms (after verification of replacements):**
   - Candidate unused files under `src/components/form/` and `src/components/organisms/` will be audited with import graphs in Phase 01 before removal.

---

## 11. Outstanding Verification Blockers

- **Zero Blocking Issues:** All 130 tests pass, build succeeds with zero errors, and all active routes render cleanly.
- **Architectural Next Step:** Under Master Product Rules V5, separate Stage 3 (Details) and Stage 4 (Declaration) so that the customer-facing workflow presents the clean 5-stage journey (1. Coverage -> 2. Quotation -> 3. Details -> 4. Declaration -> 5. Summary).
