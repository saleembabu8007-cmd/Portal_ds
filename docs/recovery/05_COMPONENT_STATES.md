# COMPONENT INTERACTION STATES & BEHAVIOR MATRIX
## DoctorShield Individual Medical Professional Indemnity Portal

> **Document ID:** `DOC-DS-COMP-003`  
> **Status:** Component System Architecture Baseline (Phase 05)  
> **Classification:** [PROPOSED / SPECIFICATION]  
> **Author:** Principal Design Systems Engineer & Frontend Quality Lead  
> **Created:** 2026-10-30  
> **Governance:** DoctorShield Product Engineering & Design Rules v2.0 (AGENTS.md)  
> **Scope:** Definitive visual states, transition timings, keyboard contracts, focus-visible indicators, and screen-reader feedback for all components.

---

## 1. Master Interaction States Matrix

| Component Type | Default / Idle | Hover State | Focus-Visible State | Selected / Active | Invalid (Error) State | Disabled State |
|---|---|---|---|---|---|---|
| **Primary Button** | Bg: `#132766`<br>Text: `#FFFFFF`<br>Radius: `6px` | Bg: `#192C5B`<br>Cursor: `pointer`<br>Trans: `150ms` | Outline: `2px solid #132766`<br>Offset: `2px` | Bg: `#233B6E`<br>Scale: `0.99` | N/A | Bg: `#F1F5F9`<br>Text: `#94A3B8`<br>Cursor: `not-allowed` |
| **Teal Action Button** | Bg: `#08A5B5`<br>Text: `#FFFFFF`<br>Radius: `6px` | Bg: `#066F7B`<br>Cursor: `pointer`<br>Trans: `150ms` | Outline: `2px solid #132766`<br>Offset: `2px` | Bg: `#055C66`<br>Scale: `0.99` | N/A | Bg: `#F1F5F9`<br>Text: `#94A3B8`<br>Cursor: `not-allowed` |
| **Secondary Button** | Bg: `#FFFFFF`<br>Border: `1px #CBD5E1`<br>Text: `#132766` | Bg: `#F1F5F9`<br>Border: `1px #94A3B8`<br>Trans: `150ms` | Outline: `2px solid #132766`<br>Offset: `2px` | Bg: `#E2E8F0`<br>Text: `#0F172A` | N/A | Bg: `#F1F5F9`<br>Border: `1px #E2E8F0`<br>Text: `#94A3B8` |
| **Text Input / Date** | Bg: `#FFFFFF`<br>Border: `1px #CBD5E1`<br>Text: `#17253B` (16px) | Border: `1px #94A3B8`<br>Trans: `150ms` | Border: `2px solid #132766`<br>Shadow: `0 0 0 2px rgba(8,165,181,0.15)` | N/A | Border: `2px solid #EF4444`<br>Bg: `#FEF2F2` (1%)<br>Role: `alert` text | Bg: `#F1F5F9`<br>Border: `1px #DFE6EC`<br>Text: `#94A3B8` |
| **Select / LabeledSelect**| Bg: `#FFFFFF`<br>Border: `1px #CBD5E1`<br>Height: `48px` | Border: `1px #94A3B8`<br>Cursor: `pointer` | Border: `2px solid #132766`<br>Shadow: `0 0 0 2px rgba(8,165,181,0.15)` | N/A | Border: `2px solid #EF4444`<br>Alert message | Bg: `#F1F5F9`<br>Text: `#94A3B8`<br>Cursor: `not-allowed` |
| **Selectable Card / Tile**| Bg: `#FFFFFF`<br>Border: `1px #DFE6EC`<br>Radius: `8px` | Border: `1px #94A3B8`<br>Cursor: `pointer` | Outline: `2px solid #132766`<br>Offset: `2px` | Bg: `#F0FAFA`<br>Border: `2px solid #08A5B5`<br>Badge: `[SELECTED]` | Border: `2px solid #EF4444`<br>Alert feedback | Bg: `#F1F5F9`<br>Opacity: `0.5`<br>Cursor: `not-allowed` |
| **Checkbox** | Box: `20x20px`<br>Border: `2px #CBD5E1`<br>Bg: `#FFFFFF` | Border: `2px #94A3B8`<br>Cursor: `pointer` | Outline: `2px solid #132766`<br>Offset: `2px` | Box Bg: `#066F7B`<br>Border: `2px #066F7B`<br>Icon: White Check | Border: `2px solid #EF4444`<br>Error feedback | Box Bg: `#F1F5F9`<br>Border: `2px #DFE6EC`<br>Cursor: `not-allowed` |
| **Yes / No Binary Button**| Bg: `#FFFFFF`<br>Border: `1px #CBD5E1`<br>Height: `44px` | Border: `1px #94A3B8`<br>Cursor: `pointer` | Outline: `2px solid #132766`<br>Offset: `2px` | Bg: `#132766`<br>Text: `#FFFFFF`<br>Border: `1px #132766` | Border: `2px solid #EF4444`<br>Error alert | Bg: `#F1F5F9`<br>Text: `#94A3B8` |

---

## 2. Dynamic Component State Lifecycles

### 2.1 The Loading State Lifecycle
When an asynchronous operation is triggered (e.g., Quotation Calculation, Promo Code Verification, Policy Payment):
1. **Trigger:** User activates primary button (`onClick`).
2. **Immediate Lock:** Button transitions to `disabled={true}` and `aria-busy="true"`.
3. **Spinner Mount:** The leading icon is replaced with `<Loader2 className="ds-spin" size={16} />`.
4. **Dimension Freeze:** Button width and min-height remain fixed to prevent annoying layout jumps.
5. **Resolution:** On API callback, button returns to idle state or navigates to next stage.

### 2.2 The Error State Lifecycle
To satisfy Rule 9 (Avoid aggressive error messages while user is still typing):
1. **Pristine State:** Field renders in Default state; error container is unmounted.
2. **Active Typing State:** Field evaluates input silently; validation errors are suppressed while typing.
3. **Dirty & Blurred State:** Validation executes on `onBlur` or explicit `onSubmit`.
4. **Error Render:**
   - Input border switches to `2px solid var(--ds-color-border-error)` (`#EF4444`).
   - `<p id={errorId} role="alert">` mounts `6px` below input with `<AlertCircle size={14} />`.
   - `aria-invalid="true"` set on input.
5. **Recovery:** As soon as the user corrects the input, error feedback clears immediately.

---

## 3. Keyboard Navigation & Assistive Technology Standards

```
+--------------------------------------------------------------------------------------------------+
| KEYBOARD INTERACTION STANDARDS                                                                   |
+--------------------------+-----------------------+-----------------------------------------------+
| Component                | Primary Keys          | Expected Interaction Behavior                 |
+--------------------------+-----------------------+-----------------------------------------------+
| **Button**               | `Enter`, `Space`      | Activates action; emits `onClick`.            |
| **TextInput / Select**   | `Tab`, `Shift+Tab`    | Moves focus into/out of control.              |
| **Select Dropdown**      | `Up`, `Down`, `Enter` | Traverses options; selects on Enter.          |
| **Checkbox**             | `Space`               | Toggles checked/unchecked state.              |
| **RadioGroup / Tiles**   | `Left`, `Right`, `Up`,| Moves selection across radio group items;     |
|                          | `Down`, `Space`       | updates active `aria-checked`.                |
| **Modal Dialog**         | `Escape`, `Tab`       | Escape closes modal; Tab is trapped inside.   |
| **Disclosure Trigger**   | `Enter`, `Space`      | Toggles `aria-expanded="true/false"` drawer.  |
+--------------------------+-----------------------+-----------------------------------------------+
```

---

## 4. Universal Focus-Visible Guarantee

```css
/* Universal Accessible Focus Indicator */
:focus-visible {
  outline: 2px solid var(--ds-color-border-focus); /* #132766 Deep Navy */
  outline-offset: 2px;
}

/* Fallback for components with custom focus wrappers */
.ds-focus-ring:focus-within {
  border-color: var(--ds-color-border-focus);
  box-shadow: 0 0 0 2px rgba(8, 165, 181, 0.15);
}
```

**Compliance Proof:**
- Contrast of `#132766` focus ring against `#FFFFFF` surface is **13.91:1** (exceeds WCAG 2.2 SC 2.4.11 / 2.4.13 Focus Appearance AAA requirements).
- Focus rings are never hidden, clipped by `overflow: hidden`, or recolored to low-contrast tones.

