import { Component, HostBinding, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  providers: [ DataService ]
})
export class ProjectsComponent implements OnInit {

  @HostBinding('class.projects') class = true;
  projects: Object;

  constructor( private dataService: DataService ) { }

  getProjects() {
    this.dataService.getProjects().subscribe(
      (res) => {
        this.projects = res;
      },
      (err) => console.log( err )
    );
  }

  ngOnInit() {
    this.getProjects();
  }

}
