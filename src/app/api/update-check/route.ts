import { NextResponse } from 'next/server';

const GITHUB_REPO = 'paulmassen/seo-playground';
const BRANCH = 'main';

export const revalidate = 3600; // cache 1 hour

export async function GET() {
  const current = process.env.NEXT_PUBLIC_UPSTREAM_BASE ?? 'unknown';

  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/commits/${BRANCH}`,
      {
        headers: { Accept: 'application/vnd.github.v3+json' },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      return NextResponse.json({ current, latest: null, hasUpdate: false });
    }

    const data = await res.json() as { sha: string };
    const latest = (data.sha as string).slice(0, 7);
    const hasUpdate = current !== 'unknown' && latest !== current;

    return NextResponse.json({ current, latest, hasUpdate });
  } catch {
    return NextResponse.json({ current, latest: null, hasUpdate: false });
  }
}
