# DoctorShield Design System — Form Component Layer (Molecules) Specification

> **Document Reference:** `DOC-DS-MOLECULES-001`  
> **Status:** Completed Baseline Implementation & Verified  
> **Classification:** [VERIFIED]  
> **Visual Architecture:** Direction B (Structured Minimal)  
> **Accessibility Standard:** WCAG 2.1 AA / 2.2 AA (SC 2.5.8 Touch Target Size Minimum)  
> **Framework:** React 19 + TypeScript + CSS Semantic Custom Properties  

---

## 1. Architectural Philosophy & Form Standards

The DoctorShield form component layer translates raw foundational interface atoms (Text, Inputs, Buttons, Radios, Checkboxes, Feedback) into predictable, cohesive, and accessible **Form Molecules**.

### 1.1 Core Design Standards
1. **Unified Field Architecture:** Every data-entry control shares an identical vertical rhythm:
   - Field Label + Optional indicator or Required asterisk (`margin-bottom: var(--ds-primitive-space-2)`)
   - Standard 48px control height (`var(--ds-comp-input-height): 48px`) with 8px radius (`var(--ds-comp-input-radius): 8px`)
   - Reserve error / helper text slot to prevent layout jumping when validation appears.
2. **Elimination of Card Bloat:** Form questions and binary options are never rendered as oversized product cards. Clean horizontal panels or segmented button groups are used instead.
3. **Proximity & Visual Hierarchy:** Related controls (e.g. Inception Date and APC Expiry Date, or Mobile Prefix `+60` and number input) are unified through adjacent borders or shared grouping containers.
4. **Natural Reading Widths:** Long medical questions and statutory declarations are provided generous reading measure (up to 720px) with 1.55 line-height for effortless legibility.
5. **Immediate Adjacent Disclosures:** Conditional follow-up fields render immediately beneath their parent trigger without artificial delay, and clear or reset dependent data upon being toggled off.

---

## 2. Inventory of 26 Form Molecules

| # | Molecule Name | Component | Anatomy & Tokens | Interaction States Covered |
|---|---|---|---|---|
| **1** | **Labeled Text Field** | [`LabeledTextField`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/form/LabeledTextField.tsx) | `FieldLabel` + `TextInput` (48px) + `HelperText` / `ErrorMessage` | Default, Hover, Focus (2px `#08A5B5`), Invalid (`role="alert"`), Readonly, Disabled |
| **2** | **Labeled Select** | [`LabeledSelect`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/form/LabeledSelect.tsx) | `FieldLabel` + native accessible select (48px) + ChevronDown | Default, Focus ring, Selected, Disabled, Error |
| **3** | **Searchable Classification Selector** | [`SearchableClassificationSelector`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/form/SearchableClassificationSelector.tsx) | 23 DoctorShield risk categories in combobox popover | Keyboard ArrowUp/Down, Enter selection, Esc close, live filter |
| **4** | **Searchable Specialization Selector** | [`SearchableSpecializationSelector`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/form/SearchableSpecializationSelector.tsx) | MMC / NSR recognized specialties grouped by discipline | Keyboard navigation, live text filter, clear selection |
| **5** | **Date Field** | [`DateField`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/form/DateField.tsx) | 48px input + Calendar vector icon + Min/Max date limits | Native date-picker trigger, manual keyboard entry, invalid date alert |
| **6** | **Insurance Date-Range Composition** | [`InsuranceDateRange`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/form/InsuranceDateRange.tsx) | Inception Date input + Calculated 31 Dec APC Expiry + Pro-rata badge | Date change recalculates pro-rata duration; displays APC statutory note |
| **7** | **Email Field** | [`EmailField`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/form/ContactFields.tsx) | 48px input + Mail icon addon + RFC 5322 regex validation | Blur-triggered validation, lowercase trimming, error state |
| **8** | **Malaysian Mobile Field** | [`MalaysianMobileField`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/form/ContactFields.tsx) | Fixed `+60` badge + formatted input (`1X-XXX XXXX`) | Numeric keypad on mobile, auto-digit formatting, telco validation |
| **9** | **Promotional-Code Field** | [`PromoCodeField`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/form/PromoCodeField.tsx) | Uppercase input + integrated Apply button + Loading spinner + Applied badge | Apply click, loading state, applied check badge, Clear/Remove action |
| **10** | **Yes/No Question Selector** | [`YesNoSelector`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/form/ChoiceSelectors.tsx) | Inline question title + 36px/48px segmented Yes/No buttons | Keyboard Space/Enter toggle, clear active outline, no oversized cards |
| **11** | **Agree/Disagree Question Selector** | [`AgreeDisagreeSelector`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/form/ChoiceSelectors.tsx) | Numbered declaration + Agree/Disagree buttons + Warning banner | Disagree selection triggers immediate amber underwriting referral notice |
| **12** | **Two-Option Segmented Choice** | [`TwoOptionSegmentedChoice`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/form/ChoiceSelectors.tsx) | 48px dual button container with label & subtext | Smooth pill toggle, Arrow navigation, active border `#08A5B5` |
| **13** | **Multi-Option Radio Group** | [`MultiOptionRadioGroup`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/form/ChoiceSelectors.tsx) | 44px minimum touch target cards/rows with 20px radio circle | Vertical/horizontal layout, Arrow navigation, focus ring |
| **14** | **Conditional Follow-up Field** | [`ConditionalFollowUpField`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/form/ConditionalFollowUpField.tsx) | Adjacent region with 2px teal left border, `aria-live="polite"` | Immediate zero-jump reveal; fires `onHidden` callback to reset child values |
| **15** | **Validation Message Group** | [`ValidationMessageGroup`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/form/ValidationMessageGroup.tsx) | `role="alert"` box with rose border (`#B91C1C`) + jump links | Direct click-to-focus on invalid fields with smooth scroll |
| **16** | **Optional Field Treatment** | [`LabeledTextField`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/form/LabeledTextField.tsx) | Subtle `(Optional)` tag in label row | Eliminates red asterisks on optional fields while preserving alignment |
| **17** | **Percentage Allocation Row** | [`PercentageAllocationRow`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/form/PercentageAllocationRow.tsx) | Specialty title + `%` input (tabular nums) + Stepper buttons | Decrement/Increment step (5%), direct numeric entry, min/max clamps |
| **18** | **Repeating Clinic / Branch Row** | [`RepeatingBranchRow`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/form/RepeatingBranchRow.tsx) | Number badge `#1` + Branch name + Location metadata + Edit/Remove | Edit opens inline modal/form, Remove deletes branch (max 4 limit) |
| **19** | **Compact Currency Display** | [`CompactCurrencyDisplay`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/form/CurrencyAndPriceDisplay.tsx) | Tabular figures (`font-variant-numeric: tabular-nums`) + `RM` | Sizes `sm`, `md`, `lg`, `display`; colors `primary`, `secondary`, `discount`, `navy` |
| **20** | **Price Breakdown Row** | [`PriceBreakdownRow`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/form/CurrencyAndPriceDisplay.tsx) | Description + Info tooltip trigger + formatted currency amount | Regular item row, Discount row (green with `-`), Total row (bold with hairline border) |
| **21** | **Inline Edit Action** | [`InlineEditAction`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/form/InlineEditAction.tsx) | Read-only label/value + subtle "Change" button | Toggles inline input with Save/Cancel, or navigates back to source stage |
| **22** | **Field-Level Loading State** | [`LabeledTextField`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/form/LabeledTextField.tsx) | Integrated `LoadingIndicator` (SVG spinner) in right addon | Inputs disabled during transit (`aria-busy="true"`), dimensions locked |
| **23** | **OTP Digit-Entry Composition** | [`OtpDigitEntry`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/form/OtpDigitEntry.tsx) | 6 discrete 44×48px boxes + numeric keypad + 60s cooldown timer | Auto-advance on input, backspace retreat, 6-digit paste, resend action |
| **24** | **Confirmation Checkbox (Legal Text)** | [`LegalConsentCheckbox`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/form/LegalConsentCheckbox.tsx) | 20px box in 44px touch target + multi-line legal measure | Keyboard Space toggle; embedded hyperlinks can be clicked without unchecking |
| **25** | **Document-Link Group** | [`DocumentLinkGroup`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/form/DocumentLinkGroup.tsx) | PDF icon + Title + File size badge + "View" external action | Grid or vertical stack; triggers document viewer modal or new tab |
| **26** | **Accessible Disclosure Trigger** | [`AccessibleDisclosureTrigger`](file:///c:/Users/salee/Downloads/Portal_ds/src/components/form/AccessibleDisclosureTrigger.tsx) | Text button + rotating chevron + progressive disclosure panel | `aria-expanded` toggle; replaces modal popups for educational explanations |

---

## 3. Interaction State Matrix

```
State Transitions & Visual Feedback:
┌──────────────┐     Focus       ┌──────────────┐     Invalid     ┌──────────────┐
│   DEFAULT    │ ─────────────>  │    FOCUS     │ ─────────────>  │   INVALID    │
│ Border #CBD5 │                 │ Ring #08A5B5 │                 │ Border #B91C │
└──────────────┘                 └──────────────┘                 └──────────────┘
       │                                                                  │
       │ Disabled                                                         │ Resolved
       ▼                                                                  ▼
┌──────────────┐                                                  ┌──────────────┐
│   DISABLED   │                                                  │    VALID     │
│ Fill #F1F5F9 │                                                  │ Border #CBD5 │
└──────────────┘                                                  └──────────────┘
```

### 3.1 Mouse & Touch Handling
- All clickable elements enforce a minimum **44×44px bounding box** (WCAG 2.2 Success Criterion 2.5.8).
- Inputs show immediate pointer feedback (`cursor: pointer` on selects/radios/checkboxes; `cursor: text` on fields; `cursor: not-allowed` on disabled).

### 3.2 Keyboard Navigation
- All form molecules are fully operable via keyboard:
  - `Tab` / `Shift+Tab`: Forward and backward navigation through interactive controls.
  - `Space`: Toggles checkboxes, radio buttons, and disclosure buttons.
  - `ArrowUp` / `ArrowDown`: Navigates combobox options, radio groups, and segmented controls.
  - `Backspace`: Navigates backwards across OTP digit inputs.
  - `Enter`: Submits promotional code, confirms selection, or toggles disclosure.
  - `Esc`: Closes open combobox listboxes.

### 3.3 Focus & Active Visibility
- Focus is indicated by a **2px solid `--ds-color-border-focus` (`#08A5B5`) ring** with a 2px offset or a `0 0 0 3px rgba(8, 165, 181, 0.15)` aura. No default un-styled browser outlines appear.

---

## 4. Test Verification & Code Quality

- **Test Suite:** [`src/test/form_molecules.test.tsx`](file:///c:/Users/salee/Downloads/Portal_ds/src/test/form_molecules.test.tsx)
- **Results:**
  - Total Test Files: **10 passed (10)**
  - Total Tests: **102 passed (102)**
  - Zero warnings or unhandled rejections.

---

## 5. Visual Evidence Artifacts

Full-resolution screenshots of the complete molecule showcase have been captured via headless Chrome at production DPR:
- **Desktop (1440×900 Viewport):**
  - Path: `docs/evidence/screenshots/molecules-gallery-desktop-1440px.png`
  - Artifact: `C:\Users\salee\.gemini\antigravity\brain\54b8aedc-dd01-4226-9a0a-224ea04249be\screenshots\molecules-gallery-desktop-1440px.png`
- **Mobile (390×844 Viewport, iPhone 12/13/14 Baseline):**
  - Path: `docs/evidence/screenshots/molecules-gallery-mobile-390px.png`
  - Artifact: `C:\Users\salee\.gemini\antigravity\brain\54b8aedc-dd01-4226-9a0a-224ea04249be\screenshots\molecules-gallery-mobile-390px.png`

