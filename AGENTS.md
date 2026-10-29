# DoctorShield Individual Indemnity — Antigravity Agent Rules

> **Scope:** These rules govern every AI agent, subagent, and automated task operating
> on this repository. They take precedence over all general-purpose agent defaults.
> Last updated: 2026-10-29. Owner: Principal Product Architect.

---

## 0. Identity & Mission

You are operating on the **DoctorShield Individual Medical Professional Indemnity**
portal redesign project. The product is underwritten by Chubb Insurance Malaysia Berhad
and distributed by JA Assure via `my-individualindemnity.doctorshield.com`.

Your mission is to rebuild the customer-facing portal to a production-ready, accessible,
brand-faithful standard **without altering any approved insurance product, underwriting
logic, legal content, or regulatory obligation**.

---

## 1. Absolute Prohibitions — Never Do These

| # | Rule |
|---|------|
| P-1 | Never invent, modify, or omit any insurance benefit, coverage limit, premium, eligibility rule, exclusion, or add-on dependency. |
| P-2 | Never invent, call, or stub an undocumented API endpoint as if it were functional. |
| P-3 | Never transmit a real OTP, email, payment request, or policy-changing API call during research, prototyping, or testing phases. |
| P-4 | Never alter legal notices, disclosures, regulatory statements, or policy wordings without explicit written approval recorded in DECISION_LOG.md. |
| P-5 | Never access, store, log, or process real customer PII beyond what is technically necessary for the authorised build task in progress. |
| P-6 | Never defeat or bypass any authentication, authorisation, payment security, or session integrity control — even in a dev/test environment — unless explicitly sanctioned in writing and logged. |
| P-7 | Never represent prototype or mock behaviour as a functioning production capability in any user-facing copy, commit message, or document. |
| P-8 | Never commit directly to `main` or `production` branches. All changes require a reviewable PR and phase acceptance sign-off per PHASE_ACCEPTANCE.md. |
| P-9 | Never proceed to the next major phase without a recorded acceptance checkpoint in PHASE_ACCEPTANCE.md. |
| P-10 | Never remove or hide a required customer-facing question, disclosure, consent checkbox, or link, even if it appears redundant. |

---

## 2. Evidence & Classification Standards

All findings, content, and behaviours recorded in project documents **must** be classified:

```
[VERIFIED]   — Directly confirmed by live portal observation, source code, or official documentation.
[INFERRED]   — Reasonably deduced from context, pattern, or partial evidence. Must be flagged for validation.
[UNVERIFIED] — Not yet confirmed. Must not be built against until verified or explicitly accepted as an assumption.
[ASSUMED]    — Recorded assumption accepted for progress; must be confirmed before production release.
[APPROVED]   — Explicitly approved by the named business/legal/technical owner, with date and reference.
```

Never mix classification levels in a single statement. When uncertain, use the most
conservative classification and flag for resolution.

---

## 3. Content Preservation Rules

- All existing customer-facing **questions, field labels, help text, options, and choices**
  must be reproduced verbatim until a formal content review with the business/legal owner
  is completed and recorded in DECISION_LOG.md.
- **Legal and regulatory text** (terms, conditions, disclaimers, PDFs referenced, links to
  BNM/Chubb/MMC resources) must be preserved exactly and linked correctly.
- UX changes that **reorder, progressively disclose, or contextually surface** content are
  permitted, provided no content is omitted and the change is logged in DECISION_LOG.md.
- Any proposed wording change to insurance or legal content requires a `CONTENT-CHANGE-REQUEST`
  entry in DECISION_LOG.md before implementation.

---

## 4. Build & Code Standards

### 4.1 General
- Write idiomatic, typed, well-commented code.
- Prefer established patterns already present in the codebase over novel abstractions.
- Every new component, hook, or utility must have a corresponding unit test.
- Integration tests must cover all quote, payment, and renewal user journeys.
- Accessibility: WCAG 2.1 AA minimum. Test with axe-core on every component.

### 4.2 Brand Compliance
- Primary colour: `#08A5B5` | Secondary: `#132766`
- Heading font: **Kanit**, weight 400–500 only. Never bold (600+).
- Body font: **Inter**, weight 400–500.
- No emoji, decorative medical imagery, oversized shadows, or unnecessary gradients.
- All spacing must follow the defined 4 px base grid.
- Refer to `/docs/design-system/TOKENS.md` (to be created in Phase 2) for all design tokens.

### 4.3 Security
- No secrets, API keys, or credentials in source code. Use environment variables.
- All environment variables must be documented in `.env.example` (values redacted).
- Input validation on every form field — client and server side.
- Content Security Policy headers required in production.
- No `dangerouslySetInnerHTML` without sanitisation + review.
- Session tokens must be httpOnly, Secure, SameSite=Strict.

### 4.4 Performance
- Lighthouse score targets: Performance ≥ 90, Accessibility = 100, Best Practices ≥ 95, SEO ≥ 90.
- Core Web Vitals targets: LCP < 2.5 s, INP < 200 ms, CLS < 0.1.

---

## 5. Document Maintenance Rules

- **SOURCE_REGISTER.md**: Update whenever a new source (live portal screen, document, API
  response) is observed or obtained. Tag with classification.
- **DECISION_LOG.md**: Log every design, product, legal, or technical decision that deviates
  from or extends the source portal behaviour. No decision is implemented without a log entry.
- **ASSUMPTIONS_AND_OPEN_QUESTIONS.md**: Every INFERRED or UNVERIFIED item must be logged here
  with an owner and target-resolution date.
- **REQUIREMENTS_TRACEABILITY.md**: Every requirement must trace to a source evidence item.
  Every implemented feature must trace to a requirement.
- **PHASE_ACCEPTANCE.md**: Phase completion is only recorded here after all checklist items
  for that phase are met and signed off by the named approver.

---

## 6. Phase Gate Protocol

Before starting any new major phase:

1. Confirm all open questions for the current phase are resolved or formally deferred.
2. Record phase completion entry in PHASE_ACCEPTANCE.md.
3. Get explicit user/owner confirmation.
4. Create a git tag `phase-N-accepted` on the relevant commit.
5. Only then proceed.

---

## 7. Research & Reconnaissance Rules

- Live portal observation is read-only. Do not submit real data.
- Use test/dummy data (e.g., fictional MMC numbers, test card numbers provided by the payment
  provider) for all form interaction during research.
- Screenshot and archive all observed screens. Store in `/docs/evidence/screenshots/`.
- Record the observation date and URL for every captured screen.
- Do not rely on memory of a prior session; always re-verify against a current observation.

---

## 8. Communication Standards

- Surface VERIFIED vs INFERRED vs UNVERIFIED distinctions clearly in all responses.
- When blocked by a missing decision, explicit state the blocker and the needed input.
- Do not guess at legal, regulatory, or underwriting intent. Escalate.
- Prefer small, reviewable change sets over large monolithic commits.

---

## 9. Regulatory Context (Malaysia)

- Insurance regulated by **Bank Negara Malaysia (BNM)** under the Financial Services Act 2013.
- Medical practitioners regulated by **Malaysian Medical Council (MMC)**.
- Annual Practicing Certificate (APC) renewal is a key driver for policy renewals.
- Personal Data Protection Act 2010 (PDPA) applies to all customer data handling.
- Any regulatory reference must be verified against the authoritative source before use.

---

*These rules are living. Propose amendments via a PR to this file with a rationale comment.*

