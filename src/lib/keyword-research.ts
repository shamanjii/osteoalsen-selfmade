/**
 * Keyword Research & Content Strategy Module
 *
 * Combines multiple data sources for comprehensive keyword research:
 * - Google Search Console (your actual rankings)
 * - Google Trends (trending topics & related queries)
 * - Content Gap Analysis (opportunities)
 * - Local SEO optimization
 */

import { getTopKeywords, getKeywordsByPage } from './google-search-console';
import googleTrends from 'google-trends-api';

// ============================================================================
// TYPES
// ============================================================================

export interface KeywordData {
  keyword: string;
  searchVolume?: number;
  currentPosition?: number;
  clicks?: number;
  impressions?: number;
  ctr?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  opportunity?: 'high' | 'medium' | 'low';
  trend?: 'rising' | 'stable' | 'falling';
}

export interface ContentOpportunity {
  keyword: string;
  currentPosition: number;
  impressions: number;
  estimatedClicksIfTop10: number;
  priority: 'high' | 'medium' | 'low';
  reason: string;
  suggestedActions: string[];
}

export interface LocalKeywordSuggestion {
  keyword: string;
  location: string;
  searchIntent: 'informational' | 'navigational' | 'transactional';
  priority: number;
}

// ============================================================================
// CONTENT GAP ANALYZER
// ============================================================================

/**
 * Finds keywords where you're ranking 11-20 (page 2)
 * These are "low-hanging fruits" - easy wins with optimization
 */
export async function findContentGaps(days: number = 30): Promise<ContentOpportunity[]> {
  const keywords = await getTopKeywords(days, 100);
  const opportunities: ContentOpportunity[] = [];

  for (const kw of keywords) {
    // Focus on keywords where we're close to page 1
    if (kw.position > 10 && kw.position <= 20 && kw.impressions > 5) {
      // Calculate potential clicks if we get to top 10
      // Average CTR for position 1-10 is ~5-30%, position 11-20 is ~1-3%
      const currentCTR = kw.ctr || (kw.clicks / kw.impressions);
      const estimatedTop10CTR = 0.15; // Conservative 15% CTR for top 10
      const estimatedClicksIfTop10 = Math.round(kw.impressions * estimatedTop10CTR);
      const potentialGain = estimatedClicksIfTop10 - kw.clicks;

      let priority: 'high' | 'medium' | 'low' = 'low';
      if (kw.position <= 15 && kw.impressions > 20) priority = 'high';
      else if (kw.position <= 18 && kw.impressions > 10) priority = 'medium';

      opportunities.push({
        keyword: kw.keyword,
        currentPosition: kw.position,
        impressions: kw.impressions,
        estimatedClicksIfTop10,
        priority,
        reason: `Position ${kw.position.toFixed(1)} with ${kw.impressions} impressions - ${potentialGain} more clicks possible`,
        suggestedActions: generateOptimizationActions(kw.keyword, kw.position),
      });
    }
  }

  // Sort by priority and potential
  return opportunities.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return b.estimatedClicksIfTop10 - a.estimatedClicksIfTop10;
  });
}

function generateOptimizationActions(keyword: string, position: number): string[] {
  const actions: string[] = [];

  if (position > 15) {
    actions.push('Add keyword to H1 heading');
    actions.push('Increase content depth (add 500+ words)');
  }

  if (position > 12) {
    actions.push('Optimize meta title to include keyword');
    actions.push('Add keyword to first 100 words');
    actions.push('Create internal links from high-authority pages');
  }

  actions.push('Add FAQ section with related questions');
  actions.push('Improve page load speed (target <2s)');
  actions.push('Add schema markup for better SERP features');

  return actions;
}

// ============================================================================
// LOCAL SEO KEYWORD GENERATOR
// ============================================================================

/**
 * Generates local SEO keyword variations for Hamburg & neighborhoods
 */
export function generateLocalKeywords(baseKeywords: string[]): LocalKeywordSuggestion[] {
  const locations = [
    'Hamburg',
    'Rotherbaum',
    'Eimsbüttel',
    'Hamburg Rotherbaum',
    'Hamburg Eimsbüttel',
    'Hamburg Mitte',
    'Harvestehude',
    'Hoheluft',
    'Eppendorf',
  ];

  const modifiers = {
    informational: [
      'was ist',
      'wie funktioniert',
      'vorteile',
      'erfahrungen',
      'bewertungen',
    ],
    navigational: [
      '',
      'praxis',
      'termin',
      'kontakt',
      'adresse',
    ],
    transactional: [
      'termin buchen',
      'online buchen',
      'kosten',
      'krankenkasse',
      'in der nähe',
      'guter',
      'bester',
      'empfehlung',
    ],
  };

  const suggestions: LocalKeywordSuggestion[] = [];

  for (const base of baseKeywords) {
    for (const location of locations) {
      // Navigational (direct searches)
      suggestions.push({
        keyword: `${base} ${location}`,
        location,
        searchIntent: 'navigational',
        priority: location === 'Hamburg' ? 10 : 7,
      });

      // Transactional (ready to book)
      for (const mod of modifiers.transactional) {
        if (mod === '') continue;
        suggestions.push({
          keyword: `${mod} ${base} ${location}`,
          location,
          searchIntent: 'transactional',
          priority: 9,
        });

        suggestions.push({
          keyword: `${base} ${location} ${mod}`,
          location,
          searchIntent: 'transactional',
          priority: 8,
        });
      }

      // Informational (research phase)
      for (const mod of modifiers.informational) {
        suggestions.push({
          keyword: `${mod} ${base} ${location}`,
          location,
          searchIntent: 'informational',
          priority: 6,
        });
      }
    }
  }

  // Remove duplicates and sort by priority
  const unique = suggestions.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.keyword === item.keyword)
  );

  return unique.sort((a, b) => b.priority - a.priority);
}

// ============================================================================
// GOOGLE TRENDS INTEGRATION
// ============================================================================

/**
 * Get trending related queries for a keyword
 */
export async function getTrendingQueries(keyword: string, geo: string = 'DE'): Promise<{
  rising: string[];
  top: string[];
}> {
  try {
    const relatedQueries = await googleTrends.relatedQueries({
      keyword,
      geo,
      hl: 'de',
    });

    const data = JSON.parse(relatedQueries);
    const defaultResponse = data.default;

    const rising = defaultResponse?.rankedList?.[0]?.rankedKeyword?.map(
      (item: { query: string }) => item.query
    ) || [];

    const top = defaultResponse?.rankedList?.[1]?.rankedKeyword?.map(
      (item: { query: string }) => item.query
    ) || [];

    return { rising, top };
  } catch (error) {
    console.error('Error fetching trending queries:', error);
    return { rising: [], top: [] };
  }
}

/**
 * Get interest over time for keywords
 */
export async function getKeywordTrend(
  keywords: string[],
  timeRange: string = 'today 3-m',
  geo: string = 'DE'
): Promise<{
  keyword: string;
  trend: 'rising' | 'stable' | 'falling';
  averageInterest: number;
}[]> {
  const results = [];

  for (const keyword of keywords) {
    try {
      const interestOverTime = await googleTrends.interestOverTime({
        keyword,
        geo,
        hl: 'de',
        startTime: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 90 days ago
      });

      const data = JSON.parse(interestOverTime);
      const timelineData = data.default?.timelineData || [];

      if (timelineData.length >= 2) {
        const values = timelineData.map((item: { value: number[] }) => item.value[0]);
        const recentAvg = values.slice(-4).reduce((a: number, b: number) => a + b, 0) / 4;
        const olderAvg = values.slice(0, 4).reduce((a: number, b: number) => a + b, 0) / 4;
        const avgInterest = values.reduce((a: number, b: number) => a + b, 0) / values.length;

        let trend: 'rising' | 'stable' | 'falling' = 'stable';
        if (recentAvg > olderAvg * 1.2) trend = 'rising';
        else if (recentAvg < olderAvg * 0.8) trend = 'falling';

        results.push({
          keyword,
          trend,
          averageInterest: Math.round(avgInterest),
        });
      }
    } catch (error) {
      console.error(`Error fetching trend for "${keyword}":`, error);
    }
  }

  return results;
}

// ============================================================================
// COMPLETE KEYWORD RESEARCH
// ============================================================================

/**
 * Complete keyword research combining all data sources
 */
export async function performKeywordResearch(): Promise<{
  contentGaps: ContentOpportunity[];
  localKeywords: LocalKeywordSuggestion[];
  trendingTopics: { keyword: string; queries: string[] }[];
  recommendations: string[];
}> {
  // 1. Find content gaps
  const contentGaps = await findContentGaps(30);

  // 2. Generate local keywords
  const baseKeywords = ['osteopath', 'osteopathie', 'heilpraktiker'];
  const localKeywords = generateLocalKeywords(baseKeywords);

  // 3. Get trending topics
  const trendingTopics = [];
  for (const keyword of ['osteopathie hamburg', 'osteopath', 'heilpraktiker']) {
    try {
      const { rising, top } = await getTrendingQueries(keyword, 'DE');
      if (rising.length > 0 || top.length > 0) {
        trendingTopics.push({
          keyword,
          queries: [...rising.slice(0, 5), ...top.slice(0, 5)],
        });
      }
    } catch (error) {
      console.error(`Error fetching trends for "${keyword}":`, error);
    }
  }

  // 4. Generate recommendations
  const recommendations = [
    `Found ${contentGaps.length} content gap opportunities (keywords ranking 11-20)`,
    `${localKeywords.filter(k => k.priority >= 8).length} high-priority local keywords identified`,
    `Focus on "${contentGaps[0]?.keyword || 'top keywords'}" - easiest win with ${contentGaps[0]?.estimatedClicksIfTop10 || 0} potential clicks`,
    'Create dedicated pages for Rotherbaum and Eimsbüttel locations',
    'Add FAQ sections to capture "People Also Ask" queries',
  ];

  return {
    contentGaps,
    localKeywords: localKeywords.slice(0, 50), // Top 50
    trendingTopics,
    recommendations,
  };
}
