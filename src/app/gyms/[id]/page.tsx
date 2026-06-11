import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { mockGyms } from '@/lib/api';
import CreditBadge from '@/components/credit-badge';
import { Dumbbell, MapPin, Clock, ShieldCheck, Heart, Award, ArrowLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function GymDetailPage({ params }: PageProps) {
  const { id } = await params;
  const gym = mockGyms.find((g) => g.id === id);

  if (!gym) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back to list */}
      <Link
        href="/gyms"
        className="inline-flex items-center gap-1 text-sm font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 mb-8 group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
        <span>Back to search</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Images & Info */}
        <div className="lg:col-span-8 space-y-8">
          <div className="relative h-96 w-full rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 dark:border-zinc-800">
            <img src={gym.image} alt={gym.name} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-3 py-1 rounded-full text-xs font-bold border border-zinc-200/50 dark:border-zinc-700/50">
                Tier {gym.tier} Partner
              </span>
              <CreditBadge gym={gym} />
            </div>

            <h1 className="text-3xl font-extrabold text-zinc-950 dark:text-white">{gym.name}</h1>

            <p className="text-sm text-zinc-500 dark:text-zinc-400 flex items-start gap-1.5 leading-relaxed">
              <MapPin className="h-4.5 w-4.5 text-zinc-400 shrink-0 mt-0.5" />
              <span>{gym.address}</span>
            </p>
          </div>

          {/* Amenities Grid */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-250/50 dark:border-zinc-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-lg text-zinc-900 dark:text-white">Included Amenities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {gym.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span className="capitalize">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Timing details */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-250/50 dark:border-zinc-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-lg text-zinc-900 dark:text-white">Schedule & Peak Hours</h3>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-brand-primary mt-0.5" />
              <div className="text-sm space-y-1">
                <p className="font-semibold text-zinc-800 dark:text-zinc-200">Peak Hours (Higher credits cost):</p>
                <p className="text-zinc-500 dark:text-zinc-400">{gym.peak_hours}</p>
                <p className="text-zinc-400 text-xs mt-1">All other hours are billed at lower off-peak credit pricing.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Booking Panel card */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-lg space-y-6">
            <h3 className="font-extrabold text-xl text-zinc-950 dark:text-white">Book Your Visit</h3>
            <p className="text-xs text-zinc-500">
              Confirm your booking to receive a 15-second secure QR check-in code.
            </p>

            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-850 space-y-3">
              <div className="flex justify-between items-center text-xs text-zinc-500 border-b border-zinc-200/50 dark:border-zinc-800/80 pb-2">
                <span>Peak Credits Cost</span>
                <span className="font-bold text-zinc-950 dark:text-zinc-50">{gym.peak_credit_cost} Credits</span>
              </div>
              <div className="flex justify-between items-center text-xs text-zinc-500 border-b border-zinc-200/50 dark:border-zinc-800/80 pb-2">
                <span>Off-Peak Credits Cost</span>
                <span className="font-bold text-zinc-950 dark:text-zinc-50">{gym.offpeak_credit_cost} Credits</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold pt-1">
                <span>Your Current Balance</span>
                <span className="text-brand-primary">42 Credits</span>
              </div>
            </div>

            {gym.kill_switch ? (
              <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl text-xs text-rose-500 text-center font-medium">
                Bookings temporarily suspended by owner.
              </div>
            ) : (
              <Link
                href={`/gyms/${gym.id}/book`}
                className="w-full py-4 bg-brand-primary hover:bg-brand-secondary text-white font-bold rounded-xl text-center shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Dumbbell className="h-4.5 w-4.5" />
                <span>Confirm Booking</span>
              </Link>
            )}

            <div className="flex items-center justify-center gap-1 text-[10px] text-zinc-400">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              <span>Credits deducted only upon scan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
