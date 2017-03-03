import { Component, HostBinding, Input} from '@angular/core';

@Component({
    selector: 'card-component',
    templateUrl: 'card.component.html'
})
export class CardComponent {

    @Input() link: string;

    @HostBinding('class.card') isCard: boolean;

    ngOnInit(){
        console.log( this.link );
        this.isCard = true;
    }

}