import { Component, Input, Output, EventEmitter, OnChanges, trigger, state, style, transition, animate } from '@angular/core';

@Component({
    selector: 'modal',
    templateUrl: 'modal.component.html',
    animations: [
        trigger( 'visibilityChanged', [
            state('true', style({ opacity: 1})),
            state('false', style({ opacity: 0})),
            transition('* => *', animate('.5s'))
        ])
    ]

})
export class ModalComponent implements OnChanges {

    @Input() visibility: Boolean;
    @Output() animationFinish = new EventEmitter();

    isVisible: Boolean;

    toggleVis(){
        this.visibility = !this.visibility;
        console.log( this.visibility );
    }

    onAnimationFinish(event){
        console.log(event);
        this.isVisible = !this.isVisible;
        this.animationFinish.emit(event);
    }

    ngOnChanges(){
        console.log( this.visibility );
    }

}