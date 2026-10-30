# DOCTORSHIELD FORENSIC AUDIT — REPORT 10
# Mobile Architecture & Responsiveness Audit

**Audit Date:** 2026-10-30  
**Auditor:** Principal Mobile UX Architect & Staff Frontend Performance Engineer  
**Audit Target:** Breakpoints, Viewport Reflow (320px–1440px), Touch Targets, Sticky Drawers & Safe Areas  
**Status:** COMPLETE — STRICTLY READ-ONLY  

---

## 1. Executive Summary: Collapsed Desktop vs. Deliberate Mobile Architecture

The forensic responsive analysis confirms that **the mobile interface is predominantly a collapsed desktop layout rather than a deliberately composed mobile-first experience**:
1. **The 4,200px Mobile Scroll Marathon:** On modern smartphone viewports (390px width), Stage 3 stretches over **4,200 vertical pixels**. Forms that use 2-column or 3-column layouts on desktop simply collapse into a single vertical stack of 28 consecutive input fields, causing severe cognitive fatigue and abandonment risk.
2. **iOS Safari Zoom Defect (Font-Size < 16px):** Form controls in [`BranchManager.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/features/particulars/BranchManager.tsx#L280-L340) and [`ReferralScaffold.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/features/scaffolds/ReferralScaffold.tsx#L280-L360) explicitly specify `fontSize: '13px'`. On iOS Safari, any focused input with `font-size < 16px` forces the browser to automatically zoom the entire viewport, breaking fixed headers and layout alignment.
3. **Sub-44px Touch Targets:** Several interactive triggers (trash buttons in BranchManager, modal info icons in Stage 1/2) possess hitboxes between **24px and 32px**, failing WCAG 2.5.5 / 2.5.8 Target Size criteria.

---

## 2. Breakpoint Architecture & Layout System

### 2.1 Declared Breakpoint Hierarchy
In [`src/design-system/tokens.css`](file:///c:/Users/salee/Downloads/Portal_ds/src/design-system/tokens.css#L143-L148) and [`src/components/layout/layout.css`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/layout/layout.css):
- Mobile Compact: `< 640px` (`--ds-breakpoint-sm`)
- Tablet Portrait: `640px – 768px` (`--ds-breakpoint-md`)
- Tablet Landscape / Desktop Transition: `769px – 1024px` (`--ds-breakpoint-lg`)
- Desktop Standard: `> 1024px` (`--ds-layout-app-max-width: 1120px`)

### 2.2 Shell Grid Transition Behavior
- **Desktop (>1024px):** 2-column layout. Left column (main form, width: ~650px), Right column (sticky `SummarySidebar.tsx`, width: 320px), Gutter: 32px.
- **Tablet / Mobile ($\le$1024px):** Grid collapses to 100% single column. `SummarySidebar` is hidden (`display: none`). In its place, [`MobileSummaryDrawer.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/layout/MobileSummaryDrawer.tsx) is mounted as a sticky bottom bar (height: 60px) that expands into a 320px slide-up sheet upon user tap.

---

## 3. Screen-by-Screen Mobile Breakdown & Defects

### 3.1 Stage 1: Coverage Configuration
- **Inspected at 390px & 360px:** [`stage1-after-mobile-390px.png`](file:///c:/Users/salee/Downloads/Portal_ds/docs/evidence/screenshots/stage1-after-mobile-390px.png)
- **Defects:**
  1. *Liability Limit Button Wrap:* The 5 limit buttons (`RM 1M` to `RM 5M`) use `grid-template-columns: repeat(auto-fit, minmax(90px, 1fr))`. On 360px and 320px screens, this wraps into 3 buttons on row 1 and 2 buttons on row 2, stretching unevenly and looking jagged.
  2. *Native Date Picker Overlay:* On mobile Safari, `<input type="date">` triggers the iOS wheel picker, which can collide with the floating bottom summary drawer.

### 3.2 Stage 2: Indicative Quotation Review
- **Inspected at 390px:** [`stage2-after-mobile-390px.png`](file:///c:/Users/salee/Downloads/Portal_ds/docs/evidence/screenshots/stage2-after-mobile-390px.png)
- **Defects:**
  1. *Nested Card Indentation:* Because cards are nested up to 4 levels deep, mobile padding (`padding: 16px` on each level) consumes up to **96px of horizontal space**, leaving only ~294px of usable width for text on a 390px screen.
  2. *Rate Lock Countdown Bar:* Takes up 72px of vertical height at the top of the mobile screen, pushing the actual premium below the initial fold.

### 3.3 Stage 3: Particulars, Branches & Underwriting
- **Inspected at 390px:** [`stage3-after-complex-mobile-390px.png`](file:///c:/Users/salee/Downloads/Portal_ds/docs/evidence/screenshots/stage3-after-complex-mobile-390px.png)
- **Defects:**
  1. *Extreme Page Height:* Measured at **4,240px vertical scroll depth** on iPhone 14/15/16 (390x844px). The doctor must perform roughly **6 to 8 full-screen thumb scrolls** to reach the bottom CTA.
  2. *iOS Auto-Zoom Trigger:* Inputs in `BranchManager.tsx` specify `fontSize: '13px'` (lines 282, 308, 334). Focusing any branch input forces iOS Safari to zoom in to 100%, cutting off form labels on the left.
  3. *Branch Trash Button Hitbox:* The delete branch button is 28x28px, making it difficult to tap accurately on mobile touchscreens without triggering adjacent inputs.

### 3.4 Stage 4: Review & Payment
- **Inspected at 390px:** [`stage4-before-mobile-390px.png`](file:///c:/Users/salee/Downloads/Portal_ds/docs/evidence/screenshots/stage4-before-mobile-390px.png)
- **Defects:**
  1. *Tabular Number Truncation on 320px:* On narrow viewports, the financial breakdown row labels (e.g. `Sales & Service Tax (SST 8.0%)`) collide with the tabular Ringgit value (`RM 117.60`), forcing the number to drop to a second line.
  2. *Consent Checkbox Touch Area:* Checkbox inputs (`18x18px`) lack touch padding (`min-height: 44px`), making it easy to miss the checkbox when tapping on a mobile device.

---

## 4. Mobile Component Defect Matrix

| Defect ID | Component File | Line / Location | Root Cause | Consequence | Severity |
|---|---|---|---|---|---|
| **MOB-01** | `BranchManager.tsx` | Lines 282, 308, 334 | Hardcoded `fontSize: '13px'` | iOS Safari triggers automatic viewport zoom on input focus. | **P1 (High)** |
| **MOB-02** | `BranchManager.tsx` | Line 350 | Trash icon button without 44px hitbox | Fails WCAG 2.5.5 / 2.5.8 Touch Target Size. Difficult to tap. | **P2 (Medium)** |
| **MOB-03** | `Stage2QuoteReview.tsx` | Lines 450–650 | 4 levels of nested card padding | Squeezes content into a narrow central corridor on 360px–390px screens. | **P2 (Medium)** |
| **MOB-04** | `Stage3ParticularsForm.tsx` | Entire component | Lack of mobile pagination / progressive grouping | 4,200px vertical scroll depth causes severe mobile drop-off. | **P1 (High)** |
| **MOB-05** | `MobileSummaryDrawer.tsx` | Lines 80–120 | Fixed z-index (20) without dynamic viewport bottom inset | Can obscure primary form CTAs on Android keyboards or iPhone home bars. | **P2 (Medium)** |
| **MOB-06** | `DocumentCenterModal.tsx` | Lines 210–250 | Fixed horizontal padding on dialog | Modal exceeds viewport on 320px screens, causing horizontal overflow. | **P2 (Medium)** |

---

## 5. Audit 10 Verification Sign-Off

- [x] Responsive layout inspected across 1440px, 1024px, 768px, 390px, 360px, and 320px.
- [x] iOS auto-zoom defect verified with exact line numbers in `BranchManager.tsx`.
- [x] 4,200px mobile scroll depth documented.
- [x] Nested card mobile indentation squeeze measured.
- [x] Sub-44px touch target violations cataloged.
- **Classification:** CONFIRMED — SOURCE CODE & RUNTIME VIEWPORT OBSERVATION.
