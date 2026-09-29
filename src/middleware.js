import { NextResponse } from 'next/server';

// Simple in-memory store untuk rate limiting di Edge
const ipRequestMap = new Map();
const RATE_LIMIT = 30;        // max 30 request
const WINDOW_MS = 60_000;     // per 60 detik

function getRateLimit(ip) {
  const now = Date.now();
  const entry = ipRequestMap.get(ip);

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    ipRequestMap.set(ip, { count: 1, windowStart: now });
    return { limited: false, remaining: RATE_LIMIT - 1 };
  }

  entry.count++;
  const remaining = Math.max(0, RATE_LIMIT - entry.count);
  const limited = entry.count > RATE_LIMIT;
  return { limited, remaining };
}

export function middleware(request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    '0.0.0.0';

  const { limited, remaining } = getRateLimit(ip);

  if (limited) {
    return new NextResponse(
      JSON.stringify({ error: 'Too Many Requests. Coba lagi sebentar.' }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': '60',
          'X-RateLimit-Limit': String(RATE_LIMIT),
          'X-RateLimit-Remaining': '0',
        },
      }
    );
  }

  const response = NextResponse.next();

  // Tambahan security headers di level middleware
  response.headers.set('X-RateLimit-Limit', String(RATE_LIMIT));
  response.headers.set('X-RateLimit-Remaining', String(remaining));
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.svg$|.*\\.webp$).*)'],
};
