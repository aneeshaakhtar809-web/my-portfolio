import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api/|_next/|_static/|[\\w-]+\\.\\w+).*)',
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // Define allowed root domains
  // In development, localhost:3000 is the root.
  // A subdomain would be `alexchen.localhost:3000`
  const currentHost = hostname.replace(/:\d+$/, ''); // remove port

  // Skip rewrite for root domain or standard local development
  if (
    currentHost === 'localhost' ||
    currentHost === '127.0.0.1' ||
    currentHost === 'portfolio-os.com' ||
    currentHost === 'www.portfolio-os.com'
  ) {
    return NextResponse.next();
  }

  // Extract subdomain if any (e.g. "alexchen" from "alexchen.localhost" or "alexchen.portfolio-os.com")
  const parts = currentHost.split('.');
  if (parts.length >= 2) {
    const subdomain = parts[0];
    if (subdomain !== 'www' && subdomain !== 'app') {
      // Rewrite to /[username] route
      return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}`, req.url));
    }
  }

  return NextResponse.next();
}

