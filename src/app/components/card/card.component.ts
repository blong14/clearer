import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor() { }

  @HostBinding('class.card') card = true;
  @HostBinding('class.link') link = true;

  ngOnInit() {
  }

}
