'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { Wallet, Plus, CreditCard, RefreshCw, CheckCircle, ArrowDown } from 'lucide-react';

export default function WalletPage() {
  const { session, role, loginAs, updateCredits } = useAuth();
  const [loadingPack, setLoadingPack] = useState<string | null>(null);

  if (role !== 'user' || !session) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-lg space-y-4">
        <h3 className="text-xl font-bold text-zinc-950 dark:text-white">Wallet Portal Mock Sandbox</h3>
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

  const topupPacks = [
    { id: 't1', name: '10 credits', price: 600, rate: 60, credits: 10 },
    { id: 't2', name: '25 credits', price: 1375, rate: 55, credits: 25 },
    { id: 't3', name: '50 credits', price: 2500, rate: 50, credits: 50 },
  ];

  const handleTopup = (pack: typeof topupPacks[0]) => {
    setLoadingPack(pack.id);
    setTimeout(() => {
      updateCredits(pack.credits);
      setLoadingPack(null);
      alert(`Razorpay Payment Simulated Successfully!\nCredited +${pack.credits} credits to your account.`);
    }, 1500);
  };

  const transactions = [
    { desc: 'Top-up Credits Package (25 cr)', date: 'June 10, 2026', amount: '+25 cr', type: 'add' },
    { desc: 'Check-in: Gold\'s Gym Sector 62', date: 'June 09, 2026', amount: '-4 cr', type: 'use' },
    { desc: 'Check-in: FitLine Fitness Sector 18', date: 'June 05, 2026', amount: '-4 cr', type: 'use' },
    { desc: 'Monthly Subscription Renewal (+55 cr)', date: 'June 01, 2026', amount: '+55 cr', type: 'add' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Welcome Banner */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-3xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary rounded-2xl">
            <Wallet className="h-10 w-10" />
          </div>
          <div className="space-y-1 text-left">
            <span className="text-xs text-zinc-400 block uppercase font-semibold">Current Available Balance</span>
            <h1 className="text-3xl font-extrabold text-zinc-950 dark:text-white">{session.creditsBalance || 0} Credits</h1>
            <p className="text-xs text-zinc-500">Auto-rollover maximum cap: 55 credits</p>
          </div>
        </div>
      </div>

      {/* Top-up Selection grids */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-xl text-zinc-900 dark:text-white">Quick Top-up Credits Packs</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topupPacks.map((pack) => (
            <div key={pack.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl flex flex-col justify-between shadow-sm relative overflow-hidden group">
              <div className="space-y-2 text-left">
                <span className="text-xs font-semibold text-zinc-400 block uppercase">Topup pack</span>
                <h4 className="font-extrabold text-xl text-zinc-950 dark:text-white">{pack.name}</h4>
                <div className="flex items-baseline gap-1 pt-1">
                  <span className="text-2xl font-extrabold text-brand-primary">Rs {pack.price}</span>
                  <span className="text-xs text-zinc-500">(Rs {pack.rate}/credit)</span>
                </div>
              </div>

              <button
                disabled={loadingPack !== null}
                onClick={() => handleTopup(pack)}
                className="w-full mt-6 py-3 bg-zinc-950 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
              >
                {loadingPack === pack.id ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                <span>Buy with Razorpay</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction Log */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-xl text-zinc-900 dark:text-white">Wallet Transaction Ledger</h3>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm divide-y divide-zinc-150 dark:divide-zinc-800">
          {transactions.map((t, idx) => (
            <div key={idx} className="p-4 sm:p-5 flex justify-between items-center text-xs sm:text-sm">
              <div className="space-y-1 text-left">
                <p className="font-bold text-zinc-900 dark:text-zinc-100">{t.desc}</p>
                <p className="text-zinc-500 text-xs">{t.date}</p>
              </div>
              <div className="text-right">
                <span className={`font-bold block text-sm ${t.type === 'add' ? 'text-emerald-500' : 'text-zinc-500'}`}>
                  {t.amount}
                </span>
                <span className="text-[10px] text-zinc-400 font-semibold uppercase">Completed</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
