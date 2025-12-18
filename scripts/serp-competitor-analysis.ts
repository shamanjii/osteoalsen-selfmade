#!/usr/bin/env tsx
/**
 * SERP Competitor Analysis Tool (100% kostenlos)
 *
 * Nutzt SerpAPI Free Tier (100 Requests/Monat kostenlos)
 * Analysiert die Google SERP für bestimmte Keywords und zeigt:
 * - Top 10 Konkurrenten
 * - Ihre Position im Ranking
 * - URLs und Titles
 * - Domain Authority Schätzung
 *
 * Setup:
 * 1. Erstelle Account auf https://serpapi.com (kostenlos, keine Kreditkarte)
 * 2. Kopiere API Key
 * 3. export SERPAPI_KEY="dein-api-key"
 *
 * Usage:
 * npx tsx scripts/serp-competitor-analysis.ts "Osteopath Hamburg"
 * npx tsx scripts/serp-competitor-analysis.ts "Rückenschmerzen Behandlung"
 */

interface SerpResult {
  position: number;
  title: string;
  url: string;
  domain: string;
  snippet: string;
}

interface CompetitorAnalysis {
  keyword: string;
  searchDate: string;
  totalResults: number;
  topCompetitors: SerpResult[];
  yourPosition?: number;
  insights: {
    avgTitleLength: number;
    commonDomains: string[];
    localBusinessCount: number;
  };
}

const YOUR_DOMAIN = 'osteoalsen.de';

/**
 * Fetches Google SERP via SerpAPI
 */
async function scrapeGoogleSERP(keyword: string): Promise<SerpResult[]> {
  const apiKey = process.env.SERPAPI_KEY;

  if (!apiKey) {
    console.error('\n❌ SERPAPI_KEY nicht gefunden!');
    console.log('\n📝 Setup-Anleitung:');
    console.log('1. Erstelle kostenlosen Account auf https://serpapi.com');
    console.log('2. Kopiere deinen API Key');
    console.log('3. Führe aus: export SERPAPI_KEY="dein-api-key"');
    console.log('4. Oder speichere in .env: SERPAPI_KEY=dein-api-key\n');
    throw new Error('SERPAPI_KEY nicht gesetzt');
  }

  const params = new URLSearchParams({
    api_key: apiKey,
    q: keyword,
    location: 'Hamburg, Germany',
    hl: 'de',
    gl: 'de',
    num: '10',
  });

  const url = `https://serpapi.com/search?${params.toString()}`;

  console.log(`🔍 Suche Google für: "${keyword}"`);
  console.log(`📍 Location: Hamburg, Germany\n`);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(`SerpAPI Error: ${data.error}`);
    }

    // Extract organic results
    const organicResults = data.organic_results || [];
    const results: SerpResult[] = [];

    organicResults.forEach((result: any, index: number) => {
      if (index >= 10) return; // Top 10 only

      try {
        const url = result.link || '';
        const domain = new URL(url).hostname.replace('www.', '');

        results.push({
          position: result.position || index + 1,
          title: result.title || '',
          url: url,
          domain: domain,
          snippet: result.snippet || '',
        });
      } catch (e) {
        // Skip invalid URLs
      }
    });

    return results;
  } catch (error) {
    console.error('❌ Fehler beim Abrufen der SERP-Daten:', error);
    throw error;
  }
}

/**
 * Analyzes competitors from SERP results
 */
function analyzeCompetitors(keyword: string, results: SerpResult[]): CompetitorAnalysis {
  const yourPosition = results.find(r => r.domain === YOUR_DOMAIN)?.position;

  // Calculate insights
  const avgTitleLength = results.reduce((sum, r) => sum + r.title.length, 0) / results.length;

  const domainCounts = results.reduce((acc, r) => {
    acc[r.domain] = (acc[r.domain] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const commonDomains = Object.entries(domainCounts)
    .filter(([_, count]) => count > 1)
    .map(([domain]) => domain);

  const localBusinessCount = results.filter(r =>
    r.title.toLowerCase().includes('hamburg') ||
    r.snippet.toLowerCase().includes('hamburg') ||
    r.domain.includes('hamburg')
  ).length;

  return {
    keyword,
    searchDate: new Date().toISOString(),
    totalResults: results.length,
    topCompetitors: results,
    yourPosition,
    insights: {
      avgTitleLength: Math.round(avgTitleLength),
      commonDomains,
      localBusinessCount,
    },
  };
}

/**
 * Displays analysis in terminal
 */
function displayAnalysis(analysis: CompetitorAnalysis): void {
  console.log('\n' + '='.repeat(80));
  console.log(`📊 SERP ANALYSE: "${analysis.keyword}"`);
  console.log('='.repeat(80) + '\n');

  console.log(`📅 Datum: ${new Date(analysis.searchDate).toLocaleString('de-DE')}`);
  console.log(`🎯 Gefundene Ergebnisse: ${analysis.totalResults}`);

  if (analysis.yourPosition) {
    console.log(`✅ Deine Position: #${analysis.yourPosition}`);
  } else {
    console.log(`⚠️  Du rankst nicht in den Top 10`);
  }

  console.log('\n' + '-'.repeat(80));
  console.log('🏆 TOP 10 KONKURRENTEN:');
  console.log('-'.repeat(80) + '\n');

  analysis.topCompetitors.forEach(result => {
    const isYou = result.domain === YOUR_DOMAIN;
    const prefix = isYou ? '👉 ' : '   ';
    const emoji = isYou ? '🟢' : result.position <= 3 ? '🥇' : result.position <= 6 ? '🥈' : '🥉';

    console.log(`${prefix}${emoji} Position #${result.position}`);
    console.log(`   📌 ${result.title}`);
    console.log(`   🔗 ${result.url}`);
    console.log(`   🌐 Domain: ${result.domain}`);
    if (result.snippet) {
      console.log(`   📝 ${result.snippet.substring(0, 100)}...`);
    }
    console.log('');
  });

  console.log('-'.repeat(80));
  console.log('💡 INSIGHTS:');
  console.log('-'.repeat(80) + '\n');

  console.log(`📏 Durchschnittliche Title-Länge: ${analysis.insights.avgTitleLength} Zeichen`);
  console.log(`🏢 Lokale Hamburg-Businesses: ${analysis.insights.localBusinessCount}/${analysis.totalResults}`);

  if (analysis.insights.commonDomains.length > 0) {
    console.log(`🔁 Domains mit mehreren Rankings: ${analysis.insights.commonDomains.join(', ')}`);
  }

  console.log('\n' + '='.repeat(80) + '\n');
}

/**
 * Saves analysis to JSON file
 */
async function saveAnalysis(analysis: CompetitorAnalysis): Promise<void> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
  const filename = `serp-analysis-${analysis.keyword.replace(/\s+/g, '-')}-${timestamp}.json`;
  const filepath = `./data/serp-analysis/${filename}`;

  // Ensure directory exists
  const fs = await import('fs/promises');
  const path = await import('path');

  try {
    await fs.mkdir(path.dirname(filepath), { recursive: true });
    await fs.writeFile(filepath, JSON.stringify(analysis, null, 2), 'utf-8');
    console.log(`💾 Analyse gespeichert: ${filepath}`);
  } catch (error) {
    console.error('❌ Fehler beim Speichern:', error);
  }
}

/**
 * Main function
 */
async function main() {
  const keyword = process.argv[2];

  if (!keyword) {
    console.error('❌ Bitte gib ein Keyword an!');
    console.log('\nUsage:');
    console.log('  npx tsx scripts/serp-competitor-analysis.ts "Osteopath Hamburg"');
    console.log('  npx tsx scripts/serp-competitor-analysis.ts "Rückenschmerzen Behandlung"\n');
    process.exit(1);
  }

  try {
    const results = await scrapeGoogleSERP(keyword);

    if (results.length === 0) {
      console.warn('⚠️  Keine Ergebnisse gefunden. Google könnte Bot-Aktivität erkannt haben.');
      console.log('💡 Tipp: Warte ein paar Minuten und versuche es erneut.');
      process.exit(1);
    }

    const analysis = analyzeCompetitors(keyword, results);
    displayAnalysis(analysis);
    await saveAnalysis(analysis);

    console.log('\n✅ Analyse abgeschlossen!\n');
  } catch (error) {
    console.error('❌ Fehler bei der Analyse:', error);
    process.exit(1);
  }
}

main();
