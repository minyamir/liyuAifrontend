import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudy } from '../../contexts/StudyContext';
import { SUBJECTS } from '../../utils/gradeConfig';
import SubjectCard from './SubjectCard';

const SubjectGrid = () => {
  const { grade, stream } = useStudy();
  const navigate = useNavigate();

  // Filter based on the sidebar selection
  const filtered = SUBJECTS.filter((sub) => {
    const isGrade = sub.grades.includes(grade);
    const isStream = sub.stream === "both" || sub.stream === stream?.toLowerCase();
    return isGrade && isStream;
  });

  const handleOpenBook = (subject) => {
    navigate(`/study/${subject.id}`, { 
      state: { 
        fileUrl: subject.fileUrl, 
        subjectName: subject.name,
        thumbnail: subject.thumbnail 
      } 
    });
  };

  return (
    <div className="w-full py-6">
      {/* Stats Bar */}
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="h-1 flex-1 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 w-1/4" />
        </div>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
          {filtered.length} Textbooks Available
        </span>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtered.map((subject) => (
            <SubjectCard 
              key={subject.id} 
              subject={subject} 
              onClick={handleOpenBook} 
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
          <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">No books found for this grade.</p>
        </div>
      )}
    </div>
  );
};

export default SubjectGrid;