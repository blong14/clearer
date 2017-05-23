import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class NotAuthGuardService {

  constructor( private authService: AuthService, private router: Router ) { }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean>{
    return this.checkUser();
  }

  checkUser():Observable<boolean>{
    return this.authService.getUser().map(
      (res) => {
        if( res == null ){ return true;  }
        else{
          this.router.navigate(['/dashboard']);
          return false;
        }
      }
    );
  }

}
