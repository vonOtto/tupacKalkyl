import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  const projects = await prisma.project.findMany();
  res.status(200).json(projects);
}
