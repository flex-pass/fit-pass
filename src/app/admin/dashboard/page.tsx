'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { mockGyms, mockCheckins, creditPlans } from '@/lib/api';
import { 
  ShieldCheck, 
  BarChart3, 
  AlertOctagon, 
  CheckCircle2, 
  XCircle, 
  Users, 
  Dumbbell, 
  Menu, 
  X, 
  Settings, 
  LogOut, 
  Calendar, 
  CircleDollarSign, 
  MapPin, 
  Activity, 
  Bell, 
  HelpCircle,
  TrendingUp,
  Sliders,
  DollarSign
} from 'lucide-react';
import Link from 'next/link';

type AdminTabType =
  | 'dashboard'
  | 'checkins'
  | 'bookings'
  | 'members'
  | 'plans'
  | 'passes'
  | 'payouts'
  | 'profile'
  | 'staff'
  | 'notification'
  | 'support'
  | 'settings';

export default function AdminDashboard() {
  const router = useRouter();
  const { session, role, logout } = useAuth();
  
  // Tab states
  const [activeTab, setActiveTab] = useState<AdminTabType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Gym state for approvals sandbox
  const [gymList, setGymList] = useState(mockGyms);

  // Settings State
  const [adminName, setAdminName] = useState(session?.name || 'Super Admin');
  const [adminEmail, setAdminEmail] = useState(session?.email || 'admin@flexpass.in');
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Redirect to home if unauthorized
  useEffect(() => {
    if (role !== 'admin' || !session) {
      router.push('/');
    }
  }, [role, session, router]);

  if (role !== 'admin' || !session) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleApproveGym = (id: string, approve: boolean) => {
    setGymList(prev => prev.map(gym => gym.id === id ? { ...gym, is_approved: approve } : gym));
  };

  const fraudLogs = mockCheckins.filter(c => c.status === 'fraud');

  const menuItems = [
    { id: 'dashboard' as AdminTabType, label: 'Dashboard', icon: BarChart3 },
    { id: 'checkins' as AdminTabType, label: 'Checkins', icon: Activity },
    { id: 'bookings' as AdminTabType, label: 'Bookings', icon: Calendar },
    { id: 'members' as AdminTabType, label: 'Members', icon: Users },
    { id: 'plans' as AdminTabType, label: 'Plans & Pricing', icon: Sliders },
    { id: 'passes' as AdminTabType, label: 'Passes and credits', icon: Dumbbell },
    { id: 'payouts' as AdminTabType, label: 'Payouts', icon: CircleDollarSign },
    { id: 'profile' as AdminTabType, label: 'Gym Profile', icon: MapPin },
    { id: 'staff' as AdminTabType, label: 'Staff Management', icon: ShieldCheck },
    { id: 'notification' as AdminTabType, label: 'Notification', icon: Bell },
    { id: 'support' as AdminTabType, label: 'Support', icon: HelpCircle },
    { id: 'settings' as AdminTabType, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col md:flex-row relative">
      
      {/* Mobile Topbar */}
      <div className="md:hidden w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 p-4 flex justify-between items-center z-30">
        <div className="flex items-center gap-2 font-bold text-lg text-brand-primary tracking-tight">
          <div className="p-1.5 bg-brand-primary rounded-lg text-white">
            <Dumbbell className="h-4 w-4" />
          </div>
          <span>FLEX<span className="text-zinc-950 dark:text-white font-medium">PASS</span></span>
        </div>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400 cursor-pointer"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Sidebar navigation */}
      <aside className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 z-40 transition-transform flex flex-col justify-between ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        {/* Logo Header aligned with topbar */}
        <div className="hidden md:flex items-center h-[70px] px-6 border-b border-zinc-200 dark:border-zinc-800 gap-2.5 font-bold text-xl text-brand-primary tracking-tight shrink-0">
          <div className="p-2 bg-brand-primary rounded-xl text-white">
            <Dumbbell className="h-5 w-5" />
          </div>
          <span>FLEX<span className="text-zinc-950 dark:text-white font-medium">PASS</span></span>
        </div>

        <div className="p-6 flex-1 overflow-y-auto space-y-6 scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {/* Menu Items */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === item.id
                      ? 'bg-brand-primary text-white shadow-md'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50'
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Logout at bottom */}
        <div className="p-3 border-t border-zinc-150 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="h-4.5 w-4.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar Banner */}
        <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-6 h-[70px] flex flex-col sm:flex-row justify-between items-center gap-4 z-20 shadow-xs shrink-0">
          <div className="text-left">
            <h2 className="text-lg font-extrabold text-zinc-900 dark:text-white capitalize">
              {menuItems.find(m => m.id === activeTab)?.label}
            </h2>
            <p className="text-[10px] text-zinc-450 dark:text-zinc-550">
              FlexPass Console Control Panel
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Super Admin</span>
            </div>

            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="h-8 w-8 rounded-full bg-brand-primary hover:bg-brand-secondary text-white font-bold text-xs flex items-center justify-center shadow-sm cursor-pointer transition-transform hover:scale-105"
              >
                AD
              </button>
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg py-1 z-35 text-left">
                  <div className="px-4 py-2 border-b border-zinc-150 dark:border-zinc-800">
                    <p className="text-xs font-bold text-zinc-900 dark:text-white">{adminName}</p>
                    <p className="text-[10px] text-zinc-550 truncate">{adminEmail}</p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('settings');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center gap-2 cursor-pointer"
                  >
                    <Settings className="h-3.5 w-3.5" />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-rose-500 hover:bg-rose-500/10 flex items-center gap-2 border-t border-zinc-150 dark:border-zinc-800 cursor-pointer"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Panel Wrapper */}
        <main className="flex-1 p-6 overflow-y-auto max-w-7xl w-full mx-auto space-y-6">
          
          {/* TAB: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Aggregated Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl space-y-1 text-left shadow-sm">
                  <span className="text-[10px] text-zinc-400 uppercase block font-semibold">Total GMV</span>
                  <span className="text-2xl font-extrabold text-zinc-900 dark:text-white">Rs 4,82,000</span>
                  <span className="text-[10px] text-emerald-500 block">+14% vs last month</span>
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl space-y-1 text-left shadow-sm">
                  <span className="text-[10px] text-zinc-400 uppercase block font-semibold">Active Subscriptions</span>
                  <span className="text-2xl font-extrabold text-brand-primary">1,248 Users</span>
                  <span className="text-[10px] text-zinc-500 block">30% breakage percentage</span>
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl space-y-1 text-left shadow-sm">
                  <span className="text-[10px] text-zinc-400 uppercase block font-semibold">Active partner Gyms</span>
                  <span className="text-2xl font-extrabold text-zinc-900 dark:text-white">78 Gyms</span>
                  <span className="text-[10px] text-zinc-500 block">5 pending approvals</span>
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl space-y-1 text-left shadow-sm">
                  <span className="text-[10px] text-zinc-400 uppercase block font-semibold">Fraud Alerts</span>
                  <span className="text-2xl font-extrabold text-rose-500">{fraudLogs.length} Triggered</span>
                  <span className="text-[10px] text-zinc-500 block">p99 scanning speed: 120ms</span>
                </div>
              </div>

              {/* Gym Queue & Fraud Alerts */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
                  <div className="p-5 border-b border-zinc-150 dark:border-zinc-800 flex justify-between items-center">
                    <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Partner Gym Approval Queue</h3>
                    <span className="text-xs text-zinc-500">Real-time status</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-150 dark:border-zinc-800 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
                          <th className="p-4">Gym Name</th>
                          <th className="p-4">Location</th>
                          <th className="p-4">Tier Level</th>
                          <th className="p-4">Registration</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-150 dark:divide-zinc-805">
                        {gymList.map((gym) => (
                          <tr key={gym.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850/50">
                            <td className="p-4 font-bold text-zinc-900 dark:text-zinc-100">{gym.name}</td>
                            <td className="p-4 text-zinc-500 text-xs">{gym.address.split(',')[1]}</td>
                            <td className="p-4 text-xs">Tier {gym.tier}</td>
                            <td className="p-4">
                              <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                gym.is_approved 
                                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500' 
                                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-500'
                              }`}>
                                {gym.is_approved ? 'Approved' : 'Pending'}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              {gym.is_approved ? (
                                <button
                                  onClick={() => handleApproveGym(gym.id, false)}
                                  className="text-rose-500 hover:text-rose-650 font-bold text-[11px] px-2.5 py-1 rounded-lg border border-rose-200 dark:border-rose-900/20 hover:bg-rose-50 dark:hover:bg-rose-950/20 cursor-pointer"
                                >
                                  Suspend
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleApproveGym(gym.id, true)}
                                  className="text-emerald-600 hover:text-emerald-700 font-bold text-[11px] px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-900/20 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 cursor-pointer"
                                >
                                  Approve
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 text-rose-500 font-bold text-sm">
                    <AlertOctagon className="h-5 w-5 animate-pulse" />
                    <span>Fraud Incident Monitor</span>
                  </div>
                  <p className="text-zinc-500 text-xs text-left">Flagging duplicate scans or suspicious GPS coordinates checks.</p>

                  <div className="space-y-3 pt-2">
                    {fraudLogs.map((log) => (
                      <div key={log.id} className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl space-y-1 text-left text-xs">
                        <div className="flex justify-between items-center font-bold text-rose-600">
                          <span>DUPLICATE TOKEN SCAN</span>
                          <span>{log.time}</span>
                        </div>
                        <p className="text-zinc-700 dark:text-zinc-300">User <b>{log.userName}</b> attempted scan twice at {log.gymName}.</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: CHECKINS */}
          {activeTab === 'checkins' && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm text-left">
              <div className="p-6 border-b border-zinc-150 dark:border-zinc-800">
                <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Active System Checkins</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-150 dark:border-zinc-800 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
                      <th className="p-4">Time</th>
                      <th className="p-4">User Name</th>
                      <th className="p-4">Gym Club</th>
                      <th className="p-4">Credits Deducted</th>
                      <th className="p-4">Earnings Generated</th>
                      <th className="p-4">Verification Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-150 dark:divide-zinc-800">
                    {mockCheckins.map((c) => (
                      <tr key={c.id}>
                        <td className="p-4 text-zinc-500">{c.time}</td>
                        <td className="p-4 font-bold">{c.userName}</td>
                        <td className="p-4 text-zinc-650">{c.gymName}</td>
                        <td className="p-4 font-bold text-brand-primary">-{c.creditsUsed} Credits</td>
                        <td className="p-4 font-bold text-brand-accent">Rs {c.earnings}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            c.status === 'success' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'
                          }`}>
                            {c.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: BOOKINGS */}
          {activeTab === 'bookings' && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden p-6 shadow-sm text-left space-y-4">
              <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Pass Slot Bookings</h3>
              <p className="text-xs text-zinc-500">List of scheduled check-in slot bookings for partner gyms.</p>
              
              <div className="divide-y divide-zinc-150 dark:divide-zinc-800">
                {mockCheckins.map((booking, idx) => (
                  <div key={idx} className="py-4 flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-zinc-900 dark:text-zinc-100">{booking.gymName}</p>
                      <p className="text-zinc-400 mt-0.5">Reserved by: {booking.userName}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-brand-primary block">{booking.creditsUsed} Credits</span>
                      <span className="text-[10px] text-zinc-550 block mt-0.5">Session: {booking.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: MEMBERS */}
          {activeTab === 'members' && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm text-left space-y-4">
              <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Active Members Directory</h3>
              <p className="text-xs text-zinc-500">Database of users currently subscribed to platform credit passes.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  { name: 'Rahul Kumar', email: 'rahul.k@example.com', plan: 'Standard', credits: 42, city: 'Noida' },
                  { name: 'Priya Sharma', email: 'priya.s@example.com', plan: 'Premium', credits: 85, city: 'Delhi' },
                  { name: 'Amit Verma', email: 'amit.v@example.com', plan: 'Basic', credits: 12, city: 'Noida' },
                  { name: 'Neha Gupta', email: 'neha.g@example.com', plan: 'Standard', credits: 50, city: 'Gurugram' },
                ].map((member, idx) => (
                  <div key={idx} className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-850 p-4 rounded-2xl flex justify-between items-center text-xs">
                    <div className="space-y-0.5">
                      <p className="font-bold text-zinc-900 dark:text-zinc-150">{member.name}</p>
                      <p className="text-zinc-450">{member.email} • {member.city}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <span className="bg-brand-primary/10 text-brand-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {member.plan} Plan
                      </span>
                      <span className="text-[10px] text-zinc-500 block">{member.credits} Credits left</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: PLANS & PRICING */}
          {activeTab === 'plans' && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm text-left space-y-6">
              <div>
                <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Subscription Plan Tiers</h3>
                <p className="text-xs text-zinc-500 mt-1">Configure pricing packages and credit quotas for end users.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {creditPlans.map((plan) => (
                  <div key={plan.id} className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-sm capitalize">{plan.name}</h4>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">Active</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-extrabold text-zinc-900 dark:text-white">₹{plan.price}</span>
                      <span className="text-[10px] text-zinc-400 uppercase font-bold">/ month</span>
                    </div>
                    <div className="text-xs space-y-1.5 pt-2 border-t border-zinc-150 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
                      <p>• {plan.credits} Monthly Credits quota</p>
                      <p>• ₹{plan.costPerCredit} cost per credit rate</p>
                      <p>• Max {plan.rollover} credits rollover limit</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: PASSES AND CREDITS */}
          {activeTab === 'passes' && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm text-left space-y-4">
              <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Passes & Credits Ledger</h3>
              <p className="text-xs text-zinc-500">Financial allocation summary of booster packs purchased in current cycle.</p>
              
              <div className="space-y-3 pt-2">
                {[
                  { name: 'Rahul Kumar', pack: '10 Credits top-up', price: 500, time: '10:14 AM' },
                  { name: 'Priya Sharma', pack: '50 Credits top-up', price: 2000, time: 'Yesterday' },
                  { name: 'Amit Verma', pack: '25 Credits top-up', price: 1125, time: '2 days ago' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-850 rounded-2xl flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-zinc-950 dark:text-white">{item.pack}</p>
                      <p className="text-zinc-500 text-[10px] mt-0.5">Purchased by: {item.name} • {item.time}</p>
                    </div>
                    <span className="font-extrabold text-emerald-600 text-sm">₹{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: PAYOUTS */}
          {activeTab === 'payouts' && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm text-left">
              <div className="p-6 border-b border-zinc-150 dark:border-zinc-800 flex justify-between items-center">
                <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Gym Owner Payouts</h3>
                <span className="text-xs text-zinc-550">Billed bi-weekly</span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-150 dark:border-zinc-800 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
                      <th className="p-4">Partner Gym</th>
                      <th className="p-4">Rating Score</th>
                      <th className="p-4">Visits Logged</th>
                      <th className="p-4">Total Revenue</th>
                      <th className="p-4">Settlement Payout</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-150 dark:divide-zinc-800">
                    {[
                      { name: "Gold's Gym (Sector 62)", visits: 45, revenue: 13500, payout: 9450, rating: 4.8, status: 'Settled' },
                      { name: "FitLine Fitness (Sector 18)", visits: 28, revenue: 8400, payout: 5880, rating: 4.5, status: 'Pending' },
                      { name: "The Iron Temple (Sector 76)", visits: 19, revenue: 3800, payout: 2660, rating: 4.2, status: 'Pending' },
                    ].map((gym, idx) => (
                      <tr key={idx}>
                        <td className="p-4 font-bold text-zinc-900 dark:text-zinc-100">{gym.name}</td>
                        <td className="p-4">{gym.rating} ★</td>
                        <td className="p-4">{gym.visits} checkins</td>
                        <td className="p-4 font-semibold text-zinc-600 dark:text-zinc-400">Rs {gym.revenue}</td>
                        <td className="p-4 font-extrabold text-brand-primary">Rs {gym.payout}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            gym.status === 'Settled' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'
                          }`}>
                            {gym.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: PROFILE */}
          {activeTab === 'profile' && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm text-left space-y-4">
              <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Gym Network Locations</h3>
              <p className="text-xs text-zinc-500">Configure regional details and locations of partner health club outlets.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gymList.map((gym) => (
                  <div key={gym.id} className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-850 rounded-2xl flex justify-between items-center text-xs">
                    <div className="space-y-1">
                      <p className="font-bold text-zinc-950 dark:text-white">{gym.name}</p>
                      <p className="text-zinc-450">{gym.address}</p>
                    </div>
                    <span className="text-zinc-400 shrink-0 font-bold ml-2">Tier {gym.tier}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: STAFF MANAGEMENT */}
          {activeTab === 'staff' && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm text-left space-y-4">
              <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Admin Staff Members</h3>
              <p className="text-xs text-zinc-500">Directory of administrators with console check-in verification authority.</p>
              
              <div className="space-y-3">
                {[
                  { name: 'Vikram Singh', role: 'Regional Manager (Noida)', status: 'Active' },
                  { name: 'Amit Sharma', role: 'Counter Supervisor (Sec 62)', status: 'Active' },
                  { name: 'Neha Gupta', role: 'Billing Operator', status: 'Offline' },
                ].map((staff, idx) => (
                  <div key={idx} className="p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-850 rounded-2xl flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-zinc-950 dark:text-white">{staff.name}</p>
                      <p className="text-zinc-450 text-[10px] mt-0.5">{staff.role}</p>
                    </div>
                    <span className={`text-[10px] font-bold ${staff.status === 'Active' ? 'text-emerald-600' : 'text-zinc-400'}`}>
                      {staff.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: NOTIFICATION */}
          {activeTab === 'notification' && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm text-left space-y-4">
              <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Admin Notifications</h3>
              
              <div className="space-y-3">
                {[
                  { title: 'New Gym Partner Request', desc: "Ozone Gym Noida Sec 51 applied to join the network.", time: '10 min ago' },
                  { title: 'Payout Scheduled', desc: 'Settlements payouts of Rs 9,450 sent to Gold\'s Gym billing.', time: '2 hours ago' },
                  { title: 'Fraud Alert Triggered', desc: 'GPS mismatch alert triggered for token check-in Sec 137.', time: 'Yesterday' },
                ].map((n, idx) => (
                  <div key={idx} className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-850 rounded-2xl space-y-1 text-xs">
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-zinc-950 dark:text-white">{n.title}</p>
                      <span className="text-[10px] text-zinc-450">{n.time}</span>
                    </div>
                    <p className="text-zinc-650 dark:text-zinc-400">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SUPPORT */}
          {activeTab === 'support' && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm text-left space-y-4">
              <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Member Support Tickets</h3>
              
              <div className="space-y-3">
                {[
                  { name: 'Rahul Kumar', issue: 'Gym QR Scan Error (Gold\'s Gym)', time: 'Today 9:45 AM', status: 'Open' },
                  { name: 'Amit Verma', issue: 'Booster credits payment refund query', time: 'Yesterday', status: 'Closed' },
                ].map((ticket, idx) => (
                  <div key={idx} className="p-3.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-850 rounded-2xl flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-zinc-950 dark:text-white">{ticket.issue}</p>
                      <p className="text-zinc-450 text-[10px] mt-0.5">From: {ticket.name} • Received: {ticket.time}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      ticket.status === 'Open' ? 'bg-amber-500/15 text-amber-600' : 'bg-zinc-200 text-zinc-500 dark:bg-zinc-800'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm text-left space-y-6 max-w-2xl">
              <div>
                <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Console Settings</h3>
                <p className="text-xs text-zinc-500 mt-1">Configure administrator login preferences and regional parameters.</p>
              </div>

              {settingsSaved && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs rounded-xl font-semibold text-center">
                  Admin preferences saved successfully.
                </div>
              )}

              <form onSubmit={(e) => { e.preventDefault(); setSettingsSaved(true); setTimeout(() => setSettingsSaved(false), 3000); }} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase">Admin Profile Name</label>
                  <input 
                    type="text"
                    required
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-brand-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase">Admin Email Address</label>
                  <input 
                    type="email"
                    required
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-brand-primary/50"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-3 bg-brand-primary hover:bg-brand-secondary text-white font-bold rounded-xl text-xs cursor-pointer shadow-sm"
                >
                  Save Console Profile
                </button>
              </form>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
