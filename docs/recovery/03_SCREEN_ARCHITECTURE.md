# SCREEN ARCHITECTURE & INFORMATION HIERARCHY
## DoctorShield Individual Medical Professional Indemnity Portal

> **Document ID:** `DOC-ARCH-SCRN-001`  
> **Status:** Architecture Design Baseline (Phase 03)  
> **Classification:** [PROPOSED / SPECIFICATION]  
> **Author:** Principal Insurance Product Designer & Interaction Architect  
> **Created:** 2026-10-30  
> **Governance:** DoctorShield Product Engineering & Design Rules v2.0 (AGENTS.md)  
> **Scope:** Detailed screen-by-screen information architecture, component anatomy, layout hierarchy, and state flow for the production application shell, stages 1–5, and secondary dialogs.

---

## 1. Application Shell Architecture

The global shell frames every stage of the journey with calm authority, continuous clarity, and zero extraneous chrome.

```
+--------------------------------------------------------------------------------------------------+
| [DoctorShield Logo]              [Step Tracker: 1. Quote -> 2. Options -> 3. Form -> 4. Pay]    [Help/Chat] |
+--------------------------------------------------------------------------------------------------+
|                                                                                                  |
|  <STAGE CONTENT REGION>                                                                           |
|                                                                                                  |
+--------------------------------------------------------------------------------------------------+
| [PIDM Protection Notice]  |  [FSA 2013 Disclosure]  |  [Contact Support]  |  [Privacy & Terms]   |
+--------------------------------------------------------------------------------------------------+
```

### Component Breakdown
1. **Persistent Top Bar (`AppHeader`):**
   - **Brand Anchor:** Official DoctorShield logo (`#08A5B5` primary, `#132766` secondary) linking to home with session-preservation check.
   - **Progress Tracker (`StepProgressTracker`):** 4 numbered, accessible steps with state indicators:
     - `Completed` (teal badge with checkmark, clickable to navigate backward)
     - `Active` (filled navy pill, aria-current="step")
     - `Upcoming` (muted gray circle, non-interactive)
   - **Emergency / Help Trigger:** Discrete phone/chat micro-trigger (`1800-88-DOCS`) triggering contextual support dialog without page departure.
2. **Main Canvas (`StageContainer`):**
   - Maximum width: 1120px (Desktop) / 100% (Mobile).
   - Centered single-column layout for focused forms; two-column split layout (65% form / 35% sticky summary) for Stage 2 & Stage 4 on desktop.
3. **Statutory Footer (`AppFooter`):**
   - Class A regulatory disclosures: Verbatim PIDM protection text (`DIS-CALC-001`), BNM license reference, security badges (SSL 256-bit, Bank Negara Malaysia compliance), copyright notice.

---

## 2. Stage 1: Instant Premium Calculation (`Stage1CoverageForm`)

### Screen Objective
Provide an authoritative baseline quotation within 20 seconds using only three non-invasive clinical variables.

### Information Architecture

```
+--------------------------------------------------------------------------------------------------+
| Heading: Calculate Your Medical Indemnity Premium                                                |
| Subheading: Instant authoritative quotation. No personal identification required to view rates. |
+--------------------------------------------------------------------------------------------------+
| 1. Medical Specialty / Classification                                                            |
|    [ Select your medical or dental practice category...                        v ]               |
|                                                                                                  |
| 2. Limit of Indemnity (Any One Claim & In Aggregate)                                             |
|    ( ) RM 500,000      (*) RM 1,000,000      ( ) RM 2,000,000      ( ) RM 5,000,000             |
|    [+] Complimentary 1x Automatic Reinstatement Included                                         |
|                                                                                                  |
| 3. Period of Coverage                                                                            |
|    Inception Date: [ 01 / 11 / 2026 ] (DD/MM/YYYY)    Expiry Date: 31 / 12 / 2026 (Pro-rated)    |
|                                                                                                  |
| 4. Contact & Promotion (Optional)                                                                |
|    Email Address:  [ doctor@clinic.com.my         ] (For instant quote copy)                     |
|    Promo / Partner Code: [ MMA2026               ] [ Apply ]                                     |
|                                                                                                  |
| [X] I confirm I hold a valid Malaysian practicing certificate (MMC / MDC).                       |
|                                                                                                  |
| [  Calculate Instant Quote  ->  ]                                                                |
+--------------------------------------------------------------------------------------------------+
```

### Component Anatomy & Hierarchy
- **Heading Block:** Kanit 500, 28px/34px, `#132766`. Clear statement of value.
- **Classification Selector (`Select`):** 23 approved specialties (`FLD-CALC-001`). Typeahead search enabled.
- **Indemnity Limit Grid (`SegmentedControl` / `RadioCards`):** Prominently displays 4 primary tiers (`RM 500k`, `RM 1M`, `RM 2M`, `RM 5M`). Specialty filtering enforces minimum tiers (e.g. GP with Aesthetics minimum RM 1M per `RULE-LIAB-01`).
- **Complimentary Reinstatement Pill:** Non-intrusive badge highlighting 1x free reinstatement benefit (`MSG-QUOT-002`).
- **Coverage Period Controls:** Inception date datepicker (`FLD-CALC-003`). End date fixed to 31/12/YYYY with info tooltip explaining pro-rata calendar-year alignment.
- **Optional Email & Promo:** Clean secondary inline inputs. Email allows quotation bookmarking; promo code applies verified association discounts (e.g., MMA partner 5%).
- **Primary CTA:** 48px height, `#08A5B5` solid fill, "Calculate Instant Quote ->".
- **Minimum Info Required to Proceed:** Specialty, Limit of Liability, Inception Date.

---

## 3. Stage 2: Quotation Breakdown & Optional Coverage (`Stage2QuoteReview`)

### Screen Objective
Present the individual indemnity quotation with total financial transparency and allow modular selection of eligible optional add-ons with immediate price feedback.

### Information Architecture (Desktop 2-Column Layout)

```
+---------------------------------------------------------------+----------------------------------+
| PRIMARY WORKSPACE (65%)                                       | STICKY PREMIUM SIDEBAR (35%)     |
|                                                               |                                  |
| Stage Heading: Your DoctorShield Quotation                    | QUOTATION SUMMARY                |
| Ref: DS-QUO-89104 | Locked for: 14:48                         |                                  |
|                                                               | General Practitioner             |
| +-----------------------------------------------------------+ | RM 1,000,000 Limit (Any 1 Claim) |
| | BASE INDIVIDUAL COVERAGE                                  | | Period: 01/11/2026 - 31/12/2026  |
| | Selected: General Medical Practitioner                    | | Pro-rated: 61 days             |
| | Indemnity Limit: RM 1,000,000 (Aggregate RM 2,000,000)    | | ------------------------------ |
| | Base Annual Rate: RM 2,700.00 | Pro-rated: RM 451.23      | | Base Premium:        RM 451.23 |
| | Included: 1x Automatic Reinstatement                      | | Cyber & Privacy:     +RM 58.49 |
| | Direct Rebate (10% BNM): -RM 45.12                        | | ------------------------------ |
| +-----------------------------------------------------------+ | Gross Premium:         RM 509.72 |
|                                                               | 10% Direct Rebate:    -RM  50.97 |
| OPTIONAL COVERAGE EXTENSIONS                                  | 8% SST:                +RM  36.70 |
| Tailor your policy with practice and clinic protections:      | Stamp Duty:            +RM  10.00 |
|                                                               | ============================== |
| [ ] Clinic Premises & Vicarious Liability                     | TOTAL PAYABLE:         RM 505.45 |
|     Extends protection to clinic staff and premises.          |                                  |
|     +RM 1,200.00 / yr (Pro-rated: +RM 200.55)     [ Details ] | [ Continue to Doctor Info -> ]   |
|                                                               |                                  |
| [X] Cyber & Patient Data Breach Cover                         | [<- Edit Base Coverage]          |
|     Protects against patient data breaches & ransomware.      |                                  |
|     +RM 350.00 / yr (Pro-rated: +RM 58.49)        [ Details ] | Safe & Secure 256-Bit Encryption |
|                                                               | PIDM Protected up to limits      |
| [ ] Person-In-Charge (PIC) Statutory Extension                +----------------------------------+
|     Statutory legal liability for registered clinic PICs.     |
|     +RM 450.00 / yr (Pro-rated: +RM 75.21)        [ Details ] |
|                                                               |
| [ ] Locum Practitioner Cover                                  |
|     Coverage while practicing at secondary clinics/hospitals. |
|     +RM 250.00 / yr (Pro-rated: +RM 41.78)        [ Details ] |
+---------------------------------------------------------------+
```

### Component Anatomy & Hierarchy
- **Base Coverage Card:** Visual container with light neutral fill (`#F8FAFC`), subtle 1px border (`#E2E8F0`), displaying base clinical parameters, pro-rata days calculation, and included complimentary benefits.
- **Add-on Module Cards (`AddonCard`):** Modular toggle cards. Each card displays:
  - Accessible Switch toggle / Checkbox (44x44px target)
  - Clear Title & 1-line layman benefit explanation
  - Authoritative pro-rated price addition (`+RM XX.XX`)
  - Expandable "Details" drawer for policy wording extract (no page jumps)
- **Sticky Summary Sidebar (`QuotationStickySidebar`):** Authoritative breakdown with tabular figure alignment. Real-time updates as add-ons are toggled.
- **15-Minute Price Lock Timer:** Subtle badge (`Locked for: 14:48`) with non-alarmist tone.
- **Actions:** Primary CTA: "Continue to Doctor Info ->". Secondary: "<- Edit Base Coverage" (preserves entered data).

---

## 4. Stage 3: Progressive Application Form (`Stage3ParticularsForm`)

### Deconstruction Strategy
Stage 3 previously suffered from 4,240px vertical scroll depth and 28 simultaneous inputs. It is now decomposed into **three linear substeps** managed by an internal wizard controller (`SubstepWizard`):

```
Stage 3 Header: Doctor Particulars & Practice Details
Substep Stepper: (1) Doctor Profile  ---  (2) Clinic & Branches  ---  (3) Declarations
```

---

### Substep 3.1: Doctor Particulars & Practice Profile

#### Screen Objective
Collect verified medical practitioner identity and principal practice location.

```
+--------------------------------------------------------------------------------------------------+
| SUBSTEP 1 OF 3: DOCTOR PROFILE & PRACTICE LOCATION                                               |
+--------------------------------------------------------------------------------------------------+
| 1. Personal Identity                                                                             |
|    Full Legal Name (as per NRIC / Passport):                                                     |
|    [ Dr. Ahmad bin Sulaiman                                                                    ] |
|                                                                                                  |
|    NRIC Number / Identification:                 Date of Birth:               Gender:            |
|    [ 850714-10-5231          ]                   [ 14 / 07 / 1985 ]           [ Male          v ]|
|    (Auto-formatted: 12 digits)                   (Auto-derived from NRIC)     (Auto-derived)     |
|                                                                                                  |
| 2. Professional Credentials                                                                      |
|    MMC / MDC Registration Number:                Year of Full Registration:                      |
|    [ 45892                   ]                   [ 2012           ]                              |
|                                                                                                  |
| 3. Primary Contact & Practice Details                                                            |
|    Mobile Phone Number:                          Email Address:                                  |
|    [ +60 12-345 6789         ]                   [ ahmad.sulaiman@gmail.com                  ]   |
|                                                                                                  |
|    Principal Practice / Clinic Name:                                                             |
|    [ Klinik Sulaiman & Rakan-Rakan                                                             ] |
|                                                                                                  |
|    Principal Clinic Address:                                                                     |
|    [ No. 12, Jalan Telawi 3, Bangsar Baru                                                      ] |
|    Postcode: [ 59100 ]     City: [ Kuala Lumpur       ]     State: [ Wilayah Persekutuan    v ]  |
|                                                                                                  |
| 4. Practice Capacity                                                                             |
|    What is your capacity at this principal clinic?                                               |
|    (*) Private Clinic Owner / Partner                                                            |
|    ( ) Employed Resident Doctor / Associate                                                      |
|    ( ) Independent Visiting Consultant / Locum Only                                              |
|                                                                                                  |
| [ Continue to Clinic Facilities -> ]                                                             |
+--------------------------------------------------------------------------------------------------+
```

#### Smart Form Enhancements
- **NRIC Extraction:** Entering a valid 12-digit Malaysian NRIC automatically populates `Date of Birth` and `Gender`, eliminating 2 manual inputs.
- **Postal Auto-fill:** Entering 5-digit Malaysian postcode auto-fills City and State via local lookup table (`src/data/postcodes.json`).
- **Capacity Routing:** Selecting "Private Clinic Owner / Partner" sets `requires_clinic_details = TRUE` and unlocks Substep 3.2. Selecting "Employed" or "Locum" skips Substep 3.2 directly to Substep 3.3.

---

### Substep 3.2: Clinic Facilities & Branch Allocation (Conditional)

#### Screen Objective
Collect clinic licensing (Borang B / F) and enforce 100% revenue distribution across registered branches. Rendered *only* when the doctor is a clinic owner or selected the Clinic Package add-on.

```
+--------------------------------------------------------------------------------------------------+
| SUBSTEP 2 OF 3: CLINIC FACILITIES & BRANCH ALLOCATION                                            |
| Note: Required for Private Clinic Owners & Clinic Package Cover                                  |
+--------------------------------------------------------------------------------------------------+
| 1. Main Clinic Statutory Information                                                             |
|    Clinic Business Registration (SSM) / Borang B/F Number:                                       |
|    [ B-10492-2018                                                                              ] |
|                                                                                                  |
|    Total Annual Clinic Turnover / Revenue (All Locations):                                       |
|    [ RM  1,200,000.00                                                                          ] |
|    (Maximum online capacity: RM 5,000,000. Clinics > RM 5M undergo manual review)               |
|                                                                                                  |
|    Number of Employed Doctors / Staff:                                                           |
|    [ 4                       ]                                                                   |
|                                                                                                  |
| 2. Clinic Branches                                                                               |
|    Does this clinic operate at multiple branch locations?                                        |
|    (*) Yes, we have branch clinics           ( ) No, single location only                        |
|                                                                                                  |
|    +------------------------------------------------------------------------------------------+  |
|    | PRINCIPAL CLINIC (Branch #1)                                                             |  |
|    | Name: Klinik Sulaiman - Bangsar (Main)                                                   |  |
|    | State: Wilayah Persekutuan Kuala Lumpur                                                  |  |
|    | Revenue Allocation: [ 70 ] % (RM 840,000.00)                                              |  |
|    +------------------------------------------------------------------------------------------+  |
|    | BRANCH CLINIC #2                                                            [ Remove ]   |  |
|    | Branch Name: [ Klinik Sulaiman - Subang Jaya                                           ] |  |
|    | Branch Address: [ No. 45, Jalan SS15/4, 47500 Subang Jaya, Selangor                    ] |  |
|    | Revenue Allocation: [ 30 ] % (RM 360,000.00)                                              |  |
|    +------------------------------------------------------------------------------------------+  |
|                                                                                                  |
|    [ + Add Another Branch Clinic ]                                                               |
|                                                                                                  |
|    Revenue Allocation Total: [ 100% ] (Balanced - Valid)                                         |
|                                                                                                  |
| [ <- Back to Doctor Profile ]                    [ Continue to Underwriting Declarations -> ]    |
+--------------------------------------------------------------------------------------------------+
```

#### Revenue Balancing Mechanics
- **Live Counter:** Visual balance indicator displays `Current Sum: 100%`.
- **Validation Guard:** If sum != 100%, the Next button is disabled with an inline helper: *"Total branch revenue must equal 100% (currently 85%)"*.
- **RM 5M Ceiling:** If Total Revenue > RM 5,000,000, displays informational alert advising that policy issuance will route to senior underwriters.

---

### Substep 3.3: Statutory Medical Underwriting Declarations

#### Screen Objective
Collect 5 mandatory statutory underwriting statements with optimal readability, accessible 44px segmented buttons, and progressive narrative disclosures.

```
+--------------------------------------------------------------------------------------------------+
| SUBSTEP 3 OF 3: STATUTORY UNDERWRITING DECLARATIONS                                              |
| In accordance with Schedule 9 of the Financial Services Act 2013                                 |
+--------------------------------------------------------------------------------------------------+
| Please answer each question accurately. Full disclosure is required by Malaysian Law.            |
|                                                                                                  |
| 1. Have you ever been convicted of any criminal offense, or been the subject of any disciplinary |
|    inquiry, reprimand, or proceedings by the Malaysian Medical Council or any professional body?  |
|    [ ( ) Yes ]   [ (*) No ]                                                                      |
|                                                                                                  |
| 2. Has any insurer ever declined, cancelled, refused renewal, or imposed special terms/excess     |
|    on your professional indemnity insurance?                                                     |
|    [ ( ) Yes ]   [ (*) No ]                                                                      |
|                                                                                                  |
| 3. Have any medical malpractice, negligence, or civil claims been made against you in the past   |
|    5 years, or has compensation been paid on your behalf?                                        |
|    [ (*) Yes ]   [ ( ) No ]                                                                      |
|    +------------------------------------------------------------------------------------------+  |
|    | [!] Please provide full details below (dates, circumstances, amounts, current status):    |  |
|    | [ Patient alleged delayed diagnosis in 2023. MMC inquiry dismissed case on 12/04/2024.   |  |
|    |   Full clearance letter available upon request.                                        ] |  |
|    | (Character count: 142 / 1000)                                                            |  |
|    +------------------------------------------------------------------------------------------+  |
|                                                                                                  |
| 4. Are you aware of any circumstance, incident, or patient complication that may give rise to a  |
|    claim against you that has not yet been reported?                                             |
|    [ ( ) Yes ]   [ (*) No ]                                                                      |
|                                                                                                  |
| 5. Do you perform any surgical or clinical procedures outside the registered scope of your       |
|    selected specialty category?                                                                  |
|    [ ( ) Yes ]   [ (*) No ]                                                                      |
|                                                                                                  |
| [ <- Back to Clinic Details ]                                 [ Proceed to Review & Payment -> ] |
+--------------------------------------------------------------------------------------------------+
```

#### Underwriting Decision Triggering
- **Clean Record (5 "No"s):** User proceeds directly to Stage 4 straight-through payment.
- **Disclosed Incident ("Yes" + Narrative):** System checks risk severity. Low-risk/dismissed inquiries continue to Stage 4; severe ongoing claims display an informative notice that submission will trigger an expedited 24-hour underwriting review.

---

## 5. Stage 4: Review, Financial Breakdown & Payment (`Stage4ReviewAndPayment`)

### Screen Objective
Execute a transparent, legally compliant, high-trust checkout transaction with zero hidden fees.

### Information Architecture

```
+---------------------------------------------------------------+----------------------------------+
| REVIEW POLICY DETAILS (60%)                                   | FINAL PAYMENT CHECKOUT (40%)     |
|                                                               |                                  |
| Stage Heading: Review & Payment                               | PAYMENT SUMMARY                  |
| Please verify your coverage details before completing payment.|                                  |
|                                                               | Selected Plan:                   |
| 1. Insured Professional Details               [ Edit Details ]| DoctorShield Individual          |
|    Name: Dr. Ahmad bin Sulaiman                               | Specialty: General Practitioner  |
|    NRIC: 850714-10-5231 | MMC No: 45892                       | Indemnity Limit: RM 1,000,000    |
|    Principal Clinic: Klinik Sulaiman, Bangsar, KL             | Cover: 01/11/2026 - 31/12/2026   |
|                                                               | -------------------------------- |
| 2. Policy Coverage & Options                  [ Edit Options ]| Base Annual Premium:   RM 451.23 |
|    Limit of Indemnity: RM 1,000,000 (Any one claim)           | Cyber & Privacy Cover:  +RM 58.49 |
|    Aggregate Limit: RM 2,000,000 (Free 1x Reinstatement)      | -------------------------------- |
|    Coverage Period: 01/11/2026 to 31/12/2026 (61 days)        | Gross Total:           RM 509.72 |
|    Selected Add-on: Cyber & Patient Data Breach Cover         | Less: 10% Direct Rebate -RM 50.97 |
|                                                               | -------------------------------- |
| 3. Mandatory Disclosures & Consents                           | Net Premium:           RM 458.75 |
|    [X] Financial Services Act 2013 Disclosure:                | Service Tax (8% SST):  +RM  36.70 |
|        I confirm that the statements in this application are  | Stamp Duty (Exempt/S.60)+RM 10.00 |
|        true, accurate, and complete to the best of my         | ================================ |
|        knowledge.                                             | TOTAL PAYABLE:         RM 505.45 |
|                                                               |                                  |
|    [X] PDPA 2010 Notice & Consent:                            | SELECT PAYMENT METHOD            |
|        I consent to the processing of my personal data for    | (*) FPX Online Banking           |
|        insurance administration and underwriting purposes.    |     [ Select Your Bank         v]|
|                                                               |     Maybank2u, CIMB Clicks, etc. |
|                                                               |                                  |
|                                                               | ( ) Credit / Debit Card          |
|                                                               |     Visa, Mastercard (MY Issued) |
|                                                               |                                  |
|                                                               | [  Pay RM 505.45 Securely ->  ]  |
|                                                               |                                  |
|                                                               | [Locked] 256-Bit Bank Encryption |
+---------------------------------------------------------------+----------------------------------+
```

### Component Anatomy & Hierarchy
- **Summary Cards with Direct Deep Links:** Discrete summary blocks for Doctor Details and Policy Coverage with inline `[ Edit ]` triggers that navigate directly to the relevant stage while preserving all answers.
- **Tabular Financial Breakdown:** Strict tabular figure alignment (`font-variant-numeric: tabular-nums`). Clearly items: Base Premium, Add-ons, 10% Direct Rebate (BNM mandatory), 8% SST, and RM 10.00 Stamp Duty.
- **Segmented Payment Method Selector:** Native, accessible radio cards for FPX Online Banking (with searchable bank dropdown) and Credit/Debit Card.
- **Primary Checkout Button:** Prominent, full-width button displaying exact final amount (`Pay RM 505.45 Securely ->`).

---

## 6. Stage 5: Completion, Policy Schedule & Instant Certificate (`Stage5PolicyConfirmation`)

### Screen Objective
Provide instant gratification, permanent legal documentation downloads, and clear next steps.

### Information Architecture

```
+--------------------------------------------------------------------------------------------------+
|                                    [ Teal Success Icon ]                                         |
|                             Coverage Active & Policy Issued!                                     |
|             Policy Schedule & Official Cover Note have been generated successfully.              |
+--------------------------------------------------------------------------------------------------+
| POLICY TRANSACTION DETAILS                                                                       |
|                                                                                                  |
| Certificate / Policy No:    DS-2026-0894120               Payment Ref:   FPX-901824-MY           |
| Insured Practitioner:       Dr. Ahmad bin Sulaiman        Amount Paid:   RM 505.45               |
| Medical Specialty:          General Medical Practitioner  Transaction:   01 Nov 2026, 14:32 MYT  |
| MMC Registration No:        45892                         Payment Mode:  FPX (Maybank2u)         |
| Limit of Indemnity:         RM 1,000,000 Any One Claim    Period:        01/11/2026 - 31/12/2026 |
+--------------------------------------------------------------------------------------------------+
| IMMEDIATE ACTIONS & DOWNLOADS                                                                    |
|                                                                                                  |
| [ Download Cover Note (PDF) ]        [ Download Policy Schedule (PDF) ]    [ Official Receipt ]  |
|                                                                                                  |
| Note: An official digital certificate has also been emailed to ahmad.sulaiman@gmail.com.         |
+--------------------------------------------------------------------------------------------------+
| WHAT HAPPENS NEXT?                                                                               |
|                                                                                                  |
| 1. Your MMC Annual Practicing Certificate (APC):                                                 |
|    Upload your DoctorShield Cover Note directly to the Medical Register Information and          |
|    Operations System (MeRIOS) as proof of indemnity coverage.                                    |
|                                                                                                  |
| 2. 24/7 Medico-Legal Support:                                                                    |
|    In the event of an adverse clinical incident, notify our dedicated legal panel immediately:   |
|    Hotline: 1800-88-DOCS | Claims: claims@doctorshield.com.my                                    |
+--------------------------------------------------------------------------------------------------+
```

---

## 7. Secondary Modals & Dialog Architecture

| Modal ID | Trigger Condition | Dialog Purpose & Wording | User Actions |
|---|---|---|---|
| **`POP-RETRO-001`** | Inception Date < Today (up to 30 days) | **Retroactive Date Notice (Clause 6.12):** Explains that claims arising from incidents prior to policy issuance are strictly excluded. | 1. `I Understand & Accept Clause 6.12`<br>2. `Change Date to Today` |
| **`POP-EXP-001`** | Session idle > 15 minutes on Stage 2 | **Quotation Expiration Notice:** Advises that rates must be re-validated against current underwriting schedules. | 1. `Refresh Quotation Rates`<br>2. `Cancel` |
| **`POP-REF-001`** | Adverse declaration or Revenue > RM 5M | **Underwriting Referral Submission:** Informs applicant that file is routed to medical underwriters for straight-through approval. | 1. `Submit Application for Review`<br>2. `Edit Answers` |
| **`POP-TERMS-001`** | Click on "Terms & Conditions" link | **Standard Policy Wording Viewer:** Displays Master Policy Wording & PIDM Protection brochure in accessible scrollable modal. | `Close Viewer` |
| **`POP-EXIT-001`** | Clicking external link or logo during form | **Data Preservation Notice:** Confirms session data is saved and provides resume link. | 1. `Leave Page`<br>2. `Continue Application` |

---

## 8. Summary of Screen Architecture Deliverables

1. **Clear Hierarchy:** Every screen features exactly one primary task, eliminating cognitive competition.
2. **Elimination of Form Fatigue:** Stage 3 decomposition into 3 manageable substeps reduces vertical page length from 4,240px to under 800px per view.
3. **Financial Transparency:** Financial summary is isolated to Stage 2 (selection) and Stage 4 (transaction), eliminating repetitive intermediate price cards.
4. **Accessible Interactivity:** All interactive components strictly satisfy WCAG 2.1 AA with minimum 44x44px touch targets.

