'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Dumbbell, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { loginUser } = useAuth();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !password) {
      setError('Please enter both name/email and password.');
      return;
    }
    
    // Normalize input to email format if it's just a username
    const emailInput = name.includes('@') ? name : `${name.toLowerCase().replace(/\s+/g, '')}@example.com`;
    
    setError('');
    const result = await loginUser(emailInput, password);
    if (result.success) {
      if (result.role === 'admin') {
        router.push('/superadmin/dashboard');
      } else if (result.role === 'gym-owner') {
        router.push('/gym-owner/dashboard');
      } else {
        router.push('/user/dashboard');
      }
    } else {
      setError(result.message || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10">
        <Link href="/" className="inline-flex items-center gap-2 font-bold text-2xl text-brand-primary tracking-tight">
          <div className="p-2 bg-brand-primary rounded-xl text-white">
            <Dumbbell className="h-6 w-6" />
          </div>
          <span>FLEX<span className="text-zinc-950 dark:text-zinc-50 font-medium">PASS</span></span>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-zinc-900 dark:text-white">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-zinc-500">
          Or{' '}
          <Link href="/register" className="font-medium text-brand-primary hover:text-brand-secondary underline">
            start your 14-day free trial
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4">
        <div className="bg-white dark:bg-zinc-900 py-8 px-4 shadow-xl rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 sm:px-10 space-y-6">
          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs rounded-xl font-semibold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase">
                Name or Email
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Kumar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-brand-primary/50 text-zinc-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-brand-primary/50 text-zinc-900 dark:text-white"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-brand-primary hover:bg-brand-secondary text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <span>Sign In</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>

          <div className="flex flex-col gap-2.5 pt-4 border-t border-zinc-100 dark:border-zinc-850 text-center text-xs text-zinc-500">
            <span>Developer / Administrator Portals:</span>
            <div className="flex justify-center gap-4">
              <Link href="/admin" className="text-brand-primary hover:underline font-semibold">
                Partner Admin
              </Link>
              <span className="text-zinc-300">|</span>
              <Link href="/superadmin" className="text-brand-primary hover:underline font-semibold">
                Super Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
