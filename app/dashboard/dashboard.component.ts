import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
    selector: 'dashboard-component',
    templateUrl: 'dashboard.component.html',
    providers:[ DataService ]
})

export class DashboardComponent {

    projects: any;

    constructor( private dataService : DataService ){
        this.getProjects();
    }

    getProjects(){
        return this.dataService.getData().subscribe(
            res=> {
                this.projects = res;
            },
            err=> console.log( err )
        );
    }

}