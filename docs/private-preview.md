# Private preview

## Current scope

The fork retains upstream tools and Local Finder scans on a Leaflet/OpenStreetMap display. It supports on-demand grids and stored history. Maps ranking, scheduled scans, saved campaigns, date comparison, GBP OAuth and tenant isolation are future work. Tracking reports rankings; it does not itself improve them.

This is a single-operator preview on a trusted LAN/Tailscale connection. Do not forward its HTTP port to the internet. Public/customer access requires HTTPS and account isolation; Basic credentials are not encrypted by HTTP itself. Existing searches can charge on navigation; use the scan controls deliberately and avoid duplicate submissions.

## Configuration

Create ignored `.env.local` with `SEO_OPERATOR_USER`, a strong `SEO_OPERATOR_PASSWORD`, `DATAFORSEO_LOGIN`, `DATAFORSEO_PASSWORD`, and an absolute `DB_PATH` outside the checkout. The DB parent directory must exist. Environment-managed provider credentials cannot be changed through Settings. With no operator credentials, requests fail closed.

On i9, persistent data and the private login note are under `M:\MarleyMoves\data\seo-playground\`. Port 3033 was allocated to Marley / seo-playground. Marley defaults use the existing website configuration: `marleymoves.co.uk`, centre `51.009015,-2.237309`, English, United Kingdom. Confirm grid coverage before spending on scans.

## Build and start

Stop the running standalone server before rebuilding this checkout: Windows locks its output files. Run `npm ci`, `npm test`, `npx tsc --noEmit`, `npm run lint`, then `npm run build`. For Next.js standalone output, copy `public` to `.next/standalone/public` and `.next/static` to `.next/standalone/.next/static`. Load the private environment into the server process, set `HOSTNAME=0.0.0.0` and the allocated `PORT`, then run `node .next/standalone/server.js`. Start background processes with a hidden window on Windows. The current preview is manually started, not registered for automatic reboot recovery.

Stop the app before copying the SQLite database and its WAL files for backup; retain backups outside Git. Test restoration before relying on it. Never remove the persistent data directory when cleaning a worktree.

## Upstream updates

Keep `origin` as the RBS fork. Run `git fetch upstream`, inspect `git log main..upstream/main`, create an update worktree from `main`, then merge `upstream/main` there. Resolve conflicts, run the checks above, and open a PR to the fork's `main`. Back up data before deploying schema changes. Do not blindly pull upstream into a running checkout. The update banner compares the upstream merge base rather than treating every fork commit as an upstream update.

## Next milestone

Make scans explicit POST jobs with durable IDs and duplicate protection. Then add saved locations/keywords, scheduled execution and comparable history (same source, centre, spacing, language and depth). GBP connection and customer isolation must precede onboarding other businesses. Google Maps ranking should be an additional source, not a replacement for Local Finder.
