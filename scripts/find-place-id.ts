import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';

config();

/**
 * Findet die Google Place ID für "Osteopathie Alsen"
 *
 * Nutzt die My Business API, um die Place ID zu finden.
 */
async function findPlaceID() {
  try {
    console.log('🔍 Suche nach Place ID für "Osteopathie Alsen"...\n');

    // Service Account laden
    const keyPath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH;

    if (!keyPath) {
      console.error('❌ GOOGLE_SERVICE_ACCOUNT_KEY_PATH nicht in .env gefunden');
      process.exit(1);
    }

    const keyFileContent = fs.readFileSync(keyPath, 'utf-8');
    const credentials = JSON.parse(keyFileContent);

    // OAuth2 Client erstellen
    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: [
        'https://www.googleapis.com/auth/business.manage'
      ],
    });

    const mybusiness = google.mybusinessbusinessinformation({ version: 'v1', auth });

    // Alle Locations abrufen
    const accounts = await mybusiness.accounts.list();

    console.log('📊 Gefundene Accounts:');
    console.log(JSON.stringify(accounts.data, null, 2));

  } catch (error: any) {
    console.error('❌ Fehler beim Abrufen der Place ID:');
    console.error(error.message);

    if (error.code === 403) {
      console.log('\n⚠️  Service Account hat keine Berechtigung für My Business API');
      console.log('📝 Alternative: Place ID manuell finden:');
      console.log('   1. Gehe zu: https://www.google.com/maps/search/?api=1&query=Osteopathie+Alsen+Hamburg');
      console.log('   2. Wähle dein Profil aus');
      console.log('   3. Die URL enthält die Place ID (nach "!1s" oder "data=")');
      console.log('   4. Oder nutze: https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder');
    }
  }
}

findPlaceID();
