'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { useAuth } from '@/lib/auth';
import { useGyms, useCheckins } from '@/lib/hooks';
import GymCard from '@/components/gym-card';
import { Wallet, Dumbbell, MapPin, History, RefreshCw, Star } from 'lucide-react';

export default function UserDashboard() {
  const { session, role, loginAs } = useAuth();

  // If user role is not selected, redirect to landing with a mock login trigger
  if (role !== 'user' || !session) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-lg space-y-4">
        <h3 className="text-xl font-bold text-zinc-950 dark:text-white">User Portal Mock Sandbox</h3>
        <p className="text-zinc-500 text-xs">
          Please select the <b>User (Rahul K.)</b> role in the sandbox switcher to view this page.
        </p>
        <button
          onClick={() => loginAs('user')}
          className="w-full py-3 bg-brand-primary hover:bg-brand-secondary text-white font-bold rounded-xl transition-all cursor-pointer"
        >
          Login as Rahul K.
        </button>
      </div>
    );
  }

  const { gyms, loading: gymsLoading } = useGyms(28.5355, 77.3910);
  const { checkins, loading: checkinsLoading } = useCheckins();

  // Display top 2 gyms nearby (first 2 approved gyms)
  const nearbyGyms = gyms.filter(g => !g.kill_switch).slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-brand-primary to-brand-secondary p-8 rounded-3xl text-white shadow-md">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold">Welcome back, {session.name}!</h1>
          <p className="text-white/80 text-xs sm:text-sm">Ready for today\'s workout in {session.city}?</p>
        </div>
        <Link
          href="/explore"
          className="px-5 py-3 bg-white text-brand-primary font-bold rounded-xl shadow hover:scale-105 transition-transform flex items-center gap-1.5 text-xs sm:text-sm"
        >
          <Dumbbell className="h-4 w-4" />
          <span>Explore Near Me</span>
        </Link>
      </div>

      {/* Grid of stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Wallet Balance */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 p-6 rounded-2xl flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-xs text-zinc-400 block uppercase">Wallet Balance</span>
            <span className="text-3xl font-extrabold text-brand-primary">{session.creditsBalance || 0} Credits</span>
            <span className="text-[10px] text-zinc-500 block">Plan: {session.planType || 'basic'} Tier</span>
          </div>
          <Link href="/wallet" className="p-3 bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary rounded-xl">
            <Wallet className="h-6 w-6" />
          </Link>
        </div>

        {/* Check-ins Completed */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 p-6 rounded-2xl flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-xs text-zinc-400 block uppercase">Gyms Visited</span>
            <span className="text-3xl font-extrabold text-zinc-900 dark:text-white">12 Visits</span>
            <span className="text-[10px] text-zinc-500 block">This month: 4 check-ins</span>
          </div>
          <div className="p-3 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500 rounded-xl">
            <History className="h-6 w-6" />
          </div>
        </div>

        {/* Rollover Potential */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 p-6 rounded-2xl flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-xs text-zinc-400 block uppercase">Rollover Reserved</span>
            <span className="text-3xl font-extrabold text-amber-500">55 Credits</span>
            <span className="text-[10px] text-zinc-500 block">Resets on 1st of month</span>
          </div>
          <div className="p-3 bg-amber-500/10 dark:bg-amber-500/20 text-amber-500 rounded-xl">
            <RefreshCw className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Nearby gyms list */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-xl text-zinc-900 dark:text-white">Nearby Recommended Gyms</h3>
            <Link href="/explore" className="text-xs font-semibold text-brand-primary hover:underline">
              View Map
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {nearbyGyms.map((gym) => (
              <GymCard key={gym.id} gym={gym} />
            ))}
          </div>
        </div>

        {/* Recent visits */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="font-extrabold text-xl text-zinc-900 dark:text-white">Recent Check-in Logs</h3>
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm divide-y divide-zinc-150 dark:divide-zinc-800">
            {checkinsLoading ? (
               <div className="p-4 text-sm text-zinc-500">Loading logs...</div>
            ) : checkins.slice(0, 3).map((item) => (
              <div key={item.id} className="p-4 flex justify-between items-center text-xs">
                <div className="space-y-1 text-left">
                  <p className="font-bold text-zinc-900 dark:text-zinc-100">{item.gymName}</p>
                  <p className="text-zinc-500 flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>Noida Sector • {item.time}</span>
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <span className="font-bold text-brand-primary block">-{item.creditsUsed} Credits</span>
                  <span className="inline-flex px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 font-semibold text-[10px]">
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
