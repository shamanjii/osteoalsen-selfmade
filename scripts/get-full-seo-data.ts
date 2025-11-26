#!/usr/bin/env ts-node
/**
 * Get Full SEO Data for Analysis
 */

import {
  getTopKeywords,
  getKeywordsByPage,
  getSiteSummary
} from '../src/lib/google-search-console';

async function getFullSEOData() {
  console.log('🔍 Fetching comprehensive SEO data...\n');

  try {
    // Site Summary
    const summary = await getSiteSummary(30);
    console.log('📊 SITE SUMMARY (Last 30 days)');
    console.log('═'.repeat(60));
    console.log(`Total Clicks:        ${summary.totalClicks}`);
    console.log(`Total Impressions:   ${summary.totalImpressions.toLocaleString()}`);
    console.log(`Average CTR:         ${(summary.averageCTR * 100).toFixed(2)}%`);
    console.log(`Average Position:    ${summary.averagePosition.toFixed(1)}`);
    console.log(`Period:              ${summary.period.startDate} to ${summary.period.endDate}`);
    console.log('');

    // Top Keywords
    const topKeywords = await getTopKeywords(30, 100);
    console.log(`\n📈 TOP 50 KEYWORDS BY IMPRESSIONS`);
    console.log('═'.repeat(60));
    console.log('Rank | Keyword                          | Pos   | Clicks | Impr   | CTR%');
    console.log('─'.repeat(60));

    topKeywords.slice(0, 50).forEach((kw, idx) => {
      const keyword = kw.keyword.padEnd(32).substring(0, 32);
      const position = kw.position.toFixed(1).padStart(5);
      const clicks = kw.clicks.toString().padStart(6);
      const impressions = kw.impressions.toString().padStart(6);
      const ctr = (kw.ctr * 100).toFixed(1).padStart(4);

      console.log(`${(idx + 1).toString().padStart(4)} | ${keyword} | ${position} | ${clicks} | ${impressions} | ${ctr}`);
    });

    // Keywords by Performance Category
    console.log('\n\n🎯 KEYWORD PERFORMANCE CATEGORIES');
    console.log('═'.repeat(60));

    const top10 = topKeywords.filter(k => k.position <= 10);
    const top20 = topKeywords.filter(k => k.position > 10 && k.position <= 20);
    const top50 = topKeywords.filter(k => k.position > 20 && k.position <= 50);
    const beyond50 = topKeywords.filter(k => k.position > 50);

    console.log(`\nTop 10 Positions:    ${top10.length} keywords`);
    console.log(`Positions 11-20:     ${top20.length} keywords`);
    console.log(`Positions 21-50:     ${top50.length} keywords`);
    console.log(`Beyond Position 50:  ${beyond50.length} keywords`);

    // High-Value Keywords (Top 10)
    if (top10.length > 0) {
      console.log('\n\n⭐ HIGH-VALUE KEYWORDS (Position 1-10)');
      console.log('═'.repeat(60));
      top10.forEach(kw => {
        console.log(`  Position ${kw.position.toFixed(1)}: "${kw.keyword}"`);
        console.log(`    Clicks: ${kw.clicks} | Impressions: ${kw.impressions} | CTR: ${(kw.ctr * 100).toFixed(2)}%`);
      });
    }

    // Near-Win Keywords (Position 11-20)
    if (top20.length > 0) {
      console.log('\n\n🎯 NEAR-WIN KEYWORDS (Position 11-20) - OPTIMIZATION PRIORITY');
      console.log('═'.repeat(60));
      top20.slice(0, 10).forEach(kw => {
        console.log(`  Position ${kw.position.toFixed(1)}: "${kw.keyword}"`);
        console.log(`    Clicks: ${kw.clicks} | Impressions: ${kw.impressions} | CTR: ${(kw.ctr * 100).toFixed(2)}%`);
      });
    }

    // CTR Analysis
    console.log('\n\n📊 CTR ANALYSIS');
    console.log('═'.repeat(60));
    const highCTR = topKeywords.filter(k => k.ctr > 0.05 && k.impressions > 10);
    const lowCTR = topKeywords.filter(k => k.ctr < 0.01 && k.impressions > 50 && k.position < 20);

    console.log(`High CTR Keywords (>5%):         ${highCTR.length}`);
    console.log(`Low CTR Keywords (<1%, Pos<20):  ${lowCTR.length} - NEEDS META OPTIMIZATION`);

    if (lowCTR.length > 0) {
      console.log('\n  Low CTR Keywords to Optimize:');
      lowCTR.slice(0, 5).forEach(kw => {
        console.log(`    "${kw.keyword}" - Pos ${kw.position.toFixed(1)} | CTR: ${(kw.ctr * 100).toFixed(2)}%`);
      });
    }

    // Keywords by Page
    console.log('\n\n📄 PERFORMANCE BY PAGE');
    console.log('═'.repeat(60));
    const keywordsByPage = await getKeywordsByPage(30, 100);

    const pagePerformance = new Map<string, { clicks: number; impressions: number; keywords: number }>();

    keywordsByPage.forEach(kw => {
      const existing = pagePerformance.get(kw.page) || { clicks: 0, impressions: 0, keywords: 0 };
      existing.clicks += kw.clicks;
      existing.impressions += kw.impressions;
      existing.keywords += 1;
      pagePerformance.set(kw.page, existing);
    });

    const sortedPages = Array.from(pagePerformance.entries())
      .sort((a, b) => b[1].impressions - a[1].impressions)
      .slice(0, 15);

    sortedPages.forEach(([page, stats]) => {
      const url = page.replace('https://www.osteoalsen.de', '');
      console.log(`\n  ${url || '/'}`);
      console.log(`    Keywords: ${stats.keywords} | Clicks: ${stats.clicks} | Impressions: ${stats.impressions}`);
    });

    console.log('\n\n✅ Data collection completed!');

  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  getFullSEOData()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

export { getFullSEOData };
