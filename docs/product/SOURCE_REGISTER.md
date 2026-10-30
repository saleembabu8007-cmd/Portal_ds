# SOURCE REGISTER
## DoctorShield Individual Indemnity Portal Redesign

> **Purpose:** Authoritative inventory of every source of truth used in this project.
> All evidence cited in other documents must reference an entry here by its `SRC-NNN` ID.
> Classification key: [VERIFIED] | [INFERRED] | [UNVERIFIED] | [ASSUMED] | [APPROVED]

| Field | Value |
|---|---|
| **Version** | 0.1 — Inception |
| **Last Updated** | 2026-10-29 |
| **Owner** | Principal Product Architect |

---

## Convention

Each source entry records:

| Field | Description |
|---|---|
| **ID** | Unique identifier `SRC-NNN` |
| **Type** | `LIVE_PORTAL` / `DOCUMENT` / `API_RESPONSE` / `SCREENSHOT` / `EXTERNAL_WEB` / `STAKEHOLDER_STATEMENT` / `REGULATORY` |
| **Classification** | Evidence classification per AGENTS.md §2 |
| **Source URL / Path** | Direct URL or file path |
| **Observed / Obtained** | Date of observation or receipt |
| **Observer / Recipient** | Who captured it |
| **Description** | What this source contains and its relevance |
| **Archived At** | Local path to archived copy (screenshot, PDF, etc.) |
| **Notes** | Any caveats, expiry concerns, or follow-up actions |

---

## Primary Sources — Live Portal

| ID | Type | Classification | URL | Observed | Description | Archived At |
|---|---|---|---|---|---|---|
| SRC-001 | LIVE_PORTAL | [VERIFIED] | `https://my-individualindemnity.doctorshield.com/` | 2026-10-29 | Portal root / entry point. Existence confirmed via public search index and project brief. **Full screen audit not yet completed.** | ⏳ Pending — Phase 1 |
| SRC-002 | LIVE_PORTAL | [UNVERIFIED] | `https://my-individualindemnity.doctorshield.com/` — New Purchase flow | ⏳ | All screens of the new purchase journey. Screen-by-screen audit required. | ⏳ Pending — Phase 1 |
| SRC-003 | LIVE_PORTAL | [UNVERIFIED] | Renewal portal (URL unconfirmed; `quote.thedoctorshield.com/renew` referenced in external sources) | ⏳ | All screens of the renewal journey. Exact URL to be confirmed during audit. | ⏳ Pending — Phase 1 |
| SRC-004 | LIVE_PORTAL | [UNVERIFIED] | Payment gateway redirect (provider unknown) | ⏳ | Payment screen(s) and post-payment confirmation. Provider identity unconfirmed. | ⏳ Pending — Phase 1 |
| SRC-005 | LIVE_PORTAL | [UNVERIFIED] | Association-specific landing pages (MAAM, MMA, APHM, others) | ⏳ | Promo code / association discount entry points. URL patterns unknown. | ⏳ Pending — Phase 1 |

---

## Secondary Sources — External Public Documentation

| ID | Type | Classification | URL / Reference | Obtained | Description |
|---|---|---|---|---|---|
| SRC-010 | EXTERNAL_WEB | [VERIFIED] | `https://doctorshield.com` | 2026-10-29 | DoctorShield marketing site. Confirms product overview, brand positioning, JA Assure/Chubb relationship. |
| SRC-011 | EXTERNAL_WEB | [VERIFIED] | Chubb Insurance Malaysia Berhad product pages | 2026-10-29 | Underwriter confirmation. Chubb named as underwriter of individual medical indemnity product. |
| SRC-012 | EXTERNAL_WEB | [INFERRED] | Manipal Alumni Association Malaysia (manipal.org.my) — DoctorShield portal link page | 2026-10-29 | Describes portal flow steps, add-on options (locum, telemedicine, cyber, run-off, clinic), renewal URL, APC context. **Source is third-party; must be cross-validated against live portal.** |
| SRC-013 | EXTERNAL_WEB | [INFERRED] | `ja.deals` (JA Assure partner/affiliate content) | 2026-10-29 | Describes purchase confirmation flow, payment redirect, email issuance. Third-party; validate against portal. |
| SRC-014 | EXTERNAL_WEB | [VERIFIED] | `https://mmc.gov.my` — MMC APC information | 2026-10-29 | Malaysian Medical Council. APC annual renewal requires valid indemnity coverage — primary demand driver. |

---

## Regulatory Sources

| ID | Type | Classification | Reference | Description |
|---|---|---|---|---|
| SRC-020 | REGULATORY | [VERIFIED] | Financial Services Act 2013 (Malaysia) | Primary insurance regulatory statute. BNM is the supervisory authority. |
| SRC-021 | REGULATORY | [VERIFIED] | Personal Data Protection Act 2010 (Malaysia) | Governs all customer personal data handling in this portal. |
| SRC-022 | REGULATORY | [VERIFIED] | Malaysian Medical Council Act 1971 | Establishes MMC as practitioner registration authority; context for APC requirement. |
| SRC-023 | REGULATORY | [UNVERIFIED] | BNM guidelines on digital insurance distribution | Specific BNM circulars/guidelines applicable to this portal. Must be confirmed with legal/compliance owner. |

---

## Design / Brand Sources

| ID | Type | Classification | Reference | Description |
|---|---|---|---|---|
| SRC-030 | DOCUMENT | [VERIFIED] | Project brief — brand constraints provided by client | Primary colour #08A5B5, Secondary #132766, Kanit (≤500) + Inter fonts, design philosophy as specified. |
| SRC-031 | DOCUMENT | [UNVERIFIED] | DoctorShield brand guidelines document | Formal brand guide (if it exists). Must be requested from JA Assure. |
| SRC-032 | DOCUMENT | [UNVERIFIED] | DoctorShield official logo / SVG assets | Brand logo files. Must be requested or confirmed as available. |
| SRC-033 | EXTERNAL_WEB | [INFERRED] | Live portal screenshots (to be captured in Phase 1) | Observed typeface, colour, component, and spacing usage in the existing portal. |

---

## API / Technical Sources

| ID | Type | Classification | Reference | Description |
|---|---|---|---|---|
| SRC-040 | API_RESPONSE | [UNVERIFIED] | Backend quote / premium calculation API | Endpoint(s) unknown. Must be discovered via network inspection during Phase 1 audit. |
| SRC-041 | API_RESPONSE | [UNVERIFIED] | Backend policy issuance API | Endpoint(s) unknown. Triggered post-payment. |
| SRC-042 | API_RESPONSE | [UNVERIFIED] | Backend renewal API | Endpoint(s) unknown. |
| SRC-043 | API_RESPONSE | [UNVERIFIED] | Promo code / discount validation API | Endpoint(s) unknown. |
| SRC-044 | DOCUMENT | [UNVERIFIED] | API documentation / integration spec from JA Assure | Existence unconfirmed. Must be requested from JA Assure technical team. |
| SRC-045 | DOCUMENT | [UNVERIFIED] | Payment gateway integration documentation | Provider identity unknown. Documentation not yet obtained. |

---

## Stakeholder Statements

| ID | Type | Classification | Stakeholder | Date | Statement Summary |
|---|---|---|---|---|---|
| SRC-050 | STAKEHOLDER_STATEMENT | [VERIFIED] | Client (via project brief) | 2026-10-29 | Full product invariants, brand constraints, scope, and phase approach as detailed in the project brief. Treated as authoritative for Phase 0. |
| SRC-051 | STAKEHOLDER_STATEMENT | [UNVERIFIED] | JA Assure Business Owner | ⏳ | Named product owner confirmation of scope, constraints, and stakeholder contacts. Not yet received. |
| SRC-052 | STAKEHOLDER_STATEMENT | [UNVERIFIED] | JA Assure Legal/Compliance | ⏳ | Legal content freeze confirmation and approval process. Not yet received. |
| SRC-053 | STAKEHOLDER_STATEMENT | [UNVERIFIED] | Chubb Representative | ⏳ | Underwriting rules and product invariant confirmation. Not yet received. |

---

## Evidence Archive Structure

All captured evidence should be stored at:

```
/docs/evidence/
  screenshots/          — Numbered screenshots with YYYY-MM-DD prefix
  network/              — HAR files, API call logs (anonymised)
  documents/            — PDFs, brand guides, spec documents
  recordings/           — Screen recordings of user journeys (if captured)
```

File naming convention: `{SRC-ID}_{YYYY-MM-DD}_{description}.{ext}`
Example: `SRC-002_2026-10-29_new-purchase-step-01-landing.png`

---

## Register Completeness Status

| Category | Sources Registered | Sources Verified | Gap |
|---|---|---|---|
| Live Portal Screens | 5 | 1 (existence only) | 🔴 Phase 1 audit required |
| External Public Docs | 5 | 2 | 🟡 Cross-validation needed |
| Regulatory | 4 | 3 | 🟡 BNM guidelines TBC |
| Brand / Design | 4 | 1 (brief only) | 🔴 Brand guide + assets needed |
| API / Technical | 6 | 0 | 🔴 Phase 1 network audit required |
| Stakeholder Statements | 4 | 1 (brief only) | 🔴 Stakeholder contacts needed |

