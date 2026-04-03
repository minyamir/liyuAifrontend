import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudy } from '../../contexts/StudyContext';
import { getSubjects, startStudySession } from '../../api/studyApi';
import { SUBJECT_ASSETS } from '../../utils/subjectAssets'; // Our Design Map
import SubjectCard from './SubjectCard';
import { Loader2, BookX } from 'lucide-react';

const SubjectGrid = () => {
  const { setSessionId, setCurrentSubject } = useStudy(); 
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDashboardSubjects = async () => {
      try {
        setLoading(true);
        // 1. Fetch real subjects from Django (Filtered by User Grade/Field on backend)
        const backendData = await getSubjects(); 
        
        // 2. Enrich backend data with your Neon UI assets
        const enriched = backendData.map(sub => {
          // Look up design by name, fallback to 'default' if not found
          const ui = SUBJECT_ASSETS[sub.name] || SUBJECT_ASSETS["default"];
          
          return {
            ...sub,
            color: ui.color,
            icon: ui.icon,
            thumbnail: ui.thumbnail,
            // Format grades/stream for your existing SubjectCard.jsx props
            grades: [`Grade ${sub.grade_level}`],
            stream: sub.field 
          };
        });

        setSubjects(enriched);
      } catch (error) {
        console.error("Failed to load subjects:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardSubjects();
  }, []);

  const handleOpenBook = async (subject) => {
    try {
      // 1. Tell backend we are starting a session (3.1 in API Ref)
      const sessionData = await startStudySession(subject.id);
      
      // 2. Save Session ID to "The Brain" (Context)
      setSessionId(sessionData.session_id);
      setCurrentSubject(subject);

      // 3. Navigate to Study Room with the real Session ID
      navigate(`/study/${subject.id}`, { 
        state: { 
          subjectName: subject.name,
          thumbnail: subject.thumbnail,
          sessionId: sessionData.session_id
        } 
      });
    } catch (error) {
      alert("Could not start study session. Please try again.", error);
    }
  };

  if (loading) return (
    <div className="py-20 flex flex-col items-center justify-center">
       <Loader2 className="animate-spin text-blue-600 mb-4" size={32} />
       <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Loading Your Books...</p>
    </div>
  );

  return (
    <div className="w-full py-6">
      {/* Stats Bar showing actual count */}
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="h-1 flex-1 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 transition-all duration-1000" 
            style={{ width: `${(subjects.length / 10) * 100}%` }} 
          />
        </div>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
          {subjects.length} Textbooks Available
        </span>
      </div>

      {subjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {subjects.map((subject) => (
            <SubjectCard 
              key={subject.id} 
              subject={subject} 
              onClick={() => handleOpenBook(subject)} 
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
          <BookX className="mx-auto text-slate-300 mb-4" size={40} />
          <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">No books assigned to your profile yet.</p>
        </div>
      )}
    </div>
  );
};

export default SubjectGrid;