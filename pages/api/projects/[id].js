import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { id } = req.query;
  try {
    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) },
      include: { customer: true }, // Include customer relation
    });
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
}
