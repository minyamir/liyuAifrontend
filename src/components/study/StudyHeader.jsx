import React from 'react';
import { ArrowLeft, Upload, Book } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StudyHeader = ({ title, grade, onUploadClick }) => {
  const navigate = useNavigate();

  return (
    <div className="h-16 border-b border-white/10 bg-slate-900 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/dashboard')} className="text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div className="flex flex-col">
          <h1 className="text-white font-black text-xs uppercase tracking-[0.2em]">{title}</h1>
          <span className="text-[10px] text-blue-400 font-bold uppercase">Grade {grade} Curriculum</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* The New Upload Button */}
        <button 
          onClick={onUploadClick}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/10"
        >
          <Upload size={14} />
          Change Book
        </button>
      </div>
    </div>
  );
};

export default StudyHeader;