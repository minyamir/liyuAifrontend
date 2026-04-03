import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudy } from '../../contexts/StudyContext';
import {Loader2, GraduationCap,ArrowLeft,Microscope,Globe2} from 'lucide-react';
import { setUserGrade, setUserField } from '../../api/authApi';

const GradeSelection = () => {
  const navigate = useNavigate();
  const { setGrade, setStream } = useStudy();
  
  // Step 1: Year | Step 2: School Stream | Step 3: College | Step 4: Department
  const [step, setStep] = useState(1);
  const [tempGrade, setTempGrade] = useState(null);
  const [loading, setLoading] = useState(false); 

const grades = [
    { id: '7', label: 'Grade 7', level: 'Junior Secondary', grade_level: '7' },
    { id: '8', label: 'Grade 8', level: 'Junior Secondary', grade_level: '8' },
    { id: '9', label: 'Grade 9', level: 'Secondary', grade_level: '9' },
    { id: '10', label: 'Grade 10', level: 'Secondary', grade_level: '10' },
    { id: '11', label: 'Grade 11', level: 'Preparatory', grade_level: '11' },
    { id: '12', label: 'Grade 12', level: 'Preparatory', grade_level: '12' }, 
  ]; 

const handleGradeSelect = (g) => {
    setTempGrade(g);
    // If Grade 11 or 12, go to Step 2 (Stream Selection)
    if (g.grade_level === '11' || g.grade_level === '12') {
      setStep(2);
    } else {
      // For 7-10, stream is 'general'
      finishSelection('general', g.grade_level, g.label);
    }
  }; 

const finishSelection = async (streamType, gradeId, gradeLabel) => {
    setLoading(true);
    try {
      // 1. UPDATE BACKEND (Private API calls)
      await setUserGrade({ grade_level: gradeId });
      await setUserField({ study_field: streamType });

      // 2. UPDATE CONTEXT (Local State)
      setGrade(gradeLabel);
      setStream(streamType);

      // 3. UPDATE LOCALSTORAGE (Persistence)
      localStorage.setItem('user_grade', gradeLabel);
      localStorage.setItem('user_stream', streamType);

      // 4. GO TO DASHBOARD
      navigate('/dashboard');
    } catch (error) {
      console.error("Selection Error:", error);
      alert("Failed to save selection. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6 text-white relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />

      <div className="w-full max-w-6xl relative z-10">
        
        {/* STEP 1: YEAR SELECTION */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h1 className="text-5xl font-black text-center mb-16 tracking-tight">Select your <span className="text-blue-500">Level.</span></h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {grades.map((g) => (
                <button key={g.id} onClick={() => handleGradeSelect(g)} className="group p-6 bg-slate-900/50 border border-slate-800 rounded-[32px] hover:border-blue-500 transition-all text-left backdrop-blur-xl">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all"><GraduationCap size={20} /></div>
                  <h3 className="text-xl font-black">{g.label}</h3>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{g.level}</p>
                </button>
              ))} 
              
                <button key={20} disabled className="group p-6 bg-slate-900/50 border border-slate-800 rounded-[32px] hover:border-blue-500 transition-all text-left backdrop-blur-xl opacity-50 cursor-not-allowed">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all"><GraduationCap size={20} /></div>
                  <h3 className="text-xl font-black">University Level</h3>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Coming Soon</p>
                </button>
              
            </div>

          </div>
        )}

        {/* STEP 2: SCHOOL STREAMS */}
        {step === 2 && (
          <div className="max-w-3xl mx-auto animate-in fade-in zoom-in-95 duration-500">
            <button onClick={() => setStep(1)} className="flex items-center gap-2 text-slate-500 mb-8 font-black uppercase text-xs tracking-widest"><ArrowLeft size={16}/> Back</button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <button 
              onClick={() => finishSelection('natural', tempGrade.grade_level, tempGrade.label)}
               className="group p-10 bg-emerald-500/5 border border-emerald-500/20 rounded-[40px] hover:border-emerald-500 transition-all text-left">
                <div className="w-16 h-16 bg-emerald-500 rounded-3xl flex items-center justify-center text-white mb-8"><Microscope size={32} /></div>
                <h4 className="text-3xl font-black">Natural</h4>
              </button>
              <button 
              onClick={() => finishSelection('social', tempGrade.grade_level, tempGrade.label)}
               className="group p-10 bg-blue-500/5 border border-blue-500/20 rounded-[40px] hover:border-blue-500 transition-all text-left">
                <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white mb-8"><Globe2 size={32} /></div>
                <h4 className="text-3xl font-black">Social</h4>
              </button>
            </div>
          </div>
        )} 

        {loading && (
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md flex flex-col items-center justify-center z-50">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <p className="font-bold tracking-widest animate-pulse">SETTING UP YOUR PROFILE...</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default GradeSelection;