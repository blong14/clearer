import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [DataService]
})
export class SignupComponent implements OnInit {

  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  error: string;

  constructor( private dataService: DataService ) { }

  signup() {

    this.error = '';

    if( this.password != this.passwordConfirm ) {
      this.error = "Password confirmation does not match.";
      return false;
    }

    if( this.email == undefined ) {
      this.error = "Email is required.";
      return false;
    }

    if( !this.email.includes('@') ){
      this.error = "Email format must be valid.";
      return false;
    }

    if( !this.email.includes('.') ){
      this.error = "Email format must be valid.";
      return false;
    }

    if( this.name == undefined ) {
      this.error = "Name is required.";
      return false;
    }

    if( this.name.length < 6 ) {
      this.error = "Please use your full name (minimum of 6 characters).";
      return false;
    }

    this.dataService.createUser( this.name, this.email, this.password );

  }

  ngOnInit() {
  }

}
