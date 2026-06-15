'use client';

import React from 'react';

export default function SystemReports() {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xs text-left space-y-4">
      <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">System Reports</h3>
      <p className="text-xs text-zinc-500">Platform performance charts, scan breakdowns, and subscription statistics.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-2">
          <h4 className="font-bold text-xs text-zinc-900 dark:text-white">Weekly Scan Trends</h4>
          <p className="text-2xl font-extrabold text-brand-primary">142 Scans</p>
          <p className="text-[10px] text-zinc-500">+12% growth since last week</p>
        </div>
        <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-2">
          <h4 className="font-bold text-xs text-zinc-900 dark:text-white">Net Subscription Conversion</h4>
          <p className="text-2xl font-extrabold text-zinc-900 dark:text-white">78%</p>
          <p className="text-[10px] text-zinc-500">Trial to paid migration rate</p>
        </div>
      </div>
    </div>
  );
}
