# Phase 07 — Premium Quotation & Optional Coverage Design Report

**Document ID:** `07_QUOTATION_AND_ADDONS_REPORT.md`  
**Version:** 3.0  
**Status:** COMPLETE (Awaiting Principal Product Designer & User Approval)  
**Date:** 2026-10-30  
**Author:** Principal Product Designer & Senior React Systems Architect  
**Scope:** DoctorShield Individual Medical Indemnity Portal (`Portal_ds`)

---

## 1. Executive Summary

In accordance with **Master Agent Rules V3** and the **Direction B: Structured Minimal Design Foundations**, Phase 07 has successfully transitioned the DoctorShield **Stage 2: Quotation & Optional Coverage Review** (`SCR-TOBE-02`) from the legacy card-nested aesthetic into an exceptionally refined, production-quality insurance quotation experience.

### Key Architectural & Design Transformations:

1. **Base Quotation Presentation (Part 1):**
   - Streamlined the top quotation banner to combine the **15-minute guaranteed rate lock** countdown, quote token, pro-rated policy term (e.g. 60 days to 31 December MMC APC co-termination), and annual gross equivalent into a quiet, unified card (`#FFFFFF`, 1px `#E2E8F0` border, 10px radius) without nested cards or decorative gradients.
   - Retained approved source values and wording from Chubb Insurance Malaysia Berhad without inventing mock tiers.

2. **Progressive Eligibility Questions (Part 2):**
   - Replaced heavy container boxes with clean, accessible binary and segmented interaction controls.
   - **Question 1 (Clinic Ownership):** Yes/No interactive radios with 44px min touch target, 6px radius, and clear `#08A5B5` active borders (`aria-checked`, `role="radio"`).
   - **Progressive Disclosure:** Answering "Yes" reveals only the adjacent practice structure questions (Sole Proprietor vs. Partnership / Sdn Bhd) and locum hiring question with a quiet 3px Teal accent bar.
   - **Questions 4 & 5 (PIC Status):** Person-In-Charge questions are presented through minimal, accessible interactions that dynamically control PIC add-on eligibility.

3. **Optional Coverage Modules (Part 3):**
   - Replaced oversized legacy cards with refined, un-nested add-on selection tiles:
     - **Clinic Entity Facility Indemnity:** Clear coverage scope (vicarious liability, nurse injection injuries, dispensing errors), "RECOMMENDED FOR CLINIC OWNERS" badge, "Why is this recommended?" modal trigger, 44px touch toggle, and interactive 3-tier establishment limit selector (RM 500k, RM 1M, RM 2M) with pro-rated rates.
     - **Person-In-Charge (PIC) Statutory Defense Extension:** Explicit statutory protection under PHFSA 1998, "RECOMMENDED FOR DESIGNATED PICS" badge, modal trigger, pro-rated premium calculation, and clean toggle action.
   - Applied Direction B selection states: Active `#F0FAFA` brand tint surface with a 2px solid `#08A5B5` stroke and high-contrast checkmark.

4. **Complimentary Automatic Reinstatement Endorsement (RULE-RST-01):**
   - Rendered as an elegant, emerald-accented statutory benefit callout (`#ECFDF5`, 1px `#6EE7B7` border, `#047857` text, `Sparkles` icon) clearly highlighting "COMPLIMENTARY INCLUDED" with RM 0.00 rate.

5. **Authoritative Pricing & Recalculation (Part 4 & 5):**
   - Dynamic real-time recalculation through `RatingService.calculatePremium`:
     - Toggling add-ons immediately invalidates stale quote state, triggers backend recalculation with loading feedback (`RefreshCw` spinner), and updates the authoritative workflow quote state.
     - Upstream change reconciliation: If clinic ownership or PIC status is toggled to "No", upstream add-ons are automatically deselected and an accessible warning banner alerts the user.
     - Proceed button is safely disabled during active recalculation to prevent invalid progression.
   - Summary sidebar on desktop displays the single authoritative itemized breakdown (Gross base, affinity discount, clinic add-on, PIC add-on, SST 8%, Stamp Duty RM 10, Total Payable).

6. **Fulfillment Choice & Dual Progression Paths:**
   - Designed clean choice cards for **Buy Now (Complete Application Online)** versus **Email Me Quotation & Policy Wording (30-day rate lock)**.
   - Seamlessly updates primary button CTA and routing.

---

## 2. Visual Acceptance Gate Comparison (Rule 15)

| Design Dimension | Old Legacy Stage 2 | Phase 07 Refined Stage 2 | Verification Evidence |
| :--- | :--- | :--- | :--- |
| **Container & Surfaces** | Heavy multi-level nested cards, grey background boxes, dark shadows | Flat, quiet `#FFFFFF` surface with 1px `#E2E8F0` borders and 10px radius | `docs/evidence/screenshots/stage2-base-quotation-desktop-1440px.png` |
| **Section Architecture** | Scattered ad-hoc sections with arbitrary font sizes and spacing | Structured `FieldGroup` sections with 3px Teal `#08A5B5` vertical accent bars | `Stage2QuoteReview.tsx` sections 1, 2, 4 |
| **Question Controls** | Chunky buttons with inconsistent hover/active states | 44px min touch target radios with `#F0FAFA` active background and 2px `#08A5B5` border | Verified in DOM across clinic and PIC questions |
| **Add-on Selection Tiles** | Monolithic cards with marketing fluff, colored gradients, and huge badges | Refined Direction B tiles, concise professional copy, clean 44px toggle buttons | `docs/evidence/screenshots/stage2-selected-addons-desktop-1440px.png` |
| **Rate Guarantee Bar** | Disconnected timer badge with generic styling | Integrated status card combining 15-min countdown, quote token, and pro-rata annual equivalent | Unified rate lock lockup in header |
| **Reconciliation Alerts** | Harsh red alerts or unannounced silent state drops | Gentle amber alert banner with clear rationale and dismiss action | `docs/evidence/screenshots/stage2-reconciliation-notice-desktop-1440px.png` |
| **Mobile Quality** | Obstructive sticky footer drawer hiding form controls | Full-width vertical flow, clean 44px touch targets, non-intrusive navigation | `docs/evidence/screenshots/stage2-quotation-mobile-390px.png` |
| **Typography & Numbers** | Inconsistent fonts and weights, variable decimal alignment | Kanit 500 headings, Inter 400/500 body, monospace tabular figures for all Ringgit values | Visual inspection across desktop and mobile |

---

## 3. Visual Evidence Artifacts

Headless Chrome visual evidence captured at 2x device scale factor:

1. **Base Quotation (Desktop 1440px):**
   - File: `docs/evidence/screenshots/stage2-base-quotation-desktop-1440px.png`
   - Demonstrates: Clean 2-column layout, 15-minute price lock active, pro-rata 60-day term, initial un-answered clinic/PIC profiling questions, automatic reinstatement endorsement, and authoritative desktop summary sidebar.

2. **Eligible Add-ons Revealed (Desktop 1440px):**
   - File: `docs/evidence/screenshots/stage2-eligible-addons-desktop-1440px.png`
   - Demonstrates: Answering "Yes" to clinic ownership progressively discloses Sole Proprietor / Sdn Bhd selection, locum question, and Clinic Entity Facility Indemnity tile. Answering "Yes" to PIC reveals the PIC Statutory Defense Extension tile.

3. **Selected Add-ons with Recalculation (Desktop 1440px):**
   - File: `docs/evidence/screenshots/stage2-selected-addons-desktop-1440px.png`
   - Demonstrates: Selected Clinic Add-on (with RM 1,000,000 limit tier selected) and Selected PIC Add-on. Summary sidebar dynamically recalculates and displays itemized clinic and PIC premiums with SST and updated Total Payable.

4. **Upstream Reconciliation Notice (Desktop 1440px):**
   - File: `docs/evidence/screenshots/stage2-reconciliation-notice-desktop-1440px.png`
   - Demonstrates: Toggling clinic ownership to "No" automatically deselects clinic package, triggers authoritative recalculation, and renders the amber reconciliation banner: *"Notice: Clinic facility protection was removed because clinic ownership is no longer declared."*

5. **Educational Modal Dialog (Desktop 1440px):**
   - File: `docs/evidence/screenshots/stage2-modal-dialog-desktop-1440px.png`
   - Demonstrates: Accessible "Why is Clinic Facility Cover Recommended?" dialog explaining vicarious liability with Understood action button.

6. **Tablet Viewport (768px):**
   - File: `docs/evidence/screenshots/stage2-quotation-tablet-768px.png`
   - Demonstrates: Responsive single-column flow with full touch targets and clean vertical rhythm.

7. **Mobile Viewport (390px - iPhone 14):**
   - File: `docs/evidence/screenshots/stage2-quotation-mobile-390px.png`
   - Demonstrates: Compact mobile layout, 46px touch targets, full-width selection tiles, and accessible navigation.

---

## 4. Functional & Insurance Logic Parity Verification

| Capability / Rule ID | Verified Insurance Requirement | Implementation & Preservation Evidence |
| :--- | :--- | :--- |
| **`FLD-QUOTE-RATE-LOCK-001`** | 15-Minute Guaranteed Rate Lock | Live countdown timer with quote token; refresh button upon expiration. |
| **`FLD-QUOTE-PRORATA-002`** | Pro-Rata Policy Term & Annual Equivalent | Computes exact pro-rata days (e.g. 60 days to 31 Dec) and displays annual equivalent. |
| **`FLD-QUOTE-CLINIC-OWN-008`** | Mandatory Clinic Ownership Question | Blocks progression if unanswered; reveals structure questions on "Yes". |
| **`FLD-QUOTE-CLINIC-TYPE-009`**| Practice Business Structure | Sole Proprietorship vs. Partnership / Sdn Bhd selection required if clinic owner. |
| **`FLD-QUOTE-LOCUM-HIRE-010`** | Locum Hiring Declaration | Captures whether clinic hires independent locums. |
| **`FLD-QUOTE-ADDON-CLINIC-014`**| Clinic Entity Facility Indemnity | Selectable modular protection; reveals 3-tier establishment limits (RM 500k, 1M, 2M). |
| **`FLD-QUOTE-PIC-OWN-011`** | PIC of Own Clinic Question | Captures statutory PHFSA 1998 role for practitioner's own facility. |
| **`FLD-QUOTE-PIC-EXT-012`** | PIC of Another Facility Question | Captures statutory role for external healthcare establishments. |
| **`FLD-QUOTE-ADDON-PIC-015`** | PIC Statutory Defense Extension | Selectable add-on enabled only if practitioner is PIC of own or external clinic. |
| **`RULE-RST-01`** | Automatic Reinstatement Endorsement | Complimentary included endorsement; restores 1x aggregate limit on claim; RM 0.00. |
| **`RECONCILIATION-01`** | Upstream Change Reconciliation | Auto-deselects clinic/PIC packages and warns user if prerequisite answers change. |
| **`RATING-SERVICE-01`** | Authoritative Recalculation | Dispatches full payload to `RatingService.calculatePremium`; updates quote breakdown. |
| **`FULFILLMENT-01`** | Online Application vs. Email Quote | Supports direct bind progression or emailing quotation schedule PDF with 30-day lock. |

---

## 5. Automated Test Suite Results

All 12 test suites, including Stage 2 unit tests, shell integration, and end-to-end scenarios, pass with 100% compliance:

```
 RUN  v5.0.5 C:/Users/salee/Downloads/Portal_ds

 ✓ src/test/security_and_reliability.test.tsx (17 tests) 253ms
 ✓ src/test/components.test.tsx (7 tests) 557ms
 ✓ src/test/atomic_components.test.tsx (10 tests) 759ms
 ✓ src/test/form_molecules.test.tsx (16 tests) 668ms
 ✓ src/test/organisms_and_compositions.test.tsx (18 tests) 1136ms
 ✓ src/test/secondary_features.test.tsx (11 tests) 1589ms
 ✓ src/test/stage2.test.tsx (8 tests) 2383ms
 ✓ src/test/shell.test.tsx (7 tests) 2225ms
 ✓ src/test/stage4.test.tsx (10 tests) 3291ms
 ✓ src/test/stage1.test.tsx (9 tests) 3403ms
 ✓ src/test/e2e_scenarios.test.tsx (6 tests) 5386ms
 ✓ src/test/stage3.test.tsx (11 tests) 7756ms

 Test Files  12 passed (12)
      Tests  130 passed (130)
   Start at  23:28:09
   Duration  10.11s
```

TypeScript Check:
```
> portal_ds@1.0.0 typecheck
> tsc --noEmit
[Exit Code: 0]
```

---

## 6. Summary of Modified Codebase Files

- `src/features/quote/Stage2QuoteReview.tsx`: Completely recomposed using `FieldGroup`, `Badge`, `Button`, and Direction B tokens.
- `scripts/capture_stage2_screenshots.cjs`: Automated multi-state headless Chrome screenshot suite capturing base quote, eligible add-ons, selected add-ons, reconciliation banner, modal dialog, tablet, and mobile.
- `docs/evidence/screenshots/stage2-*`: 7 new visual acceptance artifacts.

---

## 7. Conclusion & Stop for Review

Phase 07 is fully verified and complete. The customer-facing Stage 2 experience is now an exemplar of the approved DoctorShield design system—functional, clear, modular, accessible, and free of legacy nested cards.

**STOPPING EXECUTION FOR REVIEW AND APPROVAL BEFORE COMMENCING PHASE 08 (STAGE 3 PERSONAL PARTICULARS & UNDERWRITING).**

