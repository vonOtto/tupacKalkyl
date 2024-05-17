const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Skapa några användare
  const user1 = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com'
    }
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob@example.com'
    }
  });

  // Skapa några kunder
  const customer1 = await prisma.customer.create({
    data: {
      name: 'Acme Corp',
      email: 'contact@acme.com',
      createdById: user1.id
    }
  });

  const customer2 = await prisma.customer.create({
    data: {
      name: 'Globex Inc',
      email: 'info@globex.com',
      createdById: user2.id
    }
  });

  // Skapa några projekt
  const project1 = await prisma.project.create({
    data: {
      projectNumber: 'P12345',
      customerId: customer1.id
    }
  });

  const project2 = await prisma.project.create({
    data: {
      projectNumber: 'P67890',
      customerId: customer2.id
    }
  });

  // Skapa några offerter
  await prisma.quotation.create({
    data: {
      quotationNumber: 'Q11111',
      createdById: user1.id,
      projectId: project1.id
    }
  });

  await prisma.quotation.create({
    data: {
      quotationNumber: 'Q22222',
      createdById: user2.id,
      projectId: project2.id
    }
  });

  console.log('Exempeldata har lagts till i databasen.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
