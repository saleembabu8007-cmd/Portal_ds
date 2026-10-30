# CONTENT MASTER
## DoctorShield Individual Medical Professional Indemnity Portal

> **Document ID:** `DOC-CNT-MASTER-001`  
> **Status:** Authoritative Baseline (Phase 1)  
> **Classification:** [VERIFIED]  
> **Last Updated:** 2026-10-29  
> **Owner:** Principal Product Architect & Regulatory Business Analyst  
> **Scope:** Master inventory assigning permanent, immutable identifiers to every customer-facing element across the entire user experience.

---

## 1. Permanent Content Identifier Scheme

To ensure zero omission and strict traceability throughout redesign and build phases, every item is assigned a structured identifier:

| Prefix | Content Category | Count in Baseline |
|---|---|---|
| `FLD-` | Form Field / Input / Selector / Textarea | 80 |
| `QST-` | Customer-Facing Question / Survey Prompt | 38 |
| `OPT-` | Selectable Option / Dropdown Value / Radio Item | 65 |
| `DIS-` | Statutory Disclaimer / Legal Notice / Warning | 14 |
| `POP-` | Popup Dialog / Modal Container | 23 |
| `MSG-` | Error Message / Validation Feedback / Toast / Banner | 34 |
| `ACT-` | Interactive Action / Button / Navigation Trigger | 28 |
| `DOC-` | Downloadable Document / PDF / Policy Contract | 6 |
| `LNK-` | External / Internal Hyperlink | 15 |

---

## 2. Master Catalog by Screen & Journey Stage

---

### SCREEN-01: Instant Premium Calculation (`#jsPage1`)

#### 1. Questions & Prompts
- **`QST-CALC-001`**: `CALCULATE YOUR PREMIUM INSTANTLY` (Step 1 primary heading)
- **`QST-CALC-002`**: Selection prompt for Medical / Dental Professional Classification
- **`QST-CALC-003`**: Selection prompt for Indemnity Limit of Liability
- **`QST-CALC-004`**: Input prompt for Insurance Start Date
- **`QST-CALC-005`**: Display of Insurance End Date
- **`QST-CALC-006`**: Input prompt for Customer Contact Email
- **`QST-CALC-007`**: Input prompt for Association Partner Promo Code

#### 2. Fields & Selectors
- **`FLD-CALC-001`**: `classification_id` (Dropdown, 23 options)
- **`FLD-CALC-002`**: `liability_id` (Dynamic dropdown, RM 250k - RM 10M)
- **`FLD-CALC-003`**: `insurance_start_date` (Tel input, DD/MM/YYYY)
- **`FLD-CALC-004`**: `insurance_end_date` (Text input, fixed 31/12/YYYY)
- **`FLD-CALC-005`**: `customer_email` (Email input)
- **`FLD-CALC-006`**: `promo_code` (Text input)
- **`FLD-CALC-007`**: `terms_and_conditions` (Checkbox)

#### 3. Statutory Disclaimers & Disclosures
- **`DIS-CALC-001`**: `LEG-PIDM-001` — *"The benefit(s) payable under eligible certificate/ policy/ product is(are) protected by PIDM up to limits..."*
- **`DIS-CALC-002`**: `LEG-CONSENT-001` — *"I have read, understood and agree to the terms and conditions, privacy policy and I meet all local regulation to practice my profession."*

#### 4. Actions & Navigation
- **`ACT-CALC-001`**: `Calculate` (`#jsPage1Submit`) -> validates Step 1, fetches quote, advances to Step 2
- **`ACT-CALC-002`**: `Reset` (`#jsResetForm`) -> clears form inputs
- **`ACT-CALC-003`**: Policy End Date Info Icon -> triggers `#periodEndDateInfo` modal

---

### SCREEN-02: Quotation Breakdown & Coverage Selection (`#jsPage2`)

#### 1. Headings & Displays
- **`QST-QUOT-001`**: `QUOTATION` (Step 2 primary heading)
- **`MSG-QUOT-001`**: `DISCOUNTED INDIVIDUAL PREMIUM` (Discount badge)
- **`MSG-QUOT-002`**: `SPECIAL INDIVIDUAL PREMIUM` (Standard badge)
- **`MSG-QUOT-003`**: `(i) This premium is pro-rated for the period [Start] to [End]`
- **`MSG-QUOT-004`**: `(ii) For your information, the standard premium for a 12 month period will be RM [Amount]`
- **`MSG-QUOT-005`**: `Your Insurance comes with complimentary Automatic Reinstatement now`
- **`MSG-QUOT-006`**: Premium summary block: `Individual: RM [X]`, `Clinic: RM [Y]`, `Total: RM [Z] (Inclusive of SST & Stamp Duty)`

#### 2. Underwriting Questions
- **`QST-QUOT-008`**: `Do you own a clinic?` (Button toggle group: Yes / No)
- **`QST-QUOT-009`**: `Is it a Sole proprietor or partnership / sdn bhd?` (Button group: Sole Proprietor / Partnership / Sdn Bhd)
- **`QST-QUOT-010`**: `Do you hire locums who sees new patients on their own?` *(sic)* (Button toggle group: Yes / No)
- **`QST-QUOT-011`**: `Are you a Person-In-Charge (PIC) for any clinic?` (Button toggle group: Yes / No)
- **`QST-QUOT-012`**: `Are you a Person-In-Charge (PIC) with another establishment?` (Button toggle group: Yes / No)
- **`QST-QUOT-013`**: `Clinic Limit Of Liability` (Dropdown selection)
- **`QST-QUOT-014`**: `Add This Recommended Coverage` (Clinic package checkbox)
- **`QST-QUOT-015`**: `Buy PIC coverage` (PIC package checkbox)
- **`QST-QUOT-016`**: `Do you want to add Automatic Reinstatement` (Reinstatement checkbox)
- **`QST-QUOT-017`**: Fulfillment selection: `Buy now` vs `Email me the Indicative Quotation and Policy Wording`

#### 3. Actions & Navigation
- **`ACT-QUOT-001`**: `<< Back` (`#jsPage2Back`) -> returns to Step 1
- **`ACT-QUOT-002`**: `Buy >>` (`#jsPage2Submit` when `Buy now` active) -> advances to Step 3
- **`ACT-QUOT-003`**: `Submit` (`#jsPage2Submit` when `Email me...` active) -> dispatches email quote
- **`ACT-QUOT-004`**: `Why is this recommended?` (Clinic) -> triggers clinic rationale modal
- **`ACT-QUOT-005`**: `Why is this recommended?` (PIC) -> triggers PIC rationale modal

---

### SCREEN-03: Personal Particulars & Underwriting Declarations (`#jsPage3`)

#### 1. Identification & Practice Questions
- **`QST-PART-001`**: `Personal Particulars` (Step 3 primary heading)
- **`QST-PART-002`**: `Full Name as per IC` (Text input)
- **`QST-PART-003`**: `DD/MM/YYYY` (Date of birth input)
- **`QST-PART-004`**: `NRIC number` (National ID / Passport input)
- **`QST-PART-005`**: `Clinic name (Sdn Bhd/Partnership)` (Commercial entity input)
- **`QST-PART-006`**: `Income` (Annual turnover bracket selector)
- **`QST-PART-007`**: `nationality` (Nationality dropdown)
- **`QST-PART-008`**: `Country name` (Conditional foreign country text input)
- **`QST-PART-009`**: `Enter the primary location of Practice` (Address input)
- **`QST-PART-010`**: `Mobile Number` (Malaysian mobile telephone input)
- **`QST-PART-011`**: `customer_email` (Email address input)

#### 2. Branch Addition Sub-Flow
- **`DIS-PART-001`**: `LEG-BRANCH-001` — *"Note: This offer is only available for branches with with less than a total revenue of RM 5,000,000 per annum..."*
- **`ACT-PART-001`**: `Add Clinic / Branch` -> opens `#jsBranchModal`
- **`FLD-BRAN-001`**: `modal_branch_name` (`Clinic name/ Branch name`, placeholder `e.g Klinik Damansara`)
- **`FLD-BRAN-002`**: `modal_branch_address` (`Clinic Address`, placeholder `ex. 2, angaksaraya jin amang, Kuala Lumpur`)
- **`FLD-BRAN-003`**: `modal_branch_phone` (`Phone number`, placeholder `12 34 356789`)
- **`ACT-BRAN-001`**: `Cancel` (`.btn-modal-cancel`) -> closes modal without saving
- **`ACT-BRAN-002`**: `Add Clinic / Branch` (`.btn-modal-save`) -> validates and appends branch card

#### 3. Individual Underwriting Declarations
- **`QST-DECL-001`**: `I agree that No claim have ever been made or lawsuits been brought against me` (Buttons: Agree / Disagree)
- **`QST-DECL-002`**: `Are you aware of any errors, omissions, offences, circumstances or allegations which might result in a claim being made against you?` (Buttons: Yes / No)
- **`QST-DECL-003`**: `Have you ever been the subject of disciplinary action or investigation by any authority or regulator or professional body?` (Buttons: Yes / No)
- **`QST-DECL-004`**: `Have you ever been the subject of a criminal investigation or had criminial charges brought against you? For the purposes of this question, please disregard traffic or minor motor vehicle licensing offences` *(sic)* (Buttons: Yes / No)

#### 4. Clinic Entity Underwriting Declarations
- **`QST-CDEC-001`**: `clinic_package_have_claim_ever_been_made` (Yes / No)
- **`QST-CDEC-002`**: `clinic_package_aware_of_errors` (Yes / No)
- **`QST-CDEC-003`**: `clinic_package_have_been_disciplinary_action` (Yes / No)
- **`QST-CDEC-004`**: `clinic_package_had_criminal_charges` (Yes / No)

#### 5. Legal & Statutory Submissions
- **`DIS-PART-002`**: `LEG-CONSENT-002` — *"By proceeding, you agree that you have complied with all local regulations pertaining to your profession..."*
- **`ACT-PART-002`**: `Important Notices to the Applicants` -> opens `#jsImportantAndNoticesModel`
- **`ACT-PART-003`**: `<< Back` (`#jsPage3Back`) -> returns to Step 2
- **`ACT-PART-004`**: `Next >>` (`#jsPage3Submit`) -> validates Step 3; routes to Referral, COVID, or Payment

---

### SCREENS 04A, 04B, 04C: COVID-19 Risk Questionnaires

- **`QST-CVD-001` to `QST-CVD-025`**: Complete catalog of all 25 statutory facility risk, infection control, and business continuity questions (`FLD-CVD-042` to `FLD-CVD-069`).
- **`DIS-CVD-001`**: Final declaration: *"The Applicant declares that, after enquiry, to the best knowledge of all persons to be insured the statements set forth herein..."*
- **`ACT-CVD-001` to `ACT-CVD-006`**: `<< Back` and `Next >>` step transitions across Pages 11, 12, and 13.

---

### SCREEN-05 & SCREEN-06: Support Referral & Underwriting Escalation (`#jsPage8` & `#jsContact`)

- **`QST-REF-001`**: `CONTACT SUPPORT` (Step 8 primary heading)
- **`MSG-REF-001`**: `PLEAESE CALL SUPPORT OFFICE` *(sic)*
- **`QST-REF-002`**: `We need more information to process your application, Will you be ok for our manger to call you at` *(sic)*
- **`ACT-REF-001`**: `Yes` (`#jsPage8Yes`) -> advances to `#jsContact`
- **`ACT-REF-002`**: `No` (`#jsPage8No`) -> exits workflow
- **`QST-REF-003`**: `CONTACT DETAIL` (Contact form heading)
- **`FLD-REF-001` to `FLD-REF-004`**: `contact_name`, `clinical_name`, `contact_phone`, `contact_email_id`
- **`ACT-REF-003`**: `Submit` (`#jsContactSubmit`) -> calls `/api/contactSupport`

---

### SCREEN-07: Payment Method Selection (`#jsPage10`)

- **`QST-PAY-001`**: `Choose anyone of the payment option below:` *(sic)*
- **`OPT-PAY-001`**: `Credit/Debit Card/Wallet/Personal Internet Banking` (`#jsCreditCardPayment`)
- **`OPT-PAY-002`**: `Business Internet Banking` (`#jsBusinessPayment`)
- **`DIS-PAY-001`**: `LEG-RETRO-002` — Non-continuous retroactive coverage disclosure notice
- **`ACT-PAY-001`**: `<< Back` (`#jsFinalPageBack`) -> returns to Step 3
- **`ACT-PAY-002`**: `Proceed to payment` (`#jsFinalPageSubmit`) -> posts to `/api/initiatePayment` and redirects

---

## 3. Reconciliation Mechanism to Rebuilt Portal

To ensure that 100% of the approved insurance product, underwriting logic, legal content, and regulatory obligations are preserved without omission during the redesign, every Content ID is reconciled forward via the following mapping architecture:

```
[Original Content ID] 
       │
       ▼
[Reconciliation Matrix Entry]
       │
       ├── Original ID & Text (Verbatim Source)
       ├── Classification Level ([VERIFIED])
       ├── Target Redesign Component (Design System Spec)
       ├── Functional / Underwriting Mapping
       ├── Content Correction Status (Verbatim vs CCR Approved)
       └── Verification Checkpoint (Unit / E2E Test ID)
```

### Reconciliation Rules:
1. **Rule of Zero Omission:** No content ID may be retired or discarded. If a component is redesigned (e.g. converting raw button toggles to accessible segmented controls), the underlying `QST-`, `FLD-`, and `OPT-` IDs remain bound to that component.
2. **Rule of Verbatim Fidelity:** All `LEG-` and `DIS-` identifiers must render identical character-for-character strings unless a formal Content Change Request (`CCR-NNN`) is recorded in `DECISION_LOG.md` and approved by the Legal Owner.
3. **Traceability in Code:** In the future Phase 3 implementation, each UI component and schema definition will include a JSDoc / metadata tag referencing its source Content ID:
   ```typescript
   /**
    * @contentId FLD-CALC-CLASS-001
    * @sourceScreen SCREEN-01
    * @invariant Preserve 23 approved underwriting classifications verbatim
    */
   export const classificationFieldSchema = z.enum([...]);
   ```

