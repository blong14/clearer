import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../models/project.interface';

@Component({
  selector: 'app-idea-list',
  templateUrl: './idea-list.component.html',
  styleUrls: ['./idea-list.component.scss']
})
export class IdeaListComponent implements OnInit {

  @Input() project: Project;

  constructor() { }

  formatTime( timestamp: number ){
        let time = timestamp;
        let now: any = new Date().getTime();
        let seconds = Math.floor(( now - time) / 1000);
        let interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
            return interval + " years";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months";
        }
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
           return interval + " days";
           // return time.UTCString();
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours";
        }
        interval = Math.floor(seconds / 60);
        if (interval == 1 ){
            return interval + " mins";
        }
        if (interval > 1) {
            return interval + " min";
        }
        return "now"
    }

  ngOnInit() {
  }

}
