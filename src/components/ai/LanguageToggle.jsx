import React, { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

const LanguageToggle = () => {
  const [lang, setLang] = useState('EN'); 
  const [showMenu, setShowMenu] = useState(false);

  const languages = [
    { code: 'EN', label: 'English' },
    { code: 'AM', label: 'አማርኛ' },
    { code: 'OR', label: 'Afaan Oromoo' }
  ];

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100 hover:border-blue-200 text-slate-600 transition-all z-40 relative"
      >
        <Globe size={12} className="text-slate-400" />
        <span className="text-[10px] font-black">{lang}</span>
        <ChevronDown size={10} className={`transition-transform duration-200 ${showMenu ? 'rotate-180' : ''}`} />
      </button>

      {showMenu && (
        <>
          {/* Overlay to close menu when clicking anywhere else */}
          <div 
            className="fixed inset-0 z-[60] bg-transparent" 
            onClick={() => setShowMenu(false)} 
          />
          
          {/* Dropdown Menu - Highest Z-Index */}
          <div className="absolute top-full left-0 mt-2 w-36 bg-white rounded-2xl shadow-2xl shadow-blue-900/10 border border-slate-100 p-1.5 z-[70] animate-in fade-in slide-in-from-top-2 origin-top-left">
            <div className="px-2 py-1 mb-1 border-b border-slate-50">
              <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Select Language</span>
            </div>
            {languages.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => {
                  setLang(l.code);
                  setShowMenu(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-[10px] font-bold transition-all ${
                  lang === l.code 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageToggle;