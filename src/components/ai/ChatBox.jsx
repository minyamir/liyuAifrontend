import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import AIStatusBadge from './AIStatusBadge';
import LanguageToggle from './LanguageToggle';

const ChatBox = ({ attachments }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm Liyu AI. I've loaded your study materials. How can I help you today?", isAi: true }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  // Smooth scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), text, isAi: false };
    setMessages(prev => [...prev, userMsg]);
    
    setIsTyping(true);
    
    // Simulate AI logic
    setTimeout(() => {
      const aiResponse = { 
        id: Date.now() + 1, 
        text: `Looking at the lesson on the left, regarding "${text}", I found that...`, 
        isAi: true 
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-white relative overflow-hidden">
      {/* HEADER: Z-30 and Sticky */}
      <div className="px-6 py-4 border-b border-slate-50 flex justify-between items-center bg-white/95 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <AIStatusBadge status={isTyping ? 'thinking' : 'ready'} />
          <LanguageToggle /> 
        </div>
        
        {attachments?.length > 0 && (
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[9px] font-black text-blue-600 uppercase tracking-wider">
              {attachments.length} Active Contexts
            </span>
          </div>
        )}
      </div>

      {/* MESSAGES AREA: Z-0 and Scrollable */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar relative z-0"
      >
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        
        {isTyping && (
          <div className="flex gap-3 animate-pulse items-start">
            <div className="w-8 h-8 rounded-full bg-slate-100 shrink-0" />
            <div className="space-y-2">
              <div className="h-4 w-48 bg-slate-100 rounded-full" />
              <div className="h-4 w-32 bg-slate-100 rounded-full" />
            </div>
          </div>
        )}
      </div>

      {/* INPUT AREA: Stays at the bottom */}
      <div className="p-4 bg-white border-t border-slate-100 z-10">
        <ChatInput onSend={handleSendMessage} disabled={isTyping} />
        <p className="text-[9px] text-center text-slate-300 font-bold uppercase tracking-[0.2em] mt-3">
          Liyu AI · Smart Student Assistant
        </p>
      </div>
    </div>
  );
};

export default ChatBox;