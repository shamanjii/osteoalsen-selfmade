import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@osteoalsen.de'
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

  const hashedPassword = await bcrypt.hash(adminPassword, 12)

  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'Admin',
      password: hashedPassword,
      role: 'ADMIN'
    }
  })

  console.log('Admin user created:', adminUser)

  // Create default categories
  const categories = [
    {
      name: 'Osteopathie',
      slug: 'osteopathie',
      description: 'Artikel über osteopathische Behandlungen und Techniken',
      color: '#059669'
    },
    {
      name: 'Gesundheitstipps',
      slug: 'gesundheitstipps',
      description: 'Allgemeine Tipps für ein gesundes Leben',
      color: '#0284c7'
    },
    {
      name: 'Behandlungen',
      slug: 'behandlungen',
      description: 'Informationen zu verschiedenen Behandlungsmethoden',
      color: '#dc2626'
    }
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category
    })
  }

  console.log('Default categories created')

  // Create default tags
  const tags = [
    { name: 'Rückenschmerzen', slug: 'rueckenschmerzen', color: '#dc2626' },
    { name: 'Kopfschmerzen', slug: 'kopfschmerzen', color: '#ea580c' },
    { name: 'Schwangerschaft', slug: 'schwangerschaft', color: '#db2777' },
    { name: 'Sport', slug: 'sport', color: '#059669' },
    { name: 'Prävention', slug: 'praevention', color: '#0284c7' }
  ]

  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: {},
      create: tag
    })
  }

  console.log('Default tags created')

  // Create a sample post
  const osteopathieCategory = await prisma.category.findUnique({
    where: { slug: 'osteopathie' }
  })

  if (osteopathieCategory) {
    await prisma.post.upsert({
      where: { slug: 'willkommen-im-cms' },
      update: {},
      create: {
        title: 'Willkommen im neuen CMS',
        slug: 'willkommen-im-cms',
        excerpt: 'Das neue Content Management System für Osteoalsen ist jetzt live.',
        content: `# Willkommen im neuen CMS

Dieses neue Content Management System bietet moderne Funktionen für die Verwaltung von Blog-Posts:

## Features
- **Rich Text Editor** - Einfache Bearbeitung von Inhalten
- **Kategorien & Tags** - Bessere Organisation der Posts
- **SEO-Optimierung** - Meta-Tags und Suchmaschinenoptimierung
- **Responsive Design** - Optimiert für alle Geräte
- **Sichere Authentifizierung** - Geschützter Admin-Bereich

## Nächste Schritte
1. Melden Sie sich im Admin-Bereich an
2. Erstellen Sie neue Kategorien und Tags
3. Beginnen Sie mit dem Schreiben neuer Posts

Viel Spaß beim Bloggen!`,
        published: true,
        status: 'PUBLISHED',
        publishedAt: new Date(),
        authorId: adminUser.id,
        categoryId: osteopathieCategory.id,
        metaTitle: 'Willkommen im neuen CMS - Osteoalsen',
        metaDescription: 'Das neue Content Management System für Osteoalsen ist jetzt live mit vielen neuen Features.',
        keywords: 'CMS, Blog, Osteopathie, Content Management'
      }
    })
  }

  console.log('Sample post created')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })