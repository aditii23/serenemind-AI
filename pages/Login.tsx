
import React, { useState } from 'react';
import { db } from '../services/db';
import { User } from '../types';
import { Sparkles, ArrowRight } from 'lucide-react';

interface LoginProps {
  setUser: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegistering) {
      const newUser = db.auth.register(name, email);
      setUser(newUser);
    } else {
      const user = db.auth.login(email);
      if (user) {
        setUser(user);
      } else {
        alert("Account not found. Try registering!");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-indigo-500 p-4 rounded-2xl mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold font-brand text-gray-800">
            {isRegistering ? 'Start Your Journey' : 'Welcome Back'}
          </h1>
          <p className="text-gray-500 text-sm mt-2 text-center">
            {isRegistering 
              ? 'Create an account to track your mood and get AI wellness analysis.' 
              : 'Sign in to continue your mental wellness journey.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Enter your name"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="your@email.com"
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-indigo-500 text-white py-3 rounded-xl font-bold hover:bg-indigo-600 transition-all flex items-center justify-center space-x-2"
          >
            <span>{isRegistering ? 'Register' : 'Login'}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-indigo-500 text-sm font-medium hover:underline"
          >
            {isRegistering ? 'Already have an account? Sign In' : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
