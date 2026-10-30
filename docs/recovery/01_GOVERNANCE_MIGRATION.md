# DOCTORSHIELD — GOVERNANCE MIGRATION & DIRECTIVE RECONCILIATION
## Establishing a Clean, Unambiguous Instruction Environment for Controlled Recovery

```
==================================================================================================
DOCUMENT CLASSIFICATION:  [VERIFIED] GOVERNANCE MIGRATION RECORD
GOVERNING AUTHORITY:      DoctorShield Product Engineering & Design Rules (Version 2.0)
AUDIT AUTHORITY:          Independent Staff Software Engineer & Technical Recovery Architect
DATE OF ENACTMENT:        2026-10-30
RECOVERY CHECKPOINT:      Branch: recovery/checkpoint-phase01-baseline @ Commit: 3d5d018
SUPERSEDED GOVERNANCE:    AGENTS.md v1.0 (2026-10-29), Historical Prompt Instructions
==================================================================================================
```

---

## 1. Executive Statement

During earlier prototyping and audit phases, conflicting instructions and unverified assumptions accumulated in the repository. These conflicts led to parallel development forks (creating modern atomic molecules in an isolated catalog while patching monolithic stage screens with raw HTML), fabricated technology version claims (React 18, Vite 5, Tailwind CSS), and hallucinated directory paths (`src/components/atoms`, `src/styles/tokens.ts`, `QuoteStage*`).

This document records the **formal migration of project governance** to the **DoctorShield Product Engineering & Design Rules (Version 2.0 — Controlled Recovery)**, superseding all contradictory historical instructions, clarifying absolute constraints, and establishing a single, coherent directive set for all future work.

---

## 2. Active, Obsolete, and Conflicting Instructions

### 2.1 Active Instructions (Governing Reality)
1. **`AGENTS.md` (Version 2.0 — Controlled Recovery):** Fully updated in the repository root. Governs all design, architectural, testing, and implementation tasks.
2. **Authoritative Statutory Requirements:**
   - Bank Negara Malaysia (BNM) 10% direct distribution rebate disclosure.
   - Financial Services Act 2013 (FSA 2013) Schedule 9 pre-contractual duty of disclosure.
   - Personal Data Protection Act 2010 (PDPA 2010) personal data processing consent.
   - Malaysia Deposit Insurance Corporation (PIDM) non-protection notice for professional indemnity.
   - Malaysian Medical Council (MMC) Annual Practicing Certificate (APC) regulatory alignment.
3. **Core Actuarial & Underwriting Contracts:**
   - `docs/PRICING_AND_TAX_CONTRACT.md` (Chubb base rating table, pro-rata fraction math, SST 8%, stamp duty RM 10.00).
   - `docs/UNDERWRITING_DECISION_TREE.md` (DT-IND-01..06, DT-CLN-01..06, DT-BRN-01..04, RM 5,000,000 clinic revenue ceiling).
   - `docs/CONTENT_MASTER.md` (Verbatim statutory copy register).
4. **Verified Runtime Stack:**
   - React 19.3.1, ReactDOM 19.3.1, Vite 8.3.5, Vitest 5.0.5, TypeScript 7.0.2.
   - Plain CSS Custom Properties (`src/design-system/tokens.css`, `foundation.css`, `layout.css`).

### 2.2 Obsolete Instructions (Formally Retired)
1. **Tailwind CSS Directives:** Any instruction to install, configure, or use Tailwind CSS utility classes is retired. The project does not use Tailwind.
2. **Fabricated File Paths:** Any historical reference to `src/components/atoms/`, `src/styles/tokens.*`, or `src/features/quote/QuoteStage1..5.tsx` is obsolete. The active directories are `src/components/ui/`, `src/design-system/`, and `src/features/coverage/`, `src/features/quote/`, `src/features/particulars/`, `src/features/review/`, `src/features/confirmation/`.
3. **External FX Libraries:** Any instruction referencing `canvas-confetti` is obsolete.

### 2.3 Reconciled Conflicting Directives

#### Conflict A: Rule P-10 (Verbatim Copy Retention) vs. "Ultra-Minimal Form Layout"
- **The Conflict:** Prompt instructions demanded that screens feel *"calm, extremely minimal, and effortless to scan"* while Rule P-10 prohibited removing or hiding any question or disclosure. Early iterations attempted to satisfy both by adding inline CSS hacks and collapsing panels, resulting in 1,600-line monolithic files.
- **The Reconciled Rule (Section 4 — Content Governance):**
  - *Minimalism must be achieved primarily through information architecture, not invented replacement copy.*
  - Mandatory legal text and essential insurance questions must be preserved verbatim.
  - Progressive disclosure is explicitly authorized: secondary questions or explanatory terms may be displayed conditionally or housed in accessible contextual disclosures (e.g. modals, drawers, expanders) provided the legal requirement for timing and acknowledgment is satisfied.
  - Shorter visual presentation does **not** authorize shorter legal text.

#### Conflict B: Catalog Development vs. Production Integration
- **The Conflict:** Wave 2 agents built 20 modern Form Molecules in `src/components/form/` and showcased them in `src/catalog/CatalogApp.tsx`, while Wave 3 agents continued maintaining the raw HTML screens in `src/features/` to avoid breaking 120 passing Vitest tests.
- **The Reconciled Rule (Section 7 — Design System Architecture):**
  - *The runtime application, not the isolated component catalog, is the authority for successful design-system adoption.*
  - A component is not considered implemented until it is **integrated into the live application screens**.
  - All feature screens must compose approved shared components from `src/components/form/` and `src/components/ui/` rather than recreating controls with raw markup and inline style objects.

---

## 3. Superseding Register

| Former Directive / Instruction | Source Document / Prompt | Replacement Directive (Rules v2.0) | Justification |
|:---|:---|:---|:---|
| "Build atomic UI in `src/components/atoms/`" | Historical Prompts & Reports 03, 05 | Primitives are in [`src/components/ui/`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/ui/). | Physical codebase truth. |
| "Maintain design tokens in `src/styles/`" | Historical Prompts & Report 04 | Tokens are in [`src/design-system/`](file:///c:/Users/salee/Downloads/Portal_ds/src/design-system/). | Physical codebase truth. |
| "Refactor `QuoteStage1` through `QuoteStage5`" | Historical Prompts & Master Audit | Refactor [`Stage1CoverageForm`](file:///c:/Users/salee/Downloads/Portal_ds/src/features/coverage/Stage1CoverageForm.tsx) through [`Stage5PolicyConfirmation`](file:///c:/Users/salee/Downloads/Portal_ds/src/features/confirmation/Stage5PolicyConfirmation.tsx). | Correct active screen paths. |
| "Add Tailwind utility classes" | Historical Prompts | Use CSS custom properties from `tokens.css`. | Tailwind is not in `package.json`. |
| "All content changes approved in DECISION_LOG" | Audit Report 08 | CCR-001..004 are `⏳ SUBMITTED FOR APPROVAL`. Approval requires written sign-off. | Eliminates false approval claims. |
| "Rating and payments are live backend integrations" | Previous Audit Summaries | All services currently operate on audited client-side simulation. | Accurate integration transparency. |

---

## 4. External Agent & Plugin Rules Outside Repository Scope

A scan of applicable agent configuration identified an external system rule injected from the user's environment:
- **Location:** `C:\Users\salee\.gemini\config\plugins\science\rules\AGENTS.md`
- **Scope:** Governs scientific plugins (Biomolecular Structure Viewer, AlphaFold, PDB, Mol*).
- **Project Impact Assessment:** **Zero Impact.**
  - This rule is located in global user plugin storage outside the repository boundary.
  - It has no relevance to Malaysian medical professional indemnity insurance.
  - The repository contains zero biological data, tools, or dependencies.
  - **Directive:** This external rule is acknowledged as an immutable global plugin configuration and will be completely ignored for all DoctorShield tasks.

---

## 5. Verification Checklist

- [x] `AGENTS.md` in repository root updated to Version 2.0 (Controlled Recovery).
- [x] Conflicting visual and architectural directives formally superseded.
- [x] Mandatory insurance, regulatory, and privacy constraints explicitly preserved.
- [x] External plugin rules documented as out-of-scope.
- [x] Working tree uncommitted changes preserved with 100% fidelity.

---
*Certified by Independent Staff Software Engineer & Technical Recovery Architect.*

