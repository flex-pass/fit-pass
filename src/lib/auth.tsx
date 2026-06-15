'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/auth.service';

export type UserRole = 'public' | 'user' | 'gym-owner' | 'corporate-hr' | 'admin' | 'superadmin';

export interface UserSession {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: UserRole;
  creditsBalance?: number;
  planType?: 'basic' | 'standard' | 'premium' | 'none';
  city?: string;
  companyName?: string;
  gymId?: string;
}

interface AuthContextType {
  session: UserSession | null;
  role: UserRole;
  loading: boolean;
  loginAs: (role: UserRole) => void;
  loginUser: (email: string, password?: string) => Promise<any>;
  registerUser: (details: {
    name: string;
    phone: string;
    email: string;
    city: string;
    planType: 'basic' | 'standard' | 'premium';
    billingCycle: 'monthly' | 'quarterly' | 'yearly';
    password?: string;
  }) => Promise<any>;
  logout: () => void;
  updateCredits: (amount: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockSessions: Record<UserRole, UserSession | null> = {
  public: null,
  user: {
    id: 'user-123',
    name: 'Rahul Kumar',
    phone: '+91 98765 43210',
    email: 'rahul.k@example.com',
    role: 'user',
    creditsBalance: 42,
    planType: 'standard',
    city: 'Noida',
  },
  'gym-owner': {
    id: 'owner-789',
    name: 'Vikram Singh (FitLine Gyms)',
    phone: '+91 99999 88888',
    email: 'owner@fitlinenoida.com',
    role: 'gym-owner',
    gymId: 'gym-noida-1',
  },
  'corporate-hr': {
    id: 'hr-555',
    name: 'Neha Sharma (Infosys HR)',
    phone: '+91 98888 77777',
    email: 'neha.sharma@infosys.com',
    role: 'corporate-hr',
    companyName: 'Infosys Noida',
  },
  admin: {
    id: 'admin-001',
    name: 'Gym Admin',
    phone: '+91 90000 00000',
    email: 'admin@flexpass.in',
    role: 'admin',
  },
  superadmin: {
    id: 'superadmin-001',
    name: 'Super Admin',
    phone: '+91 90000 00000',
    email: 'superadmin@flexpass.in',
    role: 'superadmin',
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>('public');
  const [session, setSession] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Load active session on client mount
    const savedRole = localStorage.getItem('flexpass-mock-role') as UserRole;
    const currentUser = authService.getCurrentUser();

    if (currentUser) {
      // Map API role to UI role
      let uiRole: UserRole = 'user';
      const backendRole = currentUser.role?.toUpperCase();
      if (backendRole === 'GYM_OWNER') uiRole = 'gym-owner';
      else if (backendRole === 'ADMIN') uiRole = 'admin';
      else if (backendRole === 'SUPERADMIN') uiRole = 'superadmin';

      setRole(uiRole);
      setSession({
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone_number || '+91 99999 99999',
        role: uiRole,
        creditsBalance: currentUser.credits_balance ?? 0,
        planType: currentUser.plan_type ? currentUser.plan_type.toLowerCase() as any : 'none',
        city: currentUser.city || 'Noida',
      });
    } else if (savedRole) {
      setRole(savedRole);
      setSession(mockSessions[savedRole]);
    } else {
      setRole('public');
      setSession(null);
    }
    setLoading(false);
  }, []);

  const loginAs = (newRole: UserRole) => {
    authService.logout(); // Clear any database sessions
    localStorage.setItem('flexpass-mock-role', newRole);
    setRole(newRole);
    setSession(mockSessions[newRole]);
  };

  const loginUser = async (email: string, password?: string) => {
    setLoading(true);
    try {
      const response = await authService.login({ email, password });
      if (response?.success && response?.data) {
        const user = response.data.user;
        let uiRole: UserRole = 'user';
        const backendRole = user.role?.toUpperCase();
        if (backendRole === 'GYM_OWNER') uiRole = 'gym-owner';
        else if (backendRole === 'ADMIN') uiRole = 'admin';
        else if (backendRole === 'SUPERADMIN') uiRole = 'superadmin';

        localStorage.removeItem('flexpass-mock-role'); // Remove mock role on success
        setRole(uiRole);
        setSession({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone_number || '+91 99999 99999',
          role: uiRole,
          creditsBalance: user.credits_balance ?? 0,
          planType: user.plan_type ? user.plan_type.toLowerCase() as any : 'none',
          city: user.city || 'Noida',
        });
        return { success: true, role: uiRole };
      }
      return { success: false, message: response?.message || 'Login failed' };
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Login error occurred';
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (details: {
    name: string;
    phone: string;
    email: string;
    city: string;
    planType: 'basic' | 'standard' | 'premium';
    billingCycle: 'monthly' | 'quarterly' | 'yearly';
    password?: string;
  }) => {
    setLoading(true);
    try {
      const res = await authService.register({
        name: details.name,
        email: details.email,
        phone_number: details.phone,
        city: details.city,
        password: details.password || '123456',
        role: 'USER',
      });

      if (res?.success) {
        // Automatically login the registered user
        return await loginUser(details.email, details.password || '123456');
      }
      return { success: false, message: res?.message || 'Registration failed' };
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Registration error';
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setRole('public');
    setSession(null);
  };

  const updateCredits = (amount: number) => {
    if (session && session.role === 'user') {
      setSession(prev => prev ? {
        ...prev,
        creditsBalance: Math.max(0, (prev.creditsBalance || 0) + amount)
      } : null);
    }
  };

  return (
    <AuthContext.Provider value={{ session, role, loading, loginAs, loginUser, registerUser, logout, updateCredits }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
