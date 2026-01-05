import * as fs from 'fs';
import * as path from 'path';

interface LinkIssue {
  file: string;
  line: number;
  content: string;
  href: string;
}

function findTsxFiles(dir: string): string[] {
  const files: string[] = [];

  function walk(directory: string) {
    const entries = fs.readdirSync(directory, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.tsx')) {
        files.push(fullPath);
      }
    }
  }

  walk(dir);
  return files;
}

function findLinksWithoutTrailingSlash(filePath: string): LinkIssue[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const issues: LinkIssue[] = [];

  // Regex für interne Links ohne trailing slash
  // Ausnahmen: root (/), api (/ api/*), externe Links (http), bereits mit trailing slash
  const hrefPattern = /href="(\/[^/"]+(?:\/[^/"]*)*(?<!\/))"(?!\/)/g;

  lines.forEach((line, index) => {
    let match;
    const lineHrefPattern = /href="(\/[^"]*)"()/g;

    while ((match = lineHrefPattern.exec(line)) !== null) {
      const href = match[1];

      // Skip root URL
      if (href === '/') continue;

      // Skip API routes
      if (href.startsWith('/api/')) continue;

      // Skip externe Links
      if (href.startsWith('http')) continue;

      // Skip mailto/tel links
      if (href.startsWith('mailto:') || href.startsWith('tel:')) continue;

      // Skip anchor links
      if (href.startsWith('#')) continue;

      // Check if it already has trailing slash
      if (href.endsWith('/')) continue;

      // Check if it's a file (has extension)
      if (href.match(/\.\w+$/)) continue;

      issues.push({
        file: filePath,
        line: index + 1,
        content: line.trim(),
        href
      });
    }
  });

  return issues;
}

async function main() {
  console.log('🔍 SUCHE NACH LINKS OHNE TRAILING SLASH\n');
  console.log('='.repeat(80) + '\n');

  const srcDir = path.join(process.cwd(), 'src/app');
  const files = findTsxFiles(srcDir);

  console.log(`📂 ${files.length} .tsx Dateien gefunden\n`);

  const allIssues: LinkIssue[] = [];

  for (const file of files) {
    const issues = findLinksWithoutTrailingSlash(file);
    allIssues.push(...issues);
  }

  if (allIssues.length === 0) {
    console.log('✅ Keine Probleme gefunden! Alle Links haben trailing slashes.\n');
    return;
  }

  console.log(`⚠️  ${allIssues.length} Links ohne trailing slash gefunden:\n`);

  // Gruppiere nach Datei
  const byFile = new Map<string, LinkIssue[]>();
  for (const issue of allIssues) {
    const relativePath = path.relative(process.cwd(), issue.file);
    if (!byFile.has(relativePath)) {
      byFile.set(relativePath, []);
    }
    byFile.get(relativePath)!.push(issue);
  }

  // Zeige Ergebnisse
  for (const [file, issues] of byFile.entries()) {
    console.log(`📄 ${file} (${issues.length} issues):`);

    for (const issue of issues) {
      console.log(`   Zeile ${issue.line}: ${issue.href}`);
      console.log(`      Sollte sein: ${issue.href}/`);
    }

    console.log('');
  }

  console.log('='.repeat(80));
  console.log('\n💡 WARUM IST DAS WICHTIG?\n');

  console.log('Next.js ist auf trailingSlash: true konfiguriert.');
  console.log('Das bedeutet:');
  console.log('  • Alle URLs MÜSSEN mit "/" enden');
  console.log('  • /blog wird automatisch zu /blog/ redirected');
  console.log('  • Aber: Suchmaschinen sehen /blog und /blog/ als UNTERSCHIEDLICHE URLs');
  console.log('  • Das führt zu DUPLICATE CONTENT Problemen\n');

  console.log('🔧 LÖSUNG:\n');
  console.log('1. Manuell: Füge trailing slashes zu allen internen Links hinzu');
  console.log('2. Automatisch: Nutze ein Find & Replace Tool in deinem Editor');
  console.log('3. Beispiel: href="/blog" → href="/blog/"\n');

  console.log('📋 SUCHEN & ERSETZEN PATTERNS:\n');

  // Generiere unique hrefs
  const uniqueHrefs = [...new Set(allIssues.map(i => i.href))];
  const sortedHrefs = uniqueHrefs.sort();

  console.log('Ersetze diese Links:');
  sortedHrefs.slice(0, 10).forEach(href => {
    console.log(`   "${href}" → "${href}/"`);
  });

  if (sortedHrefs.length > 10) {
    console.log(`   ... und ${sortedHrefs.length - 10} weitere\n`);
  } else {
    console.log('');
  }

  console.log('💡 TIPP: Nutze VSCode Find & Replace (Cmd+Shift+H):');
  console.log('   Suchen: href="(/[^"]+)"');
  console.log('   Ersetzen: href="$1/"');
  console.log('   (mit Regex aktiviert)\n');
}

main().catch(console.error);
