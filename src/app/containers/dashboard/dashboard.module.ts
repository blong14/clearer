import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';

import { ActivityListComponent } from '../../components/activity-list/activity-list.component';
import { ProjectListComponent } from '../../components/project-list/project-list.component';
import { TeamListComponent } from '../../components/team-list/team-list.component';

import { AuthGuardService } from '../../auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild([
      { path: '', component: DashboardComponent, canActivate: [ AuthGuardService ],
      children: [
        { path: '', component: ProjectListComponent, outlet: 'main' },
        { path: '', component: ActivityListComponent, outlet: 'secondary'},
        { path: '', component: TeamListComponent, outlet: 'sidebar' }
      ]}
    ])
  ],
  declarations: [
    DashboardComponent,
    ActivityListComponent,
    ProjectListComponent,
    TeamListComponent
  ]
})
export class DashboardModule { }
