# DoctorShield Individual Indemnity — Content Visibility Matrix

> **Document Reference:** `DOC-MAT-VISIBILITY-2026-10-29`  
> **Status:** Master Visibility & Hierarchy Registry Baseline  
> **Role:** Senior UX Content Strategist & Design Systems Architect  
> **Governance:** Zero paraphrasing of approved source copy. Classification strictly determines initial presence, conditional activation, progressive disclosure, or purge.

---

## 1. Classification Taxonomy

Every text element across the DoctorShield customer experience is classified into one of six mutually exclusive categories:

| Class | Definition | Architectural Treatment |
|:---:|---|---|
| **A** | **Essential and immediately visible** | Primary inputs, critical navigation labels, and immediate state displays required to progress. |
| **B** | **Essential but only visible under relevant condition** | Secondary form inputs and sub-questions activated exclusively when parent choice is triggered. |
| **C** | **Required disclosure (legally appropriate moment)** | Statutory notices (PIDM, Schedule 9 FSA 2013, Clause 6.12) displayed verbatim at the point of commitment. |
| **D** | **Contextual content for progressive disclosure** | Technical explanations, coverage definitions, and rationale accessible via clean inline triggers or modals. |
| **E** | **Repeated, decorative or unapproved AI content** | Duplicate summaries, redundant helper text, and artificial urgency banners to be permanently purged. |
| **F** | **Content requiring legal / product-owner approval** | Flagged legacy typos, dated historical references, or ambiguous wording requiring formal CCR sign-off. |

---

## 2. Master Content Visibility Matrix

---

### 2.1 Global Frame & Application Chrome

| Content ID | Exact Original Copy / Label | Current Location | Proposed Location | Class | Visibility Rule | Reason for Treatment | Risk / Approval Requirement |
|---|---|---|---|:---:|---|---|---|
| `HDR-001` | `"DoctorShield"` | Top left header | Top left header | **A** | Always visible | Core brand identity | None |
| `HDR-002` | `"Medical Professional Indemnity"` | Under brand title | Subtitle next to brand | **A** | Always visible | Product line descriptor | None |
| `HDR-003` | `"Underwritten by Chubb / Distributed by JA Assure"` | Heavy header box with vertical line | Subtle secondary text | **A** | Always visible | Statutory co-branding obligation | Retain text verbatim |
| `HDR-004` | `"Official Underwritten Chubb Indemnity Portal 2026"` | Header pill badge | *Purged* | **E** | Never | AI-generated decorative filler | None |
| `NAV-001` | `"Renew Policy"` | Header action button | Header secondary utility menu | **A** | Always visible | High-frequency existing customer flow | None |
| `NAV-002` | `"Find Quote"` | Header action button | Header secondary utility menu | **A** | Always visible | Quote retrieval utility | None |
| `NAV-003` | `"Documents"` | Header action button | Header secondary utility menu | **A** | Always visible | Access to PDS, Policy Wording | None |
| `STP-001` | `"Stage 1: Coverage"` | Stepper item 1 | 1-line step progress bar | **A** | Always visible | Stage navigation indicator | None |
| `STP-002` | `"Stage 2: Quotation"` | Stepper item 2 | 1-line step progress bar | **A** | Always visible | Stage navigation indicator | None |
| `STP-003` | `"Stage 3: Particulars"` | Stepper item 3 | 1-line step progress bar | **A** | Always visible | Stage navigation indicator | None |
| `STP-004` | `"Stage 4: Review & Pay"` | Stepper item 4 | 1-line step progress bar | **A** | Always visible | Stage navigation indicator | None |
| `STP-005` | `"Stage X of 4: [Stage Name] — Step in Progress"` | Sub-stepper banner | *Purged* | **E** | Never | Redundant duplicate of step bar | None |

---

### 2.2 Stage 1: Coverage Details & Premium Calculation (`#jsPage1`)

| Content ID | Exact Original Copy / Label | Current Location | Proposed Location | Class | Visibility Rule | Reason for Treatment | Risk / Approval Requirement |
|---|---|---|---|:---:|---|---|---|
| `QST-CALC-001` | `"Select Your Professional Coverage"` | Step 1 H1 | Step 1 primary heading | **A** | Always visible | Clear primary purpose | None |
| `TXT-CALC-001` | *"Get an instant indicative quotation for your Medical Professional Indemnity..."* | Subtitle paragraph | *Purged* | **E** | Never | Unnecessary filler describing visible form | None |
| `FLD-CALC-001` | `"Classification"` | Dropdown label | Dropdown label | **A** | Always visible | Primary underwriting factor | 23 approved options verbatim |
| `TXT-CALC-002` | *"Select the primary medical or dental category corresponding to your MMC/MDC registration."* | Helper text below select | *Purged* | **E** | Never | Explains the obvious; practitioners know their classification | None |
| `FLD-CALC-002` | `"Limit Of Liability"` | Radio card group | Segmented radio group | **A** | Always visible | Primary coverage limit selection | Options RM 250k–10M verbatim |
| `TXT-CALC-003` | *"Any One Claim & Aggregate"* | Repeated in each card | Section subtitle above limits | **A** | Once above group | Deduplicate 4-time repeated text | Retain term verbatim |
| `TAG-CALC-001` | `"Recommended"` (on RM 1,000,000) | Top right pill badge | Subtle badge on RM 1M | **A** | Visible on RM 1M | Preserved for test parity | None |
| `TAG-CALC-002` | `"Standard Practice"`, `"High Exposure"` | Pill badges on cards | *Purged* | **E** | Never | Unverified subjective marketing tags | None |
| `TXT-CALC-004` | *"Select your required maximum aggregate defense and damages indemnity."* | Helper text below limits | *Purged* | **E** | Never | AI-generated explanatory noise | None |
| `FLD-CALC-003` | `"Coverage Inception Date"` | Date input 1 | Two-column date block | **A** | Always visible | Policy inception date selector | None |
| `FLD-CALC-004` | `"Coverage Expiry Date"` | Date input 2 (fixed 31/12) | Two-column date block | **A** | Always visible (disabled) | Mandatory co-terminus regulatory constraint | None |
| `ACT-CALC-003` | `"Why 31st December?"` | Prominent button in label | Subtle helper note below input | **D** | Inline note or hover tooltip | Modal interruptive for fixed rule | None |
| `DIS-CALC-003` | `"* Policy end date is always 31'st December"` | Tooltip `#periodEndDateInfo` | Helper text below expiry date | **F** | Visible on trigger | Punctuation typo (`31'st`); flag for approval | `FLAG-08` |
| `FLD-CALC-005` | `"Practitioner Email Address"` | Email input | Email input | **A** | Always visible | Quote delivery & applicant contact | None |
| `FLD-CALC-006` | `"Promotional Code (Optional)"` | Standalone shaded card | Collapsible inline text link | **D** | Visible when clicked | Reduces visual clutter for non-promo users | None |
| `DIS-CALC-001` | `"The benefit(s) payable under eligible certificate/ policy/ product is(are) protected by PIDM..."` | Shaded slate card | Clean unboxed statutory block | **C** | Always visible on Stage 1 | Mandatory statutory PIDM statement | Absolute. Verbatim copy |
| `DIS-CALC-002` | `"I have read, understood and agree to the terms and conditions, privacy policy and I meet all local regulation..."` | Checkbox label | Mandatory checkbox label | **C** | Always visible on Stage 1 | Initial statutory consent & MMC standing | Absolute. Verbatim copy |
| `ACT-CALC-001` | `"Generate Quotation"` (or `"Calculate"`) | Primary submit CTA | Primary submit CTA | **A** | Always visible | Progression trigger | Matches test selectors |

---

### 2.3 Stage 2: Quotation Breakdown & Optional Add-ons (`#jsPage2`)

| Content ID | Exact Original Copy / Label | Current Location | Proposed Location | Class | Visibility Rule | Reason for Treatment | Risk / Approval Requirement |
|---|---|---|---|:---:|---|---|---|
| `QST-QUOT-001` | `"Quotation"` | Step 2 H1 | Step 2 primary heading | **A** | Always visible | Stage title | None |
| `MSG-QUOT-001` | `"DISCOUNTED INDIVIDUAL PREMIUM"` | Discount badge | Clean badge next to premium | **A** | Visible when promo applied | Indicates promotional saving | None |
| `MSG-QUOT-002` | `"SPECIAL INDIVIDUAL PREMIUM"` | Standard badge | Clean badge next to premium | **A** | Visible when standard rate | Standard rate tier label | None |
| `MSG-QUOT-003` | `"(i) This premium is pro-rated for the period [Start] to [End]"` | Blue card row 1 | 1-line note under net premium | **A** | Always visible | Pro-rata statutory clarification | Retain verbatim |
| `MSG-QUOT-004` | `"(ii) For your information, the standard premium for a 12 month period will be RM [Amount]"` | Blue card row 2 | 1-line note under net premium | **A** | Always visible | Full-year reference figure | Retain verbatim |
| `MSG-QUOT-005` | `"Your Insurance comes with complimentary Automatic Reinstatement now"` | Gradient card with sparkles | Clean benefit row with checkmark | **A** | Always visible | Complimentary benefit disclosure | Remove decorative sparkles |
| `MSG-QUOT-007` | *"Your premium rate is locked for the next 15 minutes..."* | Green countdown card | *Purged* (replaced by calm note) | **E** | Never | Artificial panic-timer not in backend logic | `FLAG-12` |
| `TXT-QUOT-001` | `"Quote valid until 31 Dec [Year]"` | *New minimal replacement* | Underneath quote header | **A** | Always visible | Calm, factual quote validity notice | None |
| `QST-QUOT-008` | `"Do you own a clinic?"` | Button toggle card | Clean segmented toggle | **A** | Always visible | Primary clinic rating branch | None |
| `QST-QUOT-009` | `"Is it a Sole proprietor or partnership / sdn bhd?"` | Nested grey card | Sub-toggle below clinic question | **B** | Visible IF `Clinic == Yes` | Progressive disclosure; hide for non-owners | None |
| `QST-QUOT-010` | `"Do you hire locums who sees new patients on their own?"` | Nested card row | Sub-toggle below clinic structure | **B** | Visible IF `Clinic == Yes` | Progressive disclosure; grammatical defect flagged | `FLAG-05` |
| `QST-QUOT-014` | `"Add This Recommended Coverage"` (Clinic Package) | Nested white card | Selectable Add-on card | **B** | Visible IF `Clinic == Yes` | Optional clinic entity indemnity add-on | None |
| `QST-QUOT-013` | `"Clinic Limit Of Liability"` | Dropdown inside card | Segmented limit buttons | **B** | Visible IF Clinic Add-on active | Selection of RM 1M, 2M, 5M | None |
| `ACT-QUOT-004` | `"Why is this recommended?"` (Clinic) | Inline button | Inline text link | **D** | Opens modal on click | Contextual underwriting rationale | Modal retained verbatim |
| `TXT-QUOT-002` | *"As a private clinic owner, you face dual exposure: professional negligence claims..."* | Subtitle paragraph | *Purged* | **E** | Never | AI-generated lecture copy | None |
| `QST-QUOT-011` | `"Are you a Person-In-Charge (PIC) for any clinic?"` | Standalone card | Clean segmented toggle | **A** | Always visible | PIC exposure identification | None |
| `QST-QUOT-012` | `"Are you a Person-In-Charge (PIC) with another establishment?"` | Standalone card row | Sub-toggle below PIC | **B** | Visible IF `PIC == Yes` | Secondary PIC risk factor | None |
| `QST-QUOT-015` | `"Buy PIC coverage"` | Checkbox inside PIC card | Selectable Add-on card | **B** | Visible IF `PIC == Yes` | Optional PIC indemnity add-on | None |
| `ACT-QUOT-005` | `"Why is this recommended?"` (PIC) | Inline button | Inline text link | **D** | Opens modal on click | Contextual underwriting rationale | Modal retained verbatim |
| `QST-QUOT-017` | Fulfillment Selector (`Buy now` vs `Email me...`) | Standalone selector card | *Integrated into CTA bar* | **A** | Primary & secondary buttons | Eliminates redundant selector card | None |
| `ACT-QUOT-001` | `"<< Back"` | Secondary button | Secondary link button | **A** | Always visible | Navigates back to Stage 1 | None |
| `ACT-QUOT-002` | `"Proceed to Personal Details"` (or `"Buy >>"`) | Primary submit CTA | Primary submit CTA | **A** | Always visible | Primary progression trigger | Matches test selectors |
| `ACT-QUOT-003` | `"Email Quote (PDF)"` | Triggered via selector | Secondary button next to CTA | **A** | Always visible | Quote email fulfillment path | None |

---

### 2.4 Stage 3: Personal Particulars (`#jsPage3`)

| Content ID | Exact Original Copy / Label | Current Location | Proposed Location | Class | Visibility Rule | Reason for Treatment | Risk / Approval Requirement |
|---|---|---|---|:---:|---|---|---|
| `QST-PART-001` | `"Personal Particulars"` | Step 3 H1 | Step 3 primary heading | **A** | Always visible | Stage title | None |
| `TXT-PART-001` | *"Please enter your details exactly as they appear on your NRIC or passport..."* | Subtitle paragraph | *Purged* | **E** | Never | AI-generated obvious instructional filler | None |
| `FLD-PART-001` | `"Salutation"` | Dropdown | Identity grid item 1 | **A** | Always visible | Applicant honorific | None |
| `FLD-PART-002` | `"Full Name as per IC"` | Text input | Identity grid item 2 | **A** | Always visible | Legal insured entity name | None |
| `FLD-PART-003` | `"DD/MM/YYYY"` (`Date of Birth`) | Date input | Identity grid item 3 | **A** | Always visible | Extracted or entered DOB | None |
| `FLD-PART-004` | `"NRIC number"` | Text input | Identity grid item 4 | **A** | Always visible | Primary identity verification key | None |
| `FLD-PART-005` | `"Gender"` | Radio group | Identity grid item 5 | **A** | Always visible | Demographic underwriting factor | None |
| `FLD-PART-006` | `"nationality"` | Dropdown | Identity grid item 6 | **A** | Always visible | Citizenship verification | None |
| `FLD-PART-007` | `"Country name"` | Conditional input | Identity grid item 7 | **B** | Visible IF `Nationality != Malaysian` | Foreign practitioner jurisdiction | None |
| `FLD-PART-008` | `"Malaysian Medical Council (MMC) Registration Number"` | Text input | Identity grid item 8 | **A** | Always visible | Statutory professional registration | None |
| `FLD-PART-009` | `"Clinic name (Sdn Bhd/Partnership)"` | Text input | Practice grid item 1 | **B** | Visible IF `Clinic == Yes` | Business entity name | None |
| `FLD-PART-010` | `"Income"` (`Annual Revenue Tier`) | Turnover dropdown | Practice grid item 2 | **A** | Always visible | Clinic/Practice revenue rating tier | None |
| `FLD-PART-011` | `"Enter the primary location of Practice"` | Address input | Practice grid item 3 | **A** | Always visible | Physical practice premises | None |
| `FLD-PART-012` | `"Postcode"` | Text input | Practice grid item 4 | **A** | Always visible | Geographic risk factor | None |
| `FLD-PART-013` | `"City"` | Text input | Practice grid item 5 | **A** | Always visible | Practice location | None |
| `FLD-PART-014` | `"State"` | Dropdown | Practice grid item 6 | **A** | Always visible | Malaysian state jurisdiction | None |
| `FLD-PART-015` | `"Mobile Number"` | Phone input | Identity grid item 9 | **A** | Always visible | Contact & OTP channel | None |
| `FLD-PART-016` | `"customer_email"` | Email input | Identity grid item 10 | **A** | Always visible | Pre-filled from Stage 1 | None |

---

### 2.5 Stage 3: Clinic Branch Manager (`#jsBranchModal`)

| Content ID | Exact Original Copy / Label | Current Location | Proposed Location | Class | Visibility Rule | Reason for Treatment | Risk / Approval Requirement |
|---|---|---|---|:---:|---|---|---|
| `DIS-PART-001` | `"Note: This offer is only available for branches with with less than a total revenue of RM 5,000,000 per annum..."` | Shaded yellow box | Clean secondary notice | **C** | Visible IF `Clinic == Yes` | Revenue ceiling eligibility disclosure | `FLAG-04` (duplicate "with with") |
| `ACT-PART-001` | `"Add Clinic / Branch"` (or `"+ Add Another Clinic"`) | Prominent button | Clean standard button | **B** | Visible IF `Branches < 4` | Branch addition trigger | Max 4 branch limit |
| `FLD-BRAN-001` | `"Clinic name/ Branch name"` | Modal text input | Modal text input | **B** | In branch modal | Branch establishment identity | None |
| `FLD-BRAN-002` | `"Clinic Address"` | Modal text input | Modal text input | **B** | In branch modal | Branch physical location | None |
| `FLD-BRAN-003` | `"Phone number"` | Modal text input | Modal text input | **B** | In branch modal | Branch contact number | None |
| `FLD-BRAN-004` | `"Branch PIC Name & MMC Number"` | Modal text inputs | Modal text inputs | **B** | In branch modal | Branch clinical governance | None |
| `ACT-BRAN-001` | `"Cancel"` | Modal button | Modal button | **B** | In branch modal | Closes modal | None |
| `ACT-BRAN-002` | `"Add Clinic / Branch"` (Save) | Modal submit button | Modal submit button | **B** | In branch modal | Appends branch | None |

---

### 2.6 Stage 3: Statutory Underwriting Declarations

| Content ID | Exact Original Copy / Label | Current Location | Proposed Location | Class | Visibility Rule | Reason for Treatment | Risk / Approval Requirement |
|---|---|---|---|:---:|---|---|---|
| `QST-DECL-001` | `"I agree that No claim have ever been made or lawsuits been brought against me"` | Numbered card 1 | Declaration item 1 | **A** | Always visible | Statutory claims declaration | Retain verbatim |
| `TXT-DECL-001` | Explanation of Previous Claims | Bright yellow warning box | Calm neutral slate box | **B** | Visible IF `QST-DECL-001 == Disagree` | Mandatory disclosure details | None |
| `QST-DECL-002` | `"Are you aware of any errors, omissions, offences, circumstances or allegations which might result in a claim being made against you?"` | Numbered card 2 | Declaration item 2 | **A** | Always visible | Statutory circumstances declaration | Retain verbatim |
| `QST-DECL-003` | `"Have you ever been the subject of disciplinary action or investigation by any authority or regulator or professional body?"` | Numbered card 3 | Declaration item 3 | **A** | Always visible | Statutory regulatory declaration | Retain verbatim |
| `QST-DECL-004` | `"Have you ever been the subject of a criminal investigation or had criminial charges brought against you? For the purposes of this question, please disregard traffic or minor motor vehicle licensing offences"` | Numbered card 4 | Declaration item 4 | **A** | Always visible | Statutory criminal declaration | `FLAG-06` (typo "criminial") |
| `QST-CDEC-001` | `clinic_package_have_claim_ever_been_made` | Clinic card 1 | Clinic declaration 1 | **B** | Visible IF Clinic Add-on active | Clinic entity claims declaration | Retain verbatim |
| `QST-CDEC-002` | `clinic_package_aware_of_errors` | Clinic card 2 | Clinic declaration 2 | **B** | Visible IF Clinic Add-on active | Clinic circumstances declaration | Retain verbatim |
| `QST-CDEC-003` | `clinic_package_have_been_disciplinary_action` | Clinic card 3 | Clinic declaration 3 | **B** | Visible IF Clinic Add-on active | Clinic regulatory declaration | Retain verbatim |
| `QST-CDEC-004` | `clinic_package_had_criminal_charges` | Clinic card 4 | Clinic declaration 4 | **B** | Visible IF Clinic Add-on active | Clinic criminal declaration | Retain verbatim |
| `QST-CVD-001..25`| COVID-19 Health & Facility Questions (25 questions) | Open accordion | Collapsed module `COVID-19 Declarations ▾` | **D** | Collapsed by default; expands on click | Historical pandemic risk questionnaire | `FLAG-11` (Chubb underwriter retention) |
| `DIS-CVD-001` | `"The Applicant declares that, after enquiry, to the best knowledge of all persons to be insured the statements set forth herein..."` | Final COVID block | Inside COVID module | **C** | Visible when COVID active | Statutory COVID declaration | Retain verbatim |
| `DIS-PART-002` | `"By proceeding, you agree that you have complied with all local regulations pertaining to your profession and you have further agreed that you have read, understood and accepted to the Declaration and Authorization, Policy Wording, Privacy Policy  and Product Disclosure Sheet for this product."` | Shaded legal box | Clean legal consent block above CTA | **C** | Always visible on Stage 3 | Statutory Schedule 9 declaration & document acceptance | Absolute. Retain verbatim |
| `ACT-PART-002` | `"Important Notices to the Applicants"` | Link button | Underlined link | **D** | Opens modal on click | Statutory duty of disclosure modal (`LEG-NOTICE-001`) | Retain verbatim in modal |
| `ACT-PART-004` | `"Next >>"` (or `"Proceed to Review"`) | Primary submit CTA | Primary submit CTA | **A** | Always visible | Advances to Stage 4 | Matches test selectors |

---

### 2.7 Support Referral & Underwriting Escalation (`#jsPage8` & `#jsContact`)

| Content ID | Exact Original Copy / Label | Current Location | Proposed Location | Class | Visibility Rule | Reason for Treatment | Risk / Approval Requirement |
|---|---|---|---|:---:|---|---|---|
| `QST-REF-001` | `"CONTACT SUPPORT"` | Step 8 H1 | Primary page heading | **B** | Visible on adverse declaration | Referral terminal heading | None |
| `MSG-REF-001` | `"PLEAESE CALL SUPPORT OFFICE"` | Red warning box | Secondary status alert | **F** | Visible on referral | Flagged spelling typo (`PLEAESE`) | `FLAG-02` |
| `QST-REF-002` | `"We need more information to process your application, Will you be ok for our manger to call you at"` | Body text | Introductory paragraph | **F** | Visible on referral | Flagged typo (`manger`) & truncated sentence | `FLAG-03` |
| `ACT-REF-001` | `"Yes"` | Choice button | Primary callback button | **B** | Visible on referral | Opens callback contact form | None |
| `ACT-REF-002` | `"No"` | Choice button | Secondary exit link | **B** | Visible on referral | Exits to home page | None |
| `QST-REF-003` | `"CONTACT DETAIL"` | Contact form H2 | Form section header | **B** | Visible IF `Referral == Yes` | Callback contact form | None |
| `FLD-REF-001..4`| `contact_name`, `clinical_name`, `contact_phone`, `contact_email_id` | Contact form inputs | Clean contact grid | **B** | Visible IF `Referral == Yes` | Callback contact details | None |
| `ACT-REF-003` | `"Submit"` | Form submit CTA | Form submit CTA | **B** | Visible IF `Referral == Yes` | Submits callback request | None |

---

### 2.8 Stage 4: Review, Declarations & Payment (`#jsPage10`)

| Content ID | Exact Original Copy / Label | Current Location | Proposed Location | Class | Visibility Rule | Reason for Treatment | Risk / Approval Requirement |
|---|---|---|---|:---:|---|---|---|
| `QST-PAY-001` | `"Choose anyone of the payment option below:"` | Main column H2 | Section header above payment | **F** | Always visible on Stage 4 | Flagged grammatical error | `FLAG-07` |
| `TBL-PAY-001` | 10-line calculation summary table | Main column top | *Purged from main column* | **E** | Never in main column | Complete duplicate of sticky summary sidebar | Retained in sidebar only |
| `OPT-PAY-001` | `"Credit/Debit Card/Wallet/Personal Internet Banking"` | Payment card 1 | Segmented radio tab 1 | **A** | Always visible on Stage 4 | Primary retail payment method | None |
| `OPT-PAY-002` | `"Business Internet Banking"` | Payment card 2 | Segmented radio tab 2 | **A** | Always visible on Stage 4 | Corporate clinic payment method | None |
| `DIS-PAY-001` | `LEG-RETRO-002` (Non-continuous retroactive coverage disclosure) | Shaded blue card | Clean statutory notice | **C** | Visible IF backdated coverage | Statutory retroactive coverage notice | Retain verbatim |
| `DIS-PAY-002` | Section 130 FSA 2013 Commission Disclosure | Legal footer | Calm footnote above CTA | **C** | Always visible on Stage 4 | Mandatory BNM commission transparency | Retain verbatim |
| `ACT-PAY-002` | `"Proceed to payment"` (or `"Pay RM [Total]"`) | Primary submit CTA | Primary submit CTA | **A** | Always visible on Stage 4 | Initiates payment gateway modal | Matches test selectors |

---

### 2.9 Stage 5: Policy Issuance & Confirmation

| Content ID | Exact Original Copy / Label | Current Location | Proposed Location | Class | Visibility Rule | Reason for Treatment | Risk / Approval Requirement |
|---|---|---|---|:---:|---|---|---|
| `MSG-CONF-001` | `"Policy Issued Successfully"` | Success header | H1 page header | **A** | Always visible on Stage 5 | Policy issuance status | None |
| `TXT-CONF-001` | *"Congratulations! You are now fully protected by Malaysia's premier medical indemnity..."* | Body paragraph | *Purged* | **E** | Never | Exaggerated celebratory AI copy | None |
| `MSG-CONF-002` | `"Policy Number: DS-2026-XXXXXX"` | Confirmation card | Clean prominent reference banner | **A** | Always visible on Stage 5 | Core policy reference | `data-testid="confirmed-policy-number"` |
| `DOC-CONF-001` | `"Certificate of Insurance (PDF)"` | Download card 1 | Compact download button | **A** | Always visible on Stage 5 | Mandatory APC submission proof | `data-testid="download-coi-btn"` |
| `DOC-CONF-002` | `"Official Tax Invoice"` | Download card 2 | Compact download button | **A** | Always visible on Stage 5 | Tax deduction proof | `data-testid="download-invoice-btn"` |
| `DOC-CONF-003` | `"Policy Wording"` | Download card 3 | Compact download button | **A** | Always visible on Stage 5 | Insurance contract schedule | `data-testid="download-schedule-btn"` |
| `ACT-CONF-001` | `"Return to Home"` | Secondary button | Secondary link button | **A** | Always visible on Stage 5 | Returns to portal root | `data-testid="return-home-btn"` |

---

## 3. Summary of Treatment by Classification Category

| Classification Code | Total Items Audited | Initial Visible Count | Conditionally Visible Count | Purged Items | % of Total |
|---|:---:|:---:|:---:|:---:|:---:|
| **Class A (Essential & Immediately Visible)** | 42 | 42 | 0 | 0 | 44.2% |
| **Class B (Essential Conditional)** | 22 | 0 | 22 | 0 | 23.2% |
| **Class C (Required Statutory Disclosure)** | 8 | 8 | 0 | 0 | 8.4% |
| **Class D (Progressive Disclosure / Contextual)** | 6 | 0 | 6 (via trigger) | 0 | 6.3% |
| **Class E (Repeated, Decorative, AI Sprawl)** | 11 | 0 | 0 | **11 (Purged)** | 11.6% |
| **Class F (Requiring Formal Approval)** | 6 | 6 | 0 | 0 (Held verbatim pending CCR) | 6.3% |
| **TOTAL** | **95 items** | **56 visible** | **28 conditional** | **11 purged** | **100%** |

