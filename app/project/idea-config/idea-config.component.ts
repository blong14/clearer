import { Component, Input, HostBinding } from '@angular/core';
import { Project } from '../../models/project.interface';
import { DataService } from '../../data.service';
import * as jQuery from 'jquery';



    class Question {
        text: string = ''
    }

@Component({
    selector: 'idea-config-component',
    templateUrl: 'idea-config.component.html'
})
export class IdeaConfigComponent {

    @Input() project: Project;
    users: object;
    activeIndex: number;
    selectedKeys: Array<number> = [];

    @HostBinding('class') classes = "card eleven wide column";

    constructor( private dataService: DataService ){}

    getUsers(){
        this.dataService.getUsers().subscribe(
            (res) => { this.users = res; console.log(this.users); },
            (err) => console.log(err)
        )
    }

    saveIdea( ideaIndex: number ){
        this.validateQuestions( ideaIndex );
        return this.dataService.saveProject( this.project.id, this.project['ideas'][ideaIndex], '/ideas/' + ideaIndex );
    }

    validateQuestions( index: number ){
        let questions = this.project['ideas'][index]['questions'];
        if( questions != undefined ){
            for( let i = 0; i < questions.length; i++ ){
            if( questions[i].text.length < 3 ){
                questions.splice(i,1);
            }
        }

        }
        
    }

    addQuestion( ideaIndex: number ){


        this.saveIdea( ideaIndex ).then(
            (res)=>{

                let questions = this.project['ideas'][ideaIndex]['questions'];
        if( questions == undefined ){
            this.project['ideas'][ideaIndex]['questions'] = [
                new Question
            ];
        }else{
            this.project['ideas'][ideaIndex]['questions'].push(
                new Question
            );
        }

            }
        )
        
    }

    removeQuestion( ideaIndex: number, questionIndex: number ){
        this.project['ideas'][ideaIndex]['questions'].splice(questionIndex, 1);
        this.saveIdea( ideaIndex );
    }

    checkActive( index: number ){
        if ( index == this.activeIndex ){
            return true;
        }
    }

    checkChampions(){
        let pass = true;
        for( let i = 0; i < this.selectedKeys.length; i++ ){
            if( this.project['ideas'][this.selectedKeys[i]]['champion'] == undefined ){
                pass = false;
            }
        }
        return pass;
    }

    checkIfSelected( index: number ){
        if( this.project['ideas'][index]['state'] == 3 ){
            if( this.activeIndex == undefined ){
                 this.activeIndex = index;
            }
            this.selectedKeys.push(index);
            return true;
        }
    }

    setActiveIndex( index: number ){
        console.log( index );
        this.activeIndex = index;
    }

    setNextIndex( index: number ){
        for( let i = index; i < this.project['ideas'].length; i++){
            if( this.project['ideas'][i+1]['state'] == 3 ){
                this.activeIndex = i+1;
                return false;
            }
        }
    }

    isLastIdea( ){
        if( this.activeIndex == ( this.project['ideas'].length -1 ) ){
            return true;
        }
    }

    cancelSetup(){
        this.project.state = 2;
        this.dataService.saveProject( this.project.id, this.project );
    }

    finishSetup(){
        this.project.state = 4;
        this.dataService.saveProject( this.project.id, this.project );
    }

    ngOnInit(){
        this.getUsers();
    }

}