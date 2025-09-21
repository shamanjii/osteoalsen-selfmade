import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { UpdatePostSchema, type ApiResponse, type PostWithRelations } from '@/lib/types'
import { generateSlug, extractExcerpt } from '@/lib/utils'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
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

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post nicht gefunden' },
        { status: 404 }
      )
    }

    const transformedPost: PostWithRelations = {
      ...post,
      tags: post.tags.map(pt => pt.tag)
    }

    const response: ApiResponse<PostWithRelations> = {
      success: true,
      data: transformedPost
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching post:', error)
    const response: ApiResponse = {
      success: false,
      error: 'Fehler beim Laden des Posts'
    }
    return NextResponse.json(response, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = UpdatePostSchema.parse({ ...body, id: params.id })

    // Check if post exists
    const existingPost = await prisma.post.findUnique({
      where: { id: params.id }
    })

    if (!existingPost) {
      return NextResponse.json(
        { success: false, error: 'Post nicht gefunden' },
        { status: 404 }
      )
    }

    // Check authorization (only author or admin can edit)
    if (
      existingPost.authorId !== session.user.id &&
      session.user.role !== 'ADMIN'
    ) {
      return NextResponse.json(
        { success: false, error: 'Keine Berechtigung' },
        { status: 403 }
      )
    }

    // Generate slug if title changed
    let slug = existingPost.slug
    if (validatedData.title && validatedData.title !== existingPost.title) {
      slug = validatedData.slug || generateSlug(validatedData.title)

      // Check if new slug is unique
      const slugExists = await prisma.post.findFirst({
        where: {
          slug,
          NOT: { id: params.id }
        }
      })

      if (slugExists) {
        return NextResponse.json(
          { success: false, error: 'Ein Post mit diesem Slug existiert bereits' },
          { status: 400 }
        )
      }
    }

    // Generate excerpt if content changed
    let excerpt = validatedData.excerpt
    if (!excerpt && validatedData.content) {
      excerpt = extractExcerpt(validatedData.content)
    }

    // Handle published status
    let publishedAt = existingPost.publishedAt
    if (validatedData.published && !existingPost.published) {
      publishedAt = new Date()
    } else if (validatedData.published === false) {
      publishedAt = null
    }

    // Update the post
    const updateData: any = {
      ...validatedData,
      slug,
      excerpt,
      publishedAt
    }

    delete updateData.id
    delete updateData.tagIds

    const post = await prisma.post.update({
      where: { id: params.id },
      data: updateData,
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

    // Handle tags update
    if (validatedData.tagIds !== undefined) {
      // Remove existing tags
      await prisma.postTag.deleteMany({
        where: { postId: params.id }
      })

      // Add new tags
      if (validatedData.tagIds.length > 0) {
        await prisma.postTag.createMany({
          data: validatedData.tagIds.map(tagId => ({
            postId: params.id,
            tagId
          }))
        })
      }
    }

    const response: ApiResponse<PostWithRelations> = {
      success: true,
      data: {
        ...post,
        tags: post.tags.map(pt => pt.tag)
      },
      message: 'Post erfolgreich aktualisiert'
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error updating post:', error)

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Ungültige Daten' },
        { status: 400 }
      )
    }

    const response: ApiResponse = {
      success: false,
      error: 'Fehler beim Aktualisieren des Posts'
    }
    return NextResponse.json(response, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if post exists
    const existingPost = await prisma.post.findUnique({
      where: { id: params.id }
    })

    if (!existingPost) {
      return NextResponse.json(
        { success: false, error: 'Post nicht gefunden' },
        { status: 404 }
      )
    }

    // Check authorization (only author or admin can delete)
    if (
      existingPost.authorId !== session.user.id &&
      session.user.role !== 'ADMIN'
    ) {
      return NextResponse.json(
        { success: false, error: 'Keine Berechtigung' },
        { status: 403 }
      )
    }

    // Delete the post (cascade will handle related records)
    await prisma.post.delete({
      where: { id: params.id }
    })

    const response: ApiResponse = {
      success: true,
      message: 'Post erfolgreich gelöscht'
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error deleting post:', error)
    const response: ApiResponse = {
      success: false,
      error: 'Fehler beim Löschen des Posts'
    }
    return NextResponse.json(response, { status: 500 })
  }
}