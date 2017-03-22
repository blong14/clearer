import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CardComponent } from './card/card.component';
import { CommentComponent } from './comment/comment.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { InfoPaneComponent } from './info-pane/info-pane.component';
import { ModalComponent } from './modal/modal.component';
import { TextInputComponent } from './text-input/text-input.component';

@NgModule({
    declarations: [
        CardComponent,
        CommentComponent,
        FooterComponent,
        HeaderComponent,
        InfoPaneComponent,
        ModalComponent,
        TextInputComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule
    ],
    exports: [
        CardComponent,
        CommentComponent,
        FooterComponent,
        HeaderComponent,
        InfoPaneComponent,
        ModalComponent,
        TextInputComponent,
    ]
})
export class SharedModule {}
