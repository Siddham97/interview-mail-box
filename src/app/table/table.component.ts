import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DataProviderService } from '../services/data-provider.service';
import { MailBoxComponent } from '../mail-box/mail-box.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  noneSelected: boolean;
  userData: any[] = [
    { id: '1', name: 'User', email: 'user@gmail.com', checked: false, itemName: 'user@gmail.com' },
    { id: '2', name: 'User 1', email: 'user1@gmail.com', checked: false, itemName: 'user1@gmail.com' },
    { id: '3', name: 'User 2', email: 'user2@gmail.com', checked: false, itemName: 'user2@gmail.com' },
  ]

  constructor(private dataProviderService: DataProviderService) { }

  ngOnInit() {
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log(changes)
  // }

  // @ViewChild(MailBoxComponent) chviewChild: MailBoxComponent;

  // triggerChildValue() {
  //   this.chviewChild.updateUserData();
  // }

  CheckAllOptions(event) {

    const checked = event.target.checked;
    this.userData.forEach(item => item.checked = checked);
    this.checkIfNoneSelected();

  }

  setData() {
    this.dataProviderService.setUserData(this.userData);

  }

  checkIfNoneSelected() {

    if (this.userData.every(val => val.checked == false)) {
      this.noneSelected = true;
      this.setData();
    }
    else {
      this.noneSelected = false;
      this.setData();
      // this.triggerChildValue();
    }
  }

  openMailBoxButtonState(event) {
    this.noneSelected = event;
  }
}

