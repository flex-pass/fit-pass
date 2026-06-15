'use client';

import React from 'react';
import { mockGyms } from '@/lib/api';

export default function GymsList() {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xs text-left space-y-4">
      <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Gym Network Outlets</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {mockGyms.map((gym) => (
          <div key={gym.id} className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl flex justify-between items-center text-xs">
            <div>
              <p className="font-bold text-zinc-900 dark:text-white">{gym.name}</p>
              <p className="text-zinc-500 dark:text-zinc-400 mt-1">{gym.address}</p>
            </div>
            <span className="text-brand-primary font-bold shrink-0">Tier {gym.tier}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
