'use client';

import React from 'react';
import { usePendingGyms } from '@/lib/hooks';

export default function GymsList() {
  const { gyms: gymList, loading } = usePendingGyms();
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xs text-left space-y-4">
      <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Gym Network Outlets</h3>
      <div className="overflow-x-auto mt-4">
        {loading ? (
          <div className="p-4 text-center text-zinc-500 text-sm">Loading pending gyms...</div>
        ) : (
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-500">
                <th className="p-3 font-medium">Gym Name</th>
                <th className="p-3 font-medium">Location</th>
                <th className="p-3 font-medium">Tier</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {gymList.map((gym) => (
                <tr key={gym.id} className="border-b border-zinc-100 dark:border-zinc-800">
                  <td className="p-3 font-bold text-zinc-900 dark:text-white">{gym.name}</td>
                  <td className="p-3 text-zinc-500">{gym.address}</td>
                  <td className="p-3 text-brand-primary font-bold">Tier {gym.tier}</td>
                  <td className="p-3 text-zinc-500 capitalize">{gym.is_approved ? 'Approved' : 'Pending'}</td>
                  <td className="p-3 text-right">
                    <button className="text-brand-primary font-bold hover:underline">Review</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
