# DoctorShield Design System — Spacing & Layout Architecture Guide

> **Document Reference:** `DOC-DS-SPACING-LAYOUT-2026-10-29`  
> **Status:** Production Layout Architecture Specification  
> **Author:** Principal Design Systems Architect  
> **Standard:** Strict 4px Spacing Grid & Purposeful Macro Layout Geometry

---

## 1. The 4px Base Spacing Scale

Every spatial dimension in the DoctorShield portal is an integer multiple of **4px**. Arbitrary pixel values (e.g., `7px`, `13px`, `17px`, `22px`) are strictly prohibited:

```
+─────────────────────────────────────────────────────────────────────────────+
|                             4px SPACING SCALE                               |
+─────────────────────┬───────────┬───────────────────────────────────────────+
| Token               | Pixel Size| Primary Semantic Roles                    |
+─────────────────────┼───────────┼───────────────────────────────────────────+
| `--ds-space-1`      | 4px       | Hairline padding, badge inner offsets     |
| `--ds-space-2`      | 8px       | Label to control gap, icon to text inline |
| `--ds-space-3`      | 12px      | Compact button padding, grid tile gap     |
| `--ds-space-4`      | 16px      | Related inline field gap, mobile margin   |
| `--ds-space-5`      | 20px      | Field to field vertical stack, card mobile|
| `--ds-space-6`      | 24px      | Heading to field, card interior desktop   |
| `--ds-space-8`      | 32px      | Section to section major vertical rhythm  |
| `--ds-space-10`     | 40px      | Tablet column gutter, hero margin         |
| `--ds-space-12`     | 48px      | Master desktop column gutter              |
| `--ds-space-16`     | 64px      | Major milestone stage transition          |
| `--ds-space-20`     | 80px      | Bottom page footer clearance              |
+─────────────────────┴───────────┴───────────────────────────────────────────+
```

---

## 2. Micro Spacing: Form Field Geometry

```
┌────────────────────────────────────────────────────────┐
│  Classification *                       (Inter 500)    │
└────────────────────────────────────────────────────────┘
  ▲
  │ 8px (--ds-space-label-to-control)
  ▼
┌────────────────────────────────────────────────────────┐
│  [ General Medical Practitioner                     ▼ ]│ (48px Height)
└────────────────────────────────────────────────────────┘
  ▲
  │ 6px (--ds-space-control-to-helper)
  ▼
┌────────────────────────────────────────────────────────┐
│  Annual policies co-terminate on 31 December.          │ (Inter 400, 13px)
└────────────────────────────────────────────────────────┘
  ▲
  │ 20px (--ds-space-field-to-field)
  ▼
┌────────────────────────────────────────────────────────┐
│  Next Field Label...                                   │
└────────────────────────────────────────────────────────┘
```

---

## 3. Macro Layout Architecture: The 1120px Shell

The application grid is engineered around a calibrated **1120px bounding box**, establishing an optimal 65–75 characters per line (CPL) reading length for form controls while maintaining dedicated visibility for the live quotation summary:

```
+─────────────────────────────────────────────────────────────────────────────+
|               DESKTOP 1120px MACRO SHELL ARCHITECTURE (>= 1024px)           |
+─────────────────────────────────────────────────────────────────────────────+
|  Margin (Auto) |      PRIMARY FORM (600px)     | Gutter |  SUMMARY (320px)  |
|                |                               |  48px  |                   |
|                |  ┌── STRUCTURAL PANEL ──────┐ |        | ┌── SIDEBAR ────┐ |
|                |  │ Internal Padding: 24px   │ |        │ │ Width: 320px  │ |
|                |  │                          │ |        │ │ Top: 24px     │ |
|                |  │                          │ |        │ │ (Sticky)      │ |
|                |  │                          │ |        │ │               │ |
|                |  │                          │ |        │ │ Total: RM XXX │ |
|                |  │                          │ |        │ │               │ |
|                |  │                          │ |        │ │ [ Pay Now ]   │ |
|                |  └──────────────────────────┘ |        │ └───────────────┘ |
+─────────────────────────────────────────────────────────────────────────────+
```

### Macro Dimensions Specification
- **Max Application Width:** `1120px` (`margin: 0 auto`)
- **Primary Form Column:** `600px` (min 560px, max 640px)
- **Summary Sidebar Column:** `320px` (fixed width, sticky at `top: 24px`)
- **Desktop Column Gutter:** `48px`
- **Tablet Column Gutter (768px–1023px):** `24px`
- **Desktop Page Margins:** `32px`
- **Mobile Page Margins (390px):** `20px`
- **Header Height:** `52px` (desktop), `48px` (mobile)

---

## 4. Sticky Sidebar & Scroll Rules

1. **Desktop (≥1024px):**
   - The summary column uses CSS `position: sticky; top: 24px;`.
   - As the user scrolls through Stage 1, Stage 2, Stage 3, and Stage 4, the summary remains permanently visible in the doctor's peripheral vision.
   - Any selection change (e.g. toggling Clinic Add-on) updates the total in the sticky sidebar in real time with zero vertical scrolling jumpiness.
2. **Mobile (<1024px):**
   - Sidebar disappears from flow (`display: none`).
   - A sleek 44px docked floating bar (`.ds-mobile-summary-bar`) anchors to the bottom viewport edge (`position: fixed; bottom: 0; left: 0; right: 0; z-index: var(--ds-primitive-z-drawer);`).
   - Displays `Total: RM 1,234.56` + `[Breakdown ▾]`. Tapping opens a lightweight bottom drawer with clear dismiss handle.

