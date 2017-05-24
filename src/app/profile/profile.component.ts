import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [DataService]
})
export class ProfileComponent implements OnInit {

  user: Object;
  editState: boolean = false;

  constructor( private dataService: DataService ) { }

  getUser() {
    this.dataService.getUser('eac1a9c8-75a4-4d26-a0b1-10a0251db920').subscribe(
      (res) => {
        this.user = res;
        console.log(this.user);
      },
      (err) => console.log(err)
    );
  }

  toggleEdit() {
    this.editState = !this.editState;
  }

  saveProfile() {
    let pushData = {
      name: this.user['name'],
      bio: this.user['bio']
    }

    this.dataService.saveUser( this.user['$key'], pushData ).then(
      () => {
        this.toggleEdit();
      }
    )
  }

  ngOnInit() {
    this.getUser();
  }

}
