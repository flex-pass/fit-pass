'use client';

import React, { useEffect, useState } from 'react';
import { adminService } from '@/lib/api';

interface AdminData {
  name: string;
  email: string;
  phone_number?: string;
  city?: string;
  is_active?: boolean;
}

export default function OwnersList() {
  const [owners, setOwners] = useState<AdminData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function fetchAdmins() {
      try {
        const response = await adminService.getAdmins();
        if (response?.success && Array.isArray(response?.data)) {
          setOwners(response.data);
        } else {
          setError('Failed to load partners from API.');
        }
      } catch (err: any) {
        console.error('Error fetching admins:', err);
        setError(err.response?.data?.message || err.message || 'Error occurred while fetching admins.');
      } finally {
        setLoading(false);
      }
    }
    fetchAdmins();
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 text-center animate-fade-in">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-primary mx-auto mb-4"></div>
        <p className="text-zinc-550 text-xs">Loading gym partners from backend...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 text-center text-rose-500 text-xs">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-xs text-left animate-fade-in">
      <div className="p-6 border-b border-zinc-150 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/20 dark:bg-zinc-900/20">
        <div>
          <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Gym Owner Partners</h3>
          <p className="text-zinc-400 text-[10px] mt-0.5">Directory of registered gym administrators</p>
        </div>
        <span className="text-[10px] font-bold bg-brand-primary/10 text-brand-primary px-2.5 py-1 rounded-full border border-brand-primary/20">
          {owners.length} Partners Total
        </span>
      </div>

      {owners.length === 0 ? (
        <p className="text-center text-xs text-zinc-500 py-12">No gym partners found in the database.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-950/50 border-b border-zinc-150 dark:border-zinc-800 text-zinc-450 dark:text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4 pl-6">Partner Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone Number</th>
                <th className="p-4">City</th>
                <th className="p-4 pr-6 text-right">Verification Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-150 dark:divide-zinc-800/60">
              {owners.map((owner, idx) => (
                <tr key={idx} className="hover:bg-zinc-50/40 dark:hover:bg-zinc-850/10 transition-colors">
                  <td className="p-4 pl-6 font-bold text-zinc-900 dark:text-zinc-100">{owner.name}</td>
                  <td className="p-4 text-zinc-550 dark:text-zinc-400">{owner.email}</td>
                  <td className="p-4 text-zinc-500 dark:text-zinc-450">{owner.phone_number || '—'}</td>
                  <td className="p-4 capitalize text-zinc-500 dark:text-zinc-450">{owner.city || '—'}</td>
                  <td className="p-4 pr-6 text-right">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      owner.is_active !== false
                        ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/25'
                        : 'bg-zinc-200 text-zinc-500 dark:bg-zinc-800 border-zinc-700'
                    }`}>
                      {owner.is_active !== false ? 'Verified Partner' : 'Suspended'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
