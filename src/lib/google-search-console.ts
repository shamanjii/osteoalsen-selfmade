import { config } from 'dotenv';
import { google } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';

config();

// --- Auth Setup ---

const SITE_URL = 'https://www.osteoalsen.de';

const credPath = path.join(process.cwd(), 'credentials', 'google-search-console.json');
const credentials = JSON.parse(fs.readFileSync(credPath, 'utf-8'));

const auth = new google.auth.JWT({
  email: credentials.client_email,
  key: credentials.private_key,
  scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
});

const searchconsole = google.searchconsole({ version: 'v1', auth });

// --- Types ---

export interface SearchAnalyticsRow {
  keys?: string[];
  clicks?: number;
  impressions?: number;
  ctr?: number;
  position?: number;
}

export interface SearchAnalyticsResult {
  rows?: SearchAnalyticsRow[];
}

export interface KeywordData {
  keyword: string;
  position: number;
  clicks: number;
  impressions: number;
  ctr: number;
}

export interface KeywordByPageData extends KeywordData {
  page: string;
}

export interface SiteSummary {
  totalClicks: number;
  totalImpressions: number;
  averageCTR: number;
  averagePosition: number;
  period: {
    startDate: string;
    endDate: string;
  };
}

export interface KeywordPerformancePeriod {
  position: number;
  clicks: number;
  impressions: number;
  ctr: number;
}

export interface KeywordPerformanceComparison {
  current: KeywordPerformancePeriod;
  previous: KeywordPerformancePeriod;
  change: {
    position: number;
    clicks: number;
    impressions: number;
    ctr: number;
  };
}

// --- Helper ---

function getDateRange(days: number): { startDate: string; endDate: string } {
  const today = new Date();
  const endDate = new Date(today);
  endDate.setDate(endDate.getDate() - 1);
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - days);
  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
  };
}

// --- Exported Functions ---

/**
 * Raw Search Analytics query. Returns the API response data directly.
 */
export async function fetchSearchAnalytics(
  startDate: string,
  endDate: string,
  dimensions: string[],
  rowLimit: number = 1000
): Promise<SearchAnalyticsResult> {
  const response = await searchconsole.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: {
      startDate,
      endDate,
      dimensions,
      rowLimit,
    },
  });

  return {
    rows: (response.data.rows || []).map((row) => ({
      keys: row.keys as string[] | undefined,
      clicks: row.clicks ?? undefined,
      impressions: row.impressions ?? undefined,
      ctr: row.ctr ?? undefined,
      position: row.position ?? undefined,
    })),
  };
}

/**
 * Get top keywords for a given number of days, sorted by impressions descending.
 */
export async function getTopKeywords(
  days: number,
  limit: number = 50
): Promise<KeywordData[]> {
  const { startDate, endDate } = getDateRange(days);

  const result = await fetchSearchAnalytics(startDate, endDate, ['query'], limit);

  return (result.rows || []).map((row) => ({
    keyword: row.keys?.[0] || '',
    position: row.position || 0,
    clicks: row.clicks || 0,
    impressions: row.impressions || 0,
    ctr: row.ctr || 0,
  }));
}

/**
 * Get keywords grouped by page (query + page dimensions).
 */
export async function getKeywordsByPage(
  days: number,
  limit: number = 100
): Promise<KeywordByPageData[]> {
  const { startDate, endDate } = getDateRange(days);

  const result = await fetchSearchAnalytics(startDate, endDate, ['query', 'page'], limit);

  return (result.rows || []).map((row) => ({
    keyword: row.keys?.[0] || '',
    page: row.keys?.[1] || '',
    position: row.position || 0,
    clicks: row.clicks || 0,
    impressions: row.impressions || 0,
    ctr: row.ctr || 0,
  }));
}

/**
 * Get a summary of site performance for a given number of days.
 */
export async function getSiteSummary(days: number): Promise<SiteSummary> {
  const { startDate, endDate } = getDateRange(days);

  const result = await fetchSearchAnalytics(startDate, endDate, ['date'], 1000);

  const rows = result.rows || [];
  const totalClicks = rows.reduce((sum, row) => sum + (row.clicks || 0), 0);
  const totalImpressions = rows.reduce((sum, row) => sum + (row.impressions || 0), 0);
  const averageCTR = totalImpressions > 0 ? totalClicks / totalImpressions : 0;
  const averagePosition =
    rows.length > 0
      ? rows.reduce((sum, row) => sum + (row.position || 0), 0) / rows.length
      : 0;

  return {
    totalClicks,
    totalImpressions,
    averageCTR,
    averagePosition,
    period: {
      startDate,
      endDate,
    },
  };
}

/**
 * Compare keyword performance between two consecutive periods.
 * `currentDays` is the recent period length, `previousDays` is the preceding period length.
 */
export async function compareKeywordPerformance(
  keyword: string,
  currentDays: number,
  previousDays: number
): Promise<KeywordPerformanceComparison> {
  const today = new Date();

  // Current period
  const currentEnd = new Date(today);
  currentEnd.setDate(currentEnd.getDate() - 1);
  const currentStart = new Date(today);
  currentStart.setDate(currentStart.getDate() - currentDays);

  // Previous period (immediately before the current period)
  const previousEnd = new Date(currentStart);
  previousEnd.setDate(previousEnd.getDate() - 1);
  const previousStart = new Date(previousEnd);
  previousStart.setDate(previousStart.getDate() - previousDays);

  const [currentResult, previousResult] = await Promise.all([
    searchconsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate: currentStart.toISOString().split('T')[0],
        endDate: currentEnd.toISOString().split('T')[0],
        dimensions: ['query'],
        dimensionFilterGroups: [
          {
            filters: [
              {
                dimension: 'query',
                operator: 'equals',
                expression: keyword,
              },
            ],
          },
        ],
        rowLimit: 1,
      },
    }),
    searchconsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate: previousStart.toISOString().split('T')[0],
        endDate: previousEnd.toISOString().split('T')[0],
        dimensions: ['query'],
        dimensionFilterGroups: [
          {
            filters: [
              {
                dimension: 'query',
                operator: 'equals',
                expression: keyword,
              },
            ],
          },
        ],
        rowLimit: 1,
      },
    }),
  ]);

  const currentRow = currentResult.data.rows?.[0];
  const previousRow = previousResult.data.rows?.[0];

  const current: KeywordPerformancePeriod = {
    position: currentRow?.position || 0,
    clicks: currentRow?.clicks || 0,
    impressions: currentRow?.impressions || 0,
    ctr: currentRow?.ctr || 0,
  };

  const previous: KeywordPerformancePeriod = {
    position: previousRow?.position || 0,
    clicks: previousRow?.clicks || 0,
    impressions: previousRow?.impressions || 0,
    ctr: previousRow?.ctr || 0,
  };

  return {
    current,
    previous,
    change: {
      position: current.position - previous.position,
      clicks: current.clicks - previous.clicks,
      impressions: current.impressions - previous.impressions,
      ctr: current.ctr - previous.ctr,
    },
  };
}
