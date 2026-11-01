# DoctorShield — Visual-First Product Engineering Rules

> **Scope:** These rules govern every AI agent, subagent, and automated task operating on this repository.
> They take precedence over all general-purpose agent defaults.
> **Version:** 4.0 — Visual-First Product Engineering Rules. Owner: Principal Product Architect & Design Director.

---

## 1. Mission

Completely redesign the frontend UI of DoctorShield Individual Medical Indemnity Insurance into a distinctive, premium, ultra-minimal and production-quality insurance experience.

The current visual system is rejected.

Preserve validated insurance behavior while replacing the existing presentation architecture.

Prioritize actual UI quality over documentation volume, component counts and claims of implementation completeness.

---

## 2. Design references

**Primary:**
- **QIC Online:** premium insurance interface composition.
- **Ditto Insurance:** calm editorial simplicity and human-centered clarity.

**Secondary:**
- **ACKO:** quotation selection and transactional interactions.

**Research:**
- **Baymard Institute** insurance UX research.
- Applicable **WCAG 2.2** accessibility guidance.

These are benchmarks, not assets or exact layouts to copy.

---

## 3. Brand

- **Official primary:** `#08A5B5`.
- **Official secondary:** `#132766`.
- **Headings:** **Kanit**, weights 400–500.
- **Body/interface:** **Inter**.

Use accessible interactive color derivatives when needed.

Never use an inaccessible brand-color combination merely for visual consistency.

Do not substitute additional brand colors without approval.

---

## 4. Preserve insurance behavior

Never invent, silently change or remove:

- Products, benefits and coverage.
- Premium calculations.
- Eligibility rules.
- Add-on dependencies.
- Underwriting questions.
- Legal disclosures and consents.
- Payment behavior.
- Renewal behavior.
- Verified API contracts.

Do not treat local simulations or mocked services as verified live integrations.

Never trigger real transactions or notifications during testing without authorization.

---

## 5. Content rules

Use approved existing customer-facing copy.

Do not generate additional explanations, marketing language or helper paragraphs.

Remove redundant AI-generated content only after verifying source and legal requirements.

Use conditional visibility to reduce unnecessary initial content.

Preserve legally required wording and acknowledgment requirements.

Any substantive copy change requires approval.

---

## 6. Visual design authority

The approved NEW art direction is authoritative for UI appearance.

Existing CSS and old component styling are migration sources, not design benchmarks.

Do not retain a rejected visual treatment solely to preserve old markup or tests.

A new screen must have visibly improved:
- Composition.
- Hierarchy.
- Typography.
- Geometry.
- Spacing.
- Grouping.
- Selection states.
- Information density.
- Responsive behavior.

Changing only colors, fonts, radius or shadows does not qualify as a redesign.

---

## 7. Component quality

Every production component must have:

- Clear purpose.
- Defined anatomy.
- Approved visual tokens.
- Appropriate states.
- Accessible behavior.
- Responsive rules.
- Typed interface.
- Relevant tests.
- Actual customer-application usage.

Do not create components merely to increase catalog counts.

Do not recreate equivalent components in multiple places.

Do not ship unapproved component-library defaults.

Use native accessible controls or established primitives where appropriate.

Do not invent complicated custom widgets unnecessarily.

---

## 8. Styling rules

Use one approved token and component styling system.

Avoid arbitrary inline presentation styles in feature screens.

Do not hardcode repetitive colors, fonts, dimensions or spacing.

Avoid:
- Nested card stacks.
- Generic dashboard panels.
- Decorative icons.
- Gratuitous gradients.
- Excessive badges.
- Heavy shadows.
- Tiny body copy.
- Oversized empty areas.
- Uniform treatment of unrelated information.

Use containers only when they establish a meaningful boundary or selectable region.

---

## 9. Layout rules

Design screens around the customer's current task.

Do not design the application as a component showcase.

Use:
- Readable content width.
- Clear alignment.
- Deliberate whitespace.
- Consistent visual rhythm.
- Contextual quotation summaries.
- Focused navigation.
- Clear financial data hierarchy.

Desktop and mobile may use different compositions while preserving content and behavior.

No important action or disclosure may be obscured by sticky UI.

---

## 10. Cognitive-load rules

Do not expose all conditional information simultaneously.

Do not repeat financial breakdowns in multiple visible regions without a justified need.

Do not make optional insurance coverages look mandatory.

Do not show misleading urgency.

Avoid unnecessary steps, dialogs and decisions.

Preserve back navigation, valid form data and error recovery.

---

## 11. Visual-first execution

Before implementing an entire design system:

1. Inspect the live existing screen.
2. Capture its screenshot.
3. Create a clearly different, high-fidelity new composition using actual approved content.
4. Review the visual quality.
5. Obtain approval.
6. Derive tokens and shared components from the approved design.
7. Implement in the real application.
8. Reinspect the actual rendered result.

Do not reverse this order by generating a large component catalog first.

---

## 12. Real integration requirement

A component does not count as delivered merely because it exists in a catalog.

Every important shared component must be adopted by a real application screen.

Feature screens must use the approved shared components.

Do not create a parallel design system disconnected from production screens.

---

## 13. Acceptance criteria

Every redesigned stage must pass:

- Functional regression.
- Content parity.
- Design-system compliance.
- Responsive inspection.
- Accessibility checks.
- Visual before/after comparison.
- Relevant typecheck and build checks.

Tests protecting business outcomes must not be weakened to accommodate UI changes.

UI tests may be updated to reflect intentional semantic structure changes.

---

## 14. Cleanup and repository hygiene

Maintain a compact repository.

Keep essential:
- Source code.
- Tests.
- Configuration.
- Approved content and legal specifications.
- API contracts.
- Current agent rules.
- Necessary design documentation.

Avoid accumulating:
- Duplicate Markdown reports.
- Historical prompt files.
- Unused catalogs.
- Temporary screenshots.
- Build caches.
- Dead scaffolds.
- Duplicate components.

Delete or archive files only after reference verification and a recoverable checkpoint.

Do not create multiple new Markdown files per task.

---

## 15. Completion reporting

At the end of each phase provide:

- Exact modified files.
- What changed visually or structurally.
- What was preserved.
- Tests performed and results.
- Desktop/mobile screenshots.
- Outstanding defects.
- Unverified requirements.

Do not claim quality based on descriptive adjectives.

Show the actual application.

Stop at each approval gate.

---

## 16. Definition of done

The result must be:

- Visually coherent.
- Distinctive to DoctorShield.
- Minimal without missing necessary information.
- Integrated into the actual customer journey.
- Accessible.
- Responsive.
- Functionally correct.
- Tested.
- Maintainable.

Production readiness additionally requires authoritative integration verification, legal/business approvals, security review and deployment acceptance.

---

## Final Principle

> **Preserve the insurance engine; replace weak interface design without compromise.**
