# DOCTORSHIELD — REFERENCE-TO-REQUIREMENT APPLICATION MATRIX
## Mapping Benchmark Interaction Patterns to Verified DoctorShield Production Tasks

```
==================================================================================================
DOCUMENT CLASSIFICATION:  [VERIFIED] BENCHMARK APPLICATION MATRIX
PHASE:                    Phase 02 — Insurance UX & Visual Benchmark Research
AUTHORITY:                Principal Product Architect & Staff UX Engineer
DATE OF ENACTMENT:        2026-10-30
SCOPE:                    Screen-by-Screen Implementation Blueprint (Stages 1–5, Shell, Modals)
GOVERNING RULES:          DoctorShield Product Engineering & Design Rules (Version 2.0)
CODEBASE SCOPE:           Strictly Read-Only (Zero Code Modifications)
==================================================================================================
```

---

## 1. Executive Summary

This matrix establishes the **direct, verified mapping** between the benchmark patterns identified in QIC Online, Ditto Insurance, ACKO, and Baymard Institute research, and the physical implementation requirements of the DoctorShield portal.

Every recommended visual and interaction pattern is tied directly to a verified customer task, an approved engineering component, and a specific governing rule. **Zero new product content or invented insurance benefits are introduced.**

---

## 2. Master Reference-to-Requirement Application Matrix

| Pattern ID | Benchmark Source Pattern | Originating Benchmark | Target DoctorShield Screen / Component | Verified User Task / Problem Solved | Applicable Governing Rule |
|:---|:---|:---|:---|:---|:---:|
| **PAT-01** | **65/35 Desktop Grid Split** | QIC Online | `AppShell.tsx`, Stages 1–4 | Provides continuous visible alignment between input forms and real-time quotation summary. | Rules v2.0 §8 (Desktop Layout) |
| **PAT-02** | **Slim Institutional Header** (52px) | QIC Online | `BrandHeader.tsx` $\rightarrow$ `ApplicationHeader` | Eliminates massive hero banners; anchors brand, underwriter, step progress, and emergency utilities. | Rules v2.0 §5 (Minimal Chrome) |
| **PAT-03** | **Interactive Limit Selection Tiles** | ACKO | `LiabilityLimitSelector.tsx` | Replaces native dropdowns with responsive clickable cards (RM 500k to RM 5M) showing annual base rates. | Rules v2.0 §9 (Visible Selection States) |
| **PAT-04** | **Modular Add-On Cards with Price Deltas** | ACKO | `Stage2QuoteReview.tsx` | Communicates exact pro-rated financial impact (`+RM 350.00`) before doctor toggles coverage. | Rules v2.0 §3 (Transparent Pricing) |
| **PAT-05** | **Plain-Language Inline Expanders** | Ditto Insurance | `AccessibleDisclosureTrigger.tsx` | Explains complex terms (Clause 6.12, CKAPS, PIC) contextually without obscuring the form. | Rules v2.0 §4 (Progressive Disclosure) |
| **PAT-06** | **Sub-Step Wizard Chunking** | Baymard Research | `Stage3ParticularsForm.tsx` | Breaks 4,240px mobile form into 3 manageable sub-steps (Particulars $\rightarrow$ Clinic $\rightarrow$ Declarations). | Rules v2.0 §8 (Mobile Ergonomics) |
| **PAT-07** | **Two-Option Segmented Toggles** (44px) | Ditto Insurance | `ChoiceSelectors.tsx` | Simplifies medical declarations into binary Yes/No choices with compliant mobile touch targets. | Rules v2.0 §8 (44px Touch Targets) |
| **PAT-08** | **Auto-Balancing Revenue Inputs** | Baymard Research | `BranchManager.tsx` | System validates 100% turnover allocations and checks the RM 5,000,000 combined ceiling. | Rules v2.0 §3 (Underwriting Rules) |
| **PAT-09** | **Tabular Financial Ledger** | QIC Online | `SummarySidebar.tsx`, `Stage4Review` | Right-aligns tabular numerals for gross base, discounts, SST 8%, and stamp duty; zero sticker shock. | Rules v2.0 §5 (Transparent Pricing) |
| **PAT-10** | **Mobile Sticky Action Bar** | ACKO | `MobileSummaryDrawer.tsx`, `AppShell` | Keeps total payable and primary step action anchored at the bottom of small viewports. | Rules v2.0 §8 (No Obscuring Disclosures) |
| **PAT-11** | **Calm Specialist Underwriting Handoff** | Ditto Insurance | `ReferralScaffold.tsx` | Replaces blunt error screens with a reassuring underwriter review ticket and callback scheduling. | Rules v2.0 §9 (System Feedback) |
| **PAT-12** | **Slide-Over Statutory Document Vault** | QIC Online | `DocumentCenterModal.tsx` | Houses Chubb Policy Wording, PDS, T&C, and Privacy Notices in a single accessible hub. | Rules v2.0 §4 (Legally Required Content) |

---

## 3. Screen-by-Screen Implementation Blueprint

### 3.1 Stage 1: Initial Coverage Configuration (`Stage1CoverageForm.tsx`)
- **Primary User Task:** Select practitioner classification and indemnity limit to obtain an instant indicative rate.
- **Applied Benchmark Synthesis:**
  - *ACKO Pattern:* Clickable liability limit tiles (`LiabilityLimitSelector`) with the default RM 1,000,000 tier pre-selected as "Most Popular".
  - *QIC Pattern:* Clean 2-column input grid for classification combobox, inception date picker, and practitioner email.
  - *Baymard Pattern:* Explicit "Why is this required?" disclosure link next to MMC registration and classification fields.
- **Preserved Business Constraints:** 9-month forward inception ceiling (`RULE-DATE-01`); Clause 6.12 retroactive agreement dialogue for backdated policies (`RULE-DATE-02`).

### 3.2 Stage 2: Quotation & Optional Add-ons (`Stage2QuoteReview.tsx`)
- **Primary User Task:** Review calculated premium, select eligible clinic/PIC add-on protections, and lock rate.
- **Applied Benchmark Synthesis:**
  - *ACKO Pattern:* Modular coverage cards for Clinic Entity Establishment, Person-In-Charge (PIC), and Locum coverage, displaying pro-rated price deltas (`+RM 350.00 / year`).
  - *Ditto Pattern:* One-sentence plain-language benefit descriptions explaining *what* is covered, supported by inline contextual disclosure triggers.
  - *Baymard Pattern:* Persistent desktop summary rail showing the live recalculated total payable with SST 8% and Stamp Duty RM 10.00.
- **Preserved Business Constraints:** Automatic complimentary reinstatement banner; strict 15-minute price lock countdown; downstream clinic dependency rules (`RULE-CAD-01`, `RULE-PIC-01`).

### 3.3 Stage 3: Particulars, Clinic Branches & Underwriting (`Stage3ParticularsForm.tsx`)
- **Primary User Task:** Input doctor credentials, manage clinic branch details, and declare 5-year claims history.
- **Applied Benchmark Synthesis:**
  - *Baymard Pattern:* **Decompose monolithic 4,240px form into 3 manageable sub-steps**:
    - Sub-step 3.1: Doctor Identity (Full Name, NRIC auto-formatting, MMC #, Practice Address).
    - Sub-step 3.2: Clinic Facilities & Branch Allocation (Only shown if private clinic owner).
    - Sub-step 3.3: Statutory Medical Underwriting Declarations.
  - *Ditto Pattern:* Two-option segmented choice selectors (`Agree` / `Disagree`, `Yes` / `No`) for all 5 statutory questions.
  - *QIC Pattern:* Auto-formatting NRIC input with inline extraction of Date of Birth and Gender.
- **Preserved Business Constraints:** Sanctions screening gate (`DT-IND-06`); RM 5,000,000 branch turnover ceiling (`RULE-BRN-02`); NRIC promo code auto-substitution (`RULE-PROM-02`).

### 3.4 Stage 4: Final Review & Checkout (`Stage4ReviewAndPayment.tsx`)
- **Primary User Task:** Verify comprehensive policy summary, execute statutory disclosures, and select payment method.
- **Applied Benchmark Synthesis:**
  - *QIC Pattern:* Clean, structured financial review table with left-aligned line items and right-aligned tabular numerals.
  - *Baymard Pattern:* Unambiguous, un-ticked affirmative consent checkboxes with direct links to view the full statutory documents.
  - *ACKO Pattern:* Two-tab corporate payment switch: Personal Banking / FPX B2C vs Corporate Internet Banking (FPX B2B).
- **Preserved Business Constraints:** Verbatim BNM 10% direct distribution rebate disclosure; Schedule 9 FSA 2013 duty of disclosure; PDPA 2010 consent; PCI-DSS SAQ-A compliant gateway handoff.

### 3.5 Stage 5: Policy Issuance & Confirmation (`Stage5PolicyConfirmation.tsx`)
- **Primary User Task:** Download Certificate of Insurance (COI), policy schedule, and official tax invoice receipt.
- **Applied Benchmark Synthesis:**
  - *Ditto Pattern:* Calm, reassuring confirmation banner celebrating successful policy binding without noisy confetti animations.
  - *QIC Pattern:* Structured download card grid providing one-click PDF downloads for Certificate of Insurance, Schedule, Policy Wording, and Official Receipt.

---

## 4. Anti-Patterns Explicitly Prohibited Across All Stages

```
+---------------------------------------------------------------------------------------+
|  PROHIBITED COMPETITOR ANTI-PATTERNS (Rules v2.0 §5)                                  |
+---------------------------------------------------------------------------------------+
|  1. Flashing Urgency Countdowns (e.g. ACKO red alert clocks) ──> Prohibited.         |
|  2. Pre-Ticked Paid Add-ons (e.g. aggressive cross-sells)     ──> Prohibited by BNM.  |
|  3. Casual Slang Microcopy (e.g. consumer app tone)           ──> Prohibited.         |
|  4. Nested Containers / Card-in-Card Hierarchies               ──> Prohibited.         |
|  5. Hover-Only Floating Tooltips                              ──> Prohibited (Baymard)|
|  6. Generic SaaS Dashboard Sidebars                           ──> Prohibited.         |
|  7. Unbalanced Mobile Horizontal Tables                       ──> Prohibited.         |
+---------------------------------------------------------------------------------------+
```

---
*Report certified by Principal Product Architect & Staff UX Engineer.*

