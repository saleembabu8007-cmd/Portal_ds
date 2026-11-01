# Phase 04 — DoctorShield High-Fidelity Art Direction Reset

> **Document Version:** 5.0 — High-Fidelity Art Direction Determination  
> **Author:** Principal Visual Product Designer & Design Director  
> **Status:** Complete — Awaiting Art-Direction Approval Gate  
> **Governance:** Master Product Rules V5 & Rule 2 (Visual Design Authority)  
> **Brand Invariants:** Primary Teal `#08A5B5`, Secondary Navy `#132766`, Kanit headings (max weight 500), Inter body/interface.  
> **Scope:** Comprehensive high-fidelity specification and critical comparison of two contrasting production directions (Direction A: Editorial Minimal vs Direction B: Structured Premium) across Coverage and Quotation screens in desktop (1440px) and mobile (390px) viewports.

---

## 1. Executive Summary & Design Director's Mandate

The legacy DoctorShield UI has been completely rejected. In accordance with **Phase 04**, we establish a genuinely new, distinctive visual language for Malaysian medical malpractice insurance. 

Rather than building standalone component showcases, we designed, specified, rendered, and evaluated **two contrasting high-fidelity directions** using actual approved DoctorShield content, real underwriting categories, and verified actuarial rating formulas:

- **Direction A ("Editorial Minimal Insurance"):** Inspired by Ditto Insurance and Swiss publication design. Features an open single-surface canvas (`#FAFCFD`), light navigation header, quiet 1px hairline dividers (`#E5ECEF`), restrained controls, generous whitespace, and human-centered editorial breathing room.
- **Direction B ("Structured Premium Insurance"):** Inspired by QIC Online and ACKO transactional clarity. Features an authoritative institutional deep navy header (`#132766`), disciplined 65/35 dual-column grid on a slate canvas (`#F4F7F9`), elevated white container cards with subtle boundary definition (`#DFE6EC`), high-definition selection tiles, and prominent tabular financial hierarchy.

Both directions were rendered at full production fidelity in desktop (1440px) and mobile (390px) viewports using real browser captures.

---

## 2. Visual Architecture & Specification of Both Directions

```
+----------------------------------------------------------------------------------------------------+
|                                    ART-DIRECTION SPECIFICATION MATRIX                              |
+--------------------+---------------------------------------+---------------------------------------+
| Design Dimension   | Direction A: Editorial Minimal        | Direction B: Structured Premium       |
+--------------------+---------------------------------------+---------------------------------------+
| Visual Metaphor    | Modern Clinical Broadsheet            | Institutional Financial Console       |
| Primary Header     | Light White (#FFFFFF), subtle border  | Deep Navy (#132766), gold/teal accents|
| Page Canvas        | Single Open Canvas (#FAFCFD)          | Slate-50 (#F4F7F9) with Card Layer    |
| Card Boundaries    | Borderless / Hairline (#E5ECEF)       | 1px Crisp Border (#DFE6EC), 12px r    |
| Heading Typeface   | Kanit 400 (Light & Elegant)           | Kanit 500 (Crisp & Authoritative)     |
| Body Typeface      | Inter 400 (15px / 24px leading)       | Inter 400/500 (15px / 22px leading)   |
| Monetary Figures   | Inter 500, tabular-nums               | Inter 600, tabular-nums, high contrast|
| Limit Selectors    | Soft pill radio buttons               | Structured 4-tier interactive tiles   |
| Binary Toggles     | Subtle text buttons                   | High-definition segmented controls    |
| Quotation Rail     | Floating minimal panel (340px)        | Fixed sticky transaction rail (380px) |
| Mobile Navigation  | Linear vertical scroll, light CTA     | Structured cards, sticky 72px rail    |
+--------------------+---------------------------------------+---------------------------------------+
```

---

### Direction A: Editorial Minimal Insurance

#### 1. Header & Navigation Placement
- Light, breathable header (`#FFFFFF`, height `64px`, border-bottom `1px solid #E5ECEF`).
- Minimalist DoctorShield brandmark in deep navy with subtle teal dot accent.
- Quiet breadcrumb-style progress indicator (`Coverage — Quotation — Details — Declaration — Summary`) with active step underlined by a 2px teal hairline.

#### 2. Page Composition & Whitespace
- Single continuous open canvas (`#FAFCFD`).
- Sections are delineated purely through typography and generous vertical rhythm (`margin-bottom: 40px`), eliminating enclosed card containers.
- Form fields sit directly on the open canvas with subtle bottom borders or 1px hairline separators.

#### 3. Typography & Hierarchy
- Headings: **Kanit 400** (Regular), tracking `-0.01em`, color `#132766`. Generates an intellectual, medical journal aesthetic.
- Section Headers: Kanit 400, `20px / 26px`.
- Micro-labels: Inter 400, `12px`, muted `#64748B`.
- Body text: Inter 400, `15px`, line-height `1.6`, color `#334155`.

#### 4. Control Geometry & Selection Anatomy
- Indemnity Limit Selector: Horizontal array of soft pill-shaped cards with subtle hover transitions (`background: #FFFFFF`, border `1px solid #E2E8F0`, active border `1.5px solid #08A5B5`, soft teal background tint `rgba(8, 165, 181, 0.04)`).
- Input fields: Understated 48px height, 6px radius, neutral border `#CBD5E1`.

#### 5. Quotation Presentation & Actions
- Floating summary card on right (340px width), soft ambient drop-shadow (`box-shadow: 0 4px 16px rgba(19, 39, 102, 0.04)`).
- Secondary sub-line items displayed in quiet light typography.
- Primary CTA: Light teal solid button with rounded-full geometry.

---

### Direction B: Structured Premium Insurance

#### 1. Header & Navigation Placement
- Institutional Deep Navy header (`#132766`, height `70px`) with Chubb co-branding lockup.
- Segmented 5-stage progress indicator embedded in header bar: 3px slim segments (active segment in `#08A5B5`, completed in white, upcoming in semi-transparent navy).
- Utility links (Disclosures, Retrieve Quote, Support Hotline) positioned in top-right utility row.

#### 2. Page Composition & Proportions
- 65/35 dual-column grid on a serene slate background (`#F4F7F9`).
- Content Container: Max-width `1160px` centered.
- Structured Card Layers: Form groups are enclosed in crisp, elevated white cards (`#FFFFFF`, border `1px solid #DFE6EC`, radius `12px`, padding `24px`).
- Section header bars: Light neutral section dividers (`#F1F5F9`) separating clinical classification, liability limits, and period inputs.

#### 3. Typography & Hierarchy
- Headings: **Kanit 500** (Medium), tracking `-0.02em`, color `#132766`. Delivers maximum institutional authority and legislative gravitas.
- Section Titles: Kanit 500, `18px / 22px`.
- Micro-Labels: Inter 500, `11px`, uppercase, tracking `+0.05em`, color `#64748B`.
- Form Inputs: Inter 500, `15px`, dark `#0F172A`.
- Monetary Numbers: **Inter 600**, `tabular-nums`. Hero payable amount rendered in `26px / 32px` deep navy `#132766`.

#### 4. Control Geometry & Selection Anatomy
- **High-Definition Indemnity Limit Grid:** 4-tier selection cards (RM 500k, RM 1.0M Recommended, RM 2.0M, RM 5.0M).
  - Selected state: `2px solid #08A5B5`, verified checkmark circle badge, and soft teal surface tint (`#F0FDFA`).
  - Recommended badge: Floating tag `RECOMMENDED` in soft emerald (`#ECFDF5`, text `#065F46`).
- **Binary & Multi-choice Controls:** High-tactile segmented button bars (40px height, 8px radius, active segment white with crisp 1px border and soft shadow).
- **Form Inputs:** 48px height, 8px radius, border `1px solid #CBD5E1`. Focus state: `1.5px solid #08A5B5` + `3px rgba(8, 165, 181, 0.15)` focus ring.

#### 5. Quotation Presentation & Actions
- **Fixed Sticky Transaction Rail (380px):**
  - Live 15-Minute Rate Lock Badge: Calm amber countdown pill (`#FFFBEB`, border `1px solid #FDE68A`, text `#92400E`) with 1-click refresh trigger.
  - Connected Calculation Breakdown: Base Indemnity + Clinic Extension + PIC Extension + SST 8% + Stamp Duty RM 10.00.
  - Automatic Reinstatement Callout: Complimentary badge with verified checkmark.
  - Primary CTA: High-contrast solid teal button (`#08A5B5`, height `48px`, radius `8px`, white text `Inter 600 15px`).

#### 6. Mobile Composition
- 65/35 grid collapses into an ergonomic single-column sequence.
- All controls feature 44px–48px touch targets.
- Pinned bottom bar (`height: 72px`) renders total payable with expandable bottom-sheet summary drawer and primary CTA.

---

## 3. High-Fidelity Rendered Screenshots Gallery

The 8 production-resolution browser captures demonstrating both directions:

### 3.1 Direction A — Editorial Minimal Insurance

````carousel
![Direction A — Stage 1 Desktop (1440px)](file:///C:/Users/salee/.gemini/antigravity/brain/54b8aedc-dd01-4226-9a0a-224ea04249be/direction_a_stage1_desktop_1440px.png)
<!-- slide -->
![Direction A — Stage 1 Mobile (390px)](file:///C:/Users/salee/.gemini/antigravity/brain/54b8aedc-dd01-4226-9a0a-224ea04249be/direction_a_stage1_mobile_390px.png)
<!-- slide -->
![Direction A — Stage 2 Desktop (1440px)](file:///C:/Users/salee/.gemini/antigravity/brain/54b8aedc-dd01-4226-9a0a-224ea04249be/direction_a_stage2_desktop_1440px.png)
<!-- slide -->
![Direction A — Stage 2 Mobile (390px)](file:///C:/Users/salee/.gemini/antigravity/brain/54b8aedc-dd01-4226-9a0a-224ea04249be/direction_a_stage2_mobile_390px.png)
````

- **Direction A Stage 1 Desktop (1440px):** [`direction_a_stage1_desktop_1440px.png`](file:///C:/Users/salee/.gemini/antigravity/brain/54b8aedc-dd01-4226-9a0a-224ea04249be/direction_a_stage1_desktop_1440px.png)
- **Direction A Stage 1 Mobile (390px):** [`direction_a_stage1_mobile_390px.png`](file:///C:/Users/salee/.gemini/antigravity/brain/54b8aedc-dd01-4226-9a0a-224ea04249be/direction_a_stage1_mobile_390px.png)
- **Direction A Stage 2 Desktop (1440px):** [`direction_a_stage2_desktop_1440px.png`](file:///C:/Users/salee/.gemini/antigravity/brain/54b8aedc-dd01-4226-9a0a-224ea04249be/direction_a_stage2_desktop_1440px.png)
- **Direction A Stage 2 Mobile (390px):** [`direction_a_stage2_mobile_390px.png`](file:///C:/Users/salee/.gemini/antigravity/brain/54b8aedc-dd01-4226-9a0a-224ea04249be/direction_a_stage2_mobile_390px.png)

---

### 3.2 Direction B — Structured Premium Insurance

````carousel
![Direction B — Stage 1 Desktop (1440px)](file:///C:/Users/salee/.gemini/antigravity/brain/54b8aedc-dd01-4226-9a0a-224ea04249be/direction_b_stage1_desktop_1440px.png)
<!-- slide -->
![Direction B — Stage 1 Mobile (390px)](file:///C:/Users/salee/.gemini/antigravity/brain/54b8aedc-dd01-4226-9a0a-224ea04249be/direction_b_stage1_mobile_390px.png)
<!-- slide -->
![Direction B — Stage 2 Desktop (1440px)](file:///C:/Users/salee/.gemini/antigravity/brain/54b8aedc-dd01-4226-9a0a-224ea04249be/direction_b_stage2_desktop_1440px.png)
<!-- slide -->
![Direction B — Stage 2 Mobile (390px)](file:///C:/Users/salee/.gemini/antigravity/brain/54b8aedc-dd01-4226-9a0a-224ea04249be/direction_b_stage2_mobile_390px.png)
````

- **Direction B Stage 1 Desktop (1440px):** [`direction_b_stage1_desktop_1440px.png`](file:///C:/Users/salee/.gemini/antigravity/brain/54b8aedc-dd01-4226-9a0a-224ea04249be/direction_b_stage1_desktop_1440px.png)
- **Direction B Stage 1 Mobile (390px):** [`direction_b_stage1_mobile_390px.png`](file:///C:/Users/salee/.gemini/antigravity/brain/54b8aedc-dd01-4226-9a0a-224ea04249be/direction_b_stage1_mobile_390px.png)
- **Direction B Stage 2 Desktop (1440px):** [`direction_b_stage2_desktop_1440px.png`](file:///C:/Users/salee/.gemini/antigravity/brain/54b8aedc-dd01-4226-9a0a-224ea04249be/direction_b_stage2_desktop_1440px.png)
- **Direction B Stage 2 Mobile (390px):** [`direction_b_stage2_mobile_390px.png`](file:///C:/Users/salee/.gemini/antigravity/brain/54b8aedc-dd01-4226-9a0a-224ea04249be/direction_b_stage2_mobile_390px.png)

---

## 4. Critical Comparative Analysis

A rigorous side-by-side assessment of Direction A and Direction B against the primary benchmarks:

```
+----------------------------------------------------------------------------------------------------+
|                                    CRITICAL COMPARISON MATRIX                                      |
+---------------------+-------------------------------+-------------------------------+--------------+
| Evaluation Criteria | Direction A (Editorial)       | Direction B (Structured)      | Winner       |
+---------------------+-------------------------------+-------------------------------+--------------+
| Institutional Trust | Calm, approachable broadsheet | Authoritative financial inst. | DIRECTION B  |
| Task Scannability   | Open reading lane             | Distinct card task boundaries | DIRECTION B  |
| Financial Hierarchy | Muted, light typography       | Crisp tabular numerals        | DIRECTION B  |
| Touch Ergonomics    | Understated pills             | 44px–48px segmented targets   | DIRECTION B  |
| Brand Alignment     | Light header, minimal navy    | Deep Navy #132766 + Teal #08A | DIRECTION B  |
| Cognitive Calmness  | Outstanding lightness         | Clear grouping, no clutter    | DIRECTION A  |
| Mobile Affordance   | Clean single column           | Structured cards + sticky bar | DIRECTION B  |
+---------------------+-------------------------------+-------------------------------+--------------+
```

### Detailed Evaluation:
1. **Institutional Trust & Credibility:** Medical malpractice indemnity insurance is not a casual consumer subscription; it is a high-liability statutory product tied to annual MMC practicing certificates. Direction B's deep navy header (`#132766`) and structured card borders communicate the financial gravitas of Chubb Insurance Malaysia Berhad while maintaining a modern digital feel. Direction A, while beautifully designed, feels more like a lifestyle health blog or editorial publication than an underwriting portal.
2. **Task Segmentation & Error Prevention:** Direction B uses single-layer elevated white cards (`#FFFFFF`) on a calm slate background (`#F4F7F9`). This cleanly breaks the screen into 3 intuitive tasks: (1) Select Classification, (2) Choose Indemnity Limit, (3) Confirm Policy Period. In Direction A, the borderless continuous layout makes it harder for a busy practitioner scanning between clinical appointments to identify where one decision ends and the next begins.
3. **Financial Precision:** Direction B adopts Wise's gold standard of tabular numerals (`font-variant-numeric: tabular-nums`) and explicit line-item separation. The sticky quotation rail immediately communicates the exact actuarial formula:
   $$\text{Total} = (\text{Base} + \text{Clinic} + \text{PIC}) \times 1.08\ (\text{SST}) + \text{RM } 10.00\ (\text{Stamp Duty})$$
   Direction A's floating card lacks the visual anchor required for high-stakes transaction assurance.
4. **Touch Ergonomics on Mobile:** Direction B's 4-tier indemnity limit tiles and 40px segmented Yes/No buttons provide explicit visual feedback upon touch (solid teal active border and soft tint). Direction A's soft pill controls provide weaker contrast on mobile screens under varying clinical lighting conditions.

---

## 5. Authoritative Art-Direction Determination

### **RECOMMENDATION: Direction B (Structured Premium Insurance)**

**Direction B is unequivocally selected as the official art direction for DoctorShield V5.**

```
==================================================================================================
TRANSFORMATION CRITERIA                  REJECTED BASELINE               NEW DIRECTION B
==================================================================================================
1. Card Hierarchy & Nesting:             Nested cards in cards           Single elevated card layer on slate
2. Typography Hierarchy:                 Faux-bold, unranked sizes       Kanit 400/500 headings, Inter body
3. Brand Coherence:                      Arbitrary teal washes           Institutional Navy (#132766) + Teal (#08A5B5)
4. Financial Presentation:               Buried bottom tables            Contextual sticky rail with tabular nums
5. Rate Lock Indicator:                  Alarming red countdown          Calm amber 15-min badge with refresh
6. Mobile Touch Targets:                 Variable (some < 36px)          Strict 44px–48px touch targets
7. Component Catalog Reuse:              Isolated gallery silos          Clean, dedicated src/design-system/
==================================================================================================
```

### Refinements from Direction A to Integrate into Direction B:
- Incorporate Direction A's relaxed line height (`1.55`) for policy disclaimers and legal terms.
- Preserve Direction A's calm modal disclosure treatments for educational popups ("Why is this recommended?").

---

## 6. Next Steps & Approval Gate

Phase 04 art-direction specification and comparative screenshots are complete.

In accordance with Master Product Rules V5:
1. **No production code has been modified in Phase 04.**
2. **Phase 05 (Design Foundations & Token Engineering)** will formalize the exact design tokens derived from Direction B into `src/design-system/tokens/` upon user approval of this art-direction determination.
