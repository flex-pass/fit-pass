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
  Sliders,
  DollarSign,
  ChevronRight,
  Home,
  Briefcase,
  Layers,
  FileText,
  RefreshCw,
  Terminal,
  UserCheck
} from 'lucide-react';
import Link from 'next/link';

type SuperAdminTabType =
  // Main
  | 'dashboard'
  // Management
  | 'users'
  | 'owners'
  | 'gyms'
  | 'plans'
  | 'credits'
  | 'checkins'
  // Financial
  | 'payments'
  | 'payouts'
  | 'refunds'
  | 'reports'
  // System
  | 'support'
  | 'notifications'
  | 'logs'
  | 'settings';

export default function SuperAdminDashboard() {
  const router = useRouter();
  const { session, role, logout } = useAuth();
  
  // Tab states
  const [activeTab, setActiveTab] = useState<SuperAdminTabType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'users', label: 'Users' },
    { id: 'owners', label: 'Gym Owners' },
    { id: 'gyms', label: 'Gym Outlets' },
    { id: 'plans', label: 'Membership Plans' },
    { id: 'credits', label: 'Credits & Transactions' },
    { id: 'checkins', label: 'Check-ins' },
    { id: 'payments', label: 'Payments' },
    { id: 'payouts', label: 'Payouts' },
    { id: 'refunds', label: 'Refunds' },
    { id: 'reports', label: 'Reports & Analytics' },
    { id: 'support', label: 'Support & Tickets' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'logs', label: 'System Logs' },
    { id: 'settings', label: 'Settings' }
  ];

  // Settings State
  const [adminName, setAdminName] = useState(session?.name || 'Super Admin');
  const [adminEmail, setAdminEmail] = useState(session?.email || 'superadmin@flexpass.in');
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Gym state for approvals sandbox
  const [gymList, setGymList] = useState(mockGyms);

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

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 flex flex-col md:flex-row relative font-sans">
      
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
          className="p-2 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-650 dark:text-zinc-400 cursor-pointer"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Sidebar navigation matching reference image layout */}
      <aside className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 z-40 transition-transform flex flex-col justify-between ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        
        {/* Header aligned with topbar */}
        <div className="flex items-center h-[70px] px-6 border-b border-zinc-200 dark:border-zinc-800 gap-3 shrink-0">
          <div className="p-2 bg-brand-primary/10 text-brand-primary border border-brand-primary/20 rounded-xl">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="text-left">
            <span className="font-extrabold text-sm text-zinc-900 dark:text-white tracking-tight block">FitPass</span>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block font-semibold">Super Admin</span>
          </div>
        </div>

        {/* Categories and links */}
        <div className="p-4 flex-1 overflow-y-auto space-y-6 scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          
          {/* Main Dashboard item */}
          <button
            onClick={() => {
              setActiveTab('dashboard');
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/10'
                : 'text-zinc-650 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50'
            }`}
          >
            <Home className={`h-4 w-4 ${activeTab === 'dashboard' ? 'text-white' : 'text-brand-primary'}`} />
            <span>Dashboard</span>
          </button>

          {/* MANAGEMENT SECTION */}
          <div className="space-y-1">
            <span className="text-[9px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block px-4 mb-2 text-left">
              Management
            </span>
            {[
              { id: 'users' as SuperAdminTabType, label: 'Users', icon: Users },
              { id: 'owners' as SuperAdminTabType, label: 'Gym Owners', icon: UserCheck },
              { id: 'gyms' as SuperAdminTabType, label: 'Gyms', icon: MapPin },
              { id: 'plans' as SuperAdminTabType, label: 'Membership Plans', icon: Sliders },
              { id: 'credits' as SuperAdminTabType, label: 'Credits & Transactions', icon: FileText },
              { id: 'checkins' as SuperAdminTabType, label: 'Check-ins', icon: Activity },
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/10 font-bold'
                      : 'text-zinc-650 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/50'
                  }`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-zinc-400 dark:text-zinc-500'}`} />
                  <span>{item.label}</span>
                  <ChevronRight className={`h-3 w-3 ml-auto ${isActive ? 'text-white/70' : 'text-zinc-400 dark:text-zinc-600'}`} />
                </button>
              );
            })}
          </div>

          {/* FINANCIAL SECTION */}
          <div className="space-y-1">
            <span className="text-[9px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block px-4 mb-2 text-left">
              Financial
            </span>
            {[
              { id: 'payments' as SuperAdminTabType, label: 'Payments', icon: DollarSign },
              { id: 'payouts' as SuperAdminTabType, label: 'Payouts', icon: CircleDollarSign },
              { id: 'refunds' as SuperAdminTabType, label: 'Refunds', icon: RefreshCw },
              { id: 'reports' as SuperAdminTabType, label: 'Reports & Analytics', icon: BarChart3 },
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/10 font-bold'
                      : 'text-zinc-655 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/50'
                  }`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-zinc-400 dark:text-zinc-500'}`} />
                  <span>{item.label}</span>
                  <ChevronRight className={`h-3 w-3 ml-auto ${isActive ? 'text-white/70' : 'text-zinc-400 dark:text-zinc-600'}`} />
                </button>
              );
            })}
          </div>

          {/* SYSTEM SECTION */}
          <div className="space-y-1">
            <span className="text-[9px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block px-4 mb-2 text-left">
              System
            </span>
            {[
              { id: 'support' as SuperAdminTabType, label: 'Support & Tickets', icon: HelpCircle },
              { id: 'notifications' as SuperAdminTabType, label: 'Notifications', icon: Bell },
              { id: 'logs' as SuperAdminTabType, label: 'System Logs', icon: Terminal },
              { id: 'settings' as SuperAdminTabType, label: 'Settings', icon: Settings },
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/10 font-bold'
                      : 'text-zinc-655 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/50'
                  }`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-zinc-400 dark:text-zinc-500'}`} />
                  <span>{item.label}</span>
                  <ChevronRight className={`h-3 w-3 ml-auto ${isActive ? 'text-white/70' : 'text-zinc-400 dark:text-zinc-600'}`} />
                </button>
              );
            })}
          </div>

        </div>

        {/* Compact Logout Footer */}
        <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout Console</span>
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0 bg-zinc-50 dark:bg-zinc-950">
        
        {/* Topbar Header */}
        <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-6 h-[70px] flex flex-col sm:flex-row justify-between items-center gap-4 z-20 shadow-xs shrink-0">
          <div className="text-left">
            <h2 className="text-lg font-extrabold text-zinc-900 dark:text-white capitalize">
              {menuItems.find(m => m.id === activeTab)?.label || 'Dashboard'}
            </h2>
            <p className="text-[10px] text-zinc-450 dark:text-zinc-550 font-semibold">
              Super Admin Console Control Center
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="h-8 w-8 rounded-full bg-brand-primary hover:bg-brand-primary/90 text-white font-bold text-xs flex items-center justify-center shadow-sm cursor-pointer transition-transform hover:scale-105"
              >
                SA
              </button>
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg py-1 z-35 text-left text-xs">
                  <div className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-800">
                    <p className="font-bold text-zinc-900 dark:text-white">{adminName}</p>
                    <p className="text-[10px] text-zinc-450 dark:text-zinc-555 truncate">{adminEmail}</p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('settings');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 flex items-center gap-2 cursor-pointer"
                  >
                    <Settings className="h-3.5 w-3.5" />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-left px-4 py-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-[#1d141a] flex items-center gap-2 border-t border-zinc-200 dark:border-zinc-800 cursor-pointer"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Main Content Panel */}
        <main className="flex-1 p-6 overflow-y-auto w-full max-w-7xl mx-auto space-y-6">
          
          {/* TAB: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Aggregated Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                {[
                  { title: 'Total GMV', value: 'Rs 4,82,000', stat: '+14% vs last month' },
                  { title: 'Active Subscriptions', value: '1,248 Users', stat: '30% breakage percentage' },
                  { title: 'Active Partner Gyms', value: '78 Gyms', stat: '5 pending approvals' },
                  { title: 'Fraud Alerts', value: `${fraudLogs.length} Triggered`, stat: 'p99 scanning speed: 120ms', danger: true },
                ].map((s, idx) => (
                  <div key={idx} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl space-y-1 text-left shadow-xs">
                    <span className="text-[10px] text-zinc-450 dark:text-zinc-550 uppercase block font-semibold">{s.title}</span>
                    <span className={`text-2xl font-extrabold ${s.danger ? 'text-rose-500' : 'text-zinc-900 dark:text-white'}`}>{s.value}</span>
                    <span className={`text-[10px] block ${s.danger ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>{s.stat}</span>
                  </div>
                ))}
              </div>

              {/* Gym Approvals Queue & Fraud Monitor */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs">
                  <div className="p-5 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
                    <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Partner Gym Approval Queue</h3>
                    <span className="text-xs text-zinc-450 dark:text-zinc-550">Real-time status</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="bg-zinc-50/50 dark:bg-zinc-950/50 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
                          <th className="p-4">Gym Name</th>
                          <th className="p-4">Location</th>
                          <th className="p-4">Tier Level</th>
                          <th className="p-4">Registration</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        {gymList.map((gym) => (
                          <tr key={gym.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850/30">
                            <td className="p-4 font-bold text-zinc-900 dark:text-white">{gym.name}</td>
                            <td className="p-4 text-zinc-500 dark:text-zinc-400 text-xs">{gym.address.split(',')[1]}</td>
                            <td className="p-4 text-xs text-zinc-650 dark:text-zinc-400">Tier {gym.tier}</td>
                            <td className="p-4">
                              <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                gym.is_approved 
                                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' 
                                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                              }`}>
                                {gym.is_approved ? 'Approved' : 'Pending'}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              {gym.is_approved ? (
                                <button
                                  onClick={() => handleApproveGym(gym.id, false)}
                                  className="text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-500 font-bold text-[11px] px-2.5 py-1 rounded-lg border border-rose-200 dark:border-rose-900/30 hover:bg-rose-50 dark:hover:bg-rose-950/20 cursor-pointer"
                                >
                                  Suspend
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleApproveGym(gym.id, true)}
                                  className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-500 font-bold text-[11px] px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-900/30 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 cursor-pointer"
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

                <div className="lg:col-span-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
                    <AlertOctagon className="h-5 w-5 animate-pulse" />
                    <span>Fraud Incident Monitor</span>
                  </div>
                  <p className="text-zinc-550 dark:text-zinc-450 text-xs text-left">Flagging duplicate scans or suspicious GPS coordinates checks.</p>

                  <div className="space-y-3 pt-2">
                    {fraudLogs.map((log) => (
                      <div key={log.id} className="p-3 bg-rose-50/50 dark:bg-rose-950/10 border border-rose-105 dark:border-rose-900/20 rounded-xl space-y-1 text-left text-xs">
                        <div className="flex justify-between items-center font-bold text-rose-600 dark:text-rose-400">
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

          {/* TAB: USERS */}
          {activeTab === 'users' && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xs text-left space-y-4">
              <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Registered FitPass Users</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: 'Rahul Kumar', email: 'rahul.k@example.com', plan: 'Standard', credits: 42 },
                  { name: 'Priya Sharma', email: 'priya.s@example.com', plan: 'Premium', credits: 85 },
                  { name: 'Amit Verma', email: 'amit.v@example.com', plan: 'Basic', credits: 12 },
                ].map((member, idx) => (
                  <div key={idx} className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl flex justify-between items-center text-xs">
                    <div className="space-y-0.5">
                      <p className="font-bold text-zinc-900 dark:text-white">{member.name}</p>
                      <p className="text-zinc-500 dark:text-zinc-400">{member.email}</p>
                    </div>
                    <span className="bg-brand-primary/10 text-brand-primary border border-brand-primary/20 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {member.plan} Plan
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: OWNERS */}
          {activeTab === 'owners' && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xs text-left space-y-4">
              <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Gym Owner Partners</h3>
              <div className="space-y-3">
                {[
                  { name: 'Vikram Singh', gym: "Gold's Gym Sector 62", email: 'owner@goldsnoida.com' },
                  { name: 'Sanjay Dutt', gym: 'FitLine Fitness Studio', email: 'sanjay@fitline.com' },
                ].map((owner, idx) => (
                  <div key={idx} className="p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-zinc-900 dark:text-white">{owner.name}</p>
                      <p className="text-zinc-500 dark:text-zinc-400 mt-0.5">{owner.gym} • {owner.email}</p>
                    </div>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">Verified Partner</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: GYMS */}
          {activeTab === 'gyms' && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xs text-left space-y-4">
              <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Gym Network Outlets</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {gymList.map((gym) => (
                  <div key={gym.id} className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-zinc-900 dark:text-white">{gym.name}</p>
                      <p className="text-zinc-500 dark:text-zinc-400 mt-1">{gym.address}</p>
                    </div>
                    <span className="text-brand-primary font-bold shrink-0">Tier {gym.tier}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: PLANS */}
          {activeTab === 'plans' && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xs text-left space-y-4">
              <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Membership Plans</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {creditPlans.map((plan) => (
                  <div key={plan.id} className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl space-y-3">
                    <h4 className="font-bold text-sm capitalize text-zinc-900 dark:text-white">{plan.name}</h4>
                    <p className="text-2xl font-extrabold text-brand-primary">₹{plan.price} <span className="text-xs text-zinc-500">/mo</span></p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">• {plan.credits} Credits included</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: CREDITS */}
          {activeTab === 'credits' && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xs text-left space-y-4">
              <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Credits & Transactions Ledger</h3>
              <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {[
                  { desc: 'Booster Pack top-up', user: 'Rahul Kumar', amount: '₹500', time: '10:14 AM' },
                  { desc: 'Monthly Standard Subscription', user: 'Priya Sharma', amount: '₹2,500', time: 'Yesterday' },
                ].map((tx, idx) => (
                  <div key={idx} className="py-3.5 flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-zinc-900 dark:text-white">{tx.desc}</p>
                      <p className="text-zinc-500 dark:text-zinc-400 mt-0.5">By: {tx.user} • {tx.time}</p>
                    </div>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{tx.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: CHECKINS */}
          {activeTab === 'checkins' && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-xs text-left">
              <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
                <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Global Check-in Stream</h3>
              </div>
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-zinc-50/50 dark:bg-zinc-950/50 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="p-4">Time</th>
                    <th className="p-4">User</th>
                    <th className="p-4">Gym Club</th>
                    <th className="p-4">Credits</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {mockCheckins.map((c, idx) => (
                    <tr key={idx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850/30">
                      <td className="p-4 text-zinc-550 dark:text-zinc-450">{c.time}</td>
                      <td className="p-4 font-bold text-zinc-900 dark:text-white">{c.userName}</td>
                      <td className="p-4 text-zinc-600 dark:text-zinc-400">{c.gymName}</td>
                      <td className="p-4 font-bold text-brand-primary">-{c.creditsUsed} Credits</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB: PAYMENTS */}
          {activeTab === 'payments' && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xs text-left space-y-4">
              <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Payments Audits</h3>
              <div className="space-y-2">
                {[
                  { id: 'TXN-9492', user: 'Rahul Kumar', amount: '₹1,500', method: 'UPI', status: 'Success' },
                  { id: 'TXN-1049', user: 'Priya Sharma', amount: '₹4,000', method: 'Card', status: 'Success' },
                ].map((p, idx) => (
                  <div key={idx} className="p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-zinc-900 dark:text-white">{p.id} • {p.user}</p>
                      <p className="text-zinc-550 dark:text-zinc-450 text-[10px] mt-0.5">Payment via: {p.method}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-zinc-900 dark:text-white block">{p.amount}</span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block">{p.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: PAYOUTS */}
          {activeTab === 'payouts' && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xs text-left space-y-4">
              <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Settled partner Payouts</h3>
              <div className="space-y-3">
                {[
                  { gym: "Gold's Gym Sec 62", amount: 'Rs 9,450', status: 'Settled' },
                  { gym: 'FitLine Studio', amount: 'Rs 5,880', status: 'Pending' },
                ].map((p, idx) => (
                  <div key={idx} className="p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-zinc-900 dark:text-white">{p.gym}</p>
                      <p className="text-zinc-550 dark:text-zinc-450 text-[10px] mt-0.5">Bi-weekly settlement cycle</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-brand-primary block">{p.amount}</span>
                      <span className={`text-[10px] block ${p.status === 'Settled' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-650 dark:text-amber-400'}`}>
                        {p.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: REFUNDS */}
          {activeTab === 'refunds' && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xs text-left space-y-4">
              <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Processed Refunds</h3>
              <div className="space-y-2">
                {[
                  { name: 'Amit Verma', reason: 'Gym closed for maintenance', amount: '₹500', status: 'Refunded' },
                ].map((r, idx) => (
                  <div key={idx} className="p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-zinc-900 dark:text-white">{r.name}</p>
                      <p className="text-zinc-550 dark:text-zinc-450 text-[10px] mt-0.5">Reason: {r.reason}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-zinc-900 dark:text-white block">{r.amount}</span>
                      <span className="text-[10px] text-emerald-650 dark:text-emerald-400 block">{r.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: REPORTS */}
          {activeTab === 'reports' && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xs text-left space-y-4">
              <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">System Reports</h3>
              <p className="text-xs text-zinc-500">Platform performance charts, scan breakdowns, and subscription statistics.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-2">
                  <h4 className="font-bold text-xs text-zinc-900 dark:text-white">Weekly Scan Trends</h4>
                  <p className="text-2xl font-extrabold text-brand-primary">142 Scans</p>
                  <p className="text-[10px] text-zinc-500">+12% growth since last week</p>
                </div>
                <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-2">
                  <h4 className="font-bold text-xs text-zinc-900 dark:text-white">Net Subscription Conversion</h4>
                  <p className="text-2xl font-extrabold text-zinc-900 dark:text-white">78%</p>
                  <p className="text-[10px] text-zinc-500">Trial to paid migration rate</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SUPPORT */}
          {activeTab === 'support' && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xs text-left space-y-4">
              <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Customer Support Tickets</h3>
              <div className="space-y-2">
                {[
                  { name: 'Rahul Kumar', issue: 'QR Scan check-in error Sec 62', status: 'Open' },
                  { name: 'Amit Verma', issue: 'Credits billing double charge', status: 'Closed' },
                ].map((ticket, idx) => (
                  <div key={idx} className="p-3.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-zinc-900 dark:text-white">{ticket.issue}</p>
                      <p className="text-zinc-550 dark:text-zinc-450 text-[10px] mt-0.5">From: {ticket.name}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      ticket.status === 'Open' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' : 'bg-zinc-205 dark:bg-zinc-800 text-zinc-500'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xs text-left space-y-4">
              <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Console Notifications</h3>
              <div className="space-y-3">
                {[
                  { title: 'Server Audit Completed', desc: 'Platform daily server backup and logs rotation completed.', time: '1 hour ago' },
                  { title: 'New Gym Partner Request', desc: 'Wave Gym Sector 18 Noida applied to register.', time: '3 hours ago' },
                ].map((n, idx) => (
                  <div key={idx} className="p-3.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs space-y-1">
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-zinc-900 dark:text-white">{n.title}</p>
                      <span className="text-[10px] text-zinc-500">{n.time}</span>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: LOGS */}
          {activeTab === 'logs' && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xs text-left space-y-4">
              <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">System Audit logs</h3>
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 font-mono text-[10px] text-emerald-400 space-y-1">
                <p>[10:45:12] AUTH: Rahul Kumar logged in successfully from Noida.</p>
                <p>[11:02:45] API: Gold's Gym Sec 62 check-in pass validation completed in 140ms.</p>
                <p>[11:15:30] SYS: Payout Settlement calculated for Noida Partner Network.</p>
                <p>[11:18:24] AUTH: Super Admin console logs session init.</p>
              </div>
            </div>
          )}

          {/* TAB: SETTINGS */}
          {activeTab === 'settings' && (
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

              <form onSubmit={(e) => { e.preventDefault(); setSettingsSaved(true); setTimeout(() => setSettingsSaved(false), 3000); }} className="space-y-4">
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
          )}

        </main>
      </div>
    </div>
  );
}
