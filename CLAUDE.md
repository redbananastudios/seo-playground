@AGENTS.md

## Current State — 2026-09-08

Private bootstrap on `feat/marley-bootstrap`, based on upstream/fork main `d7db1f5`. Working checkout: `M:\MarleyMoves\operations\marley-seo-bootstrap`; clean main checkout: `M:\MarleyMoves\operations\marley-seo\app`. Preview: http://i9:3033; local login note and persistent SQLite live under `M:\MarleyMoves\data\seo-playground`. Never print provider secrets.

Preserve upstream features and Local Finder ranking; add Maps as a separate source later. No customer OAuth, tenant isolation, scheduler or comparison UI yet. See `docs/private-preview.md`. No paid scans were run during bootstrap; the free account check succeeded. Tests mock paid endpoints.

Project lesson: derive Marley identity from the existing site configuration before seeding settings; its domain is `marleymoves.co.uk`. Close SQLite before test-directory cleanup on Windows.

UK default correction: SERP, ranked keywords, competitors and keyword data now honour saved location/language; generic fallbacks are UK/English. Stop the standalone process before rebuilding on Windows to release output-file locks.

Marley setup: 20 saved Geo-Grid keywords (editable in Settings) and 30 organic tracked terms populated from the existing commercial register/local SEO plan. Live SQLite backed up before import; scan history retained. Loading a keyword is GET-only form population and must not trigger provider calls. Source and scope: docs/marley-keywords.md.
