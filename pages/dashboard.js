import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [quotations, setQuotations] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const usersRes = await fetch('/api/users');
      const customersRes = await fetch('/api/customers');
      const projectsRes = await fetch('/api/projects');
      const quotationsRes = await fetch('/api/quotations');

      setUsers(await usersRes.json());
      setCustomers(await customersRes.json());
      setProjects(await projectsRes.json());
      setQuotations(await quotationsRes.json());
    }

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Users</h2>
            <ul className="space-y-2">
              {users.map(user => (
                <li key={user.id} className="bg-gray-50 p-3 rounded-md shadow-sm">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-gray-600">{user.email}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Customers</h2>
            <ul className="space-y-2">
              {customers.map(customer => (
                <li key={customer.id} className="bg-gray-50 p-3 rounded-md shadow-sm">
                  <p className="font-medium">{customer.name}</p>
                  <p className="text-gray-600">{customer.email}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Projects</h2>
            <ul className="space-y-2">
              {projects.map(project => (
                <li key={project.id} className="bg-gray-50 p-3 rounded-md shadow-sm">
                  <p className="font-medium">Project Number: {project.projectNumber}</p>
                  <p className="text-gray-600">Customer ID: {project.customerId}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Quotations</h2>
            <ul className="space-y-2">
              {quotations.map(quotation => (
                <li key={quotation.id} className="bg-gray-50 p-3 rounded-md shadow-sm">
                  <p className="font-medium">Quotation Number: {quotation.quotationNumber}</p>
                  <p className="text-gray-600">Project ID: {quotation.projectId}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
