'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/navbar';
import { CinematicFooter } from '@/components/ui/motion-footer';

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Paths where global Navbar and Footer should NOT be rendered
  const hideLayoutPaths = [
    '/user/dashboard',
    '/superadmin',
    '/admin',
    '/gym-owner',
    '/corporate',
    '/login',
    '/register'
  ];

  const shouldHideLayout = hideLayoutPaths.some(path => pathname?.startsWith(path));

  if (shouldHideLayout) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col relative z-10 w-full bg-zinc-950 rounded-b-3xl shadow-2xl border-b border-white/5">
        {children}
      </main>
      <CinematicFooter />
    </>
  );
}
