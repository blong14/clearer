import { Component, HostBinding, OnInit } from '@angular/core';

import { slideInDownAnimation } from '../../animations';

@Component({
  selector: 'dashboard-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
  animations: [
    slideInDownAnimation
  ]
})
export class TeamsComponent implements OnInit {

  constructor() { }


  @HostBinding('@routeAnimation') routeAnimation = true;

  ngOnInit() {
  }

}
