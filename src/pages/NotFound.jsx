import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-9xl font-black text-gray-100 mb-0">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 -mt-8 mb-4">Lesson Not Found</h2>
      <p className="text-gray-500 mb-8 max-w-sm">We couldn't find the page you're looking for. Maybe it's still being prepared by our AI teachers?</p>
      <Link to="/dashboard" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 transition-transform hover:scale-105">
        Return to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;