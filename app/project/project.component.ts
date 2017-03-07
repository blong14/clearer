import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Project } from '../models/project.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'project-component',
    templateUrl: 'project.component.html',
    styleUrls: ['project.component.scss'],
    providers: [ DataService ]
})
export class ProjectComponent{

    project: Project;
    routePath: string;

    constructor( private dataService: DataService, private route: ActivatedRoute, private router: Router){ }

    // get project data from service
    getData( projectId: string ){

        this.dataService.getProject( projectId ).subscribe(
            res => { 
                this.project = res;
            },
            err => console.log( err )
        );

    }

    // moves project to next phase -- iterates the state property on that project object
    handlerNextPhase( event ){
        this.project.state++;
        this.dataService.saveProject( this.project.id, this.project.state, 'state' );
    }

    // navigate to create component for editing project details
    handlerSettings( event ){
        // event returns true
        this.router.navigate(['project/edit/' + this.project.id])
    }

    ngOnInit(){

        // pass ID from route into getData();
        this.routePath = this.route.snapshot.params['id'];
        this.getData(this.routePath);

    }

   

}