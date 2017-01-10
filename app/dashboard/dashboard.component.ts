import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
    selector: 'dashboard-component',
    templateUrl: 'dashboard.component.html',
})
export class DashboardComponent {

    ideas: any;

    constructor( private dataService : DataService ){
        this.getIdeas();
    }

    getIdeas(){
        return this.dataService.getData().subscribe(
            res=> {
                this.ideas = res;
                console.log( res );
            },
            err=> console.log( err )
        );
    }

}