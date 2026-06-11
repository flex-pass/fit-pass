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
    // Default to user role on client load for developer testing convenience
    const savedRole = localStorage.getItem('flexpass-mock-role') as UserRole || 'user';
    setRole(savedRole);
    setSession(mockSessions[savedRole]);
  }, []);

  const loginAs = (newRole: UserRole) => {
    localStorage.setItem('flexpass-mock-role', newRole);
    setRole(newRole);
    setSession(mockSessions[newRole]);
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
    <AuthContext.Provider value={{ session, role, loginAs, logout, updateCredits }}>
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
