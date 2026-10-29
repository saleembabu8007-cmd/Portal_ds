# REQUIREMENTS TRACEABILITY MATRIX
## DoctorShield Individual Indemnity Portal Redesign

> **Purpose:** Every requirement must trace forward to an implemented feature and backward
> to a source of evidence. Every implemented feature must trace back to a requirement.
> This matrix is the authoritative link between evidence → requirements → implementation → tests.

| Field | Value |
|---|---|
| **Version** | 0.1 — Inception (Requirements population begins Phase 1) |
| **Last Updated** | 2026-10-29 |
| **Owner** | Principal Product Architect |

---

## Convention

### Requirement ID Format

| Prefix | Category |
|---|---|
| `REQ-FUNC-NNN` | Functional requirement |
| `REQ-UXCNT-NNN` | UX / content requirement |
| `REQ-TECH-NNN` | Technical / non-functional requirement |
| `REQ-SEC-NNN` | Security requirement |
| `REQ-A11Y-NNN` | Accessibility requirement |
| `REQ-LEGAL-NNN` | Legal / regulatory / compliance requirement |
| `REQ-BRAND-NNN` | Brand / design requirement |
| `REQ-PERF-NNN` | Performance requirement |

### Requirement Record Fields

| Field | Description |
|---|---|
| **ID** | Requirement identifier |
| **Source** | `SRC-NNN` from SOURCE_REGISTER.md |
| **Classification** | [VERIFIED] / [INFERRED] / [ASSUMED] — of the source evidence |
| **Description** | Clear, testable requirement statement |
| **Acceptance Criteria** | How this requirement is verified as met |
| **Priority** | `MUST` / `SHOULD` / `COULD` (MoSCoW) |
| **Phase** | Phase in which this is built and tested |
| **Implementation** | File/component reference (populated during build) |
| **Test Case** | Test ID(s) that verify this requirement |
| **Status** | `DRAFT` / `APPROVED` / `IMPLEMENTED` / `TESTED` / `VERIFIED` |

---

## Seed Requirements — Phase 0 (Pre-Audit)

> These requirements are derived from the project brief (SRC-050) and publicly observed
> portal behaviour (SRC-010 to SRC-013). They are classified [INFERRED] or [ASSUMED] until
> the Phase 1 source audit verifies them against the live portal.

---

### Product Invariant Requirements

| ID | Source | Class | Description | Priority | Status |
|---|---|---|---|---|---|
| REQ-FUNC-001 | SRC-050 | [VERIFIED] | The portal shall support the new purchase journey: enabling an individual medical practitioner to obtain a premium quote and purchase a policy online. | MUST | DRAFT |
| REQ-FUNC-002 | SRC-050 | [VERIFIED] | The portal shall support the renewal journey: enabling an existing policyholder to renew their individual indemnity policy online. | MUST | DRAFT |
| REQ-FUNC-003 | SRC-050 | [INFERRED] | The portal shall capture practitioner professional details including practitioner type, specialty, and registration number (MMC or equivalent). | MUST | DRAFT |
| REQ-FUNC-004 | SRC-050, SRC-012 | [INFERRED] | The portal shall present an instant premium quote based on practitioner type, coverage limit selection, and add-on selections. | MUST | DRAFT |
| REQ-FUNC-005 | SRC-012 | [INFERRED] | The portal shall support selection of coverage limit tiers (specific RM amounts to be verified in Phase 1). | MUST | DRAFT |
| REQ-FUNC-006 | SRC-012 | [INFERRED] | The portal shall support optional add-on selection (Locum Coverage, Telemedicine & Cyber Protection, Run-Off Coverage, Clinic Coverage — complete list to be verified in Phase 1). | MUST | DRAFT |
| REQ-FUNC-007 | SRC-012 | [INFERRED] | Add-on dependencies shall be enforced: certain add-ons may only be selected in combination with specific practitioner types or other add-ons (dependency rules to be verified with underwriting owner). | MUST | DRAFT |
| REQ-FUNC-008 | SRC-012 | [INFERRED] | The portal shall support promo code / association discount entry with server-side validation. | MUST | DRAFT |
| REQ-FUNC-009 | SRC-012 | [INFERRED] | The portal shall support association-specific landing pages that pre-apply member discounts automatically. | SHOULD | DRAFT |
| REQ-FUNC-010 | SRC-013 | [INFERRED] | The portal shall redirect the user to the payment gateway upon purchase intent confirmation. | MUST | DRAFT |
| REQ-FUNC-011 | SRC-013 | [INFERRED] | The portal shall display a purchase confirmation screen following successful payment gateway callback. | MUST | DRAFT |
| REQ-FUNC-012 | SRC-013 | [INFERRED] | The portal shall trigger dispatch of a policy confirmation email (including policy documents) following successful purchase. | MUST | DRAFT |
| REQ-FUNC-013 | SRC-012 | [INFERRED] | The portal shall detect eligibility conditions that trigger referral to a human relationship manager and present an appropriate notification screen instead of proceeding to payment. | MUST | DRAFT |
| REQ-FUNC-014 | SRC-012 | [INFERRED] | The portal shall allow users to review full policy wording documents before payment. | MUST | DRAFT |

---

### Legal & Compliance Requirements

| ID | Source | Class | Description | Priority | Status |
|---|---|---|---|---|---|
| REQ-LEGAL-001 | SRC-050 | [VERIFIED] | All existing legal notices, disclosures, regulatory statements, and linked documents must be reproduced verbatim. No change without named legal owner approval recorded in DECISION_LOG.md. | MUST | DRAFT |
| REQ-LEGAL-002 | SRC-021 | [VERIFIED] | The portal shall present PDPA consent notice(s) and obtain explicit consent before collecting personal data. Exact wording to be captured from live portal in Phase 1. | MUST | DRAFT |
| REQ-LEGAL-003 | SRC-020 | [VERIFIED] | The portal shall comply with applicable BNM guidelines for digital insurance distribution (specific guidelines to be identified in Phase 1 with legal owner). | MUST | DRAFT |
| REQ-LEGAL-004 | SRC-050 | [VERIFIED] | All links to external legal/regulatory documents (BNM, MMC, Chubb, policy wording PDFs) must be preserved and functional. | MUST | DRAFT |

---

### UX & Content Requirements

| ID | Source | Class | Description | Priority | Status |
|---|---|---|---|---|---|
| REQ-UXCNT-001 | SRC-050 | [VERIFIED] | All existing customer-facing questions, field labels, options, and help text must be preserved (verbatim or with approved UX reorder/progressive disclosure). | MUST | DRAFT |
| REQ-UXCNT-002 | SRC-050 | [VERIFIED] | UX improvements may reorder or progressively disclose information to reduce friction, provided no required content is omitted. | SHOULD | DRAFT |
| REQ-UXCNT-003 | SRC-050 | [INFERRED] | The portal shall clearly indicate the current step in the purchase/renewal journey (progress indication). | SHOULD | DRAFT |
| REQ-UXCNT-004 | SRC-050 | [INFERRED] | The portal shall provide inline validation feedback on all form fields. | MUST | DRAFT |
| REQ-UXCNT-005 | SRC-050 | [INFERRED] | The premium quote shall be clearly displayed before the user proceeds to payment. | MUST | DRAFT |

---

### Accessibility Requirements

| ID | Source | Class | Description | Priority | Status |
|---|---|---|---|---|---|
| REQ-A11Y-001 | SRC-050 | [VERIFIED] | The portal shall conform to WCAG 2.1 Level AA throughout. | MUST | DRAFT |
| REQ-A11Y-002 | SRC-050 | [VERIFIED] | Lighthouse Accessibility score shall be 100 on all primary journey pages. | MUST | DRAFT |
| REQ-A11Y-003 | SRC-050 | [INFERRED] | All form elements shall have accessible labels and error messages readable by screen readers. | MUST | DRAFT |
| REQ-A11Y-004 | SRC-050 | [INFERRED] | Colour contrast ratios shall meet WCAG 2.1 AA minimum (4.5:1 for normal text, 3:1 for large text). | MUST | DRAFT |
| REQ-A11Y-005 | SRC-050 | [INFERRED] | All interactive elements shall be keyboard-navigable in a logical tab order. | MUST | DRAFT |

---

### Brand & Design Requirements

| ID | Source | Class | Description | Priority | Status |
|---|---|---|---|---|---|
| REQ-BRAND-001 | SRC-030 | [VERIFIED] | Primary brand colour: `#08A5B5`. Secondary brand colour: `#132766`. | MUST | DRAFT |
| REQ-BRAND-002 | SRC-030 | [VERIFIED] | Heading font: Kanit, weight 400–500 only (never 600+). | MUST | DRAFT |
| REQ-BRAND-003 | SRC-030 | [VERIFIED] | Body font: Inter. | MUST | DRAFT |
| REQ-BRAND-004 | SRC-030 | [VERIFIED] | Design aesthetic: light, refined, calm, credible healthcare interface. No generic AI dashboard aesthetics, no oversized gradients, no exaggerated shadows, no emoji, no decorative medical imagery. | MUST | DRAFT |
| REQ-BRAND-005 | SRC-030 | [VERIFIED] | Strong hierarchy, restrained decoration, precise spacing based on a 4 px base grid. | MUST | DRAFT |
| REQ-BRAND-006 | SRC-030 | [VERIFIED] | Use authentic DoctorShield brand assets wherever available. | MUST | DRAFT |

---

### Performance Requirements

| ID | Source | Class | Description | Priority | Status |
|---|---|---|---|---|---|
| REQ-PERF-001 | SRC-050 | [VERIFIED] | Lighthouse Performance score ≥ 90 on all primary journey pages. | MUST | DRAFT |
| REQ-PERF-002 | SRC-050 | [VERIFIED] | Core Web Vitals: LCP < 2.5 s, INP < 200 ms, CLS < 0.1. | MUST | DRAFT |
| REQ-PERF-003 | SRC-050 | [VERIFIED] | Lighthouse Best Practices score ≥ 95, SEO score ≥ 90. | MUST | DRAFT |

---

### Security Requirements

| ID | Source | Class | Description | Priority | Status |
|---|---|---|---|---|---|
| REQ-SEC-001 | SRC-050 | [VERIFIED] | No secrets or API credentials in source code. All via environment variables. | MUST | DRAFT |
| REQ-SEC-002 | SRC-050 | [VERIFIED] | Input validation on all form fields — client side and server side. | MUST | DRAFT |
| REQ-SEC-003 | SRC-050 | [VERIFIED] | Content Security Policy headers required in production. | MUST | DRAFT |
| REQ-SEC-004 | SRC-050 | [VERIFIED] | Session tokens: httpOnly, Secure, SameSite=Strict. | MUST | DRAFT |
| REQ-SEC-005 | SRC-050 | [INFERRED] | No real OTP, email, payment, or policy-altering API call during development or testing phases. Use sandbox/test infrastructure only. | MUST | DRAFT |

---

### Technical Requirements

| ID | Source | Class | Description | Priority | Status |
|---|---|---|---|---|---|
| REQ-TECH-001 | SRC-050 | [VERIFIED] | No mock or stub behaviour may be deployed to production. | MUST | DRAFT |
| REQ-TECH-002 | SRC-050 | [VERIFIED] | Unit test coverage ≥ 80% for all new components and utilities. | MUST | DRAFT |
| REQ-TECH-003 | SRC-050 | [VERIFIED] | E2E automated tests must cover all primary journeys (new purchase, renewal, referral pathway). | MUST | DRAFT |
| REQ-TECH-004 | SRC-050 | [VERIFIED] | Responsive design: fully functional on mobile, tablet, and desktop. | MUST | DRAFT |
| REQ-TECH-005 | SRC-050 | [INFERRED] | Tech stack to be selected in Phase 2 Architecture ADR. | MUST | DRAFT |

---

## Traceability Status

| Category | Requirements Defined | Phase 1 Verified | Implementation Complete | Tests Passing |
|---|---|---|---|---|
| Functional | 14 | 0 | 0 | 0 |
| Legal | 4 | 0 | 0 | 0 |
| UX / Content | 5 | 0 | 0 | 0 |
| Accessibility | 5 | 0 | 0 | 0 |
| Brand / Design | 6 | 6 | 0 | 0 |
| Performance | 3 | 3 | 0 | 0 |
| Security | 5 | 0 | 0 | 0 |
| Technical | 5 | 0 | 0 | 0 |
| **TOTAL** | **47** | **9** | **0** | **0** |

> **Note:** All requirements classified [INFERRED] or [ASSUMED] will be re-verified during
> the Phase 1 source audit and promoted to [VERIFIED] or escalated as open questions.
> The requirement count will grow significantly after the Phase 1 audit captures the
> complete form field inventory.

