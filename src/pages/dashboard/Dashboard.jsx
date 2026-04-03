import React from 'react';
import DashboardShell from '../../components/layout/DashboardShell';
import WelcomeBanner from '../../components/dashboard/WelcomeBanner';
import SubjectGrid from '../../components/dashboard/SubjectGrid';
import DailyProgressCard from '../../components/dashboard/DailyProgressCard';
import RecentStudyCard from '../../components/dashboard/RecentStudyCard';
import { useStudy } from '../../contexts/StudyContext';
import { Flame, Sparkles, BookOpen, GraduationCap, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const { grade, userName } = useStudy();

  return (
    <DashboardShell title="Learning Overview">
      {/* Main Container with refined padding */}
      <div className="max-w-[1400px] mx-auto p-5 md:p-10 space-y-12 bg-[#F8FAFC]">
        
        {/* HERO SECTION */}
        <div className="transform transition-all duration-500 hover:scale-[1.01]">
           <WelcomeBanner grade={grade} userName={userName} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          
          {/* LEFT COLUMN (70% Width) */}
          <div className="xl:col-span-8 space-y-12">
            
            {/* SUBJECTS SECTION */}
            <section>
              <div className="flex items-center justify-between mb-8 px-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                    <BookOpen className="text-white" size={24} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Your Subjects</h2>
                    <p className="text-slate-400 font-bold text-sm uppercase tracking-tight">Grade {grade} Curriculum</p>
                  </div>
                </div>
                <button className="hidden sm:flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest hover:gap-3 transition-all">
                  View All <ArrowRight size={16} />
                </button>
              </div>

              {/* Subject Grid inside a "Glass" container */}
              <div className="bg-white/40 backdrop-blur-sm p-8 rounded-[40px] border border-white shadow-sm">
                 <SubjectGrid />
              </div>
            </section>

            {/* AI TIP BOX - Ultra Modern Design */}
            <div className="group relative p-1 rounded-[32px] bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 shadow-2xl shadow-blue-200/40 transition-transform hover:-translate-y-1">
              <div className="bg-white p-8 rounded-[30px] flex flex-col md:flex-row items-center gap-8 overflow-hidden">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-400 blur-2xl opacity-20 animate-pulse"></div>
                  <div className="relative bg-slate-900 p-5 rounded-3xl text-white">
                    <Sparkles size={32} className="text-blue-400" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2">Did you know?</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    Snap a photo of your textbook notes. Liyu AI can turn 
                    <span className="text-slate-900 font-bold"> 10 pages of text </span> 
                    into a 1-minute summary instantly.
                  </p>
                </div>
                <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm shadow-xl active:scale-95 transition-all">
                  Try Now
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR (30% Width) */}
          <aside className="xl:col-span-4 space-y-10">
            
            {/* SECTION TITLE */}
            <div className="flex items-center gap-3 px-2">
               <div className="h-8 w-1.5 bg-blue-600 rounded-full"></div>
               <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Your Progress</h2>
            </div>

            {/* ENHANCED STREAK CARD */}
            <div className="relative group overflow-hidden bg-slate-900 rounded-[35px] p-8 text-white shadow-2xl">
              {/* Background Glows */}
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-orange-500/20 blur-[50px]"></div>
              
              <div className="relative z-10 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="p-4 bg-orange-500 rounded-[20px] shadow-lg shadow-orange-500/40">
                    <Flame size={28} fill="white" />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest">Active Streak</p>
                    <p className="text-4xl font-black tracking-tighter">4 Days</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex gap-2 h-2.5">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
                    ))}
                    {[5, 6, 7].map((i) => (
                      <div key={i} className="flex-1 bg-white/10 rounded-full"></div>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-400 font-bold text-center uppercase tracking-tighter">
                    3 More days to your weekly badge 🏆
                  </p>
                </div>
              </div>
            </div>

            {/* ACTIVITY CARDS */}
            <div className="space-y-6 transition-all duration-300">
               <div className="hover:scale-[1.02] transition-transform">
                  <RecentStudyCard />
               </div>
               <div className="hover:scale-[1.02] transition-transform">
                  <DailyProgressCard completed={2} total={5} />
               </div>
            </div>

          </aside>
        </div>
      </div>
    </DashboardShell>
  );
};

export default Dashboard;