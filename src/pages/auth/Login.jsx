import React from 'react';
import LoginForm from "../../components/auth/LoginForm";
import { Sparkles, Globe, Zap, Cpu } from 'lucide-react';

const LoginPage = () => {
  const handleLoginSuccess = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#020617] overflow-hidden">
      
      {/* --- LEFT SIDE: THE VIBE (Marketing/AI Visuals) --- */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-16 overflow-hidden bg-gradient-to-br from-blue-900 via-slate-950 to-black">
        {/* Animated Background Mesh */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-blue-600 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-indigo-500 rounded-full blur-[120px]" />
        </div>

        {/* Branding */}
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-2xl">
            <span className="text-blue-600 text-2xl font-black italic">L</span>
          </div>
          <span className="text-white font-black tracking-tighter text-2xl">Liyu Learn</span>
        </div>

        {/* Hero Text with Glow */}
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">
            <Zap size={12} fill="currentColor" />
            Empowering Bahir Dar University
          </div>
          <h2 className="text-6xl font-black text-white leading-tight tracking-tighter">
            Elevate your <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              Intelligence.
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-md font-medium leading-relaxed">
            The first AI-driven academic assistant built specifically for the local campus context. Fast, secure, and smart.
          </p>
        </div>

        {/* System Stats Badge */}
        <div className="relative z-10 flex gap-10">
          <div className="flex flex-col">
            <span className="text-white font-black text-xl">10k+</span>
            <span className="text-slate-500 text-[10px] uppercase font-black tracking-widest">Active Students</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-black text-xl">24/7</span>
            <span className="text-slate-500 text-[10px] uppercase font-black tracking-widest">AI Tutoring</span>
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: THE LOGIN (Functional Area) --- */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-slate-50/30 backdrop-blur-md relative">
        
        {/* Subtle decorative ring for the right side */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-blue-500/5 rounded-full -z-10" />

        <div className="w-full max-w-[420px] space-y-10">
          {/* Mobile Only Header */}
          <div className="lg:hidden text-center space-y-4 mb-12">
             <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-blue-600/20">
                <span className="text-white text-3xl font-black italic">L</span>
             </div>
             <h1 className="text-3xl font-black text-slate-900">Welcome Back</h1>
          </div>

          <div className="space-y-2">
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">Login</h3>
            <p className="text-slate-500 font-bold text-sm">Enter your institutional credentials to continue.</p>
          </div>

          {/* Form Injection */}
          <div className="relative bg-white p-2 rounded-[32px] shadow-2xl shadow-blue-500/5 border border-slate-100">
            <div className="p-6 sm:p-8">
               <LoginForm onSuccess={handleLoginSuccess} />
            </div>
          </div>

          {/* New Account Link */}
          <p className="text-center text-slate-400 text-xs font-black uppercase tracking-widest">
            Don't have an ID? 
            <button className="ml-2 text-blue-600 hover:text-blue-800 transition-all underline underline-offset-4">
              Apply for Access
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;