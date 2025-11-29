import { config } from 'dotenv';

config();

/**
 * Findet Place ID über Geocoding API
 */
async function findPlaceIDFromAddress() {
  const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

  if (!API_KEY) {
    console.error('❌ GOOGLE_PLACES_API_KEY nicht gefunden');
    process.exit(1);
  }

  // Deine Adresse
  const address = 'Rappstraße 7, 20146 Hamburg';

  console.log('🔍 Suche Place ID für:', address);
  console.log('');

  try {
    // Method 1: Find Place from Text
    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent('Osteopathie Alsen Hamburg Rappstraße 7')}&inputtype=textquery&fields=place_id,name,formatted_address&key=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK' && data.candidates && data.candidates.length > 0) {
      const place = data.candidates[0];
      console.log('✅ Place ID gefunden!\n');
      console.log('═══════════════════════════════════════════════════');
      console.log('Place ID:', place.place_id);
      console.log('Name:', place.name);
      console.log('Address:', place.formatted_address);
      console.log('═══════════════════════════════════════════════════\n');

      console.log('📝 Füge diese Place ID in .env ein:');
      console.log(`   GOOGLE_PLACE_ID="${place.place_id}"\n`);

      return place.place_id;
    } else {
      console.error('❌ Keine Place ID gefunden');
      console.error('Status:', data.status);
      console.error('Error:', data.error_message || 'Unknown error');
    }
  } catch (error: any) {
    console.error('❌ Fehler:', error.message);
  }
}

findPlaceIDFromAddress();
