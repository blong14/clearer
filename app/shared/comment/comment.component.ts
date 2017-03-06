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
    @Input() votes: number;

    @Output() editEvent: EventEmitter<number> = new EventEmitter();
    @Output() deleteEvent: EventEmitter<number> = new EventEmitter();

    onEdit(){
        this.editEvent.emit(this.index);
    }

    onDelete(){
        this.deleteEvent.emit(this.index);
    }

    @HostBinding('class') isComment = "event";
    
}