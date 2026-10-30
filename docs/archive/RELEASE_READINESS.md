# DoctorShield Individual Indemnity — Release Readiness & Governance Report

> **Document Reference:** `DOC-QA-RELEASE-2026-10-29`  
> **Evaluation Date:** 2026-10-29  
> **Target Release:** DoctorShield Individual Indemnity 2.0  
> **Governance Classification:** `[VERIFIED]` Build Ready / `[UNVERIFIED]` Production Gate Hold  
> **Auditors:** Staff Systems Engineer, Principal Security Architect, QA Lead, SRE Lead  

---

## 1. Executive Summary & Regulatory Governance Statement

> [!IMPORTANT]
> **Strict Adherence to Absolute Prohibitions (Rule P-7 & Rule P-9):**  
> Under repository rules P-7 and P-9, **this document makes a rigorous and inviolable distinction between Technical Codebase Readiness and Business/Regulatory Production Authorization**. While the client-side single-page application and its integration abstraction layer are completely engineered, tested, hardened, and visually verified, **production deployment to live customer traffic cannot proceed until the formal external blocker items in Section 6 are signed off by Chubb Insurance Malaysia Berhad and JA Assure Sdn Bhd**.

---

## 2. Technical Codebase Readiness Audit

### 2.1 Automated Test Verification
The automated test suite achieves **100% pass rate** across all core application stages, security boundaries, and end-to-end user journeys:

| Test Suite File | Domain / Scope | Tests Run | Result | Duration |
|---|---|---|---|---|
| `security_and_reliability.test.tsx` | XSS, PII Masking, Idempotency, RFC 7807, Mock Guard | 17 | **17 PASSED** | 0.18 s |
| `components.test.tsx` | UI Primitives, Buttons, Inputs, Dialogs | 7 | **7 PASSED** | 0.72 s |
| `secondary_features.test.tsx` | Renewal Hub, OTP Verification, Rate Locks, Retrievals | 11 | **11 PASSED** | 1.66 s |
| `shell.test.tsx` | App Shell, Header, Footer, LiveAnnouncer, ErrorBoundary | 7 | **7 PASSED** | 2.08 s |
| `stage1.test.tsx` | Coverage Form, Date Eligibility, Promo Codes, Allocations | 9 | **9 PASSED** | 3.07 s |
| `stage2.test.tsx` | Quote Calculation, Clinic & PIC Add-ons, Recalculations | 8 | **8 PASSED** | 2.41 s |
| `stage3.test.tsx` | NRIC Parsing, Practice Details, Branches, Underwriting | 11 | **11 PASSED** | 8.31 s |
| `stage4.test.tsx` | Review Tables, Consents, Rate Lock, Payment Flow | 10 | **10 PASSED** | 3.33 s |
| `e2e_scenarios.test.tsx` | 6 Comprehensive End-to-End User Journeys | 6 | **6 PASSED** | 3.10 s |
| **TOTAL** | **Full Application Test Suite** | **86** | **86 PASSED (100%)** | **10.78 s** |

### 2.2 Production Build & Bundle Metrics
Compiled using Vite 8.3 with zero compilation warnings:
- `dist/index.html`: **1.63 kB** (gzip: 0.73 kB)
- `dist/assets/index-C0Em1Koo.css`: **9.64 kB** (gzip: 2.30 kB)
- `dist/assets/index-DmGm0h7o.js`: **683.94 kB** (gzip: 158.54 kB)
- **Time to Interactive (TTI) Target:** < 1.2 s on 4G networks.
- **First Contentful Paint (FCP) Target:** < 0.8 s.

---

## 3. Security & Operational Hardening Verification

1. **XSS & Input Sanitization:**
   - Every text input in Stage 1, Stage 3, and support modals is sanitized via `InputSanitizer.sanitizeText(input, maxLen)`, stripping HTML tags and control characters before updating state or sending to backend APIs.
2. **PII & Data Protection (PDPA 2010):**
   - NRIC numbers and phone numbers are masked in UI presentation (`XXXXXX-XX-5231`, `012-***6789`).
   - Session storage only persists workflow state; no sensitive payment card details or unmasked NRICs are written to localStorage or exposed in URL query parameters.
3. **Financial Transaction Integrity:**
   - Every payment initiation generates a cryptographically secure **UUID v4 Idempotency Key**.
   - Duplicate submissions within the same session are rejected by the in-flight transaction guard.
   - Quote rate lock enforces a 15-minute expiry (`timeLeftMs <= 0 || isQuoteStale`); expired or modified quotes cannot initiate payment without authoritative recalculation.
4. **Session Integrity & Inactivity Protection:**
   - 15-minute idle countdown timer with a 2-minute modal prompt (`SessionTimeoutManager.tsx`).
   - Expired sessions clear local tokens and redirect safely to the quote retrieval page.

---

## 4. Environment Configuration & Secrets Management

The application is fully decoupled from hardcoded credentials. All configuration is driven by environment variables documented in `.env.example`:

```bash
# DoctorShield Application Environment Configuration
VITE_APP_ENV=production
VITE_APP_VERSION=2.0.0

# API Gateways (Must point to validated production endpoints)
VITE_API_BASE_URL=https://api.doctorshield.com/v1
VITE_ENABLE_MOCKS=false

# Payment Gateway (Curlec / RMS / Stripe Malaysia)
VITE_PAYMENT_GATEWAY_URL=https://checkout.payments.chubb.com.my/v1
VITE_PAYMENT_MERCHANT_ID=MID_CHUBB_MY_INDIVIDUAL_INDEMNITY

# Telephony & OTP Aggregator
VITE_OTP_SERVICE_URL=https://otp.doctorshield.com/v1
VITE_OTP_COOLDOWN_SECONDS=60
VITE_OTP_EXPIRY_SECONDS=300

# Rate Lock & Session Settings
VITE_RATE_LOCK_SECONDS=900
VITE_SESSION_TIMEOUT_SECONDS=900
```

---

## 5. Deployment, Rollback & Observability Strategy

### 5.1 Deployment Protocol
- **Blue/Green Deployment:** Production web servers serve static assets via CDN (Cloudflare/CloudFront) with zero-downtime cache invalidation.
- **Canary Rollout:** New releases should be routed to 10% of renewal traffic first, scaling to 100% following 4 hours of stable transaction metrics.

### 5.2 Rollback Triggers & Automated Safe Gates
An automated rollback to the previous stable release will trigger if any of the following service-level objectives (SLOs) are breached within a 15-minute rolling window:
1. Application error rate > **0.5%** of active sessions.
2. Payment initiation failure rate > **1.0%** (excluding user card declines).
3. P95 API response time > **2,000 ms**.
4. Discrepancy detected in payment webhook reconciliation.

---

## 6. Production Blocker Register (Pre-Flight Gate Checklist)

Per **Rule P-9 (Phase Gate Protocol)**, the following five blocker items must be resolved and approved in `DECISION_LOG.md` before shifting traffic to the new portal:

| Blocker ID | Domain | Description | Current Status | Required Action / Owner |
|---|---|---|---|---|
| `BLK-PROD-01` | Backend Integration | Live Chubb Rating API endpoint contracts and mutual TLS certificates | `[UNVERIFIED]` | Chubb Enterprise Architecture sign-off |
| `BLK-PROD-02` | Payment Gateway | Production Curlec / RMS merchant gateway credentials and webhook secret | `[UNVERIFIED]` | JA Assure Finance Operations |
| `BLK-PROD-03` | Telephony / OTP | Production SMS and WhatsApp Business API gateway credentials | `[UNVERIFIED]` | Telephony Infrastructure Team |
| `BLK-PROD-04` | Legal & Compliance | Formal written acceptance of Schedule 9 FSA 2013 and PDPA 2010 consent text | `[APPROVED]` | Chubb Legal & Regulatory Compliance |
| `BLK-PROD-05` | Actuarial Sign-Off | Formal sign-off on 2026-2027 pro-rata rating tables and GST/SST 8% transition | `[APPROVED]` | Chubb Actuarial Underwriting Team |

---

## 7. Release Recommendation

1. **Technical Codebase Status:** **100% COMPLETE & APPROVED FOR STAGING/UAT.**
2. **Production Release Status:** **GATE HOLD.** Awaiting resolution of `BLK-PROD-01`, `BLK-PROD-02`, and `BLK-PROD-03`.
3. **Next Immediate Step:** Deploy build artifacts to UAT environment for business stakeholder and medical practitioner advisory testing.

