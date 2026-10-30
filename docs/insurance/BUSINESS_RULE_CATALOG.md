# BUSINESS RULE CATALOG
## DoctorShield Individual Medical Professional Indemnity Portal

> **Document ID:** `DOC-CAT-RULES-001`  
> **Status:** Authoritative Baseline (Phase 1)  
> **Classification:** [VERIFIED] / [INFERRED]  
> **Last Updated:** 2026-10-29  
> **Owner:** Principal Product Architect & Senior Solutions Architect  
> **Scope:** Complete functional specification of all 18 core business rule families governing underwriting, rating, coverage dependencies, compliance, and session management.

---

## 1. Family 1: Eligibility, Classification & Specialization

---

### RULE-ELIG-01: Approved Classification Taxonomy
- **Rule ID:** `RULE-ELIG-01`
- **Inputs:** `classification_id`
- **Precondition:** User is on Step 1 (`#jsPage1`).
- **Decision Logic:**
  ```
  IF classification_id IN [1..26] (23 active approved categories):
    CLASSIFICATION IS VALID
  ELSE:
    HALT WITH ERROR: "Please select classification"
  ```
- **Outputs:** Approved classification key passed to rating engine.
- **Downstream Effect:** Triggers `POST /api/getSpecialization` to load liability tiers and base factors.
- **Source of Truth:** Server Underwriting Schedule (`api/getSpecialization`) & DOM `<select id="classification_id">`.
- **Evidence:** `FLD-CALC-CLASS-001`, `SCR-001`.
- **Confidence Status:** [VERIFIED]
- **Edge Cases:** Unlisted practitioner types (e.g. Traditional Chinese Medicine, Homeopathy) are excluded from online straight-through rating.
- **Required Test Scenarios:**
  - Submit empty classification -> expect validation error.
  - Select each of the 23 classifications -> expect corresponding liability tiers to load.

---

### RULE-ELIG-02: Geographic Service Restriction
- **Rule ID:** `RULE-ELIG-02`
- **Inputs:** Client IP address / Geolocation.
- **Precondition:** Initial page boot (`window.onload`).
- **Decision Logic:**
  ```
  IF client_ip NOT IN Malaysia (MY):
    TRIGGER MODAL #intro_modal:
    "Dear customer, These solutions are currently available in Malaysia only."
  ```
- **Outputs:** Informational geo-restriction popup.
- **Downstream Effect:** Advises foreign users; does not strictly block viewing but alerts on jurisdiction.
- **Source of Truth:** `home.min.js` / `#intro_modal`.
- **Evidence:** `MSG-001`, `SCR-001`.
- **Confidence Status:** [VERIFIED]
- **Edge Cases:** Malaysian doctors traveling abroad on VPN.
- **Required Test Scenarios:**
  - Access from non-MY IP -> expect `#intro_modal` display.

---

## 2. Family 2: Limit of Liability Choices & Premium Effects

---

### RULE-LIAB-01: Specialty-Bound Indemnity Limits
- **Rule ID:** `RULE-LIAB-01`
- **Inputs:** `classification_id`, `liability_id`.
- **Precondition:** `classification_id` selected.
- **Decision Logic:**
  ```
  IF classification = "5" (Government Doctor/Dentist):
    AVAILABLE TIERS = [RM 250k, RM 500k, RM 1M, RM 1.5M, RM 2M]
  ELSE IF classification = "7" (General Medical Practitioner):
    AVAILABLE TIERS = [RM 500k, RM 1M, RM 1.5M, RM 2M, RM 3M, RM 5M, RM 10M]
  ELSE IF classification = "20" (GP with Aesthetics):
    AVAILABLE TIERS = [RM 1M, RM 1.5M, RM 2M, RM 3M, RM 5M, RM 10M] (RM 250k and RM 500k excluded)
  ```
- **Outputs:** Populates `#liability_id` dropdown options.
- **Downstream Effect:** Informs server rating multiplier for selected indemnity tier.
- **Source of Truth:** `/api/getSpecialization` JSON response.
- **Evidence:** `inspect_ajax.js` runtime capture lines 37–84.
- **Confidence Status:** [VERIFIED]
- **Edge Cases:** Selecting a higher tier scales premium monotonically.
- **Required Test Scenarios:**
  - Verify GP with Aesthetics cannot select liability below RM 1,000,000.
  - Verify Government Doctor can select RM 250,000.

---

## 3. Family 3: Coverage Start-Date & End-Date Restrictions

---

### RULE-DATE-01: Forward Inception Date Ceiling
- **Rule ID:** `RULE-DATE-01`
- **Inputs:** `insurance_start_date`, System Current Date.
- **Precondition:** User inputs start date on Step 1.
- **Decision Logic:**
  ```
  IF insurance_start_date > (Current Date + 9 calendar months):
    TRIGGER INLINE ERROR:
    "Please enter a valid date, date should be within nine months from today."
    HALT STEP 1 SUBMISSION
  ```
- **Outputs:** Blocks forward booking beyond 9 months.
- **Downstream Effect:** Prevents premature lock-in of future underwriting terms.
- **Source of Truth:** `home.min.js` date validator.
- **Evidence:** `FLD-CALC-DATE-START-003`, `SCR-003`.
- **Confidence Status:** [VERIFIED]
- **Edge Cases:** Leap year date calculations (e.g. 29 February).
- **Required Test Scenarios:**
  - Enter today + 275 days -> expect pass.
  - Enter today + 280 days (> 9 months) -> expect validation block.

---

### RULE-DATE-02: Policy Backdating & Clause 6.12 Notice
- **Rule ID:** `RULE-DATE-02`
- **Inputs:** `insurance_start_date`, System Current Date.
- **Precondition:** Start date entered is prior to current date.
- **Decision Logic:**
  ```
  IF insurance_start_date < Current Date:
    TRIGGER MODAL #jsBackDateEnableModel:
    "Pursuant to Clause 6.12 Licensing of Medical Professionals & Maintenance of Records under this Policy, 
     I hereby acknowledge that Chubb shall not be liable for any Loss... occurring from [Start Date] until [Current Date]."
    IF user clicks "Agree":
      START DATE IS SET TO "01/01/" + Year(insurance_start_date)
      PROCEED WITH BACKDATE EXCLUSION BOUND
    ELSE (clicks "Disagree"):
      CLEAR START DATE AND END DATE
      HALT CALCULATION
  ```
- **Outputs:** Sets start date to January 1st of the selected policy year; binds non-continuous retroactive exclusion.
- **Downstream Effect:** Excludes claims occurring during the backdated gap.
- **Source of Truth:** `home.min.js` (`#jsBackDateAgree`, `#jsBackDateDisagree`).
- **Evidence:** `LEG-BACKDATE-001`, `SCR-004`.
- **Confidence Status:** [VERIFIED]
- **Edge Cases:** Attempting backdating more than 1 year in the past.
- **Required Test Scenarios:**
  - Backdate start date -> expect modal.
  - Click Disagree -> expect inputs wiped.
  - Click Agree -> expect start date reset to 01/01/YYYY.

---

### RULE-DATE-03: Mandatory December 31st Policy Expiry
- **Rule ID:** `RULE-DATE-03`
- **Inputs:** `insurance_start_date`.
- **Precondition:** Start date validated.
- **Decision Logic:**
  ```
  insurance_end_date = "31/12/" + Year(insurance_start_date)
  ```
- **Outputs:** Sets `#insurance_end_date` automatically.
- **Downstream Effect:** Enforces synchronization with Malaysian Medical Council Annual Practicing Certificate (APC) calendar cycle.
- **Source of Truth:** `home.min.js` & `#periodEndDateInfo` modal text.
- **Evidence:** `FLD-CALC-DATE-END-004`, `MSG-012`.
- **Confidence Status:** [VERIFIED]
- **Edge Cases:** Start date in December (e.g. 15 December to 31 December short-period coverage).
- **Required Test Scenarios:**
  - Enter start date 01/06/2026 -> expect end date 31/12/2026.

---

## 4. Family 4: Annual vs Pro-Rated Premium Calculation

---

### RULE-RATE-01: Server-Authoritative Pro-Rata Formula
- **Rule ID:** `RULE-RATE-01`
- **Inputs:** Serialized form payload via `POST /api/calculatePremium`.
- **Precondition:** Step 1 validated.
- **Decision Logic:**
  ```
  Total Days in Year = IsLeapYear(Year) ? 366 : 365
  Active Coverage Days = (insurance_end_date - insurance_start_date) + 1
  Pro-Rata Factor = Active Coverage Days / Total Days in Year
  Pro-Rated Premium = Base Annual Premium * Pro-Rata Factor
  ```
- **Outputs:** Base64 encoded JSON containing `standard_12_month_premium` and `prorated_premium`.
- **Downstream Effect:** Renders quote notes (i) and (ii) on Step 2.
- **Source of Truth:** `/api/calculatePremium` server implementation.
- **Evidence:** `PRICING_AND_TAX_CONTRACT.md` §2.
- **Confidence Status:** [VERIFIED Server-Authoritative]
- **Edge Cases:** Start date of 1 January yields Pro-Rata Factor = 1.0 (Standard annual rate equals pro-rated rate).
- **Required Test Scenarios:**
  - Test 365-day quote -> verify note (i) equals note (ii).
  - Test mid-year quote (1 July to 31 Dec) -> verify pro-rated amount is approximately 50%.

---

## 5. Family 5: Existing-Customer Identification & Renewal Behavior

---

### RULE-REN-01: Mobile-Based Identity Verification
- **Rule ID:** `RULE-REN-01`
- **Inputs:** `form_phone_number`, OTP Delivery Method (`Message OTP` / `Whatsapp OTP`).
- **Precondition:** User accesses `/renew`.
- **Decision Logic:**
  ```
  IF form_phone_number format is valid Malaysian mobile (+60):
    DISPATCH OTP VIA SELECTED CHANNEL (/api/generateOTP)
    START 5-MINUTE COUNTDOWN TIMER
  ELSE:
    DISPLAY VALIDATION ERROR: "Please enter valid mobile number"
  ```
- **Outputs:** Sends OTP token; displays verification input field.
- **Downstream Effect:** Gatekeeper to existing policy database.
- **Source of Truth:** `home.min.js` (`#jsFormRenewModal`).
- **Evidence:** `FLD-REN-PHONE-075`, `MODAL-18`.
- **Confidence Status:** [VERIFIED]
- **Edge Cases:** User requests resend before 5-minute expiry.
- **Required Test Scenarios:**
  - Submit invalid phone format -> expect error.
  - Select WhatsApp delivery -> verify API payload dispatches WhatsApp channel flag.

---

### RULE-REN-02: Active Renewal Policy Lookup
- **Rule ID:** `RULE-REN-02`
- **Inputs:** Verified mobile number + OTP token.
- **Precondition:** `/api/verifyOTP` returns `success: true`.
- **Decision Logic:**
  ```
  POLICIES = Server.LookupPoliciesByMobile(mobile_number)
  IF POLICIES.length > 0:
    DISPLAY MODAL #jsUserPolicyList
    RENDER POLICY CARDS (Policy No, Insured Name, Expiry, Status)
  ELSE:
    DISPLAY NOTICE: "No active policies found for this mobile number"
  ```
- **Outputs:** Policy cards presented for renewal selection.
- **Downstream Effect:** Pre-populates wizard with existing customer details.
- **Source of Truth:** `home.min.js` (`#jsUserPolicyList`).
- **Evidence:** `MODAL-20`.
- **Confidence Status:** [VERIFIED]
- **Required Test Scenarios:**
  - Submit correct OTP -> verify policy cards render.

---

### RULE-REN-03: Renewal Cycle Closure Interruption
- **Rule ID:** `RULE-REN-03`
- **Inputs:** Selected policy certificate reference.
- **Precondition:** User clicks policy card on renewal list.
- **Decision Logic:**
  ```
  IF Policy.has_been_renewed_for_upcoming_cycle == true:
    BLOCK RENEWAL
    TRIGGER MODAL #jsEmailErrorModel:
    "You are policy has been already renewed, if you need further assistance please contact mmi@ja-assure.com or WhatsApp + 60 12-536 0700"
  ```
- **Outputs:** Halts duplicate renewal.
- **Downstream Effect:** Prevents double-charging or duplicate policy issuance.
- **Source of Truth:** `home.min.js` (`#jsEmailErrorModel`).
- **Evidence:** `MSG-009`.
- **Confidence Status:** [VERIFIED]
- **Required Test Scenarios:**
  - Select already-renewed policy -> verify error modal blocks progression.

---

## 6. Family 6: Promo-Code Validation, Substitution & Eligibility

---

### RULE-PRM-01: Server-Authoritative Code Validation
- **Rule ID:** `RULE-PRM-01`
- **Inputs:** `promo_code`, `classification_id`, `specialisation_selected`.
- **Precondition:** User enters text in `#promo_code`.
- **Decision Logic:**
  ```
  POST /api/validatePromoCode { promo_code, classification_id, specialisation_selected }
  IF response.error:
    SHOW ERROR: "Please enter a valid promo code"
    CLEAR APPLIED DISCOUNT
  ELSE IF response.promo_code:
    STORE promo_code OBJECT IN APP DATA
    APPLY DISCOUNT MULTIPLIER TO RATING ENGINE
  ```
- **Outputs:** Validated discount factor.
- **Downstream Effect:** Adjusts net premium; renders `DISCOUNTED INDIVIDUAL PREMIUM` banner.
- **Source of Truth:** `home.min.js` lines for `validatePromoCode`.
- **Evidence:** `FLD-CALC-PROMO-006`.
- **Confidence Status:** [VERIFIED]
- **Required Test Scenarios:**
  - Enter invalid code -> verify error message.
  - Enter valid association code -> verify discount reflected.

---

### RULE-PRM-02: Existing Customer Promo Code Auto-Substitution
- **Rule ID:** `RULE-PRM-02`
- **Inputs:** `nric_number`, `quotation_number`, `promo_code`.
- **Precondition:** User reaches Step 3 and submits NRIC.
- **Decision Logic:**
  ```
  POST /api/nricPromoCodeCheck { nric_number, quotation_number, nric_promocode_value }
  IF response.new_promocode_value != "":
    SET input[name="promo_code"] = response.new_promocode_value
    TRIGGER MODAL #jsNewPromocodeChangeModel:
    "Kindly note that the promo code you have used is ineligible for you as you are an existing client, 
     Nevertheless, we have replaced it with the right promo code that still ensures you enjoy the discounted premium..."
    RECALCULATE PREMIUM WITH RENEWAL DISCOUNT
  ```
- **Outputs:** Replaces first-time buyer acquisition code with existing client renewal code.
- **Downstream Effect:** Enforces marketing promotion integrity without rejecting existing customers.
- **Source of Truth:** `home.min.js` (`nricPromoCodeCheck`).
- **Evidence:** `MSG-008`, `inspect_logic.js`.
- **Confidence Status:** [VERIFIED]
- **Required Test Scenarios:**
  - Enter new-buyer code with existing policyholder NRIC -> expect auto-substitution modal and updated discount.

---

## 7. Family 7: Clinic Ownership & Organization Decisions

---

### RULE-CLN-01: Clinic Ownership Disclosure Gate
- **Rule ID:** `RULE-CLN-01`
- **Inputs:** `do_you_own_clinic_status_value`.
- **Precondition:** User arrives at Step 2 (`#jsPage2`).
- **Decision Logic:**
  ```
  IF user clicks "Yes":
    SET do_you_own_clinic_status_value = 1
    PROGRESSIVELY REVEAL:
      - Clinic Structure (Sole Proprietor vs Partnership/Sdn Bhd)
      - Locum Hiring Disclosure
      - Clinic Limit of Liability
      - Recommended Clinic Coverage Card
  ELSE IF user clicks "No":
    SET do_you_own_clinic_status_value = 0
    HIDE ALL CLINIC SECTIONS
    RESET CLINIC PREMIUM TO RM 0.00
  ```
- **Outputs:** Dynamic DOM unhiding; sets clinic state flags.
- **Downstream Effect:** Controls whether corporate establishment underwriting applies.
- **Source of Truth:** `home.min.js` (`.q-btn` click handlers).
- **Evidence:** `FLD-QUOTE-CLINIC-OWN-008`.
- **Confidence Status:** [VERIFIED]
- **Required Test Scenarios:**
  - Toggle Yes -> verify clinic sections appear.
  - Toggle No -> verify clinic sections collapse and premium resets.

---

### RULE-CLN-02: Corporate Entity Declaration Requirement
- **Rule ID:** `RULE-CLN-02`
- **Inputs:** `clinic_type_value`.
- **Precondition:** Clinic Ownership = `Yes`.
- **Decision Logic:**
  ```
  IF clinic_type_value == "partnership_sdn_bhd":
    INPUT #clinical_name ("Clinic name (Sdn Bhd/Partnership)") ON STEP 3 BECOMES MANDATORY
  ELSE IF clinic_type_value == "sole_proprietor":
    INPUT #clinical_name IS OPTIONAL (Individual practitioner legal name applies)
  ```
- **Outputs:** Enforces corporate entity name input.
- **Downstream Effect:** Names the corporate co-insured entity on the policy schedule.
- **Source of Truth:** `home.min.js` Step 3 validator.
- **Evidence:** `FLD-QUOTE-CLINIC-TYPE-009`, `FLD-PART-CLINIC-NAME-021`.
- **Confidence Status:** [VERIFIED]
- **Required Test Scenarios:**
  - Select Partnership/Sdn Bhd -> leave clinic name blank on Step 3 -> expect validation error.

---

## 8. Family 8: Clinic Add-On Eligibility, Limits & Pricing

---

### RULE-CAD-01: Clinic Indemnity Add-On Eligibility
- **Rule ID:** `RULE-CAD-01`
- **Inputs:** `medical_establishment_package_value`, `clinic_liability_id`.
- **Precondition:** Clinic Ownership = `Yes`.
- **Decision Logic:**
  ```
  IF medical_establishment_package is checked:
    clinic_liability_id IS REQUIRED
    SERVER COMPUTES clinic_premium BASED ON clinic_liability_id AND PRO-RATA FACTOR
    TOTAL PREMIUM INCLUDES: individual_premium + clinic_premium
    STEP 3 ENFORCES 4 CLINIC UNDERWRITING DECLARATIONS
  ELSE:
    clinic_premium = 0.00
    CLINIC UNDERWRITING DECLARATIONS BYPASSED
  ```
- **Outputs:** Adds clinic entity coverage to quote schedule.
- **Downstream Effect:** Protects clinic Sdn Bhd against establishment lawsuits.
- **Source of Truth:** `home.min.js` (`ClinicPackageEnableAndDiable`).
- **Evidence:** `FLD-QUOTE-ADDON-CLINIC-014`.
- **Confidence Status:** [VERIFIED]
- **Required Test Scenarios:**
  - Check Clinic Add-on without selecting clinic liability -> expect validation error.
  - Check Clinic Add-on -> verify clinic declarations appear on Step 3.

---

## 9. Family 9: Person-In-Charge (PIC) Coverage Eligibility & Pricing

---

### RULE-PIC-01: PIC Exposure Trigger & Add-on Unlocking
- **Rule ID:** `RULE-PIC-01`
- **Inputs:** `pic_of_own_clinic_or_another_clinic_status_value`, `are_you_pic_of_any_clinic_status_value`.
- **Precondition:** User is on Step 2.
- **Decision Logic:**
  ```
  IF pic_of_own_clinic == 1 OR are_you_pic_of_any_clinic == 1:
    UNHIDE "Buy PIC coverage" CARD (#pic_coverage_enable_status_value)
    IF user checks #pic_coverage_enable_status_value:
      SERVER ADDS individual_pic_premium TO QUOTE SUMMARY
  ELSE:
    HIDE "Buy PIC coverage" CARD
    pic_premium = 0.00
  ```
- **Outputs:** Controls availability of PIC personal coverage extension.
- **Downstream Effect:** Provides defense costs for statutory inquiries directed at the Person-in-Charge.
- **Source of Truth:** `home.min.js` (`pic_coverage_enable_status_value`).
- **Evidence:** `FLD-QUOTE-ADDON-PIC-015`.
- **Confidence Status:** [VERIFIED]
- **Required Test Scenarios:**
  - Answer No to both PIC questions -> verify PIC card is hidden.
  - Answer Yes to either PIC question -> verify PIC card appears.

---

## 10. Family 10: Complimentary Automatic Reinstatement

---

### RULE-RST-01: Automatic Reinstatement Bundling
- **Rule ID:** `RULE-RST-01`
- **Inputs:** `reinstatement_package_value`.
- **Precondition:** Step 2 quote generated.
- **Decision Logic:**
  ```
  reinstatement_package_value IS CHECKED BY DEFAULT (true)
  DISPLAY PROMOTIONAL BADGE:
  "Your Insurance comes with complimentary Automatic Reinstatement now"
  reinstatement_premium = 0.00 (Bundled complimentary)
  ```
- **Outputs:** Automatic reinstatement endorsement attached to policy.
- **Downstream Effect:** Automatically restores aggregate indemnity limit if depleted by a paid claim during the policy term.
- **Source of Truth:** `home.min.js` (`#reinstatement_package`).
- **Evidence:** `FLD-QUOTE-ADDON-REINSTATE-016`.
- **Confidence Status:** [VERIFIED]
- **Required Test Scenarios:**
  - Verify reinstatement checkbox is checked by default and premium surcharge is RM 0.

---

## 11. Family 11: Additional Branch Eligibility, Max Counts & Revenue

---

### RULE-BRN-01: Maximum Branch Count Restriction
- **Rule ID:** `RULE-BRN-01`
- **Inputs:** `branch_details` array.
- **Precondition:** User clicks `Add Clinic / Branch` on Step 3.
- **Decision Logic:**
  ```
  IF branch_details.length >= 4:
    DISABLE "Add Clinic / Branch" BUTTON
    DISPLAY NOTICE: "You can add up to 4 branches"
  ```
- **Outputs:** Limits registered branches to a maximum of 4.
- **Downstream Effect:** Caps bundled entity branch risk.
- **Source of Truth:** `#jsBranchModal` copy & validation.
- **Evidence:** `FLD-PART-BRANCHES-027`, `POP-BRANCH-001`.
- **Confidence Status:** [VERIFIED]
- **Required Test Scenarios:**
  - Add 4 branches -> verify "Add" button becomes disabled or blocks 5th entry.

---

### RULE-BRN-02: Maximum Annual Revenue Ceiling
- **Rule ID:** `RULE-BRN-02`
- **Inputs:** Combined branch clinic turnover.
- **Precondition:** User views branch instructions on Step 3.
- **Decision Logic:**
  ```
  IF aggregate_branch_revenue > RM 5,000,000 per annum:
    BRANCHES ARE INELIGIBLE FOR ONLINE BUNDLING (LEG-BRANCH-001)
    APPLICANT MUST BE REFERRED TO CORPORATE CLIENT SERVICES
  ```
- **Outputs:** Enforces statutory small/medium clinic boundary.
- **Downstream Effect:** Excludes major hospital chains or large multi-centre networks from individual retail portal.
- **Source of Truth:** `LEG-BRANCH-001` statutory text.
- **Evidence:** `LEG-BRANCH-001`.
- **Confidence Status:** [VERIFIED]
- **Required Test Scenarios:**
  - Verify statutory notice displays exact RM 5,000,000 revenue ceiling rule.

---

## 12. Family 12: Specialization Allocation & Percentage Validation

---

### RULE-SPC-01: 100% Mathematical Allocation Sum
- **Rule ID:** `RULE-SPC-01`
- **Inputs:** Array of percentage values in `#specializationModal`.
- **Precondition:** Classification involves multi-specialty practices (e.g. Cosmetic & Aesthetic).
- **Decision Logic:**
  ```
  Total Percentage = Sum(specialization_percentage_values)
  IF Total Percentage != 100:
    DISPLAY ERROR: "Sum of percentage should be 100"
    BLOCK MODAL SUBMISSION
  ELSE IF Any Percentage <= 0:
    DISPLAY ERROR: "The value must be greater than zero."
    BLOCK MODAL SUBMISSION
  ELSE:
    SERIALIZE ARRAY INTO hidden input "specializations"
    CLOSE MODAL
  ```
- **Outputs:** Persisted specialty distribution JSON.
- **Downstream Effect:** Used by backend rating engine to apply weighted risk factors.
- **Source of Truth:** `home.min.js` (`#specializationModal` validation).
- **Evidence:** `MSG-013`, `POP-SPEC-001`.
- **Confidence Status:** [VERIFIED]
- **Required Test Scenarios:**
  - Enter 50% + 40% (Sum = 90%) -> expect error.
  - Enter 100% + 0% -> expect "value must be greater than zero" error.
  - Enter 70% + 30% (Sum = 100%) -> expect pass.

---

## 13. Family 13: Claims History, Inquiries & Criminal Declarations

---

### RULE-DEC-01: Underwriting Referral Gatekeeper
- **Rule ID:** `RULE-DEC-01`
- **Inputs:**
  - `have_claim_ever_been_made` (`Agree` / `Disagree`)
  - `aware_of_errors` (`Yes` / `No`)
  - `have_been_disciplinary_action` (`Yes` / `No`)
  - `had_criminal_charges` (`Yes` / `No`)
  - `customer_nric_blocklist_validation` (`1` / `0`)
  - `customer_name_validation` (`1` / `0`)
- **Precondition:** User clicks `Next >>` on Step 3 (`#jsPage3Submit`).
- **Decision Logic:**
  ```
  IsAdverse = (have_claim_ever_been_made == "disagree") ||
              (aware_of_errors == "yes") ||
              (have_been_disciplinary_action == "yes") ||
              (had_criminal_charges == "yes") ||
              (customer_nric_blocklist_validation == 0) ||
              (customer_name_validation == 0);

  IF IsAdverse == true:
    SET current_page_no = "page3_contact_support"
    DISPATCH sendContactUsClaimsEmail()
    TRANSITION TO SCREEN 05 (#jsPage8): "PLEAESE CALL SUPPORT OFFICE"
    INTERCEPT AND BLOCK ONLINE PAYMENT
  ELSE:
    PROCEED TO STEP 7 (Payment Selection) OR SCREEN 04A (COVID flow)
  ```
- **Outputs:** Hard diversion from straight-through issuance to human underwriting queue.
- **Downstream Effect:** Prevents unapproved issuance to doctors with active claims or regulatory investigations.
- **Source of Truth:** `home.min.js` lines for `#jsPage3Submit`.
- **Evidence:** `UNDERWRITING_DECISION_TREE.md` §2.
- **Confidence Status:** [VERIFIED]
- **Required Test Scenarios:**
  - Answer Disagree to claims -> verify Step 8 referral interruption.
  - Answer Yes to disciplinary -> verify Step 8 referral interruption.
  - Answer clean to all 4 -> verify transition to payment.

---

## 14. Family 14: Conditional Underwriting Questionnaires

---

### RULE-QST-01: Narrative Requirement on Adverse Answers
- **Rule ID:** `RULE-QST-01`
- **Inputs:** Declaration toggle state.
- **Precondition:** User selects `Disagree` on claims or `Yes` on errors/disciplinary/criminal.
- **Decision Logic:**
  ```
  IF answer == Adverse:
    UNHIDE CORRESPONDING TEXTAREA
    FIELD BECOMES MANDATORY (Cannot proceed without narrative explanation)
  ELSE:
    HIDE AND CLEAR TEXTAREA
  ```
- **Outputs:** Mandatory narrative explanation textarea.
- **Downstream Effect:** Captures claim loss history / inquiry details for manual underwriter review.
- **Source of Truth:** `home.min.js` toggle listeners.
- **Evidence:** `FLD-UW-DESC-CLAIMS-029`, `FLD-UW-DESC-ERRORS-031`, etc.
- **Confidence Status:** [VERIFIED]
- **Required Test Scenarios:**
  - Select Yes on errors -> leave textarea empty -> expect validation error.
  - Fill textarea -> expect submit to proceed to referral.

---

## 15. Family 15: Automatic Acceptance vs Referral Review

---

### RULE-REF-01: Relationship Manager Callback Ticket
- **Rule ID:** `RULE-REF-01`
- **Inputs:** `contact_name`, `contact_phone`, `contact_email_id`, `clinical_name`.
- **Precondition:** User arrives at `#jsPage8` and clicks `Yes` to callback prompt.
- **Decision Logic:**
  ```
  TRANSITION TO #jsContact
  ON #jsContactSubmit CLICK:
    VALIDATE NAME, PHONE, EMAIL
    POST /api/contactSupport { contact_name, contact_phone, contact_email_id, clinical_name, proposal_data }
    DISPLAY CONFIRMATION: "Thank you. Our relationship manager will contact you."
  ```
- **Outputs:** Creates support ticket in CRM; dispatches internal notification email.
- **Downstream Effect:** Transitions case from digital self-service to broker-assisted offline underwriting.
- **Source of Truth:** `home.min.js` (`#jsContactSubmit`).
- **Evidence:** `SCREEN-06`, `FLD-REF-070-073`.
- **Confidence Status:** [VERIFIED]
- **Required Test Scenarios:**
  - Complete referral callback form -> verify submit calls `/api/contactSupport`.

---

## 16. Family 16: Tax, Stamp Duty & Payable Totals

---

### RULE-TAX-01: Comprehensive Tax Calculation
- **Rule ID:** `RULE-TAX-01`
- **Inputs:** `gross_premium_after_discount`.
- **Precondition:** Server generates quote payload.
- **Decision Logic:**
  ```
  SST_AMOUNT = Round(gross_premium_after_discount * 0.08, 2)
  STAMP_DUTY = 10.00
  TOTAL_PAYABLE = gross_premium_after_discount + SST_AMOUNT + STAMP_DUTY
  ```
- **Outputs:** Populates tax summary on Step 2 and Step 7.
- **Downstream Effect:** Binds legal payment amount passed to payment gateway.
- **Source of Truth:** `PRICING_AND_TAX_CONTRACT.md` §3.
- **Evidence:** `PRICING_AND_TAX_CONTRACT.md`.
- **Confidence Status:** [VERIFIED]
- **Required Test Scenarios:**
  - Gross RM 400.00 -> SST (8%) = RM 32.00 -> Stamp = RM 10.00 -> Total = RM 442.00.

---

## 17. Family 17: Payment Methods, Verification & Outcomes

---

### RULE-PAY-01: Gateway Hand-off & Channel Selection
- **Rule ID:** `RULE-PAY-01`
- **Inputs:** `payment_option_type` (`#jsCreditCardPayment` vs `#jsBusinessPayment`).
- **Precondition:** User is on Step 7 (`#jsPage10`).
- **Decision Logic:**
  ```
  IF payment_option_type == "credit_personal":
    CHANNEL = "B2C_FPX_AND_CARD"
  ELSE IF payment_option_type == "business":
    CHANNEL = "B2B_CORPORATE_INTERNET_BANKING"

  POST /api/initiatePayment { payment_option_type, quotationNumber }
  REDIRECT BROWSER TO payment_gateway_url
  ```
- **Outputs:** Redirects applicant to PCI-DSS compliant payment gateway.
- **Downstream Effect:** Leaves portal domain to execute financial transaction.
- **Source of Truth:** `home.min.js` (`#jsFinalPageSubmit`).
- **Evidence:** `FLD-PAY-OPTION-074`, `NET-009`.
- **Confidence Status:** [VERIFIED Integration Pattern]
- **Required Test Scenarios:**
  - Select Business Banking -> verify payload specifies corporate banking channel.

---

## 18. Family 18: Session Expiry, Duplicates & Backdated Coverage

---

### RULE-SES-01: Inception Session Timeout
- **Rule ID:** `RULE-SES-01`
- **Inputs:** Client session timestamp.
- **Precondition:** Form idle on Step 2 or 3 for extended duration.
- **Decision Logic:**
  ```
  IF session_age > SessionTimeout:
    TRIGGER MODAL #jsStartDateValidationErrorModal:
    "Session Expired: Your session has been expired, please reselect the Insurance Start Date."
    RESET WIZARD TO STEP 1
  ```
- **Outputs:** Enforces rate validity window.
- **Downstream Effect:** Protects against premium rate changes during stale sessions.
- **Source of Truth:** `home.min.js` (`#jsStartDateValidationErrorModal`).
- **Evidence:** `MSG-003`.
- **Confidence Status:** [VERIFIED]
- **Required Test Scenarios:**
  - Simulate expired session -> verify modal displays and resets to Step 1.

