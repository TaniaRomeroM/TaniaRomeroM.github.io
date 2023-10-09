export const ID_ENGLAND = '39';
export const ID_SPAIN = '140';
export const ID_FRANCE = '61';
export const ID_GERMANY = '78';
export const ID_ITALY = '135';
export const KEY_TEAMS_MATCHES = 'TeamsMatches';
export const TITLE = 'FOOTBALL UPDATES';
export const START_SEASON_MONTHDAY = '07-01';

export const COUNTRY_SELECT = [
  {
    id: 'englandSelect',
    value: 'england',
    name: 'England'
  }, {
    id: 'spainSelect',
    value: 'spain',
    name: 'Spain'
  }, {
    id: 'germanySelect',
    value: 'germany',
    name: 'Germany'
  }, {
    id: 'franceSelect',
    value: 'france',
    name: 'France'
  }, {
    id: 'italySelect',
    value: 'italy',
    name: 'Italy'
  }
]

export interface CountrySelect {
  id:        string;
  value:     string;
  name:      string;
}
