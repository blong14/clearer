import { Component } from '@angular/core';
import { Project } from '../models/project.interface';
import { Router } from '@angular/router';

import { DataService } from '../data.service';
import { MD5 } from '../../lib/md5';

@Component({
    selector: 'create-component',
    templateUrl: 'create.component.html',
    providers: [ DataService ]
})
export class CreateComponent {

    project: Project = {
        id: '',
        name: '',
        description: '',
        goals: {},
        owner: '',
        team: ''
    }

    constructor( private dataService: DataService, private route: Router ){}

    onSave(){
        console.log( this.project );
        this.project.id = MD5(this.project.name);
        let newUrl = 'project/' + this.project.id;
        this.dataService.saveProject( this.project.id , this.project ).then(
            (res)=>{
                this.route.navigate([newUrl])
            },
            (err)=>{
                console.log('failed');
                console.log(err);
            }
            
        );

    }

}