'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Dumbbell, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const { loginUser } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both email/username and password.');
      return;
    }
    setError('');
    const result = await loginUser(username, password);
    if (result.success) {
      if (result.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        setError('Access denied. Admin role required.');
      }
    } else {
      setError(result.message || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10">
        <Link href="/" className="inline-flex items-center gap-2 font-bold text-2xl text-brand-primary tracking-tight">
          <div className="p-2 bg-brand-primary rounded-xl text-white">
            <Dumbbell className="h-6 w-6" />
          </div>
          <span>FLEX<span className="text-zinc-50 dark:text-zinc-50 font-medium">PASS</span></span>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Partner Console Login
        </h2>
        <p className="mt-2 text-center text-sm text-zinc-400">
          Access the Gym & Platform Administration
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4">
        <div className="bg-zinc-900 py-8 px-4 shadow-xl rounded-3xl border border-zinc-800 sm:px-10 space-y-6">
          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl font-semibold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1.5 uppercase">
                Username / Email
              </label>
              <input
                type="text"
                required
                placeholder="e.g. admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-sm focus:outline-brand-primary/50 text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1.5 uppercase">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-sm focus:outline-brand-primary/50 text-white"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-brand-primary hover:bg-brand-secondary text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <span>Console Log In</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>

          <div className="text-center text-xs text-zinc-500">
            <Link href="/" className="hover:underline">
              ← Back to Main Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
