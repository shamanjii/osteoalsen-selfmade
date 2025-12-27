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
    '/heilpraktiker-osteopathie-hamburg': '/was-ist-osteopathie/',

    // Patient info - content now in FAQ
    '/patienteninfos': '/faq/',

    // 404 Pages - Broken links fixed, now redirect to relevant pages
    '/kontakt': '/terminbuchung/',
    '/kontakt/': '/terminbuchung/',
    '/termin': '/terminbuchung/',
    '/termin/': '/terminbuchung/',
    '/leistungen': '/behandlungen/',
    '/leistungen/': '/behandlungen/',

    // Non-existent treatment pages
    '/behandlungen/schwangerschaft': '/behandlungen/',
    '/behandlungen/schwangerschaft/': '/behandlungen/',
    '/behandlungen/chronische-schmerzen': '/behandlungen/stress-burnout/',
    '/behandlungen/chronische-schmerzen/': '/behandlungen/stress-burnout/',
    '/behandlungen/aeltere-patienten': '/behandlungen/',
    '/behandlungen/aeltere-patienten/': '/behandlungen/',
    '/behandlungen/rehabilitation': '/behandlungen/',
    '/behandlungen/rehabilitation/': '/behandlungen/',
    '/behandlungen/ernaehrungsberatung': '/behandlungen/',
    '/behandlungen/ernaehrungsberatung/': '/behandlungen/',
    '/behandlungen/kopfschmerzen': '/behandlungen/kopfschmerzen-migraene/',
    '/behandlungen/kopfschmerzen/': '/behandlungen/kopfschmerzen-migraene/',
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
    '/kontakt',
    '/kontakt/',
    '/termin',
    '/termin/',
    '/leistungen',
    '/leistungen/',
    '/behandlungen/schwangerschaft',
    '/behandlungen/schwangerschaft/',
    '/behandlungen/chronische-schmerzen',
    '/behandlungen/chronische-schmerzen/',
    '/behandlungen/aeltere-patienten',
    '/behandlungen/aeltere-patienten/',
    '/behandlungen/rehabilitation',
    '/behandlungen/rehabilitation/',
    '/behandlungen/ernaehrungsberatung',
    '/behandlungen/ernaehrungsberatung/',
    '/behandlungen/kopfschmerzen',
    '/behandlungen/kopfschmerzen/',
  ],
};
