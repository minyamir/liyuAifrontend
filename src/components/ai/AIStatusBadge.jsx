import React from 'react';
import { Loader2, Zap } from 'lucide-react';

const AIStatusBadge = ({ status }) => {
  const isThinking = status === 'thinking';

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all border ${
      isThinking 
        ? 'bg-amber-50 border-amber-100 text-amber-600' 
        : 'bg-emerald-50 border-emerald-100 text-emerald-600'
    }`}>
      {isThinking ? (
        <Loader2 size={12} className="animate-spin" />
      ) : (
        <Zap size={12} fill="currentColor" />
      )}
      <span className="text-[9px] font-black uppercase tracking-widest">
        {isThinking ? 'AI Thinking...' : 'Liyu Online'}
      </span>
    </div>
  );
};

export default AIStatusBadge;