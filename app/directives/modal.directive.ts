import{ Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[modal]'
})
export class ModalDirective {
    constructor( private element: ElementRef ){
        console.log(this.element);
    }
}