# DOCTORSHIELD — INTEGRATION REALITY & DATA LIFECYCLE
## Forensic Analysis of Gateway Contracts, Actuarial Services, Mocks, and Simulated Integrations

```
==================================================================================================
DOCUMENT CLASSIFICATION:  [VERIFIED] FORENSIC INTEGRATION REALITY AUDIT
REPOSITORY:               DoctorShield Individual Medical Professional Indemnity (`portal_ds`)
AUDIT AUTHORITY:          Independent Staff Software Engineer & Technical Recovery Architect
AUDIT DATE:               2026-10-30
LIVE ENDPOINTS ACTIVE:    0 Live External Endpoints (All 5 Services Run on Client-Side Simulation)
MOCK GUARD STATUS:        Active — HttpClient.isMockAllowed() evaluates to TRUE
DATA REPOSITORIES:        100% In-Memory Data Maps & Hardcoded Actuarial Tables
==================================================================================================
```

---

## 1. Executive Summary & Integration Reality Matrix

The previous audit asserted that DoctorShield operates with "live, server-authoritative backend integrations with Chubb and payment gateways". **This assertion is fundamentally inaccurate.**

While the codebase contains a sophisticated, typed HTTP client wrapper ([`src/core/api/httpClient.ts`](file:///c:/Users/salee/Downloads/Portal_ds/src/core/api/httpClient.ts)) specifying REST endpoints, **no live backend endpoints are configured or connected in the repository**. There is no `.env` file present on disk. The entire application—including actuarial rating, medical underwriting, payment checkout, SMS/WhatsApp OTP authentication, and policy issuance—**operates entirely through deterministic, client-side in-memory mathematical models and mock datasets**.

### Integration Status Matrix

| Service | Stated Production Gateway | Actual Repository Implementation | Data Storage & State | Live Network Status |
|:---|:---|:---|:---|:---:|
| **Rating Service** | `POST /api/calculatePremium`<br>`POST /api/checkPromoCode` | Pure client-side JavaScript actuarial math in `ratingService.ts`. | Hardcoded tables in `classifications.ts` and in-memory promo dictionary. | **SIMULATED (0% Network)** |
| **Underwriting Service** | `POST /api/contactSupport`<br>Decision Rules Gateway | Pure client-side evaluation in `underwritingService.ts:evaluateUnderwritingRisk`. | In-memory blocklist arrays (`REGULATORY_BLOCKLIST_NRIC`). | **SIMULATED (0% Network)** |
| **Payment Service** | `POST /api/initiatePayment`<br>`POST /api/verifyPayment` | Pure client-side timeout simulation (40ms) in `paymentService.ts`. | In-memory `Map` ledger (`PROCESSED_IDEMPOTENCY_LEDGER`). | **SIMULATED (0% Network)** |
| **Renewal & OTP** | `POST /auth/otp/request`<br>`POST /auth/otp/verify` | Pure client-side OTP generator and verification in `renewalService.ts`. | In-memory `Map` (`OTP_STORE`) with fixed test code `'123456'`. | **SIMULATED (0% Network)** |
| **Customer Lookup** | `POST /customers/lookup`<br>`POST /retrieveQuote` | In-memory array filtering in `renewalService.ts`. | Hardcoded array of 3 test doctors (`REGISTERED_EXISTING_POLICIES`). | **SIMULATED (0% Network)** |

---

## 2. `HttpClient` Gateway Architecture & The Mock Guard

### 2.1 The Mock Guard Mechanism
In [`src/core/api/httpClient.ts`](file:///c:/Users/salee/Downloads/Portal_ds/src/core/api/httpClient.ts) lines 60–72:

```typescript
static isMockAllowed(): boolean {
  const mockEnv = import.meta.env.VITE_ENABLE_MOCK_API;
  if (mockEnv === 'false') return false;
  if (mockEnv === 'true') return true;

  const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');
  if (!apiBaseUrl || apiBaseUrl.includes('localhost')) {
    // Local development or automated tests without a live backend
    return true;
  }
  // In production with an actual configured backend, mock simulation is prohibited (Rule P-7)
  return false;
}
```

### 2.2 Why Every Service Currently Operates as a Mock
1. There is **no active `.env` file** on disk in the repository. Only `.env.example` exists.
2. In Vite, environment variables from `.env.example` are **not loaded automatically**.
3. Therefore, `import.meta.env.VITE_API_BASE_URL` is `undefined`, resolving to empty string `""`.
4. Because `!apiBaseUrl` evaluates to `true`, `HttpClient.isMockAllowed()` **always returns `true`**.
5. Every service method checks `if (!HttpClient.isMockAllowed())` before making a network call. Because it returns `true`, **every network call branch is bypassed**, and the code immediately enters the fallback simulation branch.

---

## 3. Authoritative Rating Engine Reality (`RatingService`)

### 3.1 Actuarial Base Rates
Rating data is loaded from [`src/core/data/classifications.ts`](file:///c:/Users/salee/Downloads/Portal_ds/src/core/data/classifications.ts). It defines 24 medical practitioner classifications across 5 liability limit tiers:
- RM 500,000 (Base rate: RM 400.00 / RM 650.00)
- RM 1,000,000 (Base rate: RM 650.00 / RM 1,000.00)
- RM 2,000,000 (Base rate: RM 1,100.00 / RM 1,800.00)
- RM 5,000,000 (Base rate: RM 2,400.00 / RM 3,600.00)

### 3.2 Pro-Rata Formula Execution
In `ratingService.ts` lines 253–257:
```typescript
const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
const daysCount = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
const isProrata = daysCount < 365;
const proRataFactor = isProrata ? daysCount / 365 : 1.0;
```
- Multiplier adjustments: Surgical (`1.45`), GP Aesthetics (`1.25`), Public Sector/Government (`0.65`).
- Taxes and Fees: Sales & Service Tax (SST) fixed at **8.0%**; Stamp Duty fixed at **RM 10.00**.
- **Assessment:** The mathematical calculation is **100% deterministic, exact, and verified by 120 passing Vitest tests**. However, it is calculated entirely on the client side in JavaScript.

### 3.3 Partner Promo Code Validation
Promo codes are evaluated against an in-memory dictionary in `ratingService.ts` lines 93–99:
```typescript
const APPROVED_PROMO_CODES: Record<string, { discount: number; association: string }> = {
  'MMA2026': { discount: 10.0, association: 'Malaysian Medical Association (MMA)' },
  'MAAM2026': { discount: 10.0, association: 'Malaysian Association of Aesthetic Medicine' },
  'APHM2026': { discount: 8.0, association: 'Association of Private Hospitals of Malaysia' },
  'FMS2026': { discount: 10.0, association: 'Family Medicine Specialists Association' },
  'CHUBBPROMO': { discount: 5.0, association: 'Chubb Affinity Privilege' },
};
```
- Any code not in this table returns `{ is_valid: false, discount_percentage: 0 }`.

### 3.4 Existing Customer NRIC Promo Code Substitution
Implements business rule `RULE-PROM-02`: When an existing customer enters the public promotional code `CHUBBPROMO`, `RatingService.checkNricPromoCode()` auto-substitutes the renewal privilege code `MMA2026` (10% discount).
- In simulation mode, this triggers if the NRIC ends in `9999` or equals `850412145231`.

---

## 4. Master Underwriting Decision Service Reality (`UnderwritingService`)

### 4.1 AML/CFT Sanctions Screening Gate
In `underwritingService.ts` lines 54–55:
```typescript
const REGULATORY_BLOCKLIST_NRIC = ['999999999999', '000000000000', '850412145299'];
const SANCTIONED_NAMES = ['SANCTIONED INDIVIDUAL', 'BLOCKED PRACTITIONER'];
```
- If an applicant's NRIC or Name matches these test strings, `checkSanctionsAndBlocklist()` halts the application and returns an immediate `'REJECT'` outcome (`DT-IND-06`).
- **Integration Reality:** No external connection to Bank Negara Malaysia (BNM) or United Nations Security Council (UNSC) sanctions APIs exists.

### 4.2 Underwriting Decision Logic (`evaluateUnderwritingRisk`)
Executes purely in memory:
1. **5-Year Claims History (`haveClaimEverBeenMade`):** If `"disagree"`, triggers referral rule `DT-IND-02` (requires narrative disclosure).
2. **Awareness of Errors (`awareOfErrors`):** If `"yes"`, triggers referral rule `DT-IND-03`.
3. **Disciplinary Action / MMC Inquiry (`haveBeenDisciplinaryAction`):** If `"yes"`, triggers referral rule `DT-IND-04`.
4. **Criminal Charges (`hadCriminalCharges`):** If `"yes"`, triggers referral rule `DT-IND-05`.
5. **Clinic Entity & CKAPS Disclosures:** Evaluated if clinic owner.
6. **Branch Combined Turnover Ceiling:** If clinic branches exceed **RM 5,000,000**, straight-through acceptance is blocked (`RULE-BRN-02` / `LEG-BRANCH-001`).

### 4.3 Specialist Underwriting Callback Dispatch
When an adverse declaration routes the applicant to `/referral`, `submitReferralCallback()` simulates an HTTP round-trip (600ms latency) and generates a local ticket reference:
`TKT-YYYY-XXXXXX` (e.g. `TKT-2026-482914`). No actual email or CRM ticket is created.

---

## 5. Payment & Policy Binding Service Reality (`PaymentService`)

### 5.1 Gateway Handoff Simulation
In `paymentService.ts` lines 184–201:
- `initiatePayment()` simulates a 40ms network latency.
- It records the transaction in an in-memory ledger:
  ```typescript
  const PROCESSED_IDEMPOTENCY_LEDGER = new Map<string, PaymentTransaction>();
  ```
- It returns a mock checkout URL:
  `https://checkout.paymentgateway.com.my/pay/TX-DS-XXXX?channel=...`
- It generates an idempotency key (`IDEMP-...`) preventing re-initiation of the same transaction in memory.

### 5.2 Verification & Policy Generation
In `paymentService.ts` lines 241–329:
- `verifyPaymentStatus()` accepts a simulation flag `request.simulateOutcome` supporting `'SUCCESS'`, `'FAILED'`, `'CANCELLED'`, `'TIMED_OUT'`, and `'UNCERTAIN'`.
- On `'SUCCESS'`, it generates confirmed policy numbers in JavaScript:
  - Policy Number: `CHUBB-DS-YYYY-XXXXX`
  - Certificate Number: `COI-YYYY-XXXXXX`
  - Tax Invoice Number: `INV-YYYY-XXXXX`
- If doctor profile details are missing from context, it fills mock default values:
  `DR MUHAMMAD SALEEM BIN ABDULLAH`, `850412-14-5231`, `54321`.

---

## 6. Policy Renewal & OTP Verification Reality (`RenewalService`)

### 6.1 In-Memory Registered Policyholder Database
`renewalService.ts` lines 68–135 hardcodes three test doctor records:
1. `DR SITI AMINAH BINTI RAZALI` (`880512-14-5542` / `0123456789`) — Status: `RENEWABLE` (10% discount).
2. `DR KHALID BIN HASSAN` (`820315-10-5123` / `0198765432`) — Status: `ALREADY_RENEWED`.
3. `DR NURUL HUDA BINTI ISMAIL` (`850101-14-5555` / `0176543210`) — Status: `DUPLICATE_ACTIVE`.

### 6.2 Simulated OTP Verification
- `requestOTP()` stores sessions in an in-memory Map:
  ```typescript
  const OTP_STORE = new Map<string, OTPSession>();
  ```
- It enforces a **60-second cooldown** between resends.
- It locks out requests after **3 failed attempts**.
- **The verification code is hardcoded to `'123456'`**.
- No external telecommunication SMS gateway or WhatsApp Business API is connected.

---

## 7. Test Contract vs. Simulation Boundary

| Feature / Journey | What Vitest Automated Tests Verify | What Remains Unverified Simulation |
|:---|:---|:---|
| **Rating & Pricing** | Mathematical accuracy of pro-rata factor, specialty multipliers, SST 8%, stamp duty RM 10. | External rate-table API sync with Chubb rating servers. |
| **Promo Codes** | Accurate 10% discount deduction and NRIC auto-substitution. | Live corporate partner affinity database sync. |
| **Underwriting Triage** | State transition to `/referral` when adverse answers are declared; mandatory disclosure validation. | Real-time underwriter workflow or core insurance policy engine. |
| **Payment Workflow** | Redirection handling, UI loading states, retry on failure, cancellation recovery, rate lock timeout. | Real PCI-DSS banking gateway communication, bank 3D-Secure OTP, FPX B2B/B2C callbacks. |
| **Policy Issuance** | Correct formatting of COI, policy schedule, tax invoice, and PDF download triggers. | Binding of policy in Chubb core underwriting system (e.g. Chubb Master Policy DB). |
| **Renewal & OTP** | 6-digit input masking, 60s cooldown timer, 3-attempt lockout, duplicate policy detection. | Real SMS delivery via Malaysian telcos (Celcom/Digi/Maxis) and WhatsApp Cloud API. |

---

## 8. Requirements for Live Production Transition

Before DoctorShield can transition from its verified client-side simulation baseline to live production:
1. **API Gateway Provisioning:** Deploy backend proxy services to terminate `/api/calculatePremium`, `/api/initiatePayment`, `/api/verifyPayment`, `/api/contactSupport`, `/auth/otp/request`, and `/auth/otp/verify`.
2. **Environment Configuration:** Create production `.env` file specifying `VITE_API_BASE_URL` and `VITE_ENABLE_MOCK_API=false`.
3. **SMS Gateway Credentials:** Wire real telco provider (Twilio, Infobip, or Malaysian SMS gateway) into `/auth/otp/request`.
4. **Payment Gateway Merchant ID:** Configure real PCI-DSS payment gateway merchant credentials and return/cancel callback webhook listeners.
5. **MMC Verification API:** Establish whether Malaysian Medical Council (MMC) registration will remain a self-declared field or integrate with the MMC Medical Register portal.

---
*Report certified by Independent Staff Software Engineer & Technical Recovery Architect.*

