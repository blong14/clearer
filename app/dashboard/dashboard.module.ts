// core modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../footer/footer.module';

// components
import { DashboardComponent } from './dashboard.component';
import { CardComponent } from './card/card.component';

@NgModule({
    declarations:[
        DashboardComponent,
        CardComponent,
    ],
    imports:[
        CommonModule,
        HeaderModule,
        FooterModule,
        RouterModule.forChild([
            { path: '', component: DashboardComponent }
        ])
    ],
    exports:[
        DashboardComponent
    ]
})

export class DashboardModule {}