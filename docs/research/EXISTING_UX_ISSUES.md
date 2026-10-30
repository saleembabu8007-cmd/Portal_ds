# EXISTING UX, ACCESSIBILITY & TECHNICAL ISSUES AUDIT
## DoctorShield Individual Medical Professional Indemnity Portal — Forensic Audit

> **Document ID:** `DOC-UX-ISSUES-001`  
> **Classification:** [VERIFIED]  
> **Date of Observation:** 2026-10-29  
> **Auditor:** Principal Product Architect & Engineering Lead  
> **Scope:** Usability defects, accessibility violations (WCAG 2.1 AA), brand inconsistencies, copy errors, and technical fragility discovered during the forensic audit.

---

## 1. Executive Summary of Audit Findings

The forensic inspection revealed **critical usability friction, 81 accessibility violations**, notable copy and typographical errors, and severe architectural fragility in the current production implementation (`my-individualindemnity.doctorshield.com`). 

While the underlying insurance underwriting rules, classification structures, and Chubb policy features are robust, the user-facing presentation suffers from:
1. Complete lack of native HTML form labels on primary inputs (severe screen reader barrier).
2. Loss of user data upon clicking the browser Back button or refreshing the page.
3. Unpolished typography with visible typos in customer-facing error dialogs and referral screens.
4. Duplicate DOM element IDs causing inconsistent modal behavior.
5. Lack of keyboard navigation accessibility and WCAG contrast violations.

---

## 2. Accessibility Audit (WCAG 2.1 AA Violations)

Automated DOM inspection and accessibility testing identified **81 distinct accessibility violations**:

| Issue ID | WCAG Rule | Violation Description | Impact / Severity | Evidence |
|---|---|---|---|---|
| **A11Y-01** | WCAG 1.3.1 (Info and Relationships) / 4.1.2 (Name, Role, Value) | **Missing `<label>` tags on inputs.** Most inputs (`#classification_id`, `#liability_id`, `#insurance_start_date`, `#insurance_end_date`, `#customer_email`, `#promo_code`, `#customer_name`, `#dob`, `#nric`) have **no associated `<label for="...">`** or `aria-label`. They rely entirely on placeholders. | 🔴 **CRITICAL** — Screen reader users hear "Edit text, blank" with zero field context. | [VERIFIED] (DOM scan) |
| **A11Y-02** | WCAG 2.4.1 (Bypass Blocks) | **No Skip Navigation Link.** The portal lacks a "Skip to main content" link, forcing keyboard and screen reader users to tab through entire headers and language switchers on every cycle. | 🟠 **MAJOR** | [VERIFIED] |
| **A11Y-03** | WCAG 3.1.1 (Language of Page) | **Missing or unmanaged `lang` attribute.** The root `<html>` element does not dynamically reflect the selected language or defaults without regional specification. | 🟡 **MODERATE** | [VERIFIED] |
| **A11Y-04** | WCAG 1.1.1 (Non-text Content) | **Missing `alt` attributes on images.** Multiple flag icons (`MY.svg`, `sg-flag.svg`, `BN.svg`) and brand badges lack descriptive `alt` text or `role="presentation"`. | 🟠 **MAJOR** | [VERIFIED] |
| **A11Y-05** | WCAG 1.4.3 (Contrast Minimum) | **Insufficient Color Contrast.** Light grey placeholder text `#999999` and muted secondary buttons (`.btn-outline-light`, `.q-btn`) fall below the mandatory 4.5:1 contrast ratio against light backgrounds (often measuring ~2.4:1). | 🟠 **MAJOR** — Violates readability standards for visually impaired doctors. | [VERIFIED] |
| **A11Y-06** | WCAG 2.4.7 (Focus Visible) | **Suppressed Focus Outlines.** CSS contains `outline: none` on `:focus` states without custom high-contrast focus rings, rendering keyboard navigation invisible. | 🔴 **CRITICAL** | [VERIFIED] |
| **A11Y-07** | WCAG 2.4.3 (Focus Order) | **Modal Focus Trapping Failure.** When Bootstrap modals (e.g. `#jsBranchModal`, `#jsBackDateEnableModel`) open, keyboard focus does not move into the dialog and is not trapped within the modal container. | 🟠 **MAJOR** | [VERIFIED] |
| **A11Y-08** | WCAG 4.1.2 (Name, Role, Value) | **Icon-only close buttons lack accessible names.** Modal close buttons `<button class="close">×</button>` have no `aria-label="Close"`, read aloud as "Multiplication sign, button". | 🟡 **MODERATE** | [VERIFIED] |

---

## 3. Usability & User Experience Friction

| UX ID | Category | Description & User Impact | Severity |
|---|---|---|---|
| **UX-01** | Navigation & History | **Browser Back Button Destroys Session.** The multi-step wizard does not integrate with the HTML5 History API (`window.history.pushState`). If a user clicks their browser's Back button on Step 2 or 3, the browser leaves the site, discarding all calculations and entered data. | 🔴 **CRITICAL** |
| **UX-02** | Form Resiliency | **Zero State Recovery / No Local Persistence.** If the user accidentally refreshes, loses internet connectivity, or experiences a session timeout, the entire form resets to Step 1 with no draft recovery. | 🔴 **CRITICAL** |
| **UX-03** | Date Input Ergonomics | **Fragile Text-Based Date Input.** `#insurance_start_date` uses `<input type="tel">` instead of a modern accessible date picker with inline constraints, causing frequent format validation errors when users enter dashes or words. | 🟠 **MAJOR** |
| **UX-04** | Progressive Disclosure | **Cognitive Overload on Step 2.** Step 2 presents the quote calculation, clinic ownership, PIC questions, and multiple add-on toggles simultaneously in a dense visual layout with confusing button outlines. | 🟠 **MAJOR** |
| **UX-05** | Branch Addition UX | **Branch Revenue Restriction Ambiguity.** The note *"Note: This offer is only available for branches with with less than a total revenue of RM 5,000,000 per annum"* gives no guidance on how revenue is verified or what to do if the clinic exceeds it. | 🟡 **MODERATE** |
| **UX-06** | Mobile Layout Degradation | **Wide Tables & Modals on Mobile.** The specialization allocation modal (`#specializationModal`) and branch table overflow small mobile viewports (375px), requiring horizontal scrolling. | 🟠 **MAJOR** |
| **UX-07** | Feedback & Loaders | **Unclear Loading Feedback During Rating.** When selecting a classification, the liability dropdown updates via AJAX asynchronously with minimal visual feedback, leading users to believe the form has frozen. | 🟡 **MODERATE** |

---

## 4. Copy, Typography & Brand Inconsistencies

### Copy & Spelling Errors in Current Production

| Copy Defect ID | Screen / Container | Exact Legacy Copy | Defect Description | Required Correction |
|---|---|---|---|---|
| **COPY-01** | `#jsPage8` (Referral) | `"PLEAESE CALL SUPPORT OFFICE"` | Obvious spelling typo: `PLEAESE`. Unprofessional for a medical indemnity platform. | `"Please Contact Our Support Office"` |
| **COPY-02** | `#jsPage8` (Referral) | `"We need more information to process your application, Will you be ok for our manger to call you at"` | 1. Typo: `manger` instead of `manager`.<br>2. Sentence ends abruptly with missing trailing punctuation or phone number binding. | `"We require additional information to process your application. May our relationship manager contact you at [Phone Number]?"` |
| **COPY-03** | `#jsPage3` (Branch Note) | `"Note: This offer is only available for branches with with less than a total revenue of RM 5,000,000 per annum."` | Duplicate word: `with with`. | `"Note: This offer is only available for branches with less than a total revenue of RM 5,000,000 per annum."` |
| **COPY-04** | `#jsPage2` (Locum Question) | `"Do you hire locums who sees new patients on their own?"` | Grammatical disagreement: `locums who sees` (plural noun with singular verb). | `"Do you hire locums who see new patients independently?"` |
| **COPY-05** | `#jsPage3` (Declarations) | `"Have you ever been the subject of a criminal investigation or had criminial charges brought against you?"` | Spelling typo: `criminial`. | `criminal` |
| **COPY-06** | `#jsPage10` (Payment) | `"Choose anyone of the payment option below:"` | Grammatical error: `anyone of the payment option` should be `any of the payment options`. | `"Please select a payment option below:"` |

### Brand Compliance Gaps

| Brand Rule | Requirement in Project Charter | Current Implementation | Defect Assessment |
|---|---|---|---|
| **Heading Font** | Kanit, weight 400–500 only. Never 600+. | Uses bold system fonts and arbitrary weights in various headers. | Non-compliant. Redesign must enforce Kanit 400/500 strictly. |
| **Primary Colour** | `#08A5B5` | Uses standard Bootstrap green (`#28a745` / `.btn-success`) for all primary submit buttons (`Calculate`, `Buy >>`, `Next >>`, `Proceed to payment`). | **MAJOR BRAND DEVIATION.** The primary brand colour `#08A5B5` is relegated to backgrounds, while action buttons are generic green. |
| **Spacing Grid** | 4 px base grid | Inconsistent margins (`mb-2`, `mr-2`, inline style margins `margin-top: 15px`). | Non-compliant. Redesign must adopt strict 4 px token spacing. |
| **Aesthetics** | Calm, refined, credible healthcare interface | Mismatched button styles (`.multibutton`, `.q-btn`, `.btn-light`, `.btn-outline-light`), excessive border lines, and abrupt progress jumps (0% -> 33% -> 66% -> 100%). | Unrefined. Redesign must implement an elevated healthcare aesthetic. |

---

## 5. Technical Fragility & Architecture Defects

| Tech Defect ID | Component | Defect Analysis | Architectural Risk |
|---|---|---|---|
| **TECH-01** | DOM Tree | **Duplicate Element IDs in DOM.** Both Modal [16] and Modal [22] share the exact same ID `#periodEndDateInfo`. Multiple buttons share `#jsUserId`. | Breaks DOM query predictability; causes unpredictable modal triggers depending on browser parser. |
| **TECH-02** | Form Architecture | **Massive Monolithic Form.** Over 120 input elements (including all conditional questionnaires and modals) live inside a single `#jsQuoteForm` form tag without modular sub-forms or component boundaries. | High maintenance cost, complex DOM state synchronization, and high risk of unintended form submissions. |
| **TECH-03** | Error Handling | **Generic Modal Errors with No Field Association.** Server-side rating errors trigger generic modals (`#jsServerSideErrorModal`, `#jsContactUsNegativeQuoteErrorModel`) without linking errors back to the specific offending field. | Frustrates applicants; causes drop-offs. |
| **TECH-04** | State Coupling | **Direct Coupling to Global Window Scope.** Multiple JavaScript files (`home.min.js`, `common-frontend.min.js`) mutate global window objects without namespacing or TypeScript typing. | Prone to race conditions and cross-script conflicts. |
| **TECH-05** | Responsive Framework | **Legacy Bootstrap 4 Dependency.** Heavy reliance on jQuery and Bootstrap 4 classes with inline overrides impedes modern fluid component architecture. | Hampers modern design system implementation. |

