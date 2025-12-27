import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // 301 Permanent Redirects for zombie/duplicate pages
  // Based on Search Console data: 0 clicks, 0 traffic, duplicate content
  const redirects: Record<string, string> = {
    // Rotherbaum page - redirect to homepage (main location is Rotherbaum)
    '/osteopathie-rotherbaum': '/',

    // Keyword variation pages - redirect to homepage
    '/osteopath-hamburg': '/',

    // Heilpraktiker variation - redirect to general info
    '/heilpraktiker-osteopathie-hamburg': '/was-ist-osteopathie',

    // Patient info - content now in FAQ
    '/patienteninfos': '/faq',

    // Science/Research - belongs in blog
    '/wissen': '/blog',
  };

  if (redirects[path]) {
    const redirectUrl = new URL(redirects[path], request.url);
    return NextResponse.redirect(redirectUrl, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/osteopathie-rotherbaum',
    '/osteopath-hamburg',
    '/heilpraktiker-osteopathie-hamburg',
    '/patienteninfos',
    '/wissen',
  ],
};
