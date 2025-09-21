import { z } from 'zod'

// User Types
export const UserRoleSchema = z.enum(['USER', 'ADMIN', 'EDITOR'])
export const PostStatusSchema = z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED'])

// Post Validation Schemas
export const CreatePostSchema = z.object({
  title: z.string().min(1, 'Titel ist erforderlich').max(200, 'Titel zu lang'),
  slug: z.string().optional(),
  excerpt: z.string().max(160, 'Excerpt zu lang').optional(),
  content: z.string().min(1, 'Inhalt ist erforderlich'),
  coverImage: z.string().url().optional().or(z.literal('')),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  status: PostStatusSchema.default('DRAFT'),
  categoryId: z.string().optional(),
  tagIds: z.array(z.string()).optional(),
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
  keywords: z.string().optional(),
  publishedAt: z.date().optional()
})

export const UpdatePostSchema = CreatePostSchema.partial().extend({
  id: z.string()
})

// Category Validation Schemas
export const CreateCategorySchema = z.object({
  name: z.string().min(1, 'Name ist erforderlich'),
  slug: z.string().optional(),
  description: z.string().optional(),
  color: z.string().optional()
})

export const UpdateCategorySchema = CreateCategorySchema.partial().extend({
  id: z.string()
})

// Tag Validation Schemas
export const CreateTagSchema = z.object({
  name: z.string().min(1, 'Name ist erforderlich'),
  slug: z.string().optional(),
  color: z.string().optional()
})

export const UpdateTagSchema = CreateTagSchema.partial().extend({
  id: z.string()
})

// User Validation Schemas
export const CreateUserSchema = z.object({
  email: z.string().email('Ungültige E-Mail-Adresse'),
  name: z.string().optional(),
  password: z.string().min(6, 'Passwort muss mindestens 6 Zeichen haben'),
  role: UserRoleSchema.default('USER')
})

export const UpdateUserSchema = CreateUserSchema.partial().extend({
  id: z.string()
}).omit({ password: true })

export const ChangePasswordSchema = z.object({
  id: z.string(),
  currentPassword: z.string(),
  newPassword: z.string().min(6, 'Passwort muss mindestens 6 Zeichen haben')
})

// API Response Types
export type ApiResponse<T = any> = {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Utility Types
export type CreatePostInput = z.infer<typeof CreatePostSchema>
export type UpdatePostInput = z.infer<typeof UpdatePostSchema>
export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>
export type UpdateCategoryInput = z.infer<typeof UpdateCategorySchema>
export type CreateTagInput = z.infer<typeof CreateTagSchema>
export type UpdateTagInput = z.infer<typeof UpdateTagSchema>
export type CreateUserInput = z.infer<typeof CreateUserSchema>
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>
export type ChangePasswordInput = z.infer<typeof ChangePasswordSchema>

// Extended Prisma Types with Relations
export type PostWithRelations = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  coverImage: string | null
  published: boolean
  featured: boolean
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  authorId: string
  categoryId: string | null
  createdAt: Date
  updatedAt: Date
  publishedAt: Date | null
  metaTitle: string | null
  metaDescription: string | null
  keywords: string | null
  author: {
    id: string
    name: string | null
    email: string
  }
  category: {
    id: string
    name: string
    slug: string
  } | null
  tags: {
    id: string
    name: string
    slug: string
    color: string | null
  }[]
}

export type CategoryWithCount = {
  id: string
  name: string
  slug: string
  description: string | null
  color: string | null
  createdAt: Date
  updatedAt: Date
  _count: {
    posts: number
  }
}

export type TagWithCount = {
  id: string
  name: string
  slug: string
  color: string | null
  createdAt: Date
  updatedAt: Date
  _count: {
    posts: number
  }
}