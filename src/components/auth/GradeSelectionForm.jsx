import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GRADE_LEVELS } from '../../utils/gradeConfig';
import { useStudy } from '../../contexts/StudyContext';

const GradeSelection = () => {
  const navigate = useNavigate();
  const { setGrade } = useStudy();

  const handleSelect = (g) => {
    setGrade(g);
    localStorage.setItem('user_grade', g);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-6">
      <h1 className="text-3xl font-bold mb-2">Welcome to Liyu Learn</h1>
      <p className="text-gray-600 mb-8">What grade are you in?</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl">
        {GRADE_LEVELS.map(g => (
          <button 
            key={g} 
            onClick={() => handleSelect(g)}
            className="bg-white p-4 rounded-xl border-2 border-transparent hover:border-blue-500 hover:shadow-md transition-all font-semibold"
          >
            {g}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GradeSelection;