#!/usr/bin/env node
/**
 * PostHog Debug - Show raw event data
 */

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const POSTHOG_API_KEY = process.env.POSTHOG_PERSONAL_API_KEY;
const POSTHOG_HOST = 'https://eu.i.posthog.com';

async function main() {
  console.log('🔍 Fetching first 5 events to debug...\n');

  const response = await fetch(
    `${POSTHOG_HOST}/api/projects/93989/events/?limit=5`,
    {
      headers: {
        'Authorization': `Bearer ${POSTHOG_API_KEY}`,
      },
    }
  );

  const data = await response.json();
  const events = data.results || [];

  events.forEach((event: any, i: number) => {
    console.log(`\n📍 Event ${i + 1}:`);
    console.log(`   Type: ${event.event}`);
    console.log(`   Timestamp: ${event.timestamp}`);
    console.log(`   Properties:`, JSON.stringify(event.properties, null, 2));
  });
}

main();
