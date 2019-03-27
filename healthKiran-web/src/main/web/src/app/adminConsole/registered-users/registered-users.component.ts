import { Component, OnInit } from '@angular/core';
import {User, UserService} from "../../../generated/restClient";
import {FormControl, FormGroup} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-registered-users',
  templateUrl: './registered-users.component.html',
  styleUrls: ['./registered-users.component.css']
})
export class RegisteredUsersComponent implements OnInit {

  user: User;
  formData;
  constructor(private userService: UserService){
    this.userService = userService;
  }
  ngOnInit() {
    this.formData = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      password: new FormControl(),
      address: new FormControl(),
    });
  }
  onClickSubmit(data) {
    console.log(data);
    this.user = { id: null, address: data.address, email: data.email,
      firstName: data.firstName, lastName: data.lastName, phone: data.phone, password: data.password};

    this.userService.adduser(this.user).toPromise()
      .then(
        User => {
          console.log(User)
        },
        (e: HttpErrorResponse) => {
          console.log('HttpErrorResponse :: ' + e.message);
        }
      );;
  }

}
