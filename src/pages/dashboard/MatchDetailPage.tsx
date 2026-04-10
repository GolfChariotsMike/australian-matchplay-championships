import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { mockMatches } from '../../lib/mockData';

export const MatchDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  const match = mockMatches.find(m => m.id === id);
  const [messages, setMessages] = useState(match?.messages ?? []);
  const [newMessage, setNewMessage] = useState('');
  const [venue, setVenue] = useState(match?.venue ?? '');
  const [venueSaved, setVenueSaved] = useState(!!match?.venue);
  const [resultMode, setResultMode] = useState(false);
  const [homeScore, setHomeScore] = useState('');
  const [awayScore, setAwayScore] = useState('');
  const [resultSubmitted, setResultSubmitted] = useState(false);
  const [disputeMode, setDisputeMode] = useState(false);
  const [disputeNote, setDisputeNote] = useState('');

  if (!match) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Match not found.</p>
        <Link to="/dashboard/matches" className="text-bowls-green font-medium hover:underline mt-2 inline-block">
          ← Back to matches
        </Link>
      </div>
    );
  }

  const isHome = match.homePlayerId === user?.id;
  const opponent = isHome ? match.awayPlayer : match.homePlayer;
  const isPlayed = match.status === 'played';
  const isWinner = match.winnerId === user?.id;

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const msg = {
      id: `msg-${Date.now()}`,
      matchId: match.id,
      playerId: user!.id,
      playerName: user!.name,
      message: newMessage.trim(),
      createdAt: new Date().toISOString(),
    };
    setMessages(prev => [...prev, msg]);
    setNewMessage('');
    console.log('[MSG STUB] Message saved. Would push via Supabase Realtime.');
  };

  const handleSaveVenue = () => {
    if (!venue.trim()) return;
    setVenueSaved(true);
    console.log('[VENUE STUB] Venue saved:', venue, '| Would notify opponent:', opponent.email);
  };

  const handleSubmitResult = () => {
    if (!homeScore || !awayScore) return;
    const hs = parseInt(homeScore);
    const as_ = parseInt(awayScore);
    console.log('[RESULT STUB] Result submitted:', { homeScore: hs, awayScore: as_ });
    console.log('[EMAIL STUB] Confirmation email sent to loser:', hs > as_ ? opponent.email : user?.email);
    setResultSubmitted(true);
    setResultMode(false);
  };

  const handleDispute = () => {
    if (!disputeNote.trim()) return;
    console.log('[DISPUTE STUB] Dispute raised:', disputeNote);
    console.log('[EMAIL STUB] Admin notified at admin@australianmatchplay.com.au');
    setDisputeMode(false);
    alert('Dispute submitted. Admin will review within 48 hours.');
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('en-AU', {
      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <Link to="/dashboard/matches" className="text-sm text-gray-500 hover:text-bowls-green transition-colors flex items-center gap-1">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Matches
      </Link>

      {/* Match header */}
      <div className="card-green">
        <div className="flex justify-between items-start flex-wrap gap-3">
          <div>
            <div className="text-bowls-gold text-xs font-semibold uppercase tracking-wider mb-1">
              {match.eventType === 'singles_div1' ? 'Singles Div 1' : match.eventType === 'singles_div2' ? 'Singles Div 2' : 'Pairs'} · Pool Match
            </div>
            <h2 className="text-xl font-bold mb-0.5">vs {opponent.name}</h2>
            <p className="text-gray-300 text-sm">{opponent.club}, {opponent.state}</p>
          </div>
          <div className="text-right">
            <div className={`badge ${
              match.status === 'played' ? 'bg-green-500/20 text-green-200' :
              match.status === 'scheduled' ? 'bg-blue-500/20 text-blue-200' :
              match.status === 'disputed' ? 'bg-red-500/20 text-red-200' :
              'bg-white/10 text-gray-300'
            } capitalize`}>
              {match.status}
            </div>
            {isPlayed && (
              <div className="mt-2 text-2xl font-bold text-bowls-gold">
                {isHome ? `${match.homeScore}–${match.awayScore}` : `${match.awayScore}–${match.homeScore}`}
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Your role:</span>
            <span className="text-white font-medium ml-2">{isHome ? '🏠 Home Player' : '✈️ Away Player'}</span>
          </div>
          {match.scheduledDate && (
            <div>
              <span className="text-gray-400">Date:</span>
              <span className="text-white font-medium ml-2">
                {new Date(match.scheduledDate).toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' })}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Result notification */}
      {resultSubmitted && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center gap-2 text-green-700 font-semibold">
            <span>✅</span> Result submitted successfully
          </div>
          <p className="text-green-600 text-sm mt-1">
            Your opponent has been notified to confirm the result. 
            If they dispute, it'll be escalated to admin.
          </p>
        </div>
      )}

      {/* Venue section (home player only) */}
      {isHome && !isPlayed && (
        <div className="card">
          <h3 className="font-bold text-bowls-green mb-3">📍 Venue</h3>
          {venueSaved ? (
            <div>
              <div className="bg-gray-50 rounded-lg p-3 text-gray-700 text-sm mb-3">{venue}</div>
              <button
                onClick={() => setVenueSaved(false)}
                className="text-sm text-bowls-green hover:underline"
              >
                Update venue
              </button>
            </div>
          ) : (
            <div>
              <p className="text-gray-500 text-sm mb-3">
                As the home player, choose your club venue and let your opponent know.
              </p>
              <input
                type="text"
                className="input-field mb-3"
                placeholder="e.g. Perth Bowling Club, 42 Mill Street, Perth WA"
                value={venue}
                onChange={e => setVenue(e.target.value)}
              />
              <button onClick={handleSaveVenue} className="btn-primary text-sm py-2">
                Save & Notify Opponent
              </button>
            </div>
          )}
        </div>
      )}

      {/* Venue display (away player) */}
      {!isHome && match.venue && (
        <div className="card">
          <h3 className="font-bold text-bowls-green mb-2">📍 Venue</h3>
          <p className="text-gray-700">{match.venue}</p>
          <p className="text-xs text-gray-400 mt-1">Set by your opponent</p>
        </div>
      )}

      {/* Result submission */}
      {!isPlayed && !resultSubmitted && (
        <div className="card">
          <h3 className="font-bold text-bowls-green mb-3">Submit Result</h3>
          {!resultMode ? (
            <div>
              <p className="text-gray-500 text-sm mb-4">
                Once your match is played, the winner submits the result. Your opponent will confirm.
              </p>
              <button
                onClick={() => setResultMode(true)}
                className="btn-primary text-sm py-2.5"
              >
                Submit Result
              </button>
            </div>
          ) : (
            <div>
              <p className="text-gray-500 text-sm mb-4">Enter the final score (your score first):</p>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1">
                  <label className="label text-xs">{user?.name} (You)</label>
                  <input
                    type="number"
                    className="input-field text-center text-2xl font-bold"
                    placeholder="0"
                    min="0"
                    max="50"
                    value={isHome ? homeScore : awayScore}
                    onChange={e => isHome ? setHomeScore(e.target.value) : setAwayScore(e.target.value)}
                  />
                </div>
                <div className="text-2xl font-bold text-gray-400 mt-6">–</div>
                <div className="flex-1">
                  <label className="label text-xs">{opponent.name}</label>
                  <input
                    type="number"
                    className="input-field text-center text-2xl font-bold"
                    placeholder="0"
                    min="0"
                    max="50"
                    value={isHome ? awayScore : homeScore}
                    onChange={e => isHome ? setAwayScore(e.target.value) : setHomeScore(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setResultMode(false)} className="btn-secondary flex-1 justify-center text-sm py-2">
                  Cancel
                </button>
                <button onClick={handleSubmitResult} className="btn-primary flex-1 justify-center text-sm py-2">
                  Submit Result
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Dispute section */}
      {isPlayed && !isWinner && !match.confirmedByLoser && (
        <div className="card border border-yellow-200 bg-yellow-50">
          <h3 className="font-bold text-yellow-800 mb-2">⚠️ Confirm or Dispute Result</h3>
          <p className="text-yellow-700 text-sm mb-4">
            {opponent.name} has submitted a result. Do you agree with the score?
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => console.log('[RESULT] Confirmed by loser')}
              className="btn-primary flex-1 justify-center text-sm py-2.5"
            >
              ✓ Confirm Result
            </button>
            <button
              onClick={() => setDisputeMode(true)}
              className="btn-danger flex-1 justify-center text-sm py-2.5"
            >
              Dispute Result
            </button>
          </div>
          {disputeMode && (
            <div className="mt-4">
              <label className="label text-sm">Describe the dispute:</label>
              <textarea
                className="input-field text-sm"
                rows={3}
                placeholder="Explain the issue..."
                value={disputeNote}
                onChange={e => setDisputeNote(e.target.value)}
              />
              <div className="flex gap-3 mt-3">
                <button onClick={() => setDisputeMode(false)} className="btn-secondary text-sm py-2 flex-1 justify-center">
                  Cancel
                </button>
                <button onClick={handleDispute} className="btn-danger text-sm py-2 flex-1 justify-center">
                  Submit Dispute
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Messaging */}
      <div className="card">
        <h3 className="font-bold text-bowls-green mb-4">💬 Match Chat</h3>
        
        <div className="space-y-3 mb-4 max-h-80 overflow-y-auto">
          {messages.length === 0 && (
            <p className="text-gray-400 text-sm text-center py-4">
              No messages yet. Use this to organise your match.
            </p>
          )}
          {messages.map(msg => {
            const isMe = msg.playerId === user?.id;
            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs rounded-2xl px-4 py-2.5 ${
                  isMe
                    ? 'bg-bowls-green text-white rounded-br-sm'
                    : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                }`}>
                  {!isMe && (
                    <div className="text-xs font-semibold mb-1 text-bowls-gold">{msg.playerName}</div>
                  )}
                  <p className="text-sm">{msg.message}</p>
                  <div className={`text-xs mt-1 ${isMe ? 'text-green-200' : 'text-gray-400'}`}>
                    {formatTime(msg.createdAt)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            className="input-field flex-1 text-sm py-2.5"
            placeholder="Send a message..."
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="btn-primary px-4 py-2.5 disabled:opacity-40"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
