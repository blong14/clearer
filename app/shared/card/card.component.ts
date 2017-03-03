import { Component, HostBinding, Input} from '@angular/core';

@Component({
    selector: 'card-component',
    templateUrl: 'card.component.html'
})
export class CardComponent {

    @Input() link: string;

    @HostBinding('class') isCard = 'card';

}