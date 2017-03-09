import { Component, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { Idea } from '../../models/idea.interface';
import { Project } from '../../models/project.interface';
import { MD5 } from '../../../lib/md5';

@Component({
    selector: 'comment-component',
    templateUrl: 'comment.component.html'
})
export class CommentComponent {


    @HostBinding('class') classes = "card";

    @Input() project: Project;
    @Input() idea: Idea;
    @Input() index: number;
    
    // idea properties

    /*
    @Input() index: number;
    @Input() timestamp: string;
    @Input() author: Object;
    @Input() votes: Object;
    @Input() active: boolean;
    @Input() projectState: number; 
    */

    /* Events */
    @Output() deleteEvent: EventEmitter<number> = new EventEmitter();
    @Output() editEvent: EventEmitter<number> = new EventEmitter();
    @Output() selectEvent: EventEmitter<number> = new EventEmitter();
    @Output() viewEvent: EventEmitter<number> = new EventEmitter();
    @Output() voteEvent: EventEmitter<number> = new EventEmitter();



    onDelete(){
        this.deleteEvent.emit(this.index);
    }

    onEdit(){
        this.editEvent.emit(this.index);
    }

    onSelect(){
        this.selectEvent.emit(this.index);
    }

    onView(){
        this.viewEvent.emit(this.index);
    }

    onVote(){
        this.voteEvent.emit(this.index);
    }

    checkPermissions(){

        let currentUser = JSON.parse( localStorage.getItem('currentUser') );
        let permissions = [];

        if( this.idea.owner.uid == currentUser.auth.uid ){ permissions.push( 'ideaOwner' ); }
        if( this.project.owner.uid == currentUser.auth.uid ){ permissions.push( 'projectOwner' ); }
        return permissions;
    }

    checkIdeaState(){
        return this.idea.state;
    }

    checkProjectState(){
        return this.project.state;
    }

    checkVote(){

        let currentUser = JSON.parse( localStorage.getItem('currentUser') );
        if( this.idea.votes && this.idea.votes.voters != undefined ){
            if( this.idea.votes.voters.includes( currentUser.auth.uid )){
                return true;
            }
        }
        return false;
    }

    displayChampion(){
        let champion = this.idea.champion;
        let display =  champion.name ? champion.name : champion.email;
        return display;
    }

    fetchGravitar(){
        let email = this.idea.champion;
        return 'https://www.gravatar.com/avatar/' + MD5( email );
    }

    formatTime(){
        let time = this.idea.timestamp;
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
           return interval + " d";
           // return time.UTCString();
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " h";
        }
        interval = Math.floor(seconds / 60);
        if (interval == 1 ){
            return interval + " m";
        }
        if (interval > 1) {
            return interval + " m";
        }
        return "now"
    }

    isProjectOwner(){
        let permissions = this.checkPermissions();
        if( permissions.includes('projectOwner') ){ return true; }
    }

    isIdeaOwner(){
        let permissions = this.checkPermissions();
        if( permissions.includes('ideaOwner') ){ return true; }
    }

    /*** OLD METHODS ***/
 /*
    onExplore(){
        this.exploreEvent.emit(this.index);
    }

   checkPermissions( author ){
        let user = JSON.parse(localStorage.getItem('currentUser'));
        if( author.uid == user.auth.uid ){ return true; }
        else{ return false; }
    }

    checkState(){
        if( this.state == 3 ){
            return true;
        }
    }

    checkVote(){
        //console.log( this.votes['voters'] );
        let user = JSON.parse(localStorage.getItem('currentUser'));
        if( this.votes && this.votes['voters'] != undefined ){
            if( this.votes['voters'].includes( user.auth.uid ) ){
                return true;
            }
        }
        return false;
    }

    // getGravitar fetches gravitar url from an email address
    fetchGravitar( email ){
        return 'https://www.gravatar.com/avatar/' + MD5(email);
    }

    // formatTime takes a timestamp and transforms it into a "x days ago" format
    formatTime( time ){
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
           return interval + " d";
           // return time.UTCString();
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " h";
        }
        interval = Math.floor(seconds / 60);
        if (interval == 1 ){
            return interval + " m";
        }
        if (interval > 1) {
            return interval + " m";
        }
        return "now"
    }*/



    
}