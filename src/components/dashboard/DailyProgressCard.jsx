import React from 'react';

const DailyProgressCard = ({ completed = 2, total = 5 }) => {
  const percentage = (completed / total) * 100;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-bold text-gray-800">Daily Goal</h4>
        <span className="text-sm font-bold text-blue-600">{completed}/{total} Lessons</span>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
        <div 
          className="bg-blue-600 h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      <p className="text-xs text-gray-500 mt-3">
        {percentage === 100 ? "🎉 Daily goal reached!" : "Keep going to maintain your streak!"}
      </p>
    </div>
  );
};

export default DailyProgressCard;