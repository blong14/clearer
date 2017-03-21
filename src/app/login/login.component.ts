import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../models/user.interface';
import { Router } from '@angular/router';
import { AngularFire, AngularFireAuth } from 'angularfire2';

@Component({
    selector: 'login-component',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit{

    // properties

    email: string;
    error: Object;
    password: string;
    user: Object;

    constructor( private af: AngularFire, private authService: AuthService, private router: Router ){
    }

    // take auth info from fb and save to localstorage for easy reference
    setUser(){
        this.af.auth.subscribe(
            (auth) => {
                this.user = auth;
                if( this.user != null ){
                    localStorage.setItem('currentUser', JSON.stringify( auth ) );
                    this.router.navigate([''])
                }
            },
            (err) => {
                console.log( err );
            }
        );
    }

    // auth user to firebase and receive user info
    login(): void {
        this.authService.login( this.email, this.password ).then(
            (res) => {
                if(res){
                    this.setUser();
                }else{
                    this.error = res;
                }

            },
            (err) => { console.log(err); }
        );
    }

    ngOnInit(){
        this.setUser();
    }
}
