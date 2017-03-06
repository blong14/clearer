import { Component, HostBinding, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'comment-component',
    templateUrl: 'comment.component.html'
})
export class CommentComponent {

    @Input() index: number;
    @Input() avitar: string;
    @Input() timestamp: string;
    @Input() author: Object;
    @Input() edit: boolean;
    @Input() votes: Object;

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

    @HostBinding('class') isComment = "event";
    
}