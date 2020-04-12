import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataProviderService } from '../services/data-provider.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mail-box',
  templateUrl: './mail-box.component.html',
  styleUrls: ['./mail-box.component.css']
})
export class MailBoxComponent implements OnInit {

  @Input() noneSelected;
  @Output() disableButton: any = new EventEmitter();
  userDataForTo: Array<Object>;
  dropdownSettings = {};
  users = [];
  result: any;
  toData = [];
  toInput: any;
  userData: any;
  errorMsgForTo1: any;
  errorMsgForTo2: any;
  mailForm: FormGroup;

  get selectedItems(): any {
    return this.dataProviderService.selectedItems
  }

  constructor(private dataProviderService: DataProviderService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    // this.selectedItems = new Map<string, Array<any>>();
    this.noneSelected = true;

    this.mailForm = this.formBuilder.group({
      to: [''],
      // from: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    })

    this.dropdownSettings = {
      singleSelection: false,
      text: "",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };
  }

  public opened = false;
  public dataSaved = false;

  public close() {
    this.opened = false;
    this.checkOpenButtonState();
  }

  public open() {
    this.result = {};
    this.toData = [];
    this.mailForm.controls.subject.reset();
    this.mailForm.controls.message.reset();
    this.opened = true;
    this.dataSaved = false;
    this.userData = this.dataProviderService.getUserData();
  }

  public submit() {
    this.userData.forEach(el => el.checked == true ? this.toData.push(el.email) : null);
    if (this.userData.every(el => el.checked == false)) {
      this.result = { 'ERROR': "No Recepient found" }
    }
    else {
      this.result = {
        'to': this.toData,
        'subject': this.mailForm.controls.subject.value,
        'message': this.mailForm.controls.message.value
      }
    }
    this.dataSaved = true;
    this.close();
  }

  updateUserData() {
    // console.log("this.selectedItems===>", this.selectedItems)
    this.dataProviderService.setUserData(this.userData);
    // this.selectedItems = this.userData.filter(el => el.checked == true);
  }

  onItemSelect(item: any) {
    this.userData.forEach(el => el.id == item.id ? el.checked = true : null);
    this.updateUserData();
    console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item: any) {
    this.userData.forEach(el => el.id == item.id ? el.checked = false : null);
    this.updateUserData();
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    this.userData.forEach(el => el.checked = true);
    this.updateUserData();
    console.log(items);
  }
  onDeSelectAll(items: any) {
    this.userData.forEach(el => el.checked = false);
    this.updateUserData();
    console.log(items);
  }

  checkToInput() {
    console.log("this.toInput===>", this.mailForm.controls.to.value);
    if (this.userData.some(el => el.email == this.mailForm.controls.to.value)) {
      if (!this.selectedItems.some(el => el.email == this.mailForm.controls.to.value)) {
        this.errorMsgForTo1 = false;
        this.errorMsgForTo2 = false;
        this.toData.push(this.mailForm.controls.to.value);
        this.toData = Array.from(new Set(this.toData));
      }
      else {
        this.errorMsgForTo2 = true;
        this.errorMsgForTo1 = false;
      }

    }
    else if (this.mailForm.controls.to.value.trim() == '') {
      this.errorMsgForTo1 = false;
      this.errorMsgForTo2 = false;
    }

    else {
      this.errorMsgForTo1 = true;
    }
  }

  checkOpenButtonState() {
    if (this.dataProviderService.userData.some(el => el.checked == true)) {
      this.disableButton.emit(false);
    } else {
      this.disableButton.emit(true);
    }
  }

}
