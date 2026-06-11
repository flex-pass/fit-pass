'use client';

import React from 'react';
import { useAuth } from '@/lib/auth';
import { Award, BarChart3, Building, ShieldCheck, Mail, ArrowRight, CheckCircle } from 'lucide-react';

export default function ForCorporates() {
  const { loginAs } = useAuth();

  const benefits = [
    { title: 'Subsidized Pricing', desc: 'Starting at Rs 500/employee per month for 30 credits (highly subsidised).' },
    { title: 'Zero Breakage Waste', desc: 'Only pay for credits that your employees actually use. Rollover prevents wasted budgets.' },
    { title: 'Interactive Dashboard', desc: 'Real-time corporate panel shows employees seats, active check-ins, and invoices.' },
    { title: 'NCR Wide Network', desc: 'Let your employees train near their home, Noida headquarters, or during travels.' }
  ];

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 px-3.5 py-1.5 rounded-full border border-indigo-200/50">
          FlexPass Enterprise
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white max-w-3xl mx-auto leading-tight">
          Flexible fitness benefits for <span className="text-indigo-600">modern teams</span>
        </h1>
        <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
          Equip your company with access to 75+ Noida partner gyms. Track health analytics and cut employee wellness costs.
        </p>

        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={() => loginAs('corporate-hr')}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-indigo-500/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Request Demo Pitch</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Benefits */}
      <section className="w-full bg-zinc-100/60 dark:bg-zinc-900/40 py-20 border-y border-zinc-200/50 dark:border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b, idx) => (
              <div key={idx} className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 p-6 rounded-2xl shadow-sm">
                <div className="h-10 w-10 bg-indigo-100 dark:bg-indigo-950 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-base text-zinc-900 dark:text-white mb-2">{b.title}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mock Enterprise Form */}
      <section className="w-full max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <Building className="h-8 w-8 text-indigo-600 mx-auto" />
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Request Free Corporate Pass</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Submit your corporate email address to receive custom tier rates.
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); loginAs('corporate-hr'); }} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1.5">Company Name</label>
              <input
                required
                type="text"
                placeholder="e.g. Infosys, TCS, Wipro"
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-zinc-50 dark:bg-zinc-950 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1.5">Work Email Address</label>
              <input
                required
                type="email"
                placeholder="hr@yourcompany.com"
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-zinc-50 dark:bg-zinc-950 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-600"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-750 text-white font-bold rounded-xl text-center shadow transition-colors cursor-pointer"
            >
              Get Sandbox Access
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
