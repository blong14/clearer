import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  state: Object;


  constructor() { }

  ngOnInit() {

    this.state = {
      name: "Generate",
      id: 1
    }
  }

}
