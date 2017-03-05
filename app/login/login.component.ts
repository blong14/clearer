import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../models/user.interface';
import { Router } from '@angular/router';
import { AngularFire, AngularFireAuth } from 'angularfire2';

@Component({
    selector: 'login-component',
    styleUrls: ['login.component.scss'],
    templateUrl: 'login.component.html'
})

export class LoginComponent{
    email: string;
    password: string;
    user;
    error: any;

    constructor( private af: AngularFire, private authService: AuthService, private router: Router ){
    }

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

    login(): void {
        this.authService.login( this.email, this.password ).then(
            res=>{ 
                if(res){
                    this.setUser();
                }else{
                    this.error = res;
                }
                
            },
            err=>{ console.log(err); }
        );
    }

    ngOnInit(){

        this.setUser();
    }
}