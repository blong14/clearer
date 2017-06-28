import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProjectComponent } from '../../components/create-project/create-project.component';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../components/modal/modal.component';
import { ProjectComponent } from './project.component';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar.component';
import { IdeaListComponent } from '../../components/idea-list/idea-list.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { IdeaCreateComponent } from '../../components/idea-create/idea-create.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'project/create', component: CreateProjectComponent },
      { path: 'project/:id', component: ProjectComponent },
      { path: 'project/:id/edit', component: CreateProjectComponent },
      { path: 'project/:id/idea/create', component: ProjectComponent, data: { addIdea: true } },
      { path: 'project/:id/idea/:ideaID', component: ProjectComponent, data: { addIdea: true } }

    ])
  ],
  declarations: [
    CreateProjectComponent,
    IdeaCreateComponent,
    IdeaListComponent,
    ProjectComponent,
    ProgressBarComponent
  ]
})
export class ProjectModule { }
