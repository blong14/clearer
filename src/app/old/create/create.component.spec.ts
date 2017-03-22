import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from '../shared/shared.module';
import { DataService } from '../data.service';

import { CreateComponent } from './create.component';


describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  const FakeAngularFire = {};
  const FakeHttp = {};

  const FakeActivatedRoute = {
    snapshot: {
      params: Observable.of([{
        id: '1001'
      }])
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateComponent ],
      imports: [ CommonModule, FormsModule, SharedModule, RouterTestingModule ],
      providers: [
        { provide: AngularFire, useValue: FakeAngularFire },
        { provide: Http, useValue: FakeHttp },
        { provide: ActivatedRoute, useValue: FakeActivatedRoute },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
