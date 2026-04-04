import React from 'react';
import { Sparkles, BookOpen, GraduationCap } from 'lucide-react';

const WelcomeBanner = ({ userName = "Student", grade = "12th" }) => {
  return (
    <div className="relative w-full overflow-hidden rounded-[32px] bg-slate-900 p-1 mb-10 shadow-2xl">
      {/* Animated Background Gradients */}
      <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-blue-600 blur-[80px] opacity-50 animate-pulse"></div>
      <div className="absolute -right-20 -bottom-20 h-60 w-60 rounded-full bg-emerald-500 blur-[100px] opacity-30"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-10 bg-white/5 backdrop-blur-xl rounded-[30px] border border-white/10">
        
        {/* TEXT SECTION */}
        <div className="flex-1 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">
            <Sparkles size={12} />
            Liyu AI Tutor Active
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
            Selam, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">{userName}!</span> 👋
          </h1>
          
          <p className="text-slate-400 text-lg font-medium max-w-lg leading-relaxed">
            Ready to master your <span className="text-white font-bold underline decoration-blue-500 underline-offset-4">Grade {grade}</span> curriculum? 
            Your AI teacher has analyzed your progress.
          </p>

          <div className="flex gap-4 pt-2">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all active:scale-95 shadow-lg shadow-blue-500/25 flex items-center gap-2 text-sm">
              <BookOpen size={18} />
              Continue Learning
            </button>
          </div>
        </div>

        {/* VISUAL STATUS CARD (Right Side) */}
        <div className="hidden lg:flex flex-col gap-3 w-64 p-6 bg-white/5 rounded-3xl border border-white/10 shadow-inner">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <GraduationCap size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase">Current Grade</p>
                <p className="text-sm font-bold text-white tracking-tight">Grade {grade}</p>
              </div>
           </div>
           <div className="h-[2px] w-full bg-white/5 my-1"></div>
           <p className="text-[11px] text-slate-400 font-medium italic">
             "Success is the sum of small efforts, repeated day in and day out."
           </p>
        </div>

      </div>
    </div>
  );
};

export default WelcomeBanner;