import React from 'react';
import { Sparkles, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const MessageBubble = ({ message }) => {
  const { text, isAi, isError, timestamp } = message;

  return (
    <div className={`flex gap-3 w-full animate-in fade-in slide-in-from-bottom-2 duration-500 ${
      isAi ? 'flex-row' : 'flex-row-reverse'
    }`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-2xl flex items-center justify-center shrink-0 ${
        isAi 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
          : 'bg-slate-800 text-white shadow-lg shadow-slate-500/10'
      }`}>
        {isAi ? <Sparkles size={14} className="animate-pulse" /> : <User size={14} />}
      </div>

      <div className={`flex flex-col max-w-[85%] sm:max-w-[80%] ${isAi ? 'items-start' : 'items-end'}`}>
        {/* Bubble Styling */}
        <div className={`p-4 rounded-[24px] text-[13px] leading-relaxed transition-all ${
          isAi 
            ? `bg-white border text-slate-700 rounded-tl-none shadow-sm ${isError ? 'border-red-200 bg-red-50' : 'border-slate-100'}` 
            : 'bg-blue-600 text-white rounded-tr-none shadow-md shadow-blue-500/10'
        }`}>
          
          {/* THE MAGIC HAPPENS HERE: ReactMarkdown renders the text properly */}
          <div className="markdown-content font-medium">
            <ReactMarkdown
              components={{
                // Make headers smaller and clean
                h1: ({node, ...props}) => <h1 className="text-base font-black mb-2 mt-1 uppercase tracking-tight text-slate-900" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-sm font-black mb-2 mt-3 uppercase tracking-tight text-slate-800" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-[13px] font-black mb-1 mt-2 text-blue-600 uppercase" {...props} />,
                // Clean up lists
                ul: ({node, ...props}) => <ul className="list-disc ml-4 mb-2 space-y-1" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal ml-4 mb-2 space-y-1" {...props} />,
                li: ({node, ...props}) => <li className="mb-0.5" {...props} />,
                // Style bold text
                strong: ({node, ...props}) => <strong className="font-black text-blue-700 bg-blue-50 px-1 rounded-sm" {...props} />,
                // Handle paragraphs
                p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
              }}
            >
              {text}
            </ReactMarkdown>
          </div>
        </div>

        {/* Footer info */}
        <div className={`flex items-center gap-1.5 mt-1.5 px-1 ${isAi ? 'flex-row' : 'flex-row-reverse'}`}>
          <span className="text-[9px] font-black uppercase text-slate-300 tracking-[0.15em]">
            {isAi ? 'Liyu AI' : 'You'}
          </span>
          <div className="w-1 h-1 rounded-full bg-slate-200" />
          <span className="text-[8px] font-bold text-slate-300">
             {timestamp ? new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;