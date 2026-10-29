# DECISION LOG
## DoctorShield Individual Indemnity Portal Redesign

> **Purpose:** Authoritative record of every design, product, legal, technical, or
> process decision made during this project. No decision that deviates from or extends
> existing portal behaviour may be implemented without a log entry here.

| Field | Value |
|---|---|
| **Version** | 0.1 — Inception |
| **Last Updated** | 2026-10-29 |
| **Owner** | Principal Product Architect |

---

## Convention

Each entry records:

| Field | Description |
|---|---|
| **ID** | Unique identifier `DEC-NNN` |
| **Date** | Date decision was made or recorded |
| **Category** | `PRODUCT` / `LEGAL` / `DESIGN` / `TECHNICAL` / `PROCESS` / `CONTENT` |
| **Status** | `PROPOSED` / `UNDER REVIEW` / `APPROVED` / `REJECTED` / `SUPERSEDED` |
| **Decision** | Clear statement of what was decided |
| **Rationale** | Why this decision was made |
| **Alternatives Considered** | Other options that were evaluated |
| **Impact** | What this decision affects |
| **Approver** | Named person(s) who approved; or `PENDING` |
| **Source References** | `SRC-NNN` IDs from SOURCE_REGISTER.md |
| **Open Questions** | Any unresolved sub-issues; link to `OQ-NNN` |

---

## Phase 0 — Inception Decisions

---

### DEC-001

| Field | Value |
|---|---|
| **ID** | DEC-001 |
| **Date** | 2026-10-29 |
| **Category** | PROCESS |
| **Status** | APPROVED |
| **Decision** | Adopt a phased delivery approach with explicit phase gate checkpoints. No phase proceeds without recorded acceptance in PHASE_ACCEPTANCE.md. |
| **Rationale** | Reduces risk of building on unverified assumptions; enables incremental review; aligns with the client brief's explicit instruction to "work in small, reviewable phases." |
| **Alternatives Considered** | (1) Single-pass design and build — rejected due to high risk given regulatory content requirements. (2) Parallel-phase delivery — rejected due to dependencies between design system and application build. |
| **Impact** | All planning, tasking, and agent behaviour governed by phase gate protocol. |
| **Approver** | Principal Product Architect (per project brief, 2026-10-29) |
| **Source References** | SRC-050 |
| **Open Questions** | None |

---

### DEC-002

| Field | Value |
|---|---|
| **ID** | DEC-002 |
| **Date** | 2026-10-29 |
| **Category** | CONTENT |
| **Status** | APPROVED |
| **Decision** | All existing customer-facing content (questions, options, legal text, disclosures, links) must be reproduced verbatim in the rebuilt portal until a formal content review is completed with the named business/legal owner and recorded in this log. |
| **Rationale** | Insurance product content has regulatory and contractual obligations. Unauthorized content changes risk mis-selling, regulatory breach, and policy invalidity. |
| **Alternatives Considered** | Content-first rewrite — rejected. Requires explicit legal approval before implementation. |
| **Impact** | Content freeze in force. Any proposed content change must create a `CONTENT-CHANGE-REQUEST` sub-entry in this log before implementation. |
| **Approver** | Principal Product Architect (per project brief invariant #5, 2026-10-29) |
| **Source References** | SRC-050 |
| **Open Questions** | OQ-001 (legal owner not yet identified) |

---

### DEC-003

| Field | Value |
|---|---|
| **ID** | DEC-003 |
| **Date** | 2026-10-29 |
| **Category** | TECHNICAL |
| **Status** | PROPOSED |
| **Decision** | The rebuilt portal will be a web application. Tech stack (framework, SSR vs SPA, hosting) to be determined in Phase 2 Architecture decisions. |
| **Rationale** | No existing codebase or tech stack constraints were found in the workspace. Stack selection deferred to Phase 2 after source audit informs complexity and integration requirements. |
| **Alternatives Considered** | Pre-selecting React/Next.js immediately — deferred. Better to audit the existing portal first to understand API patterns and integration constraints. |
| **Impact** | Phase 2 must include a formal Architecture Decision Record (ADR) for tech stack. |
| **Approver** | PENDING — requires Phase 2 review |
| **Source References** | SRC-050 |
| **Open Questions** | OQ-002, OQ-003 |

---

### DEC-004

| Field | Value |
|---|---|
| **ID** | DEC-004 |
| **Date** | 2026-10-29 |
| **Category** | DESIGN |
| **Status** | APPROVED |
| **Decision** | Apply brand constraints as specified in the project brief: Primary #08A5B5, Secondary #132766, Heading font Kanit (≤500 weight), Body font Inter. Design philosophy: light, refined, calm, credible healthcare interface. |
| **Rationale** | Specified by client as non-negotiable brand constraints (SRC-050). |
| **Alternatives Considered** | None — brand constraints are fixed. |
| **Impact** | All UI components, design tokens, and visual QA must conform. Design system to be codified in Phase 2. |
| **Approver** | Principal Product Architect (per project brief, 2026-10-29) |
| **Source References** | SRC-030, SRC-050 |
| **Open Questions** | OQ-004 (formal brand guide and logo assets not yet obtained) |

---

### DEC-005

| Field | Value |
|---|---|
| **ID** | DEC-005 |
| **Date** | 2026-10-29 |
| **Category** | PROCESS |
| **Status** | APPROVED |
| **Decision** | Evidence classification system adopted: [VERIFIED], [INFERRED], [UNVERIFIED], [ASSUMED], [APPROVED] as defined in AGENTS.md §2. All project documents must apply these tags consistently. |
| **Rationale** | Prevents building on unvalidated assumptions about insurance product behaviour, API contracts, or regulatory requirements. |
| **Alternatives Considered** | No classification — rejected. Too high risk for an insurance product. |
| **Impact** | All team members and agents must classify every claim. Unverified items are not buildable until promoted to VERIFIED or formally accepted as ASSUMED. |
| **Approver** | Principal Product Architect (2026-10-29) |
| **Source References** | SRC-050 |
| **Open Questions** | None |

---

### DEC-006

| Field | Value |
|---|---|
| **ID** | DEC-006 |
| **Date** | 2026-10-29 |
| **Category** | TECHNICAL |
| **Status** | APPROVED |
| **Decision** | No mock or stub backend behaviour may be shipped to production. All production API integrations must be real, documented, and tested against the actual backend. |
| **Rationale** | Project brief invariant #7: "No mock behavior may be represented as functioning production capability." Insurance context makes this especially critical — a mock payment or mock policy issuance could harm customers. |
| **Alternatives Considered** | Mock-first development with feature flags — permitted in development/staging environments only; never in production builds. |
| **Impact** | Production build pipeline must include a check that strips or blocks mock/stub providers. |
| **Approver** | Principal Product Architect (per project brief, 2026-10-29) |
| **Source References** | SRC-050 |
| **Open Questions** | OQ-005 (API documentation from JA Assure not yet obtained) |

---

### DEC-007

| Field | Value |
|---|---|
| **ID** | DEC-007 |
| **Date** | 2026-10-29 |
| **Category** | TECHNICAL / PRODUCT |
| **Status** | APPROVED |
| **Decision** | Designate all actuarial premium math, pro-ration divisors, and underwriting acceptance decisions as strictly server-authoritative (`POST /api/calculatePremium`, `POST /api/getSpecialization`). The client portal is a presentation, validation, and serialization layer. The client must never guess or re-implement base rating schedules. |
| **Rationale** | Reconstructing or guessing insurance rating schedules on the client creates liability, divergence from Chubb filings, and risks mis-quoting. Server-authoritative contract preserves absolute rating integrity. |
| **Alternatives Considered** | Re-implementing rating formulas in client TypeScript — rejected. Unmaintainable, violates P-1 and regulatory compliance. |
| **Impact** | Defined in `PRICING_AND_TAX_CONTRACT.md` and `BUSINESS_RULE_CATALOG.md`. All quote states bound by server payload. |
| **Approver** | Principal Product Architect & Senior Solutions Architect (2026-10-29) |
| **Source References** | DOC-CON-PRICE-001, DOC-CAT-RULES-001 |
| **Open Questions** | UNVER-RATE-001, UNVER-RATE-002 |

---

### DEC-008

| Field | Value |
|---|---|
| **ID** | DEC-008 |
| **Date** | 2026-10-29 |
| **Category** | DESIGN / ACCESSIBILITY |
| **Status** | APPROVED |
| **Decision** | Adopt the 3-Tier DoctorShield Design Token Architecture (Primitives, Semantics, Components) with CSS custom properties (`src/design-system/tokens.css`) as the runtime source of truth. Preserve official brand root `#08A5B5` for non-text UI borders and focus rings (2.97:1 / 3:1 graphical ratio), while establishing derived **Deep Interactive Teal (`#066F7B`, 5.89:1)** for buttons and **High-Contrast Link Teal (`#055C66`, 7.69:1)** for body text links to guarantee 100% WCAG 2.2 AA compliance. Cap Kanit headings strictly at weight $\le 500$. |
| **Rationale** | Mathematical contrast verification proved `#08A5B5` text on white fails WCAG 2.2 AA (2.97:1 vs 4.5:1 requirement). Deriving accessible interaction colors preserves brand identity while protecting accessibility. |
| **Alternatives Considered** | (1) Arbitrarily changing brand primary — rejected. Brand primary is fixed. (2) Using navy buttons only — rejected. Dilutes teal brand recognition. (3) Ignoring contrast — strictly forbidden by P-10 and accessibility mandate. |
| **Impact** | Codified in `DESIGN_SYSTEM_FOUNDATIONS.md`, `tokens.css`, `tokens.ts`, `tokens.json`, and verified in `ACCESSIBILITY_CONTRAST_AUDIT.md`. |
| **Approver** | Principal Design Systems Architect & Accessibility Specialist (2026-10-29) |
| **Source References** | DOC-DS-FOUND-001, DOC-DS-TOKENS-001, DOC-DS-A11Y-001 |
| **Open Questions** | None |

---

### DEC-009

| Field | Value |
|---|---|
| **ID** | DEC-009 |
| **Date** | 2026-10-29 |
| **Category** | TECHNICAL / ARCHITECTURE |
| **Status** | APPROVED |
| **Decision** | Adopt a modern, modular, typed TypeScript + React 19 + Vite 6 Single Page Architecture with a Dual-Tier Hierarchical Finite State Machine (`src/core/state/machine.ts`), Zod 3.x schema validation, and Web Crypto AES-GCM 256-bit encrypted `sessionStorage` draft persistence. All rating, taxes, and binding remain 100% server-authoritative. Navigation history is trapped via `replaceState` for terminal states (`REFERRAL_LOCKED`, `POLICY_ISSUED`). |
| **Rationale** | Replaces fragile monolithic jQuery 3.3.1 DOM manipulation with typed, predictable state transitions. Dual-tier state prevents losing applicant identity (Tier 1) during coverage edits while guaranteeing instant cascade invalidation of stale quotes (Tier 2). Encrypted ephemeral storage ensures zero cross-session data leakage and full Malaysian PDPA 2010 compliance. |
| **Alternatives Considered** | (1) Next.js SSR/SSG — rejected due to pure client-side portal workflows behind banking/OTP authentication; unnecessary Node server footprint. (2) Monolithic un-encrypted localStorage — rejected due to XSS vulnerability and indefinite PII retention. (3) Client-side rating calculation — rejected per DEC-007 and P-1. |
| **Impact** | Codified in `ARCHITECTURE.md`, `DOMAIN_MODELS.md`, `API_CONTRACTS.md`, `STATE_MACHINE.md`, `VALIDATION_ARCHITECTURE.md`, `SECURITY_DESIGN.md`, and `IMPLEMENTATION_PLAN.md`. |
| **Approver** | Staff Software Architect & Senior Solutions Architect (2026-10-29) |
| **Source References** | DOC-ARCH-SYS-001, DOC-ARCH-STATE-001, DOC-ARCH-VAL-001, DOC-ARCH-SEC-001, DOC-ARCH-PLAN-001 |
| **Open Questions** | None |

---

### DEC-010

| Field | Value |
|---|---|
| **ID** | DEC-010 |
| **Date** | 2026-10-29 |
| **Category** | TECHNICAL / SECURITY |
| **Status** | APPROVED |
| **Decision** | Implement client-side cryptographic input sanitization (`InputSanitizer.sanitizeText`), strict PII redaction (`Logger.sanitizePayload`), production mock guards (`HttpClient.isMockAllowed()`), idempotency ledger tracking (`PROCESSED_IDEMPOTENCY_LEDGER`), and strict Content-Security-Policy headers. In production mode, mock fallbacks are completely prohibited to prevent uncommitted policy generation (Rule P-7). |
| **Rationale** | Protects the portal against XSS, injection attacks, duplicate bank charges, and PDPA 2010 PII leakage. Prevents issuing uncommitted policies in production if the gateway is temporarily unavailable. |
| **Alternatives Considered** | (1) Client-side mathematical simulation fallback in production — rejected per Rule P-7 and P-2. (2) Plaintext logging to console — rejected due to PDPA 2010 exposure of NRICs and contact details. |
| **Impact** | Documented in `SECURITY_REVIEW.md`, `INTEGRATION_VERIFICATION.md`, `FAILURE_AND_RECOVERY_TESTS.md`, `OBSERVABILITY_PLAN.md`, and `PRODUCTION_BLOCKERS.md`. |
| **Approver** | Staff Security Engineer, Senior Integration Engineer, Principal SRE (2026-10-29) |
| **Source References** | SEC-AUDIT-2026-10-29, INT-VERIFY-2026-10-29 |
| **Open Questions** | None |

---

## Content Change Request Log

| CCR ID | Date | Category | Proposed Change | Justification & Impact | Legal/Business Approver | Status |
|---|---|---|---|---|---|---|
| **CCR-001** | 2026-10-29 | UNDERWRITING | Formally retire or conditionally suppress Step 6 COVID-19 Supplementary Questionnaire (`is_active_supplementarty_covid_questions`). | Pandemic emergency orders expired. Removing unnecessary friction streamlines quote-to-bind conversion. | Chubb Chief Underwriter & JA Assure Compliance | ⏳ SUBMITTED FOR APPROVAL |
| **CCR-002** | 2026-10-29 | LEGAL | Modernize Cookie & Privacy Banner timestamp from "effective 1st November 2021 / update 1st March 2022" to current 2026 PDPA baseline. | 5-year stale timestamps harm credibility for an institutional insurance product. | JA Assure Legal & Compliance | ⏳ SUBMITTED FOR APPROVAL |
| **CCR-003** | 2026-10-29 | CONTENT | Correct typographical misspelling on `#jsPage8` screen header from `"PLEAESE CALL SUPPORT OFFICE"` to `"PLEASE CALL SUPPORT OFFICE"`. | Glaring typographical error on customer referral screen degrades professional brand perception. | JA Assure Product Owner | ⏳ SUBMITTED FOR APPROVAL |
| **CCR-004** | 2026-10-29 | CONTENT | Harmonize form validation copy (e.g. `"Please select Person In Charge (PIC)"` to `"Please indicate whether you are the Person In Charge (PIC)"`). | Resolves awkward grammar identified in `EXISTING_UX_ISSUES.md` without changing underlying insurance requirements. | JA Assure Product Owner | ⏳ SUBMITTED FOR APPROVAL |

---

## Superseded Decisions

*None yet.*

