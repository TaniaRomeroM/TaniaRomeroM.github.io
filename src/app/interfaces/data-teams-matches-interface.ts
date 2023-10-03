export interface IDataTeamMatches {
  fixture: Fixture;
  league:  League;
  teams:   Teams;
  goals:   Goals;
  score:   Score;
}

export interface Fixture {
  id:        number;
  referee:   string;
  timezone:  string;
  date:      Date;
  timestamp: number;
  periods:   Periods;
  venue:     Venue;
  status:    Status;
}

export interface Teams {
  home:   AwayClass;
  away:   AwayClass;
}

export interface Periods {
  first:  number;
  second: number;
}

export interface Status {
  long:    string;
  short:   string;
  elapsed: number;
}

export interface Venue {
  id:   number;
  name: string;
  city: string;
}

export interface Goals {
  home: number;
  away: number;
}

export interface AwayClass {
  id:     string;
  name:   string;
  logo:   string;
  winner: boolean;
}

export interface League {
  id:      number;
  name:    string;
  country: string;
  logo:    string;
  flag:    string;
  season:  number;
  round:   string;
}

export interface Score {
  halftime:  Goals;
  fulltime:  Goals;
  extratime: Goals;
  penalty:   Goals;
}
