import { Component, Input, HostBinding } from '@angular/core';

@Component({
    selector: 'info-pane-component',
    templateUrl: 'info-pane.component.html',
    styleUrls:['info-pane.component.scss']
})
export class InfoPaneComponent {

    @Input() goals: Object;

    @HostBinding('class') allClasses = 'card four wide column';

}