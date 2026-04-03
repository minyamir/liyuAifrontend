import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudy } from '../../contexts/StudyContext';
import { 
  GraduationCap, 
  ArrowLeft, 
  ChevronRight,
  Cpu,
  FlaskConical,
  Scale,
  Library,
  Microscope,
  Globe2,
  Code,
  Zap,
  Settings,
  HardHat
} from 'lucide-react';

const GradeSelection = () => {
  const navigate = useNavigate();
  const { setGrade, setStream } = useStudy();
  
  // Step 1: Year | Step 2: School Stream | Step 3: College | Step 4: Department
  const [step, setStep] = useState(1);
  const [tempGrade, setTempGrade] = useState(null);
  const [selectedCollege, setSelectedCollege] = useState(null);

  const grades = [
    { id: '7', label: 'Grade 7', level: 'Junior Secondary', type: 'school' },
    { id: '8', label: 'Grade 8', level: 'Junior Secondary', type: 'school' },
    { id: '9', label: 'Grade 9', level: 'Secondary', type: 'school' },
    { id: '10', label: 'Grade 10', level: 'Secondary', type: 'school' },
    { id: '11', label: 'Grade 11', level: 'Preparatory', type: 'school' },
    { id: '12', label: 'Grade 12', level: 'Preparatory', type: 'school' },
    { id: 'u1', label: '1st Year', level: 'University', type: 'university' },
    { id: 'u2', label: '2nd Year', level: 'University', type: 'university' },
    { id: 'u3', label: '3rd Year', level: 'University', type: 'university' },
    { id: 'u4', label: '4th Year', level: 'University', type: 'university' },
  ];

  // Logic for departments inside colleges (Example: BiT)
  const universityColleges = [
    { 
      id: 'BIT', 
      name: 'Technology (BiT)', 
      icon: <Cpu size={32} />, 
      departments: [
        { id: 'soft', name: 'Software Engineering', icon: <Code size={20} /> },
        { id: 'elec', name: 'Electrical Engineering', icon: <Zap size={20} /> },
        { id: 'mech', name: 'Mechanical Engineering', icon: <Settings size={20} /> },
        { id: 'civil', name: 'Civil Engineering', icon: <HardHat size={20} /> },
      ] 
    },
    { 
      id: 'SCI', 
      name: 'Natural Sciences', 
      icon: <FlaskConical size={32} />, 
      departments: [
        { id: 'cs', name: 'Computer Science', icon: <Code size={20} /> },
        { id: 'bio', name: 'Biology', icon: <Microscope size={20} /> },
        { id: 'phys', name: 'Physics', icon: <Zap size={20} /> },
      ]
    },
    { id: 'LAW', name: 'Law & Governance', icon: <Scale size={32} />, departments: [{id: 'law', name: 'Public Law'}] },
    { id: 'BUS', name: 'Business & Econ', icon: <Library size={32} />, departments: [{id: 'acc', name: 'Accounting'}] },
  ];

  const handleGradeSelect = (g) => {
    setGrade(g.label);
    localStorage.setItem('user_grade', g.label);
    setTempGrade(g);

    if (g.id === '11' || g.id === '12') setStep(2);
    else if (g.type === 'university') setStep(3);
    else {
      finishSelection('both');
    }
  };

  const handleCollegeSelect = (college) => {
    setSelectedCollege(college);
    setStep(4); // Move to Department selection
  };

  const finishSelection = (streamType) => {
    setStream(streamType);
    localStorage.setItem('user_stream', streamType);
    navigate('/dashboard', { state: { grade: tempGrade?.label, stream: streamType } });
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
            </div>
          </div>
        )}

        {/* STEP 2: SCHOOL STREAMS */}
        {step === 2 && (
          <div className="max-w-3xl mx-auto animate-in fade-in zoom-in-95 duration-500">
            <button onClick={() => setStep(1)} className="flex items-center gap-2 text-slate-500 mb-8 font-black uppercase text-xs tracking-widest"><ArrowLeft size={16}/> Back</button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <button onClick={() => finishSelection('natural')} className="group p-10 bg-emerald-500/5 border border-emerald-500/20 rounded-[40px] hover:border-emerald-500 transition-all text-left">
                <div className="w-16 h-16 bg-emerald-500 rounded-3xl flex items-center justify-center text-white mb-8"><Microscope size={32} /></div>
                <h4 className="text-3xl font-black">Natural</h4>
              </button>
              <button onClick={() => finishSelection('social')} className="group p-10 bg-blue-500/5 border border-blue-500/20 rounded-[40px] hover:border-blue-500 transition-all text-left">
                <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white mb-8"><Globe2 size={32} /></div>
                <h4 className="text-3xl font-black">Social</h4>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: UNIVERSITY COLLEGES */}
        {step === 3 && (
          <div className="max-w-5xl mx-auto animate-in fade-in zoom-in-95 duration-500">
            <button onClick={() => setStep(1)} className="flex items-center gap-2 text-slate-500 mb-8 font-black uppercase text-xs tracking-widest"><ArrowLeft size={16}/> Back</button>
            <h2 className="text-4xl font-black mb-12">Select your College</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {universityColleges.map((college) => (
                <button key={college.id} onClick={() => handleCollegeSelect(college)} className="group p-8 bg-slate-900/40 border border-slate-800 rounded-[35px] hover:border-white transition-all text-left">
                  <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-300 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">{college.icon}</div>
                  <h4 className="text-xl font-black leading-tight">{college.name}</h4>
                  <div className="mt-4 flex items-center gap-2 text-blue-500 text-[10px] font-black uppercase tracking-widest group-hover:translate-x-1 transition-transform">Choose Dept <ChevronRight size={14}/></div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: UNIVERSITY DEPARTMENTS */}
        {step === 4 && (
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-right-8 duration-500">
            <button onClick={() => setStep(3)} className="flex items-center gap-2 text-slate-500 mb-8 font-black uppercase text-xs tracking-widest"><ArrowLeft size={16}/> Back to Colleges</button>
            <h2 className="text-4xl font-black mb-4">Select Department</h2>
            <p className="text-slate-400 mb-12">Choose your specific field of study in {selectedCollege?.name}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedCollege?.departments.map((dept) => (
                <button 
                  key={dept.id} 
                  onClick={() => finishSelection(dept.id)}
                  className="flex items-center justify-between p-6 bg-slate-900/60 border border-slate-800 rounded-2xl hover:border-blue-500/50 hover:bg-slate-800 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-blue-400 group-hover:text-white transition-colors">{dept.icon}</div>
                    <span className="text-lg font-bold">{dept.name}</span>
                  </div>
                  <ChevronRight size={20} className="text-slate-600 group-hover:text-blue-500 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default GradeSelection;