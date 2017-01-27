import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../models/user.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'login-component',
    styleUrls: ['login.component.scss'],
    templateUrl: 'login.component.html'
})

export class LoginComponent{
    username: string;
    password: string;
    user: User;
    error: any;

    constructor( private authService: AuthService, private router: Router ){
        this.setUser();
    }

    setUser(){
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        if( this.user ){
            this.router.navigate(['']);
        }
    }

    login(): void {
        this.authService.login( this.username, this.password ).subscribe(
            res=>{ 
                if(res.name){
                    this.setUser();
                }else{
                    this.error = res;
                }
                
            },
            err=>{ console.log(err); }
        );
    }
}