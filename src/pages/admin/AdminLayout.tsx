import React from 'react';
import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { to: '/admin', label: 'Overview', icon: '📊', exact: true },
  { to: '/admin/registrations', label: 'Registrations', icon: '📋' },
  { to: '/admin/draws', label: 'Draws', icon: '🎲' },
  { to: '/admin/results', label: 'Results & Disputes', icon: '⚖️' },
];

export const AdminLayout: React.FC = () => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bowls-cream">
        <div className="w-10 h-10 border-4 border-bowls-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;

  const isActive = (to: string, exact?: boolean) => {
    if (exact) return location.pathname === to;
    return location.pathname.startsWith(to);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-bowls-green-dark text-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-bowls-gold flex items-center justify-center">
              <span className="text-bowls-green-dark font-bold text-sm">A</span>
            </div>
            <div>
              <h1 className="font-bold text-lg">Admin Panel</h1>
              <p className="text-gray-400 text-xs">Australian Matchplay Championships 2026</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {navItems.map(item => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                  isActive(item.to, item.exact)
                    ? 'border-bowls-gold text-bowls-gold'
                    : 'border-transparent text-gray-300 hover:text-white hover:border-white/40'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </div>
    </div>
  );
};
