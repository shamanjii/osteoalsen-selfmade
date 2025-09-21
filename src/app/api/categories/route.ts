import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { CreateCategorySchema, type ApiResponse, type CategoryWithCount } from '@/lib/types'
import { generateSlug } from '@/lib/utils'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeCount = searchParams.get('includeCount') === 'true'

    const categories = await prisma.category.findMany({
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

    const response: ApiResponse<CategoryWithCount[]> = {
      success: true,
      data: categories
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching categories:', error)
    const response: ApiResponse = {
      success: false,
      error: 'Fehler beim Laden der Kategorien'
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
    const validatedData = CreateCategorySchema.parse(body)

    // Generate slug if not provided
    const slug = validatedData.slug || generateSlug(validatedData.name)

    // Check if slug is unique
    const existingCategory = await prisma.category.findUnique({
      where: { slug }
    })

    if (existingCategory) {
      return NextResponse.json(
        { success: false, error: 'Eine Kategorie mit diesem Slug existiert bereits' },
        { status: 400 }
      )
    }

    const category = await prisma.category.create({
      data: {
        name: validatedData.name,
        slug,
        description: validatedData.description,
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

    const response: ApiResponse<CategoryWithCount> = {
      success: true,
      data: category,
      message: 'Kategorie erfolgreich erstellt'
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error('Error creating category:', error)

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Ungültige Daten' },
        { status: 400 }
      )
    }

    const response: ApiResponse = {
      success: false,
      error: 'Fehler beim Erstellen der Kategorie'
    }
    return NextResponse.json(response, { status: 500 })
  }
}