/**
 * Export all CMS posts (published + drafts) to Markdown files
 *
 * Usage: npx tsx scripts/export-cms-to-markdown.ts
 */

import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const postsDir = path.join(process.cwd(), 'posts');

// Ensure posts directory exists
if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

async function exportPosts() {
  try {
    console.log('🔍 Fetching all posts from database...\n');

    // Fetch ALL posts (published and drafts)
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
        tags: {
          include: {
            tag: {
              select: {
                name: true,
                slug: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    console.log(`📚 Found ${posts.length} posts (including drafts)\n`);

    let exportedCount = 0;
    let skippedCount = 0;

    for (const post of posts) {
      const fileName = `${post.slug}.md`;
      const filePath = path.join(postsDir, fileName);

      // Check if file already exists
      if (fs.existsSync(filePath)) {
        console.log(`⏭️  SKIPPED: ${fileName} (already exists)`);
        skippedCount++;
        continue;
      }

      // Build frontmatter
      const frontmatter: Record<string, any> = {
        slug: post.slug,
        title: post.title,
      };

      if (post.excerpt) frontmatter.excerpt = post.excerpt;

      // Keywords as array
      if (post.keywords) {
        frontmatter.keywords = post.keywords.split(',').map(k => k.trim());
      }

      if (post.coverImage) frontmatter.image = post.coverImage;
      if (post.title) frontmatter.alt = post.title;

      // Use publishedAt if available, otherwise createdAt
      const dateToUse = post.publishedAt || post.createdAt;
      frontmatter.date = dateToUse.toISOString();

      // Status: draft or published
      frontmatter.status = post.status === 'PUBLISHED' && post.published ? 'published' : 'draft';

      if (post.category?.slug) frontmatter.category = post.category.slug;

      // Optional: Author info
      if (post.author?.name) {
        frontmatter.author = post.author.name;
      }

      // Convert frontmatter to YAML
      const yamlLines = ['---'];
      for (const [key, value] of Object.entries(frontmatter)) {
        if (Array.isArray(value)) {
          yamlLines.push(`${key}:`);
          value.forEach(item => yamlLines.push(`  - "${item}"`));
        } else if (typeof value === 'string') {
          // Escape quotes in strings
          const escapedValue = value.replace(/"/g, '\\"');
          yamlLines.push(`${key}: "${escapedValue}"`);
        } else {
          yamlLines.push(`${key}: ${value}`);
        }
      }
      yamlLines.push('---');
      yamlLines.push(''); // Empty line after frontmatter

      // Combine frontmatter + content
      const markdownContent = yamlLines.join('\n') + post.content;

      // Write to file
      fs.writeFileSync(filePath, markdownContent, 'utf-8');

      const statusEmoji = post.status === 'PUBLISHED' && post.published ? '✅' : '📝';
      const statusText = post.status === 'PUBLISHED' && post.published ? 'PUBLISHED' : 'DRAFT';
      console.log(`${statusEmoji} EXPORTED: ${fileName} [${statusText}]`);
      exportedCount++;
    }

    console.log(`\n✨ Export complete!`);
    console.log(`   - Exported: ${exportedCount} files`);
    console.log(`   - Skipped: ${skippedCount} files (already exist)`);
    console.log(`   - Total posts in DB: ${posts.length}`);
    console.log(`\n📁 Files location: ${postsDir}`);

  } catch (error) {
    console.error('❌ Error exporting posts:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the export
exportPosts()
  .then(() => {
    console.log('\n🎉 All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Export failed:', error);
    process.exit(1);
  });
