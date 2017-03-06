import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';

@Component({
    selector: 'info-pane-component',
    templateUrl: 'info-pane.component.html',
    styleUrls:['info-pane.component.scss']
})
export class InfoPaneComponent {

    @Input() goals: Object;
    @Input() owner: Object;
    @Output() settingsEvent: EventEmitter<boolean> = new EventEmitter();
    @HostBinding('class') allClasses = 'card four wide column';

    onSettings(){
        this.settingsEvent.emit(true);
    }

    checkUser(){
        if( this.owner['uid'] == JSON.parse( localStorage.getItem('currentUser') ).uid ){
            return true;
        }else{
            return false;
        }
    }

}