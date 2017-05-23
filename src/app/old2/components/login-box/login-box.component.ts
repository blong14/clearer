import { Component, HostBinding, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { User } from '../../models/user.interface';
import { Router } from '@angular/router';

import { slideInDownAnimation } from '../../animations';

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.scss'],
  providers: [
    AuthService
  ],
  animations: [
    slideInDownAnimation
  ]
})
export class LoginBoxComponent {


  @HostBinding('@routeAnimation') routeAnimation = true;

  // properties

    email: string;
    password: string;
    inProcess: boolean;

    constructor( private authService: AuthService, private router: Router ){ }

    // auth user to firebase and receive user info
    login(): void {

        this.inProcess = true;
        this.authService.login( this.email, this.password ).then(
          (res) => {
            this.router.navigate(['']);
          },
          (err) => console.log(err)
        );
    }
}
