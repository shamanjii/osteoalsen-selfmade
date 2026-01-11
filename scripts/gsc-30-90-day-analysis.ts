import { config } from 'dotenv';
import { getTopKeywords, fetchSearchAnalytics } from '../src/lib/google-search-console';

config();

async function comprehensiveAnalysis() {
  const today = new Date();
  
  const endDate = new Date(today);
  endDate.setDate(endDate.getDate() - 1);
  const endDateStr = endDate.toISOString().split('T')[0];
  
  const start7 = new Date(today);
  start7.setDate(start7.getDate() - 7);
  const start7Str = start7.toISOString().split('T')[0];
  
  const start30 = new Date(today);
  start30.setDate(start30.getDate() - 30);
  const start30Str = start30.toISOString().split('T')[0];
  
  const start90 = new Date(today);
  start90.setDate(start90.getDate() - 90);
  const start90Str = start90.toISOString().split('T')[0];

  console.log('='.repeat(80));
  console.log('GOOGLE SEARCH CONSOLE COMPREHENSIVE ANALYSIS - osteoalsen.de');
  console.log('Generated:', new Date().toISOString().split('T')[0]);
  console.log('='.repeat(80));

  try {
    // 7-DAY OVERVIEW
    console.log('\n7-DAY OVERVIEW (' + start7Str + ' to ' + endDateStr + ')');
    console.log('-'.repeat(80));
    
    const data7 = await fetchSearchAnalytics(start7Str, endDateStr, ['date'], 1000);
    
    if (data7.rows) {
      const clicks7 = data7.rows.reduce((sum, row) => sum + (row.clicks || 0), 0);
      const imps7 = data7.rows.reduce((sum, row) => sum + (row.impressions || 0), 0);
      const ctr7 = imps7 > 0 ? (clicks7 / imps7) * 100 : 0;
      const pos7 = data7.rows.reduce((sum, row) => sum + (row.position || 0), 0) / data7.rows.length;
      
      console.log('Total Clicks:       ' + clicks7);
      console.log('Total Impressions:  ' + imps7);
      console.log('Average CTR:        ' + ctr7.toFixed(2) + '%');
      console.log('Average Position:   ' + pos7.toFixed(2));
      console.log('Clicks per day:     ' + (clicks7/7).toFixed(1));
    }

    // 30-DAY OVERVIEW
    console.log('\n30-DAY OVERVIEW (' + start30Str + ' to ' + endDateStr + ')');
    console.log('-'.repeat(80));
    
    const data30 = await fetchSearchAnalytics(start30Str, endDateStr, ['date'], 1000);
    
    if (data30.rows) {
      const clicks30 = data30.rows.reduce((sum, row) => sum + (row.clicks || 0), 0);
      const imps30 = data30.rows.reduce((sum, row) => sum + (row.impressions || 0), 0);
      const ctr30 = imps30 > 0 ? (clicks30 / imps30) * 100 : 0;
      const pos30 = data30.rows.reduce((sum, row) => sum + (row.position || 0), 0) / data30.rows.length;
      
      console.log('Total Clicks:       ' + clicks30);
      console.log('Total Impressions:  ' + imps30);
      console.log('Average CTR:        ' + ctr30.toFixed(2) + '%');
      console.log('Average Position:   ' + pos30.toFixed(2));
      console.log('Clicks per day:     ' + (clicks30/30).toFixed(1));
    }

    // 90-DAY OVERVIEW
    console.log('\n90-DAY OVERVIEW (' + start90Str + ' to ' + endDateStr + ')');
    console.log('-'.repeat(80));
    
    const data90 = await fetchSearchAnalytics(start90Str, endDateStr, ['date'], 1000);
    
    if (data90.rows) {
      const clicks90 = data90.rows.reduce((sum, row) => sum + (row.clicks || 0), 0);
      const imps90 = data90.rows.reduce((sum, row) => sum + (row.impressions || 0), 0);
      const ctr90 = imps90 > 0 ? (clicks90 / imps90) * 100 : 0;
      const pos90 = data90.rows.reduce((sum, row) => sum + (row.position || 0), 0) / data90.rows.length;
      
      console.log('Total Clicks:       ' + clicks90);
      console.log('Total Impressions:  ' + imps90);
      console.log('Average CTR:        ' + ctr90.toFixed(2) + '%');
      console.log('Average Position:   ' + pos90.toFixed(2));
      console.log('Clicks per day:     ' + (clicks90/90).toFixed(1));
    }

    // TREND COMPARISON
    console.log('\n\nTREND ANALYSIS');
    console.log('='.repeat(80));
    
    if (data7.rows && data30.rows) {
      const clicks7 = data7.rows.reduce((sum, row) => sum + (row.clicks || 0), 0);
      const clicks30 = data30.rows.reduce((sum, row) => sum + (row.clicks || 0), 0);
      const avgClicksPerDay7 = clicks7 / 7;
      const avgClicksPerDay30 = clicks30 / 30;
      const clickTrend = avgClicksPerDay30 > 0 ? ((avgClicksPerDay7 - avgClicksPerDay30) / avgClicksPerDay30) * 100 : 0;
      
      const imps7 = data7.rows.reduce((sum, row) => sum + (row.impressions || 0), 0);
      const imps30 = data30.rows.reduce((sum, row) => sum + (row.impressions || 0), 0);
      const avgImpPerDay7 = imps7 / 7;
      const avgImpPerDay30 = imps30 / 30;
      const impTrend = avgImpPerDay30 > 0 ? ((avgImpPerDay7 - avgImpPerDay30) / avgImpPerDay30) * 100 : 0;
      
      console.log('7-Day vs 30-Day Average Comparison:');
      console.log('  Clicks/Day:       7d avg: ' + avgClicksPerDay7.toFixed(1) + ' | 30d avg: ' + avgClicksPerDay30.toFixed(1) + ' | Trend: ' + (clickTrend >= 0 ? '+' : '') + clickTrend.toFixed(1) + '%');
      console.log('  Impressions/Day:  7d avg: ' + avgImpPerDay7.toFixed(0) + ' | 30d avg: ' + avgImpPerDay30.toFixed(0) + ' | Trend: ' + (impTrend >= 0 ? '+' : '') + impTrend.toFixed(1) + '%');
    }

    // TOP QUERIES (30 days)
    console.log('\n\nTOP 30 QUERIES (30 DAYS)');
    console.log('='.repeat(80));
    
    const queries30 = await getTopKeywords(30, 100);
    const topQueries = queries30.filter(k => k.clicks > 0).slice(0, 30);
    
    topQueries.forEach((kw, i) => {
      console.log((i + 1) + '. "' + kw.keyword + '"');
      console.log('   Position: ' + kw.position.toFixed(1) + ' | Clicks: ' + kw.clicks + ' | Impressions: ' + kw.impressions + ' | CTR: ' + (kw.ctr * 100).toFixed(2) + '%');
    });

    // TOP PAGES (30 days)
    console.log('\n\nTOP 20 PAGES (30 DAYS)');
    console.log('='.repeat(80));
    
    const pages30 = await fetchSearchAnalytics(start30Str, endDateStr, ['page'], 100);
    
    if (pages30.rows) {
      const topPages = pages30.rows.filter(r => r.clicks && r.clicks > 0).slice(0, 20);
      topPages.forEach((row, i) => {
        const url = row.keys?.[0] || '';
        const path = url.replace('https://www.osteoalsen.de', '') || '/';
        console.log((i + 1) + '. ' + path);
        console.log('   Clicks: ' + (row.clicks || 0) + ' | Impressions: ' + (row.impressions || 0) + ' | Position: ' + (row.position || 0).toFixed(1) + ' | CTR: ' + ((row.ctr || 0) * 100).toFixed(2) + '%');
      });
    }

    // DEVICE BREAKDOWN (30 days)
    console.log('\n\nDEVICE BREAKDOWN (30 DAYS)');
    console.log('='.repeat(80));
    
    const devices = await fetchSearchAnalytics(start30Str, endDateStr, ['device'], 10);
    
    if (devices.rows) {
      devices.rows.forEach((row) => {
        const device = row.keys?.[0] || 'Unknown';
        console.log(device + ':');
        console.log('   Clicks: ' + (row.clicks || 0) + ' | Impressions: ' + (row.impressions || 0) + ' | Position: ' + (row.position || 0).toFixed(1) + ' | CTR: ' + ((row.ctr || 0) * 100).toFixed(2) + '%');
      });
    }

    // COUNTRY BREAKDOWN (30 days)
    console.log('\n\nCOUNTRY BREAKDOWN (30 DAYS)');
    console.log('='.repeat(80));
    
    const countries = await fetchSearchAnalytics(start30Str, endDateStr, ['country'], 10);
    
    if (countries.rows) {
      countries.rows.slice(0, 10).forEach((row) => {
        const country = row.keys?.[0] || 'Unknown';
        console.log(country.toUpperCase() + ':');
        console.log('   Clicks: ' + (row.clicks || 0) + ' | Impressions: ' + (row.impressions || 0) + ' | Position: ' + (row.position || 0).toFixed(1) + ' | CTR: ' + ((row.ctr || 0) * 100).toFixed(2) + '%');
      });
    }

    console.log('\n' + '='.repeat(80));
    console.log('ANALYSIS COMPLETE');
    console.log('='.repeat(80));

  } catch (error) {
    console.error('Error during analysis:', error);
    throw error;
  }
}

comprehensiveAnalysis();
