export type State = 'NSW' | 'VIC' | 'QLD' | 'WA' | 'SA' | 'TAS' | 'ACT' | 'NT';
export type Division = 'div1' | 'div2';
export type EventType = 'singles_div1' | 'singles_div2' | 'pairs';
export type PaymentStatus = 'pending' | 'paid' | 'refunded';
export type MatchStatus = 'pending' | 'scheduled' | 'played' | 'disputed' | 'forfeited';
export type CompetitionType = 'pool' | 'main' | 'plate';
export type SeasonStatus = 'upcoming' | 'registration' | 'pool_stage' | 'knockout' | 'finals' | 'complete';

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  club: string;
  state: State;
  isAdmin: boolean;
  createdAt: string;
}

export interface Player {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  club: string;
  state: State;
  division?: Division;
  createdAt: string;
}

export interface Registration {
  id: string;
  playerId: string;
  player: Player;
  eventType: EventType;
  partnerId?: string;
  partner?: Player;
  paymentStatus: PaymentStatus;
  stripeSessionId?: string;
  season: string;
  createdAt: string;
}

export interface Pool {
  id: string;
  eventType: EventType;
  region: string;
  season: string;
  players: PoolPlayer[];
}

export interface PoolPlayer {
  poolId: string;
  playerId: string;
  player: Player;
  points: number;
  shotDiff: number;
  position: number;
  wins: number;
  losses: number;
  played: number;
}

export interface Match {
  id: string;
  poolId?: string;
  round: number;
  eventType: EventType;
  competitionType: CompetitionType;
  homePlayerId: string;
  homePlayer: Player;
  awayPlayerId: string;
  awayPlayer: Player;
  venue?: string;
  scheduledDate?: string;
  status: MatchStatus;
  winnerId?: string;
  homeScore?: number;
  awayScore?: number;
  confirmedByLoser: boolean;
  disputeNotes?: string;
  messages: MatchMessage[];
}

export interface MatchMessage {
  id: string;
  matchId: string;
  playerId: string;
  playerName: string;
  message: string;
  createdAt: string;
}

export interface Season {
  id: string;
  name: string;
  status: SeasonStatus;
  poolStart?: string;
  poolEnd?: string;
  knockoutStart?: string;
  finalsDate?: string;
}
