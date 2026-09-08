@AGENTS.md

## Current State

Last touched: 2026-09-08 on i9 — private Marley preview working; local SEO scope and integration options documented.

### Where we left off

- Branch `feat/marley-bootstrap`; draft PR https://github.com/redbananastudios/seo-playground/pull/1 targets the RBS fork main. No merge authorised by the scope discussion.
- UK/English defaults, 20 editable grid keywords and 30 organic tracked terms are populated. Peter's completed grid scan is retained. No paid scans were started by the agent.
- Last source validation: 37 tests, production build/type/lint checks passed (nine existing unused-variable warnings); browser verified saved keyword loading and Settings persistence without starting a scan.
- Current capabilities and proposed simplification/integration are in `docs/local-seo-scope.md`; setup is in `docs/private-preview.md`, keyword provenance in `docs/marley-keywords.md`.
- GBP OAuth, exact listing matching, reliable scan jobs, scheduling, date comparisons and SEO-OS export remain unbuilt. SEO-OS automation stays paused.

### Where things actually live now

Worktree: `M:\MarleyMoves\operations\marley-seo-bootstrap`; primary checkout: `M:\MarleyMoves\operations\marley-seo\app`. Preview: http://i9:3033. Persistent SQLite and private login note: `M:\MarleyMoves\data\seo-playground`. Brain hub: `O:\brain\01_Projects\Marley Moves\README.md`. Work tracking: Marley Moves ClickUp lists resolved through `O:\RBS-OS\projects.json`; Session Logs doc `2kxurxup-532`. Canonical decisions: `O:\RBS-OS\decisions\log.md`.

### Active open decisions

- Confirm the proposed local-first navigation and next implementation milestone.
- Google Maps display timing; separate Google Maps ranking source timing.
- Whether to bridge scan results to SEO-OS before adding broader GBP management.

No blockers to the private preview. Public/customer deployment requires further access isolation and operational work. Stop the standalone server before rebuilding on Windows; see the runbook. Never print provider secrets.
