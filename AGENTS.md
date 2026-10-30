# DoctorShield Individual Medical Indemnity — Master Agent Rules V3
# DoctorShield — Product Engineering & Design Governance

> **Scope:** These rules govern every AI agent, subagent, and automated task operating on this repository.
> They take precedence over all general-purpose agent defaults.
> **Version:** 3.0 — Master Agent Rules V3. Last updated: 2026-10-30. Owner: Principal Product Architect & Design Director.

---

## 1. Project Mission

Deliver a complete, visually redesigned, production-quality DoctorShield Individual Medical Indemnity Insurance portal.

The objective is not a cosmetic improvement.

The existing frontend visual architecture is being replaced with a new, cohesive, exceptionally refined design system.

The finished product must be:
- Ultra-minimal and clean.
- Visually distinctive.
- Professionally art-directed.
- Intuitive and predictable.
- Appropriate for Malaysian medical professionals.
- Fully responsive.
- Accessible.
- Production-quality.
- Functionally equivalent to approved existing insurance capabilities.

Retain verified domain functionality while allowing complete visual redesign of presentation components, layouts and screen compositions.

---

## 2. Design Benchmarks

**PRIMARY:**
- **QIC Online** — premium visual composition, modern transactional UI and structural precision.
- **Ditto Insurance** — human-centered clarity, understated styling and approachable editorial design.

**SECONDARY:**
- **ACKO** — plan selection, navigation and insurance form interactions.

**RESEARCH:**
- **Baymard Institute** insurance UX research, plus relevant accessibility and form design guidance.

These are references, not copy targets.
Do not copy competitor colors, visual identities, code, assets, illustrations or proprietary layouts.
DoctorShield must have a distinctive and coherent brand identity.

---

## 3. Official Branding

- **Primary brand color:** `#08A5B5`
- **Secondary brand color:** `#132766`
- **Heading typography:** **Kanit**, weight 400 or 500 only. Never bold (600+).
- **Body/interface typography:** **Inter**, weight 400 or 500.

Use approved accessible derivatives of the official colors where necessary (`#066F7B`, `#055C66`).
Do not render ordinary white text on the official teal unless the contrast requirement is satisfied.
Do not introduce unapproved fonts or decorative typography.

---

## 4. Mandatory Insurance Protection

Preserve verified:
- Medical classifications.
- Coverage limits.
- Policy dates.
- Premium calculations.
- Clinic and PIC eligibility.
- Add-on selection rules.
- Underwriting questions and outcomes.
- Branch eligibility.
- Tax calculations.
- Discounts.
- Renewal workflows.
- OTP and verification behavior.
- Payment requirements.
- Regulatory disclosures.
- Legal consents.
- Policy confirmation and document access.

Never invent or change insurance rules to simplify the UI.
Never substitute mock amounts for actual quotation amounts.
Treat existing local pricing simulations as simulations until authoritative integration is independently verified.
Never claim a backend integration is live without evidence.
Do not trigger real insurance transactions, payments, notifications or OTPs during development without explicit authorization.

---

## 5. Content Rules

Use approved existing DoctorShield content as the source of truth.
- No new marketing copy.
- No invented product benefits.
- No arbitrary explanatory paragraphs.
- No AI-generated generic helper descriptions.
- No unnecessary repeated content.

Preserve legal and underwriting wording unless an authorized product/legal owner approves changes.

Minimalism should primarily come from:
- Better sequencing.
- Conditional visibility.
- Clear hierarchy.
- Reduced duplication.
- More natural grouping.
- Better use of space.

Required legal content must remain presented at the correct stage and with any required acknowledgment.
Do not hide mandatory declarations merely to make screenshots look cleaner.

---

## 6. Visual Reset — Mandatory

The current visual system must not be treated as an approved final design.
Existing visual components are candidates for redesign, not templates that must be preserved.

**Allowed:**
- Replace old component styling.
- Rebuild component anatomy.
- Change application layout.
- Replace obsolete card composition.
- Introduce a new semantic token system.
- Redesign progress navigation.
- Redesign quotation summary patterns.
- Reorganize screen composition.
- Retire verified obsolete visual components after migration.

**Not allowed:**
- Changing verified insurance logic without approval.
- Silently removing content.
- Losing working interaction capabilities.
- Deleting working code without dependency checks.
- Replacing real data with invented examples.

A new design system must look materially different from the previous UI for clear, intentional reasons.
Simply changing border radius, shadows, spacing or colors does not satisfy a complete visual redesign.

---

## 7. Visual Design Quality

**Prioritize:**
- Exceptional typography.
- Balanced composition.
- Sophisticated proportions.
- Optical alignment.
- Controlled color distribution.
- Thoughtful whitespace.
- Precise control geometry.
- Consistent visual rhythm.
- Elegant selected states.
- Clean financial information.
- Refined insurance coverage selection.
- Clear content hierarchy.
- Cohesive desktop and mobile experiences.

**Avoid:**
- Generic SaaS dashboards.
- Wireframe-like forms.
- Nested cards.
- Gradients without purpose.
- Excessive rounded rectangles.
- Random shadows.
- Decorative icons.
- Huge headings.
- Excessive badges.
- Overdescriptive UI.
- Decorative illustrations within routine form screens.
- Inconsistent control sizes.
- Arbitrary spacing.
- Duplicate summaries.
- Excessive typography weights.

Do not make everything look identical.
Use distinct, intentional composition patterns for:
- Form groups.
- Insurance products.
- Optional add-ons.
- Financial summaries.
- Legal disclosures.
- Payment selection.
- Completion outcomes.

---

## 8. Atomic Design System

The design system must cover:

- **Foundations:** Colors, typography, spacing, sizing, borders, radii, elevation, focus, motion, layout and breakpoints.
- **Atoms:** Buttons, inputs, labels, text, links, checkboxes, radios, icons, dividers, indicators.
- **Molecules:** Form fields, choice groups, date fields, dropdowns, add-on selection rows, price rows, OTP inputs and validation groups.
- **Organisms:** Application header, step navigation, quotation summary, coverage selector, form sections, underwriting groups and payment selection.
- **Templates:** Responsive application shell and purpose-specific stage layouts.
- **Screens:** Actual production application stages composed from the approved system.

Every component must have explicit anatomy, variants, states, accessibility behavior and responsive rules.
Avoid overengineering components that only need one clear role.

---

## 9. Design System Adoption

A component is not complete because it exists in a component gallery.
It must be integrated into the active customer journey.

Never build a parallel design-system library without a migration and adoption plan.
Avoid duplicating controls across feature screens.
Use shared components for common behavior and appearance.
Native HTML form controls are permitted within properly designed shared components.
Do not create custom controls that reduce accessibility unnecessarily.
No uncontrolled hardcoded visual values in feature screens.
New design tokens must be consumed by actual application components.

---

## 10. UX and Cognitive Load

- Each screen must have a clear task.
- Present relevant questions in a natural order.
- Use conditional questions only when the associated business conditions apply.
- Avoid repeated content and simultaneous duplicate data.
- Allow users to edit prior choices and recover from mistakes.
- Maintain clear and truthful pricing feedback.
- Do not hide optional coverage pricing.
- Do not require users to remember information unnecessarily.
- Avoid disruptive modals for simple contextual content.
- Use established form patterns unless a different interaction demonstrably improves usability.
- Do not add explanations merely to compensate for unclear design.

---

## 11. Mobile-First Quality

Mobile is a separately composed experience, not a compressed desktop.
Test meaningful layouts at 320, 360, 390, 430, 768, 1024 and 1440px widths.

**Ensure:**
- No horizontal scrolling.
- Legible labels and body text.
- Appropriate mobile keyboards.
- Accessible controls.
- Comfortable touch targets (minimum 44x44px).
- Proper safe-area behavior.
- No obstructive sticky elements.
- Responsive financial breakdowns.
- Usable lengthy legal questions.
- Correct modal and drawer behavior.

Use at least 16px input text on mobile where necessary to avoid unintended iOS Safari zoom.
Avoid arbitrary maximum form height targets.

---

## 12. Codebase Architecture

Keep business logic separate from visual presentation.
Maintain clear boundaries between:
- Domain models.
- Rating and underwriting services.
- API integrations.
- Application state.
- Form schemas.
- Shared design system.
- Feature-specific compositions.
- Routes.
- Tests.

Avoid duplicate business calculations.
Avoid multiple sources of truth for quotation totals.
Do not perform large unreviewed refactors.
Do not install dependencies unless justified.
Keep development catalogs and fixtures separate from production bundles.

---

## 13. Cleanup Rules

Before changing architecture:
1. Verify current active files.
2. Preserve Git history and uncommitted work.
3. Establish a recoverable checkpoint.
4. Identify critical insurance modules.
5. Map component and route dependencies.
6. Establish passing or documented failing baseline tests.

Never delete potentially active code based only on an old audit report.
Clean obsolete architecture incrementally after verified replacement.
Never silently modify live payment, underwriting or pricing services as part of a visual task.

---

## 14. Test and Acceptance Policy

Every implementation task requires:
- Code changes in the intended live application.
- Typechecking.
- Build validation.
- Relevant unit/integration tests.
- Functional regression evidence.
- Desktop screenshots.
- Mobile screenshots.
- Accessibility checks.
- Content parity checks.
- Visual inspection.

UI tests should verify user-observable behavior rather than obsolete DOM hierarchy.
Business-rule assertions must not be weakened merely to accommodate visual changes.

---

## 15. Visual Acceptance Gate

**THIS IS MANDATORY.**

Before implementing a redesigned screen, capture the current screen.
After implementing, capture the new screen at the same viewport, state and content conditions.

**Compare:**
- Overall composition.
- Typographic hierarchy.
- Spacing.
- Component anatomy.
- Visual grouping.
- Color distribution.
- Information density.
- Selection states.
- Financial presentation.
- Responsive behavior.

If the result resembles the old screen with minor CSS changes, the redesign fails.
Explain what was structurally redesigned and show the evidence.
Do not claim "premium", "modern", "world-class" or "high-fidelity" as proof of quality.
Demonstrate actual design improvement.
Do not invent numerical usability improvements without testing.

---

## 16. Phase Execution

For every phase:
1. Inspect the current implementation.
2. Confirm scope.
3. Establish acceptance criteria.
4. Plan changes.
5. Implement the approved scope.
6. Integrate with the live app.
7. Run tests.
8. Capture screenshots.
9. Compare against design expectations.
10. Report changes and blockers.
11. Stop for review.

**Do not continue automatically into the next major phase.**

---

## 17. Required Completion Report

Every finished task must report:
- Changed files.
- Removed or archived files.
- Components created or reused.
- Old styling replaced.
- Design decisions implemented.
- Functional behavior preserved.
- Tests executed and actual results.
- Visual screenshots.
- Desktop/mobile issues remaining.
- Unverified integrations.
- Approval requirements.

Do not call a task complete when only documentation or isolated components were created.

---

## 18. Definition of Done

A feature is complete only when:
- It is implemented in the active customer-facing application.
- It follows the approved new visual design.
- It uses the shared design system.
- It preserves approved insurance content and behavior.
- It passes relevant tests.
- It is accessible.
- It works on mobile and desktop.
- It has been visually reviewed.
- It does not create duplicate component architecture.

Production readiness additionally requires verified integrations, security, legal approval and deployment checks.

---

## Final Instruction

> **Stop preserving a visually unsuccessful frontend simply because it already exists.**
>
> **Preserve valuable functionality.**
>
> **Replace weak visual architecture deliberately.**
>
> **Build one consistent, distinctive DoctorShield product.**
