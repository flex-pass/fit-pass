'use client';

import React from 'react';
import { useAllGyms } from '@/lib/hooks';

export default function GymsPage() {
  const { gyms, loading } = useAllGyms();

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm text-left space-y-4">
      <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">All Registered Gyms</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-150 dark:border-zinc-800 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
              <th className="p-4">Name</th>
              <th className="p-4">Owner</th>
              <th className="p-4">Tier</th>
              <th className="p-4">Credits (Peak)</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-150 dark:divide-zinc-800">
            {loading ? (
              <tr><td colSpan={5} className="p-4 text-zinc-500">Loading gyms...</td></tr>
            ) : gyms.length === 0 ? (
              <tr><td colSpan={5} className="p-4 text-zinc-500">No gyms found.</td></tr>
            ) : gyms.map((g: any, idx: number) => (
              <tr key={idx}>
                <td className="p-4 font-bold text-zinc-900 dark:text-zinc-100">{g.name}</td>
                <td className="p-4 text-zinc-500">{g.owner?.name || 'Unknown'}</td>
                <td className="p-4">Tier {g.tier}</td>
                <td className="p-4 font-bold text-brand-primary">{g.peakCreditCost}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${g.isApproved ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}`}>
                    {g.isApproved ? 'Approved' : 'Pending'}
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
