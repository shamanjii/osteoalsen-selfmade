import { config } from 'dotenv';
import { getTopKeywords, getKeywordsByPage, fetchSearchAnalytics } from '@/lib/google-search-console';

config();

async function getDetailed7DaysData() {
  console.log('📅 DETAILLIERTE DATEN DER LETZTEN 7 TAGE\n');

  try {
    // Alle Keywords mit Klicks
    console.log('🔍 ALLE QUERIES MIT KLICKS (letzte 7 Tage):');
    console.log('='.repeat(60));
    const keywords = await getTopKeywords(7, 250);

    const withClicks = keywords.filter(k => k.clicks > 0);
    const totalClicks = withClicks.reduce((sum, k) => sum + k.clicks, 0);

    console.log(`\n✅ GESAMT: ${totalClicks} Klicks aus ${withClicks.length} verschiedenen Queries\n`);

    withClicks.forEach((kw, i) => {
      console.log(`${i + 1}. "${kw.keyword}"`);
      console.log(`   📍 Position: ${kw.position.toFixed(1)} | 🖱️ Klicks: ${kw.clicks} | 👁️ Impressionen: ${kw.impressions} | 📊 CTR: ${(kw.ctr * 100).toFixed(2)}%`);
      console.log('');
    });

    // Seiten-Daten
    console.log('\n' + '='.repeat(60));
    console.log('📄 ALLE SEITEN MIT KLICKS (letzte 7 Tage):');
    console.log('='.repeat(60) + '\n');

    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const pageData = await fetchSearchAnalytics(startDate, endDate, ['page'], 100);

    const pages = (pageData.rows || []).filter(r => r.clicks && r.clicks > 0);
    const totalPageClicks = pages.reduce((sum, p) => sum + (p.clicks || 0), 0);

    console.log(`✅ ${pages.length} Seiten mit ${totalPageClicks} Klicks gesamt\n`);

    pages.forEach((row, i) => {
      const url = row.keys?.[0] || '';
      const path = url.replace('https://www.osteoalsen.de', '') || '/';
      console.log(`${i + 1}. ${path}`);
      console.log(`   🖱️ Klicks: ${row.clicks} | 👁️ Impressionen: ${row.impressions} | 📍 Ø Position: ${row.position?.toFixed(1)} | 📊 CTR: ${((row.ctr || 0) * 100).toFixed(2)}%`);
      console.log('');
    });

    // Query + Seite kombiniert
    console.log('\n' + '='.repeat(60));
    console.log('🎯 QUERIES MIT IHREN ZIEL-SEITEN:');
    console.log('='.repeat(60) + '\n');

    const combined = await getKeywordsByPage(7, 100);
    const combinedWithClicks = combined.filter(c => c.clicks > 0);

    combinedWithClicks.slice(0, 30).forEach((item, i) => {
      const path = item.page.replace('https://www.osteoalsen.de', '') || '/';
      console.log(`${i + 1}. "${item.keyword}" → ${path}`);
      console.log(`   📍 Pos: ${item.position.toFixed(1)} | 🖱️ Klicks: ${item.clicks} | 👁️ Imp: ${item.impressions}`);
      console.log('');
    });

  } catch (error) {
    console.error('❌ Fehler:', error);
  }
}

getDetailed7DaysData();
