# Repository Guidelines

## Project Structure & Module Organization

This fork extends SEO Playground for private Marley Moves local SEO work. Next.js App Router pages and API handlers live in `src/app/`; grid scanning lives in `src/app/dashboard/local-finder/` and its dedicated `geo-grid/` page. Shared components are in `src/components/`, SQLite and provider helpers in `src/lib/`, and static assets in `public/`. Tests sit beside their modules as `*.test.ts`.

## Build, Test, and Development Commands

- `npm ci`: install the locked dependencies.
- `npm run dev -- --hostname 0.0.0.0 --port <allocated-port>`: run development on the registered project port.
- `npm test`: run Vitest with mocked provider calls and temporary databases.
- `npx tsc --noEmit`: check TypeScript.
- `npm run lint`: run ESLint's Next.js configuration.
- `npm run build`: compile and validate the production bundle.

Read `docs/private-preview.md` for environment configuration and standalone startup.

## Coding Style & Naming Conventions

Use TypeScript, two-space indentation, PascalCase React component names, and camelCase functions. Follow nearby code for quotes and semicolons; no separate formatter is configured. Use the `@/` import alias and existing Tailwind utilities. Preserve useful upstream features; prefer focused additions over UI rewrites. Read installed Next.js documentation when available before changing framework behaviour.

## Testing Guidelines

Run existing tests before code changes, then tests, type-checking and lint afterwards. There is no enforced coverage percentage. Cover provider failures, credential boundaries, grid geometry and persistence. Mock paid API requests; never make live scans part of tests. Close SQLite connections before deleting temporary databases on Windows. Failed scan points must remain distinguishable from businesses absent from results.

## Commit & Pull Request Guidelines

Upstream uses short imperative summaries such as “Add dark mode support”. Keep commits similarly focused. Develop in a dedicated worktree from `main`. PRs should explain the behaviour, validation and limitations; link relevant issues and include screenshots for visual changes. Keep `origin` pointed at the RBS fork and `upstream` at `paulmassen/seo-playground`; merge upstream updates on a review branch and test before deployment.

## Security & Configuration

Keep credentials in ignored `.env.local`; never commit secrets or SQLite files. Configure operator authentication and an absolute persistent `DB_PATH`. This preview is single-operator: shared Basic authentication is not customer isolation. Preserve separate histories when adding a new ranking source.
