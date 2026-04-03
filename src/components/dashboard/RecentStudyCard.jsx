import React from 'react';
import { PlayCircle } from 'lucide-react'; // Assuming you use lucide-react

const RecentStudyCard = ({ lastSubject = "Mathematics" }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4 hover:border-blue-300 transition-colors cursor-pointer group">
      <div className="p-3 bg-orange-100 text-orange-600 rounded-full group-hover:bg-orange-600 group-hover:text-white transition-all">
        <PlayCircle size={24} />
      </div>
      <div>
        <p className="text-xs text-gray-500">Pick up where you left off</p>
        <h4 className="font-bold text-gray-800">{lastSubject}</h4>
      </div>
    </div>
  );
};

export default RecentStudyCard;