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
const siteUrl = 'sc-domain:osteoalsen.de';

interface IndexingIssue {
  url: string;
  coverageState?: string;
  verdict?: string;
  lastCrawlTime?: string;
  indexingState?: string;
  pageFetchState?: string;
  robotsTxtState?: string;
  canonicalUrl?: string;
  userDeclaredCanonical?: string;
  googleCanonical?: string;
}

async function getSitemapUrls(): Promise<string[]> {
  console.log('📋 Abrufen der Sitemap-URLs...\n');

  try {
    const response = await searchconsole.sitemaps.list({
      siteUrl
    });

    console.log('✅ Gefundene Sitemaps:');
    if (response.data.sitemap) {
      response.data.sitemap.forEach((sitemap, i) => {
        console.log(`${i + 1}. ${sitemap.path}`);
        console.log(`   Eingereichte URLs: ${sitemap.contents?.[0]?.submitted || 0}`);
        console.log(`   Indexierte URLs: ${sitemap.contents?.[0]?.indexed || 0}`);
      });
    }

    // Hole die wichtigsten URLs aus der Search Console
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const pageResponse = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['page'],
        rowLimit: 100,
        dataState: 'all'
      }
    });

    const urls = (pageResponse.data.rows || []).map(row => row.keys?.[0] || '').filter(url => url);
    console.log(`\n📊 ${urls.length} URLs aus den letzten 30 Tagen gefunden\n`);

    return urls;
  } catch (error) {
    console.error('❌ Fehler beim Abrufen der Sitemap:', error);
    return [];
  }
}

async function inspectUrl(inspectionUrl: string): Promise<IndexingIssue> {
  try {
    const response = await searchconsole.urlInspection.index.inspect({
      requestBody: {
        inspectionUrl,
        siteUrl
      }
    });

    const result = response.data.inspectionResult;
    const indexStatus = result?.indexStatusResult;

    return {
      url: inspectionUrl,
      coverageState: indexStatus?.coverageState || 'UNKNOWN',
      verdict: indexStatus?.verdict || 'UNKNOWN',
      lastCrawlTime: indexStatus?.lastCrawlTime || 'N/A',
      indexingState: indexStatus?.indexingState || 'N/A',
      pageFetchState: indexStatus?.pageFetchState || 'N/A',
      robotsTxtState: indexStatus?.robotsTxtState || 'N/A',
      canonicalUrl: indexStatus?.googleCanonical || 'N/A',
      userDeclaredCanonical: indexStatus?.userCanonical || 'N/A',
      googleCanonical: indexStatus?.googleCanonical || 'N/A'
    };
  } catch (error: any) {
    return {
      url: inspectionUrl,
      coverageState: 'ERROR',
      verdict: error.message || 'Unknown error'
    };
  }
}

async function checkIndexingStatus() {
  console.log('🔍 GOOGLE SEARCH CONSOLE - INDEXIERUNGSBERICHT\n');
  console.log('='.repeat(80) + '\n');

  const urls = await getSitemapUrls();

  if (urls.length === 0) {
    console.log('❌ Keine URLs zum Überprüfen gefunden.');
    return;
  }

  console.log('🔎 Überprüfe Indexierungsstatus für URLs...\n');

  const issues: IndexingIssue[] = [];
  const indexed: IndexingIssue[] = [];

  // Prüfe bis zu 20 URLs (API-Limit beachten)
  const urlsToCheck = urls.slice(0, 20);

  for (let i = 0; i < urlsToCheck.length; i++) {
    const url = urlsToCheck[i];
    console.log(`[${i + 1}/${urlsToCheck.length}] Prüfe: ${url.replace('https://www.osteoalsen.de', '')}`);

    const result = await inspectUrl(url);

    if (result.coverageState === 'Submitted and indexed' || result.verdict === 'PASS') {
      indexed.push(result);
      console.log(`   ✅ Indexiert`);
    } else {
      issues.push(result);
      console.log(`   ⚠️  ${result.coverageState} - ${result.verdict}`);
    }

    // Rate limiting: Warte kurz zwischen Anfragen
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n' + '='.repeat(80));
  console.log('📊 ZUSAMMENFASSUNG\n');
  console.log(`✅ Indexiert: ${indexed.length}`);
  console.log(`⚠️  Probleme: ${issues.length}\n`);

  if (issues.length > 0) {
    console.log('='.repeat(80));
    console.log('❌ INDEXIERUNGSPROBLEME IM DETAIL:\n');

    issues.forEach((issue, i) => {
      const path = issue.url.replace('https://www.osteoalsen.de', '') || '/';
      console.log(`${i + 1}. ${path}`);
      console.log(`   Status: ${issue.coverageState}`);
      console.log(`   Verdict: ${issue.verdict}`);
      console.log(`   Indexierungsstatus: ${issue.indexingState}`);
      console.log(`   Letzter Crawl: ${issue.lastCrawlTime}`);
      console.log(`   Robots.txt: ${issue.robotsTxtState}`);

      if (issue.userDeclaredCanonical !== issue.googleCanonical) {
        console.log(`   ⚠️  CANONICAL CONFLICT:`);
        console.log(`      User Canonical: ${issue.userDeclaredCanonical}`);
        console.log(`      Google Canonical: ${issue.googleCanonical}`);
      }
      console.log('');
    });
  }

  console.log('='.repeat(80));
  console.log('\n💡 EMPFOHLENE MASSNAHMEN:\n');

  const hasCanonicalIssues = issues.some(i =>
    i.userDeclaredCanonical !== i.googleCanonical &&
    i.userDeclaredCanonical !== 'N/A'
  );

  const hasNoindexIssues = issues.some(i =>
    i.indexingState?.includes('noindex') ||
    i.robotsTxtState?.includes('BLOCKED')
  );

  if (hasCanonicalIssues) {
    console.log('🔧 Canonical-Probleme gefunden:');
    console.log('   - Überprüfe canonical Tags in den betroffenen Seiten');
    console.log('   - Stelle sicher, dass alle canonical URLs konsistent sind');
    console.log('   - Vermeide canonical-Schleifen\n');
  }

  if (hasNoindexIssues) {
    console.log('🔧 Noindex/Robots.txt-Probleme gefunden:');
    console.log('   - Überprüfe robots meta tags in den Seiten');
    console.log('   - Prüfe die robots.txt Datei');
    console.log('   - Stelle sicher, dass wichtige Seiten nicht blockiert sind\n');
  }

  console.log('📖 Weitere Schritte:');
  console.log('   1. Besuche Google Search Console UI für detaillierte Berichte');
  console.log('   2. Prüfe die spezifischen URLs in diesem Bericht');
  console.log('   3. Behebe die identifizierten Probleme');
  console.log('   4. Fordere erneute Indexierung in GSC an\n');
}

checkIndexingStatus().catch(console.error);
