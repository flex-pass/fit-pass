'use client';

import React from 'react';
import { useAllRefunds } from '@/lib/hooks';

export default function RefundsPage() {
  const { refunds, loading } = useAllRefunds();

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm text-left space-y-4">
      <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Refunds & Reversals</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-150 dark:border-zinc-800 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
              <th className="p-4">Date</th>
              <th className="p-4">Transaction ID</th>
              <th className="p-4">Reason</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-150 dark:divide-zinc-800">
            {loading ? (
              <tr><td colSpan={5} className="p-4 text-zinc-500">Loading refunds...</td></tr>
            ) : refunds.length === 0 ? (
              <tr><td colSpan={5} className="p-4 text-zinc-500">No refunds found.</td></tr>
            ) : refunds.map((r: any, idx: number) => (
              <tr key={idx}>
                <td className="p-4 text-zinc-500">{new Date(r.createdAt).toLocaleDateString()}</td>
                <td className="p-4 font-mono text-[10px] text-zinc-500">{r.transactionId}</td>
                <td className="p-4 font-semibold text-zinc-700 dark:text-zinc-300">{r.reason}</td>
                <td className="p-4 font-bold text-rose-600">Rs {r.amount}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    r.status === 'PROCESSED' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'
                  }`}>
                    {r.status}
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
