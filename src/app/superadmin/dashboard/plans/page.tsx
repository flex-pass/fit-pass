'use client';

import React from 'react';
import { useAllPlans } from '@/lib/hooks';

export default function PlansPage() {
  const { plans, loading } = useAllPlans();

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm text-left space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Subscription Plan Editor</h3>
          <p className="text-xs text-zinc-500 mt-1">Configure pricing packages and credit quotas for end users.</p>
        </div>
        <button className="px-4 py-2 bg-brand-primary text-white text-xs font-bold rounded-xl cursor-pointer">
          + Create New Plan
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-zinc-500 text-sm">Loading plans...</p>
        ) : plans.length === 0 ? (
          <p className="text-zinc-500 text-sm">No plans configured yet. Create one.</p>
        ) : plans.map((plan: any) => (
          <div key={plan.id} className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-sm capitalize">{plan.name}</h4>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${plan.isActive ? 'text-emerald-600 bg-emerald-500/10' : 'text-zinc-600 bg-zinc-500/10'}`}>
                {plan.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-zinc-900 dark:text-white">₹{plan.price}</span>
              <span className="text-[10px] text-zinc-400 uppercase font-bold">/ month</span>
            </div>
            <div className="text-xs space-y-1.5 pt-2 border-t border-zinc-150 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
              <p>• {plan.credits} Monthly Credits</p>
              <p>• ₹{plan.costPerCredit} cost per credit</p>
              <p>• Max {plan.rollover} rollover limit</p>
            </div>
            <button className="w-full mt-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 cursor-pointer">
              Edit Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
