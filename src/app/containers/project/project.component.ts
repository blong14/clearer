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

  constructor( private dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute ) { }

  // get project data from service
    getData( projectId: string ){

        this.dataService.getProject( projectId ).subscribe(
            res => {
                console.log(res);
                this.project = res;
            },
            err => console.log( err )
        );

    }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (res) => {
          this.projectID = res['id'];
          this.getData( this.projectID );
        },
        (err) => console.log(err)
      );
  }

}
