import { config } from 'dotenv';

config();

/**
 * Test Google Places API für Live Reviews
 *
 * Zeigt:
 * - Ob API Key funktioniert
 * - Ob Place ID korrekt ist
 * - Welche Reviews gefunden werden
 */
async function testGoogleReviewsAPI() {
  console.log('🧪 Testing Google Places API...\n');

  const PLACE_ID = process.env.GOOGLE_PLACE_ID;
  const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

  // Validierung
  if (!PLACE_ID) {
    console.error('❌ GOOGLE_PLACE_ID nicht in .env gefunden');
    console.log('📝 Bitte setze GOOGLE_PLACE_ID in .env');
    console.log('   Siehe: GOOGLE-REVIEWS-SETUP.md Schritt 3\n');
    process.exit(1);
  }

  if (!API_KEY) {
    console.error('❌ GOOGLE_PLACES_API_KEY nicht in .env gefunden');
    console.log('📝 Bitte setze GOOGLE_PLACES_API_KEY in .env');
    console.log('   Siehe: GOOGLE-REVIEWS-SETUP.md Schritt 2\n');
    process.exit(1);
  }

  console.log('✅ Env Variables gefunden:');
  console.log(`   Place ID: ${PLACE_ID.substring(0, 10)}...`);
  console.log(`   API Key: ${API_KEY.substring(0, 10)}...\n`);

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,user_ratings_total,reviews&key=${API_KEY}&language=de`;

    console.log('🔄 Fetching reviews from Google...\n');

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK') {
      console.error('❌ Google API Error:', data.status);
      console.error('   Message:', data.error_message || 'Unknown error');

      if (data.status === 'REQUEST_DENIED') {
        console.log('\n📝 Mögliche Ursachen:');
        console.log('   1. Places API nicht aktiviert in Google Cloud Console');
        console.log('      → https://console.cloud.google.com/apis/library/places-backend.googleapis.com');
        console.log('   2. API Key hat keine Berechtigung für Places API');
        console.log('      → https://console.cloud.google.com/apis/credentials');
      }

      if (data.status === 'INVALID_REQUEST') {
        console.log('\n📝 Mögliche Ursachen:');
        console.log('   1. Place ID ist falsch');
        console.log('   2. Place ID hat falsches Format (sollte mit ChIJ beginnen)');
        console.log('      → Siehe GOOGLE-REVIEWS-SETUP.md Schritt 3');
      }

      process.exit(1);
    }

    // Success!
    console.log('✅ API Call erfolgreich!\n');
    console.log('═══════════════════════════════════════════════════\n');

    console.log('📊 Business Info:');
    console.log(`   Name: ${data.result.name}`);
    console.log(`   Rating: ${data.result.rating} ⭐`);
    console.log(`   Total Reviews: ${data.result.user_ratings_total}\n`);

    console.log('📝 Reviews gefunden: ' + (data.result.reviews?.length || 0) + '\n');

    if (data.result.reviews && data.result.reviews.length > 0) {
      console.log('─────────────────────────────────────────────────\n');

      data.result.reviews.slice(0, 3).forEach((review: any, index: number) => {
        console.log(`Review ${index + 1}:`);
        console.log(`   Author: ${review.author_name}`);
        console.log(`   Rating: ${'★'.repeat(review.rating)}`);
        console.log(`   Date: ${new Date(review.time * 1000).toLocaleDateString('de-DE')}`);
        console.log(`   Text: ${review.text.substring(0, 100)}...`);
        console.log('');
      });

      if (data.result.reviews.length > 3) {
        console.log(`   ... und ${data.result.reviews.length - 3} weitere Reviews\n`);
      }
    }

    console.log('═══════════════════════════════════════════════════\n');
    console.log('✅ ALLES FUNKTIONIERT!');
    console.log('   → Reviews werden jetzt live von Google geladen');
    console.log('   → Teste auf: http://localhost:3000/#bewertungen\n');

  } catch (error: any) {
    console.error('❌ Fehler beim Fetch:', error.message);
    console.log('\n📝 Prüfe deine Internetverbindung\n');
    process.exit(1);
  }
}

testGoogleReviewsAPI();
