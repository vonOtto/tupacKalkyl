import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  try {
    const quotations = await prisma.quotation.findMany({
      include: {
        project: true,
      },
    });

    console.log('Fetched quotations:', JSON.stringify(quotations, null, 2)); // Logga offerterna

    res.status(200).json(quotations);
  } catch (error) {
    console.error('Error fetching quotations:', error.message);
    res.status(500).json({ error: 'Failed to fetch quotations', details: error.message });
  }
}
