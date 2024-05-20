import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { projectNumber, customer, status, title, description, userId } = req.body;

    console.log('Received project data:', { projectNumber, customer, status, title, description, userId });

    try {
      const newProject = await prisma.project.create({
        data: {
          projectNumber,
          status,
          title,
          description,
          customer: {
            connect: { id: customer },
          },
          user: {
            connect: { id: userId },
          },
        },
        include: {
          customer: true,
          user: true,
        },
      });

      console.log('New project created:', newProject);

      res.status(201).json(newProject);
    } catch (error) {
      console.error('Error creating project:', error.message, error);
      res.status(500).json({ error: 'Failed to create project', details: error.message });
    }
  } else if (req.method === 'GET') {
    try {
      const projects = await prisma.project.findMany({
        include: {
          customer: true,
          quotations: true,
          user: true,
        },
      });

      res.status(200).json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error.message, error);
      res.status(500).json({ error: 'Failed to fetch projects', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
