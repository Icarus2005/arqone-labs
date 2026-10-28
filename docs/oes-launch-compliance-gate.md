# ArqOne Labs | OES Launch Compliance Gate

**Version:** 1.0 | 28 October 2026  
**Status:** Internal operating standard | Owner: Piero Saleme  
**Scope:** ArqOne products, pilots and client-delivered automations

## Purpose

Make privacy, security, legal and customer-trust considerations visible **before a public launch or a live client pilot**. The checkpoint is deliberately small. It is not a legal opinion, a certification, or a claim that any platform is compliant.

Apply this to new deployments and to material changes in data processing, AI agents, payments, messaging, integrations, or user uploads. Do not rerun it for ordinary copy or visual changes unless they introduce a new claim, script or data flow.

## Fit within OES

| Stage | Required evidence | Owner |
| --- | --- | --- |
| **Observe** | Intended users, countries served, current workflow, categories of data, third-party services and existing safeguards | Product/engagement owner |
| **Diagnose** | Relevant obligations, high-consequence failures, gaps in the current workflow and whether specialist advice is required | Owner with technical lead |
| **Design** | Data minimisation, access control, retention, user notices, consent/choice where applicable, and human approval for consequential actions | Technical lead |
| **Build** | Implement controls and retain test evidence; avoid shipping analytics, recordings or marketing integrations before checks | Delivery team |
| **Govern** | Complete the checklist; resolve blockers; record the owner's release decision and any legal review | Piero or named accountable delegate |
| **Scale** | Revisit on significant functionality, audience, jurisdiction or vendor changes; monitor incidents, complaints and policy drift | Owner and operator |

The **Govern** gate is a release decision, not a new software service. Maintain the completed checklist next to the relevant project's release notes or delivery documentation.

## Minimum checkpoint (every project)

1. **Audience and reach:** intended users, countries and whether minors are an intended or known audience documented.
2. **Data inventory:** personal, business-sensitive and uploaded data; processor/vendor list; transmission and retention paths documented.
3. **Privacy and notices:** relevant privacy information and lawful processing basis assessed; user notices and choices tested where applicable.
4. **Access and security:** authentication, least privilege, secrets, encryption in transit, logging, backups and incident contacts checked at a proportionate level.
5. **AI behaviour:** approved task boundary, escalation to people, unacceptable actions, prompt-injection/incorrect-answer testing and auditability appropriate to risk.
6. **Marketing and commercial claims:** no invented results, testimonials, guarantees or unsupported capability/ROI statements.
7. **Third-party technology:** external scripts, analytics, fonts, recording tools and vendor data-handling terms reviewed.
8. **Customer-facing operation:** contact route, complaints, service ownership, terms and failure/rollback path working.

## Activate only the modules that apply

| Module | Trigger | Focus |
| --- | --- | --- |
| **Voice / conversations** | Athena, SalesX, coaching or other voice agents | Notice, recording/transcript handling, appropriate consent, retention, access, human handoff, mute/end-call controls |
| **Payment / subscription** | Paid checkout or automatically renewing service | Renewal terms, affirmative agreement where required, billing cadence, cancellation, receipts, customer support |
| **Email / outreach** | Campaigns, follow-ups or automated outbound communication | Consent/legal marketing basis in target markets, suppression/unsubscribe, sender identity, postal/contact details, delivery and audit logs |
| **Uploads / user content** | Brand assets, documents, photos, generated media or public sharing | Ownership and permitted uses, upload rights, access isolation, takedown/reporting process, US DMCA agent assessment if relevant |
| **Location / analytics** | PlacePulse or location intelligence involving personal/location signals | Aggregation, reidentification risk, provenance, vendor rights, claims-to-evidence controls and usage restrictions |
| **Children / mixed audience** | Product directed at children or actual knowledge of child data | Age-appropriate design, data practices and specialist COPPA/EU children's privacy assessment |
| **EU / Denmark delivery** | Danish/EU personal-data processing or end users | GDPR assessment, DPA/processor roles, cross-border transfers, local marketing rules, necessary DPIA review |

## Risk decision

- **BLOCKED:** Missing a necessary legal basis/notice for relevant data use; unapproved external disclosure; insecure credentials or material privacy/security exposure; high-consequence autonomous action without bounds; mandatory checkout/marketing obligation not assessed. Do not launch until addressed or a qualified reviewer documents a lawful alternative.
- **CONDITIONAL:** A contained, low-risk gap with an owner, mitigation and written deadline. Only the accountable launch owner may accept it; do not waive a legal requirement.
- **READY:** No known blockers; applicable modules checked; release owner records date, version, evidence and rollback point.

For material legal uncertainty, obtain advice in the relevant jurisdiction. A model-generated checklist is not a substitute for specialist legal review.

## Suggested evidence and release record

Copy [`templates/launch-compliance-checklist.md`](templates/launch-compliance-checklist.md) into the project's release folder. Attach links to tests, configurations, policies and incidents rather than copying sensitive customer data into the checklist. Record the release commit or deployment ID and rollback action.

**Initial adoption:** Use this gate on the next material release for each ArqOne product, and on the first live STAD Valuar / Danish automation pilot. Do not claim existing live products have passed until individually reviewed.

## Primary legal reference points (validate currency and applicability)

- EU GDPR: <https://eur-lex.europa.eu/eli/reg/2016/679/oj>
- FTC COPPA guidance: <https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions>
- FTC CAN-SPAM guidance: <https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business>
- California automatic-renewal guidance: <https://www.oag.ca.gov/news/press-releases/attorney-general-bonta-issues-consumer-alert-california%E2%80%99s-automatic-renewal-law>
- US Copyright Office Section 512 guidance: <https://www.copyright.gov/512/>
- US Copyright Office DMCA agent FAQ: <https://www.copyright.gov/dmca-directory/faq.html>

