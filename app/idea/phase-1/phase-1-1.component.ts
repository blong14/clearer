import { Component, Input } from '@angular/core';
import { Idea } from '../../models/idea.interface';

@Component({
    selector: 'phase-1-1',
    templateUrl: 'phase-1-1.component.html'
})
export class Phase_1_1_Component{ 

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