'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { mockCheckins } from '@/lib/api';
import { ToggleLeft, ToggleRight, Dumbbell, ShieldAlert, Award, Calendar, CircleDollarSign } from 'lucide-react';

export default function GymOwnerDashboard() {
  const { session, role, loginAs } = useAuth();
  const [killSwitch, setKillSwitch] = useState(false);

  if (role !== 'gym-owner' || !session) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-lg space-y-4">
        <h3 className="text-xl font-bold text-zinc-950 dark:text-white">Owner Portal Mock Sandbox</h3>
        <p className="text-zinc-500 text-xs">
          Please select the <b>Gym Owner</b> role in the sandbox switcher to view this page.
        </p>
        <button
          onClick={() => loginAs('gym-owner')}
          className="w-full py-3 bg-brand-accent hover:bg-emerald-600 text-white font-bold rounded-xl transition-all cursor-pointer"
        >
          Login as Gym Owner
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-left">
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-500 uppercase bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            Gym Partner Panel
          </span>
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white mt-2">
            {session.name}
          </h1>
        </div>

        {/* Prominent Kill Switch */}
        <div className={`p-4 rounded-2xl border flex items-center justify-between gap-6 shadow-sm transition-colors ${
          killSwitch 
            ? 'bg-rose-500/10 border-rose-500/20' 
            : 'bg-emerald-500/10 border-emerald-500/20'
        }`}>
          <div className="text-left">
            <span className="text-[9px] text-zinc-400 uppercase tracking-wider block font-bold">Aggregator Traffic</span>
            <span className={`text-sm font-extrabold ${killSwitch ? 'text-rose-600' : 'text-emerald-600'}`}>
              {killSwitch ? 'TRAFFIC SUSPENDED' : 'TRAFFIC ACTIVE'}
            </span>
          </div>
          <button
            onClick={() => setKillSwitch(!killSwitch)}
            className="focus:outline-none transition-transform hover:scale-105 cursor-pointer"
            title="Toggle Aggregator Traffic"
          >
            {killSwitch ? (
              <ToggleLeft className="h-12 w-12 text-rose-500" />
            ) : (
              <ToggleRight className="h-12 w-12 text-emerald-500" />
            )}
          </button>
        </div>
      </div>

      {killSwitch && (
        <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-2xl flex items-center gap-3 text-xs text-rose-700 dark:text-rose-500">
          <ShieldAlert className="h-5 w-5 shrink-0 animate-bounce" />
          <div>
            <p className="font-bold">Aggregator Traffic - OFF</p>
            <p>FlexPass check-ins are suspended for your gym. Users will see your portal as offline and won\'t be able to book slot credits.</p>
          </div>
        </div>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 p-5 rounded-2xl space-y-1">
          <span className="text-[10px] text-zinc-400 uppercase block font-semibold">Today Check-ins</span>
          <span className="text-2xl font-extrabold text-zinc-900 dark:text-white">3 Visits</span>
          <span className="text-[10px] text-emerald-500 block">100% success rate</span>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 p-5 rounded-2xl space-y-1">
          <span className="text-[10px] text-zinc-400 uppercase block font-semibold">Today Earnings</span>
          <span className="text-2xl font-extrabold text-brand-accent">Rs 300</span>
          <span className="text-[10px] text-zinc-500 block">Computed per-credit</span>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 p-5 rounded-2xl space-y-1">
          <span className="text-[10px] text-zinc-400 uppercase block font-semibold">This Month Earnings</span>
          <span className="text-2xl font-extrabold text-zinc-900 dark:text-white">Rs 8,240</span>
          <span className="text-[10px] text-zinc-500 block">Resetting in 19 days</span>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 p-5 rounded-2xl space-y-1">
          <span className="text-[10px] text-zinc-400 uppercase block font-semibold">Pending Payout</span>
          <span className="text-2xl font-extrabold text-amber-500">Rs 4,120</span>
          <span className="text-[10px] text-zinc-500 block">Bi-weekly billing cycle</span>
        </div>
      </div>

      {/* Recent visits table */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-zinc-150 dark:border-zinc-800 flex justify-between items-center">
          <h3 className="font-extrabold text-lg text-zinc-900 dark:text-white">Today\'s Check-ins Feed</h3>
          <span className="text-xs text-zinc-500">Real-time update</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-150 dark:border-zinc-800 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4">Time</th>
                <th className="p-4">User Name</th>
                <th className="p-4">Credits Used</th>
                <th className="p-4">You Earned</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-150 dark:divide-zinc-800">
              {mockCheckins.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/10">
                  <td className="p-4 font-semibold text-zinc-500">{item.time}</td>
                  <td className="p-4 font-bold text-zinc-900 dark:text-zinc-100">{item.userName}</td>
                  <td className="p-4 text-brand-accent font-semibold">{item.creditsUsed} Credits</td>
                  <td className="p-4 font-bold">Rs {item.earnings}</td>
                  <td className="p-4">
                    <span className={`inline-flex px-2 py-0.5 rounded-full font-bold text-[10px] ${
                      item.status === 'success' 
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500' 
                        : 'bg-rose-500/10 text-rose-600 dark:text-rose-500'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
