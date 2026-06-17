'use client';

import React from 'react';
import { useAllCheckins } from '@/lib/hooks';

export default function CheckinsPage() {
  const { checkins, loading } = useAllCheckins();

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm text-left space-y-4">
      <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Global Check-in Ledger</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-150 dark:border-zinc-800 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
              <th className="p-4">Date</th>
              <th className="p-4">User</th>
              <th className="p-4">Gym</th>
              <th className="p-4">Credits Used</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-150 dark:divide-zinc-800">
            {loading ? (
              <tr><td colSpan={5} className="p-4 text-zinc-500">Loading check-ins...</td></tr>
            ) : checkins.length === 0 ? (
              <tr><td colSpan={5} className="p-4 text-zinc-500">No check-ins found.</td></tr>
            ) : checkins.map((c: any, idx: number) => (
              <tr key={idx}>
                <td className="p-4 text-zinc-500">{new Date(c.checkedInAt).toLocaleString()}</td>
                <td className="p-4 font-bold text-zinc-900 dark:text-zinc-100">{c.user?.name || 'Unknown'}</td>
                <td className="p-4 font-bold text-zinc-900 dark:text-zinc-100">{c.gym?.name || 'Unknown'}</td>
                <td className="p-4 font-bold text-brand-primary">{c.creditsUsed}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${c.status === 'SUCCESS' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'}`}>
                    {c.status}
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
