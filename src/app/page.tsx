'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { useGyms } from '@/lib/hooks';
import GymCard from '@/components/gym-card';
import GymMap from '@/components/gym-map';
import Hero from '@/components/home/hero';
import HeroGallery from '@/components/home/hero-gallery';
import ExpandOnHover from '@/components/ui/expand-cards';
import { ArrowRight, Compass, ShieldCheck, Zap, Users, CheckCircle, ChevronDown } from 'lucide-react';

export default function LandingPage() {
  const { loginAs } = useAuth();
  
  // Showcase top 3 approved gyms
  const { gyms } = useGyms(28.5355, 77.3910);
  const showcaseGyms = gyms.slice(0, 3);

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
      <Hero />

      {/* How It Works */}
      <section className="w-full bg-black py-20 border-y border-zinc-900 relative">
        {/* Subtle red glow in the background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
            <h2 className="text-3xl font-extrabold text-white">How FlexPass Works</h2>
            <p className="text-sm text-zinc-400">Ditch single-gym locks. Access the whole city in three steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="bg-zinc-950/80 backdrop-blur-sm border border-zinc-800 p-8 rounded-2xl relative shadow-lg hover:border-brand-primary/50 hover:bg-zinc-900 transition-all group">
                <div className="h-12 w-12 bg-brand-primary/20 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors font-bold rounded-full flex items-center justify-center text-lg mb-6 ring-1 ring-brand-primary/30">
                  0{idx + 1}
                </div>
                <h3 className="font-bold text-xl text-white mb-3">{step.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{step.desc}</p>
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
        <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800/80 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 group">
          
          {/* Subtle Red glow orb */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-primary/20 rounded-full blur-[80px] pointer-events-none transition-opacity group-hover:opacity-100 opacity-60" />

          <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle, #E11D48 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }} />
          
          <div className="space-y-4 max-w-xl text-center lg:text-left z-10">
            <div className="inline-block bg-brand-primary/10 text-brand-primary border border-brand-primary/20 font-bold text-xs px-3 py-1.5 rounded-full uppercase tracking-wider mb-2">
              For HR Managers
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">FlexPass for Corporates</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Boost team health and employee satisfaction with subsidized multi-gym corporate memberships. Pay only for what they actually use.
            </p>
          </div>
          
          <div className="z-10 shrink-0">
            <Link
              href="/for-corporates"
              className="px-8 py-4 bg-brand-primary hover:bg-brand-secondary text-white font-bold rounded-xl shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/40 hover:-translate-y-1 transition-all block text-center"
            >
              Get Corporate Pitch
            </Link>
          </div>
        </div>
      </section>

      {/* Scroll Animation Gallery Section */}
      <HeroGallery />

      {/* FAQ Section */}
      <section className="w-full bg-black py-20 border-t border-zinc-900" id="faq">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Everything you need to know about FlexPass subscriptions.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group bg-zinc-950 border border-zinc-800 rounded-xl p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between font-semibold text-white cursor-pointer list-none">
                  <span>{faq.q}</span>
                  <span className="transition-transform group-open:rotate-180">
                    <ChevronDown className="h-5 w-5 text-brand-primary" />
                  </span>
                </summary>
                <p className="text-sm text-zinc-400 mt-3 leading-relaxed border-t border-zinc-900 pt-3">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Fitness Knowledge Expand Hover Section */}
      <ExpandOnHover />
    </div>
  );
}
