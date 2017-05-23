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
  passwordStrength: number = 0;
  error: string;

  constructor( private dataService: DataService ) { }

  passwordCheck() {

    let criteria : [boolean] = [false, false, false, false];

    if( this.password == undefined ) {
      return false;
    }

    if( this.password.length > 6 ) {
      criteria[0] = true;
    }

    if( this.password.includes('&' || '*' || '!' || '@' || '#' || '$' || '^' || '%' || '(' || ')' || '+' || '-' || '_' || '=' )) {
      criteria[1] = true;
    }

    if( this.password.includes('A' || 'B' || 'C' || 'D' || 'E' || 'F' || 'G' || 'H' || 'I' || 'J' || 'K' || 'L' || 'M' || 'N' || 'O' || 'P' || 'Q' || 'R' || 'S' || 'T' || 'U' || 'V' || 'W' || 'X' || 'Y' || 'Z')) {
      criteria[2] = true;
    }

    if( this.password.length > 8 ) {
      criteria[3] = true;
    }

    this.passwordStrength = 0;

    criteria.forEach( (i) => {
      if( i == true ) {
        this.passwordStrength++;
      }
    });

    console.log( criteria );
    console.log( this.passwordStrength );

    if( criteria[0] == false ) { this.passwordStrength = 0; }

  }

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

    if( this.passwordStrength < 2 ) {
      this.error = "Password isn't strong enough.";
      return false;
    }

    this.dataService.createUser( this.name, this.email, this.password );

  }

  ngOnInit() {
  }

}
