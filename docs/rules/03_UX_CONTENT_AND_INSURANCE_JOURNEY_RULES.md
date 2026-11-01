# DoctorShield — UX, Content & Insurance Journey Rules

> **Scope:** Authoritative UX, content integrity, and insurance customer journey rules across all five application stages.
> **Version:** 5.0 — Rule 3. Owner: Principal Product Architect & Design Director.

---

## 1. Product objective

Help Malaysian medical professionals understand and purchase the appropriate existing DoctorShield indemnity coverage through an intuitive, minimal and trustworthy digital journey.

Preserve all approved insurance functionality.

---

## 2. Customer journey

Five stages:

1. **Coverage**
2. **Quotation**
3. **Details**
4. **Declaration**
5. **Summary**

Every stage must have a clear primary purpose.

---

## 3. Cognitive load

Show only information relevant to the present decision.

Avoid:
- Premature conditional questions.
- Repeated explanations.
- Duplicate financial summaries.
- Unnecessary modal detours.
- Multiple competing primary actions.
- Excessive visual containers.
- Unnecessary navigation steps.

Use progressive disclosure where it is legally and functionally appropriate.

Do not hide required primary underwriting questions merely to make the interface shorter.

---

## 4. Content preservation

Use the approved DoctorShield content register as the source of truth.

Do not invent:
- Insurance benefits.
- Policy descriptions.
- Marketing promises.
- Legal statements.
- Medical questions.
- Eligibility explanations.
- Pricing claims.

Remove redundant AI-generated copy only when its absence does not compromise necessary information.

Preserve legally significant wording.

Where a shorter phrase would require altering legal or underwriting intent, retain the original content and improve its presentation.

---

## 5. Form architecture

Use familiar form conventions.

Labels should remain discoverable after users enter values.

Group related questions.

Place conditional fields next to the controlling question.

Keep validation specific and accessible.

Do not interrupt users with premature errors while typing.

Use correct input formats and mobile keyboards.

Preserve valid form data when navigating backward.

---

## 6. Coverage stage (Stage 1)

Present approved classification, specialization, liability limit and policy-date inputs in a natural order.

Do not expose quotation-only information before it is available.

Use familiar, accessible selection patterns.

---

## 7. Quotation stage (Stage 2)

Clearly distinguish:
- Individual coverage.
- Eligible optional coverages.
- Selected add-ons.
- Relevant premium.
- Total payable amount.

Never make recommended coverage appear mandatory.

Show actual price consequences of selection changes.

Do not display stale quotations as confirmed.

---

## 8. Details stage (Stage 3)

Use conventional, minimal form layouts.

Present only applicable branch fields.

Maintain correct branch restrictions, dependencies and validation.

Avoid repeated entry of information already supplied where technically and legally appropriate.

---

## 9. Declaration stage (Stage 4)

Preserve all mandatory underwriting questions and disclosures.

Group related questions.

Reveal conditional explanations only when required.

Keep referral outcomes correct.

Do not use error styling merely because an answer is adverse.

An adverse answer is not automatically an invalid answer.

---

## 10. Summary stage (Stage 5)

Present a clear review of:
- Policy information.
- Applicant information.
- Selected coverage.
- Relevant premium items.
- Total amount.
- Required acknowledgments.
- Supported payment methods.

Allow editing where supported.

Preserve authoritative payment behavior and mandatory declarations.

---

## 11. Recovery and exceptions

Preserve:
- Error recovery.
- Expired quotations.
- Returning users.
- Verification.
- Renewal.
- Underwriting referral.
- Transaction outcomes.

Do not silently discard entered information when recovery is possible.

---

## 12. Accessibility

Target **WCAG 2.2 AA**.

Use proper labels, semantic controls, keyboard navigation, clear focus, accessible errors and responsive reflow.

Do not sacrifice comprehension or legal visibility to meet an arbitrary screen-height target.

---

## 13. UX acceptance

For every screen, verify:
- The task is immediately understandable.
- The primary action is discoverable.
- Choices are not unnecessarily duplicated.
- Pricing is understandable.
- Required content remains available.
- Error recovery is predictable.
- The mobile layout works naturally.

Do not claim real-user usability improvements without actual usability evidence.

