import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard.component';
import { DataService } from '../data.service';



describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  const FakeAngularFire = {
    database: {
      list(){
        return true;
      }
    }
  };
  const FakeHttp = {};

  class dataServiceStub{
    getData(){
      return {
        subscribe(){
          return true;
        }

      }
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [
        CommonModule,
        SharedModule,
        RouterTestingModule
      ],
      providers: [
        { provide: AngularFire, useValue: FakeAngularFire },
        { provide: Http, useValue: FakeHttp },
        { provide: DataService, useClass: dataServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
