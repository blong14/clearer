import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-brief',
  templateUrl: './project-brief.component.html',
  styleUrls: ['./project-brief.component.scss']
})
export class ProjectBriefComponent implements OnInit {

  @Input() project;
  isOwner: boolean;

  constructor( private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute ) { }

  checkOwner(){
    this.authService.getUser().subscribe(
      (res) => {
        console.log( res.uid + ' ' + this.project.owner.uid );
        if( res.uid == this.project.owner.uid ){
          this.isOwner = true;
        }
      }
    )
  }

  editBrief(){
    let projectID = this.activatedRoute.snapshot.params['id'];
    this.router.navigate(['/project/' + projectID + '/edit']);
  }

  ngOnInit() {
    this.checkOwner();
  }

}
