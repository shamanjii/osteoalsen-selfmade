import { config } from 'dotenv';
import { fetchSearchAnalytics } from '@/lib/google-search-console';

config();

async function checkViszeraleArtikel() {
  console.log('🔍 Prüfe Rankings für "Viszerale Osteopathie" Artikel...\n');

  try {
    // Letzte 7 Tage
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    console.log(`📅 Zeitraum: ${startDate} bis ${endDate}\n`);

    // Alle Daten für diese Seite abrufen
    const pageData = await fetchSearchAnalytics(startDate, endDate, ['page', 'query'], 500);

    const viszeraleRows = (pageData.rows || []).filter(row => {
      const url = row.keys?.[0] || '';
      return url.includes('/blog/viszerale-osteopathie');
    });

    if (viszeraleRows.length === 0) {
      console.log('❌ Der Artikel wird noch NICHT in Google Search Console angezeigt.');
      console.log('');
      console.log('💡 Das ist normal für neue Artikel:');
      console.log('   - Google braucht 2-7 Tage zum Indexieren');
      console.log('   - GSC-Daten erscheinen erst 2-3 Tage nach Indexierung');
      console.log('   - Erste Rankings dauern 1-4 Wochen');
      console.log('');
      console.log('✅ Nächste Schritte:');
      console.log('   1. Prüfe in 2-3 Tagen nochmal');
      console.log('   2. Forciere Indexierung via Google Search Console');
      return;
    }

    const totalClicks = viszeraleRows.reduce((sum, r) => sum + (r.clicks || 0), 0);
    const totalImpressions = viszeraleRows.reduce((sum, r) => sum + (r.impressions || 0), 0);

    console.log(`✅ Artikel ist LIVE in Google!`);
    console.log(`📊 Performance (7 Tage):`);
    console.log(`   Klicks: ${totalClicks}`);
    console.log(`   Impressionen: ${totalImpressions}`);
    console.log(`   Queries: ${viszeraleRows.length}`);
    console.log('');

    if (viszeraleRows.length > 0) {
      console.log('🔑 Top Queries für diesen Artikel:');
      console.log('='.repeat(60));

      viszeraleRows
        .sort((a, b) => (b.impressions || 0) - (a.impressions || 0))
        .slice(0, 20)
        .forEach((row, i) => {
          const keyword = row.keys?.[1] || 'unknown';
          console.log(`${i + 1}. "${keyword}"`);
          console.log(`   📍 Position: ${row.position?.toFixed(1)} | 🖱️ Klicks: ${row.clicks || 0} | 👁️ Impressionen: ${row.impressions}`);
          if (row.clicks && row.clicks > 0) {
            console.log(`   📊 CTR: ${((row.ctr || 0) * 100).toFixed(2)}%`);
          }
          console.log('');
        });
    }

  } catch (error) {
    console.error('❌ Fehler:', error);
  }
}

checkViszeraleArtikel();
