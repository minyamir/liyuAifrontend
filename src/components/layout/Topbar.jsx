import React from 'react';
import { Search, HelpCircle } from 'lucide-react';

const Topbar = ({ title = "Overview" }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-100 px-6 flex items-center justify-between">
      <h2 className="font-bold text-gray-800 text-lg">{title}</h2>
      
      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Search lessons..." 
            className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
          <HelpCircle size={20} />
        </button>
      </div>
    </header>
  );
};

export default Topbar;