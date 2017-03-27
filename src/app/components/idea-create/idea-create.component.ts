import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { AuthService } from '../../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../models/user.interface';
import { Idea } from '../../models/idea.interface';
import { Project } from '../../models/project.interface';

@Component({
  selector: 'app-idea-create',
  templateUrl: './idea-create.component.html',
  styleUrls: ['./idea-create.component.scss']
})
export class IdeaCreateComponent implements OnInit {

  @Input() project: Project;

  idea: Idea;



  constructor(  private authService: AuthService, private dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute ) {


  }

  newIdea(){
    this.idea = {
      text: "",
      owner: {
        uid: ""
      },
      stars:{
        count: 0,
        people: []
      },
      state: 1,
      timestamp: 1
    }
  }

  cancel(){
      this.router.navigate([ '/project', this.project.id ]);
  }

  fetchIdea( index: number ){
    this.dataService.getProject( this.project.id, '/ideas/' + index ).subscribe(
      (res) => {
        this.idea = res;
      }
    )
  }

  saveIdea(){
    console.log( this.idea );
    if( this.idea.owner.uid == "" ){

      this.authService.getUser().subscribe(
        (res) => {
          this.idea.owner.uid = res.uid;
          this.idea.timestamp = Date.now();
          console.log( this.idea );
          if( !this.project.ideas ){
            this.project['ideas'] = [ this.idea ];
          }else{
            this.project.ideas.push( this.idea );
          }
          this.dataService.saveProject( this.project.id, this.project.ideas, 'ideas' ).then(
            (res)=>{
              this.router.navigate([ '/project', this.project.id ]);
            }
          );

        }
      )

    }else{

      let ideaIndex = this.activatedRoute.snapshot.params['ideaID'];
      this.dataService.saveProject( this.project.id, this.idea, 'ideas/' + ideaIndex ).then(
            (res)=>{
              this.router.navigate([ '/project', this.project.id ]);
            }
          );

    }


  }

  ngOnInit() {
    this.newIdea();

    let ideaIndex = this.activatedRoute.snapshot.params['ideaID'];
    if( ideaIndex ){
      this.fetchIdea( ideaIndex );
    }


  }



}
