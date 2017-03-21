// core modules
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

// components
import { DashboardComponent } from './dashboard.component';
import { ProjectsComponent } from './projects/projects.component';
import { TeamsComponent } from './teams/teams.component';
import { UpdatesComponent } from './updates/updates.component';

@NgModule({
    declarations:[
        DashboardComponent,
        ProjectsComponent,
        TeamsComponent,
        UpdatesComponent,
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
