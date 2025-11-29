import { config } from 'dotenv';
import { fetchSearchAnalytics, getSiteSummary } from '@/lib/google-search-console';

// Load environment variables
config();

async function analyzeSEOTrend() {
  console.log('📈 SEO Performance Trend Analyse\n');
  console.log('='.repeat(60));

  try {
    // Compare different time periods
    const periods = [
      { label: 'Letzte 7 Tage', days: 7 },
      { label: 'Letzte 14 Tage', days: 14 },
      { label: 'Letzte 30 Tage', days: 30 },
      { label: 'Letzte 60 Tage', days: 60 },
      { label: 'Letzte 90 Tage', days: 90 },
    ];

    console.log('\n📊 Performance über verschiedene Zeiträume:\n');

    for (const period of periods) {
      const summary = await getSiteSummary(period.days);

      // Calculate daily averages
      const dailyClicks = summary.totalClicks / period.days;
      const dailyImpressions = summary.totalImpressions / period.days;

      console.log(`${period.label}:`);
      console.log(`  Gesamt: ${summary.totalClicks} Clicks, ${summary.totalImpressions} Impressions`);
      console.log(`  Pro Tag: ${dailyClicks.toFixed(1)} Clicks, ${dailyImpressions.toFixed(1)} Impressions`);
      console.log(`  CTR: ${(summary.averageCTR * 100).toFixed(2)}%`);
      console.log(`  Ø Position: ${summary.averagePosition.toFixed(2)}`);
      console.log('');
    }

    console.log('='.repeat(60));
    console.log('\n🔍 Wochenweise Analyse (letzte 8 Wochen):\n');

    // Get weekly data for last 8 weeks
    const today = new Date();
    for (let week = 0; week < 8; week++) {
      const endDate = new Date(today);
      endDate.setDate(today.getDate() - (week * 7));

      const startDate = new Date(endDate);
      startDate.setDate(endDate.getDate() - 7);

      const endStr = endDate.toISOString().split('T')[0];
      const startStr = startDate.toISOString().split('T')[0];

      try {
        const data = await fetchSearchAnalytics(startStr, endStr, ['query'], 1000);

        const totalClicks = data.rows?.reduce((sum, row) => sum + (row.clicks || 0), 0) || 0;
        const totalImpressions = data.rows?.reduce((sum, row) => sum + (row.impressions || 0), 0) || 0;
        const avgCTR = totalImpressions > 0 ? totalClicks / totalImpressions : 0;

        const weekLabel = week === 0 ? 'Diese Woche' : week === 1 ? 'Letzte Woche' : `Vor ${week} Wochen`;

        console.log(`${weekLabel} (${startStr} bis ${endStr}):`);
        console.log(`  ${totalClicks} Clicks, ${totalImpressions} Impressions`);
        console.log(`  CTR: ${(avgCTR * 100).toFixed(2)}%`);
        console.log('');
      } catch (error) {
        console.log(`${week === 0 ? 'Diese Woche' : `Vor ${week} Wochen`}: Keine Daten verfügbar`);
        console.log('');
      }
    }

    console.log('='.repeat(60));
    console.log('\n💡 Interpretation:\n');
    console.log('✓ Wenn die letzten 7-14 Tage SCHLECHTER sind als 30-60 Tage:');
    console.log('  → Typisch nach Website-Änderungen (Google re-crawlt)');
    console.log('  → Erholung dauert meist 2-4 Wochen');
    console.log('  → NICHT weiter optimieren, abwarten!\n');

    console.log('✓ Wenn die Zahlen relativ STABIL sind:');
    console.log('  → Das ist deine Baseline');
    console.log('  → Langsames, strategisches Wachstum ist möglich');
    console.log('  → Fokus auf Content-Qualität, nicht technische Tweaks\n');

    console.log('✓ Wenn es STETIG BESSER wird:');
    console.log('  → Google wertet deine Änderungen positiv');
    console.log('  → Weiter so, aber nicht übertreiben!\n');

  } catch (error) {
    console.error('❌ Fehler bei der Analyse:', error);
    if (error instanceof Error) {
      console.error('Error:', error.message);
    }
    process.exit(1);
  }
}

analyzeSEOTrend();
