'use client';

import React from 'react';

export default function PaymentsAudits() {
  const payments = [
    { id: 'TXN-9492', user: 'Rahul Kumar', amount: '₹1,500', method: 'UPI', status: 'Success' },
    { id: 'TXN-1049', user: 'Priya Sharma', amount: '₹4,000', method: 'Card', status: 'Success' },
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xs text-left space-y-4">
      <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Payments Audits</h3>
      <div className="space-y-2">
        {payments.map((p, idx) => (
          <div key={idx} className="p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl flex justify-between items-center text-xs">
            <div>
              <p className="font-bold text-zinc-900 dark:text-white">{p.id} • {p.user}</p>
              <p className="text-zinc-550 dark:text-zinc-450 text-[10px] mt-0.5">Payment via: {p.method}</p>
            </div>
            <div className="text-right">
              <span className="font-bold text-zinc-900 dark:text-white block">{p.amount}</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block">{p.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
