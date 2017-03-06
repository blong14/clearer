import { Component, HostBinding, Input } from '@angular/core';
import { Project } from '../../models/project.interface';

@Component({
    selector: 'select-component',
    templateUrl: 'select.component.html'
})
export class SelectComponent{

    @Input() project : Project;

    @HostBinding('class') classes = "card eleven wide column";

}