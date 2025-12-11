/**
 * Sync ALL Markdown posts to CMS database
 * Updates existing posts with content from markdown files
 *
 * Usage: npx tsx scripts/sync-all-posts-to-db.ts
 */

import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const prisma = new PrismaClient();
const postsDir = path.join(process.cwd(), 'posts');

async function syncAllPosts() {
  try {
    console.log('🔄 Syncing all markdown posts to database...\n');

    // Get all markdown files
    const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
    console.log(`📚 Found ${files.length} markdown files\n`);

    let updatedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    for (const file of files) {
      const filePath = path.join(postsDir, file);

      try {
        // Read markdown file
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data: frontmatter, content } = matter(fileContent);

        console.log(`📖 Processing: ${file}`);
        console.log(`   Slug: ${frontmatter.slug}`);

        // Check if post exists in database
        const existingPost = await prisma.post.findUnique({
          where: { slug: frontmatter.slug }
        });

        if (!existingPost) {
          console.log(`   ⏭️  SKIPPED: Post "${frontmatter.slug}" not found in database`);
          skippedCount++;
          continue;
        }

        // Update post content
        await prisma.post.update({
          where: { slug: frontmatter.slug },
          data: {
            title: frontmatter.title,
            excerpt: frontmatter.excerpt || '',
            content: content,
            keywords: Array.isArray(frontmatter.keywords)
              ? frontmatter.keywords.join(', ')
              : frontmatter.keywords || '',
            coverImage: frontmatter.image || null,
          }
        });

        console.log(`   ✅ UPDATED: Content synced to database`);
        updatedCount++;

      } catch (error) {
        console.error(`   ❌ Error updating ${file}:`, error);
        errorCount++;
      }
    }

    console.log(`\n✨ Sync complete!`);
    console.log(`   ✅ Updated: ${updatedCount} posts`);
    console.log(`   ⏭️  Skipped: ${skippedCount} posts (not in DB)`);
    if (errorCount > 0) {
      console.log(`   ❌ Errors: ${errorCount} posts`);
    }

  } catch (error) {
    console.error('❌ Error during sync:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the sync
syncAllPosts()
  .then(() => {
    console.log('\n🎉 All posts synced to database!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Sync failed:', error);
    process.exit(1);
  });
