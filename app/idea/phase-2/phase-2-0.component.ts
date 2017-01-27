import { Component, Input } from '@angular/core';
import { Idea } from '../../models/idea.interface';

@Component({
    selector: 'phase-2-0',
    templateUrl: 'phase-2-0.component.html'
})
export class Phase_2_0_Component{

    @Input() idea: Idea;

    totalVotes: number = 2;
    votes: Object[] = [];

    toggleState( index ){

        if( this.votes[index] == true ){
            this.votes[index] = false;
            this.totalVotes++;
        }else{
            if( this.totalVotes == 0 ){ return false; }
            this.votes[index] = true;
            this.totalVotes--;
        }

    }

    isSelected( index ){

        return this.votes[index];

    }

}