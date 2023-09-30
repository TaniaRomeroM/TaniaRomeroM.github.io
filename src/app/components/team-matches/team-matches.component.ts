import { Component, OnInit } from '@angular/core';
import { IFootballGames } from 'src/app/interfaces/football-updates-interface';
import { FootballUpdatesService } from 'src/app/services/football-updates.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { KEY_TEAMS_MATCHES } from 'src/app/constants/football-constants';

@Component({
  selector: 'app-team-matches',
  templateUrl: './team-matches.component.html',
  styleUrls: ['./team-matches.component.scss']
})
export class TeamMatchesComponent implements OnInit {
  idTeam: any;
  idLeague: any;
  keyTeam: any;
  seasonD = new Date().getFullYear();
  season = this.seasonD.toString();
  teamMatches: IFootballGames[] = [];
  displayedColumns: string[] = ['logoHome', 'nameHome', 'goalsHome', 'split', 'goalsAway', 'nameAway', 'logoAway'];

  constructor(
    private footballUpdatesService: FootballUpdatesService,
    private sessionStorageService: SessionStorageService,
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
      this.idLeague = params['idLeague'];
      this.idTeam = params['idTeam'];
    });
    this.getTeamMatches(this.idLeague, this.season, this.idTeam);
  }

  getTeamMatches(idLeague: string, season: string, idTeam: string) {
    this.keyTeam = KEY_TEAMS_MATCHES + idLeague;

    if(this.sessionStorageService.keyExists(this.keyTeam)) {
      let data = this.sessionStorageService.getStorageCountry(this.keyTeam);
      this.checkTeam(data, idTeam);

    } else {
      this.footballUpdatesService.getTeamsMatches(idLeague, season).subscribe(
        data => {
          data = data.response;
          this.sessionStorageService.saveStorageCountry(this.keyTeam, data);
          this.checkTeam(data, idTeam);
      });
    }
  }

  checkTeam(data: any[], idTeam: string) {
    let standings: any[] = [];

    data.forEach((elem: any) => {
      if(elem.teams.home.id == idTeam || elem.teams.away.id == idTeam) {
        standings.push({
          idLeague: this.idLeague,
          logoHome: elem.teams.home.logo,
          nameHome: elem.teams.home.name,
          goalsHome: elem.goals.home,
          goalsAway: elem.goals.away,
          nameAway: elem.teams.away.name,
          logoAway: elem.teams.away.logo
        });
      }
    });
    this.teamMatches = standings.slice(0, 10);
}

  /*getTeamMatches(idLeague: string, season: string, idTeam: string) {
    this.keyTeam = idLeague + '-' + idTeam;

    if(this.sessionStorageService.keyExists(this.keyTeam)) {
      this.teamMatches = this.sessionStorageService.getStorageCountry(this.keyTeam);

    } else {
      var standings: any[] = [];

      this.footballUpdatesService.getTeamMatches(idLeague, season, idTeam).subscribe(
        data => {
          data = data.response.slice(0, 10);
          data.forEach((elem: any) => {
            standings.push({
              idLeague: this.idLeague,
              logoHome: elem.teams.home.logo,
              nameHome: elem.teams.home.name,
              goalsHome: elem.goals.home,
              goalsAway: elem.goals.away,
              nameAway: elem.teams.away.name,
              logoAway: elem.teams.away.logo
            });
          });
          this.teamMatches = standings;
          this.sessionStorageService.saveStorageCountry(this.keyTeam, this.teamMatches);
      });
    }
  }*/

  goBack(): void {
    this.location.back();
  }

}
