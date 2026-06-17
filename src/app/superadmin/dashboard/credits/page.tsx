'use client';

import React from 'react';
import { useTransactions } from '@/lib/hooks';

export default function CreditsTransactionsPage() {
  const { transactions, loading: txLoading } = useTransactions();

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm text-left space-y-4">
      <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Global Transaction Ledger</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-150 dark:border-zinc-800 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
              <th className="p-4">Date</th>
              <th className="p-4">User</th>
              <th className="p-4">Type</th>
              <th className="p-4">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-150 dark:divide-zinc-800">
            {txLoading ? (
              <tr><td colSpan={4} className="p-4 text-zinc-500">Loading transactions...</td></tr>
            ) : transactions.length === 0 ? (
              <tr><td colSpan={4} className="p-4 text-zinc-500">No transactions yet.</td></tr>
            ) : transactions.map((t: any, idx: number) => (
              <tr key={idx}>
                <td className="p-4 text-zinc-500">{new Date(t.createdAt).toLocaleDateString()}</td>
                <td className="p-4 font-bold text-zinc-900 dark:text-zinc-100">{t.user?.name || 'Unknown'}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                    {t.type}
                  </span>
                </td>
                <td className={`p-4 font-bold ${t.amount > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {t.amount > 0 ? '+' : ''}{t.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
