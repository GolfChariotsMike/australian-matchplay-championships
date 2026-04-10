import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { mockMatches, mockPool, mockSeason } from '../../lib/mockData';

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const map: Record<string, string> = {
    pending: 'badge-gray',
    scheduled: 'badge-blue',
    played: 'badge-green',
    disputed: 'badge-red',
    forfeited: 'badge-gray',
  };
  return <span className={`badge ${map[status] || 'badge-gray'} capitalize`}>{status}</span>;
};

export const DashboardOverview: React.FC = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const justRegistered = searchParams.get('registered') === 'true';

  const myMatches = mockMatches.filter(
    m => m.homePlayerId === user?.id || m.awayPlayerId === user?.id
  );

  const nextMatch = myMatches.find(m => m.status === 'scheduled' || m.status === 'pending');
  const myPoolEntry = mockPool.players.find(p => p.playerId === user?.id);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString('en-AU', {
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      {justRegistered && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🎉</span>
            <div>
              <h3 className="font-bold text-green-800">Registration complete! Welcome to AMC 2026.</h3>
              <p className="text-green-700 text-sm mt-1">
                Your entry has been received. Pool draws will be announced before the pool stage starts on{' '}
                {formatDate(mockSeason.poolStart)}. You'll receive an email when your draw is ready.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Season status */}
      <div className="bg-bowls-green rounded-xl p-5 text-white">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="text-bowls-gold text-sm font-semibold uppercase tracking-wider mb-1">
              {mockSeason.name}
            </div>
            <h2 className="text-xl font-bold capitalize">Pool Stage Underway</h2>
            <p className="text-gray-300 text-sm mt-1">
              Pool deadline: {formatDate(mockSeason.poolEnd)} | Knockout starts: {formatDate(mockSeason.knockoutStart)}
            </p>
          </div>
          <div className="text-right">
            <div className="text-bowls-gold text-2xl font-bold">
              {myMatches.filter(m => m.status === 'played').length}/{myMatches.length}
            </div>
            <div className="text-gray-300 text-xs">Matches Played</div>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="stat-number">{myMatches.filter(m => m.status === 'played' && m.winnerId === user?.id).length}</div>
          <div className="stat-label">Wins</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{myMatches.filter(m => m.status === 'played').length}</div>
          <div className="stat-label">Matches Played</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{myPoolEntry?.points ?? 0}</div>
          <div className="stat-label">Pool Points</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">#{myPoolEntry?.position ?? '—'}</div>
          <div className="stat-label">Pool Position</div>
        </div>
      </div>

      {/* Next match */}
      {nextMatch && (
        <div className="card border-l-4 border-bowls-gold">
          <div className="text-xs font-semibold text-bowls-gold uppercase tracking-wider mb-3">Next Match</div>
          <div className="flex justify-between items-start flex-wrap gap-3">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div>
                  <span className="font-bold text-gray-900">
                    {nextMatch.homePlayerId === user?.id ? nextMatch.awayPlayer.name : nextMatch.homePlayer.name}
                  </span>
                  <div className="text-sm text-gray-500">
                    {nextMatch.homePlayerId === user?.id ? nextMatch.awayPlayer.club : nextMatch.homePlayer.club},{' '}
                    {nextMatch.homePlayerId === user?.id ? nextMatch.awayPlayer.state : nextMatch.homePlayer.state}
                  </div>
                </div>
              </div>
              {nextMatch.venue && (
                <div className="text-sm text-gray-600">
                  📍 {nextMatch.venue}
                </div>
              )}
              {nextMatch.scheduledDate && (
                <div className="text-sm text-gray-600">
                  📅 {formatDate(nextMatch.scheduledDate)}
                </div>
              )}
              <div className="mt-2 text-sm text-gray-500">
                {nextMatch.homePlayerId === user?.id ? '🏠 You are the home player — pick the venue' : '✈️ Away match'}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <StatusBadge status={nextMatch.status} />
              <Link to={`/dashboard/matches/${nextMatch.id}`} className="btn-primary text-sm py-2 px-4">
                Open Match →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* My matches list */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-bowls-green text-lg">My Pool Matches</h3>
          <Link to="/dashboard/matches" className="text-sm text-bowls-green font-medium hover:underline">
            View all →
          </Link>
        </div>
        <div className="space-y-3">
          {myMatches.map(match => {
            const opponent = match.homePlayerId === user?.id ? match.awayPlayer : match.homePlayer;
            const isHome = match.homePlayerId === user?.id;
            const won = match.status === 'played' && match.winnerId === user?.id;
            const lost = match.status === 'played' && match.winnerId && match.winnerId !== user?.id;
            
            return (
              <Link
                key={match.id}
                to={`/dashboard/matches/${match.id}`}
                className="card flex items-center justify-between gap-4 hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    won ? 'bg-green-100 text-green-700' :
                    lost ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {won ? 'W' : lost ? 'L' : '—'}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-gray-900 truncate">{opponent.name}</div>
                    <div className="text-xs text-gray-500 truncate">{opponent.club} · {isHome ? 'Home' : 'Away'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  {match.status === 'played' && (
                    <div className="text-sm font-bold text-gray-700">
                      {isHome ? `${match.homeScore}–${match.awayScore}` : `${match.awayScore}–${match.homeScore}`}
                    </div>
                  )}
                  <StatusBadge status={match.status} />
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-bowls-green transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Pool standing teaser */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-bowls-green text-lg">Pool Standing</h3>
          <Link to="/dashboard/pool" className="text-sm text-bowls-green font-medium hover:underline">
            Full table →
          </Link>
        </div>
        <div className="card p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="table-header">
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Player</th>
                <th className="px-4 py-3 text-center">W</th>
                <th className="px-4 py-3 text-center">L</th>
                <th className="px-4 py-3 text-center">Pts</th>
                <th className="px-4 py-3 text-center hidden sm:table-cell">+/-</th>
              </tr>
            </thead>
            <tbody>
              {[...mockPool.players]
                .sort((a, b) => b.points - a.points || b.shotDiff - a.shotDiff)
                .map((pp, i) => (
                <tr key={pp.playerId} className={`table-row ${pp.playerId === user?.id ? 'bg-bowls-gold/5' : ''}`}>
                  <td className="px-4 py-3 font-bold text-gray-500">{i + 1}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-gray-900">
                      {pp.player.name}
                      {pp.playerId === user?.id && <span className="text-bowls-gold ml-1 text-xs">(you)</span>}
                    </div>
                    <div className="text-xs text-gray-500">{pp.player.club}</div>
                  </td>
                  <td className="px-4 py-3 text-center text-green-600 font-semibold">{pp.wins}</td>
                  <td className="px-4 py-3 text-center text-red-500 font-semibold">{pp.losses}</td>
                  <td className="px-4 py-3 text-center font-bold text-bowls-green">{pp.points}</td>
                  <td className="px-4 py-3 text-center hidden sm:table-cell text-gray-600">
                    {pp.shotDiff > 0 ? `+${pp.shotDiff}` : pp.shotDiff}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-4 py-2 bg-gray-50 text-xs text-gray-500 border-t border-gray-100">
            Top 2 advance to national knockout. Lucky losers ranked by points → shot differential.
          </div>
        </div>
      </div>
    </div>
  );
};
