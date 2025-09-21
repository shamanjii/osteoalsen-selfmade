import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { formatDate, calculateReadingTime } from '@/lib/utils'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'

interface PageProps {
  params: {
    slug: string
  }
}

async function getPostBySlug(slug: string) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        slug,
        published: true,
        status: 'PUBLISHED'
      },
      include: {
        author: {
          select: {
            name: true,
            email: true
          }
        },
        category: {
          select: {
            name: true,
            slug: true
          }
        },
        tags: {
          include: {
            tag: {
              select: {
                name: true,
                slug: true,
                color: true
              }
            }
          }
        }
      }
    })

    if (!post) return null

    // Process markdown content
    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkHtml)
      .process(post.content)

    return {
      ...post,
      processedContent: processedContent.toString(),
      tags: post.tags.map(pt => pt.tag)
    }
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export async function generateMetadata({ params }: PageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Post nicht gefunden'
    }
  }

  return {
    title: post.metaTitle || `${post.title} | Osteoalsen Blog`,
    description: post.metaDescription || post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt || '',
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.author.name || post.author.email],
      images: post.coverImage ? [post.coverImage] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || '',
      images: post.coverImage ? [post.coverImage] : [],
    }
  }
}

export default async function CMSPostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const readingTime = calculateReadingTime(post.content)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Breadcrumb */}
      <nav className="bg-white border-b border-slate-200 py-3">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
            <span>→</span>
            <Link href="/blog" className="hover:text-slate-900 transition-colors">
              Blog
            </Link>
            <span>→</span>
            <span className="text-slate-900 font-medium truncate">{post.title}</span>
          </div>
        </div>
      </nav>

      <article className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
        {/* Header */}
        <header className="mb-12">
          {/* Category */}
          {post.category && (
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {post.category.name}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="font-epilogue text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-8">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(post.publishedAt || post.createdAt)}
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {readingTime} Min. Lesezeit
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {post.author.name || post.author.email}
            </div>
          </div>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="mb-8">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
              />
            </div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: tag.color ? `${tag.color}20` : '#f1f5f9',
                    color: tag.color || '#64748b'
                  }}
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div
            className="prose prose-lg max-w-none prose-slate
                      prose-headings:font-epilogue prose-headings:font-bold
                      prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                      prose-p:text-slate-700 prose-p:leading-relaxed
                      prose-a:text-blue-600 hover:prose-a:text-blue-700
                      prose-strong:text-slate-900 prose-strong:font-semibold
                      prose-ul:my-6 prose-ol:my-6
                      prose-li:my-2 prose-li:text-slate-700
                      prose-blockquote:border-l-4 prose-blockquote:border-blue-500
                      prose-blockquote:bg-blue-50 prose-blockquote:py-2 prose-blockquote:px-4
                      prose-blockquote:my-6 prose-blockquote:italic
                      prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                      prose-pre:bg-slate-900 prose-pre:text-slate-100"
            dangerouslySetInnerHTML={{ __html: post.processedContent }}
          />
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex justify-between items-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Zurück zum Blog
            </Link>

            <div className="text-sm text-slate-500">
              Zuletzt aktualisiert: {formatDate(post.updatedAt)}
            </div>
          </div>
        </footer>
      </article>
    </div>
  )
}