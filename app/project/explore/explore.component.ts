import { Component, Input, HostBinding } from '@angular/core';
import { Project } from '../../models/project.interface';

@Component({
    selector: 'explore-component',
    templateUrl : 'explore.component.html'
})
export class ExploreComponent{

    @Input() project: Project;

    @HostBinding('class') classes = "card eleven wide column";

    // invertList is used to show ideas in reverse chron order
    invertList( list ){
        if( list ){
            return list.slice().reverse();
        }
    }
    
}