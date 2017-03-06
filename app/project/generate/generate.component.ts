import { Component, HostBinding, Input } from '@angular/core';
import { Project } from '../../models/project.interface';
import { MD5 } from '../../../lib/md5';
import { DataService } from '../../data.service';

@Component({
    selector: 'generate-component',
    templateUrl: 'generate.component.html'
})
export class GenerateComponent {

    // properties

    editIndex: number;
    modalContent: string;
    showModal: boolean ;

    @Input() project: Project;

    @HostBinding('class') classes = "card eleven wide column";

    constructor( private dataService: DataService ){}

    // methods

    // onSave saves new idea to firebase - event from text-input-component
    onSave( event ){

        let user = JSON.parse(localStorage.getItem('currentUser'));
        let ideaData = {
            text: event,
            timestamp: new Date().getTime(),
            owner: {
                'uid': user.auth.uid,
                'email': user.auth.email,
                'name': user.auth.displayName
            }
        };
        if( this.project['ideas'] ){
            this.project['ideas'].push(ideaData);
        }else{
            this.project['ideas'] = [ideaData];
        }
        this.dataService.saveProject( this.project.id, this.project['ideas'], 'ideas')
    }

    checkPermissions( owner ){
        let user = JSON.parse(localStorage.getItem('currentUser'));
        if( owner.uid == user.auth.uid ){ return true; }
        else{ return false; }
    }

    // deleteHandler removes an event based on an index value - event from comment-component
    deleteHandler( event: number ){
        let reverseIndex = this.project['ideas'].length - 1 - event;
        this.project['ideas'].splice(reverseIndex, 1);
        this.dataService.saveProject( this.project.id, this.project['ideas'], 'ideas');
    }

    // editHandler fires off edit event based on index value - event from comment-component
    editHandler( event: number ){
        let reverseIndex = this.project['ideas'].length - 1 - event;
        this.modalContent = this.project['ideas'][reverseIndex].text;
        this.editIndex = reverseIndex;
        this.showModal = true;
    }   

    voteHandler( event: number ){
        let user = JSON.parse(localStorage.getItem('currentUser'));
        let reverseIndex = this.project['ideas'].length - 1 - event;
        let votes = this.project['ideas'][reverseIndex]['votes'];

        if( votes && votes['voters'] != undefined ){
            if( votes['voters'].includes( user.auth.uid ) ){
                votes['count'] = votes['count'] - 1;
                let voterIndex = votes['voters'].indexOf( user.auth.uid );
                votes['voters'].splice( voterIndex, 1 );
            }else{
                votes['count'] = votes['count'] + 1;
                votes['voters'].push( user.auth.uid );
            }
        }else{
            this.project['ideas']['votes'] = {
                count: 1,
                voters: [
                    user.auth.uid
                ]
            }; 
            votes = this.project['ideas']['votes'];
        }
        this.dataService.saveProject( this.project.id, votes, 'ideas/' + reverseIndex + '/votes')
    }

    // close model
    modalCloseHandler( event ){
        if( event == false ){
            this.showModal = false;
        }
    }

    // save updates made inside of modal
    modalSaveHandler( event ){
        this.project['ideas'][this.editIndex].text = event;
        this.dataService.saveProject( this.project.id, this.project['ideas'], 'ideas');
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

    // invertList is used to show ideas in reverse chron order
    invertList( list ){
        if( list ){
            return list.slice().reverse();
        }
    }

    // getGravitar fetches gravitar url from an email address
    getGravitar( email ){
        return 'https://www.gravatar.com/avatar/' + MD5(email);
    }

}