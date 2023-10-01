import { Injectable } from '@angular/core';
import { IFootball, IFootballGames } from '../interfaces/football-updates-interface';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  getStorageCountry(key: string): IFootball[] {
    return JSON.parse(sessionStorage.getItem(key)!);
  }

  saveStorageCountry(key: string, data: IFootball[]): void {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  getStorageCountryGames(key: string): IFootballGames[] {
    return JSON.parse(sessionStorage.getItem(key)!);
  }

  saveStorageCountryGames(key: string, data: IFootballGames[]): void {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  keyExists(key: string): boolean {
    return sessionStorage.getItem(key) !== null;
  }
}
