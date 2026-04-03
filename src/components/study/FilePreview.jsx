import React from 'react';
import { FileText, X } from 'lucide-react';

const FilePreview = ({ fileName, onRemove }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-white border rounded-xl shadow-sm">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-red-50 text-red-600 rounded-lg">
          <FileText size={20} />
        </div>
        <div className="overflow-hidden">
          <p className="text-sm font-bold text-gray-800 truncate">{fileName}</p>
          <p className="text-[10px] text-gray-400 font-bold uppercase">Ready to Analyze</p>
        </div>
      </div>
      <button onClick={onRemove} className="p-1 hover:bg-gray-100 rounded-full text-gray-400">
        <X size={18} />
      </button>
    </div>
  );
};

export default FilePreview;