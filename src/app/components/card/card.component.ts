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

    @Input() link: string;
    @Input() isLink: string;

    @HostBinding('@routeAnimation') routeAnimation = true;
    @HostBinding('class.card') isCard = true;
    @HostBinding('class.link') addLink = this.checkLink();
    // TODO: GET THE LINK CLASS BEING APPLIED ONLY IF THE CARD IS A LINK
    checkLink(){
      if( this.isLink == 'true' ){
        return true;
      }
    }

}
