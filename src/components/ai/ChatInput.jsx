import React, { useState, useRef, useEffect } from 'react';
import { SendHorizonal } from 'lucide-react';
import VoiceButton from './VoiceButton';
import { useStudy } from '../../contexts/StudyContext';

const ChatInput = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);
  const { language } = useStudy();

  const speechLang = language === 'am' ? 'am-ET' : 'en-US';

  // Auto-resize textarea height based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!input.trim() || disabled) return;
    onSend(input);
    setInput('');
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="relative flex items-end gap-2 bg-slate-50 p-2 rounded-[28px] border border-slate-200 focus-within:border-blue-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/5 transition-all duration-300 shadow-sm"
    >
      {/* Spacer where the toggle used to be, now just clean padding */}
      <div className="pl-2" />

  <textarea
  ref={textareaRef}
  rows="1"
  value={input}
  onChange={(e) => setInput(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }}
  placeholder="Ask Liyu anything..."
  className="flex-1 bg-transparent border-none outline-none ring-0 focus:ring-0 focus:outline-none 
             text-[14px] min-h-[44px] py-3 px-1 resize-none max-h-40 font-medium 
             text-slate-900 dark:text-white placeholder:text-slate-400 
             custom-scrollbar"
  style={{ 
    lineHeight: '20px',
    // Ensures the text color isn't being overridden by a parent style
    color: 'inherit' 
  }}
/>

      <div className="flex gap-1.5 pb-1 pr-1 items-center">
        {/* Voice Input Trigger */}
        <VoiceButton
  onTranscript={(transcript) => { 
    setInput((prev) => { 
      // Clean up the previous input
      const currentInput = prev.trim();
      
      if (!currentInput) return transcript; 

      // If the transcript is already at the very end of the input, don't add it again
      if (currentInput.toLowerCase().endsWith(transcript.toLowerCase())) {
        return prev;
      }
      
      return `${prev} ${transcript}`;
    });
  }}
  language={speechLang}
/>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!input.trim() || disabled}
          className="p-3 bg-blue-600 text-white rounded-[18px] hover:bg-blue-700 active:scale-95 disabled:opacity-30 disabled:hover:bg-blue-600 disabled:scale-100 transition-all shadow-lg shadow-blue-200"
        >
          <SendHorizonal size={18} strokeWidth={2.5} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;