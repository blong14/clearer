import { Component, HostBinding, Input } from '@angular/core';
import { slideInDownAnimation } from '../../animations';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    slideInDownAnimation
  ]
})
export class CardComponent {

    @Input() isLink: boolean;

    @HostBinding('@routeAnimation') routeAnimation = true;
    @HostBinding('class.card') isCard = true;
    @HostBinding('class.link') addLink;

    ngOnInit(){

     if( this.isLink == true ){
       this.addLink = true;
     }

    }
}
