import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { Project } from '../../models/project.interface';
import { MD5 } from '../../../lib/md5';


@Component({
    selector: 'phase-1-0',
    templateUrl: 'phase-1-0.component.html'
})
export class Phase_1_0_Component{ 

    @Input() project: Project;
    @Output() addIdea: EventEmitter<any> = new EventEmitter();

    newIdea: string;
    modalContent: string;
    showModal: Boolean = false;

    invertList( list ){
        if( list ){
            return list.slice().reverse();

        }
    }

    onAddIdea(){
        let user = JSON.parse(localStorage.getItem('currentUser'));
        let ideaData = {
                'text': this.newIdea, 
                'timestamp': new Date().getTime(),
                'owner': { 
                    'uid': user.auth.uid, 
                    'email': user.auth.email,
                    'name': user.auth.displayName 
                }
            };


        if( this.project['ideas'] ){
            this.project['ideas'].push(ideaData);
        }else{
            this.project['ideas'] = {};
            this.project['ideas'][0] = ideaData;
        }
        this.addIdea.emit(this.project['ideas']);
        this.newIdea = '';
    }

    onRemoveIdea(ev){
        let reverseIndex = this.project['ideas'].length - 1 - ev.i;
        this.project['ideas'].splice(reverseIndex, 1);
        this.addIdea.emit(this.project['ideas']);
    }

    onEditIdea( idea ){
        console.log( idea );
        this.modalContent = idea.content;
        this.showModal = true;
    }

    getGravitar( email ){
        return 'https://www.gravatar.com/avatar/' + MD5(email);
    }

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
    

}