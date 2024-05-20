import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  try {
    const customers = await prisma.customer.findMany();
    res.status(200).json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error.message);
    console.error('Stack trace:', error.stack);
    res.status(500).json({ error: 'Failed to fetch customers', details: error.message });
  }
}
