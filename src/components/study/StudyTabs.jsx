import React from 'react';

const StudyTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'lesson', label: 'Lesson Content' },
    { id: 'summary', label: 'AI Summary' },
    { id: 'quiz', label: 'Practice Quiz' }
  ];

  return (
    <div className="flex border-b border-gray-100 bg-white sticky top-0 z-10">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex-1 py-4 text-sm font-bold transition-all border-b-2 ${
            activeTab === tab.id
              ? 'border-blue-600 text-blue-600 bg-blue-50/30'
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default StudyTabs;