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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Users</h2>
        <ul className="list-disc pl-5">
          {users.map(user => (
            <li key={user.id}>{user.name} ({user.email})</li>
          ))}
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Customers</h2>
        <ul className="list-disc pl-5">
          {customers.map(customer => (
            <li key={customer.id}>{customer.name} ({customer.email})</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Projects</h2>
        <ul className="list-disc pl-5">
          {projects.map(project => (
            <li key={project.id}>{project.projectNumber} (Customer ID: {project.customerId})</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Quotations</h2>
        <ul className="list-disc pl-5">
          {quotations.map(quotation => (
            <li key={quotation.id}>{quotation.quotationNumber} (Project ID: {quotation.projectId})</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
