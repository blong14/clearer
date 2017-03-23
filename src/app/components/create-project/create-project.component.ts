import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project.interface';
import { DataService } from '../../data.service';
import { AuthService } from '../../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MD5 } from '../../../../lib/md5';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
  providers: [ DataService ]
})
export class CreateProjectComponent implements OnInit {

  project: Project;
  projectID: string;

  constructor( private dataService: DataService, private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute ) { }

  createNew(){
    this.project = {
      id: "",
      name: "",
      description: "",
      brief: {
        goals: [],
        constraints: []
      },
      owner: {
        uid: ""
      },
      state: 1
    }
  }

  trackByGoals( index: number ){
    return index;
  }

  addGoal(){
    this.project.brief.goals.push({
      text: ""
    });
  }

  addConstraint(){
    this.project.brief.constraints.push({
      text: ""
    });
  }

  saveProject(){

    this.authService.getUser().subscribe(
      (res) => {
        this.project.owner.uid = res.uid;
        this.project.id = MD5(this.project.name);
        let newUrl = 'project/' + this.project.id;
        this.dataService.saveProject( this.project.id, this.project ).then(
          (res) => this.router.navigate([ newUrl ]),
          (err) => console.log( err )
        );
      }
    );

  }

  removeGoal( index ){
    console.log( 'remove' + index );
    console.log( this.project.brief.goals );
    this.project.brief.goals.splice(index,1);
  }

  removeConstraint( index ){
    this.project.brief.constraints.splice( index, 1 );
  }

  getProject(){

    this.activatedRoute.params.subscribe(
      (res) => {
        this.projectID = res['id'];
        this.dataService.getProject( this.projectID ).subscribe(
          (res) => { console.log },
          (err) => console.log( err )
        );
      },
      (err) => console.log( err )
    )

  }

  ngOnInit() {
    this.createNew();
    this.getProject();
    console.log( this.project );
  }

}
