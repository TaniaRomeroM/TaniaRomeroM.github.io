import { Component, OnInit } from '@angular/core';
import { ID_ENGLAND, ID_FRANCE, ID_GERMANY, ID_ITALY, ID_SPAIN } from 'src/app/constants/football-constants';
import { FootballUpdatesService } from 'src/app/services/football-updates.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-select-country',
  templateUrl: './select-country.component.html',
  styleUrls: ['./select-country.component.scss']
})
export class SelectCountryComponent implements OnInit {
  countryStandings: any[] = [];
  seasonD = new Date().getFullYear();
  season = this.seasonD.toString();
  idLeague = '';
  active: boolean = false;

  constructor(
    private footballUpdatesService: FootballUpdatesService,
    private sessionStorageService: SessionStorageService
  ) { }

  ngOnInit(): void {
  }

  getFootballCountry(league: string) {
    this.idLeague = this.checkId(league);

    if(this.sessionStorageService.keyExists(this.idLeague)) {
      this.countryStandings = this.sessionStorageService.getStorageCountry(this.idLeague);
      this.active = true;

    } else {
      var standings: any[] = [];

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
              goalDifference: elem.all.goals.for - elem.all.goals.against,
              points: elem.points
            });
          });
          this.countryStandings = standings;

          this.sessionStorageService.saveStorageCountry(this.idLeague, this.countryStandings);
          this.active = true;
      });
    }
  }

  checkId(league: string) {
    let id: string = "";

    switch(league) {
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

}
