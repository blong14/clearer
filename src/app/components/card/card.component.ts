import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @HostBinding('class.card') cardClass = true;
  @HostBinding('class.link') linkClass = true;

  constructor() { }

  ngOnInit() { }

}
