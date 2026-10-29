# UNDERWRITING DECISION TREE
## DoctorShield Individual Medical Professional Indemnity Portal

> **Document ID:** `DOC-TREE-UW-001`  
> **Status:** Authoritative Baseline (Phase 1)  
> **Classification:** [VERIFIED]  
> **Last Updated:** 2026-10-29  
> **Owner:** Senior Solutions Architect & Chief Underwriting Analyst  
> **Scope:** Formal decision tables and branching rules governing automatic straight-through policy issuance versus manual underwriting referral or system rejection.

---

## 1. Master Underwriting Triage Architecture

```
                                  [Step 3 Submission]
                                           │
                                           ▼
                       ┌───────────────────────────────────────┐
                       │       Sanction & Blocklist Gate       │
                       │ customer_nric_blocklist_validation    │
                       │ customer_name_validation              │
                       └───────────────────────────────────────┘
                                     │           │
                          [Clean: 1] │           │ [Blocklisted: 0]
                                     │           ▼
                                     │      [OUTRIGHT REJECTION / REFERRAL]
                                     │      Redirects to Step 5 / Contact Support
                                     ▼
                       ┌───────────────────────────────────────┐
                       │   Individual Declarations Gate        │
                       │ 1. Claims Made (Agree/Disagree)       │
                       │ 2. Errors / Omissions (Yes/No)        │
                       │ 3. Disciplinary Action (Yes/No)       │
                       │ 4. Criminal Charges (Yes/No)          │
                       └───────────────────────────────────────┘
                                     │           │
                          [Clean: 0] │           │ [Any Adverse: 1]
                                     │           ▼
                                     │      [UNDERWRITING REFERRAL]
                                     │      Triggers Screen 05 (#jsPage8)
                                     │      "PLEAESE CALL SUPPORT OFFICE"
                                     ▼
                       ┌───────────────────────────────────────┐
                       │    Clinic Package Gate (if active)    │
                       │ 1. Clinic Claims (Yes/No)             │
                       │ 2. Clinic Errors (Yes/No)             │
                       │ 3. Clinic Disciplinary (Yes/No)       │
                       │ 4. Clinic Criminal (Yes/No)           │
                       └───────────────────────────────────────┘
                                     │           │
                          [Clean: 0] │           │ [Any Adverse: 1]
                                     │           ▼
                                     │      [UNDERWRITING REFERRAL]
                                     │      Triggers Screen 05 (#jsPage8)
                                     ▼
                       ┌───────────────────────────────────────┐
                       │     COVID Risk Questionnaire Gate     │
                       │ is_active_supplementarty_covid_q's    │
                       └───────────────────────────────────────┘
                                     │           │
                     [Active: 1]     │           │ [Standard: 0]
                                     ▼           ▼
                   [Screens 04A-C]      [STRAIGHT-THROUGH ISSUANCE]
                   COVID-19 Audit       Advances to Step 7 (Payment)
```

---

## 2. Decision Table 1: Individual Underwriting Declarations

| Rule ID | Prior Claims (`have_claim`) | Errors / Omissions (`aware_of_errors`) | Disciplinary Inquiries (`have_been_disc`) | Criminal Charges (`had_criminal`) | Blocklist Status | Decision Outcome | System Action | Downstream Destination |
|---|---|---|---|---|---|---|---|---|
| **DT-IND-01** | `Agree` (No claims) | `No` | `No` | `No` | Clean (`1`) | **ACCEPT (Straight-Through)** | Unlocks payment | Step 7 (`#jsPage10`) |
| **DT-IND-02** | `Disagree` (Prior claims) | Any | Any | Any | Clean (`1`) | **REFERRAL (Underwriting Review)** | Intercepts checkout | Step 5 (`#jsPage8`) |
| **DT-IND-03** | Any | `Yes` (Aware of errors) | Any | Any | Clean (`1`) | **REFERRAL (Underwriting Review)** | Intercepts checkout | Step 5 (`#jsPage8`) |
| **DT-IND-04** | Any | Any | `Yes` (Disciplinary inquiry) | Any | Clean (`1`) | **REFERRAL (Underwriting Review)** | Intercepts checkout | Step 5 (`#jsPage8`) |
| **DT-IND-05** | Any | Any | Any | `Yes` (Criminal charges) | Clean (`1`) | **REFERRAL (Underwriting Review)** | Intercepts checkout | Step 5 (`#jsPage8`) |
| **DT-IND-06** | Any | Any | Any | Any | Blocklisted (`0`) | **REJECT / ESCALATE** | Hard stop | Step 5 (`#jsPage8`) |

---

## 3. Decision Table 2: Clinic Entity Underwriting Declarations

*(Evaluated on Step 3 only when Clinic Indemnity Add-on `#medical_establishment_package` is checked)*

| Rule ID | Clinic Package Active | Clinic Claims (`clinic_claims`) | Clinic Errors (`clinic_errors`) | Clinic Disciplinary (`clinic_disc`) | Clinic Criminal (`clinic_crim`) | Decision Outcome | System Action |
|---|---|---|---|---|---|---|---|
| **DT-CLN-01** | `false` | N/A | N/A | N/A | N/A | **BYPASS** | Clinic gates inactive | Proceeds to Individual Gate |
| **DT-CLN-02** | `true` | `No` | `No` | `No` | `No` | **ACCEPT (Clinic Entity)** | Straight-through eligible | Unlocks Step 7 Payment |
| **DT-CLN-03** | `true` | `Yes` | Any | Any | Any | **REFERRAL (Clinic Review)** | Intercepts checkout | Step 5 (`#jsPage8`) |
| **DT-CLN-04** | `true` | Any | `Yes` | Any | Any | **REFERRAL (Clinic Review)** | Intercepts checkout | Step 5 (`#jsPage8`) |
| **DT-CLN-05** | `true` | Any | Any | `Yes` | Any | **REFERRAL (Clinic Review)** | Intercepts checkout | Step 5 (`#jsPage8`) |
| **DT-CLN-06** | `true` | Any | Any | Any | `Yes` | **REFERRAL (Clinic Review)** | Intercepts checkout | Step 5 (`#jsPage8`) |

---

## 4. Decision Table 3: Backdating Protocol (Clause 6.12)

| Rule ID | Start Date Condition | Agreement Triggered | User Action | Date Mutation | System Outcome |
|---|---|---|---|---|---|
| **DT-DATE-01** | `start_date` ≥ `current_date` | None | N/A | None | **ACCEPT:** Advances to Step 2 |
| **DT-DATE-02** | `start_date` < `current_date` | `#jsBackDateEnableModel` | Clicks `Agree` | Start date set to `01/01/YYYY` | **ACCEPT WITH EXCLUSION:** Binds Clause 6.12 non-continuous exclusion; advances to Step 2 |
| **DT-DATE-03** | `start_date` < `current_date` | `#jsBackDateEnableModel` | Clicks `Disagree` | Resets `start_date` to `""` | **HALT:** Discards dates; user must re-enter valid forward date |
| **DT-DATE-04** | `start_date` > `current_date + 9 months` | Inline Validator | N/A | None | **REJECT:** Displays error `Please enter a valid date, date should be within nine months from today.` |

---

## 5. Decision Table 4: Multi-Specialization Allocation Protocol

*(Triggered when classification requires percentage distribution across specialties via `#specializationModal`)*

| Rule ID | Allocation Percentage Values | Mathematical Sum | Condition Checked | System Decision | Error Message |
|---|---|---|---|---|---|
| **DT-SPEC-01** | All values > 0 | $\sum = 100\%$ | Valid distribution | **ACCEPT:** Persists JSON array into `specializations` hidden input; closes modal | None |
| **DT-SPEC-02** | Any value ≤ 0 | $\sum = 100\%$ | Value violation | **REJECT:** Halts submission | `The value must be greater than zero.` |
| **DT-SPEC-03** | Any values | $\sum \ne 100\%$ | Total violation | **REJECT:** Halts submission | `Sum of percentage should be 100` |

---

## 6. Decision Table 5: Additional Branch Clinics Eligibility

| Rule ID | Clinic Owned | Branch Count Input | Declared Aggregate Revenue | System Decision | Action & Enforcement |
|---|---|---|---|---|---|
| **DT-BRN-01** | `Yes` | $1 \le \text{Count} \le 4$ | $\le \text{RM } 5,000,000$ per annum | **ACCEPT** | Modal `#jsBranchModal` appends branch card to Step 3. Bundled complimentary coverage applies. |
| **DT-BRN-02** | `Yes` | $\text{Count} > 4$ | Any | **REJECT** | Client restricts branch entries to maximum of 4 (`You can add up to 4 branches`). |
| **DT-BRN-03** | `Yes` | Any | $> \text{RM } 5,000,000$ per annum | **OUT OF SCOPE / REFERRAL** | Ineligible for online bundling under `LEG-BRANCH-001`. Must contact corporate client services. |
| **DT-BRN-04** | `No` | N/A | N/A | **INACCESSIBLE** | Branch modal trigger disabled. |

---

## 7. Decision Table 6: Duplicate Quote & Existing Policyholder Protocol

| Rule ID | NRIC Lookup Status | Quote Reference Status | Policy Expiry Window | System Response | Customer Modal Triggered |
|---|---|---|---|---|---|
| **DT-DUP-01** | Unregistered | New Proposal | N/A | **NEW CUSTOMER FLOW** | Standard Step 1 -> 7 pipeline |
| **DT-DUP-02** | Existing Policyholder | Attempting new acquisition purchase for same period | Active policy in force | **DUPLICATE BLOCKED** | Displays `#jsAlreadyBoughtModal`: *"Hi, you have already purchased an indemnity policy for same period..."* |
| **DT-DUP-03** | Existing Policyholder | Attempting renewal via `/renew` | Policy due for renewal | **RENEWAL FLOW UNLOCKED** | Sends OTP; displays `#jsUserPolicyList` |
| **DT-DUP-04** | Existing Policyholder | Already renewed for upcoming APC cycle | Cycle closed | **RENEWAL BLOCKED** | Displays `#jsEmailErrorModel`: *"You are policy has been already renewed..."* |
| **DT-DUP-05** | Any | Quotation deep link > 30 days old | Expired quote | **LINK EXPIRED** | Displays `#jsExpireContactusQuoteErrorModel`: *"This link has expired..."* |

