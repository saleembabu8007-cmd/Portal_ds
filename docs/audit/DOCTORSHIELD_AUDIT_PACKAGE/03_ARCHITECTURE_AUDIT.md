# DOCTORSHIELD FORENSIC AUDIT — REPORT 03
# Application Architecture Audit

**Audit Date:** 2026-10-30  
**Auditor:** Principal Software Architect & Staff Frontend Engineer  
**Audit Target:** Component Hierarchy, State Management, Routing, Data Flow & Service Contracts  
**Status:** COMPLETE — STRICTLY READ-ONLY  

---

## 1. Architectural Overview & Component Hierarchy

The application implements a single-page application (SPA) architecture in React 19, structured around a sequential 5-stage insurance transaction funnel. However, forensic analysis reveals a **severe architectural bifurcation**: the coexistence of three disconnected component tracks.

### 1.1 Structural Component Hierarchy Diagram

```
[index.html]
    │
    ▼
[main.tsx] ── (Imports tokens.css, foundation.css, layout.css)
    │
    ▼
[WorkflowProvider] ── (src/core/state/WorkflowContext.tsx: Root State, Session Storage, Live Announcer)
    │
    ▼
[ErrorBoundary] ── (Catches runtime crashes with recovery button)
    │
    ▼
[AppContent] ── (src/app/App.tsx: Stage router & Catalog toggle)
    ├── [Catalog Mode] ────────► [CatalogApp.tsx]
    │                                  │
    │                                  ├── Imports: src/components/ui/* (8 Atoms)
    │                                  ├── Imports: src/components/form/* (20 Molecules)
    │                                  └── Imports: src/components/organisms/* (8 Organisms)
    │
    └── [Application Mode] ────► [AppShell.tsx]
                                       │
                                       ├── [BrandHeader.tsx] (Logo, Document Center Modal trigger)
                                       ├── [InsuranceStepProgress.tsx] (Stages 1-4 indicator)
                                       ├── [Main Content Region]
                                       │        │
                                       │   ┌────┴───────────────────────────────────────┐
                                       │   │ TRACK A: LIVE MONOLITHIC SCREENS (ACTIVE) │
                                       │   │                                            │
                                       │   │ Stage 1: Stage1CoverageForm.tsx (1,264 L)  │
                                       │   │ Stage 2: Stage2QuoteReview.tsx  (1,533 L)  │
                                       │   │ Stage 3: Stage3ParticularsForm.tsx (1,418L)│
                                       │   │          └─ UnderwritingQuestionnaire (1,455L)
                                       │   │ Stage 4: Stage4ReviewAndPayment.tsx (1,267L)
                                       │   │ Stage 5: Stage5PolicyConfirmation.tsx (850L)
                                       │   │ Referral: ReferralScaffold.tsx  (505 L)    │
                                       │   └────────────────────────────────────────────┘
                                       │
                                       ├── [SummarySidebar.tsx] (Desktop Sticky Pricing Panel)
                                       ├── [MobileSummaryDrawer.tsx] (Mobile Sticky Bottom Drawer)
                                       └── [AppFooter.tsx] (Chubb/BNM/MMC Disclosures, PDS links)

    ┌────────────────────────────────────────────────────────────────────────┐
    │ TRACK C: ABANDONED PROTOTYPE SCAFFOLDS (DEAD CODE)                    │
    │ Stage1CoverageScaffold.tsx, Stage2QuoteScaffold.tsx,                  │
    │ Stage3UnderwritingScaffold.tsx, Stage4ReviewScaffold.tsx,              │
    │ ConfirmationScaffold.tsx, StageCompositions.tsx                       │
    └────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Forensic Analysis of the Three Architectural Tracks

| Track | Location | Included Modules | How It Is Consumed | Architectural Assessment |
|---|---|---|---|---|
| **Track A: Monolithic Screens (Active)** | `src/features/coverage/`<br>`src/features/quote/`<br>`src/features/particulars/`<br>`src/features/review/`<br>`src/features/confirmation/` | `Stage1CoverageForm`<br>`Stage2QuoteReview`<br>`Stage3ParticularsForm`<br>`Stage4ReviewAndPayment`<br>`Stage5PolicyConfirmation`<br>`UnderwritingQuestionnaire` | Mounted directly by `App.tsx` based on `currentStage`. Renders live transaction flow. | **MONOLITHIC & TIGHTLY COUPLED:** These files range from 850 to 1,533 lines each. They contain hundreds of inline style objects (`style={{...}}`), re-implement inputs from scratch, and bypass the design system. |
| **Track B: Modern Atomic System (Orphaned)** | `src/components/ui/`<br>`src/components/form/`<br>`src/components/organisms/` | 8 Atoms (`Button`, `TextInput`)<br>20 Molecules (`LabeledTextField`, `ChoiceSelectors`)<br>8 Organisms (`InsuranceCoverageCards`, `UnderwritingAndBranches`) | Imported **exclusively** by `src/catalog/CatalogApp.tsx` and unit tests (`form_molecules.test.tsx`, `organisms_and_compositions.test.tsx`). | **ORPHANED ASSETS:** High quality, semantic token usage, accessible, but **zero adoption** in the customer-facing screens. Shipped as dead weight in the production JS bundle. |
| **Track C: Abandoned Scaffolds (Dead Code)** | `src/features/scaffolds/`<br>`src/components/compositions/` | `Stage1CoverageScaffold`<br>`Stage2QuoteScaffold`<br>`Stage3UnderwritingScaffold`<br>`Stage4ReviewScaffold`<br>`ConfirmationScaffold`<br>`StageCompositions` | Never mounted in `App.tsx`. Only `Stage4ReviewScaffold` is imported in `stage3.test.tsx` as a test mock. | **ABANDONED CODE:** Left over from initial rapid prototyping. Adds clutter and confusion without runtime utility. |

---

## 3. Routing & Navigation Architecture

### 3.1 Routing Mechanism
- **Implementation:** Custom state-driven router inside [`WorkflowContext.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/core/state/WorkflowContext.tsx#L110-L150) and [`src/app/App.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/app/App.tsx#L13-L92).
- **URL Synchronization:**
  - `currentStage === 1` $\rightarrow$ `/buy/coverage`
  - `currentStage === 2` $\rightarrow$ `/buy/quote`
  - `currentStage === 3` $\rightarrow$ `/buy/particulars`
  - `currentStage === 4` $\rightarrow$ `/buy/review`
  - `currentStage === 'referral'` $\rightarrow$ `/buy/referral`
  - `currentStage === 'confirmation'` $\rightarrow$ `/confirmation`
  - Catalog $\rightarrow$ `/catalog`
- **History Navigation:** A `popstate` event listener synchronizes browser Back/Forward navigation with `goToStage()`.
- **Architectural Findings:**
  1. **Absence of Standard Router:** While functional, the custom router lacks declarative route guards, nested layouts, and route-based code-splitting.
  2. **Dead Routes:** Legacy paths from live scraping (`/login`, `/contact`, `/faq`) are unrouted and default to Stage 1.
  3. **Data Loss Risk:** Stage transitions validate in memory, but hard refreshing deep in the flow depends entirely on `sessionStorage` deserialization.

---

## 4. State Management & Data Flow

### 4.1 Global State: `WorkflowContext.tsx`
- **Architecture:** React Context + `useReducer` / `useState` pattern.
- **State Partitioning:**
  - `coverage`: Inception/end dates, classification ID, limits, retroactive date, clinic/PIC add-on flags.
  - `doctorProfile`: Practitioner name, NRIC, MMC registration, email, phone, residential and practice addresses, branches list.
  - `quote`: Authoritative calculation payload (`grossBasePremium`, `clinicPremium`, `picPremium`, `sstAmount`, `stampDuty`, `totalPayable`, `quoteToken`, `expiresAt`).
  - `underwriting`: 5 statutory underwriting declarations, claims disclosures, facility risk flags.
  - `paymentTransaction`: Idempotency key, transaction reference, payment channel, status (`PENDING`, `SUCCESS`, `FAILED`).
  - `policyDetails`: Confirmed policy number, certificate number, invoice number.
- **Persistence:** Synchronous serialisation to `window.sessionStorage` under key `ds_workflow_state` on state mutations.

### 4.2 The "Dual-State Source of Truth" Anti-Pattern
- **Issue:** In `Stage1CoverageForm`, `Stage2QuoteReview`, and `Stage3ParticularsForm`, components maintain extensive local state copies via `useState` (e.g., `selectedLimit`, `classificationId`, `nric`, `mobilePhone`) alongside the global `WorkflowContext`.
- **Evidence:**
  - In `Stage1CoverageForm.tsx` lines 35–45: Local state initialized from `coverage`. When the user changes an input, only local state updates until the form submit handler calls `updateCoverage()`.
- **Consequence:** If the user interacts with the `SummarySidebar` or navigates backward, local component state and global context state can diverge, causing stale quotation recalculations or unexpected form resets.

---

## 5. API Services & Business Logic Separation

The core service layer located in `src/core/api/` is the **strongest architectural asset** of the project:

| Service File | Responsibility | Quality Assessment |
|---|---|---|
| [`ratingService.ts`](file:///c:/Users/salee/Downloads/Portal_ds/src/core/api/ratingService.ts) (430 lines) | Authoritative premium rating engine. Handles pro-rata day calculations, specialty multipliers, clinic tiers, PIC endorsements, partner promotional codes (`MMA2026`), 8% SST, and RM 10 stamp duty. | **EXCELLENT:** Pure, predictable, deterministic business logic. 100% covered by unit tests. |
| [`underwritingService.ts`](file:///c:/Users/salee/Downloads/Portal_ds/src/core/api/underwritingService.ts) (359 lines) | Statutory underwriting rules. Validates MMC numbers, cleans NRICs, checks claims history, evaluates COVID-19 risk, and handles relationship manager callback requests. | **EXCELLENT:** Clean separation of underwriting decision trees from UI presentation. |
| [`paymentService.ts`](file:///c:/Users/salee/Downloads/Portal_ds/src/core/api/paymentService.ts) (338 lines) | Financial transaction security. Manages UUID v4 idempotency keys, simulates PCI-DSS gateway handoffs, verifies payment webhooks, and prevents duplicate charges. | **EXCELLENT:** Robust idempotency guard and failure-recovery state handling. |
| [`renewalService.ts`](file:///c:/Users/salee/Downloads/Portal_ds/src/core/api/renewalService.ts) (503 lines) | Renewal hub and policy lookup. Generates and verifies OTP codes across SMS and WhatsApp channels with 60-second throttling. | **EXCELLENT:** Complete lifecycle handling for returning practitioners. |
| [`httpClient.ts`](file:///c:/Users/salee/Downloads/Portal_ds/src/core/api/httpClient.ts) (207 lines) | Base HTTP client with timeout management, base64 response decoding, and RFC 7807 Problem Details error translation. | **GOOD:** Well-isolated network client. |

---

## 6. Architectural Weaknesses & Technical Debt Register

### 6.1 Monolithic Component Explosion
The stage screens violate Single Responsibility Principle:
- `Stage2QuoteReview.tsx` (1,533 lines): Combines base quotation display, pro-rata calculations, clinic eligibility questions, clinic liability tier selector, PIC governance accordion, rate-lock timer, email quote modal, and "Why recommended" educational modals into a single massive file.
- `UnderwritingQuestionnaire.tsx` (1,455 lines): Inlines 5 statutory declaration questionnaires, COVID-19 facility questionnaires (Screens 04A-C), disciplinary detail textareas, and AML/CFT sanctions screening into one monolithic component.

### 6.2 Catalog Leakage into Production Bundle
- In `src/app/App.tsx`, lines 11 & 73 statically import `CatalogApp`.
- As a result, Vite packages the entire catalog, all 36 unused components in `src/components/form/` and `src/components/organisms/`, and their fixture data into the production bundle (`index-Dx2TxcHh.js`: 824.09 kB).

### 6.3 Lack of Declarative Schema Validation
- Form fields are validated imperatively via large chains of `if (!field) errors.field = '...'` inside submit handlers.
- The project lacks a unified validation schema (e.g., Zod), leading to duplicate validation logic between components and API services.

---

## 7. Audit 03 Verification Sign-Off

- [x] Application component hierarchy and stage flow mapped.
- [x] Disjointed three-track architecture verified with file references.
- [x] State management, session persistence, and dual-state anti-pattern documented.
- [x] Core API services evaluated and confirmed as production-grade.
- [x] Routing architecture, dead routes, and bundle leakage identified.
- **Classification:** CONFIRMED — SOURCE CODE & RUNTIME.
