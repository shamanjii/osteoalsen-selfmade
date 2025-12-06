import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listUsers() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    }
  });

  console.log('\n📋 Users in database:\n');
  console.table(users);
  console.log(`\nTotal: ${users.length} user(s)\n`);

  await prisma.$disconnect();
}

listUsers().catch(console.error);
