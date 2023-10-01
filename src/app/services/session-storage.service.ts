import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  getStorageCountry(key: string) {
    return JSON.parse(sessionStorage.getItem(key)!);
  }

  saveStorageCountry(key: string, data: Object) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  keyExists(key: string): boolean {
    return sessionStorage.getItem(key) !== null;
  }
}
