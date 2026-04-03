import React, { useState } from 'react';
import { Upload, X, FileText } from 'lucide-react';

const UploadBox = ({ onFileUpload, grade, onCancel }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = (files) => {
    if (files && files[0]) onFileUpload(files[0]);
  };

  return (
    <div className="relative w-full max-w-2xl">
      {/* Close button if we are in an overlay state */}
      {onCancel && (
        <button 
          onClick={onCancel}
          className="absolute -top-4 -right-4 p-3 bg-white shadow-xl rounded-full text-slate-400 hover:text-red-500 z-10 border border-slate-100"
        >
          <X size={20} />
        </button>
      )}

      <div 
        className={`border-4 border-dashed rounded-[48px] p-16 transition-all text-center flex flex-col items-center justify-center min-h-[450px] ${
          dragActive ? 'border-blue-500 bg-blue-50/50 scale-[0.98]' : 'border-slate-100 bg-white shadow-2xl shadow-blue-900/5'
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
        onDrop={(e) => { 
          e.preventDefault(); 
          setDragActive(false); 
          handleFiles(e.dataTransfer.files); 
        }}
      >
        <div className="w-24 h-24 bg-blue-600/10 text-blue-600 rounded-[32px] flex items-center justify-center mb-8">
          <Upload size={44} strokeWidth={2.5} />
        </div>
        
        <h3 className="text-3xl font-black text-slate-800 tracking-tight">
          {grade ? `Grade ${grade} Materials` : 'Study Material'}
        </h3>
        
        <p className="text-slate-500 mt-4 mb-12 max-w-sm mx-auto text-lg leading-relaxed">
          Drop your textbook PDF, teacher handouts, or photos of your notes here.
        </p>
        
        <input 
          type="file" 
          id="file-upload" 
          className="hidden" 
          accept=".pdf,image/*"
          onChange={(e) => handleFiles(e.target.files)}
        />
        
        <label 
          htmlFor="file-upload"
          className="group relative bg-slate-900 text-white px-12 py-5 rounded-[24px] font-black text-sm uppercase tracking-widest hover:bg-blue-600 cursor-pointer shadow-2xl shadow-blue-500/20 transition-all active:scale-95"
        >
          <span className="relative z-10">Select from Computer</span></label>
      
        
        <div className="flex items-center gap-6 mt-12 opacity-40">
           <div className="flex items-center gap-2"><FileText size={14}/> <span className="text-[10px] font-bold uppercase tracking-tighter">PDF</span></div>
           <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
           <div className="flex items-center gap-2"><FileText size={14}/> <span className="text-[10px] font-bold uppercase tracking-tighter">Images</span></div>
        </div>
      </div>
    </div>
  );
};

export default UploadBox;