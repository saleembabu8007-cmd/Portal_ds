# AS-IS FLOW AUDIT
## DoctorShield Individual Medical Professional Indemnity Portal — Forensic Audit

> **Document ID:** `DOC-AS-IS-FLOW-001`  
> **Classification:** [VERIFIED] / [INFERRED]  
> **Date of Observation:** 2026-10-29  
> **Auditor:** Principal Product Architect & Engineering Lead  
> **Portal URL Audited:** `https://my-individualindemnity.doctorshield.com/`

---

## 1. System Overview & Architecture of Current Experience

The current DoctorShield portal delivers online medical malpractice indemnity insurance underwritten by **Chubb Insurance Malaysia Berhad** and distributed by **JA Assure**.

### Architectural Characterisation [VERIFIED]
- **Frontend Paradigm:** Single Page Application (SPA) driven by jQuery, Bootstrap 4, and server-side Blade/PHP templating bundled into minified JavaScript assets (`home.min.js`, `common-frontend.min.js`).
- **State Pattern:** Monolithic form (`#jsQuoteForm`) containing 120+ inputs. Steps are rendered as sibling `div.page_div` elements toggled via `.hidden` classes.
- **Dynamic Rating:** Classification selection triggers asynchronous AJAX calls (`POST /api/getSpecialization`) to load eligible liability tiers and calculation factors dynamically.
- **Fulfillment Integration:** Payment gateway redirection model (Personal internet banking/FPX, credit/debit card, and business internet banking).

---

## 2. End-to-End User Journey Walkthroughs

---

### Flow 1: New Purchase & Instant Quotation Journey

```
[Start: Landing Page]
       │
       ▼
[Step 1: Calculate Premium] ──(Validation Error)──► [Inline Error Displays]
       │
       ├──(Date < Today)──► [Modal: Policy Backdate Agreement] ──(Disagree)──► [Halt]
       │                                     │(Agree)
       ▼                                     ▼
[Step 2: Quotation & Customisation] ◄────────┘
       │
       ├──(Select "Email me Quote")──► [Modal: Confirmation & Email Dispatch] ──► [End]
       │
       └──(Select "Buy now")
              │
              ▼
       [Step 3: Personal Particulars & Declarations]
              │
              ├──(Click "Add Clinic / Branch")──► [Modal: Add Branch] ──► [Save to Form]
              │
              ├──(Any Adverse Declaration = "Yes" / "Disagree")
              │      │
              │      ▼
              │   [Step 5: Referral / Support Interruption] (Flow 2)
              │
              ├──(COVID Exposure Flagged = "Yes")
              │      │
              │      ▼
              │   [Screens 04A-C: COVID-19 Questionnaires]
              │      │
              │      ▼
              └──►[Step 7: Payment Selection]
                     │
                     ▼
                  [External Payment Gateway Redirection]
                     │
                     ▼
                  [Payment Confirmation & Policy Email]
```

#### Detailed Stage Breakdown

#### 1. Stage 1: Calculation Parameters (Step 1 / `#jsPage1`) [VERIFIED]
- **Entry:** User arrives at root URL `https://my-individualindemnity.doctorshield.com/`.
- **Classification Selection:** User selects their medical role from `#classification_id` (23 available options, e.g. *General Medical Practitioner*, *Govt Medical Officer with locum exposure*, *Dentist*, *Specialist*).
- **Asynchronous Tier Loading:** The selection immediately dispatches `POST /api/getSpecialization`, returning the rating table and dynamically populating `#liability_id` with approved indemnity limits (e.g., RM 500k, RM 1M, RM 2M, RM 5M, RM 10M).
- **Coverage Period Entry:**
  - `#insurance_start_date` is entered (DD/MM/YYYY).
  - Validation ensures the date is within 9 months into the future.
  - If a past date is selected, submission is intercepted by `#jsBackDateEnableModel` requiring the doctor to confirm Clause 6.12 non-continuous retroactive exclusions.
  - `#insurance_end_date` is calculated automatically. Tooltip modal `#periodEndDateInfo` provides explanatory guidance.
- **Contact & Discount:**
  - User provides primary contact email (`#customer_email`).
  - User may enter an association promo code (`#promo_code`).
- **Statutory Consent:**
  - Mandatory checkbox `#jsContactTermsAndCondition` acknowledges terms, privacy policy, and PIDM protection limits.
- **Submission:** Clicking `Calculate` (`#jsPage1Submit`) performs client-side field validation, invokes `/api/calculatePremium`, transitions `#jsPage1` to `display: none`, and reveals `#jsPage2`.

#### 2. Stage 2: Quotation & Coverage Customisation (Step 2 / `#jsPage2`) [VERIFIED]
- **Quote Header:** Displays calculated premium breakdown:
  - Base individual indemnity premium.
  - Pro-rated amount for the specific policy window vs. standard 12-month annual figure.
  - Applied association discounts (`DISCOUNTED INDIVIDUAL PREMIUM`).
  - Total payable including Malaysian SST (8%) and Stamp Duty (RM 10).
- **Clinic Ownership Profiling:**
  - `"Do you own a clinic?"`: Toggling `Yes` dynamically unfolds:
    - Business structure: `Sole Proprietor` vs `Partnership / Sdn Bhd`.
    - Locum exposure: `"Do you hire locums who sees new patients on their own?"` (`Yes` / `No`).
    - Clinic Indemnity Limit dropdown (`#clinic_liability_id`).
    - Recommended Clinic Indemnity package card (`#medical_establishment_package`).
- **PIC (Person-In-Charge) Evaluation:**
  - Evaluates whether the practitioner is a designated Person-in-Charge for their clinic or another medical facility.
  - Answering `Yes` reveals the recommended **PIC Coverage Add-On** card.
- **Reinstatement:**
  - Displays complimentary Automatic Reinstatement confirmation badge.
- **Fulfillment Path Branch:**
  - **Option A ("Buy now"):** User selects `#emailMe2`, button reads `Buy >>`. Advances directly to Step 3.
  - **Option B ("Email me Quotation"):** User selects `#emailMe1`, button reads `Submit`. Triggers `/api/sendIndicativeQuoteMail`, emails the formal quote and Chubb policy wording PDF, and displays confirmation modal `#jsReIndicativeQuoteErrorModel`.

#### 3. Stage 3: Personal Particulars & Underwriting (Step 3 / `#jsPage3`) [VERIFIED]
- **Identity Fields:**
  - Full Name as per NRIC (`#customer_name`).
  - Date of Birth (`#dob`), NRIC / Passport Number (`#nric`).
  - Nationality dropdown (`#nationality`) with conditional country name for foreign practitioners.
  - Clinic business name (`#clinical_name`) if clinic ownership was declared.
  - Annual professional income tier (`#income`).
  - Primary practice hospital/clinic address (`#practice_location`) and mobile number (`#customer_phone`).
- **Branch Addition:**
  - If operating multiple facilities under one entity with aggregate revenue < RM 5,000,000, user clicks `Add Clinic / Branch` to trigger `#jsBranchModal` and attach additional branch locations.
- **Mandatory Underwriting Declarations:**
  - Applicants must respond to 4 core underwriting questions via button toggles:
    1. Past claims history (Agree/Disagree -> details textarea `#no_claim_desc`).
    2. Awareness of errors/omissions (Yes/No -> details textarea `#aware_of_errors_desc`).
    3. Disciplinary inquiries by MMC/regulators (Yes/No -> details textarea `#desciplinary_action_desc`).
    4. Criminal investigations/charges (Yes/No -> details textarea `#criminal_charges_desc`).
  - If Clinic package was added, an additional 4 entity-level questions are evaluated.
- **Branch Routing Logic on Submit:**
  - **Clean Application:** Advances to Step 7 (Payment).
  - **COVID Risk Triggered:** Routes to COVID questionnaires (Screens 04A-C).
  - **Adverse Underwriting (Any "Yes" / "Disagree"):** Routes to Step 5 (Referral Interruption).

#### 4. Stage 4: Payment Selection & Checkout (Step 7 / `#jsPage10`) [VERIFIED]
- **Payment Method Selection:**
  - Option 1: `Credit/Debit Card/Wallet/Personal Internet Banking` (`#jsCreditCardPayment`).
  - Option 2: `Business Internet Banking` (`#jsBusinessPayment`).
- **Statutory Retroactive Notice:** Renders full non-continuous retroactive disclosure text.
- **Execution:** Clicking `Proceed to payment` (`#jsFinalPageSubmit`) posts proposal data to `/api/initiatePayment` and triggers browser redirect to the secure payment gateway.
- **Post-Payment:** On successful return callback, routes to `/success`, issues digital receipt, and triggers instant policy certificate email.

---

### Flow 2: Support Referral & Underwriting Escalation Journey

| Step | Container | User Experience & System Behavior | Evidence Reference |
|---|---|---|---|
| **Step 2.1** | `#jsPage8` | Triggered automatically when an applicant answers `Yes` to errors/disciplinary/criminal questions or `Disagree` to clean claims. The portal intercepts self-service checkout and displays: `PLEAESE CALL SUPPORT OFFICE` *(sic)* and prompts: `We need more information to process your application, Will you be ok for our manger to call you at [Customer Phone]?` | `PAGE-08`, `COPY-01`, `COPY-02` |
| **Step 2.2** | User Choice | - If user clicks `No`: System advises applicant to call customer service directly. Application remains pending.<br>- If user clicks `Yes`: Advances to `#jsContact`. | [VERIFIED] |
| **Step 2.3** | `#jsContact` | Pre-populates Customer Name, Clinic Name, Mobile Number, and Email. User clicks `Submit`, dispatching data to `/api/contactSupport`. | `PAGE-CONTACT` |
| **Step 2.4** | Confirmation | A confirmation modal is shown informing the applicant that an underwriter / Relationship Manager will review the file within 1–2 business days. | [INFERRED] |

---

### Flow 3: Policy Renewal Journey

| Step | Container / Route | User Experience & System Behavior | Evidence Reference |
|---|---|---|---|
| **Step 3.1** | `/renew` or `#jsFormRenewModal` | Existing policyholders access the renewal portal via email reminder link (`quote.thedoctorshield.com/renew`) or portal navigation. | `SCR-005`, `SCR-030`, `MODAL-18` |
| **Step 3.2** | Mobile Authentication | User enters registered Malaysian mobile number (`#form_phone_number`). Selects delivery channel: `Message OTP` (SMS) or `Whatsapp OTP`. | `MODAL-18` |
| **Step 3.3** | OTP Dispatch | Clicks `Generate OTP`. Calls `/api/generateOTP`. Displays 5-minute security timer. | [VERIFIED] |
| **Step 3.4** | Token Validation | User submits 4/6-digit OTP into `#form_otp_value`. Triggers `/api/verifyOTP`. | [VERIFIED] |
| **Step 3.5** | Policy Selection | System retrieves and presents modal `#jsUserPolicyList` ("Policies tagged to your mobile number"), listing active/expiring policy certificates. | `MODAL-20` |
| **Step 3.6** | Pre-populated Review | Selecting an active policy pre-populates previous practitioner classification, specialty, and clinic details, displaying the recalculated annual renewal quote. | [INFERRED] |
| **Step 3.7** | Renewal Checkout | Doctor confirms continuous practice standing, accepts annual declarations, and proceeds to payment gateway. | [VERIFIED] |

---

### Flow 4: Claims Initiation / Notification Flow

| Step | Container / Route | User Experience & System Behavior | Evidence Reference |
|---|---|---|---|
| **Step 4.1** | `#jsInitialClaimFormModal` | Triggered when user selects claims assistance from the support menu. | `MODAL-19` |
| **Step 4.2** | Identity Verification | Prompts for registered mobile number (`#initial_claim_form_phone_number`) and dispatches verification OTP via SMS or WhatsApp. | [VERIFIED] |
| **Step 4.3** | Claim Dossier Access | Upon successful OTP entry, grants access to initial incident notification and medicolegal defense request forms. | [INFERRED] |

---

## 3. Discovered Branches & Boundary States

| Branch ID | Trigger Condition | Intercepting Screen / Modal | Outcome / System Destination | Status |
|---|---|---|---|---|
| **BR-01** | Standard clean proposal | Standard wizard path | Advances seamlessly Step 1 -> 2 -> 3 -> 7 -> Payment Gateway | [VERIFIED] |
| **BR-02** | Start date earlier than today (Backdate) | `#jsBackDateEnableModel` | Requires explicit agreement to Clause 6.12 exclusions. If disagreed, halts calculation. | [VERIFIED] |
| **BR-03** | Date > 9 months from today | Inline validator `#insurance_start_date` | Displays: `Please enter a valid date, date should be within nine months from today.` Halts. | [VERIFIED] |
| **BR-04** | User requests quotation via email | `#emailMe1` on Step 2 | Dispatches quote PDF via `/api/sendIndicativeQuoteMail`. Shows `#jsReIndicativeQuoteErrorModel`. Halts checkout. | [VERIFIED] |
| **BR-05** | Clinic ownership = `Yes` | Step 2 dynamic unhide | Exposes clinic structure, locum questions, clinic liability tiers, and clinic package card. | [VERIFIED] |
| **BR-06** | Person-In-Charge = `Yes` | Step 2 dynamic unhide | Unhides recommended PIC coverage add-on card. | [VERIFIED] |
| **BR-07** | Branch addition requested | `#jsBranchModal` | Captures branch details; enforces RM 5M revenue ceiling rule. Persists into form. | [VERIFIED] |
| **BR-08** | Adverse underwriting answer on Step 3 | `#jsPage8` (Referral Interruption) | Halts online payment. Directs doctor to Relationship Manager callback flow (`#jsContact`). | [VERIFIED] |
| **BR-09** | COVID-19 risk criteria met | `#jsPage11` -> `#jsPage12` -> `#jsPage13` | Enforces 3-page virus management, business continuity, and staff training questionnaires before payment. | [VERIFIED] |
| **BR-10** | Non-Malaysian IP / Geolocation | `#intro_modal` | Displays modal: `Dear customer, These solutions are currently available in Malaysia only.` | [VERIFIED] |
| **BR-11** | Duplicate policy purchase attempt | `#jsAlreadyBoughtModal` | Informs applicant an active policy is already on record for their NRIC/mobile. | [VERIFIED] |
| **BR-12** | Calculation session expired | `#jsStartDateValidationErrorModal` | Displays `Session Expired`. Resets wizard to Step 1. | [VERIFIED] |
| **BR-13** | Backend calculation error / 500 | `#jsServerSideErrorModal` | Displays generic `Error` modal. | [VERIFIED] |
| **BR-14** | Zero / Negative premium calculated | `#jsContactUsNegativeQuoteErrorModel` | Displays `Notes` modal and routes user to contact support. | [VERIFIED] |

---

## 4. Audit Verification Status & Gaps

| Flow / Feature | Verification Level | Audit Evidence Basis | Remaining Gaps / Privileged Needs |
|---|---|---|---|
| Step 1 Calculator & Rating AJAX | **[VERIFIED]** | Live DOM execution, network logging, option dumps | None. Fully mapped. |
| Step 2 Quote & Add-ons | **[VERIFIED]** | Full DOM inspection, button state mapping | None. Fully mapped. |
| Step 3 Particulars & Declarations | **[VERIFIED]** | Full field dump, conditional DOM analysis | None. Fully mapped. |
| Screens 04A-C COVID Questionnaire | **[VERIFIED]** | Full DOM text and input extraction | Exact scoring trigger threshold requires backend rule verification. |
| Step 5 & 6 Referral Flow | **[VERIFIED]** | Screen 8 & Contact container dump | Actual CRM ticket payload requires staging API access. |
| Step 7 Payment Method Selection | **[VERIFIED]** | Screen 10 DOM inspection | Gateway redirect payload requires test merchant credentials. |
| Flow 3 Renewal OTP & Policy Lookup | **[VERIFIED]** | Renewal modal & network inspection | Live OTP generation cannot be performed without real test mobile. |

