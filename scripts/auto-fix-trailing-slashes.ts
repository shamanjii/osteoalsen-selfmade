import * as fs from 'fs';
import * as path from 'path';

interface FixResult {
  file: string;
  changes: number;
  success: boolean;
  error?: string;
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

function fixTrailingSlashes(content: string): { content: string; changes: number } {
  let changes = 0;
  let newContent = content;

  // Pattern 1: href="/path" → href="/path/"
  // Aber nicht: href="/" (root), href="/api/..." (api), href="http..." (extern)
  const hrefPattern = /href="(\/(?!api\/)[^"#]*[^/"])"/g;

  newContent = newContent.replace(hrefPattern, (match, path) => {
    // Skip root URL
    if (path === '/') return match;

    // Skip if it has a file extension
    if (/\.\w+$/.test(path)) return match;

    // Skip if it starts with http or external protocol
    if (path.startsWith('http')) return match;

    // Skip mailto and tel
    if (path.startsWith('mailto:') || path.startsWith('tel:')) return match;

    changes++;
    return `href="${path}/"`;
  });

  // Pattern 2: href="/path#anchor" → href="/path/#anchor"
  // Für Anker-Links
  const anchorPattern = /href="(\/[^"#]+)(#[^"]*)"/g;

  newContent = newContent.replace(anchorPattern, (match, pathPart, anchor) => {
    // Skip root URL
    if (pathPart === '/') return match;

    // Skip if it already has trailing slash before anchor
    if (pathPart.endsWith('/')) return match;

    // Skip if it has a file extension
    if (/\.\w+$/.test(pathPart)) return match;

    changes++;
    return `href="${pathPart}/${anchor}"`;
  });

  return { content: newContent, changes };
}

async function main() {
  console.log('🔧 AUTOMATISCHES TRAILING SLASH FIX\n');
  console.log('='.repeat(80) + '\n');

  const srcDir = path.join(process.cwd(), 'src/app');
  const files = findTsxFiles(srcDir);

  console.log(`📂 ${files.length} .tsx Dateien gefunden\n`);
  console.log('🔄 Starte Bearbeitung...\n');

  const results: FixResult[] = [];
  let totalChanges = 0;

  for (const file of files) {
    try {
      const content = fs.readFileSync(file, 'utf-8');
      const { content: newContent, changes } = fixTrailingSlashes(content);

      if (changes > 0) {
        // Schreibe die Datei zurück
        fs.writeFileSync(file, newContent, 'utf-8');

        const relativePath = path.relative(process.cwd(), file);
        console.log(`✅ ${relativePath}: ${changes} Änderungen`);

        results.push({
          file: relativePath,
          changes,
          success: true
        });

        totalChanges += changes;
      }
    } catch (error: any) {
      const relativePath = path.relative(process.cwd(), file);
      console.error(`❌ ${relativePath}: ${error.message}`);

      results.push({
        file: relativePath,
        changes: 0,
        success: false,
        error: error.message
      });
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('\n📊 ZUSAMMENFASSUNG\n');

  const successfulFiles = results.filter(r => r.success && r.changes > 0);
  const failedFiles = results.filter(r => !r.success);

  console.log(`✅ Erfolgreich bearbeitet: ${successfulFiles.length} Dateien`);
  console.log(`🔧 Gesamt Änderungen: ${totalChanges} Links gefixt`);

  if (failedFiles.length > 0) {
    console.log(`❌ Fehler: ${failedFiles.length} Dateien\n`);
    failedFiles.forEach(f => {
      console.log(`   - ${f.file}: ${f.error}`);
    });
  }

  console.log('\n💡 NÄCHSTE SCHRITTE:\n');
  console.log('1. Prüfe die Änderungen: git diff');
  console.log('2. Teste die Website lokal: npm run dev');
  console.log('3. Wenn alles OK: git add . && git commit');
  console.log('');
}

main().catch(console.error);
