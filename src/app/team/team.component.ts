import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  providers: [DataService]
})
export class TeamComponent implements OnInit {

  constructor( private dataService: DataService ) { }

  ngOnInit() {
  }

}
