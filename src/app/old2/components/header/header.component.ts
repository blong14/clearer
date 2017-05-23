import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [ AuthService ]
})

export class HeaderComponent implements OnInit {

    user: any;

    constructor( private authService: AuthService, private router: Router ){

    }


    logout(){
      this.authService.logout().then(
        (res) => { this.router.navigate(['/login']) },
        (err) => console.log( err )
      );
    }

    ngOnInit(){
      this.authService.getUser().subscribe(
        (res) => { this.user = res; },
        (err) => console.log( err )
      );
    }

}
