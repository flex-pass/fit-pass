'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, RefreshCw, AlertCircle, RefreshCwOff } from 'lucide-react';

interface QrDisplayProps {
  gymName: string;
  creditsToDeduct: number;
  onRefresh?: () => void;
}

export default function QrDisplay({ gymName, creditsToDeduct, onRefresh }: QrDisplayProps) {
  const [timeLeft, setTimeLeft] = useState(15);
  const [token, setToken] = useState('flexpass_secure_token_init_rand_' + Math.random().toString(36).substr(2, 9));
  const [screenshotDetected, setScreenshotDetected] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Trigger refresh
          setToken('flexpass_secure_token_rand_' + Math.random().toString(36).substr(2, 9));
          if (onRefresh) onRefresh();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onRefresh]);

  const forceRefresh = () => {
    setToken('flexpass_secure_token_forced_' + Math.random().toString(36).substr(2, 9));
    setTimeLeft(15);
    if (onRefresh) onRefresh();
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-6 max-w-sm mx-auto w-full text-center relative select-none">
      {/* Anti-screenshot floating alert message */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-rose-500/10 text-rose-500 dark:text-rose-400 text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full border border-rose-500/20 animate-pulse">
        Liveness Active • No Screenshots
      </div>

      <div className="mt-4">
        <h4 className="font-bold text-lg text-zinc-950 dark:text-zinc-50">{gymName}</h4>
        <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1">Scan at check-in counter</p>
      </div>

      {/* QR Code Container */}
      <div className="my-6 relative flex items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-100 dark:border-zinc-800/80">
        {/* Anti-Screenshot grid overlay (will visually look weird in screenshots due to high contrast layout) */}
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4px_4px]" />
        
        {/* Simple mock QR pattern in SVG */}
        <svg className="w-56 h-56 text-zinc-950 dark:text-zinc-50" viewBox="0 0 100 100">
          {/* Border anchors */}
          <rect x="5" y="5" width="20" height="20" fill="currentColor" />
          <rect x="8" y="8" width="14" height="14" fill="white" />
          <rect x="11" y="11" width="8" height="8" fill="currentColor" />

          <rect x="75" y="5" width="20" height="20" fill="currentColor" />
          <rect x="78" y="8" width="14" height="14" fill="white" />
          <rect x="81" y="11" width="8" height="8" fill="currentColor" />

          <rect x="5" y="75" width="20" height="20" fill="currentColor" />
          <rect x="8" y="78" width="14" height="14" fill="white" />
          <rect x="11" y="81" width="8" height="8" fill="currentColor" />

          {/* Random pattern blocks simulated using QR hashes */}
          <g fill="currentColor" opacity="0.85">
            <rect x="35" y="10" width="5" height="15" />
            <rect x="45" y="5" width="10" height="5" />
            <rect x="60" y="15" width="10" height="10" />
            <rect x="30" y="30" width="20" height="5" />
            <rect x="10" y="40" width="15" height="15" />
            <rect x="55" y="35" width="35" height="5" />
            <rect x="35" y="45" width="10" height="20" />
            <rect x="70" y="50" width="15" height="15" />
            <rect x="50" y="70" width="20" height="5" />
            <rect x="30" y="80" width="5" height="15" />
            <rect x="80" y="75" width="10" height="10" />
            <rect x="85" y="85" width="10" height="10" />
            <rect x="15" y="60" width="5" height="5" />
            <rect x="55" y="55" width="10" height="10" />
          </g>

          {/* Center verification badge */}
          <rect x="42" y="42" width="16" height="16" fill="white" rx="2" />
          <g transform="translate(44, 44)">
            <svg viewBox="0 0 24 24" width="12" height="12" className="text-brand-primary">
              <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </g>
        </svg>

        {/* Live token hash overlay for high-tech liveness vibe */}
        <div className="absolute bottom-2 font-mono text-[9px] text-zinc-400 dark:text-zinc-500 bg-white dark:bg-zinc-900 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800">
          TOKEN: {token.substring(0, 16)}...
        </div>
      </div>

      {/* Expire Countdown Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <span className="flex items-center gap-1">
            <RefreshCw className="h-3 w-3 animate-spin text-brand-primary" />
            <span>Refreshes automatically</span>
          </span>
          <span className="font-bold text-zinc-800 dark:text-zinc-200">Expires in: {timeLeft}s</span>
        </div>
        <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-brand-primary h-full transition-all duration-1000"
            style={{ width: `${(timeLeft / 15) * 100}%` }}
          />
        </div>
      </div>

      {/* Credit pricing statement */}
      <div className="mt-6 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
        <div className="text-left">
          <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Estimated deduction</span>
          <span className="text-base font-extrabold text-zinc-900 dark:text-zinc-50">{creditsToDeduct} Credits</span>
        </div>
        <button
          onClick={forceRefresh}
          className="p-2 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs font-semibold text-zinc-700 dark:text-zinc-200 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Refresh Now</span>
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-zinc-400">
        <AlertCircle className="h-3 w-3" />
        <span>Token valid for 1 check-in today</span>
      </div>
    </div>
  );
}
