# DOCTORSHIELD FORENSIC AUDIT — REPORT 06
# Screen-by-Screen Visual Design & UI Audit

**Audit Date:** 2026-10-30  
**Auditor:** Principal Product Designer & Senior UX Visual Auditor  
**Audit Target:** All 5 Workflow Stages, Modals, Drawers, Scaffolds, and Responsive Viewports  
**Status:** COMPLETE — STRICTLY READ-ONLY  

---

## 1. Executive Summary: Diagnosis of the "Generic AI-Generated" Aesthetic

Visual forensic analysis of the live portal screens confirms the core symptoms reported by the user:
1. **The "Nested Card" Anti-Pattern:** In `Stage2QuoteReview` and `Stage3ParticularsForm`, components are repeatedly nested inside containers with their own borders, backgrounds, and drop shadows (Container $\rightarrow$ Card $\rightarrow$ Sub-card $\rightarrow$ Tile). This creates heavy visual noise and an "unfinished wireframe" feeling.
2. **Duplicated Side-by-Side Information:** On desktop (1440px), the central content area in Stage 2 and Stage 4 renders full premium breakdown tables, while the sticky right sidebar (`SummarySidebar.tsx`) simultaneously renders the identical breakdown 200px to the right. This causes redundant cognitive processing.
3. **Inconsistent Component Dimensions & Radii:** Control heights vary arbitrarily across screens (40px, 42px, 44px, 48px, 50px). Corner radii jump between 4px, 6px, 8px, 10px, 12px, and 9999px without rhythmic alignment.
4. **Verbatim Wall of Text Syndrome:** Because `AGENTS.md` Rule P-10 prohibits omitting or shortening legal copy, screens 3 and 4 feature dense multi-paragraph disclaimers, heavy regulatory warnings, and excessive explanatory sentences that overpower the form inputs.

---

## 2. Inspected Viewports & State Registry

| Viewport Width | Device Category | Inspected Screen States | Evidence File Reference |
|---|---|---|---|
| **1440px** | Desktop Standard | Stage 1, Stage 2, Stage 3 (Clean & Complex), Stage 4, Stage 5, Referral, Shell | [`docs/evidence/screenshots/stage1-after-desktop-1440px.png`](file:///c:/Users/salee/Downloads/Portal_ds/docs/evidence/screenshots/stage1-after-desktop-1440px.png)<br>[`docs/evidence/screenshots/stage2-after-desktop-1440px.png`](file:///c:/Users/salee/Downloads/Portal_ds/docs/evidence/screenshots/stage2-after-desktop-1440px.png)<br>[`docs/evidence/screenshots/stage3-after-desktop-1440px.png`](file:///c:/Users/salee/Downloads/Portal_ds/docs/evidence/screenshots/stage3-after-desktop-1440px.png)<br>[`docs/evidence/screenshots/stage4-before-desktop-1440px.png`](file:///c:/Users/salee/Downloads/Portal_ds/docs/evidence/screenshots/stage4-before-desktop-1440px.png)<br>[`docs/evidence/screenshots/stage5-before-desktop-1440px.png`](file:///c:/Users/salee/Downloads/Portal_ds/docs/evidence/screenshots/stage5-before-desktop-1440px.png)<br>[`docs/evidence/screenshots/shell/referral-1440px.png`](file:///c:/Users/salee/Downloads/Portal_ds/docs/evidence/screenshots/shell/referral-1440px.png) |
| **1024px** | Tablet Landscape | Application Shell & Step Flow | [`docs/evidence/screenshots/shell/shell-1024px.png`](file:///c:/Users/salee/Downloads/Portal_ds/docs/evidence/screenshots/shell/shell-1024px.png) |
| **768px** | Tablet Portrait | Application Shell & Collapsed Sidebar | [`docs/evidence/screenshots/shell/shell-768px.png`](file:///c:/Users/salee/Downloads/Portal_ds/docs/evidence/screenshots/shell/shell-768px.png) |
| **390px** | Mobile Modern (iPhone 14/15/16) | Stage 1, Stage 2, Stage 3 (Clean & Complex), Stage 4, Stage 5, Bottom Drawer | [`docs/evidence/screenshots/stage1-after-mobile-390px.png`](file:///c:/Users/salee/Downloads/Portal_ds/docs/evidence/screenshots/stage1-after-mobile-390px.png)<br>[`docs/evidence/screenshots/stage2-after-mobile-390px.png`](file:///c:/Users/salee/Downloads/Portal_ds/docs/evidence/screenshots/stage2-after-mobile-390px.png)<br>[`docs/evidence/screenshots/stage3-after-mobile-390px.png`](file:///c:/Users/salee/Downloads/Portal_ds/docs/evidence/screenshots/stage3-after-mobile-390px.png)<br>[`docs/evidence/screenshots/stage4-before-mobile-390px.png`](file:///c:/Users/salee/Downloads/Portal_ds/docs/evidence/screenshots/stage4-before-mobile-390px.png)<br>[`docs/evidence/screenshots/stage5-before-mobile-390px.png`](file:///c:/Users/salee/Downloads/Portal_ds/docs/evidence/screenshots/stage5-before-mobile-390px.png) |
| **360px / 320px** | Compact Mobile | Base Layout Grid & Touch Target Bounds | [`docs/evidence/screenshots/shell/shell-360px.png`](file:///c:/Users/salee/Downloads/Portal_ds/docs/evidence/screenshots/shell/shell-360px.png) |

---

## 3. Screen-by-Screen Detailed Visual Audit

### 3.1 Global Header & Navigation (`BrandHeader.tsx` & `InsuranceStepProgress.tsx`)
- **Visual Composition:** 52px fixed-height header containing DoctorShield logo mark, underwriter text ("Underwritten by Chubb Insurance Malaysia Berhad"), and Document Center trigger button.
- **Defects Observed:**
  1. *Underwriter Tag Breakpoint Clutter:* At viewports below 900px, the underwriter text collides with the action button before dropping off abruptly via `.ds-desktop-underwriter-tag` CSS rule.
  2. *Step Indicator Label Truncation:* In `InsuranceStepProgress.tsx`, on mobile viewports (<640px), the 4 step labels ("Cover Configuration", "Indicative Quotation", "Practitioner Details", "Review & Payment") are squeezed, resulting in awkward 2-line wraps or cramped step pills.

---

### 3.2 Stage 1: Coverage & Initial Premium Calculation (`Stage1CoverageForm.tsx`)
- **Main Objective:** Select medical classification, liability limit, and coverage dates.
- **Visual Composition:** Single-column form with 5 decision groups; sticky sidebar on desktop.
- **Defects Observed:**
  1. *Limit of Liability Pills:* 5 options (`RM 1M`, `RM 1.5M`, `RM 2M`, `RM 3M`, `RM 5M`) rendered in a horizontal grid. At tablet sizes (768px), the 5th pill wraps onto a line by itself, creating an awkward orphaned button.
  2. *Retroactive Date Callout:* Clause 6.12 retroactive warranty statement is presented in an amber-tinted box with a checkbox. Its visual weight rivals the primary Continue CTA, confusing users about which action is required to proceed.
  3. *Native Date Inputs:* Browser-native `<input type="date">` displays inconsistent placeholder formats (`dd/mm/yyyy` vs `mm/dd/yyyy`) depending on the client OS locale.

---

### 3.3 Stage 2: Quotation & Optional Add-on Coverage (`Stage2QuoteReview.tsx`)
- **Main Objective:** Review pro-rated premium, lock in 15-minute rate, and configure clinic/PIC coverage.
- **Visual Composition:** Base quotation card, 15-minute countdown bar, clinic eligibility decision, clinic liability tier selector, PIC governance accordion, CTA footer.
- **Defects Observed:**
  1. *Nested Card Architecture:*
     ```
     ┌─ Page Container ────────────────────────────────────────────────────────┐
     │  ┌─ Clinic Entity Protection Card ───────────────────────────────────┐  │
     │  │  ┌─ Clinic Ownership Yes/No Choice ────────────────────────────┐  │  │
     │  │  │  ┌─ Sub-Card: Business Structure (Sole Prop / Sdn Bhd) ──┐  │  │  │
     │  │  │  │  ┌─ Sub-Card: Clinic Liability Tier Selection (500k..) │  │  │  │
     │  │  │  │  └─────────────────────────────────────────────────────┘  │  │  │
     │  │  │  └───────────────────────────────────────────────────────────┘  │  │
     │  │  └─────────────────────────────────────────────────────────────────┘  │
     │  └───────────────────────────────────────────────────────────────────────┘
     ```
     This quadruple-nested card structure is the primary cause of the "heavy generic AI" aesthetic.
  2. *Duplicate Financial Breakdown:* The user sees full premium numbers in the main column and identical numbers in the right sidebar simultaneously.
  3. *Rate Lock Visual Urgency:* The 15-minute timer features prominent countdown animations that can create artificial anxiety for medical professionals evaluating liability terms.

---

### 3.4 Stage 3: Practitioner Particulars & Underwriting (`Stage3ParticularsForm.tsx`)
- **Main Objective:** Capture NRIC, MMC number, clinic address, branches, and statutory 5-year claims declarations.
- **Visual Composition:** Personal details grid, clinic practice address, BranchManager, UnderwritingQuestionnaire (5 statutory declarations + COVID facility questionnaires).
- **Defects Observed:**
  1. *Extreme Vertical Length:* Page exceeds **4,200 vertical pixels** when all sub-questionnaires are expanded.
  2. *Cognitive Fatigue from Declarations:* 5 legal declarations each accompanied by full statutory text, radio controls, and conditional explanation textareas.
  3. *Branch Manager Visual Clutter:* Each added branch renders a separate card with 4 inputs and a red trash icon, adding significant visual clutter for multi-branch practitioners.
  4. *Premature Referral Alarms:* In `UnderwritingQuestionnaire.tsx`, clicking "Yes" on any claims question immediately flashes aggressive red banners (`#FEF2F2`) before the practitioner has finished providing context.

---

### 3.5 Stage 4: Review & Payment Selection (`Stage4ReviewAndPayment.tsx`)
- **Main Objective:** Final verification of coverage, legal consent acknowledgment, payment channel selection, and payment authorization.
- **Visual Composition:** Policyholder summary table, coverage summary table, financial summary, BNM 10% commission disclosure, payment radio cards, 3 legal consent checkboxes, Authorize CTA.
- **Defects Observed:**
  1. *Legal Consent Checkbox Overload:* 3 mandatory checkboxes with dense legal text spanning 6–8 lines each.
  2. *Double Financial Summary:* Full tabular breakdown in the main viewport plus sidebar breakdown.
  3. *Payment Channel Radio Cards:* The personal vs corporate banking radio cards use inconsistent hover states and lack bank logo iconography.

---

### 3.6 Stage 5: Policy Confirmation (`Stage5PolicyConfirmation.tsx`)
- **Main Objective:** Confirmation of bound coverage, policy number display, document download hub.
- **Visual Composition:** Confirmation status header, Chubb policy number card, 3 document download cards, email dispatch notice, MMC MeRITS upload steps, 24/7 hotline cards.
- **Defects Observed:**
  1. *Redundant Download Cards:* Certificate of Insurance, Tax Invoice, and Policy Wording are displayed in 3 separate horizontal cards with repeating download buttons, consuming excessive vertical space.
  2. *Text Repetition:* The practitioner's MMC number and NRIC are repeated across 4 separate locations on this single screen.

---

### 3.7 Referral Scaffold (`ReferralScaffold.tsx`)
- **Main Objective:** Reassurance and callback request when automated binding is unavailable.
- **Visual Composition:** Status badge, reference code box, relationship manager callback form, underwriter direct contacts.
- **Defects Observed:**
  1. *Alarmist Tone in Earlier Version:* Rendered with high-contrast amber warnings that made applicants feel penalized rather than assisted. (Partially mitigated in recent update, but form remains standalone).

---

## 4. Mobile Responsiveness Forensic Assessment (320px–390px)

1. **Horizontal Grid Collapse:** At 390px, 2-column input rows (e.g., First Name / NRIC, Postcode / State) collapse into single-column vertical stacks, doubling the page scroll depth.
2. **Tabular Numerics on Small Viewports:** In `SummarySidebar` and `Stage4ReviewAndPayment`, long Ringgit figures (`RM 1,975.60`) cause text labels to wrap onto multiple lines on 320px viewports.
3. **Sticky Bottom Drawer Overlap:** On mobile devices with dynamic viewport heights, `MobileSummaryDrawer` (height: 60px collapsed, 320px expanded) can obscure form navigation buttons if bottom padding (`--ds-space-page-gutter-mobile: 16px`) is insufficient.

---

## 5. Audit 06 Verification Sign-Off

- [x] All 5 workflow stages, header, navigation, modals, and referral flows audited.
- [x] Viewport inspections conducted across 1440px, 1024px, 768px, 390px, and 360px.
- [x] "Nested card" anti-pattern verified with structural ASCII diagrams.
- [x] Redundant side-by-side financial breakdown documented.
- [x] Control dimension and radius inconsistencies cataloged.
- **Classification:** CONFIRMED — RUNTIME SCREENSHOTS & SOURCE CODE.
