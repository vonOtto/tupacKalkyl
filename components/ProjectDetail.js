import { useEffect, useState } from 'react';

export default function ProjectDetail({ projectId, goBack }) {
  const [project, setProject] = useState(null);
  const [quotations, setQuotations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProjectDetails() {
      try {
        const projectRes = await fetch(`/api/projects/${projectId}`);
        const quotationsRes = await fetch(`/api/quotations?projectId=${projectId}`);

        if (!projectRes.ok) throw new Error('Failed to fetch project');
        if (!quotationsRes.ok) throw new Error('Failed to fetch quotations');

        const projectData = await projectRes.json();
        const quotationsData = await quotationsRes.json();

        setProject(projectData);
        setQuotations(quotationsData);
      } catch (err) {
        console.error('Error fetching project details:', err);
        setError(err.message);
      }
    }

    fetchProjectDetails();
  }, [projectId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <button onClick={goBack} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
        Back to Dashboard
      </button>
      <h2 className="text-2xl font-semibold mb-4">Project Number: {project.projectNumber}</h2>
      <p className="text-gray-600 mb-4">Customer: {project.customer.name}</p>
      <h3 className="text-xl font-semibold mb-4">Quotations</h3>
      <ul className="space-y-2">
        {quotations.map(quotation => (
          <li key={quotation.id} className="bg-gray-50 p-3 rounded-md shadow-sm">
            <p className="font-medium">Quotation Number: {quotation.quotationNumber}</p>
            <p className="text-gray-600">Created At: {new Date(quotation.createdAt).toLocaleDateString()}</p>
            <p className="text-gray-600">Status: {quotation.status}</p> {/* Lägg till statusfältet här */}
          </li>
        ))}
      </ul>
    </div>
  );
}
