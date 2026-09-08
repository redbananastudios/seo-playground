import { afterEach, describe, expect, it, vi } from 'vitest';
import { getCredentials, credentialsAreManaged } from './db';
import { escapeHtml } from './html';
import { computeGridSummary, computeCompetitors, computeRingStats } from '@/app/dashboard/local-finder/grid-insights';
import { fetchOneGridPoint, generateGridCoords } from '@/app/dashboard/local-finder/grid-api';

afterEach(() => vi.unstubAllEnvs());
afterEach(() => vi.unstubAllGlobals());

describe('server-managed credentials', () => {
  it('uses server credentials without saving them in SQLite', () => {
    vi.stubEnv('DATAFORSEO_LOGIN', 'test-login');
    vi.stubEnv('DATAFORSEO_PASSWORD', 'test-pass');
    expect(credentialsAreManaged()).toBe(true);
    expect(getCredentials()).toEqual({ login: 'test-login', pass: 'test-pass' });
  });
  it('fails closed on partial configuration', () => {
    vi.stubEnv('DATAFORSEO_LOGIN', 'test-login');
    vi.stubEnv('DATAFORSEO_PASSWORD', '');
    expect(getCredentials()).toBeNull();
  });
});

describe('grid reliability', () => {
  it('preserves an API failure after the bounded retry', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ tasks: [{ status_code: 40200, status_message: 'Payment required' }] })));
    // Each mocked request needs its own response body.
    fetchMock.mockImplementation(async () => new Response(JSON.stringify({ tasks: [{ status_code: 40200, status_message: 'Payment required' }] })));
    vi.stubGlobal('fetch', fetchMock);
    const result = await fetchOneGridPoint('removals', 51, -2, 'English', 'test-auth');
    expect(result.error).toBe('Payment required');
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
  it('excludes failed points from visibility, competitors and distance statistics', () => {
    const points = [{ row: 0, col: 0, rank: 1 }, { row: 0, col: 1, rank: null, error: 'timeout' }];
    expect(computeGridSummary(points)).toMatchObject({ totalPoints: 1, foundCount: 1, ato: 100 });
    expect(computeCompetitors(points)).toEqual([]);
    expect(computeRingStats(points, 3, 1)[0].pointCount).toBe(1);
  });
  it.each([3, 5, 7])('generates a centred %sx%s grid', (size) => {
    const points = generateGridCoords(51, -2, size, 1);
    expect(points).toHaveLength(size * size);
    expect(points[Math.floor(points.length / 2)]).toMatchObject({ lat: 51, lng: -2 });
  });
  it('escapes provider and target text before inserting map popup HTML', () => {
    expect(escapeHtml('<img src=x onerror="alert(1)">')).toBe('&lt;img src=x onerror=&quot;alert(1)&quot;&gt;');
  });
});
