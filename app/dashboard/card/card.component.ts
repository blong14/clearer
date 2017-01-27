import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Idea } from '../../models/idea.interface';

@Component({
    selector: 'card-component',
    templateUrl: 'card.component.html',
})
export class CardComponent {
    @Input() idea: Idea;
    constructor(){}

}