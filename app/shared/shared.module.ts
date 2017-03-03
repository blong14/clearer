import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CardComponent } from './card/card.component';
import { CommentComponent } from './comment/comment.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
    declarations: [
        CardComponent,
        CommentComponent,
        FooterComponent,
        HeaderComponent,
        ModalComponent,
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        CardComponent,
        CommentComponent,
        FooterComponent,
        HeaderComponent,
        ModalComponent,
    ]
})
export class SharedModule {}