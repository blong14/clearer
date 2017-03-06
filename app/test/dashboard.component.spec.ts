import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DashboardComponent } from '../dashboard/dashboard.component';

describe('DashboardComponent', () => {
    let comp: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    beforeEach( ()=>{
        TestBed.configureTestingModule({
            declarations: [DashboardComponent],
        });

        fixture = TestBed.createComponent( DashboardComponent );
        comp = fixture.componentInstance;

        de = fixture.debugElement.query(By.css('h1'));
        el = de.nativeElement;
    });

});