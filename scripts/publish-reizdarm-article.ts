#!/usr/bin/env tsx
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function publish() {
  const post = await prisma.post.findUnique({
    where: { slug: 'reizdarm-rueckenschmerzen-darm-ruecken-zusammenhang' }
  });

  if (post) {
    const updated = await prisma.post.update({
      where: { id: post.id },
      data: {
        status: 'PUBLISHED',
        published: true,
        publishedAt: new Date()
      }
    });
    console.log('✅ Artikel veröffentlicht:', updated.title);
    console.log('🔗 URL: https://www.osteoalsen.de/blog/' + updated.slug);
    console.log('📅 Veröffentlicht am:', updated.publishedAt);
  } else {
    console.log('❌ Artikel nicht gefunden');
  }

  await prisma.$disconnect();
}

publish();
