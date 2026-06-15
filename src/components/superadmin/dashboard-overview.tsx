'use client';

import React, { useState } from 'react';
import { mockGyms, mockCheckins } from '@/lib/api';
import { AlertOctagon } from 'lucide-react';

export default function DashboardOverview() {
  const [gymList, setGymList] = useState(mockGyms);

  const handleApproveGym = (id: string, approve: boolean) => {
    setGymList(prev => prev.map(gym => gym.id === id ? { ...gym, is_approved: approve } : gym));
  };

  const fraudLogs = mockCheckins.filter(c => c.status === 'fraud');

  return (
    <div className="space-y-8">
      {/* Aggregated Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        {[
          { title: 'Total GMV', value: 'Rs 4,82,000', stat: '+14% vs last month' },
          { title: 'Active Subscriptions', value: '1,248 Users', stat: '30% breakage percentage' },
          { title: 'Active Partner Gyms', value: '78 Gyms', stat: '5 pending approvals' },
          { title: 'Fraud Alerts', value: `${fraudLogs.length} Triggered`, stat: 'p99 scanning speed: 120ms', danger: true },
        ].map((s, idx) => (
          <div key={idx} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl space-y-1 text-left shadow-xs">
            <span className="text-[10px] text-zinc-450 dark:text-zinc-550 uppercase block font-semibold">{s.title}</span>
            <span className={`text-2xl font-extrabold ${s.danger ? 'text-rose-500' : 'text-zinc-900 dark:text-white'}`}>{s.value}</span>
            <span className={`text-[10px] block ${s.danger ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>{s.stat}</span>
          </div>
        ))}
      </div>

      {/* Gym Approvals Queue & Fraud Monitor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs">
          <div className="p-5 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
            <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Partner Gym Approval Queue</h3>
            <span className="text-xs text-zinc-450 dark:text-zinc-550">Real-time status</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-zinc-50/50 dark:bg-zinc-950/50 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="p-4">Gym Name</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Tier Level</th>
                  <th className="p-4">Registration</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {gymList.map((gym) => (
                  <tr key={gym.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850/30">
                    <td className="p-4 font-bold text-zinc-900 dark:text-white">{gym.name}</td>
                    <td className="p-4 text-zinc-500 dark:text-zinc-400 text-xs">{gym.address.split(',')[1]}</td>
                    <td className="p-4 text-xs text-zinc-650 dark:text-zinc-400">Tier {gym.tier}</td>
                    <td className="p-4">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        gym.is_approved 
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                      }`}>
                        {gym.is_approved ? 'Approved' : 'Pending'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {gym.is_approved ? (
                        <button
                          onClick={() => handleApproveGym(gym.id, false)}
                          className="text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-500 font-bold text-[11px] px-2.5 py-1 rounded-lg border border-rose-200 dark:border-rose-900/30 hover:bg-rose-50 dark:hover:bg-rose-950/20 cursor-pointer"
                        >
                          Suspend
                        </button>
                      ) : (
                        <button
                          onClick={() => handleApproveGym(gym.id, true)}
                          className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-500 font-bold text-[11px] px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-900/30 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 cursor-pointer"
                        >
                          Approve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
            <AlertOctagon className="h-5 w-5 animate-pulse" />
            <span>Fraud Incident Monitor</span>
          </div>
          <p className="text-zinc-550 dark:text-zinc-450 text-xs text-left">Flagging duplicate scans or suspicious GPS coordinates checks.</p>

          <div className="space-y-3 pt-2">
            {fraudLogs.map((log) => (
              <div key={log.id} className="p-3 bg-rose-50/50 dark:bg-rose-950/10 border border-rose-105 dark:border-rose-900/20 rounded-xl space-y-1 text-left text-xs">
                <div className="flex justify-between items-center font-bold text-rose-600 dark:text-rose-400">
                  <span>DUPLICATE TOKEN SCAN</span>
                  <span>{log.time}</span>
                </div>
                <p className="text-zinc-700 dark:text-zinc-300">User <b>{log.userName}</b> attempted scan twice at {log.gymName}.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
