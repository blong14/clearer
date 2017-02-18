import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Idea } from '../models/idea.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'idea-component',
    templateUrl: 'idea.component.html',
    styleUrls: ['idea.component.scss'],
    providers: [ DataService ]
})
export class IdeaComponent{

    idea: Idea;
    routePath: string;

    constructor( private dataService: DataService, private route: ActivatedRoute ){
        
        // pass ID from route into getData();
        this.routePath = this.route.snapshot.params['id'];
        this.getData(this.routePath);

    }

    // get Idea data from service
    getData( ideaId: string ){

        this.dataService.getIdea( ideaId ).subscribe(
            res => { 
                this.idea = res;
                console.log( res );
            },
            err => console.log( err )
        );

    }

    handleAddIdea( event ){
        console.log( event );
        console.log( 'wowza!' );
        this.dataService.saveIdea( this.routePath, event, 'ideas' );
    }

   

   /* toggleVote( index ){
        
        if( currentState == 'voted' ){
            this.totalVotes++;
            return currentVotes--;
        }

        if( 4 > this.totalVotes && this.totalVotes > 0 ){
            this.totalVotes--;
            return currentVotes++;
        }

    }

    initVote( index ){

        this.votes[index] = {
            "status": false,
            "count": 0
        }

    }

    setVoteStatus( index ){

        if( this.votes[index]['status'] != true ){
            this.votes[index]['status'] = true;
        }else{
            this.votes[index]['status'] = false;
        }

    }

    getVoteStatus( index ){

        if( this.votes[index] ){
            console.log( this.votes[index]['status']);
            return this.votes[index]['status'];
        }else{
            this.votes[index] = {
                "status": false,
                "count": 0,
            }
            return false;
        }

    }

    setVoteCount( index, count ){

        this.votes[index]['count'] = count;
        return this.votes[index]['count'];

    }

    getVoteCount( index ){
        console.log( this.votes[index]['count']);
        return this.votes[index]['count'];

    }*/

}