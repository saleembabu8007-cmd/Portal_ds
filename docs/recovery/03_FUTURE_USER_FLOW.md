# FUTURE USER FLOW — MINIMAL INSURANCE JOURNEY
## DoctorShield Individual Medical Professional Indemnity Portal

> **Document ID:** `DOC-ARCH-FLOW-001`  
> **Status:** Architecture Design Baseline (Phase 03)  
> **Classification:** [PROPOSED / SPECIFICATION]  
> **Author:** Principal Insurance Product Designer & Interaction Architect  
> **Created:** 2026-10-30  
> **Governance:** DoctorShield Product Engineering & Design Rules v2.0 (AGENTS.md)  
> **Scope:** Comprehensive end-to-end journey maps, state transitions, branch conditions, and recovery loops for all customer pathways.

---

## 1. Architectural Philosophy & Journey Principles

The current DoctorShield portal imposes significant cognitive friction: monolithic screens (Stage 3 stretches 4,240px vertically), repeated financial breakdowns on four distinct pages, premature underwriting disclosures before a quote is viewed, and ambiguous error recovery.

The **Minimal Insurance Journey** resolves these issues through four fundamental principles derived from Phase 02 benchmark research (Ditto restraint, QIC Online clarity, ACKO progression, and Baymard insurance research):

1. **Instant Value Before Personal Commitment (Quote-First):** Doctors receive an authoritative baseline premium calculation within 20 seconds by providing only 3 clinical variables (Specialty Classification, Desired Indemnity Limit, Inception Date). Personal identifiers (NRIC, MMC#, Home Address) are deferred until after quotation acceptance.
2. **Progressive Modular Disclosure:** Add-ons are presented as clear, self-contained modular cards with visible net price deltas (`+RM 350.00 / year`). Selecting an add-on reveals only its immediate dependencies.
3. **Chunked Focused Application (Substep Wizard):** Stage 3 is decomposed into three focused, low-fatigue substeps:
   - **Substep 3.1: Doctor Particulars & Practice Information** (Identity, Qualifications, Principal Clinic)
   - **Substep 3.2: Clinic Facilities & Branch Allocation** (Only rendered if private clinic ownership is flagged; 100% revenue balancing)
   - **Substep 3.3: Statutory Medical Underwriting Declarations** (5 statutory questions with 44px segmented Yes/No controls)
4. **State Carry-Forward & Graceful Backward Navigation:** Edits to earlier stages preserve valid downstream data. If an upstream change invalidates an add-on or branch, the user is notified with transparent reconciliation rather than silent data erasure.

---

## 2. Global Journey State Machine

```mermaid
flowchart TD
    S0["Landing / Entry Point"] --> S1["Stage 1: Instant Premium Calculation"]
    S1 -->|"Valid Specialty + Limit + Date"| S2["Stage 2: Quotation & Optional Coverage"]
    S1 -->|"Inception Date > 30 Days Past"| M_RETRO["Modal: Retroactive Inception Agreement"]
    M_RETRO -->|"Agree (Clause 6.12)"| S2
    M_RETRO -->|"Decline"| S1

    S2 -->|"Accept Policy & Selected Add-ons"| S3_1["Stage 3.1: Doctor Particulars & Practice"]
    S2 -->|"Quote Expired (> 15 mins)"| M_EXP["Modal: Quote Refresh Prompt"]
    M_EXP -->|"Refresh Rates"| S2

    S3_1 -->|"Valid Identity & MMC#"| COND_CLINIC{"Clinic Owner?"}
    COND_CLINIC -->|"Yes"| S3_2["Stage 3.2: Clinic Branches & Revenue"]
    COND_CLINIC -->|"No"| S3_3["Stage 3.3: Statutory Declarations"]
    S3_2 -->|"Revenue Balanced (100%)"| S3_3

    S3_3 -->|"Clean History (All No)"| S4["Stage 4: Review, Declarations & Payment"]
    S3_3 -->|"Adverse History (Any Yes + Narrative)"| REF_GATE{"Straight-Through Allowed?"}
    REF_GATE -->|"No (High Risk)"| S_REF["Outcome: Underwriting Referral"]
    REF_GATE -->|"Yes (Subject to Review)"| S4

    S4 -->|"FPX / Credit Card Authorised"| S5["Stage 5: Policy Schedule & Cover Note"]
    S4 -->|"Payment Gateway Cancel / Fail"| S4_FAIL["Stage 4: Payment Retry Dialog"]
    S4_FAIL -->|"Retry Payment"| S4

    S0 -->|"Renewal Route (Direct Link / NRIC Lookup)"| R_OTP["Renewal OTP Verification"]
    R_OTP -->|"OTP Validated"| R_PREFILL["Pre-filled Quote & Review"]
    R_PREFILL -->|"Confirmed Unchanged"| S4
    R_PREFILL -->|"Update Details"| S2
```

---

## 3. Detailed Journey Specifications

### Journey 1: New Application & Instant Straight-Through Quotation (Happy Path)

**User Goal:** Obtain professional indemnity insurance coverage quickly and receive an official Cover Note / Policy Schedule.

```mermaid
sequenceDiagram
    autonumber
    actor Doctor as Doctor / Applicant
    participant UI as DoctorShield Portal
    participant API as Backend Services
    participant PG as Payment Gateway (FPX / Card)

    Doctor->>UI: Selects Specialty Classification (e.g. General Practice)
    Doctor->>UI: Selects Indemnity Limit (e.g. RM 1,000,000)
    Doctor->>UI: Chooses Inception Date (e.g. 01/11/2026)
    Doctor->>UI: Inputs Contact Email & Promo Code (Optional)
    Doctor->>UI: Clicks "Calculate Premium"
    UI->>API: POST /api/calculatePremium
    API-->>UI: Authoritative Base Rate, Pro-rata Days, Stamp Duty, Direct Rebate (10%)
    UI->>Doctor: Displays Stage 2: Quotation Breakdown (RM 1,350.00 base)

    Doctor->>UI: Reviews Included Coverage & Reinstatement (Complimentary 1x limit)
    Doctor->>UI: Selects Add-on: Cyber & Privacy Liability (+RM 350.00)
    UI->>UI: Optimistic Live Premium Update (RM 1,700.00)
    Doctor->>UI: Clicks "Continue to Doctor Particulars"

    Doctor->>UI: Fills Substep 3.1: Full Name, NRIC, MMC Registration #, Clinic Address
    Doctor->>UI: Selects "Sole Practitioner / Associate" (Not Clinic Owner)
    Doctor->>UI: Clicks "Continue to Underwriting Declarations"

    Doctor->>UI: Substep 3.3: Answers 5 Statutory Declarations (All "No")
    Doctor->>UI: Clicks "Proceed to Review & Payment"

    Doctor->>UI: Stage 4: Reviews Policy Terms, Verifies Insured Details
    Doctor->>UI: Ticks FSA 2013 Disclosure & PDPA Consent
    Doctor->>UI: Selects Payment Channel: FPX Online Banking (Maybank2u)
    Doctor->>UI: Clicks "Pay RM 1,812.00"
    UI->>PG: Redirects to FPX Bank Gateway
    Doctor->>PG: Authenticates & Approves Transaction
    PG-->>UI: Callback: Payment SUCCESS (Auth Code: 894120)

    UI->>API: POST /api/issuePolicy
    API-->>UI: Certificate No, Policy Schedule PDF URL
    UI->>Doctor: Displays Stage 5: Coverage Confirmed, Policy Schedule PDF & Cover Note available
```

---

### Journey 2: Optional Coverage & Add-on Selection Flow

**User Goal:** Customise indemnity protection with institutional, premises, cyber, or locum extensions.

```mermaid
flowchart TD
    A["Stage 2 Entry: Base Quote Rendered"] --> B["Render Modular Add-on Grid"]
    
    B --> C1["Card 1: Clinic Extension Package"]
    B --> C2["Card 2: PIC Statutory Liability Extension"]
    B --> C3["Card 3: Cyber & Privacy Breach Cover"]
    B --> C4["Card 4: Locum Doctor Practice Extension"]

    C1 -->|"Toggle ON"| D1["Trigger Clinic Entity Qualification Prompt"]
    D1 -->|"Sole Proprietor / Partner"| E1["Add-on Active (+RM 1,200.00)"]
    D1 -->|"Sdn Bhd / Corporate Entity"| E2["Add-on Active + Flag Corporate Revenue Cap (RM 5M)"]
    E1 & E2 --> F1["Set Stage 3 Substep 3.2 Required = TRUE"]

    C2 -->|"Toggle ON"| D2["Prompt: Are you the registered MMC Person-In-Charge?"]
    D2 -->|"Yes"| E3["Add-on Active (+RM 450.00)"]
    D2 -->|"No"| E4["Display Warning: PIC cover requires MMC designated PIC"]

    C3 -->|"Toggle ON"| E5["Add-on Active (+RM 350.00)"]
    C4 -->|"Toggle ON"| E6["Add-on Active (+RM 250.00)"]

    C1 & C2 & C3 & C4 -->|"Toggle OFF"| G["Revert Delta & Auto-Recalculate Totals"]
    G -->|"If Clinic toggled OFF"| H["Set Stage 3 Substep 3.2 Required = FALSE"]
    
    E1 & E2 & E3 & E5 & E6 --> I["Authoritative Recalculation (Base + Sum of Addons - Rebate + SST + Stamp Duty)"]
    I --> J["Update Sticky Bottom Action Bar / Summary Sidebar"]
```

---

### Journey 3: Progressive Underwriting & Particulars (3-Substep Wizard)

**User Goal:** Complete statutory disclosures and professional identity verification without visual overwhelm or horizontal scrolling.

```mermaid
flowchart TD
    SUB1["Substep 3.1: Doctor Particulars"]
    SUB1 --> I1["Full Legal Name (as per NRIC / Passport)"]
    SUB1 --> I2["NRIC / Passport Number"]
    SUB1 --> I3["MMC Registration Number (e.g. 12345)"]
    SUB1 --> I4["Date of Birth & Gender (Auto-extracted from NRIC)"]
    SUB1 --> I5["Principal Practice Address & Contact Phone"]
    SUB1 --> I6["Clinic Ownership Radio: Sole Practitioner / Clinic Owner / Employed"]
    
    I6 -->|"Clinic Owner"| SUB2["Substep 3.2: Clinic Facilities & Branches"]
    I6 -->|"Sole Practitioner / Employed"| SUB3["Substep 3.3: Statutory Declarations"]

    subgraph SUB2_BOX ["Substep 3.2: Clinic Facilities & Branches"]
        SUB2 --> B1["Main Clinic Name & Registration (Borang B / F)"]
        SUB2 --> B2["Annual Clinic Revenue Input (RM)"]
        B2 -->|"Revenue > RM 5,000,000"| B2_WARN["Warning: Annual revenue exceeds online limit of RM 5M. Requires manual underwriting."]
        SUB2 --> B3["Additional Branches Toggle (Yes / No)"]
        B3 -->|"Yes"| B4["Repeatable Branch Card: Branch Name, State, Revenue %"]
        B4 --> B5["Automated 100% Revenue Balance Validation"]
    end

    SUB2_BOX --> SUB3

    subgraph SUB3_BOX ["Substep 3.3: Statutory Medical Underwriting"]
        SUB3 --> Q1["Q1: Criminal convictions or disciplinary proceedings? (Yes / No)"]
        SUB3 --> Q2["Q2: Refused indemnity or had special terms imposed? (Yes / No)"]
        SUB3 --> Q3["Q3: Past medical malpractice claims in last 5 years? (Yes / No)"]
        SUB3 --> Q4["Q4: Aware of any circumstance likely to give rise to a claim? (Yes / No)"]
        SUB3 --> Q5["Q5: High-risk procedures outside selected specialty? (Yes / No)"]
        
        Q1 & Q2 & Q3 & Q4 & Q5 -->|"Any Answer is YES"| COND_NARR["Reveal Narrative Textarea: Please provide full details, dates, and amounts (Min 20 chars)"]
    end

    SUB3_BOX --> STAGE4_TRANS["Advance to Stage 4: Review & Payment"]
```

---

### Journey 4: Review, Financial Breakdown & Payment Gateway

**User Goal:** Verify all policy details, understand final payable fees, execute payment securely.

```mermaid
flowchart LR
    S4_IN["Enter Stage 4"] --> POL_REV["1. Review Policy Details: Limit, Specialty, Inception Date, Included Reinstatement"]
    POL_REV --> ADDON_REV["2. Review Add-ons: Selected extensions & individual costs"]
    ADDON_REV --> FIN_SUM["3. Financial Breakdown: Base + Add-ons - 10% Direct Rebate + 8% SST + RM 10 Stamp Duty"]
    FIN_SUM --> STAT_DEC["4. Statutory Consents: FSA 2013 Schedule 9 Duty of Disclosure + PDPA 2010"]
    STAT_DEC --> PAY_SEL["5. Payment Selection: FPX Online Banking OR Credit / Debit Card"]
    PAY_SEL --> PAY_ACT["Click 'Pay RM [Total]'"]
    
    PAY_ACT --> GATEWAY["External Bank / Card Gateway"]
    GATEWAY -->|"Success"| S5_OUT["Stage 5: Confirmation"]
    GATEWAY -->|"Cancel / Timeout"| RETRY["Payment Aborted: Return to Stage 4 with State Preserved"]
```

---

### Journey 5: Policy Completion & Documentation

**User Goal:** Download official Cover Note, view policy schedule, understand policy activation timeline.

```mermaid
flowchart TD
    S5_ENTRY["Payment Confirmed Callback"] --> S5_CARD["Success Confirmation Card"]
    S5_CARD --> D1["Policy Schedule No: DS-2026-XXXX"]
    S5_CARD --> D2["Insured Doctor: Dr. [Name], MMC #[Number]"]
    S5_CARD --> D3["Period of Cover: [Inception] to 31/12/2026 (12:00 midnight)"]
    S5_CARD --> D4["Total Indemnity Limit: RM [Limit] + Free 1x Reinstatement"]
    
    S5_CARD --> ACT1["Primary Action: Download Cover Note (PDF)"]
    S5_CARD --> ACT2["Secondary Action: Download Tax Invoice / Receipt (PDF)"]
    S5_CARD --> INFO["Notification: Official Policy Schedule and Certificate sent to [Email]"]
    S5_CARD --> HOME["Return to DoctorShield Home / Dashboard"]
```

---

### Journey 6: Policy Renewal Route with OTP Authentication

**User Goal:** Existing policyholders renew their indemnity cover in under 60 seconds with pre-filled particulars.

```mermaid
sequenceDiagram
    autonumber
    actor Doctor as Returning Doctor
    participant UI as Portal Renewal View
    participant API as Backend Services

    Doctor->>UI: Enters MMC Registration # or Existing Policy No
    Doctor->>UI: Clicks "Find My Policy"
    UI->>API: POST /api/checkRenewalEligibility
    API-->>UI: Policy Found. Masked Mobile (012-***4892) & Email (d***@gmail.com)
    UI->>Doctor: Displays OTP Modal: "Verification code sent to 012-***4892"

    Doctor->>UI: Enters 6-digit OTP
    UI->>API: POST /api/verifyRenewalOTP
    API-->>UI: Authorised Session Token + Pre-filled Profile Data
    UI->>Doctor: Displays Renewal Dashboard: Current Tier vs Recommended Tier
    
    Doctor->>UI: Confirms No Changes to Specialty or Practice Location
    Doctor->>UI: Accepts Renewal Quotation
    UI->>Doctor: Skips Stage 3.1 & 3.2 -> Opens Substep 3.3 (Statutory Declarations)
    Doctor->>UI: Confirms 5 Underwriting Questions
    Doctor->>UI: Advances to Stage 4 (Review & Fast-track Payment)
```

---

### Journey 7: Adverse Risk Underwriting Referral

**User Goal:** Doctors with prior claims or disciplinary history submit details for underwriter manual review without losing entered information.

```mermaid
flowchart TD
    ADV_ANS["Doctor answers YES to any Statutory Question (Q1-Q5)"] --> NARR["Input Narrative Details & Attach Supporting PDF (Optional)"]
    NARR --> SUBMIT_UW["Doctor clicks 'Submit for Underwriting Assessment'"]
    SUBMIT_UW --> API_FLAG["System flags Application as STATUS: UNDERWRITING_REFERRAL"]
    
    API_FLAG --> REF_SCREEN["Display Referral Confirmation Screen"]
    REF_SCREEN --> T1["Reference ID Generated: REF-2026-XXXX"]
    REF_SCREEN --> T2["Notice: Our medical legal underwriters will review your declaration within 24 business hours."]
    REF_SCREEN --> T3["No payment collected at this stage."]
    REF_SCREEN --> T4["Contact Info: claims@doctorshield.com.my | 1800-88-DOCS"]
    REF_SCREEN --> ACT_PDF["Download Copy of Submitted Application (PDF)"]
```

---

### Journey 8: Retroactive Date Prior Inception Handling (Clause 6.12)

**User Goal:** Doctors who need coverage backdated (up to 30 days) understand and agree to retroactive claims indemnity conditions.

```mermaid
flowchart TD
    DATE_SEL["Doctor selects Inception Date < Current Date"] --> CHECK_DAYS{"Days Past?"}
    CHECK_DAYS -->|"> 30 Days"| BLOCK["Date Rejected: Backdating beyond 30 days is prohibited online. Contact Helpdesk."]
    CHECK_DAYS -->|"<= 30 Days"| MODAL["Trigger Modal: POP-RETRO-001 (Clause 6.12 Agreement)"]
    
    MODAL --> TEXT["Statutory Retroactive Clause Notice: Coverage does not indemnify any claims or circumstances known to the applicant prior to payment."]
    MODAL --> AGREE["Doctor clicks: 'I understand and agree to Clause 6.12'"]
    MODAL --> DECLINE["Doctor clicks: 'Select Today as Start Date'"]
    
    AGREE --> PROCEED["Inception Date Accepted with RETROACTIVE_FLAG = TRUE"]
    DECLINE --> RESET_DATE["Inception Date Reset to Current Date (Today)"]
```

---

### Journey 9: Quotation Expiry (15-Minute Price Lock) & Instant Re-rating

**User Goal:** Doctor returns after 15 minutes of inactivity; price is smoothly verified and refreshed without clearing user form data.

```mermaid
flowchart TD
    TIMER_START["Stage 2 Loaded: 15-Minute Countdown Begins"] --> TIME_EXP{"15 Minutes Elapsed?"}
    TIME_EXP -->|"No"| CONTINUE["Normal Progression"]
    TIME_EXP -->|"Yes"| SHOW_DRAWER["Banner / Micro-dialog: 'Your quote price lock has expired. Rates are refreshed automatically.'"]
    
    SHOW_DRAWER --> REFRESH_ACT["Click 'Refresh Rates'"]
    REFRESH_ACT --> API_RERATE["POST /api/refreshQuoteRates (Preserves Specialty, Limit, Add-ons)"]
    API_RERATE -->|"Rates Unchanged"| TOAST["Toast: Quotation confirmed current. Price unchanged."]
    API_RERATE -->|"Rates Changed"| MODAL_DIFF["Notice: Updated rates applied. Base premium adjusted by +RM [Delta]."]
    
    TOAST & MODAL_DIFF --> RESTART_TIMER["Restart 15-Minute Lock"]
```

---

## 4. Journey Validation Rules & Transition Matrix

| Transition | From Stage | To Stage | Trigger Action | Required Validation Gates | Fallback / Error State |
|---|---|---|---|---|---|
| **T-01** | Stage 1 | Stage 2 | `ACT-CALC-001` (Calculate) | Valid `classification_id`, valid `liability_id`, valid date format, future/retroactive valid | Highlight invalid field with inline message; modal if >30 days past |
| **T-02** | Stage 2 | Substep 3.1 | `ACT-QUOT-002` (Continue) | Base quote active, add-on compatibility verified | Quote expired modal if session timed out |
| **T-03** | Substep 3.1 | Substep 3.2 | `ACT-PART-001` (Next) | NRIC valid checksum, MMC# 4-6 digits, Principal address complete, `clinic_owner == 'yes'` | Show field errors; if `clinic_owner == 'no'`, route directly to Substep 3.3 |
| **T-04** | Substep 3.2 | Substep 3.3 | `ACT-BRCH-001` (Next) | Borang B/F provided, Total branch revenue % == 100%, Clinic revenue <= RM 5M | Highlight revenue imbalance; show referral warning if revenue > RM 5M |
| **T-05** | Substep 3.3 | Stage 4 | `ACT-UW-001` (Proceed) | All 5 declarations answered; if any "Yes", narrative text length >= 20 chars | Incomplete questions flagged; if high-risk adverse, route to Referral Screen |
| **T-06** | Stage 4 | Payment Gateway | `ACT-REV-001` (Pay Now) | FSA 2013 consent ticked, PDPA consent ticked, Payment method selected | Inline checkbox validation shake; disable button during gateway dispatch |
| **T-07** | Gateway | Stage 5 | Gateway Success Callback | Gateway Auth Code verified, Policy record committed | Show Payment Failure dialog with retry options; do not invalidate quote |
| **T-08** | Any Stage | Prior Stage | Back Button / Breadcrumb | None (User initiated back navigation) | State preserved 100%; warn if modifying Stage 1 will reset custom add-ons |

---

## 5. Summary of Architectural Improvements

1. **Step Count Reduction:** Replaces fragmented 7-step legacy journey with a coherent **4-stage purchasing pipeline** + 1 confirmation outcome.
2. **Substep Containment:** Stage 3 contains all underwriting complexities in a structured, linear 3-part stepper with zero horizontal scroll.
3. **Decoupled Add-ons:** Add-on selection is isolated to Stage 2 with clear financial feedback before personal identity collection begins.
4. **Resilient Recovery:** Clear handling for retroactivity, quotation expiration, adverse disclosures, and gateway aborts.

