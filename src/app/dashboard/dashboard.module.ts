// core modules
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

// components
import { DashboardComponent } from './dashboard.component';

@NgModule({
    declarations:[
        DashboardComponent,
    ],
    imports:[
        CommonModule,
        SharedModule,
        RouterModule.forChild([
            { path: '', component: DashboardComponent }
        ])
    ],
    exports:[
        DashboardComponent,
    ],
    schemas:[ CUSTOM_ELEMENTS_SCHEMA ]
})

export class DashboardModule {}
