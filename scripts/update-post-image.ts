import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updatePostImage() {
  const slug = 'kniearthrose-ohne-op-behandeln';
  const newImage = 'https://physiotutors.com/wp-content/uploads/2023/10/Knee-Osteoarthritis.jpg';

  try {
    const updated = await prisma.post.update({
      where: { slug },
      data: { coverImage: newImage }
    });

    console.log(`✅ Updated cover image for "${slug}"`);
    console.log(`   New image: ${newImage}`);
  } catch (error) {
    console.error('❌ Error updating post:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

updatePostImage();
