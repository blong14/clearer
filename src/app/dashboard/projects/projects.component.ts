import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor( private dataService: DataService, private activatedRoute: ActivatedRoute ) { }

  getProjects() {
    this.dataService.getProjects().subscribe(
      (res) => {
        this.projects = res;
      },
      (err) => console.log( err )
    );
  }

  ngOnInit() {
    let teamID = this.activatedRoute.snapshot.params['id'];

    if( teamID ) {
      console.log('get team projects');
    }else {
      this.getProjects();
    }

  }

}
