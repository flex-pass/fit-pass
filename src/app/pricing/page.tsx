'use client';

import React, { useState } from 'react';
import { creditPlans } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { Check, Info, ArrowRight } from 'lucide-react';

export default function PricingPage() {
  const { loginAs } = useAuth();
  const [selectedBilling, setSelectedBilling] = useState<'monthly' | 'quarterly'>('monthly');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-primary bg-brand-primary/10 px-3 py-1.5 rounded-full">
          Simple, Credit-Based Plans
        </span>
        <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white sm:text-5xl">
          Choose your monthly credits
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          Unused credits roll over to the next month automatically. Switch plans or cancel anytime.
        </p>

        {/* Toggle (simulated) */}
        <div className="inline-flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-900 p-1.5 rounded-xl border border-zinc-200/40 dark:border-zinc-800/40">
          <button
            onClick={() => setSelectedBilling('monthly')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedBilling === 'monthly'
                ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setSelectedBilling('quarterly')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedBilling === 'quarterly'
                ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <span>Quarterly (Save 10%)</span>
            <span className="bg-emerald-500 text-white text-[9px] px-1.5 py-0.5 rounded">Promo</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
        {creditPlans.map((plan) => {
          const isStandard = plan.id === 'plan-standard';
          const calculatedPrice = selectedBilling === 'quarterly' ? Math.round(plan.price * 0.9) : plan.price;

          return (
            <div
              key={plan.id}
              className={`bg-white dark:bg-zinc-900 border rounded-3xl p-8 flex flex-col justify-between relative transition-all duration-300 ${
                isStandard
                  ? 'border-brand-primary ring-2 ring-brand-primary/25 shadow-xl scale-105 z-10'
                  : 'border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700'
              }`}
            >
              {isStandard && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-primary text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              {/* Title & Price */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-zinc-950 dark:text-white">Rs {calculatedPrice}</span>
                  <span className="text-zinc-500 text-xs">/month</span>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-850 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-zinc-400 block uppercase">Credits Allowance</span>
                    <span className="font-extrabold text-brand-primary text-lg">{plan.credits} Credits</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-zinc-400 block uppercase">Cost/Credit</span>
                    <span className="font-bold text-zinc-700 dark:text-zinc-300">Rs {plan.costPerCredit}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 pt-6 text-sm text-zinc-600 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-800">
                  <li className="flex items-center gap-2">
                    <Check className="h-4.5 w-4.5 text-brand-primary shrink-0" />
                    <span>Access to all Partner Gyms</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4.5 w-4.5 text-brand-primary shrink-0" />
                    <span>Rollover up to <b>{plan.rollover} credits</b></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4.5 w-4.5 text-brand-primary shrink-0" />
                    <span>Peak & Off-peak flex hours</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4.5 w-4.5 text-brand-primary shrink-0" />
                    <span>Cancel subscription anytime</span>
                  </li>
                </ul>
              </div>

              {/* Action */}
              <div className="mt-8">
                <button
                  onClick={() => loginAs('user')}
                  className={`w-full py-3.5 font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isStandard
                      ? 'bg-brand-primary hover:bg-brand-secondary text-white shadow-md'
                      : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200'
                  }`}
                >
                  <span>Choose Plan</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Warning */}
      <div className="max-w-2xl mx-auto mt-12 bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl flex items-start gap-3 text-xs text-amber-700 dark:text-amber-500">
        <Info className="h-5 w-5 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold">Important note about local currency & Razorpay payments</p>
          <p>
            All plans are billed in Indian Rupees (INR) and are inclusive of GST. In sandbox testing, you can use credit card mock numbers to simulate activated payments.
          </p>
        </div>
      </div>
    </div>
  );
}
