import { Component, OnInit } from '@angular/core';
import { IFootballGames } from 'src/app/interfaces/football-updates-interface';
import { FootballUpdatesService } from 'src/app/services/football-updates.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { KEY_TEAMS_MATCHES, START_SEASON_MONTHDAY } from 'src/app/constants/football-constants';

@Component({
  selector: 'app-team-matches',
  templateUrl: './team-matches.component.html',
  styleUrls: ['./team-matches.component.scss']
})
export class TeamMatchesComponent implements OnInit {
  idTeam: string = '';
  idLeague: string = '';
  keyTeam: string = '';
  season: string = new Date().getFullYear().toString();
  teamMatches: IFootballGames[] = [];
  displayedColumns: string[] = ['logoHome', 'nameHome', 'goalsHome', 'split', 'goalsAway', 'nameAway', 'logoAway'];

  constructor(
    private footballUpdatesService: FootballUpdatesService,
    private sessionStorageService: SessionStorageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // collects the url parameters
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.idLeague = params['idLeague'];
        this.idTeam = params['idTeam'];
      });
    this.getTeamMatches(this.idLeague, this.season, this.idTeam);
  }

  getTeamMatches(idLeague: string, season: string, idTeam: string): void {
    this.keyTeam = KEY_TEAMS_MATCHES + idLeague;

    // check if this.keyTeam is saved in session storage
    if (this.sessionStorageService.keyExists(this.keyTeam)) {
      let data: any[] = this.sessionStorageService.getStorageCountryGames(this.keyTeam);
      this.checkTeam(data, idTeam);

    } else {
      // get nedeed dates
      let toDate: string = new Date().toISOString().split('T')[0];
      let fromDate: string = new Date().getFullYear().toString().concat("-").concat(START_SEASON_MONTHDAY);

      // call to service
      this.footballUpdatesService.getTeamsMatches(idLeague, season, fromDate, toDate).subscribe(
        data => {
          data = data.response;
          // in one key save all matches of a league to make only one call per league
          this.sessionStorageService.saveStorageCountryGames(this.keyTeam, data);
          this.checkTeam(data, idTeam);
        });
    }
  }

  checkTeam(data: any[], idTeam: string): void {
    let standings: IFootballGames[] = [];

    data.forEach((elem) => {
      // saves all matches of the selected team
      if (elem.teams.home.id == idTeam || elem.teams.away.id == idTeam) {
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

    // get only last 10 matches
    this.teamMatches = standings.reverse().slice(0, 10);
  }

  goBack(): void {
    this.router.navigateByUrl('?idLeague=' + this.idLeague);
  }
}
