import React from 'react';
import { Link } from 'react-router-dom';
import { mockRegistrations, mockMatches, mockSeason } from '../../lib/mockData';

export const AdminOverview: React.FC = () => {
  const totalRegs = mockRegistrations.length;
  const paidRegs = mockRegistrations.filter(r => r.paymentStatus === 'paid').length;
  const pendingPayment = mockRegistrations.filter(r => r.paymentStatus === 'pending').length;
  const totalRevenue = mockRegistrations
    .filter(r => r.paymentStatus === 'paid')
    .reduce((sum, r) => sum + (r.eventType === 'pairs' ? 200 : 100), 0);
  const disputes = mockMatches.filter(m => m.status === 'disputed').length;
  const awaitingConfirm = mockMatches.filter(m => m.status === 'played' && !m.confirmedByLoser).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-bowls-green">Season Overview</h2>
          <p className="text-gray-500 text-sm">{mockSeason.name} — Pool Stage</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge badge-green">
            ● Pool Stage Active
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Total Entries', value: totalRegs, color: 'text-bowls-green' },
          { label: 'Paid', value: paidRegs, color: 'text-green-600' },
          { label: 'Pending Payment', value: pendingPayment, color: 'text-yellow-600' },
          { label: 'Revenue', value: `$${totalRevenue.toLocaleString()}`, color: 'text-bowls-gold-dark' },
          { label: 'Disputes', value: disputes, color: 'text-red-600' },
          { label: 'Awaiting Confirm', value: awaitingConfirm, color: 'text-blue-600' },
        ].map(({ label, value, color }) => (
          <div key={label} className="stat-card">
            <div className={`stat-number ${color}`}>{value}</div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link to="/admin/draws" className="card hover:shadow-md transition-shadow group">
          <div className="text-3xl mb-3">🎲</div>
          <h3 className="font-bold text-bowls-green mb-1 group-hover:text-bowls-green-mid">Generate Pool Draws</h3>
          <p className="text-gray-500 text-sm">Create regional pools from registrations. Groups players by state/region.</p>
        </Link>
        <Link to="/admin/results" className="card hover:shadow-md transition-shadow group">
          <div className="text-3xl mb-3">⚖️</div>
          <h3 className="font-bold text-bowls-green mb-1 group-hover:text-bowls-green-mid">Manage Results</h3>
          <p className="text-gray-500 text-sm">
            {disputes > 0 ? `⚠️ ${disputes} active dispute(s) need attention.` : 'View all results and disputes.'}
          </p>
        </Link>
        <Link to="/admin/registrations" className="card hover:shadow-md transition-shadow group">
          <div className="text-3xl mb-3">📋</div>
          <h3 className="font-bold text-bowls-green mb-1 group-hover:text-bowls-green-mid">View Registrations</h3>
          <p className="text-gray-500 text-sm">Browse all entries, payment status, and player details.</p>
        </Link>
      </div>

      {/* Season timeline */}
      <div className="card">
        <h3 className="font-bold text-bowls-green mb-4">Season Timeline</h3>
        <div className="space-y-3">
          {[
            { label: 'Registration Open', date: 'April 2026', status: 'done' },
            { label: 'Pool Draws Released', date: 'August 2026', status: 'done' },
            { label: 'Pool Stage', date: 'Sep 1 – Oct 15 2026', status: 'active' },
            { label: 'Lucky Losers Confirmed', date: 'Oct 16 2026', status: 'upcoming' },
            { label: 'National Knockout Begins', date: 'Oct 20 2026', status: 'upcoming' },
            { label: 'State Finals', date: 'January 2027', status: 'upcoming' },
            { label: 'National Finals', date: 'February 2027', status: 'upcoming' },
          ].map(({ label, date, status }) => (
            <div key={label} className="flex items-center gap-3 text-sm">
              <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                status === 'done' ? 'bg-bowls-gold' :
                status === 'active' ? 'bg-green-500 animate-pulse' :
                'bg-gray-200'
              }`} />
              <span className={`flex-1 font-medium ${status === 'active' ? 'text-bowls-green' : status === 'done' ? 'text-gray-500' : 'text-gray-400'}`}>
                {label}
              </span>
              <span className="text-gray-400">{date}</span>
              {status === 'active' && <span className="badge badge-green text-xs">Now</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Registrations by state */}
      <div className="card">
        <h3 className="font-bold text-bowls-green mb-4">Registrations by State</h3>
        {(() => {
          const byState: Record<string, number> = {};
          mockRegistrations.forEach(r => {
            const state = r.player.state;
            byState[state] = (byState[state] || 0) + 1;
          });
          return (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(byState).map(([state, count]) => (
                <div key={state} className="bg-gray-50 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-bowls-green">{count}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{state}</div>
                </div>
              ))}
            </div>
          );
        })()}
      </div>
    </div>
  );
};
