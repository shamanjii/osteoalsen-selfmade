#!/usr/bin/env tsx
/**
 * Keyword Research Tool (100% kostenlos)
 *
 * Kombiniert Google Search Console + Google Trends für:
 * - Keyword-Opportunities finden
 * - Content-Gaps identifizieren
 * - Trending Topics entdecken
 * - Performance-Metriken analysieren
 *
 * Usage:
 * npx tsx scripts/keyword-research.ts
 * npx tsx scripts/keyword-research.ts --topic="Osteopathie"
 * npx tsx scripts/keyword-research.ts --trending
 */

import { google } from 'googleapis';
import path from 'path';
import fs from 'fs/promises';

interface KeywordData {
  keyword: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  trend?: 'rising' | 'stable' | 'falling';
}

interface KeywordOpportunity {
  keyword: string;
  impressions: number;
  position: number;
  currentCtr: number;
  potentialClicks: number;
  opportunity: string;
  priority: 'high' | 'medium' | 'low';
}

interface ContentGap {
  topic: string;
  keywords: string[];
  searchVolume: number;
  competition: 'low' | 'medium' | 'high';
  suggestion: string;
}

const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials', 'google-search-console.json');
const SITE_URL = 'sc-domain:osteoalsen.de';

/**
 * Initialize Google Search Console API
 */
async function initializeGSC() {
  try {
    const credentials = JSON.parse(await fs.readFile(CREDENTIALS_PATH, 'utf-8'));

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });

    const authClient = await auth.getClient();
    const searchconsole = google.searchconsole({
      version: 'v1',
      auth: authClient as any,
    });

    return searchconsole;
  } catch (error) {
    console.error('❌ Fehler beim Initialisieren der GSC API:', error);
    throw error;
  }
}

/**
 * Fetch keyword data from Google Search Console
 */
async function fetchGSCKeywords(
  searchconsole: any,
  days: number = 90
): Promise<KeywordData[]> {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  console.log(`📊 Lade GSC-Daten (${days} Tage)...`);

  try {
    const response = await searchconsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        dimensions: ['query'],
        rowLimit: 1000,
        dataState: 'final',
      },
    });

    const rows = response.data.rows || [];

    return rows.map((row: any) => ({
      keyword: row.keys[0],
      clicks: row.clicks || 0,
      impressions: row.impressions || 0,
      ctr: row.ctr || 0,
      position: row.position || 0,
    }));
  } catch (error) {
    console.error('❌ Fehler beim Abrufen der GSC-Daten:', error);
    throw error;
  }
}

/**
 * Find keyword opportunities
 */
function findKeywordOpportunities(keywords: KeywordData[]): KeywordOpportunity[] {
  const opportunities: KeywordOpportunity[] = [];

  keywords.forEach(kw => {
    // Skip branded searches
    if (kw.keyword.toLowerCase().includes('osteoalsen') ||
        kw.keyword.toLowerCase().includes('joshua alsen')) {
      return;
    }

    // Opportunity 1: High impressions, low CTR (Position 4-10)
    if (kw.impressions > 100 && kw.position > 3 && kw.position <= 10) {
      const avgCtrForPosition = getAvgCTRForPosition(kw.position);
      const potentialClicks = Math.round(kw.impressions * avgCtrForPosition);

      opportunities.push({
        keyword: kw.keyword,
        impressions: kw.impressions,
        position: kw.position,
        currentCtr: kw.ctr,
        potentialClicks: potentialClicks - kw.clicks,
        opportunity: `Ranking verbessern von #${Math.round(kw.position)} → #1-3`,
        priority: kw.impressions > 500 ? 'high' : 'medium',
      });
    }

    // Opportunity 2: Position 11-20 (Page 2)
    if (kw.impressions > 50 && kw.position > 10 && kw.position <= 20) {
      opportunities.push({
        keyword: kw.keyword,
        impressions: kw.impressions,
        position: kw.position,
        currentCtr: kw.ctr,
        potentialClicks: Math.round(kw.impressions * 0.1), // 10% CTR if on page 1
        opportunity: `Auf Seite 1 bringen (aktuell Seite 2)`,
        priority: 'high',
      });
    }

    // Opportunity 3: High impressions, very low CTR
    if (kw.impressions > 200 && kw.ctr < 0.02) {
      opportunities.push({
        keyword: kw.keyword,
        impressions: kw.impressions,
        position: kw.position,
        currentCtr: kw.ctr,
        potentialClicks: Math.round(kw.impressions * 0.05),
        opportunity: `CTR optimieren (Title/Description verbessern)`,
        priority: 'medium',
      });
    }
  });

  // Sort by potential clicks
  return opportunities.sort((a, b) => b.potentialClicks - a.potentialClicks);
}

/**
 * Get average CTR for position
 */
function getAvgCTRForPosition(position: number): number {
  const ctrMap: Record<number, number> = {
    1: 0.28,
    2: 0.15,
    3: 0.11,
    4: 0.08,
    5: 0.07,
    6: 0.06,
    7: 0.05,
    8: 0.04,
    9: 0.04,
    10: 0.03,
  };

  return ctrMap[Math.round(position)] || 0.02;
}

/**
 * Find content gaps
 */
function findContentGaps(keywords: KeywordData[]): ContentGap[] {
  const gaps: ContentGap[] = [];

  // Analyze by topic clusters
  const topicKeywords: Record<string, string[]> = {
    'Rückenschmerzen': [],
    'Nacken': [],
    'Kopfschmerzen': [],
    'Sportverletzungen': [],
    'Schwangerschaft': [],
    'Kinder': [],
    'Verdauung': [],
    'Kieferprobleme': [],
  };

  keywords.forEach(kw => {
    const query = kw.keyword.toLowerCase();

    if (query.includes('rücken') || query.includes('bandscheibe') || query.includes('ischias')) {
      topicKeywords['Rückenschmerzen'].push(kw.keyword);
    }
    if (query.includes('nacken') || query.includes('hws')) {
      topicKeywords['Nacken'].push(kw.keyword);
    }
    if (query.includes('kopf') || query.includes('migräne')) {
      topicKeywords['Kopfschmerzen'].push(kw.keyword);
    }
    if (query.includes('sport') || query.includes('verletzung')) {
      topicKeywords['Sportverletzungen'].push(kw.keyword);
    }
    if (query.includes('schwanger') || query.includes('geburt')) {
      topicKeywords['Schwangerschaft'].push(kw.keyword);
    }
    if (query.includes('kind') || query.includes('baby')) {
      topicKeywords['Kinder'].push(kw.keyword);
    }
    if (query.includes('verdau') || query.includes('magen') || query.includes('darm')) {
      topicKeywords['Verdauung'].push(kw.keyword);
    }
    if (query.includes('kiefer') || query.includes('tmj')) {
      topicKeywords['Kieferprobleme'].push(kw.keyword);
    }
  });

  // Find gaps: topics with search volume but no/weak content
  Object.entries(topicKeywords).forEach(([topic, kwList]) => {
    const totalImpressions = keywords
      .filter(kw => kwList.includes(kw.keyword))
      .reduce((sum, kw) => sum + kw.impressions, 0);

    const avgPosition = keywords
      .filter(kw => kwList.includes(kw.keyword))
      .reduce((sum, kw) => sum + kw.position, 0) / (kwList.length || 1);

    // Gap exists if: some search volume but poor positions
    if (totalImpressions > 100 && avgPosition > 10) {
      gaps.push({
        topic,
        keywords: kwList.slice(0, 5),
        searchVolume: totalImpressions,
        competition: totalImpressions > 1000 ? 'high' : totalImpressions > 500 ? 'medium' : 'low',
        suggestion: `Erstelle Content zu "${topic}" - ${kwList.length} relevante Keywords gefunden`,
      });
    }
  });

  return gaps.sort((a, b) => b.searchVolume - a.searchVolume);
}

/**
 * Fetch trending topics from Google Trends (simplified - manual topics)
 */
async function getTrendingTopics(): Promise<string[]> {
  // Manual curation for Osteopathie/Health niche
  // In a production environment, you could use google-trends-api package
  return [
    'Faszienbehandlung 2025',
    'Osteopathie bei Long COVID',
    'Home Office Rückenschmerzen',
    'Verspannung durch Stress',
    'Kieferprobleme CMD',
    'Sportverletzung Prävention',
    'Osteopathie Schwangerschaft',
    'Kindliche Entwicklung Osteopathie',
  ];
}

/**
 * Display keyword opportunities
 */
function displayOpportunities(opportunities: KeywordOpportunity[]): void {
  console.log('\n' + '='.repeat(80));
  console.log('🎯 KEYWORD OPPORTUNITIES (Top 20)');
  console.log('='.repeat(80) + '\n');

  opportunities.slice(0, 20).forEach((opp, index) => {
    const priorityEmoji = opp.priority === 'high' ? '🔥' : opp.priority === 'medium' ? '⭐' : '💡';

    console.log(`${priorityEmoji} #${index + 1} - ${opp.keyword}`);
    console.log(`   📊 Impressions: ${opp.impressions.toLocaleString('de-DE')}`);
    console.log(`   📍 Position: #${Math.round(opp.position)}`);
    console.log(`   📈 CTR: ${(opp.ctr * 100).toFixed(2)}%`);
    console.log(`   💰 Potenzial: +${opp.potentialClicks} Klicks/Monat`);
    console.log(`   🎯 Action: ${opp.opportunity}`);
    console.log(`   ⚡ Priorität: ${opp.priority.toUpperCase()}\n`);
  });
}

/**
 * Display content gaps
 */
function displayContentGaps(gaps: ContentGap[]): void {
  console.log('\n' + '='.repeat(80));
  console.log('🕳️  CONTENT GAPS - Fehlende Inhalte');
  console.log('='.repeat(80) + '\n');

  if (gaps.length === 0) {
    console.log('✅ Keine signifikanten Content-Gaps gefunden!\n');
    return;
  }

  gaps.forEach((gap, index) => {
    const compEmoji = gap.competition === 'high' ? '🔴' : gap.competition === 'medium' ? '🟡' : '🟢';

    console.log(`${index + 1}. ${gap.topic} ${compEmoji}`);
    console.log(`   📊 Suchvolumen: ${gap.searchVolume.toLocaleString('de-DE')} Impressions`);
    console.log(`   🏷️  Keywords: ${gap.keywords.join(', ')}`);
    console.log(`   🎯 Wettbewerb: ${gap.competition.toUpperCase()}`);
    console.log(`   💡 ${gap.suggestion}\n`);
  });
}

/**
 * Display trending topics
 */
function displayTrendingTopics(topics: string[]): void {
  console.log('\n' + '='.repeat(80));
  console.log('📈 TRENDING TOPICS - Aktuelle Trends');
  console.log('='.repeat(80) + '\n');

  topics.forEach((topic, index) => {
    console.log(`🔥 ${index + 1}. ${topic}`);
  });

  console.log('\n💡 Tipp: Erstelle Content zu diesen Trending-Themen für schnelle Rankings!\n');
}

/**
 * Save report to file
 */
async function saveReport(
  opportunities: KeywordOpportunity[],
  gaps: ContentGap[],
  trending: string[]
): Promise<void> {
  const timestamp = new Date().toISOString().split('T')[0];
  const filepath = `./data/keyword-research/report-${timestamp}.json`;

  try {
    await fs.mkdir(path.dirname(filepath), { recursive: true });

    const report = {
      date: new Date().toISOString(),
      opportunities: opportunities.slice(0, 50),
      contentGaps: gaps,
      trendingTopics: trending,
      summary: {
        totalOpportunities: opportunities.length,
        highPriority: opportunities.filter(o => o.priority === 'high').length,
        totalPotentialClicks: opportunities.reduce((sum, o) => sum + o.potentialClicks, 0),
        contentGapsFound: gaps.length,
      },
    };

    await fs.writeFile(filepath, JSON.stringify(report, null, 2), 'utf-8');
    console.log(`\n💾 Report gespeichert: ${filepath}\n`);
  } catch (error) {
    console.error('❌ Fehler beim Speichern:', error);
  }
}

/**
 * Main function
 */
async function main() {
  const showTrending = process.argv.includes('--trending');
  const topicArg = process.argv.find(arg => arg.startsWith('--topic='));
  const topic = topicArg ? topicArg.split('=')[1] : null;

  console.log('\n🔍 KEYWORD RESEARCH TOOL');
  console.log('========================\n');

  try {
    // 1. Fetch GSC Data
    const searchconsole = await initializeGSC();
    const keywords = await fetchGSCKeywords(searchconsole, 90);

    console.log(`✅ ${keywords.length} Keywords aus GSC geladen\n`);

    // Filter by topic if specified
    let filteredKeywords = keywords;
    if (topic) {
      filteredKeywords = keywords.filter(kw =>
        kw.keyword.toLowerCase().includes(topic.toLowerCase())
      );
      console.log(`🔎 Gefiltert nach Topic "${topic}": ${filteredKeywords.length} Keywords\n`);
    }

    // 2. Find Opportunities
    const opportunities = findKeywordOpportunities(filteredKeywords);
    displayOpportunities(opportunities);

    // 3. Find Content Gaps
    const gaps = findContentGaps(keywords);
    displayContentGaps(gaps);

    // 4. Show Trending Topics (if requested)
    if (showTrending) {
      const trending = await getTrendingTopics();
      displayTrendingTopics(trending);
    }

    // 5. Save Report
    const trending = showTrending ? await getTrendingTopics() : [];
    await saveReport(opportunities, gaps, trending);

    console.log('✅ Keyword-Recherche abgeschlossen!\n');

    // Summary
    console.log('📊 ZUSAMMENFASSUNG:');
    console.log(`   • ${opportunities.length} Keyword-Opportunities gefunden`);
    console.log(`   • ${opportunities.filter(o => o.priority === 'high').length} High-Priority Keywords`);
    console.log(`   • ${gaps.length} Content-Gaps identifiziert`);
    console.log(`   • Potenzial: +${opportunities.reduce((sum, o) => sum + o.potentialClicks, 0).toLocaleString('de-DE')} Klicks/Monat\n`);
  } catch (error) {
    console.error('❌ Fehler:', error);
    process.exit(1);
  }
}

main();
