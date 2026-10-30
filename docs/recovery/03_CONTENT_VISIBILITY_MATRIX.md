# CONTENT VISIBILITY & GOVERNANCE MATRIX
## DoctorShield Individual Medical Professional Indemnity Portal

> **Document ID:** `DOC-ARCH-CONT-001`  
> **Status:** Architecture Design Baseline (Phase 03)  
> **Classification:** [PROPOSED / SPECIFICATION]  
> **Author:** Principal Insurance Product Designer & Regulatory Interaction Architect  
> **Created:** 2026-10-30  
> **Governance:** DoctorShield Product Engineering & Design Rules v2.0 (AGENTS.md)  
> **Scope:** Complete classification, verbatim preservation register, and visibility mapping of all customer-facing content items from `docs/CONTENT_MASTER.md` and `docs/FIELD_DICTIONARY.md`.

---

## 1. Content Governance Classification Framework

In accordance with Section 4 of the DoctorShield Product Engineering & Design Rules v2.0:
- **Class A — Legally Required Content:** Statutory declarations, regulatory disclosures, mandatory tax notices, and privacy consents. Must be preserved **100% verbatim** in exact legal phrasing, timing, visibility, and acknowledgment.
- **Class B — Essential Insurance Questions & Inputs:** Core underwriting fields, clinical classifications, indemnity limits, contact information, and branching selectors. Essential meaning, fields, and response choices are strictly preserved.
- **Class C — Approved Supporting Content & Disclosures:** Helpful explanatory text, definitions, tooltips, and modal reference documentation. Relocated to accessible contextual disclosures (drawers, micro-modals, info tooltips) to declutter the primary view while remaining easily accessible.
- **Class D — Redundant, Promotional or AI-Generated Content:** Superfluous marketing adjectives, repetitive financial summaries duplicated across screens, and unapproved AI filler text. Targeted for **formal retirement**.

---

## 2. Class A: Legally Required Content (100% Verbatim Preservation)

| Content ID | Regulatory Authority / Act | Verbatim Approved Copy | Target Screen & Placement | Governance Rule |
|---|---|---|---|---|
| **`DIS-CALC-001`** | Perbadanan Insurans Deposit Malaysia (PIDM) | *"The benefit(s) payable under eligible certificate/policy/product is(are) protected by PIDM up to limits. Please refer to PIDM's TIPS Brochure or contact DoctorShield / Insurer."* | Global Footer (`AppFooter`) on all stages; accessible modal on link click. | Preserved verbatim. High legal risk if altered. |
| **`DIS-CALC-002`** | General Insurance Association of Malaysia (PIAM) / BNM | *"I have read, understood and agree to the terms and conditions, privacy policy and I meet all local regulation to practice my profession."* | Stage 1 baseline acknowledgment before quote generation. | Preserved verbatim. Checkbox confirmation mandatory. |
| **`DIS-QUOT-001`** | Bank Negara Malaysia (BNM) Direct Channel Rebate | *"In accordance with Bank Negara Malaysia guidelines, a 10% Direct Rebate is applied to your gross premium for purchasing directly online without an intermediary."* | Stage 2 and Stage 4 Financial Breakdown; exact calculation line item. | Preserved verbatim. Negative deduction line item (`-RM XX.XX`). |
| **`DIS-REV-001`** | Financial Services Act 2013 (Schedule 9, Section 129) | *"Duty of Disclosure: You have a duty to take reasonable care not to make a misrepresentation in answering the questions in this Proposal Form. You must answer the questions fully and accurately. Failure to take reasonable care in answering the questions may result in avoidance of your contract of insurance, refusal or reduction of your claim(s), change of terms or termination of your contract of insurance."* | Stage 4 Review & Payment, immediately preceding payment selection. | Preserved verbatim. Prominently framed container with mandatory confirmation checkbox. |
| **`DIS-REV-002`** | Personal Data Protection Act 2010 (PDPA) | *"By submitting this application, I consent to the collection, processing, storage, and transfer of my personal data and health practice details by DoctorShield and its underwriting partners in accordance with the PDPA 2010 and Privacy Policy."* | Stage 4 Review & Payment, adjacent to FSA 2013 disclosure. | Preserved verbatim. Mandatory consent checkbox. |
| **`DIS-REV-003`** | Royal Malaysian Customs / Ministry of Finance (MOF) | *"Service Tax (SST) is levied at the prevailing statutory rate of 8% on taxable insurance premiums in accordance with the Service Tax Act 2018."* | Stage 2 and Stage 4 Financial Breakdown footnote. | Preserved verbatim. Clearly displayed above total payable. |
| **`DIS-REV-004`** | Stamp Act 1949 (Act 378) | *"Stamp duty of RM 10.00 is payable in accordance with the Stamp Act 1949 and will be remitted to Lembaga Hasil Dalam Negeri (LHDN)."* | Stage 2 and Stage 4 Financial Breakdown line item. | Preserved verbatim. Fixed RM 10.00 line item. |
| **`DIS-UW-001`** | Private Healthcare Facilities and Services Act 1998 (PHFSA) | *"Person-In-Charge (PIC) statutory vicarious liability coverage is valid only for practitioners gazetted and registered as Person-In-Charge under the Private Healthcare Facilities and Services Act 1998."* | Stage 2 PIC Add-on Card & Substep 3.2 PIC detail section. | Preserved verbatim. Displayed whenever PIC add-on is toggled. |
| **`DIS-RETRO-001`** | Claims-Made Policy Terms (Clause 6.12) | *"Retroactive Inception Agreement (Clause 6.12): You are selecting a coverage inception date prior to today. This policy operates on a Claims-Made basis. This insurance does NOT cover any claim, investigation, or circumstance known to you or which ought reasonably to have been known to you prior to the date and time of this application."* | Modal `POP-RETRO-001` when inception date < today. | Preserved verbatim. Requires explicit modal acknowledgment button. |

---

## 3. Class B: Essential Insurance Questions & Inputs

| Content ID | Field / Element ID | Legacy Label / Prompt | New Placement & Interaction Pattern | Condition / Rules |
|---|---|---|---|---|
| **`QST-CALC-002`** | `FLD-CALC-001` | *Select your classification* | **Stage 1:** Medical Specialty / Classification dropdown with typeahead search. | Mandatory (23 approved categories). |
| **`QST-CALC-003`** | `FLD-CALC-002` | *Limit of Liability* | **Stage 1:** Segmented radio cards (RM 500k, 1M, 2M, 5M) with complimentary reinstatement pill. | Mandatory; specialty-filtered tiers. |
| **`QST-CALC-004`** | `FLD-CALC-003` | *Start Date (DD/MM/YYYY)* | **Stage 1:** Inception Date input with datepicker (`type="tel"`, auto-slash formatting). | Mandatory; max +90 days, past up to -30 days. |
| **`QST-CALC-006`** | `FLD-CALC-005` | *Your Email Address* | **Stage 1:** Email input for instant quotation delivery (`type="email"`). | Optional in Stage 1; mandatory in Stage 3. |
| **`QST-CALC-007`** | `FLD-CALC-006` | *Promo Code* | **Stage 1:** Partner promo code with inline [ Apply ] trigger. | Optional. Validates partner codes (e.g. MMA). |
| **`QST-QUOT-002`** | `FLD-ADDON-001` | *Clinic Cover Extension* | **Stage 2:** Modular toggle card with pro-rated annual price delta (`+RM 1,200.00 / yr`). | Conditional on non-government classification. |
| **`QST-QUOT-003`** | `FLD-ADDON-002` | *Cyber & Privacy Breach Cover* | **Stage 2:** Modular toggle card with pro-rated price delta (`+RM 350.00 / yr`). | Open to all practitioners. |
| **`QST-QUOT-004`** | `FLD-ADDON-003` | *Person-In-Charge Extension* | **Stage 2:** Modular toggle card with pro-rated price delta (`+RM 450.00 / yr`). | Open to registered clinic PICs. |
| **`QST-QUOT-005`** | `FLD-ADDON-004` | *Locum Practitioner Cover* | **Stage 2:** Modular toggle card with pro-rated price delta (`+RM 250.00 / yr`). | Open to all practitioners. |
| **`QST-PART-001`** | `FLD-PART-001` | *Full Name as per NRIC* | **Substep 3.1:** Full legal name text input. | Mandatory. |
| **`QST-PART-002`** | `FLD-PART-002` | *NRIC / Identity Card Number* | **Substep 3.1:** NRIC 12-digit formatted input; auto-extracts DOB and Gender. | Mandatory. Validates Malaysian NRIC checksum. |
| **`QST-PART-003`** | `FLD-PART-003` | *Malaysian Medical Council (MMC) No* | **Substep 3.1:** MMC / MDC registration number input (4 to 6 digits). | Mandatory. |
| **`QST-PART-004`** | `FLD-PART-004` | *Principal Practice Name & Address* | **Substep 3.1:** Clinic name, street, postcode, city, state. Postcode auto-fills city/state. | Mandatory. |
| **`QST-PART-005`** | `FLD-PART-005` | *Practice Capacity* | **Substep 3.1:** Segmented radio (Clinic Owner / Employed Doctor / Locum). | Mandatory. Controls Substep 3.2 mounting. |
| **`QST-BRCH-001`** | `FLD-BRCH-001` | *Borang B / Borang F Number* | **Substep 3.2:** Clinic registration license input. | Mandatory if Substep 3.2 mounted. |
| **`QST-BRCH-002`** | `FLD-BRCH-002` | *Annual Clinic Turnover (RM)* | **Substep 3.2:** Numeric currency input (Formatted with commas). | Mandatory if Substep 3.2 mounted; ceiling RM 5M. |
| **`QST-BRCH-003`** | `FLD-BRCH-003` | *Branch Clinics & Revenue Allocation* | **Substep 3.2:** Repeatable branch form with automated 100% balance validation. | Mandatory if multiple branches indicated. |
| **`QST-UW-001`** | `FLD-UW-001` | *Disciplinary Proceedings / Convictions* | **Substep 3.3:** Statutory question with 44px Yes/No segmented buttons. | Mandatory. If Yes, reveals narrative textarea. |
| **`QST-UW-002`** | `FLD-UW-002` | *Insurance Refusal / Special Terms* | **Substep 3.3:** Statutory question with 44px Yes/No segmented buttons. | Mandatory. If Yes, reveals narrative textarea. |
| **`QST-UW-003`** | `FLD-UW-003` | *Past Claims / Compensation in 5 Yrs* | **Substep 3.3:** Statutory question with 44px Yes/No segmented buttons. | Mandatory. If Yes, reveals narrative textarea. |
| **`QST-UW-004`** | `FLD-UW-004` | *Known Circumstances / Incidents* | **Substep 3.3:** Statutory question with 44px Yes/No segmented buttons. | Mandatory. If Yes, reveals narrative textarea. |
| **`QST-UW-005`** | `FLD-UW-005` | *Procedures Outside Scope* | **Substep 3.3:** Statutory question with 44px Yes/No segmented buttons. | Mandatory. If Yes, reveals narrative textarea. |
| **`QST-PAY-001`** | `FLD-PAY-001` | *Payment Method Selection* | **Stage 4:** Segmented cards for FPX Online Banking and Credit/Debit Card. | Mandatory. |

---

## 4. Class C: Approved Supporting Content (Contextual Disclosures)

| Content ID | Original Location | Legacy Content Extract | New Architectural Placement | Disclosure Pattern |
|---|---|---|---|---|
| **`HLP-QUOT-001`** | Step 2 Card Body | Explanatory paragraph describing what Medical Malpractice covers in legal detail. | Moved from inline card body to expandable drawer: `[ Policy Coverage Details ]`. | Accordion / Drawer on user request. Prevents text bloat. |
| **`HLP-QUOT-002`** | Step 2 Reinstatement | Detailed 3-paragraph explanation of Automatic Reinstatement clause. | Simplified to pill tag: `[+] Complimentary 1x Reinstatement Included`; full text in micro-tooltip `(?)`. | Hover / Tap tooltip (320px max width). |
| **`HLP-DATE-001`** | Step 1 Date Section | Explanation of why coverage must end on 31st December of current calendar year. | Accessible info icon next to fixed Expiry Date: *"All policies align with MMC calendar-year renewal."* | Inline tooltip modal (`POP-EXP-INFO`). |
| **`HLP-BRCH-001`** | Step 3 Branch Section | Paragraph explaining how branch revenue percentages affect underwriting risk. | Brief helper text under balance indicator: *"Total branch revenue must equal 100% across all locations."* | Accessible helper text (`aria-describedby`). |
| **`HLP-UW-001`** | Step 3 Underwriting | 5-line definition of what constitutes a "circumstance likely to give rise to a claim". | Expandable link under Question 4: `[ What is considered a reportable circumstance? ]`. | Inline slide-down disclosure. |

---

## 5. Class D: Redundant & Promotional Content Targeted for Retirement

| Content ID | Current Screen Location | Redundant / Superfluous Content Extract | Reason for Retirement & UX Impact |
|---|---|---|---|
| **`RET-PROM-001`** | Step 1 Top Banner | *"DoctorShield is Malaysia's most trusted, premier AI-powered doctor insurance with 100% guaranteed peace of mind!"* | Unverified promotional marketing hype. Violates Rule 5 (Calm, editorial design). Replaced by clean functional heading. |
| **`RET-FIN-001`** | Step 3 Top Header | Repeated full financial breakdown card displaying RM totals while filling personal address. | Repetitive financial clutter during form filling. Price is already accepted in Stage 2 and reviewed in Stage 4. |
| **`RET-WARN-001`** | Step 3 Everywhere | 4 redundant warning callout boxes stating *"Please ensure your NRIC is entered correctly as per IC"*. | Form noise. Handled natively via field validation and standard helper labels. |
| **`RET-ICON-001`** | Throughout Screens | Decorative medical icons (stethoscopes, syringes, heartbeat lines) beside every input field. | Visual distraction. Violates Rule 5 (Avoid decorative icons beside every heading). |
| **`RET-TIME-001`** | Step 2 Header | Large flashing red timer *"HURRY! YOUR QUOTE EXPIRES IN 09:59!"* | Artificial urgency styling. Violates Rule 9 (Avoid urgency or countdown styling). Replaced by calm price guarantee badge. |
| **`RET-FAQ-001`** | Step 1 & Step 4 Bottom | 12 generic FAQs repeated inline on both calculation and review pages. | Layout bloat. Moved to global Help modal / Support menu. |

---

## 6. End-to-End Content Traceability Audit

```
Total Registered Items in Master Inventory:
- Class A (Legally Required):     9 items   (100% Preserved Verbatim)
- Class B (Essential Questions):   23 items   (100% Preserved & Functionally Enhanced)
- Class C (Contextual Disclosures): 5 items   (Relocated to Contextual Drawers / Tooltips)
- Class D (Retired Redundancies):   6 items   (Removed for Cognitive Clarity)
----------------------------------------------------------------------------------------
Net Active Customer-Facing Items:  37 items   (0% Information Loss, 100% Compliance)
```

### Governance Verification:
1. **Statutory Verbatim Adherence:** Every single word of `DIS-CALC-001` (PIDM), `DIS-REV-001` (FSA 2013), `DIS-REV-002` (PDPA 2010), `DIS-QUOT-001` (BNM 10%), and `DIS-RETRO-001` (Clause 6.12) is preserved without any alteration.
2. **Zero Invented Copy:** No new marketing claims, legal liabilities, or fictitious insurance benefits have been introduced.
3. **Audit Trail:** Every retired element (`RET-`) has a documented justification based on usability research and visual restraint principles.

