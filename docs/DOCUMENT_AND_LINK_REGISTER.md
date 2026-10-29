# DOCUMENT AND LINK REGISTER
## DoctorShield Individual Medical Professional Indemnity Portal

> **Document ID:** `DOC-REG-DOCS-001`  
> **Status:** Authoritative Baseline (Phase 1)  
> **Classification:** [VERIFIED]  
> **Last Updated:** 2026-10-29  
> **Owner:** Principal Product Architect & Regulatory Business Analyst  

---

## 1. Master Document & Download Register

This register catalogues every policy contract, product disclosure sheet (PDS), brochure, and downloadable asset linked or triggered within the DoctorShield portal.

| Document ID | Permanent Identifier | Document Name / Title | File Type / Format | Exact Source URL / Asset Path | Issuing Entity / Underwriter | Applicable Phase / Trigger | Regulatory Status | Retention Invariant |
|---|---|---|---|---|---|---|---|---|
| **DOC-001** | `DOC-PDS-ENG` | Product Disclosure Sheet (English) | PDF (`.pdf`) | `/assets/Product_Disclosure_Sheet_English.pdf` | Chubb Insurance Malaysia Berhad | Step 1 footer link; Step 3 declaration link; quote email attachment | Mandatory under BNM FSA 2013 | **MUST PRESERVE VERBATIM** |
| **DOC-002** | `DOC-PDS-BM` | Product Disclosure Sheet (Bahasa Malaysia) | PDF (`.pdf`) | `/assets/Product_Disclosure_Sheet_Malay.pdf` | Chubb Insurance Malaysia Berhad | Step 1 footer link; Step 3 declaration link | Mandatory under BNM FSA 2013 | **MUST PRESERVE VERBATIM** |
| **DOC-003** | `DOC-POLICY-WORDING` | Chubb Elite Medical Malpractice Insurance Policy Wording | PDF (`.pdf`) | Dispatched via `/api/sendIndicativeQuoteMail` / policy issuance API | Chubb Insurance Malaysia Berhad | Step 2 "Email me Quote"; Step 3 statutory link; post-issuance email | Governing Contract | **MUST PRESERVE VERBATIM** |
| **DOC-004** | `DOC-PIDM-TIPS` | PIDM TIPS Brochure | External Web / PDF | `www.pidm.gov.my` (Referenced in PIDM disclosure notice) | Perbadanan Insurans Deposit Malaysia (PIDM) | Step 1 PIDM protection label | Statutory Disclosure | **MUST PRESERVE VERBATIM** |
| **DOC-005** | `DOC-CERT-INSURANCE` | Certificate of Insurance / E-Schedule | Generated Dynamic PDF | Dispatched via automated email callback upon `/api/initiatePayment` return | Chubb Insurance Malaysia Berhad / JA Assure | Step 7 post-payment confirmation email | Statutory proof for MMC APC | **MUST PRESERVE DYNAMIC GENERATION** |
| **DOC-006** | `DOC-PREMIUM-RECEIPT` | Official Premium Tax Invoice & Receipt | Generated Dynamic PDF | Dispatched via automated email callback | JA Assure Sdn Bhd | Step 7 post-payment confirmation email | SST Tax Accounting | **MUST PRESERVE DYNAMIC GENERATION** |

---

## 2. External & Internal Hyperlink Register

Every hyperlink currently active across the portal interface, error modals, and navigation footers is catalogued below with its target URL, context, and operational status.

| Link ID | Displayed Anchor Text / Label | Exact Target URL | Screen / Container Context | Protocol / Target | Security & Health Status | Action / Governance |
|---|---|---|---|---|---|---|
| **LNK-001** | `terms and conditions,` | `https://my.doctorshield.com/terms-of-use` | Step 1 statutory consent checkbox label | HTTPS / New Tab | Active (200 OK) | Preserve exact URL |
| **LNK-002** | `privacy policy` | `https://my.doctorshield.com/privacy-policy` | Step 1 statutory consent checkbox label | HTTPS / New Tab | Active (200 OK) | Preserve exact URL |
| **LNK-003** | `Product Disclosure Sheet (English)` | `https://my-individualindemnity.doctorshield.com/assets/Product_Disclosure_Sheet_English.pdf` | Step 1 footer links | HTTPS / Direct PDF | Active (200 OK) | Preserve exact PDF |
| **LNK-004** | `(Malay)` | `https://my-individualindemnity.doctorshield.com/assets/Product_Disclosure_Sheet_Malay.pdf` | Step 1 footer links | HTTPS / Direct PDF | Active (200 OK) | Preserve exact PDF |
| **LNK-005** | `PIDM (visit www.pidm.gov.my)` | `http://www.pidm.gov.my` | Step 1 PIDM statutory notice | HTTP -> HTTPS redirect | Active (200 OK) | Upgrade to HTTPS; preserve text |
| **LNK-006** | `Home` | `https://my.doctorshield.com/` | Primary header navigation | HTTPS | Active (200 OK) | Preserve navigation |
| **LNK-007** | `About Us` | `https://my.doctorshield.com/about-us` | Primary header navigation | HTTPS | Active (200 OK) | Preserve navigation |
| **LNK-008** | `Contact Us` | `https://my.doctorshield.com/contact-us` | Primary header navigation | HTTPS | Active (200 OK) | Preserve navigation |
| **LNK-009** | `FAQ.` | `http://thedoctorshield.com/faqs/` | Primary header navigation | HTTP -> HTTPS redirect | Active (200 OK) | Upgrade to HTTPS; preserve text |
| **LNK-010** | `terms and conditions,` *(Footer secondary)* | `http://thedoctorshield.com/terms-of-use-website/` | Step 1 footer copyright area | HTTP | Note duplicate/inconsistent target | Reconcile with legal owner |
| **LNK-011** | `Privacy Policy` *(Partner)* | `https://thedoctorshield.ja.deals/privacy-policy/` | Step 1 footer partner credit | HTTPS | Active (200 OK) | Reconcile with legal owner |
| **LNK-012** | `http://www.chubb.com/my-privacy` | `http://www.chubb.com/my-privacy` | Step 3 `#jsImportantAndNoticesModel` (Bilingual PDPA notice) | HTTP | Authoritative Chubb Privacy Notice | Upgrade to HTTPS; preserve text |
| **LNK-013** | `mmi@ja-assure.com` | `mailto:mmi@ja-assure.com` | Error Modals (`#jsContactUsNegativeQuoteErrorModel`, `#jsNewPromocodeChangeModel`, `#jsEmailErrorModel`, etc.) | Mailto Link | Active Client Support Inbox | Preserve exact email |
| **LNK-014** | `WhatsApp +60 12-536 0700` | `https://wa.me/60125360700` | Error Modals (`#jsContactUsNegativeQuoteErrorModel`, `#jsNewPromocodeChangeModel`, `#jsEmailErrorModel`, etc.) | WhatsApp Click-to-Chat | Active WhatsApp Helpline | Preserve exact contact |
| **LNK-015** | WhatsApp Widget | `https://my.widgetwhats.com/whatsapp/4140/` | Floating desktop & mobile support widget | Script / Widget | Active Third-party Widget | Redesign into native brand widget |

---

## 3. Flagged URL Anomalies & Outdated References

The audit identified three link-level discrepancies that must be formally reviewed with the compliance and technical owners:

1. **Insecure HTTP Protocol:** `LNK-005` (`www.pidm.gov.my`), `LNK-009` (`thedoctorshield.com/faqs/`), `LNK-010` (`terms-of-use-website/`), and `LNK-012` (`www.chubb.com/my-privacy`) are coded as raw `http://` links. They should be upgraded to `https://` to satisfy modern browser Content Security Policies (CSP).
2. **Multiple Inconsistent Privacy Policy Targets:** 
   - `LNK-002` points to `https://my.doctorshield.com/privacy-policy`
   - `LNK-011` points to `https://thedoctorshield.ja.deals/privacy-policy/`
   - `LNK-012` points to `http://www.chubb.com/my-privacy`
   *Clarification:* Each serves a distinct legal entity (Platform vs Distributor vs Underwriter). All three must be retained and clearly differentiated.
3. **Duplicate Terms of Use Targets:** `LNK-001` (`my.doctorshield.com/terms-of-use`) and `LNK-010` (`thedoctorshield.com/terms-of-use-website/`) point to different URLs for terms.

