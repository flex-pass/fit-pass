'use client';

import React from 'react';
import { mockCheckins } from '@/lib/api';

export default function CheckinsStream() {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-xs text-left">
      <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
        <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Global Check-in Stream</h3>
      </div>
      <table className="w-full text-left border-collapse text-xs sm:text-sm">
        <thead>
          <tr className="bg-zinc-50/50 dark:bg-zinc-950/50 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
            <th className="p-4">Time</th>
            <th className="p-4">User</th>
            <th className="p-4">Gym Club</th>
            <th className="p-4">Credits</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {mockCheckins.map((c, idx) => (
            <tr key={idx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850/30">
              <td className="p-4 text-zinc-550 dark:text-zinc-450">{c.time}</td>
              <td className="p-4 font-bold text-zinc-900 dark:text-white">{c.userName}</td>
              <td className="p-4 text-zinc-600 dark:text-zinc-400">{c.gymName}</td>
              <td className="p-4 font-bold text-brand-primary">-{c.creditsUsed} Credits</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
