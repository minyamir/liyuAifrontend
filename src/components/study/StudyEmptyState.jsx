import React from 'react';
import { BookOpen } from 'lucide-react';

const StudyEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 border border-gray-100">
        <BookOpen size={40} className="text-gray-200" />
      </div>
      <h3 className="text-lg font-bold text-gray-800">No Content Loaded</h3>
      <p className="text-sm text-gray-500 mt-2 max-w-xs">
        Upload your study materials or select a lesson from the sidebar to start your AI-powered session.
      </p>
    </div>
  );
};

export default StudyEmptyState;