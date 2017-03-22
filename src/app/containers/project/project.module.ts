import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar.component';
import { IdeaListComponent } from '../../components/idea-list/idea-list.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild([
      { path: 'project/:id', component: ProjectComponent }
    ])
  ],
  declarations: [
    IdeaListComponent,
    ProjectComponent,
    ProgressBarComponent
  ]
})
export class ProjectModule { }
