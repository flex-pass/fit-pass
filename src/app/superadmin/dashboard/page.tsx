'use client';

import React from 'react';
import { useAdminOverview, usePendingGyms } from '@/lib/hooks';
import { adminService } from '@/lib/api';

export default function SuperAdminDashboard() {
  const { stats, loading: statsLoading } = useAdminOverview();
  const { gyms: pendingGyms, loading: gymsLoading, refetch: refetchGyms } = usePendingGyms();

  const handleApproveGym = async (id: string, approve: boolean) => {
    if (approve) {
      try {
        await adminService.approveGym(id);
        refetchGyms();
        alert('Gym approved successfully');
      } catch (err) {
        alert('Failed to approve gym');
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl space-y-1 text-left shadow-sm">
          <span className="text-[10px] text-zinc-400 uppercase block font-semibold">Total Admins (Gym Owners)</span>
          <span className="text-2xl font-extrabold text-brand-primary">{statsLoading ? '...' : stats?.totalAdmins || 0}</span>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl space-y-1 text-left shadow-sm">
          <span className="text-[10px] text-zinc-400 uppercase block font-semibold">Total Users</span>
          <span className="text-2xl font-extrabold text-zinc-900 dark:text-white">{statsLoading ? '...' : stats?.totalUsers || 0}</span>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl space-y-1 text-left shadow-sm">
          <span className="text-[10px] text-zinc-400 uppercase block font-semibold">Total Recharge Amounts</span>
          <span className="text-2xl font-extrabold text-emerald-500">₹{statsLoading ? '...' : stats?.totalRechargeAmount || 0}</span>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl space-y-1 text-left shadow-sm">
          <span className="text-[10px] text-zinc-400 uppercase block font-semibold">Pending Onboardings</span>
          <span className="text-2xl font-extrabold text-amber-500">{statsLoading ? '...' : stats?.pendingOnboardings || 0}</span>
        </div>
      </div>

      {/* Pending Onboardings Quick View */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-zinc-150 dark:border-zinc-800 flex justify-between items-center">
          <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Partner Gym Approval Queue</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-150 dark:border-zinc-800 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4">Gym Name</th>
                <th className="p-4">Location</th>
                <th className="p-4">Tier Level</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-150 dark:divide-zinc-805">
              {gymsLoading ? (
                  <tr><td colSpan={4} className="p-4 text-zinc-500">Loading pending gyms...</td></tr>
              ) : pendingGyms.length === 0 ? (
                <tr><td colSpan={4} className="p-4 text-zinc-500">No pending approvals.</td></tr>
              ) : pendingGyms.map((gym: any) => (
                <tr key={gym.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850/50">
                  <td className="p-4 font-bold text-zinc-900 dark:text-zinc-100">{gym.name}</td>
                  <td className="p-4 text-zinc-500 text-xs">{gym.address?.split(',')[1] || gym.address}</td>
                  <td className="p-4 text-xs">Tier {gym.tier}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleApproveGym(gym.id, true)}
                      className="text-emerald-600 hover:text-emerald-700 font-bold text-[11px] px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-900/20 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 cursor-pointer"
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
