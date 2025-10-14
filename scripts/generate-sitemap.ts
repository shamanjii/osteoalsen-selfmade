#!/usr/bin/env ts-node

import { writeFileSync } from 'fs';
import { join } from 'path';
import { generateSitemapXml } from '../src/lib/sitemap';

/**
 * Generiert die sitemap.xml Datei
 */
function main() {
  const sitemapXml = generateSitemapXml();
  const outputPath = join(process.cwd(), 'public', 'sitemap.xml');

  writeFileSync(outputPath, sitemapXml, 'utf-8');
  console.log('✅ Sitemap erfolgreich generiert:', outputPath);
  console.log(`📄 ${sitemapXml.split('<url>').length - 1} URLs wurden hinzugefügt`);
}

main();
