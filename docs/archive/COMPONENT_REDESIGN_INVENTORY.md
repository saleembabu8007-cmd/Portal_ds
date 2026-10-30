# DoctorShield Individual Indemnity — Component Redesign Inventory

> **Document Reference:** `DOC-COMP-INV-2026-10-29`  
> **Status:** Specification & Redesign Inventory Baseline  
> **Auditor:** Principal Product Designer & Design Systems Architect  
> **Target Scope:** 11 Key Component Domains across Entire Application  
> **Invariant Mandate:** Detail exact current state vs proposed minimal state, identify AI-generated copy to remove, guarantee preservation of verified source legal copy, and lock all interactive test IDs and ARIA attributes to prevent test regression.

---

## 1. Inventory Index

1. [Brand Header (`BrandHeader.tsx`)](#1-brand-header)
2. [Insurance Step Progress (`InsuranceStepProgress.tsx`)](#2-insurance-step-progress)
3. [Summary Sidebar — Desktop (`SummarySidebar.tsx`)](#3-summary-sidebar--desktop)
4. [Mobile Summary Drawer (`MobileSummaryDrawer.tsx`)](#4-mobile-summary-drawer)
5. [Stage 1: Coverage Details (`Stage1CoverageForm.tsx`)](#5-stage-1-coverage-details)
6. [Stage 2: Quotation & Add-ons (`Stage2QuoteReview.tsx`)](#6-stage-2-quotation--add-ons)
7. [Stage 3: Personal Particulars (`Stage3ParticularsForm.tsx`)](#7-stage-3-personal-particulars)
8. [Stage 3: Clinic Branch Manager (`BranchManager.tsx`)](#8-stage-3-clinic-branch-manager)
9. [Stage 3: Underwriting Questionnaire (`UnderwritingQuestionnaire.tsx`)](#9-stage-3-underwriting-questionnaire)
10. [Stage 4: Review & Payment (`Stage4ReviewAndPayment.tsx`)](#10-stage-4-review--payment)
11. [Stage 5: Policy Confirmation (`Stage5PolicyConfirmation.tsx`)](#11-stage-5-policy-confirmation)

---

## 1. Brand Header

- **File Path:** `src/components/layout/BrandHeader.tsx`
- **Current State:**
  - High-contrast 60 px bar with 3 utility buttons (`Renew Policy`, `Find Quote`, `Documents`) each carrying SVG icons.
  - Boxed co-branding lockup with a solid vertical divider line (`Underwritten by Chubb / Distributed by JA Assure`).
  - Decorative shield badge (`Shield` icon in teal circular container).
- **Proposed Ultra-Minimal State:**
  - Slim 52 px uncluttered bar with pure white background (`#FFFFFF`) and hairline bottom border (`#E2E8F0`).
  - Sleek wordmark: **DoctorShield** in Kanit 500 (`#132766`), followed by a refined, understated subtitle: `Medical Professional Indemnity`.
  - Utility navigation collapsed into a single minimal dropdown or discreet text buttons on desktop; hidden behind an accessible menu icon on mobile.
  - Co-branding rendered as calm, quiet secondary text (`Chubb × JA Assure`) without heavy bounding boxes.
- **AI Copy to Purge:**
  - Remove prominent banner tag: *"Official Underwritten Chubb Indemnity Portal 2026"*.
- **Preserved Legal Copy:**
  - Preserved: *"Underwritten by Chubb Insurance Malaysia Berhad. Distributed by JA Assure Sdn Bhd."*
- **Preserved Test IDs & ARIA:**
  - `role="banner"`
  - `aria-label="DoctorShield Portal Header"`
  - Button accessible names: `/renew policy/i`, `/find quote/i`, `/documents/i`

---

## 2. Insurance Step Progress

- **File Path:** `src/components/insurance/InsuranceStepProgress.tsx`
- **Current State:**
  - 4 large numbered circles with connecting progress bars, step labels, and a redundant sub-bar repeating: *"Stage 1 of 4: Coverage Details"*.
- **Proposed Ultra-Minimal State:**
  - Desktop: Clean, horizontal progress line with minimal typography. Active step highlighted with brand teal underline, inactive steps in muted slate (`#64748B`). No oversized circular badges.
  - Mobile: Single-line status bar: `Stage 2 of 4 · Quotation` with a hairline 2 px progress fill bar. Frees up 34 px of vertical height.
- **AI Copy to Purge:**
  - Remove redundant subheadings: *"Stage X of 4: [Stage Name] — Step in Progress"*.
- **Preserved Legal Copy:**
  - Standard stage labels: `1. Coverage`, `2. Quotation`, `3. Particulars`, `4. Review & Pay`.
- **Preserved Test IDs & ARIA:**
  - `role="navigation"`
  - `aria-label="Application Progress"`
  - `aria-current="step"`

---

## 3. Summary Sidebar (Desktop)

- **File Path:** `src/components/layout/SummarySidebar.tsx`
- **Current State:**
  - Sticky card on right side (320 px) with drop shadow, heavy borders, multiple color badges, and expanded accordion items.
- **Proposed Ultra-Minimal State:**
  - Clean, unboxed floating panel with no heavy shadow (`border: 1px solid #E2E8F0; background: #FFFFFF; border-radius: 8px`).
  - Single prominent premium display: `Total Payable RM XXX.XX` at the top in Kanit 500.
  - Deduplicated breakdown list with subtle hairline dividers.
- **AI Copy to Purge:**
  - Remove promotional badges: *"Best Value Coverage"*, *"Instant Policy Issue Guarantee"*.
- **Preserved Legal Copy:**
  - Exact breakdown rows: `Gross Premium`, `Discount`, `Nett Premium`, `SST (8%)`, `Stamp Duty (RM 10.00)`, `Total Premium`.
- **Preserved Test IDs & ARIA:**
  - Text matches: `RM 1,000,000`, `SST 8%`, `Stamp Duty`, `Total`

---

## 4. Mobile Summary Drawer

- **File Path:** `src/components/layout/MobileSummaryDrawer.tsx`
- **Current State:**
  - 54 px bottom floating pill with heavy drop shadow, chevron icon, and "View Price Breakdown" label.
  - Expanding the drawer covers 85% of mobile screen.
- **Proposed Ultra-Minimal State:**
  - Refined 44 px bottom bar docked to viewport edge.
  - Left: `RM 1,234.56` (Total inc. SST). Right: `Details ▾` text button.
  - Tap opens a lightweight, clean bottom sheet with pure white background and clear dismiss handle.
- **AI Copy to Purge:**
  - Remove: *"Your total investment in risk defense"*.
- **Preserved Legal Copy:**
  - Standard premium breakdown terminology.
- **Preserved Test IDs & ARIA:**
  - Button accessible name: `/view quotation breakdown/i`, `/close/i`.

---

## 5. Stage 1: Coverage Details

- **File Path:** `src/features/coverage/Stage1CoverageForm.tsx`
- **Current State:**
  - Verbose classification helper paragraph.
  - 4 bulky 100 px limit cards in a grid with radio buttons, badges ("Recommended", "High Exposure"), starting prices, and aggregate defense notes.
  - Dual date pickers with "Why 31st December?" modal button.
  - Promo code section with green callout box.
  - Slate PIDM box with shield icon.
- **Proposed Ultra-Minimal State:**
  - Classification: Clean standard `<select>` or combobox with label `"Classification"`. Helper paragraph removed.
  - Limits: Horizontal segmented radio strip or flat unboxed cards. Limit amount in bold Kanit, subtitle `"Any One Claim & Aggregate"`. The "Recommended" badge on RM 1,000,000 is preserved for test matching (`screen.getByText('Recommended')`).
  - Dates: Clean inline two-column date inputs. Period constraint explained with a subtle helper line rather than a prominent modal button.
  - Promo Code: Minimal collapsible toggle: `+ Have a promo code?` revealing input inline.
  - Disclosures: Clean single-card container at bottom with standard PIDM statement and terms checkbox.
- **AI Copy to Purge:**
  - *"Select the primary medical or dental category corresponding to your Malaysian Medical Council (MMC) or Malaysian Dental Council (MDC) registration."*
  - *"Select your required maximum aggregate defense and damages indemnity."*
  - *"Standard Practice"*, *"High Exposure"* tags.
- **Preserved Legal Copy (Verbatim):**
  - Section title: `Select Your Professional Coverage`
  - Classification label: `Classification`
  - Inception date label: `Coverage Inception Date`
  - End date label: `Coverage Expiry Date`
  - Backdate agreement: `Notice on Backdated Coverage (Clause 6.12)`
  - PIDM Statement: Verbatim statutory text.
  - Terms: `I have read, understood and agree to the Terms and Conditions...`
- **Preserved Test IDs & ARIA:**
  - `getByRole('heading', { name: /select your professional coverage/i })`
  - `getByLabelText(/practitioner email address/i)`
  - `getByLabelText(/coverage inception date/i)`
  - `getByLabelText(/i have read, understood and agree to the terms and conditions/i)`
  - `getByRole('button', { name: /generate quotation/i })`
  - `getByText('RM 1,000,000')`, `getByText('Recommended')`

---

## 6. Stage 2: Quotation & Add-ons

- **File Path:** `src/features/quote/Stage2QuoteReview.tsx`
- **Current State:**
  - Rate lock countdown banner in green box.
  - Pro-rata explanation card in sky-blue box.
  - 4 layers of nested cards for Clinic practice, Locum, and Clinic Add-on.
  - Separate cards for PIC question and PIC Add-on.
  - Automatic reinstatement marketing card with sparkles.
  - Separate card for "Buy Online" vs "Email Quotation".
- **Proposed Ultra-Minimal State:**
  - Top: Calm, unboxed quotation card showing the calculated premium, annual equivalent rate, and coverage dates.
  - Rate lock countdown replaced with a quiet, calm notice: `Quote valid until 31 Dec 2026`.
  - Clinic Entity Protection: Single clean section. Two simple radio options for clinic ownership (`Yes` / `No`). If `Yes`, clean progressive reveal of entity type and clinic add-on limit buttons. No nested bordered cards.
  - PIC Protection: Single clean toggle/checkbox with clear limit and premium.
  - Automatic Reinstatement: Displayed as a neat, unboxed benefit line: `✓ Complimentary Automatic Reinstatement Included`.
  - Fulfillment: Primary action button `Proceed to Personal Details`, with a secondary link button `Email Quote (PDF)`.
- **AI Copy to Purge:**
  - Rate-lock urgency copy: *"Your premium rate is locked for the next 15 minutes..."*
  - Educational lecture paragraphs on why private clinic owners face dual exposure.
  - Marketing copy inside the automatic reinstatement card.
- **Preserved Legal Copy:**
  - Wording for Clinic Entity Protection add-on.
  - Wording for Person-In-Charge extension.
  - Reinstatement clause text.
- **Preserved Test IDs & ARIA:**
  - Radio options: `Yes`, `No`, `Sole Proprietorship`, `Partnership / Sdn Bhd`
  - Button: `Proceed to Personal Details` (or `Accept & Enter Particulars`)
  - Limit choices: `RM 1,000,000`, `RM 2,000,000`, `RM 5,000,000`

---

## 7. Stage 3: Personal Particulars

- **File Path:** `src/features/particulars/Stage3ParticularsForm.tsx`
- **Current State:**
  - 25+ fields spanning Identity, Contact, Clinic Location, Tax ID, and Annual Revenue Tier in a dense multi-column layout with ad-hoc margins.
- **Proposed Ultra-Minimal State:**
  - 2 clean visual groups with subtle section dividers:
    1. Practitioner Identity (Salutation, Full Name, ID Type, NRIC, DOB, Gender, Country, MMC/MDC Number).
    2. Primary Practice Location (Clinic Name, Address Lines 1 & 2, Postcode, City, State, Annual Revenue Tier).
  - Consistent 44 px input height with clean focus borders (`var(--ds-primitive-color-teal-500)`).
- **AI Copy to Purge:**
  - Filler instructions: *"Please enter your details exactly as they appear on your NRIC..."*
  - Decorative icons beside each field group title.
- **Preserved Legal Copy:**
  - Field labels verbatim: `Salutation`, `Full Name as per NRIC/Passport`, `NRIC Number`, `Date of Birth`, `Malaysian Medical Council (MMC) Registration Number`, `Practice / Clinic Name`, `Annual Revenue Tier`.
- **Preserved Test IDs & ARIA:**
  - All input `id` and `name` attributes.
  - Form validation error alerts (`role="alert"`).

---

## 8. Stage 3: Clinic Branch Manager

- **File Path:** `src/features/particulars/BranchManager.tsx`
- **Current State:**
  - Bordered box containing branch list, yellow revenue warning banner, add branch modal with dense fields.
- **Proposed Ultra-Minimal State:**
  - Clean, unbordered branch list with clear row dividers.
  - Concise secondary notice for the RM 5,000,000 revenue ceiling.
  - Clean "+ Add Branch" button with standard 44 px target.
  - Branch modal uses standard design system tokens with clear action buttons.
- **AI Copy to Purge:**
  - Excessive explanatory notes on branch underwriting guidelines.
- **Preserved Legal Copy:**
  - Branch fields: `Branch Name`, `Address`, `Postcode`, `State`, `Branch PIC Name`, `Branch MMC Number`.
  - Revenue restriction disclosure.
- **Preserved Test IDs & ARIA:**
  - Add branch button: `/add another clinic/i` or `+ Add Branch`
  - Edit/Delete buttons: `aria-label="Edit Branch"`, `aria-label="Delete Branch"`.

---

## 9. Stage 3: Underwriting Questionnaire

- **File Path:** `src/features/underwriting/UnderwritingQuestionnaire.tsx`
- **Current State:**
  - 4 massive numbered card containers for primary questions.
  - 4 clinic questionnaire cards.
  - Bright yellow warning box with 3-row textarea upon "Disagree".
  - Collapsible COVID accordion with 25 dense rows.
  - Heavy Schedule 9 FSA 2013 legal card.
- **Proposed Ultra-Minimal State:**
  - Flat, readable list of statutory questions separated by subtle horizontal rules.
  - Clean, standard segmented Yes/No (or Agree/Disagree) buttons with high-contrast active states.
  - Conditional explanation field expands smoothly inline with neutral slate background (`#F8FAFC`) rather than bright alarmist yellow.
  - COVID section rendered as a compact optional accordion with a clean toggle.
  - Statutory Schedule 9 declaration presented as a calm, authoritative legal statement with clear checkbox.
- **AI Copy to Purge:**
  - Extraneous introductory instructions: *"Please answer the following mandatory underwriting questions honestly and to the best of your knowledge..."*
- **Preserved Legal Copy (ABSOLUTE PRESERVATION):**
  - All 4 statutory individual declaration questions verbatim (Claims, Circumstances, Disciplinary, Criminal).
  - All 4 clinic declaration questions verbatim.
  - Schedule 9 Financial Services Act 2013 disclosure text verbatim.
- **Preserved Test IDs & ARIA:**
  - Radio options: `Agree`, `Disagree` (or `Yes`, `No`)
  - Explanation textarea: `aria-label="Explanation of Circumstances"`
  - Schedule 9 checkbox: `getByLabelText(/schedule 9/i)` or statutory declaration checkbox.

---

## 10. Stage 4: Review & Payment

- **File Path:** `src/features/review/Stage4ReviewAndPayment.tsx`
- **Current State:**
  - Full-width 10-row policy summary table in the main column that directly duplicates the sticky sidebar.
  - Bulky payment method cards (FPX, Credit Card, Boost, GrabPay) with multiple logos and icons.
  - Repeating PIDM disclaimers.
- **Proposed Ultra-Minimal State:**
  - Main column eliminates the duplicate premium calculation table.
  - Main column displays:
    1. Concise Applicant & Policy Summary card (Name, NRIC, Plan, Period).
    2. Payment Method Selector: Sleek, horizontal payment radio tabs (`Credit/Debit Card`, `FPX Online Banking`, `E-Wallet`).
    3. Final Consent & Regulatory Declaration checkboxes.
  - Sticky sidebar displays the single authoritative financial breakdown and "Pay Now" CTA.
- **AI Copy to Purge:**
  - Duplicate 10-row financial calculation table in main column.
  - Marketing assurances: *"100% Secure Chubb Encrypted Checkout"*.
- **Preserved Legal Copy:**
  - Payment method options: `Online Banking (FPX)`, `Credit / Debit Card`, `E-Wallet`.
  - Commission disclosure: `Commission Disclosure (Section 130 FSA 2013)`.
  - Confirmation button: `Pay RM XXX.XX` / `Proceed to Payment`.
- **Preserved Test IDs & ARIA:**
  - Radio buttons for payment options.
  - Primary button: `getByRole('button', { name: /pay|proceed/i })`.

---

## 11. Stage 5: Policy Confirmation

- **File Path:** `src/features/confirmation/Stage5PolicyConfirmation.tsx`
- **Current State:**
  - Large green success badge with confetti-like styling.
  - 3 large download cards with file icons and file sizes.
  - Next steps callout box with 4 bullet points.
- **Proposed Ultra-Minimal State:**
  - Calm, authoritative completion message: `Policy Issued Successfully` in Kanit 500 (`#132766`).
  - Clear policy reference banner: `Policy No: DS-2026-XXXXXX` with 1-click copy utility.
  - Clean document download row: 3 compact buttons (`Certificate of Insurance (PDF)`, `Official Tax Invoice`, `Policy Wording`).
  - Next steps rendered as a quiet, numbered instruction list.
- **AI Copy to Purge:**
  - Exaggerated celebratory copy: *"Congratulations! You are now fully protected by Malaysia's premier medical indemnity..."*
- **Preserved Legal Copy:**
  - Policy summary items, insurer details, document titles.
- **Preserved Test IDs & ARIA:**
  - `data-testid="stage5-policy-confirmation"`
  - `data-testid="confirmed-policy-number"`
  - `data-testid="download-coi-btn"`
  - `data-testid="download-invoice-btn"`
  - `data-testid="download-schedule-btn"`
  - `data-testid="return-home-btn"`

---

*This inventory guarantees that zero test IDs, ARIA semantics, or statutory copy are compromised during visual refinement.*

