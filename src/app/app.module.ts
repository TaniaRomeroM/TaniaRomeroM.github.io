import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectCountryComponent } from './components/select-country/select-country.component';
import { CountryDetailComponent } from './components/country-detail/country-detail.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { TeamMatchesComponent } from './components/team-matches/team-matches.component';
//import { TeamMatchesComponent } from './components/team-matches/team-matches.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectCountryComponent,
    CountryDetailComponent,
    TeamMatchesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonToggleModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
