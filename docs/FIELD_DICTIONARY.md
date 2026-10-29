# FIELD DICTIONARY
## DoctorShield Individual Medical Professional Indemnity Portal

> **Document ID:** `DOC-DICT-FLD-001`  
> **Status:** Authoritative Baseline (Phase 1)  
> **Classification:** [VERIFIED]  
> **Last Updated:** 2026-10-29  
> **Owner:** Principal Product Architect & Integration Lead  
> **Scope:** Complete specification of every user input, selector, toggle, checkbox, and hidden state variable in `https://my-individualindemnity.doctorshield.com/`.

---

## 1. Step 1: Calculation Parameters (`#jsPage1`)

---

### FLD-001: Professional Classification
- **Field ID:** `FLD-CALC-CLASS-001`
- **Original Screen ID:** `SCREEN-01` (`#jsPage1`)
- **DOM Name / ID:** `name="classification_id"` \| `id="classification_id"`
- **Customer-Facing Label:** *(None in legacy DOM; placeholder used)*
- **Placeholder:** `Classification`
- **Description / Helper Text:** Primary medical or dental professional classification determining underwriting risk category.
- **Data Type & Format:** `string` (Integer ID as string)
- **Status:** **Required**
- **Default Value:** `""` (Empty default with prompt text)
- **Enumerated Options (23 values):**
  1. `""` -> `Classification`
  2. `"5"` -> `Government Doctor/Dentist`
  3. `"26"` -> `Government Dentist (with specialisation) locum exposure`
  4. `"21"` -> `Government General Dentist with locum exposure`
  5. `"16"` -> `Government Specialist with locum exposure`
  6. `"19"` -> `Government Medical officer with locum exposure`
  7. `"13"` -> `General Dentist`
  8. `"25"` -> `Dentist (Private sector)`
  9. `"7"` -> `General Medical Practitioner`
  10. `"8"` -> `General Medical Practitioner Obstetrics`
  11. `"20"` -> `General Medical Practitioner with Cosmetic and Aesthetic`
  12. `"15"` -> `Specialist (Private sector)`
  13. `"17"` -> `Part-time Specialist`
  14. `"18"` -> `Semi-retired Specialist`
  15. `"9"` -> `Allied Health Practitioner`
  16. `"4"` -> `Lecturer`
  17. `"3"` -> `Hospital Staff`
  18. `"2"` -> `Nurses`
  19. `"1"` -> `Medical Assistant`
  20. `"14"` -> `Student`
  21. `"22"` -> `Non-practising, Fully Retired & Non-clinical Doctors`
  22. `"23"` -> `Chiropractor`
  23. `"24"` -> `Optometrist`
- **Validation Rules:** Must select a non-empty option.
- **Error Message:** `Please select classification`
- **Conditions Controlling Visibility:** Always visible on Step 1.
- **Dependencies & Downstream Effects:** Triggers AJAX `POST /api/getSpecialization` to dynamically populate `#liability_id` (`FLD-CALC-LIAB-002`) and sets base premium factors. If specialty requires breakdown, opens `#specializationModal`.
- **Source API Mapping:** `classification_id`
- **PDPA / PII Classification:** Non-PII (Professional Category)
- **Audit Uncertainty:** None. [VERIFIED]

---

### FLD-002: Limit of Liability
- **Field ID:** `FLD-CALC-LIAB-002`
- **Original Screen ID:** `SCREEN-01` (`#jsPage1`)
- **DOM Name / ID:** `name="liability_id"` \| `id="liability_id"`
- **Customer-Facing Label:** *(None in legacy DOM)*
- **Placeholder:** `Limit Of Liability`
- **Description / Helper Text:** Maximum indemnity amount payable by the underwriter in the aggregate for the policy period.
- **Data Type & Format:** `string` (Integer ID as string)
- **Status:** **Required**
- **Default Value:** `""`
- **Enumerated Options (Dynamic via `/api/getSpecialization`):**
  - `"1"` -> `RM 250,000` (available for Govt Doctors / Allied Health)
  - `"2"` -> `RM 500,000`
  - `"3"` -> `RM 1,000,000`
  - `"4"` -> `RM 1,500,000`
  - `"5"` -> `RM 2,000,000`
  - `"6"` -> `RM 3,000,000`
  - `"7"` -> `RM 5,000,000`
  - `"8"` -> `RM 10,000,000`
- **Validation Rules:** Must select a valid tier option populated for the active classification.
- **Error Message:** `Please select the limit of liability`
- **Conditions Controlling Visibility:** Always visible on Step 1; disabled/empty until classification selected.
- **Dependencies & Downstream Effects:** Determines base rate in rating calculation.
- **Source API Mapping:** `liability_id`
- **PDPA / PII Classification:** Non-PII (Financial Coverage Selection)
- **Audit Uncertainty:** None. [VERIFIED]

---

### FLD-003: Insurance Start Date
- **Field ID:** `FLD-CALC-DATE-START-003`
- **Original Screen ID:** `SCREEN-01` (`#jsPage1`)
- **DOM Name / ID:** `name="insurance_start_date"` \| `id="insurance_start_date"`
- **Customer-Facing Label:** *(None in legacy DOM)*
- **Placeholder:** `Insurance Start Date`
- **Data Type & Format:** Date string, `DD/MM/YYYY` (HTML input type: `tel`)
- **Status:** **Required**
- **Default Value:** Current Date (in DD/MM/YYYY)
- **Validation Rules:**
  1. Must be a valid calendar date format `DD/MM/YYYY`.
  2. Future date limit: Must not exceed 9 months from current date.
  3. Past date trigger: If date is prior to current date, triggers `#jsBackDateEnableModel` requiring agreement to Clause 6.12 exclusions.
- **Error Messages:**
  - `Please enter a valid date, date should be within nine months from today.`
  - `Invalid period`
- **Conditions Controlling Visibility:** Always visible on Step 1.
- **Dependencies & Downstream Effects:** Sets policy inception date. Computes pro-rated factor against policy end date.
- **Source API Mapping:** `insurance_start_date`
- **PDPA / PII Classification:** Non-PII
- **Audit Uncertainty:** None. [VERIFIED]

---

### FLD-004: Insurance End Date
- **Field ID:** `FLD-CALC-DATE-END-004`
- **Original Screen ID:** `SCREEN-01` (`#jsPage1`)
- **DOM Name / ID:** `name="insurance_end_date"` \| `id="insurance_end_date"`
- **Customer-Facing Label:** *(None in legacy DOM)*
- **Placeholder:** `Insurance End Date`
- **Data Type & Format:** Date string, `DD/MM/YYYY`
- **Status:** **Required** (Auto-populated / Non-editable)
- **Default Value:** Automatically set to `31/12/YYYY` or 12 months from start date.
- **Validation Rules:** System-calculated.
- **Conditions Controlling Visibility:** Always visible on Step 1. Clicking info icon opens `#periodEndDateInfo`.
- **Dependencies & Downstream Effects:** Governs pro-rata factor.
- **Source API Mapping:** `insurance_end_date`
- **PDPA / PII Classification:** Non-PII
- **Audit Uncertainty:** None. [VERIFIED]

---

### FLD-005: Customer Email (Step 1)
- **Field ID:** `FLD-CALC-EMAIL-005`
- **Original Screen ID:** `SCREEN-01` (`#jsPage1`)
- **DOM Name / ID:** `name="customer_email"` \| `id="customer_email"`
- **Customer-Facing Label:** *(None in legacy DOM)*
- **Placeholder:** `Your Email`
- **Data Type & Format:** `email`
- **Status:** **Required**
- **Default Value:** `""`
- **Validation Rules:** Standard RFC 5322 regex.
- **Error Messages:**
  - `Please enter a valid email address`
  - `*Your email address is not valid.`
- **Conditions Controlling Visibility:** Always visible on Step 1.
- **Dependencies & Downstream Effects:** Persisted to Step 2 for quotation emailing and pre-populates Step 3 `#customer_email`.
- **Source API Mapping:** `customer_email`
- **PDPA / PII Classification:** **PII (Personal Identifiable Information)**
- **Audit Uncertainty:** None. [VERIFIED]

---

### FLD-006: Promo Code
- **Field ID:** `FLD-CALC-PROMO-006`
- **Original Screen ID:** `SCREEN-01` (`#jsPage1`)
- **DOM Name / ID:** `name="promo_code"` \| `id="promo_code"`
- **Customer-Facing Label:** *(None in legacy DOM)*
- **Placeholder:** `Promo Code`
- **Data Type & Format:** `string` (Alphanumeric)
- **Status:** Optional
- **Default Value:** `""` (or pre-set via campaign query parameter `?promo=...`)
- **Validation Rules:** Validated server-side against partner association discount rules.
- **Error Message:** `Please enter a valid promo code`
- **Conditions Controlling Visibility:** Always visible on Step 1.
- **Dependencies & Downstream Effects:** Modifies total premium calculation. If edited post-quote, triggers `#jsNewPromocodeChangeModel`.
- **Source API Mapping:** `promo_code`
- **PDPA / PII Classification:** Non-PII
- **Audit Uncertainty:** None. [VERIFIED]

---

### FLD-007: Terms & Regulations Consent Checkbox
- **Field ID:** `FLD-CALC-CONSENT-007`
- **Original Screen ID:** `SCREEN-01` (`#jsPage1`)
- **DOM Name / ID:** `name="terms_and_conditions"` \| `id="jsContactTermsAndCondition"`
- **Customer-Facing Label:** `I have read, understood and agree to the terms and conditions, privacy policy and I meet all local regulation to practice my profession.`
- **Placeholder:** *(None)*
- **Data Type & Format:** `boolean` (Checkbox)
- **Status:** **Required**
- **Default Value:** `false` (Unchecked)
- **Validation Rules:** Must be checked (`true`) to allow submission.
- **Error Message:** `* Required`
- **Conditions Controlling Visibility:** Always visible on Step 1.
- **Dependencies & Downstream Effects:** Gatekeeper to `/api/calculatePremium`.
- **Source API Mapping:** `terms_and_conditions`
- **PDPA / PII Classification:** Regulatory Consent
- **Audit Uncertainty:** None. [VERIFIED]

---

## 2. Step 2: Quotation & Coverage Selection (`#jsPage2`)

---

### FLD-008: Clinic Ownership Status
- **Field ID:** `FLD-QUOTE-CLINIC-OWN-008`
- **Original Screen ID:** `SCREEN-02` (`#jsPage2`)
- **DOM Name / ID:** `name="do_you_own_clinic_status_value"` \| `id="do_you_own_clinic_status_value"`
- **Customer-Facing Question / Label:** `Do you own a clinic?`
- **Controls:** Button toggle group: `Yes` (`.btn-light`) \| `No` (`.btn-outline-light`)
- **Data Type & Format:** `integer` (`1` for Yes, `0` for No)
- **Status:** **Required**
- **Default Value:** None (Prompt: `*Please select any one option`)
- **Validation Rules:** User must select Yes or No before proceeding.
- **Error Message:** `*Please select any one option`
- **Conditions Controlling Visibility:** Always visible on Step 2.
- **Dependencies & Downstream Effects:**
  - If `Yes`: Dynamically reveals FLD-009 (Structure), FLD-010 (Locums), FLD-013 (Clinic Limit), and FLD-014 (Clinic Package).
  - If `No`: Hides all clinic-related inputs and resets clinic premium to RM 0.
- **Source API Mapping:** `do_you_own_clinic_status_value`
- **PDPA / PII Classification:** Non-PII (Practice Ownership)
- **Audit Uncertainty:** None. [VERIFIED]

---

### FLD-009: Clinic Entity Structure
- **Field ID:** `FLD-QUOTE-CLINIC-TYPE-009`
- **Original Screen ID:** `SCREEN-02` (`#jsPage2`)
- **DOM Name / ID:** `name="clinic_type_value"` \| `id="clinic_type_value"`
- **Customer-Facing Question / Label:** `Is it a Sole proprietor or partnership / sdn bhd?`
- **Controls:** Button group: `Sole Proprietor` \| `Partnership / Sdn Bhd`
- **Data Type & Format:** `string` (`"sole_proprietor"` or `"partnership_sdn_bhd"`)
- **Status:** Conditional (Required if FLD-008 = `Yes`)
- **Default Value:** `""`
- **Validation Rules:** Must select an option if FLD-008 is `Yes`.
- **Error Message:** `*Please select any one option`
- **Conditions Controlling Visibility:** Visible only if FLD-008 = `Yes`.
- **Dependencies & Downstream Effects:** If `Partnership / Sdn Bhd`, requires corporate SSM registered entity name on Step 3.
- **Source API Mapping:** `clinic_type_value`
- **PDPA / PII Classification:** Non-PII
- **Audit Uncertainty:** None. [VERIFIED]

---

### FLD-010: Clinic Locum Hiring
- **Field ID:** `FLD-QUOTE-LOCUM-HIRE-010`
- **Original Screen ID:** `SCREEN-02` (`#jsPage2`)
- **DOM Name / ID:** `name="employee_locum_status_value"` \| `id="employee_locum_status_value"`
- **Customer-Facing Question / Label:** `Do you hire locums who sees new patients on their own?` *(sic)*
- **Controls:** Button toggle group: `Yes` \| `No`
- **Data Type & Format:** `integer` (`1` / `0`)
- **Status:** Conditional (Required if FLD-008 = `Yes`)
- **Default Value:** `""`
- **Validation Rules:** Must select an option if clinic ownership declared.
- **Error Message:** `*Please select any one option`
- **Conditions Controlling Visibility:** Visible only if FLD-008 = `Yes`.
- **Dependencies & Downstream Effects:** Informs underwriting risk profile.
- **Source API Mapping:** `employee_locum_status_value`
- **PDPA / PII Classification:** Non-PII
- **Audit Uncertainty:** None. [VERIFIED]

---

### FLD-011: PIC Status (Own Clinic)
- **Field ID:** `FLD-QUOTE-PIC-OWN-011`
- **Original Screen ID:** `SCREEN-02` (`#jsPage2`)
- **DOM Name / ID:** `name="pic_of_own_clinic_or_another_clinic_status_value"` \| `id="pic_of_own_clinic_or_another_clinic_status_value"`
- **Customer-Facing Question / Label:** `Are you a Person-In-Charge (PIC) for any clinic?`
- **Controls:** Button toggle group: `Yes` \| `No`
- **Data Type & Format:** `integer` (`1` / `0`)
- **Status:** **Required**
- **Default Value:** `""`
- **Validation Rules:** Must select an option.
- **Error Message:** `*Please select any one option`
- **Conditions Controlling Visibility:** Always visible on Step 2.
- **Dependencies & Downstream Effects:** If `Yes`, reveals FLD-015 (PIC Coverage Add-On).
- **Source API Mapping:** `pic_of_own_clinic_or_another_clinic_status_value`
- **PDPA / PII Classification:** Non-PII
- **Audit Uncertainty:** None. [VERIFIED]

---

### FLD-012: PIC Status (External Establishment)
- **Field ID:** `FLD-QUOTE-PIC-EXT-012`
- **Original Screen ID:** `SCREEN-02` (`#jsPage2`)
- **DOM Name / ID:** `name="are_you_pic_of_any_clinic_status_value"` \| `id="are_you_pic_of_any_clinic_status_value"`
- **Customer-Facing Question / Label:** `Are you a Person-In-Charge (PIC) with another establishment?`
- **Controls:** Button toggle group: `Yes` \| `No`
- **Data Type & Format:** `integer` (`1` / `0`)
- **Status:** **Required**
- **Default Value:** `""`
- **Validation Rules:** Must select an option.
- **Error Message:** `*Please select any one option`
- **Conditions Controlling Visibility:** Always visible on Step 2.
- **Dependencies & Downstream Effects:** If `Yes`, reveals FLD-015 (PIC Coverage Add-On).
- **Source API Mapping:** `are_you_pic_of_any_clinic_status_value`
- **PDPA / PII Classification:** Non-PII
- **Audit Uncertainty:** None. [VERIFIED]

---

### FLD-013: Clinic Limit of Liability
- **Field ID:** `FLD-QUOTE-CLINIC-LIAB-013`
- **Original Screen ID:** `SCREEN-02` (`#jsPage2`)
- **DOM Name / ID:** `name="clinic_liability_id"` \| `id="clinic_liability_id"`
- **Customer-Facing Label:** *(None in legacy DOM)*
- **Placeholder:** `Clinic Limit Of Liability`
- **Data Type & Format:** `string` (Integer ID as string)
- **Status:** Conditional (Required if FLD-008 = `Yes` and FLD-014 = checked)
- **Default Value:** `""`
- **Options:** Populated based on underwriting schedule (e.g. RM 500,000, RM 1,000,000, RM 2,000,000).
- **Error Message:** `*Please select clinic limit of liability`
- **Conditions Controlling Visibility:** Visible if FLD-008 = `Yes`.
- **Dependencies & Downstream Effects:** Sets clinic indemnity premium amount.
- **Source API Mapping:** `clinic_liability_id`
- **PDPA / PII Classification:** Non-PII
- **Audit Uncertainty:** None. [VERIFIED]

---

### FLD-014: Clinic Indemnity Add-On Selection
- **Field ID:** `FLD-QUOTE-ADDON-CLINIC-014`
- **Original Screen ID:** `SCREEN-02` (`#jsPage2`)
- **DOM Name / ID:** `name="medical_establishment_package_value"` \| `id="medical_establishment_package"`
- **Customer-Facing Label:** `Add This Recommended Coverage`
- **Helper Modal Link:** `Why is this recommended?`
- **Data Type & Format:** `boolean` (Checkbox)
- **Status:** Optional
- **Default Value:** `false`
- **Conditions Controlling Visibility:** Visible if FLD-008 = `Yes`.
- **Dependencies & Downstream Effects:** When checked, adds clinic entity rate to total and enforces Clinic Underwriting Questions on Step 3.
- **Source API Mapping:** `medical_establishment_package_value`
- **PDPA / PII Classification:** Non-PII
- **Audit Uncertainty:** None. [VERIFIED]

---

### FLD-015: PIC Coverage Add-On Selection
- **Field ID:** `FLD-QUOTE-ADDON-PIC-015`
- **Original Screen ID:** `SCREEN-02` (`#jsPage2`)
- **DOM Name / ID:** `name="pic_coverage_enable_status_value"` \| `id="pic_coverage_enable_status_value"`
- **Customer-Facing Label:** `Buy PIC coverage`
- **Helper Modal Link:** `Why is this recommended?`
- **Data Type & Format:** `boolean` (Checkbox)
- **Status:** Optional
- **Default Value:** `false`
- **Conditions Controlling Visibility:** Visible if FLD-011 or FLD-012 = `Yes`.
- **Dependencies & Downstream Effects:** Adds PIC premium surcharge to total quote.
- **Source API Mapping:** `pic_coverage_enable_status_value`
- **PDPA / PII Classification:** Non-PII
- **Audit Uncertainty:** None. [VERIFIED]

---

### FLD-016: Automatic Reinstatement Selection
- **Field ID:** `FLD-QUOTE-ADDON-REINSTATE-016`
- **Original Screen ID:** `SCREEN-02` (`#jsPage2`)
- **DOM Name / ID:** `name="reinstatement_package_value"` \| `id="reinstatement_package"`
- **Customer-Facing Label:** `Do you want to add Automatic Reinstatement`
- **Promotional Copy:** `Your Insurance comes with complimentary Automatic Reinstatement now`
- **Data Type & Format:** `boolean` (Checkbox)
- **Status:** Optional / Auto-bundled
- **Default Value:** `true` (Bundled complimentary in Malaysian campaign)
- **Conditions Controlling Visibility:** Always visible on Step 2.
- **Dependencies & Downstream Effects:** Reinstates aggregate indemnity limit post-claim.
- **Source API Mapping:** `reinstatement_package_value`
- **PDPA / PII Classification:** Non-PII
- **Audit Uncertainty:** None. [VERIFIED]

---

### FLD-017: Fulfillment Action Mode
- **Field ID:** `FLD-QUOTE-FULFILL-MODE-017`
- **Original Screen ID:** `SCREEN-02` (`#jsPage2`)
- **DOM Name / ID:** `name="emailMeOrOnline"` (`#emailMe2` vs `#emailMe1`)
- **Customer-Facing Options:**
  - Option 1 (`#emailMe2`): `Buy now`
  - Option 2 (`#emailMe1`): `Email me the Indicative Quotation and Policy Wording`
- **Data Type & Format:** `string` (`"buy_online"` or `"email_quote"`)
- **Status:** **Required**
- **Default Value:** `#emailMe2` (`Buy now`)
- **Validation Rules:** Exactly one radio option must be selected.
- **Conditions Controlling Visibility:** Always visible on Step 2.
- **Dependencies & Downstream Effects:**
  - If `Buy now`: Submit button triggers transition to Step 3.
  - If `Email me...`: Submit button dispatches `/api/sendIndicativeQuoteMail` and displays confirmation modal.
- **Source API Mapping:** `emailMeOrOnline`
- **PDPA / PII Classification:** Non-PII
- **Audit Uncertainty:** None. [VERIFIED]

---

## 3. Step 3: Personal Particulars & Practice Information (`#jsPage3`)

---

### FLD-018: Full Name as per IC
- **Field ID:** `FLD-PART-NAME-018`
- **Original Screen ID:** `SCREEN-03` (`#jsPage3`)
- **DOM Name / ID:** `name="customer_name"` \| `id="customer_name"`
- **Customer-Facing Label:** *(None in legacy DOM)*
- **Placeholder:** `Full Name as per IC`
- **Data Type & Format:** `string` (Alphabetic with allowed punctuation: `A-Za-z., @/`)
- **Status:** **Required**
- **Default Value:** `""`
- **Validation Rules:** Cannot be empty. Regex validation allows `^[A-Za-z., @/]+$`.
- **Error Messages:**
  - `Please enter the Full name`
  - `Allowed character set for full name (A-Za-z., @/)`
- **Conditions Controlling Visibility:** Always visible on Step 3.
- **Dependencies & Downstream Effects:** Inscribed on Certificate of Insurance and tax invoice.
- **Source API Mapping:** `customer_name`
- **PDPA / PII Classification:** **HIGH RISK PII (Full Legal Name)**
- **Audit Uncertainty:** None. [VERIFIED]

---

### FLD-019: Date of Birth
- **Field ID:** `FLD-PART-DOB-019`
- **Original Screen ID:** `SCREEN-03` (`#jsPage3`)
- **DOM Name / ID:** `name="dob"` \| `id="dob"`
- **Customer-Facing Label:** *(None in legacy DOM)*
- **Placeholder:** `DD/MM/YYYY`
- **Data Type & Format:** Date string, format `DD/MM/YYYY`
- **Status:** **Required**
- **Default Value:** `""`
- **Validation Rules:** Valid date format; age must be ≥ 21 and ≤ 85 years.
- **Error Message:** `Please enter the valid date of birth`
- **Conditions Controlling Visibility:** Always visible on Step 3.
- **Dependencies & Downstream Effects:** Underwriting eligibility check.
- **Source API Mapping:** `dob`
- **PDPA / PII Classification:** **HIGH RISK PII (Date of Birth)**
- **Audit Uncertainty:** None. [VERIFIED]

---

### FLD-020: NRIC / Passport Number
- **Field ID:** `FLD-PART-NRIC-020`
- **Original Screen ID:** `SCREEN-03` (`#jsPage3`)
- **DOM Name / ID:** `name="nric"` \| `id="nric"`
- **Customer-Facing Label:** *(None in legacy DOM)*
- **Placeholder:** `NRIC number`
- **Data Type & Format:** `string` (Malaysian 12-digit NRIC or alphanumeric Passport)
- **Status:** **Required**
- **Default Value:** `""`
- **Validation Rules:** Cannot be empty. Malaysian NRIC validated against checksum or length (12 numeric characters).
- **Error Message:** `Please enter valid NRIC number`
- **Conditions Controlling Visibility:** Always visible on Step 3.
- **Dependencies & Downstream Effects:** Verified against MMC registration records during claims/renewal.
- **Source API Mapping:** `nric`
- **PDPA / PII Classification:** **CRITICAL SENSITIVE PII (National ID / Passport)**
- **Audit Uncertainty:** None. [VERIFIED]

---

### FLD-021: Clinic Legal Name (Sdn Bhd / Partnership)
- **Field ID:** `FLD-PART-CLINIC-NAME-021`
- **Original Screen ID:** `SCREEN-03` (`#jsPage3`)
- **DOM Name / ID:** `name="clinical_name"` \| `id="clinical_name"`
- **Customer-Facing Label:** *(None in legacy DOM)*
- **Placeholder:** `Clinic name (Sdn Bhd/Partnership)`
- **Data Type & Format:** `string`
- **Status:** Conditional (Required if FLD-008 = `Yes`)
- **Default Value:** `""`
- **Validation Rules:** Cannot be empty if clinic ownership declared.
- **Error Message:** `Please enter clinic name`
- **Conditions Controlling Visibility:** Visible if FLD-008 = `Yes`.
- **Dependencies & Downstream Effects:** Names the corporate co-insured entity on the schedule.
- **Source API Mapping:** `clinical_name`
- **PDPA / PII Classification:** Commercial Entity PII
- **Audit Uncertainty:** None. [VERIFIED]

---

### FLD-022: Annual Professional Gross Income
- **Field ID:** `FLD-PART-INCOME-022`
- **Original Screen ID:** `SCREEN-03` (`#jsPage3`)
- **DOM Name / ID:** `name="income"` \| `id="income"`
- **Customer-Facing Label:** `Income`
- **Placeholder:** *(None)*
- **Data Type & Format:** `string` / currency bracket
- **Status:** **Required**
- **Default Value:** `""`
- **Validation Rules:** Must select an income tier.
- **Conditions Controlling Visibility:** Always visible on Step 3.
- **Dependencies & Downstream Effects:** Used by Chubb underwriters to evaluate turnover exposure.
- **Source API Mapping:** `income`
- **PDPA / PII Classification:** **FINANCIAL SENSITIVE PII**
- **Audit Uncertainty:** None. [VERIFIED]

---

### FLD-023: Nationality
- **Field ID:** `FLD-PART-NATIONALITY-023`
- **Original Screen ID:** `SCREEN-03` (`#jsPage3`)
- **DOM Name / ID:** `name="nationality"` \| `id="nationality"`
- **Customer-Facing Label:** `nationality`
- **Placeholder:** `Select Nationality`
- **Data Type & Format:** `string`
- **Status:** **Required**
- **Default Value:** `""`
- **Enumerated Options (10 values):**
  1. `""` -> `Select Nationality`
  2. `"Malaysia"` -> `Malaysia`
  3. `"Singapore"` -> `Singapore`
  4. `"Hongkong"` -> `Hongkong`
  5. `"Thailand"` -> `Thailand`
  6. `"Philippines"` -> `Philippines`
  7. `"Vietnam"` -> `Vietnam`
  8. `"Indonesia"` -> `Indonesia`
  9. `"Australia"` -> `Australia`
  10. `"Others"` -> `Others`
- **Validation Rules:** Must select non-empty nationality.
- **Conditions Controlling Visibility:** Always visible on Step 3.
- **Dependencies & Downstream Effects:** If `"Others"`, unhides FLD-024 (`country_name`).
- **Source API Mapping:** `nationality`
- **PDPA / PII Classification:** Demographic PII
- **Audit Uncertainty:** None. [VERIFIED]

---

### FLD-024: Foreign Country Name
- **Field ID:** `FLD-PART-COUNTRY-NAME-024`
- **Original Screen ID:** `SCREEN-03` (`#jsPage3`)
- **DOM Name / ID:** `name="country_name"` \| `id="country_name"`
- **Customer-Facing Label:** *(None in legacy DOM)*
- **Placeholder:** `Country name`
- **Data Type & Format:** `string`
- **Status:** Conditional (Required if FLD-023 = `"Others"`)
- **Default Value:** `""`
- **Conditions Controlling Visibility:** Visible only if FLD-023 = `"Others"`.
- **Source API Mapping:** `country_name`
- **PDPA / PII Classification:** Demographic PII
- **Audit Uncertainty:** None. [VERIFIED]

---

### FLD-025: Primary Practice Location
- **Field ID:** `FLD-PART-LOCATION-025`
- **Original Screen ID:** `SCREEN-03` (`#jsPage3`)
- **DOM Name / ID:** `name="practice_location"` \| `id="practice_location"`
- **Customer-Facing Label:** *(None in legacy DOM)*
- **Placeholder:** `Enter the primary location of Practice`
- **Data Type & Format:** `string` (Address / Facility Name)
- **Status:** **Required**
- **Default Value:** `""`
- **Validation Rules:** Cannot be empty.
- **Error Message:** `Please enter primary practice location`
- **Conditions Controlling Visibility:** Always visible on Step 3.
- **Dependencies & Downstream Effects:** Inscribed on policy schedule as official practice location.
- **Source API Mapping:** `practice_location`
- **PDPA / PII Classification:** Professional Location PII
- **Audit Uncertainty:** None. [VERIFIED]

---

### FLD-026: Mobile Phone Number
- **Field ID:** `FLD-PART-PHONE-026`
- **Original Screen ID:** `SCREEN-03` (`#jsPage3`)
- **DOM Name / ID:** `name="customer_phone"` \| `id="customer_phone"`
- **Customer-Facing Label:** *(None in legacy DOM)*
- **Placeholder:** `Mobile Number`
- **Data Type & Format:** `tel` (Malaysian mobile format `+601XXXXXXXX`)
- **Status:** **Required**
- **Default Value:** `""`
- **Validation Rules:** Numeric string, 9–11 digits.
- **Error Message:** `Please enter a valid mobile number`
- **Conditions Controlling Visibility:** Always visible on Step 3.
- **Dependencies & Downstream Effects:** Primary contact coordinate; bound to policy record for `/renew` OTP retrieval.
- **Source API Mapping:** `customer_phone`
- **PDPA / PII Classification:** **CRITICAL PII (Mobile Contact)**
- **Audit Uncertainty:** None. [VERIFIED]

---

### FLD-027: Additional Branch Clinics Array
- **Field ID:** `FLD-PART-BRANCHES-027`
- **Original Screen ID:** `SCREEN-03` (`#jsPage3`) / Modal `#jsBranchModal`
- **DOM Name / ID:** `name="branch_details"` \| `id="branch_details"`
- **Trigger Button:** `Add Clinic / Branch`
- **Data Type & Format:** `JSON string` (Array of objects, max 4 branches)
- **Modal Input Attributes:**
  - `modal_branch_name`: Text, label `Clinic name/ Branch name`, placeholder `e.g Klinik Damansara`
  - `modal_branch_address`: Text, label `Clinic Address`, placeholder `ex. 2, angaksaraya jin amang, Kuala Lumpur`
  - `modal_branch_phone`: Text, label `Phone number`, placeholder `12 34 356789`
- **Status:** Optional (Up to 4 branches permitted)
- **Validation Rules:** All 3 modal fields required if adding a branch. Total revenue must not exceed RM 5,000,000.
- **Error Message in Modal:** `*All fields are required.`
- **Source API Mapping:** `branch_details`
- **PDPA / PII Classification:** Commercial Facility Data
- **Audit Uncertainty:** None. [VERIFIED]

---

## 4. Step 3: Underwriting Declarations (`#jsPage3`)

---

### FLD-028: Prior Claims Declaration
- **Field ID:** `FLD-UW-DECL-CLAIMS-028`
- **Original Screen ID:** `SCREEN-03` (`#jsPage3`)
- **DOM Name / ID:** `name="have_claim_ever_been_made"` \| `id="have_claim_ever_been_made"`
- **Customer-Facing Text:** `I agree that No claim have ever been made or lawsuits been brought against me`
- **Controls:** Button toggles: `Agree` (`.jsHaveClaimButtonYes`) \| `Disagree` (`.jsHaveClaimButtonNo`)
- **Data Type & Format:** `string` (`"agree"` or `"disagree"`)
- **Status:** **Required**
- **Default Value:** `""`
- **Validation Rules:** Must select either Agree or Disagree.
- **Conditional Visibility:** Always visible on Step 3.
- **Downstream Effect:** If `Disagree`, reveals textarea FLD-029 (`no_claim_desc`). Flags submission for Referral (`#jsPage8`).
- **Source API Mapping:** `have_claim_ever_been_made`
- **PDPA / PII Classification:** **CLAIMS / LEGAL HISTORY SENSITIVE DATA**
- **Audit Uncertainty:** None. [VERIFIED]

---

### FLD-029: Prior Claims Narrative Details
- **Field ID:** `FLD-UW-DESC-CLAIMS-029`
- **Original Screen ID:** `SCREEN-03` (`#jsPage3`)
- **DOM Name / ID:** `name="no_claim_desc"` \| `id="no_claim_desc"`
- **Customer-Facing Label:** `Please provide details below`
- **Data Type & Format:** `textarea` (Free text)
- **Status:** Conditional (Required if FLD-028 = `"disagree"`)
- **Default Value:** `""`
- **Conditions Controlling Visibility:** Visible only if FLD-028 = `"disagree"`.
- **Source API Mapping:** `no_claim_desc`
- **PDPA / PII Classification:** **CLAIMS / LEGAL HISTORY SENSITIVE DATA**
- **Audit Uncertainty:** None. [VERIFIED]

---

### FLD-030: Awareness of Errors / Omissions
- **Field ID:** `FLD-UW-DECL-ERRORS-030`
- **Original Screen ID:** `SCREEN-03` (`#jsPage3`)
- **DOM Name / ID:** `name="aware_of_errors"` \| `id="aware_of_errors"`
- **Customer-Facing Text:** `Are you aware of any errors, omissions, offences, circumstances or allegations which might result in a claim being made against you?`
- **Controls:** Button toggles: `Yes` (`.jsAwareOfErrorsButtonYes`) \| `No` (`.jsAwareOfErrorsButtonNo`)
- **Data Type & Format:** `string` (`"yes"` or `"no"`)
- **Status:** **Required**
- **Downstream Effect:** If `Yes`, reveals textarea FLD-031 (`aware_of_errors_desc`). Flags for Referral (`#jsPage8`).
- **Source API Mapping:** `aware_of_errors`
- **PDPA / PII Classification:** **LEGAL / PROFESSIONAL RISK DATA**
- **Audit Uncertainty:** None. [VERIFIED]

---

### FLD-031: Errors / Omissions Narrative Details
- **Field ID:** `FLD-UW-DESC-ERRORS-031`
- **Original Screen ID:** `SCREEN-03` (`#jsPage3`)
- **DOM Name / ID:** `name="aware_of_errors_desc"` \| `id="aware_of_errors_desc"`
- **Customer-Facing Label:** `Please provide details below`
- **Data Type & Format:** `textarea`
- **Status:** Conditional (Required if FLD-030 = `"yes"`)
- **Source API Mapping:** `aware_of_errors_desc`
- **PDPA / PII Classification:** **LEGAL / PROFESSIONAL RISK DATA**
- **Audit Uncertainty:** None. [VERIFIED]

---

### FLD-032: Disciplinary Inquiries / Sanctions
- **Field ID:** `FLD-UW-DECL-DISCIPLINE-032`
- **Original Screen ID:** `SCREEN-03` (`#jsPage3`)
- **DOM Name / ID:** `name="have_been_disciplinary_action"` \| `id="have_been_disciplinary_action"`
- **Customer-Facing Text:** `Have you ever been the subject of disciplinary action or investigation by any authority or regulator or professional body?`
- **Controls:** Button toggles: `Yes` \| `No`
- **Data Type & Format:** `string` (`"yes"` or `"no"`)
- **Status:** **Required**
- **Downstream Effect:** If `Yes`, reveals textarea FLD-033 (`desciplinary_action_desc`). Flags for Referral (`#jsPage8`).
- **Source API Mapping:** `have_been_disciplinary_action`
- **PDPA / PII Classification:** **REGULATORY SANCTION SENSITIVE DATA**
- **Audit Uncertainty:** None. [VERIFIED]

---

### FLD-033: Disciplinary Action Narrative Details
- **Field ID:** `FLD-UW-DESC-DISCIPLINE-033`
- **Original Screen ID:** `SCREEN-03` (`#jsPage3`)
- **DOM Name / ID:** `name="desciplinary_action_desc"` \| `id="desciplinary_action_desc"`
- **Customer-Facing Label:** `Please provide details below`
- **Data Type & Format:** `textarea`
- **Status:** Conditional (Required if FLD-032 = `"yes"`)
- **Source API Mapping:** `desciplinary_action_desc`
- **PDPA / PII Classification:** **REGULATORY SANCTION SENSITIVE DATA**
- **Audit Uncertainty:** None. [VERIFIED]

---

### FLD-034: Criminal Investigations / Charges
- **Field ID:** `FLD-UW-DECL-CRIMINAL-034`
- **Original Screen ID:** `SCREEN-03` (`#jsPage3`)
- **DOM Name / ID:** `name="had_criminal_charges"` \| `id="had_criminal_charges"`
- **Customer-Facing Text:** `Have you ever been the subject of a criminal investigation or had criminial charges brought against you? For the purposes of this question, please disregard traffic or minor motor vehicle licensing offences` *(sic: "criminial")*
- **Controls:** Button toggles: `Yes` \| `No`
- **Data Type & Format:** `string` (`"yes"` or `"no"`)
- **Status:** **Required**
- **Downstream Effect:** If `Yes`, reveals textarea FLD-035 (`criminal_charges_desc`). Flags for Referral (`#jsPage8`).
- **Source API Mapping:** `had_criminal_charges`
- **PDPA / PII Classification:** **CRIMINAL RECORD SENSITIVE PII**
- **Audit Uncertainty:** None. [VERIFIED]

---

### FLD-035: Criminal Charges Narrative Details
- **Field ID:** `FLD-UW-DESC-CRIMINAL-035`
- **Original Screen ID:** `SCREEN-03` (`#jsPage3`)
- **DOM Name / ID:** `name="criminal_charges_desc"` \| `id="criminal_charges_desc"`
- **Customer-Facing Label:** `Please provide details below`
- **Data Type & Format:** `textarea`
- **Status:** Conditional (Required if FLD-034 = `"yes"`)
- **Source API Mapping:** `criminal_charges_desc`
- **PDPA / PII Classification:** **CRIMINAL RECORD SENSITIVE PII**
- **Audit Uncertainty:** None. [VERIFIED]

---

### FLD-036 through FLD-041: Clinic Entity Underwriting Declarations
*(Active only when Clinic Indemnity Add-On FLD-014 is selected)*
- `FLD-UW-CLINIC-CLAIMS-036`: `clinic_package_have_claim_ever_been_made` (Yes/No)
- `FLD-UW-CLINIC-ERRORS-037`: `clinic_package_aware_of_errors` (Yes/No)
- `FLD-UW-CLINIC-DISCIPLINE-038`: `clinic_package_have_been_disciplinary_action` (Yes/No)
- `FLD-UW-CLINIC-ANSWERS-039`: `clinic_package_answers` (Textarea for full claims/allegation details)
- `FLD-UW-CLINIC-CRIMINAL-040`: `clinic_package_had_criminal_charges` (Yes/No)
- `FLD-UW-CLINIC-CRIMINAL-DESC-041`: `clinic_package_criminal_charges_desc` (Textarea)
- **Status:** Conditional
- **PDPA / PII Classification:** Corporate Regulatory & Claims Risk Data
- **Audit Uncertainty:** None. [VERIFIED]

---

## 5. Screens 04A, 04B, 04C: Conditional COVID-19 Questionnaires

---

### Screen 04A: Regulatory & Virus Management (`#jsPage11RegulatoryAndVirusQuestions`)
- **`FLD-CVD-REG-FINE-042`** (`policy_surrounding_covid19`): Checkbox/Toggle. Label: `1. Have you been fined, sanctioned or warned by authorities for non-compliance with public policy surrounding Covid-19?`
- **`FLD-CVD-REG-DESC-043`** (`have_policy_surrounding_covid19_desc`): Textarea. Label: `If Yes,please explain`
- **`FLD-CVD-REG-DISCL-044`** (`disclaimers_limity_of_liability_covid19`): Checkbox/Toggle. Label: `Does your specimen professional contract contain disclaimers a/o limitation of liability for COVID-19 or any pandemic? For new contracts going forward?`
- **`FLD-CVD-VIR-INFECT-045`** (`have_been_infected_covid19`): Checkbox/Toggle. Label: `1. To your knowledge, have any of your employees, contractors or clients/ customers: a. Been infected by COVID-19?`
- **`FLD-CVD-VIR-DIED-046`** (`have_been_died_covid_19`): Checkbox/Toggle. Label: `b. Died from COVID-19?`
- **`FLD-CVD-VIR-PLAN-047`** (`have_plan_deal_with_covid19`): Checkbox/Toggle. Label: `2. Does the Insured have an action plan to deal with COVID-19 outbreak?`
- **`FLD-CVD-VIR-PLANDESC-048`** (`deal_with_summarize_plan`): Textarea. Label: `If so, please enclose document summarizing plan.`
- **`FLD-CVD-VIR-PREVENT-049`** (`government_guidlines_and_directives`): Textarea. Label: `3. Detail action plan by the applicant/ insured to prevent the spread of the virus. Including and beyond any government guidelines and directives.`
- **`FLD-CVD-VIR-SYMPT-050`** (`have_exhibit_signs_and_symptoms`): Checkbox/Toggle. Label: `4. Is the facility actively screening and restricting employees, visitors and vendors who meet the following criteria: a. Exhibit signs and symptoms of a respiratory infection, such as fever, cough, or shortness of breath?`
- **`FLD-CVD-VIR-COMM-051`** (`have_community_based_spread_of_covid19`): Checkbox/Toggle. Label: `b. Resides in a community where community-based spread of COVID-19 is occurring?`
- **`FLD-CVD-VIR-QUAR-052`** (`have_local_health_authorities`): Checkbox/Toggle. Label: `c. For residents exposed to COVID-19, as well as those under observation, has quarantine been established for the incubation period of 14 days from the last date of exposure, per the WHO or local health authorities guidance/guidlines?`

---

### Screen 04B: Business Continuity Planning (`#jsPage12BusinessContiunityQuestions`)
- **`FLD-CVD-BCP-CUST-053`** (`serving_customers`): Textarea. Label: `1. How is the insured addressing/mitigating new exposures related to the pandemic in terms of: a. Serving Customers`
- **`FLD-CVD-BCP-OPS-054`** (`business_continuity_operational_capabilities`): Textarea. Label: `b. Business continuity / operational capabilities amid pandemic [e.g. like supply chain risks, closed borders, and how that affects their ability to carry on with existing professional service contracts etc.]`
- **`FLD-CVD-BCP-TEAM-055`** (`have_potential_spread_of_covid19`): Checkbox/Toggle. Label: `2. Has the facility’s Emergency Preparedness team in place for a potential spread of COVID-19?`
- **`FLD-CVD-BCP-PREV-056`** (`have_designated_infection_preventonist`): Checkbox/Toggle. Label: `3. Does the facility have a designated Infection Preventionist?`
- **`FLD-CVD-BCP-PLANUPD-057`** (`emergency_preparedness_plan`): Textarea. Label: `4. When was the facility’s Emergency Preparedness Plan last updated?`
- **`FLD-CVD-BCP-CHG2020-058`** (`have_made_since_jan12020`): Textarea. Label: `4.1. What changes if any have been made since Jan 1st, 2020?`
- **`FLD-CVD-BCP-PPE-059`** (`personal_protective_equipement_and_disinfectant`): Textarea. Label: `4.2. What provisions for disruption of personal protective equipment (“PPE”) and disinfectant supplies have been made?`
- **`FLD-CVD-BCP-WHO-060`** (`who_guidence_of_infection_control`): Checkbox/Toggle. Label: `4.3 Has the facility implemented World Health Organization Guidance of Infection Control and Prevention of COVID-19?`

---

### Screen 04C: Employee Training & Communication (`#jsPage13EmployeeAndCommunicationQuestions`)
- **`FLD-CVD-TRN-STAFF-061`** (`have_staff_receive_service_covid19`): Checkbox/Toggle. Label: `1. Have all employees including housekeeping, Registry and traveling staff received in-service COVID-19 infection control training...`
- **`FLD-CVD-TRN-SYMPT-062`** (`have_symptoms_of_respiratory_infection`): Checkbox/Toggle. Label: `2. Are employees who have signs and symptoms of a respiratory infection told not to report to work as per WHO or local health authorities guidance/ guidelines?`
- **`FLD-CVD-TRN-PPENEED-063`** (`have_determined_of_ppe`): Checkbox/Toggle. Label: `3. Do you have control measures in place to have necessary PPE available for staff when it’s determined PPE is needed for the resident?`
- **`FLD-CVD-TRN-ONJOB-064`** (`have_develop_signs_and_symptoms`): Checkbox/Toggle. Label: `4. Have employees been educated on what to do in the event they develop signs and symptoms of a respiratory infection while on-the-job?`
- **`FLD-CVD-TRN-TRANS-065`** (`have_resident_with_severe_symptoms`): Checkbox/Toggle. Label: `5. Is a transfer process in place for residents with severe symptoms that require hospital admission?`
- **`FLD-CVD-TRN-HOSP-066`** (`have_local_health_department_and_medical_services`): Textarea. Label: `If yes, does this process include contacting the local health department, emergency medical services, and receiving hospital`
- **`FLD-CVD-COM-SURV-067`** (`have_coronovirus_surveillance_and_prevention`): Checkbox/Toggle. Label: `1. Is a formalized communication plan in place to disseminate up-to-date information about coronavirus surveillance and prevention to residents and their families?`
- **`FLD-CVD-COM-MEDIA-068`** (`have_media_reports_and_resident`): Checkbox/Toggle. Label: `2. What is your crisis communication mechanism for responding to media reports and resident/family concerns?`
- **`FLD-CVD-DECL-FINAL-069`** (`applicant_declare_for_covid19`): Checkbox. Label: `The Applicant declares that, after enquiry, to the best knowledge of all persons to be insured the statements set forth herein and if any attachments made hereto are true...`

---

## 6. Step 5 & 6: Referral Callback Fields (`#jsContact`)

---

- **`FLD-REF-NAME-070`** (`contact_name`): Text. Placeholder: `Customer Name`. Required. Allowed characters: `A-Za-z., @/`.
- **`FLD-REF-CLINIC-071`** (`clinical_name`): Text. Placeholder: `Clinic name (Sdn Bhd/Partnership)`. Optional.
- **`FLD-REF-PHONE-072`** (`contact_phone`): Tel. Placeholder: `Mobile number`. Required. Must be valid Malaysian mobile number.
- **`FLD-REF-EMAIL-073`** (`contact_email_id`): Email. Placeholder: `Email address`. Required. Standard RFC email format.

---

## 7. Step 7: Payment Selection Fields (`#jsPage10`)

---

- **`FLD-PAY-OPTION-074`** (`payment_option_type`): Radio group (`#jsCreditCardPayment` vs `#jsBusinessPayment`).
  - Radio 1: `Credit/Debit Card/Wallet/Personal Internet Banking`
  - Radio 2: `Business Internet Banking`
  - Required. Governs payment routing channel to gateway.

---

## 8. Specialized & Modal Verification Fields

---

- **`FLD-REN-PHONE-075`** (`form_phone_number` / `#jsFormRenewModal`): Tel. Registered mobile number for `/renew` lookup.
- **`FLD-REN-OTP-076`** (`form_otp_value` / `#jsFormRenewModal`): Text. 4-to-6 digit OTP sent via SMS or WhatsApp.
- **`FLD-REN-MAIL-OTP-077`** (`mail_otp_value` / `#mailRenewModal`): Text. Verification OTP for email deep link renewal.
- **`FLD-CLM-PHONE-078`** (`initial_claim_form_phone_number` / `#jsInitialClaimFormModal`): Tel. Mobile number for initial claim identity check.
- **`FLD-CLM-OTP-079`** (`initial_claim_form_otp_value` / `#jsInitialClaimFormModal`): Text. Claim OTP verification token.
- **`FLD-SPEC-ALLOC-080`** (`specializationModal` dynamic inputs): Number inputs for percentage allocation across medical specialties. Enforces: sum = 100%.

