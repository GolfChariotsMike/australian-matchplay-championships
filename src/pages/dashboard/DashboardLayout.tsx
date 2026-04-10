import React from 'react';
import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { to: '/dashboard', label: 'Overview', icon: '📊', exact: true },
  { to: '/dashboard/matches', label: 'My Matches', icon: '🎯' },
  { to: '/dashboard/pool', label: 'My Pool', icon: '📋' },
  { to: '/dashboard/profile', label: 'Profile', icon: '👤' },
];

export const DashboardLayout: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bowls-cream">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-bowls-green border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const isActive = (to: string, exact?: boolean) => {
    if (exact) return location.pathname === to;
    return location.pathname.startsWith(to);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard header */}
      <div className="bg-bowls-green text-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-bold text-lg">My Dashboard</h1>
              <p className="text-bowls-gold text-sm">2026 Season — Pool Stage</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-300">{user?.name}</p>
              <p className="text-xs text-gray-400">{user?.club}</p>
            </div>
          </div>
        </div>

        {/* Tab nav */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto pb-0">
            {navItems.map(item => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                  isActive(item.to, item.exact)
                    ? 'border-bowls-gold text-bowls-gold'
                    : 'border-transparent text-gray-300 hover:text-white hover:border-white/50'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </div>
    </div>
  );
};
