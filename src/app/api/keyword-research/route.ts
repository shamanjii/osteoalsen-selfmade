/**
 * Keyword Research API
 *
 * Provides comprehensive keyword research data combining:
 * - Content gaps (low-hanging fruits)
 * - Local SEO keywords
 * - Trending topics
 * - Optimization recommendations
 *
 * Route: GET /api/keyword-research
 */

import { NextResponse } from 'next/server';
import { performKeywordResearch } from '@/lib/keyword-research';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    console.log('🔍 Starting keyword research...');

    const research = await performKeywordResearch();

    return NextResponse.json(
      {
        success: true,
        timestamp: new Date().toISOString(),
        data: research,
      },
      {
        headers: {
          'Cache-Control': 'private, max-age=3600', // Cache for 1 hour
        },
      }
    );
  } catch (error) {
    console.error('Error performing keyword research:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to perform keyword research',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
