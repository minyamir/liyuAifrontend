import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LessonViewer from '../../components/study/LessonViewer';
import ChatBox from '../../components/ai/ChatBox';
import StudyHeader from '../../components/study/StudyHeader';
import UploadBox from '../../components/study/UploadBox';
import AISummary from '../../components/study/SummaryPanel'; 
import AIQuiz from '../../components/study/QuizPanel';      
import { useStudy } from '../../contexts/StudyContext';
import { uploadFile, getSessionFiles } from '../../api/uploadApi'; // New API
import { BookOpen, Plus, X, Loader2 } from 'lucide-react';

const StudyRoom = () => {
  const location = useLocation();
  const { grade, sessionId } = useStudy(); // Grab sessionId from "The Brain"
  
  const [pdfUrl, setPdfUrl] = useState(null);
  const [references, setReferences] = useState([]); 
  const [activeUrl, setActiveUrl] = useState(null);
  const [activeTab, setActiveTab] = useState('chat'); 
  const [uploading, setUploading] = useState(false);

  // 1. Initial Sync: Load all files already attached to this session
  useEffect(() => {
    const syncSessionFiles = async () => {
      if (!sessionId) return;
      try {
        const files = await getSessionFiles(sessionId);
        if (files && files.length > 0) {
          // Identify the main textbook vs user uploads
          const mainBook = files.find(f => f.is_system_file) || files[0];
          const userRefs = files.filter(f => !f.is_system_file);
          
          setPdfUrl(mainBook.file);
          setActiveUrl(mainBook.file);
          setReferences(userRefs.map(f => ({ 
            id: f.id, 
            name: f.name, 
            url: f.file 
          })));
        }
      } catch (err) {
        console.error("Failed to sync session files", err);
      }
    };
    syncSessionFiles();
  }, [sessionId]);

  // 2. Real Upload Logic: Sends file to Django
  const handleFileUpload = async (file) => {
    if (!file || !sessionId) return;
    
    try {
      setUploading(true);
      const uploadedData = await uploadFile(file, sessionId);
      
      const newRef = { 
        id: uploadedData.id, 
        name: uploadedData.name, 
        url: uploadedData.file // The real URL from Django Media
      };
      
      // If no main PDF is set, make this the primary view
      if (!pdfUrl) {
        setPdfUrl(newRef.url);
        setActiveUrl(newRef.url);
      } else {
        setReferences(prev => [...prev, newRef]);
        setActiveUrl(newRef.url); 
      }
    } catch (err) {
      alert("Upload failed. Make sure the file is a valid PDF.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-[#020617] overflow-hidden">
      <StudyHeader 
        title={location.state?.subjectName || "Study Room"} 
        grade={grade}
        onUploadClick={() => setPdfUrl(null)} 
      />

      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT: WORKSPACE */}
        <div className="flex-1 h-full bg-white relative border-r border-slate-200 flex flex-col overflow-hidden">
          {pdfUrl && (
            <div className="flex-shrink-0 flex items-center gap-3 px-4 py-3 bg-slate-50 border-b border-slate-100 overflow-x-auto no-scrollbar">
              <button 
                onClick={() => setActiveUrl(pdfUrl)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 transition-all whitespace-nowrap ${
                  activeUrl === pdfUrl ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-transparent text-slate-500 hover:bg-slate-100'
                }`}
              >
                <BookOpen size={14} />
                <span className="text-[10px] font-black uppercase tracking-wider">Main Textbook</span>
              </button>

              {references.map((ref) => (
                <div key={ref.id} className="relative group">
                  <button 
                    onClick={() => setActiveUrl(ref.url)}
                    className={`flex items-center gap-2 pl-3 pr-8 py-1.5 rounded-lg border-2 transition-all whitespace-nowrap ${
                      activeUrl === ref.url ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-transparent text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                    <span className="text-[10px] font-black uppercase truncate max-w-[100px]">{ref.name}</span>
                  </button>
                </div>
              ))}

              {uploading ? (
                <Loader2 className="animate-spin text-blue-600 ml-2" size={18} />
              ) : (
                <button 
                  onClick={() => document.getElementById('file-upload-room').click()}
                  className="p-2 rounded-lg bg-white border border-slate-200 hover:border-blue-500 text-slate-400 transition-all"
                >
                  <Plus size={18} />
                </button>
              )}
            </div>
          )}

          <div className="flex-1 overflow-hidden relative bg-slate-100">
            {pdfUrl ? <LessonViewer url={activeUrl} /> : (
              <div className="h-full flex items-center justify-center bg-slate-50 p-10">
                <UploadBox grade={grade} onFileUpload={handleFileUpload} />
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: AI TOOLS PANEL */}
        <div className="flex-1 h-full bg-white flex flex-col shadow-2xl z-10 overflow-hidden border-l border-slate-200">
          {/* ... (Existing Tab Navigation Stays the same) ... */}

          <div className="flex-1 overflow-hidden flex flex-col">
            {activeTab === 'chat' && <ChatBox attachments={references} />}
            {activeTab === 'summary' && <AISummary />}
            {activeTab === 'quiz' && <AIQuiz />}
          </div>
        </div>

      </div>

      <input 
        type="file" id="file-upload-room" className="hidden" accept=".pdf"
        onChange={(e) => {
            handleFileUpload(e.target.files[0]);
            e.target.value = null;
        }} 
      />
    </div>
  );
};
export default StudyRoom;