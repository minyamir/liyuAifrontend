import React from 'react';
import { HelpCircle, Lightbulb, FileSearch, MessageSquare } from 'lucide-react';

const PromptSuggestions = ({ onSelect }) => {
  const suggestions = [
    {
      text: "Explain the main concept of this chapter in simple terms.",
      icon: <Lightbulb size={14} />,
      color: "text-amber-600 bg-amber-50"
    },
    {
      text: "What are the most important formulas/definitions here?",
      icon: <FileSearch size={14} />,
      color: "text-blue-600 bg-blue-50"
    },
    {
      text: "Give me a real-world example from Ethiopia for this topic.",
      icon: <HelpCircle size={14} />,
      color: "text-emerald-600 bg-emerald-50"
    },
    {
      text: "Summarize the last 5 pages into bullet points.",
      icon: <MessageSquare size={14} />,
      color: "text-purple-600 bg-purple-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-3 mt-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 mb-1">
        Suggested Queries
      </p>
      {suggestions.map((s, i) => (
        <button
          key={i}
          onClick={() => onSelect(s.text)}
          className="flex items-start gap-3 p-4 text-left bg-white border border-slate-100 rounded-[22px] hover:border-blue-300 hover:shadow-md transition-all group"
        >
          <div className={`p-2 rounded-xl shrink-0 ${s.color} group-hover:scale-110 transition-transform`}>
            {s.icon}
          </div>
          <span className="text-xs font-bold text-slate-600 leading-tight group-hover:text-slate-900">
            {s.text}
          </span>
        </button>
      ))}
    </div>
  );
};

export default PromptSuggestions;