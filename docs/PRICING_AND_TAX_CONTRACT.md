# PRICING AND TAX CONTRACT
## DoctorShield Individual Medical Professional Indemnity Portal

> **Document ID:** `DOC-CONTR-PRICING-001`  
> **Status:** Authoritative Baseline (Phase 1)  
> **Classification:** [VERIFIED] / Server-Authoritative  
> **Last Updated:** 2026-10-29  
> **Owner:** Senior Solutions Architect & Actuarial Business Analyst  
> **Core Architecture Principle:** **All premium, tax, pro-ration, and discount calculations are SERVER-AUTHORITATIVE.** The client application never computes or guesses pricing arithmetic; it acts strictly as a presentation layer for signed payloads returned by `/api/calculatePremium`.

---

## 1. Architectural Authority & Rating Pipeline

```
[User Form State: #jsQuoteForm]
           │
           ▼
[Client Serialization: form.serialize()]
           │
           ▼
[HTTP POST: /api/calculatePremium]
           │
           ▼
┌────────────────────────────────────────────────────────┐
│ SERVER UNDERWRITING RATING ENGINE                     │
│ 1. Validate classification_id & specialization         │
│ 2. Lookup base annual premium from Chubb rating matrix │
│ 3. Apply limit factor based on liability_id            │
│ 4. Compute pro-rata temporal factor (exact days / 365) │
│ 5. Validate promo_code & compute discount amount       │
│ 6. If Clinic Add-on active: compute clinic base & tier │
│ 7. If PIC Add-on active: compute PIC surcharge         │
│ 8. Compute SST (Service Tax) @ 8%                      │
│ 9. Add statutory Stamp Duty (RM 10.00 flat)            │
│ 10. Encode JSON response in Base64 payload             │
└────────────────────────────────────────────────────────┘
           │
           ▼
[Client Response Parsing: atob(response.data)]
           │
           ▼
[Presentation: Render breakdown onto Step 2 & Step 7]
```

---

## 2. API Schema Contract: `/api/calculatePremium`

### Request Payload (`application/x-www-form-urlencoded` or JSON)

| Parameter Key | Data Type | Requirement | Description / Value Domain |
|---|---|---|---|
| `classification_id` | `integer` | Required | Approved practitioner classification ID (1–26) |
| `liability_id` | `integer` | Required | Approved individual indemnity limit tier (1–8) |
| `insurance_start_date`| `string` | Required | Start date in `DD/MM/YYYY` format |
| `insurance_end_date` | `string` | Required | Calculated end date in `DD/MM/YYYY` format |
| `customer_email` | `string` | Required | Applicant contact email address |
| `promo_code` | `string` | Optional | Partner association code (e.g. `MAAM`, `APHM`) |
| `do_you_own_clinic_status_value` | `integer` | Required | `1` (Yes) or `0` (No) |
| `clinic_type_value` | `string` | Conditional | `"sole_proprietor"` or `"partnership_sdn_bhd"` |
| `employee_locum_status_value` | `integer` | Conditional | `1` (Yes) or `0` (No) |
| `pic_of_own_clinic_or_another_clinic_status_value` | `integer` | Required | `1` (Yes) or `0` (No) |
| `are_you_pic_of_any_clinic_status_value` | `integer` | Required | `1` (Yes) or `0` (No) |
| `clinic_liability_id`| `integer` | Conditional | Clinic indemnity limit tier (if clinic add-on selected) |
| `medical_establishment_package_value` | `integer` | Optional | `1` (Clinic indemnity checked) or `0` |
| `pic_coverage_enable_status_value` | `integer` | Optional | `1` (PIC personal extension checked) or `0` |
| `reinstatement_package_value` | `integer` | Optional | `1` (Automatic Reinstatement checked) or `0` |
| `specializations` | `string` | Optional | Serialized JSON array of allocation percentages from `#specializationModal` |

### Decoded Response Structure (`$.parseJSON(atob(response.data))`)

```typescript
interface CalculatePremiumResponse {
  success: boolean;
  error?: boolean;
  policy_wording_pdf: string; // URL to governing Chubb policy PDF
  data: {
    premium: {
      model: {
        country: {
          currency_code: "MYR";
          amount_sign: "RM ";
        };
      };
      calculated: {
        without_discount_premium: string; // e.g. "402.00"
        with_discount_premium: string;
        reviewPage: {
          individual: {
            standard_12_month_premium: string; // Displayed in quote note (ii)
            prorated_premium: string;          // Displayed in quote note (i)
            discount_amount: string;
            total_premium: string;             // Subtotal for individual
            without_discount_premium: string;
            individual_without_discount_reistatement_total_premium?: string;
          };
          clinic: {
            clinic_premium: string;
            clinic_discount_premium: string;
            clinic_without_discount_reistatement_total_premium?: string;
          };
          medical_establishment: {
            individual_pic_premium: string;    // Displayed in PIC summary
            clinic_liability_total_discount_premium: string;
            discount: string;
          };
          tax_summary: {
            gross_premium: string;
            sst_rate: "8%";                   // Malaysian Sales & Service Tax
            sst_amount: string;
            stamp_duty: "10.00";              // Statutory Stamp Duty (RM 10.00 flat)
            total_payable: string;            // Net payable by applicant
          };
        };
      };
    };
  };
}
```

---

## 3. Statutory Tax, Stamp Duty & Surcharge Rules

### Rule TAX-01: Malaysian Sales and Service Tax (SST)
- **Authority:** Royal Malaysian Customs Department & Bank Negara Malaysia.
- **Applicable Tax Rate:** **8%** on taxable general insurance premium.
  *(Note: Historically 6% prior to 1 March 2024, updated to 8% under current Malaysian tax law).*
- **Calculation Base:** `Gross Premium (after applicable promotional discounts)`.
- **Rounding Convention:** Half-up rounding to two decimal places (`RM 0.01`).

### Rule TAX-02: Statutory Stamp Duty
- **Authority:** Inland Revenue Board of Malaysia (LHDN) / Stamp Act 1949.
- **Duty Amount:** **RM 10.00 flat** per issued Certificate of Insurance.
- **Application Rule:** Applied once per policy transaction. Not subject to SST.

### Rule TAX-03: Total Payable Premium Formula
$$\text{Total Payable} = \left(\text{Individual Net} + \text{Clinic Net} + \text{PIC Net}\right) \times (1 + \text{SST Rate}) + \text{Stamp Duty}$$

Where:
- $\text{Individual Net} = \text{Base Rate} \times \text{Liability Factor} \times \text{Pro-Rata Factor} - \text{Discount}$
- $\text{Clinic Net} = \text{Clinic Tier Premium} \times \text{Pro-Rata Factor} - \text{Clinic Discount}$
- $\text{PIC Net} = \text{PIC Surcharge Amount}$
- $\text{SST Rate} = 0.08$ (8%)
- $\text{Stamp Duty} = \text{RM } 10.00$

---

## 4. Pro-Rata Temporal Calculation Contract

### Rule PRORATA-01: Alignment to APC Calendar Year
- **Standard Policy Period:** Under Malaysian Medical Council practice, policies align to the Annual Practicing Certificate (APC) expiry date of **31 December**.
- **Pro-Rata Formula:**
  $$\text{Pro-Rata Factor} = \frac{\text{Days from Inception to 31 December}}{365 \text{ (or 366 in leap year)}}$$
- **Minimum Premium Floor:** Server enforces an actuary-approved minimum premium floor regardless of short-period duration (verified via `#jsContactUsNegativeQuoteErrorModel` exception handler).
- **Presentation Invariant:**
  - Note (i) must state: `"This premium is pro-rated for the period [Start Date] to [End Date]"`
  - Note (ii) must state: `"For your information, the standard premium for a 12 month period will be RM [Standard 12 Month Amount]"`

---

## 5. Promotional Code & Association Discount Contract

### Rule PROMO-01: Partner Association Discount Multipliers
- **Authority:** JA Assure Affinity Partnership Agreements (e.g., Manipal Alumni Association Malaysia, Association of Private Hospitals Malaysia).
- **Execution:** Validated via `POST /api/validatePromoCode`.
- **Discount Multiplier:** Discounts typically range between 10% and 25% off the gross individual base rate.
- **Exclusions:** Promotional discounts apply strictly to the base individual malpractice premium; they do **NOT** discount the RM 10.00 statutory stamp duty.

### Rule PROMO-02: Existing Customer Promo Code Substitution
- **Server Endpoint:** `POST /api/nricPromoCodeCheck`
- **Rule Logic:**
  ```
  IF applicant_nric is registered in existing policyholder database
  AND entered_promo_code is restricted to first-time purchasers:
    SERVER REPLACES entered_promo_code WITH approved_renewal_promo_code
    SERVER RETURNS new_promocode_value
    CLIENT DISPLAYS Modal #jsNewPromocodeChangeModel:
    "Kindly note that the promo code you have used is ineligible for you as you are an existing client, 
     Nevertheless, we have replaced it with the right promo code that still ensures you enjoy the discounted premium..."
  ```

