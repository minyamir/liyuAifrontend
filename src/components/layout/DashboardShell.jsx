import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Navbar from './Navbar';

const DashboardShell = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile-friendly Navbar */}
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <Sidebar />
        
        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-y-auto">
          <Topbar title={title} />
          <div className="flex-1">
            {children}
          </div>
          
          <footer className="p-6 text-center text-gray-400 text-xs">
            © 2026 Liyu Learn — Supporting the Ethiopian National Curriculum
          </footer>
        </main>
      </div>
    </div>
  );
};

export default DashboardShell;