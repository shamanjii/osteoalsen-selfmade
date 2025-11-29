import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    hasApiKey: !!process.env.GOOGLE_PLACES_API_KEY,
    hasPlaceId: !!process.env.GOOGLE_PLACE_ID,
    apiKeyLength: process.env.GOOGLE_PLACES_API_KEY?.length || 0,
    placeIdLength: process.env.GOOGLE_PLACE_ID?.length || 0,
    apiKeyFirst10: process.env.GOOGLE_PLACES_API_KEY?.substring(0, 10) || 'MISSING',
    placeIdFirst10: process.env.GOOGLE_PLACE_ID?.substring(0, 10) || 'MISSING',
  });
}
