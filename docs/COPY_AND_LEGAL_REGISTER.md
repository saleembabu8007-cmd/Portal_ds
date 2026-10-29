# COPY AND LEGAL REGISTER
## DoctorShield Individual Medical Professional Indemnity Portal

> **Document ID:** `DOC-REG-COPY-001`  
> **Status:** Authoritative Baseline (Phase 1)  
> **Classification:** [VERIFIED]  
> **Last Updated:** 2026-10-29  
> **Owner:** Principal Product Architect & Regulatory Business Analyst  
> **Governance Invariant:** All customer-facing legal, regulatory, and policy copy must be reproduced **VERBATIM**. No silent editorial corrections or paraphrasing permitted without written legal sign-off in `DECISION_LOG.md`.

---

## 1. Master Statutory Disclosures & Legal Copy

---

### LEG-01: PIDM Protection Statement (Step 1)
- **ID:** `LEG-PIDM-001`
- **Container / Location:** `#jsPage1` (Immediately above Step 1 submit / footer)
- **Classification:** [VERIFIED]
- **Exact Verbatim Copy:**
> `"The benefit(s) payable under eligible certificate/ policy/ product is(are) protected by PIDM up to limits. Please refer to PIDM’s TIPS Brochure or contact Chubb Insurance Malaysia Berhad or PIDM (visit www.pidm.gov.my)."`
- **Regulatory Authority:** Perbadanan Insurans Deposit Malaysia (PIDM)
- **Invariant Level:** Absolute. Must not be altered or omitted.

---

### LEG-02: Initial Statutory Consent & Practice Declaration (Step 1)
- **ID:** `LEG-CONSENT-001`
- **Container / Location:** `#jsPage1` (`#jsContactTermsAndCondition`)
- **Classification:** [VERIFIED]
- **Exact Verbatim Copy:**
> `"I have read, understood and agree to the terms and conditions, privacy policy and I meet all local regulation to practice my profession."`
- **Context:** Enforces MMC APC professional qualification standing and initial agreement to terms.
- **Invariant Level:** Absolute. Must not be altered.

---

### LEG-03: Secondary Regulatory Compliance & Disclosure Declaration (Step 3)
- **ID:** `LEG-CONSENT-002`
- **Container / Location:** `#jsPage3` (Above final particulars submission)
- **Classification:** [VERIFIED]
- **Exact Verbatim Copy:**
> `"By proceeding, you agree that you have complied with all local regulations pertaining to your profession and you have further agreed that you have read, understood and accepted to the Declaration and Authorization, Policy Wording, Privacy Policy  and Product Disclosure Sheet for this product."`
- **Notice on Formatting:** Note double whitespace in legacy source between `Policy` and `and Product`. Preserved verbatim.
- **Invariant Level:** Absolute.

---

### LEG-04: Important Notices to the Applicants (`#jsImportantAndNoticesModel`)
- **ID:** `LEG-NOTICE-001`
- **Container / Location:** Modal `#jsImportantAndNoticesModel` (Triggered on Step 3)
- **Classification:** [VERIFIED]
- **Title:** `Important Notices to the Applicants`
- **Exact Verbatim Copy (Complete):**

> **Your Duty of Disclosure**  
> Before you enter into a contract of general insurance with an Insurer, you have a duty to disclose to the Insurer every matter within your knowledge that is material to the Insurer’s decision whether to accept the risk of the insurance and, if so, on what terms. You have the same duty to disclose those matters to the Insurer before you renew, extend, vary or reinstate a contract of general insurance.  
>  
> It is important that all information contained in this application is understood by you and is correct, as you will be bound by your answers and by the information provided by you in this application. You should obtain advice before you sign this applicaton if you do not properly understand any part of it Your duty of disclosure continues after the application has been completed up until the contract of insurance is entered into.  
>  
> **Non-Disclosure:**  
> If you fail to comply with your duty of disclosure, the Insurer may have the option of avoiding the contract of insurance from its beginning.  
> If your non-disclosure is fraudulent, the Insurer may also have the right to keep the premium that you have paid.  
>  
> **Change of Risk or Circumstances:**  
> You should advise Chubb as soon as practicable of any change to your normal business as disclosed in this application, such as changes in business activities, location, acquisitions and new overseas activities.  
>  
> **Subrogation**  
> Where you have agreed with another person or company ( who would otherwise be liable to compensate you for any loss or damage which is covered by the contract of insurance) that you will not seek to recover such loss or damage from that person, Chubb will not cover you, to the extent permitted by law, for such loss or damage.  
>  
> **Declaration & Signature**  
> I have read and understood the Important Notices contained in this application. I agree that this proposal, together with any other information or documents supplied,will form the basis of any contract of insurance. I acknowledge that if this application is accepted, the contract of insurance will be subject to the terms and conditions as set out in the policy wording as issued or as otherwise specifically varied in writing by Chubb. I declare, after inquiry, that the statements, particulars and information contained in this application and in any documents accompanying this application are true and correct in every detail and that no other material facts have been misstated, suppressed or omitted. I undertake to inform Chubb of any material alteration to those facts before completion of the contract of insurance.  
>  
> We understand that Chubb needs to deal with our personal data to administer our Policy and offer us insurance products and services. To achieve these purposes, We allow Chubb to collect, use and disclose our personal data to selected third parties in or outside Malaysia, in accordance with Chubb’s Personal Data Protection Notice, which is found in Chubb website at http://www.chubb.com/my-privacy. We may contact Chubb for access to or correction of our personal data, or for any other queries or complaints. / Kami faham bahawa Chubb perlu berurusan dengan data peribadi kami untuk mentadbir Polisi kami dan menawarkan kami produk dan perkhidmatan insurans. Untuk mencapai tujuan-tujuan ini, kami membenarkan Chubb untuk mengumpul, mengguna dan memberi data peribadi kami kepada pihak ketiga terpilih yang terletak di dalam atau di luar Malaysia, selaras dengan Notis Perlindungan Data Peribadi Chubb, yang terdapat dalam laman web Chubb di http://www.chubb.com/my-privacy. Kami boleh menghubungi Chubb untuk mendapatkan atau membetulkan data peribadi kami, atau untuk sebarang pertanyaan atau aduan

- **Noted Legacy Defects in Text:**
  - Spelling typo in paragraph 2: `applicaton` (missing 'i').
  - Missing period between sentences in paragraph 2: `any part of it Your duty`.
  - Whitespace omission in Declaration & Signature: `supplied,will`.
  - Open parenthesis spacing in Subrogation: `( who`.
- **Classification:** [VERIFIED] Mandatory statutory disclosure under Financial Services Act 2013 and PDPA 2010.

---

### LEG-05: Policy Backdate Agreement & Clause 6.12 Notice (`#jsBackDateEnableModel`)
- **ID:** `LEG-BACKDATE-001`
- **Container / Location:** Modal `#jsBackDateEnableModel` (Triggered when `start_date < current_date`)
- **Classification:** [VERIFIED]
- **Title:** `Policy Backdate Agreement`
- **Exact Verbatim Copy:**
> `"CHUBB ELITE MEDICAL MALPRACTICE INSURANCE FOR PERIOD OF INSURANCE.    NON-CONTINUOUS RETROACTIVE COVERAGE PERIOD.     Pursuant to Clause 6.12 Licensing of Medical Professionals & Maintenance of Records under this Policy, I hereby acknowledge that Chubb shall not be liable for any Loss or any other payment under this Policy directly or indirectly caused by, arising out of or in any way connected with any Medical Incident occurring from [Calculated Start Date] until [Current Date]."`
- **Actions:** `Disagree` \| `Agree`
- **Underwriting Rationale:** Restricts retroactive liability when an applicant initiates coverage retroactively to align with past APC expirations, protecting underwriter against known or occurring claims.

---

### LEG-06: Retroactive Coverage Notice (Step 7 / Payment Summary)
- **ID:** `LEG-RETRO-002`
- **Container / Location:** `#jsPage10` (Immediately preceding payment selection)
- **Classification:** [VERIFIED]
- **Exact Verbatim Copy:**
> `"CHUBB ELITE MEDICAL MALPRACTICE INSURANCE FOR PERIOD OF INSURANCE.    NON-CONTINUOUS RETROACTIVE COVERAGE PERIOD.     Pursuant to Clause 6.12 Licensing of Medical Professionals & Maintenance of Records under this Policy, I hereby acknowledge that Chubb shall not be liable for any Loss or any other payment under this Policy directly or indirectly caused by, arising out of or in any way connected with any Medical Incident occurring from [Calculated Start Date] until [Current Date]."`

---

### LEG-07: Branch Revenue Eligibility Limitation Note (Step 3)
- **ID:** `LEG-BRANCH-001`
- **Container / Location:** `#jsPage3` (Above "Add Clinic / Branch" trigger)
- **Classification:** [VERIFIED]
- **Exact Verbatim Copy:**
> `"Note: This offer is only available for branches with with less than a total revenue of RM 5,000,000 per annum. Kindly contact our clients services if in doubt."`
- **Flagged Defect:** Duplicate word: `with with`.
- **Underwriting Invariant:** Maximum revenue threshold of RM 5,000,000 per annum for bundled branch clinic entities.

---

### LEG-08: Final COVID-19 Applicant Declaration (Screen 04C)
- **ID:** `LEG-COVID-001`
- **Container / Location:** `#jsPage13EmployeeAndCommunicationQuestions` (`#jsApplicantDeclareForCovid19`)
- **Classification:** [VERIFIED]
- **Exact Verbatim Copy:**
> `"The Applicant declares that, after enquiry, to the best knowledge of all persons to be insured the statements set forth herein and if any attachments made hereto are true, and no material facts have been suppressed, omitted, or misstated."`

---

## 2. Customer-Facing Error Dialogs & Popups (Verbatim)

| Message ID | Container ID | Modal Title | Exact Verbatim Body Text | Trigger Condition |
|---|---|---|---|---|
| **MSG-001** | `#intro_modal` | `WELCOME` | `"Dear customer, These solutions are currently available in Malaysia only."` | Non-Malaysian IP or geo-lookup detected |
| **MSG-002** | `#jsCookiePopupModel` | `Notice` | `"At DoctorShield, we are continuously working towards bringing you a seamless experience. Today, we are pleased to announce that from 1 April 2021, you can renew your insurance for the year 2022."` | Cookie banner trigger (Flagged: historically dated) |
| **MSG-003** | `#jsStartDateValidationErrorModal` | `Session Expired` | `"Your session has been expired, please reselect the Insurance Start Date."` | Rate calculation session timeout |
| **MSG-004** | `#jsServerSideErrorModal` | `Error` | `"Oops.We are facing some technical issues. Please try again."` | 500 / API connection failure |
| **MSG-005** | `#jsContactUsNegativeQuoteErrorModel` | `Notes` | `"You have already bought the policy based on this Quote. If you need further assistance, please contact mmi@ja-assure.com or WhatsApp +60 12-536 0700"` | Zero/negative quote or quote conflict |
| **MSG-006** | `#jsReIncompleteQuoteErrorModel` | `Notes` | `"You have already bought the policy based on this Quote. If you need further assistance, please contact mmi@ja-assure.com or WhatsApp +60 12-536 0700"` | Incomplete quote data recovery attempt |
| **MSG-007** | `#jsExpireContactusQuoteErrorModel` | `Notes` | `"This link has expired. If you need further assistance, please contact mmi@ja-assure.com or WhatsApp +60 12-536 0700"` | Deep link from quotation email expired |
| **MSG-008** | `#jsNewPromocodeChangeModel` | `Notes` | `"Kindly note that the promo code you have used is ineligible for you as you are an existing client, Nevertheless, we have replaced it with the right promo code that still ensures you enjoy the discounted premium. Kindly acknowledge so that we can proceed with the renewal. Thank you. If you need further assistance, please contact mmi@ja-assure.com or WhatsApp +60 12-536 0700"` | User enters new promo code on existing renewal |
| **MSG-009** | `#jsEmailErrorModel` | `Notes` | `"You are policy has been already renewed, if you need further assistance please contact mmi@ja-assure.com or WhatsApp + 60 12-536 0700"` | Policy already renewed (Flagged: grammar typo "You are policy") |
| **MSG-010** | `#jsAlreadyBoughtModal` | `Notes` | `"Hi, you have already purchased an indemnity policy for same period. For further info, kindly contact us through mmi@ja-assure.com or WhatsApp +60 12-536 0700"` | Duplicate policy detection for same period/NRIC |
| **MSG-011** | `#jsReIndicativeQuoteErrorModel` | `Notes` | `"You have already bought the policy based on this Quote. If you need further assistance, please contact mmi@ja-assure.com or WhatsApp +60 12-536 0700"` | Quote email retrieval conflict |
| **MSG-012** | `#periodEndDateInfo` | `Policy End Date` | `"* Policy end date is always 31'st December"` | End date tooltip click (Flagged: apostrophe typo "31'st") |
| **MSG-013** | `#specializationModal` | `SERVICE DETAILS` | Validation strings: `"Sum of percentage should be 100"` and `"The value must be greater than zero."` and `"Total: 0 %"` | Allocation percentage sum ≠ 100% |
| **MSG-014** | `#mailRenewModal` | `VERIFICATION` | Prompt: `"Please enter one time password which is sent to your registered mobile number"` / Error: `"Please enter the valid otp."` | Email renewal deep link verification |
| **MSG-015** | `#jsFormRenewModal` | `Verification` | Labels: `"Please enter your registered mobile number"` and `"Please enter OTP which is sent to your mobile number with in 5 minute"` | Public portal renewal verification |

---

## 3. Flagged Outdated, Historical & Typographical Content

The following items are officially flagged for Business / Legal Owner sign-off before modification in Phase 2:

| Flag ID | Screen / Container | Exact Current Copy | Issue / Defect Analysis | Proposed Rectification (Pending CCR Approval) |
|---|---|---|---|---|
| **FLAG-01** | `#jsCookiePopupModel` | `"Today, we are pleased to announce that from 1 April 2021, you can renew your insurance for the year 2022."` | **Historically Outdated by 5 Years.** Mentions 2021 and 2022 renewal cycles. Confuses users. | Update to current operational cycle announcement or remove cookie text. |
| **FLAG-02** | `#jsPage8` (Referral) | `"PLEAESE CALL SUPPORT OFFICE"` | **Spelling Typo:** `PLEAESE`. | `"Please Contact Our Support Office"` |
| **FLAG-03** | `#jsPage8` (Referral) | `"We need more information to process your application, Will you be ok for our manger to call you at"` | **Spelling Typo & Sentence Truncation:** `manger` instead of `manager`; sentence ends abruptly without target phone number. | `"We require additional information to process your application. May our relationship manager contact you at [Phone Number]?"` |
| **FLAG-04** | `#jsPage3` (Branch Note) | `"branches with with less than a total revenue"` | **Duplicate Word:** `with with`. | `"branches with less than a total revenue"` |
| **FLAG-05** | `#jsPage2` (Locum Question) | `"Do you hire locums who sees new patients on their own?"` | **Grammatical Disagreement:** Plural `locums` with singular verb `sees`. | `"Do you hire locums who see new patients independently?"` |
| **FLAG-06** | `#jsPage3` (Declarations) | `"had criminial charges brought against you?"` | **Spelling Typo:** `criminial`. | `"had criminal charges brought against you?"` |
| **FLAG-07** | `#jsPage10` (Payment) | `"Choose anyone of the payment option below:"` | **Grammatical Error:** `anyone of the payment option`. | `"Please select a payment option below:"` |
| **FLAG-08** | `#periodEndDateInfo` | `"* Policy end date is always 31'st December"` | **Punctuation Typo:** `31'st`. | `"* Policy end date is always 31st December"` |
| **FLAG-09** | `#jsEmailErrorModel` | `"You are policy has been already renewed"` | **Grammatical Typo:** `You are policy` instead of `Your policy`. | `"Your policy has already been renewed"` |
| **FLAG-10** | `#jsFormRenewModal` | `"with in 5 minute"` | **Spacing & Plural Typo:** `with in 5 minute` instead of `within 5 minutes`. | `"within 5 minutes"` |
| **FLAG-11** | Screens 04A-C | COVID-19 Questionnaires (25+ questions on infection, 14-day quarantine, Jan 1 2020 changes) | **Pandemic-Era Legacy Content.** Many clinics find these historical questions obsolete. However, under product invariant #1, they **must remain implemented** until Chubb underwriting explicitly approves their retirement. | Retain in full; prepare modular conditional component. |

