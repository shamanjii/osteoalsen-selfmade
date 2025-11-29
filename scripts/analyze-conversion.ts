import { config } from 'dotenv';
import { getTopKeywords, getKeywordsByPage } from '@/lib/google-search-console';

config();

async function analyzeConversion() {
  console.log('🔍 Conversion-Analyse: Warum keine Buchungen?\n');
  console.log('='.repeat(70));

  try {
    // 1. Welche Seiten bekommen Traffic?
    console.log('\n📄 Top-Seiten mit Traffic (letzte 30 Tage):\n');
    const pageData = await getKeywordsByPage(30, 50);

    const pageStats: Record<string, { clicks: number; impressions: number; keywords: number }> = {};

    for (const [page, keywords] of Object.entries(pageData)) {
      const clicks = keywords.reduce((sum, kw) => sum + kw.clicks, 0);
      const impressions = keywords.reduce((sum, kw) => sum + kw.impressions, 0);

      pageStats[page] = {
        clicks,
        impressions,
        keywords: keywords.length
      };
    }

    // Sort by clicks
    const sortedPages = Object.entries(pageStats)
      .sort(([, a], [, b]) => b.clicks - a.clicks)
      .slice(0, 10);

    sortedPages.forEach(([page, stats], index) => {
      const url = new URL(page);
      console.log(`${index + 1}. ${url.pathname}`);
      console.log(`   ${stats.clicks} Clicks | ${stats.impressions} Impressions | ${stats.keywords} Keywords`);
      console.log('');
    });

    console.log('='.repeat(70));
    console.log('\n🎯 Conversion-Intent-Analyse:\n');

    // 2. Intent-Analyse der Keywords
    const allKeywords = await getTopKeywords(30, 100);

    const intentCategories = {
      branded: [] as typeof allKeywords,
      informational: [] as typeof allKeywords,
      commercial: [] as typeof allKeywords,
      transactional: [] as typeof allKeywords
    };

    allKeywords.forEach(kw => {
      const query = kw.keyword.toLowerCase();

      // Branded (looking specifically for you)
      if (query.includes('joshua') || query.includes('alsen') || query.includes('osteoalsen')) {
        intentCategories.branded.push(kw);
      }
      // Transactional (ready to book)
      else if (
        query.includes('termin') ||
        query.includes('buchen') ||
        query.includes('praxis') ||
        query.includes('osteopath hamburg rotherbaum') ||
        query.includes('osteopath hamburg eimsbüttel')
      ) {
        intentCategories.transactional.push(kw);
      }
      // Commercial (comparing options)
      else if (
        query.includes('osteopath hamburg') ||
        query.includes('kosten') ||
        query.includes('erfahrung') ||
        query.includes('bewertung')
      ) {
        intentCategories.commercial.push(kw);
      }
      // Informational (just learning)
      else {
        intentCategories.informational.push(kw);
      }
    });

    console.log('📊 Traffic nach Intent:\n');

    const brandedClicks = intentCategories.branded.reduce((sum, kw) => sum + kw.clicks, 0);
    const transactionalClicks = intentCategories.transactional.reduce((sum, kw) => sum + kw.clicks, 0);
    const commercialClicks = intentCategories.commercial.reduce((sum, kw) => sum + kw.clicks, 0);
    const informationalClicks = intentCategories.informational.reduce((sum, kw) => sum + kw.clicks, 0);

    console.log(`🎯 Branded (suchen gezielt dich): ${brandedClicks} Clicks`);
    console.log(`   Keywords: ${intentCategories.branded.map(k => `"${k.keyword}"`).join(', ') || 'Keine'}\n`);

    console.log(`💰 Transactional (buchungsbereit): ${transactionalClicks} Clicks`);
    console.log(`   Keywords: ${intentCategories.transactional.map(k => `"${k.keyword}"`).join(', ') || 'Keine'}\n`);

    console.log(`🔍 Commercial (vergleichen): ${commercialClicks} Clicks`);
    console.log(`   Top 3: ${intentCategories.commercial.slice(0, 3).map(k => `"${k.keyword}"`).join(', ')}\n`);

    console.log(`📚 Informational (lernen): ${informationalClicks} Clicks`);
    console.log(`   Top 3: ${intentCategories.informational.slice(0, 3).map(k => `"${k.keyword}"`).join(', ')}\n`);

    console.log('='.repeat(70));
    console.log('\n💡 Diagnose:\n');

    const totalClicks = brandedClicks + transactionalClicks + commercialClicks + informationalClicks;
    const conversionReadyClicks = brandedClicks + transactionalClicks;

    const conversionReadyPercent = (conversionReadyClicks / totalClicks) * 100;

    console.log(`Von ${totalClicks} Clicks sind nur ${conversionReadyClicks} (${conversionReadyPercent.toFixed(1)}%) buchungsbereit.\n`);

    if (conversionReadyPercent < 30) {
      console.log('⚠️ PROBLEM IDENTIFIZIERT:');
      console.log('   → Du bekommst hauptsächlich "Research-Traffic"');
      console.log('   → Wenige Leute, die JETZT einen Termin wollen');
      console.log('   → Das erklärt die fehlenden Buchungen!\n');

      console.log('✅ LÖSUNG:');
      console.log('   1. Fokus auf LOCAL SEO (nicht allgemeine Blog-Artikel)');
      console.log('   2. Google My Business optimieren');
      console.log('   3. Lokale Verzeichnisse (Jameda, etc.)');
      console.log('   4. Google Ads für "osteopath hamburg" (schneller als SEO)');
      console.log('   5. Conversion-Optimierung auf der Seite');
    } else {
      console.log('✅ Traffic-Intent ist OK');
      console.log('⚠️ PROBLEM: Conversion-Optimierung auf der Website');
      console.log('   → CTA nicht stark genug?');
      console.log('   → Buchungsprozess zu kompliziert?');
      console.log('   → Trust-Signale fehlen?');
    }

  } catch (error) {
    console.error('❌ Fehler:', error);
  }
}

analyzeConversion();
