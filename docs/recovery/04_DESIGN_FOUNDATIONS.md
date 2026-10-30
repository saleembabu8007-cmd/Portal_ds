# DESIGN FOUNDATIONS & GEOMETRIC SYSTEM
## DoctorShield Individual Medical Professional Indemnity Portal

> **Document ID:** `DOC-DES-FND-001`  
> **Status:** Design Foundations Baseline (Phase 04)  
> **Classification:** [PROPOSED / SPECIFICATION]  
> **Author:** Principal Design Systems Architect & Senior Frontend Architect  
> **Created:** 2026-10-30  
> **Governance:** DoctorShield Product Engineering & Design Rules v2.0 (AGENTS.md)  
> **Scope:** Definitive spacing scales, semantic distance tokens, control geometry, corner radii, border systems, elevation discipline, and layout constraints.

---

## 1. Core Architectural Rhythm: The 4px / 8px Grid

All spatial dimensions, element heights, internal paddings, and external margins throughout DoctorShield strictly adhere to an **8px primary grid** with a **4px micro-increment** for fine text and control alignment:

$$\text{Dimension} = n \times 4\text{px} \quad \text{or} \quad n \times 8\text{px}$$

Arbitrary pixel values (e.g. `13px`, `17px`, `23px`, `37px`) are strictly prohibited in stylesheets and inline markup.

---

## 2. Spacing Scale & Semantic Token Mappings

### 2.1 Base Spacing Primitives

| Token Name | Rem Value | Pixel Value | Typical Spatial Role |
|---|---|---|---|
| `spacing[0]` | `0rem` | `0px` | Reset / zero margin |
| `spacing[1]` | `0.25rem` | `4px` | Micro gap (icon to label, inline badge padding) |
| `spacing[2]` | `0.5rem` | `8px` | Tight gap (label to input, control to error message) |
| `spacing[3]` | `0.75rem` | `12px` | Compact component padding, stacked related inputs |
| `spacing[4]` | `1.0rem` | `16px` | Standard field gap, card internal padding (mobile) |
| `spacing[5]` | `1.25rem` | `20px` | Generous field gap, card internal padding (desktop) |
| `spacing[6]` | `1.5rem` | `24px` | Standard field-to-field separation, subsection gap |
| `spacing[8]` | `2.0rem` | `32px` | Major section gap, page header to form separation |
| `spacing[10]` | `2.5rem` | `40px` | Stage-to-stage transition gap, modal internal padding |
| `spacing[12]` | `3.0rem` | `48px` | Form column to sticky summary sidebar gutter |
| `spacing[16]` | `4.0rem` | `64px` | Major stage vertical padding, footer top clearance |
| `spacing[20]` | `5.0rem` | `80px` | Bottom scroll clearance for sticky mobile action bar |

---

### 2.2 Semantic Distance Mappings

To eliminate arbitrary layout decisions across different screens, engineers and designers must compose using semantic distance tokens:

```
+--------------------------------------------------------------------------------------------------+
|                                     SEMANTIC SPACING MATRIX                                      |
+------------------------------------+---------------------+--------------+------------------------+
| Semantic Relationship              | Spacing Token       | Pixel Value  | Description / Scope    |
+------------------------------------+---------------------+--------------+------------------------+
| **Label to Control**               | `spacing.semantic.labelToControl` | `6px` / `8px` | Space between form label and input |
| **Control to Validation Error**    | `spacing.semantic.controlToError` | `6px`        | Space between input bottom and error text |
| **Field to Field (Standard)**      | `spacing.semantic.fieldToField`   | `20px`       | Vertical margin between standard form fields |
| **Field to Field (Spacious)**      | `spacing.semantic.fieldToFieldLg` | `24px`       | Vertical margin between multi-input rows |
| **Related Controls (Inline)**      | `spacing.semantic.inlineControls` | `8px`/`12px` | Horizontal gap between inline buttons / tags |
| **Heading to Content**             | `spacing.semantic.headingToContent`| `12px`      | Distance below Stage Title / Subtitle |
| **Subsection to Subsection**       | `spacing.semantic.subsectionGap`  | `32px`       | Distance separating distinct form groups |
| **Section to Section (Major)**     | `spacing.semantic.sectionGap`     | `40px`       | Distance between major functional blocks |
| **Card Interior Padding (Mobile)** | `spacing.semantic.cardPadMobile`  | `16px`       | Internal padding of selectable add-on cards |
| **Card Interior Padding (Desktop)**| `spacing.semantic.cardPadDesktop` | `20px`/`24px`| Internal padding of cards & summary panels |
| **Form to Summary Column Gutter**  | `spacing.semantic.columnGutter`   | `48px`       | Horizontal gap between form and sidebar |
| **Page Gutters (Mobile 390px)**    | `spacing.semantic.gutterMobile`   | `16px`       | Left/right margin of viewport on mobile |
| **Page Gutters (Tablet 768px)**    | `spacing.semantic.gutterTablet`   | `24px`       | Left/right margin of viewport on tablet |
| **Page Gutters (Desktop 1440px)**  | `spacing.semantic.gutterDesktop`  | `32px`       | Horizontal margin centering main container |
| **Mobile Scroll Bottom Clearance** | `spacing.semantic.mobileClearance`| `80px`       | Bottom padding clearing 64px sticky bar|
+------------------------------------+---------------------+--------------+------------------------+
```

---

## 3. Control Dimensions & Geometry

### 3.1 Standard Form Controls & Buttons
To guarantee tactile comfort on touchscreens and effortless mouse precision on desktop:

| Control Type | Height Specification | Internal Horizontal Padding | Minimum Touch Target Area |
|---|---|---|---|
| **Primary & Secondary Buttons** | **48px** (`controls.buttonHeight`) | `24px` (`spacing[6]`) | 48px $\times$ 48px |
| **Compact / Utility Buttons** | **36px** (`controls.buttonHeightCompact`) | `16px` (`spacing[4]`) | 44px $\times$ 44px (via transparent padding) |
| **Text Inputs & Select Dropdowns**| **48px** (`controls.inputHeight`) | `16px` (`spacing[4]`) | Full width $\times$ 48px |
| **Segmented Radio / Toggle Tiles** | **48px** (`controls.tileHeight`) | `16px` (`spacing[4]`) | 50% / 25% width $\times$ 48px |
| **Statutory Yes/No Segmented Buttons**| **44px** (`controls.segmentHeight`) | `16px` (`spacing[4]`) | Minimum 50% width $\times$ 44px |
| **Checkbox & Radio Targets** | **20px** mark inside **44px** hit zone | `12px` hit-target margin | 44px $\times$ 44px |

---

## 4. Corner Radii System

DoctorShield avoids both dated sharp rectangles (0px) and overly playful consumer bubbles (> 16px). A calibrated **geometric hierarchy** creates clean, modern, healthcare-appropriate structure:

```
+--------------------------------------------------------------------------------------------------+
|                                        CORNER RADII SYSTEM                                       |
+----------------------+--------------+------------------------------------------------------------+
| Token Name           | Radius Value | Component Scope & Usage                                    |
+----------------------+--------------+------------------------------------------------------------+
| `radii.none`         | `0px`        | Flat full-width containers, sharp divider borders          |
| `radii.sm`           | `4px`        | Status tags, tooltips, inline pill badges, micro-tags      |
| `radii.md`           | `6px`        | Primary & secondary buttons, segmented control buttons     |
| `radii.lg`           | `8px`        | Text inputs, select triggers, selectable cards, panels     |
| `radii.xl`           | `10px`       | Summary sidebar container, policy detail review cards      |
| `radii.2xl`          | `12px`       | Modal dialogs, slide-up mobile drawers (top corners)       |
| `radii.full`         | `9999px`     | Circular avatar/step numbers, status indicators, switches  |
+----------------------+--------------+------------------------------------------------------------+
```

---

## 5. Border System & Hairline Dividers

Borders provide structural definition in an editorial design without resorting to heavy shadow boxes:

### 5.1 Border Widths
- **Hairline Border (`1px`):** Used for standard panel boundaries, inactive input borders, subtle dividers, and table rows.
  - Variable: `var(--border-subtle)` (`#DFE6EC` on `#F8FAFB` canvas).
  - Control Border: `var(--border-default)` (`#CBD5E1` on `#FFFFFF` input surface).
- **Focus / Active Border (`2px`):** Used for focused inputs (`:focus-visible`) and selected card tiles.
  - Focused Input: `2px solid #132766` (`var(--color-navy-900)`).
  - Selected Card: `2px solid #08A5B5` (`var(--color-teal-500)`).
  - Validation Error: `2px solid #EF4444` (`var(--color-rose-500)`).

### 5.2 Hairline Dividers
- Hairline horizontal dividers (`<hr class="ds-divider">`) separate logical sections within a container.
- Height: `1px`, background: `#E2E8F0` (`primitiveColors.slate[200]`).
- Margin: `24px 0` (`spacing[6] 0`).

---

## 6. Elevation & Surface Discipline (Zero Shadow Doctrine)

In alignment with Rule 5 (Avoid glassmorphism, random gradients, and excessive shadows), DoctorShield enforces a **near-flat elevation hierarchy**:

```
+--------------------------------------------------------------------------------------------------+
|                                    ELEVATION HIERARCHY MATRIX                                    |
+----------------------+----------------------------------------+----------------------------------+
| Elevation Token      | CSS Box-Shadow Value                   | Applied Component Scope          |
+----------------------+----------------------------------------+----------------------------------+
| `elevation.none`     | `none`                                 | All form inputs, cards, panels   |
| `elevation.subtle`   | `0 1px 3px 0 rgba(19, 39, 102, 0.05)`   | Sticky summary sidebar (Desktop) |
| `elevation.floating` | `0 4px 6px -1px rgba(19, 39, 102, 0.08)`| Sticky bottom action bar (Mobile)|
| `elevation.drawer`   | `0 -4px 12px 0 rgba(19, 39, 102, 0.10)`| Slide-up financial drawer (Mobile)|
| `elevation.modal`    | `0 12px 32px -4px rgba(19,39,102,0.16)`| Centered modal dialogs           |
+----------------------+----------------------------------------+----------------------------------+
```

**Prohibitions:**
- Never apply colored drop shadows (e.g. teal or red glows).
- Never apply box-shadow to normal form fields or buttons in idle state.
- Never use backdrop blur (`backdrop-filter`) except on the semi-transparent modal overlay (`rgba(19, 39, 102, 0.40)`).

---

## 7. Container Dimensions & Responsive Layout Offsets

```
+--------------------------------------------------------------------------------------------------+
|                                  CONTAINER DIMENSIONS SPECIFICATION                              |
+--------------------------------------+---------------+-------------------------------------------+
| Layout Parameter                     | Dimension     | Architectural Rationale                   |
+--------------------------------------+---------------+-------------------------------------------+
| **Application Max Width**            | `1120px`      | Optimal reading and form-completion span  |
| **Form Region Width (2-Column)**     | `600px`       | 65% ratio on desktop; prevents eye fatigue|
| **Summary Sidebar Width (2-Column)** | `320px`       | 35% ratio on desktop; fits tabular amounts|
| **Column Gutter**                    | `48px`        | Clean whitespace separation between cols  |
| **Focused Form Max Width (1-Column)**| `680px`       | Optimal single-column form reading width  |
| **Header Height (Desktop)**          | `52px`        | Compact, unobtrusive persistent header    |
| **Header Height (Mobile)**           | `48px`        | Minimal vertical intrusion on 390px       |
| **Sticky Bottom Action Bar (Mobile)**| `64px`        | Ergonomic 48px button + 16px vertical pad |
| **Modal Max Width (Standard)**       | `540px`       | Optimal dialog readability width          |
| **Modal Max Width (Wide / Terms)**   | `720px`       | For scrollable legal policy terms text    |
+--------------------------------------+---------------+-------------------------------------------+
```

---

## 8. Summary of Geometric Design Foundations

1. **Strict 8px / 4px Rhythm:** Zero arbitrary margins or paddings.
2. **Standard 48px Control Heights:** Satisfies both desktop ergonomics and mobile touch accessibility.
3. **Calibrated 8px / 6px Radii:** Clean, modern, healthcare-appropriate structure without childish bubble styling.
4. **Hairline & 2px Active Borders:** High structural clarity without heavy visual weight.
5. **Near-Flat Elevation:** Institutional gravitas achieved through alignment and contrast rather than synthetic drop shadows.

