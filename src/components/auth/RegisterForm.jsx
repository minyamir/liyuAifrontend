import React, { useState } from 'react';

const RegisterForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(''); // Clear error when typing
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic Validation for the demo
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    console.log("Registering user:", formData.fullName);
    
    // Call the parent success function (which usually navigates to /grade-selection)
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-xl animate-shake">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
        <input 
          name="fullName"
          type="text" 
          required
          value={formData.fullName}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm" 
          placeholder="e.g. Abebe Balcha"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
        <input 
          name="email"
          type="email" 
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm" 
          placeholder="abebe@example.com"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
          <input 
            name="password"
            type="password" 
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
            placeholder="••••••"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Confirm</label>
          <input 
            name="confirmPassword"
            type="password" 
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
            placeholder="••••••"
          />
        </div>
      </div>

      <button 
        type="submit" 
        className="w-full mt-2 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-95"
      >
        Create Account
      </button>
    </form>
  );
};

// CRITICAL: Exporting as default to fix your SyntaxError
export default RegisterForm;