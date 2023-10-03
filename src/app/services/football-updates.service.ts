import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IDataFootballCountry } from '../interfaces/data-football-country-interface';
import { ApiResponse } from '../interfaces/api-response-interface';
import { IDataTeamMatches } from '../interfaces/data-teams-matches-interface';

@Injectable({
  providedIn: 'root'
})
export class FootballUpdatesService {

  constructor(private httpClient: HttpClient) { }

  getFootballCountry(league: string, season: string): Observable<IDataFootballCountry[]> {
    let url: string = "https://v3.football.api-sports.io/standings?league=:league&season=:season";
    let headers: HttpHeaders = new HttpHeaders();

    headers = headers.append("x-rapidapi-key", "5b90c16d764a13008b180becf77abd0b");
    headers = headers.append("x-rapidapi-host", "v3.football.api-sports.io");

    let requestOptions = {
      method: 'GET',
      headers: headers,
      redirect: 'follow'
    };
    url = url.replace(":league", league).replace(":season", season);
    return this.httpClient.get<ApiResponse<IDataFootballCountry>>(url, requestOptions).pipe(map(response => response.response));
  }

  getTeamsMatches(idLeague: string, season: string, from: string, to: string): Observable<IDataTeamMatches[]> {
    // makes only one call per league
    let url: string = "https://v3.football.api-sports.io/fixtures?league=:league&season=:season&from=:from&to=:to";
    let headers: HttpHeaders = new HttpHeaders();

    headers = headers.append("x-rapidapi-key", "5b90c16d764a13008b180becf77abd0b");
    headers = headers.append("x-rapidapi-host", "v3.football.api-sports.io");

    let requestOptions = {
      method: 'GET',
      headers: headers,
      redirect: 'follow'
    };
    url = url.replace(":league", idLeague).replace(":season", season).replace(":from", from).replace(":to", to);
    return this.httpClient.get<ApiResponse<IDataTeamMatches>>(url, requestOptions).pipe(map(response => response.response));
  }
}
