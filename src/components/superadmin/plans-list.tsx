'use client';

import React from 'react';
import { creditPlans } from '@/lib/api';

export default function PlansList() {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xs text-left space-y-4">
      <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Membership Plans</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {creditPlans.map((plan) => (
          <div key={plan.id} className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl space-y-3">
            <h4 className="font-bold text-sm capitalize text-zinc-900 dark:text-white">{plan.name}</h4>
            <p className="text-2xl font-extrabold text-brand-primary">₹{plan.price} <span className="text-xs text-zinc-500">/mo</span></p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">• {plan.credits} Credits included</p>
          </div>
        ))}
      </div>
    </div>
  );
}
