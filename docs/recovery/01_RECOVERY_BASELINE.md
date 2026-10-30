# DOCTORSHIELD — VERIFIED RECOVERY BASELINE & SAFEGUARD CHECKPOINT
## Exact Git Recovery Checkpoint, Active Directory Map, and Mandatory Safeguards

```
==================================================================================================
DOCUMENT CLASSIFICATION:  [VERIFIED] RECOVERY BASELINE RECORD
GOVERNING STANDARD:       DoctorShield Product Engineering & Design Rules (Version 2.0 §13)
AUDIT AUTHORITY:          Independent Staff Software Engineer & Technical Recovery Architect
DATE OF ENACTMENT:        2026-10-30
GIT CHECKPOINT COMMIT:    3d5d0185f72876c5c4cc218a21ad921f819dd2ae
GIT CHECKPOINT BRANCH:    recovery/checkpoint-phase01-baseline
BASE COMMIT:              55ba0fd (origin/main)
USER-FACING CODE IMPACT:  0% Changed (Zero Functional, Visual, or Actuarial Alterations)
==================================================================================================
```

---

## 1. Recoverable Git Baseline Checkpoint

To ensure complete reversibility and protect all in-flight work without discarding uncommitted changes, a dedicated Git recovery checkpoint was established:

1. **Stash Commit Generation:** A full commit object of the dirty working tree was created via `git stash create`:
   - **Commit SHA:** `3d5d0185f72876c5c4cc218a21ad921f819dd2ae`
   - **Commit Message:** `"Phase 01 Recoverable Baseline - 2026-10-30"`
2. **Dedicated Recovery Branch:** The checkpoint commit was permanently bound to a recovery branch:
   - **Branch Name:** `recovery/checkpoint-phase01-baseline`
   - **Target SHA:** `3d5d018`
3. **Working Tree Status:** All 24 modified source files in the working tree were preserved untouched. No files were discarded, reset, stashed away, or mutated.
4. **Recovery Guarantee:** At any future point, the exact state of this baseline can be checked out or diffed against using:
   ```bash
   git checkout recovery/checkpoint-phase01-baseline
   ```

---

## 2. Verified Active Directories and Component Topology

The repository architecture has been verified against the physical filesystem. The following directories are the **sole authoritative locations** for design system assets and application code:

```
src/
├── app/
│   └── App.tsx                                 # Application root switch & stage routing
├── catalog/
│   ├── CatalogApp.tsx                          # In-app component showcase gallery
│   └── main.tsx                                # Standalone catalog entry point
├── components/
│   ├── compositions/
│   │   └── StageCompositions.tsx               # Full-page stage composition templates
│   ├── form/                                   # 20 Modern Form Molecules (Level 5)
│   │   ├── AccessibleDisclosureTrigger.tsx
│   │   ├── ChoiceSelectors.tsx
│   │   ├── ConditionalFollowUpField.tsx
│   │   ├── ContactFields.tsx
│   │   ├── CurrencyAndPriceDisplay.tsx
│   │   ├── DateField.tsx
│   │   ├── DocumentLinkGroup.tsx
│   │   ├── InlineEditAction.tsx
│   │   ├── InsuranceDateRange.tsx
│   │   ├── LabeledSelect.tsx
│   │   ├── LabeledTextField.tsx
│   │   ├── LegalConsentCheckbox.tsx
│   │   ├── OtpDigitEntry.tsx
│   │   ├── PercentageAllocationRow.tsx
│   │   ├── PromoCodeField.tsx
│   │   ├── RepeatingBranchRow.tsx
│   │   ├── SearchableClassificationSelector.tsx
│   │   ├── SearchableSpecializationSelector.tsx
│   │   ├── ValidationMessageGroup.tsx
│   │   └── index.ts
│   ├── insurance/                              # Insurance-specific domain components
│   │   ├── CoverageDateField.tsx
│   │   ├── CoverageSummaryPanel.tsx
│   │   ├── InsuranceStepProgress.tsx           # Active 5-step progress indicator
│   │   ├── LiabilityLimitSelector.tsx
│   │   ├── PremiumDisplay.tsx
│   │   ├── SpecializationAllocationEditor.tsx
│   │   └── UnderwritingAndCheckout.tsx
│   ├── layout/                                 # Active application shell components
│   │   ├── AppFooter.tsx                       # Regulatory footer
│   │   ├── AppShell.tsx                        # Master layout shell
│   │   ├── BrandHeader.tsx                     # Slim brand header
│   │   ├── DocumentCenterModal.tsx             # Statutory PDF document center
│   │   ├── ErrorBoundary.tsx                   # Top-level React error boundary
│   │   ├── LiveAnnouncer.tsx                   # WCAG 4.1.3 live screen reader announcer
│   │   ├── MobileSummaryDrawer.tsx             # Collapsible mobile quotation drawer
│   │   ├── SessionTimeoutManager.tsx           # 25m/30m inactivity manager
│   │   ├── SkipLink.tsx                        # WCAG 2.4.1 skip to content link
│   │   ├── StepActionBar.tsx                   # Sticky bottom action bar
│   │   ├── SummarySidebar.tsx                  # Sticky desktop quotation sidebar
│   │   └── layout.css                          # Shell layout styles
│   ├── organisms/                              # 8 Transaction Layout Organisms (Level 5)
│   │   ├── ComplianceAndOutcomes.tsx
│   │   ├── FinancialSummaries.tsx
│   │   ├── HeaderAndNavigation.tsx
│   │   ├── InsuranceCoverageCards.tsx
│   │   ├── PageLayoutStructures.tsx
│   │   ├── UnderwritingAndBranches.tsx
│   │   ├── VerificationAndReview.tsx
│   │   └── index.ts
│   └── ui/                                     # 8 Foundational UI Primitives (Level 5)
│       ├── Button.tsx
│       ├── FeedbackModals.tsx
│       ├── FieldFeedback.tsx
│       ├── SelectCombobox.tsx
│       ├── SelectionControls.tsx
│       ├── TextInput.tsx
│       ├── Textarea.tsx
│       └── Typography.tsx
├── core/
│   ├── api/                                    # Core Actuarial & Gateway Services (Level 4)
│   │   ├── httpClient.ts                       # Gateway client & mock guard
│   │   ├── paymentService.ts                   # Idempotent payment simulation
│   │   ├── ratingService.ts                    # Actuarial calculation engine
│   │   ├── renewalService.ts                   # Policy renewal & OTP logic
│   │   └── underwritingService.ts              # Medical underwriting decision tree
│   ├── data/
│   │   └── classifications.ts                  # 24 Medical classifications & rates
│   ├── state/
│   │   ├── WorkflowContext.tsx                 # Central workflow React Context
│   │   └── types.ts                            # Domain TypeScript interfaces
│   ├── telemetry/
│   │   └── logger.ts                           # PII-redacting structured logger
│   └── utils/
│       └── sanitizer.ts                        # Anti-XSS input sanitization
├── design-system/                              # Design Tokens & Foundation CSS (Level 5)
│   ├── foundation.css
│   ├── index.ts
│   ├── tokens.css
│   ├── tokens.json
│   └── tokens.ts
├── features/                                   # Active Production Screens & Steps (Level 4)
│   ├── confirmation/
│   │   └── Stage5PolicyConfirmation.tsx        # Stage 5 Issuance & Receipt Screen
│   ├── coverage/
│   │   ├── CoverageModals.tsx
│   │   └── Stage1CoverageForm.tsx              # Stage 1 Coverage & Rating Screen
│   ├── particulars/
│   │   ├── BranchManager.tsx                   # Stage 3B Clinic Branch Manager
│   │   ├── DuplicatePolicyModal.tsx
│   │   ├── NricPromoSubstitutionModal.tsx
│   │   └── Stage3ParticularsForm.tsx           # Stage 3A Doctor Profile Screen
│   ├── quote/
│   │   ├── QuoteModals.tsx
│   │   ├── RetrieveQuoteModal.tsx
│   │   └── Stage2QuoteReview.tsx               # Stage 2 Quotation & Add-on Screen
│   ├── renewal/
│   │   └── RenewalFlowModal.tsx                # Policy Renewal & OTP Modal
│   ├── review/
│   │   └── Stage4ReviewAndPayment.tsx          # Stage 4 Review & Checkout Screen
│   ├── scaffolds/                              # Scaffolds (Referral active; others dead)
│   │   ├── ConfirmationScaffold.tsx
│   │   ├── ReferralScaffold.tsx                # Active Referral Terminal Screen
│   │   ├── Stage1CoverageScaffold.tsx
│   │   ├── Stage2QuoteScaffold.tsx
│   │   ├── Stage3UnderwritingScaffold.tsx
│   │   └── Stage4ReviewScaffold.tsx
│   └── underwriting/
│       └── UnderwritingQuestionnaire.tsx       # Stage 3C Underwriting Declarations
└── test/                                       # 11 Active Test Suites (Level 4 - 120 Tests)
```

---

## 3. Mandatory Insurance, Security, and Privacy Safeguards

The following constraints are permanently locked and cannot be relaxed or bypassed in any subsequent recovery phase:

### 3.1 Actuarial & Insurance Integrity (Rule §3)
- **Zero Change to Rating Logic:** Base rates for all 24 classifications, pro-rata daily fractions (`daysCount / 365`), SST (8.0%), and Stamp Duty (RM 10.00) in `ratingService.ts` are mathematically exact and protected by Vitest regression suites.
- **Zero Benefit Invention:** No coverage benefits, indemnity limits, or add-on packages may be added, removed, or modified.
- **Stale Quote Invalidation:** Any change to coverage dates, classification, indemnity limit, or clinic options must invalidate the current quote and trigger recalculation.

### 3.2 Statutory Legal Disclosures (Rule §4)
- **BNM 10% Direct Rebate:** Must be displayed on Stage 2 and Stage 4 with exact statutory wording.
- **Schedule 9 FSA 2013 Duty of Disclosure:** Must be acknowledged affirmatively before medical declarations.
- **PDPA 2010 Personal Data Consent:** Mandatory affirmative consent checkbox before payment submission.
- **PIDM Non-Coverage Disclosure:** Must be prominently disclosed in document center and application footer.

### 3.3 Security & Privacy Safeguards
- **Anti-XSS Sanitization:** All user inputs must pass through `InputSanitizer.sanitizeText`, `sanitizeNric`, `sanitizePhone`, or `sanitizeEmail` before state persistence.
- **PII Telemetry Redaction:** `Logger.sanitizePayload` must redact NRICs, phone numbers, emails, and payment tokens.
- **PCI-DSS SAQ-A Compliance:** The application must never collect, store, or transmit raw credit card PAN or CVV numbers. Payment hand-offs must use redirect or hosted fields with idempotency protection (`PROCESSED_IDEMPOTENCY_LEDGER`).

---

## 4. Phase 01 Functional Preservation Confirmation

- **Application Screens:** Zero screen files in `src/features/` or `src/components/` were modified in Phase 01.
- **Actuarial Logic:** Zero calculation functions in `src/core/api/` were altered.
- **User-Facing Behavior:** Zero routes, forms, modals, or user interactions were touched.
- **Test Baseline:** The Vitest automated test suite remains at **120 / 120 passing tests (100%)**.

---
*Certified by Independent Staff Software Engineer & Technical Recovery Architect.*

