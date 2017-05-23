import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

    @Input() isLink: boolean;

    @HostBinding('class.card') isCard = true;
    @HostBinding('class.link') addLink;

    ngOnInit(){

     if( this.isLink == true ){
       this.addLink = true;
     }

    }
}
