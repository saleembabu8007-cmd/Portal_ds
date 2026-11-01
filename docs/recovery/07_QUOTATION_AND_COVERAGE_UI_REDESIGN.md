# DOCTORSHIELD — 07 / QUOTATION & COVERAGE UI REDESIGN REPORT

**Phase:** 07  
**Status:** COMPLETE (Ready for Visual Review & Approval Gate)  
**Governance:** DoctorShield — Visual-First Product Engineering Rules v4.0  
**Design Direction:** Direction B ("Structured Minimal / Editorial Craft")  

---

## 1. Executive Summary & Objective

In **Phase 07**, we executed the complete visual redesign of Stage 2: **Quotation & Optional Practice Coverage** (`src/features/quote/Stage2QuoteReview.tsx`), aligning it with the Direction B art direction established in Phase 04 and the atomic foundations implemented in Phases 05 and 06.

The rejected nested-card layout and cluttered visual structure have been completely dismantled. In their place is a calm, authoritative, editorial interface designed specifically for Malaysian medical practitioners. All underwriting dependencies, pro-rata rating rules, automatic aggregate reinstatements, and statutory disclosures are 100% preserved.

---

## 2. Visual & Structural Architecture Changes

### A. Open Surface Canvas (Zero Nested Outer Cards)
- Updated `AppShell.tsx` and `layout.css` so `numericStep === 1 || numericStep === 2` activates `.ds-main-card-open`.
- Stage 2 renders directly onto the `#F4F7F9` canvas, eliminating the enclosing card-in-card visual debt.

### B. Purpose-Differentiated Components
1. **Stage Header Card (`.ds-card`):**
   - High-contrast card with `Stage 2 of 4: Quotation & Optional Protection` badge.
   - Chubb Policy Form identification badge (`Chubb/DS/PI/001`) with shield icon.
   - Page title (`Kanit 500`, responsive clamp, `#132766`) and editorial subtitle.

2. **Quotation Hero & Rate Guarantee Bar (`.ds-card` with 3px Teal Accent):**
   - Distinctive hero card with 3px `#08A5B5` top accent bar.
   - **15-Minute Guaranteed Rate Lock:** Tabular monospace countdown timer in an emerald pill (`14:58`), quote token identifier (`QT-CHUBB-...`), and interactive rate refresh action if expired.
   - **Policy Term & Pro-Rata Indicator:** Clear MMC APC co-termination dates (`01/11/2026 to 31/12/2026`) and annual equivalent gross rate (`RM 650.00/yr`).

3. **Clinic Practice & Establishment Profiling:**
   - Quiet white surface card with 3px teal `.ds-section-bar`.
   - Practice ownership question with 44px segmented Yes/No radio controls (active teal stroke and subtle tint).
   - **Progressive Disclosure:** Smoothly reveals sole proprietor/partnership structure options and locum staffing questions with a 3px teal accent border.
   - **Selectable Clinic Entity Protection Card:** Distinct interactive choice card with active 2px teal border, "RECOMMENDED FOR CLINIC OWNERS" badge, "Why recommended?" link modal trigger, and establishment liability tier grid (RM 500k, RM 1M, RM 2M) with pro-rated price additions.

4. **Person-In-Charge (PIC) Regulatory Evaluation:**
   - Quiet white surface card with 3px teal `.ds-section-bar`.
   - Specific questions on PHFSA 1998 statutory accountability for own clinic and external facilities.
   - **Selectable PIC Statutory Defense Card:** Reveals only when eligible, displaying pro-rated premium addition (`+RM 24.66`), "Why recommended?" trigger, and check toggle.

5. **Complimentary Automatic Reinstatement Endorsement (RULE-RST-01):**
   - Purpose-differentiated callout in soft emerald (`#ECFDF5`) with emerald border (`#A7F3D0`).
   - `COMPLIMENTARY INCLUDED` badge with sparkle icon, clearly showing `RM 0.00` to assure doctors that 1x aggregate reinstatement is free.

6. **Application Next Step & Fulfillment Choice:**
   - High-contrast selectable tiles: "Buy Now (Complete Application Online)" vs. "Email Me Quotation & Policy Wording".
   - Accessible circular radio controls with active brand ring.

7. **Contextual Summary Rail:**
   - Summary Sidebar on desktop and sticky drawer on mobile display itemized gross base, add-ons, SST (8%), stamp duty, and total payable in real time without duplicating a static table in the center column (complying with Rule 10).

8. **Responsive Action Bar:**
   - Desktop: Flex row with "Edit Coverage Details" (back to Stage 1), "Email Quotation PDF", and primary "Proceed to Personal Details".
   - Mobile: Stacks vertically into full-width 44px touch buttons with safe-area spacing.

---

## 3. Preserved Insurance Behavior & API Contracts

Per **Visual-First Rules Section 4 & 5**, zero business rules were modified:
- **Rating Formulas:** Pro-rata calculations, specialty multipliers, and SST (8%) / stamp duty (RM 10.00) remain 100% intact via `RatingService.calculatePremium()`.
- **Add-on Invalidation & Reconciliation:** Toggling clinic ownership or PIC status to "No" immediately auto-removes the add-on, triggers a reconciliation notice, and recalculates the live quote without stale totals.
- **Statutory Copy:** All PHFSA 1998 disclosures, MMC APC term explanations, and BNM statements are preserved verbatim.

---

## 4. Test Verification & Results

### TypeScript Typecheck
```
$ npm run typecheck
> portal_ds@1.0.0 typecheck
> tsc --noEmit
Passed (0 errors, 0 warnings).
```

### Stage 2 Suite
```
$ npx vitest run src/test/stage2.test.tsx
Test Files  1 passed (1)
Tests       8 passed (8)
Duration    2.51s
```

### Full Test Suite (12 Suites, 130 Tests)
```
$ npm test
Test Files  12 passed (12)
Tests       130 passed (130)
Duration    12.14s
```
- `stage1.test.tsx`: 9/9 passed.
- `stage2.test.tsx`: 8/8 passed.
- `stage3.test.tsx`: 11/11 passed.
- `stage4.test.tsx`: 10/10 passed.
- `e2e_scenarios.test.tsx`: 6/6 passed.
- `atomic_components.test.tsx`: 10/10 passed.
- `form_molecules.test.tsx`: 16/16 passed.
- `organisms_and_compositions.test.tsx`: 18/18 passed.
- `secondary_features.test.tsx`: 11/11 passed.
- `security_and_reliability.test.tsx`: 17/17 passed.
- `components.test.tsx`: 7/7 passed.
- `shell.test.tsx`: 7/7 passed.

---

## 5. Visual Inspection & Screenshot Evidence

Full-resolution screenshots captured using Google Chrome headless via `scripts/capture_stage2_screenshots.cjs`:

| Viewport | Description | Image Link |
|---|---|---|
| **1440px Desktop** | Base Quotation & Rate Guarantee | [stage2-base-quotation-desktop-1440px.png](file:///c:/Users/salee/Downloads/Portal_ds/docs/evidence/screenshots/stage2-base-quotation-desktop-1440px.png) |
| **1440px Desktop** | Eligible Add-ons Disclosed | [stage2-eligible-addons-desktop-1440px.png](file:///c:/Users/salee/Downloads/Portal_ds/docs/evidence/screenshots/stage2-eligible-addons-desktop-1440px.png) |
| **1440px Desktop** | Add-ons Selected & Live Recalculation | [stage2-selected-addons-desktop-1440px.png](file:///c:/Users/salee/Downloads/Portal_ds/docs/evidence/screenshots/stage2-selected-addons-desktop-1440px.png) |
| **1440px Desktop** | Upstream Change Reconciliation Banner | [stage2-reconciliation-notice-desktop-1440px.png](file:///c:/Users/salee/Downloads/Portal_ds/docs/evidence/screenshots/stage2-reconciliation-notice-desktop-1440px.png) |
| **1440px Desktop** | Educational Modal ("Why Clinic Coverage?") | [stage2-modal-dialog-desktop-1440px.png](file:///c:/Users/salee/Downloads/Portal_ds/docs/evidence/screenshots/stage2-modal-dialog-desktop-1440px.png) |
| **768px Tablet** | Responsive Tablet Viewport | [stage2-quotation-tablet-768px.png](file:///c:/Users/salee/Downloads/Portal_ds/docs/evidence/screenshots/stage2-quotation-tablet-768px.png) |
| **390px Mobile** | Mobile Responsive Viewport (iPhone 14) | [stage2-quotation-mobile-390px.png](file:///c:/Users/salee/Downloads/Portal_ds/docs/evidence/screenshots/stage2-quotation-mobile-390px.png) |

---

## 6. Modified Files Inventory

- [`src/features/quote/Stage2QuoteReview.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/features/quote/Stage2QuoteReview.tsx): Redesigned Stage 2 quotation screen using Direction B visual foundations, 3px teal accent bars, segmented radio buttons, interactive choice cards, and zero nested outer cards.
- [`src/components/layout/AppShell.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/layout/AppShell.tsx): Activated `ds-main-card-open` for `numericStep === 2`.
- [`src/components/layout/layout.css`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/layout/layout.css): Added `.ds-main-card:has(.ds-stage2-quote-container)` for borderless stage card layout.
- `docs/evidence/screenshots/stage2-*.png`: Authoritative live screenshots captured at 1440px, 768px, and 390px.

---

## 7. Approval Gate & Next Step

Following **Visual-First Rules v4.0 (Section 15 & 16)**:
- Phase 07 implementation, verification, and live capture are **COMPLETE**.
- Stage 2 is fully functional and live in the actual running application.
- **STOP HERE.** We halt execution and await user review and confirmation before initiating **Phase 08 (Stage 3 Personal Particulars & Underwriting Form Redesign)**.

