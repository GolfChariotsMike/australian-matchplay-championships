import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { mockMatches } from '../../lib/mockData';

const statusConfig: Record<string, { label: string; class: string; icon: string }> = {
  pending: { label: 'Pending', class: 'badge-gray', icon: '⏳' },
  scheduled: { label: 'Scheduled', class: 'badge-blue', icon: '📅' },
  played: { label: 'Played', class: 'badge-green', icon: '✅' },
  disputed: { label: 'Disputed', class: 'badge-red', icon: '⚠️' },
  forfeited: { label: 'Forfeited', class: 'badge-gray', icon: '🚫' },
};

export const MatchesPage: React.FC = () => {
  const { user } = useAuth();
  const myMatches = mockMatches.filter(
    m => m.homePlayerId === user?.id || m.awayPlayerId === user?.id
  );

  const pending = myMatches.filter(m => m.status === 'pending');
  const scheduled = myMatches.filter(m => m.status === 'scheduled');
  const completed = myMatches.filter(m => m.status === 'played' || m.status === 'forfeited' || m.status === 'disputed');

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString('en-AU', {
      weekday: 'short', day: 'numeric', month: 'short'
    });
  };

  const MatchCard: React.FC<{ matchId: string }> = ({ matchId }) => {
    const match = myMatches.find(m => m.id === matchId)!;
    const opponent = match.homePlayerId === user?.id ? match.awayPlayer : match.homePlayer;
    const isHome = match.homePlayerId === user?.id;
    const status = statusConfig[match.status];
    const won = match.status === 'played' && match.winnerId === user?.id;
    const lost = match.status === 'played' && match.winnerId && match.winnerId !== user?.id;

    return (
      <Link
        to={`/dashboard/matches/${match.id}`}
        className="card hover:shadow-md transition-all group flex gap-4"
      >
        {/* Result indicator */}
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 ${
          won ? 'bg-green-100 text-green-700' :
          lost ? 'bg-red-100 text-red-700' :
          'bg-gray-100 text-gray-500'
        }`}>
          {won ? 'WIN' : lost ? 'LOSS' : status.icon}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2 flex-wrap">
            <div>
              <div className="font-bold text-gray-900">{opponent.name}</div>
              <div className="text-sm text-gray-500">{opponent.club}, {opponent.state}</div>
              <div className="text-xs text-gray-400 mt-0.5">
                {isHome ? '🏠 Home' : '✈️ Away'} · Round {match.round} Pool Match
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className={`badge ${status.class}`}>{status.label}</span>
              {match.status === 'played' && (
                <div className="text-sm font-bold text-gray-700">
                  {isHome ? `${match.homeScore}–${match.awayScore}` : `${match.awayScore}–${match.homeScore}`}
                </div>
              )}
            </div>
          </div>
          {match.venue && (
            <div className="text-xs text-gray-500 mt-2">📍 {match.venue}</div>
          )}
          {match.scheduledDate && (
            <div className="text-xs text-gray-500 mt-1">📅 {formatDate(match.scheduledDate)}</div>
          )}
          {match.messages.length > 0 && (
            <div className="text-xs text-bowls-green mt-2 font-medium">
              💬 {match.messages.length} message{match.messages.length > 1 ? 's' : ''}
            </div>
          )}
        </div>

        <svg className="w-5 h-5 text-gray-300 group-hover:text-bowls-green transition-colors self-center flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-bowls-green mb-1">My Matches</h2>
        <p className="text-gray-500 text-sm">2026 Season — Pool Stage</p>
      </div>

      {pending.length > 0 && (
        <section>
          <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span>⏳</span> Action Required ({pending.length})
          </h3>
          <div className="space-y-3">
            {pending.map(m => <MatchCard key={m.id} matchId={m.id} />)}
          </div>
        </section>
      )}

      {scheduled.length > 0 && (
        <section>
          <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span>📅</span> Scheduled ({scheduled.length})
          </h3>
          <div className="space-y-3">
            {scheduled.map(m => <MatchCard key={m.id} matchId={m.id} />)}
          </div>
        </section>
      )}

      {completed.length > 0 && (
        <section>
          <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span>✅</span> Completed ({completed.length})
          </h3>
          <div className="space-y-3">
            {completed.map(m => <MatchCard key={m.id} matchId={m.id} />)}
          </div>
        </section>
      )}

      {myMatches.length === 0 && (
        <div className="card text-center py-12">
          <div className="text-5xl mb-4">🎯</div>
          <h3 className="font-bold text-bowls-green text-xl mb-2">No Matches Yet</h3>
          <p className="text-gray-500">Pool draws will be announced before the season starts.</p>
        </div>
      )}
    </div>
  );
};
