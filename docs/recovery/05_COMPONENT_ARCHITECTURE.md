# COMPONENT ARCHITECTURE & DESIGN SYSTEM GOVERNANCE
## DoctorShield Individual Medical Professional Indemnity Portal

> **Document ID:** `DOC-DS-COMP-001`  
> **Status:** Component System Architecture Baseline (Phase 05)  
> **Classification:** [PROPOSED / SPECIFICATION]  
> **Author:** Principal Design Systems Engineer & Frontend Component Architect  
> **Created:** 2026-10-30  
> **Governance:** DoctorShield Product Engineering & Design Rules v2.0 (AGENTS.md)  
> **Scope:** Three-tier component hierarchy, atomic contracts, design token pipeline, surface governance, and composition rules.

---

## 1. The Core Problem & Architectural Mission

The initial DoctorShield forensic audit uncovered a critical design systems disconnect:
- An isolated component library had been drafted with passing unit tests, but the **live application screens continued rendering raw HTML inputs, inline style objects (`style={{...}}`), arbitrary font sizes, and uncoordinated margin stacks**.
- `Stage1CoverageForm.tsx` alone contained over 1,300 lines of code, where dropdowns, radios, and textfields were handcrafted inline, duplicating error displays, SVG icons, and focus styles.

### Architectural Solution: The Single-Source Component Pipeline
Phase 05 unifies the runtime application with the component system under a strict **Three-Tier Component Hierarchy**:

```
+--------------------------------------------------------------------------------------------------+
|                                  THREE-TIER COMPONENT HIERARCHY                                  |
+--------------------------------------------------------------------------------------------------+
| TIER 1: ATOMS (Primitives)                                                                       |
| Core accessible HTML wrappers with zero domain logic. Built on WAI-ARIA and design tokens.        |
| -> Typography (Heading, Text)  | Button         | TextInput      | Textarea                      |
| -> SelectCombobox              | Checkbox       | RadioButton    | SegmentedControl              |
| -> FieldLabel / ErrorMessage   | Divider        | Modal / Drawer | LiveAnnouncer                 |
+--------------------------------------------------------------------------------------------------+
| TIER 2: MOLECULES (Insurance-Specific Controls)                                                  |
| Domain-bound form controls encapsulating clinical, legal, and Malaysian financial workflows.      |
| -> LabeledSelect (Optgroups)   | LiabilityLimitSelector (Tiles + Radiogroup + Tier Recommendations)|
| -> CoverageDateField (Clause 6.12 modal) | MalaysianPhoneInput | PromoCodeField                  |
| -> YesNoSelector (44px binary) | PercentageAllocationRow | LegalConsentCheckbox (FSA/PDPA/PIDM)  |
+--------------------------------------------------------------------------------------------------+
| TIER 3: ORGANISMS & COMPOSITIONS (Feature Structures)                                            |
| Reusable macro structures composing multiple molecules into coherent stage sections.           |
| -> ApplicationHeader & StepProgressTracker | SummarySidebar (Sticky desktop breakdown)           |
| -> MobileSummaryDrawer (Slide-up drawer)   | BranchAllocationManager (Repeatable clinic cards)   |
| -> UnderwritingQuestionnaire               | PaymentMethodSelector (FPX vs Card)                 |
+--------------------------------------------------------------------------------------------------+
```

---

## 2. Design Token Pipeline & Variable Cascade

DoctorShield components consume styling through a strictly enforced CSS variable cascade:

```
[ Primitives: tokens.ts / tokens.css ]
  ├── --ds-primitive-color-teal-500: #08A5B5 (Official Brand Primary)
  ├── --ds-primitive-color-teal-700: #066F7B (Accessible Interactive Teal - 5.89:1)
  ├── --ds-primitive-color-navy-900: #132766 (Official Brand Secondary - 13.91:1)
  └── --ds-primitive-space-4: 16px / --ds-primitive-radius-lg: 8px
         │
         ▼
[ Semantics: tokens.css ]
  ├── --ds-color-text-primary:    #17253B (Slate 900)
  ├── --ds-color-text-link:       #055C66 (Teal 800 - AAA)
  ├── --ds-color-surface-canvas:  #F8FAFB (Slate 50)
  ├── --ds-color-border-selected: #08A5B5 (Teal 500)
  └── --ds-color-border-focus:    #132766 (Navy 900)
         │
         ▼
[ Component Tokens: foundation.css ]
  ├── --ds-comp-input-height:     48px (Prevents touch fatigue)
  ├── --ds-comp-input-font-size:  16px (Eliminates iOS Safari auto-zoom)
  ├── --ds-comp-btn-radius:       6px (radii.md)
  └── --ds-comp-panel-radius:     10px (radii.xl)
```

**Invariant Rule:** No component may declare arbitrary hex values or un-tokenized pixel margins. Every visual attribute must reference either `--ds-comp-*` or `--ds-color-*`.

---

## 3. Component Anatomy & API Contracts

Every Tier 1 and Tier 2 component conforms to a standardized TypeScript interface pattern:

```typescript
export interface BaseComponentProps {
  id?: string;               // Unique accessible identifier (auto-generated via useId if omitted)
  className?: string;        // External utility escape hatch
  style?: React.CSSProperties; // Micro-layout overrides
  disabled?: boolean;        // Accessible disabled state
}

export interface FormComponentProps<T> extends BaseComponentProps {
  label?: string;            // Field label text (rendered with FieldLabel)
  helperText?: string;       // Contextual instruction text
  errorMessage?: string;     // Inline error message (rendered with role="alert")
  required?: boolean;        // Visual indicator and aria-required="true"
  optional?: boolean;        // Non-mandatory indicator "(Optional)"
  value?: T;                 // Controlled value
  onChange?: (val: T) => void; // Standard change handler
}
```

---

## 4. Anti-Nesting Surface Rules

In alignment with Phase 04 architectural guidelines, components must never force artificial card wrappers:
1. **Forms are Open:** Text inputs, select dropdowns, and datefields render with transparent backgrounds directly on the `--ds-color-surface-canvas` (`#F8FAFB`).
2. **Cards are Choices:** The `.ds-card` or `.ds-liability-card` style is used *only* when the element represents a selectable choice (e.g. Liability Limit tile, Add-on toggle, Payment method card).
3. **Panels Group Subsystems:** A bordered container (`.ds-panel`) is used exclusively when grouping logically complex multi-field entities (e.g. Clinic Branch repeaters or Final Review summaries).

---

## 5. Summary of Architecture Governance

1. **One Authoritative Component Catalog:** All customer-facing screens must import from `src/components/ui/`, `src/components/form/`, or `src/components/insurance/`.
2. **Zero Inline Styles in Stage Screens:** All layouts, borders, and paddings are delegated to component wrappers and `foundation.css` utility classes.
3. **Universal Accessibility:** Every input automatically connects its label via `htmlFor`, its error message via `aria-describedby` with `role="alert"`, and its invalid state via `aria-invalid="true"`.
4. **Tested at Atom, Molecule, and Screen Levels:** Unit tests protect components in isolation; stage integration tests protect real user workflows.

