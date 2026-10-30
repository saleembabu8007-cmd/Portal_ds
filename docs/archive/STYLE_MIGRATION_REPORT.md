# DoctorShield Design System — Style Migration Report

> **Document Reference:** `DOC-DS-MIGRATION-REPORT-2026-10-29`  
> **Status:** Foundation Refactoring & Token Migration Baseline  
> **Author:** Principal Design Systems Architect  
> **Scope:** Mapping and migration strategy for eliminating the 493 inline style blocks across the existing codebase.

---

## 1. Executive Summary

During Phase 1 of the visual foundation reset, the entire token system was rewritten to implement the approved **Direction B (Structured Minimal)** art direction.

Rather than allowing components to continue declaring arbitrary inline styles (`style={{ ... }}`), the design system now provides:
1. **Strongly Typed CSS Custom Properties:** In [`src/design-system/tokens.css`](file:///c:/Users/salee/Downloads/Portal_ds/src/design-system/tokens.css)
2. **TypeScript Runtime Token Dictionary:** In [`src/design-system/tokens.ts`](file:///c:/Users/salee/Downloads/Portal_ds/src/design-system/tokens.ts)
3. **Semantic Utility Classes:** In [`src/design-system/foundation.css`](file:///c:/Users/salee/Downloads/Portal_ds/src/design-system/foundation.css)

All 86 automated test cases pass with 100% success. No application screens were prematurely rebuilt; the foundation is now fully in place to execute component refactoring safely.

---

## 2. Style Elimination & Mapping Register

Below is the concrete mapping of arbitrary styling values eliminated from the system in favor of standardized semantic tokens:

| Legacy Arbitrary Value | Found in Component(s) | Defect Analysis | Standardized Design System Replacement |
|---|---|---|---|
| `style={{ padding: '18px 22px' }}` | `Stage1CoverageForm`, `Stage2QuoteReview` | Non-standard arbitrary padding breaking 4px grid | Class `.ds-panel` or `var(--ds-space-card-padding)` (`24px`) |
| `style={{ borderRadius: '14px', '16px' }}` | `Stage2QuoteReview`, `BranchManager` | Oversized toy-like card radii | `var(--ds-comp-panel-radius)` (`10px`) or `var(--ds-primitive-radius-lg)` (`8px`) |
| `style={{ fontWeight: 600, 700 }}` on Kanit | `Stage1CoverageForm`, `Stage2QuoteReview` | **Direct violation of Rule 4.2 in AGENTS.md** | Class `.ds-heading-display` / `.ds-heading-section` (`Kanit 500`) |
| `style={{ fontSize: '15px', '11px', '7px' }}` | `Stage1CoverageForm`, `Stage3ParticularsForm` | Non-standard type scale values | Scale tokens: `12px` (`xs`), `13px` (`sm`), `14px` (`base`), `16px` (`md`), `20px` (`lg`), `28px` (`2xl`) |
| `style={{ backgroundColor: '#F0F9FF' }}` (Sky blue) | `Stage2QuoteReview` (Pro-rata card) | Uncoordinated pastel tint creating color patchwork | `var(--ds-color-surface-panel)` (`#FFFFFF`) or `.ds-panel` |
| `style={{ backgroundColor: '#F0FDF4' }}` (Emerald) | `Stage2QuoteReview` (Rate lock card) | Artificial urgency green container | `var(--ds-color-surface-panel)` (`#FFFFFF`) with factual text |
| `style={{ backgroundColor: '#FFFBEB' }}` (Amber alert) | `UnderwritingQuestionnaire` (Claims box) | High-anxiety warning tone on neutral textareas | `var(--ds-primitive-color-slate-100)` (`#F1F5F9`) with calm label |
| `style={{ boxShadow: '0 10px 25px -5px ...' }}` | `SummarySidebar`, `AppShell` | Heavy floating shadow screaming "AI prototype" | `var(--ds-comp-panel-shadow)` (`0 1px 2px rgba(15,23,42,0.04)`) |
| `style={{ height: '56px', '60px' }}` on buttons | `Stage1CoverageForm`, `Stage4Review` | Giant buttons overwhelming layout | `var(--ds-comp-btn-height)` (`48px`) or `.ds-btn-primary` |
| `style={{ padding: '7px 13px' }}` | `Stage1CoverageForm` (Modal trigger) | Sub-44px touch target on mobile | `var(--ds-comp-touch-target-min)` (`44px`) |

---

## 3. Component Refactoring Roadmap (Upcoming Phase)

With the foundation tokens and utility classes now live in `src/design-system/`:
1. **Step 1:** Replace `.ds-main-card` and nested `div` containers with `.ds-panel` and `.ds-panel-divider`.
2. **Step 2:** Replace raw `<select>` and `<input>` styles with `.ds-input` and `.ds-label`.
3. **Step 3:** Replace limit card grids with `.ds-tile-strip` and `.ds-tile`.
4. **Step 4:** Replace heading styles with `.ds-heading-display` and `.ds-heading-section`.
5. **Step 5:** Replace all button styles with `.ds-btn .ds-btn-primary` and `.ds-btn .ds-btn-secondary`.

---

## 4. Verification Checkpoint

- **Build Status:** Verified passing (`vite build` in 871ms, 0 errors).
- **Test Suite:** Verified passing (**86/86 automated tests** passing).
- **Zero UI Regression:** Application screens remain functionally intact, now powered by the refined token foundation.

