/**
 * Test Google Search Console API Connection
 *
 * Run this to verify your GSC API setup is working
 */

const { google } = require('googleapis');
const path = require('path');

const SITE_URL = 'sc-domain:osteoalsen.de'; // Domain property (includes all subdomains)

async function testGSCConnection() {
  console.log('🔍 Testing Google Search Console API connection...\n');

  try {
    // Load credentials
    const keyPath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH ||
      path.join(__dirname, 'credentials', 'google-service-account.json');

    console.log('📁 Using credentials from:', keyPath);

    // Initialize auth
    const auth = new google.auth.GoogleAuth({
      keyFile: keyPath,
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });

    const authClient = await auth.getClient();
    console.log('✅ Authentication successful!\n');

    // Initialize Search Console API
    const searchconsole = google.searchconsole({
      version: 'v1',
      auth: authClient,
    });

    // Test 1: List sites
    console.log('📋 Fetching your Search Console properties...');
    const sitesResponse = await searchconsole.sites.list();

    if (sitesResponse.data.siteEntry && sitesResponse.data.siteEntry.length > 0) {
      console.log('✅ Found properties:');
      sitesResponse.data.siteEntry.forEach(site => {
        console.log(`   - ${site.siteUrl} (Permission: ${site.permissionLevel})`);
      });
    } else {
      console.log('⚠️  No properties found. Make sure you added the service account to Search Console!');
      console.log('\n📧 Service account email:');
      const credentials = require(keyPath);
      console.log(`   ${credentials.client_email}`);
      console.log('\n👉 Add this email to: https://search.google.com/search-console → Settings → Users');
      return;
    }

    // Test 2: Fetch recent data
    console.log(`\n📊 Fetching data for ${SITE_URL}...`);

    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];

    const analyticsResponse = await searchconsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['query'],
        rowLimit: 10,
      },
    });

    if (analyticsResponse.data.rows && analyticsResponse.data.rows.length > 0) {
      console.log('✅ Successfully fetched search analytics data!\n');
      console.log('📈 Top 10 Keywords (Last 7 days):');
      console.log('─'.repeat(80));

      analyticsResponse.data.rows.forEach((row, index) => {
        const keyword = row.keys[0];
        const clicks = row.clicks || 0;
        const impressions = row.impressions || 0;
        const position = row.position ? row.position.toFixed(1) : 'N/A';

        console.log(
          `${(index + 1).toString().padStart(2)}. ${keyword.padEnd(40)} | ` +
          `Pos: ${position.padStart(5)} | ` +
          `Clicks: ${clicks.toString().padStart(4)} | ` +
          `Impr: ${impressions.toString().padStart(6)}`
        );
      });

      console.log('─'.repeat(80));
      console.log('\n🎉 SUCCESS! Your Google Search Console API is working perfectly!');
      console.log('✅ You can now use the SEO Dashboard and ranking monitoring.');
    } else {
      console.log('⚠️  No data available yet (this is normal for new sites)');
      console.log('   Data will be available once Google has indexed your site.');
    }

  } catch (error) {
    console.error('\n❌ Error:', error.message);

    if (error.message.includes('User does not have sufficient permission')) {
      console.log('\n💡 Solution:');
      console.log('   1. Go to: https://search.google.com/search-console');
      console.log('   2. Select your property');
      console.log('   3. Settings → Users and permissions');
      console.log('   4. Add user: osteoalsen-seo-monitor@osteoalsen-seo-monitoring.iam.gserviceaccount.com');
      console.log('   5. Set permission level: Owner or Full');
    } else if (error.message.includes('ENOENT')) {
      console.log('\n💡 Solution:');
      console.log('   Make sure the JSON key file exists at:');
      console.log('   ' + keyPath);
    } else {
      console.log('\n💡 Full error details:');
      console.log(error);
    }
  }
}

// Run the test
testGSCConnection()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
