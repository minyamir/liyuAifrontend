import React, { useState } from 'react';
import { registerUser } from '../../api/authApi';

const RegisterForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: ''
  });
  
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(''); // Clear error when user starts typing again
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Frontend Validation
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match!");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // 2. Call the API we built in authApi.js
      // The backend expects: { name, email, password, confirm_password }
      await registerUser(formData);
      
      // 3. If successful, trigger the success callback
      // This usually navigates the user to the Login page or Grade Selection
      onSuccess();
    } catch (err) {
      // 4. Handle Backend Errors
      // Django usually returns errors like { "email": ["This field must be unique."] }
      const backendError = err.response?.data;
      
      if (backendError?.email) {
        setError("This email is already registered.");
      } else if (backendError?.password) {
        setError(backendError.password[0]);
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-xl animate-pulse">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
        <input 
          name="name"
          type="text" 
          required
          value={formData.name}
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
            name="confirm_password"
            type="password" 
            required
            value={formData.confirm_password}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
            placeholder="••••••"
          />
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full mt-2 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creating Account...
          </span>
        ) : (
          "Create Account"
        )}
      </button>
    </form>
  );
};

// CRITICAL: Exporting as default to fix your SyntaxError
export default RegisterForm;