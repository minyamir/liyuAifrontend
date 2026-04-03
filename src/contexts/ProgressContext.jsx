import React, { createContext, useContext, useState } from 'react';

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [stats, setStats] = useState({
    streak: 0,
    lessonsCompleted: 0,
    totalQuizzes: 0,
    averageScore: 0
  });

  const updateProgress = (quizScore) => {
    setStats(prev => ({
      ...prev,
      totalQuizzes: prev.totalQuizzes + 1,
      lessonsCompleted: prev.lessonsCompleted + 1,
      averageScore: Math.round((prev.averageScore + quizScore) / 2)
    }));
  };

  return (
    <ProgressContext.Provider value={{ stats, updateProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);