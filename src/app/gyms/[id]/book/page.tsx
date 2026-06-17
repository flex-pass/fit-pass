'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCurrentCreditCost, isPeakHour } from '@/lib/api';
import { useGym } from '@/lib/hooks';
import { ShieldCheck, Dumbbell, ArrowLeft, Zap, Info } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function BookingPage({ params }: PageProps) {
  const unwrappedParams = use(params) as { id: string };
  const id = unwrappedParams.id;
  
  const { gym, loading } = useGym(id);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        Loading...
      </div>
    );
  }

  if (!gym) {
    notFound();
  }

  const cost = getCurrentCreditCost(gym);
  const peak = isPeakHour(gym);

  // Secure token generation placeholder for frontend routing
  const mockSecureToken = 'fp_tok_' + Math.random().toString(36).substr(2, 9);

  return (
    <div className="max-w-md mx-auto my-12 px-4 sm:px-6">
      {/* Back button */}
      <Link
        href={`/gyms/${gym.id}`}
        className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-100 mb-6 group"
      >
        <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
        <span>Cancel & Back</span>
      </Link>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xl space-y-6">
        <div className="text-center space-y-1">
          <Dumbbell className="h-8 w-8 text-brand-primary mx-auto animate-bounce" />
          <h2 className="font-extrabold text-xl text-zinc-950 dark:text-white">Confirm Booking</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Check-in at {gym.name}
          </p>
        </div>

        {/* Dynamic Credit Breakdown */}
        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-850 space-y-4">
          <div className="flex justify-between items-center text-xs text-zinc-500 pb-2 border-b border-zinc-200/50 dark:border-zinc-800/80">
            <span>Peak Hour Check</span>
            <span className="font-bold text-zinc-850 dark:text-zinc-200">
              {peak ? 'PEAK RATE (06:00-09:00 / 18:00-21:00)' : 'OFF-PEAK RATE'}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs text-zinc-500 pb-2 border-b border-zinc-200/50 dark:border-zinc-800/80">
            <span>Check-in Cost</span>
            <span className="font-extrabold text-brand-primary text-sm">{cost} Credits</span>
          </div>

          <div className="flex justify-between items-center text-xs text-zinc-500">
            <span>Your Credit Balance</span>
            <span className="font-bold text-zinc-850 dark:text-zinc-200">42 Credits</span>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-xs text-zinc-500 leading-relaxed bg-brand-primary/5 dark:bg-brand-primary/10 p-3.5 rounded-xl border border-brand-primary/10 space-y-2">
          <p className="font-bold text-brand-primary flex items-center gap-1">
            <Info className="h-3.5 w-3.5" />
            <span>Important Check-in Policy</span>
          </p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Secure QR code generated is valid for 15 seconds.</li>
            <li>Credits are deducted only upon successful counter scan.</li>
            <li>Limit 1 check-in per partner gym per calendar day.</li>
          </ul>
        </div>

        {/* Generate QR Button */}
        <Link
          href={`/checkin/${mockSecureToken}?gymName=${encodeURIComponent(gym.name)}&cost=${cost}`}
          className="w-full py-4 bg-brand-primary hover:bg-brand-secondary text-white font-bold rounded-xl text-center shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <ShieldCheck className="h-4.5 w-4.5" />
          <span>Generate Secure QR</span>
        </Link>
      </div>
    </div>
  );
}
