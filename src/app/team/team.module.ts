import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TeamComponent } from './team.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'team/:id', component: TeamComponent }
    ])
  ],
  declarations: [TeamComponent]
})
export class TeamModule { }
