export interface IFootball {
  id: string;
  rank: string;
  name: string;
  teamLogo: string;
  gamesPlayed: string;
  wins: string;
  losses: string;
  draws: string;
  goalDifference: string;
  points: string;
}

export interface IFootballGames {
  idLeague: string;
  logoHome: string;
  nameHome: string;
  goalsHome: string;
  goalsAway: string;
  nameAway: string;
  logoAway: string;
}
