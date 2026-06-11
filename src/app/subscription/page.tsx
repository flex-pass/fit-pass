'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { Award, ShieldAlert, Sparkles, Check, ArrowRight } from 'lucide-react';

export default function SubscriptionPage() {
  const { session, role, loginAs } = useAuth();
  const [subStatus, setSubStatus] = useState<'active' | 'cancelled'>('active');

  if (role !== 'user' || !session) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-lg space-y-4">
        <h3 className="text-xl font-bold text-zinc-950 dark:text-white">Subscription Portal Mock Sandbox</h3>
        <p className="text-zinc-500 text-xs">
          Please select the <b>User (Rahul K.)</b> role in the sandbox switcher to view this page.
        </p>
        <button
          onClick={() => loginAs('user')}
          className="w-full py-3 bg-brand-primary hover:bg-brand-secondary text-white font-bold rounded-xl transition-all cursor-pointer"
        >
          Login as Rahul K.
        </button>
      </div>
    );
  }

  const handleCancelSub = () => {
    if (confirm("Are you sure you want to cancel your subscription? Your remaining credits will be lost on the next billing date.")) {
      setSubStatus('cancelled');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div className="space-y-2 text-center sm:text-left">
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white">Subscription Management</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">View billing cycles, upgrade tiers, or edit subscription preferences.</p>
      </div>

      {/* Main card */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-100 dark:border-zinc-800/80 pb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 rounded-2xl">
              <Award className="h-8 w-8" />
            </div>
            <div className="text-left space-y-0.5">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Active Plan</span>
              <h3 className="text-xl font-extrabold text-zinc-950 dark:text-white">FlexPass {session.planType || 'Standard'}</h3>
              <p className="text-xs text-zinc-500">Next renewal: July 01, 2026 via Razorpay UPI</p>
            </div>
          </div>
          <span className={`px-3.5 py-1.5 rounded-full text-xs font-bold ${
            subStatus === 'active' 
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border border-emerald-500/20' 
              : 'bg-rose-500/10 text-rose-600 dark:text-rose-500 border border-rose-500/20'
          }`}>
            {subStatus === 'active' ? 'Active Auto-Pay' : 'Cancelled'}
          </span>
        </div>

        {/* plan features review */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <Check className="h-4.5 w-4.5 text-brand-primary" />
            <span>55 credits allocated every month</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4.5 w-4.5 text-brand-primary" />
            <span>Rollover allowance cap: 55 credits</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4.5 w-4.5 text-brand-primary" />
            <span>Access to Tier 1, 2, and 3 partner gyms</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4.5 w-4.5 text-brand-primary" />
            <span>Cancel/upgrade anytime</span>
          </div>
        </div>

        {/* Actions panel */}
        <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap gap-4">
          {subStatus === 'active' ? (
            <button
              onClick={handleCancelSub}
              className="px-5 py-3 border border-rose-500/20 text-rose-500 hover:bg-rose-500/5 font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Cancel Subscription
            </button>
          ) : (
            <button
              onClick={() => setSubStatus('active')}
              className="px-5 py-3 bg-brand-primary hover:bg-brand-secondary text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Reactivate Auto-Pay
            </button>
          )}

          <Link
            href="/pricing"
            className="px-5 py-3 bg-zinc-100 dark:bg-zinc-850 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5"
          >
            <span>Upgrade to Premium</span>
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          </Link>
        </div>
      </div>
    </div>
  );
}
