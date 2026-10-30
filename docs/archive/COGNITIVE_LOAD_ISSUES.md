# DoctorShield Individual Indemnity — Cognitive Load & Friction Analysis

> **Document Reference:** `DOC-COG-LOAD-2026-10-29`  
> **Status:** Assessment & Friction Audit Baseline  
> **Auditor:** Principal Product Designer & Design Systems Architect  
> **Target Scope:** Entire DoctorShield Customer Purchasing Journey  
> **Mandate:** Identify and quantify all Hick's Law violations, visual distractions, redundant UI elements, and cognitive friction points on the **EXISTING CODEBASE** without altering underwriting rules or approved statutory disclosures.

---

## 1. Executive Overview

In medical professional indemnity, the applicant is a registered medical or dental practitioner (GP, surgeon, anesthetist, dentist). These professionals possess high domain literacy regarding their specialty, their MMC/MDC registration, and their annual practicing certificate (APC). 

However, the current DoctorShield portal treats the applicant like an unfamiliar retail consumer, surrounding every input with explanatory text, instructional badges, and nested visual containers. The interface commits three classical UX friction errors:
1. **Decision Overload (Hick's Law Violations):** Presenting too many simultaneous choices and conditional branches at once.
2. **Visual Noise & Sensory Saturation:** Flooding the viewport with decorative icons, conflicting background tints, and multi-layered card borders.
3. **Information Architecture Redundancy:** Repeating identical financial figures, statutory labels, and period explanations across both the main canvas and the sticky sidebar.

```
+-----------------------------------------------------------------------------------+
|                           CURRENT COGNITIVE PROFILE                               |
|                                                                                   |
|  [High Mental Effort]    [Visual Distraction]         [Viewport Occlusion]        |
|  - 4-layer nested cards  - 42 Lucide icons            - 42% mobile screen blocked |
|  - 8 decisions at once   - 6 competing tints          - Form & sidebar duplicate  |
|  - AI-generated copy     - Multi-border fences        - Redundant stepper text    |
+-----------------------------------------------------------------------------------+
                                      │
                                      ▼
+-----------------------------------------------------------------------------------+
|                          TARGET MINIMAL COGNITIVE PROFILE                         |
|                                                                                   |
|  [Low Mental Effort]     [Monochromatic Calm]         [Clean Screen Estate]       |
|  - Flat, grouped layout  - #08A5B5 & #132766 only     - Sleek floating bar        |
|  - Progressive reveal    - Icons strictly functional  - Deduplicated breakdown    |
|  - Source copy only      - Zero decorative containers - 100% visible inputs       |
+-----------------------------------------------------------------------------------+
```

---

## 2. Hick's Law Violations (Decision Overload)

Hick's Law states that the time and effort required to make a decision increases logarithmically with the number and complexity of choices. When an insurance interface bombards users with multiple complex decisions simultaneously, anxiety and abandonment rates escalate.

### 2.1 Stage 1: Liability Limit Selection Overload
- **Current Pattern:** The interface presents 4 to 5 large cards (RM 1M, RM 2M, RM 3M, RM 5M, RM 10M) simultaneously. Each card contains:
  1. A radio selector circle.
  2. The headline limit amount (e.g., `RM 1,000,000`).
  3. Subtitle text: *"Any One Claim & Aggregate"*.
  4. An AI-generated badge (e.g., `"Standard Practice"`, `"Recommended"`, `"High Exposure"`).
  5. An indicative rate tag: *"From RM 750/yr"*.
  6. Explanatory helper text: *"Select your required maximum aggregate defense and damages indemnity."*
- **Cognitive Penalty:** The user is forced to process 6 data dimensions across 4 distinct cards (24 visual elements) before making a basic rating selection.
- **Remedy:** A single, clean segmented control or flat horizontal radio strip. The aggregate note is stated once above the group. Purge AI-generated badges ("Standard Practice", "High Exposure") that are neither verified nor underwriting-approved.

### 2.2 Stage 2: Add-on Configuration & Underwriting Interrogation
- **Current Pattern:** Stage 2 presents all of the following decisions on a single screen immediately upon landing:
  1. Clinic ownership (`Yes` / `No`).
  2. Legal structure (`Sole Proprietorship` vs `Partnership / Sdn Bhd`).
  3. Locum doctor engagement (`Yes` / `No`).
  4. Clinic liability limit selection (3 card choices: RM 1M, RM 2M, RM 5M).
  5. Person-In-Charge status (`Yes` / `No`).
  6. Separate PIC entity registration (`Yes` / `No`).
  7. PIC Add-on selection toggle.
  8. Fulfillment selection (`Buy Online` vs `Email Quotation PDF`).
- **Cognitive Penalty:** The doctor came to review their individual indemnity quotation, but is immediately confronted with an interrogation regarding business entity structures and locum employment. Each sub-question has its own colored box and "Why is this recommended?" button.
- **Remedy:** Progressive disclosure. If Clinic Ownership is `No`, the entire clinic cluster remains invisible. Group entity questions logically under a single clean section. Remove the separate "Fulfillment Method" card; provide an inline secondary action ("Email Quote as PDF") directly adjacent to the primary "Proceed to Personal Details" CTA.

### 2.3 Stage 3: The 35-Field Scrolling Monolith
- **Current Pattern:** Personal identity, ID verification, MMC registration, physical clinic address, annual income tier, branch addition table, and 8 statutory underwriting questions are displayed on a single, continuous, scrolling canvas.
- **Cognitive Penalty:** Doctors experience visual exhaustion before reaching the underwriting declarations. In particular, the Underwriting section contains 4 large individual questions, followed by 4 clinic questions (if clinic add-on selected), followed by a 25-item COVID accordion.
- **Remedy:** Distinct progressive groupings with subtle visual dividers. Retain form state in memory while chunking the page logically:
  - Step 3A: Practitioner Identity & Registration
  - Step 3B: Practice Facility & Branches
  - Step 3C: Underwriting Declarations

---

## 3. Visual Noise & Competing Focal Points

### 3.1 Icon Overdose
Across the 4 stages, the application renders **42 distinct SVG icons** from `lucide-react`:
- Header: `Shield`, `RotateCcw`, `Search`, `FileText`, `X`
- Stepper: `Check`, numbered circle badges
- Stage 1: `Calendar`, `Tag`, `HelpCircle`, `ShieldCheck`, `FileText`, `ArrowRight`
- Stage 2: `Clock`, `Calendar`, `Building2`, `Users`, `AlertCircle`, `Sparkles`, `Download`, `CheckCircle2`, `Info`, `Lock`
- Stage 3: `User`, `MapPin`, `Plus`, `Trash2`, `Edit2`, `Shield`, `AlertTriangle`, `Check`, `X`
- Stage 4: `FileCheck`, `CreditCard`, `Building`, `Wallet`, `Lock`, `ShieldCheck`, `ExternalLink`

**Impact:** When icons are placed next to every heading, paragraph, card, and button, they cease to function as navigational landmarks and become visual static. 

**Remedy:** Purge 80% of decorative icons. Restrict icon usage strictly to standard form utilities:
- Calendar trigger icon on date pickers.
- Chevron arrows for expandable accordions.
- Checkmark on confirmed statuses.
- Trash/Edit on branch management.
- Remove all decorative header shields, sparkles on automatic reinstatement, and building icons on clinic titles.

### 3.2 Color Patchwork (6 Competing Background Tints)
The current UI uses an uncoordinated palette of light tinted containers that distract the eye:
1. **Emerald `#F0FDF4`:** Rate-lock countdown box, promo success badge.
2. **Sky Blue `#F0F9FF`:** Pro-rata period callout, clinic add-on recommendation header.
3. **Slate `#F8FAFC` & `#F1F5F9`:** Fieldset container backgrounds, limit cards, questionnaire boxes.
4. **Amber `#FFFBEB`:** Claims explanation textarea warning, referral warning boxes.
5. **Rose `#FEF2F2`:** Validation error callouts, disciplinary action disclosures.
6. **Dark Navy `#132766`:** Primary buttons, header text.

**Impact:** The user's visual cortex is forced to interpret what each color means. Is sky-blue clickable? Is amber an error or information? 

**Remedy:** Return to a disciplined, monochromatic foundation:
- Pure white (`#FFFFFF`) card surfaces.
- Subtle neutral grey border (`#E2E8F0` / `var(--border-subtle)`).
- Brand Teal (`#08A5B5`) for active selection and focus states.
- Brand Navy (`#132766`) for primary typography and primary actions.
- Reserved semantic colors: Rose (`#EF4444`) *only* for validation errors; Amber (`#F59E0B`) *only* for referral escalation warnings.

---

## 4. Information Architecture Redundancy (Form vs. Sidebar)

On desktop viewports (≥1024px), the screen is split into a **70% main form column** and a **30% sticky summary sidebar**. Currently, the main form duplicates the sidebar verbatim.

### 4.1 Stage 4 (Review & Checkout) Redundancy Matrix

| Data Dimension | Main Form Column (Current) | Sticky Sidebar (Current) | Recommended Fix |
|---|---|---|---|
| Plan Name & Classification | Rendered in top review table | Rendered in sidebar header | Keep in sidebar; main column shows practitioner summary |
| Coverage Period & Dates | Rendered in 2-row table box | Rendered in sidebar period block | Keep in sidebar; main column shows simple 1-line range |
| Limit of Liability | Rendered in Section 1 row | Rendered as primary figure in sidebar | Show in sidebar only |
| Base Premium | RM XXX.XX in review table | RM XXX.XX in breakdown item 1 | Show in sidebar breakdown |
| Pro-rata Adjustment | RM XXX.XX in review table | RM XXX.XX in breakdown item 2 | Show in sidebar breakdown |
| Add-on Premiums | Repeated for each add-on | Repeated in sidebar breakdown | Show in sidebar breakdown |
| SST (8%) & Stamp Duty (RM 10) | Rendered in review table footer | Rendered in sidebar tax rows | Show in sidebar breakdown |
| Total Payable | Large RM XXX.XX box in main form | Large RM XXX.XX box in sidebar | **Remove main form table.** Main column focuses on Payment Method & Declarations. |

**Impact:** Having two identical financial tables 150 pixels apart creates severe visual competition. Users do not know which table to inspect.

---

## 5. Mobile Viewport Occlusion & Scroll Fatigue

On mobile devices (390 px width, typical iPhone/Android), vertical screen real estate is precious.

### 5.1 The 42% Screen Tax
```
+------------------------------------------+ 0 px
| [BrandHeader] Brand + Menu      (58 px)  | Fixed Header
+------------------------------------------+ 58 px
| [InsuranceStepProgress] Steps   (46 px)  | Fixed Stepper
+------------------------------------------+ 104 px
|                                          |
|                                          |
|        USABLE READING VIEWPORT           | 
|             (Only ~360 px!)              | Active Content Area
|                                          |
|                                          |
+------------------------------------------+ 464 px
| [MobileSummaryDrawer] Price Bar (54 px)  | Sticky Bottom Bar
+------------------------------------------+ 518 px
| Safari / Chrome Browser Navigation Bar   | (Variable Mobile OS Bar)
+------------------------------------------+
```

When an input field is focused and the software keyboard appears (consuming 280–320 px), **less than 80 px of form space remains visible**, causing severe scrolling jumpiness and hidden validation errors.

### 5.2 Mobile Remediation Plan
1. **Collapse Header on Scroll:** The brand header should smoothly transition to a slim 40 px bar or hide on downward scroll, reappearing on upward scroll.
2. **Compact Mobile Stepper:** Replace the 4 wide numbered circles with a compact, 1-line indicator: `"Stage 2 of 4 — Quotation & Add-ons"` with a slim 2 px progress bar.
3. **Ultra-Slim Sticky Price Bar:** Refactor the mobile drawer trigger into a minimal 44 px floating bar showing: `Total: RM 1,234.56` + `[View Breakdown ^]`.

---

## 6. AI-Generated Copy Sprawl vs. Medical Practitioner Mental Model

The current codebase contains numerous paragraphs and sentences that were generated by AI during rapid scaffolding. These add reading fatigue and diminish brand authority.

### 6.1 Audit of AI Copy to Purge

| File Location | Current AI-Generated Text | Reason for Removal | Replacement / Action |
|---|---|---|---|
| `Stage1CoverageForm.tsx` (line 120) | *"Select the primary medical or dental category corresponding to your Malaysian Medical Council (MMC) or Malaysian Dental Council (MDC) registration."* | Explains obvious statutory status; doctors know their council. | **Remove completely.** Label `"Classification"` is sufficient. |
| `Stage1CoverageForm.tsx` (line 175) | *"Select your required maximum aggregate defense and damages indemnity."* | Redundant explanatory phrase. | **Remove completely.** |
| `Stage1CoverageForm.tsx` (cards) | *"Standard Practice"*, *"Recommended"*, *"High Exposure"* badges | Unverified subjective marketing tags not in Chubb underwriting guide. | **Remove completely.** |
| `Stage1CoverageForm.tsx` (line 240) | Button: *"Why 31st December?"* + modal | Period rule is a mandatory regulatory condition; explaining it inline invites hesitation. | Move explanation to accessible tooltip or small helper note. |
| `Stage2QuoteReview.tsx` (line 145) | *"Your premium rate is locked for the next 15 minutes. Complete your application to secure this price."* | Artificial urgency timer not supported by backend quote validity rules. | **Remove completely.** Display calm quote validity notice. |
| `Stage2QuoteReview.tsx` (line 210) | *"As a private clinic owner, you face dual exposure: professional negligence claims and clinic entity liability..."* | Didactic lecture on liability; unapproved AI text. | **Remove completely.** |
| `Stage2QuoteReview.tsx` (line 265) | Large section: *"Why is Person-In-Charge coverage vital?"* | Didactic sales pitch. | **Remove completely.** Preserved source copy only. |
| `Stage3ParticularsForm.tsx` (line 95) | *"Please enter your details exactly as they appear on your NRIC or passport to ensure seamless claim processing."* | Verbose filler copy. | Replace with standard field placeholder. |

---

## 7. Concrete Cognitive Load Reduction Metrics

| Dimension | Current State | Target Redesign | Reduction |
|---|---|---|---|
| **Bordered Containers / Cards** | 28 distinct boxes | 9 unified structural cards | **- 68%** |
| **Decorative SVG Icons** | 42 icons | 8 functional icons | **- 81%** |
| **Non-Statutory Word Count** | ~1,450 words | ~620 words | **- 57%** |
| **Simultaneous Decisions (Stage 2)** | 8 simultaneous prompts | 2 initial prompts (progressive) | **- 75%** |
| **Mobile Chrome Height** | 158 px fixed | 88 px total (dynamic) | **- 44%** |
| **Color Tints** | 6 competing backgrounds | 2 neutral tints (#FFFFFF, #F8FAFC) | **- 67%** |

---

*This document serves as the formal cognitive load baseline. No UI refactoring shall proceed until this analysis is confirmed.*

