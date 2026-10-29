# ASSUMPTIONS AND OPEN QUESTIONS
## DoctorShield Individual Indemnity Portal Redesign

> **Purpose:** Track every assumption made for progress and every unresolved question
> that must be answered before production release. Items here must not be built against
> until promoted to [VERIFIED] and recorded in SOURCE_REGISTER.md, or formally accepted
> as [ASSUMED] with a named owner and resolution date.

| Field | Value |
|---|---|
| **Version** | 0.1 — Inception |
| **Last Updated** | 2026-10-29 |
| **Owner** | Principal Product Architect |

---

## Status Definitions

| Status | Meaning |
|---|---|
| 🔴 **OPEN** | Unresolved. Blocks production build. |
| 🟡 **IN PROGRESS** | Being actively investigated or escalated. |
| 🟢 **RESOLVED** | Answer confirmed; source reference added. |
| ⚫ **DEFERRED** | Accepted as ASSUMED for progress; must resolve before production. |
| ❌ **CLOSED/N/A** | No longer applicable. |

---

## Priority Definitions

| Priority | Meaning |
|---|---|
| 🔴 P1 | Blocks Phase 1 completion or any build work |
| 🟠 P2 | Blocks Phase 2 or 3 (design/core build) |
| 🟡 P3 | Blocks Phase 5+ (integration, QA, staging) |
| 🟢 P4 | Nice to know; resolve before production |

---

## Open Questions

---

### OQ-001 — Stakeholder Contacts

| Field | Value |
|---|---|
| **ID** | OQ-001 |
| **Priority** | 🔴 P1 |
| **Status** | 🔴 OPEN |
| **Category** | Stakeholder / Governance |
| **Question** | Who are the named, reachable contacts for: (a) JA Assure Business/Product Owner, (b) JA Assure Legal/Compliance Owner, (c) Chubb Underwriting Representative, (d) JA Assure Technical/API Owner, (e) Payment Gateway Integration Contact? |
| **Why it matters** | Legal content changes require named legal owner approval (DEC-002). Product/scope decisions require business owner confirmation. API integration requires technical contact. All phase gate approvals require named approvers. |
| **Assumption made for progress** | None — this is fully blocking for any content change or formal approval. |
| **Owner** | Principal Product Architect |
| **Resolution target** | Before Phase 1 gate |
| **Related decisions** | DEC-002, DEC-006 |
| **Resolution** | ⏳ Pending |

---

### OQ-002 — Existing Backend API Documentation

| Field | Value |
|---|---|
| **ID** | OQ-002 |
| **Priority** | 🔴 P1 |
| **Status** | 🔴 OPEN |
| **Category** | Technical / Integration |
| **Question** | Does JA Assure have API documentation (OpenAPI/Swagger spec, Postman collection, or integration guide) for the backend services powering the portal? If not, are sandbox/test credentials available to allow safe API exploration? |
| **Why it matters** | Without API documentation, Phase 2 architecture and Phase 3–5 integration build cannot proceed with confidence. All discovered endpoints are currently [UNVERIFIED]. |
| **Assumption made for progress** | [ASSUMED] The existing backend APIs remain unchanged and the rebuild is a frontend replacement only. This assumption is used for Phase 0–1 planning only. |
| **Owner** | Principal Product Architect |
| **Resolution target** | Before Phase 2 gate |
| **Related sources** | SRC-040 through SRC-044 |
| **Resolution** | ⏳ Pending |

---

### OQ-003 — Existing Tech Stack

| Field | Value |
|---|---|
| **ID** | OQ-003 |
| **Priority** | 🟠 P2 |
| **Status** | 🔴 OPEN |
| **Category** | Technical |
| **Question** | What is the current frontend tech stack of `my-individualindemnity.doctorshield.com`? (Framework, build tool, hosting provider, CDN, SSR vs SPA?) Is any existing code available for reference? |
| **Why it matters** | Knowing the existing stack informs the migration strategy — whether to refactor in place or rebuild from scratch — and affects Phase 2 tech stack decisions. |
| **Assumption made for progress** | [ASSUMED] The workspace (`Portal_ds`) is currently empty and the rebuild is greenfield. |
| **Owner** | Principal Product Architect |
| **Resolution target** | Phase 1 audit (network inspection will reveal some signals) |
| **Related decisions** | DEC-003 |
| **Resolution** | ⏳ Pending |

---

### OQ-004 — Brand Guide & Logo Assets

| Field | Value |
|---|---|
| **ID** | OQ-004 |
| **Priority** | 🟠 P2 |
| **Status** | 🔴 OPEN |
| **Category** | Design / Brand |
| **Question** | (a) Does a formal DoctorShield brand guidelines document exist? (b) Are SVG/vector logo files available? (c) Are there official icon sets, illustration styles, or approved photography guidelines? (d) Is there a Figma/design library? |
| **Why it matters** | The project brief mandates "authentic DoctorShield brand assets wherever available." Without the official assets, we risk using incorrect logo variants or unofficial assets. |
| **Assumption made for progress** | [ASSUMED] Brand colours and font specifications from the project brief are correct. Logos will be sourced from the live portal as a fallback if a brand guide is not available. |
| **Owner** | Principal Product Architect |
| **Resolution target** | Before Phase 2 (design system) gate |
| **Related sources** | SRC-031, SRC-032 |
| **Related decisions** | DEC-004 |
| **Resolution** | ⏳ Pending |

---

### OQ-005 — Payment Gateway Provider Identity

| Field | Value |
|---|---|
| **ID** | OQ-005 |
| **Priority** | 🟠 P2 |
| **Status** | 🔴 OPEN |
| **Category** | Technical / Integration |
| **Question** | Who is the current payment gateway provider? What integration model is used (redirect, embedded iframe, SDK)? Are test/sandbox credentials available? What payment methods are supported (FPX, credit card, e-wallet)? |
| **Why it matters** | Payment integration is a critical path item. The gateway's integration model directly affects how the portal handles payment redirect and the post-payment confirmation screen. |
| **Assumption made for progress** | [ASSUMED] The payment gateway is a redirect-based (not embedded) integration, based on external source descriptions (SRC-013). |
| **Owner** | Principal Product Architect |
| **Resolution target** | Before Phase 2 architecture gate |
| **Related sources** | SRC-004, SRC-045 |
| **Related decisions** | DEC-006 |
| **Resolution** | ⏳ Pending |

---

### OQ-006 — Renewal Portal URL and Architecture

| Field | Value |
|---|---|
| **ID** | OQ-006 |
| **Priority** | 🟠 P2 |
| **Status** | 🔴 OPEN |
| **Category** | Product / Technical |
| **Question** | (a) Is the renewal portal a separate application at `quote.thedoctorshield.com/renew` or a sub-route of the main portal? (b) Is the renewal journey served from the same backend as the new purchase journey? (c) How does renewal authentication work — token in email link, login, or other? |
| **Why it matters** | The renewal journey's architecture determines whether it is built as part of the same application or as a separate deployment. |
| **Assumption made for progress** | [ASSUMED] Renewal is accessible via a dedicated deep-link in the renewal notification email, and it pre-populates the user's existing policy data. |
| **Owner** | Principal Product Architect |
| **Resolution target** | Phase 1 audit + JA Assure technical contact |
| **Related sources** | SRC-003, SRC-012 |
| **Resolution** | ⏳ Pending |

---

### OQ-007 — Association / Promo Code Mechanism

| Field | Value |
|---|---|
| **ID** | OQ-007 |
| **Priority** | 🟡 P3 |
| **Status** | 🔴 OPEN |
| **Category** | Product / Technical |
| **Question** | (a) How does association-specific pricing work — is it via promo codes entered by the user, or via dedicated portal URLs that auto-apply a discount, or both? (b) How many active association partnerships exist? (c) Are the promo codes validated client-side or server-side? |
| **Why it matters** | The promo/discount mechanism must be reproduced exactly. Incorrect implementation could result in incorrect premiums being charged. |
| **Assumption made for progress** | [ASSUMED] Both mechanisms exist (dedicated URL landing pages AND manual promo code entry), based on SRC-012. |
| **Owner** | Principal Product Architect |
| **Resolution target** | Phase 1 portal audit |
| **Related sources** | SRC-005, SRC-012 |
| **Resolution** | ⏳ Pending |

---

### OQ-008 — Referral / Manual Review Pathway

| Field | Value |
|---|---|
| **ID** | OQ-008 |
| **Priority** | 🟡 P3 |
| **Status** | 🔴 OPEN |
| **Category** | Product / Technical |
| **Question** | (a) What eligibility conditions trigger the referral/manual review pathway? (b) What does the user see when referred? (c) What happens next — email notification, relationship manager contact? (d) Is there a UI state/screen for this in the current portal? |
| **Why it matters** | The referral pathway is an existing product behaviour that must be preserved. If it has a customer-facing screen, that screen must be rebuilt. |
| **Assumption made for progress** | [ASSUMED] A referral pathway exists and notifies the user that a relationship manager has been assigned, based on SRC-012. The specific trigger conditions are unknown. |
| **Owner** | Principal Product Architect |
| **Resolution target** | Phase 1 portal audit + JA Assure product owner |
| **Related sources** | SRC-012 |
| **Resolution** | ⏳ Pending |

---

### OQ-009 — PDPA Consent and Data Handling Requirements

| Field | Value |
|---|---|
| **ID** | OQ-009 |
| **Priority** | 🔴 P1 |
| **Status** | 🔴 OPEN |
| **Category** | Legal / Compliance |
| **Question** | (a) What specific PDPA consent notices and checkboxes are currently shown in the portal? (b) Is there a published Privacy Policy linked from the portal? (c) Are there any pending PDPA compliance changes required? |
| **Why it matters** | PDPA consent is a legal requirement in Malaysia. The consent mechanism must be reproduced verbatim and remain legally compliant. Any gap is a regulatory risk. |
| **Assumption made for progress** | [ASSUMED] PDPA consent checkboxes exist in the portal; exact wording to be captured in Phase 1 audit. |
| **Owner** | Principal Product Architect (escalate to legal owner once OQ-001 resolved) |
| **Resolution target** | Phase 1 audit (wording) + Legal owner (compliance posture) |
| **Related sources** | SRC-021 |
| **Resolution** | ⏳ Pending |

---

### OQ-010 — Practitioner Type / Specialty Classification Taxonomy

| Field | Value |
|---|---|
| **ID** | OQ-010 |
| **Priority** | 🟠 P2 |
| **Status** | 🔴 OPEN |
| **Category** | Product / Underwriting |
| **Question** | What is the complete and authoritative list of practitioner types, specialties, and risk tiers used for premium rating? Are there any that are not eligible for online purchase (i.e., always referred)? |
| **Why it matters** | The practitioner type/specialty selection is the primary underwriting input. The complete taxonomy must be reproduced precisely — adding, removing, or misspelling any option changes the underwriting outcome. |
| **Assumption made for progress** | [ASSUMED] Categories include at minimum: General Medical Practitioner, Private Specialist, Government Medical Officer (with locum exposure), Dentist, Allied Health Practitioner. Source: SRC-012 (INFERRED — third-party). |
| **Owner** | Principal Product Architect (escalate to Chubb underwriting once OQ-001 resolved) |
| **Resolution target** | Phase 1 portal audit (complete list visible in form) + Chubb confirmation |
| **Related sources** | SRC-012 |
| **Resolution** | ⏳ Pending |

---

### OQ-011 — Coverage Limits and Add-On Options Enumeration

| Field | Value |
|---|---|
| **ID** | OQ-011 |
| **Priority** | 🟠 P2 |
| **Status** | 🔴 OPEN |
| **Category** | Product / Underwriting |
| **Question** | What are the complete, current enumerated lists of: (a) Available coverage limit tiers (RM amounts), (b) Add-ons available (names, descriptions, pricing, eligibility rules, dependencies between add-ons), (c) Any add-ons that are only available for certain practitioner types? |
| **Why it matters** | Add-on dependency rules and coverage limit options are underwriting-defined. They must be reproduced exactly. Incorrect dependencies could allow invalid policy combinations. |
| **Assumption made for progress** | [ASSUMED] Add-ons include: Locum Coverage, Telemedicine & Cyber, Run-Off, Clinic. Source: SRC-012 (INFERRED). Complete list and dependency rules unverified. |
| **Owner** | Principal Product Architect (escalate to Chubb/JA Assure once OQ-001 resolved) |
| **Resolution target** | Phase 1 portal audit + underwriting owner |
| **Related sources** | SRC-012 |
| **Resolution** | ⏳ Pending |

---

### OQ-012 — Email Template and Notification Content

| Field | Value |
|---|---|
| **ID** | OQ-012 |
| **Priority** | 🟡 P3 |
| **Status** | 🔴 OPEN |
| **Category** | Product / Technical |
| **Question** | (a) What email notifications does the system send (purchase confirmation, renewal reminder, policy documents)? (b) Who manages the email templates — JA Assure or an ESP? (c) Are email templates within scope for the redesign? |
| **Why it matters** | If email templates are in scope, they must be redesigned to match the new brand. If out of scope, they must be documented as a dependency. |
| **Assumption made for progress** | [ASSUMED] Email delivery infrastructure is out of scope for this rebuild (project brief does not mention it explicitly). |
| **Owner** | Principal Product Architect |
| **Resolution target** | Confirm with JA Assure business owner (after OQ-001 resolved) |
| **Related sources** | SRC-013 |
| **Resolution** | ⏳ Pending |

---

## Summary Table

| ID | Priority | Status | Category | Short Description |
|---|---|---|---|---|
| OQ-001 | 🔴 P1 | 🔴 OPEN | Stakeholder | Named stakeholder contacts not identified |
| OQ-002 | 🔴 P1 | 🔴 OPEN | Technical | Backend API documentation not obtained |
| OQ-003 | 🟠 P2 | 🔴 OPEN | Technical | Existing frontend tech stack unknown |
| OQ-004 | 🟠 P2 | 🔴 OPEN | Design | Brand guide and logo assets not obtained |
| OQ-005 | 🟠 P2 | 🔴 OPEN | Technical | Payment gateway provider not identified |
| OQ-006 | 🟠 P2 | 🔴 OPEN | Product | Renewal portal URL and architecture unclear |
| OQ-007 | 🟡 P3 | 🔴 OPEN | Product | Association/promo code mechanism unverified |
| OQ-008 | 🟡 P3 | 🔴 OPEN | Product | Referral pathway triggers and screens unverified |
| OQ-009 | 🔴 P1 | 🔴 OPEN | Legal | PDPA consent notices and wording not captured |
| OQ-010 | 🟠 P2 | 🔴 OPEN | Product | Complete practitioner taxonomy not verified |
| OQ-011 | 🟠 P2 | 🔴 OPEN | Product | Coverage limits and add-on enumeration unverified |
| OQ-012 | 🟡 P3 | 🔴 OPEN | Product | Email notification scope and content unclear |

**Total Open: 12 | Resolved: 0 | P1 Blockers: 3 (OQ-001, OQ-002, OQ-009)**

