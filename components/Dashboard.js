import { useEffect, useState } from 'react';
import Section from './Section';

export default function Dashboard({ activeSection, viewProject }) {
  const [users, setUsers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [usersRes, customersRes, projectsRes, quotationsRes] = await Promise.all([
          fetch('/api/users'),
          fetch('/api/customers'),
          fetch('/api/projects'),
          fetch('/api/quotations'),
        ]);

        if (!usersRes.ok) throw new Error('Failed to fetch users');
        if (!customersRes.ok) throw new Error('Failed to fetch customers');
        if (!projectsRes.ok) throw new Error('Failed to fetch projects');
        if (!quotationsRes.ok) throw new Error('Failed to fetch quotations');

        const usersData = await usersRes.json();
        const customersData = await customersRes.json();
        const projectsData = await projectsRes.json();
        const quotationsData = await quotationsRes.json();

        setUsers(usersData);
        setCustomers(customersData);
        setProjects(projectsData);
        setQuotations(quotationsData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      }
    }

    fetchData();
  }, []);

  const getProjectNumberById = (projectId) => {
    const project = projects.find(project => project.id === projectId);
    return project ? project.projectNumber : 'Unknown Project';
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-3/4 p-8">
      {activeSection === 'users' && (
        <Section
          id="users"
          title="Users"
          items={users}
          renderItem={(user) => (
            <li key={user.id} className="bg-gray-50 p-3 rounded-md shadow-sm">
              <p className="font-medium">{user.name}</p>
              <p className="text-gray-600">{user.email}</p>
            </li>
          )}
        />
      )}
      {activeSection === 'customers' && (
        <Section
          id="customers"
          title="Customers"
          items={customers}
          renderItem={(customer) => (
            <li key={customer.id} className="bg-gray-50 p-3 rounded-md shadow-sm">
              <p className="font-medium">{customer.name}</p>
              <p className="text-gray-600">{customer.email}</p>
            </li>
          )}
        />
      )}
      {activeSection === 'projects' && (
        <Section
          id="projects"
          title="Projects"
          items={projects}
          renderItem={(project) => (
            <li key={project.id} className="bg-gray-50 p-3 rounded-md shadow-sm">
              <p className="font-medium">Project Number: {project.projectNumber}</p>
              <p className="text-gray-600">Customer ID: {project.customerId}</p>
              <button onClick={() => viewProject(project.id)} className="text-blue-500 underline">View Details</button>
            </li>
          )}
        />
      )}
      {activeSection === 'quotations' && (
        <Section
          id="quotations"
          title="Quotations"
          items={quotations}
          renderItem={(quotation) => (
            <li key={quotation.id} className="bg-gray-50 p-3 rounded-md shadow-sm">
              <p className="font-medium">Quotation Number: {quotation.quotationNumber}</p>
              <p className="text-gray-600">Project Number: {getProjectNumberById(quotation.projectId)}</p>
            </li>
          )}
        />
      )}
    </div>
  );
}
