'use client';

import React from 'react';

export default function RefundsProcessed() {
  const refunds = [
    { name: 'Amit Verma', reason: 'Gym closed for maintenance', amount: '₹500', status: 'Refunded' },
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xs text-left space-y-4">
      <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Processed Refunds</h3>
      <div className="space-y-2">
        {refunds.map((r, idx) => (
          <div key={idx} className="p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl flex justify-between items-center text-xs">
            <div>
              <p className="font-bold text-zinc-900 dark:text-white">{r.name}</p>
              <p className="text-zinc-550 dark:text-zinc-450 text-[10px] mt-0.5">Reason: {r.reason}</p>
            </div>
            <div className="text-right">
              <span className="font-bold text-zinc-900 dark:text-white block">{r.amount}</span>
              <span className="text-[10px] text-emerald-655 dark:text-emerald-400 block">{r.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
