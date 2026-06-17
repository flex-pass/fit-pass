'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { creditPlans } from '@/lib/api';
import { adminService } from '@/lib/api';
import { useAdminOverview, usePendingGyms, useFraudLogs, useCheckins } from '@/lib/hooks';
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
  const [activeTab, setActiveTab] = useState<AdminTabType>('checkins');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Settings State
  const [adminName, setAdminName] = useState(session?.name || 'Super Admin');
  const [adminEmail, setAdminEmail] = useState(session?.email || 'admin@flexpass.in');
  const [settingsSaved, setSettingsSaved] = useState(false);

  // API Hooks
  const { stats, loading: statsLoading } = useAdminOverview();
  const { gyms: pendingGyms, loading: gymsLoading, refetch: refetchGyms } = usePendingGyms();
  const { logs: fraudLogs } = useFraudLogs();
  const { checkins } = useCheckins();
  
  // Gym state for approvals
  const [gymList, setGymList] = useState<any[]>([]);

  useEffect(() => {
    if (pendingGyms.length > 0) {
      setGymList(pendingGyms);
    }
  }, [pendingGyms]);

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

  const handleApproveGym = async (id: string, approve: boolean) => {
    if (approve) {
      try {
        await adminService.approveGym(id);
        refetchGyms();
        alert('Gym approved successfully');
      } catch (err) {
        alert('Failed to approve gym');
      }
    } else {
      // For suspend, just hide it from the list for demo purposes
      setGymList(prev => prev.map(gym => gym.id === id ? { ...gym, is_approved: approve } : gym));
    }
  };

  const menuItems = [
    { id: 'checkins' as AdminTabType, label: 'Checkins', icon: Activity },
    { id: 'bookings' as AdminTabType, label: 'Bookings', icon: Calendar },
    { id: 'members' as AdminTabType, label: 'Members', icon: Users },
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
            <div className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Operations Admin</span>
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
          
          {/* Admin Restricted Notice */}
          {activeTab === 'dashboard' && (
            <div className="p-10 text-center text-zinc-500">
               Dashboard overview is restricted to Super Admins.
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
                    {checkins.map((c) => (
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
                {checkins.map((booking, idx) => (
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

          {/* Restricted Tabs Removed */}

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
