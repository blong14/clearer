import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ AuthService ]
})
export class LoginComponent implements OnInit {

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

    ngOnInit() { }

}
