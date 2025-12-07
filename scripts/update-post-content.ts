import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import matter from 'gray-matter';

const prisma = new PrismaClient();

async function updatePostContent() {
  const slug = 'kniearthrose-ohne-op-behandeln';
  const filePath = `./posts/${slug}.md`;

  try {
    // Read updated markdown file
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content } = matter(fileContent);

    // Update in database
    const updated = await prisma.post.update({
      where: { slug },
      data: {
        content,
        coverImage: frontmatter.image
      }
    });

    console.log(`✅ Updated content for "${slug}"`);
    console.log(`   Updated: content + cover image`);
  } catch (error) {
    console.error('❌ Error updating post:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

updatePostContent();
