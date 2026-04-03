import React from 'react';
import { Book, Download, ExternalLink } from 'lucide-react';

const TextbookCard = ({ title, pages, isLocked = false }) => {
  return (
    <div className={`group p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
      isLocked 
        ? 'bg-gray-50 border-gray-100 opacity-60 grayscale' 
        : 'bg-white border-blue-50 hover:border-blue-400 hover:shadow-md cursor-pointer'
    }`}>
      <div className="flex items-center gap-4">
        <div className="w-12 h-16 bg-blue-600 rounded-md shadow-sm flex items-center justify-center text-white relative overflow-hidden">
          <Book size={20} />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"></div>
        </div>
        
        <div>
          <h4 className="font-bold text-gray-900 text-sm group-hover:text-blue-700 transition-colors">
            {title}
          </h4>
          <p className="text-xs text-gray-500 font-medium mt-1">{pages}</p>
        </div>
      </div>

      <div className="flex gap-2">
        {!isLocked ? (
          <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors">
            <ExternalLink size={18} />
          </button>
        ) : (
          <span className="text-[10px] font-bold text-gray-400 uppercase">Coming Soon</span>
        )}
      </div>
    </div>
  );
};

export default TextbookCard;