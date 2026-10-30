# DoctorShield Individual Indemnity — Screen-by-Screen Information Hierarchy

> **Document Reference:** `DOC-ARCH-SCR-HIERARCHY-2026-10-29`  
> **Status:** UI Structural Blueprint Baseline  
> **Author:** Principal UX Architect & Design Systems Lead  
> **Rule:** Wireframe-level specifications utilizing **APPROVED EXISTING CONTENT ONLY**. Zero newly invented marketing text. Enforces Gestalt proximity, clean typographic scales, and flat layout discipline.

---

## 1. Global Application Shell & Layout System

### 1.1 Desktop Layout Architecture (≥1024px)
```
+──────────────────────────────────────────────────────────────────────────────────────────+
|  [BrandHeader] DoctorShield · Medical Professional Indemnity      Renew | Search | Docs  |
+──────────────────────────────────────────────────────────────────────────────────────────+
|  [InsuranceStepProgress] 1. Coverage ──── 2. Quotation ──── 3. Details ──── 4. Checkout  |
+────────────────────────────────────────────────────────┬─────────────────────────────────+
|                                                        |                                 |
|  MAIN ACTION CANVAS (70% Column)                       |  STICKY SIDEBAR (30% Column)    |
|                                                        |                                 |
|  [H1 Stage Primary Purpose]                            |  [Total Payable: RM XXX.XX]     |
|                                                        |                                 |
|  [Section 1: Primary Selection Group]                  |  • Base Premium:    RM XXX.XX   |
|  (Dividers used instead of nested cards)               |  • Pro-rata Adj:    -RM XX.XX   |
|                                                        |  • Add-ons Total:    RM  0.00   |
|  [Section 2: Conditional Options]                      |  • SST (8%):         RM XX.XX   |
|  (Clean progressive disclosure)                        |  • Stamp Duty:       RM 10.00   |
|                                                        |  ─────────────────────────────  |
|  [Section 3: Disclosures & Legal Checkbox]             |  • Total:           RM XXX.XX   |
|                                                        |                                 |
|  [Action Bar: Primary Action + Secondary Links]        |  [Security & Regulatory Badges] |
|                                                        |                                 |
+────────────────────────────────────────────────────────┴─────────────────────────────────+
|  [AppFooter] Chubb Insurance Malaysia Berhad · PIDM Protection · Privacy Policy          |
+──────────────────────────────────────────────────────────────────────────────────────────+
```

### 1.2 Mobile Layout Architecture (390px Width)
```
+─────────────────────────────────────────+ 0 px
| DoctorShield                [Menu ≡]    | 48 px (Slim Header)
+─────────────────────────────────────────+ 48 px
| Stage 1 of 4 · Coverage       [===    ] | 24 px (1-Line Stepper)
+─────────────────────────────────────────+ 72 px
|                                         |
|  MAIN CONTENT CANVAS (Single Column)    |
|  • 100% visible inputs                  |
|  • Full-width 44px touch targets        |
|  • No nested card paddings              |
|                                         |
|                                         |
+─────────────────────────────────────────+ Viewport - 44 px
| Total: RM 1,234.56     [Breakdown ▾]    | 44 px (Docked Floating Bar)
+─────────────────────────────────────────+ Bottom of Viewport
```

---

## 2. Screen-by-Screen Structural Wireframes

---

### Screen 1: Coverage Configuration & Instant Quote (`/buy/coverage`)

```
============================================================================================
SCREEN 01: COVERAGE CONFIGURATION (`/buy/coverage`)
============================================================================================

[H1] Select Your Professional Coverage

─── 1. PROFESSIONAL CATEGORY ───────────────────────────────────────────────────────────────
Label: Classification *
[ Select Medical or Dental Classification                      ▼ ]
(23 approved classifications populated directly from underwriting catalog)

(If Aesthetic Classification #20 selected: Smooth inline prompt)
[ ! Specialization Allocation Required: Current: 0% -> [Allocate Percentages] ]

─── 2. LIMIT OF LIABILITY ──────────────────────────────────────────────────────────────────
Label: Limit Of Liability (Any One Claim & Aggregate) *
(Horizontal segmented radio strip; single selection)
[ RM 1,000,000 (Recommended) ]  [ RM 2,000,000 ]  [ RM 3,000,000 ]  [ RM 5,000,000 ]

─── 3. COVERAGE PERIOD ─────────────────────────────────────────────────────────────────────
[ Coverage Inception Date *     ]      [ Coverage Expiry Date (Fixed)   ]
[ 29/10/2026                 📅 ]      [ 31/12/2026                   🔒 ]
(Helper: Inception date defaults to today. Policy co-terminates on 31 December)

─── 4. CONTACT & PROMOTION ─────────────────────────────────────────────────────────────────
Label: Practitioner Email Address *
[ doctor@clinic.com.my                                          ]

[ + Have a promotional code? ]  <-- (Click reveals input inline)

─── 5. STATUTORY ACKNOWLEDGMENT ────────────────────────────────────────────────────────────
"The benefit(s) payable under eligible certificate/ policy/ product is(are) protected by 
PIDM up to limits. Please refer to PIDM’s TIPS Brochure or contact Chubb Insurance Malaysia 
Berhad or PIDM (visit www.pidm.gov.my)."

[X] I have read, understood and agree to the terms and conditions, privacy policy and I meet 
    all local regulation to practice my profession. *

[ GENERATE QUOTATION ]  <-- (Primary CTA, 44px solid navy button)
```

---

### Screen 2: Quotation Breakdown & Practice Extensions (`/buy/quote`)

```
============================================================================================
SCREEN 02: QUOTATION & PRACTICE EXTENSIONS (`/buy/quote`)
============================================================================================

[H1] Quotation

─── INDICATIVE PREMIUM SUMMARY ─────────────────────────────────────────────────────────────
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│  Indemnity Premium: RM 1,234.56 (Inclusive of SST & Stamp Duty)                          │
│  Pro-rated for 29 Oct 2026 to 31 Dec 2026 · Standard 12-Month Annual Equivalent: RM 1,500│
│  ✓ Complimentary Automatic Reinstatement Included                                        │
│  Quote valid until 31 Dec 2026                                                           │
└──────────────────────────────────────────────────────────────────────────────────────────┘

─── PRACTICE ENTITY PROTECTIONS (OPTIONAL) ─────────────────────────────────────────────────
Question: Do you own a clinic?
[ ( ) Yes ]     [ (●) No ]

(If User Selects 'Yes': Clean progressive reveal below)
│
├── Question: Is it a Sole proprietor or partnership / sdn bhd?
│   [ Sole Proprietor ]     [ Partnership / Sdn Bhd ]
│
├── Question: Do you hire locums who sees new patients on their own?
│   [ Yes ]     [ No ]
│
└── [ ] Add This Recommended Coverage: Clinic Entity Protection
        Provides entity defense for claims made directly against your private practice.
        Select Clinic Limit:  [ RM 1,000,000 ]  [ RM 2,000,000 ]  [ RM 5,000,000 ]
        Premium: +RM 650.00/yr (Pro-rated: +RM 114.25)
        [ Why is this recommended? ] (Opens modal rationale)

─── PERSON-IN-CHARGE (PIC) EXTENSION ───────────────────────────────────────────────────────
Question: Are you a Person-In-Charge (PIC) for any clinic?
[ ( ) Yes ]     [ (●) No ]

(If User Selects 'Yes': Clean progressive reveal below)
│
└── [ ] Buy PIC coverage
        Protects statutory liability under Private Healthcare Facilities & Services Act.
        Premium: +RM 300.00/yr (Pro-rated: +RM 52.60)
        [ Why is this recommended? ] (Opens modal rationale)

─── ACTION BAR ─────────────────────────────────────────────────────────────────────────────
[ PROCEED TO PERSONAL DETAILS ]      [ Email Quote (PDF) ]      [ << Back ]
(Primary Action, 44px navy)          (Secondary outline button) (Terse text link)
```

---

### Screen 3: Practitioner Details & Underwriting (`/buy/underwrite`)

```
============================================================================================
SCREEN 03: PRACTITIONER DETAILS & UNDERWRITING (`/buy/underwrite`)
============================================================================================

[H1] Personal Particulars

─── SECTION 3A: PRACTITIONER IDENTITY ──────────────────────────────────────────────────────
[ Salutation *  ]  [ Full Name as per IC *                                                 ]
[ Dr.         ▼ ]  [ Dr. Adam bin Malik                                                    ]

[ NRIC Number *          ]  [ Date of Birth * ]  [ Gender *  ]  [ Nationality *            ]
[ 850101-14-5231         ]  [ 01/01/1985      ]  [ Male    ▼ ]  [ Malaysian              ▼ ]

[ Malaysian Medical Council (MMC) Number * ]  [ Mobile Phone Number *                      ]
[ MMC 48291                                ]  [ +60 12-345 6789                            ]

─── SECTION 3B: PRACTICE PREMISES & BRANCHES ───────────────────────────────────────────────
[ Practice / Clinic Name *                                                                 ]
[ Klinik Perubatan Sentosa                                                                 ]

[ Address Line 1 *                                                                         ]
[ No. 12, Jalan Telawi 3, Bangsar Baru                                                     ]

[ Postcode * ]  [ City *        ]  [ State *                ]  [ Annual Revenue Tier *     ]
[ 59100      ]  [ Kuala Lumpur  ]  [ Wilayah Persekutuan  ▼ ]  [ Less than RM 1,000,000  ▼ ]

(If Clinic Entity Add-on Active in Stage 2: Clean Branch Table renders here)
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│ Additional Clinic Branches (Optional, Max 4 Branches)                                    │
│ Note: Offer is only available for branches with less than a total revenue of RM 5,000,000│
│                                                                                          │
│ [No additional branches registered]                                                      │
│ [ + Add Clinic / Branch ]                                                                │
└──────────────────────────────────────────────────────────────────────────────────────────┘

─── SECTION 3C: STATUTORY UNDERWRITING DECLARATIONS ────────────────────────────────────────
1. I agree that No claim have ever been made or lawsuits been brought against me.
   [ (●) Agree ]     [ ( ) Disagree ]
   (If Disagree: Smoothly expands clean slate explanation textarea: "Please provide details...")

2. Are you aware of any errors, omissions, offences, circumstances or allegations which 
   might result in a claim being made against you?
   [ ( ) Yes ]       [ (●) No ]

3. Have you ever been the subject of disciplinary action or investigation by any authority 
   or regulator or professional body?
   [ ( ) Yes ]       [ (●) No ]

4. Have you ever been the subject of a criminal investigation or had criminial charges 
   brought against you?
   [ ( ) Yes ]       [ (●) No ]

(If Clinic Entity Add-on Active: Clinic declarations 1-4 render in identical clean format)

[ ▶ COVID-19 Health & Facility Questions (25 Questions) ▾ ] (Collapsed accordion module)

─── STATUTORY CONSENT & SUBMISSION ─────────────────────────────────────────────────────────
[X] By proceeding, you agree that you have complied with all local regulations pertaining to 
    your profession and you have further agreed that you have read, understood and accepted 
    to the Declaration and Authorization, Policy Wording, Privacy Policy and Product 
    Disclosure Sheet for this product. *

[ Important Notices to the Applicants ] (Opens statutory duty of disclosure modal)

[ PROCEED TO REVIEW ]      [ << Back ]
```

---

### Screen 4: Review, Declarations & Checkout (`/buy/review`)

```
============================================================================================
SCREEN 04: REVIEW & SECURE CHECKOUT (`/buy/review`)
============================================================================================

[H1] Review & Payment

┌── MAIN FORM COLUMN (70%) ──────────────────┐  ┌── STICKY SIDEBAR (30%) ──────────────────┐
│                                            │  │                                          │
│  ─── POLICY & APPLICANT SUMMARY ─────────  │  │  TOTAL PAYABLE                           │
│  Insured: Dr. Adam bin Malik (MMC 48291)   │  │  RM 1,234.56                             │
│  NRIC:    850101-14-5231                   │  │                                          │
│  Period:  29 Oct 2026 to 31 Dec 2026       │  │  ─── PREMIUM BREAKDOWN ────────────────  │
│  Limit:   RM 1,000,000 (Any One Claim)     │  │  • Gross Base Premium:       RM 1,400.00 │
│  Add-ons: None Selected                    │  │  • Pro-rata Adjustment:       -RM 285.75 │
│  [ Edit Particulars ]                      │  │  • Add-ons Surcharge:            RM 0.00 │
│                                            │  │  • Discount (Promo):          -RM 111.42 │
│  ─── SELECT PAYMENT METHOD ──────────────  │  │  • Nett Premium:             RM 1,002.83 │
│  Choose a payment option below:            │  │  • Service Tax (SST 8%):        RM 80.23 │
│  [ (●) Online Banking (FPX) ]              │  │  • Stamp Duty:                  RM 10.00 │
│  [ ( ) Credit / Debit Card (Visa/Master) ] │  │  ─────────────────────────────────────── │
│  [ ( ) E-Wallet (Boost / GrabPay) ]        │  │  TOTAL PAYABLE:              RM 1,093.06 │
│                                            │  │                                          │
│  ─── REGULATORY STATUTORY NOTICES ───────  │  │  [ PAY RM 1,093.06 ]                     │
│  "In accordance with Section 130 of the    │  │  (Primary CTA triggers payment gateway)  │
│  Financial Services Act 2013, JA Assure    │  │                                          │
│  receives a commission of up to 15%..."    │  │  🔒 256-Bit SSL Encrypted Checkout       │
│                                            │  │  Underwritten by Chubb Insurance Malaysia│
└────────────────────────────────────────────┘  └──────────────────────────────────────────┘
```

---

### Screen 5: Policy Issuance & Confirmation (`/buy/complete`)

```
============================================================================================
SCREEN 05: POLICY ISSUANCE & CONFIRMATION (`/buy/complete`)
============================================================================================

[H1] Policy Issued Successfully

┌──────────────────────────────────────────────────────────────────────────────────────────┐
│  POLICY NUMBER: DS-2026-849201                            [ 📋 Copy Policy Number ]      │
│  Insured: Dr. Adam bin Malik (MMC 48291) · Effective: 29 Oct 2026 to 31 Dec 2026        │
└──────────────────────────────────────────────────────────────────────────────────────────┘

─── OFFICIAL POLICY DOCUMENTS ──────────────────────────────────────────────────────────────
Instant download for your records and Malaysian Medical Council (MMC) APC submission:

[ 📄 Certificate of Insurance (PDF) ]   [ 📄 Official Tax Invoice ]   [ 📄 Policy Wording ]
(data-testid="download-coi-btn")         (data-testid="download-invoice") (data-testid="download-schedule")

─── NEXT STEPS FOR PRACTICING CERTIFICATE (APC) RENEWAL ────────────────────────────────────
1. Download your Certificate of Insurance (COI) using the button above.
2. Log in to the Medical Register Information and Technical System (MeRITS) at merits.mmc.gov.my.
3. Upload your DoctorShield COI under the Professional Indemnity Insurance verification section.
4. Complete your Annual Practising Certificate application.

[ Return to Portal Home ]  (data-testid="return-home-btn")
```

---

### Referral Terminal Screen (`/referral`)

```
============================================================================================
REFERRAL TERMINAL SCREEN (`/referral`)
============================================================================================

[H1] Underwriting Review Required

┌──────────────────────────────────────────────────────────────────────────────────────────┐
│  Notice: Based on the declaration responses provided, your application requires manual   │
│  review by our senior medical underwriting team before coverage can be bound.            │
└──────────────────────────────────────────────────────────────────────────────────────────┘

Question: We require additional information to process your application. May our relationship 
manager contact you at the mobile number provided?

[ (●) Yes, Please Call Me ]     [ ( ) No, Exit Application ]

(If Yes Selected: Callback Form Renders Inline)
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│  RELATIONSHIP MANAGER CALLBACK REQUEST                                                   │
│                                                                                          │
│  [ Full Name: Dr. Adam bin Malik          ]  [ Clinic Name: Klinik Sentosa             ] │
│  [ Mobile: +60 12-345 6789                ]  [ Email: doctor@sentosa.com.my            ] │
│                                                                                          │
│  [ SUBMIT CALLBACK REQUEST ]                                                             │
└──────────────────────────────────────────────────────────────────────────────────────────┘

Support Office Direct Contact:
Telephone: +60 3-2716 6800  |  Email: mmi@ja-assure.com  |  WhatsApp: +60 12-536 0700
```

