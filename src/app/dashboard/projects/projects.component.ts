import { Component, HostBinding, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'dashboard-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  // properties
  projects: any;

  constructor( private dataService : DataService ) { }

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
