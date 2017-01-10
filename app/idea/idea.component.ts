import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Idea } from '../models/idea.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'idea-component',
    templateUrl: 'idea.component.html',
    styleUrls: ['idea.component.scss']
})
export class IdeaComponent{

    idea: Idea;

    constructor( private dataService: DataService, private route: ActivatedRoute ){
        // pass ID from route into getData();
        this.getData(this.route.snapshot.params['id']);

    }

    // get Idea data from service
    getData( ideaId: string ){
        this.dataService.getIdea( ideaId ).subscribe(
            res => { 
                this.idea = res;
            }
        );
    }

}