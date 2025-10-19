/**
 * Google Search Console API Integration
 *
 * Fetches real SEO data from Google Search Console:
 * - Keyword rankings
 * - Impressions & clicks
 * - CTR (Click-Through Rate)
 * - Average position
 *
 * This is YOUR REAL DATA - more accurate than any third-party tool!
 */

import { google } from 'googleapis';
import type { searchconsole_v1 } from 'googleapis';
import fs from 'fs';

const SITE_URL = 'sc-domain:osteoalsen.de';

export interface SearchAnalyticsRow {
  keys?: string[];
  clicks?: number;
  impressions?: number;
  ctr?: number;
  position?: number;
}

export interface SearchAnalyticsResponse {
  rows?: SearchAnalyticsRow[];
  responseAggregationType?: string;
}

export interface KeywordRankingData {
  keyword: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  page?: string;
}

/**
 * Initialize Google Search Console client
 *
 * Setup Instructions:
 * 1. Go to https://console.cloud.google.com/
 * 2. Create a new project (or use existing)
 * 3. Enable "Google Search Console API"
 * 4. Create OAuth 2.0 credentials
 * 5. Download JSON and save as credentials.json
 * 6. Run authentication script (see scripts/auth-google.ts)
 */
async function getSearchConsoleClient() {
  const keyPath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH;

  if (!keyPath) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY_PATH environment variable is not set');
  }

  // Read and parse the service account key file
  const keyFileContent = fs.readFileSync(keyPath, 'utf-8');
  const credentials = JSON.parse(keyFileContent);

  // Use JWT directly (recommended approach, no deprecation warnings)
  const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });

  return google.searchconsole({
    version: 'v1',
    auth,
  });
}

/**
 * Fetch search analytics data from Google Search Console
 */
export async function fetchSearchAnalytics(
  startDate: string, // Format: 'YYYY-MM-DD'
  endDate: string,
  dimensions: ('query' | 'page' | 'country' | 'device')[] = ['query'],
  rowLimit: number = 100
): Promise<SearchAnalyticsResponse> {
  try {
    const searchconsole = await getSearchConsoleClient();

    const response = await searchconsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate,
        endDate,
        dimensions,
        rowLimit,
        dataState: 'final', // Use final (processed) data
      },
    });

    return response.data as SearchAnalyticsResponse;
  } catch (error) {
    console.error('Error fetching Search Console data:', error);
    throw error;
  }
}

/**
 * Get top-performing keywords with rankings
 */
export async function getTopKeywords(
  days: number = 30,
  limit: number = 50
): Promise<KeywordRankingData[]> {
  const endDate = new Date().toISOString().split('T')[0];
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  const data = await fetchSearchAnalytics(startDate, endDate, ['query'], limit);

  if (!data.rows) return [];

  return data.rows.map((row) => ({
    keyword: row.keys?.[0] || 'unknown',
    clicks: row.clicks || 0,
    impressions: row.impressions || 0,
    ctr: row.ctr || 0,
    position: row.position || 0,
  }));
}

/**
 * Get keyword rankings with page URLs
 */
export async function getKeywordsByPage(
  days: number = 30,
  limit: number = 100
): Promise<(KeywordRankingData & { page: string })[]> {
  const endDate = new Date().toISOString().split('T')[0];
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  const data = await fetchSearchAnalytics(startDate, endDate, ['query', 'page'], limit);

  if (!data.rows) return [];

  return data.rows.map((row) => ({
    keyword: row.keys?.[0] || 'unknown',
    page: row.keys?.[1] || '',
    clicks: row.clicks || 0,
    impressions: row.impressions || 0,
    ctr: row.ctr || 0,
    position: row.position || 0,
  }));
}

/**
 * Compare keyword performance (current vs. previous period)
 */
export async function compareKeywordPerformance(
  keyword: string,
  currentDays: number = 30,
  previousDays: number = 30
): Promise<{
  current: KeywordRankingData;
  previous: KeywordRankingData;
  change: {
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  };
}> {
  const today = new Date();

  // Current period
  const currentEnd = today.toISOString().split('T')[0];
  const currentStart = new Date(Date.now() - currentDays * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  // Previous period
  const previousEnd = new Date(Date.now() - currentDays * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];
  const previousStart = new Date(
    Date.now() - (currentDays + previousDays) * 24 * 60 * 60 * 1000
  )
    .toISOString()
    .split('T')[0];

  const currentData = await fetchSearchAnalytics(currentStart, currentEnd, ['query'], 1000);
  const previousData = await fetchSearchAnalytics(previousStart, previousEnd, ['query'], 1000);

  const currentRow = currentData.rows?.find((row) => row.keys?.[0] === keyword);
  const previousRow = previousData.rows?.find((row) => row.keys?.[0] === keyword);

  const current: KeywordRankingData = {
    keyword,
    clicks: currentRow?.clicks || 0,
    impressions: currentRow?.impressions || 0,
    ctr: currentRow?.ctr || 0,
    position: currentRow?.position || 0,
  };

  const previous: KeywordRankingData = {
    keyword,
    clicks: previousRow?.clicks || 0,
    impressions: previousRow?.impressions || 0,
    ctr: previousRow?.ctr || 0,
    position: previousRow?.position || 0,
  };

  return {
    current,
    previous,
    change: {
      clicks: current.clicks - previous.clicks,
      impressions: current.impressions - previous.impressions,
      ctr: current.ctr - previous.ctr,
      position: previous.position - current.position, // Positive = improved (lower position number)
    },
  };
}

/**
 * Get site-level metrics summary
 */
export async function getSiteSummary(days: number = 30) {
  const endDate = new Date().toISOString().split('T')[0];
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  const data = await fetchSearchAnalytics(startDate, endDate, [], 1);

  const row = data.rows?.[0];

  return {
    totalClicks: row?.clicks || 0,
    totalImpressions: row?.impressions || 0,
    averageCTR: row?.ctr || 0,
    averagePosition: row?.position || 0,
    period: { startDate, endDate },
  };
}
