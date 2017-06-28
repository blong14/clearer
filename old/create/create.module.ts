import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { CreateComponent } from './create.component';

@NgModule({
    declarations: [
        CreateComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            { path: 'project/edit/:id', component: CreateComponent },
            { path: 'project/create', component: CreateComponent }
        ]),
        SharedModule,
    ],
    exports: [

    ]
})
export class CreateModule {

}
