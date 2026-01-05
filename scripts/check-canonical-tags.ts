import * as fs from 'fs';
import * as path from 'path';
import { getAllSlugs } from '../src/lib/posts';

async function checkCanonicalTags() {
  console.log('🔗 CANONICAL TAG ÜBERPRÜFUNG\n');
  console.log('='.repeat(80) + '\n');

  const baseUrl = 'https://www.osteoalsen.de';

  // 1. Prüfe ob Next.js config trailingSlash aktiviert hat
  const nextConfigPath = path.join(process.cwd(), 'next.config.js');
  const nextConfigContent = fs.readFileSync(nextConfigPath, 'utf-8');
  const hasTrailingSlash = nextConfigContent.includes('trailingSlash: true');

  console.log('📋 Next.js Konfiguration:');
  console.log(`   trailingSlash: ${hasTrailingSlash ? '✅ true' : '❌ false'}`);
  console.log('');

  // 2. Prüfe Root Layout
  console.log('📄 Root Layout (src/app/layout.tsx):');
  const layoutPath = path.join(process.cwd(), 'src/app/layout.tsx');
  if (fs.existsSync(layoutPath)) {
    const layoutContent = fs.readFileSync(layoutPath, 'utf-8');

    // Suche nach metadataBase
    const metadataBaseMatch = layoutContent.match(/metadataBase:\s*new URL\("([^"]+)"\)/);
    if (metadataBaseMatch) {
      const metadataBase = metadataBaseMatch[1];
      console.log(`   ✅ metadataBase: ${metadataBase}`);

      if (metadataBase !== baseUrl) {
        console.log(`   ⚠️  WARNING: metadataBase sollte ${baseUrl} sein`);
      }
    } else {
      console.log('   ❌ metadataBase nicht gefunden');
    }

    // Suche nach canonical
    const canonicalMatch = layoutContent.match(/alternates:\s*\{\s*canonical:\s*"([^"]+)"/);
    if (canonicalMatch) {
      const canonical = canonicalMatch[1];
      console.log(`   ✅ canonical: ${canonical}`);
    } else {
      console.log('   ⚠️  canonical nicht gefunden');
    }
  }
  console.log('');

  // 3. Prüfe Sitemap
  console.log('📄 Sitemap (src/lib/sitemap.ts):');
  const sitemapPath = path.join(process.cwd(), 'src/lib/sitemap.ts');
  if (fs.existsSync(sitemapPath)) {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');

    // Prüfe ob ensureTrailingSlash verwendet wird
    const hasEnsureTrailingSlash = sitemapContent.includes('ensureTrailingSlash');
    console.log(`   ${hasEnsureTrailingSlash ? '✅' : '❌'} ensureTrailingSlash Funktion: ${hasEnsureTrailingSlash ? 'gefunden' : 'nicht gefunden'}`);

    // Zähle URLs
    const urlMatches = sitemapContent.match(/url:\s*ensureTrailingSlash/g) || [];
    console.log(`   📊 ${urlMatches.length} URLs nutzen ensureTrailingSlash`);
  }
  console.log('');

  // 4. Prüfe Blog-Artikel
  console.log('📰 Blog-Artikel:');
  const blogSlugs = await getAllSlugs();
  console.log(`   📊 ${blogSlugs.length} Blog-Artikel gefunden\n`);

  // Prüfe ob Blog-Artikel Dateien canonical tags haben
  const blogLayoutPath = path.join(process.cwd(), 'src/app/blog/[slug]/page.tsx');
  if (fs.existsSync(blogLayoutPath)) {
    const blogLayoutContent = fs.readFileSync(blogLayoutPath, 'utf-8');

    if (blogLayoutContent.includes('canonical')) {
      console.log('   ✅ Blog-Artikel haben canonical tags');

      // Zeige Code-Ausschnitt
      const lines = blogLayoutContent.split('\n');
      lines.forEach((line, i) => {
        if (line.includes('canonical')) {
          console.log(`      Zeile ${i + 1}: ${line.trim()}`);
        }
      });
    } else {
      console.log('   ⚠️  Blog-Artikel könnten canonical tags fehlen');
    }
  } else {
    console.log('   ⚠️  Blog page.tsx nicht gefunden');
  }
  console.log('');

  // 5. Zusammenfassung und Empfehlungen
  console.log('='.repeat(80));
  console.log('\n💡 WICHTIGE PUNKTE:\n');

  console.log('1️⃣  Trailing Slash Konsistenz:');
  if (hasTrailingSlash) {
    console.log('   ✅ Next.js ist auf trailingSlash: true konfiguriert');
    console.log('   ✅ Alle URLs sollten mit "/" enden');
    console.log('   ⚠️  WICHTIG: Stelle sicher, dass alle internen Links trailing slashes haben\n');
  } else {
    console.log('   ⚠️  Next.js ist auf trailingSlash: false konfiguriert');
    console.log('   ⚠️  URLs sollten KEINE trailing slashes haben\n');
  }

  console.log('2️⃣  Canonical URLs:');
  console.log('   ✅ metadataBase sollte in layout.tsx gesetzt sein');
  console.log('   ✅ Jede Seite sollte ein explicit canonical tag haben');
  console.log('   ✅ Canonical URLs müssen mit metadataBase + trailingSlash übereinstimmen\n');

  console.log('3️⃣  Häufige Probleme:');
  console.log('   ❌ Duplicate Content: URLs mit und ohne trailing slash');
  console.log('   ❌ Google wählt falsche Canonical: Inkonsistente canonical tags');
  console.log('   ❌ robots.txt blockiert wichtige Seiten\n');

  console.log('='.repeat(80));
  console.log('\n🔧 EMPFOHLENE MASSNAHMEN:\n');

  console.log('1. Stelle sicher, dass ALLE internen Links trailing slashes haben');
  console.log('2. Teste URLs mit und ohne trailing slash - eine sollte zur anderen redirecten');
  console.log('3. Überprüfe in Google Search Console welche URL-Version Google bevorzugt');
  console.log('4. Fordere nach Behebung eine erneute Indexierung an\n');

  console.log('📖 Nützliche Tools:');
  console.log('   - Google Search Console: https://search.google.com/search-console');
  console.log('   - URL-Prüftool: Zeigt welche canonical URL Google sieht');
  console.log('   - Indexierungsbericht: Zeigt Indexierungsprobleme\n');
}

checkCanonicalTags().catch(console.error);
