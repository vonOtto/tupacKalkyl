import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  const customers = await prisma.customer.findMany();
  res.status(200).json(customers);
}
