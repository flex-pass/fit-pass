'use client';

import React from 'react';
import { useAllTickets } from '@/lib/hooks';

export default function SupportPage() {
  const { tickets, loading } = useAllTickets();

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm text-left space-y-4">
      <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Customer Support Tickets</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-150 dark:border-zinc-800 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
              <th className="p-4">Date</th>
              <th className="p-4">User</th>
              <th className="p-4">Subject</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-150 dark:divide-zinc-800">
            {loading ? (
              <tr><td colSpan={5} className="p-4 text-zinc-500">Loading tickets...</td></tr>
            ) : tickets.length === 0 ? (
              <tr><td colSpan={5} className="p-4 text-zinc-500">No support tickets found.</td></tr>
            ) : tickets.map((t: any, idx: number) => (
              <tr key={idx}>
                <td className="p-4 text-zinc-500">{new Date(t.createdAt).toLocaleDateString()}</td>
                <td className="p-4 font-bold text-zinc-900 dark:text-zinc-100">{t.user?.name || 'Unknown'}</td>
                <td className="p-4 font-semibold text-zinc-700 dark:text-zinc-300">{t.subject}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    t.status === 'CLOSED' ? 'bg-zinc-500/10 text-zinc-600' : 'bg-rose-500/10 text-rose-600'
                  }`}>
                    {t.status}
                  </span>
                </td>
                <td className="p-4">
                  <button className="text-brand-primary hover:underline text-xs font-bold">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
