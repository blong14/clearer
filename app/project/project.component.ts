import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Project } from '../models/project.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'project-component',
    templateUrl: 'project.component.html',
    styleUrls: ['project.component.scss'],
    providers: [ DataService ]
})
export class ProjectComponent{

    project: Project;
    routePath: string;

    constructor( private dataService: DataService, private route: ActivatedRoute ){
        
        // pass ID from route into getData();
        this.routePath = this.route.snapshot.params['id'];
        this.getData(this.routePath);

    }

    // get project data from service
    getData( projectId: string ){

        this.dataService.getProject( projectId ).subscribe(
            res => { 
                this.project = res;
                console.log( this.project );
            },
            err => console.log( err )
        );

    }

    handleAddProject( event ){
        this.dataService.saveProject( this.routePath, event, 'projects' );
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