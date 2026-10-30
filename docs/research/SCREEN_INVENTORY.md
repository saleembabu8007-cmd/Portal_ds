# SCREEN INVENTORY
## DoctorShield Individual Medical Professional Indemnity Portal — Forensic Audit

> **Document ID:** `DOC-SCREEN-INV-001`  
> **Classification:** [VERIFIED]  
> **Date of Observation:** 2026-10-29  
> **Auditor:** Principal Product Architect & Engineering Lead  
> **Scope:** Forensic catalog of all 7 core pages/steps, 23 modal dialogs, and 2 external pathways discovered in `https://my-individualindemnity.doctorshield.com/`.

---

## 1. Inventory Summary & Master Index

The legacy portal is architected as a single-page multi-step wizard application (SPA) driven by jQuery and Bootstrap 4, where each logical screen is a `<div class="page_div">` toggled dynamically with `.hidden` or animated CSS transitions, accompanied by 23 bootstrap modal overlays (`.modal.fade`).

### Core Wizard Steps

| Screen ID | Container DOM ID | Wizard Title / Heading | Progress % | Primary Purpose | Evidence Reference |
|---|---|---|---|---|---|
| **SCREEN-01** | `#jsPage1` | CALCULATE YOUR PREMIUM INSTANTLY | 0% | Classification, liability tier, policy period, promo code, basic consent | `SCR-001`, `SCR-002`, `PAGE-01` |
| **SCREEN-02** | `#jsPage2` | QUOTATION | 33% | Instant price quote, clinic ownership, PIC status, add-on coverage selection | `SCR-003`, `SCR-004`, `PAGE-02` |
| **SCREEN-03** | `#jsPage3` | Personal Particulars | 66% | Personal particulars, practice address, branch clinics, underwriting declarations | `SCR-010`, `PAGE-03` |
| **SCREEN-04A** | `#jsPage11RegulatoryAndVirusQuestions` | Regulatory Based Considerations & Virus Management | 66% (Sub) | Conditional COVID-19 risk questionnaire: sanctions, liability clauses, virus infection/screening | `PAGE-11` |
| **SCREEN-04B** | `#jsPage12BusinessContiunityQuestions` | Business Continuity Planning | 66% (Sub) | Conditional COVID-19 risk questionnaire: operational continuity, PPE, emergency plans | `PAGE-12` |
| **SCREEN-04C** | `#jsPage13EmployeeAndCommunicationQuestions` | Employee Training / Awareness & Communication | 66% (Sub) | Conditional COVID-19 risk questionnaire: staff training, hospital transfers, crisis comms | `PAGE-13` |
| **SCREEN-05** | `#jsPage8` | CONTACT SUPPORT (Referral Pathway) | 100% | Underwriting referral state when practitioner exceeds online parameters | `PAGE-08` |
| **SCREEN-06** | `#jsContact` | CONTACT DETAIL | 100% | Referral contact information capture for callback by Relationship Manager | `PAGE-CONTACT` |
| **SCREEN-07** | `#jsPage10` | Choose anyone of the payment option below: | 100% | Payment method selection (Personal vs Business Banking) and checkout redirect | `PAGE-10` |

### Specialized & External Pathways

| Pathway ID | Route / URL | Heading / Title | Purpose | Evidence Reference |
|---|---|---|---|---|
| **PATH-RENEW** | `/renew` | Verification / Policies tagged to your mobile number | Mobile-lookup, SMS/WhatsApp OTP authentication, renewal quote display & checkout | `SCR-005`, `SCR-030`, `SCR-031` |
| **PATH-CLAIM** | Modal Trigger (`#jsInitialClaimFormModal`) | Initial Claim Form Verification | OTP-verified claims lookup and notification | `MODAL-19` |

---

## 2. Detailed Screen Specifications

---

### SCREEN-01: Calculate Your Premium Instantly (`#jsPage1`)

| Parameter | Specification | Evidence / Notes |
|---|---|---|
| **DOM Container** | `<div id="jsPage1" class="animation page_div">` | Default visible state on load |
| **Progress Indicator** | `0%` | Visual progress bar in header |
| **Main Heading** | `CALCULATE YOUR PREMIUM INSTANTLY` (`<h3>`) | Kanit / sans-serif styling |
| **Header Badge** | `CHUBB ELITE MEDICAL MALPRACTICE INSURANCE` | Fixed upper badge |
| **Screenshots** | Desktop: `SCR-001` \| Mobile: `SCR-002` | Stored in `/docs/evidence/screenshots/` |

#### Field & Input Inventory

| Field ID / Name | Tag / Type | Label Copy | Placeholder | Validation & Formatting | Options / Values | Required? |
|---|---|---|---|---|---|---|
| `classification_id` | `<select>` | *(No `<label>` tag)* | `Classification` | Must select non-empty value | 23 values (IDs 1–26, e.g. `7`: General Medical Practitioner, `5`: Govt Doctor/Dentist, `20`: GP with Aesthetics, `15`: Private Specialist) | **Yes** |
| `liability_id` | `<select>` | *(No `<label>` tag)* | `Limit Of Liability` | Dynamically loaded via AJAX (`/api/getSpecialization`) based on `classification_id` | Populates tiers e.g., RM 250k, RM 500k, RM 1M, RM 1.5M, RM 2M, RM 3M, RM 5M, RM 10M | **Yes** |
| `insurance_start_date` | `<input type="tel">` | *(No `<label>` tag)* | `Insurance Start Date` | Date format DD/MM/YYYY. Rule: "date should be within nine months from today". If backdated, triggers `#jsBackDateEnableModel`. | User-entered or datepicker selected | **Yes** |
| `insurance_end_date` | `<input type="text">` | *(No `<label>` tag)* | `Insurance End Date` | Calculated automatically based on standard 12-month or specific APC cycle | Non-editable / auto-set | **Yes** |
| `customer_email` | `<input type="email">` | *(No `<label>` tag)* | `Your Email` | Regex format check: `^[^@]+@[^@]+\.[^@]+$`. Error: `*Your email address is not valid.` | Free text | **Yes** |
| `promo_code` | `<input type="text">` | *(No `<label>` tag)* | `Promo Code` | Optional. If changed post-calculation, triggers `#jsNewPromocodeChangeModel`. | Partner code (e.g. MAAM, APHM) | No |
| `terms_and_conditions` (`#jsContactTermsAndCondition`) | `<input type="checkbox">` | `I have read, understood and agree to the terms and conditions, privacy policy and I meet all local regulation to practice my profession.` | None | Must be checked before submit. Error: `* Required` | Boolean | **Yes** |

#### Static Disclosures & Links
1. **PIDM Notice:**
   > *"The benefit(s) payable under eligible certificate/ policy/ product is(are) protected by PIDM up to limits. Please refer to PIDM’s TIPS Brochure or contact Chubb Insurance Malaysia Berhad or PIDM (visit www.pidm.gov.my)."*
2. **Product Disclosure Sheets:**
   - Link: `Product Disclosure Sheet (English)` -> `/assets/Product_Disclosure_Sheet_English.pdf`
   - Link: `(Malay)` -> `/assets/Product_Disclosure_Sheet_Malay.pdf`
3. **Legal Links:**
   - Link: `terms and conditions,` -> `https://my.doctorshield.com/terms-of-use`
   - Link: `privacy policy` -> `https://my.doctorshield.com/privacy-policy`

#### Action Buttons & Controls
- `Calculate` (`<button id="jsPage1Submit" class="btn btn-success">`): Validates inputs, sends request to `/api/calculatePremium`, unhides `#jsPage2`, scrolls to top.
- `Reset` (`#jsResetForm`): Clears form state.
- Policy End Date Info Icon: Triggers `#periodEndDateInfo` modal explaining coverage term rules.

---

### SCREEN-02: Quotation & Coverage Customisation (`#jsPage2`)

| Parameter | Specification | Evidence / Notes |
|---|---|---|
| **DOM Container** | `<div id="jsPage2" class="page_div hidden">` | Unhidden upon successful quote calculation |
| **Progress Indicator** | `33%` | Visual progress bar in header |
| **Main Heading** | `QUOTATION` (`<h3>`) | Displays instant quote breakdown |
| **Screenshots** | `SCR-003`, `SCR-004` | Scrolled state and interactive add-ons |

#### Displayed Premium Breakdown
- Dynamic tier tag: `DISCOUNTED INDIVIDUAL PREMIUM` or `SPECIAL INDIVIDUAL PREMIUM`
- Note (i): `This premium is pro-rated for the period [Start Date] to [End Date]`
- Note (ii): `For your information, the standard premium for a 12 month period will be RM [Standard Amount]`
- Sub-totals:
  - `Individual: RM [Amount]`
  - `Clinic: RM [Amount]`
  - `+`
  - `Total: RM [Amount]`
  - Tag: `(Inclusive of SST & Stamp Duty)`
- Feature notice: `Your Insurance comes with complimentary Automatic Reinstatement now`

#### Interactive Questionnaire & Add-on Selectors

| Question / Feature | Controls | Options / Values | Conditional Behavior / Dependencies |
|---|---|---|---|
| **"Do you own a clinic?"** | Button toggle group | `Yes` \| `No` | If `Yes`, reveals Clinic Type question, Clinic Locum question, and Clinic Liability options. |
| **"Is it a Sole proprietor or partnership / sdn bhd?"** | Button group | `Sole Proprietor` \| `Partnership / Sdn Bhd` | Visible only if clinic ownership = `Yes`. If `Partnership / Sdn Bhd`, requires corporate legal name on Step 3. |
| **"Do you hire locums who sees new patients on their own?"** *(sic)* | Button toggle group | `Yes` \| `No` | Visible only if clinic ownership = `Yes`. Informs clinic risk profile. |
| **"Are you a Person-In-Charge (PIC) for any clinic?"** | Button toggle group | `Yes` \| `No` | Evaluates regulatory statutory exposure. |
| **"Are you a Person-In-Charge (PIC) with another establishment?"** | Button toggle group | `Yes` \| `No` | Evaluates multi-facility exposure. If `Yes` to either PIC question, suggests PIC coverage add-on. |
| **Clinic Limit of Liability** | `<select id="clinic_liability_id">` | Dropdown (e.g. RM 500k, RM 1M, RM 2M) | Active if Clinic ownership = `Yes`. |
| **Clinic Indemnity Add-On** | `<input type="checkbox" id="medical_establishment_package">` | `Add This Recommended Coverage` | Adds clinic entity protection. Link: `Why is this recommended?` opens modal. |
| **PIC Coverage Add-On** | `<input type="checkbox" id="pic_coverage_enable_status_value">` | `Buy PIC coverage` | Adds PIC personal defense extension. Link: `Why is this recommended?` opens modal. |
| **Automatic Reinstatement** | `<input type="checkbox" id="reinstatement_package">` | `Do you want to add Automatic Reinstatement` | Note: Shown as complimentary in Malaysian market campaigns. |
| **Fulfillment Mode** | Radio group (`name="emailMeOrOnline"`) | Radio 1: `Buy now` (`#emailMe2`)<br>Radio 2: `Email me the Indicative Quotation and Policy Wording` (`#emailMe1`) | Determines whether submit button advances to Step 3 (`Buy >>`) or sends quotation PDF to email (`Email me...`). |

#### Navigation
- `<< Back` (`#jsPage2Back`): Hides `#jsPage2`, unhides `#jsPage1`.
- `Buy >>` / `Submit` (`#jsPage2Submit`): Validates selections. If `emailMe1` selected, dispatches email and shows modal. If `emailMe2` selected, unhides `#jsPage3`.

---

### SCREEN-03: Personal Particulars & Underwriting Declarations (`#jsPage3`)

| Parameter | Specification | Evidence / Notes |
|---|---|---|
| **DOM Container** | `<div id="jsPage3" class="page_div hidden">` | Advanced from Step 2 |
| **Progress Indicator** | `66%` | Progress header |
| **Main Heading** | `Personal Particulars` (`<h3>`) | Multi-section form |
| **Screenshots** | `SCR-010` | Captured in evidence register |

#### Part A: Personal & Professional Identity

| Field Name / ID | Type | Label | Placeholder | Validation Rule |
|---|---|---|---|---|
| `customer_name` | `text` | *(No label tag)* | `Full Name as per IC` | Must match official NRIC/Passport. Regex allows `A-Za-z., @/`. Error: `Allowed character set for full name (A-Za-z., @/)` |
| `dob` | `text` | *(No label tag)* | `DD/MM/YYYY` | Valid date format. Age must meet underwriting limits. |
| `nric` | `text` | *(No label tag)* | `NRIC number` | Malaysian 12-digit NRIC (e.g. `YYMMDD-PB-###` or raw digits) or passport number. |
| `clinical_name` | `text` | *(No label tag)* | `Clinic name (Sdn Bhd/Partnership)` | Required if clinic ownership indicated in Step 2. |
| `income` | `select` / `text` | `Income` | *(Empty)* | Annual professional gross income tier. |
| `nationality` | `select` | `nationality` | `Select Nationality` | Dropdown: Malaysia, Singapore, Hongkong, Thailand, Philippines, Vietnam, Indonesia, Australia, Others. |
| `country_name` | `text` | *(Hidden/cond)* | `Country name` | Visible if nationality = `Others`. |
| `practice_location` | `text` | *(No label tag)* | `Enter the primary location of Practice` | Physical address of main hospital / clinic practice. |
| `customer_phone` | `tel` | *(No label tag)* | `Mobile Number` | Malaysian mobile number (`+60`). |
| `customer_email` | `email` | *(No label tag)* | `customer_email` | Pre-populated from Step 1. |

#### Part B: Additional Clinic Branches (`#jsBranchModal`)
- Trigger button: `Add Clinic / Branch`
- Helper text:
  > *"Note: This offer is only available for branches with with less than a total revenue of RM 5,000,000 per annum. Kindly contact our clients services if in doubt."*
- Interactive modal (`#jsBranchModal`) captures:
  - `modal_branch_name` ("Clinic name/ Branch name")
  - `modal_branch_address` ("Clinic Address")
  - `modal_branch_phone` ("Phone number")
- Persisted into hidden input `branch_details` as serialized JSON/array.

#### Part C: Individual Underwriting Declarations (Mandatory)
Four standard insurance disclosure questions with `Agree` / `Disagree` or `Yes` / `No` buttons:

1. **Claims History:**
   - Prompt: *"I agree that No claim have ever been made or lawsuits been brought against me"*
   - Buttons: `Agree` \| `Disagree`
   - Conditional: If `Disagree` clicked, unhides textarea `#no_claim_desc` ("Please provide details below").
2. **Awareness of Errors / Omissions:**
   - Prompt: *"Are you aware of any errors, omissions, offences, circumstances or allegations which might result in a claim being made against you?"*
   - Buttons: `Yes` \| `No`
   - Conditional: If `Yes`, unhides textarea `#aware_of_errors_desc`.
3. **Disciplinary Inquiries:**
   - Prompt: *"Have you ever been the subject of disciplinary action or investigation by any authority or regulator or professional body?"*
   - Buttons: `Yes` \| `No`
   - Conditional: If `Yes`, unhides textarea `#desciplinary_action_desc`.
4. **Criminal Charges:**
   - Prompt: *"Have you ever been the subject of a criminal investigation or had criminial charges brought against you? For the purposes of this question, please disregard traffic or minor motor vehicle licensing offences"*
   - Buttons: `Yes` \| `No`
   - Conditional: If `Yes`, unhides textarea `#criminal_charges_desc`.

#### Part D: Clinic Entity Declarations (Active if Clinic Add-on Selected)
Repeats 4 entity-level questions covering principals, partners, directors, and employees:
- `clinic_package_have_claim_ever_been_made` -> textarea `#clinic_package_answers`
- `clinic_package_aware_of_errors`
- `clinic_package_have_been_disciplinary_action`
- `clinic_package_had_criminal_charges` -> textarea `#clinic_package_criminal_charges_desc`

#### Part E: Legal Agreement & Notices
- Checkbox:
  > *"By proceeding, you agree that you have complied with all local regulations pertaining to your profession and you have further agreed that you have read, understood and accepted to the Declaration and Authorization, Policy Wording, Privacy Policy and Product Disclosure Sheet for this product."*
- Button: `Important Notices to the Applicants` -> opens `#jsImportantAndNoticesModel`.
- Navigation:
  - `<< Back` (`#jsPage3Back`) -> returns to Step 2.
  - `Next >>` (`#jsPage3Submit`):
    - If any adverse underwriting disclosure is flagged -> routes to `#jsPage8` (Referral).
    - If COVID-19 risk criteria met -> routes to `#jsPage11RegulatoryAndVirusQuestions`.
    - If clean application -> routes directly to `#jsPage10` (Payment Selection).

---

### SCREENS 04A, 04B, 04C: Conditional COVID-19 Questionnaires

Three sequential conditional pages embedded in the DOM for special risk or facility applications:

#### 1. Screen 04A: Regulatory & Virus Management (`#jsPage11RegulatoryAndVirusQuestions`)
- **Heading:** `Regulatory Based Considerations` & `Virus Management`
- **Fields:**
  - `policy_surrounding_covid19` (Fined/sanctioned by authorities? Yes/No -> textarea `have_policy_surrounding_covid19_desc`)
  - `disclaimers_limity_of_liability_covid19` (Specimen contract disclaimers for pandemic? Yes/No)
  - `have_been_infected_covid19` (Employees/clients infected? Yes/No)
  - `have_been_died_covid_19` (Employees/clients died? Yes/No)
  - `have_plan_deal_with_covid19` (Action plan in place? Yes/No -> textarea `deal_with_summarize_plan`)
  - `government_guidlines_and_directives` (Textarea: detail action plan beyond government guidelines)
  - Screening checkboxes: `have_exhibit_signs_and_symptoms`, `have_community_based_spread_of_covid19`, `have_local_health_authorities` (14-day quarantine protocol)
- **Buttons:** `<< Back`, `Next >>` -> unhides Page 12.

#### 2. Screen 04B: Business Continuity Planning (`#jsPage12BusinessContiunityQuestions`)
- **Heading:** `Business Continuity Planning`
- **Fields:**
  - Textarea: `serving_customers` (Mitigating exposures for serving customers)
  - Textarea: `business_continuity_operational_capabilities` (Supply chain risks, closed borders)
  - `have_potential_spread_of_covid19` (Emergency preparedness team? Yes/No)
  - `have_designated_infection_preventonist` (Designated Infection Preventionist? Yes/No)
  - Textarea: `emergency_preparedness_plan` (When last updated)
  - Textarea: `have_made_since_jan12020` (Changes made since Jan 1 2020)
  - Textarea: `personal_protective_equipement_and_disinfectant` (Provisions for disruption of PPE)
  - Checkbox: `who_guidence_of_infection_control` (Implemented WHO guidance)
- **Buttons:** `<< Back`, `Next >>` -> unhides Page 13.

#### 3. Screen 04C: Employee Training & Communication (`#jsPage13EmployeeAndCommunicationQuestions`)
- **Heading:** `Employee Training / Awareness` & `Communication Procedures`
- **Fields:**
  - `have_staff_receive_service_covid19` (Infection control training for all staff? Yes/No)
  - `have_symptoms_of_respiratory_infection` (Staff with symptoms told not to work? Yes/No)
  - `have_determined_of_ppe` (PPE controls in place? Yes/No)
  - `have_develop_signs_and_symptoms` (Staff educated on on-the-job symptoms? Yes/No)
  - `have_resident_with_severe_symptoms` (Hospital transfer protocol in place? Yes/No)
  - Textarea: `have_local_health_department_and_medical_services`
  - `have_coronovirus_surveillance_and_prevention` (Formalized communication plan? Yes/No)
  - `have_media_reports_and_resident` (Crisis communication mechanism? Yes/No)
  - Final Declaration:
    > *"The Applicant declares that, after enquiry, to the best knowledge of all persons to be insured the statements set forth herein and if any attachments made hereto are true, and no material facts have been suppressed, omitted, or misstated."*
- **Buttons:** `<< Back`, `Next >>` -> advances to `#jsPage10`.

---

### SCREEN-05: Referral / Support Interruption (`#jsPage8`)

| Parameter | Specification | Evidence / Notes |
|---|---|---|
| **DOM Container** | `<div id="jsPage8" class="animation page_div hidden">` | Triggered on adverse disclosures |
| **Progress Indicator** | `100%` | End state of automated path |
| **Main Heading** | `CONTACT SUPPORT` (`<h3>`) | Prevents automated policy issuance |
| **Displayed Notice** | `PLEAESE CALL SUPPORT OFFICE` *(sic)* | Notable spelling typo in legacy system |
| **Prompt Copy** | `We need more information to process your application, Will you be ok for our manger to call you at` *(sic: "manger")* | Note truncated sentence ending and typo |
| **Buttons** | `Yes` (`#jsPage8Yes`) \| `No` (`#jsPage8No`) | `Yes` transitions to `#jsContact`; `No` exits or returns. |

---

### SCREEN-06: Referral Contact Details (`#jsContact`)

| Parameter | Specification | Evidence / Notes |
|---|---|---|
| **DOM Container** | `<div id="jsContact" class="animation hidden page_div">` | Callback request form |
| **Main Heading** | `CONTACT DETAIL` (`<h3>`) | Captures contact coordinates |
| **Fields** | - `contact_name` ("Customer Name")<br>- `clinical_name` ("Clinic name (Sdn Bhd/Partnership)")<br>- `contact_phone` ("Mobile number")<br>- `contact_email_id` ("Email address") | Client-side format validation applies |
| **Buttons** | `<< Back` (`#jsContactPrevButton`) \| `Submit` (`#jsContactSubmit`) | Calls `/api/contactSupport`. Notifies user that a Relationship Manager has been assigned. |

---

### SCREEN-07: Payment Selection & Checkout (`#jsPage10`)

| Parameter | Specification | Evidence / Notes |
|---|---|---|
| **DOM Container** | `<div id="jsPage10" class="animation page_div hidden">` | Final checkout gateway selection |
| **Progress Indicator** | `100%` | Complete |
| **Instruction** | `Choose anyone of the payment option below:` | Radio option selection |
| **Payment Options** | **Option 1:** `Credit/Debit Card/Wallet/Personal Internet Banking` (`#jsCreditCardPayment`)<br>**Option 2:** `Business Internet Banking` (`#jsBusinessPayment`) | Standard Malaysian payment channels (FPX / Card) |
| **Retroactive Period Disclosure** | Displays retroactive date terms: *"CHUBB ELITE MEDICAL MALPRACTICE INSURANCE FOR PERIOD OF INSURANCE. NON-CONTINUOUS RETROACTIVE COVERAGE PERIOD..."* | Mandatory statutory acknowledgment |
| **Buttons** | `<< Back` (`#jsFinalPageBack`) \| `Proceed to payment` (`#jsFinalPageSubmit`) | Triggers `/api/initiatePayment` and external redirect to payment gateway |

---

## 3. Complete Modal Dialog Inventory (23 Modals)

| Modal ID | Trigger / Source | Title / Heading | Body Copy / Description | Actions / Buttons | Evidence |
|---|---|---|---|---|---|
| **MODAL-01** `intro_modal` | Auto-triggered if non-MY geo detected | `WELCOME` | *"Dear customer, These solutions are currently available in Malaysia only."* | `OK` | `MODAL-23` |
| **MODAL-02** `specializationModal` | Multi-specialization selection | `SERVICE DETAILS` | Multi-specialty allocation table. Enforces: *"Sum of percentage should be 100"* and *"The value must be greater than zero."* | `Close`, `Reset`, `Submit` | `MODAL-01` |
| **MODAL-03** `jsCalculatePageEditModal` | Changing input after calculation | `Kindly review the details provided and confirm to proceed` | Confirms user intention to re-rate premium and discard existing quote. | `Edit`, `Confirm` | `MODAL-10` |
| **MODAL-04** `jsTaxDisplayModel` | SST / Stamp duty inspection | `Kindly review your personal details below and confirm to proceed` | Displays tax and duty breakdown summary before final submission. | `Edit`, `Confirm` | `MODAL-09` |
| **MODAL-05** `periodEndDateInfo` | End date tooltip icon on Step 1 | `Policy End Date` | Explains policy period rules (APC cycle alignment to Dec 31st vs standard 12 months). | `OK` | `MODAL-16` |
| **MODAL-06** `jsBackDateEnableModel` | Backdated start date entered | `Policy Backdate Agreement` | Enforces acknowledgment of non-continuous retroactive exclusions for incidents between start date and current date. | `Disagree`, `Agree` | `MODAL-14` |
| **MODAL-07** `jsNewPromocodeChangeModel` | Changing promo code on calculated quote | `Notes` | Informs user that changing promo code will recalculate the entire quote. | `Ok` | `MODAL-12` |
| **MODAL-08** `jsImportantAndNoticesModel` | Important Notices button on Step 3 | `Important Notices to the Applicants` | Full statutory and underwriting disclosures under Financial Services Act 2013 duty of disclosure. | `Close` | `MODAL-13` |
| **MODAL-09** `jsBranchModal` | "Add Clinic / Branch" button on Step 3 | `Add Clinic / Branch` | Captures Branch Name, Address, and Phone number for complimentary branch coverage. | `Cancel`, `Add Clinic / Branch` | `MODAL-15` |
| **MODAL-10** `jsFormRenewModal` | Renewal navigation link / entry | `Verification` | Prompts for registered mobile number, OTP method (`Message OTP` / `Whatsapp OTP`), and OTP validation. | `Message OTP`, `Whatsapp OTP`, `Generate OTP` | `MODAL-18` |
| **MODAL-11** `mailRenewModal` | Renewal deep link from email | `Verification` | Validates renewal security token sent via email notification. | `Verify` | `MODAL-17` |
| **MODAL-12** `jsUserPolicyList` | Successful renewal OTP verification | `Policies tagged to your mobile number` | Shows policy card with policy number, insured name, specialty, expiry date, and renew action. | `Close`, `Select Policy` | `MODAL-20` |
| **MODAL-13** `jsInitialClaimFormModal` | "File a Claim" or claims link | `Verification` | OTP verification before accessing initial claims declaration form. | `Message OTP`, `Whatsapp OTP`, `Generate OTP` | `MODAL-19` |
| **MODAL-14** `jsStartDateValidationErrorModal` | Expired session or invalid date | `Session Expired` | Informs user that calculation session has timed out. | `Ok` | `MODAL-05` |
| **MODAL-15** `jsServerSideErrorModal` | Backend 500 / API failure | `Error` | Generic error message instructing user to retry or call support. | `Ok` | `MODAL-06` |
| **MODAL-16** `jsContactUsNegativeQuoteErrorModel` | Zero or negative premium calculated | `Notes` | Occurs when rating table returns error or invalid category combination. | `Ok` | `MODAL-07` |
| **MODAL-17** `jsReIndicativeQuoteErrorModel` | Quote retrieval error | `Notes` | Displayed when saved quote reference number cannot be loaded. | `Ok` | `MODAL-02` |
| **MODAL-18** `jsAlreadyBoughtModal` | Duplicate policy purchase attempt | `Notes` | Warns user that an active policy already exists for this NRIC/mobile. | `Continue to purchase` | `MODAL-03` |
| **MODAL-19** `jsCookiePopupModel` | Privacy / Cookie consent | `Notice` | Cookie usage consent modal. | `Ok` | `MODAL-04` |
| **MODAL-20** `jsReIncompleteQuoteErrorModel` | Incomplete quote data | `Notes` | Prompt when required fields are missing during quote recovery. | `Ok` | `MODAL-08` |
| **MODAL-21** `jsExpireContactusQuoteErrorModel` | Quotation validity expired | `Notes` | Informs applicant that the 30-day quote window has lapsed. | `Ok` | `MODAL-11` |
| **MODAL-22** `jsEmailErrorModel` | Email dispatch failure | `Notes` | Alerts user if quotation email could not be delivered. | `Ok` | `MODAL-21` |
| **MODAL-23** `periodEndDateInfo` *(dup ID)* | Secondary end date info trigger | `Policy End Date` | Duplicate DOM instance of period end date tooltip. | `OK` | `MODAL-22` |

