import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';

import { DashboardComponent } from './dashboard.component';

import { AuthGuardService } from '../auth-guard.service';
import { TeamsComponent } from './teams/teams.component';
import { ProjectsComponent } from './projects/projects.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild([
      { path: 'dashboard', component: DashboardComponent, canActivate: [ AuthGuardService ] },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ])
  ],
  declarations: [ DashboardComponent, TeamsComponent, ProjectsComponent ],
  providers: [ AuthGuardService ]
})
export class DashboardModule { }
