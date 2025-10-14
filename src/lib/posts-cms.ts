import { prisma } from './db';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

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
  extractedCitations?: {
    id: string;
    title: string;
    url?: string;
  }[];
};

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
        // Convert HTML content to ensure compatibility
        const processedContent = await remark()
          .use(gfm)
          .use(html)
          .process(post.content);

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

    // Convert HTML content to ensure compatibility
    const processedContent = await remark()
      .use(gfm)
      .use(html)
      .process(post.content);

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
