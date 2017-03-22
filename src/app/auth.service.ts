import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { User } from './models/user.interface';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseAuthState } from 'angularfire2';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  authState: FirebaseAuthState;

  constructor( private af: AngularFire, public http : Http, private route: Router ) { }

  login(em: string, pw: string){

    return this.af.auth.login({ email: em, password: pw });

  }

  getUser(){
    return this.af.auth;
  }

  logout(){
    return this.af.auth.logout();
  }

}
