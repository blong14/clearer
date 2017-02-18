import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { User } from './models/user.interface';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseAuthState } from 'angularfire2';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor( private af: AngularFire, public http : Http ) { }

  login(em: string, pw: string): Promise<FirebaseAuthState>{

    let auth = this.af.auth.login({ email: em, password: pw });
    localStorage.setItem('currentUser', JSON.stringify( auth ) );
    return auth;

    /*return this.http.get('/_data/users/' + userid + '.json')
      .map(
        response => { 
          let res: User = response.json();
          if( res['password'] == password ){
            localStorage.setItem('currentUser', JSON.stringify(res));
            return res;
          }else{
            return "Incorrect password";
          }
        },
        error =>{
          return "Incorrect username";
        }
      )*/
  }

  logout(){
        //localStorage.removeItem('currentUser');
        this.af.auth.logout
  }

}
