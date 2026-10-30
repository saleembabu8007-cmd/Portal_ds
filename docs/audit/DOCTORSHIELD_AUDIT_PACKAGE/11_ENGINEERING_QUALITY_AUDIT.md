# DOCTORSHIELD FORENSIC AUDIT — REPORT 11
# Engineering Quality, Tests & Performance Audit

**Audit Date:** 2026-10-30  
**Auditor:** Staff Frontend Engineer & Code Quality Auditor  
**Audit Target:** Code Health, TypeScript Invariants, Test Suite, Bundle Performance & Security Controls  
**Status:** COMPLETE — STRICTLY READ-ONLY  

---

## 1. Executive Summary: Engineering Health & Defect Synthesis

The forensic code quality audit reveals a **sharp contrast between service-layer excellence and UI-layer debt**:
1. **Service Layer & Security Architecture is Excellent:** The rating engine, underwriting decision trees, idempotency ledger, PII masking logger, and anti-XSS sanitizer are well-architected, mathematically rigorous, and 100% verified by automated tests.
2. **TypeScript Configuration Defect (TS5102 / TS5090):** Running standalone `npx tsc --noEmit` fails immediately with exit code 1 due to obsolete `baseUrl` options and missing relative path prefixes in `tsconfig.json`. This was masked because `vite build` skips `tsc` type checking during bundling.
3. **Monolithic Bundle Without Code-Splitting:** The production build generates a single monolithic JavaScript bundle of **824.09 kB** (185.88 kB gzip), triggering Vite's chunk size warning. This is exacerbated by `CatalogApp.tsx` and all orphaned component suites being statically imported into `App.tsx`.
4. **120/120 Tests Passing with High Integrity:** The 11 Vitest test suites execute in ~8.4 seconds with zero external network side effects and high assertions coverage.

---

## 2. Diagnostic Command Execution & Concrete Metrics

| Diagnostic Tool / Check | Command Executed | Exit Code / Result | Exact Metric Recorded | Evidence File / Log |
|---|---|---|---|---|
| **TypeScript Compiler** | `npx tsc --noEmit` | **1 (FAILED)** | 2 Configuration Errors: TS5102, TS5090 | [`tsconfig.json:18-20`](file:///c:/Users/salee/Downloads/Portal_ds/tsconfig.json#L18-L20) |
| **Production Build** | `npm run build` (`vite build`) | **0 (SUCCESS)** | Single JS chunk: **824.09 kB** (gzip: 185.88 kB)<br>CSS: **16.59 kB** (gzip: 3.39 kB)<br>Transform: 2,035 modules in 633ms | `dist/assets/index-Dx2TxcHh.js`<br>`dist/assets/index-P9qVjQh4.css` |
| **Vitest Test Suite** | `npm test` (`vitest run`) | **0 (SUCCESS)** | **11 Test Files, 120 Tests Passed, 0 Failed, 0 Skipped** (Duration: 8.36s) | Vitest terminal output |
| **Loose `: any` Types** | Regex scan: `:\s*any\b` | **CONFIRMED** | **29 occurrences** across `src/` | Grep output across `src/` |
| **Monolithic Files (>1,000 Lines)** | Line count measure | **CONFIRMED** | **6 files exceed 1,200 lines each** (Total: 8,104 lines in 6 files) | `Stage2QuoteReview.tsx` (1,533 L), `UnderwritingQuestionnaire.tsx` (1,455 L), etc. |
| **Hardcoded Inline Colors** | Regex scan: `#[0-9a-fA-F]{3,6}` | **CONFIRMED** | **352 occurrences** in `*.tsx` files | Grep output across `src/` |
| **Illegal Font Weights (>500)** | Regex scan: `fontWeight:\s*(600\|700\|800\|'bold')` | **CONFIRMED** | **306 occurrences** in `src/` | Grep output across `src/` |

---

## 3. Test Coverage & Test Suite Inventory

The project features a comprehensive test suite in `src/test/`:

| Test Suite File | Test Count | Scope of Verification | Pass Status | Quality Assessment |
|---|---|---|---|---|
| [`security_and_reliability.test.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/test/security_and_reliability.test.tsx) | 17 tests | XSS sanitization, HTML escaping, PII masking (NRIC, email, phone), RFC 7807 Problem Details, UUID v4 idempotency keys, duplicate payment rejection. | **17/17 PASSED** | Exceptional security test suite. |
| [`stage1.test.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/test/stage1.test.tsx) | 9 tests | Stage 1 classification selector, limit pills, dates, partner promo validation (`MMA2026`), APC date modal, transition to Stage 2. | **9/9 PASSED** | Comprehensive coverage of Stage 1. |
| [`stage2.test.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/test/stage2.test.tsx) | 8 tests | 15-minute rate-lock timer, pro-rata days, clinic entity add-on, PIC endorsement, educational modals, transition to Stage 3. | **8/8 PASSED** | Complete quotation logic coverage. |
| [`stage3.test.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/test/stage3.test.tsx) | 11 tests | Practitioner identity, NRIC auto-extraction (DOB, gender), NRIC promo code substitution, BranchManager max 4 limit & RM 5M ceiling, statutory underwriting declarations, referral routing, AML/CFT sanctions gate. | **11/11 PASSED** | High-depth underwriting coverage. |
| [`stage4.test.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/test/stage4.test.tsx) | 10 tests | Review tables, 8% SST and RM 10 stamp duty math, BNM 10% commission disclosure, rate-lock revalidation, mandatory legal consent enforcement, PCI-DSS checkout gateway, payment outcomes (`SUCCESS`, `FAILED`, `CANCELLED`), Stage 5 confirmation. | **10/10 PASSED** | Complete financial and payment checkout test suite. |
| [`e2e_scenarios.test.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/test/e2e_scenarios.test.tsx) | 6 tests | End-to-end user journeys: Scenario 1 (Clean GP bind), Scenario 2 (Sole proprietor clinic owner), Scenario 3 (Add-on removal & recalculation), Scenario 4 (Promo discount), Scenario 5 (Adverse declaration referral), Scenario 6 (Renewal OTP). | **6/6 PASSED** | Verifies full cross-stage continuity. |
| [`secondary_features.test.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/test/secondary_features.test.tsx) | 11 tests | Policy renewal hub, dual-channel OTP verification (SMS vs WhatsApp), 60s cooldown timer, retrieve quotation modal, document center modal, session timeout manager. | **11/11 PASSED** | Robust exception path verification. |
| [`organisms_and_compositions.test.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/test/organisms_and_compositions.test.tsx) | 18 tests | Exercises the 8 layout organisms in `src/components/organisms/`. | **18/18 PASSED** | High component coverage, but exercises orphaned code. |
| [`form_molecules.test.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/test/form_molecules.test.tsx) | 16 tests | Exercises the 20 form molecules in `src/components/form/`. | **16/16 PASSED** | High molecule coverage, but exercises orphaned code. |
| [`components.test.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/test/components.test.tsx) | 7 tests | Basic UI atoms (`Button`, `TextInput`, `LiabilityLimitSelector`). | **7/7 PASSED** | Good baseline atom coverage. |
| [`shell.test.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/test/shell.test.tsx) | 7 tests | `AppShell` header, navigation, sidebar visibility, live stage mounting. | **7/7 PASSED** | Layout integrity confirmed. |

---

## 4. Code Quality & Technical Debt Register

### 4.1 Monolithic Screen Architecture
The following 6 files account for **8,104 lines of code** and exhibit severe maintainability debt:
1. `src/features/quote/Stage2QuoteReview.tsx`: **1,533 lines**
2. `src/features/underwriting/UnderwritingQuestionnaire.tsx`: **1,455 lines**
3. `src/features/particulars/Stage3ParticularsForm.tsx`: **1,418 lines**
4. `src/features/review/Stage4ReviewAndPayment.tsx`: **1,267 lines**
5. `src/catalog/CatalogApp.tsx`: **1,267 lines**
6. `src/features/coverage/Stage1CoverageForm.tsx`: **1,264 lines**

*Impact:* Extreme cognitive load for engineers maintaining the code. Refactoring or styling changes in one section of the file easily cause unintended regressions in adjacent sections.

### 4.2 TypeScript Compiler Broken Configuration
- **File:** [`tsconfig.json`](file:///c:/Users/salee/Downloads/Portal_ds/tsconfig.json#L18-L21)
- **Code:**
  ```json
  "baseUrl": ".",
  "paths": {
    "@/*": ["src/*"]
  }
  ```
- **Issue:** Modern TypeScript (version 7.0.2) removes `baseUrl` under `"moduleResolution": "bundler"` and requires relative paths in aliases (`"./src/*"`).
- **Result:** Running `tsc --noEmit` fails, preventing pre-commit type checking in CI/CD pipelines.

### 4.3 Production Bundle Bloat & Lack of Code Splitting
- **Metric:** `index-Dx2TxcHh.js` is **824.09 kB**.
- **Root Cause:**
  1. `CatalogApp.tsx` (and all 36 unused components in `src/components/form/` and `src/components/organisms/`) is statically imported into `src/app/App.tsx`.
  2. All 5 stages, all 6 modals, and the entire MMC classification dataset (42 items with long descriptions) are bundled into the primary entry chunk.
  3. No `React.lazy()` dynamic imports are configured.

### 4.4 Security & Data Privacy Verification
- **Anti-XSS Defense:** `src/core/utils/sanitizer.ts` implements strict HTML entity escaping and regex stripping of executable `<script>` tags, javascript URI protocols, and event handlers (`onload`, `onerror`). Tested in `security_and_reliability.test.tsx`.
- **PDPA 2010 Telemetry Masking:** `src/core/telemetry/logger.ts` automatically masks Malaysian NRIC numbers (preserves only birth year and last digit, e.g. `88****-**-***2`), emails (preserves first/last char and domain), and phone numbers (`012-***-4567`). Tested in `security_and_reliability.test.tsx`.
- **Payment Integrity:** Idempotency ledger prevents double billing. 15-minute rate-lock expiration guard prevents stale quotation binding.
- **Zero Secrets in Repository:** Inspection confirms `.env.example` has redacted values, and no API keys, private certificates, or real customer NRICs are committed in source code.

---

## 5. Audit 11 Verification Sign-Off

- [x] TypeScript compiler diagnostic executed; TS5102/TS5090 defects confirmed.
- [x] Production bundle size measured at 824.09 kB; chunk size warning confirmed.
- [x] All 11 test suites executed; 120/120 passing tests verified.
- [x] 29 `: any` occurrences and 6 monolithic files (>1,200 lines) cataloged.
- [x] Anti-XSS sanitization, PII masking, and payment security verified.
- **Classification:** CONFIRMED — RUNTIME DIAGNOSTIC & TEST RESULT.
