// core modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../footer/footer.module';

// components
import { IdeaComponent } from './idea.component';
import { Phase_1_0_Component } from './phase-1/phase-1-0.component';
import { Phase_1_1_Component } from './phase-1/phase-1-1.component';
import { Phase_2_0_Component } from './phase-2/phase-2-0.component';

@NgModule({
    declarations: [
        IdeaComponent,
        Phase_1_0_Component,
        Phase_1_1_Component,
        Phase_2_0_Component,
    ],
    imports: [
        CommonModule,
        HeaderModule,
        FooterModule,
        RouterModule.forChild([
            { path: 'idea/:id', component: IdeaComponent }
        ])
    ],
    exports: [

    ]
})

export class IdeaModule {}