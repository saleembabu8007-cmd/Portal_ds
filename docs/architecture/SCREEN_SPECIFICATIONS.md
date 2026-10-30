# ATOMIC SCREEN SPECIFICATIONS
## DoctorShield Individual Medical Professional Indemnity Portal Redesign

> **Document ID:** `DOC-SPEC-SCREEN-001`  
> **Status:** Authoritative Baseline (Phase 1 Deliverable)  
> **Classification:** [VERIFIED Architecture]  
> **Last Updated:** 2026-10-29  
> **Author:** Principal Product Architect & Senior UI/UX Specialist  
> **Governing Standards:** WCAG 2.1 AA, DoctorShield Brand Tokens (`#08A5B5`, `#132766`, Kanit $\le 500$, Inter)  
> **Traceability Links:** [`FIELD_DICTIONARY.md`](file:///c:/Users/salee/Downloads/Portal_ds/docs/FIELD_DICTIONARY.md), [`CONTENT_MASTER.md`](file:///c:/Users/salee/Downloads/Portal_ds/docs/CONTENT_MASTER.md), [`COPY_AND_LEGAL_REGISTER.md`](file:///c:/Users/salee/Downloads/Portal_ds/docs/COPY_AND_LEGAL_REGISTER.md), [`ROUTE_AND_STEP_MAP.md`](file:///c:/Users/salee/Downloads/Portal_ds/docs/ROUTE_AND_STEP_MAP.md)

---

## 1. Specification Structure & Conventions

Every screen specification defines:
- **Header & Semantics:** Screen ID, URL Route, Page Title, Heading (Kanit 400–500 weight), Subheading, ARIA Landmarks.
- **Component & Field Inventory:** Traced to `FLD-NNN`, `QST-NNN`, `OPT-NNN`, `DIS-NNN`, `ACT-NNN`.
- **Validation & Dynamic State:** Validation rules, inline error microcopy, debounced recalculation triggers.
- **Responsive Layout:** Desktop 2-column grid vs Mobile single-column drawer.

---

## 2. Screen SCR-TOBE-01: Coverage & Practice Profile (`/buy/coverage`)

- **Screen ID:** `SCR-TOBE-01`
- **Route:** `/buy/coverage`
- **Milestone:** Stage 1 of 4: Coverage
- **Page Title:** `DoctorShield | Coverage Configuration`
- **Main Heading:** `<h1 class="font-kanit font-normal text-2xl text-navy">Select Your Professional Coverage</h1>`
- **Subheading:** `Configure your medical specialization, indemnity limits, and optional clinic protection.`
- **Semantic Structure:** `<main role="main" aria-labelledby="main-heading">` with 2-column desktop layout (`col-span-8` form area, `col-span-4` sticky indicative summary).

### 2.1 Component Specifications

#### Substep 1A: Practice & Indemnity Limit
1. **Practitioner Classification Combobox:**
   - *Field ID:* `FLD-CALC-CLASS-001` | *Original:* `#classification_id`
   - *Label:* `Practitioner Classification` (Required)
   - *Control:* Accessible Combobox / Searchable Autocomplete (`role="combobox"`, `aria-autocomplete="list"`).
   - *Categories:* Grouped into: `Primary Care & General Practice`, `Surgical Specialties`, `Non-Surgical Specialties`, `Government Medical Officers`, `Dental Practitioners`.
   - *Options:* All 23 approved classifications (`OPT-CLS-001`–`OPT-CLS-026`).
   - *Helper Text:* `Select the primary category corresponding to your Malaysian Medical Council (MMC) registration.`
   - *Validation:* Non-empty. If empty on submit $\rightarrow$ `"Please select your practitioner classification."`
2. **Multi-Specialty Allocation Button (Conditional):**
   - *Component ID:* `ACT-SPEC-MODAL-001` | *Original:* `#specializationModal`
   - *Trigger Condition:* If selected classification has multi-specialty sub-categories.
   - *Label:* `Allocate Specialization Percentages`
   - *Dialog:* Accessible Modal Dialog (`role="dialog"`, `aria-modal="true"`). Exposes percentage textboxes for each sub-specialty.
   - *Validation:* Dynamic real-time validator. Sum must equal **exactly 100.0%**; each input $> 0\%$. Displays active counter: `"Remaining to allocate: X%"`.
3. **Limit of Liability Selector:**
   - *Field ID:* `FLD-CALC-LIAB-002` | *Original:* `#liability_id`
   - *Label:* `Limit of Liability (Any One Claim & In the Aggregate)` (Required)
   - *Control:* Large Accessible Radio Cards with tier limit and indicative annual base price.
   - *Options:* Dynamically loaded from `POST /api/getSpecialization` (`RM 250,000` to `RM 10,000,000`).
   - *Validation:* Required selection.
4. **Coverage Inception Date & Term:**
   - *Field ID:* `FLD-CALC-DATE-003` | *Original:* `#insurance_start_date`
   - *Label:* `Coverage Inception Date` (Required)
   - *Control:* Accessible Datepicker with disabled dates $> \text{Today} + 9 \text{ months}$.
   - *APC Co-Termination Toggle:* Checkbox: `Align coverage expiry with Annual Practicing Certificate (APC) on 31st December` (`RULE-PROR-01`).
   - *Backdating Interception:* If selected date $< \text{Today}$, triggers modal dialog displaying Clause 6.12 statutory disclosure (`RULE-DATE-02`). Agree mutates date to `01/01/YYYY`; Disagree clears date.

#### Substep 1B: Clinic & Practice Facilities (Progressive Disclosure)
1. **Clinic Ownership Toggle:**
   - *Field ID:* `FLD-CALC-OWN-004` | *Original:* `#own_clinic`
   - *Label:* `Do you own, operate, or partner in a private clinic practice?`
   - *Control:* Segmented Radio Switch (`Yes` / `No`). Default: `No`.
2. **Organization Entity Structure (Conditional on `own_clinic = "Yes"`):**
   - *Field ID:* `FLD-CALC-ENTY-005` | *Original:* `#entity_sole`, `#entity_partner`, `#entity_sdn`
   - *Label:* `Practice Entity Type` (Required if clinic owner)
   - *Control:* 3 Radio Selection Cards:
     - `Sole Proprietorship` (Single doctor owner)
     - `Partnership` (Two or more partner doctors)
     - `Private Limited Company (Sdn Bhd)`
3. **Clinic Entity Cover Toggle:**
   - *Field ID:* `FLD-CALC-CLIN-006`
   - *Label:* `Include Clinic Facility Indemnity Endorsement?`
   - *Helper Text:* `Extends legal defense and liability protection to the clinic entity for errors of non-medical staff and administrative negligence.`
4. **Person-In-Charge (PIC) Coverage Selector:**
   - *Field ID:* `FLD-CALC-PIC-007` | *Original:* `#is_pic`
   - *Label:* `Include Person-In-Charge (PIC) Statutory Coverage?`
   - *Notice:* If Sole Proprietor with 0 branches $\rightarrow$ Badge: `Complimentary (RM 0.00 Included)` (`RULE-PIC-01`).
5. **Branch Clinics Counter:**
   - *Field ID:* `FLD-CALC-BRAN-008` | *Original:* `#branch_count`
   - *Label:* `Additional Clinic Branches (Excluding Main Practice)`
   - *Control:* Stepper control (`0` to `4` branches).
   - *Validation:* Cap at 4 branches (`LEG-BRANCH-001`). Attempting 5 triggers modal `#jsBranchLimitExceededModal` directing to support for group policy.
6. **Combined Clinic Annual Revenue:**
   - *Field ID:* `FLD-CALC-REVN-009` | *Original:* `#revenue_amount`
   - *Label:* `Estimated Combined Annual Revenue of All Branches (RM)`
   - *Control:* Currency Input Mask (`RM X,XXX,XXX`).
   - *Validation:* If $> \text{RM } 5,000,000$, displays warning and routes case to underwriter review upon submission.

#### Substep 1C: Affinity Promotional Code
1. **Promo Code Input:**
   - *Field ID:* `FLD-CALC-PROM-010` | *Original:* `#promo_code`
   - *Label:* `Promotional / Association Code (Optional)`
   - *Placeholder:* `e.g. MMA2026, MAAM2026`
   - *Action Button:* `Apply Code` (Triggers `POST /api/checkPromoCode`).
   - *Feedback:* Green badge for valid discounts; inline accessible red error for expired/invalid codes.

### 2.2 Navigation Actions
- **Primary Action:** `Generate Quotation` (`ACT-NAV-NEXT-001`) $\rightarrow$ Dispatches `POST /api/calculatePremium`, transitions router to `/buy/quote`.

---

## 3. Screen SCR-TOBE-02: Quotation Review & Options (`/buy/quote`)

- **Screen ID:* `SCR-TOBE-02`
- **Route:** `/buy/quote`
- **Milestone:** Stage 2 of 4: Quotation
- **Page Title:** `DoctorShield | Indicative Quotation Review`
- **Main Heading:** `<h1 class="font-kanit font-normal text-2xl text-navy">Your Indicative Quotation Breakdown</h1>`
- **Subheading:** `Review your premium summary, download indicative schedule, or proceed directly to application.`
- **Semantic Structure:** 2-column layout with detailed coverage cards and clear itemized table.

### 3.1 Component Specifications
1. **Itemized Premium Breakdown Card:**
   - Individual Professional Indemnity Premium: `RM [BaseGross]`
   - Association / Promotional Discount: `- RM [DiscountAmount]` (if applied)
   - Clinic Entity Indemnity Cover: `RM [ClinicPremium]` (if selected)
   - Additional Branch Clinics (X branches): `RM [BranchSurcharge]` (if selected)
   - Person-In-Charge (PIC) Protection: `RM 0.00 (Complimentary)` or rated
   - **Net Gross Premium:** `RM [NetGross]`
   - **Sales & Service Tax (SST @ 8.0%):** `RM [SSTAmount]`
   - **Statutory Stamp Duty:** `RM 10.00`
   - **Total Payable Amount:** `<span class="text-3xl font-medium text-navy">RM [TotalPayable]</span>`
2. **Coverage Invariant Highlights:**
   - Limit of Liability: `RM [Limit]` Any One Claim & In the Aggregate.
   - Reinstatements: `1x Automatic Reinstatement Included (RM 0.00)` (`RULE-REIN-01`).
   - Policy Period: `[StartDate] to [EndDate] ([Days] days)`.
   - Retroactive Date: `[StartDate]` (New Policy) or `[OriginalRetroDate]` (Renewal).
3. **Secondary Action: Save / Email Quotation (`ACT-QUOTE-EMAIL-001`):**
   - Button: `Email Quotation PDF`
   - Control: Opens dialog requesting recipient email address.
   - Backend Action: Generates PDF quote with unique token `DS-YYYY-XXXXX`, guarantees rate validity for 30 days.

### 3.2 Navigation Actions
- **Back Action:** `<a href="/buy/coverage" class="btn-ghost">Edit Coverage Details</a>` (Preserves all inputs).
- **Primary Action:** `<a href="/buy/underwrite" class="btn-primary">Proceed to Application</a>`.

---

## 4. Screen SCR-TOBE-03: Practitioner Details & Underwriting (`/buy/underwrite`)

- **Screen ID:** `SCR-TOBE-03`
- **Route:** `/buy/underwrite`
- **Milestone:** Stage 3 of 4: Details & Underwriting
- **Page Title:** `DoctorShield | Practitioner Particulars & Declarations`
- **Main Heading:** `<h1 class="font-kanit font-normal text-2xl text-navy">Doctor & Practice Particulars</h1>`
- **Subheading:** `Provide your registration identity and complete the statutory medical underwriting declarations.`
- **Semantic Structure:** Single-column ergonomic form with clear thematic fieldsets.

### 4.1 Component Specifications

#### Substep 3A: Doctor Identity Particulars (`fieldset` with `legend`)
1. **Title Dropdown:** `FLD-PART-TITL-012` | Options: `Dr.`, `Dato' Dr.`, `Datuk Dr.`, `Prof. Dr.`, `Tan Sri Dr.`.
2. **Full Name as per IC / Passport:** `FLD-PART-NAME-013` (Required, uppercase).
3. **NRIC / Passport Number:**
   - *Field ID:* `FLD-PART-NRIC-014` | *Format:* `YYMMDD-PB-###G` (12 digits).
   - *Auto-Extraction:* Automatically derives Date of Birth (`FLD-PART-DOB-015`) and Gender (`FLD-PART-GNDR-016`).
   - *Existing Customer Substitution Trigger:* Submits NRIC to `POST /api/nricPromoCodeCheck`. If user applied a new customer promo code on Stage 1, triggers modal `#jsNewPromocodeChangeModel` and auto-substitutes the renewal discount code (`RULE-PROM-02`).
4. **Mobile Phone Number:** `FLD-PART-PHON-017` (Malaysian format `+60 1X-XXXX XXXX`).
5. **Email Address:** `FLD-PART-EMAL-018` (Email validation schema).
6. **MMC Full Registration Number:** `FLD-PART-MMCN-019` (Required numeric string).
7. **Primary Practice Clinic Name & Address:** `FLD-PART-CLNM-020`, `FLD-PART-ADDR-021` to `025` (Postcode, City, State).
8. **Branch Clinic Address Cards (Conditional):** If branches $> 0$, renders branch name and address cards for each added branch (`FLD-PART-BRNM-026` to `039`).

#### Substep 3B: Statutory Medical Declarations (`fieldset`)
1. **Clean Claims History Statement (5 Years):**
   - *Field ID:* `FLD-DECL-CLM5-040` | *Original:* Statement 1
   - *Copy:* Verbatim 5-year clean claims declaration (`COPY_AND_LEGAL_REGISTER.md`).
   - *Control:* Mutually Exclusive Radios: `I Agree` / `I Disagree`.
   - *Referral Trigger:* Selecting `I Disagree` flags case for referral (`RULE-DECL-01`).
2. **Errors, Omissions & Claims Inquiries Question:**
   - *Field ID:* `FLD-DECL-ERRS-041` | *Options:* `No` / `Yes`.
   - *Conditional Detail:* If `Yes` $\rightarrow$ Mandatory textarea `FLD-DECL-ERRD-042` expands (min 20 characters).
3. **Disciplinary Proceedings & MMC Inquiries:**
   - *Field ID:* `FLD-DECL-DISC-043` | *Options:* `No` / `Yes`.
   - *Conditional Detail:* If `Yes` $\rightarrow$ Mandatory textarea `FLD-DECL-DISD-044` expands.
4. **Criminal Offenses & Prosecutions:**
   - *Field ID:* `FLD-DECL-CRIM-045` | *Options:* `No` / `Yes`.
   - *Conditional Detail:* If `Yes` $\rightarrow$ Mandatory textarea `FLD-DECL-CRMD-046` expands.

#### Substep 3C: Supplementary COVID-19 Questionnaire (Conditional)
- *Display Condition:* Only renders if server flag `is_active_supplementarty_covid_questions = true` (`RULE-COV-01`).
- *Content:* Verbatim COVID risk assessment questions (`FLD-DECL-COV1-047` to `055`). Adverse response routes to referral.

### 4.2 Navigation Actions
- **Back Action:** `<a href="/buy/quote" class="btn-ghost">Back to Quotation</a>` (Zero data loss).
- **Primary Action:** `Continue to Review & Payment` (`ACT-NAV-NEXT-002`).
  - *Branch Decision:* If all declarations are clean $\rightarrow$ Navigates to `/buy/review`.
  - *Branch Decision:* If any adverse declaration or disagreement $\rightarrow$ Navigates to `/referral`.

---

## 5. Screen SCR-TOBE-04: Review, Statutory Consent & Payment (`/buy/review`)

- **Screen ID:** `SCR-TOBE-04`
- **Route:** `/buy/review`
- **Milestone:** Stage 4 of 4: Review & Payment
- **Page Title:** `DoctorShield | Final Policy Review & Payment`
- **Main Heading:** `<h1 class="font-kanit font-normal text-2xl text-navy">Review & Authorize Coverage</h1>`
- **Subheading:** `Please verify your policy details, review statutory disclosures, and select your payment method.`

### 5.1 Component Specifications
1. **Executive Policy Summary Table:**
   - Insured Doctor: `Dr. [Name] (NRIC: [NRIC], MMC: [MMC])`
   - Practice Specialization: `[Classification]`
   - Policy Schedule: `[StartDate] to [EndDate] (Retroactive Date: [RetroDate])`
   - Facility Protection: `[ClinicName] (Branches: [BranchCount])`
   - Itemized Premium: Net Gross `RM [Gross]`, SST (8%) `RM [SST]`, Stamp Duty `RM 10.00`, Total: `<span class="text-navy font-bold">RM [Total]</span>`.
2. **Statutory Legal Notices & Disclosures (`DIS-REV-001` to `005`):**
   - **PIDM Protection Statement:** Verbatim protection under TIPB up to RM 500,000.
   - **Duty of Disclosure Notice:** Statutory notice under Schedule 9 of Financial Services Act 2013.
   - **Chubb Privacy Notice & PDPA Statement:** Bilingual notice with links to full policy wording.
   - **Subrogation & Direct Right of Action Notices:** Verbatim statements.
3. **Mandatory Affirmative Consent Checkboxes:**
   - `[ ] I have read, understood, and accept the Chubb Master Policy Wording, Product Disclosure Sheet, and Terms & Conditions.` (`FLD-REV-CONS-070`)
   - `[ ] I confirm that all statements and answers given in this proposal are true, correct, and complete (Duty of Disclosure).` (`FLD-REV-CONS-071`)
   - `[ ] I consent to the collection, use, and disclosure of my personal data under the Personal Data Protection Act 2010 (PDPA).` (`FLD-REV-CONS-072`)
4. **Payment Method Channel Selector:**
   - *Field ID:* `FLD-PAY-OPTION-074` | *Original:* `#jsCreditCardPayment`, `#jsBusinessPayment`
   - *Control:* 2 Large Visual Selector Cards:
     - `Card 1: Personal Credit / Debit Card & FPX Individual Banking` (Instant personal authorization)
     - `Card 2: Business Banking / Corporate FPX` (Corporate bank account authorization)

### 5.2 Navigation Actions
- **Back Action:** `<a href="/buy/underwrite" class="btn-ghost">Edit Details</a>`.
- **Primary CTA:** `<button id="btnProceedPayment" class="btn-primary w-full">Proceed to Secure Payment</button>`.
  - Dispatches `POST /api/initiatePayment`.
  - Redirects browser to hosted PCI-DSS gateway checkout (`RULE-PAY-01`).

---

## 6. Screen SCR-TOBE-05: Policy Issuance & Documents (`/buy/complete`)

- **Screen ID:** `SCR-TOBE-05`
- **Route:** `/buy/complete`
- **Milestone:** Completion / Active Coverage
- **Page Title:** `DoctorShield | Policy Issued Successfully`
- **Main Heading:** `<h1 class="font-kanit font-normal text-2xl text-teal">Congratulations, Doctor. Your Indemnity is Active.</h1>`
- **Subheading:** `Your Chubb medical professional indemnity policy has been successfully issued.`

### 6.1 Component Specifications
1. **Success Banner & Policy Metadata:**
   - Green Checkmark Badge (`#08A5B5`).
   - Policy Number: `CHUBB-DS-2026-XXXXX`
   - Coverage Inception: `[StartDate] 00:00:00` | Expiry: `[EndDate] 23:59:59`
   - Insured Entity: `Dr. [Name] ([Classification])`
2. **Instant Download Action Cards:**
   - `Download Certificate of Insurance (COI) PDF` (`ACT-DOC-COI-001`) — Ready for immediate MMC APC upload.
   - `Download Official Tax Invoice & Receipt PDF` (`ACT-DOC-INV-001`) — Complete with SST breakdown.
   - `Download Master Policy Wording & Schedule PDF` (`ACT-DOC-SCH-001`).
3. **Dispatch Notification:**
   - Confirmation text: `"Official policy documents have been dispatched to [doctor@email.com]."`
4. **Return Home Action:** `<a href="/" class="btn-secondary">Return to Portal Home</a>`.

---

## 7. Screen SCR-TOBE-06: Support-Assisted Referral (`/referral`)

- **Screen ID:** `SCR-TOBE-06`
- **Route:** `/referral` (Replaces legacy `#jsPage8`)
- **Page Title:** `DoctorShield | Underwriting Support Referral`
- **Main Heading:** `<h1 class="font-kanit font-normal text-2xl text-navy">Specialist Underwriting Review Required</h1>`
- **Subheading:** `Your proposal requires personalized assessment by our Chubb medical underwriting team.`

### 7.1 Component Specifications
1. **Reassurance & Process Card:**
   - Professional, dignified medical framing (eliminating legacy alarmist copy and misspelling `"PLEAESE"`).
   - Text: `"Based on your clinical history or specific practice scope, automated online binding is unavailable. Our relationship managers work directly with Chubb underwriters to secure tailored terms for your practice."`
2. **Direct Contact Methods Card:**
   - Dedicated Broker Phone: `+60 3-XXXX XXXX` (Direct Line, Mon–Fri 9am–6pm)
   - WhatsApp Support Line: `+60 1X-XXX XXXX`
   - Underwriting Email: `underwriting@doctorshield.com`
3. **Relationship Manager Callback Request Form (`FLD-REF-070` to `073`):**
   - Inputs: Doctor Name, Phone, Email, Preferred Callback Time (Morning / Afternoon).
   - Action Button: `Request Underwriting Specialist Callback` (`POST /api/contactSupport`).
   - Feedback: Confirmation modal: `"Thank you Dr. [Name]. A senior relationship manager will contact you within 1 business day."`
4. **History Trapping:** Router executes `replaceState`; browser back navigation is disabled to prevent retrospective declaration alterations.

---

## 8. Screen SCR-TOBE-07: Dedicated Renewal Portal (`/renew`)

- **Screen ID:** `SCR-TOBE-07`
- **Route:** `/renew`
- **Page Title:** `DoctorShield | Policy Renewal Portal`
- **Main Heading:** `<h1 class="font-kanit font-normal text-2xl text-navy">Renew Your Indemnity Protection</h1>`
- **Subheading:** `Instant policy renewal for existing DoctorShield policyholders with continuous retroactive protection.`

### 8.1 Component Specifications
1. **Authentication Step (Mobile OTP):**
   - Mobile Number Input (`FLD-RNW-MOBI-075`).
   - Channel Selection: `SMS OTP` or `WhatsApp OTP`.
   - 6-Digit Verification Code Input (`FLD-RNW-OTPC-076`) with 60-second resend countdown.
2. **Active Policy Inspection Card:**
   - Displays retrieved policy: Policy Number, Specialization, Current Limit, Expiry Date.
   - Status Badge: `Expiring in X Days` (or `Lapsed - Retroactive Grace Window`).
   - Locked Inception Notice: `Continuous Inception: [PriorExpiry + 1 Day]` | `Retroactive Date: [OriginalRetroDate] (Continuous)`.
3. **One-Click Renewal Action:**
   - Button: `Review Renewal Quote` $\rightarrow$ Transitions directly to `/buy/quote` with renewal discount code auto-applied and policyholder particulars pre-loaded.

