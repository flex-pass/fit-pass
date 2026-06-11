'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Gym, getCurrentCreditCost } from '@/lib/api';
import CreditBadge from './credit-badge';
import { Star, MapPin, Dumbbell, ShieldAlert } from 'lucide-react';

interface GymCardProps {
  gym: Gym;
  showBookBtn?: boolean;
}

export default function GymCard({ gym, showBookBtn = true }: GymCardProps) {
  const currentCost = getCurrentCreditCost(gym);

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:shadow-lg hover:border-brand-primary/50 group flex flex-col h-full">
      {/* Gym Photo */}
      <div className="relative h-48 w-full bg-zinc-100 overflow-hidden">
        {gym.kill_switch && (
          <div className="absolute inset-0 bg-black/60 z-10 flex flex-col items-center justify-center text-center p-4">
            <ShieldAlert className="h-8 w-8 text-amber-500 mb-2 animate-bounce" />
            <p className="text-white font-bold text-sm">Aggregator Traffic Suspended</p>
            <p className="text-zinc-300 text-xs mt-1">Gym owner paused FlexPass bookings</p>
          </div>
        )}
        <img
          src={gym.image}
          alt={gym.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-sm">
          <Star className="h-3 w-3 fill-amber-500 stroke-amber-500" />
          <span>{gym.rating}</span>
        </div>
        <div className="absolute bottom-3 right-3">
          <CreditBadge gym={gym} />
        </div>
      </div>

      {/* Gym Info */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 group-hover:text-brand-primary transition-colors">
              {gym.name}
            </h3>
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 whitespace-nowrap bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
              Tier {gym.tier}
            </span>
          </div>

          <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1 mt-1.5">
            <MapPin className="h-3 w-3 text-zinc-400 shrink-0" />
            <span className="line-clamp-1">{gym.address}</span>
          </p>

          {/* Amenities badges */}
          <div className="flex flex-wrap gap-1 mt-4">
            {gym.amenities.map(a => (
              <span key={a} className="text-[10px] uppercase font-semibold tracking-wider bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-300 px-2 py-0.5 rounded-md">
                {a}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        {showBookBtn && (
          <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-4">
            <div className="text-xs">
              <span className="text-zinc-400 block">Distance</span>
              <span className="font-bold text-zinc-800 dark:text-zinc-200">{gym.distance}</span>
            </div>
            
            <Link
              href={gym.kill_switch ? '#' : `/gyms/${gym.id}`}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all text-center flex items-center gap-1 ${
                gym.kill_switch
                  ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'
                  : 'bg-brand-primary text-white hover:bg-brand-secondary'
              }`}
            >
              <Dumbbell className="h-3.5 w-3.5" />
              <span>Details & Book</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
