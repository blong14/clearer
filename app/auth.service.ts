import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { User } from './models/user.interface';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor( public http : Http ) { }

  login(userid: string, password: string): Observable<User>{

    return this.http.get('/_data/users/' + userid + '.json')
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
      )
  }

  logout(){
        localStorage.removeItem('currentUser');
  }

}
