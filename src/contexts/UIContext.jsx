import React, { createContext, useContext, useState } from 'react';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeModal, setActiveModal] = useState(null); // 'settings', 'profile', etc.
  const [notification, setNotification] = useState(null);

  const showToast = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <UIContext.Provider value={{ 
      isSidebarOpen, toggleSidebar, 
      activeModal, setActiveModal, 
      notification, showToast 
    }}>
      {children}
      
      {/* Global Toast Notification Component */}
      {notification && (
        <div className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-xl z-[99] text-white font-bold animate-bounce ${
          notification.type === 'error' ? 'bg-red-600' : 'bg-blue-600'
        }`}>
          {notification.message}
        </div>
      )}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);