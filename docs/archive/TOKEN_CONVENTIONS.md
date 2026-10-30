# DoctorShield Design System — Token Naming Conventions & Governance

> **Document Reference:** `DOC-DS-TOKEN-CONVENTIONS-2026-10-29`  
> **Status:** Production Governance Specification  
> **Author:** Principal Design Systems Architect  
> **Rule:** Strict token naming conventions preventing ad-hoc CSS property sprawl.

---

## 1. The 3-Tier Naming Architecture

All CSS Custom Properties and TypeScript tokens must follow the strict 3-tier prefix architecture:

```
+─────────────────────────────────────────────────────────────────────────────+
|                         TOKEN NAMING CONVENTIONS                            |
+───────────┬───────────────────────────────────┬─────────────────────────────+
| Tier      | Syntax Format                     | Example Token               |
+───────────┼───────────────────────────────────┼─────────────────────────────+
| **Tier 1**| `--ds-primitive-[category]-[item]`| `--ds-primitive-color-teal-500`
| Primitives| `--ds-primitive-space-[n]`        | `--ds-primitive-space-4`    |
|           | `--ds-primitive-font-size-[scale]`| `--ds-primitive-font-size-md`
+───────────┼───────────────────────────────────┼─────────────────────────────+
| **Tier 2**| `--ds-color-[role]-[intent]`      | `--ds-color-text-primary`   |
| Semantics | `--ds-color-surface-[role]`       | `--ds-color-surface-panel`  |
|           | `--ds-color-border-[role]`        | `--ds-color-border-subtle`  |
|           | `--ds-space-[context]`            | `--ds-space-field-to-field` |
+───────────┼───────────────────────────────────┼─────────────────────────────+
| **Tier 3**| `--ds-comp-[element]-[property]`  | `--ds-comp-input-height`    |
| Component | `--ds-comp-[element]-[variant]`   | `--ds-comp-btn-height-compact`
+───────────┴───────────────────────────────────┴─────────────────────────────+
```

---

## 2. Category Keywords & Valid Identifiers

### 2.1 Colors
- **Primitive Ramps:** `teal`, `navy`, `slate`, `emerald`, `amber`, `rose`, `sky`.
- **Semantic Text Roles:** `primary`, `secondary`, `muted`, `disabled`, `heading`, `link`, `inverse`, `error`, `success`, `warning`.
- **Semantic Surface Roles:** `canvas`, `card`, `panel`, `subtle`, `brand-tint`, `overlay`.
- **Semantic Border Roles:** `subtle`, `default`, `strong`, `selected`, `error`.
- **Interactive Action Roles:** `primary`, `primary-hover`, `primary-active`, `secondary-bg`, `secondary-border`, `disabled-bg`, `disabled-text`.

### 2.2 Typography
- **Families:** `font-heading` (`Kanit`), `font-body` (`Inter`), `font-mono` (`JetBrains Mono`).
- **Weights:** `weight-regular` (`400`), `weight-medium` (`500`). *Note: `bold` is mapped to `500` to prevent weight 600+.*
- **Sizes:** `xs` (12px), `sm` (13px), `base` (14px), `md` (16px), `lg` (20px), `xl` (24px), `2xl` (28px).
- **Line Heights:** `tight` (1.2), `snug` (1.33), `normal` (1.5), `relaxed` (1.6).

### 2.3 Spacing Scale
- Defined as integer multiples of 4px: `space-0` (0px), `space-1` (4px), `space-2` (8px), `space-3` (12px), `space-4` (16px), `space-5` (20px), `space-6` (24px), `space-8` (32px), `space-10` (40px), `space-12` (48px), `space-16` (64px), `space-20` (80px).

---

## 3. TypeScript Token Governance & Typing

In `src/design-system/tokens.ts`, all tokens are exported as `const` assertions to guarantee compile-time type safety across all React components:

```typescript
export const semanticColors = {
  text: {
    primary: primitiveColors.slate[900],   // #17253B
    heading: primitiveColors.navy[900],    // #132766
    ...
  }
} as const;

export type SemanticTextColor = keyof typeof semanticColors.text;
```

---

## 4. Anti-Patterns & Lint Rules

1. ❌ **No Hardcoded Hex Values in JSX:** Writing `color: '#132766'` or `border: '1px solid #DFE6EC'` in inline component styles is prohibited. Use `var(--ds-color-text-heading)` or class `.ds-heading-section`.
2. ❌ **No Arbitrary Pixel Spacing:** Never use `margin: '15px'` or `padding: '22px'`. Always use the 4px scale.
3. ❌ **No Ad-Hoc CSS Variables:** Do not invent variables like `--my-custom-blue` or `--card-box-border`. All tokens must belong to the 3-tier hierarchy.

