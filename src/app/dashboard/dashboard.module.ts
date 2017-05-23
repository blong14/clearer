import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

import { AuthGuardService } from '../auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'dashboard', component: DashboardComponent, canActivate: [ AuthGuardService ] },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ])
  ],
  declarations: [ DashboardComponent ],
  providers: [ AuthGuardService ]
})
export class DashboardModule { }
