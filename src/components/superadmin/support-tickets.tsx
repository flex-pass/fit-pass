'use client';

import React from 'react';

export default function SupportTickets() {
  const tickets = [
    { name: 'Rahul Kumar', issue: 'QR Scan check-in error Sec 62', status: 'Open' },
    { name: 'Amit Verma', issue: 'Credits billing double charge', status: 'Closed' },
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xs text-left space-y-4">
      <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Customer Support Tickets</h3>
      <div className="space-y-2">
        {tickets.map((ticket, idx) => (
          <div key={idx} className="p-3.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl flex justify-between items-center text-xs">
            <div>
              <p className="font-bold text-zinc-900 dark:text-white">{ticket.issue}</p>
              <p className="text-zinc-550 dark:text-zinc-450 text-[10px] mt-0.5">From: {ticket.name}</p>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              ticket.status === 'Open' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' : 'bg-zinc-205 dark:bg-zinc-800 text-zinc-500'
            }`}>
              {ticket.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
