import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const kmlPath = path.join(process.cwd(), 'public', 'geo-sitemap.kml');
  const kmlContent = fs.readFileSync(kmlPath, 'utf-8');

  return new NextResponse(kmlContent, {
    headers: {
      'Content-Type': 'application/vnd.google-earth.kml+xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
