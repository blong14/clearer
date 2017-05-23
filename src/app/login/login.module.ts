import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NotAuthGuardService } from '../not-auth-guard.service';

import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent, canActivate: [NotAuthGuardService] }
    ])
  ],
  declarations: [LoginComponent],
  providers: [NotAuthGuardService]
})
export class LoginModule { }
