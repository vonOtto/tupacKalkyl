import Link from 'next/link';

export default function Sidebar({ setActiveSection }) {
  return (
    <div className="w-1/4 bg-white shadow-md h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <nav className="space-y-4">
        <button onClick={() => setActiveSection('users')} className="block w-full text-left p-2 text-lg font-medium text-gray-700 hover:bg-gray-200 rounded">
          Users
        </button>
        <button onClick={() => setActiveSection('customers')} className="block w-full text-left p-2 text-lg font-medium text-gray-700 hover:bg-gray-200 rounded">
          Customers
        </button>
        <button onClick={() => setActiveSection('projects')} className="block w-full text-left p-2 text-lg font-medium text-gray-700 hover:bg-gray-200 rounded">
          Projects
        </button>
        <button onClick={() => setActiveSection('quotations')} className="block w-full text-left p-2 text-lg font-medium text-gray-700 hover:bg-gray-200 rounded">
          Quotations
        </button>
      </nav>
    </div>
  );
}
