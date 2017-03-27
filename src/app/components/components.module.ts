import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComponent } from './card/card.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ProjectBriefComponent } from './project-brief/project-brief.component';
import { ModalComponent } from './modal/modal.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CardComponent,
    ProjectBriefComponent,
    ModalComponent
  ],
  exports: [
    CardComponent,
    ProjectBriefComponent,
    ModalComponent
  ]
})
export class ComponentsModule { }
