import { Component, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { MD5 } from '../../../lib/md5';

@Component({
    selector: 'comment-component',
    templateUrl: 'comment.component.html'
})
export class CommentComponent {

    @Input() index: number;
    @Input() timestamp: string;
    @Input() author: Object;
    @Input() votes: Object;
    @Input() active: boolean;

    @Output() editEvent: EventEmitter<number> = new EventEmitter();
    @Output() deleteEvent: EventEmitter<number> = new EventEmitter();
    @Output() voteEvent: EventEmitter<number> = new EventEmitter();

    onEdit(){
        this.editEvent.emit(this.index);
    }

    onDelete(){
        this.deleteEvent.emit(this.index);
    }

    onVote(){
        this.voteEvent.emit(this.index);
    }

    checkPermissions( author ){
        let user = JSON.parse(localStorage.getItem('currentUser'));
        if( author.uid == user.auth.uid ){ return true; }
        else{ return false; }
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
            return interval + " years ago.";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months ago.";
        }
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
           return interval + " days ago.";
           // return time.UTCString();
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours ago.";
        }
        interval = Math.floor(seconds / 60);
        if (interval == 1 ){
            return interval + " minute ago.";
        }
        if (interval > 1) {
            return interval + " minutes ago.";
        }
        return "Just now."
    }


    @HostBinding('class') isComment = "event";
    
}