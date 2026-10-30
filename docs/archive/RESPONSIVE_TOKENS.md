# DoctorShield Design System — Responsive Tokens & Viewport Guide

> **Document Reference:** `DOC-DS-RESPONSIVE-2026-10-29`  
> **Status:** Production Responsive Architecture Specification  
> **Author:** Principal Design Systems Architect  
> **Governance:** Non-linear responsive scaling. Form touch targets and legal readability must never shrink on mobile devices.

---

## 1. Breakpoint Taxonomy

The system defines 5 strict viewport bands:

```
+─────────────────────────────────────────────────────────────────────────────+
|                             BREAKPOINT SYSTEM                               |
+─────────────────────┬───────────────┬───────────────────────────────────────+
| Breakpoint Key      | Viewport Range| Primary Device Targets                |
+─────────────────────┼───────────────┼───────────────────────────────────────+
| `mobile-sm`         | < 390px       | Compact mobile (iPhone SE, older Android)|
| `mobile`            | 390px – 767px | Standard mobile (iPhone 14/15/16, Galaxy)|
| `tablet`            | 768px – 1023px| iPads, tablets, narrow split-screens  |
| `desktop`           | 1024px – 1439px| Standard laptops & desktop displays  |
| `desktop-wide`      | ≥ 1440px      | External monitors, high-DPI displays  |
+─────────────────────┴───────────────┴───────────────────────────────────────+
```

---

## 2. Responsive Adaptation Matrix

| Component Dimension | Desktop (≥1024px) | Tablet (768px–1023px) | Mobile (390px–767px) | Mobile Small (<390px) |
|---|---|---|---|---|
| **App Max Width** | `1120px` | `100%` | `100%` | `100%` |
| **Grid Layout** | 2 Columns (`600px` + `320px`) | Single Column (`100%`) | Single Column (`100%`) | Single Column (`100%`) |
| **Column Gutter** | `48px` | N/A | N/A | N/A |
| **Page Outer Margins** | `32px` | `24px` | `20px` | `16px` |
| **Panel Padding** | `24px` | `24px` | `20px` | `16px` |
| **Heading H1 Size** | `28px` / `36px` | `26px` / `34px` | `24px` / `32px` | `22px` / `28px` |
| **Section H2 Size** | `20px` / `28px` | `20px` / `28px` | `18px` / `24px` | `17px` / `22px` |
| **Input Height** | `48px` | `48px` | `48px` (Touch target) | `48px` (Touch target) |
| **Button Height** | `48px` | `48px` | `48px` (Full width) | `48px` (Full width) |
| **Summary Display** | 320px Sticky Sidebar | Bottom Floating Pill | 44px Docked Floating Bar | 44px Docked Floating Bar |
| **Stepper UI** | Clean Horizontal Line | 1-Line Status | 1-Line Breadcrumb | 1-Line Breadcrumb |
| **Header Height** | `52px` | `50px` | `48px` | `48px` |

---

## 3. Touch Target Minimums (WCAG 2.2 SC 2.5.8)

On touch devices (<1024px), all interactive elements must satisfy the **44×44px minimum bounding box**:

1. **Checkboxes & Radio Circles:**
   - Visual circle/box is `20×20px`.
   - The surrounding label container carries `min-height: 44px; display: flex; align-items: center;`.
   - The clickable hit area encompasses the entire text label, preventing mis-taps.
2. **Segmented Tiles (Limits & Toggles):**
   - Minimum height: `48px`.
   - In 2-column or 3-column mobile layouts, tiles span `minmax(120px, 1fr)` ensuring comfortable thumb activation.
3. **Modal Dismiss & Secondary Buttons:**
   - Close icon buttons carry an invisible padding expansion of `12px` to achieve a `44×44px` touch region.

---

## 4. Mobile Safe Area & Notch Support

To prevent sticky bottom summary bars and primary CTAs from colliding with the iOS home indicator:
```css
.ds-mobile-summary-bar {
  padding-bottom: calc(var(--ds-primitive-space-2) + env(safe-area-inset-bottom, 0px));
}
```
This ensures clear separation on modern iPhone and Android gesture-navigation screens.

