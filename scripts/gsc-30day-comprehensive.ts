import { config } from 'dotenv';
import { google } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';

config();

const credPath = path.join(process.cwd(), 'credentials', 'google-search-console.json');
const credentials = JSON.parse(fs.readFileSync(credPath, 'utf-8'));

const auth = new google.auth.JWT({
  email: credentials.client_email,
  key: credentials.private_key,
  scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
});

const searchconsole = google.searchconsole({ version: 'v1', auth });

async function getComprehensiveData() {
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
  console.log('GOOGLE SEARCH CONSOLE COMPREHENSIVE ANALYSIS');
  console.log('osteoalsen.de');
  console.log('Generated:', new Date().toISOString().split('T')[0]);
  console.log('='.repeat(80));

  // 7-DAY OVERVIEW
  console.log('\n7-DAY OVERVIEW (' + start7Str + ' to ' + endDateStr + ')');
  console.log('-'.repeat(80));
  
  const data7 = await searchconsole.searchanalytics.query({
    siteUrl: 'https://www.osteoalsen.de',
    requestBody: {
      startDate: start7Str,
      endDate: endDateStr,
      dimensions: ['date'],
      rowLimit: 1000
    }
  });

  if (data7.data.rows) {
    const clicks7 = data7.data.rows.reduce((sum, row) => sum + (row.clicks || 0), 0);
    const imps7 = data7.data.rows.reduce((sum, row) => sum + (row.impressions || 0), 0);
    const ctr7 = imps7 > 0 ? (clicks7 / imps7) * 100 : 0;
    const pos7 = data7.data.rows.reduce((sum, row) => sum + (row.position || 0), 0) / data7.data.rows.length;
    
    console.log('Total Clicks:       ' + clicks7);
    console.log('Total Impressions:  ' + imps7);
    console.log('Average CTR:        ' + ctr7.toFixed(2) + '%');
    console.log('Average Position:   ' + pos7.toFixed(2));
    console.log('Clicks per day:     ' + (clicks7/7).toFixed(1));
  }

  // 30-DAY OVERVIEW
  console.log('\n30-DAY OVERVIEW (' + start30Str + ' to ' + endDateStr + ')');
  console.log('-'.repeat(80));
  
  const data30 = await searchconsole.searchanalytics.query({
    siteUrl: 'https://www.osteoalsen.de',
    requestBody: {
      startDate: start30Str,
      endDate: endDateStr,
      dimensions: ['date'],
      rowLimit: 1000
    }
  });

  if (data30.data.rows) {
    const clicks30 = data30.data.rows.reduce((sum, row) => sum + (row.clicks || 0), 0);
    const imps30 = data30.data.rows.reduce((sum, row) => sum + (row.impressions || 0), 0);
    const ctr30 = imps30 > 0 ? (clicks30 / imps30) * 100 : 0;
    const pos30 = data30.data.rows.reduce((sum, row) => sum + (row.position || 0), 0) / data30.data.rows.length;
    
    console.log('Total Clicks:       ' + clicks30);
    console.log('Total Impressions:  ' + imps30);
    console.log('Average CTR:        ' + ctr30.toFixed(2) + '%');
    console.log('Average Position:   ' + pos30.toFixed(2));
    console.log('Clicks per day:     ' + (clicks30/30).toFixed(1));
  }

  // 90-DAY OVERVIEW
  console.log('\n90-DAY OVERVIEW (' + start90Str + ' to ' + endDateStr + ')');
  console.log('-'.repeat(80));
  
  const data90 = await searchconsole.searchanalytics.query({
    siteUrl: 'https://www.osteoalsen.de',
    requestBody: {
      startDate: start90Str,
      endDate: endDateStr,
      dimensions: ['date'],
      rowLimit: 1000
    }
  });

  if (data90.data.rows) {
    const clicks90 = data90.data.rows.reduce((sum, row) => sum + (row.clicks || 0), 0);
    const imps90 = data90.data.rows.reduce((sum, row) => sum + (row.impressions || 0), 0);
    const ctr90 = imps90 > 0 ? (clicks90 / imps90) * 100 : 0;
    const pos90 = data90.data.rows.reduce((sum, row) => sum + (row.position || 0), 0) / data90.data.rows.length;
    
    console.log('Total Clicks:       ' + clicks90);
    console.log('Total Impressions:  ' + imps90);
    console.log('Average CTR:        ' + ctr90.toFixed(2) + '%');
    console.log('Average Position:   ' + pos90.toFixed(2));
    console.log('Clicks per day:     ' + (clicks90/90).toFixed(1));
  }

  // TOP QUERIES (30 days)
  console.log('\n\nTOP 30 QUERIES (30 DAYS)');
  console.log('='.repeat(80));
  
  const queries30 = await searchconsole.searchanalytics.query({
    siteUrl: 'https://www.osteoalsen.de',
    requestBody: {
      startDate: start30Str,
      endDate: endDateStr,
      dimensions: ['query'],
      rowLimit: 100
    }
  });

  if (queries30.data.rows) {
    const topQueries = queries30.data.rows.filter(r => r.clicks && r.clicks > 0).slice(0, 30);
    topQueries.forEach((row, i) => {
      console.log((i + 1) + '. "' + (row.keys?.[0] || '') + '"');
      console.log('   Position: ' + (row.position || 0).toFixed(1) + ' | Clicks: ' + (row.clicks || 0) + ' | Impressions: ' + (row.impressions || 0) + ' | CTR: ' + ((row.ctr || 0) * 100).toFixed(2) + '%');
    });
  }

  // TOP PAGES (30 days)
  console.log('\n\nTOP 20 PAGES (30 DAYS)');
  console.log('='.repeat(80));
  
  const pages30 = await searchconsole.searchanalytics.query({
    siteUrl: 'https://www.osteoalsen.de',
    requestBody: {
      startDate: start30Str,
      endDate: endDateStr,
      dimensions: ['page'],
      rowLimit: 100
    }
  });

  if (pages30.data.rows) {
    const topPages = pages30.data.rows.filter(r => r.clicks && r.clicks > 0).slice(0, 20);
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
  
  const devices = await searchconsole.searchanalytics.query({
    siteUrl: 'https://www.osteoalsen.de',
    requestBody: {
      startDate: start30Str,
      endDate: endDateStr,
      dimensions: ['device'],
      rowLimit: 10
    }
  });

  if (devices.data.rows) {
    devices.data.rows.forEach((row) => {
      const device = row.keys?.[0] || 'Unknown';
      console.log(device + ':');
      console.log('   Clicks: ' + (row.clicks || 0) + ' | Impressions: ' + (row.impressions || 0) + ' | Position: ' + (row.position || 0).toFixed(1) + ' | CTR: ' + ((row.ctr || 0) * 100).toFixed(2) + '%');
    });
  }

  // COUNTRY BREAKDOWN (30 days)
  console.log('\n\nCOUNTRY BREAKDOWN (30 DAYS)');
  console.log('='.repeat(80));
  
  const countries = await searchconsole.searchanalytics.query({
    siteUrl: 'https://www.osteoalsen.de',
    requestBody: {
      startDate: start30Str,
      endDate: endDateStr,
      dimensions: ['country'],
      rowLimit: 10
    }
  });

  if (countries.data.rows) {
    countries.data.rows.slice(0, 10).forEach((row) => {
      const country = row.keys?.[0] || 'Unknown';
      console.log(country.toUpperCase() + ':');
      console.log('   Clicks: ' + (row.clicks || 0) + ' | Impressions: ' + (row.impressions || 0) + ' | Position: ' + (row.position || 0).toFixed(1) + ' | CTR: ' + ((row.ctr || 0) * 100).toFixed(2) + '%');
    });
  }

  console.log('\n' + '='.repeat(80));
  console.log('Analysis complete!');
  console.log('='.repeat(80));
}

getComprehensiveData().catch(console.error);
