import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-brief',
  templateUrl: './project-brief.component.html',
  styleUrls: ['./project-brief.component.scss']
})
export class ProjectBriefComponent implements OnInit {

  @Input() project;

  constructor() { }

  ngOnInit() {
  }

}
