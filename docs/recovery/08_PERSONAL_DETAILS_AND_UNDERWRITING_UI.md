# DOCTORSHIELD — 08 / PERSONAL DETAILS & UNDERWRITING UI REPORT

**Phase:** 08  
**Status:** COMPLETE (Ready for Visual Review & Approval Gate)  
**Governance:** DoctorShield — Master Product Rules V5 (Activated)  
**Design Direction:** Direction B ("Structured Minimal / Editorial Craft")  

---

## 1. Executive Summary & Objective

In **Phase 08**, we executed the complete visual redesign of **Stage 3: Personal Particulars & Statutory Underwriting Form** (`src/features/particulars/Stage3ParticularsForm.tsx`), **Additional Clinic Branches Manager** (`src/features/particulars/BranchManager.tsx`), and the **Statutory Underwriting Questionnaire** (`src/features/underwriting/UnderwritingQuestionnaire.tsx`).

The previously monolithic 2,000px form wrapper and rejected visual treatments have been replaced by a modular sequence of Direction B bounded cards resting directly on the `#F4F7F9` slate canvas. All critical underwriting logic, NRIC parsing/auto-derivation, AML/CFT screening gates, RM 5M turnover limits, and FSA 2013 statutory notices are 100% preserved.

Simultaneously, we backed up Version 4 governance to `docs/archive/AGENTS_V4_VISUAL_FIRST.md` and activated **Master Product Rules V5** in the repository root `AGENTS.md`.

---

## 2. Visual & Structural Architecture Changes

### A. Open Canvas Composition (Zero Monolithic Nesting)
- Updated `AppShell.tsx` and `layout.css` to activate `.ds-main-card-open` for Stage 3 (`.ds-main-card:has(.ds-stage3-particulars-container)`).
- Eliminated the former 32px enclosing white card container. Each section now renders as an independent `.ds-card` on the `#F4F7F9` background, creating a calm, structured reading rhythm.

### B. Purpose-Differentiated Section Units

1. **Stage Header Card (`.ds-card`):**
   - Stage badge: `Stage 3 of 4: Personal Particulars & Statutory Underwriting`.
   - Policy Form notice: `Chubb Policy Form No. IND-CHUBB-MY-2026-V1`.
   - Page title: `Kanit 500` (`Practitioner Identity & Underwriting Declarations`) with an editorial subtitle highlighting PDPA 2010 statutory privacy protection.

2. **Accessible Error Summary Banner (`role="alert"`):**
   - High-contrast card with 4px red left accent (`#B91C1C`) and soft red background (`#FEF2F2`).
   - Automatically receives focus and scrolls into view upon invalid submission attempt.

3. **Card 1 — Practitioner Identification (`FieldGroup asCard={true}`):**
   - Authoritative 3px `#08A5B5` left accent bar with Kanit 500 section heading.
   - Responsive multi-column grid with 46px inputs and 6px border radius.
   - **Salutation & Full Name:** Upper-case auto-transformation with full NRIC/Passport matching.
   - **ID Type Switch:** Segmented radio controls for Malaysian NRIC vs. Passport.
   - **NRIC Extraction Engine:** Automatically validates checksums, formats hyphens (`YYMMDD-PB-###G`), and derives Date of Birth and Gender without manual doctor entry.
   - **Registration & Contact:** MMC Full Registration Number, verified email, phone number (with OTP verification hint), and optional LHDN TIN for e-Invoicing.

4. **Card 2 — Professional Practice Particulars (`FieldGroup asCard={true}`):**
   - Primary Practice Facility/Hospital/Clinic name.
   - Conditional SSM/CKAPS Registered Legal Entity Name when clinic ownership is active.
   - Full practice address (Line 1, optional Line 2, 5-digit postcode, city, and Malaysian State select).
   - Annual gross professional income tier select.

5. **Card 3 — Additional Clinic Branches & Facilities (`BranchManager.tsx`):**
   - Renders conditionally when clinic coverage is active.
   - 3px teal `.ds-section-bar` with dynamic registered branch count badge (`X of 4 Branches Registered`).
   - Statutory RM 5,000,000 combined turnover limitation notice (`LEG-BRANCH-001`) with mandatory revenue eligibility declaration checkbox.
   - Compact branch cards with Edit and Remove actions.
   - Inline branch entry form with full Malaysian state selection and strict 4-branch ceiling (`RULE-BRN-01`).

6. **Card 4 — Statutory Underwriting Declarations (`UnderwritingQuestionnaire.tsx`):**
   - **Calm Neutral Styling for Ordinary Answers:** Clean white and soft teal choices (`#F0FDFA`) with `#08A5B5` active borders for standard negative answers ("Agree: No claims", "No"), completely eliminating alarming warning colors for normal answers.
   - **Progressive Amber Reveal for Adverse History:** Affirmative/adverse selections ("Disagree", "Yes") display warm amber styling (`#FFFBEB`, `#F59E0B`) with an accented 3px left-border box revealing narrative textareas for claim particulars, dates, amounts, and settlement status.
   - **Clinic Entity & Medical Establishment Declarations:** Dedicated subsection for facility-level inquiries (claims, circumstances, CKAPS inquiries, criminal offences).
   - **Supplementary COVID-19 Facility Risk Assessment:** Accessible collapsible accordion card (`Activity` icon, `Click to Complete (Optional / Conditional)`) containing Screens 04A, 04B, and 04C with final statutory COVID declaration checkbox (`LEG-COVID-001`).
   - **Statutory Truth Declaration:** Formal legal disclosure box citing Schedule 9 FSA 2013 and mandatory truth confirmation checkbox (`id="final_declaration_accepted"`).

7. **Card 5 — Action Bar & Important Notices (`.ds-card`):**
   - Centered "Important Notices to the Applicants (Schedule 9 FSA 2013)" modal trigger button.
   - Responsive navigation bar: "Back to Quotation" (`secondary` button) and "Proceed to Review & Payment" (`teal` primary button with right arrow).

---

## 3. Verification & Test Evidence

### A. Static Type & Compilation Check
- `npm run typecheck` (`tsc --noEmit`): **Passed with 0 errors**.
- `npm run build` (`vite build`): **Passed in 666ms** generating clean production chunks.

### B. Automated Test Execution
- `npx vitest run src/test/stage3.test.tsx`: **11 of 11 tests passed in 6.5s**.
  - Practitioner identity, practice details, and underwriting sections.
  - NRIC auto-formatting, DOB & Gender derivation (Male & Female test vectors).
  - Existing customer NRIC promo code substitution modal (`CHUBBPROMO` -> `MMA2026`).
  - Branch manager with max 4 limit and RM 5M revenue ceiling rule.
  - Validation banner and accessible field errors on empty submit.
  - Valid submit transition to Stage 4 Review & Payment.
  - Adverse declaration routing to Underwriting Referral terminal page.
  - Back-navigation retention to Stage 2 and returning to Stage 3 with data intact.
  - Supplementary COVID-19 questionnaire expansion and validation.
  - Relationship manager callback request form on referral page.
  - AML/CFT sanctions screening gate with blocked NRIC halt (`DT-IND-06`).
- Full test suite (`npm test`): **130 of 130 tests passed across all 12 test files**.

### C. Visual Screenshots Captured

All screenshots captured with headless Chrome using approved synthetic data:

| Viewport | Scenario | Screenshot File |
| :--- | :--- | :--- |
| **Desktop (1440px)** | Clean particulars with ordinary underwriting answers | `stage3-particulars-clean-desktop-1440px.png` |
| **Desktop (1440px)** | Adverse malpractice declaration with narrative reveal | `stage3-underwriting-adverse-desktop-1440px.png` |
| **Desktop (1440px)** | Supplementary COVID-19 risk questionnaire expanded | `stage3-covid-questionnaire-desktop-1440px.png` |
| **Desktop (1440px)** | Additional Clinic Branches Manager & inline form | `stage3-particulars-branches-desktop-1440px.png` |
| **Desktop (1440px)** | Accessible validation error state with alert banner | `stage3-validation-errors-desktop-1440px.png` |
| **Tablet (768px)** | Responsive tablet composition | `stage3-particulars-tablet-768px.png` |
| **Mobile (390px)** | Full mobile layout with touch-friendly controls | `stage3-particulars-mobile-390px.png` |

---

## 4. Master Product Rules V5 Activation

The root repository governance has been updated to **Master Product Rules V5**:
- Backed up Version 4 to `docs/archive/AGENTS_V4_VISUAL_FIRST.md`.
- Updated root `AGENTS.md` to Version 5.0.
- Outlines the 5-stage product journey:
  1. **Coverage**
  2. **Quotation**
  3. **Details** (Personal & Practice Particulars, Clinic Branches)
  4. **Declaration** (Statutory Underwriting Declarations, COVID Questionnaire, Truth Acknowledgment)
  5. **Summary** (Review & Payment)
- Next phase will align the navigation architecture with this clean 5-stage separation.
