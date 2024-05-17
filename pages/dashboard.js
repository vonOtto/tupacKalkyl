import { useState } from 'react';
import Dashboard from '../components/Dashboard';
import Sidebar from '../components/Sidebar';
import ProjectDetail from '../components/ProjectDetail';

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState('users');
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const viewProject = (projectId) => {
    setSelectedProjectId(projectId);
    setActiveSection('projectDetail');
  };

  const goBack = () => {
    setSelectedProjectId(null);
    setActiveSection('projects');
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar setActiveSection={setActiveSection} />
      {activeSection === 'projectDetail' ? (
        <ProjectDetail projectId={selectedProjectId} goBack={goBack} />
      ) : (
        <Dashboard activeSection={activeSection} viewProject={viewProject} />
      )}
    </div>
  );
}
