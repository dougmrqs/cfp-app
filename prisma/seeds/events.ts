import { prisma } from '../../src/connection';

async function seed() {
  await prisma.event.upsert({
    where: { name: '42Conf 2025' },
    update: {},
    create: {
      name: '42Conf 2025',
      startDate: new Date('2025-03-01'),
      endDate: new Date('2025-03-03'),
    }
  });
}

seed().then(async () => {
  await prisma.$disconnect();
}).catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
