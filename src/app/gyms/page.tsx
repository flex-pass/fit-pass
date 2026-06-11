'use client';

import React, { useState } from 'react';
import { mockGyms, Gym } from '@/lib/api';
import GymCard from '@/components/gym-card';
import { Search, SlidersHorizontal, MapPin } from 'lucide-react';

export default function GymsDirectory() {
  const [search, setSearch] = useState('');
  const [selectedTier, setSelectedTier] = useState<number | 'all'>('all');
  const [selectedAmenity, setSelectedAmenity] = useState<string | 'all'>('all');

  // Filter logic
  const filteredGyms = mockGyms.filter((gym) => {
    const matchesSearch = gym.name.toLowerCase().includes(search.toLowerCase()) || 
                          gym.address.toLowerCase().includes(search.toLowerCase());
    const matchesTier = selectedTier === 'all' || gym.tier === selectedTier;
    const matchesAmenity = selectedAmenity === 'all' || gym.amenities.includes(selectedAmenity);
    return matchesSearch && matchesTier && matchesAmenity;
  });

  const amenitiesList = ['weights', 'cardio', 'pool', 'shower', 'sauna', 'yoga mat'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="space-y-2 mb-10 text-center sm:text-left">
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white">Explore Partner Gyms</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Browse 75+ premium partner gyms near Noida. Select details to see schedules and pricing.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search gyms by name, sector or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Tier filter */}
          <select
            value={selectedTier}
            onChange={(e) => {
              const val = e.target.value;
              setSelectedTier(val === 'all' ? 'all' : Number(val));
            }}
            className="px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-semibold focus:outline-none cursor-pointer"
          >
            <option value="all">All Tiers</option>
            <option value="1">Tier 1 (Premium)</option>
            <option value="2">Tier 2 (Mid-Range)</option>
            <option value="3">Tier 3 (Budget)</option>
          </select>

          {/* Amenities filter */}
          <select
            value={selectedAmenity}
            onChange={(e) => setSelectedAmenity(e.target.value)}
            className="px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-semibold focus:outline-none cursor-pointer"
          >
            <option value="all">All Amenities</option>
            {amenitiesList.map((a) => (
              <option key={a} value={a}>
                {a.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid listing */}
      {filteredGyms.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGyms.map((gym) => (
            <GymCard key={gym.id} gym={gym} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
          <p className="text-zinc-500 font-medium">No gyms matching your filters found.</p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedTier('all');
              setSelectedAmenity('all');
            }}
            className="text-xs font-bold text-brand-primary mt-2 hover:underline cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
