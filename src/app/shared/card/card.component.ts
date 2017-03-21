import { Component, HostBinding, Input} from '@angular/core';

import { slideInDownAnimation } from '../../animations';

@Component({
  selector: 'card-component',
  templateUrl: 'card.component.html',
  animations: [
    slideInDownAnimation
  ]
})
export class CardComponent {


  @HostBinding('@routeAnimation') routeAnimation = true;
    @Input() link: string;

    @HostBinding('class') isCard = 'card';

}
