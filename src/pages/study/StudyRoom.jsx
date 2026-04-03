import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LessonViewer from '../../components/study/LessonViewer';
import ChatBox from '../../components/ai/ChatBox';
import StudyHeader from '../../components/study/StudyHeader';
import UploadBox from '../../components/study/UploadBox';
import AISummary from '../../components/study/SummaryPanel'; 
import AIQuiz from '../../components/study/QuizPanel';    
import { useStudy } from '../../contexts/StudyContext';
import { uploadFile, getSessionFiles,activateFile, deleteFile } from '../../api/uploadApi';  
import { BookOpen, Plus, X, Sparkles, BrainCircuit, MessageSquare, Loader2 } from 'lucide-react';

const StudyRoom = () => {
  const location = useLocation();
  const { grade, sessionId } = useStudy();
  const [pdfUrl, setPdfUrl] = useState(null);
  const [references, setReferences] = useState([]); 
  const [activeUrl, setActiveUrl] = useState(null);
  const [activeTab, setActiveTab] = useState('chat'); 
  const [mainBookId, setMainBookId] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Inside StudyRoom.jsx
const activeSessionId = sessionId || location.state?.sessionId;

useEffect(() => {
  const syncSessionFiles = async () => {
    if (!activeSessionId) return;

    try { 
      const files = await getSessionFiles(activeSessionId);
      
      if (files && files.length > 0) {
        const mainBook = files.find(f => f.is_system_file) || files[0];
        setMainBookId(mainBook.id);
        const userRefs = files.filter(f => !f.is_system_file);
        // Ensure absolute URL
        const baseUrl = "http://127.0.0.1:8000";
        const formattedUrl = mainBook.file.startsWith('http') 
          ? mainBook.file 
          : `${baseUrl}${mainBook.file}`; 

        setPdfUrl(formattedUrl);
        setActiveUrl(formattedUrl);
        setReferences(userRefs.map(f => ({
          id: f.id,
          name: f.name,
          url: f.file.startsWith('http') ? f.file : `${baseUrl}${f.file}`
        })));
      }
    } catch (err) {
      console.error("Sync Error:", err);
    }
  };

  syncSessionFiles();
  // STABLE ARRAY: only depends on the value of the ID
}, [activeSessionId]);

  // 2. Real Upload Logic: Sends file to Django
const handleFileUpload = async (file) => {
  console.log("Upload triggered for session:", activeSessionId);
    if (!file || !sessionId) {
      console.error("Missing file or Session ID!");
      return
    };
    
    try {
      setUploading(true);
      const uploadedData = await uploadFile(file, sessionId);
      console.log("Django responded:", uploadedData);
      // FIX: Ensure the new URL has the backend prefix
      const baseUrl = "http://127.0.0.1:8000";
      const fullUrl = uploadedData.file.startsWith('http') 
        ? uploadedData.file 
        : `${baseUrl}${uploadedData.file}`;

      const newRef = { 
        id: uploadedData.id, 
        name: uploadedData.name, // This works now because of our Serializer fix!
        url: fullUrl 
      };
      
      if (!pdfUrl) {
        setPdfUrl(fullUrl);
        setActiveUrl(fullUrl);
      } else {
        setReferences(prev => [...prev, newRef]);
        setActiveUrl(fullUrl); 
      }
    } catch (err) {
      // Logic for Gemini Refusal
      const errorMsg = err.response?.data?.error || "Check your internet or file type.";
      alert(`Liyu AI: ${errorMsg}`);
    } finally {
      setUploading(false);
    }
  };

  const handleTabSwitch = async (fileId, url) => {
  // 1. Update UI immediately so it feels fast
  setActiveUrl(url);

  try {
    // 2. Tell Django this is now the "Context" for AI
    await activateFile(fileId);
    console.log("AI Context switched to File ID:", fileId);
  } catch (err) {
    console.error("Failed to sync AI context:", err);
  }
};

  const removeReference = async (e, id, url) => {
    e.stopPropagation(); // Stop the tab from being selected while deleting
    
    try {
      // 1. Tell Django to delete the physical file
      await deleteFile(id); 
      
      // 2. Update UI State
      setReferences(prev => {
        const filtered = prev.filter(ref => ref.id !== id);
        // If we were looking at the deleted file, switch back to the main textbook
        if (activeUrl === url) setActiveUrl(pdfUrl);
        return filtered;
      });
    } catch (err) {
      console.error("Failed to delete file from server:", err);
      alert("Could not delete file. It might already be gone.");
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
        
        {/* LEFT: WORKSPACE (Set to flex-1 for 50%) */}
        <div className="flex-1 h-full bg-white relative border-r border-slate-200 flex flex-col overflow-hidden">
          {pdfUrl && (
            <div className="flex-shrink-0 flex items-center gap-3 px-4 py-3 bg-slate-50 border-b border-slate-100 overflow-x-auto no-scrollbar">
              {/* Main Book Tab */}
              <button 
                onClick={() => handleTabSwitch(mainBookId, pdfUrl)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 transition-all whitespace-nowrap ${
                  activeUrl === pdfUrl ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-transparent text-slate-500 hover:bg-slate-100'
                }`}
              >
                <BookOpen size={14} /> 
              </button>

              {/* Reference Tabs */}
              {references.map((ref) => (
                <div key={ref.id} className="relative group">
                  <button 
                    onClick={() => handleTabSwitch(ref.id, ref.url)}
                    className={`flex items-center gap-2 pl-3 pr-8 py-1.5 rounded-lg border-2 transition-all whitespace-nowrap ${
                      activeUrl === ref.url ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-transparent text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase truncate max-w-[100px]">{ref.name}</span>
                  </button>
                  {ref.source_type !== 'system' &&(<button 
                    onClick={(e) => removeReference(e, ref.id, ref.url)}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-red-500 rounded-md transition-all"
                  >
                    <X size={12} strokeWidth={3} />
                  </button>)}
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

        {/* RIGHT: AI TOOLS PANEL (Set to flex-1 for 50%) */}
        <div className="flex-1 h-full bg-white flex flex-col shadow-2xl z-10 overflow-hidden border-l border-slate-200">
          
          {/* TAB NAV */}
          <div className="flex border-b border-slate-100 bg-slate-50/50 p-1">
            <button 
              onClick={() => setActiveTab('chat')}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'chat' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <MessageSquare size={16} /> Chat
            </button>
            <button 
              onClick={() => setActiveTab('summary')}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'summary' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <Sparkles size={16} /> Summary
            </button>
            <button 
              onClick={() => setActiveTab('quiz')}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'quiz' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <BrainCircuit size={16} /> Quiz
            </button>
          </div>

          {/* TAB CONTENT */}
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