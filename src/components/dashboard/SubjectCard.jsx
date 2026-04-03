import React, { useState } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';

const SubjectCard = ({ subject, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
      onClick={() => onClick(subject)}
      className="group relative bg-white rounded-[32px] p-4 border border-slate-100 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(8,112,184,0.12)] hover:-translate-y-2 cursor-pointer flex flex-col h-full"
    >
      {/* --- THE TEXTBOOK IMAGE --- */}
      <div className="relative aspect-[3/4] w-full rounded-[24px] overflow-hidden bg-slate-100 mb-5 shadow-sm border border-slate-200/50">
        
        {/* Loading Spinner/Skeleton */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-100 animate-pulse">
            <BookOpen className="text-slate-300 animate-bounce" size={24} />
          </div>
        )}

        <img 
          src={subject.thumbnail} 
          alt={subject.name}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onError={(e) => { 
            e.target.src = `https://ui-avatars.com/api/?name=${subject.name}&background=f1f5f9&color=64748b`; 
            setIsLoaded(true);
          }}
        />
        
        {/* Stream Overlay */}
        {subject.stream !== 'both' && (
          <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg">
            <p className="text-[8px] font-black text-white uppercase tracking-widest">
              {subject.stream}
            </p>
          </div>
        )}
      </div>

      {/* --- SUBJECT TEXT --- */}
      <div className="flex flex-col flex-1 px-1">
        <div className="flex items-center justify-between mb-2">
          <div className={`w-10 h-10 ${subject.color} rounded-2xl flex items-center justify-center text-xl shadow-sm`}>
            {subject.icon}
          </div>
          <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all">
            <ArrowRight size={14} />
          </div>
        </div>

        <h3 className="font-black text-slate-800 text-[14px] uppercase tracking-tight leading-tight mb-1">
          {subject.name}
        </h3>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
          {subject.grades[0]} • 2026 Edition
        </p>
      </div>
    </div>
  );
};

export default SubjectCard;