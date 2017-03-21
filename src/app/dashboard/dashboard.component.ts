import { Component, HostBinding } from '@angular/core';
import { DataService } from '../data.service';
import { slideInDownAnimation } from '../animations';

@Component({
    selector: 'dashboard-component',
    templateUrl: 'dashboard.component.html',
    providers: [
      DataService
    ]
})

export class DashboardComponent{

  constructor(){ }

}
