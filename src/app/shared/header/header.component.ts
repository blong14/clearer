import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'header-component',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss'],
    providers: [ AuthService ]
})

export class HeaderComponent {
    user: any;

    constructor( private authService: AuthService, private router: Router ){

    }

    setUser(){
        this.user = localStorage.getItem('currentUser');
        if( this.user == null ){
            this.router.navigate(['/login']);
        }
    }

    logout(){
        this.authService.logout();
    }

    ngOnInit(){
        this.setUser();
    }

}

