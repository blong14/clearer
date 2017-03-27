import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss'],
  providers: [ DataService ]
})
export class ActivityListComponent implements OnInit {

  feed: any;

  constructor( private dataService: DataService ) { }

  fetchList(){
    this.dataService.getFeed().subscribe(
      (res) => {
        this.feed = res;
      }
    )
  }

  ngOnInit() {
    this.fetchList();
  }

}
