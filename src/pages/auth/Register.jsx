import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterForm from '../../components/auth/RegisterForm';
import { Target, Star, BrainCircuit, CheckCircle } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();

  const handleRegisterSuccess = () => {
    navigate('/grade-selection');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#0F172A] font-sans selection:bg-blue-500/30">
      
      {/* --- LEFT SIDE: The Vision & Vibe --- */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-20 overflow-hidden bg-gradient-to-br from-blue-950 via-[#0F172A] to-slate-950">
        
        {/* Modern Background Texture */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute top-[-15%] left-[-15%] w-[80%] h-[80%] bg-blue-600 rounded-full blur-[140px] animate-pulse" />
          <div className="absolute bottom-[-15%] right-[-15%] w-[80%] h-[80%] bg-indigo-500 rounded-full blur-[140px]" />
        </div>

        {/* Brand Logo */}
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-300">
            <span className="text-blue-600 text-2xl font-black italic">L</span>
          </div>
          <span className="text-white font-black tracking-tight text-2xl">Liyu Learn</span>
        </div>

        {/* Main Content Area */}
        <div className="relative z-10 space-y-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">
              <Star size={12} fill="currentColor" />
              Your AI Advantage
            </div>
            <h2 className="text-5xl font-black text-white leading-[1.1] tracking-tighter max-w-lg">
              Unlock a smarter way <br /> to 
              <span className="ml-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Achieve.
              </span>
            </h2>
          </div>

          <div className="space-y-6 max-w-md">
            {[
              { icon: Target, text: 'Tailored for the Ethiopian Curriculum' },
              { icon: BrainCircuit, text: 'Personalized AI Tutoring' },
              { icon: CheckCircle, text: 'Ministry Approved Content' }
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-4 text-slate-300 font-medium text-base group">
                <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center border border-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon size={20} strokeWidth={2.5} />
                </div>
                {benefit.text}
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="relative z-10 flex gap-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">
          <span>Official Pilot Access</span>
          <span className="w-1 h-1 bg-slate-700 rounded-full my-auto" />
          <span>v3.0 - BDU Alpha</span>
        </div>
      </div>

      {/* --- RIGHT SIDE: The Registration Form --- */}
      <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-20 bg-slate-50/20 backdrop-blur-sm relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-blue-500/5 rounded-full -z-10" />

        <div className="w-full max-w-[460px] space-y-10">
          {/* Mobile Header */}
          <div className="lg:hidden text-center space-y-4 mb-10">
             <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-blue-600/20">
                <span className="text-white text-3xl font-black italic">L</span>
             </div>
             <h1 className="text-3xl font-black text-slate-900 tracking-tight">Join Liyu Learn</h1>
          </div>

          <div className="space-y-2">
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">Create your account</h3>
            <p className="text-slate-500 font-medium text-sm">Join the next generation of Ethiopian students.</p>
          </div>

          <div className="relative bg-white p-2 rounded-[32px] shadow-2xl shadow-blue-500/5 border border-slate-100 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 rounded-[36px] blur-xl opacity-0 group-hover:opacity-100 transition duration-1000 -z-10" />
            <div className="p-6 sm:p-10">
               <RegisterForm onSuccess={handleRegisterSuccess} />
            </div>
          </div>

          <div className="space-y-6 text-center">
            <p className="text-slate-500 text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-3">
              Already have an ID?
              <Link to="/login" className="text-blue-600 font-bold hover:text-blue-800 transition-colors flex items-center gap-1">
                Log In <span className="text-sm">→</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;