import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FootballUpdatesService {


  constructor(private httpClient: HttpClient) { }

  getFootballCountry(league: string, season: string): Observable<any> {
    var url: string = "https://v3.football.api-sports.io/standings?league=:league&season=:season";
    var headers = new HttpHeaders();

    headers = headers.append("x-rapidapi-key", "5b90c16d764a13008b180becf77abd0b");
    headers = headers.append("x-rapidapi-host", "v3.football.api-sports.io");

    var requestOptions = {
      method: 'GET',
      headers: headers,
      redirect: 'follow'
    };
    url = url.replace(":league", league).replace(":season", season);
    return this.httpClient.get(url, requestOptions);
  }

  getTeamMatches(idLeague: string, season: string, idTeam: string): Observable<any> {
    var url: string = "https://v3.football.api-sports.io/fixtures?league=:league&season=:season&team=:team";

    var headers = new HttpHeaders();

    headers = headers.append("x-rapidapi-key", "5b90c16d764a13008b180becf77abd0b");
    headers = headers.append("x-rapidapi-host", "v3.football.api-sports.io");

    var requestOptions = {
      method: 'GET',
      headers: headers,
      redirect: 'follow'
    };
    url = url.replace(":league", idLeague).replace(":season", season).replace(":team", idTeam);
    return this.httpClient.get(url, requestOptions);
  }

}
