import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
    selector: 'header-component',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss']
})
export class HeaderComponent {
    user: any;

    constructor( private authService: AuthService, private router: Router ){
        this.setUser();
    }

    setUser(){
        this.user = localStorage.getItem('currentUser');
    }

    logout(){
        this.authService.logout();
        this.setUser();
        this.router.navigate(['login']);
    }
    





}