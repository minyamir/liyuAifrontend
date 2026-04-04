import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import AIStatusBadge from './AIStatusBadge';
import LanguageToggle from './LanguageToggle';
import { sendAiMessage, getChatHistory } from '../../api/aiApi';
import { useStudy } from '../../contexts/StudyContext';

const ChatBox = ({ attachments, activeSessionId }) => {
  const { messages, setMessages } = useStudy();
  const [isTyping, setIsTyping] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!activeSessionId) return;
      
      setIsLoadingHistory(true);
      try {
        const history = await getChatHistory(activeSessionId);
        
        // Map backend fields to frontend state format
        const formattedHistory = history.map(msg => ({
          id: msg.id,
          text: msg.message,
          isAi: msg.sender === 'ai',
          timestamp: msg.timestamp // Optional: pass to Bubble
        }));
        
        setMessages(formattedHistory);
      } catch (err) {
        console.error("Failed to load history:", err);
      } finally {
        setIsLoadingHistory(false);
      }
    };

    fetchHistory();
  }, [activeSessionId, setMessages]);

  // Smooth scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

const handleSendMessage = async (text) => {
    if (!text.trim() || !activeSessionId) {
      console.error("No Session ID found in ChatBox");
      return
    };

    // 1. Add User Message to UI
    const userMsg = { id: Date.now(), text, isAi: false };
    setMessages(prev => [...prev, userMsg]);
    console.log("User message added to state:", text);
    
    setIsTyping(true);
    
    try {
      // 2. Call the Real Backend
      // The backend will automatically look for the "is_active=True" book
      const response = await sendAiMessage(activeSessionId, text);
      
      // 3. Add AI Response to UI
      const aiResponse = { 
        id: Date.now() + 1, 
        text: response.reply, // The 'reply' key from your Django view
        isAi: true 
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (err) {
      console.error("Chat Error:", err);
      const errorMsg = {
        id: Date.now() + 2,
        text: "Sorry, I'm having trouble connecting to my brain. Please try again.",
        isAi: true,
        isError: true // You can style this red in MessageBubble
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
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
              Learning from {attachments.length > 0 ? attachments.length + 1 : 1} Sources
            </span>
          </div>
        )}
      </div>

      {/* MESSAGES AREA: Z-0 and Scrollable */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar relative z-0"
      >
        {isLoadingHistory && (
           <div className="flex justify-center py-4">
              <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
           </div>
        )}
        
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