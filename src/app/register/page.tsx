'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Check, ArrowRight, ArrowLeft, ShieldCheck, Dumbbell, Zap, Sparkles } from 'lucide-react';
import Link from 'next/link';

type PlanType = 'basic' | 'standard' | 'premium';
type BillingCycle = 'monthly' | 'quarterly' | 'yearly';

export default function RegisterPage() {
  const router = useRouter();
  const { registerUser } = useAuth();
  const [step, setStep] = useState(1);
  const [planType, setPlanType] = useState<PlanType>('standard');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

  // Form Fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const plans = [
    {
      id: 'basic' as PlanType,
      name: 'Basic Plan',
      credits: 30,
      price: 1500,
      description: 'Ideal for casual gym-goers (1-2 visits/week)',
      features: ['Access Tier 3 & Tier 2 partner gyms', '30-day credit rollover (up to 100%)', 'Cancel or pause subscription anytime', 'Standard support'],
      popular: false,
    },
    {
      id: 'standard' as PlanType,
      name: 'Standard Plan',
      credits: 55,
      price: 2500,
      description: 'Perfect for active training (3-4 visits/week)',
      features: ['Access to ALL partner gyms (Tier 1-3)', '100% rollover of unused credits', 'Priority check-in liveness validation', '24/7 Priority support'],
      popular: true,
    },
    {
      id: 'premium' as PlanType,
      name: 'Premium Plan',
      credits: 100,
      price: 4000,
      description: 'For fitness enthusiasts and daily workouts',
      features: ['Access to premium luxury health clubs', 'Rollover up to 200 credits', 'Free guest passes (2 per month)', 'Dedicated personal health guide'],
      popular: false,
    },
  ];

  const getPriceMultiplier = (cycle: BillingCycle) => {
    switch (cycle) {
      case 'quarterly': return 0.9; // 10% discount
      case 'yearly': return 0.75; // 25% discount
      default: return 1.0;
    }
  };

  const getCycleLabel = (cycle: BillingCycle) => {
    switch (cycle) {
      case 'quarterly': return '/quarter';
      case 'yearly': return '/year';
      default: return '/month';
    }
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !city || !password) {
      setError('Please fill in all fields.');
      return;
    }
    
    registerUser({
      name,
      phone,
      email,
      city,
      planType,
      billingCycle,
    });
    
    router.push('/user/dashboard');
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col justify-start pt-32 pb-20 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Progress Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10">
        {/* Step Indicator */}
        <div className="flex justify-center items-center gap-4">
          <div className="flex items-center">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              step >= 1 ? 'bg-brand-primary text-white ring-4 ring-brand-primary/20' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'
            }`}>
              1
            </div>
            <span className="ml-2 text-xs font-bold text-zinc-900 dark:text-zinc-100 hidden sm:inline">Select Plan</span>
          </div>
          <div className={`h-0.5 w-8 transition-colors ${step >= 2 ? 'bg-brand-primary' : 'bg-zinc-200 dark:bg-zinc-800'}`} />
          <div className="flex items-center">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              step >= 2 ? 'bg-brand-primary text-white ring-4 ring-brand-primary/20' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'
            }`}>
              2
            </div>
            <span className="ml-2 text-xs font-bold text-zinc-900 dark:text-zinc-100 hidden sm:inline">Billing Cycle</span>
          </div>
          <div className={`h-0.5 w-8 transition-colors ${step >= 3 ? 'bg-brand-primary' : 'bg-zinc-200 dark:bg-zinc-800'}`} />
          <div className="flex items-center">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              step >= 3 ? 'bg-brand-primary text-white ring-4 ring-brand-primary/20' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'
            }`}>
              3
            </div>
            <span className="ml-2 text-xs font-bold text-zinc-900 dark:text-zinc-100 hidden sm:inline">Create Account</span>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-5xl z-10 px-4">
        <div>
          {/* STEP 1: PLAN SELECTION */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white">Choose your credit allowance</h2>
                <p className="text-sm text-zinc-500">Credits are deducted only when you scan and train. Top-up anytime.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                {plans.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setPlanType(p.id)}
                    className={`relative rounded-3xl p-6 border-2 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      planType === p.id
                        ? 'border-brand-primary bg-white dark:bg-zinc-900 ring-2 ring-brand-primary/25 shadow-xl scale-[1.02]'
                        : 'border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-900 shadow-sm'
                    }`}
                  >
                    {p.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-primary text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm">
                        Most Popular
                      </span>
                    )}

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-extrabold text-lg text-zinc-900 dark:text-white">{p.name}</h3>
                        <p className="text-xs text-zinc-400 mt-1">{p.description}</p>
                      </div>

                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold text-zinc-950 dark:text-white">
                          ₹{Math.round(p.price * getPriceMultiplier(billingCycle))}
                        </span>
                        <span className="text-xs text-zinc-500 font-semibold">{getCycleLabel(billingCycle)}</span>
                      </div>

                      <div className="bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary rounded-xl p-3 flex items-center justify-between text-xs font-bold">
                        <span>Monthly Credits</span>
                        <span className="text-sm">{p.credits} Credits</span>
                      </div>

                      <ul className="space-y-2.5 text-xs text-zinc-600 dark:text-zinc-400 pt-4 border-t border-zinc-100 dark:border-zinc-850">
                        {p.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-brand-primary shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-6">
                      <div className={`w-full py-2.5 rounded-xl text-center text-xs font-bold border transition-colors ${
                        planType === p.id
                          ? 'bg-brand-primary text-white border-brand-primary'
                          : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
                      }`}>
                        {planType === p.id ? 'Selected' : 'Select Plan'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-6">
                <button
                  onClick={handleNextStep}
                  className="px-6 py-3 bg-brand-primary hover:bg-brand-secondary text-white text-sm font-bold rounded-xl shadow-md flex items-center gap-2 cursor-pointer animate-pulse"
                >
                  <span>Continue to Billing Cycle</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: BILLING CYCLE */}
          {step === 2 && (
            <div className="bg-white dark:bg-zinc-900 py-8 px-6 sm:px-10 shadow-xl rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 max-w-2xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white">Select Billing Frequency</h2>
                <p className="text-sm text-zinc-500">Save up to 25% by choosing a quarterly or annual membership cycle.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {[
                  { id: 'monthly' as BillingCycle, name: 'Monthly', discount: 'Standard Rate', desc: 'Pay month-to-month, pause anytime.' },
                  { id: 'quarterly' as BillingCycle, name: 'Quarterly', discount: 'Save 10%', desc: 'Billed every 3 months. Flexible.' },
                  { id: 'yearly' as BillingCycle, name: 'Yearly', discount: 'Save 25%', desc: 'Best value! Billed annually.' },
                ].map((cycle) => (
                  <div
                    key={cycle.id}
                    onClick={() => setBillingCycle(cycle.id)}
                    className={`relative rounded-xl p-5 border-2 cursor-pointer transition-all duration-300 hover:shadow ${
                      billingCycle === cycle.id
                        ? 'border-brand-primary bg-brand-primary/5 dark:bg-brand-primary/10 shadow-sm'
                        : 'border-zinc-200 dark:border-zinc-850 bg-zinc-50 dark:bg-zinc-950'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-sm text-zinc-900 dark:text-white">{cycle.name}</h3>
                      <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        cycle.id === 'monthly' ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-350' : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                      }`}>
                        {cycle.discount}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 leading-relaxed">{cycle.desc}</p>
                  </div>
                ))}
              </div>

              {/* Selected summary */}
              <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-850 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider block font-bold">Your Selected Plan</span>
                  <span className="text-base font-extrabold text-zinc-900 dark:text-white capitalize">
                    {planType} Plan ({billingCycle} billing)
                  </span>
                </div>
                <div className="text-right flex items-baseline gap-1.5">
                  <span className="text-2xl font-extrabold text-brand-primary">
                    ₹{Math.round(plans.find(p => p.id === planType)!.price * getPriceMultiplier(billingCycle))}
                  </span>
                  <span className="text-xs text-zinc-500 font-semibold">{getCycleLabel(billingCycle)}</span>
                </div>
              </div>

              <div className="flex justify-between pt-6 border-t border-zinc-150 dark:border-zinc-800/80">
                <button
                  onClick={handlePrevStep}
                  className="px-5 py-3 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm font-bold rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={handleNextStep}
                  className="px-6 py-3 bg-brand-primary hover:bg-brand-secondary text-white text-sm font-bold rounded-xl shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>Continue to Account Info</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: ACCOUNT CREATION */}
          {step === 3 && (
            <div className="bg-white dark:bg-zinc-900 py-8 px-6 sm:px-10 shadow-xl rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 max-w-xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white">Create your account</h2>
                <p className="text-sm text-zinc-500">Provide registration details to finalize subscription setup.</p>
              </div>

              {error && (
                <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs rounded-xl font-semibold text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-brand-primary/50 text-zinc-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-brand-primary/50 text-zinc-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-brand-primary/50 text-zinc-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase">City</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Noida"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-brand-primary/50 text-zinc-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase">Password</label>
                  <input
                    type="password"
                    required
                    placeholder="Min 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-brand-primary/50 text-zinc-900 dark:text-white"
                  />
                </div>

                <div className="flex justify-between pt-6 border-t border-zinc-150 dark:border-zinc-800/80">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-5 py-3 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm font-bold rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-brand-primary hover:bg-brand-secondary text-white text-sm font-bold rounded-xl shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <span>Complete & Log In</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
