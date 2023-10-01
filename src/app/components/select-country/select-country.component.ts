import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ID_ENGLAND, ID_FRANCE, ID_GERMANY, ID_ITALY, ID_SPAIN } from 'src/app/constants/football-constants';
import { IFootball } from 'src/app/interfaces/football-updates-interface';
import { FootballUpdatesService } from 'src/app/services/football-updates.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-select-country',
  templateUrl: './select-country.component.html',
  styleUrls: ['./select-country.component.scss']
})
export class SelectCountryComponent implements OnInit {
  idLeague: string = '';
  countryStandings: IFootball[] = [];
  season: string = new Date().getFullYear().toString();
  active: boolean = false;

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
      });

    // enter if coming from TeamMatches screen
    if (this.isValid(this.idLeague)) {
      this.clearIdParam();
      this.getFootballCountry(this.idLeague);
    }
  }

  clearIdParam(): void{
    this.router.navigate(
      ['.'],
      { relativeTo: this.activatedRoute, queryParams: {} }
    );
  }

  getFootballCountryByIdLeague(league: string): void {
    this.idLeague = this.checkId(league);
    this.getFootballCountry(this.idLeague);
  }

  getFootballCountry(idLeague: string): void {
    this.idLeague = idLeague;

    // check if this.idLeague is saved in session storage
    if (this.sessionStorageService.keyExists(this.idLeague)) {
      this.countryStandings = this.sessionStorageService.getStorageCountry(this.idLeague);
      this.active = true;

    } else {
      let standings: IFootball[] = [];

      // call to service
      this.footballUpdatesService.getFootballCountry(this.idLeague, this.season).subscribe(
        data => {
          data = data.response[0].league.standings[0];
          data.forEach((elem: any) => {
            standings.push({
              idLeague: this.idLeague,
              idTeam: elem.team.id,
              rank: elem.rank,
              name: elem.team.name,
              teamLogo: elem.team.logo,
              gamesPlayed: elem.all.played,
              wins: elem.all.win,
              draws: elem.all.draw,
              losses: elem.all.lose,
              goalDifference: (elem.all.goals.for - elem.all.goals.against).toString(),
              points: elem.points
            });
          });
          this.countryStandings = standings;

          // save to session storage
          this.sessionStorageService.saveStorageCountry(this.idLeague, this.countryStandings);
          this.active = true;
        });
    }
  }

  checkId(league: string): string {
    let id: string = "";

    switch (league) {
      case 'england': {
        id = ID_ENGLAND;
        break;
      }
      case 'spain': {
        id = ID_SPAIN;
        break;
      }
      case 'france': {
        id = ID_FRANCE;
        break;
      }
      case 'germany': {
        id = ID_GERMANY;
        break;
      }
      case 'italy': {
        id = ID_ITALY;
        break;
      }
      default: {
        break;
      }
    }
    return id;
  }

  isValid(idLeague: string): boolean {
    if (idLeague !== "" && idLeague !== null && idLeague !== undefined) {
      return true;
    }
    return false;
  }
}
