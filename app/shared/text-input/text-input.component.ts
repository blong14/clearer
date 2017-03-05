import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'text-input',
    templateUrl: 'text-input.component.html'
})
export class TextInputComponent{

    @Input() onConfirm: void;
    @Output() save: EventEmitter<string> = new EventEmitter();
    @Input() text: string;

    onSave(){
        this.save.emit(this.text);
        this.text = '';
    }

}