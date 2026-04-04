import React from 'react';
import { Sparkles, ArrowRight, PlayCircle } from 'lucide-react';

const LandingPage= () => {
  return (
    <div className="relative min-h-screen bg-slate-950 flex items-center pt-20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-8 animate-fade-in">
          <Sparkles size={14} />
          The Future of Ethiopian Education
        </div>

        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
          STAY AHEAD WITH <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">
            LIYU AI TUTOR
          </span>
        </h1>

        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed mb-12">
          Your textbooks, your notes, your schedule. Liyu transforms static PDFs into 
          interactive learning experiences tailored to your grade level.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="w-full sm:w-auto px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center justify-center gap-3">
            START LEARNING NOW
            <ArrowRight size={20} />
          </button>
          
          <button className="w-full sm:w-auto px-10 py-5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 transition-all flex items-center justify-center gap-3">
            <PlayCircle size={20} className="text-emerald-400" />
            Watch Demo
          </button>
        </div>

        {/* Floating Mockup Preview */}
        <div className="mt-20 relative p-2 bg-white/5 rounded-[40px] border border-white/10 backdrop-blur-sm transform rotate-2 hover:rotate-0 transition-transform duration-700">
           <img 
             src="/assets/dashboard-preview.png" 
             alt="Liyu AI Dashboard" 
             className="rounded-[32px] shadow-2xl opacity-80"
           />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;