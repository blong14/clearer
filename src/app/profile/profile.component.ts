import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

  constructor( private dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute ) { }

  getUser() {
    let userID = this.activatedRoute.snapshot.params['id'];
    this.dataService.getUser(userID).subscribe(
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
          userTeams = [];
          console.log(teamKey);
          userTeams = { [teamKey]: teamKey };
        }else {
          userTeams[teamKey] = teamKey;
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

    if( this.user['teams'] != undefined ) {
      let teamArr = Object.keys(this.user['teams']).map(key => this.user['teams'][key]);
      this.teams = new Array();

      if( teamArr != undefined ) {
        teamArr.forEach( (item) => {
          this.dataService.getTeam( item ).subscribe(
            (res) => {
              this.teams.push(res);
            }
          )
        });
      }

    }


  }

  ngOnInit() {
    this.getUser();
  }

}
