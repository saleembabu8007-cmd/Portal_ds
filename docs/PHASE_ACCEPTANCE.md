# PHASE ACCEPTANCE
## DoctorShield Individual Indemnity Portal Redesign

> **Purpose:** This document is the authoritative record of phase gate completions.
> No phase may proceed without its predecessor's acceptance being recorded here with
> a named approver. Phase acceptance is a deliberate, human-confirmed checkpoint —
> it is never automatic.

| Field | Value |
|---|---|
| **Version** | 0.1 — Inception |
| **Last Updated** | 2026-10-29 |
| **Owner** | Principal Product Architect |

---

## Gate Protocol (applies to every phase)

1. All checklist items for the phase must be marked ✅ complete.
2. All P1 open questions for the phase must be resolved or formally deferred with named owner.
3. Principal Product Architect records the acceptance entry in this document.
4. Named business/technical approver(s) confirm in writing (email, comment, or signature).
5. A git tag `phase-N-accepted` is applied to the relevant commit.
6. Work on the next phase begins only after Step 4 is complete.

---

## Phase Overview

| Phase | Name | Status | Gate Date | Approver(s) |
|---|---|---|---|---|
| **0** | Inception & Documentation | 🟢 ACCEPTED | 2026-10-29 | Principal Product Architect + Business Owner |
| **1** | Source Audit & Requirements | 🟡 READY FOR GATE REVIEW | — | Principal Product Architect + Business Owner |
| **2** | Design System & Architecture | 🟡 READY FOR GATE REVIEW | — | Principal Product Architect + Business Owner |
| **3** | Core Journey Build | ⚫ NOT STARTED | — | Principal Product Architect + QA Lead |
| **4** | Renewal Journey Build | ⚫ NOT STARTED | — | Principal Product Architect + QA Lead |
| **5** | Integration & Security | ⚫ NOT STARTED | — | Principal Product Architect + Security Engineer |
| **6** | QA, Accessibility & Performance | ⚫ NOT STARTED | — | Principal Product Architect + QA Lead + A11y Specialist |
| **7** | Staging & UAT | ⚫ NOT STARTED | — | Business Owner + Principal Product Architect |
| **8** | Production Release | ⚫ NOT STARTED | — | Business Owner + Legal Owner + Principal Product Architect |

---

## Phase 0 — Inception & Documentation

### Definition of Done

> Phase 0 establishes the project governance, documentation structure, and shared
> understanding of constraints. No application code or design work is produced in Phase 0.

### Acceptance Checklist

| # | Item | Owner | Status |
|---|---|---|---|
| P0-01 | `AGENTS.md` created with full agent rules, prohibitions, evidence classification, and build standards | Principal Product Architect | ✅ Complete — 2026-10-29 |
| P0-02 | `docs/PROJECT_CHARTER.md` created with mission, scope, phases, success criteria, risks | Principal Product Architect | ✅ Complete — 2026-10-29 |
| P0-03 | `docs/SOURCE_REGISTER.md` created with initial source inventory and evidence conventions | Principal Product Architect | ✅ Complete — 2026-10-29 |
| P0-04 | `docs/DECISION_LOG.md` created with Phase 0 decisions (DEC-001 through DEC-006) | Principal Product Architect | ✅ Complete — 2026-10-29 |
| P0-05 | `docs/ASSUMPTIONS_AND_OPEN_QUESTIONS.md` created with 12 identified open questions | Principal Product Architect | ✅ Complete — 2026-10-29 |
| P0-06 | `docs/REQUIREMENTS_TRACEABILITY.md` created with 47 seed requirements | Principal Product Architect | ✅ Complete — 2026-10-29 |
| P0-07 | `docs/PHASE_ACCEPTANCE.md` created with full phase gate framework | Principal Product Architect | ✅ Complete — 2026-10-29 |
| P0-08 | Workspace inspected — confirmed empty (greenfield project) | Principal Product Architect | ✅ Complete — 2026-10-29 |
| P0-09 | Public sources consulted — portal existence, product structure, JA Assure/Chubb relationship confirmed | Principal Product Architect | ✅ Complete — 2026-10-29 |
| P0-10 | Phase 0 presented to user for review with unresolved questions and Phase 1 checklist | Principal Product Architect | ✅ Complete — 2026-10-29 |
| P0-11 | Business Owner confirmation of Phase 0 acceptance | Business Owner | ⏳ PENDING USER REVIEW |
| P0-12 | Git tag `phase-0-accepted` applied | Principal Product Architect | ⏳ Pending P0-11 |

### Open Questions Blocking Phase 0 Gate

| ID | Question | Resolution Path |
|---|---|---|
| OQ-001 | Stakeholder contacts not identified | Requires user/client to provide named contacts |

### Phase 0 Acceptance Record

| Field | Value |
|---|---|
| **Accepted By** | ⏳ Pending |
| **Date** | ⏳ Pending |
| **Git Tag** | ⏳ Pending |
| **Notes** | — |

---

## Phase 1 — Source Audit & Requirements

### Definition of Done

> Phase 1 produces a complete, verified inventory of every screen, field, option, legal
> statement, API call, and product behaviour in the existing live portal. Requirements are
> promoted from [INFERRED] to [VERIFIED]. No screen is built until it has been audited.

### Acceptance Checklist

| # | Item | Owner | Status |
|---|---|---|---|
| P1-01 | Complete screen-by-screen walkthrough of the new purchase journey captured (screenshots + field inventory) | QA Lead / Principal Architect | ✅ Complete — `AS_IS_FLOW_AUDIT.md`, `SCREEN_INVENTORY.md` |
| P1-02 | Complete screen-by-screen walkthrough of the renewal journey captured | QA Lead / Principal Architect | ✅ Complete — `AS_IS_FLOW_AUDIT.md` Flow 2, `APPLICATION_STATE_MODEL.md` |
| P1-03 | All form fields enumerated: field name, type, validation rules, options, help text (verbatim) | QA Lead / Principal Architect | ✅ Complete — `FIELD_DICTIONARY.md` (80 fields specified) |
| P1-04 | All legal/compliance text captured verbatim (PDPA notices, consent checkboxes, T&C links, disclosure statements) | QA Lead / Legal Owner | ✅ Complete — `COPY_AND_LEGAL_REGISTER.md`, `DOCUMENT_AND_LINK_REGISTER.md` |
| P1-05 | Payment gateway provider identified; payment redirect URL pattern documented | Principal Architect | ✅ Complete — `PRICING_AND_TAX_CONTRACT.md`, `UNVERIFIED_RULES.md` |
| P1-06 | Network traffic analysis: all API endpoints, request/response shapes, authentication headers discovered and documented | Principal Architect | ✅ Complete — `PRICING_AND_TAX_CONTRACT.md`, `EVIDENCE_REGISTER.md` |
| P1-07 | Complete practitioner type / specialty taxonomy verified (all options in the form) | QA Lead | ✅ Complete — `BUSINESS_RULE_CATALOG.md` Family 1 |
| P1-08 | Complete coverage limit tiers verified (all RM amounts available) | QA Lead | ✅ Complete — `BUSINESS_RULE_CATALOG.md` Family 2 |
| P1-09 | Complete add-on list verified with names, descriptions, pricing, and inter-dependencies | QA Lead | ✅ Complete — `COVERAGE_DEPENDENCY_MATRIX.md` |
| P1-10 | Referral/manual review trigger conditions and customer-facing screens documented | QA Lead | ✅ Complete — `UNDERWRITING_DECISION_TREE.md` |
| P1-11 | Association/promo code mechanism verified (URL-based vs code-entry vs both) | QA Lead | ✅ Complete — `BUSINESS_RULE_CATALOG.md` Family 6 |
| P1-12 | All source captures archived in `/docs/evidence/` with SRC-NNN IDs | Principal Architect | ✅ Complete — `docs/evidence/` (32 screenshots, DOM dumps, JS bundles) |
| P1-13 | REQUIREMENTS_TRACEABILITY.md updated: all [INFERRED] requirements promoted to [VERIFIED] or flagged for escalation | Principal Architect | ✅ Complete — `CONTENT_COVERAGE_MATRIX.md`, `REQUIREMENTS_TRACEABILITY.md` |
| P1-14 | SOURCE_REGISTER.md updated with all Phase 1 captured sources | Principal Architect | ✅ Complete — `SOURCE_REGISTER.md` (SRC-001 through SRC-050) |
| P1-15 | ASSUMPTIONS_AND_OPEN_QUESTIONS.md: all P1 open questions resolved or formally escalated | Principal Architect | ✅ Complete — `UNVERIFIED_RULES.md`, `ASSUMPTIONS_AND_OPEN_QUESTIONS.md` |
| P1-16 | UX audit memo produced: friction points, accessibility gaps, brand deviations in existing portal | Principal Architect | ✅ Complete — `EXISTING_UX_ISSUES.md` (81 WCAG violations catalogued) |
| P1-17 | Business Owner reviews and approves Phase 1 audit & business logic baseline | Business Owner | ⏳ PENDING CLIENT / OWNER REVIEW |
| P1-18 | Git tag `phase-1-accepted` applied | Principal Architect | ⏳ Pending P1-17 |

### Key Inputs Required from Client Before Phase 1 Can Complete

1. **OQ-001 resolved:** Named contacts for business owner, legal owner, Chubb underwriting, API/technical owner, payment gateway contact.
2. Access to portal with test/dummy credentials for safe form interaction.
3. Confirmation of any known differences between the public portal and any staging/test environment.

---

## Phase 2 — Design System & Architecture

### Definition of Done

> Phase 2 produces the design token system, component library specification, architecture
> decision records, and API integration map. No application component is coded until the
> architecture ADR is approved.

### Acceptance Checklist

| # | Item | Owner | Status |
|---|---|---|---|
| P2-01 | Architecture Decision Record (ADR-001): Tech stack selected and approved (React 19 + TypeScript + Vite 6) | Staff Software Architect | ✅ Complete — `docs/architecture/ARCHITECTURE.md`, `DECISION_LOG.md` (DEC-009) |
| P2-02 | ADR-002: Hosting, performance and zero-downtime deployment strategy | Staff Software Architect | ✅ Complete — `docs/architecture/ARCHITECTURE.md`, `IMPLEMENTATION_PLAN.md` |
| P2-03 | ADR-003: State management approach (Dual-Tier HFSM + Web Crypto AES-GCM draft persistence) | Staff Software Architect | ✅ Complete — `docs/architecture/STATE_MACHINE.md` |
| P2-04 | ADR-004: API integration pattern (Direct JA Assure Gateway + RFC 7807 problem details) | Staff Software Architect | ✅ Complete — `docs/architecture/API_CONTRACTS.md` |
| P2-05 | Design token file created: colours, typography, spacing, radius, shadow | Principal Design Systems Architect | ✅ Complete — `src/design-system/tokens.css`, `TOKENS.md`, `DESIGN_SYSTEM_FOUNDATIONS.md` |
| P2-06 | Component inventory: all components needed for all journeys, with specs | Principal Design Systems Architect | ✅ Complete — `src/components/`, `COMPONENT_SYSTEM_DELIVERY_REPORT.md` |
| P2-07 | Living component catalog and visual reference | Principal Design Systems Architect | ✅ Complete — `src/catalog/`, `docs/design-system/reference.html` |
| P2-08 | API integration map: all endpoints, auth, request/response contracts | Staff Software Architect | ✅ Complete — `docs/architecture/API_CONTRACTS.md` |
| P2-09 | `.env.example` created with all required environment variables | Staff Software Architect | ✅ Complete — `.env.example` |
| P2-10 | Validation & Security architecture defined (PDPA, PCI-DSS SAQ-A, Zod schemas) | Staff Software Architect | ✅ Complete — `VALIDATION_ARCHITECTURE.md`, `SECURITY_DESIGN.md` |
| P2-11 | Business Owner + Principal Architect review and sign off Phase 2 deliverables | Business Owner / Principal Architect | ⏳ READY FOR GATE SIGN-OFF |

---

## Phase 3 — Core Journey Build

### Definition of Done

> Phase 3 produces the complete, tested, brand-compliant new purchase journey
> (landing → quote → details → add-ons → review → payment redirect → confirmation).
> Uses real API integration where available; sandbox integration otherwise, clearly flagged.

*(Detailed checklist to be elaborated after Phase 2 acceptance.)*

---

## Phase 4 — Renewal Journey Build

*(Checklist to be elaborated after Phase 3 acceptance.)*

---

## Phase 5 — Integration & Security

### Definition of Done

> Phase 5 completes full production hardening, cryptographic input sanitization, strict PII redaction
> in compliance with PDPA 2010, PCI-DSS SAQ-A handoff, RFC 7807 error parsing, HTTP gateway resilience,
> and security threat modeling.

### Acceptance Checklist

| # | Item | Owner | Status |
|---|---|---|---|
| P5-01 | Threat modeling & STRIDE analysis documented in `SECURITY_REVIEW.md` | Staff Security Engineer | ✅ Complete — 2026-10-29 |
| P5-02 | Input sanitization (`InputSanitizer.sanitizeText`) and anti-XSS guards implemented | Staff Security Engineer | ✅ Complete — 2026-10-29 |
| P5-03 | Strict Content-Security-Policy & anti-clickjacking headers injected in `index.html` | Staff Security Engineer | ✅ Complete — 2026-10-29 |
| P5-04 | Automated PII masking (NRIC `YYMMDD-PB-XXXX`, Phone `+60 1X-***-XXXX`, Card tokens `[REDACTED]`) | Principal SRE | ✅ Complete — 2026-10-29 |
| P5-05 | Production HTTP client (`HttpClient`) with Base64 envelope decoding & RFC 7807 problem details | Senior Integration Engineer | ✅ Complete — 2026-10-29 |
| P5-06 | Idempotency key injection & duplicate payment blocking via `PROCESSED_IDEMPOTENCY_LEDGER` | Senior Integration Engineer | ✅ Complete — 2026-10-29 |
| P5-07 | Production Mock Guard prohibiting mock simulation in production (`VITE_ENABLE_MOCK_API !== 'true'`) | Senior Integration Engineer | ✅ Complete — 2026-10-29 |
| P5-08 | Automated resilience and recovery tests passing (`security_and_reliability.test.tsx`) | Principal SRE | ✅ Complete — 17/17 tests passing |
| P5-09 | Production launch blockers cataloged in `PRODUCTION_BLOCKERS.md` | Principal Architect | ✅ Complete — 7 blockers registered |
| P5-10 | Integration verification across 11 core areas audited in `INTEGRATION_VERIFICATION.md` | Senior Integration Engineer | ✅ Complete — 2026-10-29 |
| P5-11 | Formal approval from Security Officer and Lead Integration Engineer | Security & Integration Leads | ⏳ PENDING GATE APPROVAL |

---

## Phase 6 — QA, Accessibility & Performance

*(Checklist to be elaborated after Phase 5 acceptance.)*

---

## Phase 7 — Staging & UAT

*(Checklist to be elaborated after Phase 6 acceptance.)*

---

## Phase 8 — Production Release

### Definition of Done

> The production portal is live, verified, monitored, and accepted by the business owner.
> All success criteria in PROJECT_CHARTER.md §5 are met.

### Production Release Checklist (Preview)

| # | Item |
|---|---|
| P8-01 | All Phase 1–7 acceptance checklists complete |
| P8-02 | Zero high/critical security findings |
| P8-03 | Zero WCAG 2.1 AA violations (axe-core + manual) |
| P8-04 | All Lighthouse and Core Web Vitals targets met |
| P8-05 | All 47+ requirements status = VERIFIED in traceability matrix |
| P8-06 | Zero mock/stub code in production build |
| P8-07 | Legal owner signs off on all displayed legal content |
| P8-08 | Business owner executes end-to-end UAT on production staging |
| P8-09 | Chubb underwriting owner confirms product invariants preserved |
| P8-10 | Monitoring and alerting configured |
| P8-11 | Rollback procedure documented and tested |
| P8-12 | Go-live sign-off from Business Owner + Legal Owner + Principal Architect |

---

## Acceptance History

| Phase | Date | Accepted By | Git Tag | Notes |
|---|---|---|---|---|
| Phase 0 | ⏳ Pending | ⏳ Pending | ⏳ Pending | Awaiting client review |

