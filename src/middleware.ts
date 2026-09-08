import { NextRequest, NextResponse } from 'next/server';
import { validOperatorCredentials } from './lib/operator-auth';

export async function middleware(request: NextRequest) {
  const user = process.env.SEO_OPERATOR_USER;
  const password = process.env.SEO_OPERATOR_PASSWORD;
  if (!user || !password) {
    return new NextResponse('Operator access is not configured.', { status: 503 });
  }
  if (!await validOperatorCredentials(request.headers.get('authorization'), user, password)) {
    return new NextResponse('Sign in to SEO Playground.', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Marley SEO", charset="UTF-8"', 'Cache-Control': 'no-store' },
    });
  }
  // Upstream searches can charge on GET. Prevent cross-site navigations as well as POSTs.
  const origin = request.headers.get('origin');
  let foreignOrigin = false;
  if (origin) {
    try { foreignOrigin = new URL(origin).host !== request.headers.get('host'); }
    catch { foreignOrigin = true; }
  }
  if (request.headers.get('sec-fetch-site') === 'cross-site' ||
      foreignOrigin) {
    return new NextResponse('Open this tool directly to continue.', { status: 403 });
  }
  const response = NextResponse.next();
  response.headers.set('Cache-Control', 'private, no-store');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'same-origin');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  return response;
}
