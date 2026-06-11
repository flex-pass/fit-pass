'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { mockGyms } from '@/lib/api';
import GymCard from '@/components/gym-card';
import GymMap from '@/components/gym-map';
import { ArrowRight, Compass, ShieldCheck, Zap, Users, CheckCircle, ChevronDown } from 'lucide-react';

export default function LandingPage() {
  const { loginAs } = useAuth();
  
  // Showcase top 3 approved gyms
  const showcaseGyms = mockGyms.slice(0, 3);

  const steps = [
    { title: 'Pick a plan', desc: 'Choose a monthly credit balance that fits your schedule.' },
    { title: 'Find a gym', desc: 'Browse 75+ premium partner gyms near home or office.' },
    { title: 'Scan and work out', desc: 'Generate a secure QR code on your phone and start training.' },
  ];

  const faqs = [
    { q: 'How does the credit system work?', a: 'Every gym in the FlexPass network costs a set number of credits per visit. Mid-tier gyms cost fewer credits, while premium clubs cost more. Credits are deducted only when you check in.' },
    { q: 'What happens to my unused credits?', a: 'Unused credits automatically roll over to the next month! You can roll over up to 100% of your plan\'s monthly credit allowance.' },
    { q: 'Can I visit different gyms in the same week?', a: 'Yes! You can visit a gym near your office on weekdays, a gym near your home on weekends, and a gym in another city when traveling. There are no location locks.' },
    { q: 'Is there a limit to daily check-ins?', a: 'You can check in to 1 partner gym per calendar day. This prevents pass sharing and fraud.' },
    { q: 'How does the 14-day free trial work?', a: 'Sign up today and get 5 free credits to test any Tier 3 or Tier 2 gym. No credit card is required to start the trial.' },
    { q: 'Can I cancel or upgrade my subscription?', a: 'Absolutely. You can upgrade, downgrade, or cancel your subscription at any time directly from your Wallet dashboard.' }
  ];

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary dark:bg-brand-primary/20 px-3.5 py-1.5 rounded-full text-xs font-semibold">
            <Zap className="h-3.5 w-3.5 fill-brand-primary" />
            <span>Phase 1 Web Launch Live in Noida & Delhi NCR</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
            FitPass <span className="text-brand-primary">One Pass. Every Gym. Total Freedom.</span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto lg:mx-0">
           Workout near home, office, or anywhere you travel.
Access 75+ partner gyms with one flexible membership.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2">
            <button
              onClick={() => loginAs('user')}
              className="px-8 py-4 bg-brand-primary hover:bg-brand-secondary text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Start Free 14-Day Trial</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <Link
              href="/gyms"
              className="px-8 py-4 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 font-bold rounded-xl text-center transition-all cursor-pointer"
            >
              Explore Gym Network
            </Link>
          </div>
        </div>

        {/* Hero Interactive Map preview */}
        <div className="lg:col-span-5 h-[380px] sm:h-[450px]">
          <GymMap gyms={mockGyms} />
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full bg-zinc-100/60 dark:bg-zinc-900/40 py-20 border-y border-zinc-200/50 dark:border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
            <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white">How FlexPass Works</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Ditch single-gym locks. Access the whole city in three steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 p-6 rounded-2xl relative shadow-sm">
                <div className="h-10 w-10 bg-brand-primary text-white font-bold rounded-full flex items-center justify-center text-sm mb-4">
                  0{idx + 1}
                </div>
                <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Network Preview section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white">Partner Gyms Near You</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Visit any premium fitness club, cardio zone, or yoga studio in NCR.</p>
          </div>
          <Link href="/gyms" className="text-sm font-semibold text-brand-primary flex items-center gap-1 hover:underline">
            <span>View all 75+ gyms</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {showcaseGyms.map((gym) => (
            <GymCard key={gym.id} gym={gym} />
          ))}
        </div>
      </section>

      {/* Corporate HR portal teaser */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-gradient-to-r from-[#1A6B8A] to-[#2E86AB] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }} />
          <div className="space-y-4 max-w-xl text-center lg:text-left z-10">
            <span className="bg-white/20 text-white font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">For HR Managers</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold">FlexPass for Corporates</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Boost team health and employee satisfaction with subsidized multi-gym corporate memberships. Pay only for what they actually use.
            </p>
          </div>
          <div className="z-10 shrink-0">
            <Link
              href="/for-corporates"
              className="px-6 py-3.5 bg-white text-brand-primary font-bold rounded-xl shadow-lg hover:scale-105 transition-transform block text-center"
            >
              Get Corporate Pitch
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full bg-zinc-50 dark:bg-zinc-950 py-20 border-t border-zinc-200 dark:border-zinc-900" id="faq">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Everything you need to know about FlexPass subscriptions.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between font-semibold text-zinc-900 dark:text-zinc-100 cursor-pointer list-none">
                  <span>{faq.q}</span>
                  <span className="transition-transform group-open:rotate-180">
                    <ChevronDown className="h-5 w-5 text-zinc-500" />
                  </span>
                </summary>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 leading-relaxed border-t border-zinc-100 dark:border-zinc-800 pt-3">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
