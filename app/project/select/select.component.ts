import { Component, HostBinding, Input } from '@angular/core';
import { Project } from '../../models/project.interface';
import { DataService } from '../../data.service';

@Component({
    selector: 'select-component',
    templateUrl: 'select.component.html'
})
export class SelectComponent{

    @Input() project : Project;

    @HostBinding('class') classes = "card eleven wide column";

    constructor( private dataService: DataService ){}

    handlerExplore( event ){
        let reverseIndex = this.project['ideas'].length - 1 - event;
        let state = this.project['ideas'][reverseIndex]['state'];

        if( state != 3 ){
            state = 3;
        }else{
            state = 1;
        }
        this.dataService.saveProject( this.project.id, state, 'ideas/' + reverseIndex + '/state');

    }

    // invertList is used to show ideas in reverse chron order
    invertList( list ){
        if( list ){
            return list.slice().reverse();
        }
    }

}