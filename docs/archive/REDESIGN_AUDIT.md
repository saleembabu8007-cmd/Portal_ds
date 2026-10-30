# DoctorShield Individual Indemnity — UX & Visual Redesign Audit

> **Document Reference:** `DOC-UX-AUDIT-2026-10-29`  
> **Status:** Discovery & Assessment Baseline  
> **Auditor:** Principal Product Designer & Design Systems Architect  
> **Target Scope:** Entire DoctorShield Customer Web Experience  
> **Mandate:** Comprehensive visual, structural, and cognitive load refinement on the **EXISTING CODEBASE** without discarding functional business logic or breaking working tests.

---

## 1. Executive Summary

The DoctorShield Individual Medical Professional Indemnity portal has achieved complete functional parity, passing 86 out of 86 automated end-to-end and unit test cases. However, from a product design and user experience standpoint, **the interface currently suffers from severe design debt, visual fatigue, and an unmistakable "generic AI-generated" aesthetic**.

Instead of feeling like an authoritative, calm, medical-grade financial tool underwritten by Chubb, the application resembles a sprawling stack of wireframes and colored cards. Doctors are bombarded with explanatory text, redundant headings, competing color-tinted callout boxes, and unnecessary iconography at every turn.

### Key Audit Findings at a Glance
1. **Pervasive "Card-in-Card" Syndrome:** Every single question, field group, and status indicator is wrapped in an individual bordered box with its own padding, background tint, and shadow. This creates intense visual clutter and visual "fences" that break layout unity.
2. **Explanatory Verbosity (AI-Generated Copy Sprawl):** The interface constantly explains things the medical practitioner already knows (e.g., explaining what MMC is, explaining what a general practitioner does, long paragraphs explaining that Chubb underwrites the policy).
3. **Weak Visual Hierarchy:** Primary actions, secondary toggles, informative badges, and statutory legal disclaimers all compete with identical visual weights and font sizes.
4. **Header & Navigation Crowding:** The top navigation bar is burdened with three utility buttons (`Renew Policy`, `Find Quote`, `Documents`), a heavy co-branding box, and a prominent badge, distracting from the core purchasing journey.
5. **Mobile Viewport Occlusion:** On mobile devices (390 px), fixed header chrome (60 px), step progress bars (48 px), and the sticky summary drawer toggle (54 px) consume nearly 45% of the visible viewport, leaving doctors with a cramped reading window.

---

## 2. Screen-by-Screen UX & Visual Audit

### 2.1 Application Shell, Header & Navigation (`BrandHeader.tsx`, `AppShell.tsx`, `InsuranceStepProgress.tsx`)

#### Current Observed State
- **Header:** Features a large 40x40 px icon badge (`Shield`), high-contrast co-branding text box with a vertical divider ("Underwritten by Chubb / Distributed by JA Assure"), and three utility buttons with icons (`RotateCcw`, `Search`, `FileText`).
- **Step Progress:** Displays 4 wide steps with numbered circular badges, step titles, and active indicator bars. Below the bar, a redundant text line repeats: *"Stage 1 of 4: Coverage Details"*.
- **Live Announcer:** Renders invisible live text correctly, but visually there are too many competing status badges on screen.

#### Design Defects Identified
1. **Utility Congestion:** Having `Renew Policy`, `Find Quote`, and `Document Center` all permanently visible as full bordered buttons in the primary header creates cognitive distraction during the core quote journey.
2. **Double Branding Noise:** The co-branding statement with Chubb and JA Assure is heavy and boxed, drawing eye focus away from the workflow title.
3. **Step Redundancy:** Showing both a 4-step progress bar *and* a sub-heading saying *"Stage 1 of 4: Coverage Details"* is redundant. The stepper should communicate the stage silently.

---

### 2.2 Stage 1: Coverage Configuration (`Stage1CoverageForm.tsx`)

#### Current Observed State
- **Intro Section:** A large `H1` ("Select Your Professional Coverage") preceded by a badge with a shield icon ("Stage 1 of 4: Coverage Details") and followed by a 3-line marketing/explanatory paragraph.
- **Classification Dropdown:** Surrounded by a verbose helper paragraph: *"Select the primary medical or dental category corresponding to your Malaysian Medical Council (MMC) or Malaysian Dental Council (MDC) registration."*
- **Liability Limit Selector:** Renders 4 separate, 100px-tall cards inside a grid. Each card has a radio circle, limit amount, helper subtitle ("Any One Claim & Aggregate"), top-right "Recommended" pill badge, and a bottom section displaying *"Indicative Rate: From RM 750/yr"*.
- **Date Inputs:** Split into two separate columns with calendar icons, helper text below each input, and an inline info button *"Why 31st December?"* that opens a modal.
- **Promo Code Box:** A standalone input with a tag icon, an "Apply Code" button, and on success, a large green callout box with a check icon.
- **Statutory Disclosures:** A bordered slate box containing a white inner card for the PIDM statement with a `ShieldCheck` icon, followed by a checkbox for terms.

#### Design Defects Identified
1. **Excessive Helper Text:** Medical practitioners know what their classification is. The explanatory paragraph under the dropdown adds cognitive friction without value.
2. **Card Overload on Limits:** The 4 limit cards look like wireframe pricing tables. The radio circle inside the card is redundant when the card itself is selectable.
3. **Cluttered Period Selection:** The "Why 31st December?" button draws undue attention to an immutable regulatory constraint.
4. **Visual "Patchwork":** Between the sky-blue date container, green promo badge, slate PIDM box, and white inputs, the form lacks monochromatic discipline.

---

### 2.3 Stage 2: Indicative Quotation & Optional Add-ons (`Stage2QuoteReview.tsx`)

#### Current Observed State
- **Quotation Header:** Displays an emerald green rate-lock countdown card, followed immediately by a sky-blue pro-rata period card with a calendar icon and annual equivalent rate.
- **Section 1 (Clinic Practice):** A massive white card with a `Building2` icon heading, containing:
  - Yes/No radio buttons for clinic ownership.
  - If Yes: a nested grey card asking for business structure (Sole Prop vs Sdn Bhd) with separate button toggles.
  - Another nested section for Locums with separate Yes/No buttons.
  - A nested white card for the **Recommended Clinic Entity Protection Add-on** with a teal icon box, "Recommended for Private Clinics" badge, "Why is this recommended?" modal trigger, limit selector buttons, and pricing breakdowns.
- **Section 2 (Person-In-Charge):** Another massive card with an `AlertCircle` icon heading, asking two separate PIC questions, and nesting a dedicated PIC Add-on card with another "Why is this recommended?" button.
- **Reinstatement Callout:** A gold/navy gradient bordered card highlighting complimentary automatic reinstatement.
- **Fulfillment Selector:** Another card asking whether the user wants to "Buy Online" or "Email Quotation PDF".

#### Design Defects Identified
1. **Severe Card-in-Card Nesting:** 4 levels of nested boxes! A card inside a card inside a section inside a container. This is the primary driver of the "amateur/generic AI" visual appearance.
2. **Cognitive Overload via Education:** Instead of simply presenting coverage options, the screen attempts to explain underwriting law in multiple modal dialogs and verbose card subtitles.
3. **Decoupled Summary:** The user is selecting add-ons in the middle of the screen, but the price update happens in the sticky right sidebar, forcing constant horizontal head-turning on desktop.
4. **Duplicated Fulfillment Choice:** Having a "Buy Online" vs "Email Quote" selector card *and* a bottom button bar that changes labels based on that card creates circular confusion.

---

### 2.4 Stage 3: Practitioner Particulars & Underwriting Questionnaire (`Stage3ParticularsForm.tsx`, `UnderwritingQuestionnaire.tsx`)

#### Current Observed State
- **Section 1 (Identity):** 8 form fields packed into a multi-column grid (Salutation, Full Name, ID Type radios, NRIC input, DOB, Gender, Country, MMC Number).
- **Section 2 (Practice Details):** Practice Facility, Address Line 1, Address Line 2, Postcode, City, State, and Annual Income Tier.
- **Section 3 (Branch Manager):** A bordered box containing a branch table/list, a prominent "+ Add Another Clinic / Branch Facility" button, and warning text about the RM 5,000,000 revenue ceiling.
- **Section 4 (Statutory Underwriting Declarations):**
  - Section header with a `Shield` icon.
  - 4 large numbered declaration blocks (Claims history, Circumstances, Disciplinary action, Criminal charges).
  - Each block is a shaded card containing dense statutory questions and full-width Agree/Disagree radio buttons.
  - Disagreeing with question 1 opens a bright yellow warning container with a 3-row textarea.
  - If clinic add-on is active, 4 additional clinic-specific declaration cards appear below.
  - A collapsible COVID-19 accordion with 25+ pandemic-era questions.
  - Final statutory declaration checkbox with a bold legal disclaimer under Schedule 9 FSA 2013.

#### Design Defects Identified
1. **Intimidating Visual Length:** Displaying all personal identity fields, practice fields, branch management, and all 8 underwriting questions simultaneously on one gigantic page creates high abandonment anxiety.
2. **Inconsistent Input Heights & Typography:** Postcode, city, and state dropdowns use slightly different paddings and font sizes than the primary NRIC input.
3. **Harsh Warning Styling:** The yellow and red boxes in the underwriting questionnaire look alarming and punitive rather than professional and neutral.
4. **Redundant Section Enclosures:** Every single question is wrapped in its own `#F8FAFC` card with a border, creating a 20-card vertical tower.

---

### 2.5 Stage 4: Review & Payment (`Stage4ReviewAndPayment.tsx`)

#### Current Observed State
- **Countdown Banner:** A sticky top banner repeating the 15-minute rate-lock timer with a "Recalculate & Revalidate Quote" button.
- **Summary Table:** A dense, multi-row HTML table repeating the doctor's name, MMC number, classification, dates, limits, and add-ons.
- **Tax Breakdown Box:** A receipt-style container showing gross, discount, clinic add-on, PIC add-on, 8% SST, and RM 10 Stamp Duty.
- **Regulatory Callout:** A prominent blue box quoting Bank Negara Malaysia's 10% intermediary commission disclosure.
- **Legal Consents:** 3 dense checkboxes with long paragraphs of statutory text.
- **Payment Method Cards:** 3 large selectable cards (Personal Credit/Debit Card, Personal FPX, Business Internet Banking).
- **Payment Modal:** A full-screen dialog simulating the payment gateway with simulated success/failure buttons.

#### Design Defects Identified
1. **Redundant Summary Stacking:** On desktop, the user sees the Executive Summary Table in the main column *and* the Summary Sidebar on the right. Both show the exact same information side-by-side!
2. **Competing Rate Lock Timers:** The page has a countdown timer at the top of the form *and* another countdown timer in the sidebar, which looks uncoordinated.
3. **Heavy Legal Text Presentation:** The 3 checkboxes are presented as solid blocks of small legal text rather than structured, scannable affirmative agreements.

---

### 2.6 Stage 5: Policy Confirmation (`Stage5PolicyConfirmation.tsx`)

#### Current Observed State
- **Success Hero Card:** Centered green checkmark icon in an oversized circle, large policy number banner, and an alert callout regarding email dispatch.
- **Document Download Cards:** 3 separate horizontal cards with PDF icons and download buttons for Certificate of Insurance, Schedule of Indemnity, and Tax Invoice.
- **Renewal Guidance Box:** An additional information card explaining APC renewal timelines.

#### Design Defects Identified
1. **Visual Clutter on Confirmation:** Instead of a clean, serene, printable certificate presentation, the screen is fragmented into 4 separate cards and boxes.
2. **Oversized Decorative Elements:** The huge green circle icon feels like a generic template rather than an institutional insurance confirmation document.

---

## 3. Root Causes of the Generic "AI-Generated" Appearance

| Root Cause | Concrete Code Manifestation | Visual Impact |
|---|---|---|
| **Box-for-Everything Reflex** | Nesting `<div>` with `borderRadius`, `border`, `backgroundColor`, and `boxShadow` around every UI chunk. | The screen looks fragmented, heavy, and boxed-in. Zero breathing room or editorial elegance. |
| **Lucide Icon Overdose** | Placing icons (`Shield`, `Info`, `Calendar`, `Mail`, `Building2`, `Clock`, `Sliders`, `Percent`) on almost every label, card title, and button. | Visual noise; looks like a junior prototype or icon library demo rather than an executive medical portal. |
| **Inline CSS Duplication** | Hundreds of inline `style={{ ... }}` objects across JSX files instead of clean, unified CSS classes. | Inconsistent padding (some cards have 16px, some 20px, some 24px), arbitrary font sizes, and unmaintainable visual rhythm. |
| **Explain-Everything Copy** | Generating 2–3 sentences of explanatory copy below every input and heading. | Doctors are forced to read wall-to-wall text for routine choices (e.g., explaining MMC registration). |
| **Color Patchwork** | Mixing slate (`#F8FAFC`), sky (`#F0F9FF`), teal (`#F0FAFA`), amber (`#FFFBEB`), and rose (`#FFF1F2`) on the same screen. | Destroys brand discipline; feels like a dashboard widget collection rather than a unified journey. |

---

## 4. Usability & Accessibility Defects

1. **Information Density without Hierarchy:** Important decision points (such as selecting a RM 2M limit vs RM 1M) have the same visual prominence as static helper copy.
2. **Mobile Form Ergonomics:** On small screens, dropdowns and date pickers stretch edge-to-edge without comfortable padding, while sticky elements consume half the vertical viewport.
3. **Form Error Scannability:** When validation errors occur, red text appears under individual inputs, but the top-of-form error summary is dense and lacks clear anchor jumping.
4. **Tab Key Fatigue:** Because every card, icon button, and info trigger is in the tab order, a keyboard user must press `Tab` over 30 times just to navigate Stage 1.

---

## 5. Audit Conclusion

The application's technical foundation, state management, rating calculations, and underwriting logic are sound and robust. However, **the user interface requires an immediate, disciplined visual purge**. 

The redesign must:
- Eliminate 70% of unnecessary cards and borders, letting clean typography and whitespace establish hierarchy.
- Remove all AI-generated explanatory copy and retain only verified source content.
- Strip away decorative icons and colored alert boxes.
- Unify forms and summaries into an integrated, calm, ultra-minimal medical experience.

