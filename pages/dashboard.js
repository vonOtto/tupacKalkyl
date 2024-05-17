import { useEffect, useState } from 'react';
import styles from '../styles/dashboard.module.css';

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
    <div className={styles.container}>
      <h1>Dashboard</h1>
      
      <section className={styles.section}>
        <h2>Users</h2>
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name} ({user.email})</li>
          ))}
        </ul>
      </section>
      
      <section className={styles.section}>
        <h2>Customers</h2>
        <ul>
          {customers.map(customer => (
            <li key={customer.id}>{customer.name} ({customer.email})</li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Projects</h2>
        <ul>
          {projects.map(project => (
            <li key={project.id}>{project.projectNumber} (Customer ID: {project.customerId})</li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Quotations</h2>
        <ul>
          {quotations.map(quotation => (
            <li key={quotation.id}>{quotation.quotationNumber} (Project ID: {quotation.projectId})</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
