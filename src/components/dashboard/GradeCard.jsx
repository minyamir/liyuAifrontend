import React from 'react';
import { useNavigate } from 'react-router-dom';

const GradeCard = ({ grade }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center justify-between">
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Current Level</p>
        <h3 className="text-xl font-bold text-blue-900">{grade}</h3>
      </div>
      <button 
        onClick={() => navigate('/')}
        className="text-sm font-medium text-blue-600 hover:text-blue-800 underline underline-offset-4"
      >
        Switch Grade
      </button>
    </div>
  );
};

export default GradeCard;