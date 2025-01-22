"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  
  const router = useRouter();
  const { login, register, user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isRegister) {
        await register(email, password, name);
      } else {
        await login(email, password);
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8">
        <h1 className="text-4xl font-mono mb-8 text-center">book.{isRegister ? 'register' : 'login'}()</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block font-mono text-sm mb-1" htmlFor="name">name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded font-mono"
                required
              />
            </div>
          )}
          
          <div>
            <label className="block font-mono text-sm mb-1" htmlFor="email">email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded font-mono"
              required
            />
          </div>
          
          <div>
            <label className="block font-mono text-sm mb-1" htmlFor="password">password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded font-mono"
              required
            />
          </div>
          
          {error && (
            <p className="text-red-500 text-sm font-mono">{error}</p>
          )}
          
          <button
            type="submit"
            className="w-full bg-foreground text-background p-2 rounded font-mono hover:opacity-90"
          >
            {isRegister ? 'register' : 'login'}
          </button>
        </form>
        
        <button
          onClick={() => setIsRegister(!isRegister)}
          className="w-full mt-4 text-sm font-mono text-gray-600 hover:text-gray-900"
        >
          {isRegister ? 'already have an account? login' : 'need an account? register'}
        </button>
      </div>
    </div>
  );
}