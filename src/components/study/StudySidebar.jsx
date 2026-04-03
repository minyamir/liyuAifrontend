import React from 'react';
import { Book, FileText, ChevronRight } from 'lucide-react';

const StudySidebar = ({ lessons = [], activeLessonId, onSelectLesson }) => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full overflow-y-auto">
      <div className="p-4 border-b">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Chapters</h3>
      </div>
      <nav className="flex-1 p-2 space-y-1">
        {lessons.map((lesson) => (
          <button
            key={lesson.id}
            onClick={() => onSelectLesson(lesson.id)}
            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
              activeLessonId === lesson.id 
                ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Book size={18} className={activeLessonId === lesson.id ? 'text-blue-600' : 'text-gray-400'} />
              <span className="text-sm font-semibold truncate text-left">{lesson.title}</span>
            </div>
            <ChevronRight size={14} className="opacity-40" />
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default StudySidebar;