import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) },
      include: {
        customer: true,
        quotations: true,  // Inkludera offerter
      },
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error('Error fetching project:', error.message);
    res.status(500).json({ error: 'Failed to fetch project', details: error.message });
  }
}
