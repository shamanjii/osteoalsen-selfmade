import { config } from 'dotenv';
import { getTopKeywords, fetchSearchAnalytics } from '@/lib/google-search-console';

config();

async function get1DayData() {
  console.log('📅 Abrufen der Daten für den letzten Tag...\n');

  try {
    // Top Keywords letzte 24h
    const keywords = await getTopKeywords(1, 100);

    const withClicks = keywords.filter(k => k.clicks > 0);
    const totalClicks = withClicks.reduce((sum, k) => sum + k.clicks, 0);

    console.log(`✅ Gesamt: ${totalClicks} Klicks in 24h`);
    console.log(`🔍 ${withClicks.length} verschiedene Queries mit Klicks\n`);

    console.log('Top Queries mit Klicks:');
    withClicks.slice(0, 25).forEach((kw, i) => {
      console.log(`${i + 1}. "${kw.keyword}"`);
      console.log(`   Pos: ${kw.position.toFixed(2)} | Klicks: ${kw.clicks} | Imp: ${kw.impressions} | CTR: ${(kw.ctr * 100).toFixed(2)}%`);
    });

    // Seiten-Daten
    console.log('\n📄 Top Seiten mit Klicks:');
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const pageData = await fetchSearchAnalytics(yesterday, today, ['page'], 50);

    const pages = (pageData.rows || []).filter(r => r.clicks && r.clicks > 0);
    pages.forEach((row, i) => {
      const url = row.keys?.[0] || '';
      const path = url.replace('https://www.osteoalsen.de', '');
      console.log(`${i + 1}. ${path}`);
      console.log(`   Klicks: ${row.clicks} | Imp: ${row.impressions} | Pos: ${row.position?.toFixed(2)}`);
    });

  } catch (error) {
    console.error('❌ Fehler:', error);
  }
}

get1DayData();
