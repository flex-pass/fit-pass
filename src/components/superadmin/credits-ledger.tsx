'use client';

import React from 'react';

export default function CreditsLedger() {
  const transactions = [
    { desc: 'Booster Pack top-up', user: 'Rahul Kumar', amount: '₹500', time: '10:14 AM' },
    { desc: 'Monthly Standard Subscription', user: 'Priya Sharma', amount: '₹2,500', time: 'Yesterday' },
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xs text-left space-y-4">
      <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Credits & Transactions Ledger</h3>
      <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
        {transactions.map((tx, idx) => (
          <div key={idx} className="py-3.5 flex justify-between items-center text-xs">
            <div>
              <p className="font-bold text-zinc-900 dark:text-white">{tx.desc}</p>
              <p className="text-zinc-550 dark:text-zinc-400 mt-0.5">By: {tx.user} • {tx.time}</p>
            </div>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">{tx.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
