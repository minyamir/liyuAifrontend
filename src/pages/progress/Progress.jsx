import React from 'react';
import Navbar from '../../components/layout/Navbar';

const Progress = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Stats</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase">Study Streak</p>
            <p className="text-3xl font-black text-orange-500">7 Days 🔥</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase">Lessons Completed</p>
            <p className="text-3xl font-black text-blue-600">24</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase">Quiz Accuracy</p>
            <p className="text-3xl font-black text-green-500">88%</p>
          </div>
        </div>

        {/* Detailed subject breakdown placeholder */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold mb-6">Subject Breakdown</h3>
          <div className="space-y-6">
             {/* Map through subjects here similarly to Dashboard */}
             <p className="text-gray-400 italic">Progress data is syncing...</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Progress;