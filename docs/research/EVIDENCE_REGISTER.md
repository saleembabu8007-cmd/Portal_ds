# EVIDENCE REGISTER
## DoctorShield Individual Medical Professional Indemnity Portal — Forensic Audit

> **Document ID:** `DOC-EVIDENCE-REG-001`  
> **Classification:** [VERIFIED] / [INFERRED]  
> **Date of Observation:** 2026-10-29  
> **Auditor:** Principal Product Architect & Engineering Lead  
> **Scope:** Full DOM inspection, network interception, screenshot capture, and interactive traversal of `https://my-individualindemnity.doctorshield.com/` and associated subdomains.

---

## 1. Evidence Classification Standard

Per project rules defined in `AGENTS.md` §2:
- **[VERIFIED]** — Directly confirmed by live portal DOM inspection, network captures, HTTP responses, or captured screenshots.
- **[INFERRED]** — Reasonably deduced from JavaScript event handlers, CSS classes, form logic, or partial state machines. Flagged for validation.
- **[UNVERIFIED]** — Not yet confirmed through direct execution (e.g., privileged backend responses requiring actual payment or live OTP generation).
- **[ASSUMED]** — Recorded assumption accepted for baseline planning.

---

## 2. Screenshot Evidence Inventory

All screenshots have been forensically captured and archived in `/docs/evidence/screenshots/`.

| Screenshot ID | Filename | Viewport | Target / Description | Evidence Status |
|---|---|---|---|---|
| **SCR-001** | `SCR-001_landing-desktop.png` | 1440 × 900 | Root Landing / Step 1 (Desktop) — Header, hero, calculator form, PIDM notice | [VERIFIED] |
| **SCR-002** | `SCR-002_landing-mobile.png` | 375 × 812 | Root Landing / Step 1 (Mobile) — Responsive stacking, single-column inputs | [VERIFIED] |
| **SCR-003** | `SCR-003_after-cta-click.png` | 1440 × 900 | Post-CTA State — Validation trigger state upon clicking primary submit | [VERIFIED] |
| **SCR-004** | `SCR-004_quote-form-scrolled.png` | 1440 × 900 | Step 1 Scrolled View — Footer links, PIDM brochure text, compliance notices | [VERIFIED] |
| **SCR-005** | `SCR-005_path-renewal-path.png` | 1440 × 900 | Path `/renew` — Direct route to renewal lookup interface | [VERIFIED] |
| **SCR-006** | `SCR-006_path-renewal-alt.png` | 1440 × 900 | Path `/renewal` — Alternate renewal endpoint (redirect behavior observed) | [VERIFIED] |
| **SCR-007** | `SCR-007_path-quote-subdomain.png` | 1440 × 900 | Subdomain `quote.thedoctorshield.com` — Marketing header & redirection | [VERIFIED] |
| **SCR-008** | `SCR-008_path-renewal-subdomain.png` | 1440 × 900 | Subdomain `quote.thedoctorshield.com/renew` — Redirects to portal `/renew` | [VERIFIED] |
| **SCR-009** | `SCR-009_path-login-path.png` | 1440 × 900 | Path `/login` — Route test (redirects to main portal) | [VERIFIED] |
| **SCR-010** | `SCR-010_path-personal-details.png` | 1440 × 900 | Path `/personal-details` — Direct route test (handled via client-side SPA) | [VERIFIED] |
| **SCR-011** | `SCR-011_path-declaration-path.png` | 1440 × 900 | Path `/declaration` — Direct route test (redirects to root) | [VERIFIED] |
| **SCR-012** | `SCR-012_path-summary-path.png` | 1440 × 900 | Path `/summary` — Direct route test (redirects to root) | [VERIFIED] |
| **SCR-013** | `SCR-013_path-payment-path.png` | 1440 × 900 | Path `/payment` — Direct route test (redirects to root) | [VERIFIED] |
| **SCR-014** | `SCR-014_path-confirmation-path.png` | 1440 × 900 | Path `/confirmation` — Direct route test | [VERIFIED] |
| **SCR-015** | `SCR-015_path-success-path.png` | 1440 × 900 | Path `/success` — Post-payment success route test | [VERIFIED] |
| **SCR-016** | `SCR-016_path-error-path.png` | 1440 × 900 | Path `/error` — Error redirect route test | [VERIFIED] |
| **SCR-017** | `SCR-017_path-referral-path.png` | 1440 × 900 | Path `/referral` — Referral route test | [VERIFIED] |
| **SCR-018** | `SCR-018_path-contact-path.png` | 1440 × 900 | Path `/contact` — Contact support page | [VERIFIED] |
| **SCR-019** | `SCR-019_path-faq-path.png` | 1440 × 900 | Path `/faq` — FAQ routing | [VERIFIED] |
| **SCR-020** | `SCR-020_link-home.png` | 1440 × 900 | External link: Home (`https://my.doctorshield.com/`) | [VERIFIED] |
| **SCR-021** | `SCR-021_link-about-us.png` | 1440 × 900 | External link: About Us (`https://my.doctorshield.com/about-us`) | [VERIFIED] |
| **SCR-022** | `SCR-022_link-contact-us.png` | 1440 × 900 | External link: Contact Us (`https://my.doctorshield.com/contact-us`) | [VERIFIED] |
| **SCR-023** | `SCR-023_link-terms-and-conditions.png` | 1440 × 900 | External link: Terms of Use (`https://my.doctorshield.com/terms-of-use`) | [VERIFIED] |
| **SCR-024** | `SCR-024_link-privacy-policy.png` | 1440 × 900 | External link: Privacy Policy (`https://my.doctorshield.com/privacy-policy`) | [VERIFIED] |
| **SCR-025** | `SCR-025_link-terms-and-conditions.png` | 1440 × 900 | External link: Website Terms (`http://thedoctorshield.com/terms-of-use-website/`) | [VERIFIED] |
| **SCR-026** | `SCR-026_link-product-disclosure-s.png` | 1440 × 900 | Linked Asset: Product Disclosure Sheet (English PDF) | [VERIFIED] |
| **SCR-027** | `SCR-027_link--malay-.png` | 1440 × 900 | Linked Asset: Product Disclosure Sheet (Malay PDF) | [VERIFIED] |
| **SCR-028** | `SCR-028_link-faq-.png` | 1440 × 900 | External link: FAQs (`http://thedoctorshield.com/faqs/`) | [VERIFIED] |
| **SCR-029** | `SCR-029_link-privacy-policy.png` | 1440 × 900 | External link: Partner Privacy Policy (`https://thedoctorshield.ja.deals/privacy-policy/`) | [VERIFIED] |
| **SCR-030** | `SCR-030_renewal-quote-subdomain.png` | 1440 × 900 | Renewal Portal (`quote.thedoctorshield.com/renew`) | [VERIFIED] |
| **SCR-031** | `SCR-031_renewal-mobile.png` | 375 × 812 | Renewal Portal (Mobile 375px) | [VERIFIED] |
| **SCR-032** | `SCR-032_quote-scroll-0.png` | 1440 × 900 | Form Top Scroll Position | [VERIFIED] |

---

## 3. Network Evidence & API Endpoints

Observed via HTTP session logging during live crawl (archived in `/docs/evidence/network/network-log.json`):

| Endpoint ID | HTTP Method | URL / Path | Content-Type / Payload | Behavior & Response Schema | Status |
|---|---|---|---|---|---|
| **NET-001** | `GET` | `/api/getCSRFToken` | `application/json` | Returns CSRF token: `{"token":"..."}`. Called on initial page boot. | [VERIFIED] |
| **NET-002** | `POST` | `/api/getSpecialization` | `application/json` | Request: `classification_id`. Response: `{"success":true,"data":{"premiums":{...}}}`. Contains liability tiers, base rates, clinic premiums, factors, and active flags. | [VERIFIED] |
| **NET-003** | `POST` | `/api/calculatePremium` | `application/json` | Triggered by `#jsPage1Submit` ("Calculate"). Evaluates start date, liability ID, promo code, and computes pro-rated and 12-month premiums. | [INFERRED] |
| **NET-004** | `POST` | `/api/sendIndicativeQuoteMail` | `application/json` | Triggered when user selects "Email me the Indicative Quotation and Policy Wording" on Page 2. Dispatches quote summary & wording PDF. | [INFERRED] |
| **NET-005** | `POST` | `/api/verifyPromoCode` | `application/json` | Validates partner association code (e.g. MAAM, APHM) and returns discount multiplier. | [INFERRED] |
| **NET-006** | `POST` | `/api/generateOTP` | `application/json` | Triggered in `#jsFormRenewModal` / `#jsInitialClaimFormModal`. Options: `Message OTP` (SMS) or `Whatsapp OTP`. | [VERIFIED] |
| **NET-007** | `POST` | `/api/verifyOTP` | `application/json` | Submits 4/6-digit OTP for identity authentication. Returns policy list on success. | [VERIFIED] |
| **NET-008** | `POST` | `/api/contactSupport` | `application/json` | Triggered from `#jsContact` / `#jsPage8` when an underwriting referral or manual intervention is requested. | [VERIFIED] |
| **NET-009** | `POST` | `/api/initiatePayment` | `application/json` | Submits finalized proposal and redirects user to external payment gateway (Credit card / FPX / Business banking). | [INFERRED] |
| **NET-010** | `GET` | `/assets/Product_Disclosure_Sheet_English.pdf` | `application/pdf` | Chubb Product Disclosure Sheet (English) statutory download. | [VERIFIED] |
| **NET-011** | `GET` | `/assets/Product_Disclosure_Sheet_Malay.pdf` | `application/pdf` | Chubb Product Disclosure Sheet (Bahasa Malaysia) statutory download. | [VERIFIED] |

---

## 4. Third-Party & Script Asset Register

The portal currently pulls dependencies from the following external and local scripts:

| Asset ID | Script / Resource URL | Vendor / Purpose | Evidence Status |
|---|---|---|---|
| **AST-001** | `assets/js/home.min.js?v=1793215782` | Core portal wizard logic, validation, DOM page transitions | [VERIFIED] |
| **AST-002** | `assets/js/common-frontend.min.js` | Shared form handlers, date pickers, input masks | [VERIFIED] |
| **AST-003** | `js/lib.min.js` | Vendor bundle (jQuery, Bootstrap 4, Popper) | [VERIFIED] |
| **AST-004** | `assets/js/modernizr-custom.js` | Feature detection | [VERIFIED] |
| **AST-005** | `assets/js/tracking.min.js` | Analytics tracking event triggers | [VERIFIED] |
| **AST-006** | `secure.trust-provider.com/trustlogo/...` | Sectigo / Comodo SSL Trust Logo script | [VERIFIED] |
| **AST-007** | `s.widgetwhats.com/wwwa.js` | WhatsApp floating support widget (`/whatsapp/4140/`) | [VERIFIED] |
| **AST-008** | `www.googletagmanager.com/gtm.js?id=GTM-WRZW8BX` | Google Tag Manager | [VERIFIED] |
| **AST-009** | `connect.facebook.net/en_US/fbevents.js` | Meta / Facebook Pixel | [VERIFIED] |
| **AST-010** | `snap.licdn.com/li.lms-analytics/insight.min.js` | LinkedIn Insight Tag | [VERIFIED] |
| **AST-011** | `static.cloudflareinsights.com/beacon.min.js/...` | Cloudflare RUM Analytics | [VERIFIED] |

---

## 5. Evidence Artifact Archives

The raw machine-captured datasets are persisted in the workspace:
- `docs/evidence/raw-audit.json` (Full Puppeteer state tree, 20,303 lines)
- `docs/evidence/page-divs.json` (45 extracted DOM containers, classes, inputs, texts, buttons)
- `docs/evidence/full-dom-dump.txt` (102 KB structured textual dump of all form trees)
- `docs/evidence/network/network-log.json` (635 captured network telemetry entries)

