import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'comment-component',
    templateUrl: 'comment.component.html'
})
export class CommentComponent {

    @Input() avitar: string;
    @Input() timestamp: string;
    @Input() author: Object;



    @HostBinding('class.item') isComment: boolean;

    ngOnInit(){
        this.isComment = true;
    }
    
}