export interface IDataFootballCountry {
  league: League;
}

export interface League {
  id:        string;
  name:      string;
  country:   string;
  logo:      string;
  flag:      string;
  season:    string;
  standings: Array<Standings[]>;
}

export interface Standings{
  rank:        number;
  team:        Team;
  points:      number;
  goalsDiff:   number;
  group:       string;
  form:        string;
  status:      string;
  description: string;
  all:         All;
  home:        All;
  away:        All;
  update:      Date;
}

export interface All {
  played: number;
  win:    number;
  draw:   number;
  lose:   number;
  goals:  Goals;
}

export interface Goals {
  for:     number;
  against: number;
}

export interface Team {
  id:   string;
  name: string;
  logo: string;
}
