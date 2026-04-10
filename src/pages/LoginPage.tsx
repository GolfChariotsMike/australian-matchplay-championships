import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const { login, loginWithMagicLink, loginAsDemo, loginAsAdmin } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'password' | 'magic'>('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [magicSent, setMagicSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'magic') {
        await loginWithMagicLink(email);
        setMagicSent(true);
      } else {
        await login(email, password);
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (magicSent) {
    return (
      <div className="min-h-screen bg-bowls-cream flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="card text-center py-12">
            <div className="text-5xl mb-4">📬</div>
            <h2 className="text-2xl font-bold text-bowls-green mb-3">Check Your Email</h2>
            <p className="text-gray-600 mb-2">We sent a sign-in link to</p>
            <p className="font-semibold text-bowls-green mb-6">{email}</p>
            <p className="text-gray-500 text-sm">Click the link in your email to sign in. It expires in 1 hour.</p>
            <button
              className="mt-6 text-bowls-green hover:text-bowls-green-dark text-sm font-medium transition-colors"
              onClick={() => setMagicSent(false)}
            >
              ← Try a different email
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bowls-cream flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-bowls-green mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl">🎯</span>
          </div>
          <h1 className="text-2xl font-bold text-bowls-green">Welcome Back</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to your AMC account</p>
        </div>

        <div className="card">
          {/* Mode toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${mode === 'password' ? 'bg-white text-bowls-green shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setMode('password')}
            >
              Email & Password
            </button>
            <button
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${mode === 'magic' ? 'bg-white text-bowls-green shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setMode('magic')}
            >
              Magic Link
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Email Address</label>
              <input
                type="email"
                className="input-field"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            {mode === 'password' && (
              <div>
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input-field"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {mode === 'magic' ? 'Sending link...' : 'Signing in...'}
                </span>
              ) : (
                mode === 'magic' ? 'Send Magic Link' : 'Sign In'
              )}
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-gray-100">
            <p className="text-center text-sm text-gray-500 mb-3">Demo access</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => { loginAsDemo(); navigate('/dashboard'); }}
                className="btn-secondary text-sm py-2 justify-center"
              >
                Demo Player
              </button>
              <button
                onClick={() => { loginAsAdmin(); navigate('/admin'); }}
                className="btn-secondary text-sm py-2 justify-center"
              >
                Demo Admin
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-bowls-green font-semibold hover:text-bowls-green-mid transition-colors">
            Register for 2026
          </Link>
        </p>
      </div>
    </div>
  );
};
