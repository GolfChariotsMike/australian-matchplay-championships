import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Player } from '../types';
import { mockCurrentUser } from '../lib/mockData';

interface AuthState {
  user: Player | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  loginWithMagicLink: (email: string) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
  loginAsDemo: () => void;
  loginAsAdmin: () => void;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  club: string;
  state: string;
  division?: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isAdmin: false,
    isLoading: true,
  });

  useEffect(() => {
    // Check for persisted mock session
    const session = localStorage.getItem('amc_session');
    if (session) {
      try {
        const parsed = JSON.parse(session);
        setState({
          user: parsed.user,
          isAuthenticated: true,
          isAdmin: parsed.isAdmin || false,
          isLoading: false,
        });
      } catch {
        localStorage.removeItem('amc_session');
        setState(s => ({ ...s, isLoading: false }));
      }
    } else {
      setState(s => ({ ...s, isLoading: false }));
    }
  }, []);

  const login = async (email: string, _password: string) => {
    // Mock login — in production, call supabase.auth.signInWithPassword
    console.log('[AUTH] Login with email:', email);
    await new Promise(r => setTimeout(r, 800));
    
    const user = { ...mockCurrentUser, email };
    const session = { user, isAdmin: email.includes('admin') };
    localStorage.setItem('amc_session', JSON.stringify(session));
    
    setState({
      user,
      isAuthenticated: true,
      isAdmin: email.includes('admin'),
      isLoading: false,
    });
  };

  const loginWithMagicLink = async (email: string) => {
    // In production: supabase.auth.signInWithOtp({ email })
    console.log('[AUTH] Magic link sent to:', email);
    await new Promise(r => setTimeout(r, 600));
    // Simulate redirect/confirmation — just auto-login for demo
    await login(email, '');
  };

  const register = async (data: RegisterData) => {
    // In production: supabase.auth.signUp() then insert into players table
    console.log('[AUTH] Registering:', data);
    await new Promise(r => setTimeout(r, 1000));
    
    const user: Player = {
      id: `player-${Date.now()}`,
      userId: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      club: data.club,
      state: data.state as Player['state'],
      division: data.division as Player['division'],
      createdAt: new Date().toISOString(),
    };
    
    const session = { user, isAdmin: false };
    localStorage.setItem('amc_session', JSON.stringify(session));
    
    setState({
      user,
      isAuthenticated: true,
      isAdmin: false,
      isLoading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem('amc_session');
    setState({ user: null, isAuthenticated: false, isAdmin: false, isLoading: false });
  };

  const loginAsDemo = () => {
    const session = { user: mockCurrentUser, isAdmin: false };
    localStorage.setItem('amc_session', JSON.stringify(session));
    setState({ user: mockCurrentUser, isAuthenticated: true, isAdmin: false, isLoading: false });
  };

  const loginAsAdmin = () => {
    const adminUser = { ...mockCurrentUser, name: 'Admin User', email: 'admin@amc.com.au' };
    const session = { user: adminUser, isAdmin: true };
    localStorage.setItem('amc_session', JSON.stringify(session));
    setState({ user: adminUser, isAuthenticated: true, isAdmin: true, isLoading: false });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, loginWithMagicLink, logout, register, loginAsDemo, loginAsAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
