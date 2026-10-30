# DOCTORSHIELD — ACTIVE FILE MAP & COMPONENT TOPOLOGY
## Authoritative Architecture, Line Counts, Active Roles, and Dependency Graph

```
==================================================================================================
DOCUMENT CLASSIFICATION:  [VERIFIED] ACTIVE FILE MAP & CODEBASE TOPOLOGY
REPOSITORY:               DoctorShield Individual Medical Professional Indemnity (`portal_ds`)
AUDIT AUTHORITY:          Independent Staff Software Engineer & Technical Recovery Architect
AUDIT DATE:               2026-10-30
TOTAL TS/TSX FILES:       87 Files in `src/` (All 87 Accounted For)
==================================================================================================
```

---

## 1. Complete Source Code Tree Topology

```mermaid
graph TD
    subgraph Core Layer [src/core/]
        API[api/ - HTTP, Rating, UW, Payment, Renewal]
        State[state/ - WorkflowContext & Types]
        Data[data/ - Classifications & Liability Tiers]
        Utils[telemetry/ & utils/ - Logger & Sanitizer]
    end

    subgraph Design System Layer [src/design-system/ & src/components/ui/]
        Tokens[tokens.ts, tokens.css, tokens.json, foundation.css]
        UIPrimitives[components/ui/ - Button, TextInput, SelectCombobox, etc.]
    end

    subgraph Form Molecules Layer [src/components/form/ - Untracked]
        Molecules[20 Accessible Form Molecules]
    end

    subgraph Organisms Layer [src/components/organisms/ - Untracked]
        Organisms[8 Layout & Transaction Organisms]
    end

    subgraph Shell Layer [src/components/layout/]
        Shell[AppShell, BrandHeader, SummarySidebar, AppFooter, Modals]
    end

    subgraph Live Transaction Screens [src/features/]
        Stage1[coverage/Stage1CoverageForm.tsx - 1,344 lines]
        Stage2[quote/Stage2QuoteReview.tsx - 1,619 lines]
        Stage3[particulars/Stage3ParticularsForm.tsx - 1,523 lines]
        Stage4[review/Stage4ReviewAndPayment.tsx - 1,347 lines]
        Stage5[confirmation/Stage5PolicyConfirmation.tsx - 897 lines]
        Referral[scaffolds/ReferralScaffold.tsx - 533 lines]
    end

    subgraph Catalog Showcase [src/catalog/]
        Catalog[CatalogApp.tsx - 1,382 lines]
    end

    UIPrimitives --> Molecules
    Molecules --> Organisms
    Organisms --> Catalog
    Tokens --> UIPrimitives
    Tokens --> Shell
    Tokens --> Live Transaction Screens
    State --> Live Transaction Screens
    API --> Live Transaction Screens
    Shell --> Live Transaction Screens
    Shell --> Catalog
```

---

## 2. Active Production Customer Journey Files

These files constitute the actual live application loaded when end users browse `my-individualindemnity.doctorshield.com`:

| File Path | Lines | Active Role & Responsibility | Imported Dependencies |
|:---|:---:|:---|:---|
| [`src/main.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/main.tsx) | 20 | Application bootstrap; injects CSS tokens; mounts `WorkflowProvider` and `App`. | React, ReactDOM, `WorkflowContext`, `tokens.css`, `foundation.css`, `layout.css`. |
| [`src/app/App.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/app/App.tsx) | 102 | Top-level routing switch; renders `CatalogApp` or `AppShell` with active stage view. | `AppShell`, `ErrorBoundary`, `WorkflowContext`, Stages 1–5, `ReferralScaffold`, `CatalogApp`. |
| [`src/components/layout/AppShell.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/layout/AppShell.tsx) | 134 | Primary transaction layout shell; hosts header, progress bar, summary sidebar, drawer, modals, footer. | `SkipLink`, `BrandHeader`, `AppFooter`, `SummarySidebar`, `MobileSummaryDrawer`, `LiveAnnouncer`, `InsuranceStepProgress`. |
| [`src/components/layout/BrandHeader.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/layout/BrandHeader.tsx) | 13 | 52px slim header wrapper; delegates directly to `ApplicationHeader` organism. | `ApplicationHeader` from `../organisms/HeaderAndNavigation`. |
| [`src/components/layout/SummarySidebar.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/layout/SummarySidebar.tsx) | 354 | Sticky desktop quotation overview rail; displays live pro-rata math, SST, stamp duty, rate lock timer. | `WorkflowContext`, Lucide icons, `tokens.css`. |
| [`src/components/layout/MobileSummaryDrawer.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/layout/MobileSummaryDrawer.tsx) | 245 | Collapsible mobile bottom drawer for quotation summaries on viewports < 1024px. | `WorkflowContext`, Lucide icons. |
| [`src/components/layout/AppFooter.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/layout/AppFooter.tsx) | 294 | Legal & regulatory footer; BNM, PIDM, MMC notices, links to PDS, T&C, Privacy Policy. | Lucide icons, `tokens.css`. |
| [`src/features/coverage/Stage1CoverageForm.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/features/coverage/Stage1CoverageForm.tsx) | 1,344 | **Stage 1 Screen:** Doctor classification, liability limit tier selection, start date, partner promo code. | `WorkflowContext`, `classifications.ts`, `ratingService.ts`, `CoverageModals.tsx`. |
| [`src/features/quote/Stage2QuoteReview.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/features/quote/Stage2QuoteReview.tsx) | 1,619 | **Stage 2 Screen:** Base quote breakdown, add-on selection (Clinic, PIC, Locum), pro-rata math, 15m rate lock. | `WorkflowContext`, `ratingService.ts`, `QuoteModals.tsx`. |
| [`src/features/particulars/Stage3ParticularsForm.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/features/particulars/Stage3ParticularsForm.tsx) | 1,523 | **Stage 3 Screen (Part A):** Doctor profile, NRIC, MMC number, practice address, clinic name. | `WorkflowContext`, `BranchManager.tsx`, `UnderwritingQuestionnaire.tsx`, `NricPromoSubstitutionModal.tsx`, `DuplicatePolicyModal.tsx`. |
| [`src/features/particulars/BranchManager.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/features/particulars/BranchManager.tsx) | 692 | **Stage 3 Screen (Part B):** Clinic branch repeaters, branch revenue allocation, RM 5,000,000 ceiling check. | `types.ts`, Lucide icons. |
| [`src/features/underwriting/UnderwritingQuestionnaire.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/features/underwriting/UnderwritingQuestionnaire.tsx) | 1,501 | **Stage 3 Screen (Part C):** 5 statutory underwriting declarations, COVID risk questions, narrative disclosures. | `types.ts`, `sanitizer.ts`, Lucide icons. |
| [`src/features/review/Stage4ReviewAndPayment.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/features/review/Stage4ReviewAndPayment.tsx) | 1,347 | **Stage 4 Screen:** Final policy summary, statutory consent checkboxes, FPX and Card payment selection, handoff. | `WorkflowContext`, `ratingService.ts`, `paymentService.ts`. |
| [`src/features/confirmation/Stage5PolicyConfirmation.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/features/confirmation/Stage5PolicyConfirmation.tsx) | 897 | **Stage 5 Screen:** Policy confirmation banner, policy schedule download, tax invoice receipt, email status. | `WorkflowContext`, Lucide icons. |
| [`src/features/scaffolds/ReferralScaffold.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/features/scaffolds/ReferralScaffold.tsx) | 533 | **Referral Screen:** Adverse declaration referral outcome, specialist underwriter callback request form. | `WorkflowContext`, `underwritingService.ts`. |

---

## 3. Active Secondary Workflows & Modals

| Modal File Path | Lines | Trigger Condition & Purpose |
|:---|:---:|:---|
| [`src/features/renewal/RenewalFlowModal.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/features/renewal/RenewalFlowModal.tsx) | 764 | Header "Renew Policy" click or `/renew` route. Mobile/NRIC lookup with 6-digit SMS & WhatsApp OTP authentication. |
| [`src/features/quote/RetrieveQuoteModal.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/features/quote/RetrieveQuoteModal.tsx) | 685 | Header "Retrieve Quote" click or `/retrieve-quote` route. Loads saved quote by token / reference number. |
| [`src/components/layout/DocumentCenterModal.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/layout/DocumentCenterModal.tsx) | 619 | Header "Document Center" or footer links. Displays official Chubb Policy Wording, PDS, T&C, and Privacy Notice PDFs. |
| [`src/features/particulars/NricPromoSubstitutionModal.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/features/particulars/NricPromoSubstitutionModal.tsx) | 148 | Stage 3 NRIC blur. Replaces new-customer promo code with renewal discount when existing policyholder detected. |
| [`src/features/particulars/DuplicatePolicyModal.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/features/particulars/DuplicatePolicyModal.tsx) | 156 | Stage 3 NRIC blur. Intercepts submission if applicant holds an active in-force policy for the same period. |
| [`src/features/coverage/CoverageModals.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/features/coverage/CoverageModals.tsx) | 260 | Stage 1 "Why is this required?" info modals for classification and Clause 6.12 backdating rules. |
| [`src/features/quote/QuoteModals.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/features/quote/QuoteModals.tsx) | 312 | Stage 2 email quote modal, add-on explanation sheets, and rate lock extension dialogue. |

---

## 4. Core Business Services & State Management

| File Path | Lines | Responsibilities & Integration Status |
|:---|:---:|:---|
| [`src/core/api/httpClient.ts`](file:///c:/Users/salee/Downloads/Portal_ds/src/core/api/httpClient.ts) | 208 | HTTP client gateway; enforces `isMockAllowed()`, UUID v4 idempotency keys, RFC 7807 problem details, retries. |
| [`src/core/api/ratingService.ts`](file:///c:/Users/salee/Downloads/Portal_ds/src/core/api/ratingService.ts) | 431 | Authoritative actuarial rating algorithms; pro-rata fraction math, SST 8%, stamp duty, promo code validation. |
| [`src/core/api/underwritingService.ts`](file:///c:/Users/salee/Downloads/Portal_ds/src/core/api/underwritingService.ts) | 360 | Master underwriting triage; DT-IND/CLN/BRN rules, sanctions screening gate, RM 5M ceiling, callback dispatcher. |
| [`src/core/api/paymentService.ts`](file:///c:/Users/salee/Downloads/Portal_ds/src/core/api/paymentService.ts) | 339 | Payment handoff & verification; idempotency ledger (`PROCESSED_IDEMPOTENCY_LEDGER`), policy issuance generator. |
| [`src/core/api/renewalService.ts`](file:///c:/Users/salee/Downloads/Portal_ds/src/core/api/renewalService.ts) | 504 | Renewal policy lookup, SMS/WhatsApp OTP store (`OTP_STORE`), 60s cooldown, customer NRIC recognition. |
| [`src/core/data/classifications.ts`](file:///c:/Users/salee/Downloads/Portal_ds/src/core/data/classifications.ts) | 318 | 24 approved medical practitioner classifications and liability limit options (RM 500k to RM 5M). |
| [`src/core/state/WorkflowContext.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/core/state/WorkflowContext.tsx) | 436 | Central React workflow context; manages draft persistence in `sessionStorage`, stage transitions, rate locks. |
| [`src/core/state/types.ts`](file:///c:/Users/salee/Downloads/Portal_ds/src/core/state/types.ts) | 370 | TypeScript domain models; `DoctorProfile`, `CoverageParameters`, `QuoteBreakdown`, `UnderwritingDeclarations`. |
| [`src/core/telemetry/logger.ts`](file:///c:/Users/salee/Downloads/Portal_ds/src/core/telemetry/logger.ts) | 176 | Production structured logger; redacts NRIC, mobile numbers, emails, and payment tokens. |
| [`src/core/utils/sanitizer.ts`](file:///c:/Users/salee/Downloads/Portal_ds/src/core/utils/sanitizer.ts) | 165 | Anti-XSS sanitization functions (`sanitizeText`, `sanitizeNric`, `sanitizePhone`, `sanitizeEmail`). |

---

## 5. Design System & Component Library

### 5.1 Design System Foundations (`src/design-system/`)
- [`src/design-system/tokens.ts`](file:///c:/Users/salee/Downloads/Portal_ds/src/design-system/tokens.ts) (193 lines) — Strongly typed TypeScript tokens for primitive colors, semantic roles, spacing, radius, fonts.
- [`src/design-system/tokens.css`](file:///c:/Users/salee/Downloads/Portal_ds/src/design-system/tokens.css) (281 lines) — CSS custom properties (`--ds-primitive-...`, `--ds-color-...`). Includes accessible teal variants `#066F7B` and `#055C66`.
- [`src/design-system/tokens.json`](file:///c:/Users/salee/Downloads/Portal_ds/src/design-system/tokens.json) (240 lines) — Machine-readable design token data.
- [`src/design-system/foundation.css`](file:///c:/Users/salee/Downloads/Portal_ds/src/design-system/foundation.css) (265 lines) — Base utility classes for containers, panels, grids, and headings.
- [`src/design-system/index.ts`](file:///c:/Users/salee/Downloads/Portal_ds/src/design-system/index.ts) (25 lines) — Barrel export.

### 5.2 UI Primitives (`src/components/ui/`)
- `Button.tsx` (168 lines) — Base button with primary, secondary, outline, and ghost variants (36px, 40px, 44px).
- `FieldFeedback.tsx` (145 lines) — Accessible field-level error messages, warning hints, and helper text (`role="alert"`).
- `SelectCombobox.tsx` (215 lines) — Searchable combobox for long lists (medical classifications and specializations).
- `SelectionControls.tsx` (185 lines) — Accessible radio buttons, checkboxes, and segmented switch controls.
- `TextInput.tsx` (140 lines) — Accessible input primitive with prefix icons, clear buttons, and error states.
- `Textarea.tsx` (120 lines) — Multiline narrative input for underwriting disclosures.
- `Typography.tsx` (175 lines) — Heading (`H1` to `H6`), `Text`, `Label`, `Caption`, and `Badge` primitives enforcing Kanit weight <= 500.
- `FeedbackModals.tsx` (190 lines) — Lightweight accessible modal dialog wrapper with focus trapping.

### 5.3 Form Molecules (`src/components/form/` — 20 Files)
- `AccessibleDisclosureTrigger.tsx`, `ChoiceSelectors.tsx`, `ConditionalFollowUpField.tsx`, `ContactFields.tsx`, `CurrencyAndPriceDisplay.tsx`, `DateField.tsx`, `DocumentLinkGroup.tsx`, `InlineEditAction.tsx`, `InsuranceDateRange.tsx`, `LabeledSelect.tsx`, `LabeledTextField.tsx`, `LegalConsentCheckbox.tsx`, `OtpDigitEntry.tsx`, `PercentageAllocationRow.tsx`, `PromoCodeField.tsx`, `RepeatingBranchRow.tsx`, `SearchableClassificationSelector.tsx`, `SearchableSpecializationSelector.tsx`, `ValidationMessageGroup.tsx`, `index.ts`.

### 5.4 Layout Organisms (`src/components/organisms/` — 8 Files)
- `ComplianceAndOutcomes.tsx`, `FinancialSummaries.tsx`, `HeaderAndNavigation.tsx`, `InsuranceCoverageCards.tsx`, `PageLayoutStructures.tsx`, `UnderwritingAndBranches.tsx`, `VerificationAndReview.tsx`, `index.ts`.

---

## 6. Dead & Unreferenced Scaffold Files

The following 4 scaffold files in [`src/features/scaffolds/`](file:///c:/Users/salee/Downloads/Portal_ds/src/features/scaffolds/) are completely unreferenced in both the production application and test suite:
1. `src/features/scaffolds/Stage1CoverageScaffold.tsx` (180 lines)
2. `src/features/scaffolds/Stage2QuoteScaffold.tsx` (210 lines)
3. `src/features/scaffolds/Stage3UnderwritingScaffold.tsx` (245 lines)
4. `src/features/scaffolds/ConfirmationScaffold.tsx` (160 lines)

*(Note: `Stage4ReviewScaffold.tsx` is imported in `src/test/stage3.test.tsx` for test mocking, and `ReferralScaffold.tsx` is actively mounted in `App.tsx` for the `/referral` route).*

---

## 7. Active Test Suite Files (`src/test/`)

| Test File Path | Tests | Active Target |
|:---|:---:|:---|
| `src/test/setup.ts` | — | JSDOM polyfills: `crypto.randomUUID`, `window.matchMedia`, `ResizeObserver`. |
| `src/test/components.test.tsx` | 7 | UI Primitives in `src/components/ui/` and `src/components/insurance/`. |
| `src/test/form_molecules.test.tsx` | 16 | Form Molecules in `src/components/form/`. |
| `src/test/organisms_and_compositions.test.tsx` | 18 | Organisms in `src/components/organisms/`. |
| `src/test/shell.test.tsx` | 7 | `AppShell`, `BrandHeader`, `SummarySidebar`, `AppFooter`. |
| `src/test/stage1.test.tsx` | 9 | `Stage1CoverageForm.tsx` and `ratingService.ts`. |
| `src/test/stage2.test.tsx` | 8 | `Stage2QuoteReview.tsx` and rate lock timers. |
| `src/test/stage3.test.tsx` | 11 | `Stage3ParticularsForm.tsx`, `BranchManager`, `UnderwritingQuestionnaire`. |
| `src/test/stage4.test.tsx` | 10 | `Stage4ReviewAndPayment.tsx` and `Stage5PolicyConfirmation.tsx`. |
| `src/test/secondary_features.test.tsx` | 11 | `RenewalFlowModal`, `RetrieveQuoteModal`, `DocumentCenterModal`. |
| `src/test/security_and_reliability.test.tsx` | 17 | `sanitizer.ts`, `logger.ts`, idempotency checks. |
| `src/test/e2e_scenarios.test.tsx` | 6 | Multi-step end-to-end customer journeys. |

---
*Report certified by Independent Staff Software Engineer & Technical Recovery Architect.*

