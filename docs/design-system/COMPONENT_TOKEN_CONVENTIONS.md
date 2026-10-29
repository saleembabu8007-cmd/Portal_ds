# COMPONENT TOKEN CONVENTIONS & STYLING ARCHITECTURE
## DoctorShield Design Token Consumption Guidelines

> **Document ID:** `DOC-DS-COMP-001`  
> **Status:** Production Standard (Phase 2 Deliverable)  
> **Target:** Frontend Engineers & Component Authors  
> **Governing Documents:** [`DESIGN_SYSTEM_FOUNDATIONS.md`](file:///c:/Users/salee/Downloads/Portal_ds/docs/design-system/DESIGN_SYSTEM_FOUNDATIONS.md), [`DESIGN_TOKENS.md`](file:///c:/Users/salee/Downloads/Portal_ds/docs/design-system/DESIGN_TOKENS.md)

---

## 1. Component Token Naming Philosophy

Component tokens adhere to the BEM-inspired token standard:
```
--ds-comp-[component]-[element]-[property]-[variant]-[state]
```
For example:
- `--ds-comp-btn-bg-primary-hover`
- `--ds-comp-input-border-error`
- `--ds-comp-card-padding-desktop`

---

## 2. Component Token Specifications & CSS Recipes

### 2.1 Buttons (`.btn`)

#### Primary Button (`.btn-primary`)
Used for primary workflow progressions (`Generate Quotation`, `Proceed to Application`, `Authorize Payment`).
```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: var(--ds-comp-btn-height-md); /* 48px */
  padding: 0 var(--ds-comp-btn-padding-x);   /* 24px */
  border-radius: var(--ds-comp-btn-radius);  /* 6px */
  font-family: var(--ds-primitive-font-body);
  font-size: var(--ds-primitive-font-size-sm); /* 14px */
  font-weight: var(--ds-primitive-font-weight-medium); /* 500 */
  line-height: var(--ds-primitive-line-height-normal);
  color: var(--ds-primitive-color-slate-0);  /* #FFFFFF */
  background-color: var(--ds-color-action-primary); /* #066F7B (5.89:1) */
  border: 1px solid transparent;
  cursor: pointer;
  transition: background-color var(--ds-primitive-duration-fast) var(--ds-primitive-ease-default);
}

.btn-primary:hover {
  background-color: var(--ds-color-action-primary-hover); /* #055C66 (7.69:1) */
}

.btn-primary:active {
  background-color: var(--ds-color-action-primary-active); /* #04464D */
}

.btn-primary:disabled {
  background-color: var(--ds-color-action-disabled-bg);   /* #E2E8F0 */
  color: var(--ds-color-action-disabled-text);            /* #94A3B8 */
  cursor: not-allowed;
}

.btn-primary:focus-visible {
  outline: 2px solid var(--ds-color-focus-ring);           /* #08A5B5 */
  outline-offset: 2px;
}
```

#### Secondary Button (`.btn-secondary`)
Used for non-destructive major actions (`Review Renewal Quote`, `Download PDF`).
```css
.btn-secondary {
  min-height: var(--ds-comp-btn-height-md);
  padding: 0 var(--ds-comp-btn-padding-x);
  border-radius: var(--ds-comp-btn-radius);
  background-color: var(--ds-color-action-secondary); /* #132766 */
  color: var(--ds-primitive-color-slate-0);           /* #FFFFFF (13.91:1) */
  border: 1px solid transparent;
}
.btn-secondary:hover {
  background-color: var(--ds-color-action-secondary-hover); /* #192C5B */
}
```

#### Ghost / Tertiary Button (`.btn-ghost`)
Used for backward navigation and secondary dismissals (`Back to Quotation`, `Cancel`).
```css
.btn-ghost {
  min-height: var(--ds-comp-btn-height-md);
  padding: 0 var(--ds-primitive-space-4);
  background-color: transparent;
  color: var(--ds-color-text-secondary); /* #475569 */
  border: 1px solid transparent;
}
.btn-ghost:hover {
  background-color: var(--ds-primitive-color-slate-100);
  color: var(--ds-color-text-primary);
}
```

---

### 2.2 Form Controls & Inputs (`.input-field`)

```css
.input-field {
  width: 100%;
  height: var(--ds-comp-input-height); /* 48px fixed */
  padding: var(--ds-comp-input-padding-y) var(--ds-comp-input-padding-x);
  font-family: var(--ds-primitive-font-body);
  font-size: var(--ds-primitive-font-size-base); /* 16px to prevent iOS Safari auto-zoom */
  color: var(--ds-color-text-primary);           /* #0F172A */
  background-color: var(--ds-comp-input-bg);     /* #FFFFFF */
  border: var(--ds-comp-input-border);           /* 1px solid #CBD5E1 */
  border-radius: var(--ds-comp-input-radius);    /* 6px */
  transition: border-color var(--ds-primitive-duration-fast) var(--ds-primitive-ease-default);
}

.input-field::placeholder {
  color: var(--ds-primitive-color-slate-400);    /* #94A3B8 */
}

.input-field:hover {
  border-color: var(--ds-primitive-color-slate-400);
}

.input-field:focus-visible {
  border-color: var(--ds-color-focus-ring);       /* #08A5B5 */
  outline: 2px solid var(--ds-color-focus-ring);
  outline-offset: 2px;
}

/* Invalid State */
.input-field[aria-invalid="true"] {
  border-color: var(--ds-color-border-error);     /* #F43F5E (2px) */
  background-color: var(--ds-primitive-color-rose-50);
}
```

---

### 2.3 Interactive Radio Cards (`.selector-card`)

Used for Practice Entity types (Sole Proprietor vs Partnership) and Payment Channels.
```css
.selector-card {
  display: block;
  padding: var(--ds-primitive-space-5);           /* 20px */
  background-color: var(--ds-color-surface-card); /* #FFFFFF */
  border: 1px solid var(--ds-color-border-default);
  border-radius: var(--ds-primitive-radius-lg);   /* 8px */
  cursor: pointer;
  transition: all var(--ds-primitive-duration-fast) var(--ds-primitive-ease-default);
}

.selector-card:hover {
  border-color: var(--ds-primitive-color-teal-400);
  box-shadow: var(--ds-primitive-shadow-md);
}

/* Selected State */
.selector-card[data-selected="true"] {
  border: 2px solid var(--ds-color-border-selected); /* #08A5B5 */
  background-color: var(--ds-color-surface-brand-tint); /* #F0FAFA */
  box-shadow: var(--ds-primitive-shadow-sm);
}

.selector-card:focus-visible {
  outline: 2px solid var(--ds-color-focus-ring);
  outline-offset: 2px;
}
```

---

### 2.4 Sticky Quotation Summary Rail (`.summary-rail`)

Desktop sticky rail anchored at the side of the form.
```css
.summary-rail {
  position: sticky;
  top: var(--ds-primitive-space-6);               /* 24px */
  padding: var(--ds-primitive-space-6);
  background-color: var(--ds-color-surface-card); /* #FFFFFF */
  border: 1px solid var(--ds-color-border-subtle);
  border-radius: var(--ds-primitive-radius-xl);   /* 12px */
  box-shadow: var(--ds-primitive-shadow-md);
}

.summary-rail .total-amount {
  font-family: var(--ds-primitive-font-mono);
  font-size: var(--ds-primitive-font-size-3xl);   /* 32px */
  font-weight: var(--ds-primitive-font-weight-medium);
  color: var(--ds-color-text-heading);            /* #132766 */
}
```

---

### 2.5 Stepper Track & Milestones (`.stepper`)

```css
.stepper-circle {
  width: var(--ds-comp-stepper-circle-size);      /* 36px */
  height: var(--ds-comp-stepper-circle-size);
  border-radius: var(--ds-primitive-radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--ds-primitive-font-body);
  font-size: var(--ds-primitive-font-size-sm);
  font-weight: var(--ds-primitive-font-weight-medium);
}

/* Inactive */
.stepper-circle[data-state="inactive"] {
  background-color: var(--ds-primitive-color-slate-100);
  color: var(--ds-color-text-muted);
  border: 1px solid var(--ds-color-border-default);
}

/* Active */
.stepper-circle[data-state="active"] {
  background-color: var(--ds-primitive-color-teal-500); /* #08A5B5 */
  color: var(--ds-primitive-color-navy-900);            /* #132766 (4.68:1 AA) */
  font-weight: var(--ds-primitive-font-weight-semibold);
  box-shadow: 0 0 0 4px var(--ds-primitive-color-teal-100);
}

/* Completed */
.stepper-circle[data-state="completed"] {
  background-color: var(--ds-primitive-color-navy-900); /* #132766 */
  color: var(--ds-primitive-color-slate-0);             /* #FFFFFF (13.91:1) */
}
```

