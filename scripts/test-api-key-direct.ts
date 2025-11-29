/**
 * Testet den API Key direkt mit Google Places API
 */

const API_KEY = 'AIzaSyDad9H3FaKOkoqsQW6p4AE65vkWHkrc52Y';
const PLACE_ID = 'ChIJbYtH0dkpLiMR78360rWq-C4';

async function testAPIKey() {
  console.log('🧪 Testing API Key direkt...\n');

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,user_ratings_total,reviews&key=${API_KEY}&language=de`;

  console.log('📍 Place ID:', PLACE_ID);
  console.log('🔑 API Key:', API_KEY.substring(0, 15) + '...\n');

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log('📊 Response Status:', data.status);
    console.log('');

    if (data.status === 'OK') {
      console.log('✅ SUCCESS! API Key funktioniert!\n');
      console.log('═══════════════════════════════════════════════════');
      console.log('Business:', data.result.name);
      console.log('Rating:', data.result.rating, '⭐');
      console.log('Reviews:', data.result.user_ratings_total);
      console.log('═══════════════════════════════════════════════════\n');
    } else {
      console.log('❌ ERROR:', data.status);
      console.log('Message:', data.error_message || 'No message');
      console.log('');

      if (data.status === 'REQUEST_DENIED') {
        console.log('🔧 LÖSUNG:');
        console.log('   1. Gehe zu: https://console.cloud.google.com/apis/credentials');
        console.log('   2. Klicke auf den API Key');
        console.log('   3. Unter "API-Einschränkungen":');
        console.log('      - Wähle "Schlüssel einschränken"');
        console.log('      - Aktiviere "Places API"');
        console.log('      - Speichern');
      }
    }
  } catch (error: any) {
    console.error('❌ Fetch Error:', error.message);
  }
}

testAPIKey();
