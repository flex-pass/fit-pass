'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { mockGyms, mockCheckins } from '@/lib/api';
import { ShieldCheck, BarChart3, AlertOctagon, CheckCircle2, XCircle } from 'lucide-react';

export default function AdminDashboard() {
  const { session, role, loginAs } = useAuth();
  
  // Track gym approval states in client sandbox
  const [gymList, setGymList] = useState(mockGyms);

  if (role !== 'admin' || !session) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-lg space-y-4">
        <h3 className="text-xl font-bold text-zinc-950 dark:text-white">Admin Portal Mock Sandbox</h3>
        <p className="text-zinc-500 text-xs">
          Please select the <b>Super Admin</b> role in the sandbox switcher to view this page.
        </p>
        <button
          onClick={() => loginAs('admin')}
          className="w-full py-3 bg-brand-warning hover:bg-amber-600 text-black font-bold rounded-xl transition-all cursor-pointer"
        >
          Login as Super Admin
        </button>
      </div>
    );
  }

  const handleApproveGym = (id: string, approve: boolean) => {
    setGymList(prev => prev.map(gym => gym.id === id ? { ...gym, is_approved: approve } : gym));
  };

  const fraudLogs = mockCheckins.filter(c => c.status === 'fraud');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title */}
      <div className="text-left space-y-1">
        <span className="text-[10px] font-bold text-amber-600 dark:text-amber-500 uppercase bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
          Super Admin Console
        </span>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white mt-2">
          Platform-Wide Stats & Audits
        </h1>
      </div>

      {/* Aggregate stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 p-5 rounded-2xl space-y-1">
          <span className="text-[10px] text-zinc-400 uppercase block font-semibold">Total GMV</span>
          <span className="text-2xl font-extrabold text-zinc-900 dark:text-white">Rs 4,82,000</span>
          <span className="text-[10px] text-emerald-500 block">+14% vs last month</span>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 p-5 rounded-2xl space-y-1">
          <span className="text-[10px] text-zinc-400 uppercase block font-semibold">Active Subscriptions</span>
          <span className="text-2xl font-extrabold text-brand-primary">1,248 Users</span>
          <span className="text-[10px] text-zinc-500 block">30% breakage percentage</span>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 p-5 rounded-2xl space-y-1">
          <span className="text-[10px] text-zinc-400 uppercase block font-semibold">Active partner Gyms</span>
          <span className="text-2xl font-extrabold text-zinc-900 dark:text-white">78 Gyms</span>
          <span className="text-[10px] text-zinc-500 block">5 pending approvals</span>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 p-5 rounded-2xl space-y-1">
          <span className="text-[10px] text-zinc-400 uppercase block font-semibold">Fraud Alerts</span>
          <span className="text-2xl font-extrabold text-rose-500">{fraudLogs.length} Triggered</span>
          <span className="text-[10px] text-zinc-500 block">p99 scanning speed: 120ms</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Gym management list approval */}
        <div className="lg:col-span-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-zinc-150 dark:border-zinc-800 flex justify-between items-center">
            <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Partner Gym Approval Queue</h3>
            <span className="text-xs text-zinc-500">Real-time status</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-150 dark:border-zinc-800 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="p-4">Gym Name</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Tier Level</th>
                  <th className="p-4">Registration</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-150 dark:divide-zinc-800">
                {gymList.map((gym) => (
                  <tr key={gym.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850/50">
                    <td className="p-4 font-bold text-zinc-900 dark:text-zinc-100">{gym.name}</td>
                    <td className="p-4 text-zinc-500">{gym.address.split(',')[1]}</td>
                    <td className="p-4">Tier {gym.tier}</td>
                    <td className="p-4">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        gym.is_approved 
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500' 
                          : 'bg-amber-500/10 text-amber-600 dark:text-amber-500'
                      }`}>
                        {gym.is_approved ? 'Approved' : 'Pending'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {gym.is_approved ? (
                        <button
                          onClick={() => handleApproveGym(gym.id, false)}
                          className="text-rose-500 hover:text-rose-650 font-bold text-xs px-2.5 py-1.5 rounded-lg border border-rose-200 dark:border-rose-900/20 hover:bg-rose-50 dark:hover:bg-rose-950/20 cursor-pointer"
                        >
                          Suspend
                        </button>
                      ) : (
                        <button
                          onClick={() => handleApproveGym(gym.id, true)}
                          className="text-emerald-600 hover:text-emerald-700 font-bold text-xs px-2.5 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-900/20 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 cursor-pointer"
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

        {/* Fraud monitor logs */}
        <div className="lg:col-span-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-rose-500 font-bold text-sm">
            <AlertOctagon className="h-5 w-5 animate-pulse" />
            <span>Fraud Incident Monitor</span>
          </div>
          <p className="text-zinc-500 text-xs">Flagging duplicate scans or suspicious GPS coordinates checks.</p>

          <div className="space-y-3 pt-2">
            {fraudLogs.map((log) => (
              <div key={log.id} className="p-3 bg-rose-500/15 border border-rose-500/20 rounded-xl space-y-1 text-left text-xs">
                <div className="flex justify-between items-center font-bold text-rose-600">
                  <span>DUPLICATE TOKEN SCAN</span>
                  <span>{log.time}</span>
                </div>
                <p className="text-zinc-700 dark:text-zinc-300">User <b>{log.userName}</b> attempted scan twice at {log.gymName}.</p>
                <p className="text-zinc-500 text-[10px]">Action required: review validation logs.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
