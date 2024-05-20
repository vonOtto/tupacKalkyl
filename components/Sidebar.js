import { useState } from 'react';

export default function Sidebar({ setActiveSection }) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="w-1/4 bg-white shadow-md h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <nav className="space-y-4">
        <button onClick={() => setActiveSection('home')} className="block w-full text-left p-2 text-lg font-medium text-gray-700 hover:bg-gray-200 rounded">
          Home
        </button>
        <button onClick={() => setActiveSection('projects')} className="block w-full text-left p-2 text-lg font-medium text-gray-700 hover:bg-gray-200 rounded">
          Projects
        </button>
        <button onClick={() => setActiveSection('quotations')} className="block w-full text-left p-2 text-lg font-medium text-gray-700 hover:bg-gray-200 rounded">
          Quotations
        </button>
        <div>
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="block w-full text-left p-2 text-lg font-medium text-gray-700 hover:bg-gray-200 rounded flex justify-between items-center"
          >
            Settings
            <span>{isSettingsOpen ? '-' : '+'}</span>
          </button>
          {isSettingsOpen && (
            <div className="pl-4 space-y-2">
              <button onClick={() => setActiveSection('users')} className="block w-full text-left p-2 text-lg font-medium text-gray-700 hover:bg-gray-200 rounded">
                Users
              </button>
              <button onClick={() => setActiveSection('customers')} className="block w-full text-left p-2 text-lg font-medium text-gray-700 hover:bg-gray-200 rounded">
                Customers
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
