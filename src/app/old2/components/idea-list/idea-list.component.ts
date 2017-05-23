import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../models/project.interface';
import { AuthService } from '../../auth.service';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-idea-list',
  templateUrl: './idea-list.component.html',
  styleUrls: ['./idea-list.component.scss']
})
export class IdeaListComponent implements OnInit {

  @Input() project: Project;
  user;

  constructor( private authService: AuthService, private dataService: DataService, private router: Router ) { }

  isLink(){
    return true;
  }

  setUser(){
    this.authService.getUser().subscribe(
      (res) => {
        this.user = res;
      }
    )
  }

  toggleStar( index: number ){

    let stars = this.project.ideas[index].stars;

        if( stars.people != undefined ){
          if( stars.people.includes( this.user.uid )){
            stars.count--;
            stars.people.splice(
              stars.people.indexOf( this.user.uid ), 1
            )
          }else{
            stars.count++;
            stars.people.push( this.user.uid );
          }
        }else{
          stars.count++;
          stars['people'] = [ this.user.uid ];
        }

      this.dataService.saveProject( this.project.id, this.project, '');


  }

  starCount( index: number ): number{
    let stars: number = this.project.ideas[index].stars.count;

    if( stars != 0 ){
      return stars;
    }
  }

  checkStarred( index: number ) {

    let people = this.project.ideas[index].stars.people;

    if( people ){

      if( people.includes( this.user.uid )){
        return true;
      }

    }
  }

  checkOwner( index: number ){
    let owner = this.project.ideas[index].owner;

    if( owner.uid == this.user.uid ){
      return true;
    }
  }

  deleteIdea( index: number ){
    this.project.ideas.splice( index, 1 );
    this.dataService.saveProject( this.project.id, this.project, '');
  }

  editIdea( index: number ){
    this.router.navigate(['/project/' + this.project.id + '/idea/' + index ]);
  }

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
    console.log( this.project );
    this.setUser();
  }

}
