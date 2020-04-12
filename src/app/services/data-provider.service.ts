import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  userData: any;
  selectedItems = [];
  constructor() { }

  setUserData(item: any) {
    this.userData = item;
    this.selectedItems = this.userData.filter(el => el.checked == true);
  }

  getUserData() {
    return this.userData;
  }
}
