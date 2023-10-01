import { Component, Input } from '@angular/core';
import { IFootball } from 'src/app/interfaces/football-updates-interface';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent {
  @Input() dataSource: IFootball[] = [];
  displayedColumns: string[] = ['rank', 'teamLogo', 'name', 'gamesPlayed', 'wins', 'losses', 'draws', 'goalDifference', 'points'];
}
