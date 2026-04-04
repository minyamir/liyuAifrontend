import React from 'react';
import { Sparkles, Bookmark, Copy, BookOpen, ScrollText, Loader2 } from 'lucide-react'; 

const SummaryPanel = ({ summaryData, onGenerate, loading }) => {
  
  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-10 text-center">
        <Loader2 className="text-emerald-500 animate-spin mb-4" size={40} />
        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Liyu AI is reading...</h3>
        <p className="text-slate-400 text-xs mt-2">Extracting key concepts from your document.</p>
      </div>
    );
  }

  if (!summaryData) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-10 text-center">
        <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4">
          <Sparkles className="text-emerald-500" size={32} />
        </div>
        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">No Summary Yet</h3>
        <p className="text-slate-400 text-xs mt-2 mb-6 max-w-[220px]">
          Let Liyu AI break down this chapter into key terms and concepts.
        </p>
        <button 
          onClick={onGenerate} 
          className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
        >
          Generate Summary
        </button>
      </div>
    );
  }

  const { topic_title, content, key_terms } = summaryData;

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-full max-h-[85vh] animate-in fade-in slide-in-from-bottom-6 duration-700 p-4">
      
      {/* 1. FIXED HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 bg-white/50 backdrop-blur-sm sticky top-0 z-20 border-b border-slate-50 mb-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-100">
            <ScrollText size={12} strokeWidth={3} /> AI Study Summary
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter leading-tight">
            {topic_title || "Untitled Topic"}
          </h1>
        </div>

        <div className="flex gap-2">
          <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm">
            <Copy size={18} />
          </button>
          <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm">
            <Bookmark size={18} />
          </button>
        </div>
      </div>

      {/* 2. SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-8 custom-scrollbar scroll-smooth">
        
        {/* Main Content Card */}
        <div className="p-8 bg-white border border-slate-100 rounded-[32px] shadow-sm leading-relaxed text-slate-700">
           <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4 flex items-center gap-2">
             <BookOpen size={14} /> Overview
           </h3>
           <div className="text-lg font-medium prose prose-slate">
              {/* Using white-space pre-wrap to respect AI newlines if not using ReactMarkdown */}
              <p className="whitespace-pre-wrap">{content}</p>
           </div>
        </div>

        {/* Key Terms Section */}
        {key_terms && key_terms.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 px-4">Key Vocabulary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {key_terms.map((item, i) => (
                <div key={i} className="p-5 bg-slate-50 border border-slate-100 rounded-[24px] hover:bg-white hover:border-blue-200 transition-all group">
                  <h4 className="text-blue-600 font-black text-sm uppercase tracking-tight mb-2 group-hover:scale-105 origin-left transition-transform">
                    {item.term}
                  </h4>
                  <p className="text-slate-600 text-sm leading-snug">
                    {item.definition}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quiz CTA */}
        <div className="p-8 bg-slate-900 rounded-[32px] text-white relative overflow-hidden group mb-10">
          <div className="relative z-10">
            <h4 className="text-lg font-black italic tracking-tighter">Mastered this topic?</h4>
            <p className="text-slate-400 text-xs mt-1 mb-4">Generate a customized quiz to test your memory.</p>
            <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all active:scale-95">
              Start Practice Quiz
            </button>
          </div>
          <Sparkles className="absolute right-[-20px] bottom-[-20px] text-white/5 w-32 h-32 rotate-12" />
        </div>
      </div>
    </div>
  );
};

export default SummaryPanel;