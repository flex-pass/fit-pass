'use client';

import React from 'react';
import Link from 'next/link';
import { Dumbbell, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-brand-primary tracking-tight">
              <div className="p-2 bg-brand-primary rounded-lg text-white">
                <Dumbbell className="h-5 w-5" />
              </div>
              <span className="text-zinc-50">FLEX<span className="text-brand-primary font-medium">PASS</span></span>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Gym membership jo tumhari life ke saath move kare. 75+ premium partner gyms near home, office, and travels with a single credits subscription.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-100 uppercase tracking-wider mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/gyms" className="hover:text-white transition-colors">Explore Gyms</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing Plans</Link></li>
              <li><Link href="/for-corporates" className="hover:text-white transition-colors">FlexPass Corporate</Link></li>
              <li><Link href="/#faq" className="hover:text-white transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Partners & Corporates */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-100 uppercase tracking-wider mb-4">Partner Portals</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/gym-owner/dashboard" className="hover:text-white transition-colors">Gym Owner Portal</Link></li>
              <li><Link href="/corporate/dashboard" className="hover:text-white transition-colors">Corporate HR Portal</Link></li>
              <li><Link href="/admin/dashboard" className="hover:text-white transition-colors">Admin Dashboard Preview</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-100 uppercase tracking-wider mb-4">Contact Support</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-primary" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-primary" />
                <span>support@flexpass.in</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-brand-primary mt-0.5" />
                <span>Sector 62, Noida, UP, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-900 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© {new Date().getFullYear()} FlexPass Network. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
