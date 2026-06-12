'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { ArrowRight, Zap } from 'lucide-react';
import InfiniteGallery from '@/components/ui/3d-gallery-photography';

const sampleImages = [
  { src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80', alt: 'Gym Interior' },
  { src: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80', alt: 'Weights' },
  { src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80', alt: 'Workout' },
  { src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80', alt: 'Gym Area' },
  { src: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800&q=80', alt: 'Stretching' },
  { src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80', alt: 'Fitness Tracking' },
  { src: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80', alt: 'Nutrition' },
  { src: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80', alt: 'Yoga' },
];

export default function Hero() {
  const { loginAs } = useAuth();

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-10 lg:py-12 relative overflow-hidden min-h-screen flex flex-col items-center justify-center text-center bg-zinc-950 z-0">
      {/* 3D Background Gallery */}
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
        <InfiniteGallery
          images={sampleImages}
          speed={1.2}
          zSpacing={3}
          visibleCount={12}
          falloff={{ near: 0.8, far: 14 }}
          className="h-full w-full"
        />
        {/* Dark overlay to ensure text remains readable but images pop */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/40 to-zinc-950/90 z-10" />
      </div>

      {/* Background decorative gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-primary/20 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-secondary/20 rounded-full blur-[100px] pointer-events-none -z-10" />
      
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center z-10 relative space-y-6 mt-8">
        {/* Launch Badge */}
        <div className="inline-flex items-center gap-2 bg-zinc-900/50 text-brand-primary px-4 py-1.5 rounded-full text-xs font-semibold border border-brand-primary/30 shadow-sm backdrop-blur-sm">
          <Zap className="h-3.5 w-3.5 fill-brand-primary" />
          <span>Phase 1 Web Launch Live in Noida & Delhi NCR</span>
        </div>

        {/* Heading */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight drop-shadow-lg">
            One Pass.<br className="hidden sm:inline" /> Every Gym.<br />
            <span className="bg-gradient-to-r from-brand-primary to-rose-400 bg-clip-text text-transparent filter drop-shadow-sm">
              Total Freedom.
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed drop-shadow">
            Workout near home, office, or anywhere you travel. Access 75+ premium partner gyms with a single flexible, contract-free membership.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 w-full max-w-xs sm:max-w-none mx-auto">
          <Link
            href="/register"
            className="group px-6 py-3.5 bg-brand-primary hover:bg-brand-secondary text-white font-bold rounded-xl shadow-lg hover:shadow-brand-primary/40 hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer text-base"
          >
            <span>Start Free 14-Day Trial</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/gyms"
            className="px-6 py-3.5 bg-zinc-900/60 hover:bg-zinc-800 backdrop-blur-md border border-zinc-700 font-bold rounded-xl text-center shadow-sm hover:shadow-lg transition-all cursor-pointer text-white text-base"
          >
            Explore Gym Network
          </Link>
        </div>
      </div>
    </section>
  );
}
