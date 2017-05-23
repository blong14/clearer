import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SignupComponent } from './signup.component';

import { NotAuthGuardService } from '../not-auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'signup', component: SignupComponent, canActivate: [NotAuthGuardService] }
    ])
  ],
  declarations: [SignupComponent],
  providers:[NotAuthGuardService]
})
export class SignupModule { }
