const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Rensa befintliga data
  await prisma.quotation.deleteMany();
  await prisma.project.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.user.deleteMany();

  // Skapa användare
  const user1 = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob@prisma.io',
    },
  });

  // Skapa kunder
  const customer1 = await prisma.customer.create({
    data: {
      name: 'Customer One',
      email: 'customer.one@company.com',
      createdById: user1.id,
      createdAt: new Date(),
    },
  });

  const customer2 = await prisma.customer.create({
    data: {
      name: 'Customer Two',
      email: 'customer.two@company.com',
      createdById: user2.id,
      createdAt: new Date(),
    },
  });

  // Skapa projekt
  const project1 = await prisma.project.create({
    data: {
      projectNumber: 'P001',
      customerId: customer1.id,
      status: 'ACTIVE',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const project2 = await prisma.project.create({
    data: {
      projectNumber: 'P002',
      customerId: customer2.id,
      status: 'COMPLETED',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Skapa offerter
  await prisma.quotation.create({
    data: {
      quotationNumber: 'Q001',
      projectId: project1.id,
      createdById: user1.id,
      status: 'SENT',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  await prisma.quotation.create({
    data: {
      quotationNumber: 'Q002',
      projectId: project1.id,
      createdById: user1.id,
      status: 'APPROVED',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  await prisma.quotation.create({
    data: {
      quotationNumber: 'Q003',
      projectId: project2.id,
      createdById: user2.id,
      status: 'REJECTED',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
