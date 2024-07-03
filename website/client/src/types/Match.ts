type PlayerId = string;

interface Team {
  _id: string;
  name: string;
  players: PlayerId[];
  __v: number;
}

export interface Match {
  _id: string;
  matchNumber: number;
  phase: string;
  hasStarted: boolean;
  timestamp: string;
  winner: string | null;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  scorers: string[];
  assisters: string[];
}
