import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FootballUpdatesService {

  constructor(private httpClient: HttpClient) { }

  getFootballCountry(league: string, season: string): Observable<any> {
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
    return this.httpClient.get(url, requestOptions);
  }

  getTeamsMatches(idLeague: string, season: string, from: string, to: string): Observable<any> {
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
    return this.httpClient.get(url, requestOptions);
  }
}
