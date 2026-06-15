'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { 
  ShieldCheck, 
  Users, 
  Dumbbell, 
  Menu, 
  X, 
  Settings, 
  LogOut, 
  MapPin, 
  Activity, 
  Bell, 
  HelpCircle,
  Sliders,
  DollarSign,
  ChevronRight,
  Home,
  FileText,
  RefreshCw,
  Terminal,
  UserCheck,
  CircleDollarSign,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { session, role, logout } = useAuth();
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Redirect to home if unauthorized
  useEffect(() => {
    if (role !== 'superadmin' || !session) {
      router.push('/');
    }
  }, [role, session, router]);

  if (role !== 'superadmin' || !session) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', href: '/superadmin/dashboard', icon: Home, section: 'main' },
    // Management
    { id: 'users', label: 'Users', href: '/superadmin/dashboard/users', icon: Users, section: 'management' },
    { id: 'owners', label: 'Gym Owners', href: '/superadmin/dashboard/owners', icon: UserCheck, section: 'management' },
    { id: 'gyms', label: 'Gyms', href: '/superadmin/dashboard/gyms', icon: MapPin, section: 'management' },
    { id: 'plans', label: 'Membership Plans', href: '/superadmin/dashboard/plans', icon: Sliders, section: 'management' },
    { id: 'credits', label: 'Credits & Transactions', href: '/superadmin/dashboard/credits', icon: FileText, section: 'management' },
    { id: 'checkins', label: 'Check-ins', href: '/superadmin/dashboard/checkins', icon: Activity, section: 'management' },
    // Financial
    { id: 'payments', label: 'Payments', href: '/superadmin/dashboard/payments', icon: DollarSign, section: 'financial' },
    { id: 'payouts', label: 'Payouts', href: '/superadmin/dashboard/payouts', icon: CircleDollarSign, section: 'financial' },
    { id: 'refunds', label: 'Refunds', href: '/superadmin/dashboard/refunds', icon: RefreshCw, section: 'financial' },
    { id: 'reports', label: 'Reports & Analytics', href: '/superadmin/dashboard/reports', icon: BarChart3, section: 'financial' },
    // System
    { id: 'support', label: 'Support & Tickets', href: '/superadmin/dashboard/support', icon: HelpCircle, section: 'system' },
    { id: 'notifications', label: 'Notifications', href: '/superadmin/dashboard/notifications', icon: Bell, section: 'system' },
    { id: 'logs', label: 'System Logs', href: '/superadmin/dashboard/logs', icon: Terminal, section: 'system' },
    { id: 'settings', label: 'Settings', href: '/superadmin/dashboard/settings', icon: Settings, section: 'system' }
  ];

  const currentLabel = menuItems.find(m => m.href === pathname)?.label || 'Dashboard';

  const renderNavGroup = (sectionName: string, items: typeof menuItems) => {
    return (
      <div className="space-y-1">
        <span className="text-[9px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block px-4 mb-2 text-left">
          {sectionName}
        </span>
        {items.map(item => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/10 font-bold'
                  : 'text-zinc-650 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/50'
              }`}
            >
              <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-zinc-400 dark:text-zinc-500'}`} />
              <span>{item.label}</span>
              <ChevronRight className={`h-3 w-3 ml-auto ${isActive ? 'text-white/70' : 'text-zinc-400 dark:text-zinc-600'}`} />
            </Link>
          );
        })}
      </div>
    );
  };

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
          className="p-2 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-655 dark:text-zinc-400 cursor-pointer"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Sidebar navigation */}
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
          <Link
            href="/superadmin/dashboard"
            onClick={() => setSidebarOpen(false)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              pathname === '/superadmin/dashboard'
                ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/10'
                : 'text-zinc-650 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50'
            }`}
          >
            <Home className={`h-4 w-4 ${pathname === '/superadmin/dashboard' ? 'text-white' : 'text-brand-primary'}`} />
            <span>Dashboard</span>
          </Link>

          {renderNavGroup('Management', menuItems.filter(m => m.section === 'management'))}
          {renderNavGroup('Financial', menuItems.filter(m => m.section === 'financial'))}
          {renderNavGroup('System', menuItems.filter(m => m.section === 'system'))}

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
              {currentLabel}
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
                    <p className="font-bold text-zinc-900 dark:text-white">{session.name}</p>
                    <p className="text-[10px] text-zinc-450 dark:text-zinc-555 truncate">{session.email}</p>
                  </div>
                  <Link
                    href="/superadmin/dashboard/settings"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="w-full text-left px-4 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 flex items-center gap-2 cursor-pointer"
                  >
                    <Settings className="h-3.5 w-3.5" />
                    <span>Settings</span>
                  </Link>
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
        <main className="flex-1 p-6 overflow-y-auto w-full space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
