# Local SEO scope review

Reviewed 8 September 2026. These are recommendations discussed with Peter, not authorisation to implement them.

## What exists

SEO Playground is a private DataForSEO research application. Marley has Local Finder grids, persistent scan results, 20 editable saved grid keywords and 30 organic tracked terms. Its additional research tools cover keywords, competitors, backlinks, on-page analysis and AI visibility. It has no customer GBP OAuth, tenant isolation, campaign scheduler or dedicated scan comparison screen. The map display currently uses Leaflet/OpenStreetMap; Google Maps display and Google Maps ranking are separate changes.

## Recommended focus

Keep the fork and its useful upstream features. Simplify navigation rather than extracting a new app: local workflow first, other research under Advanced. Prioritise exact listing identification, explicit scan jobs with duplicate protection, saved campaigns, spending limits, scheduling and comparable history. Google Maps display is optional and has not been implemented. No new paid scans or scheduled jobs are authorised by this review.

## Reuse existing systems

SEO-OS already contains GSC/GA4 importers, keyword ownership and prioritisation routines. Its September 7 Current State records scheduled jobs as disabled; do not enable them as part of integration. Marketing Studio contains content, approval, publishing and analytics integration code. Hermes/Sera can consume evidence through those systems; the Playground bridge does not exist yet. Start with a read-only export of saved grid results, preserving source, business identity, coordinates, grid geometry, keyword, language, date and failures. Never compare Local Finder and Google Maps as one ranking series.

## Comparison and limits

BrightLocal emphasises local audits, citations/listings and reputation management; Local Falcon emphasises grids, campaigns and trend/competitor reporting; GBPPromote advertises GBP operations, review workflows, posting and profile-change alerts. These are vendor-documented capabilities, not independently tested claims. Building full parity is not recommended for the quick Marley tool. Consider existing services for citations and broader GBP management rather than reproducing them.

Sources: [BrightLocal](https://www.brightlocal.com/platform/), [Local Falcon](https://www.localfalcon.com/features), [GBPPromote](https://gbppromote.com/local-seo-tools/). Google replaced the $200 monthly credit with per-SKU free usage on March 1, 2025; Dynamic Maps currently includes 10,000 monthly loads, aggregated across a billing account. Account usage has not been checked. [Google pricing](https://developers.google.com/maps/billing-and-pricing/pricing).
