# PROJECT CHARTER
## DoctorShield Individual Medical Professional Indemnity Insurance — Portal Redesign

| Field | Value |
|---|---|
| **Project Name** | DoctorShield Individual Indemnity Portal Redesign |
| **Version** | 0.1 — Draft for Review |
| **Date Issued** | 2026-10-29 |
| **Document Owner** | Principal Product Architect |
| **Status** | Phase 0 — Inception |

---

## 1. Executive Summary

This project delivers a complete production redesign of the DoctorShield Individual
Medical Professional Indemnity Insurance customer portal, currently at:

> `https://my-individualindemnity.doctorshield.com/`

The objective is to rebuild the customer-facing experience to an exceptionally high
professional standard — improving clarity, usability, accessibility, and brand coherence
— while **preserving every approved insurance product behaviour, legal obligation, and
underwriting rule** precisely as currently implemented.

This is a front-end and integration rebuild, not a product change. The underlying
insurance product (underwritten by Chubb Insurance Malaysia Berhad, distributed by
JA Assure) is not within scope for modification.

---

## 2. Business Context

### 2.1 Product Description [VERIFIED via public sources]
- **Product:** Individual Medical Professional Indemnity Insurance
- **Underwriter:** Chubb Insurance Malaysia Berhad
- **Distributor/Platform Owner:** JA Assure (an InsurTech multinational)
- **Target Market:** Individual Malaysian medical practitioners (doctors, dentists, allied
  health professionals)
- **Regulatory Requirement Driver:** Malaysian Medical Council (MMC) Annual Practicing
  Certificate (APC) renewal requires valid professional indemnity coverage

### 2.2 Strategic Rationale
- The existing portal delivers a functional but suboptimal user experience
- Brand expression is inconsistent with DoctorShield's positioning as a credible,
  professional healthcare-focused InsurTech
- Accessibility gaps create risk of regulatory non-compliance (WCAG)
- Technical debt in the existing frontend may limit future feature velocity
- A redesigned portal must retain all customer trust signals: regulatory affiliations,
  policy documents, Chubb branding, and transparent pricing

### 2.3 Key Regulatory Context [VERIFIED via public sources]
- Financial Services Act 2013 — Insurance regulation by Bank Negara Malaysia (BNM)
- Personal Data Protection Act 2010 (PDPA) — Customer data obligations
- Malaysian Medical Council Act 1971 — Practitioner registration context
- APC renewal cycle is the primary annual demand driver for policy renewals

---

## 3. Scope

### 3.1 In Scope
- [ ] Customer-facing portal redesign (new purchase and renewal journeys)
- [ ] Quote calculation and display
- [ ] Professional details and eligibility form flows
- [ ] Add-on / endorsement selection (locum, telemedicine, cyber, run-off, clinic)
- [ ] Promo code / association discount application
- [ ] Pre-payment policy document review (terms, policy wording, PDPA notice)
- [ ] Payment gateway integration (redirection to existing provider)
- [ ] Payment confirmation and policy issuance confirmation screens
- [ ] Renewal journey (dedicated renewal portal)
- [ ] Referral/manual review pathway notification
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Accessibility to WCAG 2.1 AA
- [ ] Brand design system implementation (colours, typography, spacing, components)
- [ ] Security hardening (headers, input validation, session management)
- [ ] Automated testing (unit, integration, E2E)
- [ ] Production deployment configuration

### 3.2 Explicitly Out of Scope
- Changes to insurance product benefits, limits, or premiums
- Changes to underwriting rules or eligibility criteria
- Backend underwriting system or policy administration system
- Claims management
- Customer account management portal (post-issuance)
- Group/corporate policy products
- New insurance products not currently offered
- Payment gateway infrastructure (use existing provider, passthrough only)
- Content changes to legal text, policy wordings, or regulatory disclosures without
  explicit business/legal owner approval

### 3.3 Assumptions on Scope [ASSUMED — requires confirmation]
- The existing API endpoints and backend services remain unchanged
- The payment gateway provider remains unchanged
- No new insurance products, add-ons, or eligibility tiers are to be introduced in this phase
- Email/notification delivery infrastructure remains unchanged

---

## 4. Stakeholders

| Role | Responsibility | Status |
|---|---|---|
| Business Owner (JA Assure) | Product decisions, legal content approval | ⚠️ Not yet identified by name |
| Legal/Compliance Owner | Regulatory content approval | ⚠️ Not yet identified by name |
| Underwriting Owner (Chubb) | Insurance product invariant confirmation | ⚠️ Not yet identified by name |
| Principal Product Architect | Overall technical & design leadership | Active |
| Frontend Engineering Lead | Implementation | TBD |
| QA Lead | Test strategy and execution | TBD |
| Payment Gateway Contact | Integration support | ⚠️ Not yet identified |
| BNM / Regulatory | External — compliance reference only | N/A |

> **Open Question OQ-001:** Named stakeholder contacts for business, legal, and Chubb
> underwriting owners have not yet been identified. These are blocking for any legal
> content changes or product clarifications. See ASSUMPTIONS_AND_OPEN_QUESTIONS.md.

---

## 5. Success Criteria (Definition of Done — Project Level)

| # | Criterion | Measurement |
|---|---|---|
| SC-1 | All existing customer-facing content preserved | Content audit against source portal: 0 omissions |
| SC-2 | All existing underwriting pathways and rules functional | Test matrix against source behaviour: pass all |
| SC-3 | WCAG 2.1 AA compliance | axe-core + manual screen reader audit: 0 violations |
| SC-4 | Brand compliance | Design QA review: 0 brand violations |
| SC-5 | Lighthouse scores | Performance ≥ 90, A11y = 100, Best Practices ≥ 95, SEO ≥ 90 |
| SC-6 | Core Web Vitals | LCP < 2.5 s, INP < 200 ms, CLS < 0.1 |
| SC-7 | Security | Zero high/critical findings in security audit |
| SC-8 | Test coverage | Unit ≥ 80%, E2E covers all primary journeys |
| SC-9 | No mock behaviour shipped | Production review: 0 stub/mock endpoints in prod build |
| SC-10 | Phase acceptance | All phase checklists completed in PHASE_ACCEPTANCE.md |

---

## 6. Delivery Phases

| Phase | Name | Key Deliverables | Gate |
|---|---|---|---|
| **0** | Inception & Documentation | Charter, source register, decision log, assumptions, traceability matrix, acceptance criteria | Owner sign-off on charter |
| **1** | Source Audit & Requirements | Complete source portal audit, verified requirements, UX audit, content inventory | Requirements sign-off |
| **2** | Design System & Architecture | Design tokens, component library spec, tech stack decision, architecture decision records, API map | Architecture + design sign-off |
| **3** | Core Journey Build | New purchase flow: quote → details → add-ons → payment redirect → confirmation | Journey demo + test pass |
| **4** | Renewal Journey Build | Renewal flow complete, referral pathway | Journey demo + test pass |
| **5** | Integration & Security | Full API integration (non-mock), payment gateway, email confirmation, security hardening | Pen test + integration test pass |
| **6** | QA, Accessibility & Performance | Full test suite, accessibility audit, performance audit | All success criteria met |
| **7** | Staging & UAT | Staging deployment, UAT with business owner | UAT sign-off |
| **8** | Production Release | Production deployment, smoke tests, monitoring | Go-live sign-off |

---

## 7. Constraints & Risks

| ID | Item | Type | Mitigation |
|---|---|---|---|
| C-1 | Insurance product invariants must not change | Constraint | Formal requirements traceability; no product changes without Chubb/JA Assure approval |
| C-2 | Legal text verbatim requirement | Constraint | Content freeze until legal owner approves any change |
| C-3 | Live portal is the primary source of truth | Constraint | Systematic screen-by-screen audit before building |
| C-4 | API documentation may not exist | Risk | Source audit to include network traffic inspection; log all discovered endpoints |
| C-5 | Payment gateway integration details unknown | Risk | Identify gateway provider; obtain integration documentation |
| C-6 | Named stakeholders not yet confirmed | Risk | Block phase gates that require approvals until contacts are confirmed |
| R-1 | Source portal may change during redesign | Risk | Snapshot source portal; monitor for changes; re-audit if changes detected |
| R-2 | Regulatory changes (BNM/MMC) during project | Risk | Designate regulatory monitoring responsibility |

---

## 8. Document Conventions

See individual documents in `/docs/` for detailed conventions. Summary:

- **[VERIFIED]** — Directly confirmed from source
- **[INFERRED]** — Reasonably deduced; must be validated
- **[UNVERIFIED]** — Not confirmed; cannot be built against
- **[ASSUMED]** — Accepted for progress; must be confirmed before production
- **[APPROVED]** — Explicitly approved with date and named approver

---

## 9. Charter Approval

| Approver | Role | Date | Signature |
|---|---|---|---|
| *(Business Owner)* | JA Assure Product Owner | — | ⏳ Pending |
| *(Legal Owner)* | JA Assure Compliance | — | ⏳ Pending |
| *(Underwriting Owner)* | Chubb Representative | — | ⏳ Pending |
| Principal Product Architect | Engineering/Design Lead | 2026-10-29 | ✓ Issued |

> **This charter is a living document.** Changes require a logged entry in DECISION_LOG.md
> and re-approval from affected stakeholders.

