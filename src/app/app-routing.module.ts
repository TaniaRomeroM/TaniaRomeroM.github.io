import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectCountryComponent } from './components/select-country/select-country.component';
import { TeamMatchesComponent } from './components/team-matches/team-matches.component';

const routes: Routes = [
  { path: '', component: SelectCountryComponent },
  { path: 'team-matches', component: TeamMatchesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
