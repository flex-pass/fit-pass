'use client';

import React, { useEffect, useState } from 'react';
import { adminService } from '@/lib/api';

interface UserData {
  name: string;
  email: string;
  plan_type?: string;
  credits_balance?: number;
  phone_number?: string;
  city?: string;
}

export default function UsersList() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await adminService.getUsers();
        if (response?.success && Array.isArray(response?.data)) {
          setUsers(response.data);
        } else {
          setError('Failed to load users list from API.');
        }
      } catch (err: any) {
        console.error('Error fetching users:', err);
        setError(err.response?.data?.message || err.message || 'Error occurred while fetching users.');
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-primary mx-auto mb-4"></div>
        <p className="text-zinc-550 text-xs">Loading users from backend...</p>
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
          <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Registered FitPass Users</h3>
          <p className="text-zinc-400 text-[10px] mt-0.5">Directory of active platform members</p>
        </div>
        <span className="text-[10px] font-bold bg-brand-primary/10 text-brand-primary px-2.5 py-1 rounded-full border border-brand-primary/20">
          {users.length} Users Total
        </span>
      </div>
      
      {users.length === 0 ? (
        <p className="text-center text-xs text-zinc-500 py-12">No users found in the database.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-950/50 border-b border-zinc-150 dark:border-zinc-800 text-zinc-450 dark:text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4 pl-6">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone Number</th>
                <th className="p-4">Current Plan</th>
                <th className="p-4 pr-6 text-right">Credits Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-150 dark:divide-zinc-800/60">
              {users.map((member, idx) => (
                <tr key={idx} className="hover:bg-zinc-50/40 dark:hover:bg-zinc-850/10 transition-colors">
                  <td className="p-4 pl-6 font-bold text-zinc-900 dark:text-zinc-100">{member.name}</td>
                  <td className="p-4 text-zinc-550 dark:text-zinc-400">{member.email}</td>
                  <td className="p-4 text-zinc-500 dark:text-zinc-450">{member.phone_number || '—'}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-primary/10 text-brand-primary border border-brand-primary/25 capitalize">
                      {member.plan_type ? member.plan_type.toLowerCase().replace('_', ' ') : 'no plan'}
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right font-extrabold text-zinc-950 dark:text-white">
                    {member.credits_balance ?? 0} Credits
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
