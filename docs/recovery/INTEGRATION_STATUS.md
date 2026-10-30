# DOCTORSHIELD — INTEGRATION STATUS & API REALITY REPORT
## Phase 00 — Safe Baseline & Repository Verification

```
==================================================================================================
DOCUMENT CLASSIFICATION:  [AUTHORITATIVE] INTEGRATION & BACKEND REALITY REPORT
GOVERNING SPECIFICATION:  DoctorShield Master Agent Rules V3 (Section 4 — Insurance Protection)
CORE GATEWAY HOST:        https://my-individualindemnity.doctorshield.com/api/*
CHECKOUT GATEWAY HOST:    https://checkout.paymentgateway.com.my
CURRENT OPERATING MODE:   DETERMINISTIC LOCAL SIMULATION (MOCK GUARD ACTIVE)
LIVE CONTRACT STATUS:     DOCUMENTED CONTRACT READY | NO UNVERIFIED LIVE TRANSACTIONS
==================================================================================================
```

---

## 1. Executive Integration Statement

In strict compliance with **DoctorShield Master Agent Rules V3 (Section 4 — Mandatory Insurance Protection)**:
> *"Never claim a backend integration is live without evidence.*  
> *Treat existing local pricing simulations as simulations until authoritative integration is independently verified.*  
> *Do not trigger real insurance transactions, payments, notifications or OTPs during development without explicit authorization."*

This document provides a factual assessment of every service integration, distinguishing live network clients from deterministic local simulations.

---

## 2. Service Integration Reality Matrix

| Service Module | Source File | Operating Mode | Authoritative Network Contract | Local Simulation Mechanism |
| :--- | :--- | :--- | :--- | :--- |
| **HTTP Gateway Client** | `src/core/api/httpClient.ts` | **Hybrid Gateway** | `POST https://my-individualindemnity.doctorshield.com/api/*` | Detects empty or `localhost` `VITE_API_BASE_URL` and activates mock fallback via `HttpClient.isMockAllowed()`. |
| **Actuarial Rating Service** | `src/core/api/ratingService.ts` | **Deterministic Simulation** | `/api/v1/rating/calculate-premium` | Implements 100% of Chubb's actuarial table and pro-rata fraction formulas locally. |
| **Underwriting Risk Engine** | `src/core/api/underwritingService.ts` | **Deterministic Simulation** | `/api/v1/underwriting/evaluate` | Evaluates statutory health declarations (Q1-Q5) and AML/CFT sanctions lists locally. |
| **Payment & Policy Binding** | `src/core/api/paymentService.ts` | **Simulated PCI-DSS Gateway** | `/api/v1/payment/checkout` & Webhooks | Generates cryptographic transaction tokens (`TXN-...`) and simulated policy certificate PDF hand-off. |
| **Policy Renewal & OTP** | `src/core/api/renewalService.ts` | **Simulated SMS / WhatsApp** | `/api/v1/renewal/lookup` & `/request-otp` | Delivers simulated 6-digit OTPs with active 60-second cooldown timer. |
| **Quote Retrieval Service** | `src/core/api/ratingService.ts` | **Session Storage Simulation** | `/api/v1/quotes/retrieve` | Stores and retrieves saved quotations via browser `sessionStorage` and local state. |

---

## 3. High-Fidelity Simulation Details

### 3.1 Actuarial Rating Service (`RatingService.calculatePremium`)
- **Actuarial Fidelity:** Calculates exact premiums for all 20 medical classifications and 7 liability tiers (`RM 500k` to `RM 10M`).
- **Calendar Pro-Rata Math:**
  $$\text{Fraction} = \frac{\text{Days Remaining in Calendar Year} + 1}{365}$$
  - Full-year policy: Multiplier $= 1.0$.
  - Mid-year policy: Exact day count co-terminating on 31st December.
- **Tax & Statutory Additions:**
  - Sales & Services Tax: Exactly $8.00\%$ on net gross premium.
  - Inland Revenue Stamp Duty: Flat $\text{RM } 10.00$ statutory fee.
- **Partner Discounts:** 10% direct distribution rebate / MMA promotional code (`MMA2026`).

### 3.2 Underwriting Risk Decision Tree (`UnderwritingService.evaluateRisk`)
- **Clean Declaration (Direct Bind):** All 5 health/claims questions answered "NO" $\rightarrow$ Direct online bind permitted.
- **Adverse Declaration (Support Referral):** Any question answered "YES" $\rightarrow$ Halts automated checkout, generates referral case number (`REF-...`), and routes to relationship manager callback form.
- **AML/CFT Sanctions Gate:** Intercepts blacklisted NRICs (`900101-14-9999`) and immediately halts progress with an AML alert (`DT-IND-06`).

### 3.3 Payment Gateway & Checkout (`PaymentService.initiatePayment`)
- **PCI-DSS SAQ-A Architecture:** The application never collects, transmits, or stores raw Primary Account Numbers (PAN) or CVV codes.
- **Checkout Hand-off:** Simulates external gateway modal with 15-minute expiration countdown.
- **Outcome Reconciliation:** Handles simulated `SUCCESS`, `FAILED` (with non-destructive retry preserving applicant review state), and `CANCELLED` scenarios.

### 3.4 Policy Renewal & Multi-Channel OTP (`RenewalService`)
- **Lookup:** Verifies existing policyholders by NRIC and policy number.
- **Multi-Channel OTP:** Delivers OTPs via SMS by default with option to switch to WhatsApp after 60-second cooldown.
- **Rate-Limiting:** Enforces max 3 failed OTP attempts before temporary lockout.

---

## 4. Production Integration Transition Readiness

The frontend architecture is fully prepared for live backend connectivity without requiring structural refactoring:
1. **Endpoint Alignment:** Method signatures and JSON payload envelopes in `src/core/api/` match `docs/API_CONTRACTS.md` verbatim.
2. **Idempotency Headers:** Automatic `Idempotency-Key` UUID generation is already wired into every state-mutating request.
3. **Problem Details Error Handling:** Strict RFC 7807 parsing is implemented in `HttpClient.ts`.
4. **Environment Switch:** Connecting to the live API requires only setting `VITE_API_BASE_URL=https://my-individualindemnity.doctorshield.com/api` and `VITE_ENABLE_MOCK_API=false`.

Until explicit corporate authorization and staging credentials are provided, the application safely operates in deterministic simulation mode.

