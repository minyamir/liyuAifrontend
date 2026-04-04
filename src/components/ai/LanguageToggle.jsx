import React, { useState } from 'react';
import { Globe, ChevronDown, Loader2 } from 'lucide-react';
import { useStudy } from '../../contexts/StudyContext';
import { updateStudyLanguage } from '../../api/aiApi';

const LanguageToggle = () => {
  const { sessionId, language, setLanguage } = useStudy(); 
  const [showMenu, setShowMenu] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Normalize language to uppercase for display
  const currentLang = (language || 'EN').toUpperCase();

  const handleLanguageChange = async (newLangCode) => {
    const targetLang = newLangCode.toUpperCase();
    
    // Prevent redundant calls
    if (targetLang === currentLang || !sessionId) {
      setShowMenu(false);
      return;
    }
    
    setIsUpdating(true);
    setShowMenu(false);
    
    try {
      // Backend expects lowercase "en" or "am"
      await updateStudyLanguage(sessionId, targetLang.toLowerCase());
      
      // Update Context
      setLanguage(targetLang); 
      console.log("Language updated to:", targetLang);
    } catch (err) {
      console.error("Language Sync Failed:", err);
      // Optional: Add a toast notification here
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        disabled={isUpdating}
        onClick={() => setShowMenu(!showMenu)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all z-50 relative ${
          isUpdating ? 'bg-slate-100 opacity-70' : 'bg-slate-50 hover:border-blue-300'
        }`}
      >
        {isUpdating ? (
          <Loader2 size={12} className="animate-spin text-blue-500" />
        ) : (
          <Globe size={12} className={currentLang === 'AM' ? 'text-emerald-500' : 'text-blue-500'} />
        )}
        
        <span className="text-[10px] font-black tracking-tighter">
          {currentLang === 'AM' ? 'አማርኛ' : 'ENGLISH'}
        </span>
        
        <ChevronDown size={10} className={`transition-transform duration-300 ${showMenu ? 'rotate-180' : ''}`} />
      </button>

      {showMenu && (
        <>
          {/* Backdrop to close menu */}
          <div className="fixed inset-0 z-[80]" onClick={() => setShowMenu(false)} />
          
          {/* Dropdown Options */}
          <div className="absolute top-full left-0 mt-2 w-32 bg-white rounded-2xl shadow-2xl border border-slate-100 p-1.5 z-[90] animate-in fade-in zoom-in-95 duration-200">
            <button
              onMouseDown={() => handleLanguageChange('EN')}
              className={`w-full text-left px-3 py-2 rounded-xl text-[10px] font-bold mb-1 transition-all ${
                currentLang === 'EN' ? 'bg-blue-600 text-white' : 'hover:bg-slate-50 text-slate-600'
              }`}
            >
              English
            </button>
            <button
              onMouseDown={() => handleLanguageChange('AM')}
              className={`w-full text-left px-3 py-2 rounded-xl text-[10px] font-bold transition-all ${
                currentLang === 'AM' ? 'bg-blue-600 text-white' : 'hover:bg-slate-50 text-slate-600'
              }`}
            >
              አማርኛ
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageToggle;