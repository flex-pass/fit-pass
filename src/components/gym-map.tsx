'use client';

import React, { useState } from 'react';
import { Gym, isPeakHour } from '@/lib/api';
import { MapPin, Compass, AlertCircle } from 'lucide-react';

interface GymMapProps {
  gyms: Gym[];
  activeGymId?: string;
  onSelectGym?: (gymId: string) => void;
}

export default function GymMap({ gyms, activeGymId, onSelectGym }: GymMapProps) {
  const [hoveredGymId, setHoveredGymId] = useState<string | null>(null);

  // Map limits: Noida Sector 62 area simulation
  // Map dimensions relative coordinate grids
  const getPinColor = (gym: Gym) => {
    if (gym.kill_switch) return 'bg-zinc-400 dark:bg-zinc-600 border-zinc-300';
    return isPeakHour(gym)
      ? 'bg-amber-500 border-amber-300 animate-pulse'
      : 'bg-emerald-500 border-emerald-300';
  };

  return (
    <div className="relative w-full h-full min-h-[350px] bg-zinc-100 dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-inner flex flex-col justify-between p-4">
      {/* Grid line background overlay to make it look like a map */}
      <div 
        className="absolute inset-0 opacity-15 dark:opacity-10 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(circle, #1A6B8A 1px, transparent 1px), linear-gradient(to right, #1A6B8A 1px, transparent 1px), linear-gradient(to bottom, #1A6B8A 1px, transparent 1px)',
          backgroundSize: '12px 12px, 48px 48px, 48px 48px'
        }}
      />

      {/* Map Control Info Overlay */}
      <div className="relative z-10 bg-white/90 dark:bg-zinc-950/90 backdrop-blur border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl shadow-md max-w-xs self-start text-xs space-y-2">
        <p className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <Compass className="h-4 w-4 text-brand-primary" />
          <span>Noida Gym Network Map</span>
        </p>
        <p className="text-zinc-500 dark:text-zinc-400">Showing partner gyms relative to your GPS location (Sector 62).</p>
        <div className="flex flex-wrap gap-2 pt-1 border-t border-zinc-200 dark:border-zinc-800">
          <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Off-Peak</span>
          <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> Peak</span>
          <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-zinc-400" /> Off-line</span>
        </div>
      </div>

      {/* Interactive Gym Pins */}
      <div className="absolute inset-0 flex items-center justify-center">
        {gyms.map((gym, idx) => {
          // Compute pseudo coordinates relative to map center for rendering
          const leftPercent = 25 + (idx * 16) % 60;
          const topPercent = 30 + (idx * 13) % 55;
          const isActive = gym.id === activeGymId;
          const isHovered = gym.id === hoveredGymId;

          return (
            <div
              key={gym.id}
              className="absolute transition-transform duration-200"
              style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
            >
              {/* Gym Tooltip */}
              {(isActive || isHovered) && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-zinc-900 text-white rounded-lg p-2.5 text-xs shadow-xl z-20 border border-zinc-800">
                  <p className="font-semibold text-white line-clamp-1">{gym.name}</p>
                  <p className="text-zinc-400 text-[10px] mt-0.5 line-clamp-1">{gym.address}</p>
                  <div className="flex justify-between items-center mt-1.5 pt-1.5 border-t border-zinc-800">
                    <span className="font-bold text-brand-primary">{isPeakHour(gym) ? gym.peak_credit_cost : gym.offpeak_credit_cost} Credits</span>
                    <span className="text-[9px] text-zinc-500">{gym.distance}</span>
                  </div>
                </div>
              )}

              {/* Pin trigger */}
              <button
                onClick={() => onSelectGym && onSelectGym(gym.id)}
                onMouseEnter={() => setHoveredGymId(gym.id)}
                onMouseLeave={() => setHoveredGymId(null)}
                className={`relative flex items-center justify-center h-8 w-8 rounded-full border-2 shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer ${getPinColor(gym)} ${
                  isActive ? 'ring-4 ring-brand-primary/40 scale-110 z-10' : ''
                }`}
              >
                <MapPin className={`h-4.5 w-4.5 text-white ${gym.kill_switch ? 'text-zinc-200' : ''}`} />
              </button>
            </div>
          );
        })}

        {/* User GPS location dot */}
        <div className="absolute left-[40%] top-[55%] flex flex-col items-center">
          <div className="h-4 w-4 bg-brand-primary border-2 border-white rounded-full shadow-lg relative flex items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-brand-primary animate-ping opacity-60" />
          </div>
          <span className="bg-zinc-900/80 backdrop-blur text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow mt-1">You</span>
        </div>
      </div>

      <div className="relative z-10 text-[10px] text-zinc-400 flex items-center gap-1 self-end">
        <AlertCircle className="h-3 w-3" />
        <span>Mock GPS simulation enabled</span>
      </div>
    </div>
  );
}
