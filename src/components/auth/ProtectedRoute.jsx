import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // 1. Show a loading state while checking if the user is logged in
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // 2. If no user is found in AuthContext, redirect to Login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. If everything is fine, show the requested page (Dashboard/StudyRoom)
  return children;
};

export default ProtectedRoute;