import { NextResponse } from 'next/server';
import { generateSitemapXml } from '@/lib/sitemap';

// Required for static export
export const dynamic = 'force-static';

/**
 * Static sitemap route generated at build time
 */
export async function GET() {
  try {
    const sitemapXml = await generateSitemapXml();

    return new NextResponse(sitemapXml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}
