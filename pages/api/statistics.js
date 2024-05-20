import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  try {
    console.log("Fetching active projects count...");
    const activeProjectsCount = await prisma.project.count({
      where: { status: 'ACTIVE' },
    });

    console.log("Active projects count:", activeProjectsCount);

    console.log("Fetching quotations count...");
    const quotationsCount = await prisma.quotation.count();

    console.log("Quotations count:", quotationsCount);

    res.status(200).json({ activeProjectsCount, quotationsCount });
  } catch (error) {
    console.error('Error fetching statistics:', error.message);
    console.error('Stack trace:', error.stack);
    res.status(500).json({ error: 'Failed to fetch statistics', details: error.message });
  }
}
