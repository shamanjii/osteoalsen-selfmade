#!/usr/bin/env ts-node
/**
 * Automated Ranking Monitoring Script
 *
 * This script should run daily (via cron or CI/CD) to:
 * 1. Fetch current keyword rankings from Google Search Console
 * 2. Compare with previous rankings
 * 3. Send data to PostHog for tracking
 * 4. Send alerts if significant changes detected
 *
 * Usage:
 *   npm run monitor:rankings
 *
 * Cron setup (daily at 9 AM):
 *   0 9 * * * cd /path/to/project && npm run monitor:rankings
 */

import {
  getTopKeywords,
  compareKeywordPerformance,
  getSiteSummary
} from '../src/lib/google-search-console';

interface RankingAlert {
  keyword: string;
  changeType: 'improvement' | 'decline' | 'new';
  oldPosition?: number;
  newPosition: number;
  change: number;
  severity: 'high' | 'medium' | 'low';
}

/**
 * Priority keywords to monitor closely
 */
const PRIORITY_KEYWORDS = [
  'osteopath hamburg',
  'osteopathie hamburg',
  'osteopath rotherbaum',
  'osteopathie rotherbaum',
  'osteopath eimsbüttel',
  'heilpraktiker hamburg',
  'osteopath hamburg mitte',
  'rückenschmerzen hamburg',
  'kopfschmerzen behandlung hamburg',
];

/**
 * Determine alert severity based on position change
 */
function getSeverity(positionChange: number, isPriority: boolean): 'high' | 'medium' | 'low' {
  const absChange = Math.abs(positionChange);

  if (isPriority) {
    if (absChange >= 5) return 'high';
    if (absChange >= 3) return 'medium';
    return 'low';
  } else {
    if (absChange >= 10) return 'high';
    if (absChange >= 5) return 'medium';
    return 'low';
  }
}

/**
 * Send ranking data to PostHog
 */
async function sendToPostHog(
  eventName: string,
  properties: Record<string, unknown>
): Promise<void> {
  try {
    const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST;

    if (!POSTHOG_KEY || !POSTHOG_HOST) {
      console.warn('PostHog credentials not configured, skipping...');
      return;
    }

    const response = await fetch(`${POSTHOG_HOST}/capture/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: POSTHOG_KEY,
        event: eventName,
        properties: {
          ...properties,
          timestamp: new Date().toISOString(),
        },
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      console.error('Failed to send to PostHog:', await response.text());
    }
  } catch (error) {
    console.error('Error sending to PostHog:', error);
  }
}

/**
 * Send alert via Slack/Email/etc.
 */
async function sendAlert(alert: RankingAlert): Promise<void> {
  const message = alert.changeType === 'improvement'
    ? `🎉 Keyword "${alert.keyword}" improved from #${alert.oldPosition} to #${alert.newPosition} (${alert.change > 0 ? '+' : ''}${alert.change})`
    : alert.changeType === 'decline'
    ? `⚠️ Keyword "${alert.keyword}" declined from #${alert.oldPosition} to #${alert.newPosition} (${alert.change})`
    : `🆕 New keyword ranking: "${alert.keyword}" at #${alert.newPosition}`;

  console.log(`[${alert.severity.toUpperCase()}] ${message}`);

  // TODO: Implement Slack/Email notification
  // Example: await sendSlackMessage(message);
}

/**
 * Main monitoring function
 */
async function monitorRankings(): Promise<void> {
  console.log('🔍 Starting ranking monitoring...\n');

  try {
    // Fetch current site summary
    const summary = await getSiteSummary(30);
    console.log('📊 Site Summary (Last 30 days):');
    console.log(`  Total Clicks: ${summary.totalClicks}`);
    console.log(`  Total Impressions: ${summary.totalImpressions}`);
    console.log(`  Average CTR: ${(summary.averageCTR * 100).toFixed(2)}%`);
    console.log(`  Average Position: ${summary.averagePosition.toFixed(1)}`);
    console.log('');

    // Send site summary to PostHog
    await sendToPostHog('ranking_monitoring_summary', {
      total_clicks: summary.totalClicks,
      total_impressions: summary.totalImpressions,
      average_ctr: summary.averageCTR,
      average_position: summary.averagePosition,
    });

    // Fetch top keywords
    const topKeywords = await getTopKeywords(30, 50);
    console.log(`📈 Top ${topKeywords.length} Keywords:\n`);

    const alerts: RankingAlert[] = [];

    // Monitor priority keywords
    for (const keyword of PRIORITY_KEYWORDS) {
      try {
        const comparison = await compareKeywordPerformance(keyword, 30, 30);

        const positionChange = comparison.previous.position - comparison.current.position;
        const clicksChange = comparison.change.clicks;

        if (positionChange !== 0) {
          const alert: RankingAlert = {
            keyword,
            changeType: positionChange > 0 ? 'improvement' : 'decline',
            oldPosition: comparison.previous.position,
            newPosition: comparison.current.position,
            change: positionChange,
            severity: getSeverity(positionChange, true),
          };

          alerts.push(alert);

          console.log(
            `  ${positionChange > 0 ? '📈' : '📉'} "${keyword}": #${comparison.previous.position.toFixed(1)} → #${comparison.current.position.toFixed(1)} (${positionChange > 0 ? '+' : ''}${positionChange.toFixed(1)})`
          );
          console.log(`     Clicks: ${comparison.previous.clicks} → ${comparison.current.clicks} (${clicksChange > 0 ? '+' : ''}${clicksChange})`);
        }

        // Send keyword data to PostHog
        await sendToPostHog('keyword_ranking_tracked', {
          keyword,
          position: comparison.current.position,
          position_change: positionChange,
          clicks: comparison.current.clicks,
          clicks_change: clicksChange,
          impressions: comparison.current.impressions,
          ctr: comparison.current.ctr,
          is_priority: true,
        });
      } catch (error) {
        console.error(`  ❌ Error monitoring "${keyword}":`, error);
      }
    }

    console.log('');

    // Monitor all other top keywords
    for (const kw of topKeywords) {
      if (!PRIORITY_KEYWORDS.includes(kw.keyword)) {
        await sendToPostHog('keyword_ranking_tracked', {
          keyword: kw.keyword,
          position: kw.position,
          clicks: kw.clicks,
          impressions: kw.impressions,
          ctr: kw.ctr,
          is_priority: false,
        });
      }
    }

    // Send alerts
    const highSeverityAlerts = alerts.filter((a) => a.severity === 'high');
    const mediumSeverityAlerts = alerts.filter((a) => a.severity === 'medium');

    console.log(`\n🚨 Alerts:`);
    console.log(`  High: ${highSeverityAlerts.length}`);
    console.log(`  Medium: ${mediumSeverityAlerts.length}`);
    console.log('');

    for (const alert of [...highSeverityAlerts, ...mediumSeverityAlerts]) {
      await sendAlert(alert);
    }

    console.log('\n✅ Ranking monitoring completed successfully!');
  } catch (error) {
    console.error('\n❌ Error during ranking monitoring:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  monitorRankings()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

export { monitorRankings };
