import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { User } from './models/user.interface';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseAuthState } from 'angularfire2';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor( private af: AngularFire, public http : Http, private route: Router ) { }

  login(em: string, pw: string): firebase.Promise<FirebaseAuthState>{

    let auth = this.af.auth.login({ email: em, password: pw });
    localStorage.setItem('currentUser', JSON.stringify( auth ) );
    return auth;
  }

  logout(){
        let logout = this.af.auth.logout();
        logout.then(
          (res)=>{
            localStorage.removeItem('currentUser');
            this.route.navigate(['/login']);
          },
          (err)=>{
            console.log(err);
          });
  }

}