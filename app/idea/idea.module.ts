import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { IdeaComponent } from './idea.component';



@NgModule({
    declarations: [
        IdeaComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        RouterModule.forChild([
            { path: 'project/:id/idea/:index', component: IdeaComponent }
        ])
    ],
    exports: []
})
export class IdeaModule {}