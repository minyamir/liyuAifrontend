import React, { useState } from 'react';
import { loginUser, getUserInfo } from '../../api/authApi';
import { useAuth } from '../../contexts/AuthContext';

const LoginForm = ({ onSuccess }) => {
const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // 1. Get the tokens
      const tokenData = await loginUser({ email, password });
      
      // 2. Set tokens in localStorage temporarily so getUserInfo can use them
      localStorage.setItem('accessToken', tokenData.access);
      
      // 3. Get the user profile
      const userProfile = await getUserInfo();
      
      // 4. Update the global Auth state
      login(userProfile, tokenData);
      
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Check your email/password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500 text-sm font-bold bg-red-50 p-2 rounded-lg">{error}</div>}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
          placeholder="example@gmail.com"
          required 
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
          placeholder="••••••••"
          required 
        />
      </div>
      <button 
        disabled={isSubmitting}
        type="submit" 
        className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
};

// THIS LINE IS THE FIX
export default LoginForm;