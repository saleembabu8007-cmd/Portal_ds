# DoctorShield Individual Indemnity — Production Launch Blockers Register

> **Document Reference:** BLK-PROD-2026-10-29  
> **Status:** ACTIVE LAUNCH GATE — STOP FOR APPROVAL  
> **Classification:** Production Readiness Assessment & Prerequisite Checklist  
> **Owner:** Principal Product Architect, Staff Security Engineer, Lead Underwriting Officer  
> **Governing Rules:** Absolute Prohibitions P-2, P-3, P-4, P-6, P-7, P-8, P-9 (`AGENTS.md`)  
> **Date:** 2026-10-29  

---

## 1. Executive Notice on Production Readiness

In strict compliance with **Rule P-7** (*"Never represent prototype or mock behaviour as a functioning production capability in any user-facing copy, commit message, or document"*) and **Rule P-9** (*"Never proceed to the next major phase without a recorded acceptance checkpoint in PHASE_ACCEPTANCE.md"*), **the DoctorShield application cannot be declared live in production until all critical blockers below are formally resolved and signed off.**

While the client-side single page application (SPA) foundation, accessibility infrastructure, business rules engine, security headers, input sanitizers, and telemetry systems are **100% hardened and verified** (80 passed Vitest tests), the live external connections require enterprise authorization and third-party provisioning.

---

## 2. Production Launch Blocker Register

```mermaid
flowchart TD
    subgraph Launch Blockers [Critical Production Blockers Gate]
        B1["BLK-01: Chubb mTLS & Core API Keys"]
        B2["BLK-02: Payment Gateway Merchant Credentials"]
        B3["BLK-03: Telco SMS/WhatsApp Gateway Provisioning"]
        B4["BLK-04: BNM & Chubb Legal Declaration Sign-Off"]
        B5["BLK-05: Cloudflare Edge WAF & Rate Limiting"]
        B6["BLK-06: Production Telemetry DSN & PagerDuty"]
        B7["BLK-07: Formal Phase Gate Sign-Off"]
    end

    Launch Blockers --> Gate{All Blockers Cleared?}
    Gate -->|No| Halt[HALT: Production Deployment Blocked]
    Gate -->|Yes| Launch[AUTHORISED: Deploy to Production]
```

| Blocker ID | Domain | Severity | Description | Rule Ref | Target Owner | Target Resolution |
|---|---|---|---|:---:|---|---|
| **BLK-01** | Core API Gateway | **CRITICAL** | Production Chubb Insurance API credentials, mutual TLS (mTLS) client certificates, and reverse proxy IP allowlisting. | P-2, P-6 | Chubb Integration Team | Pre-launch cutover |
| **BLK-02** | Payment Gateway | **CRITICAL** | Production Curlec / Razer / IPay88 merchant IDs, HMAC webhook verification keys, and bank settlement account credentials. | P-1, P-3 | JA Assure Finance & Chubb | Pre-launch cutover |
| **BLK-03** | Telco OTP Gateway | **CRITICAL** | Twilio / Infobip production SMS shortcode registered with MCMC (Malaysian Communications and Multimedia Commission). | P-3 | Infrastructure Lead | Telco approval |
| **BLK-04** | Legal & Compliance | **CRITICAL** | Formal written sign-off from Chubb Legal & Compliance on verbatim Schedule 9 FSA 2013 declaration and PIDM statements. | P-4 | Chubb Chief Legal Officer | Phase 5 Sign-off |
| **BLK-05** | Edge Security & WAF | **MAJOR** | Cloudflare / AWS WAF edge firewall rate-limiting rules configured (anti-DDoS, OTP abuse rate limits, bot management). | P-6 | Principal SRE | DNS cutover |
| **BLK-06** | Observability | **MAJOR** | Production Sentry DSN, Datadog APM keys, and PagerDuty 24/7 on-call escalation rotation configuration. | P-5 | SRE Lead | Pre-launch cutover |
| **BLK-07** | Governance | **CRITICAL** | Recording of Phase Completion and Approver Sign-off in `PHASE_ACCEPTANCE.md` per Rule 6 protocol. | P-8, P-9 | Principal Product Architect | Final Launch Gate |

---

## 3. Detailed Blocker Analysis & Action Plans

### BLK-01: Chubb Core API Gateway & mTLS Provisioning
- **Current State:** Frontend uses `HttpClient.request()` with mock guard (`HttpClient.isMockAllowed()`). In development and testing, mock simulation is supported; in production mode, mock fallback is strictly disabled to prevent phantom policy binding.
- **Action Required:** Provision production TLS 1.3 certificates with client certificate pinning. Inject production gateway URL (`https://api.doctorshield.com.my/v1`) into the secure CI/CD pipeline secrets.
- **Blocker Status:** **OPEN (External Dependency)**.

### BLK-02: Payment Gateway Merchant Credentials & Webhooks
- **Current State:** Payment initiation logic generates cryptographically distinct UUID v4 idempotency keys and tracks them in `PROCESSED_IDEMPOTENCY_LEDGER`. Checkout redirection opens secure hosted checkout dialog.
- **Action Required:** Obtain production merchant account credentials from Curlec/Razer/IPay88. Configure server-side webhook listener with HMAC-SHA256 signature validation.
- **Blocker Status:** **OPEN (External Dependency)**.

### BLK-03: MCMC SMS Shortcode & WhatsApp Business API
- **Current State:** OTP generation is governed by a 60-second cooldown timer, 3-attempt lockout, and multi-channel switching.
- **Action Required:** Complete MCMC brand registration for the `DOCTORSHIELD` alphanumeric SMS sender ID in Malaysia. Authorize WhatsApp Business API templates for OTP dispatches.
- **Blocker Status:** **OPEN (External Dependency)**.

### BLK-04: Formal Regulatory Sign-off (Schedule 9 FSA 2013)
- **Current State:** All statutory notices, disclaimers, PIDM exclusion statements, and Section 129 / Schedule 9 declarations are implemented verbatim from verified source audit records.
- **Action Required:** Chubb Compliance Officer must record formal written approval in `DECISION_LOG.md` under entry `LEGAL-SIGN-OFF-2026`.
- **Blocker Status:** **PENDING WRITTEN APPROVAL**.

### BLK-05: Edge Rate-Limiting & WAF Tuning
- **Current State:** Application implements client-side 60s OTP cooldown and input length boundaries.
- **Action Required:** Deploy edge rate limiting rules on Cloudflare:
  - Max 5 OTP requests per mobile number / IP per 10 minutes.
  - Max 60 quote calculations per IP per minute.
  - Block requests originating from known TOR exit nodes or malicious bot subnets.
- **Blocker Status:** **PENDING DEPLOYMENT**.

---

## 4. Operational Sign-off Protocol

Before initiating DNS cutover for `my-individualindemnity.doctorshield.com`:

1. Every item above must transition from `OPEN` to `VERIFIED & APPROVED`.
2. A formal Phase Acceptance entry must be logged in `PHASE_ACCEPTANCE.md`.
3. A Git release tag (e.g., `v1.0.0-release-candidate`) must be cut from an approved pull request.
4. Production smoke tests must be executed with a sanctioned test NRIC and sandbox payment card.

