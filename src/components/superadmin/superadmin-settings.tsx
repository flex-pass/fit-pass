'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth';

export default function SuperadminSettings() {
  const { session } = useAuth();
  const [adminName, setAdminName] = useState(session?.name || 'Super Admin');
  const [adminEmail, setAdminEmail] = useState(session?.email || 'superadmin@flexpass.in');
  const [settingsSaved, setSettingsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xs text-left space-y-6 max-w-2xl">
      <div>
        <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Super Admin Settings</h3>
        <p className="text-xs text-zinc-500 mt-1">Configure console credentials and administrative values.</p>
      </div>

      {settingsSaved && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs rounded-xl font-semibold text-center">
          Settings saved successfully.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase">Admin Display Name</label>
          <input 
            type="text"
            required
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
            className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-brand-primary/50"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase">Admin Email Address</label>
          <input 
            type="email"
            required
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-brand-primary/50"
          />
        </div>
        <button 
          type="submit"
          className="w-full py-3 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold rounded-xl text-xs cursor-pointer shadow-xs"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}
