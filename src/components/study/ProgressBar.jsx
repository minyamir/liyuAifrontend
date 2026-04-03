import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div className="w-32 bg-gray-100 h-2 rounded-full overflow-hidden">
      <div 
        className="bg-green-500 h-full rounded-full transition-all duration-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;