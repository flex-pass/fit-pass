'use client';

import React from 'react';

export default function PayoutsSettlements() {
  const payouts = [
    { gym: "Gold's Gym Sec 62", amount: 'Rs 9,450', status: 'Settled' },
    { gym: 'FitLine Studio', amount: 'Rs 5,880', status: 'Pending' },
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xs text-left space-y-4">
      <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Settled partner Payouts</h3>
      <div className="space-y-3">
        {payouts.map((p, idx) => (
          <div key={idx} className="p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl flex justify-between items-center text-xs">
            <div>
              <p className="font-bold text-zinc-900 dark:text-white">{p.gym}</p>
              <p className="text-zinc-550 dark:text-zinc-450 text-[10px] mt-0.5">Bi-weekly settlement cycle</p>
            </div>
            <div className="text-right">
              <span className="font-bold text-brand-primary block">{p.amount}</span>
              <span className={`text-[10px] block ${p.status === 'Settled' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-650 dark:text-amber-400'}`}>
                {p.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
