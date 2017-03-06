import { Component } from '@angular/core';
import { Project } from '../models/project.interface';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from '../data.service';
import { MD5 } from '../../lib/md5';

@Component({
    selector: 'create-component',
    templateUrl: 'create.component.html',
    providers: [ DataService ]
})
export class CreateComponent {

    // properties

    project: Project = {
        id: '',
        name: '',
        description: '',
        goals: [
            
        ],
        owner: {
            email: '',
            uid: ''
        },
        team: ''
    }
    routePath: string;

    constructor( private dataService: DataService, private route: ActivatedRoute, private router: Router ){}

    // methods

    // accepts an id - used to propegate fields if project already exists/is being updated
    fetchProject( id ){
        this.dataService.getProject( id ).subscribe(
            (res) => this.project = res,
            (err) => console.log(err)
        )
        if( !this.project.goals ){ this.project.goals = []; }
    }

    // saves a new project
    eventSave(){
        this.project.id = MD5(this.project.name);
        let user = JSON.parse( localStorage.getItem('currentUser') );
        this.project.owner.email = user.auth.email;
        this.project.owner.uid = user.auth.uid;
        let newUrl = 'project/' + this.project.id;
        this.dataService.saveProject( this.project.id , this.project ).then(
            (res) => this.router.navigate([newUrl]),
            (err) => console.log(err)
        );

    }

    // updates an existing project 
    eventUpdate(){
        let newUrl = 'project/' + this.project.id;
        delete this.project['$exists']; // remove FB generated system keys
        delete this.project['$key']; 
        this.dataService.saveProject( this.project.id, this.project ).then(
            (res) => this.router.navigate([newUrl]),
            (err) => console.log(err)
        )
    }

    // deletes a project
    eventDelete(){
        this.dataService.deleteProject(this.project.id).then(
            (res) => this.router.navigate(['']),
            (err) => console.log( err )
        )
    }

    ngOnInit(){
        this.routePath = this.route.snapshot.params['id']; // get id from route if updating existing project
        if( this.routePath){ this.fetchProject( this.routePath ); } // fetch project data if updating existing project
    }

}