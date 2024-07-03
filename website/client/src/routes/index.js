const baseUrl = "https://torneiotemp.ajlordosa.pt/api";
export const routes = {
  login: `${baseUrl}/auth/login`,
  games: `${baseUrl}/games`,
  knockouts: `${baseUrl}/knockouts`,
  groups: `${baseUrl}/groups`,
  matches: `${baseUrl}/matches`,
  teams: `${baseUrl}/teams`,
  groupsScoreboard: `${baseUrl}/scoreboard/groups`,
  knockoutsScoreboard: `${baseUrl}/scoreboard/knockouts`,
  players: `${baseUrl}/players`,
  teamStats: `${baseUrl}/stats/teams`,
  scorers: `${baseUrl}/stats/players`,
  ws: baseUrl.replace('https', 'wss'),
};
