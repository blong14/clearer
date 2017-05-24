import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  providers: [DataService]
})
export class TeamComponent implements OnInit {

  team: Object;
  members: Array<Object>;

  constructor( private dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute ) { }

  getTeam() {
    let teamID = this.activatedRoute.snapshot.params['id'];
    this.dataService.getTeam( teamID ).subscribe(
      (res) => {
        console.log(res);
        this.team = res;
        this.getMembers();
      }
    )
  }

  getMembers() {
    this.team['members'].forEach( (id) => {
      this.dataService.getUser(id).subscribe(
        (res) => {
          this.members = new Array;
          this.members.push(res);
        }
      );
    });
  }

  ngOnInit() {
    this.getTeam();
  }

}
