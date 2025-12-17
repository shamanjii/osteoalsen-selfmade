#!/usr/bin/env node
/**
 * PostHog User Behavior Analytics
 *
 * Fetches and analyzes user behavior data from PostHog
 * - Page views by URL
 * - User engagement metrics
 * - Traffic sources
 * - User journey patterns
 */

import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const POSTHOG_API_KEY = process.env.POSTHOG_PERSONAL_API_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com';

if (!POSTHOG_API_KEY) {
  console.error('❌ POSTHOG_PERSONAL_API_KEY not found in .env');
  process.exit(1);
}

interface PostHogProject {
  id: number;
  name: string;
}

interface PostHogEvent {
  event: string;
  properties: Record<string, any>;
  timestamp: string;
  distinct_id: string;
}

interface PostHogInsight {
  result: any[];
}

// Fetch all projects
async function getProjects(): Promise<PostHogProject[]> {
  const response = await fetch(`${POSTHOG_HOST}/api/projects/`, {
    headers: {
      'Authorization': `Bearer ${POSTHOG_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch projects: ${response.statusText}`);
  }

  const data = await response.json();
  return data.results || [];
}

// Fetch events for a project (with pagination)
async function getEvents(projectId: number, daysBack: number = 7): Promise<PostHogEvent[]> {
  const after = new Date(Date.now() - daysBack * 24 * 60 * 60 * 1000).toISOString();
  let allEvents: PostHogEvent[] = [];
  let nextUrl: string | null = `${POSTHOG_HOST}/api/projects/${projectId}/events/?after=${after}&limit=100`;

  // Fetch all pages
  while (nextUrl) {
    const response = await fetch(nextUrl, {
      headers: {
        'Authorization': `Bearer ${POSTHOG_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.statusText}`);
    }

    const data = await response.json();
    allEvents = allEvents.concat(data.results || []);
    nextUrl = data.next; // Get next page URL

    // Progress indicator
    if (nextUrl) {
      process.stdout.write(`\r   Fetched ${allEvents.length} events...`);
    }
  }

  console.log(''); // New line after progress
  return allEvents;
}

// Query insights (trends)
async function queryInsight(projectId: number, query: any): Promise<any> {
  const response = await fetch(
    `${POSTHOG_HOST}/api/projects/${projectId}/insights/trend/`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${POSTHOG_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query),
    }
  );

  if (!response.ok) {
    console.error('Insight query failed:', await response.text());
    return null;
  }

  return await response.json();
}

// Analyze page views
function analyzePageViews(events: PostHogEvent[]) {
  const pageViews: Record<string, number> = {};
  const pageviewEvents = events.filter(e =>
    e.event === '$pageview' || e.event === 'pageview'
  );

  pageviewEvents.forEach(event => {
    // PostHog stores pathname directly, not full URL
    const path = event.properties.$pathname ||
                 event.properties.$current_url ||
                 event.properties.url ||
                 'unknown';

    if (path && path !== 'unknown') {
      pageViews[path] = (pageViews[path] || 0) + 1;
    }
  });

  return Object.entries(pageViews)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);
}

// Analyze traffic sources
function analyzeTrafficSources(events: PostHogEvent[]) {
  const sources: Record<string, number> = {};
  const pageviewEvents = events.filter(e =>
    e.event === '$pageview' || e.event === 'pageview'
  );

  pageviewEvents.forEach(event => {
    const referrer = event.properties.$referrer || event.properties.referrer || 'Direct';
    let source = 'Direct';

    if (referrer !== 'Direct' && referrer) {
      try {
        const hostname = new URL(referrer).hostname;
        if (hostname.includes('google')) source = 'Google';
        else if (hostname.includes('facebook')) source = 'Facebook';
        else if (hostname.includes('instagram')) source = 'Instagram';
        else if (hostname.includes('linkedin')) source = 'LinkedIn';
        else source = hostname;
      } catch {
        source = 'Other';
      }
    }

    sources[source] = (sources[source] || 0) + 1;
  });

  return Object.entries(sources)
    .sort(([, a], [, b]) => b - a);
}

// Analyze user engagement
function analyzeEngagement(events: PostHogEvent[]) {
  const uniqueUsers = new Set(events.map(e => e.distinct_id)).size;
  const totalPageViews = events.filter(e =>
    e.event === '$pageview' || e.event === 'pageview'
  ).length;

  const clicks = events.filter(e => e.event === 'click' || e.event === '$autocapture').length;

  return {
    uniqueUsers,
    totalPageViews,
    clicks,
    avgPageViewsPerUser: totalPageViews / uniqueUsers || 0,
  };
}

// Main function
async function main() {
  console.log('📊 PostHog User Behavior Analytics\n');
  console.log('═'.repeat(60));

  try {
    // Get projects
    console.log('\n🔍 Fetching projects...');
    const projects = await getProjects();

    if (projects.length === 0) {
      console.log('⚠️  No projects found. PostHog might not have received events yet.');
      console.log('   Make sure your website is live and PostHog is initialized.');
      return;
    }

    console.log(`✅ Found ${projects.length} project(s):\n`);
    projects.forEach(p => console.log(`   - ${p.name} (ID: ${p.id})`));

    const project = projects[0];
    console.log(`\n📈 Analyzing project: ${project.name}`);
    console.log('═'.repeat(60));

    // Fetch events (last 7 days)
    console.log('\n🔍 Fetching events (last 7 days)...');
    const events = await getEvents(project.id, 7);

    console.log(`✅ Found ${events.length} events\n`);

    if (events.length === 0) {
      console.log('⚠️  No events recorded in the last 7 days.');
      console.log('   This could mean:');
      console.log('   1. Your website hasn\'t had visitors yet');
      console.log('   2. PostHog tracking isn\'t properly initialized');
      console.log('   3. Events are still processing\n');
      return;
    }

    // Analyze engagement
    console.log('👥 USER ENGAGEMENT\n');
    const engagement = analyzeEngagement(events);
    console.log(`   Unique Visitors:     ${engagement.uniqueUsers}`);
    console.log(`   Total Page Views:    ${engagement.totalPageViews}`);
    console.log(`   Total Clicks:        ${engagement.clicks}`);
    console.log(`   Avg Views/User:      ${engagement.avgPageViewsPerUser.toFixed(1)}\n`);

    // Analyze page views
    console.log('📄 TOP 10 PAGES (by views)\n');
    const topPages = analyzePageViews(events);
    topPages.forEach(([path, views], index) => {
      console.log(`   ${(index + 1).toString().padStart(2)}. ${path.padEnd(50)} ${views} views`);
    });

    // Analyze traffic sources
    console.log('\n\n🌐 TRAFFIC SOURCES\n');
    const sources = analyzeTrafficSources(events);
    sources.forEach(([source, count]) => {
      const percentage = ((count / engagement.totalPageViews) * 100).toFixed(1);
      console.log(`   ${source.padEnd(20)} ${count.toString().padStart(4)} views (${percentage}%)`);
    });

    console.log('\n═'.repeat(60));
    console.log('✅ Analysis complete!\n');

  } catch (error: any) {
    console.error('\n❌ Error:', error.message);
    if (error.message.includes('401') || error.message.includes('403')) {
      console.error('   → API key might be invalid or expired');
    }
    process.exit(1);
  }
}

main();
