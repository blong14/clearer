import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Idea } from '../models/idea.interface';
import { Project } from '../models/project.interface';
import { MD5 } from '../../lib/md5';

@Component({
    selector: 'idea-component',
    templateUrl: 'idea.component.html',
    providers:[
        DataService
    ]
})
export class IdeaComponent{
    
    project: Project;
    idea: Idea;

    constructor( private dataService: DataService, private activatedRoute: ActivatedRoute, private router: Router ){}

    fetchGravitar(){
        let email = this.idea.champion;
        return 'https://www.gravatar.com/avatar/' + MD5( email );
    }


    fetchIdea(){
        let projectID = this.activatedRoute.snapshot.params['id'];
        let ideaIndex = this.activatedRoute.snapshot.params['index'];
        this.dataService.getProject( projectID ).subscribe(
            (res) => {
                this.project = res;
                this.idea = res['ideas'][ideaIndex];
            },
            (err) => console.log( err )
        )
    }

    ngOnInit(){
        this.fetchIdea();
    }



}