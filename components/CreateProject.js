import { useState, useEffect } from 'react';
import Modal from './Modal';

export default function CreateProject({ onCreate, customers, users }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]?.id || '');
  const [selectedUser, setSelectedUser] = useState(users && users.length > 0 ? users[0].id : '');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Users prop received in CreateProject component:', users);
    if (users && users.length > 0) {
      setSelectedUser(users[0].id);
    }
  }, [users]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleCreateProject = async () => {
    const projectData = {
      projectNumber: `P${Date.now()}`, // Generera ett unikt projektnummer baserat på timestamp
      customer: parseInt(selectedCustomer, 10),
      userId: parseInt(selectedUser, 10),
      status: 'ACTIVE',
      title,
      description: description || null, // Description kan vara null
    };

    console.log('Sending project data to API:', projectData);

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Failed to create project:', errorData);
        throw new Error('Failed to create project');
      }

      const newProject = await res.json();
      console.log('New project created:', newProject);
      onCreate(newProject);
      closeModal();
    } catch (err) {
      console.error('Error creating project:', err.message);
      setError(err.message);
    }
  };

  return (
    <div>
      <button onClick={openModal} className="flex items-center text-blue-500 underline">
        <span className="text-xl">+</span>
        <span className="ml-2">Skapa projekt</span>
      </button>
      <Modal isOpen={isOpen} closeModal={closeModal} title="Skapa nytt projekt">
        <div>
          <label htmlFor="customer" className="block text-sm font-medium text-gray-700">Välj kund</label>
          <select
            id="customer"
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>{customer.name}</option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <label htmlFor="user" className="block text-sm font-medium text-gray-700">Välj användare</label>
          <select
            id="user"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {users && users.length > 0 ? (
              users.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))
            ) : (
              <option value="">Ingen användare tillgänglig</option>
            )}
          </select>
        </div>
        <div className="mt-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Rubrik</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Beskrivning</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <div className="mt-4">
          <button
            onClick={handleCreateProject}
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Skapa projekt
          </button>
        </div>
      </Modal>
    </div>
  );
}
