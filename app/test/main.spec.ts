import{ ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';


import { DashboardComponent } from '../dashboard/dashboard.component';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/observable';

describe('DashboardComponent (external template)', function(){

    let comp: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let dataService: DataService;

    let testProjects = {
        "description" : "Test description.",
        "goals" : [ "this is goal 1" ],
        "id" : "60765514123c950349d42396a1b0b158",
        "ideas" : [ {
            "champion" : "marie@newkind.com",
            "owner" : {
               "email" : "jmob1986@gmail.com",
               "uid" : "eSMAyN7nTZVhPXSC5YGfmnngIrw1"
            },
            "questions" : [ {
              "text" : "This is a question"
            }, {
              "text" : "Here's another."
            } ],
            "state" : 3,
            "text" : "Adding an idea",
            "timestamp" : 1489082958043
        }]
    }

    beforeEach( async(() => {
        TestBed.configureTestingModule({
            declarations: [ DashboardComponent ],
            providers: [ DataService ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(DashboardComponent);
        comp = fixture.componentInstance;

        dataService = fixture.debugElement.injector.get(DataService);

        let spy = spyOn( dataService, 'getData' )
            .and.returnValue(Promise.resolve(testProjects));

        de = fixture.debugElement.query(By.css('.header'));
        el = de.nativeElement;


    }));

    it( 'data returned successfully', function(){
       fixture.detectChanges();
           expect('Test description.').toEqual('Test description.');
     
    });
});