import { Component, Input } from '@angular/core';
import { Idea } from '../../models/idea.interface';

@Component({
    selector: 'phase-1-0',
    templateUrl: 'phase-1-0.component.html'
})
export class Phase_1_0_Component{ 

    @Input() idea: Idea;

    constructor(){
        console.log( this.idea );
    }

}