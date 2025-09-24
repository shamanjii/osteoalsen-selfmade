import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { CreateTagSchema, type ApiResponse, type TagWithCount } from '@/lib/types'
import { generateSlug } from '@/lib/utils'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeCount = searchParams.get('includeCount') === 'true'

    const tags = await prisma.tag.findMany({
      ...(includeCount && {
        include: {
          _count: {
            select: {
              posts: true
            }
          }
        }
      }),
      orderBy: {
        name: 'asc'
      }
    })

    const response: ApiResponse<TagWithCount[]> = {
      success: true,
      data: tags as TagWithCount[]
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching tags:', error)
    const response: ApiResponse = {
      success: false,
      error: 'Fehler beim Laden der Tags'
    }
    return NextResponse.json(response, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'EDITOR')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = CreateTagSchema.parse(body)

    // Generate slug if not provided
    const slug = validatedData.slug || generateSlug(validatedData.name)

    // Check if slug is unique
    const existingTag = await prisma.tag.findUnique({
      where: { slug }
    })

    if (existingTag) {
      return NextResponse.json(
        { success: false, error: 'Ein Tag mit diesem Slug existiert bereits' },
        { status: 400 }
      )
    }

    const tag = await prisma.tag.create({
      data: {
        name: validatedData.name,
        slug,
        color: validatedData.color
      },
      include: {
        _count: {
          select: {
            posts: true
          }
        }
      }
    })

    const response: ApiResponse<TagWithCount> = {
      success: true,
      data: tag,
      message: 'Tag erfolgreich erstellt'
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error('Error creating tag:', error)

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Ungültige Daten' },
        { status: 400 }
      )
    }

    const response: ApiResponse = {
      success: false,
      error: 'Fehler beim Erstellen des Tags'
    }
    return NextResponse.json(response, { status: 500 })
  }
}