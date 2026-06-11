import React from 'react';
import Link from 'next/link';
import QrDisplay from '@/components/qr-display';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

interface PageProps {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ gymName?: string; cost?: string }>;
}

export default async function CheckinTokenPage({ params, searchParams }: PageProps) {
  const { token } = await params;
  const sParams = await searchParams;
  const gymName = sParams.gymName || "Gold's Gym Noida";
  const cost = Number(sParams.cost || 8);

  return (
    <div className="max-w-md mx-auto my-12 px-4 sm:px-6 space-y-6">
      {/* Back to Explore */}
      <Link
        href="/explore"
        className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-100 group"
      >
        <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
        <span>Back to map explorer</span>
      </Link>

      {/* QR Code Verification Window */}
      <QrDisplay
        gymName={gymName}
        creditsToDeduct={cost}
      />

      {/* Redirect to User Dashboard link */}
      <div className="text-center pt-2">
        <Link
          href="/dashboard"
          className="text-xs font-bold text-brand-primary hover:underline inline-flex items-center gap-1"
        >
          <span>Go to User Dashboard</span>
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
