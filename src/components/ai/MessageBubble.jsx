import React from 'react';
import { Sparkles, User } from 'lucide-react';

const MessageBubble = ({ message }) => {
  const { text, isAi } = message;

  return (
    <div className={`flex gap-3 w-full animate-in fade-in slide-in-from-bottom-2 duration-500 ${
      isAi ? 'flex-row' : 'flex-row-reverse'
    }`}>
      {/* Avatar with Soft Glow for AI */}
      <div className={`w-8 h-8 rounded-2xl flex items-center justify-center shrink-0 transition-transform hover:scale-110 ${
        isAi 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
          : 'bg-slate-800 text-white shadow-lg shadow-slate-500/10'
      }`}>
        {isAi ? <Sparkles size={14} className="animate-pulse" /> : <User size={14} />}
      </div>

      <div className={`flex flex-col max-w-[85%] sm:max-w-[75%] ${isAi ? 'items-start' : 'items-end'}`}>
        {/* Bubble Styling */}
        <div className={`p-4 rounded-[24px] text-[13px] leading-relaxed font-semibold transition-all ${
          isAi 
            ? 'bg-white border border-slate-100 text-slate-700 rounded-tl-none shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)]' 
            : 'bg-blue-600 text-white rounded-tr-none shadow-md shadow-blue-500/10'
        }`}>
          {/* Using whitespace-pre-wrap allows for line breaks and lists to render correctly */}
          <p className="whitespace-pre-wrap">{text}</p>
        </div>

        {/* Timestamp/Label */}
        <div className={`flex items-center gap-1.5 mt-1.5 px-1 ${isAi ? 'flex-row' : 'flex-row-reverse'}`}>
          <span className="text-[9px] font-black uppercase text-slate-300 tracking-[0.15em]">
            {isAi ? 'Liyu AI' : 'You'}
          </span>
          <div className="w-1 h-1 rounded-full bg-slate-200" />
          <span className="text-[8px] font-bold text-slate-300">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;