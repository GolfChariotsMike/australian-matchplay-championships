import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const Navbar: React.FC = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname.startsWith(path);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <nav className="bg-bowls-green-dark border-b border-bowls-green/30 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" onClick={() => setMenuOpen(false)}>
            <div className="w-9 h-9 rounded-full bg-bowls-gold flex items-center justify-center shadow-md group-hover:bg-bowls-gold-light transition-colors">
              <span className="text-bowls-green-dark font-bold text-sm">🎯</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-bold text-sm leading-tight">Australian Matchplay</div>
              <div className="text-bowls-gold text-xs font-semibold tracking-wider uppercase">Championships</div>
            </div>
            <div className="block sm:hidden">
              <div className="text-white font-bold text-sm">AMC</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'nav-link-active' : ''}`}>
                  Dashboard
                </Link>
                <Link to="/dashboard/matches" className={`nav-link ${isActive('/dashboard/matches') ? 'nav-link-active' : ''}`}>
                  My Matches
                </Link>
                {isAdmin && (
                  <Link to="/admin" className={`nav-link ${isActive('/admin') ? 'nav-link-active' : ''}`}>
                    Admin
                  </Link>
                )}
                <div className="flex items-center gap-3 pl-4 border-l border-white/20">
                  <span className="text-gray-300 text-sm">{user?.name}</span>
                  <button onClick={handleLogout} className="text-gray-400 hover:text-white text-sm transition-colors">
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/#format" className="nav-link">How It Works</Link>
                <Link to="/login" className={`nav-link ${isActive('/login') ? 'nav-link-active' : ''}`}>
                  Sign In
                </Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-4">
                  Register Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-bowls-green border-t border-bowls-green/50 px-4 py-4 space-y-3">
          {isAuthenticated ? (
            <>
              <div className="text-bowls-gold text-sm font-semibold pb-2 border-b border-white/20">
                {user?.name}
              </div>
              <Link to="/dashboard" className="block nav-link py-2" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <Link to="/dashboard/matches" className="block nav-link py-2" onClick={() => setMenuOpen(false)}>My Matches</Link>
              {isAdmin && (
                <Link to="/admin" className="block nav-link py-2" onClick={() => setMenuOpen(false)}>Admin</Link>
              )}
              <button onClick={handleLogout} className="block text-red-400 hover:text-red-300 py-2 text-left w-full">
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="block nav-link py-2" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/login" className="block nav-link py-2" onClick={() => setMenuOpen(false)}>Sign In</Link>
              <Link to="/register" className="block" onClick={() => setMenuOpen(false)}>
                <span className="btn-primary text-sm py-2.5 w-full justify-center">Register Now</span>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};
