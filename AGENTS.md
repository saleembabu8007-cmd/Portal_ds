# DoctorShield — Master Product Rules V5

> **Scope:** These rules govern every AI agent, subagent, and automated task operating on this repository.
> They take precedence over all general-purpose agent defaults.
> **Version:** 5.0 — Master Product Rules. Owner: Principal Product Architect & Design Director.

---

## 1. Mission

Completely replace the rejected DoctorShield Individual Indemnity frontend design system and create a new production-quality, ultra-minimal insurance application.

The final product must demonstrate exceptional visual craftsmanship, accessible interactions, predictable behavior, responsive composition and reliable insurance functionality.

This is a deliberate frontend UI replacement, not an incremental cosmetic reskin.

---

## 2. Design authority

**Primary benchmarks:**
- **QIC Online:** insurance interaction architecture, modern mobile composition and selection clarity.
- **Wise:** precise financial presentation, transparent amounts and focused transaction interfaces.

**Supporting references:**
- User-provided insurance UI screenshots.
- **Ditto Insurance:** restraint and human-centered clarity.
- **Baymard Institute:** insurance usability research.

Do not copy their identities, colors, layouts or proprietary assets.

DoctorShield must look distinctive.

---

## 3. Brand invariants

- **Primary:** `#08A5B5`.
- **Secondary:** `#132766`.
- **Headings:** **Kanit**, weights 400 and 500 only.
- **Body and interface:** **Inter**.

Use accessible semantic color variants.

---

## 4. Product flow

Use five top-level stages:

1. **Coverage**
2. **Quotation**
3. **Details**
4. **Declaration**
5. **Summary**

Payment belongs in Summary. Policy confirmation, payment failure and underwriting referral are outcomes.

Preserve verified requirements even when a customer journey needs conditional substeps.

---

## 5. Critical insurance protections

Never invent or silently change:
- Coverage or benefits.
- Medical classifications.
- Liability limits.
- Premium rates and formulas.
- Clinic/PIC conditions.
- Add-on eligibility.
- Tax or discount rules.
- Underwriting decisions.
- Renewal rules.
- Payment handling.
- Required legal disclosures.

Preserve approved content and business behavior.

Never label a mock or simulated integration as live.

Do not perform real transactions during tests without explicit authorization.

---

## 6. Content constraints

Make the product ultra-minimal by improving sequencing, grouping, visibility and layout.

Do not invent additional marketing copy, helper descriptions or insurance explanations.

Use the approved existing content register.

Do not remove mandatory questions or legal text.

Any new wording needed for errors, navigation or accessibility must be sourced from an approved copy register or proposed for approval before customer-facing use.

---

## 7. Visual replacement mandate

The existing component catalog and visual design are rejected.

Do not use their styling as the benchmark for the new system.

Preserve useful functionality, but allow full replacement of:
- Tokens.
- UI component anatomy.
- Typography hierarchy.
- Card treatments.
- Form composition.
- Layout architecture.
- Navigation presentation.
- Coverage-selection presentation.
- Financial-information presentation.

The final production build must not retain an obsolete competing design system.

---

## 8. Implementation priorities

1. Protect insurance logic.
2. Remove verified obsolete UI infrastructure.
3. Approve a new customer-facing art direction.
4. Engineer design foundations from the approved screens.
5. Build new components.
6. Integrate each component into live application screens.
7. Verify functionality and visual quality.
8. Remove remaining legacy UI dependencies.

Never build a large standalone catalog before proving the new design in a real screen.

---

## 9. Quality standard

Technical correctness is necessary but insufficient.

Every production screen must demonstrate:
- Clear information hierarchy.
- Mature typography.
- Deliberate composition.
- Minimal unnecessary content.
- Precise control geometry.
- Clear selection behavior.
- Financial transparency.
- Accessible form interactions.
- Responsive desktop and mobile layouts.
- Consistency with the approved art direction.

Do not declare quality using adjectives alone.

Demonstrate it with rendered screenshots and working interactions.

---

## 10. Repository safety

Before cleanup:
- Verify imports and actual file usage.
- Preserve a recoverable Git checkpoint.
- Identify active customer-facing screens.
- Identify all modules containing insurance rules.
- Identify which services are real and which are simulated.
- Verify relevant tests and baseline behavior.
- Record uncommitted changes before modifying or removing files.

Do not delete actively imported UI components before their replacements are integrated and tested.

The rejected design system must ultimately be removed from the active production architecture, but this must happen through controlled migration.

Never delete files solely because their names contain "old", "legacy", "catalog", "preview" or "design-system".

Preserve essential product documentation, legal specifications, insurance rules, integration contracts, tests and approved content inventories.

Remove or archive redundant Markdown reports, screenshots, prototypes, temporary captures and unused design artifacts only after verifying their purpose.

---

## 11. Design-system replacement policy

Build a completely new visual system from approved high-fidelity customer-facing screen designs.

The replacement system must define:

1. Primitive and semantic design tokens.
2. Typography and visual hierarchy.
3. Layout grids and responsive containers.
4. Form control anatomy.
5. Interactive states.
6. Selection and comparison components.
7. Insurance-specific compositions.
8. Financial information patterns.
9. Navigation and progress indicators.
10. Accessibility and responsive behavior.

Do not automatically migrate rejected visual styles into the replacement components.

Preserve useful component behavior, accessibility and validated state logic when appropriate.

Avoid maintaining parallel old and new component implementations after migration is complete.

---

## 12. Strict visual quality rules

A screen must not resemble:
- A wireframe.
- A component catalog.
- A generic SaaS template.
- A default UI-library demonstration.
- A loosely assembled form.
- A collection of unrelated bordered boxes.
- An unpolished AI-generated interface.

Visual quality must be established through:
- Deliberate proportions.
- Optical alignment.
- Clear typography.
- Refined spacing.
- Controlled visual density.
- Purposeful use of brand colors.
- Excellent control anatomy.
- Sophisticated financial-data presentation.
- Distinct but coherent component treatments.
- Well-considered desktop and mobile layouts.

Do not add decorations to disguise weak composition.

Avoid unnecessary illustrations, gradients, icons, shadows and badges.

---

## 13. Five-stage journey

The customer-facing application has five top-level stages:

1. **Coverage**
2. **Quotation**
3. **Details**
4. **Declaration**
5. **Summary**

This structure must be applied consistently across navigation, application state, forms, validation, progress and responsive layouts.

Do not introduce additional top-level stages without approval.

Conditional questions and relevant substeps may appear within these stages.

Payment processing, policy confirmation, quotation expiry and underwriting referral are outcomes or conditional flows rather than additional numbered purchasing stages.

Preserve all verified eligibility and disclosure requirements when moving existing questions between stages.

---

## 14. Content minimalism

Customer-facing content must be deliberately restrained.

Prefer:
- One clear page heading.
- Existing approved field labels.
- Concise and necessary guidance.
- Contextual information when required.
- Clear action labels.
- Accessible and readable legal text.

Avoid:
- Introductory marketing paragraphs.
- Repeated field instructions.
- Generic reassurance messages.
- Unnecessary section descriptions.
- Repeated price explanations.
- AI-authored benefit descriptions.

Use existing approved wording whenever possible.

Any new essential copy requires an explicit approval record.

Do not remove or paraphrase legally significant content without authorization.

---

## 15. Responsive quality

Desktop and mobile are equally important.

Do not simply shrink desktop components.

Create deliberate mobile compositions for:
- Coverage selection.
- Quotation review.
- Add-ons.
- Long forms.
- Underwriting questions.
- Premium summaries.
- Payment methods.
- Legal declarations.

All controls must remain accessible, readable and appropriately sized.

No horizontal overflow, clipped text, obstructive bottom bars or inaccessible modal interactions.

---

## 16. Working procedure

For each phase:

1. Read the applicable rules and approved specifications.
2. Inspect the current code and actual application.
3. Confirm the intended work.
4. Identify protected business functionality.
5. Implement the bounded task.
6. Integrate the result into the active application.
7. Run relevant tests.
8. Capture desktop/mobile screenshots.
9. Review visual quality.
10. Document remaining defects.
11. Stop for approval.

Do not automatically continue to the next phase.

---

## 17. Completion standards

A phase is complete only when the intended outcome is genuinely delivered.

Creating documentation does not count as implementing a design system.

Creating components in a catalog does not count as integrating them.

Passing unit tests does not automatically establish visual quality or real backend integration.

Every completed screen must demonstrate:
- Approved visual design.
- Correct content.
- Correct insurance behavior.
- Consistent component usage.
- Accessible interactions.
- Desktop/mobile quality.
- Successful relevant regression testing.

---

## Final governing principle

> **Preserve DoctorShield's validated insurance functionality and legal integrity.**
> **Completely replace the rejected visual design.**
> **Create a coherent, minimal, exceptionally polished production experience, with quality demonstrated through real screens and interactions rather than descriptive claims.**
