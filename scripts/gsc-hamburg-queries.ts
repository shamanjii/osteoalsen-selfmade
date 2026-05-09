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

const HAMBURG_TERMS = [
  'hamburg', 'rotherbaum', 'eimsbüttel', 'eimsbuettel',
  'eppendorf', 'altona', 'harvestehude', 'hoheluft',
  'winterhude', 'st. pauli', 'st pauli', 'hh '
];

async function run() {
  const today = new Date();
  const end = new Date(today);
  end.setDate(end.getDate() - 1);
  const start = new Date(today);
  start.setDate(start.getDate() - 30);

  const fmt = (d: Date) => d.toISOString().split('T')[0];

  console.log('='.repeat(80));
  console.log('HAMBURG-LOCAL-QUERY-ANALYSE (30 Tage)');
  console.log(`Zeitraum: ${fmt(start)} bis ${fmt(end)}`);
  console.log('='.repeat(80));

  // All queries
  const all = await searchconsole.searchanalytics.query({
    siteUrl: 'https://www.osteoalsen.de',
    requestBody: {
      startDate: fmt(start),
      endDate: fmt(end),
      dimensions: ['query'],
      rowLimit: 5000,
    },
  });

  const rows = all.data.rows || [];

  const hamburgRows = rows.filter((r) => {
    const q = (r.keys?.[0] || '').toLowerCase();
    return HAMBURG_TERMS.some((t) => q.includes(t));
  });

  const totalClicks = rows.reduce((s, r) => s + (r.clicks || 0), 0);
  const totalImps = rows.reduce((s, r) => s + (r.impressions || 0), 0);
  const hamClicks = hamburgRows.reduce((s, r) => s + (r.clicks || 0), 0);
  const hamImps = hamburgRows.reduce((s, r) => s + (r.impressions || 0), 0);

  console.log('\nGESAMT (alle Queries)');
  console.log(`  Clicks:      ${totalClicks}`);
  console.log(`  Impressions: ${totalImps}`);
  console.log(`  Queries:     ${rows.length}`);

  console.log('\nHAMBURG-QUERIES (Hamburg + Stadtteile)');
  console.log(`  Clicks:      ${hamClicks} (${((hamClicks / totalClicks) * 100).toFixed(2)}% der gesamten Clicks)`);
  console.log(`  Impressions: ${hamImps} (${((hamImps / totalImps) * 100).toFixed(2)}% der gesamten Impressions)`);
  console.log(`  Queries:     ${hamburgRows.length}`);

  console.log('\nTOP 30 HAMBURG-QUERIES');
  console.log('-'.repeat(80));
  hamburgRows
    .sort((a, b) => (b.impressions || 0) - (a.impressions || 0))
    .slice(0, 30)
    .forEach((r, i) => {
      const q = r.keys?.[0];
      const c = r.clicks || 0;
      const imp = r.impressions || 0;
      const ctr = imp > 0 ? ((c / imp) * 100).toFixed(2) : '0.00';
      const pos = (r.position || 0).toFixed(1);
      console.log(`${(i + 1).toString().padStart(2)}. "${q}"`);
      console.log(`    Pos: ${pos} | Clicks: ${c} | Imps: ${imp} | CTR: ${ctr}%`);
    });

  // Pages getting Hamburg traffic
  console.log('\n\nHAMBURG-IMPRESSIONS NACH SEITE');
  console.log('-'.repeat(80));
  const pageMap = new Map<string, { clicks: number; imps: number; queries: number }>();
  for (const r of hamburgRows) {
    // Need a per-page query
  }

  // Page x query breakdown
  const pageQuery = await searchconsole.searchanalytics.query({
    siteUrl: 'https://www.osteoalsen.de',
    requestBody: {
      startDate: fmt(start),
      endDate: fmt(end),
      dimensions: ['page', 'query'],
      rowLimit: 25000,
    },
  });

  const pqRows = pageQuery.data.rows || [];
  const pageAgg = new Map<string, { clicks: number; imps: number; topQueries: Array<{ q: string; c: number; i: number }> }>();
  for (const r of pqRows) {
    const q = (r.keys?.[1] || '').toLowerCase();
    if (!HAMBURG_TERMS.some((t) => q.includes(t))) continue;
    const page = r.keys?.[0] || '';
    const cur = pageAgg.get(page) || { clicks: 0, imps: 0, topQueries: [] };
    cur.clicks += r.clicks || 0;
    cur.imps += r.impressions || 0;
    cur.topQueries.push({ q: r.keys?.[1] || '', c: r.clicks || 0, i: r.impressions || 0 });
    pageAgg.set(page, cur);
  }

  const sortedPages = [...pageAgg.entries()].sort((a, b) => b[1].imps - a[1].imps).slice(0, 15);
  for (const [page, data] of sortedPages) {
    console.log(`\n${page}`);
    console.log(`  Clicks: ${data.clicks} | Imps: ${data.imps}`);
    const top = data.topQueries.sort((a, b) => b.i - a.i).slice(0, 3);
    top.forEach((t) => console.log(`    - "${t.q}" (Clicks: ${t.c}, Imps: ${t.i})`));
  }

  console.log('\n' + '='.repeat(80));
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
