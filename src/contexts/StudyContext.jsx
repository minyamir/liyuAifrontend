import React, { createContext, useContext, useState } from 'react';

const StudyContext = createContext();

export const StudyProvider = ({ children }) => {
  // --- GRADE & STREAM STATE ---
  const [grade, setGrade] = useState(localStorage.getItem('user_grade') || 'Grade 9');
  
  // NEW: Added stream state to handle Natural/Social selection
  const [stream, setStream] = useState(localStorage.getItem('user_stream') || 'both');

  // --- CHAT & FILE STATE ---
  const [currentSubject, setCurrentSubject] = useState(null);
  const [messages, setMessages] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);

  const addMessage = (role, content) => {
    setMessages(prev => [...prev, { 
      role, 
      content, 
      id: Date.now(),
      timestamp: new Date().toISOString() 
    }]);
  };

  const clearChat = () => setMessages([]);

  return (
    <StudyContext.Provider value={{ 
      grade, 
      setGrade, 
      stream,        // Added to Provider
      setStream,     // Added to Provider
      currentSubject, 
      setCurrentSubject, 
      messages, 
      addMessage, 
      clearChat,
      uploadedFile, 
      setUploadedFile 
    }}>
      {children}
    </StudyContext.Provider>
  );
};

export const useStudy = () => useContext(StudyContext);