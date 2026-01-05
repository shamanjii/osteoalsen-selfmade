import { config } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

config();

async function checkRobotsAndSitemap() {
  console.log('🔍 INDEXIERUNGSPROBLEME - LOKALE PRÜFUNG\n');
  console.log('='.repeat(80) + '\n');

  // 1. Prüfe robots.txt
  console.log('📄 Prüfe robots.txt...\n');

  const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');

  if (fs.existsSync(robotsPath)) {
    const robotsContent = fs.readFileSync(robotsPath, 'utf-8');
    console.log('✅ robots.txt gefunden:');
    console.log('─'.repeat(60));
    console.log(robotsContent);
    console.log('─'.repeat(60) + '\n');

    // Prüfe auf Disallow-Regeln
    const disallowLines = robotsContent.split('\n').filter(line =>
      line.trim().toLowerCase().startsWith('disallow:')
    );

    if (disallowLines.length > 0) {
      console.log('⚠️  Gefundene Disallow-Regeln:');
      disallowLines.forEach(line => console.log(`   ${line.trim()}`));
      console.log('');
    }
  } else {
    console.log('❌ robots.txt nicht gefunden\n');
  }

  // 2. Prüfe Sitemap
  console.log('🗺️  Prüfe Sitemap...\n');

  const sitemapPaths = [
    path.join(process.cwd(), 'public', 'sitemap.xml'),
    path.join(process.cwd(), 'public', 'sitemap-0.xml')
  ];

  for (const sitemapPath of sitemapPaths) {
    if (fs.existsSync(sitemapPath)) {
      console.log(`✅ ${path.basename(sitemapPath)} gefunden`);

      const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
      const urlMatches = sitemapContent.match(/<loc>(.*?)<\/loc>/g) || [];
      const urls = urlMatches.map(match => match.replace(/<\/?loc>/g, ''));

      console.log(`   📊 ${urls.length} URLs in der Sitemap\n`);

      // Zeige erste 10 URLs
      console.log('   Erste 10 URLs:');
      urls.slice(0, 10).forEach((url, i) => {
        const path = url.replace('https://www.osteoalsen.de', '') || '/';
        console.log(`   ${i + 1}. ${path}`);
      });
      console.log('');
    }
  }

  // 3. Prüfe Meta-Robots in wichtigen Dateien
  console.log('🤖 Prüfe Meta-Robots-Tags in Komponenten...\n');

  const filesToCheck = [
    'src/app/layout.tsx',
    'src/app/(site)/layout.tsx',
    'src/app/(site)/page.tsx',
    'src/app/api/sitemap/route.ts'
  ];

  for (const file of filesToCheck) {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');

      // Suche nach noindex
      if (content.includes('noindex') || content.includes('nofollow')) {
        console.log(`⚠️  ${file}:`);

        const lines = content.split('\n');
        lines.forEach((line, i) => {
          if (line.includes('noindex') || line.includes('nofollow')) {
            console.log(`   Zeile ${i + 1}: ${line.trim()}`);
          }
        });
        console.log('');
      }
    }
  }

  // 4. Prüfe canonical Tags
  console.log('🔗 Prüfe Canonical-Tags in Layouts...\n');

  const layoutFiles = [
    'src/app/layout.tsx',
    'src/app/(site)/layout.tsx'
  ];

  for (const file of layoutFiles) {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');

      if (content.includes('canonical') || content.includes('metadataBase')) {
        console.log(`✅ ${file}:`);

        const lines = content.split('\n');
        lines.forEach((line, i) => {
          if (line.includes('canonical') || line.includes('metadataBase')) {
            console.log(`   Zeile ${i + 1}: ${line.trim()}`);
          }
        });
        console.log('');
      }
    }
  }

  console.log('='.repeat(80));
  console.log('\n💡 HÄUFIGE URSACHEN FÜR INDEXIERUNGSPROBLEME:\n');

  console.log('1️⃣  DUPLIKAT - Google wählt andere Seite als Canonical:');
  console.log('   - Ähnlicher Content auf mehreren URLs');
  console.log('   - Fehlende oder inkonsistente canonical Tags');
  console.log('   - URL-Varianten (mit/ohne trailing slash, www/non-www)\n');

  console.log('2️⃣  NOINDEX-Tag:');
  console.log('   - Versehentliche noindex meta tags');
  console.log('   - X-Robots-Tag Header in API responses');
  console.log('   - Next.js metadata mit robots: "noindex"\n');

  console.log('3️⃣  ALTERNATIVE SEITE MIT RICHTIGEM CANONICAL TAG:');
  console.log('   - Canonical zeigt auf andere URL');
  console.log('   - Mobile vs. Desktop Versionen');
  console.log('   - AMP-Seiten mit canonical auf non-AMP\n');

  console.log('='.repeat(80));
  console.log('\n🔧 NÄCHSTE SCHRITTE:\n');
  console.log('1. Öffne https://search.google.com/search-console');
  console.log('2. Gehe zu "Indexierung" → "Seiten"');
  console.log('3. Prüfe die spezifischen URLs mit Problemen');
  console.log('4. Nutze das URL-Prüftool für Details');
  console.log('5. Fordere nach Behebung eine erneute Indexierung an\n');
}

checkRobotsAndSitemap().catch(console.error);
