'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth, UserRole } from '@/lib/auth';
import { ShieldCheck, Dumbbell, Wallet, User, Menu, X, ArrowRight, Building, Award } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { session, role, loginAs } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(true);

  const rolesList: { name: string; key: UserRole; color: string }[] = [
    { name: 'Public Visitor', key: 'public', color: 'bg-zinc-500 text-white' },
    { name: 'User (Rahul K.)', key: 'user', color: 'bg-brand-primary text-white' },
    { name: 'Gym Owner', key: 'gym-owner', color: 'bg-brand-accent text-white' },
    { name: 'Corporate HR', key: 'corporate-hr', color: 'bg-indigo-600 text-white' },
    { name: 'Super Admin', key: 'admin', color: 'bg-brand-warning text-black font-semibold' },
  ];

  const getLinks = () => {
    switch (role) {
      case 'user':
        return [
          { name: 'Dashboard', href: '/dashboard' },
          { name: 'Explore Gyms', href: '/explore' },
          { name: 'Credits Wallet', href: '/wallet' },
          { name: 'Subscription', href: '/subscription' },
        ];
      case 'gym-owner':
        return [
          { name: 'Owner Dashboard', href: '/gym-owner/dashboard' },
          { name: 'Check-in Log', href: '/gym-owner/checkins' },
          { name: 'Payouts', href: '/gym-owner/payouts' },
        ];
      case 'corporate-hr':
        return [
          { name: 'HR Dashboard', href: '/corporate/dashboard' },
          { name: 'Employees', href: '/corporate/employees' },
        ];
      case 'admin':
        return [
          { name: 'Admin Home', href: '/admin/dashboard' },
          { name: 'Gym Management', href: '/admin/gyms' },
          { name: 'Fraud Monitor', href: '/admin/fraud' },
        ];
      default:
        return [
          { name: 'Explore Gyms', href: '/gyms' },
          { name: 'Pricing', href: '/pricing' },
          { name: 'For Companies', href: '/for-corporates' },
        ];
    }
  };

  const links = getLinks();

  return (
    <div className="w-full sticky top-0 z-50">
      {/* Dev Environment Sandbox Banner */}
      {showRoleSwitcher && (
        <div className="bg-zinc-900 border-b border-zinc-800 text-xs py-2 px-4 flex flex-wrap items-center justify-between gap-2 text-zinc-300">
          <div className="flex items-center gap-1.5">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-zinc-100">FlexPass Frontend Sandbox</span>
            <span className="hidden sm:inline text-zinc-500">|</span>
            <span className="hidden sm:inline text-zinc-400">Preview different portals instantly:</span>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {rolesList.map(r => (
              <button
                key={r.key}
                onClick={() => loginAs(r.key)}
                className={`px-2 py-0.5 rounded text-[10px] transition-all cursor-pointer ${
                  role === r.key
                    ? `${r.color} ring-2 ring-white/20 scale-105 shadow-md`
                    : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                }`}
              >
                {r.name}
              </button>
            ))}
            <button
              onClick={() => setShowRoleSwitcher(false)}
              className="ml-2 text-zinc-500 hover:text-zinc-300 font-bold"
              title="Hide Banner"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <header className="bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-2 font-bold text-xl text-brand-primary tracking-tight">
                <div className="p-2 bg-brand-primary rounded-lg text-white">
                  <Dumbbell className="h-5 w-5" />
                </div>
                <span>FLEX<span className="text-zinc-950 dark:text-zinc-50 font-medium">PASS</span></span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex space-x-1">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-brand-primary bg-zinc-100 dark:bg-zinc-900 font-semibold'
                        : 'text-zinc-600 dark:text-zinc-300 hover:text-brand-primary hover:bg-zinc-50 dark:hover:bg-zinc-900'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* CTA/Status Buttons */}
            <div className="hidden md:flex items-center gap-4">
              {session ? (
                <div className="flex items-center gap-4">
                  {role === 'user' && (
                    <Link href="/wallet" className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-primary/10 text-brand-primary dark:bg-brand-primary/20 rounded-full text-xs font-semibold">
                      <Wallet className="h-3.5 w-3.5" />
                      <span>{session.creditsBalance} Credits</span>
                    </Link>
                  )}
                  <div className="flex items-center gap-2 pl-2 border-l border-zinc-200 dark:border-zinc-800">
                    <div className="h-8 w-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 font-bold text-xs ring-1 ring-zinc-200 dark:ring-zinc-700">
                      {session.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">{session.name}</p>
                      <p className="text-[10px] text-zinc-500 capitalize">{session.role.replace('-', ' ')}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <button onClick={() => loginAs('user')} className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-brand-primary px-3 py-2 rounded-md transition-colors cursor-pointer">
                    Login
                  </button>
                  <button
                    onClick={() => loginAs('user')}
                    className="flex items-center gap-1.5 bg-brand-primary hover:bg-brand-secondary text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:shadow transition-all cursor-pointer"
                  >
                    <span>Start Free Trial</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 focus:outline-none cursor-pointer"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 px-2 pt-2 pb-4 space-y-1">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'text-brand-primary bg-zinc-100 dark:bg-zinc-900 font-semibold'
                      : 'text-zinc-600 dark:text-zinc-300 hover:text-brand-primary hover:bg-zinc-50 dark:hover:bg-zinc-900'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-4 pb-2 border-t border-zinc-200 dark:border-zinc-800 px-3">
              {session ? (
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 font-bold text-sm">
                    {session.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{session.name}</p>
                    <p className="text-xs text-zinc-500 capitalize">{session.role.replace('-', ' ')}</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      loginAs('user');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-center text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-brand-primary py-2 cursor-pointer"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      loginAs('user');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-center bg-brand-primary hover:bg-brand-secondary text-white py-2.5 rounded-lg text-sm font-semibold cursor-pointer"
                  >
                    Start Free Trial
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
