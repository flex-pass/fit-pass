'use client';

import React from 'react';

export default function SystemLogs() {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xs text-left space-y-4">
      <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">System Audit logs</h3>
      <div className="bg-zinc-955 border border-zinc-800 rounded-xl p-4 font-mono text-[10px] text-emerald-400 space-y-1">
        <p>[10:45:12] AUTH: Rahul Kumar logged in successfully from Noida.</p>
        <p>[11:02:45] API: Gold's Gym Sec 62 check-in pass validation completed in 140ms.</p>
        <p>[11:15:30] SYS: Payout Settlement calculated for Noida Partner Network.</p>
        <p>[11:18:24] AUTH: Super Admin console logs session init.</p>
      </div>
    </div>
  );
}
