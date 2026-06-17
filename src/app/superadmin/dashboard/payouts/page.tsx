'use client';

import React from 'react';

export default function PayoutsPage() {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm text-left">
      <div className="p-6 border-b border-zinc-150 dark:border-zinc-800 flex justify-between items-center">
        <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Gym Owner Payouts</h3>
        <span className="text-xs text-zinc-550">Billed bi-weekly</span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-150 dark:border-zinc-800 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
              <th className="p-4">Partner Gym</th>
              <th className="p-4">Rating Score</th>
              <th className="p-4">Total Revenue</th>
              <th className="p-4">Settlement Payout</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-150 dark:divide-zinc-800">
            {[
              { name: "Gold's Gym (Sector 62)", revenue: 13500, payout: 9450, rating: 4.8, status: 'Settled' },
              { name: "FitLine Fitness (Sector 18)", revenue: 8400, payout: 5880, rating: 4.5, status: 'Pending' },
              { name: "The Iron Temple (Sector 76)", revenue: 3800, payout: 2660, rating: 4.2, status: 'Pending' },
            ].map((gym, idx) => (
              <tr key={idx}>
                <td className="p-4 font-bold text-zinc-900 dark:text-zinc-100">{gym.name}</td>
                <td className="p-4">{gym.rating} ★</td>
                <td className="p-4 font-semibold text-zinc-600 dark:text-zinc-400">Rs {gym.revenue}</td>
                <td className="p-4 font-extrabold text-brand-primary">Rs {gym.payout}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    gym.status === 'Settled' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'
                  }`}>
                    {gym.status}
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
