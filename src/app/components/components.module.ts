import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardComponent } from './card/card.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    CardComponent,
    FooterComponent,
    HeaderComponent
  ],
  exports: [
    CardComponent,
    FooterComponent,
    HeaderComponent
  ]
})
export class ComponentsModule { }
