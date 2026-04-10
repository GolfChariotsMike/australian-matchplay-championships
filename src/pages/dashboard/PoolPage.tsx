import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { mockPool, mockMatches } from '../../lib/mockData';

export const PoolPage: React.FC = () => {
  const { user } = useAuth();
  const poolMatches = mockMatches.filter(m => m.poolId === mockPool.id);
  
  const sortedPlayers = [...mockPool.players]
    .sort((a, b) => b.points - a.points || b.shotDiff - a.shotDiff);

  const getMatchResult = (homeId: string, awayId: string) => {
    const m = poolMatches.find(m =>
      (m.homePlayerId === homeId && m.awayPlayerId === awayId) ||
      (m.homePlayerId === awayId && m.awayPlayerId === homeId)
    );
    if (!m || m.status !== 'played') return null;
    if (m.homePlayerId === homeId) {
      return { homeScore: m.homeScore, awayScore: m.awayScore, winnerId: m.winnerId };
    } else {
      return { homeScore: m.awayScore, awayScore: m.homeScore, winnerId: m.winnerId };
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-bowls-green mb-1">My Pool</h2>
        <p className="text-gray-500 text-sm">
          {mockPool.region} · Singles Division 1 · 2026 Season
        </p>
      </div>

      {/* Pool table */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-3">Standings</h3>
        <div className="card p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="table-header">
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Player</th>
                <th className="px-4 py-3 text-center">P</th>
                <th className="px-4 py-3 text-center">W</th>
                <th className="px-4 py-3 text-center">L</th>
                <th className="px-4 py-3 text-center">Pts</th>
                <th className="px-4 py-3 text-center">+/-</th>
              </tr>
            </thead>
            <tbody>
              {sortedPlayers.map((pp, i) => (
                <tr
                  key={pp.playerId}
                  className={`table-row ${pp.playerId === user?.id ? 'bg-bowls-gold/5' : ''} ${i < 2 ? 'border-l-4 border-bowls-gold' : ''}`}
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold text-sm w-5 ${i < 2 ? 'text-bowls-gold' : 'text-gray-400'}`}>
                        {i + 1}
                      </span>
                      {i < 2 && (
                        <span className="text-xs text-bowls-gold">Q</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-semibold text-gray-900">
                      {pp.player.name}
                      {pp.playerId === user?.id && (
                        <span className="ml-1.5 text-xs bg-bowls-gold/20 text-bowls-gold-dark px-1.5 py-0.5 rounded-full font-medium">
                          You
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">{pp.player.club}</div>
                  </td>
                  <td className="px-4 py-4 text-center text-gray-600">{pp.played}</td>
                  <td className="px-4 py-4 text-center text-green-600 font-semibold">{pp.wins}</td>
                  <td className="px-4 py-4 text-center text-red-500 font-semibold">{pp.losses}</td>
                  <td className="px-4 py-4 text-center font-bold text-bowls-green">{pp.points}</td>
                  <td className={`px-4 py-4 text-center font-medium ${pp.shotDiff > 0 ? 'text-green-600' : pp.shotDiff < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                    {pp.shotDiff > 0 ? `+${pp.shotDiff}` : pp.shotDiff}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100 flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <span className="w-3 h-0.5 bg-bowls-gold inline-block" /> Q = Qualifies for knockout
            </span>
            <span>Pts: 2 for win, 0 for loss</span>
          </div>
        </div>
      </div>

      {/* Results matrix */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-3">Results Grid</h3>
        <div className="card p-0 overflow-x-auto">
          <table className="w-full text-xs sm:text-sm min-w-[400px]">
            <thead>
              <tr className="table-header">
                <th className="px-3 py-3 text-left">Player</th>
                {sortedPlayers.map(pp => (
                  <th key={pp.playerId} className="px-3 py-3 text-center">
                    <span title={pp.player.name}>
                      {pp.player.name.split(' ')[0]}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedPlayers.map(rowPlayer => (
                <tr key={rowPlayer.playerId} className={`table-row ${rowPlayer.playerId === user?.id ? 'bg-bowls-gold/5' : ''}`}>
                  <td className="px-3 py-3 font-semibold text-gray-700 whitespace-nowrap">
                    {rowPlayer.player.name.split(' ')[0]}
                    {rowPlayer.playerId === user?.id && <span className="text-bowls-gold"> *</span>}
                  </td>
                  {sortedPlayers.map(colPlayer => {
                    if (rowPlayer.playerId === colPlayer.playerId) {
                      return (
                        <td key={colPlayer.playerId} className="px-3 py-3 text-center bg-gray-100">
                          <span className="text-gray-300">—</span>
                        </td>
                      );
                    }
                    const result = getMatchResult(rowPlayer.playerId, colPlayer.playerId);
                    if (!result) {
                      return (
                        <td key={colPlayer.playerId} className="px-3 py-3 text-center">
                          <span className="text-gray-300">·</span>
                        </td>
                      );
                    }
                    const won = result.winnerId === rowPlayer.playerId;
                    return (
                      <td key={colPlayer.playerId} className="px-3 py-3 text-center">
                        <span className={`font-bold ${won ? 'text-green-600' : 'text-red-500'}`}>
                          {result.homeScore}–{result.awayScore}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Match list */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-3">All Pool Matches</h3>
        <div className="space-y-3">
          {poolMatches.map(match => {
            const isMyMatch = match.homePlayerId === user?.id || match.awayPlayerId === user?.id;
            return (
              <div
                key={match.id}
                className={`card flex items-center justify-between gap-3 flex-wrap ${isMyMatch ? 'border-bowls-green/30 border' : ''}`}
              >
                <div className="flex items-center gap-3 text-sm">
                  <span className="font-semibold text-gray-900">{match.homePlayer.name}</span>
                  <span className="text-gray-400 text-xs">vs</span>
                  <span className="font-semibold text-gray-900">{match.awayPlayer.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {match.status === 'played' ? (
                    <span className="font-bold text-gray-700">{match.homeScore}–{match.awayScore}</span>
                  ) : (
                    <span className="badge badge-gray capitalize">{match.status}</span>
                  )}
                  {isMyMatch && (
                    <Link
                      to={`/dashboard/matches/${match.id}`}
                      className="text-xs text-bowls-green font-medium hover:underline"
                    >
                      Open →
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
