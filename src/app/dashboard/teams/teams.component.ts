import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  @HostBinding('class.teams') teams = true;

  constructor() { }

  ngOnInit() {
  }

}
