import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { CreatePostSchema, type ApiResponse, type PostWithRelations } from '@/lib/types'
import { generateSlug, extractExcerpt } from '@/lib/utils'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const categoryId = searchParams.get('categoryId')
    const search = searchParams.get('search')
    const published = searchParams.get('published')

    const skip = (page - 1) * limit

    const where: {
      status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
      published?: boolean
      categoryId?: string
      OR?: Array<{
        title?: { contains: string; mode: 'insensitive' }
        content?: { contains: string; mode: 'insensitive' }
        excerpt?: { contains: string; mode: 'insensitive' }
      }>
    } = {}

    if (status && status !== 'all') {
      where.status = status as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
    }

    if (published === 'true') {
      where.published = true
      where.status = 'PUBLISHED' as const
    }

    if (categoryId) {
      where.categoryId = categoryId
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } }
      ]
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          category: {
            select: {
              id: true,
              name: true,
              slug: true
            }
          },
          tags: {
            include: {
              tag: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                  color: true
                }
              }
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit
      }),
      prisma.post.count({ where })
    ])

    // Transform the data to match our type
    const transformedPosts: PostWithRelations[] = posts.map(post => ({
      ...post,
      tags: post.tags.map(pt => pt.tag)
    }))

    const response: ApiResponse<{ posts: PostWithRelations[], pagination: { page: number; limit: number; total: number; pages: number } }> = {
      success: true,
      data: {
        posts: transformedPosts,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching posts:', error)
    const response: ApiResponse = {
      success: false,
      error: 'Fehler beim Laden der Posts'
    }
    return NextResponse.json(response, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = CreatePostSchema.parse(body)

    // Generate slug if not provided
    const slug = validatedData.slug || generateSlug(validatedData.title)

    // Check if slug is unique
    const existingPost = await prisma.post.findUnique({
      where: { slug }
    })

    if (existingPost) {
      return NextResponse.json(
        { success: false, error: 'Ein Post mit diesem Slug existiert bereits' },
        { status: 400 }
      )
    }

    // Generate excerpt if not provided
    const excerpt = validatedData.excerpt || extractExcerpt(validatedData.content)

    // Create the post
    const post = await prisma.post.create({
      data: {
        title: validatedData.title,
        slug,
        excerpt,
        content: validatedData.content,
        coverImage: validatedData.coverImage,
        published: validatedData.published,
        featured: validatedData.featured,
        status: validatedData.status,
        categoryId: validatedData.categoryId,
        metaTitle: validatedData.metaTitle,
        metaDescription: validatedData.metaDescription,
        keywords: validatedData.keywords,
        publishedAt: validatedData.published ? new Date() : null,
        authorId: session.user.id
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        tags: {
          include: {
            tag: {
              select: {
                id: true,
                name: true,
                slug: true,
                color: true
              }
            }
          }
        }
      }
    })

    // Handle tags if provided
    if (validatedData.tagIds && validatedData.tagIds.length > 0) {
      await prisma.postTag.createMany({
        data: validatedData.tagIds.map(tagId => ({
          postId: post.id,
          tagId
        }))
      })
    }

    const response: ApiResponse<PostWithRelations> = {
      success: true,
      data: {
        ...post,
        tags: post.tags.map(pt => pt.tag)
      },
      message: 'Post erfolgreich erstellt'
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Ungültige Daten' },
        { status: 400 }
      )
    }

    const response: ApiResponse = {
      success: false,
      error: 'Fehler beim Erstellen des Posts'
    }
    return NextResponse.json(response, { status: 500 })
  }
}