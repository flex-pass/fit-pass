'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { mockGyms, Gym } from '@/lib/api';
import GymCard from '@/components/gym-card';
import GymMap from '@/components/gym-map';
import { Search, MapPin, Compass } from 'lucide-react';

export default function ExploreGymsPage() {
  const { session, role, loginAs } = useAuth();
  const [search, setSearch] = useState('');
  const [activeGymId, setActiveGymId] = useState<string>('gym-noida-1');

  if (role !== 'user' || !session) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-lg space-y-4">
        <h3 className="text-xl font-bold text-zinc-950 dark:text-white">Explore Portal Mock Sandbox</h3>
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

  // Filter gyms based on search
  const filteredGyms = mockGyms.filter((gym) =>
    gym.name.toLowerCase().includes(search.toLowerCase()) || 
    gym.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full flex-1 flex flex-col h-[calc(100vh-64px)]">
      {/* Sticky top info bar */}
      <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800/80 px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-2 text-xs">
          <Compass className="h-4 w-4 text-brand-primary animate-pulse" />
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">
            Noida Grid Coordinates Enabled
          </span>
          <span className="text-zinc-400">|</span>
          <span className="text-zinc-500">Center: Sector 62 Head Office</span>
        </div>
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search active gyms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs focus:outline-none focus:ring-1 focus:ring-brand-primary"
          />
        </div>
      </div>

      {/* Main split viewport layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left side list (40% width) */}
        <div className="w-full md:w-[40%] flex flex-col overflow-y-auto border-r border-zinc-200 dark:border-zinc-800 p-4 space-y-4 bg-zinc-50/50 dark:bg-zinc-950/20">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
            Partner Gyms Nearby ({filteredGyms.length})
          </p>

          <div className="space-y-4">
            {filteredGyms.map((gym) => {
              const isActive = gym.id === activeGymId;
              return (
                <div
                  key={gym.id}
                  onClick={() => setActiveGymId(gym.id)}
                  className={`cursor-pointer transition-all ${
                    isActive ? 'scale-[1.01] ring-2 ring-brand-primary/40 rounded-xl' : ''
                  }`}
                >
                  <GymCard gym={gym} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right side map (60% width) */}
        <div className="flex-1 h-full relative p-4 bg-zinc-100 dark:bg-zinc-950">
          <GymMap
            gyms={filteredGyms}
            activeGymId={activeGymId}
            onSelectGym={(id) => setActiveGymId(id)}
          />
        </div>
      </div>
    </div>
  );
}
