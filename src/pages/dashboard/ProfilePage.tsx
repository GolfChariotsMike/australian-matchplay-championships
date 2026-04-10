import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockRegistrations } from '../../lib/mockData';

const STATES = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'];

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: user?.name ?? '',
    phone: user?.phone ?? '',
    club: user?.club ?? '',
    state: user?.state ?? '',
  });

  const myRegs = mockRegistrations.filter(r => r.playerId === user?.id);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[PROFILE STUB] Update profile:', form);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const eventLabel: Record<string, string> = {
    singles_div1: 'Singles — Division 1+',
    singles_div2: 'Singles — Division 2+',
    pairs: 'Pairs — Open',
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-bowls-green">My Profile</h2>

      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-green-700 text-sm flex items-center gap-2">
          <span>✅</span> Profile updated successfully
        </div>
      )}

      {/* Profile card */}
      <div className="card">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-bowls-green flex items-center justify-center text-white text-2xl font-bold">
              {user?.name?.charAt(0) ?? 'P'}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{user?.name}</h3>
              <p className="text-gray-500 text-sm">{user?.email}</p>
            </div>
          </div>
          {!editing && (
            <button onClick={() => setEditing(true)} className="btn-secondary text-sm py-2 px-4">
              Edit
            </button>
          )}
        </div>

        {editing ? (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="label">Full Name</label>
              <input
                type="text"
                className="input-field"
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="label">Mobile Phone</label>
              <input
                type="tel"
                className="input-field"
                value={form.phone}
                onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
              />
            </div>
            <div>
              <label className="label">Bowling Club</label>
              <input
                type="text"
                className="input-field"
                value={form.club}
                onChange={e => setForm(p => ({ ...p, club: e.target.value }))}
              />
            </div>
            <div>
              <label className="label">State / Territory</label>
              <select
                className="input-field"
                value={form.state}
                onChange={e => setForm(p => ({ ...p, state: e.target.value }))}
              >
                {STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setEditing(false)} className="btn-secondary flex-1 justify-center text-sm">
                Cancel
              </button>
              <button type="submit" className="btn-primary flex-1 justify-center text-sm">
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <dl className="grid grid-cols-2 gap-4 text-sm">
            {[
              { label: 'Phone', value: user?.phone },
              { label: 'Club', value: user?.club },
              { label: 'State', value: user?.state },
              { label: 'Division', value: user?.division === 'div1' ? 'Division 1+' : 'Division 2+' },
            ].map(({ label, value }) => (
              <div key={label}>
                <dt className="text-gray-400 text-xs font-medium uppercase tracking-wider">{label}</dt>
                <dd className="text-gray-900 font-medium mt-0.5">{value || '—'}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      {/* My registrations */}
      <div className="card">
        <h3 className="font-bold text-bowls-green mb-4">My 2026 Registrations</h3>
        {myRegs.length === 0 ? (
          <p className="text-gray-500 text-sm">No registrations found.</p>
        ) : (
          <div className="space-y-3">
            {myRegs.map(reg => (
              <div key={reg.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl text-sm">
                <div>
                  <div className="font-semibold text-gray-900">{eventLabel[reg.eventType]}</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    Entered {new Date(reg.createdAt).toLocaleDateString('en-AU')}
                  </div>
                </div>
                <div>
                  <span className={`badge ${reg.paymentStatus === 'paid' ? 'badge-green' : 'badge-gold'} capitalize`}>
                    {reg.paymentStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Account */}
      <div className="card">
        <h3 className="font-bold text-bowls-green mb-4">Account</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Email</span>
            <span className="font-medium">{user?.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Password</span>
            <button className="text-bowls-green font-medium hover:underline text-sm">
              Change password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
