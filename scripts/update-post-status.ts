import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updatePostStatus() {
  const post = await prisma.post.update({
    where: { slug: 'gelenkbeschwerden-osteopathie-ganzheitliche-behandlung' },
    data: {
      status: 'PUBLISHED',
      published: true,
      publishedAt: new Date('2024-12-10'),
    },
  });

  console.log(`✅ Post updated: ${post.title} → PUBLISHED`);
}

updatePostStatus()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
