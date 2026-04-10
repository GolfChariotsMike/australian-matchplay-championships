import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { RegisterData } from '../context/AuthContext';

const STATES = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'];

type Step = 'account' | 'profile' | 'events' | 'payment';

const StepIndicator: React.FC<{ steps: string[]; current: number }> = ({ steps, current }) => (
  <div className="flex items-center gap-0 mb-8">
    {steps.map((label, i) => (
      <React.Fragment key={label}>
        <div className="flex flex-col items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
            i < current
              ? 'bg-bowls-gold text-bowls-green-dark'
              : i === current
              ? 'bg-bowls-green text-white ring-4 ring-bowls-green/20'
              : 'bg-gray-200 text-gray-500'
          }`}>
            {i < current ? '✓' : i + 1}
          </div>
          <span className={`text-xs mt-1 font-medium hidden sm:block ${
            i === current ? 'text-bowls-green' : i < current ? 'text-bowls-gold' : 'text-gray-400'
          }`}>
            {label}
          </span>
        </div>
        {i < steps.length - 1 && (
          <div className={`flex-1 h-0.5 mx-1 transition-colors ${i < current ? 'bg-bowls-gold' : 'bg-gray-200'}`} />
        )}
      </React.Fragment>
    ))}
  </div>
);

interface EventSelection {
  singles_div1: boolean;
  singles_div2: boolean;
  pairs: boolean;
  partnerEmail: string;
}

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('account');
  const stepIndex = ['account', 'profile', 'events', 'payment'].indexOf(step);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [accountData, setAccountData] = useState({ email: '', password: '', confirmPassword: '' });
  const [profileData, setProfileData] = useState({
    name: '', phone: '', club: '', state: '', division: 'div1'
  });
  const [events, setEvents] = useState<EventSelection>({
    singles_div1: false,
    singles_div2: false,
    pairs: false,
    partnerEmail: '',
  });

  const totalCost = () => {
    let cost = 0;
    if (events.singles_div1) cost += 100;
    if (events.singles_div2) cost += 100;
    if (events.pairs) cost += 200;
    return cost;
  };

  const handleAccountNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (accountData.password !== accountData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (accountData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    setError('');
    setStep('profile');
  };

  const handleProfileNext = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setStep('events');
  };

  const handleEventsNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!events.singles_div1 && !events.singles_div2 && !events.pairs) {
      setError('Please select at least one event');
      return;
    }
    if (events.pairs && !events.partnerEmail) {
      setError('Please enter your partner\'s email for the Pairs event');
      return;
    }
    setError('');
    setStep('payment');
  };

  const handlePayment = async () => {
    // Stub — in production, create Stripe checkout session
    console.log('[STRIPE STUB] Would create checkout session for:', {
      events,
      total: totalCost(),
      email: accountData.email,
    });

    setLoading(true);
    try {
      const regData: RegisterData = {
        name: profileData.name,
        email: accountData.email,
        password: accountData.password,
        phone: profileData.phone,
        club: profileData.club,
        state: profileData.state,
        division: profileData.division,
      };
      await register(regData);
      navigate('/dashboard?registered=true');
    } catch {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bowls-cream py-8 px-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <Link to="/" className="text-sm text-gray-500 hover:text-bowls-green transition-colors">
            ← Back to home
          </Link>
          <h1 className="text-2xl font-bold text-bowls-green mt-3">Register for 2026</h1>
          <p className="text-gray-500 text-sm">Australian Matchplay Championships</p>
        </div>

        <StepIndicator
          steps={['Account', 'Profile', 'Events', 'Payment']}
          current={stepIndex}
        />

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
            {error}
          </div>
        )}

        {/* Step 1: Account */}
        {step === 'account' && (
          <div className="card">
            <h2 className="text-xl font-bold text-bowls-green mb-1">Create your account</h2>
            <p className="text-gray-500 text-sm mb-6">You'll use these credentials to access AMC.</p>
            <form onSubmit={handleAccountNext} className="form-section">
              <div>
                <label className="label">Email Address</label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="you@example.com"
                  value={accountData.email}
                  onChange={e => setAccountData(p => ({ ...p, email: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input-field"
                  placeholder="Minimum 8 characters"
                  value={accountData.password}
                  onChange={e => setAccountData(p => ({ ...p, password: e.target.value }))}
                  required
                  minLength={8}
                />
              </div>
              <div>
                <label className="label">Confirm Password</label>
                <input
                  type="password"
                  className="input-field"
                  placeholder="Repeat your password"
                  value={accountData.confirmPassword}
                  onChange={e => setAccountData(p => ({ ...p, confirmPassword: e.target.value }))}
                  required
                />
              </div>
              <button type="submit" className="btn-primary w-full justify-center mt-2">
                Continue →
              </button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-4">
              Already registered?{' '}
              <Link to="/login" className="text-bowls-green font-semibold hover:underline">Sign in</Link>
            </p>
          </div>
        )}

        {/* Step 2: Profile */}
        {step === 'profile' && (
          <div className="card">
            <h2 className="text-xl font-bold text-bowls-green mb-1">Your Details</h2>
            <p className="text-gray-500 text-sm mb-6">Used for your draw placement and match coordination.</p>
            <form onSubmit={handleProfileNext} className="form-section">
              <div>
                <label className="label">Full Name</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="John Smith"
                  value={profileData.name}
                  onChange={e => setProfileData(p => ({ ...p, name: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="label">Mobile Phone</label>
                <input
                  type="tel"
                  className="input-field"
                  placeholder="04XX XXX XXX"
                  value={profileData.phone}
                  onChange={e => setProfileData(p => ({ ...p, phone: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="label">Bowling Club</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Perth Bowling Club"
                  value={profileData.club}
                  onChange={e => setProfileData(p => ({ ...p, club: e.target.value }))}
                  required
                />
                <p className="text-xs text-gray-400 mt-1">Your club is used for regional pool grouping to minimise travel.</p>
              </div>
              <div>
                <label className="label">State / Territory</label>
                <select
                  className="input-field"
                  value={profileData.state}
                  onChange={e => setProfileData(p => ({ ...p, state: e.target.value }))}
                  required
                >
                  <option value="">Select your state</option>
                  {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep('account')}
                  className="btn-secondary flex-1 justify-center"
                >
                  ← Back
                </button>
                <button type="submit" className="btn-primary flex-1 justify-center">
                  Continue →
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Events */}
        {step === 'events' && (
          <div className="card">
            <h2 className="text-xl font-bold text-bowls-green mb-1">Choose Your Event(s)</h2>
            <p className="text-gray-500 text-sm mb-6">You can enter multiple events. Each has a separate entry fee.</p>
            <form onSubmit={handleEventsNext} className="space-y-4">
              {/* Singles Div 1 */}
              <label className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${events.singles_div1 ? 'border-bowls-green bg-bowls-green/5' : 'border-gray-200 hover:border-gray-300'}`}>
                <input
                  type="checkbox"
                  className="mt-1 w-5 h-5 text-bowls-green accent-bowls-green"
                  checked={events.singles_div1}
                  onChange={e => setEvents(p => ({ ...p, singles_div1: e.target.checked }))}
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-gray-900">Singles — Division 1+</div>
                      <div className="text-sm text-gray-500 mt-0.5">For current Div 1/2/3 pennant players</div>
                    </div>
                    <div className="text-bowls-green font-bold text-lg">$100</div>
                  </div>
                </div>
              </label>

              {/* Singles Div 2 */}
              <label className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${events.singles_div2 ? 'border-bowls-green bg-bowls-green/5' : 'border-gray-200 hover:border-gray-300'}`}>
                <input
                  type="checkbox"
                  className="mt-1 w-5 h-5 accent-bowls-green"
                  checked={events.singles_div2}
                  onChange={e => setEvents(p => ({ ...p, singles_div2: e.target.checked }))}
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-gray-900">Singles — Division 2+</div>
                      <div className="text-sm text-gray-500 mt-0.5">For Div 2/3/social players</div>
                    </div>
                    <div className="text-bowls-green font-bold text-lg">$100</div>
                  </div>
                </div>
              </label>

              {/* Pairs */}
              <label className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${events.pairs ? 'border-bowls-green bg-bowls-green/5' : 'border-gray-200 hover:border-gray-300'}`}>
                <input
                  type="checkbox"
                  className="mt-1 w-5 h-5 accent-bowls-green"
                  checked={events.pairs}
                  onChange={e => setEvents(p => ({ ...p, pairs: e.target.checked }))}
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-gray-900">Pairs — Open</div>
                      <div className="text-sm text-gray-500 mt-0.5">Team of 2, open to all divisions</div>
                    </div>
                    <div className="text-bowls-green font-bold text-lg">$200</div>
                  </div>
                  {events.pairs && (
                    <div className="mt-3">
                      <label className="label text-xs">Partner's Email Address</label>
                      <input
                        type="email"
                        className="input-field text-sm"
                        placeholder="partner@example.com"
                        value={events.partnerEmail}
                        onChange={e => setEvents(p => ({ ...p, partnerEmail: e.target.value }))}
                        onClick={e => e.stopPropagation()}
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        Your partner will receive an email to confirm the registration.
                      </p>
                    </div>
                  )}
                </div>
              </label>

              {totalCost() > 0 && (
                <div className="bg-bowls-green/10 border border-bowls-green/30 rounded-xl p-4 flex justify-between items-center">
                  <span className="font-semibold text-bowls-green">Total</span>
                  <span className="text-2xl font-bold text-bowls-green">${totalCost()}</span>
                </div>
              )}

              <div className="flex gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('profile')}
                  className="btn-secondary flex-1 justify-center"
                >
                  ← Back
                </button>
                <button type="submit" className="btn-primary flex-1 justify-center">
                  Continue →
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 4: Payment */}
        {step === 'payment' && (
          <div className="card">
            <h2 className="text-xl font-bold text-bowls-green mb-1">Payment</h2>
            <p className="text-gray-500 text-sm mb-6">Review your entry and complete payment via Stripe.</p>

            {/* Summary */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-2">
              <div className="text-sm font-semibold text-gray-700 mb-3">Order Summary</div>
              {events.singles_div1 && (
                <div className="flex justify-between text-sm">
                  <span>Singles Division 1+</span>
                  <span className="font-semibold">$100</span>
                </div>
              )}
              {events.singles_div2 && (
                <div className="flex justify-between text-sm">
                  <span>Singles Division 2+</span>
                  <span className="font-semibold">$100</span>
                </div>
              )}
              {events.pairs && (
                <div className="flex justify-between text-sm">
                  <span>Pairs (Open)</span>
                  <span className="font-semibold">$200</span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-bowls-green">
                <span>Total</span>
                <span>${totalCost()}</span>
              </div>
            </div>

            <div className="space-y-3 text-sm text-gray-600 mb-6">
              <div className="flex items-start gap-2">
                <span className="text-bowls-gold mt-0.5">✓</span>
                <span>Entering as: <strong>{profileData.name}</strong> — {profileData.club}, {profileData.state}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-bowls-gold mt-0.5">✓</span>
                <span>Guaranteed minimum 4 matches</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-bowls-gold mt-0.5">✓</span>
                <span>Draw will be published before pool stage starts</span>
              </div>
              {events.pairs && events.partnerEmail && (
                <div className="flex items-start gap-2">
                  <span className="text-bowls-gold mt-0.5">✓</span>
                  <span>Partner invite will be emailed to: <strong>{events.partnerEmail}</strong></span>
                </div>
              )}
            </div>

            {/* Stripe stub */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 text-blue-700 text-sm font-medium mb-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Demo Mode
              </div>
              <p className="text-blue-600 text-xs">
                Stripe payment is stubbed. In production, this button redirects to Stripe Checkout. 
                Click to complete demo registration.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep('events')}
                className="btn-secondary flex-1 justify-center"
              >
                ← Back
              </button>
              <button
                onClick={handlePayment}
                disabled={loading}
                className="btn-primary flex-1 justify-center disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <>Pay ${totalCost()} via Stripe</>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
