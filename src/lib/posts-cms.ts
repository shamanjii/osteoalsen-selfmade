import { prisma } from './db';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkRehype from 'remark-rehype';

export type PostFrontmatter = {
  slug: string;
  title: string;
  excerpt?: string;
  keywords?: string[];
  image?: string;
  alt?: string;
  date?: string;
  status?: 'draft' | 'published';
  category?: string;
  specialty?: string;
  sourceCount?: number;
  citations?: {
    title: string;
    author?: string;
    url?: string;
    identifier?: string;
  }[];
};

export type Post = PostFrontmatter & {
  content: string;
  readingTime?: number; // in minutes
  extractedCitations?: {
    id: string;
    title: string;
    url?: string;
  }[];
};

/**
 * Calculate reading time in minutes based on word count
 * Average reading speed: 200 words per minute
 */
function calculateReadingTime(content: string): number {
  // Remove markdown syntax for accurate word count
  const plainText = content
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[([^\]]+)\]\(.*?\)/g, '$1') // Keep link text only
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]+`/g, '') // Remove inline code
    .replace(/[#*_~-]/g, '') // Remove markdown formatting
    .trim();

  const wordCount = plainText.split(/\s+/).filter(word => word.length > 0).length;
  const readingTime = Math.max(3, Math.round(wordCount / 200)); // Minimum 3 minutes

  return readingTime;
}

/**
 * Fetches all published posts from CMS database
 */
export async function getAllPosts(): Promise<Post[]> {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
        status: 'PUBLISHED',
      },
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
        publishedAt: 'desc',
      },
    });

    const transformedPosts: Post[] = await Promise.all(
      posts.map(async (post) => {
        // Convert Markdown to HTML with automatic heading IDs
        const processedContent = await remark()
          .use(gfm)
          .use(remarkRehype) // Convert markdown to HTML tree
          .use(rehypeSlug) // Add IDs to headings
          .use(rehypeStringify) // Convert HTML tree to string
          .process(post.content);

        const readingTime = calculateReadingTime(post.content);

        return {
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt || '',
          keywords: post.keywords
            ? post.keywords.split(',').map((k) => k.trim())
            : [],
          image: post.coverImage || undefined,
          alt: post.title,
          date: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
          status: 'published' as const,
          category: post.category?.slug || undefined,
          content: String(processedContent),
          readingTime,
        };
      })
    );

    return transformedPosts;
  } catch (error) {
    console.error('Error fetching posts from CMS:', error);
    return [];
  }
}

/**
 * Fetches a single post by slug from CMS database
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const post = await prisma.post.findUnique({
      where: {
        slug,
        published: true,
        status: 'PUBLISHED',
      },
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
    });

    if (!post) {
      return null;
    }

    // Convert Markdown to HTML with automatic heading IDs
    const processedContent = await remark()
      .use(gfm)
      .use(remarkRehype) // Convert markdown to HTML tree
      .use(rehypeSlug) // Add IDs to headings
      .use(rehypeStringify) // Convert HTML tree to string
      .process(post.content);

    const readingTime = calculateReadingTime(post.content);

    return {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt || '',
      keywords: post.keywords
        ? post.keywords.split(',').map((k) => k.trim())
        : [],
      image: post.coverImage || undefined,
      alt: post.title,
      date: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
      status: 'published' as const,
      category: post.category?.slug || undefined,
      content: String(processedContent),
      readingTime,
    };
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Gets all slugs from CMS database
 */
export async function getAllSlugs(): Promise<string[]> {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
        status: 'PUBLISHED',
      },
      select: {
        slug: true,
      },
      orderBy: {
        publishedAt: 'desc',
      },
    });

    return posts.map((post) => post.slug);
  } catch (error) {
    console.error('Error fetching slugs from CMS:', error);
    return [];
  }
}
