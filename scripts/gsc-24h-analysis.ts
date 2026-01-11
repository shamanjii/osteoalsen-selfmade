import { config } from 'dotenv';
import { google } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';

config();

const credPath = path.join(process.cwd(), 'credentials', 'google-search-console.json');
const credentials = JSON.parse(fs.readFileSync(credPath, 'utf-8'));

const auth = new google.auth.JWT(
  credentials.client_email,
  undefined,
  credentials.private_key,
  ['https://www.googleapis.com/auth/webmasters.readonly']
);

const searchconsole = google.searchconsole({ version: 'v1', auth });

async function get24hData() {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const endDate = today.toISOString().split('T')[0];
  const startDate = yesterday.toISOString().split('T')[0];

  console.log(`📅 Zeitraum: ${startDate} bis ${endDate}\n`);

  // Query-Daten
  const queryResponse = await searchconsole.searchanalytics.query({
    siteUrl: 'sc-domain:osteoalsen.de',
    requestBody: {
      startDate,
      endDate,
      dimensions: ['query'],
      rowLimit: 100,
      dataState: 'all'
    }
  });

  console.log('🔍 ALLE Queries mit Klicks (letzte 24h):');
  const rows = queryResponse.data.rows || [];
  let totalClicks = 0;

  rows.filter(row => row.clicks && row.clicks > 0).forEach((row, index) => {
    totalClicks += row.clicks || 0;
    console.log(`${index + 1}. "${row.keys?.[0]}"`);
    console.log(`   Position: ${row.position?.toFixed(2)} | Klicks: ${row.clicks} | Impressions: ${row.impressions}`);
  });

  console.log(`\n✅ Gesamt: ${totalClicks} Klicks in 24h`);

  // Seiten-Daten
  console.log('\n📄 Top Seiten mit Klicks (24h):');
  const pageResponse = await searchconsole.searchanalytics.query({
    siteUrl: 'sc-domain:osteoalsen.de',
    requestBody: {
      startDate,
      endDate,
      dimensions: ['page'],
      rowLimit: 20,
      dataState: 'all'
    }
  });

  const pages = pageResponse.data.rows || [];
  pages.filter(row => row.clicks && row.clicks > 0).forEach((row, index) => {
    const url = row.keys?.[0] || '';
    const path = url.replace('https://www.osteoalsen.de', '');
    console.log(`${index + 1}. ${path}`);
    console.log(`   Klicks: ${row.clicks} | Impressions: ${row.impressions} | Pos: ${row.position?.toFixed(2)}`);
  });
}

get24hData().catch(console.error);
