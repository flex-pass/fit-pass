'use client';

import React from 'react';
import { useAllNotifications } from '@/lib/hooks';

export default function NotificationsPage() {
  const { notifications, loading } = useAllNotifications();

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm text-left space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">System Notifications</h3>
        <button className="px-3 py-1.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold rounded-lg cursor-pointer">
          Send Global Alert
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-150 dark:border-zinc-800 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
              <th className="p-4">Date</th>
              <th className="p-4">Recipient</th>
              <th className="p-4">Title</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-150 dark:divide-zinc-800">
            {loading ? (
              <tr><td colSpan={4} className="p-4 text-zinc-500">Loading notifications...</td></tr>
            ) : notifications.length === 0 ? (
              <tr><td colSpan={4} className="p-4 text-zinc-500">No notifications found.</td></tr>
            ) : notifications.map((n: any, idx: number) => (
              <tr key={idx}>
                <td className="p-4 text-zinc-500">{new Date(n.createdAt).toLocaleString()}</td>
                <td className="p-4 font-bold text-zinc-900 dark:text-zinc-100">{n.user?.name || 'Unknown'}</td>
                <td className="p-4 font-semibold text-zinc-700 dark:text-zinc-300">{n.title}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    n.isRead ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'
                  }`}>
                    {n.isRead ? 'Read' : 'Unread'}
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
