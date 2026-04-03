import React from 'react';
import { Sparkles, CheckCircle2, Bookmark, Copy, ChevronDown } from 'lucide-react';

const SummaryPanel = ({ summaryData }) => {
  const data = summaryData || {
    title: "Cell Biology: The Mitochondria",
    topic: "Biology • Grade 12",
    points: [
      "The mitochondria is often referred to as the 'powerhouse' of the cell, responsible for energy conversion.",
      "It produces ATP (Adenosine Triphosphate) through the process of cellular respiration.",
      "Mitochondria are unique because they contain their own mitochondrial DNA (mtDNA), separate from the cell nucleus.",
      "They play a critical role in regulating the metabolic activity and the self-destruction (apoptosis) of the cell.",
      "Outer Membrane: Acts as a gateway for molecules to enter from the cytoplasm.",
      "Inner Membrane: Folded into cristae to increase surface area for chemical reactions.",
      "Matrix: The space inside the inner membrane where the Krebs cycle occurs."
    ]
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-full max-h-[85vh] animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      {/* 1. FIXED HEADER (Does not move) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 px-4 bg-white/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100">
            <Sparkles size={12} strokeWidth={3} /> AI Smart Summary
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter leading-tight">
            {data.title}
          </h1>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
            {data.topic}
          </p>
        </div>

        <div className="flex gap-2">
          <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all active:scale-90 shadow-sm">
            <Copy size={18} />
          </button>
          <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-emerald-600 hover:border-emerald-200 transition-all active:scale-90 shadow-sm">
            <Bookmark size={18} />
          </button>
        </div>
      </div>

      {/* 2. SCROLLABLE CONTENT AREA */}
      <div className="flex-1 overflow-y-auto pr-4 space-y-4 custom-scrollbar scroll-smooth">
        {data.points.map((point, i) => (
          <div 
            key={i} 
            className="group relative flex gap-5 items-start p-6 bg-white border border-slate-100 rounded-[28px] shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300"
          >
            <div className="flex-shrink-0 w-8 h-8 bg-slate-50 text-slate-400 rounded-lg flex items-center justify-center font-black text-xs group-hover:bg-blue-600 group-hover:text-white transition-all">
              {i + 1}
            </div>
            <p className="text-slate-700 text-base md:text-lg leading-relaxed font-medium">
              {point}
            </p>
          </div>
        ))}

        {/* Action Card at the bottom of the scroll */}
        <div className="mt-8 p-8 bg-slate-900 rounded-[32px] text-white relative overflow-hidden group">
          <div className="relative z-10">
            <h4 className="text-lg font-black italic tracking-tighter">Ready for the Quiz?</h4>
            <p className="text-slate-400 text-xs mt-1 mb-4">Challenge your knowledge on this topic.</p>
            <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all active:scale-95">
              Start Quiz
            </button>
          </div>
          <Sparkles className="absolute right-[-20px] bottom-[-20px] text-white/5 w-32 h-32 rotate-12" />
        </div>
      </div>

      {/* 3. SCROLL INDICATOR (Only shows at the bottom) */}
      <div className="flex justify-center pt-4 opacity-50 animate-bounce">
        <ChevronDown size={20} className="text-slate-300" />
      </div>
    </div>
  );
};

export default SummaryPanel;