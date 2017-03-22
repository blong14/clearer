import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  providers: [ DataService ]
})
export class ProjectListComponent implements OnInit {

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
