'use client';

import React from 'react';
import { useAuth } from '@/lib/auth';
import { Building, Users, Calendar, ArrowRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function CorporateHRDashboard() {
  const { session, role, loginAs } = useAuth();

  if (role !== 'corporate-hr' || !session) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-lg space-y-4">
        <h3 className="text-xl font-bold text-zinc-950 dark:text-white">Corporate HR Mock Sandbox</h3>
        <p className="text-zinc-500 text-xs">
          Please select the <b>Corporate HR</b> role in the sandbox switcher to view this page.
        </p>
        <button
          onClick={() => loginAs('corporate-hr')}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all cursor-pointer"
        >
          Login as HR Admin
        </button>
      </div>
    );
  }

  const invoiceHistory = [
    { invoice: 'FP-INV-2026-06', period: 'June 2026 Cycle', activeSeats: 48, totalAmount: 'Rs 24,000', status: 'Paid' },
    { invoice: 'FP-INV-2026-05', period: 'May 2026 Cycle', activeSeats: 45, totalAmount: 'Rs 22,500', status: 'Paid' },
    { invoice: 'FP-INV-2026-04', period: 'April 2026 Cycle', activeSeats: 40, totalAmount: 'Rs 20,000', status: 'Paid' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-left space-y-1">
        <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-500 uppercase bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
          Corporate Administrator Portal
        </span>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white mt-2">
          {session.companyName} Management
        </h1>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 p-6 rounded-2xl flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-xs text-zinc-400 block uppercase font-semibold">Allocated Seats</span>
            <span className="text-3xl font-extrabold text-indigo-650">48 / 60 Seats</span>
            <span className="text-[10px] text-zinc-500 block">12 seats remaining</span>
          </div>
          <div className="p-3 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 rounded-xl">
            <Users className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 p-6 rounded-2xl flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-xs text-zinc-400 block uppercase font-semibold">Active Utilization</span>
            <span className="text-3xl font-extrabold text-zinc-900 dark:text-white">82%</span>
            <span className="text-[10px] text-emerald-500 block">39 employees active today</span>
          </div>
          <div className="p-3 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500 rounded-xl">
            <TrendingUp className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 p-6 rounded-2xl flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-xs text-zinc-400 block uppercase font-semibold">Current Month Cost</span>
            <span className="text-3xl font-extrabold text-zinc-900 dark:text-white">Rs 24,000</span>
            <span className="text-[10px] text-zinc-500 block">Billed at Rs 500/employee</span>
          </div>
          <div className="p-3 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 rounded-xl">
            <Building className="h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Quick actions & employees shortcut */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-extrabold text-lg text-zinc-900 dark:text-white">Quick Actions</h3>
            <p className="text-xs text-zinc-500">Add or manage employee allocations for your group.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/corporate/employees"
                className="p-4 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-950 rounded-xl border border-indigo-200/20 text-center font-bold text-xs text-indigo-600 dark:text-indigo-400"
              >
                Manage Employees list
              </Link>
              <Link
                href="/corporate/employees?invite=true"
                className="p-4 bg-zinc-950 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 rounded-xl text-center font-bold text-xs text-white dark:text-zinc-950"
              >
                Bulk Invite CSV
              </Link>
            </div>
          </div>
        </div>

        {/* Invoice table */}
        <div className="lg:col-span-6 space-y-6">
          <h3 className="font-extrabold text-lg text-zinc-900 dark:text-white">Invoice & Billing Cycle</h3>
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-150 dark:border-zinc-800 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="p-3">Invoice ID</th>
                    <th className="p-3">Active Seats</th>
                    <th className="p-3">Bill Amount</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-150 dark:divide-zinc-800">
                  {invoiceHistory.map((item, idx) => (
                    <tr key={idx}>
                      <td className="p-3 font-semibold">{item.invoice}</td>
                      <td className="p-3">{item.activeSeats} Seats</td>
                      <td className="p-3 font-bold">{item.totalAmount}</td>
                      <td className="p-3">
                        <span className="inline-flex px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 font-bold text-[9px]">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
