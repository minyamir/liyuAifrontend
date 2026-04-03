import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useStudy } from '../../contexts/StudyContext';
import { LogOut, User, Bell } from 'lucide-react';

const Navbar = () => {
  const { logout, user } = useAuth();
  const { grade } = useStudy();
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold italic">L</div>
              <span className="text-xl font-black text-blue-900 tracking-tight">Liyu Learn</span>
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:block text-right border-r pr-6 border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Curriculum</p>
              <p className="text-sm font-bold text-blue-600 leading-none">Grade {grade}</p>
            </div>
            
            <button className="text-gray-400 hover:text-blue-600 transition-colors">
              <Bell size={20} />
            </button>

            <button 
              onClick={() => { logout(); navigate('/login'); }}
              className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-red-600 transition-colors"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;