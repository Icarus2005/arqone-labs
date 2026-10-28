# Danish Advisory content release: October 2026

## Audience and objective

- Audience: Danish SME owners and managers considering practical AI workflow automation.
- Offer: ArqOne Labs Advisory, with the Studio portfolio preserved in its current stage.
- Primary conversion: A Danish-language message via the existing contact form or `hello@arqonelabs.com`.
- Secondary conversion: An optional Calendly conversation. Athena remains optional, never a gate.
- English site: No content changes in this release.

## Evidence-based positioning

Avoid claims that Denmark is generally late to adopt AI. Eurostat reported 42% use among Danish enterprises with at least ten employees in 2025 versus 20% for the EU. Danmarks Statistik's 2026 overview cites 55% use among firms with 10-49 employees. The commercial question is whether tools translate into better workflows and measurable gains. These data do **not** measure end-to-end workflow integration or cover firms below the statistical size threshold.

## Published topic clusters

| Danish page | Primary intent | Representative queries | Role |
| --- | --- | --- | --- |
| `/da/blog/ai-i-danske-virksomheder-2026.html` | Evidence and market overview | `AI i danske virksomheder`, `AI til SMV`, `kunstig intelligens i virksomheder` | Credibility, qualified awareness |
| `/da/blog/automatisering-af-administrative-opgaver.html` | Practical solution investigation | `automatisering af administrative opgaver`, `AI automatisering`, `automatisering af arbejdsprocesser` | Business-enquiry conversion |

Both pages include original interpretation or an operational framework, a named author, primary-source links, caveats, publication date, canonical URL, Danish metadata and `BlogPosting` markup.

## Christian's initial feedback, translated into UX decisions

1. **English videos**: Danish users initially see localized visual product summaries, not embedded English narration. Existing films remain accessible through an explicitly labeled optional link. A native-quality Danish voiceover/subtitled export remains a future media-production task, not part of this code release.
2. **Contact address**: `hello@arqonelabs.com` is displayed visibly on the Danish hero, the bottom contact CTA and both articles.
3. **Contact form**: The existing Danish `/da/contact.html` form remains the single form endpoint. It is now linked by name rather than buried behind generic calls to action. No new data integration is introduced.

## Verification and release gate

- Static validation: links, metadata, JSON-LD parse, sitemap coverage, Danish article visibility, English pages unchanged, no unsolicited English autoplay, Danish contact address and form links present.
- Browser QA: desktop + mobile, navigation, legibility, optional English-film link, `mailto`, focus and hover states, contact form validation. Do not send live test enquiries without the owner approving a real inbox test.
- Publication: one GitHub commit to the existing `main` branch after checks. Netlify deploys from the repository. Retain the pre-release SHA for rollback.

## Measurement and next review

At baseline record: Google Search Console impressions and queries for the two article URLs, indexed status, Denmark organic landings and Danish contact form enquiries. Review after 30 days for crawl and intent signals; after 60-90 days for qualified conversation volume. Do not interpret low impressions in the first days as proof that the topics are wrong.

Candidate third article, subject to validation: `AI-stemmeassistent på hjemmesiden: Hvornår giver det mening?`. It should focus on Danish-language visitor experience, privacy, escalation, testing and integration; no invented customer case.

## Official sources

- https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20251211-2
- https://www.dst.dk/da/Statistik/temaer/digitalisering
- https://digst.dk/media/y5yd2ftz/ai-i-danske-virksomheder-2024.pdf
- https://digst.dk/tilsyn/ai-forordningen/regulatorisk-sandkasse-for-ai/
