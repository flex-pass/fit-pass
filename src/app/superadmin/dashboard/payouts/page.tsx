'use client';

import React from 'react';
import { useAllPayouts } from '@/lib/hooks';

export default function PayoutsPage() {
  const { payouts, loading } = useAllPayouts();

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm text-left">
      <div className="p-6 border-b border-zinc-150 dark:border-zinc-800 flex justify-between items-center">
        <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Gym Owner Payouts</h3>
        <span className="text-xs text-zinc-550">Billed bi-weekly</span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-150 dark:border-zinc-800 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
              <th className="p-4">Partner Gym</th>
              <th className="p-4">Period</th>
              <th className="p-4">Total Revenue</th>
              <th className="p-4">Settlement Payout</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-150 dark:divide-zinc-800">
            {loading ? (
              <tr><td colSpan={5} className="p-4 text-zinc-500">Loading payouts...</td></tr>
            ) : payouts.length === 0 ? (
              <tr><td colSpan={5} className="p-4 text-zinc-500">No payouts found.</td></tr>
            ) : payouts.map((p: any, idx: number) => (
              <tr key={idx}>
                <td className="p-4 font-bold text-zinc-900 dark:text-zinc-100">{p.gym?.name || 'Unknown'}</td>
                <td className="p-4 text-zinc-500">{new Date(p.periodStart).toLocaleDateString()} - {new Date(p.periodEnd).toLocaleDateString()}</td>
                <td className="p-4 font-semibold text-zinc-600 dark:text-zinc-400">Rs {p.amountOwed}</td>
                <td className="p-4 font-extrabold text-brand-primary">Rs {p.amountPaid || 0}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    p.status === 'PAID' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'
                  }`}>
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
