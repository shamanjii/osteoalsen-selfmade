import { config } from 'dotenv';
import { getTopKeywords, getSiteSummary } from '@/lib/google-search-console';

// Load environment variables
config();

async function testGoogleSearchConsole() {
  console.log('🔑 Using credentials from:', process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH);
  console.log('');
  console.log('🔍 Testing Google Search Console API Connection...\n');

  try {
    // Test 1: Get Site Summary
    console.log('📊 Fetching Site Summary (Last 30 days)...');
    const summary = await getSiteSummary(30);
    console.log('✅ Site Summary:', JSON.stringify(summary, null, 2));
    console.log('');

    // Test 2: Get Top Keywords
    console.log('🔑 Fetching Top 10 Keywords...');
    const keywords = await getTopKeywords(30, 10);
    console.log('✅ Top Keywords:');
    keywords.forEach((kw, index) => {
      console.log(`  ${index + 1}. "${kw.keyword}"`);
      console.log(`     Position: ${kw.position.toFixed(2)}`);
      console.log(`     Clicks: ${kw.clicks} | Impressions: ${kw.impressions}`);
      console.log(`     CTR: ${(kw.ctr * 100).toFixed(2)}%`);
      console.log('');
    });

    console.log('✨ Google Search Console API is working perfectly!');
  } catch (error) {
    console.error('❌ Error testing Google Search Console:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Stack trace:', error.stack);
    }
    process.exit(1);
  }
}

testGoogleSearchConsole();
