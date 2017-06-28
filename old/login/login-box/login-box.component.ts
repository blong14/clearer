import { Component, HostBinding, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { User } from '../../models/user.interface';
import { AngularFire, AngularFireAuth } from 'angularfire2';
import { Router } from '@angular/router';

import { slideInDownAnimation } from '../../animations';

@Component({
  selector: 'login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.scss'],
  animations: [
    slideInDownAnimation
  ]
})
export class LoginBoxComponent implements OnInit {


  @HostBinding('@routeAnimation') routeAnimation = true;

  // properties

    email: string;
    error: Object;
    password: string;
    user: Object;
    inProcess: boolean;

    constructor( private af: AngularFire, private authService: AuthService, private router: Router ){
    }

    // take auth info from fb and save to localstorage for easy reference
    setUser(){
        this.af.auth.subscribe(
            (auth) => {
                this.user = auth;
                if( this.user != null ){
                    localStorage.setItem('currentUser', JSON.stringify( auth ));
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

        this.inProcess = true;

        this.authService.login( this.email, this.password ).then(
            (res) => {
                this.inProcess = false;
                if(res){
                    this.setUser();
                }else{
                    this.error = res;
                }

            },
            (err) => {
                this.inProcess = false;
                console.log(err);
            }
        );
    }

    ngOnInit(){
        this.setUser();
    }

}
