'use client';

import React from 'react';
import { useAdmins } from '@/lib/hooks';

export default function OwnersPage() {
  const { admins, loading: adminsLoading } = useAdmins();

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm text-left space-y-4">
      <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Partner Gym Owners (Admins)</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-150 dark:border-zinc-800 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-150 dark:divide-zinc-800">
            {adminsLoading ? (
              <tr><td colSpan={4} className="p-4 text-zinc-500">Loading admins...</td></tr>
            ) : admins.length === 0 ? (
              <tr><td colSpan={4} className="p-4 text-zinc-500">No admins found.</td></tr>
            ) : admins.map((a: any, idx: number) => (
              <tr key={idx}>
                <td className="p-4 font-bold text-zinc-900 dark:text-zinc-100">{a.name}</td>
                <td className="p-4 text-zinc-500">{a.email}</td>
                <td className="p-4 text-zinc-500">{a.phoneNumber || 'N/A'}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${a.isActive ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'}`}>
                    {a.isActive ? 'Active' : 'Inactive'}
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
