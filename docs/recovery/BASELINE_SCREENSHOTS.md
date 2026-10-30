# DOCTORSHIELD — BASELINE SCREENSHOT INVENTORY & VISUAL AUDIT
## Phase 00 — Safe Baseline & Repository Verification

```
==================================================================================================
DOCUMENT CLASSIFICATION:  [AUTHORITATIVE] VISUAL BASELINE REGISTER & INSPECTION AUDIT
GOVERNING SPECIFICATION:  DoctorShield Master Agent Rules V3 (Section 15 — Visual Acceptance Gate)
EVIDENCE REPOSITORY:      docs/evidence/screenshots/
AUTOMATION SUITE:         scripts/capture_*.cjs via Headless Chrome / Puppeteer
VIEWPORTS TESTED:         Desktop: 1440x900 (2x scale) | Mobile: 390x844 (iPhone 14/15, 2x scale)
==================================================================================================
```

---

## 1. Visual Acceptance Gate Architecture

Under **DoctorShield Master Agent Rules V3 (Section 15 — Visual Acceptance Gate)**, every screen redesign must undergo rigorous before/after visual comparison under identical viewport, state, and test data conditions.

This register establishes the **authoritative baseline captures** for every application stage prior to subsequent phase redesigns.

---

## 2. Complete Baseline Screenshot Register

| Stage & Screen Name | Viewport | Screenshot File Path | Status & Visual Characteristics |
| :--- | :--- | :--- | :--- |
| **Stage 1 (Before)** | Desktop 1440px | `docs/evidence/screenshots/stage1-before-desktop-1440px.png` | Baseline: Legacy layout with nested containers, heavy cards, and high cognitive load. |
| **Stage 1 (Before)** | Mobile 390px | `docs/evidence/screenshots/stage1-before-mobile-390px.png` | Baseline: Legacy mobile view with stacked milestone steps and vertical sprawl. |
| **Stage 1 (Refined)**| Desktop 1440px | `docs/evidence/screenshots/stage1-refined-desktop-1440px.png` | Refined Phase 06: Open layout, atomic components, 4-segment linear stepper, sticky sidebar. |
| **Stage 1 (Refined)**| Mobile 390px | `docs/evidence/screenshots/stage1-refined-mobile-390px.png` | Refined Phase 06: Streamlined single-line step badge, 44px min touch targets, bottom bar. |
| **Stage 1 (Modal)**  | Desktop 1440px | `docs/evidence/screenshots/stage1-modal-desktop-1440px.png` | Refined Phase 06: Accessible MMC APC 31st Dec information dialogue with backdrop blur. |
| **Stage 2 (Before)** | Desktop 1440px | `docs/evidence/screenshots/stage2-before-desktop-1440px.png` | Baseline for Phase 07: Indicative quote, 15m rate lock, Clinic & PIC add-on cards. |
| **Stage 2 (Before)** | Mobile 390px | `docs/evidence/screenshots/stage2-before-mobile-390px.png` | Baseline for Phase 07: Mobile view of add-on cards, educational modals, and continue CTA. |
| **Stage 3 (Before)** | Desktop 1440px | `docs/evidence/screenshots/stage3-before-desktop-1440px.png` | Baseline for Phase 08: Standard practitioner particulars and clean underwriting declaration. |
| **Stage 3 (Before)** | Mobile 390px | `docs/evidence/screenshots/stage3-before-mobile-390px.png` | Baseline for Phase 08: Mobile layout of NRIC inputs, practice address, and declarations. |
| **Stage 3 (Complex)**| Desktop 1440px | `docs/evidence/screenshots/stage3-after-complex-desktop-1440px.png`| Baseline: Clinic owner with 3 additional branches and expanded branch revenue inputs. |
| **Stage 3 (Complex)**| Mobile 390px | `docs/evidence/screenshots/stage3-after-complex-mobile-390px.png` | Baseline: Mobile responsiveness of multi-branch revenue ceiling verification. |
| **Stage 4 (Before)** | Desktop 1440px | `docs/evidence/screenshots/stage4-before-desktop-1440px.png` | Baseline for Phase 09: Itemized financial summary table, BNM rebate, payment channel options. |
| **Stage 4 (Before)** | Mobile 390px | `docs/evidence/screenshots/stage4-before-mobile-390px.png` | Baseline for Phase 09: Mobile layout of summary breakdown and affirmative legal checkboxes. |
| **Stage 5 (Before)** | Desktop 1440px | `docs/evidence/screenshots/stage5-before-desktop-1440px.png` | Baseline for Phase 10: Policy confirmation certificate, policy schedule PDF download. |
| **Stage 5 (Before)** | Mobile 390px | `docs/evidence/screenshots/stage5-before-mobile-390px.png` | Baseline for Phase 10: Mobile view of policy certificate and MMC renewal instructions. |
| **Atoms & Molecules**| Desktop 1440px | `docs/evidence/screenshots/molecules-gallery-desktop-1440px.png` | Gallery: Tokenized form molecules and selection controls in `/catalog`. |
| **Atoms & Molecules**| Mobile 390px | `docs/evidence/screenshots/molecules-gallery-mobile-390px.png` | Gallery: Mobile touch targets and error states in `/catalog`. |
| **Organisms Gallery**| Desktop 1440px | `docs/evidence/screenshots/organisms-gallery-desktop-1440px.png` | Gallery: ApplicationHeader, MinimalStepNavigation, QuotationSummary in `/catalog`. |
| **Organisms Gallery**| Mobile 390px | `docs/evidence/screenshots/organisms-gallery-mobile-390px.png` | Gallery: Mobile header and responsive summary drawer in `/catalog`. |

---

## 3. Visual Inspection Findings of Baseline Screens

### 3.1 Stage 1 Coverage Form:
- **Baseline Issues Identified:** The original un-recomposed form suffered from nested cards, oversized border radii, and visual clutter around the limit selectors.
- **Refinement Demonstrated (Phase 06):** Successfully transitioned into a clean single-surface card layout with an understated 4-segment linear progress indicator and a clear right summary rail.

### 3.2 Stage 2 Quotation & Add-on Selection (Target for Phase 07):
- **Visual Debt:** Add-on selection cards currently use heavy border treatments, inconsistent toggle switches, and repeated explanatory text.
- **Redesign Target:** Recompose using approved shared selection controls (`src/components/ui/SelectionControls.tsx`), align with QIC's clean pricing structure, and refine conditional clinic branch disclosure.

### 3.3 Stage 3 Particulars & Underwriting (Target for Phase 08):
- **Visual Debt:** Lengthy statutory questions (Q1 to Q5) create unnecessary visual fatigue. Branch management table requires improved optical rhythm on mobile.
- **Redesign Target:** Modern form grouping, clear affirmative radio tiles, and responsive tabular layout for clinic branches.

### 3.4 Stage 4 Review & Payment (Target for Phase 09):
- **Visual Debt:** Financial summary tables feature redundant sub-headers and cluttered payment method tiles.
- **Redesign Target:** Crisp financial itemization, clear BNM 10% statutory direct distribution rebate callout, and streamlined payment gateway selector.

### 3.5 Stage 5 Confirmation (Target for Phase 10):
- **Visual Debt:** Confirmation screen features excessive celebratory badges and scattered certificate action links.
- **Redesign Target:** Professional, trustworthy post-purchase certificate presentation with clear MMC APC submission guidance.

