import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
    selector: 'dashboard-component',
    templateUrl: 'dashboard.component.html',
    providers:[ DataService ]
})

export class DashboardComponent implements OnInit{

    // properties

    projects: any;

    constructor( private dataService : DataService ){ }

    // methods

    // get projects to populate dashboard
    fetchProjects(){
        return this.dataService.getData().subscribe(
            res => this.projects = res,
            err => console.log( err )
        );
    }

    ngOnInit(){
        this.fetchProjects();
    }

}