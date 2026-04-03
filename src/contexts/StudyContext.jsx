import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext'; // Import Auth

const StudyContext = createContext();

export const StudyProvider = ({ children }) => {
  // Borrow identity from Auth Master
  const { user } = useAuth();
  
  // These become "Derived State" (automatic updates)
  const userName = user?.name || "Student";
  const grade = user?.grade_level || "7";
  const stream = user?.study_field || "both";

  const [currentSubject, setCurrentSubject] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);

  // ... (rest of your addMessage logic)

  return (
    <StudyContext.Provider value={{ 
      userName, // Now comes from Auth
      grade,    // Now comes from Auth
      stream,   // Now comes from Auth
      sessionId,
      setSessionId,
      currentSubject, 
      setCurrentSubject, 
      messages, 
      setMessages
    }}>
      {children}
    </StudyContext.Provider>
  );
};

export const useStudy = () => useContext(StudyContext);