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
  const [scrolled, setScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLinks = () => {
    switch (role) {
      case 'user':
        return [
          { name: 'Dashboard', href: '/user/dashboard' },
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
      case 'superadmin':
        return [
          { name: 'SuperAdmin Home', href: '/superadmin/dashboard' },
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
    <div className="w-full fixed top-0 z-50">

      {/* Main Navbar */}
      <header className={`transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 shadow-sm py-0' : 'bg-transparent border-b-transparent py-2'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-2 font-bold text-xl text-brand-primary tracking-tight">
                <div className="p-2 bg-brand-primary rounded-lg text-white">
                  <Dumbbell className="h-5 w-5" />
                </div>
                <span>FLEX<span className={`font-medium transition-colors ${scrolled ? 'text-zinc-950 dark:text-zinc-50' : 'text-zinc-950 dark:text-zinc-50 md:text-white'}`}>PASS</span></span>
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
                        : scrolled 
                          ? 'text-zinc-600 dark:text-zinc-300 hover:text-brand-primary hover:bg-zinc-50 dark:hover:bg-zinc-900'
                          : 'text-zinc-300 hover:text-white hover:bg-white/10'
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
                  <Link href="/login" className={`text-sm font-medium px-3 py-2 rounded-md transition-colors cursor-pointer ${scrolled ? 'text-zinc-600 dark:text-zinc-300 hover:text-brand-primary' : 'text-zinc-300 hover:text-white'}`}>
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center gap-1.5 bg-brand-primary hover:bg-brand-secondary text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:shadow transition-all cursor-pointer"
                  >
                    <span>Start Free Trial</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
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
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-brand-primary py-2 cursor-pointer block"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center bg-brand-primary hover:bg-brand-secondary text-white py-2.5 rounded-lg text-sm font-semibold cursor-pointer block"
                  >
                    Start Free Trial
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
