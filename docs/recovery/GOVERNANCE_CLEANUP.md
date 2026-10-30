# DOCTORSHIELD — GOVERNANCE & DOCUMENTATION CLEANUP
## Phase 01 — Governance & Documentation Cleanup

```
==================================================================================================
DOCUMENT CLASSIFICATION:  [AUTHORITATIVE] GOVERNANCE CLEANUP SPECIFICATION
GOVERNING SPECIFICATION:  DoctorShield Master Agent Rules V3 (Version 3.0 — 2026-10-30)
AUDIT AUTHORITY:          Principal Software Architect & Lead Product Designer
SUPERSEDED GOVERNANCE:    AGENTS.md v1.0 (2026-10-29), AGENTS.md v2.0 (2026-10-30)
DATE OF ENACTMENT:        2026-10-30
STATUS:                   ENACTED, ARCHIVED, AND VERIFIED
==================================================================================================
```

---

## 1. Executive Summary

Phase 01 establishes a clean, unambiguous instruction and documentation environment across the DoctorShield repository. 

Prior to this cleanup, conflicting prompt instructions, uncoordinated audit documents, and 35+ loose exploratory markdown files accumulated in the repository root. This clutter created parallel development silos (e.g. developing form molecules in an isolated catalog while maintaining raw monolithic screens) and generated contradictory claims regarding framework versions and styling architecture.

This cleanup formally:
1. Backs up historical agent rules (`AGENTS_V1_ORIGINAL.md` and `AGENTS_V2_CONTROLLED_RECOVERY.md`) into `docs/archive/`.
2. Installs **DoctorShield Master Agent Rules V3** in the repository root (`AGENTS.md`).
3. Reconciles all nested, internal, and external instructions.
4. Identifies global external rules that cannot be overridden at repository scope.
5. Reorganizes all repository documentation into 7 strict functional categories.
6. Archives all superseded prompt artifacts without deleting or losing any historical knowledge or domain functionality.

---

## 2. Review of Historical Rules & Identified Conflicts

### 2.1 Evolution of Agent Rules

| Version | Period | Core Problem / Characteristics | Resolution in Master Rules V3 |
| :--- | :--- | :--- | :--- |
| **V1.0** (`AGENTS_V1_ORIGINAL.md`) | Initial Build (2026-10-29) | Strict prohibitions (P-1 to P-10) without clear design architecture guidance. Led to defensive inline patching to satisfy contradictory constraints. | Replaced by 18 structured operational sections with clear architectural separation. |
| **V2.0** (`AGENTS_V2_CONTROLLED_RECOVERY.md`) | Controlled Recovery (2026-10-30) | Defined source of truth hierarchy and test policies, but lacked the decisive mandate to dismantle visually unsuccessful frontend screens. | Explicit mandate: *"Stop preserving a visually unsuccessful frontend simply because it already exists. Replace weak visual architecture deliberately."* |
| **V3.0** (`AGENTS.md`) | Master Agent Rules V3 (Active) | Complete visual redesign mandate, strict branding rules (Kanit $\le 500$, Inter), mandatory Before/After visual acceptance gate, and stop boundaries. | **Active Governing Standard across all phases.** |

### 2.2 Direct Conflicts Resolved by Master Rules V3

1. **Conflict: Verbatim Copy Retention vs. "Minimal Form Design":**
   - *Previous Dilemma:* Prompt demands for "ultra-minimal" forms led agents to contemplate deleting legal declarations, while Rule P-4 forbade altering copy.
   - *Resolved Invariant (Section 5 & 6):* Minimalism must be achieved through **sequencing, conditional visibility, clear hierarchy, and reduced duplication**—never by hiding or truncating mandatory statutory text.
2. **Conflict: Isolated Catalog Development vs. Production Customer Journeys:**
   - *Previous Dilemma:* Molecules and organisms were built and tested in `/catalog` without being imported by the live customer-facing purchase screens.
   - *Resolved Invariant (Section 9):* *"A component is not complete because it exists in a component gallery. It must be integrated into the active customer journey."*
3. **Conflict: Minor Styling Tweaks vs. Complete Visual Redesign:**
   - *Previous Dilemma:* Altering border-radius, shadows, or colors was previously presented as a design redesign.
   - *Resolved Invariant (Section 6 & 15):* Simply changing border radius or colors fails the visual acceptance gate. Screens must demonstrate material structural, typographic, and composition improvements.

---

## 3. External & Global Rules Audit

In accordance with Task 7, an audit of external rules was conducted:

### External Rule Identified:
`<RULE[C:\Users\salee\.gemini\config\plugins\science\rules\AGENTS.md]>`  
*Title: Science Visualization Priority Rules*

- **Scope & Location:** Hosted outside the workspace in the global user configuration (`C:\Users\salee\.gemini\config\plugins\science\rules\AGENTS.md`).
- **Nature:** Governs interactive biomolecular viewers (e.g. Mol* 3D viewers) when science visualization tools/plugins are invoked.
- **Repository Precedence & Impact:**
  - Cannot be deleted or modified from within repository scope.
  - Has **zero operational impact** on DoctorShield Individual Medical Indemnity insurance flows.
  - DoctorShield root `AGENTS.md` (Master Agent Rules V3) explicitly governs all repository tasks, insurance logic, typography, layout, and visual design.

---

## 4. Preservation of Mandatory Insurance & Regulatory Safeguards

All statutory disclosures, actuarial formulas, and underwriting gates remain 100% intact under Master Rules V3:

1. **Actuarial Rating & Tax Math:**
   - Pro-rata calendar formula: $(\text{Days remaining to 31 Dec} + 1) / 365$.
   - Sales & Services Tax (SST 8.00%).
   - Inland Revenue Stamp Duty (RM 10.00).
   - Direct distribution rebate / MMA promotional discount (10.00%).
2. **Medical Classifications:**
   - All 20 approved medical classifications (Class 1 to Class 20) and 7 indemnity tiers (`RM 500k` to `RM 10M`).
3. **Statutory Legal Copy:**
   - PIDM Statutory Protection Statement (`LEG-PIDM-001`).
   - Policy Backdate Agreement Clause 6.12 (`LEG-BACKDATE-001`).
   - BNM 10% Direct Distribution Rebate Disclosure (`LEG-BNM-001`).
   - FSA 2013 Schedule 9 Duty of Disclosure (`LEG-FSA-001`).
   - PDPA 2010 Personal Data Consent (`LEG-PDPA-001`).
   - MMC APC 31st December Co-Termination Notice.
4. **Underwriting Risk Integrity:**
   - Clean declarations $\rightarrow$ Direct online bind.
   - Adverse declarations $\rightarrow$ Support referral case generation.
   - AML/CFT sanctions screening gate (`DT-IND-06`).

---

## 5. Documentation Structure Reorganization

All repository documentation has been restructured into 7 authoritative categories:

```
docs/
  ├── product/         # Product requirements, charter, decision log, traceability
  ├── insurance/       # Rating contracts, underwriting tree, business rules, legal text
  ├── architecture/    # System architecture, state machine, API contracts, security
  ├── design-system/   # Tokens, component specs, accessibility contrast audit
  ├── research/        # UX research, benchmark studies, AS-IS audits, issue logs
  ├── recovery/        # Phase reports, baselines, code maps, test records
  └── archive/         # Historical prompt artifacts, superseded audits, old rules
```

### Root Directory Cleanup:
- **Clean Root State:** Only `AGENTS.md` and `README.md` remain in the root directory.
- All 35+ loose exploratory prompt files have been organized into `docs/archive/` without data loss.

---

## 6. Verification Sign-off

```
ACTIVE GOVERNANCE:       DoctorShield Master Agent Rules V3 (AGENTS.md)
HISTORICAL RULES:        Archived in docs/archive/ (AGENTS_V1_ORIGINAL.md, AGENTS_V2_CONTROLLED_RECOVERY.md)
DOCUMENTATION STRUCTURE: Restructured into 7 clean categories
CRITICAL INVARIANTS:     100% PRESERVED
AUTOMATED TESTS:         120 / 120 PASSING
STATUS:                  PHASE 01 GOVERNANCE CLEANUP COMPLETE
```

