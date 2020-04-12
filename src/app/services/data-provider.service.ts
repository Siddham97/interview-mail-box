import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  userData: any;
  constructor() { }

  setUserData(item: any) {
    this.userData = item;
  }

  getUserData() {
    return this.userData;
  }
}
