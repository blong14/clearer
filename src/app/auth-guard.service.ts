import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor( private authService: AuthService, private router: Router ) { }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean>{

    return this.checkUser();
  }

  checkUser():Observable<boolean>{
    return this.authService.getUser().map(
      (res) => {
        if( res != null ){ return true;  }
        else{
          this.router.navigate(['/login']);
          return false;
        }
      }
    );
  }

}
