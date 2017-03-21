import { Component, Input, HostBinding } from '@angular/core';
import { Project } from '../../models/project.interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'explore-component',
    templateUrl : 'explore.component.html'
})
export class ExploreComponent{

    @Input() project: Project;

    @HostBinding('class') classes = "card eleven wide column";

    constructor( private router: Router, private activatedRoute: ActivatedRoute ){}

    editIdea( index: number ){
        let projectID = this.activatedRoute.snapshot.params['id'];
        this.router.navigate(['/project/' + projectID + '/idea/' + index ])
    }

    configIdea(){

    }
}
