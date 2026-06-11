'use client';

import React from 'react';
import { Gym, isPeakHour } from '@/lib/api';
import { Zap, Moon } from 'lucide-react';

interface CreditBadgeProps {
  gym: Gym;
}

export default function CreditBadge({ gym }: CreditBadgeProps) {
  const peak = isPeakHour(gym);
  const cost = peak ? gym.peak_credit_cost : gym.offpeak_credit_cost;

  return (
    <div className="flex items-center gap-1.5 font-semibold text-sm">
      {peak ? (
        <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-600 dark:text-amber-500 px-2.5 py-1 rounded-full border border-amber-500/20">
          <Zap className="h-3.5 w-3.5 fill-amber-500" />
          <span>{cost} Credits (Peak)</span>
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 px-2.5 py-1 rounded-full border border-emerald-500/20">
          <Moon className="h-3.5 w-3.5 fill-emerald-500" />
          <span>{cost} Credits (Off-Peak)</span>
        </span>
      )}
    </div>
  );
}
