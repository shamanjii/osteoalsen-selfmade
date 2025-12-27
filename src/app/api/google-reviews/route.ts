import { NextResponse } from 'next/server';

/**
 * API Route: Lädt Google Reviews live von Google Places API
 *
 * Features:
 * - Cached 24 Stunden (ISR) - optimiert für Vercel Limits
 * - Fallback zu statischen Reviews bei Fehler
 * - Mappt Google Review Format → Website Format
 */
export async function GET() {
  // Load env variables at runtime (not at module load time)
  const PLACE_ID = process.env.GOOGLE_PLACE_ID;
  const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

  // DEBUG LOGGING
  console.log('🔍 DEBUG - Env Variables:');
  console.log('   PLACE_ID:', PLACE_ID || 'MISSING');
  console.log('   API_KEY:', API_KEY || 'MISSING');

  // Validierung
  if (!PLACE_ID || !API_KEY) {
    console.error('❌ Missing GOOGLE_PLACE_ID or GOOGLE_PLACES_API_KEY in .env');
    return NextResponse.json(
      {
        error: 'API configuration missing',
        message: 'Please set GOOGLE_PLACE_ID and GOOGLE_PLACES_API_KEY in .env'
      },
      { status: 500 }
    );
  }

  try {
    // Google Places API: Place Details Endpoint
    // Dokumentation: https://developers.google.com/maps/documentation/places/web-service/details
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,user_ratings_total,reviews&key=${API_KEY}&language=de`;

    const response = await fetch(url, {
      next: { revalidate: 86400 } // Cache 24 Stunden (reduziert ISR Writes um 96%)
    });

    const data = await response.json();

    // Error Handling
    if (data.status !== 'OK') {
      throw new Error(`Google API Error: ${data.status} - ${data.error_message || 'Unknown error'}`);
    }

    // Reviews transformieren
    const reviews = data.result.reviews?.map((review: any) => ({
      author: review.author_name,
      rating: review.rating,
      text: review.text,
      date: new Date(review.time * 1000).toLocaleDateString('de-DE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      profilePhoto: review.profile_photo_url,
      authorUrl: review.author_url,
      relativeTime: review.relative_time_description
    })) || [];

    return NextResponse.json({
      success: true,
      averageRating: data.result.rating,
      totalReviews: data.result.user_ratings_total,
      businessName: data.result.name,
      reviews,
      cachedAt: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('❌ Error fetching Google reviews:', error);

    return NextResponse.json(
      {
        error: 'Failed to fetch reviews',
        message: error.message,
        details: 'Falling back to static reviews. Check API key and Place ID.'
      },
      { status: 500 }
    );
  }
}
