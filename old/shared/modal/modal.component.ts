import {
    Component,
    Input,
    Output,
    EventEmitter,
    trigger,
    state,
    style,
    transition,
    animate } from '@angular/core';

@Component({
    selector: 'modal-component',
    templateUrl: 'modal.component.html',
    styleUrls: ['modal.component.scss'],
    animations: [
        trigger( 'visibilityChanged', [
            state('true', style({ opacity: 1})),
            state('false', style({ opacity: 0})),
            transition('* => *', animate('.5s'))
        ])
    ]

})
export class ModalComponent {

    @Input() editable: boolean;
    @Input() visibility: boolean;
    @Input() editContent: string;
    @Output() closeEvent = new EventEmitter();
    @Output() saveEvent = new EventEmitter();

    isVisible: boolean;

    toggleVis(){
        this.visibility = !this.visibility;
    }

    onCloseEvent( animation ){
        this.isVisible = !this.isVisible;
        this.closeEvent.emit(animation.toState);
    }

    saveHandler(event){
        this.saveEvent.emit( event );
        this.toggleVis();
    }

}
