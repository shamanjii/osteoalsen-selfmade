/**
 * Findet die Google Place ID über die Places API (New)
 *
 * WICHTIG: Zuerst Places API aktivieren in Cloud Console!
 * https://console.cloud.google.com/apis/library/places-backend.googleapis.com
 */

async function findPlaceIDSimple() {
  console.log('🔍 Suche nach Place ID für "Osteopathie Alsen"...\n');

  // Ohne API Key können wir keine Suche machen
  // Nutzer muss zuerst API Key erstellen

  console.log('📝 ANLEITUNG: Place ID finden\n');
  console.log('═══════════════════════════════════════════════════\n');

  console.log('Option 1 - Via Google Maps URL (EINFACHSTE):');
  console.log('─────────────────────────────────────────────────');
  console.log('1. Gehe zu: https://www.google.com/maps');
  console.log('2. Suche nach: "Osteopathie Alsen Hamburg"');
  console.log('3. Klicke auf dein Profil');
  console.log('4. Kopiere die URL - sie enthält die Place ID\n');
  console.log('   Format: https://www.google.com/maps/place/data=...[HIER_IST_DIE_PLACE_ID]\n');

  console.log('Option 2 - Via Place ID Finder Tool:');
  console.log('─────────────────────────────────────────────────');
  console.log('1. Gehe zu: https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder');
  console.log('2. Suche nach: "Rappstraße 7, 20146 Hamburg"');
  console.log('3. Kopiere die Place ID\n');

  console.log('Option 3 - Aus deiner GMB-URL extrahieren:');
  console.log('─────────────────────────────────────────────────');
  console.log('1. Öffne Google My Business');
  console.log('2. Gehe zu deinem Profil');
  console.log('3. Die URL enthält deine Place ID\n');

  console.log('═══════════════════════════════════════════════════\n');
  console.log('⏭️  Nachdem du die Place ID gefunden hast:');
  console.log('   → Speichere sie in .env als GOOGLE_PLACE_ID');
  console.log('   → Dann weiter mit der API-Integration\n');
}

findPlaceIDSimple();
