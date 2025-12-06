/**
 * Import Markdown posts to CMS database
 *
 * Usage: npx tsx scripts/import-markdown-to-cms.ts [filename]
 *        npx tsx scripts/import-markdown-to-cms.ts  (imports all new posts)
 */

import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const prisma = new PrismaClient();
const postsDir = path.join(process.cwd(), 'posts');

async function importPost(filePath: string, fileName: string) {
  try {
    // Read the markdown file
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content } = matter(fileContent);

    console.log(`📖 Processing: ${fileName}`);

    // Check if post with this slug already exists
    const existingPost = await prisma.post.findUnique({
      where: { slug: frontmatter.slug }
    });

    if (existingPost) {
      console.log(`   ⏭️  SKIPPED: Post with slug "${frontmatter.slug}" already exists`);
      return { imported: false, updated: false };
    }

    // Get author (use first ADMIN user if no specific author specified)
    let author;
    if (frontmatter.author) {
      author = await prisma.user.findFirst({
        where: { name: frontmatter.author }
      });
      if (!author) {
        throw new Error(`Author "${frontmatter.author}" not found in database.`);
      }
    } else {
      // Use first ADMIN user as default author
      author = await prisma.user.findFirst({
        where: { role: 'ADMIN' }
      });
      if (!author) {
        throw new Error('No ADMIN user found in database. Please create an admin user first.');
      }
      console.log(`   👤 Using default author: ${author.name}`);
    }

    // Get or create category if specified
    let categoryId: number | undefined;
    if (frontmatter.category) {
      let category = await prisma.category.findUnique({
        where: { slug: frontmatter.category }
      });

      if (!category) {
        category = await prisma.category.create({
          data: {
            name: frontmatter.category,
            slug: frontmatter.category,
          }
        });
        console.log(`   📁 Created category: ${frontmatter.category}`);
      }
      categoryId = category.id;
    }

    // Create the post
    const post = await prisma.post.create({
      data: {
        slug: frontmatter.slug,
        title: frontmatter.title,
        excerpt: frontmatter.excerpt || '',
        content: content,
        keywords: Array.isArray(frontmatter.keywords)
          ? frontmatter.keywords.join(', ')
          : frontmatter.keywords || '',
        coverImage: frontmatter.image || null,
        authorId: author.id,
        categoryId: categoryId,
        status: frontmatter.status === 'published' ? 'PUBLISHED' : 'DRAFT',
        published: frontmatter.status === 'published',
        publishedAt: frontmatter.date ? new Date(frontmatter.date) : new Date(),
      }
    });

    const statusEmoji = post.status === 'PUBLISHED' && post.published ? '✅' : '📝';
    const statusText = post.status === 'PUBLISHED' && post.published ? 'PUBLISHED' : 'DRAFT';
    console.log(`   ${statusEmoji} IMPORTED: ${fileName} → DB [${statusText}]`);

    return { imported: true, updated: false };
  } catch (error) {
    console.error(`   ❌ Error importing ${fileName}:`, error);
    throw error;
  }
}

async function importAllPosts(specificFile?: string) {
  try {
    console.log('🔍 Scanning posts directory...\n');

    // Get all markdown files or specific file
    const files = specificFile
      ? [specificFile]
      : fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

    console.log(`📚 Found ${files.length} markdown file(s)\n`);

    let importedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    for (const file of files) {
      const filePath = path.join(postsDir, file);

      if (!fs.existsSync(filePath)) {
        console.log(`   ⚠️  File not found: ${file}`);
        errorCount++;
        continue;
      }

      try {
        const result = await importPost(filePath, file);
        if (result.imported) {
          importedCount++;
        } else {
          skippedCount++;
        }
      } catch (error) {
        errorCount++;
      }
    }

    console.log(`\n✨ Import complete!`);
    console.log(`   ✅ Imported: ${importedCount} posts`);
    console.log(`   ⏭️  Skipped: ${skippedCount} posts (already exist)`);
    if (errorCount > 0) {
      console.log(`   ❌ Errors: ${errorCount} posts`);
    }

  } catch (error) {
    console.error('❌ Error during import:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Parse command line arguments
const specificFile = process.argv[2];

// Run the import
importAllPosts(specificFile)
  .then(() => {
    console.log('\n🎉 All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Import failed:', error);
    process.exit(1);
  });
