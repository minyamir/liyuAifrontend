import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserInfo } from '../api/authApi'; // We'll use this to verify the session

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          // If we have a token, fetch the actual user data from the backend
          const userData = await getUserInfo();
          setUser(userData);
        } catch (err) {
          console.error("Session invalid", err);
          logout();
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = (userData, tokens) => {
    // Save tokens separately for the axios interceptors
    localStorage.setItem('accessToken', tokens.access);
    localStorage.setItem('refreshToken', tokens.refresh);
    
    // Save user profile info
    setUser(userData);
    localStorage.setItem('liyu_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.clear(); // Clears tokens and user info
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);