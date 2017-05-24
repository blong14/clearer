import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [DataService]
})
export class ProfileComponent implements OnInit {

  user: Object;
  editState: boolean = false;
  createTeamState: boolean = false;
  teamName: string;
  teams: Array<any>;

  constructor( private dataService: DataService, private router: Router ) { }

  getUser() {
    this.dataService.getUser('eac1a9c8-75a4-4d26-a0b1-10a0251db920').subscribe(
      (res) => {
        this.user = res;
        this.getTeams();
      },
      (err) => console.log(err)
    );
  }

  toggleEdit() {
    this.editState = !this.editState;
  }

  saveProfile() {
    let pushData = {
      name: this.user['name'],
      bio: this.user['bio']
    }

    this.dataService.saveUser( this.user['$key'], pushData ).then(
      () => {
        this.toggleEdit();
      }
    )
  }

  toggleCreateTeamState() {
    this.createTeamState = !this.createTeamState;
  }

  saveTeam() {
    this.dataService.createTeam( this.user['$key'], this.teamName ).then(
      (res) => {
        let userTeams = this.user['teams'];
        let teamKey = res.key;

        if( userTeams == undefined ) {
          userTeams = [teamKey];
        }else {
          userTeams.push(teamKey);
        }

        this.dataService.saveUser( this.user['$key'], {
          teams: userTeams
        }).then(
          () => {
            this.toggleCreateTeamState();
            this.router.navigate(['/team/' + teamKey])
          }
        );
      }
    )
  }

  getTeams() {
    this.teams = new Array();
    let teamArr = this.user['teams'];
    teamArr.forEach( (item) => {
      this.dataService.getTeam( item ).subscribe(
        (res) => {
          this.teams.push(res);
        }
      )
    });
  }


  ngOnInit() {
    this.getUser();
  }

}
