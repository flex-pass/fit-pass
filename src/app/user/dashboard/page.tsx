'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { useGyms, useCheckins, useCredits } from '@/lib/hooks';
import GymCard from '@/components/gym-card';
import GymMap from '@/components/gym-map';
import QrDisplay from '@/components/qr-display';
import RazorpayCheckoutButton from '@/components/RazorpayCheckoutButton';
import { 
  Wallet, 
  Dumbbell, 
  MapPin, 
  History, 
  RefreshCw, 
  Star, 
  Home, 
  Compass, 
  Calendar, 
  Share2, 
  HelpCircle, 
  Settings, 
  LogOut, 
  User, 
  Menu, 
  X, 
  Plus, 
  Copy, 
  Check, 
  AlertCircle,
  QrCode
} from 'lucide-react';
import Link from 'next/link';

type TabType = 
  | 'dashboard'
  | 'explore'
  | 'bookings'
  | 'history'
  | 'plan'
  | 'credits'
  | 'referral'
  | 'support'
  | 'settings';

export default function UserDashboard() {
  const router = useRouter();
  const { session, role, logout, updateCredits } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  
  // Custom states
  const [referralCopied, setReferralCopied] = useState(false);
  const [selectedGymForQr, setSelectedGymForQr] = useState<string | null>(null);
  const [topUpAmount, setTopUpAmount] = useState(10);
  
  // Settings Form State
  const [profileName, setProfileName] = useState(session?.name || '');
  const [profilePhone, setProfilePhone] = useState(session?.phone || '');
  const [profileEmail, setProfileEmail] = useState(session?.email || '');
  const [profileCity, setProfileCity] = useState(session?.city || '');
  const [profileSaved, setProfileSaved] = useState(false);

  // API Hooks
  // We use fallback to Noida coordinates for the nearby gyms query
  const { gyms, loading: gymsLoading } = useGyms(28.5355, 77.3910);
  const { checkins, loading: checkinsLoading } = useCheckins();
  const { balance: apiBalance, loading: creditsLoading, refetch: refetchCredits } = useCredits();

  const currentBalance = creditsLoading ? (session?.creditsBalance || 0) : apiBalance;

  // Redirect to home page if not user role
  useEffect(() => {
    if (role !== 'user' || !session) {
      router.push('/');
    }
  }, [role, session, router]);

  // If role is not selected/logged out, return null to avoid flash
  if (role !== 'user' || !session) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const copyReferral = () => {
    navigator.clipboard.writeText('FLEX-FIT-' + session.name.toUpperCase().replace(/\s+/g, ''));
    setReferralCopied(true);
    setTimeout(() => setReferralCopied(false), 2000);
  };



  const menuItems = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: Home },
    { id: 'explore' as TabType, label: 'Explore Gyms', icon: Compass },
    { id: 'bookings' as TabType, label: 'My Bookings', icon: Calendar },
    { id: 'history' as TabType, label: 'Check in History', icon: History },
    { id: 'plan' as TabType, label: 'My Plan', icon: Dumbbell },
    { id: 'credits' as TabType, label: 'Credits & Payments', icon: Wallet },
    { id: 'referral' as TabType, label: 'Refer And Earn', icon: Share2 },
    { id: 'support' as TabType, label: 'Support', icon: HelpCircle },
    { id: 'settings' as TabType, label: 'Settings', icon: Settings },
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

        <div className="p-6 flex-1 overflow-y-auto space-y-6">
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
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
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
        <div className="p-6 border-t border-zinc-150 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
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
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500">
              Welcome to your Fitness Hub
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setActiveTab('bookings');
                setSelectedGymForQr("Gold's Gym");
              }}
              className="bg-brand-primary hover:bg-brand-secondary text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
            >
              <QrCode className="h-3.5 w-3.5" />
              <span>Scanner</span>
            </button>

            <div className="bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold px-3 py-1.5 rounded-full text-zinc-600 dark:text-zinc-300 flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-brand-primary" />
              <span>{session.city || 'Noida'}</span>
            </div>
            
            <div className="bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary dark:text-cyan-400 text-[11px] font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-brand-primary/20">
              <Wallet className="h-3.5 w-3.5" />
              <span>{currentBalance} Credits</span>
            </div>

            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="h-8 w-8 rounded-full bg-brand-primary hover:bg-brand-secondary text-white font-bold text-xs flex items-center justify-center shadow-sm cursor-pointer transition-transform hover:scale-105"
              >
                {session.name.split(' ').map(n => n[0]).join('')}
              </button>
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg py-1 z-35 text-left">
                  <div className="px-4 py-2 border-b border-zinc-150 dark:border-zinc-800">
                    <p className="text-xs font-bold text-zinc-900 dark:text-white">{session.name}</p>
                    <p className="text-[10px] text-zinc-500 truncate">{session.email}</p>
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
          
          {/* TAB: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-brand-primary to-brand-secondary p-8 rounded-3xl text-white relative overflow-hidden shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1 z-10 text-left">
                  <span className="bg-white/20 text-white font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Member Dashboard
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold mt-2">Welcome back, {session.name}!</h3>
                  <p className="text-white/80 text-xs sm:text-sm">Access any gym near home or office. Search partner gyms below.</p>
                </div>
                <button
                  onClick={() => setActiveTab('explore')}
                  className="px-5 py-3 bg-white text-brand-primary font-bold rounded-xl shadow-md hover:scale-105 transition-transform flex items-center gap-1.5 text-xs sm:text-sm z-10 cursor-pointer"
                >
                  <Compass className="h-4.5 w-4.5" />
                  <span>Book Workout</span>
                </button>
              </div>

              {/* Stats Panel */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl flex items-center justify-between shadow-xs">
                  <div className="space-y-1 text-left">
                    <span className="text-[10px] text-zinc-400 font-bold uppercase block tracking-wider">Credits Remaining</span>
                    <span className="text-3xl font-extrabold text-brand-primary">{currentBalance} Credits</span>
                    <span className="text-[10px] text-zinc-500 block">Current plan: {session.planType || 'basic'}</span>
                  </div>
                  <div className="p-3.5 bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary rounded-xl">
                    <Wallet className="h-6 w-6" />
                  </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl flex items-center justify-between shadow-xs">
                  <div className="space-y-1 text-left">
                    <span className="text-[10px] text-zinc-400 font-bold uppercase block tracking-wider">Total Check-ins</span>
                    <span className="text-3xl font-extrabold text-zinc-900 dark:text-white">{checkins.length} Visits</span>
                    <span className="text-[10px] text-zinc-500 block">4 visits this calendar month</span>
                  </div>
                  <div className="p-3.5 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500 rounded-xl">
                    <History className="h-6 w-6" />
                  </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl flex items-center justify-between shadow-xs">
                  <div className="space-y-1 text-left">
                    <span className="text-[10px] text-zinc-400 font-bold uppercase block tracking-wider">Rollover Potential</span>
                    <span className="text-3xl font-extrabold text-amber-500">100% Roll</span>
                    <span className="text-[10px] text-zinc-500 block">Rollover up to 55 unused credits</span>
                  </div>
                  <div className="p-3.5 bg-amber-500/10 dark:bg-amber-500/20 text-amber-500 rounded-xl">
                    <RefreshCw className="h-6 w-6" />
                  </div>
                </div>
              </div>

              {/* Recommendations and Quick Feed */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-5">
                  <h4 className="font-extrabold text-lg text-zinc-900 dark:text-white text-left">Recommended Gyms near Noida</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {gymsLoading ? (
                      <div className="text-sm text-zinc-500">Loading gyms...</div>
                    ) : (
                      gyms.slice(0, 2).map((gym) => (
                        <GymCard key={gym.id} gym={gym} />
                      ))
                    )}
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-5">
                  <h4 className="font-extrabold text-lg text-zinc-900 dark:text-white text-left">Recent Check-in Logs</h4>
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs divide-y divide-zinc-150 dark:divide-zinc-800">
                    {checkinsLoading ? (
                      <div className="p-4 text-sm text-zinc-500">Loading checkins...</div>
                    ) : (
                      checkins.slice(0, 3).map((item) => (
                        <div key={item.id} className="p-4 flex justify-between items-center text-xs">
                          <div className="space-y-1 text-left">
                            <p className="font-bold text-zinc-900 dark:text-zinc-100">{item.gymName}</p>
                            <p className="text-zinc-500 flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5 text-zinc-400" />
                              <span>{session.city || 'Noida'} • {item.time}</span>
                            </p>
                          </div>
                          <div className="text-right space-y-1">
                            <span className="font-bold text-brand-primary block">-{item.creditsUsed} Credits</span>
                            <span className="inline-flex px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 font-semibold text-[10px]">
                              {item.status}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: EXPLORE GYMS */}
          {activeTab === 'explore' && (
            <div className="space-y-6">
              {/* Map block */}
              <div className="w-full h-[320px] rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <GymMap gyms={gyms} />
              </div>

              {/* Gym lists */}
              <div className="space-y-4">
                <h3 className="font-extrabold text-lg text-zinc-900 dark:text-white text-left">Partner Gym Network</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gymsLoading ? (
                    <div className="col-span-full text-center py-10 text-zinc-500">Finding nearby gyms...</div>
                  ) : (
                    gyms.map((gym) => (
                      <GymCard key={gym.id} gym={gym} />
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB: MY BOOKINGS */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Active bookings list */}
                <div className="lg:col-span-7 space-y-4">
                  <h4 className="font-extrabold text-lg text-zinc-900 dark:text-white text-left">Active Workout slot Passes</h4>
                  
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-4 text-left">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 font-bold text-[10px] px-2.5 py-1 rounded-full border border-emerald-500/20">
                          Active Pass Ready
                        </span>
                        <h4 className="font-extrabold text-base text-zinc-900 dark:text-white mt-2.5">Gold's Gym (Sector 62)</h4>
                        <p className="text-xs text-zinc-500 mt-1">Plot A-40, Noida Sec 62, Uttar Pradesh</p>
                      </div>
                      <span className="text-xs font-bold text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-lg">
                        Tier 1
                      </span>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-zinc-100 dark:border-zinc-800/80 text-xs">
                      <div>
                        <span className="text-zinc-400 block text-[10px] uppercase font-bold">Cost Deducted</span>
                        <span className="font-bold text-brand-primary text-sm">3 Credits</span>
                      </div>
                      <button 
                        onClick={() => setSelectedGymForQr(selectedGymForQr === "Gold's Gym" ? null : "Gold's Gym")}
                        className="px-4.5 py-2.5 bg-brand-primary hover:bg-brand-secondary text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <QrCode className="h-4 w-4" />
                        <span>{selectedGymForQr === "Gold's Gym" ? 'Hide Pass QR' : 'Show Check-in QR'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* QR Display Drawer */}
                <div className="lg:col-span-5 space-y-4">
                  {selectedGymForQr ? (
                    <div>
                      <h4 className="font-extrabold text-lg text-zinc-900 dark:text-white mb-4 text-left">Your Check-in QR Pass</h4>
                      <QrDisplay gymName={selectedGymForQr} creditsToDeduct={3} />
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl text-center text-zinc-400 space-y-2">
                      <AlertCircle className="h-8 w-8 mx-auto text-zinc-350 dark:text-zinc-650" />
                      <p className="text-xs font-bold">No active QR display selected</p>
                      <p className="text-[10px] text-zinc-500 max-w-[200px] mx-auto">Click "Show Check-in QR" on any active gym slot pass to load counter scanner.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB: CHECK IN HISTORY */}
          {activeTab === 'history' && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-zinc-150 dark:border-zinc-800 flex justify-between items-center">
                <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Check-in Logs Feed</h3>
                <span className="text-xs text-zinc-500">Logs updated instantly</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-150 dark:border-zinc-800 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
                      <th className="p-4">Workout Session</th>
                      <th className="p-4">Deduction</th>
                      <th className="p-4">Check-in Location</th>
                      <th className="p-4">Time</th>
                      <th className="p-4">Verification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-150 dark:divide-zinc-800">
                    {checkinsLoading ? (
                      <tr><td colSpan={5} className="p-8 text-center text-zinc-500">Loading checkin history...</td></tr>
                    ) : checkins.length === 0 ? (
                      <tr><td colSpan={5} className="p-8 text-center text-zinc-500">No checkins found.</td></tr>
                    ) : (
                      checkins.map((item) => (
                        <tr key={item.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/10">
                          <td className="p-4 font-bold text-zinc-900 dark:text-zinc-100">{item.gymName}</td>
                          <td className="p-4 font-semibold text-brand-primary">-{item.creditsUsed} Credits</td>
                          <td className="p-4 text-zinc-500">{session.city || 'Noida'} NCR</td>
                          <td className="p-4 text-zinc-500">{item.time}</td>
                          <td className="p-4">
                            <span className="inline-flex px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 font-bold text-[10px] capitalize">
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: MY PLAN */}
          {activeTab === 'plan' && (
            <div className="space-y-6 max-w-3xl text-left">
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-6">
                <div className="flex justify-between items-start gap-4 flex-wrap">
                  <div>
                    <span className="bg-brand-primary/10 text-brand-primary font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Current Subscription
                    </span>
                    <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white mt-3 capitalize">
                      {session.planType || 'basic'} Membership Pass
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1">Renewal Cycle: Monthly billing</p>
                  </div>
                  <span className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-500 font-extrabold text-xs px-3.5 py-1.5 rounded-xl">
                    Active
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-zinc-100 dark:border-zinc-800/80 text-xs">
                  <div>
                    <span className="text-zinc-400 block uppercase font-bold text-[9px] tracking-wider">Next Renewal Date</span>
                    <span className="font-extrabold text-zinc-900 dark:text-zinc-100 text-sm mt-1 block">July 12, 2026</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block uppercase font-bold text-[9px] tracking-wider">Pricing Rate</span>
                    <span className="font-extrabold text-zinc-900 dark:text-zinc-100 text-sm mt-1 block">
                      ₹{session.planType === 'premium' ? 4000 : session.planType === 'standard' ? 2500 : 1500} / month
                    </span>
                  </div>
                </div>

                <div className="flex justify-between gap-4 pt-2">
                  <Link 
                    href="/pricing" 
                    className="px-5 py-3 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold rounded-xl text-xs transition-colors"
                  >
                    Change Plan Type
                  </Link>
                  <button 
                    onClick={() => alert('Subscription paused. You can reactivate anytime before your next cycle.')}
                    className="px-5 py-3 text-rose-500 hover:bg-rose-500/10 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    Pause Subscription
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: CREDITS AND PAYMENTS */}
          {activeTab === 'credits' && (
            <div className="space-y-6 max-w-3xl text-left">
              {/* Wallet top up card */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-6">
                <div>
                  <h3 className="font-extrabold text-lg text-zinc-900 dark:text-white">Top Up Wallet Credits</h3>
                  <p className="text-xs text-zinc-500 mt-1">Instantly add booster credits to your account. Credits roll over indefinitely.</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[
                    { amount: 10, price: 500, label: '10 Credits' },
                    { amount: 25, price: 1125, label: '25 Credits (10% Off)' },
                    { amount: 50, price: 2000, label: '50 Credits (20% Off)' },
                  ].map((tier) => (
                    <div
                      key={tier.amount}
                      onClick={() => setTopUpAmount(tier.amount)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 text-center ${
                        topUpAmount === tier.amount
                          ? 'border-brand-primary bg-brand-primary/5 dark:bg-brand-primary/10 shadow-sm'
                          : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950'
                      }`}
                    >
                      <span className="font-bold text-xs text-zinc-900 dark:text-zinc-150 block">{tier.label}</span>
                      <span className="text-lg font-extrabold text-zinc-950 dark:text-white mt-1 block">₹{tier.price}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <RazorpayCheckoutButton 
                    amount={
                      ([
                        { amount: 10, price: 500 },
                        { amount: 25, price: 1125 },
                        { amount: 50, price: 2000 },
                      ].find(t => t.amount === topUpAmount)?.price || 500) * 100
                    }
                    className="w-full py-3 bg-brand-primary hover:bg-brand-secondary text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                    onSuccess={() => {
                      refetchCredits();
                      updateCredits(topUpAmount);
                      alert(`Successfully purchased and added ${topUpAmount} Credits to your wallet!`);
                    }}
                    onError={(err) => {
                      console.error('Payment Error:', err);
                      alert("Payment failed or was cancelled.");
                    }}
                  >
                    <Plus className="h-4.5 w-4.5" />
                    <span>Purchase {topUpAmount} Credits Now</span>
                  </RazorpayCheckoutButton>
                </div>
              </div>
            </div>
          )}

          {/* TAB: REFER AND EARN */}
          {activeTab === 'referral' && (
            <div className="space-y-6 max-w-2xl text-left">
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-6">
                <div className="text-center space-y-3 py-4">
                  <div className="h-14 w-14 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto">
                    <Share2 className="h-7 w-7" />
                  </div>
                  <h3 className="font-extrabold text-xl text-zinc-900 dark:text-white">Invite Friends, Get Free Credits</h3>
                  <p className="text-xs text-zinc-500 max-w-sm mx-auto leading-relaxed">
                    Share FlexPass with friends. For every friend who signs up and completes 1 check-in, you both get 5 free credits!
                  </p>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-4 flex justify-between items-center">
                  <div className="text-left">
                    <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider block">Your Referral Code</span>
                    <span className="font-extrabold text-zinc-900 dark:text-zinc-100 text-sm mt-1 block">
                      FLEX-FIT-{session.name.toUpperCase().replace(/\s+/g, '')}
                    </span>
                  </div>
                  <button
                    onClick={copyReferral}
                    className="p-3.5 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-750 text-zinc-700 dark:text-zinc-250 rounded-xl transition-colors cursor-pointer"
                  >
                    {referralCopied ? <Check className="h-5 w-5 text-emerald-500" /> : <Copy className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SUPPORT */}
          {activeTab === 'support' && (
            <div className="space-y-6 max-w-2xl text-left">
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-6">
                <div>
                  <h3 className="font-extrabold text-lg text-zinc-900 dark:text-white">Help & Support Helpdesk</h3>
                  <p className="text-xs text-zinc-500 mt-1">Have questions or facing issues with gym check-ins? Submit a query.</p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); alert('Query submitted! Our fitness support desk will resolve it within 2 hours.'); }} className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase">Issue Category</label>
                    <select className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-white">
                      <option>Gym QR Scan Error</option>
                      <option>Credits Payment Refund</option>
                      <option>Account Subscription Change</option>
                      <option>Partner Gym Complaint</option>
                      <option>Other / Suggestions</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase">Describe Issue</label>
                    <textarea 
                      required
                      placeholder="Please add check-in timing and gym details if relevant."
                      className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-white h-28 focus:outline-brand-primary/50"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-3 bg-brand-primary hover:bg-brand-secondary text-white font-bold rounded-xl text-xs cursor-pointer shadow-sm"
                  >
                    Submit Request
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-2xl text-left">
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-6">
                <div>
                  <h3 className="font-extrabold text-lg text-zinc-900 dark:text-white">Profile Preferences</h3>
                  <p className="text-xs text-zinc-500 mt-1">Customize your FitPass user information and workout locations.</p>
                </div>

                {profileSaved && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs rounded-xl font-semibold text-center">
                    Profile preferences updated successfully!
                  </div>
                )}

                <form onSubmit={(e) => { e.preventDefault(); setProfileSaved(true); setTimeout(() => setProfileSaved(false), 3000); }} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase">Full Name</label>
                      <input
                        type="text"
                        required
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-brand-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase">Phone Number</label>
                      <input
                        type="text"
                        required
                        value={profilePhone}
                        onChange={(e) => setProfilePhone(e.target.value)}
                        className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-brand-primary/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase">Email Address</label>
                      <input
                        type="email"
                        required
                        value={profileEmail}
                        onChange={(e) => setProfileEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-brand-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase">Workout City</label>
                      <input
                        type="text"
                        required
                        value={profileCity}
                        onChange={(e) => setProfileCity(e.target.value)}
                        className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-brand-primary/50"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button 
                      type="submit"
                      className="w-full py-3 bg-brand-primary hover:bg-brand-secondary text-white font-bold rounded-xl text-xs cursor-pointer shadow-sm"
                    >
                      Save Settings
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
        </main>
      </div>
    </div>
  );
}
