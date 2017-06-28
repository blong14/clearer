import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Project } from '../../models/project.interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  providers: [
    DataService
  ]
})
export class ProjectComponent implements OnInit {

  project: Project;
  projectID: string;
  addIdea: boolean;

  constructor( private dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute ) { }

  // get project data from service
    getData( projectId: string ){

        this.dataService.getProject( projectId ).subscribe(
            res => {
                this.project = res;
            },
            err => console.log( err )
        );

    }

  ngOnInit() {
    let routeObj = this.activatedRoute.snapshot;

    this.getData( routeObj.params['id'] );
    this.addIdea = routeObj.data['addIdea'];
  }

}
