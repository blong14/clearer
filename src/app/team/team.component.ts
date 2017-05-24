import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  providers: [AuthService, DataService]
})
export class TeamComponent implements OnInit {

  team: Object;
  members: Array<Object>;
  addMemberState: boolean = false;
  inviteEmail: string;
  inviteUser: Object;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute ) { }

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
    let members = Object.keys(this.team['members']).map(key => this.team['members'][key]);
    this.members = new Array;
    members.forEach( (id) => {
      this.dataService.getUser(id).subscribe(
        (res) => {
          this.members.push(res);
        }
      );
    });
  }

  findUser(email) {
    let allUsers;
    this.dataService.getUsers().subscribe(
      (res) => {
        allUsers = res;
        allUsers.forEach( (item) => {
          if( item.email === email ) {
            console.log(item.name);
            this.inviteUser = item;
            return false;
          }
        });
      });
  }

  addMember() {
    this.dataService.addMemberToTeam(this.inviteUser['$key'], this.team['$key']);
    this.toggleAddMemberState();
  }

  toggleAddMemberState() {
    this.inviteUser = undefined;
    this.inviteEmail = undefined;
    this.addMemberState = !this.addMemberState;
  }

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.getTeam();
  }

}
