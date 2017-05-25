import { Component, HostBinding, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
  providers: [DataService]
})
export class TeamsComponent implements OnInit {

  @HostBinding('class.teams') teamsClass = true;
  teams = [];
  user: Object;

  constructor( private dataService: DataService, private authService: AuthService ) { }

  getTeams() {
    this.authService.getUser().subscribe(
      (res) => {
        this.user = res;
        this.dataService.getTeams(res.uid).subscribe(
          (res) => {
            let teamArr = res;
            teamArr.forEach( (item) => {
              this.dataService.getTeam(item.$value).subscribe(
                (res) => {
                  this.teams.push(res);
            });
          });
      });
    });
  }

  ngOnInit() {
    this.getTeams();
  }

}
