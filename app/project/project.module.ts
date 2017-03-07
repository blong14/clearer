// core modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

// components
import { ExploreComponent } from './explore/explore.component';
import { GenerateComponent } from './generate/generate.component';
import { SelectComponent } from './select/select.component';
//import { Phase_1_1_Component } from './phase-1/phase-1-1.component';
//import { Phase_2_0_Component } from './phase-2/phase-2-0.component';
import { ProjectComponent } from './project.component';

@NgModule({
    declarations: [
        ExploreComponent,
        GenerateComponent,
        SelectComponent,
        //Phase_1_1_Component,
        //Phase_2_0_Component,
        ProjectComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        RouterModule.forChild([
            { path: 'project/:id', component: ProjectComponent }
        ])
    ],
    exports: [

    ]
})

export class ProjectModule {}