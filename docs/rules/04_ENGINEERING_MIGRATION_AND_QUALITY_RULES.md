# DoctorShield — Engineering, Migration & Quality Rules

> **Scope:** Authoritative engineering architecture, design-system migration policy, protected business modules, and quality verification standards.
> **Version:** 5.0 — Rule 4. Owner: Principal Product Architect & Design Director.

---

## 1. Architecture

Strictly separate:
- **Domain logic.**
- **Rating and underwriting.**
- **API integrations.**
- **Workflow state.**
- **Validation.**
- **UI components.**
- **Screen composition.**
- **Design tokens.**
- **Tests.**

Visual components must not independently calculate authoritative insurance premiums.

---

## 2. Design-system migration

The previous design system is rejected.

Build a new replacement design system under one verified source directory.

Do not automatically import legacy styling into the new system.

Reuse validated accessibility and interaction behavior where useful.

Do not preserve visually weak component anatomy.

Maintain a migration map for every replaced component.

Remove old implementations only after the replacement is active, verified and tested.

---

## 3. Protected modules

Treat as high risk:
- Premium calculations (`ratingService.ts`).
- Add-on dependencies.
- Underwriting decisions (`underwritingService.ts`, `UNDERWRITING_DECISION_TREE.md`).
- Payment services (`paymentService.ts`, PCI-DSS boundaries).
- Verification (`otpService.ts`).
- Renewal (`renewalService.ts`).
- Personal-data handling (PDPA 2010 sanitization & masking).
- Legal acknowledgments (Schedule 9 FSA 2013).

Do not change these modules during purely visual redesign work.

Any required correction must have a separate scope, approval and regression test.

---

## 4. Repository cleanup

Before removing any file:
- Confirm actual use.
- Check imports.
- Check tests.
- Check dynamic references.
- Verify a recovery checkpoint.
- Record the reason for removal.

Retain necessary product and regulatory source documents.

Avoid accumulating redundant Markdown files and temporary screenshots.

Keep development-only visuals out of production bundles.

---

## 5. Component implementation

Shared components must have:
- Stable typed interfaces.
- Explicit visual tokens.
- Relevant interaction states (default, hover, focus, active, disabled, error).
- Accessible markup (ARIA roles, keyboard listeners).
- Correct keyboard behavior.
- Responsive styling.
- Unit/component tests.
- Actual live usage in application screens.

Avoid duplicate button, input, select and modal implementations.

---

## 6. Styling

Use one authoritative token system.

Avoid repetitive hardcoded visual values.

Avoid arbitrary inline style objects inside production screens.

Keep styling modular and maintainable.

Do not create global overrides that unexpectedly restyle unrelated components.

---

## 7. Verification

For every completed phase, run relevant:
- **TypeScript checks** (`tsc --noEmit`).
- **Build checks** (`vite build`).
- **Unit tests** (`vitest run`).
- **Component tests.**
- **Integration tests.**
- **Domain regression tests.**
- **Browser interaction tests.**
- **Accessibility checks.**
- **Visual screenshot comparisons.**

Record actual results, not assumed success.

---

## 8. Implementation workflow

Follow the 11-step execution cycle for each phase:
1. **Inspect** current code and actual application.
2. **Define scope** for the bounded task.
3. **Identify protected behavior** (rating, underwriting, compliance).
4. **Plan the changes.**
5. **Implement the bounded change.**
6. **Integrate** into active application screens.
7. **Test** via automated suites.
8. **Inspect screenshots** across desktop, tablet, and mobile viewports.
9. **Review accessibility** (contrast, keyboard, screen reader).
10. **Report blockers** and document remaining defects.
11. **Stop for approval.** Do not automatically proceed to the next phase.

---

## 9. Completion standards

- A feature is not complete if it exists only in a component catalog.
- A component is not complete if the live application still uses an old implementation.
- A stage is not complete if it only has updated CSS but retains the rejected visual architecture.
- Do not report production readiness when backend integrations are simulated or unverified.
- Preserve all important insurance behavior while delivering the approved new UI.

