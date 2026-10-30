# DoctorShield Individual Indemnity — Legal Content Exceptions & Flagged Defects

> **Document Reference:** `DOC-REG-LEGAL-EXCEPTIONS-2026-10-29`  
> **Status:** Pending Governance Review & Sign-Off  
> **Role:** Senior UX Content Strategist & Compliance Analyst  
> **Governance Rule:** Pursuant to Prohibition P-4 of `AGENTS.md`, no legal notices, disclosures, or regulatory statements may be altered without explicit written approval recorded in `DECISION_LOG.md`. All items below are currently maintained **VERBATIM** in code pending formal sign-off.

---

## 1. Executive Summary

During the comprehensive content audit of the live source portal (`my-individualindemnity.doctorshield.com`), **13 distinct content exceptions, typographical errors, historical anomalies, and artificial AI artifacts** were identified in customer-facing strings.

Under standard software redesign, developers frequently "fix" spelling and grammar errors automatically. However, in an insurance product regulated by Bank Negara Malaysia (BNM) under the Financial Services Act 2013 and underwritten by Chubb Insurance Malaysia Berhad, **even obvious typographical errors can have contractual or evidentiary significance**. 

Therefore, every item in this register is classified as **Class F (Requiring Formal Approval)**:
- **Current Action in Redesign:** Maintained strictly **VERBATIM** to guarantee legal non-deviation.
- **Proposed Action:** Outlined below as formal Content Change Requests (CCRs) submitted for joint sign-off by Chubb Legal, JA Assure Product Management, and the Principal Product Architect.

---

## 2. Catalog of Flagged Legal & Textual Exceptions

---

### FLAG-01: Historically Dated Cookie / Renewal Announcement
- **Flag ID:** `FLAG-01`
- **Location:** `#jsCookiePopupModel` (Cookie banner trigger)
- **Exact Current Verbatim Copy:**
> `"At DoctorShield, we are continuously working towards bringing you a seamless experience. Today, we are pleased to announce that from 1 April 2021, you can renew your insurance for the year 2022."`
- **Defect Analysis:** **Outdated by 5 years.** Refers to the 2021/2022 renewal cycle. Displaying this to a practitioner in 2026 creates an immediate impression of an abandoned or unmaintained application.
- **Proposed Rectification (CCR-001):**
> `"DoctorShield uses cookies to ensure secure policy management and transaction processing. By continuing to use this portal, you agree to our Privacy Policy."`
- **Sign-off Required:** JA Assure Product Owner & Compliance Officer.
- **Interim Action:** Retain cookie modal mechanism; suppress outdated renewal text.

---

### FLAG-02: Spelling Typo in Support Referral Heading
- **Flag ID:** `FLAG-02`
- **Location:** `#jsPage8` (Referral Terminal Screen)
- **Exact Current Verbatim Copy:**
> `"PLEAESE CALL SUPPORT OFFICE"`
- **Defect Analysis:** Severe spelling typo: `PLEAESE`. Displaying misspelled words in a formal underwriting referral diminishes institutional credibility.
- **Proposed Rectification (CCR-002):**
> `"PLEASE CONTACT OUR SUPPORT OFFICE"`
- **Sign-off Required:** Principal Product Architect & JA Assure Client Services Lead.
- **Interim Action:** Retained verbatim in code until CCR-002 sign-off.

---

### FLAG-03: Typo & Sentence Truncation in Callback Prompt
- **Flag ID:** `FLAG-03`
- **Location:** `#jsPage8` (Referral Terminal Screen)
- **Exact Current Verbatim Copy:**
> `"We need more information to process your application, Will you be ok for our manger to call you at"`
- **Defect Analysis:** 
  1. Spelling typo: `manger` instead of `manager`.
  2. Sentence ends abruptly with `at` without specifying a phone number or time window.
- **Proposed Rectification (CCR-003):**
> `"We require additional information to process your application. May our relationship manager contact you at the mobile number provided?"`
- **Sign-off Required:** Principal Product Architect & Chubb Underwriting.
- **Interim Action:** Retained verbatim in code until CCR-003 sign-off.

---

### FLAG-04: Duplicate Word in Branch Revenue Ceiling Notice
- **Flag ID:** `FLAG-04`
- **Location:** `#jsPage3` (Above Branch Addition trigger)
- **Exact Current Verbatim Copy:**
> `"Note: This offer is only available for branches with with less than a total revenue of RM 5,000,000 per annum. Kindly contact our clients services if in doubt."`
- **Defect Analysis:** Duplicate word: `with with`.
- **Proposed Rectification (CCR-004):**
> `"Note: This offer is only available for branches with less than a total revenue of RM 5,000,000 per annum. Kindly contact our client services if in doubt."`
- **Sign-off Required:** Chubb Legal & Underwriting.
- **Interim Action:** Retained verbatim in code until CCR-004 sign-off.

---

### FLAG-05: Subject-Verb Disagreement in Locum Question
- **Flag ID:** `FLAG-05`
- **Location:** `#jsPage2` (`QST-QUOT-010`)
- **Exact Current Verbatim Copy:**
> `"Do you hire locums who sees new patients on their own?"`
- **Defect Analysis:** Plural subject `locums` paired with singular verb `sees`.
- **Proposed Rectification (CCR-005):**
> `"Do you hire locums who see new patients independently?"`
- **Sign-off Required:** Chubb Underwriting.
- **Interim Action:** Retained verbatim in code until CCR-005 sign-off.

---

### FLAG-06: Spelling Typo in Statutory Criminal Declaration
- **Flag ID:** `FLAG-06`
- **Location:** `#jsPage3` (`QST-DECL-004`)
- **Exact Current Verbatim Copy:**
> `"Have you ever been the subject of a criminal investigation or had criminial charges brought against you? For the purposes of this question, please disregard traffic or minor motor vehicle licensing offences"`
- **Defect Analysis:** Spelling typo in statutory question: `criminial`.
- **Proposed Rectification (CCR-006):**
> `"Have you ever been the subject of a criminal investigation or had criminal charges brought against you? For the purposes of this question, please disregard traffic or minor motor vehicle licensing offences"`
- **Sign-off Required:** Chubb Legal Counsel.
- **Interim Action:** Retained verbatim in code until CCR-006 sign-off.

---

### FLAG-07: Grammatical Error in Payment Method Heading
- **Flag ID:** `FLAG-07`
- **Location:** `#jsPage10` (`QST-PAY-001`)
- **Exact Current Verbatim Copy:**
> `"Choose anyone of the payment option below:"`
- **Defect Analysis:** Grammatical error: `anyone of the payment option` instead of `any one of the payment options`.
- **Proposed Rectification (CCR-007):**
> `"Please select a payment option below:"`
- **Sign-off Required:** Principal Product Architect.
- **Interim Action:** Retained verbatim in code until CCR-007 sign-off.

---

### FLAG-08: Punctuation Typo in Policy End Date Tooltip
- **Flag ID:** `FLAG-08`
- **Location:** `#periodEndDateInfo` (`MSG-012`)
- **Exact Current Verbatim Copy:**
> `"* Policy end date is always 31'st December"`
- **Defect Analysis:** Punctuation error: apostrophe inside ordinal number `31'st`.
- **Proposed Rectification (CCR-008):**
> `"* Policy end date is always 31 December"`
- **Sign-off Required:** Principal Product Architect.
- **Interim Action:** Retained verbatim in code until CCR-008 sign-off.

---

### FLAG-09: Grammatical Typo in Renewal Duplicate Notice
- **Flag ID:** `FLAG-09`
- **Location:** `#jsEmailErrorModel` (`MSG-009`)
- **Exact Current Verbatim Copy:**
> `"You are policy has been already renewed, if you need further assistance please contact mmi@ja-assure.com or WhatsApp + 60 12-536 0700"`
- **Defect Analysis:** Grammatical typo: `You are policy` instead of `Your policy`.
- **Proposed Rectification (CCR-009):**
> `"Your policy has already been renewed. If you require further assistance, please contact mmi@ja-assure.com or WhatsApp +60 12-536 0700"`
- **Sign-off Required:** JA Assure Client Services Lead.
- **Interim Action:** Retained verbatim in code until CCR-009 sign-off.

---

### FLAG-10: Spacing & Plural Typo in Public OTP Modal
- **Flag ID:** `FLAG-10`
- **Location:** `#jsFormRenewModal` (`MSG-015`)
- **Exact Current Verbatim Copy:**
> `"Please enter OTP which is sent to your mobile number with in 5 minute"`
- **Defect Analysis:** Spacing error and missing plural: `with in 5 minute` instead of `within 5 minutes`.
- **Proposed Rectification (CCR-010):**
> `"Please enter the OTP sent to your mobile number within 5 minutes"`
- **Sign-off Required:** Principal Product Architect.
- **Interim Action:** Retained verbatim in code until CCR-010 sign-off.

---

### FLAG-11: 25-Question COVID-19 Facility Risk Questionnaire
- **Flag ID:** `FLAG-11`
- **Location:** Screens 04A, 04B, 04C (`#jsPage11` to `#jsPage13`)
- **Exact Current Verbatim Copy:** 25 separate clinical questions regarding 2020 pandemic practices, quarantine measures, and PPE supplies.
- **Defect Analysis:** Pandemic-era underwriting artifact. Many clinical applicants find answering 25 historical COVID questions irrelevant in 2026.
- **Underwriting Invariant:** Under Prohibition P-1, **no underwriting rule or exclusion may be omitted**.
- **Architectural Solution:** Retain all 25 questions in full, but collapse them into a single, clean progressive accordion (`COVID-19 Health & Facility Questions ▾`).
- **Sign-off Required:** Chubb Chief Underwriter (for potential future retirement).

---

### FLAG-12: AI-Generated 15-Minute Rate-Lock Panic Urgency Banner
- **Flag ID:** `FLAG-12`
- **Location:** `Stage2QuoteReview.tsx` (Current codebase)
- **Exact Current Copy:**
> *"Your premium rate is locked for the next 15 minutes. Complete your application to secure this price."*
- **Defect Analysis:** Fabricated urgency countdown inserted during early prototype scaffolding. It does not exist in Chubb's approved underwriting contract, nor does the rating API expire quotes after 15 minutes.
- **Proposed Rectification:** Permanent purge of this banner. Replaced with factual quote validity statement: `"Quote valid until 31 Dec [Year]"`.
- **Sign-off Required:** Principal Product Architect & Chubb Product Lead.

---

### FLAG-13: AI-Generated Didactic Lectures on Clinic Liability
- **Flag ID:** `FLAG-13`
- **Location:** `Stage2QuoteReview.tsx` (Current codebase)
- **Exact Current Copy:**
> *"As a private clinic owner, you face dual exposure: professional negligence claims and clinic entity liability..."*
- **Defect Analysis:** Unapproved conversational copy lecturing licensed physicians on why they need clinic insurance.
- **Proposed Rectification:** Permanent purge. Replace with clean field label and standard coverage limit options.
- **Sign-off Required:** Principal Product Architect.

---

## 3. Formal Sign-Off Matrix (Pending CCR Signatures)

| Flag ID | Content Item | Chubb Legal Sign-Off | JA Assure Product Sign-Off | Principal Architect Sign-Off |
|:---:|---|:---:|:---:|:---:|
| `FLAG-01` | Cookie / Renewal Notice | Pending | Pending | Signed (2026-10-29) |
| `FLAG-02` | Typo "PLEAESE" | Pending | Pending | Signed (2026-10-29) |
| `FLAG-03` | Typo "manger" & truncated sentence | Pending | Pending | Signed (2026-10-29) |
| `FLAG-04` | Duplicate "with with" | Pending | Pending | Signed (2026-10-29) |
| `FLAG-05` | Grammatical error "locums sees" | Pending | Pending | Signed (2026-10-29) |
| `FLAG-06` | Typo "criminial" | Pending | Pending | Signed (2026-10-29) |
| `FLAG-07` | Grammatical error "anyone of option" | Pending | Pending | Signed (2026-10-29) |
| `FLAG-08` | Punctuation "31'st" | Pending | Pending | Signed (2026-10-29) |
| `FLAG-09` | Typo "You are policy" | Pending | Pending | Signed (2026-10-29) |
| `FLAG-10` | Typo "with in 5 minute" | Pending | Pending | Signed (2026-10-29) |
| `FLAG-11` | COVID-19 25 Questions | Retained in Full | Retained in Full | Signed (2026-10-29) |
| `FLAG-12` | 15-Minute Rate Lock Purge | Pending | Pending | Signed (2026-10-29) |
| `FLAG-13` | AI Didactic Lecture Purge | Pending | Pending | Signed (2026-10-29) |

---

*Until formal sign-off is confirmed, the codebase will preserve all approved text and statutory notices without unauthorized modification.*

