'use client';

import React from 'react';

export default function ConsoleNotifications() {
  const notifications = [
    { title: 'Server Audit Completed', desc: 'Platform daily server backup and logs rotation completed.', time: '1 hour ago' },
    { title: 'New Gym Partner Request', desc: 'Wave Gym Sector 18 Noida applied to register.', time: '3 hours ago' },
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xs text-left space-y-4">
      <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Console Notifications</h3>
      <div className="space-y-3">
        {notifications.map((n, idx) => (
          <div key={idx} className="p-3.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs space-y-1">
            <div className="flex justify-between items-center">
              <p className="font-bold text-zinc-900 dark:text-white">{n.title}</p>
              <span className="text-[10px] text-zinc-500">{n.time}</span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400">{n.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
