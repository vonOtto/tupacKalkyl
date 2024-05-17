import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  const { projectId } = req.query;
  try {
    const where = projectId ? { projectId: parseInt(projectId) } : {};
    const quotations = await prisma.quotation.findMany({ where });
    res.status(200).json(quotations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quotations' });
  }
}
