'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'public' | 'user' | 'gym-owner' | 'corporate-hr' | 'admin';

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
  loginAs: (role: UserRole) => void;
  loginUser: (name: string, email: string, role: UserRole, extra?: Partial<UserSession>) => void;
  registerUser: (details: {
    name: string;
    phone: string;
    email: string;
    city: string;
    planType: 'basic' | 'standard' | 'premium';
    billingCycle: 'monthly' | 'quarterly' | 'yearly';
  }) => void;
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
    name: 'Super Admin',
    phone: '+91 90000 00000',
    email: 'admin@flexpass.in',
    role: 'admin',
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>('public');
  const [session, setSession] = useState<UserSession | null>(null);

  useEffect(() => {
    // Default to public role on client load
    const savedRole = localStorage.getItem('flexpass-mock-role') as UserRole || 'public';
    setRole(savedRole);
    setSession(mockSessions[savedRole]);
  }, []);

  const loginAs = (newRole: UserRole) => {
    localStorage.setItem('flexpass-mock-role', newRole);
    setRole(newRole);
    setSession(mockSessions[newRole]);
  };

  const loginUser = (name: string, email: string, userRole: UserRole, extra?: Partial<UserSession>) => {
    const defaultCredits = userRole === 'user' ? 30 : undefined;
    const newSession: UserSession = {
      id: `session-${Math.random().toString(36).substr(2, 9)}`,
      name,
      phone: '+91 99999 99999',
      email,
      role: userRole,
      creditsBalance: defaultCredits,
      planType: userRole === 'user' ? 'basic' : 'none',
      ...extra,
    };
    localStorage.setItem('flexpass-mock-role', userRole);
    setRole(userRole);
    setSession(newSession);
  };

  const registerUser = (details: {
    name: string;
    phone: string;
    email: string;
    city: string;
    planType: 'basic' | 'standard' | 'premium';
    billingCycle: 'monthly' | 'quarterly' | 'yearly';
  }) => {
    const creditsMap = {
      basic: 30,
      standard: 55,
      premium: 100,
    };
    const newSession: UserSession = {
      id: `user-${Math.random().toString(36).substr(2, 9)}`,
      name: details.name,
      phone: details.phone,
      email: details.email,
      role: 'user',
      creditsBalance: creditsMap[details.planType],
      planType: details.planType,
      city: details.city,
    };
    localStorage.setItem('flexpass-mock-role', 'user');
    setRole('user');
    setSession(newSession);
  };

  const logout = () => {
    loginAs('public');
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
    <AuthContext.Provider value={{ session, role, loginAs, loginUser, registerUser, logout, updateCredits }}>
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
