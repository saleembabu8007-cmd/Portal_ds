# APPLICATION STATE MODEL
## DoctorShield Individual Medical Professional Indemnity Portal

> **Document ID:** `DOC-STATE-MDL-001`  
> **Status:** Authoritative Baseline (Phase 1)  
> **Classification:** [VERIFIED]  
> **Last Updated:** 2026-10-29  
> **Owner:** Senior Solutions Architect & Engineering Lead  
> **Scope:** Complete finite-state machine (FSM) defining states, transitions, guards, actions, and persistence behaviors for the DoctorShield application lifecycle.

---

## 1. High-Level Lifecycle State Machine

```mermaid
stateDiagram-v2
    [*] --> S0_UNINITIALIZED
    
    S0_UNINITIALIZED --> S1_CALCULATOR : Page Boot & getCSRFToken
    
    state S1_CALCULATOR {
        [*] --> S1_INPUT_ACTIVE
        S1_INPUT_ACTIVE --> S1_MODAL_SPECIALIZATION : Multi-specialty classification chosen
        S1_MODAL_SPECIALIZATION --> S1_INPUT_ACTIVE : Allocation valid (Sum = 100%)
        S1_INPUT_ACTIVE --> S1_MODAL_BACKDATE : Start Date < Today
        S1_MODAL_BACKDATE --> S1_INPUT_ACTIVE : Agree (sets 01/01/YYYY) / Disagree (clears dates)
    }
    
    S1_CALCULATOR --> S2_QUOTATION : Click "Calculate" (Guard: Step 1 Valid)
    
    state S2_QUOTATION {
        [*] --> S2_CUSTOMISATION_ACTIVE
        S2_CUSTOMISATION_ACTIVE --> S2_CUSTOMISATION_ACTIVE : Toggle Clinic (Yes/No)
        S2_CUSTOMISATION_ACTIVE --> S2_CUSTOMISATION_ACTIVE : Toggle PIC (Yes/No)
        S2_CUSTOMISATION_ACTIVE --> S2_EMAIL_DISPATCHED : Select "Email Quote" & Submit
    }
    
    S2_QUOTATION --> S1_CALCULATOR : Click "<< Back"
    S2_QUOTATION --> S3_PARTICULARS : Select "Buy now" & Click "Buy >>"
    
    state S3_PARTICULARS {
        [*] --> S3_FORM_ACTIVE
        S3_FORM_ACTIVE --> S3_MODAL_BRANCH : Click "Add Clinic / Branch"
        S3_MODAL_BRANCH --> S3_FORM_ACTIVE : Save Branch (<= 4 branches, <= RM 5M)
        S3_FORM_ACTIVE --> S3_MODAL_NOTICES : Click "Important Notices"
        S3_MODAL_NOTICES --> S3_FORM_ACTIVE : Close
    }
    
    S3_PARTICULARS --> S2_QUOTATION : Click "<< Back"
    S3_PARTICULARS --> S5_REFERRAL_INTERRUPTION : Adverse Underwriting Flagged (Any "Yes" / "Disagree")
    S3_PARTICULARS --> S4_COVID_QUESTIONNAIRE : COVID Risk Trigger Active
    S3_PARTICULARS --> S7_PAYMENT_SELECTION : Clean Application
    
    state S4_COVID_QUESTIONNAIRE {
        S4A_REGULATORY --> S4B_BUSINESS_CONTINUITY : Click "Next >>"
        S4B_BUSINESS_CONTINUITY --> S4C_EMPLOYEE_TRAINING : Click "Next >>"
        S4C_EMPLOYEE_TRAINING --> S7_PAYMENT_SELECTION : Final Declaration Signed
    }
    
    state S5_REFERRAL_INTERRUPTION {
        S5_INTERRUPT_SCREEN --> S6_CONTACT_CALLBACK : Click "Yes" (Allow RM Call)
        S5_INTERRUPT_SCREEN --> [*] : Click "No" (Exit)
    }
    
    S6_CONTACT_CALLBACK --> S3_PARTICULARS : Click "<< Back"
    S6_CONTACT_CALLBACK --> [*] : Submit RM Callback Ticket
    
    state S7_PAYMENT_SELECTION {
        [*] --> S7_METHOD_ACTIVE
        S7_METHOD_ACTIVE --> S8_GATEWAY_HANDOFF : Click "Proceed to payment"
    }
    
    S7_PAYMENT_SELECTION --> S3_PARTICULARS : Click "<< Back"
    
    S8_GATEWAY_HANDOFF --> S9_PAYMENT_SUCCESS : Gateway Callback Success
    S8_GATEWAY_HANDOFF --> S10_PAYMENT_FAILED : Gateway Callback Failure
```

---

## 2. State-Transition Table

| Current State | Transition Trigger (Event) | Guard Condition | Target State | Executed Action / Side Effect |
|---|---|---|---|---|
| **`S0_UNINITIALIZED`** | Window `load` | None | **`S1_CALCULATOR`** | Fetches CSRF token via `GET /api/getCSRFToken`; initializes Calentim datepickers; renders `#jsPage1`. |
| **`S1_CALCULATOR`** | Classification `change` | Classification has sub-specialties | **`S1_MODAL_SPECIALIZATION`** | Opens `#specializationModal`. |
| **`S1_MODAL_SPECIALIZATION`** | Click `Submit` | $\sum \% = 100 \land \forall v > 0$ | **`S1_CALCULATOR`** | Persists JSON into hidden input `specializations`; closes modal. |
| **`S1_CALCULATOR`** | Date input `blur` | `start_date < current_date` | **`S1_MODAL_BACKDATE`** | Opens `#jsBackDateEnableModel`. |
| **`S1_MODAL_BACKDATE`** | Click `Agree` | User accepted Clause 6.12 | **`S1_CALCULATOR`** | Start date set to `01/01/YYYY`; binds retroactive exclusion flag. |
| **`S1_MODAL_BACKDATE`** | Click `Disagree` | User declined | **`S1_CALCULATOR`** | Start and End dates cleared; user must re-enter forward date. |
| **`S1_CALCULATOR`** | Click `Calculate` (`#jsPage1Submit`) | All Step 1 fields valid $\land$ consent checked | **`S2_QUOTATION`** | Serializes form, calls `POST /api/calculatePremium`, transitions `#jsPage1` to hidden, unhides `#jsPage2`, scrolls to top. |
| **`S2_QUOTATION`** | Toggle Clinic `Yes` | Clinic owned | **`S2_QUOTATION`** | Unhides clinic structure, locum questions, clinic liability tiers, and clinic package card. |
| **`S2_QUOTATION`** | Toggle PIC `Yes` | PIC in own/other clinic | **`S2_QUOTATION`** | Unhides PIC coverage recommendation card. |
| **`S2_QUOTATION`** | Click `Submit` | `emailMeOrOnline` = `"email_quote"` | **`S2_EMAIL_DISPATCHED`** | Calls `POST /api/sendIndicativeQuoteMail`, sends quote PDF to email, displays `#jsReIndicativeQuoteErrorModel`. |
| **`S2_QUOTATION`** | Click `<< Back` | User wants to revise | **`S1_CALCULATOR`** | Unhides `#jsPage1`, hides `#jsPage2`. Retains inputs. |
| **`S2_QUOTATION`** | Click `Buy >>` | `emailMeOrOnline` = `"buy_online"` | **`S3_PARTICULARS`** | Unhides `#jsPage3`, hides `#jsPage2`, pre-populates email. |
| **`S3_PARTICULARS`** | Click `Add Clinic / Branch` | Clinic owned | **`S3_MODAL_BRANCH`** | Opens `#jsBranchModal`. |
| **`S3_MODAL_BRANCH`** | Click `Add Clinic / Branch` | Name, address, phone valid $\land$ revenue $\le$ RM 5M | **`S3_PARTICULARS`** | Appends branch card; serializes into `branch_details`; closes modal. |
| **`S3_PARTICULARS`** | Click `<< Back` | Revision | **`S2_QUOTATION`** | Unhides `#jsPage2`, hides `#jsPage3`. |
| **`S3_PARTICULARS`** | Click `Next >>` | $\ge 1$ Declaration = Adverse (`Yes`/`Disagree`) | **`S5_REFERRAL`** | Halts online payment; unhides `#jsPage8`; dispatches `sendContactUsClaimsEmail()`. |
| **`S3_PARTICULARS`** | Click `Next >>` | All Declarations Clean $\land$ COVID Trigger Active | **`S4_COVID_PAGE11`** | Unhides `#jsPage11RegulatoryAndVirusQuestions`. |
| **`S3_PARTICULARS`** | Click `Next >>` | All Declarations Clean $\land$ Standard Risk | **`S7_PAYMENT`** | Unhides `#jsPage10`; calls `setSummaryDetail()`. |
| **`S4_COVID_PAGE11`** | Click `Next >>` | Page 11 inputs valid | **`S4_COVID_PAGE12`** | Unhides `#jsPage12BusinessContiunityQuestions`. |
| **`S4_COVID_PAGE12`** | Click `Next >>` | Page 12 inputs valid | **`S4_COVID_PAGE13`** | Unhides `#jsPage13EmployeeAndCommunicationQuestions`. |
| **`S4_COVID_PAGE13`** | Click `Next >>` | Final declaration checked | **`S7_PAYMENT`** | Unhides `#jsPage10`. |
| **`S5_REFERRAL`** | Click `Yes` (`#jsPage8Yes`) | User permits RM call | **`S6_CALLBACK`** | Unhides `#jsContact` ("CONTACT DETAIL"). |
| **`S5_REFERRAL`** | Click `No` (`#jsPage8No`) | User declines | **`EXIT`** | Advises doctor to contact JA Assure directly. |
| **`S6_CALLBACK`** | Click `Submit` | Contact fields valid | **`SUBMITTED`** | Calls `POST /api/contactSupport`; generates CRM ticket. |
| **`S7_PAYMENT`** | Click `Proceed to payment` | Payment method chosen | **`S8_GATEWAY`** | Calls `POST /api/initiatePayment`; redirects browser to payment provider. |
| **`S8_GATEWAY`** | Webhook / Return Callback | Payment Authorized | **`S9_ISSUED`** | Displays `/success`; dispatches Certificate of Insurance & receipt email. |
| **`S8_GATEWAY`** | Webhook / Return Callback | Payment Declined / Cancelled | **`S10_FAILED`** | Displays `/error` or payment retry screen with retry token. |

---

## 3. Dedicated Renewal Sub-State Machine (`/renew`)

| State | Event | Condition | Next State | Action |
|---|---|---|---|---|
| **`R0_LOOKUP`** | User accesses `/renew` | None | **`R0_MOBILE_INPUT`** | Displays mobile input with country code `+60`. |
| **`R0_MOBILE_INPUT`** | Click `Generate OTP` | Mobile format valid | **`R1_OTP_VERIFICATION`** | Dispatches OTP via SMS or WhatsApp; starts 5-min timer. |
| **`R1_OTP_VERIFICATION`**| Click `Verify` | OTP code matches | **`R2_POLICY_LIST`** | Unhides `#jsUserPolicyList` with active policy cards. |
| **`R2_POLICY_LIST`** | Click `Select Policy` | Policy due for renewal | **`S2_QUOTATION`** | Pre-populates wizard with prior year profile & updated rate. |
| **`R2_POLICY_LIST`** | Click `Select Policy` | Already renewed | **`MODAL_ALREADY_RENEWED`**| Displays `#jsEmailErrorModel`: *"You are policy has been already renewed..."* |

