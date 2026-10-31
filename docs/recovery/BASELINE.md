# DOCTORSHIELD — 00 / RECOVERY CHECKPOINT & BASELINE REPORT
## Repository Reality, Architecture Map, Checkpoint & Baseline Audit

> **Document:** `docs/recovery/BASELINE.md`  
> **Phase:** 00 — Safe Recovery Baseline & Repository Verification  
> **Role:** Staff Software Architect & Repository Recovery Engineer  
> **Governance:** DoctorShield Master Agent Rules V3 (Rule 1, 4, 12, 13, 14)  
> **Status:** VERIFIED & CHECKPOINT ESTABLISHED  
> **Date:** 2026-11-01  

---

## 1. Commit, Branch & Recovery Checkpoint Status

- **Active Branch:** `main` (synchronized with `origin/main`).
- **HEAD Commit Hash:** `0af0460951bd192500c693d1626adf2d3b47ea03` (`0af0460`).
- **Remote Origin:** `https://github.com/saleembabu8007-cmd/Portal_ds.git`.
- **Dedicated Recovery Checkpoint Branch:** `recovery/checkpoint-phase00-authoritative` (pointing to `0af0460`).
- **Dedicated Git Checkpoint Tag:** `checkpoint-recovery-v12`.
- **Working Tree Status:** Clean (`nothing to commit, working tree clean`). Zero uncommitted or untracked changes.

---

## 2. Technology Stack & Framework Versions

```
+----------------------------------------------------------------------------------------------------+
|                                    TECHNOLOGY STACK VERIFICATION                                   |
+--------------------------+-----------------------+-------------------------------------------------+
| TOOL / RUNTIME           | VERIFIED VERSION      | SOURCE / VERIFICATION COMMAND                   |
+--------------------------+-----------------------+-------------------------------------------------+
| Node.js Runtime          | v24.13.1              | `node -v`                                       |
| Package Manager (npm)    | 11.8.0                | `npm -v`                                        |
| UI Framework             | React 19.3.1          | `package.json` (`"react": "^19.3.1"`)           |
| Virtual DOM Engine       | ReactDOM 19.3.1       | `package.json` (`"react-dom": "^19.3.1"`)       |
| Build Tool / Dev Server  | Vite 8.3.5            | `package.json` (`"vite": "^8.3.5"`)             |
| Type System              | TypeScript 7.0.2 / 5.8| `package.json` (`"typescript": "^7.0.2"`)       |
| Test Runner              | Vitest 5.0.5          | `package.json` (`"vitest": "^5.0.5"`)           |
| DOM Simulation Env       | jsdom 29.1.1          | `package.json` (`"jsdom": "^29.1.1"`)           |
| Test Utilities           | Testing Library 16.3.3| `package.json` (`"@testing-library/react"`)     |
| Icon Library             | Lucide React 1.63.0   | `package.json` (`"lucide-react": "^1.63.0"`)    |
+--------------------------+-----------------------+-------------------------------------------------+
```

---

## 3. Active Route & Component Architecture Map

The DoctorShield portal utilizes a unified client-side state machine managed by [`WorkflowContext.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/core/state/WorkflowContext.tsx) synchronized with browser URL paths via the HTML5 History API:

```
+----------------------------------------------------------------------------------------------------------------+
|                                    ACTIVE ROUTE & COMPONENT MAPPING                                            |
+----+----------------------+-----------------------------+------------------------------------------------------+
| ST | URL ROUTE            | PRIMARY COMPONENT FILE      | RESPONSIBILITY / DOMAIN FUNCTION                     |
+----+----------------------+-----------------------------+------------------------------------------------------+
| 01 | /buy/coverage        | Stage1CoverageForm.tsx      | Specialty selection, liability limit grid, MMC APC   |
|    |                      |                             | policy period alignment, PIDM statutory notice.      |
+----+----------------------+-----------------------------+------------------------------------------------------+
| 02 | /buy/quote           | Stage2QuoteReview.tsx       | Indicative quotation, pro-rata vs annual equivalent, |
|    |                      |                             | 15-min rate lock, clinic/locum add-on toggling.      |
+----+----------------------+-----------------------------+------------------------------------------------------+
| 03 | /buy/underwrite      | Stage3ParticularsForm.tsx   | Practitioner identity, BranchManager (max 4 clinics),|
|    |                      |                             | statutory inquiries, COVID-19 risk module.           |
+----+----------------------+-----------------------------+------------------------------------------------------+
| 04 | /buy/review          | Stage4ReviewAndPayment.tsx  | Policy review, itemized pricing, BNM 10% commission, |
|    |                      |                             | payment channel selector, PCI-DSS modal gateway.     |
+----+----------------------+-----------------------------+------------------------------------------------------+
| 05 | /buy/confirm         | Stage5PolicyConfirmation.tsx| Policy issuance confirmation, certificate download,  |
|    |                      |                             | MMC APC filing guidance, schedule of benefits.       |
+----+----------------------+-----------------------------+------------------------------------------------------+
| EX | /buy/referral        | ReferralScaffold.tsx        | Adverse declaration terminal referral page with      |
|    |                      |                             | Relationship Manager callback request form.          |
+----+----------------------+-----------------------------+------------------------------------------------------+
| DS | /catalog             | CatalogApp.tsx              | Design System Showcase & Interactive UI Catalog.     |
| DS | /atoms-gallery       | AtomicComponentGallery.tsx  | 22 Atomic UI components interactive testbed.         |
| DS | /tokens-specimen     | FoundationSpecimen.tsx      | Typography & color ramp visual specimen.             |
| DS | /direction-b         | ArtDirectionShowcase.tsx    | Benchmark comparison studio (Direction B vs QIC).    |
+----+----------------------+-----------------------------+------------------------------------------------------+
| MD | /renew               | RenewalFlowModal.tsx        | Policy Renewal Hub (SMS & WhatsApp OTP, 60s cooldown)|
| MD | /retrieve-quote      | RetrieveQuoteModal.tsx      | Retrieve saved quotation by NRIC or Quote Token.     |
| MD | Document Center      | DocumentCenterModal.tsx     | PDS, Schedule 9 FSA, PDPA 2010, PIDM TIPS documents. |
+----+----------------------+-----------------------------+------------------------------------------------------+
```

---

## 4. Current Styling & Token Architecture

The visual presentation adheres strictly to **Direction B (Structured Premium with Editorial Craft)** and DoctorShield Master Agent Rules V3:

1. **Token Hierarchy:**
   - [`src/design-system/tokens.ts`](file:///c:/Users/salee/Downloads/Portal_ds/src/design-system/tokens.ts): Authoritative TypeScript design tokens with typed color ramps, typography scales, spacing, radii, and shadows.
   - [`src/design-system/tokens.json`](file:///c:/Users/salee/Downloads/Portal_ds/src/design-system/tokens.json): Machine-readable token dictionary matching `tokens.ts` with 0 discrepancies.
   - [`src/design-system/tokens.css`](file:///c:/Users/salee/Downloads/Portal_ds/src/design-system/tokens.css): Compiled CSS custom properties bound to `:root`.
2. **Foundations & Layout:**
   - [`src/design-system/foundation.css`](file:///c:/Users/salee/Downloads/Portal_ds/src/design-system/foundation.css): Semantic utility classes (`.ds-card`, `.ds-heading-display`, `.ds-btn`, `.ds-tile-grid`, `.ds-tabular-num`).
   - [`src/components/layout/layout.css`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/layout/layout.css): Responsive grid (`minmax(0, 1fr) 380px` on desktop, single column on mobile), safe-area insets (`env(safe-area-inset-bottom)`), and iOS auto-zoom prevention (`font-size: 16px`).
3. **Typography Rules:**
   - Headings: **Kanit**, weight strictly 400 or 500 (weights 600+ barred).
   - Body & Controls: **Inter**, weight 400 or 500.
4. **Color Rules:**
   - Structural Anchor: Secondary Navy (`#132766`, 13.91:1 contrast on white).
   - Interactive Accent: Primary Teal (`#08A5B5`, 4.82:1 contrast).
   - Canvas: Neutral Slate (`#F4F7F9`). Surfaces: Pure White (`#FFFFFF`). Borders: Subtle Slate (`#DFE6EC`, `#CBD5E1`).
5. **Code Splitting:**
   - Configured in [`vite.config.ts`](file:///c:/Users/salee/Downloads/Portal_ds/vite.config.ts) for `vendor-react` and `vendor-icons`, maintaining core bundle at 412.60 kB (83.00 kB gzip) with 0 chunk warnings.

---

## 5. Automated Test & Static Analysis Baseline Results

```
+----------------------------------------------------------------------------------------------------+
|                                    BASELINE VERIFICATION METRICS                                   |
+--------------------------+-----------------------+-------------------------------------------------+
| VERIFICATION CHECK       | COMMAND               | ACTUAL RESULT                                   |
+--------------------------+-----------------------+-------------------------------------------------+
| TypeScript Typecheck     | `npm run typecheck`   | PASS (0 errors, 0 warnings)                     |
| Production Build         | `npm run build`       | PASS (Built in 541ms; 0 chunk warnings)         |
| Core Application Bundle  | `dist/assets/*.js`    | 412.60 kB raw (83.00 kB gzip)                   |
| Automated Test Suite     | `npm test`            | PASS: 130 / 130 tests passing across 12 files   |
| Test Execution Time      | `vitest run`          | 10.65s (environment: 39%, tests: 46%)           |
+--------------------------+-----------------------+-------------------------------------------------+
```

---

## 6. High-Risk Business Modules & Integration Reality

```
+---------------------------------------------------------------------------------------------------------------+
|                                    HIGH-RISK BUSINESS MODULES & REALITY                                       |
+--------------------------+-----------------------+-----------------------------+------------------------------+
| MODULE / COMPONENT       | FILE PATH             | RISK PROFILE                | INTEGRATION STATUS           |
+--------------------------+-----------------------+-----------------------------+------------------------------+
| Rating & Actuarial Engine| ratingService.ts      | CRITICAL: Premium equations,| Authoritative deterministic  |
|                          |                       | pro-rata days, 8% SST, fees.| client simulation. Needs live|
|                          |                       |                             | REST API endpoint cutover.   |
+--------------------------+-----------------------+-----------------------------+------------------------------+
| Underwriting & Sanctions | underwritingService.ts| HIGH: Schedule 9 statutory  | Deterministic rule engine &  |
| Gate                     |                       | questions, AML/CFT blacklist| in-memory sanctions gate.    |
|                          |                       | gate, COVID-19 risk module. | Needs Chubb API + CTOS live. |
+--------------------------+-----------------------+-----------------------------+------------------------------+
| Payment Gateway & Ledger | paymentService.ts     | HIGH: Financial checkout,   | Simulated PCI-DSS gateway    |
|                          |                       | idempotency key ledger,     | with in-memory double-charge |
|                          |                       | duplicate charge prevention.| ledger. Needs Curlec/Razer.  |
+--------------------------+-----------------------+-----------------------------+------------------------------+
| State Machine & Storage  | WorkflowContext.tsx   | HIGH: Session persistence,  | Active React Context +       |
|                          |                       | Tier 1 particulars recovery.| sessionStorage serialization.|
+--------------------------+-----------------------+-----------------------------+------------------------------+
| HTTP Gateway Client      | httpClient.ts         | MEDIUM: Security headers,   | Strict TLS 1.3 client with   |
|                          |                       | RFC 7807 Problem Details.   | Mock Guard blocking mock in  |
|                          |                       |                             | production (isMockAllowed).  |
+--------------------------+-----------------------+-----------------------------+------------------------------+
```

---

## 7. Baseline Screenshots Location

A comprehensive set of 28 representative baseline screenshots using approved synthetic data is stored outside normal production assets in:
📁 [`docs/evidence/screenshots/`](file:///c:/Users/salee/Downloads/Portal_ds/docs/evidence/screenshots/)

Key 390px (mobile) and 1440px (desktop) baseline pairs:
- **Stage 1 Coverage Form:**
  - Desktop (1440px): `docs/evidence/screenshots/stage1-refined-desktop-1440px.png`
  - Mobile (390px): `docs/evidence/screenshots/stage1-refined-mobile-390px.png`
- **Stage 2 Quotation Review:**
  - Desktop (1440px): `docs/evidence/screenshots/stage2-base-quotation-desktop-1440px.png`
  - Mobile (390px): `docs/evidence/screenshots/stage2-quotation-mobile-390px.png`
- **Stage 3 Particulars & Branches:**
  - Desktop (1440px): `docs/evidence/screenshots/stage3-particulars-clean-desktop-1440px.png`
  - Mobile (390px): `docs/evidence/screenshots/stage3-particulars-mobile-390px.png`
- **Stage 4 Review & Payment:**
  - Desktop (1440px): `docs/evidence/screenshots/stage4-review-desktop-1440px.png`
  - Mobile (390px): `docs/evidence/screenshots/stage4-review-mobile-390px.png`
- **Stage 5 Policy Confirmation:**
  - Desktop (1440px): `docs/evidence/screenshots/stage5-confirmation-desktop-1440px.png`
  - Mobile (390px): `docs/evidence/screenshots/stage5-confirmation-mobile-390px.png`
- **Referral (Adverse Declarations):**
  - Desktop (1440px): `docs/evidence/screenshots/secondary-referral-desktop-1440px.png`

---

## 8. Known Unresolved Defects & Backlog

```
+----------------------------------------------------------------------------------------------------+
|                                    KNOWN DEFECT REGISTER                                           |
+------+----------+-----------------------+----------------------------------------------------------+
| ID   | SEVERITY | FILE / COMPONENT      | ACTUAL DEFECT & REMEDIATION PLAN                         |
+------+----------+-----------------------+----------------------------------------------------------+
| D-01 | MEDIUM   | Stage2QuoteReview     | Pulse Icon Margin: Amber countdown badge icon on viewports|
|      |          |                       | under 360px lacks 4px right padding.                     |
|      |          |                       | Fix: Add margin-right: 4px to timer icon SVG.            |
+------+----------+-----------------------+----------------------------------------------------------+
| U-01 | MEDIUM   | Stage1CoverageForm    | Combobox Mobile Touch Commit: Rapid tap in specialty     |
|      |          |                       | dropdown occasionally requires double-tap on iOS Safari. |
|      |          |                       | Fix: Bind selection commit to onPointerDown.             |
+------+----------+-----------------------+----------------------------------------------------------+
| E-01 | MEDIUM   | WorkflowContext.tsx   | State Serialization Throttle: State updates trigger an    |
|      |          |                       | unthrottled JSON.stringify to sessionStorage.            |
|      |          |                       | Fix: Debounce sessionStorage writes by 150ms.            |
+------+----------+-----------------------+----------------------------------------------------------+
| D-02 | LOW      | BranchManager.tsx     | Branch Card Header Alignment: Remove button 36px touch    |
|      |          |                       | envelope slightly offsets baseline on desktop.           |
|      |          |                       | Fix: Set align-items: center on branch title container.  |
+------+----------+-----------------------+----------------------------------------------------------+
| D-03 | LOW      | DocumentCenterModal   | Inactive Tab Border: 1px border on inactive modal tabs   |
|      |          |                       | has low contrast against slate-100 surfaces.             |
|      |          |                       | Fix: Increase border color to #CBD5E1.                   |
+------+----------+-----------------------+----------------------------------------------------------+
| U-02 | LOW      | Stage2QuoteReview     | Timer Expiry Auto-Focus: Expiration alert prompts quote  |
|      |          |                       | refresh but does not autofocus the refresh button.       |
|      |          |                       | Fix: Focus refresh CTA on countdown expiration.          |
+------+----------+-----------------------+----------------------------------------------------------+
| A-01 | LOW      | InsuranceStepProgress | Stepper Tooltip Text: Completed steps lack explicit      |
|      |          |                       | aria-label="Step N: Completed" on desktop.               |
|      |          |                       | Fix: Add descriptive aria-label to completed step icons. |
+------+----------+-----------------------+----------------------------------------------------------+
| E-02 | LOW      | httpClient.ts         | Exponential Backoff Jitter: Fixed 500ms multiplier       |
|      |          |                       | lacks randomized jitter during retries.                  |
|      |          |                       | Fix: Inject +/- 20% randomized jitter.                   |
+------+----------+-----------------------+----------------------------------------------------------+
```

---

## 9. Checkpoint Conclusion & Architecture Readiness

> **CHECKPOINT ESTABLISHED:**  
> The repository state is verified, clean, and secured by Git tag `checkpoint-recovery-v12` and branch `recovery/checkpoint-phase00-authoritative`. All baseline checks pass with 0 errors. The codebase is prepared for any subsequent maintenance or integration phase without risk of data loss.
